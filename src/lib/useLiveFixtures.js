// ╔══════════════════════════════════════════════════════════════════╗
// ║  useLiveFixtures — état « live » des matchs d'Haïti (données live) ║
// ║                                                                    ║
// ║  Lit la vue Supabase haiti_fixtures_public et renvoie :            ║
// ║   • byOpponent : index par adversaire (slug = nom anglais en       ║
// ║     minuscules : scotland, brazil, morocco, peru…) pour superposer ║
// ║     scores & statut sur les cartes éditoriales.                    ║
// ║   • feature : le match à mettre en avant (celui en direct, sinon   ║
// ║     le prochain par ordre chronologique) — pour le bandeau en      ║
// ║     tête de /matches.                                              ║
// ║   • anyLive : un match est-il en cours ?                           ║
// ║                                                                    ║
// ║  Rafraîchit toutes les ~45 s tant qu'un match est en direct ;      ║
// ║  s'arrête sinon et au démontage.                                   ║
// ╚══════════════════════════════════════════════════════════════════╝

import { useEffect, useState } from "react";
import {
  fetchFixtures,
  fetchGroupCStandings,
  isFinished,
  isLive,
  isRunning,
  isAbandoned,
  statusLabel,
} from "./fixturesApi";
import { getMatch } from "../data/liveMatches";

const LIVE_POLL_MS = 45_000;
const HAITI_TEAM_ID = 2386;

function shouldPoll(f) {
  const s = f.status_short;
  if (isLive(s)) return true;
  if (isFinished(s) || isAbandoned(s)) return false;
  if (!f.kickoff) return false;
  return new Date(f.kickoff).getTime() <= Date.now() + 5 * 60 * 1000;
}

function haitiIsHome(f) {
  return f.home_id === HAITI_TEAM_ID || f.home_name === "Haiti";
}

function opponentSlug(f) {
  const opp = haitiIsHome(f) ? f.away_name : f.home_name;
  return opp ? opp.toLowerCase().trim() : null;
}

// Slug de page détaillée /live/:slug si elle existe pour cet adversaire.
function detailSlug(f) {
  const slug = opponentSlug(f);
  return slug && getMatch(slug) ? slug : null;
}

// Normalise un fixture en données d'affichage (scores relatifs à Haïti).
function normalize(f) {
  const home = haitiIsHome(f);
  return {
    status: f.status_short,
    label: statusLabel(f.status_short),
    isLive: isLive(f.status_short),
    isFinished: isFinished(f.status_short),
    isRunning: isRunning(f.status_short),
    elapsed: f.elapsed,
    kickoff: f.kickoff,
    haitiGoals: (home ? f.goals_home : f.goals_away) ?? 0,
    oppGoals: (home ? f.goals_away : f.goals_home) ?? 0,
    haitiLogo: home ? f.home_logo : f.away_logo,
    oppName: home ? f.away_name : f.home_name,
    oppLogo: home ? f.away_logo : f.home_logo,
    scorers: Array.isArray(f.scorers) ? f.scorers : [],
  };
}

// Match à mettre en avant : celui en direct, sinon le prochain à venir.
function chooseFeature(fixtures) {
  const live = fixtures.find((f) => isLive(f.status_short));
  if (live) return live;
  const now = Date.now();
  return (
    fixtures
      .filter(
        (f) =>
          !isFinished(f.status_short) &&
          !isAbandoned(f.status_short) &&
          f.kickoff &&
          new Date(f.kickoff).getTime() >= now,
      )
      .sort((a, b) => new Date(a.kickoff) - new Date(b.kickoff))[0] || null
  );
}

function normalizeFeature(f) {
  if (!f) return null;
  return {
    ...normalize(f),
    slug: detailSlug(f),
    opponentSlug: opponentSlug(f),
    homeName: f.home_name,
    awayName: f.away_name,
    homeLogo: f.home_logo,
    awayLogo: f.away_logo,
    homeIsHaiti: haitiIsHome(f),
    kickoff: f.kickoff,
  };
}

export function useLiveFixtures() {
  const [byOpponent, setByOpponent] = useState(null);
  const [feature, setFeature] = useState(null);
  const [anyLive, setAnyLive] = useState(false);
  const [standings, setStandings] = useState(null);

  useEffect(() => {
    let alive = true;
    let timerId = null;

    async function load() {
      const [data, table] = await Promise.all([
        fetchFixtures(),
        fetchGroupCStandings(),
      ]);
      if (!alive) return;

      if (table) setStandings(table);

      if (data) {
        const map = {};
        for (const f of data) {
          const slug = opponentSlug(f);
          if (slug) map[slug] = normalize(f);
        }
        setByOpponent(map);
        setFeature(normalizeFeature(chooseFeature(data)));

        const live = data.some(shouldPoll);
        setAnyLive(live);

        if (timerId) {
          clearTimeout(timerId);
          timerId = null;
        }
        if (live) timerId = setTimeout(load, LIVE_POLL_MS);
      }
    }

    load();
    return () => {
      alive = false;
      if (timerId) clearTimeout(timerId);
    };
  }, []);

  return {
    byOpponent: byOpponent ?? {},
    feature,
    anyLive,
    standings: standings ?? [],
  };
}
