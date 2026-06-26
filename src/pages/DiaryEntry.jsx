import { useParams, Link } from "react-router-dom";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ImagePlaceholder from "../components/ImagePlaceholder";
import MatchResultCard from "../components/MatchResultCard";
import ShareButton from "../components/ShareButton";
import YouTubeEmbed from "../components/YouTubeEmbed";
import { getEntryBySlug, getEntriesSorted, getAlbums } from "../data/diary";
import { useT } from "../lib/i18n";

// Sélecteur de langue pour les champs d'une entrée : créole (ht) puis anglais (en)
// quand le champ existe, sinon le français (fallback fr partout).
function makePick(lang) {
  return (fr, en, ht) => (lang === "ht" && ht ? ht : lang === "en" && en ? en : fr);
}

// Mois en créole haïtien (Intl n'a pas de locale 'ht').
const HT_MONTHS = ["janvye", "fevriye", "mas", "avril", "me", "jen", "jiyè", "out", "septanm", "oktòb", "novanm", "desanm"];

// Date affichée : en créole, formatée "D MMMM yyyy" depuis l'ISO `date` ; en anglais,
// via toLocaleDateString ; en français, le dateLabel stocké (sortie française inchangée).
function journalDate(entry, lang) {
  if (lang === "ht" && entry?.date) {
    const d = new Date(`${entry.date}T00:00:00Z`);
    return `${d.getUTCDate()} ${HT_MONTHS[d.getUTCMonth()]} ${d.getUTCFullYear()}`;
  }
  if (lang === "en" && entry?.date) {
    return new Date(`${entry.date}T00:00:00Z`).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: "UTC",
    });
  }
  return entry?.dateLabel;
}

// Corps de l'article selon la langue : bodyHt/bodyEn s'il existe, sinon
// le corps français (même convention "## " pour les titres).
function pickBody(entry, lang) {
  if (lang === "ht" && Array.isArray(entry?.bodyHt)) return entry.bodyHt;
  if (lang === "en" && Array.isArray(entry?.bodyEn)) return entry.bodyEn;
  return entry.body;
}

// Transcription « conférence de presse » selon la langue : transcriptHt/transcriptEn
// s'il existe, sinon la transcription française (même shape par item).
function pickTranscript(entry, lang) {
  if (lang === "ht" && Array.isArray(entry?.transcriptHt)) return entry.transcriptHt;
  if (lang === "en" && Array.isArray(entry?.transcriptEn)) return entry.transcriptEn;
  return entry.transcript;
}

function getYouTubeId(input) {
  if (!input) return "";
  if (/^[A-Za-z0-9_-]{11}$/.test(input)) return input;
  const m = input.match(/(?:youtu\.be\/|v=|\/embed\/|\/shorts\/)([A-Za-z0-9_-]{11})/);
  return m ? m[1] : input;
}

// Une entrée est en MP4 auto-hébergé si videoType vaut "file" ou si l'URL se
// termine par .mp4. Sinon on retombe sur l'embed YouTube (comportement existant).
function isSelfHostedVideo(entry) {
  if (entry?.videoType === "file") return true;
  return /\.mp4(\?.*)?$/i.test(entry?.video || "");
}

export default function DiaryEntry() {
  const { t, lang } = useT();
  const pick = makePick(lang);
  const { slug } = useParams();
  const entry = getEntryBySlug(slug);
  const [lightbox, setLightbox] = useState(null); // flat index across all albums, or null
  const [presserTab, setPresserTab] = useState("article"); // onglets des entrées « conférence de presse »

  if (!entry) {
    return (
      <div className="max-w-content mx-auto px-5 py-20 text-center">
        <p className="font-display text-4xl mb-4">{t("journal.notFound")}</p>
        <Link to="/journal" className="text-haiti-blue underline hover:no-underline">
          {t("journal.backToJournal")}
        </Link>
      </div>
    );
  }

  // Légende vidéo selon la langue (ht/en si présent, sinon fr).
  const vcap = pick(entry.videoCaption, entry.videoCaptionEn, entry.videoCaptionHt);

  // Normalize the entry's photos into albums (handles legacy gallery field).
  const albums = getAlbums(entry);

  // Flat photo list · used by the lightbox so prev/next navigates across all albums.
  const flatPhotos = useMemo(() => albums.flatMap((a) => a.photos), [albums]);

  // Map each photo back to its flat index so clicking an album thumbnail opens the right slide.
  const flatIndexOf = (photo) => flatPhotos.indexOf(photo);

  const otherEntries = getEntriesSorted().filter((e) => e.slug !== slug).slice(0, 3);

  // Entrée « conférence de presse » : onglets L'article / Transcription intégrale
  // au-dessus du corps. N'affecte que les entrées qui optent via
  // type: "press-conference" (ou l'ancien format: "presser").
  const isPresser =
    (entry.type === "press-conference" || entry.format === "presser") &&
    Array.isArray(entry.transcript) &&
    entry.transcript.length > 0;
  const PRESSER_TABS = ["article", "transcription"];
  function onPresserTabKey(e) {
    if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
    e.preventDefault();
    const i = PRESSER_TABS.indexOf(presserTab);
    const next = PRESSER_TABS[(i + (e.key === "ArrowRight" ? 1 : PRESSER_TABS.length - 1)) % PRESSER_TABS.length];
    setPresserTab(next);
    document.getElementById(`presser-tab-${next}`)?.focus();
  }

  return (
    <article>
      {/* Hero */}
      <header className="relative bg-ink text-bg overflow-hidden">
        <div className="absolute inset-0">
          <ImagePlaceholder src={entry.cover} label={pick(entry.title, entry.titleEn, entry.titleHt)} aspect="16/9" rounded={false} className="w-full h-full object-cover opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-b from-ink/80 via-ink/70 to-ink"></div>
        </div>
        <div className="relative max-w-content mx-auto px-5 py-20 md:py-28">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-5 text-xs">
              <span className="text-haiti-red uppercase tracking-wider font-bold">
                {pick(entry.eyebrow, entry.eyebrowEn, entry.eyebrowHt)}
              </span>
              <span className="text-bg/60">{journalDate(entry, lang)}</span>
            </div>
            <h1 className="font-display text-4xl md:text-6xl mb-5 leading-tight">{pick(entry.title, entry.titleEn, entry.titleHt)}</h1>
            <p className="text-bg/80 text-lg md:text-xl leading-relaxed">{pick(entry.dek, entry.dekEn, entry.dekHt)}</p>
            <div className="mt-6">
              <ShareButton dark title={pick(entry.title, entry.titleEn, entry.titleHt)} text={pick(entry.dek, entry.dekEn, entry.dekHt)} />
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
        <div className="max-w-4xl mx-auto px-5 py-12">
          {isPresser && (
            <div
              role="tablist"
              aria-label={t("journal.formatAria")}
              className="mb-8 flex w-full gap-1 rounded-full border border-line bg-bg p-1"
            >
              {PRESSER_TABS.map((id) => {
                const label = id === "article" ? t("journal.tabArticle") : t("journal.tabTranscript");
                const active = presserTab === id;
                return (
                  <button
                    key={id}
                    type="button"
                    role="tab"
                    id={`presser-tab-${id}`}
                    aria-selected={active}
                    aria-controls={`presser-panel-${id}`}
                    tabIndex={active ? 0 : -1}
                    onClick={() => setPresserTab(id)}
                    onKeyDown={onPresserTabKey}
                    className={`flex-1 rounded-full px-4 py-2 text-sm font-semibold uppercase tracking-wider transition-colors ${
                      active ? "bg-ink text-bg" : "text-ink hover:bg-white"
                    }`}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          )}
          {(!isPresser || presserTab === "article") && (
            <div
              id="presser-panel-article"
              role={isPresser ? "tabpanel" : undefined}
              aria-labelledby={isPresser ? "presser-tab-article" : undefined}
              className="space-y-6 text-ink text-lg leading-relaxed"
            >
          {entry.fixtureOpponent && (
            <MatchResultCard
              opponentSlug={entry.fixtureOpponent}
              opponentLabel={entry.fixtureOpponentLabel}
            />
          )}
          {entry.video && (
            <figure className="my-8">
              {isSelfHostedVideo(entry) ? (
                <video
                  className="w-full rounded-xl bg-ink"
                  src={entry.video}
                  poster={entry.cover}
                  controls
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                />
              ) : entry.videoExternal ? (
                // Certaines vidéos (contenu FIFA, etc.) sont bloquées à
                // l'intégration par leur ayant droit : impossible de les lire
                // hors de YouTube. On affiche une affiche cliquable qui ouvre
                // la vidéo sur YouTube plutôt qu'un lecteur en erreur.
                <a
                  href={entry.video}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative block w-full overflow-hidden rounded-xl aspect-video bg-ink"
                  aria-label={`${vcap || pick(entry.title, entry.titleEn, entry.titleHt)} · ${t("journal.watchYoutube")}`}
                >
                  {(entry.videoPoster || entry.cover) && (
                    <img
                      src={entry.videoPoster || entry.cover}
                      alt=""
                      loading="lazy"
                      onError={(e) => {
                        if (entry.cover && e.currentTarget.src !== entry.cover) {
                          e.currentTarget.src = entry.cover;
                        }
                      }}
                      className="absolute inset-0 h-full w-full object-cover opacity-75 transition-opacity duration-300 group-hover:opacity-90"
                    />
                  )}
                  <span className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-ink/30">
                    <span className="flex h-16 w-16 items-center justify-center rounded-full bg-haiti-red text-white shadow-lg transition-transform duration-300 group-hover:scale-110">
                      <svg className="ml-1 h-7 w-7" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </span>
                    <span className="rounded-full bg-ink/85 px-4 py-1.5 text-sm font-semibold text-white">
                      {t("journal.watchYoutube")}
                    </span>
                  </span>
                </a>
              ) : (
                <div className="relative w-full overflow-hidden rounded-xl aspect-video">
                  <iframe
                    className="absolute inset-0 h-full w-full"
                    src={`https://www.youtube-nocookie.com/embed/${getYouTubeId(entry.video)}`}
                    title={vcap || entry.title}
                    loading="lazy"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                </div>
              )}
              {vcap && (
                <figcaption className="mt-2 text-sm opacity-70">{vcap}</figcaption>
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
          {pickBody(entry, lang).map((paragraph, i) => {
            if (typeof paragraph === "string" && paragraph.startsWith("## ")) {
              return (
                <h2 key={i} className="font-display text-2xl md:text-3xl text-ink leading-snug pt-4">
                  {paragraph.slice(3)}
                </h2>
              );
            }
            const videoMatch =
              typeof paragraph === "string" && paragraph.match(/^\[VIDEO\]\s+(\S+)$/);
            if (videoMatch) {
              return <YouTubeEmbed key={i} videoId={getYouTubeId(videoMatch[1])} />;
            }
            return <p key={i}>{paragraph}</p>;
          })}
          {entry.coverAtEnd && entry.cover && (
            <figure>
              <img
                src={entry.cover}
                alt={pick(entry.title, entry.titleEn, entry.titleHt)}
                loading="lazy"
                className="w-full h-auto rounded-lg border border-line"
              />
            </figure>
          )}
          {entry.source && (
            <p className="text-sm text-muted italic pt-4 border-t border-line">
              {entry.sourceUrl ? (
                <a
                  href={entry.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-0.5 underline underline-offset-2 hover:text-haiti-blue transition-colors"
                >
                  {pick(entry.source, entry.sourceEn, entry.sourceHt)}
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
                pick(entry.source, entry.sourceEn, entry.sourceHt)
              )}
            </p>
          )}
            </div>
          )}
          {isPresser && presserTab === "transcription" && (
            <div
              id="presser-panel-transcription"
              role="tabpanel"
              aria-labelledby="presser-tab-transcription"
              className="max-w-prose"
            >
              {entry.transcriptNote && (
                <p className="text-sm text-muted italic mb-8">{entry.transcriptNote}</p>
              )}
              <div className="space-y-6 leading-relaxed">
                {pickTranscript(entry, lang).map((t, i) =>
                  t.heading ? (
                    // Section header (e.g. a player's name in a zone-mixte transcript).
                    <div key={i} className="pt-6 first:pt-0">
                      <span className="flag-rule block w-8 rounded-full mb-2.5" />
                      <p className="font-display text-xl md:text-2xl font-bold uppercase tracking-tight text-ink">
                        {t.heading}
                      </p>
                    </div>
                  ) : (
                    <div key={i}>
                      {t.topic && (
                        <p className="text-gold/80 text-xs font-semibold uppercase tracking-wider mb-2">
                          {t.topic}
                        </p>
                      )}
                      {t.q && <p className="text-muted italic mb-2">{t.q}</p>}
                      <p className="mb-1.5 flex flex-wrap items-baseline gap-x-2.5">
                        {t.time && (
                          <span className="text-gold/80 text-xs font-semibold tabular-nums tracking-wider">
                            {t.time}
                          </span>
                        )}
                        <span className="font-bold text-ink">{t.speaker}</span>
                      </p>
                      {Array.isArray(t.lines) ? (
                        <div className="space-y-3 text-ink/90 text-lg leading-relaxed">
                          {t.lines.map((l, j) => (
                            <p key={j}>{l}</p>
                          ))}
                        </div>
                      ) : (
                        <p className="text-ink/90 text-lg leading-relaxed">{t.text}</p>
                      )}
                    </div>
                  )
                )}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Photo albums */}
      {albums.length > 0 && (
        <section className="bg-bg border-t border-line">
          <div className="max-w-content mx-auto px-5 py-16">
            <p className="text-haiti-red text-xs uppercase tracking-wider font-bold mb-3">
              {t("journal.galleryEyebrow")}
            </p>
            <h2 className="font-display text-3xl md:text-4xl mb-2">{t("journal.inImages")}</h2>
            {entry.photoCredit && (
              <p className="text-sm text-muted mb-10">{t("journal.photosCredit")} {entry.photoCredit}</p>
            )}
            {!entry.photoCredit && <div className="mb-10" />}

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
                  {t("journal.alsoRead")}
                </p>
                <h2 className="font-display text-2xl md:text-3xl">{t("journal.otherEntries")}</h2>
              </div>
              <Link to="/journal" className="text-sm font-semibold text-haiti-blue hover:text-haiti-red transition-colors whitespace-nowrap">
                {t("journal.allJournal")}
              </Link>
            </div>
            <div className="grid md:grid-cols-3 gap-5">
              {otherEntries.map((e) => (
                <Link
                  key={e.slug}
                  to={`/journal/${e.slug}`}
                  className="block bg-white border border-line rounded-lg overflow-hidden hover:border-haiti-red transition-all"
                >
                  <ImagePlaceholder src={e.cover} label={pick(e.title, e.titleEn, e.titleHt)} aspect="16/9" rounded={false} />
                  <div className="p-4">
                    <p className="text-xs text-muted mb-1">{journalDate(e, lang)}</p>
                    <h3 className="font-display text-lg leading-snug">{pick(e.title, e.titleEn, e.titleHt)}</h3>
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
              aria-label={t("a11y.close")}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            {lightbox > 0 && (
              <button
                onClick={(e) => { e.stopPropagation(); setLightbox(lightbox - 1); }}
                className="absolute left-4 z-10 w-12 h-12 rounded-full bg-bg/10 hover:bg-bg/20 text-bg flex items-center justify-center backdrop-blur-sm"
                aria-label={t("journal.lightboxPrev")}
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
                aria-label={t("journal.lightboxNext")}
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
// Two layouts:
//   • default  · fixed 3/4 thumbnails, mobile 2 / desktop 3 (compact, uniform).
//   • masonry  · natural aspect, nothing cropped (CSS columns, break-inside-avoid,
//     w-full h-auto), mobile 2 / desktop 3. For large photo sets (e.g. a full
//     reportage) where cropping would hurt. Opt in with `layout: "masonry"`.
function Album({ album, flatIndexOf, onPhotoClick }) {
  const { t } = useT();
  const masonry = album.layout === "masonry";
  return (
    <div>
      {album.title && (
        <div className="mb-5 flex items-baseline gap-3">
          <h3 className="font-display text-xl md:text-2xl text-ink">
            {album.title}
          </h3>
          <span className="text-xs text-muted uppercase tracking-wider font-semibold">
            {album.photos.length} {album.photos.length === 1 ? t("journal.unitPhoto") : t("journal.unitPhotos")}
          </span>
        </div>
      )}
      {masonry ? (
        <div className="columns-2 md:columns-3 gap-3 md:gap-4">
          {album.photos.map((photo) => (
            <button
              key={photo.src}
              onClick={() => onPhotoClick(flatIndexOf(photo))}
              className="block w-full mb-3 md:mb-4 break-inside-avoid overflow-hidden rounded-lg border border-line hover:border-haiti-red transition-all"
            >
              <img
                src={photo.src}
                alt={photo.alt || ""}
                loading="lazy"
                className="block w-full h-auto"
              />
            </button>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {album.photos.map((photo) => (
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
      )}
      {album.caption && (
        <p className="mt-4 text-sm text-muted">{album.caption}</p>
      )}
    </div>
  );
}
