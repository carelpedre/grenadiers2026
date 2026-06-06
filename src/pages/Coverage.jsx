import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import ImagePlaceholder from "../components/ImagePlaceholder";
import { fadeUp, stagger } from "../lib/motion";
import {
  playlist,
  musicVideos,
  lyneLucien,
  creativeTributes,
  ferronDocumentary,
  chokarellaProductions,
} from "../data/coverage";

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
            title="Clips musicaux"
            anchorId="musique"
            wallText="Quand une sélection retourne en Coupe du Monde après cinquante-deux ans d'absence, ce n'est pas seulement le terrain qui répond. Ce sont les studios. De Port-au-Prince à Brooklyn, de Montréal à Paris, de Bogotá même, les artistes haïtiens — Mizik Rasin, rap kreyòl, konpa, afrobeats, Raboday, toutes générations confondues — sortent les morceaux qui accompagnent la campagne. Voici neuf d'entre eux, dans l'ordre où Chokarella Media vous invite à les découvrir."
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
            title="Playlists"
            anchorId="playlists"
            wallText="Au-delà des morceaux pris un par un, Chokarella Media a réuni la campagne dans une seule playlist — la bande-son complète de la route vers le Mondial, à écouter d'un seul tenant, sur Spotify comme sur Apple Music."
          />

          <PlaylistExhibit />
        </>
      )}

      {/* ─── CHAPTER III · FILMS ───────────────────────────────────── */}
      {activeTab === "films" && (
        <>
          <ChapterMarker
            title="Films"
            anchorId="films"
            wallText="Pendant que les chansons sortent, un autre travail commence : celui de la pellicule. Loin des manchettes habituelles sur Haïti, des réalisateurs s'attachent à raconter le pays par le sport — avec nuance, avec patience, avec une caméra qui prend le temps de regarder."
          />

          <DocumentaryExhibit />
        </>
      )}

      {/* ─── CHAPTER IV · ART ──────────────────────────────────────── */}
      {activeTab === "art" && (
        <>
          <ChapterMarker
            title="Art"
            anchorId="art"
            wallText="Et puis l'image fixe prend la parole. Sur les couvertures de FOX Soccer et de Sports Illustrated, Haïti apparaît cet été — non pas illustrée par un studio de Los Angeles ou de New York, mais par une main haïtienne. Lyne Lucien, illustratrice formée à Bowdoin College, basée à Brooklyn, a été désignée par FOX Soccer ambassadrice artistique officielle d'Haïti pour le Mondial 2026."
          />

          <LyneLucienExhibit />
        </>
      )}

      {/* ─── CHAPTER V · OBJETS & EMBLÈMES ─────────────────────────── */}
      {activeTab === "objets" && (
        <>
          <ChapterMarker
            title="Objets & emblèmes"
            anchorId="objets"
            wallText="Au-delà des chansons, des films et des illustrations, la qualification se matérialise aussi en objets et en emblèmes — ceux que l'on brandit dans les tribunes comme ceux que l'État fait entrer dans l'Histoire. D'un personnage costumé né dans la ferveur des supporters à un timbre commémoratif officiel, voici les hommages tangibles à la route des Grenadiers vers le Mondial 2026."
          />

          <CreativeTributesExhibit />
        </>
      )}

      {/* ─── COLOPHON ──────────────────────────────────────────────── */}
      <Colophon />

      {/* Productions Chokarella — kept as placeholder for future */}
      {chokarellaProductions.length > 0 && (
        <div className="max-w-3xl mx-auto px-5 py-20">
          <p className="text-haiti-red text-[10px] uppercase tracking-[0.25em] font-bold mb-4">
            Par Chokarella Media
          </p>
          <p className="text-muted italic">Bientôt en ligne.</p>
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
            Hommage créatif · Exposition numérique
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-5xl md:text-7xl lg:text-8xl leading-[0.95] mb-8"
          >
            Comment Haïti<br />
            <span className="text-haiti-red">répond.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="text-bg/85 text-lg md:text-xl leading-relaxed mb-5"
          >
            Cinquante-deux ans après Munich, le pays ne reste pas spectateur. Pendant que les Grenadiers préparent le Mondial 2026, une vague de créateurs haïtiens — musiciens, réalisateurs, illustratrices — répond. Chansons, documentaires, œuvres. La sélection a allumé quelque chose. Voici ce qu'elle a déclenché.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.95 }}
            className="text-bg/55 text-sm italic"
          >
            Curation : Chokarella Media · Mai 2026
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
];

function ChapterNav({ active, onSelect }) {
  return (
    <nav
      id="chapter-nav"
      aria-label="Chapitres de l'exposition"
      className="sticky top-0 z-30 bg-bg/95 backdrop-blur border-b border-line"
    >
      <div
        role="tablist"
        className="max-w-content mx-auto px-5 py-3 flex items-center gap-2 overflow-x-auto"
      >
        {CHAPTERS.map(({ id, label }) => (
          <ChapterPill
            key={id}
            active={active === id}
            onClick={() => onSelect(id)}
          >
            {label}
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
              {video.note}
            </p>
          )}
        </div>
      </motion.div>
    </article>
  );
}

// ════════════════════════════════════════════════════════════════════════
//  PLAYLIST EXHIBIT — Spotify + Apple Music as a paired artifact
// ════════════════════════════════════════════════════════════════════════

function PlaylistExhibit() {
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
            La playlist des Grenadiers
          </p>
          <h3 className="font-display text-3xl md:text-5xl text-ink leading-[1.05] mb-4">
            {playlist.title}
          </h3>
          <p className="text-ink/80 text-base md:text-lg leading-relaxed border-l-2 border-haiti-blue/30 pl-5 mb-6">
            {playlist.description}
          </p>
          <p className="text-muted text-sm">
            Curation :{" "}
            <a
              href={playlist.curator.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-ink hover:text-haiti-red transition-colors font-semibold"
            >
              {playlist.curator.name}
            </a>
            {" · "}Disponible sur Spotify et Apple Music.
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
              title={`${playlist.title} — Spotify`}
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
              title={`${playlist.title} — Apple Music`}
              style={{ background: "transparent" }}
            />
          </div>
        </div>
      </motion.div>
    </article>
  );
}

// ════════════════════════════════════════════════════════════════════════
//  DOCUMENTARY EXHIBIT — Ferron Motions
// ════════════════════════════════════════════════════════════════════════

function DocumentaryExhibit() {
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
            Série documentaire
          </p>
          <h3 className="font-display text-3xl md:text-5xl text-ink leading-[1.05] mb-3">
            {ferronDocumentary.title}
          </h3>
          <p className="text-muted text-base md:text-lg mb-4">
            {ferronDocumentary.credit}
          </p>
          <p className="text-ink/80 text-base md:text-lg leading-relaxed mb-5">
            {ferronDocumentary.synopsisShort}
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1 text-xs font-semibold text-ink">
              <span className="w-1.5 h-1.5 rounded-full bg-haiti-red" aria-hidden="true"></span>
              {ferronDocumentary.availability}
            </span>
            <a
              href={ferronDocumentary.watch.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-haiti-blue px-5 py-2.5 text-white text-sm font-semibold hover:bg-haiti-blue-dark transition-colors"
            >
              {ferronDocumentary.watch.label} →
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
                Votre navigateur ne prend pas en charge la lecture vidéo.
              </video>
            </div>
          </div>
        )}

        {/* Wall text — curator describes the work */}
        <div className="max-w-3xl mx-auto">
          <p className="text-ink/80 text-base md:text-lg leading-relaxed border-l-2 border-haiti-blue/30 pl-5 mb-8">
            {ferronDocumentary.synopsisLong}
          </p>

          <blockquote className="font-display text-2xl md:text-3xl text-ink leading-snug italic mb-3">
            «&nbsp;{ferronDocumentary.quote}&nbsp;»
          </blockquote>
          <p className="text-muted text-sm mb-10">
            — Noémie Ferron, productrice
          </p>

          {/* Featured + funding — quiet metadata block */}
          <div className="space-y-4 mb-10 text-sm">
            <div>
              <p className="text-muted uppercase tracking-wider text-[10px] font-bold mb-1.5">
                Avec la participation de
              </p>
              <p className="text-ink/80">
                {ferronDocumentary.featured.join(" · ")} <span className="text-muted">et d'autres</span>
              </p>
            </div>
            <div>
              <p className="text-muted uppercase tracking-wider text-[10px] font-bold mb-1.5">
                Avec le soutien de
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
            {ferronDocumentary.source.label} →
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
            L'artiste · Désignée par FOX Soccer · Ambassadrice officielle d'Haïti · Mondial FIFA 2026
          </p>
          <h3 className="font-display text-3xl md:text-5xl text-ink leading-[1.05] mb-6">
            {lyneLucien.artist}
          </h3>
          <blockquote className="font-display text-xl md:text-2xl text-ink/85 leading-snug italic mb-8 border-l-2 border-haiti-red pl-5">
            «&nbsp;{lyneLucien.quote}&nbsp;»
          </blockquote>
          <p className="text-ink/80 text-base md:text-lg leading-relaxed mb-8">
            {lyneLucien.bio}
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
            label={work.imageLabel}
            aspect="4/5"
            rounded={false}
          />
        </div>
        <figcaption className="max-w-2xl mx-auto mt-6 md:mt-8 text-center">
          <p className="text-haiti-red text-[10px] md:text-xs uppercase tracking-[0.25em] font-bold mb-3">
            Pour {work.publication}
          </p>
          <h4 className="font-display text-xl md:text-2xl text-ink mb-4 leading-tight">
            {work.role}
          </h4>
          <p className="text-ink/75 text-base leading-relaxed mb-3">
            {work.caption}
          </p>
          <p className="text-xs text-muted italic">
            Œuvre signée {lyneLucien.artist} · Diffusée avec crédit.
          </p>
        </figcaption>
      </motion.figure>
    </article>
  );
}

// ════════════════════════════════════════════════════════════════════════
//  CREATIVE TRIBUTES — objets & œuvres avec leur propre crédit (hors Lyne)
// ════════════════════════════════════════════════════════════════════════

function CreativeTributesExhibit() {
  if (!creativeTributes.length) return null;
  return (
    <div className="bg-bg">
      <div className="space-y-20 md:space-y-28 pb-12 md:pb-16">
        {creativeTributes.map((work) => (
          <TributeExhibit key={work.slug} work={work} />
        ))}
      </div>
    </div>
  );
}

function TributeExhibit({ work }) {
  return (
    <article className="max-w-content mx-auto px-5">
      <motion.figure
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Portrait object (stamp, poster…) — contained so edges aren't cropped */}
        <div className="max-w-sm mx-auto rounded-lg overflow-hidden bg-white border border-line shadow-md">
          <ImagePlaceholder
            src={work.image}
            label={work.imageLabel}
            aspect="3/4"
            fit="contain"
            rounded={false}
          />
        </div>
        <figcaption className="max-w-2xl mx-auto mt-6 md:mt-8 text-center">
          <p className="text-haiti-red text-[10px] md:text-xs uppercase tracking-[0.25em] font-bold mb-3">
            {work.medium}
          </p>
          <h4 className="font-display text-xl md:text-2xl text-ink mb-4 leading-tight">
            {work.title}
          </h4>
          <p className="text-ink/75 text-base leading-relaxed mb-3">
            {work.description}
          </p>
          <p className="text-xs text-muted italic">
            {work.credit}
            {work.creditUrl && (
              <>
                {" · "}
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
//  COLOPHON — curator's closing note
// ════════════════════════════════════════════════════════════════════════

function Colophon() {
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
            Une nation qui supporte.
          </h2>
          <p className="text-bg/80 text-base md:text-lg leading-relaxed mb-10">
            Cette exposition rassemble une partie de la réponse créative qu'a suscitée la qualification d'Haïti pour la Coupe du Monde 2026 — chansons, documentaires, illustrations.
          </p>
          <p className="text-bg/60 text-sm leading-relaxed">
            Curation : Chokarella Media · Pour signaler une œuvre à ajouter,
            écrire à{" "}
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
