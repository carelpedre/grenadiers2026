import { useState } from "react";
import { Link } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import { SponsorBanner } from "../components/Sponsor";
import { Flag } from "../components/Flag";
import StadiumWeather from "../components/StadiumWeather";
import ImagePlaceholder from "../components/ImagePlaceholder";
import MatchReminder from "../components/MatchReminder";
import GroupCTable from "../components/GroupCTable";
import { frName } from "../lib/teamNames";
import { friendlies } from "../data/friendlies";
import { matches } from "../data/matches";
import { liveMatches } from "../data/liveMatches";
import { motion } from "framer-motion";
import { useT } from "../lib/i18n";
import { useLiveFixtures } from "../lib/useLiveFixtures";
import { fadeUp, slideInLeft, slideInRight, stagger } from "../lib/motion";

export default function Matches() {
  const { t } = useT();
  const { byOpponent, feature, standings } = useLiveFixtures();
  const [tab, setTab] = useState("apercu");
  // Le match mis en avant dans le bandeau n'est pas répété en « préparation ».
  const featuredSlug = feature?.opponentSlug || null;
  const upcomingFriendlies = friendlies.upcoming.filter(
    (f) => f.liveSlug !== featuredSlug,
  );
  return (
    <div>
      <PageHeader
        eyebrow={t("matches.eyebrow")}
        title={t("matches.title")}
        subtitle={t("matches.subtitle")}
      />

      <NextMatchHero feature={feature} />

      {/* Sub-nav: Aperçu (schedule) / Classement (live Group C table) */}
      <nav className="sticky top-0 z-20 bg-white/95 backdrop-blur border-b border-line">
        <div className="max-w-content mx-auto px-5 py-2.5 flex items-center gap-1">
          <TabPill active={tab === "apercu"} onClick={() => setTab("apercu")}>
            Aperçu
          </TabPill>
          <TabPill active={tab === "classement"} onClick={() => setTab("classement")}>
            Classement · Groupe C
          </TabPill>
        </div>
      </nav>

      <SponsorBanner placement="matches-page" />

      <div className="max-w-content mx-auto px-5 py-16 space-y-16">
        {tab === "classement" ? (
          <GroupCTable standings={standings} />
        ) : (
        <>
        {/* World Cup matches */}
        <section>
          <div className="border-b border-line pb-3 mb-6">
            <h2 className="font-display text-2xl md:text-3xl">Coupe du Monde — Groupe C</h2>
            <p className="text-muted text-sm mt-1">Trois adversaires. Trois villes. Un seul drapeau.</p>
          </div>
          <div className="space-y-6">
            {matches.map((m) => {
              const liveSlug = m.home.country === "haiti" ? m.away.country : m.home.country;
              const hasLive = Boolean(liveMatches[liveSlug]);
              const live = byOpponent[liveSlug] || null;
              return hasLive ? (
                <Link
                  key={m.matchNumber}
                  to={`/live/${liveSlug}`}
                  className="block group cursor-pointer rounded-lg"
                  aria-label={`Centre match en direct — ${m.home.name} contre ${m.away.name}`}
                >
                  <MatchCard match={m} live={live} />
                </Link>
              ) : (
                <MatchCard key={m.matchNumber} match={m} live={live} />
              );
            })}
          </div>
        </section>

        {/* Upcoming preparation games (the featured match is shown in the hero) */}
        {upcomingFriendlies.length > 0 && (
          <section>
            <div className="border-b border-line pb-3 mb-6">
              <h2 className="font-display text-2xl md:text-3xl">Matchs de préparation</h2>
              <p className="text-muted text-sm mt-1">
                Derniers réglages en Floride du Sud, sous l'égide de l'Inter Miami CF.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {upcomingFriendlies.map((f, i) => (
                <FriendlyCard
                  key={i}
                  friendly={f}
                  upcoming
                  live={f.liveSlug ? byOpponent[f.liveSlug] || null : null}
                />
              ))}
            </div>
          </section>
        )}

        {/* Past preparation games */}
        <section>
          <div className="border-b border-line pb-3 mb-6">
            <h2 className="font-display text-2xl md:text-3xl">Résultats récents</h2>
            <p className="text-muted text-sm mt-1">
              Matchs de préparation disputés lors de la fenêtre internationale de mars 2026 à Toronto.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {friendlies.past.map((f, i) => (
              <FriendlyCard key={i} friendly={f} />
            ))}
          </div>
        </section>

        {/* Group C card */}
        <section className="p-6 md:p-8 bg-white border border-line rounded-lg">
          <h3 className="font-display text-xl mb-4">Les équipes du Groupe C</h3>
          <ul className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-4">
            <li className="flex items-center gap-2">
              <Flag country="brazil" size="sm" /> Brésil
            </li>
            <li className="flex items-center gap-2">
              <Flag country="morocco" size="sm" /> Maroc
            </li>
            <li className="flex items-center gap-2 font-semibold">
              <Flag country="haiti" size="sm" /> Haïti
            </li>
            <li className="flex items-center gap-2">
              <Flag country="scotland" size="sm" /> Écosse
            </li>
          </ul>
          <p className="text-xs text-muted">
            Les deux premières équipes du groupe accèdent aux 16es de finale. Les huit meilleures troisièmes des douze groupes complètent le tableau des 32.
          </p>
        </section>
        </>
        )}
      </div>
    </div>
  );
}

function TabPill({ active, onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-selected={active}
      className={`shrink-0 inline-flex items-center px-3 py-1.5 rounded-full text-xs md:text-sm font-semibold transition-colors uppercase tracking-wider ${
        active ? "bg-ink text-bg" : "text-ink hover:bg-bg"
      }`}
    >
      {children}
    </button>
  );
}

// Coup d'envoi à l'heure de Miami (Est).
function miamiKickoff(iso) {
  if (!iso) return { date: "", time: "" };
  const d = new Date(iso);
  const date = new Intl.DateTimeFormat("fr-FR", {
    timeZone: "America/New_York",
    weekday: "long",
    day: "numeric",
    month: "long",
  }).format(d);
  const time = new Intl.DateTimeFormat("fr-FR", {
    timeZone: "America/New_York",
    hour: "2-digit",
    minute: "2-digit",
  }).format(d);
  return { date, time };
}

function HeroTeam({ name, logo }) {
  return (
    <span className="flex items-center gap-2 min-w-0">
      {logo && (
        <img src={logo} alt="" loading="lazy" className="w-6 h-6 md:w-8 md:h-8 object-contain flex-shrink-0" />
      )}
      <span className="font-display text-base md:text-2xl uppercase tracking-tight truncate">
        {name}
      </span>
    </span>
  );
}

// Bandeau en tête de /matches : le match en direct, sinon le prochain à venir.
function NextMatchHero({ feature }) {
  if (!feature) return null;
  const { homeName, awayName, homeLogo, awayLogo, kickoff, slug, isLive, homeIsHaiti, haitiGoals, oppGoals } = feature;
  const { date, time } = miamiKickoff(kickoff);
  const homeScore = homeIsHaiti ? haitiGoals : oppGoals;
  const awayScore = homeIsHaiti ? oppGoals : haitiGoals;

  const inner = (
    <div className="bg-ink text-bg rounded-lg px-5 py-5 md:px-8 md:py-6 flex items-center justify-between gap-4 transition-shadow group-hover:ring-1 group-hover:ring-haiti-red">
      <div className="min-w-0">
        <div className="mb-2.5">
          {isLive ? (
            <LiveScoreBadge live={feature} />
          ) : (
            <span className="text-haiti-red text-[11px] md:text-xs uppercase tracking-[0.2em] font-bold">
              Prochain match
            </span>
          )}
        </div>
        <div className="flex items-center gap-2.5 md:gap-3 min-w-0">
          <HeroTeam name={frName(homeName)} logo={homeLogo} />
          <span className="text-bg/40 font-display text-sm">vs</span>
          <HeroTeam name={frName(awayName)} logo={awayLogo} />
        </div>
      </div>

      <div className="text-right flex-shrink-0">
        {isLive ? (
          <p className="font-display text-3xl md:text-4xl tabular-nums">
            {homeScore}
            <span className="text-bg/30 mx-1.5">–</span>
            {awayScore}
          </p>
        ) : (
          <>
            <p className="font-display text-2xl md:text-3xl tabular-nums leading-none">
              {time} <span className="text-bg/50 text-sm">ET</span>
            </p>
            <p className="text-bg/60 text-xs capitalize mt-1">{date}</p>
          </>
        )}
        {slug && (
          <p className="text-haiti-red text-xs font-semibold mt-2">Centre du match →</p>
        )}
      </div>
    </div>
  );

  return (
    <div className="max-w-content mx-auto px-5 pt-6">
      {slug ? (
        <Link to={`/live/${slug}`} className="block group">
          {inner}
        </Link>
      ) : (
        inner
      )}
    </div>
  );
}

function LiveScoreBadge({ live }) {
  if (!live) return null;
  if (live.isLive) {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-haiti-red text-bg text-[10px] font-bold uppercase tracking-wider rounded-full">
        <motion.span
          className="w-1.5 h-1.5 bg-bg rounded-full"
          animate={{ opacity: [1, 0.3, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
        {live.label}
        {live.isRunning && live.elapsed ? ` · ${live.elapsed}'` : ""}
      </span>
    );
  }
  if (live.isFinished) {
    return (
      <span className="inline-flex items-center px-2.5 py-1 bg-ink/60 text-bg text-[10px] font-bold uppercase tracking-wider rounded-full">
        {live.label}
      </span>
    );
  }
  return null;
}

function MatchCard({ match, live }) {
  const { home, away, date, time, timeET, stadium, broadcast, diaspora, matchNumber } = match;
  const showLive = Boolean(live && (live.isLive || live.isFinished));
  const homeScore = home.country === "haiti" ? live?.haitiGoals : live?.oppGoals;
  const awayScore = away.country === "haiti" ? live?.haitiGoals : live?.oppGoals;
  return (
    <motion.div
      className="bg-white border border-line rounded-lg overflow-hidden transition-colors group-hover:border-haiti-red"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
      variants={stagger(0.15, 0.1)}
    >
      {/* Stadium photo banner */}
      <motion.div className="relative" variants={fadeUp}>
        <ImagePlaceholder
          src={stadium.photo}
          aspect="21/9"
          label={`${stadium.fifaName} · ${stadium.city}`}
          rounded={false}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/30 to-transparent"></div>
        <div className="absolute bottom-3 left-5 right-5 text-bg text-xs uppercase tracking-wider font-semibold flex items-center justify-between">
          <span>Groupe C · Match {matchNumber}</span>
          <span className="text-bg/80">Coupe du Monde FIFA 2026™</span>
        </div>
      </motion.div>

      {/* Score line */}
      <div className="px-4 md:px-10 py-7 md:py-10">
        <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3 md:gap-8">
          {/* Home — mobile: flag stacked above name; desktop: name left of flag */}
          <motion.div className="flex flex-col items-center text-center md:flex-row md:items-center md:justify-end md:gap-5 md:text-right gap-2" variants={slideInLeft}>
            <div className="md:order-2">
              <Flag country={home.country} size="responsive" />
            </div>
            <p className="font-display text-base md:text-4xl uppercase tracking-tight leading-none md:order-1">
              {home.name}
            </p>
          </motion.div>

          {/* Time, or live/final score */}
          <motion.div className="text-center" variants={fadeUp}>
            {showLive ? (
              <>
                <p className="font-display text-2xl md:text-5xl tabular-nums leading-none">
                  {homeScore}
                  <span className="text-ink/30 mx-1.5 md:mx-2">–</span>
                  {awayScore}
                </p>
                <div className="mt-2 flex justify-center">
                  <LiveScoreBadge live={live} />
                </div>
              </>
            ) : (
              <>
                <p className="font-display text-2xl md:text-5xl tabular-nums leading-none">{time}</p>
                <p className="text-[10px] md:text-xs text-muted uppercase tracking-wider mt-1.5">{timeET}</p>
              </>
            )}
          </motion.div>

          {/* Away — mobile: flag stacked above name; desktop: flag left of name */}
          <motion.div className="flex flex-col items-center text-center md:flex-row md:items-center md:justify-start md:gap-5 gap-2" variants={slideInRight}>
            <Flag country={away.country} size="responsive" />
            <p className="font-display text-base md:text-4xl uppercase tracking-tight leading-none">
              {away.name}
            </p>
          </motion.div>
        </div>

        {/* Date + venue */}
        <div className="mt-6 pt-6 border-t border-line flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm">
          <span className="text-ink">{date}</span>
          <span className="text-muted">·</span>
          <span className="text-ink">
            <span className="text-muted">{stadium.fifaName}</span> ({stadium.realName})
          </span>
          <span className="text-muted">·</span>
          <span className="text-ink">{stadium.city}</span>
        </div>
      </div>

      {/* Details strip */}
      <div className="bg-bg border-t border-line px-6 py-5 grid md:grid-cols-4 gap-5 text-sm">
        <div>
          <p className="text-xs uppercase tracking-wider text-muted font-semibold mb-1">Capacité</p>
          <p className="text-ink font-display text-lg tabular-nums">
            {stadium.capacity.toLocaleString()}
          </p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-wider text-muted font-semibold mb-1">Pelouse</p>
          <p className="text-ink text-sm">Gazon naturel</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-wider text-muted font-semibold mb-1">
            Diffusion
          </p>
          <p className="text-ink text-sm leading-snug">{broadcast.join(" · ")}</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-wider text-muted font-semibold mb-1">
            Météo
          </p>
          <StadiumWeather lat={stadium.lat} lng={stadium.lng} city={stadium.city.split(",")[0]} compact />
        </div>
      </div>

      {/* Action row: calendar button — the whole card links to the live page,
          so the calendar stops the click from triggering navigation. */}
      <div className="px-6 md:px-10 pb-6 -mt-2 flex flex-wrap gap-2 items-center">
        <span onClick={(e) => e.preventDefault()}>
          <MatchReminder match={{
            slug: home.country === "haiti" ? away.country : home.country,
            opponent: { name: home.country === "haiti" ? away.name : home.name },
            matchNumber,
            kickoff: match.kickoff,
            stadium,
            broadcast: broadcast.join(" · "),
          }} />
        </span>
        <span className="inline-flex items-center gap-2 px-4 py-2 border border-line text-ink text-sm font-semibold rounded-full transition-colors group-hover:border-haiti-red">
          Centre match en direct →
        </span>
      </div>

      {/* Diaspora note */}
      {diaspora && (
        <div className="bg-haiti-blue text-bg px-6 py-4 text-sm">
          <span className="font-semibold">{diaspora}</span>
        </div>
      )}
    </motion.div>
  );
}

function FriendlyCard({ friendly, upcoming, live }) {
  const outcomeStyles = {
    W: "bg-haiti-blue text-bg",
    D: "bg-muted text-bg",
    L: "bg-haiti-red text-bg",
  };

  // Live overlay only applies to the upcoming friendly that maps to a fixture.
  const showLive = Boolean(upcoming && live && (live.isLive || live.isFinished));
  // Cards with a detail page become clickable (and drop nested inner links).
  const clickable = Boolean(friendly.liveSlug);

  const inner = (
    <div
      className={`bg-white border rounded-lg p-6 h-full ${
        clickable ? "border-line transition-colors group-hover:border-haiti-red" : "border-line"
      }`}
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs uppercase tracking-wider text-muted font-semibold">
          {upcoming ? "Préparation · À venir" : "Préparation · Résultat"}
        </span>
        {!upcoming && (
          <span className={`text-xs font-bold px-2 py-0.5 rounded ${outcomeStyles[friendly.outcome]}`}>
            {friendly.outcome === "W" ? "Victoire" : friendly.outcome === "D" ? "Nul" : "Défaite"}
          </span>
        )}
        {showLive && <LiveScoreBadge live={live} />}
      </div>
      <h3 className="font-display text-2xl mb-2">Haïti vs {friendly.opponent}</h3>
      {!upcoming && (
        <p className="font-display text-3xl text-haiti-blue tabular-nums mb-3">
          {friendly.haitiScore} – {friendly.opponentScore}
        </p>
      )}
      {showLive && (
        <p className="font-display text-3xl text-haiti-blue tabular-nums mb-3">
          {live.haitiGoals} – {live.oppGoals}
        </p>
      )}
      <p className="text-sm text-muted">{friendly.date}</p>
      {upcoming && !showLive && <p className="text-sm text-muted">{friendly.kickoff}</p>}
      <p className="text-sm text-ink mt-2">{friendly.venue} · {friendly.city}</p>
      {friendly.note && (
        <p className="text-xs text-muted mt-3 leading-relaxed">{friendly.note}</p>
      )}
      {/* Inner links only when the whole card isn't already a link (avoids nested <a>). */}
      {!clickable && friendly.ticketUrl && upcoming && !showLive && (
        <a
          href={friendly.ticketUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 mt-4 text-sm font-semibold text-haiti-blue hover:gap-3 transition-all"
        >
          Billetterie sur Ticketmaster →
        </a>
      )}
      {!clickable && friendly.recapUrl && !upcoming && (
        <Link
          to={friendly.recapUrl}
          className="inline-flex items-center gap-2 mt-4 text-sm font-semibold text-haiti-blue hover:gap-3 transition-all"
        >
          Résumé →
        </Link>
      )}
      {clickable && (
        <span className="inline-flex items-center gap-1 mt-4 text-sm font-semibold text-haiti-blue group-hover:gap-2 transition-all">
          Voir le match →
        </span>
      )}
    </div>
  );

  return clickable ? (
    <Link to={`/live/${friendly.liveSlug}`} className="block group h-full">
      {inner}
    </Link>
  ) : (
    inner
  );
}
