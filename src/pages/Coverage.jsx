import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import ImagePlaceholder from "../components/ImagePlaceholder";
import YouTubeEmbed from "../components/YouTubeEmbed";
import { fadeUp, stagger } from "../lib/motion";
import { useT } from "../lib/i18n";
import {
  playlist,
  musicVideos,
  lyneLucien,
  creativeTributes,
  shortFilms,
  ferronDocumentary,
  chokarellaProductions,
  supporterPoem,
  downloads,
} from "../data/coverage";

// Pick a French/English value by active language (English falls back to French).
const pickLang = (lang, fr, en, ht) =>
  lang === "ht" ? ht ?? fr : lang === "en" ? en ?? fr : fr;

// ── Per-language page copy (curator wall text, headings, fixed labels) ──
// The long-form prose lives here, in identical structure across languages, so
// the JSX below stays readable. Data prose (songs, films, art…) carries its own
// `*En` siblings in src/data/coverage.js.
const COPY = {
  fr: {
    heroEyebrow: "Hommage créatif · Exposition numérique",
    heroTitle1: "Comment Haïti",
    heroTitle2: "répond.",
    heroBody:
      "Cinquante-deux ans après Munich, le pays ne reste pas spectateur. Pendant que les Grenadiers préparent le Mondial 2026, une vague de créateurs haïtiens (musiciens, réalisateurs, illustratrices) répond. Chansons, documentaires, œuvres. La sélection a allumé quelque chose. Voici ce qu'elle a déclenché.",
    heroCuration: "Curation : Chokarella Media · Mai 2026",
    navAria: "Chapitres de l'exposition",
    chapters: {
      musique: {
        label: "Clips musicaux",
        wall: "Quand une sélection retourne en Coupe du Monde après cinquante-deux ans d'absence, ce n'est pas seulement le terrain qui répond. Ce sont les studios. De Port-au-Prince à Brooklyn, de Montréal à Paris, de Bogotá même, les artistes haïtiens (Mizik Rasin, rap kreyòl, konpa, afrobeats, Raboday, toutes générations confondues) sortent les morceaux qui accompagnent la campagne. Voici {n} vidéos, dans l'ordre où Chokarella Media vous invite à les découvrir.",
      },
      playlists: {
        label: "Playlists",
        wall: "Au-delà des morceaux pris un par un, Chokarella Media a réuni la campagne dans une seule playlist : la bande-son complète de la route vers le Mondial, à écouter d'un seul tenant, sur Spotify comme sur Apple Music.",
      },
      films: {
        label: "Films",
        wall: "Pendant que les chansons sortent, un autre travail commence : celui de la pellicule. Loin des manchettes habituelles sur Haïti, des réalisateurs s'attachent à raconter le pays par le sport, avec nuance, avec patience, avec une caméra qui prend le temps de regarder.",
      },
      art: {
        label: "Art",
        wall: "Et puis l'image fixe prend la parole. Sur les couvertures de FOX Soccer et de Sports Illustrated, Haïti apparaît cet été, non pas illustrée par un studio de Los Angeles ou de New York, mais par une main haïtienne. Lyne Lucien, illustratrice formée à Bowdoin College, basée à Brooklyn, a été désignée par FOX Soccer ambassadrice artistique officielle d'Haïti pour le Mondial 2026.",
      },
      objets: {
        label: "Objets & emblèmes",
        wall: "Au-delà des chansons, des films et des illustrations, la qualification se matérialise aussi en objets et en emblèmes : ceux que l'on brandit dans les tribunes comme ceux que l'État fait entrer dans l'Histoire. D'un personnage costumé né dans la ferveur des supporters à un timbre commémoratif officiel, voici les hommages tangibles à la route des Grenadiers vers le Mondial 2026.",
      },
      poesie: {
        label: "Poésie",
        wall: "Au-delà des images et des sons, la qualification inspire aussi les mots. Un supporter signe ici un hommage en vers, sur la liberté, l'unité et cinquante-deux ans d'attente enfin récompensés.",
      },
      telecharger: {
        label: "À télécharger",
        wall: "Des visuels aux couleurs des Grenadiers, à emporter et à partager.",
      },
    },
    poemPlate: "Hommage littéraire · Poème",
    poemTextPrefix: "Texte :",
    playlistEyebrow: "La playlist des Grenadiers",
    playlistCredit: "Curation :",
    playlistAvail: " · Disponible sur Spotify et Apple Music.",
    docSeries: "Série documentaire",
    docProducer: "Noémie Ferron, productrice",
    docFeaturing: "Avec la participation de",
    docAndOthers: "et d'autres",
    docSupport: "Avec le soutien de",
    videoUnsupported: "Votre navigateur ne prend pas en charge la lecture vidéo.",
    lyneEyebrow: "L'artiste · Désignée par FOX Soccer · Ambassadrice officielle d'Haïti · Mondial FIFA 2026",
    artworkFor: "Pour",
    artworkCredit1: "Œuvre signée",
    artworkCredit2: "· Diffusée avec crédit.",
    tributeLangAria: "Langue du texte",
    toggleSecond: "Français",
    colophonTitle: "Une nation qui supporte.",
    colophonBody:
      "Cette exposition rassemble une partie de la réponse créative qu'a suscitée la qualification d'Haïti pour la Coupe du Monde 2026 : chansons, documentaires, illustrations.",
    colophonCreditPrefix:
      "Curation : Chokarella Media · Pour signaler une œuvre à ajouter, écrire à",
    chokEyebrow: "Par Chokarella Media",
    chokSoon: "Bientôt en ligne.",
  },
  en: {
    heroEyebrow: "Creative tribute · Digital exhibition",
    heroTitle1: "How Haiti",
    heroTitle2: "responds.",
    heroBody:
      "Fifty-two years after Munich, the country is not staying on the sidelines. As the Grenadiers prepare for the 2026 World Cup, a wave of Haitian creators (musicians, filmmakers, illustrators) responds. Songs, documentaries, works of art. The team lit something. Here is what it set off.",
    heroCuration: "Curated by Chokarella Media · May 2026",
    navAria: "Exhibition chapters",
    chapters: {
      musique: {
        label: "Music videos",
        wall: "When a national team returns to the World Cup after fifty-two years away, it is not only the field that answers. It is the studios. From Port-au-Prince to Brooklyn, from Montréal to Paris, even from Bogotá, Haitian artists (Mizik Rasin, rap kreyòl, konpa, afrobeats, Raboday, every generation together) are releasing the tracks that carry the campaign. Here are {n} videos, in the order Chokarella Media invites you to discover them.",
      },
      playlists: {
        label: "Playlists",
        wall: "Beyond the tracks taken one by one, Chokarella Media has gathered the campaign into a single playlist: the full soundtrack of the road to the World Cup, to play start to finish, on Spotify and Apple Music alike.",
      },
      films: {
        label: "Films",
        wall: "While the songs come out, another kind of work begins: the work of film. Far from the usual headlines about Haiti, filmmakers set out to tell the country through sport, with nuance, with patience, with a camera that takes the time to look.",
      },
      art: {
        label: "Art",
        wall: "And then the still image speaks. On the covers of FOX Soccer and Sports Illustrated, Haiti appears this summer, illustrated not by a studio in Los Angeles or New York, but by a Haitian hand. Lyne Lucien, an illustrator trained at Bowdoin College and based in Brooklyn, was named by FOX Soccer as Haiti's official artistic ambassador for the 2026 World Cup.",
      },
      objets: {
        label: "Objects & emblems",
        wall: "Beyond the songs, the films, and the illustrations, the qualification also takes shape in objects and emblems: the ones raised in the stands and the ones the State writes into history. From a costumed character born in the fervor of the supporters to an official commemorative stamp, here are the tangible tributes to the Grenadiers' road to the 2026 World Cup.",
      },
      poesie: {
        label: "Poetry",
        wall: "Beyond the images and the sounds, the qualification also inspires words. A supporter offers here a tribute in verse, on freedom, unity, and fifty-two years of waiting finally rewarded.",
      },
      telecharger: {
        label: "Downloads",
        wall: "Visuals in the Grenadiers' colors, to take and to share.",
      },
    },
    poemPlate: "Literary tribute · Poem",
    poemTextPrefix: "Text:",
    playlistEyebrow: "The Grenadiers' playlist",
    playlistCredit: "Curated by",
    playlistAvail: " · Available on Spotify and Apple Music.",
    docSeries: "Documentary series",
    docProducer: "Noémie Ferron, producer",
    docFeaturing: "Featuring",
    docAndOthers: "and others",
    docSupport: "With support from",
    videoUnsupported: "Your browser does not support video playback.",
    lyneEyebrow: "The artist · Named by FOX Soccer · Haiti's official ambassador · 2026 FIFA World Cup",
    artworkFor: "For",
    artworkCredit1: "Work by",
    artworkCredit2: "· Shared with credit.",
    tributeLangAria: "Text language",
    toggleSecond: "English",
    colophonTitle: "A nation that backs its team.",
    colophonBody:
      "This exhibition gathers part of the creative response that Haiti's qualification for the 2026 World Cup has sparked: songs, documentaries, illustrations.",
    colophonCreditPrefix:
      "Curated by Chokarella Media · To suggest a work to add, email",
    chokEyebrow: "By Chokarella Media",
    chokSoon: "Coming soon.",
  },
  ht: {
    heroEyebrow: "Omaj kreyatif · Ekspozisyon dijital",
    heroTitle1: "Kijan Ayiti",
    heroTitle2: "reponn.",
    heroBody:
      "Senkanndezan apre Minik, peyi a pa rete ap gade. Pandan Grenadye yo ap prepare Mondyal 2026 la, yon vag kreyatè ayisyen (mizisyen, sineas, ilistratris) ap reponn. Chante, dokimantè, zèv. Seleksyon an limen yon bagay. Men sa li deklanche.",
    heroCuration: "Kurasyon : Chokarella Media · Me 2026",
    navAria: "Chapit ekspozisyon an",
    chapters: {
      musique: {
        label: "Klip mizik",
        wall: "Lè yon seleksyon retounen nan Koup di Mond apre senkanndezan absans, se pa teren an sèlman ki reponn. Se estidyo yo tou. Soti Pòtoprens rive Brooklyn, soti Monreyal rive Pari, menm soti Bogota, atis ayisyen yo (Mizik Rasin, rap kreyòl, konpa, afrobeats, Raboday, tout jenerasyon ansanm) ap sòti moso ki akonpaye kanpay la. Men {n} videyo, nan lòd Chokarella Media envite w dekouvri yo.",
      },
      playlists: {
        label: "Playlists",
        wall: "Pi lwen pase moso yo pran youn pa youn, Chokarella Media rasanble kanpay la nan yon sèl playlist : tout mizik wout la pou rive nan Mondyal la, pou koute yon sèl kou, sou Spotify kou sou Apple Music.",
      },
      films: {
        label: "Fim",
        wall: "Pandan chante yo ap sòti, yon lòt travay ap kòmanse : sa fim yo. Lwen gwo tit abityèl yo sou Ayiti, sineas yo angaje pou rakonte peyi a atravè espò, ak nuans, ak pasyans, ak yon kamera ki pran tan pou l gade.",
      },
      art: {
        label: "Atizay",
        wall: "Epi imaj fiks la pran lapawòl. Sou kouvèti FOX Soccer ak Sports Illustrated, Ayiti parèt ete sa a, se pa yon estidyo Los Angeles oswa New York ki desine l, men yon men ayisyen. Lyne Lucien, ilistratris ki fòme nan Bowdoin College, ki baze nan Brooklyn, FOX Soccer chwazi l kòm anbasadè atistik ofisyèl Ayiti pou Mondyal 2026 la.",
      },
      objets: {
        label: "Objè ak anblèm",
        wall: "Pi lwen pase chante, fim ak ilistrasyon, kalifikasyon an materyalize nan objè ak anblèm tou : sa moun leve nan tribin yo kou sa Leta fè antre nan Listwa. Soti nan yon pèsonaj an kostim ki fèt nan fèvè sipòtè yo rive nan yon tenm komemoratif ofisyèl, men omaj konkrè sou wout Grenadye yo nan Mondyal 2026 la.",
      },
      poesie: {
        label: "Pwezi",
        wall: "Pi lwen pase imaj ak son, kalifikasyon an enspire mo yo tou. Yon sipòtè siyen isit la yon omaj an vè, sou libète, inite ak senkanndezan tann ki anfen rekonpanse.",
      },
      telecharger: {
        label: "Pou telechaje",
        wall: "Vizyèl nan koulè Grenadye yo, pou pote ak pou pataje.",
      },
    },
    poemPlate: "Omaj literè · Powèm",
    poemTextPrefix: "Tèks :",
    playlistEyebrow: "Playlist Grenadye yo",
    playlistCredit: "Kurasyon :",
    playlistAvail: " · Disponib sou Spotify ak Apple Music.",
    docSeries: "Seri dokimantè",
    docProducer: "Noémie Ferron, pwodiktris",
    docFeaturing: "Ak patisipasyon",
    docAndOthers: "ak lòt moun",
    docSupport: "Ak sipò",
    videoUnsupported: "Navigatè ou a pa sipòte lekti videyo.",
    lyneEyebrow: "Atis la · Chwazi pa FOX Soccer · Anbasadè ofisyèl Ayiti · Mondyal FIFA 2026",
    artworkFor: "Pou",
    artworkCredit1: "Zèv ki siyen",
    artworkCredit2: "· Difize ak kredi.",
    tributeLangAria: "Lang tèks la",
    toggleSecond: "Kreyòl",
    colophonTitle: "Yon nasyon k ap sipòte.",
    colophonBody:
      "Ekspozisyon sa a rasanble yon pati nan repons kreyatif kalifikasyon Ayiti pou Koup di Mond 2026 la pwovoke : chante, dokimantè, ilistrasyon.",
    colophonCreditPrefix:
      "Kurasyon : Chokarella Media · Pou siyale yon zèv pou ajoute, ekri",
    chokEyebrow: "Pa Chokarella Media",
    chokSoon: "Talè konsa sou entènèt.",
  },
};

// ╔══════════════════════════════════════════════════════════════════════╗
// ║  HOMMAGE CRÉATIF — /the-tribute                                       ║
// ║                                                                       ║
// ║  Digital exhibition celebrating how Haitian creators have responded   ║
// ║  to the Grenadiers' World Cup qualification. Curated by Chokarella    ║
// ║  Media. Three chapters: La musique · L'image en mouvement · L'art.    ║
// ║  Editorial voice (curator wall text) present throughout.              ║
// ╚══════════════════════════════════════════════════════════════════════╝

export default function Coverage() {
  // Chapters are presented as tabs — one at a time — so the page is no longer
  // one endless scroll. Active chapter is mirrored in the URL hash so links
  // (e.g. /the-tribute#art) and refreshes land on the right chapter.
  const { lang } = useT();
  const c = COPY[lang] || COPY.fr;
  const [activeTab, setActiveTab] = useState(getInitialChapter);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      // On a deep link (#art, #track-xxx…), bring the target into view once.
      if (window.location.hash) {
        const target =
          document.getElementById(window.location.hash.slice(1)) ||
          document.getElementById(activeTab);
        target?.scrollIntoView({ block: "start" });
      }
      return;
    }
    // On a tab switch, sync the hash and reveal the new chapter from its top.
    history.replaceState(null, "", `#${activeTab}`);
    document
      .getElementById(activeTab)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [activeTab]);

  return (
    <div className="bg-bg">
      <ReadingProgressBar />
      <ExhibitionHero />
      <ChapterNav active={activeTab} onSelect={setActiveTab} />

      {/* ─── CHAPTER I · CLIPS MUSICAUX ────────────────────────────── */}
      {activeTab === "musique" && (
        <>
          <ChapterMarker
            title={c.chapters.musique.label}
            anchorId="musique"
            wallText={c.chapters.musique.wall.replace("{n}", musicVideos.length)}
          />

          <div className="space-y-24 md:space-y-32 py-12 md:py-16">
            {musicVideos.map((video) => (
              <MusicVideoExhibit key={video.videoId} video={video} />
            ))}
          </div>
        </>
      )}

      {/* ─── CHAPTER II · PLAYLISTS ────────────────────────────────── */}
      {activeTab === "playlists" && (
        <>
          <ChapterMarker
            title={c.chapters.playlists.label}
            anchorId="playlists"
            wallText={c.chapters.playlists.wall}
          />

          <PlaylistExhibit />
        </>
      )}

      {/* ─── CHAPTER III · FILMS ───────────────────────────────────── */}
      {activeTab === "films" && (
        <>
          <ChapterMarker
            title={c.chapters.films.label}
            anchorId="films"
            wallText={c.chapters.films.wall}
          />

          {/* Courts métrages d'abord, la série documentaire ensuite. */}
          {shortFilms.map((film) => (
            <ShortFilmExhibit key={film.videoId} film={film} />
          ))}
          <DocumentaryExhibit />
        </>
      )}

      {/* ─── CHAPTER IV · ART ──────────────────────────────────────── */}
      {activeTab === "art" && (
        <>
          <ChapterMarker
            title={c.chapters.art.label}
            anchorId="art"
            wallText={c.chapters.art.wall}
          />

          <LyneLucienExhibit />
          {/* Peintures et autres œuvres d'art (tributs taggés chapter:"art"). */}
          <CreativeTributesExhibit chapter="art" />
        </>
      )}

      {/* ─── CHAPTER V · OBJETS & EMBLÈMES ─────────────────────────── */}
      {activeTab === "objets" && (
        <>
          <ChapterMarker
            title={c.chapters.objets.label}
            anchorId="objets"
            wallText={c.chapters.objets.wall}
          />

          <CreativeTributesExhibit />
        </>
      )}

      {/* ─── CHAPTER VI · POÉSIE ───────────────────────────────────── */}
      {activeTab === "poesie" && (
        <>
          <ChapterMarker
            title={c.chapters.poesie.label}
            anchorId="poesie"
            wallText={c.chapters.poesie.wall}
          />
          <PoemExhibit />
        </>
      )}

      {/* ─── CHAPTER VII · À TÉLÉCHARGER ───────────────────────────── */}
      {activeTab === "telecharger" && (
        <>
          <ChapterMarker
            title={c.chapters.telecharger.label}
            anchorId="telecharger"
            wallText={c.chapters.telecharger.wall}
          />
          <DownloadsGrid />
        </>
      )}

      {/* ─── COLOPHON ──────────────────────────────────────────────── */}
      <Colophon />

      {/* Productions Chokarella — kept as placeholder for future */}
      {chokarellaProductions.length > 0 && (
        <div className="max-w-3xl mx-auto px-5 py-20">
          <p className="text-haiti-red text-[10px] uppercase tracking-[0.25em] font-bold mb-4">
            {c.chokEyebrow}
          </p>
          <p className="text-muted italic">{c.chokSoon}</p>
        </div>
      )}
    </div>
  );
}

// Resolve the chapter to open first from the URL hash (deep link or refresh).
function getInitialChapter() {
  if (typeof window === "undefined") return "musique";
  const hash = window.location.hash.slice(1);
  if (CHAPTERS.some((c) => c.id === hash)) return hash;
  if (hash.startsWith("track-")) return "musique";
  return "musique";
}

// ════════════════════════════════════════════════════════════════════════
//  READING PROGRESS BAR — thin scroll indicator pinned to the top
// ════════════════════════════════════════════════════════════════════════

function ReadingProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.3,
  });
  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 h-1 origin-left bg-haiti-red z-50"
    />
  );
}

// ════════════════════════════════════════════════════════════════════════
//  HERO
// ════════════════════════════════════════════════════════════════════════

function ExhibitionHero() {
  const { lang } = useT();
  const c = COPY[lang] || COPY.fr;
  return (
    <section className="relative bg-ink text-bg overflow-hidden">
      {/* Subtle background — left bicolor edge, like the rest of the site */}
      <motion.div
        className="absolute left-0 top-0 bottom-0 w-1.5 bg-haiti-blue"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        style={{ originY: 0 }}
      />
      <motion.div
        className="absolute left-1.5 top-0 bottom-0 w-1.5 bg-haiti-red"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 0.7, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        style={{ originY: 0 }}
      />

      <div className="max-w-content mx-auto px-5 py-24 md:py-36 lg:py-44">
        <div className="max-w-3xl">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-haiti-red text-[11px] md:text-xs uppercase tracking-[0.3em] font-bold mb-7"
          >
            {c.heroEyebrow}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-5xl md:text-7xl lg:text-8xl leading-[0.95] mb-8"
          >
            {c.heroTitle1}<br />
            <span className="text-haiti-red">{c.heroTitle2}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="text-bg/85 text-lg md:text-xl leading-relaxed mb-5"
          >
            {c.heroBody}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.95 }}
            className="text-bg/55 text-sm italic"
          >
            {c.heroCuration}
          </motion.p>
        </div>
      </div>
    </section>
  );
}

// ════════════════════════════════════════════════════════════════════════
//  CHAPTER NAV — sticky, museum-signage style
// ════════════════════════════════════════════════════════════════════════

const CHAPTERS = [
  { id: "musique", label: "Clips musicaux" },
  { id: "playlists", label: "Playlists" },
  { id: "films", label: "Films" },
  { id: "art", label: "Art" },
  { id: "objets", label: "Objets & emblèmes" },
  { id: "poesie", label: "Poésie" },
  { id: "telecharger", label: "À télécharger" },
];

function ChapterNav({ active, onSelect }) {
  const { lang } = useT();
  const c = COPY[lang] || COPY.fr;
  return (
    <nav
      id="chapter-nav"
      aria-label={c.navAria}
      className="sticky top-0 z-30 bg-bg/95 backdrop-blur border-b border-line"
    >
      <div
        role="tablist"
        className="max-w-content mx-auto px-5 py-3 flex items-center gap-2 overflow-x-auto"
      >
        {CHAPTERS.map(({ id }) => (
          <ChapterPill
            key={id}
            active={active === id}
            onClick={() => onSelect(id)}
          >
            {c.chapters[id].label}
          </ChapterPill>
        ))}
      </div>
    </nav>
  );
}

function ChapterPill({ active, onClick, children }) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      onClick={onClick}
      className={`shrink-0 inline-flex items-center px-3 py-1.5 rounded-full text-xs md:text-sm font-semibold transition-colors uppercase tracking-wider ${
        active ? "bg-ink text-bg" : "text-ink hover:bg-line"
      }`}
    >
      {children}
    </button>
  );
}

// ════════════════════════════════════════════════════════════════════════
//  CHAPTER MARKER — title + wall text
// ════════════════════════════════════════════════════════════════════════

function ChapterMarker({ title, anchorId, wallText }) {
  return (
    <section id={anchorId} className="scroll-mt-20 border-t border-line bg-bg">
      <div className="max-w-content mx-auto px-5 py-20 md:py-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl"
        >
          <h2 className="font-display text-4xl md:text-6xl text-ink leading-[1.05] mb-8">
            {title}
          </h2>
          <p className="text-ink/75 text-lg md:text-xl leading-relaxed">
            {wallText}
          </p>
        </motion.div>
      </div>
    </section>
  );
}

// ════════════════════════════════════════════════════════════════════════
//  MUSIC VIDEO EXHIBIT — one-per-scroll, video + wall text
// ════════════════════════════════════════════════════════════════════════

function MusicVideoExhibit({ video }) {
  const { lang } = useT();
  return (
    <article
      id={`track-${video.videoId}`}
      className="scroll-mt-24 max-w-content mx-auto px-5"
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Video — full width up to a generous max */}
        <div className="max-w-5xl mx-auto rounded-lg overflow-hidden bg-ink shadow-lg">
          <div className="aspect-video">
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${video.videoId}?rel=0`}
              title={video.title}
              allow="accelerometer; clipboard-write; encrypted-media; picture-in-picture"
              allowFullScreen
              className="w-full h-full border-0"
              loading="lazy"
            />
          </div>
        </div>

        {/* Caption — beneath the video, generous breathing room */}
        <div className="max-w-3xl mx-auto mt-8 md:mt-10">
          <h3 className="font-display text-3xl md:text-5xl text-ink leading-[1.05] mb-3">
            {video.title}
          </h3>
          <p className="text-muted text-base md:text-lg mb-6">
            {video.artist}
          </p>
          {video.note && (
            <p className="text-ink/80 text-base md:text-lg leading-relaxed border-l-2 border-haiti-blue/30 pl-5">
              {pickLang(lang, video.note, video.noteEn, video.noteHt)}
            </p>
          )}
        </div>
      </motion.div>
    </article>
  );
}

// ════════════════════════════════════════════════════════════════════════
//  POEM EXHIBIT · a supporter's poem, set in a literary register
// ════════════════════════════════════════════════════════════════════════

function PoemExhibit() {
  const { lang } = useT();
  const c = COPY[lang] || COPY.fr;
  return (
    <article id="poeme" className="scroll-mt-24 max-w-content mx-auto px-5 pb-20 md:pb-28">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Plate caption */}
        <div className="max-w-3xl mx-auto mb-8 md:mb-10 text-center">
          <p className="text-haiti-red text-[10px] md:text-xs uppercase tracking-[0.25em] font-bold mb-3">
            {c.poemPlate}
          </p>
          <h3 className="font-display text-3xl md:text-5xl text-ink leading-[1.05]">
            {pickLang(lang, supporterPoem.title, supporterPoem.titleEn, supporterPoem.titleHt)}
          </h3>
        </div>

        {/* The poem's own dedicated image */}
        <div className="max-w-md mx-auto rounded-lg overflow-hidden bg-white border border-line shadow-md mb-10 md:mb-12">
          <ImagePlaceholder
            src={supporterPoem.image}
            label={pickLang(lang, supporterPoem.imageLabel, supporterPoem.imageLabelEn, supporterPoem.imageLabelHt)}
            aspect="1/1"
            rounded={false}
          />
        </div>

        {/* The poem · serif, centered, generous line height, clearly set apart */}
        <div className="max-w-2xl mx-auto">
          <div className="relative rounded-lg border border-line bg-white px-6 py-10 md:px-12 md:py-14 shadow-sm">
            <span aria-hidden="true" className="flag-rule block w-12 mx-auto mb-8 rounded-full" />
            <p
              className="font-serif italic text-ink/90 text-lg md:text-xl text-center whitespace-pre-line"
              style={{ lineHeight: 1.9 }}
            >
              {supporterPoem.lines.join("\n")}
            </p>
            <p className="mt-10 text-center text-sm text-muted">
              {c.poemTextPrefix} {pickLang(lang, supporterPoem.author, supporterPoem.authorEn, supporterPoem.authorHt)}
            </p>
          </div>

          {/* Toussaint framing · quiet note */}
          <p className="mt-6 max-w-xl mx-auto text-center text-sm text-muted leading-relaxed">
            {pickLang(lang, supporterPoem.note, supporterPoem.noteEn, supporterPoem.noteHt)}
          </p>
        </div>
      </motion.div>
    </article>
  );
}

// ════════════════════════════════════════════════════════════════════════
//  PLAYLIST EXHIBIT — Spotify + Apple Music as a paired artifact
// ════════════════════════════════════════════════════════════════════════

function PlaylistExhibit() {
  const { lang } = useT();
  const c = COPY[lang] || COPY.fr;
  return (
    <article className="max-w-content mx-auto px-5 pb-20 md:pb-28">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="max-w-3xl mx-auto mb-8 md:mb-10">
          <p className="text-haiti-red text-[10px] md:text-xs uppercase tracking-[0.25em] font-bold mb-3">
            {c.playlistEyebrow}
          </p>
          <h3 className="font-display text-3xl md:text-5xl text-ink leading-[1.05] mb-4">
            {pickLang(lang, playlist.title, playlist.titleEn, playlist.titleHt)}
          </h3>
          <p className="text-ink/80 text-base md:text-lg leading-relaxed border-l-2 border-haiti-blue/30 pl-5 mb-6">
            {pickLang(lang, playlist.description, playlist.descriptionEn, playlist.descriptionHt)}
          </p>
          <p className="text-muted text-sm">
            {c.playlistCredit}{" "}
            <a
              href={playlist.curator.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-ink hover:text-haiti-red transition-colors font-semibold"
            >
              {playlist.curator.name}
            </a>
            {c.playlistAvail}
          </p>
        </div>

        {/* Two embeds, side by side */}
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6">
          <div className="rounded-lg overflow-hidden border border-line bg-white">
            <iframe
              src={`https://open.spotify.com/embed/playlist/${playlist.id}?utm_source=generator&theme=0`}
              width="100%"
              height="450"
              frameBorder="0"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              title={`${playlist.title} · Spotify`}
            />
          </div>
          <div className="rounded-lg overflow-hidden border border-line bg-white">
            <iframe
              src={`https://embed.music.apple.com/us/playlist/${playlist.appleMusicSlug}/${playlist.appleMusicId}`}
              width="100%"
              height="450"
              frameBorder="0"
              allow="autoplay *; encrypted-media *; fullscreen *; clipboard-write"
              sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-top-navigation-by-user-activation"
              loading="lazy"
              title={`${playlist.title} · Apple Music`}
              style={{ background: "transparent" }}
            />
          </div>
        </div>
      </motion.div>
    </article>
  );
}

// ════════════════════════════════════════════════════════════════════════
//  SHORT FILM EXHIBIT — courts métrages (lecture via YouTubeEmbed)
// ════════════════════════════════════════════════════════════════════════

function ShortFilmExhibit({ film }) {
  const { lang } = useT();
  return (
    <article className="max-w-content mx-auto px-5 py-12 md:py-16">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Plate caption above, same convention as the documentary */}
        <div className="max-w-3xl mx-auto mb-2 md:mb-4">
          <p className="text-haiti-red text-[10px] md:text-xs uppercase tracking-[0.25em] font-bold mb-3">
            {pickLang(lang, film.medium, film.mediumEn, film.mediumHt)}
          </p>
          <h3 className="font-display text-3xl md:text-5xl text-ink leading-[1.05] mb-3">
            {film.title}
          </h3>
          <p className="text-muted text-base md:text-lg">
            {pickLang(lang, film.credit, film.creditEn, film.creditHt)}
          </p>
        </div>

        {/* Inline player when the channel allows embedding; link-out card otherwise */}
        <div className="max-w-5xl mx-auto">
          <YouTubeEmbed
            videoId={film.videoId}
            title={film.title}
            embeddable={film.embeddable}
          />
        </div>

        {/* Wall text */}
        {film.note && (
          <div className="max-w-3xl mx-auto">
            <p className="text-ink/80 text-base md:text-lg leading-relaxed border-l-2 border-haiti-blue/30 pl-5">
              {pickLang(lang, film.note, film.noteEn, film.noteHt)}
            </p>
          </div>
        )}
      </motion.div>
    </article>
  );
}

// ════════════════════════════════════════════════════════════════════════
//  DOCUMENTARY EXHIBIT — Ferron Motions
// ════════════════════════════════════════════════════════════════════════

function DocumentaryExhibit() {
  const { lang } = useT();
  const c = COPY[lang] || COPY.fr;
  return (
    <article className="max-w-content mx-auto px-5 py-12 md:py-16">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Plate caption above */}
        <div className="max-w-3xl mx-auto mb-8 md:mb-10">
          <p className="text-haiti-red text-[10px] md:text-xs uppercase tracking-[0.25em] font-bold mb-3">
            {c.docSeries}
          </p>
          <h3 className="font-display text-3xl md:text-5xl text-ink leading-[1.05] mb-3">
            {ferronDocumentary.title}
          </h3>
          <p className="text-muted text-base md:text-lg mb-4">
            {pickLang(lang, ferronDocumentary.credit, ferronDocumentary.creditEn, ferronDocumentary.creditHt)}
          </p>
          <p className="text-ink/80 text-base md:text-lg leading-relaxed mb-5">
            {pickLang(lang, ferronDocumentary.synopsisShort, ferronDocumentary.synopsisShortEn, ferronDocumentary.synopsisShortHt)}
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1 text-xs font-semibold text-ink">
              <span className="w-1.5 h-1.5 rounded-full bg-haiti-red" aria-hidden="true"></span>
              {pickLang(lang, ferronDocumentary.availability, ferronDocumentary.availabilityEn, ferronDocumentary.availabilityHt)}
            </span>
            <a
              href={ferronDocumentary.watch.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-haiti-blue px-5 py-2.5 text-white text-sm font-semibold hover:bg-haiti-blue-dark transition-colors"
            >
              {pickLang(lang, ferronDocumentary.watch.label, ferronDocumentary.watch.labelEn, ferronDocumentary.watch.labelHt)} →
            </a>
          </div>
        </div>

        {/* Trailer first — large, centered */}
        {ferronDocumentary.trailer && (
          <div className="max-w-5xl mx-auto rounded-lg overflow-hidden bg-ink mb-10 md:mb-12 shadow-lg">
            <div className="aspect-video">
              <video
                controls
                preload="metadata"
                poster={ferronDocumentary.poster}
                className="w-full h-full"
                playsInline
              >
                <source
                  src={ferronDocumentary.trailer}
                  type={ferronDocumentary.trailerType || "video/mp4"}
                />
                {c.videoUnsupported}
              </video>
            </div>
          </div>
        )}

        {/* Wall text — curator describes the work */}
        <div className="max-w-3xl mx-auto">
          <p className="text-ink/80 text-base md:text-lg leading-relaxed border-l-2 border-haiti-blue/30 pl-5 mb-8">
            {pickLang(lang, ferronDocumentary.synopsisLong, ferronDocumentary.synopsisLongEn, ferronDocumentary.synopsisLongHt)}
          </p>

          <blockquote className="font-display text-2xl md:text-3xl text-ink leading-snug italic mb-3">
            «&nbsp;{pickLang(lang, ferronDocumentary.quote, ferronDocumentary.quoteEn, ferronDocumentary.quoteHt)}&nbsp;»
          </blockquote>
          <p className="text-muted text-sm mb-10">
            {c.docProducer}
          </p>

          {/* Featured + funding — quiet metadata block */}
          <div className="space-y-4 mb-10 text-sm">
            <div>
              <p className="text-muted uppercase tracking-wider text-[10px] font-bold mb-1.5">
                {c.docFeaturing}
              </p>
              <p className="text-ink/80">
                {ferronDocumentary.featured.join(" · ")} <span className="text-muted">{c.docAndOthers}</span>
              </p>
            </div>
            <div>
              <p className="text-muted uppercase tracking-wider text-[10px] font-bold mb-1.5">
                {c.docSupport}
              </p>
              <p className="text-ink/80">{ferronDocumentary.funding.join(" · ")}</p>
            </div>
          </div>

          <a
            href={ferronDocumentary.source.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-haiti-blue font-semibold hover:text-haiti-red transition-colors text-sm"
          >
            {pickLang(lang, ferronDocumentary.source.label, ferronDocumentary.source.labelEn, ferronDocumentary.source.labelHt)} →
          </a>
        </div>
      </motion.div>
    </article>
  );
}

// ════════════════════════════════════════════════════════════════════════
//  LYNE LUCIEN EXHIBIT — each work gets its own room
// ════════════════════════════════════════════════════════════════════════

function LyneLucienExhibit() {
  const { lang } = useT();
  const c = COPY[lang] || COPY.fr;
  return (
    <div className="bg-bg">
      {/* Artist intro */}
      <article className="max-w-content mx-auto px-5 py-12 md:py-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl mx-auto"
        >
          <p className="text-haiti-red text-[10px] md:text-xs uppercase tracking-[0.25em] font-bold mb-4">
            {c.lyneEyebrow}
          </p>
          <h3 className="font-display text-3xl md:text-5xl text-ink leading-[1.05] mb-6">
            {lyneLucien.artist}
          </h3>
          <blockquote className="font-display text-xl md:text-2xl text-ink/85 leading-snug italic mb-8 border-l-2 border-haiti-red pl-5">
            «&nbsp;{pickLang(lang, lyneLucien.quote, lyneLucien.quoteEn, lyneLucien.quoteHt)}&nbsp;»
          </blockquote>
          <p className="text-ink/80 text-base md:text-lg leading-relaxed mb-8">
            {pickLang(lang, lyneLucien.bio, lyneLucien.bioEn, lyneLucien.bioHt)}
          </p>
          <div className="flex flex-wrap gap-3 text-sm">
            <a
              href={lyneLucien.website}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-haiti-blue hover:text-haiti-red transition-colors font-semibold"
            >
              lynelucien.com →
            </a>
            <span className="text-line">·</span>
            <a
              href={lyneLucien.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-haiti-blue hover:text-haiti-red transition-colors font-semibold"
            >
              @lyne.lucien
            </a>
          </div>
        </motion.div>
      </article>

      {/* The works — each gets its own full-width room */}
      <div className="space-y-20 md:space-y-28 pb-12 md:pb-16">
        {lyneLucien.works.map((work) => (
          <ArtworkExhibit key={work.slug} work={work} />
        ))}
      </div>
    </div>
  );
}

function ArtworkExhibit({ work }) {
  const { lang } = useT();
  const c = COPY[lang] || COPY.fr;
  return (
    <article className="max-w-content mx-auto px-5">
      <motion.figure
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="max-w-3xl mx-auto rounded-lg overflow-hidden bg-white border border-line shadow-md">
          <ImagePlaceholder
            src={work.image}
            label={pickLang(lang, work.imageLabel, work.imageLabelEn, work.imageLabelHt)}
            aspect="4/5"
            rounded={false}
          />
        </div>
        <figcaption className="max-w-2xl mx-auto mt-6 md:mt-8 text-center">
          <p className="text-haiti-red text-[10px] md:text-xs uppercase tracking-[0.25em] font-bold mb-3">
            {c.artworkFor} {work.publication}
          </p>
          <h4 className="font-display text-xl md:text-2xl text-ink mb-4 leading-tight">
            {pickLang(lang, work.role, work.roleEn, work.roleHt)}
          </h4>
          <p className="text-ink/75 text-base leading-relaxed mb-3">
            {pickLang(lang, work.caption, work.captionEn, work.captionHt)}
          </p>
          <p className="text-xs text-muted italic">
            {c.artworkCredit1} {lyneLucien.artist} {c.artworkCredit2}
          </p>
        </figcaption>
      </motion.figure>
    </article>
  );
}

// ════════════════════════════════════════════════════════════════════════
//  CREATIVE TRIBUTES — objets & œuvres avec leur propre crédit (hors Lyne)
// ════════════════════════════════════════════════════════════════════════

function CreativeTributesExhibit({ chapter = "objets" }) {
  // Route each tribute to its chapter: entries tagged chapter:"art" (paintings)
  // render in the Art chapter; everything else stays under Objets & emblèmes.
  const works = creativeTributes.filter((w) =>
    chapter === "art" ? w.chapter === "art" : (w.chapter ?? "objets") !== "art",
  );
  if (!works.length) return null;
  return (
    <div className="bg-bg">
      <div className="space-y-20 md:space-y-28 pb-12 md:pb-16">
        {works.map((work) => (
          <TributeExhibit key={work.slug} work={work} />
        ))}
      </div>
    </div>
  );
}

function TributeExhibit({ work }) {
  const { lang } = useT();
  const c = COPY[lang] || COPY.fr;
  // Bilingual statement support: show a Kreyòl + translation toggle only when
  // both are present. The translation follows the page language (English when
  // available, else French). Single-statement entries render unchanged.
  const hasToggle = Boolean(work.statement_kr && work.statement_fr);
  const [stmtLang, setStmtLang] = useState("kr"); // default Kreyòl
  const translated = lang === "en" ? work.statement_en ?? work.statement_fr : work.statement_fr;
  const statement = hasToggle ? (stmtLang === "kr" ? work.statement_kr : translated) : null;
  const pill = (active) =>
    "px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider transition-colors " +
    (active ? "bg-ink text-bg" : "text-ink hover:bg-bg");

  return (
    <article className="max-w-content mx-auto px-5">
      <motion.figure
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Portrait object (stamp, poster, illustration…) — contained so edges
            aren't cropped. `large` works (where the art IS the tribute) get a
            roomier frame. */}
        <div
          className={`${work.large ? "max-w-lg" : "max-w-sm"} mx-auto rounded-lg overflow-hidden bg-white border border-line shadow-md`}
        >
          <ImagePlaceholder
            src={work.image}
            label={pickLang(lang, work.imageLabel, work.imageLabelEn, work.imageLabelHt)}
            aspect="3/4"
            fit="contain"
            rounded={false}
          />
        </div>
        <figcaption className="max-w-2xl mx-auto mt-6 md:mt-8 text-center">
          <p className="text-haiti-red text-[10px] md:text-xs uppercase tracking-[0.25em] font-bold mb-3">
            {pickLang(lang, work.medium, work.mediumEn, work.mediumHt)}
          </p>
          <h4 className="font-display text-xl md:text-2xl text-ink mb-4 leading-tight">
            {pickLang(lang, work.title, work.titleEn, work.titleHt)}
          </h4>
          {work.caption && (
            <p className="text-ink/70 text-base italic leading-relaxed mb-4">
              {pickLang(lang, work.caption, work.captionEn, work.captionHt)}
            </p>
          )}

          {hasToggle ? (
            <>
              <div
                role="group"
                aria-label={c.tributeLangAria}
                className="inline-flex items-center gap-1 mb-5 rounded-full border border-line p-1"
              >
                <button type="button" aria-pressed={stmtLang === "kr"} onClick={() => setStmtLang("kr")} className={pill(stmtLang === "kr")}>
                  Kreyòl
                </button>
                <button type="button" aria-pressed={stmtLang === "fr"} onClick={() => setStmtLang("fr")} className={pill(stmtLang === "fr")}>
                  {c.toggleSecond}
                </button>
              </div>
              <div className="text-left space-y-3 mb-3">
                {statement
                  .split("\n")
                  .map((s) => s.trim())
                  .filter(Boolean)
                  .map((para, i) => (
                    <p
                      key={i}
                      className={`text-base leading-relaxed ${para.startsWith("«") ? "italic text-ink/90" : "text-ink/80"}`}
                    >
                      {para}
                    </p>
                  ))}
              </div>
            </>
          ) : (
            <p className="text-ink/75 text-base leading-relaxed mb-3">
              {pickLang(lang, work.description, work.descriptionEn, work.descriptionHt)}
            </p>
          )}

          {/* Pull-quote · highlighted, set apart from the body */}
          {work.quote && (
            <blockquote className="mx-auto my-6 max-w-xl border-y border-line py-5 font-display text-xl md:text-2xl italic leading-snug text-ink">
              «&nbsp;{pickLang(lang, work.quote, work.quoteEn, work.quoteHt)}&nbsp;»
            </blockquote>
          )}

          <p className="text-xs text-muted italic">
            {pickLang(lang, work.credit, work.creditEn, work.creditHt)}
            {work.creditUrl && (
              <>
                {work.creditInline ? " " : " · "}
                <a
                  href={work.creditUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="not-italic text-haiti-blue font-semibold hover:text-haiti-red transition-colors"
                >
                  {work.creditHandle}
                </a>
              </>
            )}
          </p>
        </figcaption>
      </motion.figure>
    </article>
  );
}

// ════════════════════════════════════════════════════════════════════════
//  À TÉLÉCHARGER · visuels à emporter (bloc indépendant du poème)
// ════════════════════════════════════════════════════════════════════════

function DownloadsGrid() {
  return (
    <div className="max-w-content mx-auto px-5 pb-20 md:pb-28">
      <div className="grid sm:grid-cols-2 gap-6 max-w-3xl items-start">
        {downloads.map((item) => (
          <DownloadCard key={item.file} item={item} />
        ))}
      </div>
    </div>
  );
}

function DownloadCard({ item }) {
  return (
    <motion.a
      href={item.file}
      download
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="group block overflow-hidden rounded-lg border border-line bg-white shadow-sm transition-all hover:border-haiti-blue/40 hover:shadow-md"
    >
      <ImagePlaceholder
        src={item.file}
        label={item.label}
        aspect={item.aspect || "3/4"}
        fit="contain"
        rounded={false}
      />
      <div className="flex items-center justify-between gap-3 px-5 py-4">
        <div className="min-w-0">
          <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-haiti-red mb-1">
            {item.kind}
          </p>
          <p className="font-display text-lg text-ink leading-tight truncate">
            {item.label}
          </p>
        </div>
        <span
          aria-hidden="true"
          className="shrink-0 inline-flex h-10 w-10 items-center justify-center rounded-full bg-haiti-blue text-white transition-colors group-hover:bg-haiti-blue-dark"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 3v12m0 0l-4-4m4 4l4-4M5 21h14" />
          </svg>
        </span>
      </div>
    </motion.a>
  );
}

// ════════════════════════════════════════════════════════════════════════
//  COLOPHON — curator's closing note
// ════════════════════════════════════════════════════════════════════════

function Colophon() {
  const { lang } = useT();
  const c = COPY[lang] || COPY.fr;
  return (
    <section className="border-t border-line bg-ink text-bg">
      <div className="max-w-content mx-auto px-5 py-20 md:py-28">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl"
        >
          <h2 className="font-display text-3xl md:text-5xl leading-[1.05] mb-7">
            {c.colophonTitle}
          </h2>
          <p className="text-bg/80 text-base md:text-lg leading-relaxed mb-10">
            {c.colophonBody}
          </p>
          <p className="text-bg/60 text-sm leading-relaxed">
            {c.colophonCreditPrefix}{" "}
            <a
              href="mailto:contact@grenadiers2026.com"
              className="text-bg hover:text-haiti-red transition-colors underline underline-offset-4"
            >
              contact@grenadiers2026.com
            </a>
            .
          </p>
        </motion.div>
      </div>
    </section>
  );
}
