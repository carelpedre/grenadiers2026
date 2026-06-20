import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { Flag } from "./Flag";
import { useLiveFixtures } from "../lib/useLiveFixtures";
import { getMatch } from "../data/liveMatches";
import { getEntriesSorted } from "../data/diary";
import { frName, enName } from "../lib/teamNames";
import { useT } from "../lib/i18n";

// Palette
const ROYAL_BLUE = "#00209F"; // bleu FHF
const TEAL = "#2DD4BF";

// ╔══════════════════════════════════════════════════════════════════╗
// ║  HOME — héros « état du match » + frise « Route vers le Mondial »  ║
// ║                                                                    ║
// ║  Lit les mêmes données live que /matches et /live (vue publique    ║
// ║  via useLiveFixtures). Le héros choisit le match à mettre en avant ║
// ║  par priorité : en direct > prochain à venir > dernier terminé     ║
// ║  (≤ 24 h). Rafraîchissement auto pendant un match (polling 45 s    ║
// ║  intégré au hook).                                                 ║
// ╚══════════════════════════════════════════════════════════════════╝

const WC_SLUGS = ["scotland", "brazil", "morocco"];
const DAY_MS = 24 * 60 * 60 * 1000;

// Sélection du match focus à partir de l'index par adversaire.
// Renvoie { slug, state: "live"|"pre"|"post", data } ou null.
function pickFocus(byOpponent) {
  const entries = Object.entries(byOpponent || {}).map(([slug, d]) => ({ slug, ...d }));
  const now = Date.now();

  const live = entries.find((e) => e.isLive);
  if (live) return { slug: live.slug, state: "live", data: live };

  const upcoming = entries
    .filter((e) => !e.isFinished && !e.isLive && e.kickoff && new Date(e.kickoff).getTime() >= now)
    .sort((a, b) => new Date(a.kickoff) - new Date(b.kickoff))[0];
  if (upcoming) return { slug: upcoming.slug, state: "pre", data: upcoming };

  const recent = entries
    .filter((e) => e.isFinished && e.kickoff && now - new Date(e.kickoff).getTime() <= DAY_MS)
    .sort((a, b) => new Date(b.kickoff) - new Date(a.kickoff))[0];
  if (recent) return { slug: recent.slug, state: "post", data: recent };

  // Filet de sécurité : le dernier match terminé, pour ne jamais afficher un vide.
  const lastFinished = entries
    .filter((e) => e.isFinished && e.kickoff)
    .sort((a, b) => new Date(b.kickoff) - new Date(a.kickoff))[0];
  if (lastFinished) return { slug: lastFinished.slug, state: "post", data: lastFinished };

  return null;
}

// Lien « résumé » : la chronique la plus récente liée à ce match, sinon le
// centre du match, sinon la page calendrier.
function recapHref(slug) {
  const entry = getEntriesSorted().find((e) => e.fixtureOpponent === slug);
  if (entry) return `/journal/${entry.slug}`;
  return getMatch(slug) ? `/live/${slug}` : "/matches";
}

function detailHref(slug) {
  return getMatch(slug) ? `/live/${slug}` : "/matches";
}

function resultMeta(haiti, opp) {
  if (haiti > opp) return { label: "Victoire", cls: "bg-emerald-600 text-white" };
  if (haiti < opp) return { label: "Défaite", cls: "bg-haiti-red text-white" };
  return { label: "Match nul", cls: "bg-white/20 text-white" };
}

// ─── Décor SVG léger : texture de points + swoosh tricolore (bord droit) ──
function HeroBackdrop() {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      aria-hidden="true"
      preserveAspectRatio="xMaxYMid slice"
      viewBox="0 0 1200 600"
    >
      <defs>
        <pattern id="gren-dots" width="22" height="22" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1.4" fill="#FFFFFF" opacity="0.06" />
        </pattern>
      </defs>
      <rect width="1200" height="600" fill="url(#gren-dots)" />
      {/* swooshs tricolores, bord droit */}
      <g fill="none" strokeLinecap="round">
        <path d="M780 -40 C 1020 120, 1020 380, 760 660" stroke="#FFFFFF" strokeOpacity="0.10" strokeWidth="60" />
        <path d="M900 -40 C 1160 160, 1160 420, 880 680" stroke={TEAL} strokeOpacity="0.16" strokeWidth="40" />
        <path d="M1010 -40 C 1260 180, 1260 440, 1000 700" stroke="#D21034" strokeOpacity="0.30" strokeWidth="52" />
      </g>
    </svg>
  );
}

// Bloc équipe : drapeau rectangulaire (style du site) + nom en gros italique.
function TeamBlock({ country, label }) {
  return (
    <div className="flex flex-col items-center gap-2 min-w-0">
      <Flag country={country} size="responsive" />
      <span className="font-display italic font-bold uppercase tracking-tight text-white text-center leading-none whitespace-nowrap text-base sm:text-xl md:text-2xl">
        {label}
      </span>
    </div>
  );
}

// "VS" stylisé avec barre oblique.
function VsMark() {
  return (
    <div className="relative shrink-0 px-1 md:px-2 self-center">
      <span className="font-display italic font-bold text-2xl md:text-4xl text-white/30 select-none">VS</span>
      <span
        className="absolute left-1/2 top-1/2 h-9 md:h-12 w-[2px] -translate-x-1/2 -translate-y-1/2 rotate-[20deg]"
        style={{ background: TEAL }}
        aria-hidden="true"
      />
    </div>
  );
}

// ─── Icônes inline ───────────────────────────────────────────────────
const ico = "w-3.5 h-3.5 shrink-0";
function IconCalendar() {
  return (
    <svg className={ico} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" />
    </svg>
  );
}
function IconClock() {
  return (
    <svg className={ico} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" />
    </svg>
  );
}
function IconPin() {
  return (
    <svg className={ico} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 21s-7-5.5-7-11a7 7 0 0114 0c0 5.5-7 11-7 11z" /><circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

// ─── Compte à rebours (colonnes) ─────────────────────────────────────
function useCountdown(target) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    if (!target) return;
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, [target]);
  const diff = target ? new Date(target).getTime() - now : 0;
  const past = diff <= 0;
  const d = Math.max(0, Math.floor(diff / 86400000));
  const h = Math.max(0, Math.floor((diff / 3600000) % 24));
  const m = Math.max(0, Math.floor((diff / 60000) % 60));
  const s = Math.max(0, Math.floor((diff / 1000) % 60));
  return { d, h, m, s, past };
}

function CountdownColumns({ target }) {
  const { d, h, m, s } = useCountdown(target);
  const cols = [
    { v: d, label: "Jours" },
    { v: h, label: "Heures" },
    { v: m, label: "Minutes" },
    { v: s, label: "Secondes" },
  ];
  return (
    <div className="flex items-stretch justify-center">
      {cols.map((c, i) => (
        <div key={c.label} className="flex items-stretch">
          <div className="flex flex-col items-center px-2 md:px-3 min-w-[58px] md:min-w-[68px]">
            <span className="font-display text-3xl md:text-5xl text-white tabular-nums leading-none">
              {String(c.v).padStart(2, "0")}
            </span>
            <span className="mt-2 text-[9px] md:text-xs uppercase tracking-[0.12em] font-bold whitespace-nowrap" style={{ color: TEAL }}>
              {c.label}
            </span>
          </div>
          {i < cols.length - 1 && <span className="w-px bg-white/15 my-1" aria-hidden="true" />}
        </div>
      ))}
    </div>
  );
}

export function HomeMatchHero() {
  const { byOpponent } = useLiveFixtures();
  const reduce = useReducedMotion();
  const focus = pickFocus(byOpponent) || { slug: "scotland", state: "pre", data: null };
  const { slug, state, data } = focus;

  // Le compte à rebours d'avant-match vit désormais dans le CountdownHero
  // (haut de page). On évite le doublon : ce héros ne s'affiche que lorsqu'un
  // match est en direct ou vient de se terminer (score / résultat).
  if (state === "pre") return null;

  const m = getMatch(slug);

  const oppLabel = m?.opponent?.name || frName(data?.oppName) || slug;
  const competition = m?.group || "Coupe du Monde";
  const kickoff = m?.kickoff || data?.kickoff || null;
  const haiti = data?.haitiGoals ?? 0;
  const opp = data?.oppGoals ?? 0;

  const stateLabel = state === "live" ? "En direct" : state === "post" ? "Terminé" : "Prochain match";
  const ctaHref = state === "post" ? recapHref(slug) : detailHref(slug);

  return (
    <section className="relative overflow-hidden text-white" style={{ backgroundColor: ROYAL_BLUE }}>
      <HeroBackdrop />
      {/* Liseré tricolore (bord gauche) */}
      <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-white/90" />
      <div className="absolute left-1.5 top-0 bottom-0 w-1.5" style={{ background: "#D21034" }} />

      <div className="relative max-w-content mx-auto px-5 py-12 md:py-16">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid lg:grid-cols-[1.15fr_1fr] gap-10 lg:gap-14 items-center"
        >
          {/* ─── Colonne gauche : identité du match ─── */}
          <div>
            {/* Pill compétition + libellé d'état (une seule ligne) */}
            <div className="flex items-center gap-2 sm:gap-3 mb-7 whitespace-nowrap">
              <span
                className="inline-flex items-center px-2.5 py-1 rounded-full text-[9px] sm:text-[10px] md:text-xs font-bold uppercase tracking-wider text-[#0A1F3D]"
                style={{ backgroundColor: TEAL }}
              >
                {competition}
              </span>
              <span className="inline-flex items-center gap-2 text-[9px] sm:text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-white/70">
                {state === "live" && (
                  <span className="w-2 h-2 rounded-full bg-haiti-red motion-safe:animate-pulse" />
                )}
                {stateLabel}
                {state === "live" && data?.elapsed != null ? ` · ${data.elapsed}'` : ""}
              </span>
            </div>

            {/* Drapeaux + VS (noms sur une seule ligne) */}
            <div className="flex items-center justify-center sm:justify-start gap-3 sm:gap-5 md:gap-8 mb-8">
              <TeamBlock country="haiti" label="Haïti" />
              <VsMark />
              <TeamBlock country={slug} label={oppLabel} />
            </div>

            {/* CTA */}
            <Link
              to={ctaHref}
              className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-3.5 bg-haiti-red text-white font-bold uppercase tracking-wide text-sm rounded-full hover:bg-haiti-red-dark transition-colors"
            >
              Espace Match →
            </Link>
          </div>

          {/* ─── Colonne droite : panneau d'état ─── */}
          <div className="w-full">
            <StatePanel state={state} kickoff={kickoff} match={m} haiti={haiti} opp={opp} slug={slug} elapsed={data?.elapsed} />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// Panneau d'état (droite) : pré-match (compte à rebours) / live / terminé.
function StatePanel({ state, kickoff, match, haiti, opp, slug, elapsed }) {
  if (state === "pre" && kickoff) {
    return (
      <div className="relative rounded-2xl px-5 py-6 md:px-8 md:py-8 bg-black/25 border border-white/10 shadow-2xl">
        <p className="text-center text-[11px] md:text-xs font-bold uppercase tracking-[0.25em] text-white/60 mb-5">
          Coup d'envoi dans
        </p>
        <CountdownColumns target={kickoff} />
        {/* Méta (une seule ligne, mise à l'échelle sur petit écran) */}
        <div className="mt-7 pt-5 border-t border-white/10 grid grid-cols-3 gap-2 text-[9px] sm:text-[10px] md:text-xs">
          {match?.dateLabel && (
            <span className="flex items-center gap-1.5 text-white/75 min-w-0">
              <span style={{ color: TEAL }}><IconCalendar /></span>
              <span className="uppercase tracking-wide whitespace-nowrap truncate">{match.dateLabel}</span>
            </span>
          )}
          {match?.timeLabel && (
            <span className="flex items-center gap-1.5 text-white/75 min-w-0 justify-center">
              <span style={{ color: TEAL }}><IconClock /></span>
              <span className="uppercase tracking-wide whitespace-nowrap truncate">{timeOnly(match.timeLabel)}</span>
            </span>
          )}
          {(match?.stadium?.fifaName || match?.stadium?.realName) && (
            <span className="flex items-center gap-1.5 text-white/75 min-w-0 justify-end">
              <span style={{ color: TEAL }}><IconPin /></span>
              <span className="uppercase tracking-wide whitespace-nowrap truncate">{match.stadium.fifaName || match.stadium.realName}</span>
            </span>
          )}
        </div>
      </div>
    );
  }

  // Live / Terminé : score entre les deux crêtes.
  const isLive = state === "live";
  return (
    <div className="relative rounded-2xl px-5 py-8 md:px-8 md:py-10 bg-black/25 border border-white/10 shadow-2xl text-center">
      <div className="flex items-center justify-center gap-2 mb-6">
        {isLive ? (
          <>
            <span className="w-2.5 h-2.5 rounded-full bg-haiti-red motion-safe:animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-haiti-red">
              En direct{elapsed != null ? ` · ${elapsed}'` : ""}
            </span>
          </>
        ) : (
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-white/60">Terminé</span>
        )}
      </div>
      <div className="flex items-center justify-center gap-4 md:gap-6">
        <Flag country="haiti" size="responsive" />
        <div className="font-display tabular-nums leading-none text-5xl md:text-7xl">
          {haiti}
          <span className="text-white/30 mx-2 md:mx-3">–</span>
          {opp}
        </div>
        <Flag country={slug} size="responsive" />
      </div>
      {!isLive && (
        <div className="mt-6">
          <span
            className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider ${resultMeta(haiti, opp).cls}`}
          >
            {resultMeta(haiti, opp).label}
          </span>
        </div>
      )}
    </div>
  );
}

// "21h00 ET · Gillette Stadium" → "21h00 ET" (on garde l'heure pour la pastille).
function timeOnly(timeLabel) {
  if (!timeLabel) return "";
  return timeLabel.split("·")[0].trim();
}

// Frise compacte des trois matchs de groupe (Écosse, Brésil, Maroc).
export function RouteMondial() {
  const { byOpponent } = useLiveFixtures();
  const { t } = useT();

  return (
    <section className="max-w-content mx-auto px-5 py-16 md:py-20">
      <div className="mb-8 md:mb-10">
        <p className="text-haiti-red text-xs uppercase tracking-wider font-bold mb-2">{t("matches.eyebrow")}</p>
        <h2 className="font-display text-3xl md:text-5xl leading-tight">
          {t("home.routeTitle")}
        </h2>
        <p className="text-muted mt-2">{t("matches.wcSub")}</p>
      </div>

      <div className="grid sm:grid-cols-3 gap-3 md:gap-4">
        {WC_SLUGS.map((slug, i) => {
          const m = getMatch(slug);
          const d = byOpponent?.[slug] || null;
          return (
            <RouteCard key={slug} slug={slug} match={m} data={d} index={i} />
          );
        })}
      </div>
    </section>
  );
}

function RouteCard({ slug, match, data, index }) {
  const { t, lang } = useT();
  const dateShort =
    lang === "en" && match?.date
      ? new Date(`${match.date}T00:00:00Z`).toLocaleDateString("en-US", {
          weekday: "long",
          month: "long",
          day: "numeric",
          timeZone: "UTC",
        })
      : match?.dateLabel
        ? match.dateLabel.replace(/ 2026$/, "")
        : "";
  const haitiLabel = lang === "en" ? enName("haiti") : "Haïti";
  const oppLabel =
    lang === "en"
      ? enName(match?.opponent?.country || slug)
      : match?.opponent?.name || frName(slug);

  // Clé de résultat dérivée localement (matches.win/draw/loss) pour rester
  // localisée sans modifier resultMeta, partagé avec HomeMatchHero.
  const outcomeKey = (haiti, opp) =>
    haiti > opp ? "matches.win" : haiti < opp ? "matches.loss" : "matches.draw";

  let pill;
  if (data?.isLive) {
    pill = (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-haiti-red text-white rounded-full text-[11px] font-bold uppercase tracking-wider">
        <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
        {data.haitiGoals}–{data.oppGoals} · {data.elapsed != null ? `${data.elapsed}'` : "Live"}
      </span>
    );
  } else if (data?.isFinished) {
    const r = resultMeta(data.haitiGoals, data.oppGoals);
    pill = (
      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider ${r.cls}`}>
        {data.haitiGoals}–{data.oppGoals} · {t(outcomeKey(data.haitiGoals, data.oppGoals))}
      </span>
    );
  } else {
    pill = (
      <span className="inline-flex items-center px-2.5 py-1 bg-bg border border-line text-muted rounded-full text-[11px] font-bold uppercase tracking-wider">
        {t("matches.statusUpcoming")}
      </span>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
    >
      <Link
        to={`/live/${slug}`}
        className="block h-full bg-white border border-line rounded-lg p-4 md:p-5 hover:border-haiti-red hover:shadow-md transition-all"
      >
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="text-[11px] font-bold uppercase tracking-wider text-muted">
            Match {index + 1}
          </span>
          <span className="text-[11px] font-semibold text-muted tabular-nums">{dateShort}</span>
        </div>
        <div className="flex items-center gap-3 mb-3">
          <Flag country="haiti" size="sm" />
          <span className="font-display text-base md:text-lg leading-none">{haitiLabel}</span>
          <span className="text-muted text-sm">·</span>
          <span className="font-display text-base md:text-lg leading-none truncate">{oppLabel}</span>
          <span className="ml-auto">
            <Flag country={slug} size="sm" />
          </span>
        </div>
        <div className="flex items-center justify-between gap-2">
          {pill}
          <span className="text-xs font-semibold text-haiti-blue">{t("matches.details")} →</span>
        </div>
      </Link>
    </motion.div>
  );
}
