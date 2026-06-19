import { createContext, useContext, useEffect, useMemo, useRef } from "react";
import { motion } from "framer-motion";
import { getAllPlayers } from "../data/squad";

// ╔══════════════════════════════════════════════════════════════════╗
// ║  Player match-stats card (modal on desktop, bottom sheet mobile).  ║
// ║  Data comes from wc-match-players (null-stripped). We render ONLY   ║
// ║  the keys actually present, never a fabricated 0 for a missing one. ║
// ╚══════════════════════════════════════════════════════════════════╝

// apiId -> squad photo, for Haiti players. Opponent ids have no entry.
const PHOTO_BY_API_ID = new Map(
  getAllPlayers()
    .filter((p) => p.apiId && p.photo)
    .map((p) => [p.apiId, p.photo]),
);

// Position codes (G/D/M/F) and full English words both map to French · the
// API normally sends single letters, but we translate words too just in case.
const POS_FR = { G: "Gardien", D: "Défenseur", M: "Milieu", F: "Attaquant" };
const POS_WORDS = {
  goalkeeper: "Gardien",
  keeper: "Gardien",
  defender: "Défenseur",
  midfielder: "Milieu",
  attacker: "Attaquant",
  forward: "Attaquant",
  striker: "Attaquant",
};
function posFr(pos) {
  if (!pos) return "";
  const s = String(pos).trim();
  return POS_FR[s.toUpperCase()] || POS_WORDS[s.toLowerCase()] || s;
}

// Context value: a function (playerId) => void that opens the card, or null when
// stats are not available (pre-match) so names render as plain text, not buttons.
export const PlayerStatsContext = createContext(null);

// A player name that opens the stats card when stats are available; otherwise a
// plain span (no dead UI before kickoff).
export function PlayerName({ id, name, className = "" }) {
  const open = useContext(PlayerStatsContext);
  if (!name) return null;
  if (!open || id == null) return <span className={className}>{name}</span>;
  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        open(id);
      }}
      aria-label={`Voir les statistiques de ${name}`}
      className={`${className} text-left hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded-sm`}
    >
      {name}
    </button>
  );
}

// Build grouped, French-labelled rows from a null-stripped stats object. Only
// present keys produce a row; paired stats become "x/y"; Gardien is keepers only.
function buildGroups(stats, pos) {
  if (!stats) return [];
  const has = (k) => stats[k] != null;
  const row = (k, label, fmt) => (has(k) ? { label, value: fmt ? fmt(stats[k]) : `${stats[k]}` } : null);
  const pair = (totalKey, partKey, label) =>
    has(totalKey) ? { label, value: `${stats[partKey] ?? 0}/${stats[totalKey]}` } : null;

  const isGK = posFr(pos) === "Gardien";
  const groups = [];
  const add = (title, rows) => {
    const r = rows.filter(Boolean);
    if (r.length) groups.push({ title, rows: r });
  };

  add("Général", [row("minutes", "Minutes")]);
  // Keepers show no field-player stats, even if the API leaves a stray 0.
  if (!isGK) {
    add("Attaque", [
      row("goals", "Buts"),
      row("assists", "Passes déc."),
      row("shotsTotal", "Tirs"),
      row("shotsOn", "Tirs cadrés"),
      row("keyPasses", "Occasions créées"),
      pair("dribbleAttempts", "dribbleSuccess", "Dribbles"),
    ]);
  }
  // Passing: total, then accurate/total with the accuracy percentage when the
  // provider supplies both. Never a bare percentage.
  const passesReussies =
    has("passesAccurate") && has("passAccuracyPct")
      ? { label: "Passes réussies", value: `${stats.passesAccurate}/${stats.passes ?? "?"} (${stats.passAccuracyPct}%)` }
      : null;
  add("Passes", [row("passes", "Passes"), passesReussies]);
  if (!isGK) {
    add("Défense", [
      row("tackles", "Tacles"),
      row("interceptions", "Interceptions"),
      row("blocks", "Blocs"),
      pair("duelsTotal", "duelsWon", "Duels gagnés"),
    ]);
  }
  add("Discipline", [
    row("foulsDrawn", "Fautes subies"),
    row("foulsCommitted", "Fautes commises"),
    row("yellow", "Cartons jaunes"),
    row("red", "Cartons rouges"),
  ]);
  if (isGK) add("Gardien", [row("saves", "Arrêts"), row("goalsConceded", "Buts encaissés")]);
  return groups;
}

function trapFocus(e, container) {
  if (!container) return;
  const f = container.querySelectorAll('button, [href], [tabindex]:not([tabindex="-1"])');
  if (!f.length) return;
  const first = f[0];
  const last = f[f.length - 1];
  if (e.shiftKey && document.activeElement === first) {
    e.preventDefault();
    last.focus();
  } else if (!e.shiftKey && document.activeElement === last) {
    e.preventDefault();
    first.focus();
  }
}

export default function PlayerMatchStatsCard({ player, onClose }) {
  const cardRef = useRef(null);

  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden"; // scroll-lock behind
    const onKey = (e) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      } else if (e.key === "Tab") {
        trapFocus(e, cardRef.current);
      }
    };
    document.addEventListener("keydown", onKey);
    const raf = requestAnimationFrame(() => cardRef.current?.focus());
    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener("keydown", onKey);
      cancelAnimationFrame(raf);
    };
  }, [onClose]);

  if (!player) return null;
  const { name, number, pos, captain, rating, stats } = player;
  const photo = PHOTO_BY_API_ID.get(player.id) || null;
  const didPlay = stats && stats.minutes != null; // unused subs have no minutes
  const groups = useMemo(() => (didPlay ? buildGroups(stats, pos) : []), [didPlay, stats, pos]);
  const noData = groups.length === 0 && rating == null;

  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center sm:items-center">
      <motion.div
        className="absolute inset-0 bg-ink/75 backdrop-blur-sm"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      />
      <motion.div
        ref={cardRef}
        role="dialog"
        aria-modal="true"
        aria-label={`Statistiques de ${name}`}
        tabIndex={-1}
        initial={{ opacity: 0, y: 48 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.26, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-h-[88vh] overflow-y-auto rounded-t-2xl bg-ink-deep text-bg shadow-2xl focus:outline-none sm:max-w-md sm:rounded-2xl"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Fermer"
          className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-bg/15 text-bg transition-colors hover:bg-bg/25"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>

        {/* Header */}
        <div className="relative overflow-hidden px-6 pb-5 pt-7">
          <div
            className="absolute inset-0"
            style={{ background: "radial-gradient(120% 90% at 85% 0%, rgba(0,32,159,.5), transparent 60%)" }}
          />
          <div className="relative flex items-center gap-4">
            {photo ? (
              <img src={photo} alt="" className="h-20 w-20 flex-shrink-0 rounded-xl bg-ink object-cover object-top" />
            ) : (
              <div className="flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-xl bg-haiti-blue/30 font-block text-3xl text-bg tabular-nums">
                {number ?? "?"}
              </div>
            )}
            <div className="min-w-0">
              <p className="font-cond text-xs font-semibold uppercase tracking-[0.2em] text-gold">
                {number != null ? `N°${number}` : ""}
                {number != null && pos ? " · " : ""}
                {posFr(pos)}
              </p>
              <h2 className="mt-1 break-words font-cond text-2xl font-bold uppercase leading-none tracking-tight md:text-3xl">
                {name}
                {captain ? <span className="ml-2 align-middle text-sm text-gold">(C)</span> : null}
              </h2>
              {rating != null && (
                <span className="mt-2 inline-flex items-center rounded-full bg-gold px-3 py-1 text-sm font-bold tabular-nums text-ink">
                  Note {Number(rating).toFixed(1)}
                </span>
              )}
            </div>
          </div>
          <span className="flag-rule relative mt-4 block w-10 rounded-full" />
        </div>

        {/* Stats */}
        <div className="px-6 pb-7">
          {noData ? (
            <p className="py-6 text-center text-sm text-bg/70">Statistiques non disponibles pour ce joueur.</p>
          ) : (
            <div className="space-y-5">
              {groups.map((g) => (
                <div key={g.title}>
                  <p className="mb-2 font-cond text-[11px] font-semibold uppercase tracking-[0.18em] text-gold/90">{g.title}</p>
                  <dl className="divide-y divide-bg/10 rounded-xl bg-bg/[0.04]">
                    {g.rows.map((r) => (
                      <div key={r.label} className="flex items-center justify-between px-4 py-2.5">
                        <dt className="text-sm text-bg/75">{r.label}</dt>
                        <dd className="font-block text-lg tabular-nums text-bg">{r.value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
