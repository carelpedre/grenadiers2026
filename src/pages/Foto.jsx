import { useEffect, useState, useCallback } from "react";
import PageHeader from "../components/PageHeader";
import { fetchAlbums, fetchAlbum, backendReady } from "../lib/galleryApi";

// ╔══════════════════════════════════════════════════════════════════╗
// ║  /foto — galerie photo publique.                                   ║
// ║  Grille d'albums -> grille de photos -> visionneuse (lightbox).    ║
// ║  Date d'événement et crédit viennent de chaque album (peuvent      ║
// ║  être absents : on n'affiche rien dans ce cas).                    ║
// ╚══════════════════════════════════════════════════════════════════╝

// Formate "YYYY-MM-DD" en date FR locale (sans décalage de fuseau).
function frEventDate(ymd) {
  if (!ymd) return "";
  const [y, m, d] = String(ymd).split("-").map(Number);
  if (!y || !m || !d) return "";
  return new Intl.DateTimeFormat("fr-FR", { day: "numeric", month: "long", year: "numeric" }).format(
    new Date(y, m - 1, d),
  );
}

// Image avec repli : si la miniature échoue, on tente la version pleine taille.
function ImgWithFallback({ src, fallback, alt, className }) {
  const [cur, setCur] = useState(src);
  useEffect(() => setCur(src), [src]);
  return (
    <img
      src={cur}
      alt={alt || ""}
      loading="lazy"
      className={className}
      onError={() => {
        if (fallback && cur !== fallback) setCur(fallback);
      }}
    />
  );
}

export default function Foto() {
  const [albums, setAlbums] = useState(null); // null = chargement
  const [active, setActive] = useState(null); // album de la liste (a son name/event_date/credit)
  const [albumData, setAlbumData] = useState(null); // réponse fetchAlbum (null = chargement)
  const [lightbox, setLightbox] = useState(-1); // index, -1 = fermé

  useEffect(() => {
    if (!backendReady) {
      setAlbums([]);
      return;
    }
    let alive = true;
    (async () => {
      const data = await fetchAlbums();
      if (alive) setAlbums(Array.isArray(data) ? data : []);
    })();
    return () => {
      alive = false;
    };
  }, []);

  useEffect(() => {
    if (!active) return;
    let alive = true;
    setAlbumData(null);
    (async () => {
      const data = await fetchAlbum(active.slug);
      if (alive) setAlbumData(data || { photos: [] });
    })();
    return () => {
      alive = false;
    };
  }, [active]);

  const openAlbum = (a) => {
    setActive(a);
    setLightbox(-1);
    window.scrollTo({ top: 0 });
  };
  const backToAlbums = () => {
    setActive(null);
    setAlbumData(null);
    setLightbox(-1);
  };

  // Métadonnées de l'album ouvert : on privilégie la réponse du serveur,
  // avec repli sur la carte cliquée.
  const photos = albumData?.photos ?? null;
  const openName = albumData?.album ?? active?.name ?? "";
  const openDate = albumData?.event_date ?? active?.event_date ?? null;
  const openCredit = albumData?.credit ?? active?.credit ?? null;

  return (
    <div>
      <PageHeader
        eyebrow="Galerie"
        title="Photos"
        subtitle="La route des Grenadiers vers la Coupe du Monde 2026, en images."
      />

      <div className="max-w-content mx-auto px-5 py-12 md:py-16">
        {active ? (
          <AlbumView
            name={openName}
            eventDate={openDate}
            credit={openCredit}
            photos={photos}
            onBack={backToAlbums}
            onOpen={(i) => setLightbox(i)}
          />
        ) : (
          <AlbumGrid albums={albums} onOpen={openAlbum} />
        )}
      </div>

      {active && photos && lightbox >= 0 && (
        <Lightbox
          photos={photos}
          index={lightbox}
          onClose={() => setLightbox(-1)}
          onChange={(i) => setLightbox(i)}
        />
      )}
    </div>
  );
}

function AlbumGrid({ albums, onOpen }) {
  if (albums === null) {
    return <p className="text-muted text-sm text-center py-16">Chargement des albums…</p>;
  }
  if (albums.length === 0) {
    return (
      <div className="bg-bg border border-line rounded-lg p-10 text-center">
        <h2 className="font-display text-xl text-ink mb-2">Bientôt en images</h2>
        <p className="text-muted text-sm max-w-prose mx-auto">
          Aucun album pour le moment. Les premières photos arrivent très vite.
        </p>
      </div>
    );
  }
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
      {albums.map((a) => {
        const date = frEventDate(a.event_date);
        return (
          <button
            key={a.id ?? a.slug}
            type="button"
            onClick={() => onOpen(a)}
            className="group text-left rounded-lg overflow-hidden border border-line bg-white hover:border-haiti-red transition-colors"
          >
            <div className="aspect-[4/3] bg-bg overflow-hidden">
              {a.cover ? (
                <ImgWithFallback
                  src={a.cover}
                  fallback={a.cover_full}
                  alt={a.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-muted text-xs">
                  Album
                </div>
              )}
            </div>
            <div className="p-3">
              <p className="font-display text-base text-ink truncate">{a.name}</p>
              <p className="text-muted text-xs mt-0.5">
                {date && <span>{date} · </span>}
                {a.count} photo{a.count > 1 ? "s" : ""}
              </p>
            </div>
          </button>
        );
      })}
    </div>
  );
}

function AlbumView({ name, eventDate, credit, photos, onBack, onOpen }) {
  const date = frEventDate(eventDate);
  return (
    <div>
      <div className="mb-6">
        <button
          type="button"
          onClick={onBack}
          className="text-haiti-red text-xs uppercase tracking-wider font-bold hover:text-ink transition-colors"
        >
          ← Tous les albums
        </button>
        <h2 className="font-display text-xl md:text-3xl text-ink mt-3">{name}</h2>
        {date && <p className="text-muted text-sm mt-1">{date}</p>}
        {credit && <p className="text-muted text-xs mt-1">Photos : {credit}</p>}
      </div>

      {photos === null ? (
        <p className="text-muted text-sm text-center py-16">Chargement des photos…</p>
      ) : photos.length === 0 ? (
        <p className="text-muted text-sm text-center py-16">Cet album est vide pour le moment.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 md:gap-3">
          {photos.map((p, i) => (
            <button
              key={i}
              type="button"
              onClick={() => onOpen(i)}
              className="aspect-square overflow-hidden rounded-md bg-bg border border-line hover:border-haiti-red transition-colors"
            >
              <ImgWithFallback src={p.thumb} fallback={p.full} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function Lightbox({ photos, index, onClose, onChange }) {
  const prev = useCallback(
    () => onChange((index - 1 + photos.length) % photos.length),
    [index, photos.length, onChange],
  );
  const next = useCallback(
    () => onChange((index + 1) % photos.length),
    [index, photos.length, onChange],
  );

  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowLeft") prev();
      else if (e.key === "ArrowRight") next();
    }
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose, prev, next]);

  const [touchX, setTouchX] = useState(null);
  const onTouchStart = (e) => setTouchX(e.changedTouches[0].clientX);
  const onTouchEnd = (e) => {
    if (touchX == null) return;
    const dx = e.changedTouches[0].clientX - touchX;
    if (Math.abs(dx) > 50) (dx > 0 ? prev : next)();
    setTouchX(null);
  };

  const photo = photos[index];

  return (
    <div
      className="fixed inset-0 z-[95] bg-ink/95 flex items-center justify-center"
      style={{ height: "100dvh" }}
      onClick={onClose}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Fermer"
        className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-bg/15 hover:bg-bg/30 text-bg flex items-center justify-center"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {photos.length > 1 && (
        <>
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); prev(); }}
            aria-label="Photo précédente"
            className="absolute left-2 md:left-4 z-10 w-11 h-11 rounded-full bg-bg/15 hover:bg-bg/30 text-bg flex items-center justify-center"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); next(); }}
            aria-label="Photo suivante"
            className="absolute right-2 md:right-4 z-10 w-11 h-11 rounded-full bg-bg/15 hover:bg-bg/30 text-bg flex items-center justify-center"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </>
      )}

      <img
        src={photo.full}
        alt=""
        onClick={(e) => e.stopPropagation()}
        className="max-w-[92vw] max-h-[88dvh] object-contain select-none"
      />

      {photos.length > 1 && (
        <p className="absolute bottom-4 left-0 right-0 text-center text-bg/70 text-xs tabular-nums">
          {index + 1} / {photos.length}
        </p>
      )}
    </div>
  );
}
