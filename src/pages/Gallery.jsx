import { useState, useEffect, useCallback } from "react";
import PageHeader from "../components/PageHeader";
import { photos, categories, getCategoryCounts, credit } from "../data/gallery";
import { useT } from "../lib/i18n";

export default function Gallery() {
  const { t } = useT();
  const [activeCategory, setActiveCategory] = useState("all");
  const [lightboxIndex, setLightboxIndex] = useState(null);

  // Photos visible in the current filter
  const visible = activeCategory === "all"
    ? photos
    : photos.filter((p) => p.category === activeCategory);

  const counts = getCategoryCounts();

  // Lightbox keyboard navigation
  useEffect(() => {
    if (lightboxIndex === null) return;
    const handler = (e) => {
      if (e.key === "Escape") setLightboxIndex(null);
      if (e.key === "ArrowRight") setLightboxIndex((i) => (i + 1) % visible.length);
      if (e.key === "ArrowLeft") setLightboxIndex((i) => (i - 1 + visible.length) % visible.length);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightboxIndex, visible.length]);

  // Lock body scroll when lightbox is open
  useEffect(() => {
    if (lightboxIndex !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [lightboxIndex]);

  // Switch filter — reset to top of grid
  const switchCategory = useCallback((catId) => {
    setActiveCategory(catId);
    setLightboxIndex(null);
  }, []);

  return (
    <div>
      <PageHeader
        eyebrow={t("gallery.eyebrow")}
        title={t("gallery.title")}
        subtitle={t("gallery.subtitle")}
      />

      {/* Filter bar */}
      <section className="bg-white border-b border-line sticky top-[73px] z-30">
        <div className="max-w-content mx-auto px-5 py-3 overflow-x-auto">
          <div className="flex gap-2 min-w-max">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => switchCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors whitespace-nowrap ${
                  activeCategory === cat.id
                    ? "bg-haiti-blue text-bg"
                    : "bg-bg text-ink hover:bg-line border border-line"
                }`}
              >
                {cat.label}
                <span className="ml-2 text-xs opacity-70">
                  {counts[cat.id] || 0}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Photo grid */}
      <div className="max-w-content mx-auto px-5 py-10">
        {visible.length === 0 ? (
          <div className="text-center py-20 text-muted">
            No photos in this category yet.
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
            {visible.map((photo, idx) => (
              <PhotoTile
                key={photo.filename}
                photo={photo}
                onClick={() => setLightboxIndex(idx)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Credit footer */}
      <section className="bg-bg border-t border-line">
        <div className="max-w-content mx-auto px-5 py-10">
          <div className="bg-white border border-line rounded-lg p-6 md:p-8">
            <p className="text-xs uppercase tracking-wider text-haiti-red font-bold mb-3">
              Credit & permissions
            </p>
            <p className="text-ink leading-relaxed mb-3">
              {credit.long}
            </p>
            <p className="text-sm text-muted leading-relaxed">
              Every photo on this page belongs to the Fédération Haïtienne de Football. Used with their express permission. To use any photo elsewhere, please contact the FHF directly via{" "}
              <a
                href={credit.source}
                target="_blank"
                rel="noopener noreferrer"
                className="text-haiti-blue underline hover:no-underline"
              >
                fhf.ht
              </a>
              .
            </p>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <Lightbox
          photo={visible[lightboxIndex]}
          index={lightboxIndex}
          total={visible.length}
          onClose={() => setLightboxIndex(null)}
          onPrev={() => setLightboxIndex((i) => (i - 1 + visible.length) % visible.length)}
          onNext={() => setLightboxIndex((i) => (i + 1) % visible.length)}
        />
      )}
    </div>
  );
}

function PhotoTile({ photo, onClick }) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  return (
    <button
      onClick={onClick}
      className="group relative overflow-hidden rounded-lg bg-line aspect-square focus:outline-none focus:ring-2 focus:ring-haiti-red focus:ring-offset-2"
    >
      {!error ? (
        <>
          <img
            src={`/images/gallery/${photo.filename}`}
            alt={photo.alt}
            loading="lazy"
            onLoad={() => setLoaded(true)}
            onError={() => setError(true)}
            className={`w-full h-full object-cover transition-all duration-300 group-hover:scale-105 ${
              loaded ? "opacity-100" : "opacity-0"
            }`}
          />
          {!loaded && (
            <div className="absolute inset-0 bg-line animate-pulse" />
          )}
        </>
      ) : (
        <div className="absolute inset-0 bg-line flex items-center justify-center p-3">
          <p className="text-xs text-muted text-center break-words">
            {photo.caption}
          </p>
        </div>
      )}

      {/* Caption overlay on hover */}
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent p-3 opacity-0 group-hover:opacity-100 transition-opacity">
        <p className="text-bg text-xs font-semibold text-left leading-tight">
          {photo.caption}
        </p>
      </div>
    </button>
  );
}

function Lightbox({ photo, index, total, onClose, onPrev, onNext }) {
  return (
    <div
      className="fixed inset-0 bg-black/95 z-[100] flex flex-col"
      onClick={onClose}
    >
      {/* Top bar */}
      <div
        className="flex items-center justify-between p-4 text-bg"
        onClick={(e) => e.stopPropagation()}
      >
        <span className="text-sm font-semibold tabular-nums">
          {index + 1} / {total}
        </span>
        <button
          onClick={onClose}
          className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
          aria-label="Close"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      {/* Image area */}
      <div
        className="flex-1 flex items-center justify-center px-4 md:px-12 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Prev */}
        {total > 1 && (
          <button
            onClick={onPrev}
            className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 hover:bg-white/20 text-bg flex items-center justify-center transition-colors z-10"
            aria-label="Previous"
          >
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        )}

        <img
          src={`/images/gallery/${photo.filename}`}
          alt={photo.alt}
          className="max-w-full max-h-[75vh] object-contain"
        />

        {/* Next */}
        {total > 1 && (
          <button
            onClick={onNext}
            className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 hover:bg-white/20 text-bg flex items-center justify-center transition-colors z-10"
            aria-label="Next"
          >
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        )}
      </div>

      {/* Caption + credit */}
      <div
        className="p-4 md:p-6 text-bg max-w-3xl mx-auto w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <p className="text-base md:text-lg font-semibold mb-1">{photo.caption}</p>
        <p className="text-xs text-bg/60 italic">{credit.short}</p>
      </div>
    </div>
  );
}
