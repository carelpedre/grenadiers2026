import { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import { fetchAlbums, fetchAlbum, backendReady } from "../lib/galleryApi";

const TITLE_SUFFIX = "Galerie photos · Grenadiers 2026";

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

// Ordre d'affichage des albums : par date d'événement (récent d'abord), puis,
// pour les portraits qui partagent la même date, par numéro de maillot croissant
// (N°1 -> N°26) avec le sélectionneur en dernier. Indépendant de l'ordre
// d'upload (qui, lui, dépend de created_at et casse dès qu'on ajoute un album).
function jerseyRank(name) {
  const m = /^\s*N°\s*(\d+)/.exec(name || "");
  return m ? Number(m[1]) : 1000; // sans numéro (sélectionneur, événements) : à la fin
}
function sortAlbums(list) {
  return [...list].sort((a, b) => {
    const byDate = String(b.event_date || "").localeCompare(String(a.event_date || ""));
    return byDate !== 0 ? byDate : jerseyRank(a.name) - jerseyRank(b.name);
  });
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
  // The open album is driven by the URL: /foto (grid) vs /foto/<slug> (album),
  // so albums are deep-linkable and shareable (and prerendered for crawlers).
  const { slug } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [albums, setAlbums] = useState(null); // null = chargement
  const [albumData, setAlbumData] = useState(null); // réponse fetchAlbum (null = chargement)
  const [lightbox, setLightbox] = useState(-1); // index, -1 = fermé

  // Legacy ?album=<slug> deep links redirect to the canonical /foto/<slug> path.
  useEffect(() => {
    if (slug) return;
    const q = searchParams.get("album");
    if (q) navigate(`/foto/${q}`, { replace: true });
  }, [slug, searchParams, navigate]);

  // Album list (grid).
  useEffect(() => {
    if (!backendReady) {
      setAlbums([]);
      return;
    }
    let alive = true;
    (async () => {
      const data = await fetchAlbums();
      if (alive) setAlbums(sortAlbums(Array.isArray(data) ? data : []));
    })();
    return () => {
      alive = false;
    };
  }, []);

  // The open album. `active` is the list card (for an instant name) when the
  // list is loaded; albumData (fetched below) is authoritative.
  const active = slug ? albums?.find((a) => a.slug === slug) || { slug } : null;

  // Fetch the open album's photos/meta whenever the slug changes.
  useEffect(() => {
    if (!slug) {
      setAlbumData(null);
      setLightbox(-1);
      return;
    }
    let alive = true;
    setAlbumData(null);
    setLightbox(-1);
    window.scrollTo({ top: 0 });
    (async () => {
      const data = await fetchAlbum(slug);
      if (alive) setAlbumData(data || { photos: [] });
    })();
    return () => {
      alive = false;
    };
  }, [slug]);

  const openAlbum = (a) => navigate(`/foto/${a.slug}`);
  const backToAlbums = () => navigate("/foto");

  // Métadonnées de l'album ouvert : on privilégie la réponse du serveur,
  // avec repli sur la carte cliquée.
  const photos = albumData?.photos ?? null;
  const openName = albumData?.album ?? active?.name ?? "";
  const openDate = albumData?.event_date ?? active?.event_date ?? null;
  const openCredit = albumData?.credit ?? active?.credit ?? null;
  const openCreditUrl = albumData?.credit_url ?? active?.credit_url ?? null;
  const openDescription = albumData?.description ?? active?.description ?? null;

  // Client-side tab title = album name on navigation (RouteHead, mounted above
  // <Routes>, runs first and sets the default, so this wins for /foto/<slug>).
  useEffect(() => {
    if (!slug || !openName) return;
    const prev = document.title;
    document.title = `${openName} · ${TITLE_SUFFIX}`;
    return () => {
      document.title = prev;
    };
  }, [slug, openName]);

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
            creditUrl={openCreditUrl}
            description={openDescription}
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
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 items-start">
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
              <p className="font-display text-base text-ink break-words">{a.name}</p>
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

function AlbumView({ name, eventDate, credit, creditUrl, description, photos, onBack, onOpen }) {
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
        {credit && (
          <p className="text-muted text-xs mt-1">
            Photos :{" "}
            {creditUrl ? (
              <a
                href={creditUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-0.5 underline underline-offset-2 hover:text-haiti-blue transition-colors"
              >
                {credit}
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-3 h-3 opacity-70"
                  aria-hidden="true"
                >
                  <path d="M15 3h6v6" />
                  <path d="M10 14 21 3" />
                  <path d="M21 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5" />
                </svg>
              </a>
            ) : (
              credit
            )}
          </p>
        )}
      </div>

      <AlbumDescription description={description} />

      {photos === null ? (
        <p className="text-muted text-sm text-center py-16">Chargement des photos…</p>
      ) : photos.length === 0 ? (
        <p className="text-muted text-sm text-center py-16">Cet album est vide pour le moment.</p>
      ) : (
        // Masonry (CSS columns): thumbs keep their natural aspect ratio so
        // portrait and landscape shots both show whole, never cropped. The
        // photos array order is unchanged, so the index-based lightbox still
        // matches the clicked photo even though columns reflow visually.
        <div className="columns-2 md:columns-3 lg:columns-4 gap-2 md:gap-3">
          {photos.map((p, i) => (
            <button
              key={i}
              type="button"
              onClick={() => onOpen(i)}
              className="block w-full mb-2 md:mb-3 break-inside-avoid overflow-hidden rounded-md bg-bg border border-line hover:border-haiti-red transition-colors"
            >
              <ImgWithFallback src={p.thumb} fallback={p.full} alt="" className="w-full h-auto" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// Album description (player bios on the portrait albums). The composed text is
// the "Position · Club" line, then the bio paragraph(s). We show the first line
// as a small muted lead and the rest as black article-style prose. Renders
// nothing when there is no description (event albums are unaffected).
function AlbumDescription({ description }) {
  if (!description || !description.trim()) return null;
  // Normalise CR/LF (the backend stores CRLF) before splitting.
  const text = description.replace(/\r\n?/g, "\n").trim();
  const nl = text.indexOf("\n");
  const lead = (nl >= 0 ? text.slice(0, nl) : text).trim();
  const rest = nl >= 0 ? text.slice(nl + 1).trim() : "";
  const paras = rest
    ? rest.split(/\n{2,}/).map((s) => s.replace(/\n/g, " ").trim()).filter(Boolean)
    : [];
  return (
    <div className="max-w-5xl mb-8">
      {lead && <p className="text-muted text-sm md:text-base font-semibold mb-3">{lead}</p>}
      {paras.map((para, i) => (
        <p key={i} className="text-ink text-base md:text-lg leading-relaxed mb-3 last:mb-0">
          {para}
        </p>
      ))}
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
