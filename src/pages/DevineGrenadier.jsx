import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import PageHeader from "../components/PageHeader";
import { squad as rawSquad } from "../data/squad";

// ╔══════════════════════════════════════════════════════════════════╗
// ║  DEVINE LE GRENADIER — un joueur mystère par jour (/jeux/devine)  ║
// ║  Six essais. Chaque essai compare poste, âge, pays du club et      ║
// ║  club au joueur mystère. Résultat partageable. Local-first.       ║
// ║  Lit le vrai effectif depuis src/data/squad.js (formes EN/FR).    ║
// ╚══════════════════════════════════════════════════════════════════╝

const STORE_KEY = "grenadiers_devine_v1";
const MAX_TRIES = 6;
const REF_YEAR = 2026;
const EPOCH = Date.UTC(2026, 5, 1); // 1er juin 2026 = énigme nº 1
const ROLE_SHORT = { GK: "GAR", DEF: "DÉF", MID: "MIL", FWD: "ATT" };

// ── Normalise squad.js en une liste plate avec poste ──
function roleFromPosition(p) {
  const t = String(p || "").toLowerCase();
  if (/gard|keeper|\bgk\b|goal/.test(t)) return "GK";
  if (/d[ée]f|arr|back/.test(t)) return "DEF";
  if (/mil|mid|mei|midfield/.test(t)) return "MID";
  if (/att|for|str|ail|wing|avant/.test(t)) return "FWD";
  return null;
}
function flatten(raw) {
  const out = [];
  const add = (arr, role) => (arr || []).forEach((p) => out.push({ ...p, _role: role }));
  if (Array.isArray(raw)) {
    raw.forEach((p) => out.push({ ...p, _role: roleFromPosition(p.position || p.pos || p.role || p.poste) || "MID" }));
  } else if (raw && typeof raw === "object") {
    add(raw.goalkeepers || raw.gardiens || raw.gks, "GK");
    add(raw.defenders || raw.defenseurs || raw["défenseurs"], "DEF");
    add(raw.midfielders || raw.milieux || raw.milieu, "MID");
    add(raw.forwards || raw.attaquants || raw.attaque || raw.attaquant, "FWD");
  }
  return out;
}
function getAge(p) {
  // derive from birth year for a consistent calc across all players
  const d = p.born || p.birthdate || p.dob || p.naissance || p.dateNaissance;
  if (d) {
    const m = String(d).match(/\b(19|20)\d{2}\b/);
    if (m) return REF_YEAR - parseInt(m[0], 10);
  }
  if (p.age != null) {
    const n = parseInt(String(p.age).replace(/[^\d]/g, ""), 10);
    if (!isNaN(n) && n > 0) return n;
  }
  if (p.birthYear) return REF_YEAR - p.birthYear;
  return null;
}
const norm = (s) => (s || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();
const country = (p) => p.clubCountry || p.paysClub || p.country || p.pays || "";

// deterministic seeded shuffle (constant seed → same daily order for everyone)
function seededOrder(n) {
  let seed = 0x9e3779b9;
  const rng = () => { seed = (seed * 1664525 + 1013904223) >>> 0; return seed / 0xffffffff; };
  const idx = Array.from({ length: n }, (_, i) => i);
  for (let i = n - 1; i > 0; i--) { const j = Math.floor(rng() * (i + 1)); [idx[i], idx[j]] = [idx[j], idx[i]]; }
  return idx;
}
function todayPuzzle() {
  const t = new Date();
  const tUTC = Date.UTC(t.getFullYear(), t.getMonth(), t.getDate());
  return Math.floor((tUTC - EPOCH) / 86400000) + 1;
}

export default function DevineGrenadier() {
  const players = useMemo(() => flatten(rawSquad), []);
  const n = players.length;
  const puzzle = todayPuzzle();
  const order = useMemo(() => seededOrder(n), [n]);
  const target = players[order[((puzzle - 1) % n + n) % n]] || players[0];

  const hasAge = useMemo(
    () => players.filter((p) => getAge(p) != null).length >= Math.ceil(n * 0.6),
    [players, n]
  );

  const attrs = useMemo(() => {
    const a = [{ key: "poste", label: "Poste" }];
    if (hasAge) a.push({ key: "age", label: "Âge" });
    a.push({ key: "pays", label: "Pays du club" }, { key: "club", label: "Club" });
    return a;
  }, [hasAge]);

  const [guesses, setGuesses] = useState([]); // array of player names
  const [query, setQuery] = useState("");
  const [streak, setStreak] = useState(0);
  const [howOpen, setHowOpen] = useState(false); // « Comment jouer » : ouvert pour les nouveaux, replié pour les habitués

  const guessedPlayers = guesses.map((name) => players.find((p) => p.name === name)).filter(Boolean);
  const won = guessedPlayers.some((p) => p.name === target.name);
  const done = won || guesses.length >= MAX_TRIES;

  // load saved state for today
  useEffect(() => {
    try {
      const s = JSON.parse(localStorage.getItem(STORE_KEY) || "null");
      setHowOpen(!s); // déplié par défaut pour un nouveau joueur, replié pour les habitués
      if (s) {
        setStreak(s.streak || 0);
        if (s.puzzle === puzzle) setGuesses(s.guesses || []);
      }
    } catch { /* ignore */ }
  }, [puzzle]);

  // persist + streak bookkeeping when a game finishes
  useEffect(() => {
    try {
      const prev = JSON.parse(localStorage.getItem(STORE_KEY) || "null") || {};
      let nextStreak = prev.streak || 0;
      if (done && prev.scoredPuzzle !== puzzle) {
        nextStreak = won ? (prev.lastWonPuzzle === puzzle - 1 ? nextStreak + 1 : 1) : 0;
      }
      const payload = {
        puzzle, guesses,
        streak: done ? nextStreak : prev.streak || 0,
        scoredPuzzle: done ? puzzle : prev.scoredPuzzle,
        lastWonPuzzle: won ? puzzle : prev.lastWonPuzzle,
      };
      localStorage.setItem(STORE_KEY, JSON.stringify(payload));
      if (done) setStreak(payload.streak);
    } catch { /* ignore */ }
  }, [guesses, done, won, puzzle]);

  const suggestions = query.trim()
    ? players
        .filter((p) => !guesses.includes(p.name) && norm(p.name).includes(norm(query)))
        .slice(0, 6)
    : [];

  function guess(name) {
    if (done || guesses.includes(name)) return;
    setGuesses((g) => [...g, name]);
    setQuery("");
  }

  // ── per-attribute comparison ──
  function compare(p, key) {
    if (key === "poste")
      return { status: p._role === target._role ? "hit" : "miss", text: ROLE_SHORT[p._role] || "—" };
    if (key === "pays")
      return { status: norm(country(p)) === norm(country(target)) && country(p) ? "hit" : "miss", text: country(p) || "—" };
    if (key === "club")
      return { status: norm(p.club) === norm(target.club) && p.club ? "hit" : "miss", text: p.club || "—" };
    if (key === "age") {
      const a = getAge(p), b = getAge(target);
      if (a == null || b == null) return { status: "miss", text: a == null ? "—" : String(a) };
      const arrow = a === b ? "" : a < b ? " ↑" : " ↓"; // ↑ : la réponse est plus âgée
      const diff = Math.abs(a - b);
      return { status: diff === 0 ? "hit" : diff <= 2 ? "near" : "miss", text: `${a}${arrow}` };
    }
    return { status: "miss", text: "—" };
  }
  const cellClass = (s) =>
    s === "hit" ? "bg-emerald-500 text-white"
    : s === "near" ? "bg-amber-400 text-ink"
    : "bg-slate-200 text-ink/70";
  const emoji = (s) => (s === "hit" ? "🟩" : s === "near" ? "🟨" : "⬛");

  async function share() {
    const grid = guessedPlayers
      .map((p) => attrs.map((a) => emoji(compare(p, a.key).status)).join(""))
      .join("\n");
    const head = `Devine le Grenadier nº${puzzle} — ${won ? guesses.length : "X"}/${MAX_TRIES} 🇭🇹`;
    const text = `${head}\n${grid}\n\ngrenadiers2026.com/jeux/devine`;
    try {
      if (navigator.share) await navigator.share({ text });
      else { await navigator.clipboard.writeText(text); alert("Copié — collez-le dans votre groupe."); }
    } catch { /* annulé */ }
  }

  return (
    <div className="bg-bg min-h-screen">
      <PageHeader
        eyebrow="Espace supporters"
        title="Devine le Grenadier"
        subtitle="Un joueur mystère de la sélection chaque jour. Six essais pour le trouver."
      />

      <div className="max-w-content mx-auto px-5 py-12 md:py-16">
        <div className="flex items-center justify-between">
          <span className="text-muted text-sm">Énigme nº{puzzle} · {Math.min(guesses.length, MAX_TRIES)}/{MAX_TRIES} essais</span>
          {streak > 0 && <span className="text-muted text-sm">Série : {streak} 🔥</span>}
        </div>

        {/* Comment jouer — repliable (déplié pour les nouveaux joueurs) */}
        <div className="mt-4 rounded-2xl border border-line bg-white overflow-hidden">
          <button
            onClick={() => setHowOpen((v) => !v)}
            aria-expanded={howOpen}
            className="flex w-full items-center justify-between px-4 py-3 text-left"
          >
            <span className="text-haiti-red text-[10px] md:text-xs uppercase tracking-[0.25em] font-bold">
              Comment jouer
            </span>
            <span className="text-muted text-xs font-semibold">{howOpen ? "Masquer ▾" : "Afficher ▸"}</span>
          </button>

          {howOpen && (
            <div className="px-4 pb-4">
              <p className="text-ink text-sm leading-relaxed">
                Un Grenadier mystère se cache dans la sélection. Devinez des joueurs du groupe : à chaque
                essai, le jeu révèle ce que votre choix partage avec le joueur recherché — poste, âge, pays du
                club et club. Six essais pour le démasquer.
              </p>

              <div className="mt-4 border-t border-line pt-3">
                <p className="text-[10px] uppercase tracking-wider font-bold text-muted mb-2.5">Légende</p>
                <div className="flex flex-col gap-2 text-xs">
                  <span className="inline-flex items-center gap-2">
                    <span className="h-4 w-4 shrink-0 rounded bg-emerald-500"></span>
                    <span className="text-ink"><strong>Vert</strong> — identique : bon poste, bon pays, bon club, ou âge exact.</span>
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <span className="h-4 w-4 shrink-0 rounded bg-amber-400"></span>
                    <span className="text-ink"><strong>Jaune</strong> — âge proche : à 2 ans près du joueur mystère.</span>
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <span className="h-4 w-4 shrink-0 rounded bg-slate-200 border border-line"></span>
                    <span className="text-ink"><strong>Gris</strong> — aucune correspondance.</span>
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <span className="flex h-4 w-4 shrink-0 items-center justify-center font-bold text-ink">↑↓</span>
                    <span className="text-ink"><strong>Flèches sur l'âge</strong> — le Grenadier mystère est plus âgé (↑) ou plus jeune (↓) que votre essai.</span>
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Search / guess input */}
        {!done && (
          <div className="relative mt-4">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Tapez le nom d'un joueur…"
              className="w-full rounded-xl border border-line bg-white px-4 py-3 text-ink text-sm outline-none focus:border-haiti-blue"
            />
            {suggestions.length > 0 && (
              <ul className="absolute z-20 mt-1 w-full overflow-hidden rounded-xl border border-line bg-white shadow-lg">
                {suggestions.map((p) => (
                  <li key={p.name}>
                    <button
                      onClick={() => guess(p.name)}
                      className="flex w-full items-center justify-between px-4 py-2.5 text-left hover:bg-surface"
                    >
                      <span className="text-ink font-semibold">{p.name}</span>
                      <span className="text-muted text-xs">{ROLE_SHORT[p._role]}</span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        {/* Guesses */}
        <div className="mt-6 space-y-3">
          {guessedPlayers.map((p) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="rounded-2xl border border-line bg-white p-4"
            >
              <div className="flex items-center justify-between">
                <span className="font-display text-lg text-ink">{p.name}</span>
                {p.name === target.name && <span className="text-emerald-600 text-sm font-bold">Trouvé !</span>}
              </div>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {attrs.map((a) => {
                  const c = compare(p, a.key);
                  return (
                    <span key={a.key} className={`rounded-md px-2 py-1 text-xs font-semibold ${cellClass(c.status)}`}>
                      <span className="opacity-70">{a.label} : </span>{c.text}
                    </span>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Result */}
        {done && (
          <div className="mt-6 rounded-2xl border border-line bg-surface p-6 text-center">
            <p className="font-display text-2xl text-ink">
              {won ? `Bravo — trouvé en ${guesses.length} !` : "Raté pour aujourd'hui."}
            </p>
            <p className="text-muted mt-1 text-sm">
              Le Grenadier mystère était <span className="text-ink font-semibold">{target.name}</span>.
            </p>
            <button onClick={share} className="mt-4 w-full rounded-xl bg-haiti-red py-3 font-display text-lg text-white">
              Partager mon résultat →
            </button>
            <p className="text-muted mt-3 text-xs">Un nouveau joueur mystère demain.</p>
          </div>
        )}

        <div className="mt-10 border-t border-line pt-6">
          <Link to="/jeux" className="text-muted text-sm underline">← Tous les jeux</Link>
        </div>
      </div>
    </div>
  );
}
