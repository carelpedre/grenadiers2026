import { useState } from "react";
import { Link } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import { SponsorBanner } from "../components/Sponsor";
import { Flag } from "../components/Flag";
import StadiumWeather from "../components/StadiumWeather";
import ImagePlaceholder from "../components/ImagePlaceholder";
import MatchReminder from "../components/MatchReminder";
import GroupCTable from "../components/GroupCTable";
import MatchSectionHead from "../components/MatchSectionHead";
import Wc26Mark from "../components/Wc26Mark";
import RecentForm from "../components/RecentForm";
import { teamName } from "../lib/teamNames";
import { friendlies } from "../data/friendlies";
import { matches } from "../data/matches";
import { liveMatches } from "../data/liveMatches";
import { motion } from "framer-motion";
import { useT } from "../lib/i18n";
import { useLiveFixtures } from "../lib/useLiveFixtures";
import { fadeUp, slideInLeft, slideInRight, stagger } from "../lib/motion";

export default function Matches() {
  const { t, lang } = useT();
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
            {t("matches.tabOverview")}
          </TabPill>
          <TabPill active={tab === "classement"} onClick={() => setTab("classement")}>
            {t("matches.tabStandings")}
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
          <MatchSectionHead sub={t("matches.wcSub")}>
            {t("matches.worldCup.title")}
          </MatchSectionHead>
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
                  aria-label={t("matches.liveCenterAria").replace("{home}", teamName(m.home.country, lang)).replace("{away}", teamName(m.away.country, lang))}
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
            <MatchSectionHead sub={t("matches.prepSub")}>
              {t("matches.upcoming.title")}
            </MatchSectionHead>
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

        {/* Forme récente · unique zone de résultats récents, lue depuis la base
            (DB only). N'affecte pas la vue des matchs à venir : requête séparée
            FT/AET/PEN. Remplace l'ancien bloc statique des matchs de préparation. */}
        <RecentForm />

        {/* Group C card */}
        <section className="p-6 md:p-8 bg-white border border-line rounded-xl">
          <h3 className="font-cond text-xl font-bold uppercase tracking-tight mb-4">{t("matches.groupCTeams")}</h3>
          <ul className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-4">
            <li className="flex items-center gap-2">
              <Flag country="brazil" size="sm" /> {teamName("brazil", lang)}
            </li>
            <li className="flex items-center gap-2">
              <Flag country="morocco" size="sm" /> {teamName("morocco", lang)}
            </li>
            <li className="flex items-center gap-2 font-semibold">
              <Flag country="haiti" size="sm" /> {teamName("haiti", lang)}
            </li>
            <li className="flex items-center gap-2">
              <Flag country="scotland" size="sm" /> {teamName("scotland", lang)}
            </li>
          </ul>
          <p className="text-xs text-muted">
            {t("matches.qualifyNote")}
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
      className={`shrink-0 inline-flex items-center px-4 py-1.5 rounded-full font-cond text-xs md:text-sm font-semibold transition-colors uppercase tracking-[0.12em] ${
        active ? "bg-ink text-bg" : "text-ink hover:bg-bg"
      }`}
    >
      {children}
    </button>
  );
}

// Coup d'envoi à l'heure de Miami (Est). Locale selon la langue active.
function miamiKickoff(iso, lang) {
  if (!iso) return { date: "", time: "" };
  const loc = lang === "en" ? "en-US" : "fr-FR";
  const d = new Date(iso);
  const date = new Intl.DateTimeFormat(loc, {
    timeZone: "America/New_York",
    weekday: "long",
    day: "numeric",
    month: "long",
  }).format(d);
  const time = new Intl.DateTimeFormat(loc, {
    timeZone: "America/New_York",
    hour: "2-digit",
    minute: "2-digit",
  }).format(d);
  return { date, time };
}

// Date affichée sur la carte de match : en anglais, dérivée de l'ISO kickoff
// (format abrégé « Sat, Jun 13, 2026 ») ; en français, le libellé stocké.
function fixtureDate(match, lang) {
  if (lang === "en" && match?.kickoff) {
    return new Date(match.kickoff).toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
      timeZone: "America/New_York",
    });
  }
  return match?.date;
}

// Libellé localisé d'un statut de match en direct, depuis le code de statut.
function liveLabel(t, live) {
  const map = {
    HT: "matches.statusHalftime",
    ET: "matches.statusExtraTime",
    BT: "matches.statusBreak",
    P: "matches.statusPenalties",
    SUSP: "matches.statusSuspended",
    INT: "matches.statusInterrupted",
    PST: "matches.statusPostponed",
    CANC: "matches.statusCancelled",
    ABD: "matches.statusAbandoned",
    AWD: "matches.statusAwarded",
  };
  const k = map[live?.status];
  if (k) return t(k);
  if (live?.isFinished) return t("matches.statusFinished");
  if (live?.isLive) return t("matches.statusLive");
  return t("matches.statusUpcoming");
}

function HeroTeam({ name, logo }) {
  return (
    <span className="flex items-center gap-2 min-w-0">
      {logo && (
        <img src={logo} alt="" loading="lazy" className="w-6 h-6 md:w-8 md:h-8 object-contain flex-shrink-0" />
      )}
      <span className="font-cond font-bold text-base md:text-2xl uppercase tracking-tight whitespace-nowrap">
        {name}
      </span>
    </span>
  );
}

// Bandeau en tête de /matches : le match en direct, sinon le prochain à venir.
function NextMatchHero({ feature }) {
  const { t, lang } = useT();
  if (!feature) return null;
  const { homeName, awayName, homeLogo, awayLogo, kickoff, slug, isLive, homeIsHaiti, haitiGoals, oppGoals } = feature;
  const { date, time } = miamiKickoff(kickoff, lang);
  const homeScore = homeIsHaiti ? haitiGoals : oppGoals;
  const awayScore = homeIsHaiti ? oppGoals : haitiGoals;

  const inner = (
    <div className="relative overflow-hidden bg-ink-deep text-bg rounded-xl px-5 py-6 md:px-8 md:py-7 transition-shadow group-hover:ring-1 group-hover:ring-gold/50">
      <div
        className="absolute inset-0"
        style={{ background: "radial-gradient(110% 130% at 92% 0%, rgba(0,32,159,.5), transparent 60%)" }}
      />
      <div
        className="pointer-events-none absolute -right-3 -top-5 w-[42%] max-w-[230px] opacity-[0.18]"
        style={{
          maskImage: "linear-gradient(to left, #000 30%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to left, #000 30%, transparent 100%)",
        }}
      >
        <Wc26Mark className="w-full h-auto" />
      </div>
      <div className="relative flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
        <div className="min-w-0">
          <div className="mb-3">
            {isLive ? (
              <LiveScoreBadge live={feature} />
            ) : (
              <span className="font-cond text-gold text-[11px] md:text-xs uppercase tracking-[0.24em] font-semibold">
                {t("home.nextMatch")}
              </span>
            )}
          </div>
          <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 md:gap-x-3">
            <HeroTeam name={teamName(homeName, lang)} logo={homeLogo} />
            <span className="text-gold/70 font-block text-sm">VS</span>
            <HeroTeam name={teamName(awayName, lang)} logo={awayLogo} />
          </div>
        </div>

        <div className="text-left sm:text-right flex-shrink-0">
          {isLive ? (
            <p className="font-block text-4xl md:text-5xl tabular-nums leading-none">
              {homeScore}
              <span className="text-gold mx-1.5 md:mx-2">:</span>
              {awayScore}
            </p>
          ) : (
            <>
              <p className="font-block text-3xl md:text-4xl tabular-nums leading-none">
                {time} <span className="font-cond text-bg/50 text-sm">ET</span>
              </p>
              <p className="font-cond text-bg/60 text-xs uppercase tracking-wider mt-1.5 capitalize">{date}</p>
            </>
          )}
          {slug && (
            <p className="font-cond text-gold text-xs font-semibold uppercase tracking-[0.18em] mt-2">{t("matches.matchCenter")} →</p>
          )}
        </div>
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
  const { t } = useT();
  if (!live) return null;
  if (live.isLive) {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-haiti-red text-bg text-[10px] font-bold uppercase tracking-wider rounded-full">
        <motion.span
          className="w-1.5 h-1.5 bg-bg rounded-full"
          animate={{ opacity: [1, 0.3, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
        {liveLabel(t, live)}
        {live.isRunning && live.elapsed ? ` · ${live.elapsed}'` : ""}
      </span>
    );
  }
  if (live.isFinished) {
    return (
      <span className="inline-flex items-center px-2.5 py-1 bg-ink/60 text-bg text-[10px] font-bold uppercase tracking-wider rounded-full">
        {liveLabel(t, live)}
      </span>
    );
  }
  return null;
}

function MatchCard({ match, live }) {
  const { t, lang } = useT();
  const { home, away, time, timeET, stadium, broadcast, diaspora, matchNumber } = match;
  const date = fixtureDate(match, lang);
  const city = lang === "en" && stadium.cityEn ? stadium.cityEn : stadium.city;
  const diasporaText = lang === "en" && match.diasporaEn ? match.diasporaEn : diaspora;
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
          label={`${stadium.fifaName} · ${city}`}
          rounded={false}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/30 to-transparent"></div>
        <div className="absolute bottom-3 left-5 right-5 flex items-center justify-between font-cond text-xs uppercase tracking-[0.12em] font-semibold">
          <span className="text-bg">{t("matches.groupCMatch").replace("{n}", matchNumber)}</span>
          <span className="text-gold">{t("matches.wcFifa2026")}</span>
        </div>
      </motion.div>

      {/* Score line */}
      <div className="px-4 md:px-10 py-7 md:py-10">
        <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3 md:gap-8">
          {/* Home · mobile: flag stacked above name; desktop: name left of flag */}
          <motion.div className="flex flex-col items-center text-center md:flex-row md:items-center md:justify-end md:gap-5 md:text-right gap-2" variants={slideInLeft}>
            <div className="md:order-2">
              <Flag country={home.country} size="responsive" />
            </div>
            <p className="font-cond font-bold text-base md:text-4xl uppercase tracking-tight leading-none md:order-1">
              {teamName(home.country, lang)}
            </p>
          </motion.div>

          {/* Time, or live/final score */}
          <motion.div className="text-center" variants={fadeUp}>
            {showLive ? (
              <>
                <p className="font-block text-3xl md:text-5xl tabular-nums leading-none">
                  {homeScore}
                  <span className="text-gold mx-1.5 md:mx-2">:</span>
                  {awayScore}
                </p>
                <div className="mt-2 flex justify-center">
                  <LiveScoreBadge live={live} />
                </div>
              </>
            ) : (
              <>
                <p className="font-block text-3xl md:text-5xl tabular-nums leading-none">{time}</p>
                <p className="font-cond text-[10px] md:text-xs text-muted uppercase tracking-[0.12em] mt-1.5">{timeET}</p>
              </>
            )}
          </motion.div>

          {/* Away · mobile: flag stacked above name; desktop: flag left of name */}
          <motion.div className="flex flex-col items-center text-center md:flex-row md:items-center md:justify-start md:gap-5 gap-2" variants={slideInRight}>
            <Flag country={away.country} size="responsive" />
            <p className="font-cond font-bold text-base md:text-4xl uppercase tracking-tight leading-none">
              {teamName(away.country, lang)}
            </p>
          </motion.div>
        </div>

        {/* Date + venue */}
        <div className="mt-6 pt-6 border-t border-line flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm">
          <span className="text-ink">{date}</span>
          <span className="text-muted">·</span>
          <span className="text-ink">
            <span className="text-muted">{stadium.fifaName}</span>
            {stadium.realName && stadium.realName !== stadium.fifaName ? ` (${stadium.realName})` : ""}
          </span>
          <span className="text-muted">·</span>
          <span className="text-ink">{city}</span>
        </div>
      </div>

      {/* Details strip */}
      <div className="bg-bg border-t border-line px-6 py-5 grid md:grid-cols-4 gap-5 text-sm">
        <div>
          <p className="text-xs uppercase tracking-wider text-muted font-semibold mb-1">{t("matches.capacity")}</p>
          <p className="text-ink font-display text-lg tabular-nums">
            {stadium.capacity.toLocaleString()}
          </p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-wider text-muted font-semibold mb-1">{t("matches.pitch")}</p>
          <p className="text-ink text-sm">{t("matches.naturalGrass")}</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-wider text-muted font-semibold mb-1">
            {t("matches.broadcastLabel")}
          </p>
          <p className="text-ink text-sm leading-snug">{broadcast.join(" · ")}</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-wider text-muted font-semibold mb-1">
            {t("matches.weather")}
          </p>
          <StadiumWeather lat={stadium.lat} lng={stadium.lng} city={city.split(",")[0]} compact />
        </div>
      </div>

      {/* Action row: calendar button · the whole card links to the live page,
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
          {t("matches.liveCenter")} →
        </span>
      </div>

      {/* Diaspora note */}
      {diasporaText && (
        <div className="bg-haiti-blue text-bg px-6 py-4 text-sm">
          <span className="font-semibold">{diasporaText}</span>
        </div>
      )}
    </motion.div>
  );
}

function FriendlyCard({ friendly, upcoming, live }) {
  const { t } = useT();
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
          {upcoming ? t("matches.prepUpcoming") : t("matches.prepResult")}
        </span>
        {!upcoming && (
          <span className={`text-xs font-bold px-2 py-0.5 rounded ${outcomeStyles[friendly.outcome]}`}>
            {friendly.outcome === "W" ? t("matches.win") : friendly.outcome === "D" ? t("matches.draw") : t("matches.loss")}
          </span>
        )}
        {showLive && <LiveScoreBadge live={live} />}
      </div>
      <h3 className="font-cond text-2xl font-bold uppercase tracking-tight mb-2">Haïti vs {friendly.opponent}</h3>
      {!upcoming && (
        <p className="font-block text-3xl text-haiti-blue tabular-nums mb-3">
          {friendly.haitiScore} <span className="text-gold">:</span> {friendly.opponentScore}
        </p>
      )}
      {showLive && (
        <p className="font-block text-3xl text-haiti-blue tabular-nums mb-3">
          {live.haitiGoals} <span className="text-gold">:</span> {live.oppGoals}
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
          {t("matches.ticketsTicketmaster")} →
        </a>
      )}
      {!clickable && friendly.recapUrl && !upcoming && (
        <Link
          to={friendly.recapUrl}
          className="inline-flex items-center gap-2 mt-4 text-sm font-semibold text-haiti-blue hover:gap-3 transition-all"
        >
          {t("matches.recap")} →
        </Link>
      )}
      {clickable && (
        <span className="inline-flex items-center gap-1 mt-4 text-sm font-semibold text-haiti-blue group-hover:gap-2 transition-all">
          {t("matches.viewMatch")} →
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
