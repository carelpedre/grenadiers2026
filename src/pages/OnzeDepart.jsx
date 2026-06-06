import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import PageHeader from "../components/PageHeader";
import OnzeShareCard from "../components/OnzeShareCard";
import { squad as rawSquad } from "../data/squad";

// ╔══════════════════════════════════════════════════════════════════╗
// ║  TON ONZE DE DÉPART — Grenadiers 2026 (/jeux/onze)                ║
// ║  Composez votre XI de départ, puis partagez-le. Local-first.      ║
// ║  Picks stockés par slug (v2) ; migration depuis l'ancien v1 (nom).║
// ║  Lit le vrai effectif depuis src/data/squad.js.                   ║
// ╚══════════════════════════════════════════════════════════════════╝

const STORE_KEY = "grenadiers_onze_v2";
const STORE_KEY_V1 = "grenadiers_onze_v1";
const ROLE_LABEL = { GK: "Gardien", DEF: "Défenseur", MID: "Milieu", FWD: "Attaquant" };
const ROLE_SHORT = { GK: "GAR", DEF: "DÉF", MID: "MIL", FWD: "ATT" };
const GOLD = "#C8A45C";

// ── Formations: slots en coords % (y : 0 = attaque, 100 = but) ──
const f = (role, x, y) => ({ role, x, y });
const FORMATIONS = {
  "4-3-3": [
    f("GK", 50, 90),
    f("DEF", 16, 71), f("DEF", 39, 73), f("DEF", 61, 73), f("DEF", 84, 71),
    f("MID", 27, 50), f("MID", 50, 52), f("MID", 73, 50),
    f("FWD", 22, 24), f("FWD", 50, 20), f("FWD", 78, 24),
  ],
  "4-4-2": [
    f("GK", 50, 90),
    f("DEF", 16, 71), f("DEF", 39, 73), f("DEF", 61, 73), f("DEF", 84, 71),
    f("MID", 16, 48), f("MID", 39, 50), f("MID", 61, 50), f("MID", 84, 48),
    f("FWD", 36, 22), f("FWD", 64, 22),
  ],
  "4-2-3-1": [
    f("GK", 50, 90),
    f("DEF", 16, 73), f("DEF", 39, 75), f("DEF", 61, 75), f("DEF", 84, 73),
    f("MID", 36, 57), f("MID", 64, 57),
    f("MID", 25, 36), f("MID", 50, 34), f("MID", 75, 36),
    f("FWD", 50, 16),
  ],
  "3-5-2": [
    f("GK", 50, 90),
    f("DEF", 26, 73), f("DEF", 50, 74), f("DEF", 74, 73),
    f("MID", 11, 50), f("MID", 31, 52), f("MID", 50, 54), f("MID", 69, 52), f("MID", 89, 50),
    f("FWD", 36, 24), f("FWD", 64, 24),
  ],
};
const FORMATION_KEYS = Object.keys(FORMATIONS);

// ── Normalise squad.js → { GK, DEF, MID, FWD } quelle que soit la forme ──
function roleFromPosition(p) {
  const t = String(p || "").toLowerCase();
  if (/gard|keeper|\bgk\b|goal/.test(t)) return "GK";
  if (/d[ée]f|arr|back/.test(t)) return "DEF";
  if (/mil|mid|mei|midfield/.test(t)) return "MID";
  if (/att|for|str|ail|wing|avant/.test(t)) return "FWD";
  return null;
}
// Carry through exactly the fields the game needs.
const slim = (p) => ({
  name: p.name,
  slug: p.slug,
  number: p.number,
  photo: p.photo,
  star: p.star,
  club: p.club,
});
function normalizeSquad(raw) {
  const b = { GK: [], DEF: [], MID: [], FWD: [] };
  const push = (arr, role) => (arr || []).forEach((p) => b[role].push(slim(p)));
  if (Array.isArray(raw)) {
    raw.forEach((p) => {
      const r = roleFromPosition(p.position || p.pos || p.role || p.poste);
      b[r || "MID"].push(slim(p));
    });
  } else if (raw && typeof raw === "object") {
    push(raw.goalkeepers || raw.gardiens || raw.gks, "GK");
    push(raw.defenders || raw.defenseurs || raw["défenseurs"], "DEF");
    push(raw.midfielders || raw.milieux || raw.milieu, "MID");
    push(raw.forwards || raw.attaquants || raw.attaque || raw.attaquant, "FWD");
  }
  return b;
}
const surname = (name) => (name || "").trim().split(/\s+/).slice(-1)[0] || name;

export default function OnzeDepart() {
  const squad = useMemo(() => normalizeSquad(rawSquad), []);
  const allPlayers = useMemo(
    () => [...squad.GK, ...squad.DEF, ...squad.MID, ...squad.FWD],
    [squad]
  );
  const bySlug = useMemo(() => {
    const m = {};
    allPlayers.forEach((p) => { m[p.slug] = p; });
    return m;
  }, [allPlayers]);

  const [formation, setFormation] = useState("4-3-3");
  const [picks, setPicks] = useState({}); // slotIndex -> slug
  const [coach, setCoach] = useState(""); // nom du sélectionneur (optionnel)
  const [openSlot, setOpenSlot] = useState(null);
  const [showAll, setShowAll] = useState(false);
  const [showShare, setShowShare] = useState(false);

  const slots = FORMATIONS[formation];

  // Load v2 (slug-keyed), or migrate the old v1 (name-keyed) → v2.
  useEffect(() => {
    try {
      const v2 = JSON.parse(localStorage.getItem(STORE_KEY) || "null");
      if (v2 && FORMATIONS[v2.formation]) {
        setFormation(v2.formation);
        setPicks(v2.picks || {});
        setCoach(v2.coach || "");
        return;
      }
      const v1 = JSON.parse(localStorage.getItem(STORE_KEY_V1) || "null");
      if (v1 && FORMATIONS[v1.formation]) {
        const nameToSlug = {};
        allPlayers.forEach((p) => { nameToSlug[p.name] = p.slug; });
        const migrated = {};
        Object.entries(v1.picks || {}).forEach(([slot, name]) => {
          const slug = nameToSlug[name];
          if (slug) migrated[slot] = slug; // skip names that no longer resolve
        });
        setFormation(v1.formation);
        setPicks(migrated);
      }
    } catch { /* ignore */ }
  }, [allPlayers]);

  // New writes go to v2.
  useEffect(() => {
    try { localStorage.setItem(STORE_KEY, JSON.stringify({ formation, picks, coach })); } catch { /* ignore */ }
  }, [formation, picks, coach]);

  const usedSlugs = new Set(Object.values(picks));
  const filled = Object.keys(picks).length;
  const complete = filled === slots.length;

  function changeFormation(nf) { setFormation(nf); setPicks({}); }
  function eligibleFor(slot) {
    const base = showAll ? allPlayers : (squad[slot.role] || []);
    return base.filter((p) => !usedSlugs.has(p.slug) || picks[openSlot] === p.slug);
  }
  function assign(slug) { setPicks((p) => ({ ...p, [openSlot]: slug })); setOpenSlot(null); setShowAll(false); }
  function clearSlot() { setPicks((p) => { const n = { ...p }; delete n[openSlot]; return n; }); setOpenSlot(null); setShowAll(false); }

  // Lineup passed to the share card: slot coords + the resolved player, in formation order.
  const lineup = slots.map((slot, i) => ({ ...slot, player: picks[i] ? bySlug[picks[i]] : null }));

  return (
    <div className="bg-bg min-h-screen">
      <PageHeader
        eyebrow="Espace supporters"
        title="Ton Onze de Départ"
        subtitle="Composez votre onze de départ pour les Grenadiers, puis partagez-le avec votre groupe."
      />

      <div className="max-w-content mx-auto px-5 py-12 md:py-16">
        {/* Formations */}
        <div className="flex flex-wrap gap-2">
          {FORMATION_KEYS.map((key) => (
            <button
              key={key}
              onClick={() => changeFormation(key)}
              className={`rounded-full px-4 py-1.5 text-sm font-semibold transition-colors ${
                key === formation
                  ? "bg-haiti-blue text-white"
                  : "bg-surface text-ink border border-line hover:border-haiti-blue"
              }`}
            >
              {key}
            </button>
          ))}
        </div>

        {/* Terrain */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative mt-6 w-full overflow-hidden rounded-2xl border border-line"
          style={{ aspectRatio: "3 / 4.2", background: "linear-gradient(#0c2a4d,#0a1f3d)" }}
        >
          <PitchLines />
          {slots.map((slot, i) => (
            <Slot key={i} slot={slot} player={picks[i] ? bySlug[picks[i]] : null} onTap={() => setOpenSlot(i)} />
          ))}
        </motion.div>

        {/* Progression */}
        <div className="mt-5 flex items-center justify-between">
          <span className="text-muted text-sm">{filled}/{slots.length} joueurs</span>
          <button onClick={() => setPicks({})} className="text-muted text-sm underline">Tout effacer</button>
        </div>

        {/* Nom du sélectionneur (optionnel) — apparaît sur la carte de partage */}
        <div className="mt-4">
          <label htmlFor="coach-name" className="block text-muted text-sm mb-1.5">
            Votre nom de sélectionneur <span className="text-muted/60">(optionnel)</span>
          </label>
          <input
            id="coach-name"
            type="text"
            value={coach}
            onChange={(e) => setCoach(e.target.value.replace(/\s+/g, " ").trimStart().slice(0, 20))}
            maxLength={20}
            placeholder="Ex. Sébastien Migné"
            className="w-full rounded-xl border border-line bg-surface px-4 py-3 text-ink placeholder:text-muted/60 focus:border-haiti-blue focus:outline-none"
          />
        </div>

        <button
          onClick={() => setShowShare(true)}
          disabled={!complete}
          className={`mt-3 w-full rounded-xl py-3 font-display text-lg transition-colors ${
            complete ? "bg-haiti-red text-white" : "bg-surface text-muted/70"
          }`}
        >
          {complete ? "Partager mon onze →" : `Complétez votre onze (${slots.length - filled} à placer)`}
        </button>

        <div className="mt-10 border-t border-line pt-6">
          <Link to="/jeux" className="text-muted text-sm underline">← Tous les jeux</Link>
        </div>
      </div>

      {openSlot !== null && (
        <Picker
          role={slots[openSlot].role}
          players={eligibleFor(slots[openSlot])}
          current={picks[openSlot]}
          showAll={showAll}
          onToggleAll={() => setShowAll((v) => !v)}
          onPick={assign}
          onClear={clearSlot}
          onClose={() => { setOpenSlot(null); setShowAll(false); }}
        />
      )}

      {showShare && complete && (
        <OnzeShareCard formation={formation} lineup={lineup} coach={coach} onClose={() => setShowShare(false)} />
      )}
    </div>
  );
}

// ── Small circular player avatar + jersey-number badge (defensive fallback) ──
function PlayerDisc({ player, size, badge, ring }) {
  const [failed, setFailed] = useState(false);
  const showPhoto = player.photo && !failed;
  return (
    <span className="relative inline-block" style={{ width: size, height: size }}>
      <span
        className="block rounded-full overflow-hidden bg-haiti-blue/15"
        style={{ width: size, height: size, boxShadow: ring ? "0 0 0 2px #CE1126" : undefined }}
      >
        {showPhoto ? (
          <img
            src={player.photo}
            alt=""
            className="h-full w-full object-cover"
            style={{ objectPosition: "center top" }}
            onError={() => setFailed(true)}
          />
        ) : (
          <span className="flex h-full w-full items-center justify-center font-bold text-white" style={{ background: "#001770", fontSize: size * 0.36 }}>
            {player.number ?? surname(player.name).slice(0, 2)}
          </span>
        )}
      </span>
      {badge && player.number != null && (
        <span
          className="absolute -bottom-1 -right-1 flex items-center justify-center rounded-full font-bold text-ink"
          style={{ minWidth: size * 0.42, height: size * 0.42, padding: "0 4px", fontSize: size * 0.26, background: GOLD, border: "2px solid #fff" }}
        >
          {player.number}
        </span>
      )}
    </span>
  );
}

function Slot({ slot, player, onTap }) {
  const filled = !!player;
  return (
    <button
      onClick={onTap}
      className="absolute flex flex-col items-center"
      style={{ left: `${slot.x}%`, top: `${slot.y}%`, transform: "translate(-50%,-50%)", width: 64 }}
    >
      {filled ? (
        <PlayerDisc player={player} size={48} badge ring />
      ) : (
        <span
          className="flex h-11 w-11 items-center justify-center rounded-full text-sm font-bold"
          style={{ background: "rgba(255,255,255,0.10)", color: "rgba(255,255,255,0.78)", border: "1.5px dashed rgba(255,255,255,0.45)" }}
        >
          +
        </span>
      )}
      <span
        className="mt-1 max-w-[64px] truncate text-center text-[11px] font-semibold leading-tight text-white"
        style={{ textShadow: "0 1px 2px rgba(0,0,0,0.55)" }}
      >
        {filled ? surname(player.name) : ROLE_SHORT[slot.role]}
      </span>
    </button>
  );
}

function PitchLines() {
  const base = { position: "absolute", border: "1px solid rgba(255,255,255,0.14)" };
  return (
    <>
      <div style={{ ...base, left: "8%", right: "8%", top: "50%", height: 0 }} />
      <div style={{ ...base, left: "50%", top: "50%", width: 90, height: 90, borderRadius: "50%", transform: "translate(-50%,-50%)" }} />
      <div style={{ ...base, left: "26%", right: "26%", top: 0, height: "13%", borderTop: "none" }} />
      <div style={{ ...base, left: "26%", right: "26%", bottom: 0, height: "13%", borderBottom: "none" }} />
    </>
  );
}

function Picker({ role, players, current, showAll, onToggleAll, onPick, onClear, onClose }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center sm:items-center"
      style={{ background: "rgba(10,20,40,0.55)" }}
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-t-2xl bg-white sm:rounded-2xl"
        style={{ maxHeight: "78vh" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-5 pt-4">
          <h3 className="font-display text-xl text-ink">Choisir un {ROLE_LABEL[role].toLowerCase()}</h3>
          <button onClick={onClose} className="text-muted text-sm">Fermer</button>
        </div>

        <div className="flex items-center justify-between px-5 py-3">
          <button onClick={onToggleAll} className="text-haiti-blue text-xs font-semibold underline">
            {showAll ? "Filtrer par poste" : "Voir tous les joueurs"}
          </button>
          {current && (
            <button onClick={onClear} className="text-haiti-red text-xs font-semibold">
              Retirer
            </button>
          )}
        </div>

        <div className="overflow-y-auto px-3 pb-5" style={{ maxHeight: "56vh" }}>
          {players.length === 0 ? (
            <p className="text-muted px-2 py-6 text-center text-sm">Aucun joueur disponible à ce poste.</p>
          ) : (
            <ul className="space-y-1">
              {players.map((p) => (
                <li key={p.slug}>
                  <button
                    onClick={() => onPick(p.slug)}
                    className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors hover:bg-surface ${
                      p.slug === current ? "bg-surface" : ""
                    }`}
                  >
                    <PlayerDisc player={p} size={38} badge />
                    <span className="flex-1 text-ink font-semibold">{p.name}{p.star ? " ★" : ""}</span>
                    <span className="text-muted text-xs">{p.club || ""}</span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
