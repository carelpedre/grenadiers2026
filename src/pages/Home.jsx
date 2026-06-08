import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { SponsorBanner } from "../components/Sponsor";
import ImagePlaceholder from "../components/ImagePlaceholder";
import { HomeMatchHero, RouteMondial } from "../components/HomeLiveHero";
import FanWall from "../components/FanWall";
import { fadeUp, stagger, CountUpNumber } from "../lib/motion";
import { squad, squadStats } from "../data/squad";
import { getEntriesSorted } from "../data/diary";
import { useT } from "../lib/i18n";

const featuredPlayers = [
  { slug: "jean-ricner-bellegarde", name: "Bellegarde", role: "Milieu de terrain · Wolverhampton", photo: "/images/photos/jean-ricner-bellegarde.jpg" },
  { slug: "wilson-isidor", name: "Isidor", role: "Attaquant Premier League · Sunderland", photo: "/images/photos/wilson-isidor.jpg" },
  { slug: "frantzdy-pierrot", name: "Pierrot", role: "Attaquant · Çaykur Rizespor", photo: "/images/photos/frantzdy-pierrot.jpg" },
  { slug: "duckens-nazon", name: "Nazon", role: "Meilleur buteur de tous les temps · Esteghlal", photo: "/images/photos/duckens-nazon.jpg" },
  { slug: "johny-placide", name: "Placide", role: "Capitaine · SC Bastia", photo: "/images/photos/johny-placide.jpg" },
  { slug: "woodensky-pierre", name: "Pierre", role: "Le local · Violette AC", photo: "/images/photos/woodensky-pierre.jpg" },
];

function getSurnameMarquee() {
  return [
    ...squad.goalkeepers,
    ...squad.defenders,
    ...squad.midfielders,
    ...squad.forwards,
  ].map((p) => p.name.split(" ").slice(-1)[0]);
}

export default function Home() {
  const { t } = useT();
  const surnames = getSurnameMarquee();

  return (
    <div>
      <Hero t={t} />
      <PlayerMarquee surnames={surnames} />

      {/* State-aware match hero — live / pre-match / post-match */}
      <HomeMatchHero />

      <SponsorBanner placement="home-after-hero" />

      {/* Route vers le Mondial — compact, state-aware timeline */}
      <RouteMondial />

      <SquadCarousel />
      <FanWall />
      <JournalPreview />

      {/* 1974 History teaser */}
      <section className="bg-ink text-bg relative overflow-hidden">
        <div className="absolute top-0 right-0 h-full w-2 flex flex-col">
          <div className="flex-1 bg-haiti-blue"></div>
          <div className="flex-1 bg-haiti-red"></div>
        </div>
        <div className="max-w-content mx-auto px-5 py-24 relative">
          <div className="grid md:grid-cols-2 gap-10 lg:gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.7 }}>
              <p className="text-haiti-red text-xs uppercase tracking-wider font-bold mb-4">1974 · Allemagne de l'Ouest</p>
              <h2 className="font-display text-4xl md:text-6xl mb-6 leading-[1.05]">
                Les hommes qui ont<br />
                <span className="text-haiti-red">ouvert la route.</span>
              </h2>
              <p className="text-bg/80 text-lg leading-relaxed mb-3">
                Le 15 juin 1974, à Munich, 53 000 spectateurs voient une équipe caribéenne défier l'Italie. Henri Françillon tient les Azzurri en échec en première période. Puis Manno Sanon ouvre le score — premier but encaissé par Dino Zoff depuis <CountUpNumber target={1142} duration={2000} className="text-haiti-red font-display font-bold" /> minutes.
              </p>
              <p className="text-bg/80 text-lg leading-relaxed mb-8">
                Vingt-deux Haïtiens. Trois matchs. La route qui mène jusqu'en 2026.
              </p>
              <Link to="/history-1974" className="inline-flex items-center gap-2 text-haiti-red font-semibold hover:gap-3 transition-all">
                Lire le récit complet →
              </Link>
            </motion.div>
            <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.7, delay: 0.1 }}>
              <ImagePlaceholder src="/images/photos/home-1974.jpg" aspect="4/5" label="1974 · Munich" className="border border-bg/10" />
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}

function Hero({ t }) {
  return (
    <section className="relative overflow-hidden min-h-[80vh] md:min-h-[90vh] flex items-center">
      <div className="absolute inset-0">
        {/* Background: video preferred, image as poster + fallback.
            Drop a 1080p MP4 (~5-10MB, 15-30s loop, H.264, no audio) at:
              public/videos/home-hero.mp4
            Without the file, the <video> tag silently fails and the
            ImagePlaceholder behind it shows through. */}
        <video
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/images/photos/home-hero.jpg"
          aria-hidden="true"
        >
          <source src="/videos/home-hero.mp4" type="video/mp4" />
          <source src="/videos/home-hero.webm" type="video/webm" />
        </video>
        <ImagePlaceholder src="/images/photos/home-hero.jpg" aspect="16/9" label="Les Grenadiers" rounded={false} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-br from-ink/85 via-ink/70 to-haiti-blue-dark/80"></div>
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-ink/90 to-transparent"></div>
      </div>

      <motion.div className="absolute left-0 top-0 bottom-0 w-1.5 bg-haiti-blue" initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }} style={{ originY: 0 }} />
      <motion.div className="absolute left-1.5 top-0 bottom-0 w-1.5 bg-haiti-red" initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }} style={{ originY: 0 }} />

      <div className="relative max-w-content mx-auto px-5 py-24 md:py-32 w-full">
        <div className="max-w-3xl">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.05 }} className="inline-flex items-center gap-2 px-3 py-1.5 bg-haiti-red text-bg text-xs font-bold uppercase tracking-wider rounded-full mb-7">
            <span className="w-1.5 h-1.5 bg-bg rounded-full animate-pulse"></span>
            {t("home.hero.badge")}
          </motion.div>

          <motion.h1 className="font-display text-6xl md:text-8xl text-bg mb-7 leading-[0.95]" initial="hidden" animate="show" variants={stagger(0.06, 0.05)}>
            <motion.span variants={fadeUp} className="block">{t("home.hero.title1")}</motion.span>
            <motion.span variants={fadeUp} className="block text-haiti-red">{t("home.hero.title2")}</motion.span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.12 }} className="text-bg/85 text-lg md:text-xl leading-relaxed mb-9 max-w-2xl">
            {t("home.hero.body")}
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.18 }} className="flex flex-wrap gap-3">
            <Link to="/matches" className="inline-flex items-center gap-2 px-7 py-3.5 bg-haiti-red text-bg font-semibold rounded-full hover:bg-haiti-red-dark transition-colors">
              {t("home.hero.fixtures")} →
            </Link>
            <Link to="/squad" className="inline-flex items-center gap-2 px-7 py-3.5 bg-bg/10 text-bg font-semibold rounded-full hover:bg-bg/20 transition-colors border border-bg/20 backdrop-blur-sm">
              Découvrir le groupe
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function PlayerMarquee({ surnames }) {
  const doubled = [...surnames, ...surnames];
  return (
    <div className="bg-ink border-t border-bg/5 py-5 overflow-hidden relative">
      <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-ink to-transparent z-10 pointer-events-none"></div>
      <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-ink to-transparent z-10 pointer-events-none"></div>
      <motion.div className="flex gap-10 whitespace-nowrap" animate={{ x: ["0%", "-50%"] }} transition={{ duration: 25, ease: "linear", repeat: Infinity }}>
        {doubled.map((name, i) => (
          <span key={i} className="font-display text-2xl text-bg/40 uppercase tracking-wider">
            {name}<span className="ml-10 text-haiti-red">•</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}

function SquadCarousel() {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % featuredPlayers.length), 4000);
    return () => clearInterval(id);
  }, []);
  const current = featuredPlayers[index];

  return (
    <section className="bg-white border-y border-line">
      <div className="max-w-content mx-auto px-5 py-20">
        <div className="grid lg:grid-cols-[1fr_1.3fr] gap-10 lg:gap-16 items-center">
          <div>
            <p className="text-haiti-red text-xs uppercase tracking-wider font-bold mb-3">Le groupe des 26</p>
            <h2 className="font-display text-4xl md:text-5xl mb-5 leading-tight">La sélection est connue.</h2>
            <p className="text-muted text-lg leading-relaxed mb-7 max-w-prose">
              Vingt-six Haïtiens, qui défendent les couleurs de clubs en Europe, en Amérique du Nord, en Amérique du Sud, en Asie et à Port-au-Prince. Tous portent le bleu et le rouge.
            </p>
            <Link to="/squad" className="inline-flex items-center gap-2 px-6 py-3 bg-haiti-blue text-bg font-semibold rounded-full hover:bg-haiti-blue-dark transition-colors">
              Voir le groupe complet →
            </Link>
            <div className="grid grid-cols-6 gap-2 mt-8 max-w-md">
              {featuredPlayers.map((p, i) => (
                <button key={p.slug} onClick={() => setIndex(i)} className={`relative rounded-md overflow-hidden border-2 transition-all ${i === index ? "border-haiti-red scale-110" : "border-line opacity-50 hover:opacity-100"}`} aria-label={p.name}>
                  <ImagePlaceholder src={p.photo} label={p.name} aspect="1/1" rounded={false} />
                </button>
              ))}
            </div>
          </div>
          <div className="relative">
            <motion.div key={current.slug} initial={{ opacity: 0, scale: 1.02 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }} className="relative rounded-2xl overflow-hidden aspect-[4/5]">
              <ImagePlaceholder src={current.photo} label={current.name} aspect="4/5" rounded={false} loading="eager" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-bg">
                <p className="text-haiti-red text-xs uppercase tracking-wider font-bold mb-1">À la une</p>
                <h3 className="font-display text-4xl md:text-5xl mb-1">{current.name}</h3>
                <p className="text-bg/80 text-sm">{current.role}</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

function JournalPreview() {
  const entries = getEntriesSorted().slice(0, 4);
  if (entries.length === 0) return null;

  // Feature the newest entry as a large card; the rest fill a compact row.
  const [featured, ...rest] = entries;

  return (
    <section className="bg-bg border-t border-line">
      <div className="max-w-content mx-auto px-5 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
          className="flex items-end justify-between gap-4 mb-10"
        >
          <div>
            <p className="text-haiti-red text-xs uppercase tracking-wider font-bold mb-2">
              Le Journal
            </p>
            <h2 className="font-display text-4xl md:text-5xl leading-tight">
              La sélection, jour après jour.
            </h2>
          </div>
          <Link
            to="/journal"
            className="text-sm font-semibold text-haiti-blue hover:text-haiti-red transition-colors whitespace-nowrap"
          >
            Toutes les chroniques →
          </Link>
        </motion.div>

        <FeaturedJournalCard entry={featured} />

        {rest.length > 0 && (
          <motion.div
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-5"
            variants={stagger(0.12)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
          >
            {rest.map((entry) => (
              <JournalCard key={entry.slug} entry={entry} />
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}

function FeaturedJournalCard({ entry }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6 }}
    >
      <Link
        to={`/journal/${entry.slug}`}
        className="group block bg-white border border-line rounded-lg overflow-hidden hover:border-haiti-red hover:shadow-lg transition-all md:grid md:grid-cols-2"
      >
        <div className="relative overflow-hidden aspect-[16/9] md:aspect-auto md:h-full md:min-h-[280px]">
          <motion.div className="h-full" whileHover={{ scale: 1.03 }} transition={{ duration: 0.5 }}>
            <ImagePlaceholder
              src={entry.cover}
              label={entry.title}
              aspect="16/9"
              rounded={false}
              className="w-full h-full object-cover"
            />
          </motion.div>
          <span className="absolute top-3 left-3 px-2.5 py-1 bg-haiti-red text-bg text-[10px] font-bold uppercase tracking-wider rounded">
            À la une
          </span>
        </div>
        <div className="p-6 md:p-8 flex flex-col justify-center">
          <div className="flex items-center gap-2 mb-3 text-xs flex-wrap">
            <span className="text-haiti-red uppercase tracking-wider font-bold">{entry.eyebrow}</span>
            <span className="text-muted">·</span>
            <span className="text-muted">{entry.dateLabel}</span>
          </div>
          <h3 className="font-display text-2xl md:text-3xl mb-3 leading-snug">{entry.title}</h3>
          <p className="text-muted leading-relaxed line-clamp-3">{entry.dek}</p>
          <p className="mt-4 text-sm font-semibold text-haiti-blue group-hover:text-haiti-red transition-colors">
            Lire la chronique →
          </p>
        </div>
      </Link>
    </motion.div>
  );
}

function JournalCard({ entry }) {
  return (
    <motion.div variants={fadeUp} whileHover={{ y: -4 }} transition={{ duration: 0.25 }}>
      <Link
        to={`/journal/${entry.slug}`}
        className="block bg-white border border-line rounded-lg overflow-hidden hover:border-haiti-red hover:shadow-lg transition-all h-full"
      >
        <div className="overflow-hidden">
          <motion.div whileHover={{ scale: 1.04 }} transition={{ duration: 0.5 }}>
            <ImagePlaceholder
              src={entry.cover}
              label={entry.title}
              aspect="16/9"
              rounded={false}
            />
          </motion.div>
        </div>
        <div className="p-5">
          <div className="flex items-center gap-2 mb-2 text-xs flex-wrap">
            <span className="text-haiti-red uppercase tracking-wider font-bold">
              {entry.eyebrow}
            </span>
            <span className="text-muted">·</span>
            <span className="text-muted">{entry.dateLabel}</span>
          </div>
          <h3 className="font-display text-lg md:text-xl mb-2 leading-snug">{entry.title}</h3>
          <p className="text-muted text-sm leading-relaxed">{entry.dek}</p>
          <p className="mt-3 text-sm font-semibold text-haiti-blue">Lire la chronique →</p>
        </div>
      </Link>
    </motion.div>
  );
}
