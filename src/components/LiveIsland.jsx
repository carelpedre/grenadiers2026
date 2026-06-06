import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { Flag } from "./Flag";
import { useLiveFixture } from "../lib/useLiveFixture";
import { getMatch } from "../data/liveMatches";

// ╔══════════════════════════════════════════════════════════════════╗
// ║  LiveIsland — barre « dynamic island » du match, bas-centre        ║
// ║                                                                    ║
// ║  Montée une seule fois dans le layout (toutes les pages). Lit la  ║
// ║  rencontre pertinente via useLiveFixture (vue Supabase, jamais    ║
// ║  données live côté navigateur). Trois états : avant-match,        ║
// ║  en direct, après-match — pastille repliée ↔ carte dépliée.       ║
// ╚══════════════════════════════════════════════════════════════════╝

const HAITI_TEAM_ID = 2386;

// Codes pays de drapeaux disponibles dans le composant Flag.
const FLAG_CODES = {
  haiti: "haiti",
  peru: "peru",
  scotland: "scotland",
  brazil: "brazil",
  morocco: "morocco",
};
// Noms FR (l'API renvoie l'anglais).
const FR_NAMES = {
  haiti: "Haïti",
  peru: "Pérou",
  scotland: "Écosse",
  brazil: "Brésil",
  morocco: "Maroc",
  "new zealand": "Nouvelle-Zélande",
  iceland: "Islande",
  tunisia: "Tunisie",
  "costa rica": "Costa Rica",
  nicaragua: "Nicaragua",
};
// Abréviations à 3 lettres (style FIFA).
const CODES = {
  haiti: "HAI",
  peru: "PER",
  scotland: "SCO",
  brazil: "BRA",
  morocco: "MAR",
  "new zealand": "NZL",
  iceland: "ISL",
  tunisia: "TUN",
  "costa rica": "CRC",
  nicaragua: "NCA",
};

const frName = (n) => FR_NAMES[n?.toLowerCase()] || n;
const code3 = (n) => CODES[n?.toLowerCase()] || (n || "").slice(0, 3).toUpperCase();

function miamiTime(iso) {
  if (!iso) return "";
  return new Intl.DateTimeFormat("fr-FR", {
    timeZone: "America/New_York",
    hour: "2-digit",
    minute: "2-digit",
  })
    .format(new Date(iso))
    .replace(":", "h");
}

function fmtCountdown(ms) {
  const total = Math.max(0, Math.floor(ms / 1000));
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;
  const pad = (n) => String(n).padStart(2, "0");
  return `${pad(h)}:${pad(m)}:${pad(s)}`;
}

// "Voir le match" → page détaillée /live/:slug si elle existe (par adversaire),
// sinon /live (qui renvoie vers /matches).
function detailHref(f) {
  const haitiHome = f.home_id === HAITI_TEAM_ID || f.home_name === "Haiti";
  const opp = (haitiHome ? f.away_name : f.home_name)?.toLowerCase()?.trim();
  return opp && getMatch(opp) ? `/live/${opp}` : "/live";
}

function Dot({ reduce }) {
  return (
    <span
      className={`inline-block w-2 h-2 rounded-full bg-haiti-red ${reduce ? "" : "animate-pulse"}`}
      aria-hidden="true"
    />
  );
}

function TeamIcon({ name, logo }) {
  const c = FLAG_CODES[name?.toLowerCase()];
  if (c) return <Flag country={c} size="sm" />;
  if (logo) return <img src={logo} alt="" loading="lazy" className="w-6 h-6 object-contain" />;
  return null;
}

function TeamRow({ name, logo, reverse }) {
  return (
    <span className={`flex items-center gap-1.5 min-w-0 ${reverse ? "flex-row-reverse text-right" : ""}`}>
      <TeamIcon name={name} logo={logo} />
      <span className="text-sm truncate max-w-[6rem]">{frName(name)}</span>
    </span>
  );
}

function MatchLink({ href }) {
  return (
    <Link
      to={href}
      onClick={(e) => e.stopPropagation()}
      className="inline-flex items-center gap-1 text-haiti-red text-xs font-bold uppercase tracking-wider hover:text-bg transition-colors"
    >
      Voir le match →
    </Link>
  );
}

// ─── Contenus repliés ────────────────────────────────────────────────
function Collapsed({ phase, f, reduce }) {
  if (phase === "live") {
    return (
      <span className="flex items-center gap-2 text-sm font-semibold whitespace-nowrap">
        <Dot reduce={reduce} />
        {code3(f.home_name)}
        <span className="tabular-nums">
          {f.goals_home ?? 0}&ndash;{f.goals_away ?? 0}
        </span>
        {code3(f.away_name)}
        {f.elapsed ? <span className="text-bg/60">· {f.elapsed}'</span> : null}
      </span>
    );
  }
  if (phase === "pre") {
    return (
      <span className="flex items-center gap-2 text-sm font-semibold whitespace-nowrap">
        <ClockIcon />
        {frName(f.home_name)} <span className="text-bg/40">–</span> {frName(f.away_name)}
        <span className="text-bg/60">· {miamiTime(f.kickoff)}</span>
      </span>
    );
  }
  // post
  return (
    <span className="flex items-center gap-2 text-sm font-semibold whitespace-nowrap">
      <span className="text-bg/50 uppercase text-[11px] tracking-wider">Terminé ·</span>
      {code3(f.home_name)}
      <span className="tabular-nums">
        {f.goals_home ?? 0}&ndash;{f.goals_away ?? 0}
      </span>
      {code3(f.away_name)}
    </span>
  );
}

// ─── Contenus dépliés ────────────────────────────────────────────────
function Expanded({ phase, f, reduce }) {
  const href = detailHref(f);

  if (phase === "pre") {
    const remaining = new Date(f.kickoff).getTime() - Date.now();
    return (
      <div className="min-w-[15rem]">
        <p className="text-bg/50 text-[10px] uppercase tracking-wider mb-1">
          Prochain match · coup d'envoi dans
        </p>
        <p className="font-display text-3xl tabular-nums leading-none mb-2">
          {fmtCountdown(remaining)}
        </p>
        <p className="text-sm mb-1">
          {frName(f.home_name)} – {frName(f.away_name)}
        </p>
        {f.venue && <p className="text-bg/60 text-xs mb-3">{f.venue}</p>}
        <MatchLink href={href} />
      </div>
    );
  }

  const live = phase === "live";
  return (
    <div className="min-w-[15rem]">
      <p className="text-bg/50 text-[10px] uppercase tracking-wider mb-2 flex items-center gap-1.5">
        {live ? (
          <>
            <Dot reduce={reduce} /> En direct{f.elapsed ? ` · ${f.elapsed}'` : ""}
          </>
        ) : (
          "Terminé"
        )}
        {f.league_name ? ` · ${f.league_name}` : ""}
      </p>
      <div className="flex items-center justify-between gap-3 mb-3">
        <TeamRow name={f.home_name} logo={f.home_logo} />
        <span className="font-display text-2xl tabular-nums flex-shrink-0">
          {f.goals_home ?? 0}&ndash;{f.goals_away ?? 0}
        </span>
        <TeamRow name={f.away_name} logo={f.away_logo} reverse />
      </div>
      <MatchLink href={href} />
    </div>
  );
}

export default function LiveIsland() {
  const { fixture, phase } = useLiveFixture();
  const reduce = useReducedMotion();
  const [expanded, setExpanded] = useState(false);
  const [hiddenId, setHiddenId] = useState(null);
  const [, setTick] = useState(0);

  const fid = fixture ? String(fixture.fixture_id) : null;

  // Compte à rebours côté client (avant-match uniquement).
  useEffect(() => {
    if (phase !== "pre") return;
    const id = setInterval(() => setTick((t) => t + 1), 1000);
    return () => clearInterval(id);
  }, [phase]);

  // Repli par défaut quand la rencontre change.
  useEffect(() => {
    setExpanded(false);
  }, [fid]);

  if (!fixture || !phase || !fid) return null;

  const storageKey = `island-dismissed-${fid}`;
  const dismissed =
    hiddenId === fid ||
    (typeof window !== "undefined" && sessionStorage.getItem(storageKey) === "1");
  if (dismissed) return null;

  function dismiss(e) {
    e.stopPropagation();
    try {
      sessionStorage.setItem(storageKey, "1");
    } catch {
      /* sessionStorage indisponible — no-op */
    }
    setHiddenId(fid);
  }

  function toggle() {
    setExpanded((v) => !v);
  }

  function onKey(e) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggle();
    }
  }

  return (
    <div
      className="fixed left-1/2 -translate-x-1/2 bottom-4 z-50 w-full max-w-md px-3 flex justify-center pointer-events-none"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <motion.div
        layout={!reduce}
        role="status"
        aria-live="polite"
        className="pointer-events-auto flex items-stretch bg-ink/95 text-bg backdrop-blur border border-bg/10 shadow-2xl rounded-3xl overflow-hidden max-w-full"
      >
        <div
          role="button"
          tabIndex={0}
          aria-expanded={expanded}
          aria-label={expanded ? "Réduire le suivi du match" : "Agrandir le suivi du match"}
          onClick={toggle}
          onKeyDown={onKey}
          className="flex-1 min-w-0 px-4 py-2.5 cursor-pointer select-none"
        >
          {expanded ? (
            <Expanded phase={phase} f={fixture} reduce={reduce} />
          ) : (
            <Collapsed phase={phase} f={fixture} reduce={reduce} />
          )}
        </div>
        <button
          type="button"
          onClick={dismiss}
          aria-label="Masquer le suivi du match"
          className="px-3 flex items-center text-bg/40 hover:text-bg hover:bg-bg/10 border-l border-bg/10 transition-colors"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>
      </motion.div>
    </div>
  );
}

function ClockIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="text-bg/60 flex-shrink-0">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  );
}
