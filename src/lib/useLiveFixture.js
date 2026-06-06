import { useEffect, useState } from "react";
import { fetchFixtures, isLive, isFinished } from "./fixturesApi";

// ╔══════════════════════════════════════════════════════════════════╗
// ║  useLiveFixture — LA rencontre pertinente à mettre en avant        ║
// ║                                                                    ║
// ║  Source unique (vue Supabase haiti_fixtures_public via            ║
// ║  fixturesApi). Choisit UN seul match par priorité :               ║
// ║    1) en direct   2) avant-match (≤ 3 h)   3) après-match (≤ 2 h). ║
// ║  Ne sonde le backend (45 s) QUE pendant un match en direct ;      ║
// ║  l'avant-match se contente d'un chargement unique (le compte à    ║
// ║  rebours est géré côté client par le composant).                  ║
// ╚══════════════════════════════════════════════════════════════════╝

export const PRE_MATCH_HOURS = 3;
export const POST_MATCH_HOURS = 2;
export const REFRESH_MS = 45000;

// Durée approximative d'un match (faute d'horodatage de fin dans les données),
// utilisée pour borner la fenêtre « après-match ».
const MATCH_DURATION_MS = 2 * 60 * 60 * 1000;

export function pickRelevant(fixtures, now) {
  if (!fixtures || fixtures.length === 0) return { fixture: null, phase: null };

  // 1) En direct
  const live = fixtures.find((f) => isLive(f.status_short));
  if (live) return { fixture: live, phase: "live" };

  // 2) Avant-match : NS et coup d'envoi dans les prochaines PRE_MATCH_HOURS
  const preWindow = PRE_MATCH_HOURS * 3600 * 1000;
  const pre = fixtures
    .filter((f) => f.status_short === "NS" && f.kickoff)
    .map((f) => ({ f, t: new Date(f.kickoff).getTime() }))
    .filter(({ t }) => t - now > 0 && t - now <= preWindow)
    .sort((a, b) => a.t - b.t)[0];
  if (pre) return { fixture: pre.f, phase: "pre" };

  // 3) Après-match : terminé dans les dernières POST_MATCH_HOURS
  const postWindow = POST_MATCH_HOURS * 3600 * 1000;
  const post = fixtures
    .filter((f) => isFinished(f.status_short) && f.kickoff)
    .map((f) => ({ f, kt: new Date(f.kickoff).getTime() }))
    .filter(({ kt }) => now >= kt && now - (kt + MATCH_DURATION_MS) <= postWindow)
    .sort((a, b) => b.kt - a.kt)[0];
  if (post) return { fixture: post.f, phase: "post" };

  return { fixture: null, phase: null };
}

export function useLiveFixture() {
  const [state, setState] = useState({ fixture: null, phase: null });

  useEffect(() => {
    let alive = true;
    let timer = null;

    async function load() {
      const data = await fetchFixtures();
      if (!alive) return;
      const picked = pickRelevant(data ?? [], Date.now());
      setState(picked);

      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
      // Sonde uniquement pendant un match en direct.
      if (picked.phase === "live") timer = setTimeout(load, REFRESH_MS);
    }

    load();
    return () => {
      alive = false;
      if (timer) clearTimeout(timer);
    };
  }, []);

  return state;
}
