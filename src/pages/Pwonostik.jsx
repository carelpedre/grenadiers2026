import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Flag } from "../components/Flag";
import { matches } from "../data/matches";
import { matchResults } from "../data/matchResults";
import { backendReady, submitEntry, fetchLeaderboard } from "../lib/pwonostikApi";
import PwonostikShareCard from "../components/PwonostikShareCard";
import { useT } from "../lib/i18n";

// ╔══════════════════════════════════════════════════════════════════╗
// ║  PWONOSTIK — pronostics de la phase de groupes (Groupe C)        ║
// ║                                                                    ║
// ║  Version 1 « local-first » : les pronostics sont enregistrés sur ║
// ║  l'appareil (localStorage). Verrouillage automatique au coup     ║
// ║  d'envoi. Carte de partage (Web Share API + presse-papier).      ║
// ║  Dès qu'un résultat est saisi dans matchResults.js, les points   ║
// ║  sont calculés (3 pts score exact · 1 pt bon résultat).          ║
// ║                                                                    ║
// ║  ÉTAPE SUIVANTE (backend) : classement global + ligues privées + ║
// ║  capture e-mail via Supabase. L'architecture est prête pour ça.  ║
// ╚══════════════════════════════════════════════════════════════════╝

const STORE_KEY = "grenadiers_pwonostik_v1";
const PLAYER_KEY = "grenadiers_pwonostik_pid";
const MAX_GOALS = 9;

// Stable anonymous identity per device — lets a player update their own row.
function getPlayerId() {
  try {
    let id = localStorage.getItem(PLAYER_KEY);
    if (!id) {
      id = (window.crypto && crypto.randomUUID)
        ? crypto.randomUUID()
        : "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
            const r = (Math.random() * 16) | 0;
            return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
          });
      localStorage.setItem(PLAYER_KEY, id);
    }
    return id;
  } catch {
    return "00000000-0000-4000-8000-000000000000";
  }
}

function loadState() {
  try {
    const v = localStorage.getItem(STORE_KEY);
    return v ? JSON.parse(v) : null;
  } catch {
    return null;
  }
}

function saveState(state) {
  try {
    localStorage.setItem(STORE_KEY, JSON.stringify(state));
  } catch {
    /* ignore */
  }
}

// Orient a Haïti-centric value pair to the fixture's home/away order
function haitiIsHome(m) {
  return m.home.country === "haiti";
}

// Points for one match given a home/away pick — null if not played yet
function pointsFor(m, pick) {
  const r = matchResults[m.matchNumber];
  if (!r || !pick) return null;
  const hHome = haitiIsHome(m);
  const resHome = hHome ? r.haiti : r.opp;
  const resAway = hHome ? r.opp : r.haiti;
  if (pick.home === resHome && pick.away === resAway) return 3;
  if (Math.sign(pick.home - pick.away) === Math.sign(resHome - resAway)) return 1;
  return 0;
}

// Total points for a full set of picks (played matches only).
function sumPoints(picks) {
  return matches.reduce((s, m) => s + (pointsFor(m, picks?.[m.matchNumber]) || 0), 0);
}

export default function Pwonostik() {
  const { t } = useT();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [league, setLeague] = useState("");
  const [picks, setPicks] = useState({}); // { [matchNumber]: { home, away } }
  const [saved, setSaved] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const [board, setBoard] = useState(null);
  const [boardScope, setBoardScope] = useState("global");
  const [loadingBoard, setLoadingBoard] = useState(false);
  const now = Date.now();

  // Hydrate from localStorage once
  useEffect(() => {
    const s = loadState();
    if (s) {
      setName(s.name || "");
      setEmail(s.email || "");
      setLeague(s.league || "");
      setPicks(s.picks || {});
    } else {
      // initialise all matches at 0–0
      const init = {};
      matches.forEach((m) => { init[m.matchNumber] = { home: 0, away: 0 }; });
      setPicks(init);
    }
  }, []);

  const isLocked = useCallback((m) => now >= new Date(m.kickoff).getTime(), [now]);

  const bump = (mn, side, delta) => {
    setPicks((prev) => {
      const cur = prev[mn] || { home: 0, away: 0 };
      const nextVal = Math.max(0, Math.min(MAX_GOALS, cur[side] + delta));
      return { ...prev, [mn]: { ...cur, [side]: nextVal } };
    });
    setSaved(false);
  };

  const loadBoard = useCallback(async (scope, leagueCode) => {
    if (!backendReady) return;
    setLoadingBoard(true);
    const rows = await fetchLeaderboard(scope === "league" && leagueCode ? { league: leagueCode } : {});
    setBoard(rows || []);
    setLoadingBoard(false);
  }, []);

  useEffect(() => {
    if (backendReady) loadBoard("global", null);
  }, [loadBoard]);

  const switchScope = (scope) => {
    setBoardScope(scope);
    loadBoard(scope, scope === "league" ? league.trim().toUpperCase() : null);
  };

  const save = async () => {
    const cleanLeague = league.trim().toUpperCase();
    saveState({ name: name.trim(), email: email.trim(), league: cleanLeague, picks });
    setSaved(true);
    setTimeout(() => setSaved(false), 2400);
    if (backendReady) {
      await submitEntry({
        playerId: getPlayerId(),
        name: name.trim(),
        email: email.trim(),
        picks,
        points: sumPoints(picks),
        league: cleanLeague,
      });
      loadBoard(boardScope, boardScope === "league" ? cleanLeague : null);
    }
  };

  // ── Share card (reads picks from memory only — no persistence / no Supabase) ──
  const predictions = matches.map((m) => {
    const p = picks[m.matchNumber] || { home: 0, away: 0 };
    return {
      homeName: m.home.name,
      awayName: m.away.name,
      home: p.home,
      away: p.away,
      date: m.date,
    };
  });
  const allFilled = matches.every((m) => {
    const p = picks[m.matchNumber];
    return p && Number.isFinite(p.home) && Number.isFinite(p.away);
  });

  // ── Points (only if at least one result exists) ──
  const anyResult = matches.some((m) => matchResults[m.matchNumber]);
  const totalPts = matches.reduce((sum, m) => {
    const pts = pointsFor(m, picks[m.matchNumber]);
    return sum + (pts || 0);
  }, 0);

  return (
    <div className="bg-bg min-h-screen">
      {/* Compact hero */}
      <section className="bg-ink text-bg">
        <div className="max-w-content mx-auto px-5 py-10 md:py-14">
          <Link to="/jeux" className="text-bg/50 hover:text-bg text-xs uppercase tracking-wider font-bold transition-colors">
            ← {t("games.backToHub")}
          </Link>
          <p className="text-haiti-red text-xs uppercase tracking-wider font-bold mb-3 mt-4">{t("pwonostik.eyebrow")}</p>
          <h1 className="font-display text-4xl md:text-5xl">{t("jeux.pwonostik.title")}</h1>
          <p className="text-bg/70 text-lg mt-3 max-w-prose">
            {t("pwonostik.intro")}
          </p>
        </div>
      </section>

      <div className="max-w-2xl mx-auto px-5 py-10 md:py-14">
        {/* Name */}
        <div className="mb-6">
          <label className="block text-xs uppercase tracking-wider font-bold text-muted mb-2">
            {t("pwonostik.nameLabel")} <span className="text-muted/60 normal-case tracking-normal">{t("pwonostik.nameHint")}</span>
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => { setName(e.target.value); setSaved(false); }}
            placeholder={t("pwonostik.namePlaceholder")}
            maxLength={24}
            className="w-full bg-white border border-line rounded-xl p-3.5 text-ink focus:border-haiti-blue focus:outline-none transition-colors"
          />
        </div>

        {/* Email (optional) */}
        <div className="mb-6">
          <label className="block text-xs uppercase tracking-wider font-bold text-muted mb-2">
            {t("pwonostik.emailLabel")} <span className="text-muted/60 normal-case tracking-normal">{t("pwonostik.emailHint")}</span>
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => { setEmail(e.target.value); setSaved(false); }}
            placeholder={t("pwonostik.emailPlaceholder")}
            className="w-full bg-white border border-line rounded-xl p-3.5 text-ink focus:border-haiti-blue focus:outline-none transition-colors"
          />
        </div>

        {/* League (optional) */}
        <div className="mb-8">
          <label className="block text-xs uppercase tracking-wider font-bold text-muted mb-2">
            {t("pwonostik.leagueLabel")} <span className="text-muted/60 normal-case tracking-normal">{t("pwonostik.leagueHint")}</span>
          </label>
          <input
            type="text"
            value={league}
            onChange={(e) => { setLeague(e.target.value.toUpperCase()); setSaved(false); }}
            placeholder={t("pwonostik.leaguePlaceholder")}
            maxLength={24}
            className="w-full bg-white border border-line rounded-xl p-3.5 text-ink uppercase tracking-wide focus:border-haiti-blue focus:outline-none transition-colors"
          />
          <p className="text-muted/70 text-xs mt-1.5 leading-snug">
            {t("pwonostik.leagueNote")}
          </p>
        </div>

        {/* Points banner (after results start coming in) */}
        {anyResult && (
          <div className="mb-8 bg-haiti-blue text-bg rounded-2xl p-6 text-center">
            <p className="text-xs uppercase tracking-wider font-bold text-bg/70 mb-1">{t("pwonostik.yourTotal")}</p>
            <p className="font-display text-5xl">{totalPts} <span className="text-2xl text-bg/70">pts</span></p>
          </div>
        )}

        {/* Match cards */}
        <div className="space-y-5">
          {matches.map((m) => {
            const locked = isLocked(m);
            const pick = picks[m.matchNumber] || { home: 0, away: 0 };
            const pts = pointsFor(m, pick);
            const result = matchResults[m.matchNumber];
            const hHome = haitiIsHome(m);

            return (
              <div key={m.matchNumber} className="bg-white border border-line rounded-2xl overflow-hidden">
                {/* Card head */}
                <div className="flex items-center justify-between px-5 pt-4 pb-3 border-b border-line">
                  <p className="text-xs uppercase tracking-wider font-bold text-muted">{m.date} · {m.timeET}</p>
                  {locked ? (
                    <span className="text-[10px] uppercase tracking-wider font-bold text-haiti-red bg-red-50 px-2 py-0.5 rounded-full">{t("pwonostik.locked")}</span>
                  ) : (
                    <span className="text-[10px] uppercase tracking-wider font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">{t("pwonostik.open")}</span>
                  )}
                </div>

                {/* Predictor row */}
                <div className="grid grid-cols-[1fr_auto_1fr] items-start gap-3 px-5 py-6">
                  <SideStepper
                    country={m.home.country}
                    name={m.home.name}
                    highlight={m.home.country === "haiti"}
                    value={pick.home}
                    locked={locked}
                    onBump={(d) => bump(m.matchNumber, "home", d)}
                  />
                  <div className="pt-7 text-muted font-display text-xl">–</div>
                  <SideStepper
                    country={m.away.country}
                    name={m.away.name}
                    highlight={m.away.country === "haiti"}
                    value={pick.away}
                    locked={locked}
                    onBump={(d) => bump(m.matchNumber, "away", d)}
                  />
                </div>

                {/* Result + points (after the match) */}
                {result && (
                  <div className="px-5 pb-5">
                    <div className="flex items-center justify-between bg-surface rounded-xl px-4 py-3">
                      <span className="text-sm text-muted">
                        {t("pwonostik.resultLabel")}&nbsp;
                        <span className="text-ink font-semibold">
                          {hHome ? result.haiti : result.opp}–{hHome ? result.opp : result.haiti}
                        </span>
                      </span>
                      <span className={`text-sm font-bold ${pts === 3 ? "text-emerald-600" : pts === 1 ? "text-gold" : "text-muted"}`}>
                        {pts === 3 ? t("pwonostik.exactScore") : pts === 1 ? t("pwonostik.rightResult") : t("pwonostik.zeroPt")}
                      </span>
                    </div>
                  </div>
                )}

                {/* Venue footnote */}
                <div className="px-5 pb-4 -mt-1">
                  <p className="text-[11px] text-muted/80 leading-snug">
                    {m.stadium.fifaName} · {m.diaspora}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Actions */}
        <div className="space-y-3 mt-8">
          <button
            onClick={save}
            className="w-full bg-haiti-blue text-bg rounded-xl p-4 font-display text-lg hover:bg-haiti-blue-dark transition-colors"
          >
            {saved ? t("pwonostik.saved") : t("pwonostik.save")}
          </button>
          <button
            onClick={() => setShowShare(true)}
            disabled={!allFilled}
            className={`w-full rounded-xl p-4 font-display text-lg transition-colors ${
              allFilled ? "bg-haiti-red text-bg hover:bg-red-700" : "bg-surface text-muted/70"
            }`}
          >
            {t("pwonostik.share")} →
          </button>
        </div>

        {/* Leaderboard */}
        {backendReady ? (
          <Leaderboard
            scope={boardScope}
            onScope={switchScope}
            rows={board}
            loading={loadingBoard}
            hasLeague={Boolean(league.trim())}
            anyResult={anyResult}
          />
        ) : (
          <div className="mt-10 bg-surface border border-line rounded-2xl p-6 text-center">
            <p className="text-xs uppercase tracking-wider font-bold text-muted mb-1">{t("pwonostik.leaderboard")}</p>
            <p className="text-ink font-display text-xl mb-1">{t("jeux.soon")}</p>
            <p className="text-muted text-sm leading-relaxed">
              {t("pwonostik.leaderboardSoon")}
            </p>
          </div>
        )}
      </div>

      {showShare && allFilled && (
        <PwonostikShareCard predictions={predictions} onClose={() => setShowShare(false)} />
      )}
    </div>
  );
}

// ─── Leaderboard ─────────────────────────────────────────────────────
function Leaderboard({ scope, onScope, rows, loading, hasLeague, anyResult }) {
  const { t } = useT();
  const ranked = (rows || [])
    .map((r) => ({ ...r, pts: sumPoints(r.picks) }))
    .sort((a, b) => b.pts - a.pts || new Date(b.updated_at) - new Date(a.updated_at))
    .slice(0, 50);

  return (
    <div className="mt-12">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-display text-2xl text-ink">{t("pwonostik.leaderboard")}</h2>
        <div className="flex gap-1 bg-surface rounded-full p-1">
          <button
            onClick={() => onScope("global")}
            className={`px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-colors ${scope === "global" ? "bg-haiti-blue text-bg" : "text-muted"}`}
          >
            {t("pwonostik.global")}
          </button>
          <button
            onClick={() => onScope("league")}
            disabled={!hasLeague}
            className={`px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-colors ${scope === "league" ? "bg-haiti-blue text-bg" : "text-muted"} ${!hasLeague ? "opacity-40 cursor-not-allowed" : ""}`}
          >
            {t("pwonostik.myLeague")}
          </button>
        </div>
      </div>

      {loading ? (
        <p className="text-muted text-sm py-8 text-center">{t("common.loading")}</p>
      ) : ranked.length === 0 ? (
        <p className="text-muted text-sm py-8 text-center">
          {scope === "league"
            ? t("pwonostik.emptyLeague")
            : t("pwonostik.emptyGlobal")}
        </p>
      ) : (
        <>
          {!anyResult && (
            <p className="text-muted text-sm mb-4 leading-relaxed">
              {ranked.length > 1
                ? t("pwonostik.boardCountPlural").replace("{n}", ranked.length)
                : t("pwonostik.boardCountSingular").replace("{n}", ranked.length)}
            </p>
          )}
          <ol className="space-y-1.5">
            {ranked.map((r, i) => (
              <li key={i} className="flex items-center gap-3 bg-white border border-line rounded-xl px-4 py-3">
                <span className={`font-display text-lg w-7 text-center shrink-0 ${i === 0 ? "text-gold" : i < 3 ? "text-haiti-blue" : "text-muted"}`}>
                  {i + 1}
                </span>
                <span className="flex-1 text-ink font-medium truncate">{r.name}</span>
                {anyResult && (
                  <span className="font-display text-lg text-haiti-blue tabular-nums shrink-0">
                    {r.pts} <span className="text-xs text-muted">pts</span>
                  </span>
                )}
              </li>
            ))}
          </ol>
        </>
      )}
    </div>
  );
}
function SideStepper({ country, name, highlight, value, locked, onBump }) {
  const { t } = useT();
  return (
    <div className="flex flex-col items-center text-center gap-2">
      <Flag country={country} size="lg" />
      <p className={`font-display text-sm uppercase tracking-tight leading-tight ${highlight ? "text-haiti-blue" : "text-ink"}`}>
        {name}
      </p>
      <div className="flex items-center gap-2 mt-1">
        <button
          onClick={() => onBump(-1)}
          disabled={locked || value <= 0}
          aria-label={t("pwonostik.minusGoalAria").replace("{name}", name)}
          className="w-9 h-9 rounded-full border border-line text-ink text-xl leading-none flex items-center justify-center disabled:opacity-30 hover:border-haiti-blue transition-colors"
        >
          −
        </button>
        <span className="font-display text-3xl text-ink tabular-nums w-8">{value}</span>
        <button
          onClick={() => onBump(1)}
          disabled={locked || value >= 9}
          aria-label={t("pwonostik.plusGoalAria").replace("{name}", name)}
          className="w-9 h-9 rounded-full border border-line text-ink text-xl leading-none flex items-center justify-center disabled:opacity-30 hover:border-haiti-blue transition-colors"
        >
          +
        </button>
      </div>
    </div>
  );
}
