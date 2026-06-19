import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { SponsorBanner } from "../components/Sponsor";
import ImagePlaceholder from "../components/ImagePlaceholder";
import { HomeMatchHero, RouteMondial } from "../components/HomeLiveHero";
import CountdownHero from "../components/CountdownHero";
import FanWall from "../components/FanWall";
import { fetchApprovedPhotos, fanPhotoUrl } from "../lib/fanGalleryApi";
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
  const surnames = getSurnameMarquee();
  const { t } = useT();

  return (
    <div>
      <PosterBanner />
      <CountdownHero />
      <HeroCtaRow />
      <PlayerMarquee surnames={surnames} />

      {/* State-aware match hero — live / pre-match / post-match */}
      <HomeMatchHero />

      <SponsorBanner placement="home-after-hero" />

      {/* Route vers le Mondial — compact, state-aware timeline (calendrier) */}
      <RouteMondial />

      {/* Galerie des supporters · placée au-dessus du Journal */}
      <GalleryPreview />
      {/* Le Journal */}
      <JournalPreview />
      <FanWall />

      {/* 1974 History teaser */}
      <section className="bg-ink text-bg relative overflow-hidden">
        <div className="absolute top-0 right-0 h-full w-2 flex flex-col">
          <div className="flex-1 bg-haiti-blue"></div>
          <div className="flex-1 bg-haiti-red"></div>
        </div>
        <div className="max-w-content mx-auto px-5 py-24 relative">
          <div className="grid md:grid-cols-2 gap-10 lg:gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.7 }}>
              <p className="text-haiti-red text-xs uppercase tracking-wider font-bold mb-4">{t("home.munich.eyebrow")}</p>
              <h2 className="font-display text-4xl md:text-6xl mb-6 leading-[1.05]">
                {t("home.munich.title1")}<br />
                <span className="text-haiti-red">{t("home.munich.title2")}</span>
              </h2>
              <p className="text-bg/80 text-lg leading-relaxed mb-3">
                {t("home.munich.body1")} <CountUpNumber target={1142} duration={2000} className="text-haiti-red font-display font-bold" /> {t("home.munich.minutes")}
              </p>
              <p className="text-bg/80 text-lg leading-relaxed mb-8">
                {t("home.munich.body2")}
              </p>
              <Link to="/history-1974" className="inline-flex items-center gap-2 text-haiti-red font-semibold hover:gap-3 transition-all">
                {t("home.munich.cta")} →
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

// Poster de l'équipe, mobile uniquement (sur desktop il occupe la colonne
// droite du héros). Pleine largeur, non recadré ; tap pour l'ouvrir en grand.
function PosterBanner() {
  const [open, setOpen] = useState(false);
  const { t } = useT();
  const alt = t("home.squadPhotoAlt");
  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="xl:hidden block w-full bg-ink leading-none"
        aria-label={t("home.poster.ariaOpen")}
      >
        <picture>
          <source
            type="image/webp"
            srcSet="/images/photos/haiti-squad-hero-768.webp 768w, /images/photos/haiti-squad-hero-1280.webp 1280w"
            sizes="100vw"
          />
          <img
            src="/images/photos/haiti-squad-hero-1280.jpg"
            srcSet="/images/photos/haiti-squad-hero-768.jpg 768w, /images/photos/haiti-squad-hero-1280.jpg 1280w"
            sizes="100vw"
            alt={alt}
            loading="eager"
            fetchPriority="high"
            className="block w-full h-auto"
          />
        </picture>
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[90] bg-ink/95 flex items-center justify-center p-3"
          onClick={() => setOpen(false)}
          role="dialog"
          aria-modal="true"
        >
          <img
            src="/images/photos/haiti-squad-hero-1920.jpg"
            alt={alt}
            className="max-w-full max-h-full object-contain rounded"
          />
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label={t("a11y.close")}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-bg/10 hover:bg-bg/20 text-bg flex items-center justify-center backdrop-blur-sm"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}
    </>
  );
}

// Rangée d'appels à l'action sous le héros : deux cartes (mur + journal).
// Réutilise le style de carte du site (blanc, bord line, survol haiti-red).
function HeroCtaRow() {
  const { t } = useT();
  const cards = [
    {
      to: "/mur",
      eyebrow: t("nav.fanwall"),
      title: t("home.cta.murTitle"),
      cta: t("home.cta.murAction"),
    },
    {
      to: "/journal",
      eyebrow: t("nav.journal"),
      title: t("home.cta.journalTitle"),
      cta: t("home.cta.journalAction"),
    },
  ];
  return (
    <section className="bg-bg border-b border-line">
      <div className="max-w-content mx-auto px-5 py-6 md:py-8">
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          variants={stagger(0.12)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
        >
          {cards.map((c) => (
            <motion.div key={c.to} variants={fadeUp}>
              <Link
                to={c.to}
                className="group flex items-center gap-4 h-full bg-white border border-line rounded-lg p-5 hover:border-haiti-red hover:shadow-md transition-all"
              >
                <span className="w-1.5 self-stretch rounded-full bg-gradient-to-b from-haiti-blue to-haiti-red shrink-0" />
                <div className="min-w-0">
                  <p className="text-haiti-red text-xs uppercase tracking-wider font-bold mb-1">
                    {c.eyebrow}
                  </p>
                  <h3 className="font-display text-lg md:text-xl leading-snug">{c.title}</h3>
                  <p className="mt-2 text-sm font-semibold text-haiti-blue group-hover:text-haiti-red transition-colors">
                    {c.cta} →
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// Mélange (Fisher-Yates) : PostgREST ne sait pas trier par random(). On
// récupère donc un lot récent et on le mélange côté client.
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Aperçu accueil de la galerie des supporters (photos soumises par les fans),
// distincte de la galerie éditoriale /foto. Carrousel de photos approuvées AU
// HASARD (lot récent mélangé côté client), défilement tactile + auto-avance
// douce. Lecture client (fetch dans useEffect), sûre pour le build et le prérendu.
function GalleryPreview() {
  const { t } = useT();
  const [photos, setPhotos] = useState([]);
  const trackRef = useRef(null);
  const matchLabels = {
    scotland: t("home.gallery.matchScotland"),
    brazil: t("home.gallery.matchBrazil"),
    morocco: t("home.gallery.matchMorocco"),
  };
  const ctxLabels = {
    stadium: t("home.gallery.ctxStadium"),
    watch_party: t("home.gallery.ctxWatch"),
    home: t("home.gallery.ctxHome"),
  };

  useEffect(() => {
    let alive = true;
    fetchApprovedPhotos({ limit: 24 }).then((rows) => {
      if (alive) setPhotos(shuffle(rows || []));
    });
    return () => {
      alive = false;
    };
  }, []);

  // Auto-avance douce : glisse jusqu'à la diapo suivante, revient au début à la
  // fin. Le glissement tactile manuel reste natif (scroll-snap).
  useEffect(() => {
    if (photos.length <= 1) return;
    const id = setInterval(() => {
      const el = trackRef.current;
      if (!el) return;
      const slide = el.querySelector("[data-slide]");
      const step = slide ? slide.getBoundingClientRect().width + 12 : el.clientWidth;
      const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 8;
      el.scrollTo({ left: atEnd ? 0 : el.scrollLeft + step, behavior: "smooth" });
    }, 4500);
    return () => clearInterval(id);
  }, [photos.length]);

  return (
    <section className="bg-white border-y border-line">
      <div className="max-w-content mx-auto px-5 py-16 md:py-20">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5 mb-8">
          <div>
            <p className="text-haiti-red text-xs uppercase tracking-wider font-bold mb-2">
              {t("home.gallery.eyebrow")}
            </p>
            <h2 className="font-display text-3xl md:text-5xl leading-tight text-ink">
              {t("home.gallery.title")}
            </h2>
            <p className="text-ink/70 mt-2 max-w-prose">
              {t("home.gallery.subtitle")}
            </p>
          </div>
          <Link
            to="/galerie-supporters"
            className="shrink-0 inline-flex items-center gap-2 text-sm font-semibold text-haiti-blue hover:text-haiti-red transition-colors"
          >
            {t("home.gallery.viewLink")} →
          </Link>
        </div>

        {photos.length > 0 && (
          <div
            ref={trackRef}
            className="flex gap-3 overflow-x-auto snap-x snap-mandatory pb-2 -mx-1 px-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {photos.map((p) => (
              <Link
                key={p.id}
                to="/galerie-supporters"
                data-slide
                className="snap-start shrink-0 w-[78%] sm:w-[46%] lg:w-[31%]"
              >
                <div className="relative rounded-2xl overflow-hidden aspect-[4/5] border border-line bg-bg">
                  <img
                    src={fanPhotoUrl(p.storage_path)}
                    alt={p.caption || t("home.gallery.photoAlt")}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-bg">
                    <p className="text-haiti-red text-[10px] uppercase tracking-wider font-bold mb-0.5">
                      {matchLabels[p.match] || p.match} · {ctxLabels[p.context] || p.context}
                    </p>
                    {p.location && <p className="text-bg/90 text-sm font-semibold truncate">{p.location}</p>}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Appels à l'action sous le carrousel : poster sa photo (primaire) et
            voir toute la galerie (secondaire). Visibles même sans photos. */}
        <div className="mt-8 flex flex-col sm:flex-row sm:items-center gap-4">
          <Link
            to="/partager-ta-photo"
            className="inline-flex items-center gap-2 px-6 py-3 bg-haiti-blue text-bg font-semibold rounded-full hover:bg-haiti-blue-dark transition-colors"
          >
            {t("home.gallery.shareCta")} →
          </Link>
          <Link
            to="/galerie-supporters"
            className="text-sm font-semibold text-haiti-blue hover:text-haiti-red transition-colors"
          >
            {t("home.gallery.viewAllCta")} →
          </Link>
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
  const { t } = useT();
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
              {t("nav.journal")}
            </p>
            <h2 className="font-display text-4xl md:text-5xl leading-tight">
              {t("home.journal.title")}
            </h2>
          </div>
          <Link
            to="/journal"
            className="text-sm font-semibold text-haiti-blue hover:text-haiti-red transition-colors whitespace-nowrap"
          >
            {t("home.journal.allLink")} →
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
  const { t } = useT();
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
            {t("common.featured")}
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
            {t("home.journal.readCta")} →
          </p>
        </div>
      </Link>
    </motion.div>
  );
}

function JournalCard({ entry }) {
  const { t } = useT();
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
          <p className="mt-3 text-sm font-semibold text-haiti-blue">{t("home.journal.readCta")} →</p>
        </div>
      </Link>
    </motion.div>
  );
}
