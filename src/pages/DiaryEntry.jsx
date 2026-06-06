import { useParams, Link } from "react-router-dom";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ImagePlaceholder from "../components/ImagePlaceholder";
import MatchResultCard from "../components/MatchResultCard";
import ShareButton from "../components/ShareButton";
import { getEntryBySlug, getEntriesSorted, getAlbums } from "../data/diary";

function getYouTubeId(input) {
  if (!input) return "";
  if (/^[A-Za-z0-9_-]{11}$/.test(input)) return input;
  const m = input.match(/(?:youtu\.be\/|v=|\/embed\/|\/shorts\/)([A-Za-z0-9_-]{11})/);
  return m ? m[1] : input;
}

export default function DiaryEntry() {
  const { slug } = useParams();
  const entry = getEntryBySlug(slug);
  const [lightbox, setLightbox] = useState(null); // flat index across all albums, or null

  if (!entry) {
    return (
      <div className="max-w-content mx-auto px-5 py-20 text-center">
        <p className="font-display text-4xl mb-4">Chronique introuvable.</p>
        <Link to="/journal" className="text-haiti-blue underline hover:no-underline">
          ← Retour au Journal
        </Link>
      </div>
    );
  }

  // Normalize the entry's photos into albums (handles legacy gallery field).
  const albums = getAlbums(entry);

  // Flat photo list — used by the lightbox so prev/next navigates across all albums.
  const flatPhotos = useMemo(() => albums.flatMap((a) => a.photos), [albums]);

  // Map each photo back to its flat index so clicking an album thumbnail opens the right slide.
  const flatIndexOf = (photo) => flatPhotos.indexOf(photo);

  const otherEntries = getEntriesSorted().filter((e) => e.slug !== slug).slice(0, 3);

  return (
    <article>
      {/* Hero */}
      <header className="relative bg-ink text-bg overflow-hidden">
        <div className="absolute inset-0">
          <ImagePlaceholder src={entry.cover} label={entry.title} aspect="16/9" rounded={false} className="w-full h-full object-cover opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-b from-ink/80 via-ink/70 to-ink"></div>
        </div>
        <div className="relative max-w-content mx-auto px-5 py-20 md:py-28">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-5 text-xs">
              <span className="text-haiti-red uppercase tracking-wider font-bold">
                {entry.eyebrow}
              </span>
              <span className="text-bg/60">{entry.dateLabel}</span>
            </div>
            <h1 className="font-display text-4xl md:text-6xl mb-5 leading-tight">{entry.title}</h1>
            <p className="text-bg/80 text-lg md:text-xl leading-relaxed">{entry.dek}</p>
            <div className="mt-6">
              <ShareButton dark title={entry.title} text={entry.dek} />
            </div>
          </div>
        </div>
        {entry.coverCredit && (
          <p className="absolute bottom-2 right-4 text-[10px] md:text-xs text-bg/40">
            {entry.coverCredit}
          </p>
        )}
      </header>

      {/* Article body */}
      <section className="bg-white">
        <div className="max-w-4xl mx-auto px-5 py-12 space-y-6 text-ink text-lg leading-relaxed">
          {entry.fixtureOpponent && (
            <MatchResultCard
              opponentSlug={entry.fixtureOpponent}
              opponentLabel={entry.fixtureOpponentLabel}
            />
          )}
          {entry.video && (
            <figure className="my-8">
              <div className="relative w-full overflow-hidden rounded-xl aspect-video">
                <iframe
                  className="absolute inset-0 h-full w-full"
                  src={`https://www.youtube-nocookie.com/embed/${getYouTubeId(entry.video)}`}
                  title={entry.videoCaption || entry.title}
                  loading="lazy"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
              {entry.videoCaption && (
                <figcaption className="mt-2 text-sm opacity-70">{entry.videoCaption}</figcaption>
              )}
            </figure>
          )}
          {entry.cta && (
            <div>
              <a
                href={entry.cta.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-haiti-blue px-6 py-3 text-white text-sm md:text-base font-semibold hover:bg-haiti-blue-dark transition-colors"
              >
                <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M8 5v14l11-7z" />
                </svg>
                {entry.cta.label}
              </a>
            </div>
          )}
          {entry.body.map((paragraph, i) =>
            typeof paragraph === "string" && paragraph.startsWith("## ") ? (
              <h2 key={i} className="font-display text-2xl md:text-3xl text-ink leading-snug pt-4">
                {paragraph.slice(3)}
              </h2>
            ) : (
              <p key={i}>{paragraph}</p>
            )
          )}
          {entry.source && (
            <p className="text-sm text-muted italic pt-4 border-t border-line">
              {entry.source}
            </p>
          )}
        </div>
      </section>

      {/* Photo albums */}
      {albums.length > 0 && (
        <section className="bg-bg border-t border-line">
          <div className="max-w-content mx-auto px-5 py-16">
            <p className="text-haiti-red text-xs uppercase tracking-wider font-bold mb-3">
              La galerie
            </p>
            <h2 className="font-display text-3xl md:text-4xl mb-10">En images</h2>

            <div className="space-y-12">
              {albums.map((album, ai) => (
                <Album
                  key={album.title || `album-${ai}`}
                  album={album}
                  flatIndexOf={flatIndexOf}
                  onPhotoClick={(idx) => setLightbox(idx)}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Other entries */}
      {otherEntries.length > 0 && (
        <section className="bg-white border-t border-line">
          <div className="max-w-content mx-auto px-5 py-16">
            <div className="flex items-end justify-between gap-4 mb-8">
              <div>
                <p className="text-haiti-red text-xs uppercase tracking-wider font-bold mb-2">
                  À lire aussi
                </p>
                <h2 className="font-display text-2xl md:text-3xl">Autres chroniques</h2>
              </div>
              <Link to="/journal" className="text-sm font-semibold text-haiti-blue hover:text-haiti-red transition-colors whitespace-nowrap">
                Tout le Journal →
              </Link>
            </div>
            <div className="grid md:grid-cols-3 gap-5">
              {otherEntries.map((e) => (
                <Link
                  key={e.slug}
                  to={`/journal/${e.slug}`}
                  className="block bg-white border border-line rounded-lg overflow-hidden hover:border-haiti-red transition-all"
                >
                  <ImagePlaceholder src={e.cover} label={e.title} aspect="16/9" rounded={false} />
                  <div className="p-4">
                    <p className="text-xs text-muted mb-1">{e.dateLabel}</p>
                    <h3 className="font-display text-lg leading-snug">{e.title}</h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && flatPhotos[lightbox] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] flex items-center justify-center p-4 bg-ink/90 backdrop-blur-sm"
            onClick={() => setLightbox(null)}
          >
            <button
              onClick={() => setLightbox(null)}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-bg/10 hover:bg-bg/20 text-bg flex items-center justify-center backdrop-blur-sm"
              aria-label="Fermer"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            {lightbox > 0 && (
              <button
                onClick={(e) => { e.stopPropagation(); setLightbox(lightbox - 1); }}
                className="absolute left-4 z-10 w-12 h-12 rounded-full bg-bg/10 hover:bg-bg/20 text-bg flex items-center justify-center backdrop-blur-sm"
                aria-label="Précédent"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            )}
            {lightbox < flatPhotos.length - 1 && (
              <button
                onClick={(e) => { e.stopPropagation(); setLightbox(lightbox + 1); }}
                className="absolute right-4 z-10 w-12 h-12 rounded-full bg-bg/10 hover:bg-bg/20 text-bg flex items-center justify-center backdrop-blur-sm"
                aria-label="Suivant"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            )}
            <motion.div
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              className="relative max-w-5xl max-h-[85vh] flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={flatPhotos[lightbox].src}
                alt={flatPhotos[lightbox].alt || ""}
                className="max-w-full max-h-[80vh] w-auto h-auto object-contain rounded-lg"
                onError={(e) => { e.currentTarget.style.display = 'none'; }}
              />
              {flatPhotos[lightbox].alt && (
                <p className="text-bg/70 text-sm text-center mt-3">{flatPhotos[lightbox].alt}</p>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </article>
  );
}

// Single album: optional title + grid of photo thumbnails.
// Clicking a thumbnail opens the lightbox at the correct flat index.
function Album({ album, flatIndexOf, onPhotoClick }) {
  return (
    <div>
      {album.title && (
        <div className="mb-5 flex items-baseline gap-3">
          <h3 className="font-display text-xl md:text-2xl text-ink">
            {album.title}
          </h3>
          <span className="text-xs text-muted uppercase tracking-wider font-semibold">
            {album.photos.length} {album.photos.length === 1 ? "photo" : "photos"}
          </span>
        </div>
      )}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
        {album.photos.map((photo, i) => (
          <button
            key={photo.src}
            onClick={() => onPhotoClick(flatIndexOf(photo))}
            className="block rounded-lg overflow-hidden border border-line hover:border-haiti-red transition-all"
          >
            <ImagePlaceholder
              src={photo.src}
              label={photo.alt}
              aspect="3/4"
              objectPosition="center top"
              rounded={false}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
