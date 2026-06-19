import { useEffect, useMemo, useState } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Flag } from "../components/Flag";
import { fadeUp, stagger } from "../lib/motion";
import { getMatch } from "../data/liveMatches";
import CountdownClock from "../components/CountdownClock";
import Wc26Mark from "../components/Wc26Mark";
import MatchSectionHead from "../components/MatchSectionHead";
import StadiumWeather from "../components/StadiumWeather";
import GroupCTable from "../components/GroupCTable";
import { useLiveFixtures } from "../lib/useLiveFixtures";
import { fetchFixtureByOpponent, fetchMatchPlayers, getOpponentScouting, isLive } from "../lib/fixturesApi";
import ScoutingSection from "../components/ScoutingSection";
import PlayerMatchStatsCard, { PlayerStatsContext, PlayerName } from "../components/PlayerMatchStatsCard";

const HAITI_TEAM_ID = 2386;

// ╔═══════════════════════════════════════════════════════════════════════╗
// ║  LIVE MATCH CENTER · /live/:slug                                       ║
// ║                                                                        ║
// ║  One page per Haiti match. Updates manually during the game by         ║
// ║  editing src/data/liveMatches.js and redeploying.                      ║
// ║                                                                        ║
// ║  Before kickoff: countdown + lineups + how-to-watch                    ║
// ║  During the match: live score + timeline of events                     ║
// ║  After the match: final score + timeline + post-match reaction        ║
// ╚═══════════════════════════════════════════════════════════════════════╝

export default function Live() {
  const { slug } = useParams();
  const match = getMatch(slug);
  if (!match) return <Navigate to="/matches" replace />;

  return <LiveMatchView match={match} />;
}

function LiveMatchView({ match }) {
  const { status, haitiScore, opponentScore, minute, opponent, group, dateLabel, timeLabel, stadium, timeline, kickoff, broadcast } = match;

  // Auto-refresh once a minute so people can leave the page open
  const [, setTick] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 60_000);
    return () => clearInterval(id);
  }, []);

  // Live data from the data provider (same source as /matches). Drives the live
  // switch at kickoff and Haiti's recent form, without touching manual fields.
  const { byOpponent, standings } = useLiveFixtures();
  const live = byOpponent[opponent.country] || null;
  const liveActive = Boolean(live && (live.isLive || live.isFinished));

  // Effective state: API live/final overrides the manual "scheduled" default.
  const effStatus = live?.isLive ? "live" : live?.isFinished ? "ft" : status;
  const effHaiti = liveActive ? live.haitiGoals : haitiScore;
  const effOpp = liveActive ? live.oppGoals : opponentScore;
  const effMinute = live?.isLive ? live.elapsed : minute;

  // Haiti's recent form (last 5 finished results), derived from the API data.
  const recentForm = Object.values(byOpponent)
    .filter((f) => f.isFinished && f.kickoff)
    .sort((a, b) => new Date(b.kickoff) - new Date(a.kickoff))
    .slice(0, 5);

  // Full match detail (events / lineups / statistics) for this opponent.
  const [detail, setDetail] = useState(null);
  useEffect(() => {
    let alive = true;
    let timer = null;
    async function load() {
      const d = await fetchFixtureByOpponent(opponent.country);
      if (!alive) return;
      setDetail(d);
      if (d && isLive(d.status_short)) timer = setTimeout(load, 45000);
    }
    load();
    return () => {
      alive = false;
      if (timer) clearTimeout(timer);
    };
  }, [opponent.country]);

  // Scouting avant-match (H2H + forme de l'adversaire) via la fonction edge
  // publique wc-h2h. Identifiant adversaire dérivé du match chargé (detail) ;
  // requête uniquement en pré-match. Masqué dès que le match est lancé/terminé.
  const oppId = detail ? (detail.home_id === HAITI_TEAM_ID ? detail.away_id : detail.home_id) : null;
  const isPreMatch = effStatus === "scheduled";
  const [scouting, setScouting] = useState(null);
  useEffect(() => {
    if (!isPreMatch || !oppId) {
      setScouting(null);
      return;
    }
    let alive = true;
    (async () => {
      const d = await getOpponentScouting(oppId);
      if (alive) setScouting(d);
    })();
    return () => {
      alive = false;
    };
  }, [oppId, isPreMatch]);

  // Per-player match stats (wc-match-players). Loaded once per fixture, and
  // refreshed whenever `detail` reloads while live, cached in a Map so each card
  // opens from memory with no per-click network call.
  const [matchPlayers, setMatchPlayers] = useState(null);
  const [selectedPlayerId, setSelectedPlayerId] = useState(null);
  useEffect(() => {
    const fid = detail?.fixture_id;
    if (!fid) return;
    let alive = true;
    (async () => {
      const d = await fetchMatchPlayers(fid);
      if (alive) setMatchPlayers(d);
    })();
    return () => {
      alive = false;
    };
  }, [detail?.fixture_id, detail?.updated_at]);

  const playersAvailable = matchPlayers?.available === true;
  const playersById = useMemo(() => {
    const m = new Map();
    const all = matchPlayers?.players
      ? [...(matchPlayers.players.home || []), ...(matchPlayers.players.away || [])]
      : [];
    all.forEach((p) => {
      if (p?.id != null) m.set(p.id, p);
    });
    return m;
  }, [matchPlayers]);
  // Only clickable when stats exist (no dead UI pre-match).
  const openPlayer = playersAvailable ? (id) => setSelectedPlayerId(id) : null;
  const selectedPlayer = selectedPlayerId != null ? playersById.get(selectedPlayerId) : null;

  const apiEvents = Array.isArray(detail?.events) ? detail.events : [];
  const lineups = Array.isArray(detail?.lineups) ? detail.lineups : [];
  const stats = Array.isArray(detail?.statistics) ? detail.statistics : [];

  // Scorers (under the header) + Haiti-first orientation for stats/lineups.
  const scorers = Array.isArray(detail?.scorers) ? detail.scorers : [];
  const haitiScorers = scorers.filter((s) => s.team === "haiti");
  const oppScorers = scorers.filter((s) => s.team === "opp");
  const haitiStats = stats.find((s) => s.team?.id === HAITI_TEAM_ID) || stats[0];
  const oppStats = stats.find((s) => s.team?.id !== HAITI_TEAM_ID) || stats[1];
  const haitiLineup = lineups.find((l) => l.team?.id === HAITI_TEAM_ID) || lineups[0];
  const oppLineup = lineups.find((l) => l.team?.id !== HAITI_TEAM_ID) || lineups[1];

  // Per-player stats (ratings table + badges on the pitch).
  const playersRaw = Array.isArray(detail?.players) ? detail.players : [];
  const haitiPlayers = playersRaw.find((t) => t.team?.id === HAITI_TEAM_ID)?.players || [];
  const oppPlayers = playersRaw.find((t) => t.team?.id !== HAITI_TEAM_ID)?.players || [];
  const ratingById = {};
  const pstatById = {};
  playersRaw.forEach((t) =>
    (t.players || []).forEach((p) => {
      const st = p.statistics?.[0] || {};
      const id = p.player?.id;
      if (id == null) return;
      const rating = st.games?.rating != null ? parseFloat(st.games.rating) : null;
      if (rating != null) ratingById[id] = rating;
      pstatById[id] = {
        rating,
        minutes: st.games?.minutes ?? 0,
        yellow: st.cards?.yellow ?? 0,
        red: st.cards?.red ?? 0,
      };
    }),
  );
  // Minute of each substitution (maps the player on AND off to the event minute).
  const subMinById = {};
  apiEvents
    .filter((e) => e.type === "subst")
    .forEach((e) => {
      const m = e.time?.elapsed;
      if (e.player?.id != null) subMinById[e.player.id] = m;
      if (e.assist?.id != null) subMinById[e.assist.id] = m;
    });
  const hasPlayerStats = haitiPlayers.length > 0 || oppPlayers.length > 0;

  // Tabs for the rich match data (only the sections that have data).
  const detailTabs = [];
  if (apiEvents.length > 0) detailTabs.push({ id: "chronologie", label: "Chronologie" });
  if (lineups.length === 2) detailTabs.push({ id: "compositions", label: "Compositions" });
  if (stats.length === 2) detailTabs.push({ id: "statistiques", label: "Statistiques" });
  if (hasPlayerStats) detailTabs.push({ id: "joueurs", label: "Joueurs" });
  const [detailTab, setDetailTab] = useState("chronologie");
  const activeDetailTab = detailTabs.some((t) => t.id === detailTab)
    ? detailTab
    : detailTabs[0]?.id;

  return (
    <PlayerStatsContext.Provider value={openPlayer}>
    <div>
      {/* Live header banner · 2026 broadcast system, Haiti colorway */}
      <header className="relative overflow-hidden bg-ink-deep text-bg">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(120% 90% at 85% 8%, rgba(0,32,159,.45), transparent 60%), radial-gradient(85% 75% at 0% 100%, rgba(210,16,52,.28), transparent 55%)",
          }}
        />
        {/* Structural "26" device, bleeding off the right edge, masked to fade. */}
        <div
          className="pointer-events-none absolute -right-4 -top-3 w-[58%] max-w-[440px] opacity-[0.16] md:opacity-25"
          style={{
            maskImage: "linear-gradient(to left, #000 35%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(to left, #000 35%, transparent 100%)",
          }}
        >
          <Wc26Mark className="w-full h-auto" />
        </div>

        <div className="relative max-w-content mx-auto px-5 py-8 md:py-12">
          <div className="flex items-center justify-between mb-7">
            <Link to="/matches" className="font-cond text-xs uppercase tracking-[0.18em] font-semibold text-bg/70 hover:text-bg transition-colors">
              ← Tous les matchs
            </Link>
            <StatusBadge status={effStatus} minute={effMinute} />
          </div>

          {/* Competition labels */}
          <p className="font-cond text-gold text-xs md:text-sm uppercase tracking-[0.28em] font-semibold">
            Coupe du Monde FIFA 2026
          </p>
          <div className="mt-2 mb-7 flex items-center gap-3">
            <span className="flag-rule w-10 rounded-full" />
            <p className="font-cond text-bg/70 text-xs uppercase tracking-[0.2em] font-medium">
              {group}{match.matchNumber != null ? ` · Match ${match.matchNumber}` : ""}
            </p>
          </div>

          {/* Score line · teams left/right, score centered (mobile-friendly) */}
          <div className="grid grid-cols-3 items-center gap-2 md:gap-6 mb-3">
            <TeamHead name="Haïti" country="haiti" logo={live?.haitiLogo} />
            <div className="text-center">
              {effStatus === "scheduled" ? (
                <p className="font-block text-3xl md:text-5xl text-bg/40 leading-none">VS</p>
              ) : (
                <p className="font-block text-6xl md:text-8xl tabular-nums leading-none">
                  {effHaiti}
                  <span className="text-gold mx-1.5 md:mx-3">:</span>
                  {effOpp}
                </p>
              )}
            </div>
            <TeamHead name={opponent.name} country={opponent.country} logo={live?.oppLogo} />
          </div>

          {scorers.length > 0 && (
            <div className="grid grid-cols-3 gap-2 md:gap-6 mb-6 text-bg/70 text-[11px] md:text-sm">
              <div className="text-right space-y-0.5">
                {haitiScorers.map((s, i) => (
                  <p key={i}>
                    {scorerLine(s)} <span className="text-gold">⚽</span>
                  </p>
                ))}
              </div>
              <div />
              <div className="text-left space-y-0.5">
                {oppScorers.map((s, i) => (
                  <p key={i}>
                    <span className="text-gold">⚽</span> {scorerLine(s)}
                  </p>
                ))}
              </div>
            </div>
          )}

          <p className="mt-6 text-center font-cond text-bg/55 text-xs md:text-sm uppercase tracking-[0.18em]">
            {dateLabel} · {timeLabel}
          </p>

          {effStatus === "scheduled" && (
            <div className="mt-7 pt-6 border-t border-bg/10">
              <p className="font-cond text-gold/90 text-xs uppercase tracking-[0.22em] font-semibold mb-3 text-center">
                Coup d'envoi dans
              </p>
              <div className="flex justify-center">
                <CountdownClock target={kickoff} />
              </div>
            </div>
          )}

          {match.access && (
            <p className="text-center text-bg/50 text-sm mt-4">
              <span className="font-cond uppercase tracking-wider text-bg/40 text-xs">Accès :</span> {match.access}
            </p>
          )}

          {broadcast && (
            <p className="text-center text-bg/50 text-sm mt-6">
              <span className="font-cond uppercase tracking-wider text-bg/40 text-xs">Diffusion :</span> {broadcast}
            </p>
          )}

          {match.journal && (
            <p className="text-center text-sm mt-6">
              <Link
                to={match.journal}
                className="font-cond text-gold font-semibold uppercase tracking-[0.18em] text-xs hover:text-bg transition-colors"
              >
                Lire le résumé du match →
              </Link>
            </p>
          )}
        </div>
      </header>

      {/* Stade strip (moved up from the sidebar) */}
      <div className="border-b border-line bg-white">
        <div className="max-w-content mx-auto px-5 py-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
          <span className="text-haiti-red text-[11px] uppercase tracking-wider font-bold">Stade</span>
          <span className="text-ink font-semibold">{stadium.fifaName}</span>
          {stadium.city && <span className="text-muted">· {stadium.city}</span>}
          {stadium.capacity && (
            <span className="text-muted">· {stadium.capacity.toLocaleString()} places</span>
          )}
          {stadium.surface && <span className="text-muted">· {stadium.surface}</span>}
          {stadium.lat && stadium.lng && (
            <span className="md:ml-auto">
              <StadiumWeather
                lat={stadium.lat}
                lng={stadium.lng}
                city={stadium.city.split(",")[0]}
                compact
              />
            </span>
          )}
        </div>
      </div>

      <div className="max-w-content mx-auto px-5 py-8 md:py-12 space-y-12">
        {/* Rich match data (tabbed) · or pre-match / manual fallback */}
        <section>
          {detailTabs.length > 0 ? (
            <>
              <div className="mb-7 flex w-max max-w-full gap-1 overflow-x-auto rounded-full border border-line bg-bg p-1">
                {detailTabs.map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setDetailTab(t.id)}
                    aria-selected={activeDetailTab === t.id}
                    className={`shrink-0 rounded-full px-4 py-1.5 font-cond text-sm font-semibold uppercase tracking-[0.12em] transition-colors ${
                      activeDetailTab === t.id
                        ? "bg-ink text-bg"
                        : "text-muted hover:text-ink"
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
              {activeDetailTab === "chronologie" && <ApiTimeline events={apiEvents} />}
              {activeDetailTab === "compositions" && (
                <Lineups
                  haiti={haitiLineup}
                  opp={oppLineup}
                  oppName={opponent.name}
                  ratingById={ratingById}
                  pstatById={pstatById}
                  subMinById={subMinById}
                />
              )}
              {activeDetailTab === "statistiques" && (
                <StatBars haiti={haitiStats} opp={oppStats} oppName={opponent.name} />
              )}
              {activeDetailTab === "joueurs" && (
                <PlayerStats haiti={haitiPlayers} opp={oppPlayers} oppName={opponent.name} />
              )}
            </>
          ) : (
            <>
              <MatchSectionHead>
                {effStatus === "scheduled" ? "Avant le match" : "Mises à jour en direct"}
              </MatchSectionHead>
              {effStatus === "scheduled" ? (
                <div className="space-y-8">
                  <p className="text-ink/80 leading-relaxed">
                    Dès le coup d'envoi, cette page se remplit automatiquement : la{" "}
                    <strong>chronologie</strong> des buts et cartons, les{" "}
                    <strong>compositions</strong> avec les notes des joueurs, les{" "}
                    <strong>statistiques</strong> comparées et les{" "}
                    <strong>notes individuelles</strong>. Inutile de rafraîchir, tout
                    apparaît en direct.
                  </p>
                  {group === "Groupe C" && (
                    <GroupCTable
                      standings={standings}
                      title="Classement · Groupe C"
                      subtitle="Avant le match · actualisé automatiquement"
                      footnote={false}
                    />
                  )}
                </div>
              ) : timeline.length === 0 ? (
                <div className="bg-bg border border-line rounded-lg p-6 text-muted text-center">
                  {effStatus === "ft"
                    ? "Match terminé. Le score final est affiché ci-dessus."
                    : "Le match a commencé. Le score est mis à jour automatiquement ci-dessus."}
                </div>
              ) : (
                <motion.ol
                  className="space-y-3"
                  variants={stagger(0.04)}
                  initial="hidden"
                  animate="show"
                >
                  {[...timeline].reverse().map((event, i) => (
                    <TimelineEvent key={i} event={event} match={match} />
                  ))}
                </motion.ol>
              )}
            </>
          )}
        </section>

        {/* Scouting adversaire · avant-match uniquement (masqué dès le coup d'envoi) */}
        {isPreMatch && scouting && <ScoutingSection data={scouting} />}

        {/* Recent form */}
        {recentForm.length > 0 && (
          <section>
            <MatchSectionHead>Forme récente · Haïti</MatchSectionHead>
            <div className="flex flex-wrap items-stretch gap-3">
              {recentForm.map((f, i) => (
                <FormChip key={i} fixture={f} />
              ))}
            </div>
          </section>
        )}

        {/* Other matches */}
        <section>
          <MatchSectionHead>Autres matchs</MatchSectionHead>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {["scotland", "brazil", "morocco"]
              .filter((s) => s !== match.slug)
              .map((s) => {
                const m = getMatch(s);
                return (
                  <Link
                    key={s}
                    to={`/live/${s}`}
                    className="flex items-center gap-4 bg-white border border-line rounded-lg p-4 hover:border-haiti-red hover:shadow-md transition-all"
                  >
                    <Flag country={s} size="lg" />
                    <div className="min-w-0">
                      <p className="font-display text-base md:text-lg truncate">Haïti · {m.opponent.name}</p>
                      <p className="text-muted text-sm">{m.dateLabel.replace(" 2026", "")}</p>
                    </div>
                  </Link>
                );
              })}
          </div>
        </section>
      </div>
    </div>
    {selectedPlayer && (
      <PlayerMatchStatsCard player={selectedPlayer} onClose={() => setSelectedPlayerId(null)} />
    )}
    </PlayerStatsContext.Provider>
  );
}

// ─── Sub-components ───────────────────────────────────────────────────

function StatusBadge({ status, minute }) {
  if (status === "live") {
    return (
      <span className="inline-flex items-center gap-2 px-3 py-1 bg-haiti-red text-bg text-xs font-bold uppercase tracking-wider rounded-full">
        <motion.span
          className="w-2 h-2 bg-bg rounded-full"
          animate={{ opacity: [1, 0.3, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
        En direct {minute ? `· ${minute}'` : ""}
      </span>
    );
  }
  if (status === "ht") {
    return <span className="inline-flex items-center gap-2 px-3 py-1 bg-gold text-ink text-xs font-bold uppercase tracking-wider rounded-full">Mi-temps</span>;
  }
  if (status === "ft") {
    return <span className="inline-flex items-center gap-2 px-3 py-1 bg-ink/60 text-bg text-xs font-bold uppercase tracking-wider rounded-full">Fin de match</span>;
  }
  return <span className="inline-flex items-center gap-2 px-3 py-1 bg-bg/15 text-bg text-xs font-bold uppercase tracking-wider rounded-full">À venir</span>;
}

// Country flag when we have one, otherwise the API team crest (logo).
const KNOWN_FLAGS = new Set(["haiti", "scotland", "brazil", "morocco", "peru"]);
function TeamCrest({ country, logo }) {
  if (KNOWN_FLAGS.has(country)) return <Flag country={country} size="responsive" />;
  if (logo) {
    return (
      <div className="w-12 h-12 md:w-16 md:h-16 flex items-center justify-center shrink-0">
        <img src={logo} alt="" loading="lazy" className="max-h-full max-w-full object-contain" />
      </div>
    );
  }
  return null;
}

// Stacked team header (crest on top, name below) · fits narrow screens.
function TeamHead({ name, country, logo }) {
  return (
    <div className="flex flex-col items-center text-center gap-2.5 min-w-0">
      <TeamCrest country={country} logo={logo} />
      <p className="font-cond text-base md:text-3xl font-bold uppercase tracking-tight leading-none break-words">
        {name}
      </p>
    </div>
  );
}

function TimelineEvent({ event, match }) {
  const { type, minute, side, scorer, player, on, off, text, note } = event;
  const sideName = side === "haiti" ? "Haïti" : match.opponent.name;

  const icons = {
    goal: "⚽",
    yellow: "🟨",
    red: "🟥",
    sub: "🔄",
    kickoff: "▶︎",
    ht: "·",
    ft: "·",
    note: "•",
  };

  return (
    <motion.li
      variants={fadeUp}
      className={`p-4 rounded-lg border ${side === "haiti" ? "bg-haiti-blue/5 border-haiti-blue/20" : type === "ht" || type === "ft" || type === "kickoff" || type === "note" ? "bg-bg border-line" : "bg-line/30 border-line"}`}
    >
      <div className="flex items-baseline gap-3">
        {minute != null && (
          <span className="font-display text-haiti-red text-sm tabular-nums w-10 flex-shrink-0">{minute}'</span>
        )}
        <span className="text-lg flex-shrink-0">{icons[type] || "•"}</span>
        <div className="flex-1 min-w-0">
          {type === "goal" && (
            <p className="text-ink"><strong className="font-display">BUT · {sideName}</strong> {scorer}{note ? ` · ${note}` : ""}</p>
          )}
          {(type === "yellow" || type === "red") && (
            <p className="text-ink"><strong>{type === "yellow" ? "Carton jaune" : "Carton rouge"} · {sideName}</strong> · {player}{note ? `. ${note}` : ""}</p>
          )}
          {type === "sub" && (
            <p className="text-ink"><strong>Changement · {sideName}</strong> entrée de {on}, sortie de {off}</p>
          )}
          {(type === "ht" || type === "ft" || type === "kickoff" || type === "note") && (
            <p className="text-ink italic">{text}</p>
          )}
        </div>
      </div>
    </motion.li>
  );
}

// Noms FR des adversaires récents (l'API renvoie l'anglais).
const FORM_FR = {
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
const frFormName = (n) => FORM_FR[n?.toLowerCase()] || n;

// Forme récente · carte : bande de résultat, logo, NOM de l'adversaire, score, résultat.
function FormChip({ fixture }) {
  const { haitiGoals, oppGoals, oppName, oppLogo } = fixture;
  const win = haitiGoals > oppGoals;
  const draw = haitiGoals === oppGoals;
  const word = win ? "Victoire" : draw ? "Nul" : "Défaite";
  const strip = win ? "bg-haiti-blue" : draw ? "bg-gold" : "bg-haiti-red";
  const text = win ? "text-haiti-blue" : draw ? "text-muted" : "text-haiti-red";
  return (
    <div
      className="w-28 sm:w-32 flex-shrink-0 bg-white border border-line rounded-lg overflow-hidden text-center"
      title={`Haïti ${haitiGoals}–${oppGoals} ${frFormName(oppName)}`}
    >
      <div className={`h-1.5 ${strip}`} />
      <div className="p-3 flex flex-col items-center gap-1.5">
        {oppLogo ? (
          <img src={oppLogo} alt="" loading="lazy" className="w-9 h-9 object-contain" />
        ) : (
          <span className="w-9 h-9" />
        )}
        <span className="text-[11px] text-ink leading-tight line-clamp-2 min-h-[1.6rem] flex items-center">
          {frFormName(oppName)}
        </span>
        <span className="font-display text-lg tabular-nums leading-none">
          {haitiGoals}
          <span className="text-ink/30">&ndash;</span>
          {oppGoals}
        </span>
        <span className={`text-[10px] font-bold uppercase tracking-wide ${text}`}>{word}</span>
      </div>
    </div>
  );
}

// ─── Données API du match : chronologie, compositions, statistiques ───

function eventIcon(e) {
  if (e.type === "Goal") return "⚽";
  if (e.type === "Card") return e.detail?.includes("Red") ? "🟥" : "🟨";
  if (e.type === "subst") return "🔄";
  if (e.type === "Var") return "📺";
  return "•";
}

function ApiTimeline({ events }) {
  const sorted = [...events].sort(
    (a, b) =>
      (a.time?.elapsed ?? 0) + (a.time?.extra ?? 0) -
      ((b.time?.elapsed ?? 0) + (b.time?.extra ?? 0)),
  );
  return (
    <motion.ol className="space-y-2.5" variants={stagger(0.03)} initial="hidden" animate="show">
      {sorted.map((e, i) => (
        <ApiEvent key={i} e={e} />
      ))}
    </motion.ol>
  );
}

function ApiEvent({ e }) {
  const haiti = e.team?.id === HAITI_TEAM_ID;
  const minute =
    e.time?.elapsed != null
      ? `${e.time.elapsed}${e.time.extra ? `+${e.time.extra}` : ""}'`
      : "";
  let label;
  if (e.type === "Goal") {
    const tag = e.detail === "Penalty" ? " (pén.)" : e.detail === "Own Goal" ? " (csc)" : "";
    label = (
      <>
        <strong className="font-display">But</strong> · <PlayerName id={e.player?.id} name={e.player?.name} />
        {tag}
        {e.assist?.name ? <span className="text-muted"> (passe : <PlayerName id={e.assist?.id} name={e.assist.name} className="text-muted" />)</span> : null}
      </>
    );
  } else if (e.type === "Card") {
    label = (
      <>
        <strong>{e.detail?.includes("Red") ? "Carton rouge" : "Carton jaune"}</strong> · <PlayerName id={e.player?.id} name={e.player?.name} />
      </>
    );
  } else if (e.type === "subst") {
    label = (
      <>
        <strong>Changement</strong> · <PlayerName id={e.player?.id} name={e.player?.name} />
        {e.assist?.name ? <> ↔ <PlayerName id={e.assist?.id} name={e.assist.name} /></> : null}
      </>
    );
  } else {
    label = (
      <>
        {e.detail || e.type} · <PlayerName id={e.player?.id} name={e.player?.name} />
      </>
    );
  }
  return (
    <motion.li
      variants={fadeUp}
      className={`p-3 rounded-lg border flex items-baseline gap-3 ${
        haiti ? "bg-haiti-blue/5 border-haiti-blue/20" : "bg-bg border-line"
      }`}
    >
      <span className="font-display text-haiti-red text-sm tabular-nums w-10 flex-shrink-0">{minute}</span>
      <span className="text-lg flex-shrink-0">{eventIcon(e)}</span>
      <span className="text-ink text-sm flex-1 min-w-0">{label}</span>
    </motion.li>
  );
}

const lastName = (name) => (name || "").split(" ").slice(-1)[0];

// Positions (in %) for one team's starting XI from API grid "row:col".
// Haiti on the left half, opponent on the right half.
function teamDots(lineup, side) {
  const xi = lineup?.startXI || [];
  const rows = {};
  xi.forEach(({ player }) => {
    const r = Number((player?.grid || "1:1").split(":")[0]) || 1;
    (rows[r] = rows[r] || []).push(player);
  });
  const rowNums = Object.keys(rows).map(Number).sort((a, b) => a - b);
  const maxRow = Math.max(...rowNums, 1);
  const dots = [];
  rowNums.forEach((r) => {
    const players = rows[r].sort(
      (a, b) =>
        Number((a?.grid || "0:0").split(":")[1]) - Number((b?.grid || "0:0").split(":")[1]),
    );
    const n = players.length;
    const f = maxRow > 1 ? (r - 1) / (maxRow - 1) : 0; // 0 = GK, 1 = attack
    players.forEach((player, idx) => {
      const spread = ((idx + 1) / (n + 1)) * 100; // position within the row
      if (side === "vertical") {
        // Portrait, single team attacking UP: GK at his own goal (bottom),
        // forwards stop in front of the attacking box (not inside the net).
        dots.push({ player, x: spread, y: 88 - f * 70 });
      } else {
        // Two teams packed onto one landscape field (left / right halves).
        const x = side === "left" ? 6 + f * 40 : 100 - (6 + f * 40);
        dots.push({ player, x, y: spread });
      }
    });
  });
  return dots;
}

const playerPhoto = (id) =>
  id ? `https://media.api-sports.io/football/players/${id}.png` : null;

// Small round player headshot with graceful fallback.
function PlayerAvatar({ id, className = "w-5 h-5" }) {
  const [err, setErr] = useState(false);
  const photo = playerPhoto(id);
  return (
    <span className={`${className} rounded-full overflow-hidden bg-line inline-flex flex-shrink-0`}>
      {photo && !err && (
        <img src={photo} alt="" loading="lazy" onError={() => setErr(true)} className="w-full h-full object-cover" />
      )}
    </span>
  );
}

// Rating badge colour by value (FotMob-style).
function ratingColor(r) {
  if (r >= 7.5) return "bg-green-600 text-bg";
  if (r >= 7) return "bg-green-500 text-bg";
  if (r >= 6) return "bg-gold text-ink";
  return "bg-haiti-red text-bg";
}
function RatingBadge({ rating, className = "" }) {
  if (rating == null || Number.isNaN(rating)) return null;
  return (
    <span className={`inline-flex items-center justify-center rounded text-[10px] font-bold tabular-nums px-1 ${ratingColor(rating)} ${className}`}>
      {rating.toFixed(1)}
    </span>
  );
}

function PitchPlayer({ player, x, y, color, rating, offMinute }) {
  const [err, setErr] = useState(false);
  const photo = playerPhoto(player?.id);
  return (
    <div
      className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center"
      style={{ left: `${x}%`, top: `${y}%` }}
    >
      {/* relative wrapper is NOT clipped, so badges stay visible outside the circle */}
      <span className="relative inline-block">
        <span className={`block w-8 h-8 md:w-11 md:h-11 rounded-full overflow-hidden ring-2 ring-white/80 shadow flex items-center justify-center text-[10px] md:text-sm font-bold text-bg ${color}`}>
          {photo && !err ? (
            <img src={photo} alt="" loading="lazy" onError={() => setErr(true)} className="w-full h-full object-cover" />
          ) : (
            player?.number
          )}
        </span>
        {rating != null && (
          <span className={`absolute -bottom-1 -right-1 z-10 rounded text-[8px] md:text-[9px] font-bold leading-none px-0.5 py-px shadow ${ratingColor(rating)}`}>
            {rating.toFixed(1)}
          </span>
        )}
        {offMinute != null && (
          <span className="absolute -top-1 -left-1 z-10 rounded bg-ink/90 text-bg text-[8px] md:text-[9px] font-bold leading-none px-0.5 py-px shadow">
            {offMinute}'↓
          </span>
        )}
      </span>
      <span className="text-[9px] md:text-xs text-white mt-1 max-w-[4.5rem] md:max-w-[5.5rem] truncate drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
        {player?.number} <PlayerName id={player?.id} name={lastName(player?.name)} />
      </span>
    </div>
  );
}

// One team on a portrait pitch, attacking upward · the keeper sits in his own
// goal (bottom), the team spreads over its own half and into midfield, forwards
// stop in front of the attacking box. Roomy on mobile, football-correct.
function SingleTeamPitch({ lineup, color, ratingById, subMinById }) {
  return (
    <div className="relative mx-auto w-full max-w-sm sm:max-w-md aspect-[68/100] overflow-hidden rounded-lg bg-gradient-to-b from-green-600 to-green-700">
      {/* outer line + halfway line + center circle */}
      <div className="absolute inset-2 rounded-sm border border-white/25" />
      <div className="absolute inset-x-2 top-1/2 h-px bg-white/25" />
      <div className="absolute left-1/2 top-1/2 h-20 w-20 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/25" />
      {/* attacking goal (top): penalty box + goal mouth */}
      <div className="absolute left-1/2 top-2 h-[15%] w-1/2 -translate-x-1/2 rounded-b-sm border-x border-b border-white/25" />
      <div className="absolute left-1/2 top-2 h-[6%] w-1/4 -translate-x-1/2 rounded-b-sm border-x border-b border-white/25" />
      <div className="absolute left-1/2 top-1 h-1.5 w-14 -translate-x-1/2 rounded-b-sm bg-white/35" />
      {/* own goal (bottom): penalty box + goal mouth where the keeper stands */}
      <div className="absolute bottom-2 left-1/2 h-[15%] w-1/2 -translate-x-1/2 rounded-t-sm border-x border-t border-white/25" />
      <div className="absolute bottom-2 left-1/2 h-[6%] w-1/4 -translate-x-1/2 rounded-t-sm border-x border-t border-white/25" />
      <div className="absolute bottom-1 left-1/2 h-1.5 w-14 -translate-x-1/2 rounded-t-sm bg-white/35" />
      {teamDots(lineup, "vertical").map((d, i) => (
        <PitchPlayer
          key={i}
          player={d.player}
          x={d.x}
          y={d.y}
          color={color}
          rating={ratingById?.[d.player?.id]}
          offMinute={subMinById?.[d.player?.id]}
        />
      ))}
    </div>
  );
}

function TeamLineupList({ lineup, name, showXI }) {
  if (!lineup) return null;
  return (
    <div className="bg-white border border-line rounded-lg p-5">
      <div className="flex items-center gap-2 mb-3">
        {lineup.team?.logo && <img src={lineup.team.logo} alt="" loading="lazy" className="w-6 h-6 object-contain" />}
        <h3 className="font-display text-lg">{name || lineup.team?.name}</h3>
        {lineup.formation && <span className="text-muted text-sm ml-auto">{lineup.formation}</span>}
      </div>
      {showXI && (
        <ol className="space-y-1.5 text-sm mb-3">
          {(lineup.startXI || []).map(({ player }, j) => (
            <li key={j} className="flex items-center gap-2">
              <span className="text-muted tabular-nums w-5 text-right flex-shrink-0">{player?.number}</span>
              <PlayerAvatar id={player?.id} className="w-6 h-6" />
              <span className="text-ink truncate"><PlayerName id={player?.id} name={player?.name} /></span>
              {player?.pos && <span className="text-muted text-xs ml-auto flex-shrink-0">{posFr(player.pos)}</span>}
            </li>
          ))}
        </ol>
      )}
      {(lineup.substitutes || []).length > 0 && (
        <>
          <p className="text-[11px] uppercase tracking-wider text-muted font-semibold mb-1.5">Remplaçants</p>
          <ol className="space-y-1.5 text-sm">
            {lineup.substitutes.map(({ player }, j) => (
              <li key={j} className="flex items-center gap-2 text-ink/70">
                <span className="text-muted tabular-nums w-5 text-right flex-shrink-0">{player?.number}</span>
                <PlayerAvatar id={player?.id} className="w-6 h-6" />
                <span className="truncate"><PlayerName id={player?.id} name={player?.name} /></span>
              </li>
            ))}
          </ol>
        </>
      )}
      {lineup.coach?.name && (
        <p className="text-muted text-xs mt-3 pt-3 border-t border-line">
          Sélectionneur : {lineup.coach.name}
        </p>
      )}
    </div>
  );
}

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
const posFr = (p) => {
  if (!p) return "";
  const s = String(p).trim();
  return POS_FR[s.toUpperCase()] || POS_WORDS[s.toLowerCase()] || s;
};

// A sub "came on" if it has minutes (player stats) OR appears in a substitution
// event · so it works even when the API has no per-player stats for the match.
function splitSubs(lineup, pstatById, subMinById) {
  const played = [];
  const bench = [];
  (lineup?.substitutes || []).forEach(({ player }) => {
    const st = pstatById[player?.id];
    const cameOn = (st?.minutes || 0) > 0 || subMinById?.[player?.id] != null;
    if (cameOn) played.push(player);
    else bench.push(player);
  });
  return { played, bench };
}

function SubRow({ player, stat, onMinute }) {
  const hasRating = stat?.rating != null;
  return (
    <li className="flex items-center gap-2.5 py-1.5">
      <PlayerAvatar id={player?.id} className="w-7 h-7" />
      {hasRating ? (
        <RatingBadge rating={stat.rating} className="w-8 flex-shrink-0" />
      ) : (
        <span className="w-8 flex-shrink-0" />
      )}
      <span className="text-muted tabular-nums text-xs w-5 text-right flex-shrink-0">{player?.number}</span>
      <span className="min-w-0 flex-1">
        <span className="block truncate text-sm text-ink"><PlayerName id={player?.id} name={player?.name} /></span>
        <span className="block text-[11px] text-muted">{posFr(player?.pos)}</span>
      </span>
      <span className="flex items-center gap-1.5 text-xs flex-shrink-0">
        {stat?.yellow > 0 && <span aria-hidden>🟨</span>}
        {onMinute != null && (
          <span className="tabular-nums text-green-600 font-semibold">{onMinute}'&nbsp;▲</span>
        )}
      </span>
    </li>
  );
}

// One team's subs (entered the game) and bench, single column.
function TeamSubs({ played, bench, pstatById, subMinById }) {
  if (played.length === 0 && bench.length === 0) return null;
  const block = (title, players) =>
    players.length === 0 ? null : (
      <div>
        <h3 className="font-display text-lg mb-2">{title}</h3>
        <ol className="grid sm:grid-cols-2 gap-x-8">
          {players.map((p, i) => (
            <SubRow key={i} player={p} stat={pstatById[p?.id]} onMinute={subMinById[p?.id]} />
          ))}
        </ol>
      </div>
    );
  return (
    <div className="space-y-6">
      {block("Remplaçants", played)}
      {block("Banc", bench)}
    </div>
  );
}

function Lineups({ haiti, opp, oppName, ratingById, pstatById, subMinById }) {
  // One team at a time · the full pitch is too crowded on mobile with photos.
  const [team, setTeam] = useState("haiti");
  const sel = team === "haiti" ? haiti : opp;
  const selName = team === "haiti" ? "Haïti" : oppName;
  const selColor = team === "haiti" ? "bg-haiti-blue" : "bg-haiti-red";

  const toggle = (
    <div className="mb-6 flex w-max max-w-full gap-1 rounded-full border border-line bg-bg p-1">
      {[
        { id: "haiti", label: "Haïti", logo: haiti?.team?.logo },
        { id: "opp", label: oppName, logo: opp?.team?.logo },
      ].map((t) => (
        <button
          key={t.id}
          type="button"
          onClick={() => setTeam(t.id)}
          aria-selected={team === t.id}
          className={`flex shrink-0 items-center gap-2 rounded-full px-4 py-1.5 font-cond text-sm font-semibold uppercase tracking-[0.12em] transition-colors ${
            team === t.id ? "bg-ink text-bg" : "text-muted hover:text-ink"
          }`}
        >
          {t.logo && <img src={t.logo} alt="" loading="lazy" className="h-4 w-4 object-contain" />}
          {t.label}
        </button>
      ))}
    </div>
  );

  const hasGrid = (l) => (l?.startXI || []).some((p) => p.player?.grid);
  const pitch = hasGrid(haiti) && hasGrid(opp);

  // Fallback for matches without pitch coordinates: plain list.
  if (!pitch) {
    return (
      <div>
        {toggle}
        <TeamLineupList lineup={sel} name={selName} showXI />
      </div>
    );
  }

  const s = splitSubs(sel, pstatById, subMinById);
  return (
    <div>
      {toggle}
      <div className="space-y-8">
        <SingleTeamPitch lineup={sel} color={selColor} ratingById={ratingById} subMinById={subMinById} />
        <TeamSubs played={s.played} bench={s.bench} pstatById={pstatById} subMinById={subMinById} />
        {sel?.coach?.name && (
          <p className="text-xs text-muted pt-2 border-t border-line">
            Sélectionneur : {sel.coach.name}
          </p>
        )}
      </div>
    </div>
  );
}

// ─── Joueurs · tableau de stats par joueur (note, min, buts, passes D…) ──
function normPlayer(p, isHaiti) {
  const st = p.statistics?.[0] || {};
  const r = st.games?.rating;
  return {
    id: p.player?.id,
    name: p.player?.name,
    isHaiti,
    rating: r != null ? parseFloat(r) : null,
    minutes: st.games?.minutes ?? 0,
    captain: st.games?.captain,
    goals: st.goals?.total ?? 0,
    assists: st.goals?.assists ?? 0,
    shots: st.shots?.total ?? 0,
    shotsOn: st.shots?.on ?? 0,
  };
}

function PlayerStats({ haiti, opp, oppName }) {
  const rows = [
    ...haiti.map((p) => normPlayer(p, true)),
    ...opp.map((p) => normPlayer(p, false)),
  ]
    .filter((p) => (p.minutes || 0) > 0)
    .sort((a, b) => (b.rating ?? -1) - (a.rating ?? -1));
  if (rows.length === 0) return null;

  return (
    <div>
      <div className="flex items-center gap-4 text-[11px] uppercase tracking-wider text-muted mb-3">
        <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-haiti-blue" /> Haïti</span>
        <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-haiti-red" /> {oppName}</span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="text-muted text-[10px] uppercase tracking-wider border-b border-line">
              <th className="text-left py-2 pr-2 font-semibold">Joueur</th>
              <th className="text-center py-2 px-1.5 font-semibold">Note</th>
              <th className="text-center py-2 px-1.5 font-semibold" title="Minutes">Min</th>
              <th className="text-center py-2 px-1.5 font-semibold" title="Buts">B</th>
              <th className="text-center py-2 px-1.5 font-semibold" title="Passes décisives">PD</th>
              <th className="text-center py-2 px-1.5 font-semibold" title="Tirs">T</th>
              <th className="text-center py-2 pl-1.5 font-semibold" title="Tirs cadrés">TC</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((p) => (
              <tr key={p.id} className="border-b border-line">
                <td className="py-2 pr-2">
                  <span className="flex items-center gap-2 min-w-0">
                    <span className={`w-1 h-6 rounded-full flex-shrink-0 ${p.isHaiti ? "bg-haiti-blue" : "bg-haiti-red"}`} />
                    <PlayerAvatar id={p.id} className="w-6 h-6" />
                    <span className="truncate text-ink">
                      <PlayerName id={p.id} name={p.name} />
                      {p.captain ? <span className="text-muted"> (C)</span> : null}
                    </span>
                  </span>
                </td>
                <td className="text-center px-1.5">
                  <RatingBadge rating={p.rating} />
                </td>
                <td className="text-center px-1.5 tabular-nums text-muted">{p.minutes}</td>
                <td className="text-center px-1.5 tabular-nums">{p.goals || ""}</td>
                <td className="text-center px-1.5 tabular-nums">{p.assists || ""}</td>
                <td className="text-center px-1.5 tabular-nums text-muted">{p.shots || ""}</td>
                <td className="text-center pl-1.5 tabular-nums text-muted">{p.shotsOn || ""}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const scorerLine = (s) => {
  const tag = s.detail === "Penalty" ? " (pén.)" : s.detail === "Own Goal" ? " (csc)" : "";
  return `${s.player} ${s.minute != null ? `${s.minute}'` : ""}${tag}`.trim();
};

const STAT_FR = {
  "Ball Possession": "Possession",
  "Total Shots": "Tirs",
  "Shots on Goal": "Tirs cadrés",
  "Shots off Goal": "Tirs non cadrés",
  "Blocked Shots": "Tirs bloqués",
  "Shots insidebox": "Tirs (surface)",
  "Shots outsidebox": "Tirs (hors surface)",
  Fouls: "Fautes",
  "Corner Kicks": "Corners",
  Offsides: "Hors-jeu",
  "Yellow Cards": "Cartons jaunes",
  "Red Cards": "Cartons rouges",
  "Goalkeeper Saves": "Arrêts",
  "Total passes": "Passes",
  "Passes accurate": "Passes réussies",
  "Passes %": "Passes (%)",
  expected_goals: "Buts attendus (xG)",
};
const statFr = (t) => STAT_FR[t] || t;

function parseStat(v) {
  if (v == null) return 0;
  if (typeof v === "number") return v;
  const n = parseFloat(String(v).replace("%", ""));
  return Number.isNaN(n) ? 0 : n;
}

// The headline stats shown first under "Top stats" (those present, in this order).
const TOP_STATS = [
  "Ball Possession",
  "Total Shots",
  "Shots on Goal",
  "expected_goals",
  "Corner Kicks",
  "Fouls",
];

// FotMob-style comparison bars: Haïti (blue, left) vs opponent (red, right).
function StatBars({ haiti, opp, oppName }) {
  const hStats = haiti?.statistics || [];
  const types = hStats.map((s) => s.type);
  if (types.length === 0) return null;
  const hVal = (t) => hStats.find((s) => s.type === t)?.value;
  const aVal = (t) => (opp?.statistics || []).find((s) => s.type === t)?.value;

  const top = TOP_STATS.filter((t) => types.includes(t));
  const rest = types.filter((t) => !top.includes(t));

  // Two bars meeting in the middle (Haïti grows left, opponent grows right);
  // the leading side stays vivid, the trailing side dims.
  const Bar = ({ t }) => {
    const hRaw = hVal(t);
    const aRaw = aVal(t);
    const h = parseStat(hRaw);
    const a = parseStat(aRaw);
    const total = h + a;
    const hPct = total > 0 ? (h / total) * 100 : 50;
    const aPct = 100 - hPct;
    const hLead = h > a;
    const aLead = a > h;
    return (
      <div className="py-2.5">
        <div className="mb-1.5 flex items-baseline justify-between gap-3">
          <span className={`font-block text-lg leading-none tabular-nums ${hLead ? "text-haiti-blue" : "text-ink/60"}`}>
            {hRaw ?? "·"}
          </span>
          <span className="font-cond text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">
            {statFr(t)}
          </span>
          <span className={`font-block text-lg leading-none tabular-nums ${aLead ? "text-haiti-red" : "text-ink/60"}`}>
            {aRaw ?? "·"}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <div className="flex h-2 flex-1 justify-end overflow-hidden rounded-full bg-line/70">
            <div className={`h-full rounded-full bg-haiti-blue ${hLead ? "" : "opacity-40"}`} style={{ width: `${hPct}%` }} />
          </div>
          <div className="flex h-2 flex-1 overflow-hidden rounded-full bg-line/70">
            <div className={`h-full rounded-full bg-haiti-red ${aLead ? "" : "opacity-40"}`} style={{ width: `${aPct}%` }} />
          </div>
        </div>
      </div>
    );
  };

  const Section = ({ title, items }) =>
    items.length === 0 ? null : (
      <div>
        <div className="mb-3 flex items-center gap-3">
          <h3 className="font-cond text-sm font-semibold uppercase tracking-[0.18em] text-gold">{title}</h3>
          <span className="flag-rule flex-1 rounded-full opacity-60" />
        </div>
        <div className="divide-y divide-line/70 rounded-2xl border border-line bg-bg px-4 py-1">
          {items.map((t) => (
            <Bar key={t} t={t} />
          ))}
        </div>
      </div>
    );

  const TeamTag = ({ logo, name, align }) => (
    <span className={`flex items-center gap-2 ${align === "right" ? "flex-row-reverse" : ""}`}>
      {logo && <img src={logo} alt="" loading="lazy" className="h-6 w-6 object-contain" />}
      <span className="font-cond text-sm font-semibold uppercase tracking-[0.1em] text-ink">{name}</span>
    </span>
  );

  return (
    <div className="space-y-7">
      <div className="flex items-center justify-between">
        <TeamTag logo={haiti?.team?.logo} name="Haïti" align="left" />
        <TeamTag logo={opp?.team?.logo} name={oppName} align="right" />
      </div>
      <Section title="Statistiques clés" items={top} />
      <Section title="Toutes les statistiques" items={rest} />
    </div>
  );
}
