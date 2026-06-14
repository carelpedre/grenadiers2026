import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { matches } from "../data/matches";
import { getMatch } from "../data/liveMatches";

// ╔══════════════════════════════════════════════════════════════════╗
// ║  COUNTDOWN HERO — prise de contrôle du héros pour le coup d'envoi ║
// ║                                                                    ║
// ║  Source de vérité : src/data/matches.js (aucune date codée en    ║
// ║  dur). On choisit le prochain match d'Haïti et on pilote une      ║
// ║  machine à états :                                                 ║
// ║    (a) avant le jour J  → « PROCHAIN MATCH », J-n + compte à rebours║
// ║    (b) jour J, avant K.O.→ « JOU A RIVE », rebours h/m/s           ║
// ║    (c) K.O. → K.O. +135' → « MATCH EN COURS » (lien match)        ║
// ║    (d) après +135'       → on bascule sur le match suivant         ║
// ║  Plus de fixtures → « Mèsi Grenadye ».                            ║
// ╚══════════════════════════════════════════════════════════════════╝

const DAY_MS = 86400000;
// Coup d'envoi → fin estimée : 90' + mi-temps + arrêts de jeu.
const MATCH_RUNTIME_MS = 135 * 60 * 1000;
// Le soir de la qualification (l'imagerie de fond) : Haïti valide son billet
// pour le Mondial. On compte les jours écoulés depuis pour relier le héros
// au compte à rebours : la fête d'hier, l'attente, le coup d'envoi de demain.
const QUALIFICATION_MS = new Date("2025-11-18T00:00:00-04:00").getTime();

// Drapeaux (émojis) par code pays utilisé dans matches.js.
const FLAG = {
  haiti: "🇭🇹",
  scotland: "🏴󠁧󠁢󠁳󠁣󠁴󠁿",
  brazil: "🇧🇷",
  morocco: "🇲🇦",
};

// Décale l'offset ISO ("-04:00") en millisecondes.
function offsetMsFromIso(iso) {
  const m = /([+-])(\d{2}):(\d{2})$/.exec(iso || "");
  if (!m) return 0;
  return (m[1] === "-" ? -1 : 1) * (Number(m[2]) * 60 + Number(m[3])) * 60000;
}

// Minuit (00h00) du jour contenant `ms`, dans le fuseau d'offset donné.
function dayStartInOffset(ms, offsetMs) {
  const shifted = ms + offsetMs;
  return Math.floor(shifted / DAY_MS) * DAY_MS - offsetMs;
}

// Adversaire = l'équipe qui n'est pas Haïti.
function opponentOf(match) {
  return match.home.country === "haiti" ? match.away : match.home;
}

// Match mis en avant = premier dont la fenêtre de jeu n'est pas terminée.
function pickFocus(now) {
  for (const match of matches) {
    const kickoffMs = new Date(match.kickoff).getTime();
    if (kickoffMs + MATCH_RUNTIME_MS > now) return match;
  }
  return null;
}

// Heure du coup d'envoi rendue dans le fuseau du visiteur (Intl).
function localKickoff(kickoff) {
  try {
    const parts = new Intl.DateTimeFormat("fr-FR", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }).formatToParts(new Date(kickoff));
    const hh = parts.find((p) => p.type === "hour")?.value ?? "";
    const mm = parts.find((p) => p.type === "minute")?.value ?? "";
    return hh && mm ? `${hh}h${mm}` : "";
  } catch {
    return "";
  }
}

// Le fil narratif qui relie le soir de la qualification (la vidéo) au
// compte à rebours. `daysSince` = jours depuis le 18 novembre 2025.
function StoryLine({ stateKey, daysSince }) {
  if (stateKey === "live") {
    return (
      <>
        <span className="text-gold font-semibold">{daysSince} jours</span> après la
        qualification, les Grenadiers sont enfin sur le terrain.
      </>
    );
  }
  if (stateKey === "matchday") {
    return (
      <>
        Le <span className="text-gold font-semibold">18 novembre 2025</span>, tout un
        peuple rêvait de ce jour. Il est arrivé.
      </>
    );
  }
  return (
    <>
      Le <span className="text-gold font-semibold">18 novembre 2025</span>, Haïti
      décrochait son billet pour le Mondial.{" "}
      <span className="text-gold font-semibold">{daysSince} jours</span> plus tard,
      l'attente touche à sa fin.
    </>
  );
}

function localTzName(kickoff) {
  try {
    const parts = new Intl.DateTimeFormat("fr-FR", {
      hour: "2-digit",
      timeZoneName: "short",
    }).formatToParts(new Date(kickoff));
    return parts.find((p) => p.type === "timeZoneName")?.value ?? "";
  } catch {
    return "";
  }
}

export default function CountdownHero() {
  const reduce = useReducedMotion();
  // Initialisé en synchrone : le premier rendu (et le HTML pré-rendu) montre
  // déjà un état cohérent, pas de flash avant l'hydratation.
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const match = pickFocus(now);

  return (
    <section className="relative overflow-hidden bg-ink text-bg">
      {/* Deux colonnes de même hauteur à partir de lg : le texte à gauche (navy),
          le POSTER ENTIER à droite (non recadré, qui définit la hauteur). En
          dessous de lg : une seule colonne navy (le poster est la bannière
          juste au-dessus). Aucun visage derrière le texte. */}
      <div className="grid xl:grid-cols-[1fr_1.12fr] items-stretch">
        {/* ─── Colonne gauche : compte à rebours sur navy plein ─── */}
        <div className="relative flex items-center min-h-[62vh] xl:min-h-0 px-5 xl:pl-16 xl:pr-10 py-12 xl:py-10">
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(85% 65% at 25% 28%, rgba(0,32,159,.45), rgba(0,32,159,0) 65%), #0A1F3D",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-ink/40" />
          {/* liseré tricolore, bord gauche */}
          <motion.div
            className="absolute left-0 top-0 bottom-0 w-1.5 bg-haiti-blue"
            initial={reduce ? false : { scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            style={{ originY: 0 }}
          />
          <motion.div
            className="absolute left-1.5 top-0 bottom-0 w-1.5 bg-haiti-red"
            initial={reduce ? false : { scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            style={{ originY: 0 }}
          />
          <div className="relative w-full">
            {match ? (
              <FocusContent match={match} now={now} reduce={reduce} />
            ) : (
              <FarewellContent reduce={reduce} />
            )}
          </div>
        </div>

        {/* ─── Colonne droite : le poster ENTIER, non recadré. Il définit la
            hauteur de la rangée ; le texte (compact) s'y adapte. ─── */}
        <div className="relative hidden xl:flex items-center bg-ink overflow-hidden">
          <picture className="block w-full">
            <source
              type="image/webp"
              srcSet="/images/photos/haiti-squad-hero-1280.webp 1280w, /images/photos/haiti-squad-hero-1920.webp 1920w"
              sizes="55vw"
            />
            <img
              src="/images/photos/haiti-squad-hero-1920.jpg"
              srcSet="/images/photos/haiti-squad-hero-1280.jpg 1280w, /images/photos/haiti-squad-hero-1920.jpg 1920w"
              sizes="55vw"
              alt="L'équipe d'Haïti pour la Coupe du Monde 2026"
              fetchPriority="high"
              className="block w-full h-auto"
            />
          </picture>
        </div>
      </div>
    </section>
  );
}

function FocusContent({ match, now, reduce }) {
  const opp = opponentOf(match);
  const slug = opp.country;
  const kickoffMs = new Date(match.kickoff).getTime();
  const offsetMs = offsetMsFromIso(match.kickoff);

  const matchDayStart = dayStartInOffset(kickoffMs, offsetMs);
  const todayStart = dayStartInOffset(now, offsetMs);
  const daysToMatchDay = Math.round((matchDayStart - todayStart) / DAY_MS);

  const diff = kickoffMs - now;
  const live = diff <= 0 && now < kickoffMs + MATCH_RUNTIME_MS;
  const isMatchDay = !live && daysToMatchDay <= 0; // jour J, avant le coup d'envoi

  const totalSec = Math.max(0, Math.floor(diff / 1000));
  const d = Math.floor(totalSec / 86400);
  const h = Math.floor((totalSec / 3600) % 24);
  const m = Math.floor((totalSec / 60) % 60);
  const s = Math.floor(totalSec % 60);

  const hasMatchPage = !!getMatch(slug);
  const matchHref = hasMatchPage ? `/live/${slug}` : "/matches";

  const stateKey = live ? "live" : isMatchDay ? "matchday" : "pre";
  const daysSince = Math.max(0, Math.floor((now - QUALIFICATION_MS) / DAY_MS));

  const stadium = match.stadium?.fifaName || match.stadium?.realName || "";
  const city = match.stadium?.city || "";
  const localTime = localKickoff(match.kickoff);
  const tz = localTzName(match.kickoff);

  const overline = live ? null : isMatchDay ? "JOU A RIVE 🇭🇹" : "PROCHAIN MATCH";

  return (
    <motion.div
      className="max-w-3xl"
      initial={reduce ? false : { opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      {overline && (
        <p className="text-gold text-xs md:text-sm uppercase tracking-[0.28em] font-bold mb-4">
          {overline}
        </p>
      )}

      {/* ─── Compte à rebours compact (plus de grand J-n) ─── */}
      {live ? (
        <Link to={matchHref} className="group inline-flex items-center gap-3 mb-5">
          <span className="w-3 h-3 rounded-full bg-haiti-red motion-safe:animate-pulse" />
          <span className="font-display text-4xl sm:text-5xl md:text-6xl leading-none text-bg uppercase tracking-tight">
            Match en cours
          </span>
        </Link>
      ) : (
        <div className="mb-5">
          <CountRow
            cols={
              isMatchDay
                ? [
                    { v: h, label: "Heures" },
                    { v: m, label: "Minutes" },
                    { v: s, label: "Secondes" },
                  ]
                : [
                    { v: d, label: "Jours" },
                    { v: h, label: "Heures" },
                    { v: m, label: "Minutes" },
                    { v: s, label: "Secondes" },
                  ]
            }
          />
        </div>
      )}

      {/* ─── Fil narratif : la qualification → le coup d'envoi ─── */}
      <p className="text-bg/70 text-xs sm:text-sm leading-relaxed max-w-xl mb-4">
        <StoryLine stateKey={stateKey} daysSince={daysSince} />
      </p>

      {/* ─── Fine règle bleu / rouge ─── */}
      <div className="flex items-center gap-0 mb-4 max-w-[12rem]">
        <span className="h-[3px] flex-1 bg-haiti-blue rounded-full" />
        <span className="h-[3px] flex-1 bg-haiti-red rounded-full" />
      </div>

      {/* ─── Ligne d'identité du match ─── */}
      <p className="font-display text-xl sm:text-2xl md:text-3xl leading-tight text-bg">
        <span className="whitespace-nowrap">Ayiti {FLAG.haiti}</span>
        <span className="text-bg/40 mx-2 sm:mx-3">vs</span>
        <span className="whitespace-nowrap">
          {opp.name} {FLAG[slug] || ""}
        </span>
      </p>

      <p className="mt-2 text-bg/75 text-xs sm:text-sm">
        {[stadium, city, match.date].filter(Boolean).join(" · ")}
      </p>

      {localTime && (
        <p className="mt-1 text-bg/60 text-xs sm:text-sm">
          Coup d'envoi · <span className="text-bg/90 font-semibold">{localTime}</span>
          {tz ? ` (${tz})` : ""}, votre heure locale
        </p>
      )}

      {!live && (
        <Link
          to="/matches"
          className="inline-flex items-center gap-2 mt-5 text-gold font-semibold hover:gap-3 transition-all"
        >
          Calendrier complet →
        </Link>
      )}
      {live && (
        <Link
          to={matchHref}
          className="inline-flex items-center gap-2 mt-7 px-7 py-3.5 bg-haiti-red text-bg font-semibold rounded-full hover:bg-haiti-red-dark transition-colors"
        >
          Suivre le match →
        </Link>
      )}
    </motion.div>
  );
}

function FarewellContent({ reduce }) {
  return (
    <motion.div
      className="max-w-3xl"
      initial={reduce ? false : { opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <p className="text-gold text-xs md:text-sm uppercase tracking-[0.28em] font-bold mb-5">
        Coupe du Monde 2026
      </p>
      <h1 className="font-display text-5xl sm:text-6xl md:text-8xl leading-[0.95] text-bg mb-6">
        Mèsi Grenadye {FLAG.haiti}
      </h1>
      <div className="flex items-center gap-0 mb-6 max-w-xs">
        <span className="h-[3px] flex-1 bg-haiti-blue rounded-full" />
        <span className="h-[3px] flex-1 bg-haiti-red rounded-full" />
      </div>
      <p className="text-bg/75 text-lg leading-relaxed mb-7 max-w-xl">
        Trois matchs. Un seul drapeau. Une fierté qui ne s'éteint pas.
      </p>
      <Link
        to="/journal"
        className="inline-flex items-center gap-2 text-gold font-semibold hover:gap-3 transition-all"
      >
        Revivre l'aventure →
      </Link>
    </motion.div>
  );
}

// Rangée de colonnes du compte à rebours. tabular-nums + largeur minimale fixe
// pour éviter tout décalage de mise en page quand les chiffres défilent.
function CountRow({ cols }) {
  return (
    <div className="flex items-stretch">
      {cols.map((c, i) => (
        <div key={c.label} className="flex items-stretch">
          <div className="flex flex-col items-center px-2 md:px-3 min-w-[52px] sm:min-w-[60px] md:min-w-[74px]">
            <span className="font-display text-3xl sm:text-4xl md:text-6xl text-bg tabular-nums leading-none">
              {String(c.v).padStart(2, "0")}
            </span>
            <span className="mt-2 text-[9px] sm:text-[10px] md:text-xs uppercase tracking-[0.15em] font-bold text-gold whitespace-nowrap">
              {c.label}
            </span>
          </div>
          {i < cols.length - 1 && (
            <span className="w-px bg-bg/15 my-1.5" aria-hidden="true" />
          )}
        </div>
      ))}
    </div>
  );
}
