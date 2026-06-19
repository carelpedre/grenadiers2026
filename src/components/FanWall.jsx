import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { fetchApprovedMessages, fetchWallStats } from "../lib/fanWallApi";
import { useT } from "../lib/i18n";

export function WallStatLine({ count, countries, className = "" }) {
  const { t, lang } = useT();
  if (!count) return null;
  // French treats 0 and 1 as singular; English only 1.
  const isSing = (n) => (lang === "en" ? n === 1 : n <= 1);
  return (
    <p className={`text-sm font-semibold ${className}`}>
      <span className="tabular-nums">{count}</span> {isSing(count) ? t("wall.message") : t("wall.messages")} {t("wall.from")}{" "}
      <span className="tabular-nums">{countries}</span> {isSing(countries) ? t("wall.country") : t("wall.countries")}
    </p>
  );
}

// Petit drapeau rectangulaire à partir d'un code ISO-2 (style aligné sur les
// drapeaux d'équipe du site). Source légère flagcdn ; rien si pas de code.
export function CountryFlag({ code, className = "" }) {
  if (!code) return null;
  const cc = String(code).toLowerCase();
  return (
    <img
      src={`https://flagcdn.com/24x18/${cc}.png`}
      srcSet={`https://flagcdn.com/48x36/${cc}.png 2x`}
      width={20}
      height={15}
      alt=""
      loading="lazy"
      className={`inline-block w-5 h-[15px] rounded-[2px] border border-line/40 object-cover shrink-0 ${className}`}
    />
  );
}

// Carte d'un message de supporter (réutilisée sur l'accueil et /mur).
export function FanMessageCard({ m, className = "" }) {
  const place = [m.location_city, m.location_country].filter(Boolean).join(", ");
  return (
    <figure
      className={`bg-white border border-line rounded-xl p-5 flex flex-col ${className}`}
    >
      <span className="text-haiti-red text-3xl leading-none font-display mb-1">“</span>
      <blockquote className="text-ink leading-relaxed whitespace-pre-wrap break-words flex-1">
        {m.message}
      </blockquote>
      <figcaption className="mt-4 pt-3 border-t border-line">
        <p className="font-display text-base leading-none">{m.display_name}</p>
        {place && (
          <p className="text-xs text-muted mt-1.5 flex items-center gap-1.5">
            {m.location_country_code ? (
              <CountryFlag code={m.location_country_code} />
            ) : (
              <span aria-hidden="true">📍</span>
            )}
            <span>{place}</span>
          </p>
        )}
      </figcaption>
    </figure>
  );
}

// Section accueil : aperçu vivant du mur + CTA vers /mur.
export default function FanWall() {
  const { t } = useT();
  const [messages, setMessages] = useState(null);
  const [stats, setStats] = useState({ count: 0, countries: 0 });

  useEffect(() => {
    let alive = true;
    fetchApprovedMessages(12).then((rows) => {
      if (alive) setMessages(rows || []);
    });
    fetchWallStats().then((s) => {
      if (alive) setStats(s);
    });
    return () => {
      alive = false;
    };
  }, []);

  const hasMessages = Array.isArray(messages) && messages.length > 0;
  // Pour un défilement fluide, on duplique la liste (assez d'éléments).
  const track = hasMessages ? [...messages, ...messages] : [];

  return (
    <section className="relative overflow-hidden bg-haiti-blue text-bg">
      <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-white/90" />
      <div className="absolute left-1.5 top-0 bottom-0 w-1.5 bg-haiti-red" />

      <div className="max-w-content mx-auto px-5 py-16 md:py-20">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5 mb-10">
          <div>
            <p className="text-haiti-red-light text-xs uppercase tracking-wider font-bold mb-2">
              {t("mur.eyebrow")}
            </p>
            <h2 className="font-display text-3xl md:text-5xl leading-tight">
              {t("home.fanwall.title")}
            </h2>
            <p className="text-bg/70 mt-2 max-w-prose">
              {t("home.fanwall.subtitle")}
            </p>
            <WallStatLine
              count={stats.count}
              countries={stats.countries}
              className="text-haiti-red-light mt-3"
            />
          </div>
          <div className="flex flex-wrap gap-3 self-start md:self-auto">
            <Link
              to="/mur"
              className="inline-flex items-center gap-2 px-6 py-3 bg-haiti-red text-bg font-semibold rounded-full hover:bg-haiti-red-dark transition-colors whitespace-nowrap"
            >
              {t("home.fanwall.leaveCta")} →
            </Link>
            <Link
              to="/mur#messages"
              className="inline-flex items-center gap-2 px-6 py-3 bg-bg/10 text-bg font-semibold rounded-full border border-bg/25 hover:bg-bg/20 transition-colors whitespace-nowrap"
            >
              {t("home.fanwall.viewCta")}
            </Link>
          </div>
        </div>
      </div>

      {/* Défilement doux des messages */}
      {hasMessages ? (
        <div className="relative overflow-hidden pb-16 md:pb-20">
          <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-haiti-blue to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-haiti-blue to-transparent z-10 pointer-events-none" />
          <motion.div
            className="flex gap-4 px-5"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: Math.max(12, messages.length * 2.2), ease: "linear", repeat: Infinity }}
          >
            {track.map((m, i) => (
              <FanMessageCard
                key={`${m.id}-${i}`}
                m={m}
                className="w-[280px] md:w-[340px] shrink-0 text-left"
              />
            ))}
          </motion.div>
        </div>
      ) : (
        <div className="max-w-content mx-auto px-5 pb-16 md:pb-20">
          <div className="bg-bg/5 border border-bg/15 rounded-xl p-8 text-center">
            <p className="text-bg/80">
              {t("home.fanwall.empty")}
            </p>
            <Link
              to="/mur"
              className="mt-4 inline-flex items-center gap-2 px-6 py-3 bg-haiti-red text-bg font-semibold rounded-full hover:bg-haiti-red-dark transition-colors"
            >
              {t("home.fanwall.leaveCta")} →
            </Link>
          </div>
        </div>
      )}
    </section>
  );
}
