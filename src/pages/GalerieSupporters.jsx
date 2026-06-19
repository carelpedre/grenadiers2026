import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import { fetchApprovedPhotos, fanPhotoUrl } from "../lib/fanGalleryApi";
import { useT } from "../lib/i18n";

// ╔══════════════════════════════════════════════════════════════════╗
// ║  /galerie-supporters · galerie publique des photos de supporters  ║
// ║                                                                    ║
// ║  Aucune connexion requise. Lit la vue publique fan_photos_public   ║
// ║  (photos approuvées) via le pattern anon fetch brut. Filtres par   ║
// ║  match et par contexte, chargement progressif (voir plus).        ║
// ╚══════════════════════════════════════════════════════════════════╝

const PAGE = 24;

const MATCH_FILTERS = [
  { value: "", label: "Tous" },
  { value: "scotland", label: "vs Écosse" },
  { value: "brazil", label: "vs Brésil" },
  { value: "morocco", label: "vs Maroc" },
];
const CONTEXT_FILTERS = [
  { value: "", label: "Tous" },
  { value: "stadium", label: "Au stade" },
  { value: "watch_party", label: "Watch party" },
  { value: "home", label: "À la maison" },
];
const MATCH_LABEL = { scotland: "vs Écosse", brazil: "vs Brésil", morocco: "vs Maroc" };
const CONTEXT_LABEL = { stadium: "Au stade", watch_party: "Watch party", home: "À la maison" };

export default function GalerieSupporters() {
  const { t } = useT();
  const [match, setMatch] = useState("");
  const [context, setContext] = useState("");
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const [errored, setErrored] = useState(false);

  // Recharge depuis le début à chaque changement de filtre.
  useEffect(() => {
    let alive = true;
    setLoading(true);
    setErrored(false);
    (async () => {
      const rows = await fetchApprovedPhotos({ match, context, limit: PAGE, offset: 0 });
      if (!alive) return;
      if (rows === null) {
        setErrored(true);
        setPhotos([]);
        setHasMore(false);
      } else {
        setPhotos(rows);
        setHasMore(rows.length === PAGE);
      }
      setLoading(false);
    })();
    return () => {
      alive = false;
    };
  }, [match, context]);

  const loadMore = useCallback(async () => {
    setLoadingMore(true);
    const rows = await fetchApprovedPhotos({ match, context, limit: PAGE, offset: photos.length });
    setLoadingMore(false);
    if (rows && rows.length) {
      setPhotos((prev) => [...prev, ...rows]);
      setHasMore(rows.length === PAGE);
    } else {
      setHasMore(false);
    }
  }, [match, context, photos.length]);

  return (
    <div className="bg-bg">
      <PageHeader
        eyebrow={t("home.gallery.eyebrow")}
        title={t("galerie.title")}
        subtitle={t("galerie.subtitle")}
      />

      <div className="max-w-content mx-auto px-5 py-10 md:py-14">
        {/* Filtres */}
        <div className="space-y-3 mb-8">
          <FilterRow label={t("galerie.filterMatch")} options={MATCH_FILTERS} value={match} onChange={setMatch} />
          <FilterRow label={t("galerie.filterWhere")} options={CONTEXT_FILTERS} value={context} onChange={setContext} />
        </div>

        {loading ? (
          <p className="text-muted text-center py-16">{t("common.loading")}</p>
        ) : errored ? (
          <p className="text-muted text-center py-16">{t("galerie.error")}</p>
        ) : photos.length === 0 ? (
          <EmptyState />
        ) : (
          <>
            <div className="columns-2 md:columns-3 lg:columns-4 gap-3 md:gap-4">
              {photos.map((p) => (
                <PhotoCard key={p.id} photo={p} />
              ))}
            </div>
            {hasMore && (
              <div className="text-center mt-10">
                <button
                  type="button"
                  onClick={loadMore}
                  disabled={loadingMore}
                  className="px-6 py-3 bg-haiti-blue text-bg font-semibold rounded-full hover:bg-haiti-blue-dark transition-colors disabled:opacity-60"
                >
                  {loadingMore ? t("common.loading") : t("galerie.loadMore")}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

function FilterRow({ label, options, value, onChange }) {
  return (
    <div className="flex items-center gap-2 flex-wrap">
      <span className="text-xs uppercase tracking-wider text-muted font-semibold w-12 shrink-0">{label}</span>
      <div className="flex gap-2 flex-wrap">
        {options.map((o) => {
          const active = value === o.value;
          return (
            <button
              key={o.value || "all"}
              type="button"
              aria-pressed={active}
              onClick={() => onChange(o.value)}
              className={`px-3 py-1.5 rounded-full border text-sm font-medium transition-colors ${
                active ? "border-haiti-blue bg-haiti-blue text-bg" : "border-line bg-white text-ink hover:border-haiti-blue"
              }`}
            >
              {o.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function PhotoCard({ photo }) {
  const { t } = useT();
  return (
    <figure className="mb-3 md:mb-4 break-inside-avoid overflow-hidden rounded-lg border border-line bg-white">
      <img
        src={fanPhotoUrl(photo.storage_path)}
        alt={photo.caption || t("home.gallery.photoAlt")}
        loading="lazy"
        decoding="async"
        className="w-full h-auto block bg-bg"
      />
      <figcaption className="p-3">
        <p className="text-[11px] uppercase tracking-wider text-haiti-red font-bold">
          {MATCH_LABEL[photo.match] || photo.match} · {CONTEXT_LABEL[photo.context] || photo.context}
        </p>
        {photo.location && <p className="mt-1 text-sm text-ink/80">{photo.location}</p>}
        {photo.caption && <p className="mt-1 text-sm text-ink/70 leading-snug">{photo.caption}</p>}
      </figcaption>
    </figure>
  );
}

function EmptyState() {
  const { t } = useT();
  return (
    <div className="bg-white border border-line rounded-xl p-10 text-center">
      <p className="text-3xl mb-3">📷</p>
      <p className="text-ink font-semibold mb-1">{t("galerie.emptyTitle")}</p>
      <p className="text-muted text-sm mb-6">{t("galerie.emptyBody")}</p>
      <Link
        to="/partager-ta-photo"
        className="inline-flex items-center gap-2 px-6 py-3 bg-haiti-red text-bg font-semibold rounded-full hover:bg-haiti-red-dark transition-colors"
      >
        {t("galerie.emptyCta")}
      </Link>
    </div>
  );
}
