import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import { useAuth } from "../context/AuthContext";
import CadreComposer from "../components/CadreComposer";
import { listMyPhotos, submitPhoto, deletePhoto, photoUrl, MAX_PER_MATCH } from "../lib/fanPhotosApi";
import { useT } from "../lib/i18n";

// ╔══════════════════════════════════════════════════════════════════╗
// ║  /partager-ta-photo · poster une photo de supporter               ║
// ║                                                                    ║
// ║  Page publique : tout le monde voit le principe et la règle des    ║
// ║  3 photos PAR MATCH. SEULE l'action de publier est protégée        ║
// ║  (connexion Google). Le reste du site n'est jamais verrouillé.    ║
// ║                                                                    ║
// ║  Pas de frame ni de galerie publique ici (étapes suivantes).      ║
// ╚══════════════════════════════════════════════════════════════════╝

// Libellés affichés -> valeurs stockées (cf. CHECK de la table fan_photos).
const MATCHES = [
  { value: "scotland", label: "vs Écosse" },
  { value: "brazil", label: "vs Brésil" },
  { value: "morocco", label: "vs Maroc" },
];
const CONTEXTS = [
  { value: "stadium", label: "Au stade" },
  { value: "watch_party", label: "Watch party" },
  { value: "home", label: "À la maison" },
];
const MATCH_LABEL = Object.fromEntries(MATCHES.map((m) => [m.value, m.label]));
const CONTEXT_LABEL = Object.fromEntries(CONTEXTS.map((c) => [c.value, c.label]));

// Classes par statut + clé i18n du libellé (le libellé est résolu via t()).
const STATUS_CLS = {
  pending: "bg-gold/20 text-ink/80 border-gold/50",
  approved: "bg-haiti-blue/10 text-haiti-blue border-haiti-blue/30",
  rejected: "bg-haiti-red/10 text-haiti-red border-haiti-red/30",
};
const STATUS_KEY = {
  pending: "photo.statusPending",
  approved: "photo.statusApproved",
  rejected: "photo.statusRejected",
};

// Code d'erreur backend -> clé i18n du message.
const ERROR_KEY = {
  LIMIT: "photo.errLimit",
  UPLOAD: "photo.errUpload",
  INSERT: "photo.errInsert",
  AUTH: "photo.errAuth",
  UNAVAILABLE: "photo.errUnavailable",
  DEFAULT: "photo.errDefault",
};

// Compte les photos de l'utilisateur par match.
function countsByMatch(photos) {
  const c = { scotland: 0, brazil: 0, morocco: 0 };
  for (const p of photos) if (c[p.match] != null) c[p.match] += 1;
  return c;
}

export default function PartagerPhoto() {
  const { t } = useT();
  const { user, loading, signInWithGoogle, signInWithApple, sendEmailCode, verifyEmailCode, signOut } = useAuth();

  return (
    <div className="bg-bg">
      <PageHeader
        eyebrow={t("home.gallery.eyebrow")}
        title={t("home.gallery.shareCta")}
        subtitle={t("photo.pageSubtitle")}
      />

      <div className="max-w-content mx-auto px-5 py-12 md:py-16 grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-start">
        {/* Toujours visible · le principe et la règle des 3 photos par match */}
        <section>
          <p className="text-haiti-red text-[10px] md:text-xs uppercase tracking-[0.25em] font-bold mb-4">
            {t("photo.howItWorks")}
          </p>
          <ol className="space-y-4 text-ink/80 text-base leading-relaxed">
            <li><span className="font-semibold text-ink">1.</span> {t("photo.step1")}</li>
            <li><span className="font-semibold text-ink">2.</span> {t("photo.step2")}</li>
            <li><span className="font-semibold text-ink">3.</span> {t("photo.step3")}</li>
          </ol>
          <div className="mt-6 rounded-xl border border-line bg-white p-5">
            <p className="text-sm text-ink/80 leading-relaxed">
              {t("photo.rulePre")} <strong className="text-ink">{t("photo.ruleBold")}</strong>{t("photo.rulePost")}
            </p>
          </div>
          <div className="mt-5 flex flex-col gap-2.5">
            <Link
              to="/cadre-grenadiers"
              className="inline-flex items-center gap-2 text-sm font-semibold text-haiti-blue hover:text-haiti-red transition-colors"
            >
              {t("photo.cadreLink")} →
            </Link>
            <Link
              to="/galerie-supporters"
              className="inline-flex items-center gap-2 text-sm font-semibold text-haiti-blue hover:text-haiti-red transition-colors"
            >
              {t("home.gallery.viewLink")} →
            </Link>
          </div>
        </section>

        {/* Surface protégée · seule la publication est gated */}
        <section>
          {loading ? (
            <div className="rounded-xl border border-line bg-white p-8 text-center text-muted text-sm">
              {t("common.loading")}
            </div>
          ) : user ? (
            <SignedIn user={user} signOut={signOut} />
          ) : (
            <SignedOut
              signInWithGoogle={signInWithGoogle}
              signInWithApple={signInWithApple}
              sendEmailCode={sendEmailCode}
              verifyEmailCode={verifyEmailCode}
            />
          )}
        </section>
      </div>
    </div>
  );
}

function SignedOut({ signInWithGoogle, signInWithApple, sendEmailCode, verifyEmailCode }) {
  const { t } = useT();
  const [phase, setPhase] = useState("options"); // options | code
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  const onSendCode = async (e) => {
    e?.preventDefault();
    const addr = email.trim();
    if (!addr || busy) return;
    setBusy(true);
    setError("");
    setNotice("");
    const { error: err } = await sendEmailCode(addr);
    setBusy(false);
    if (err) {
      setError(t("photo.authSendErr"));
      return;
    }
    setPhase("code");
    setNotice(t("photo.authCodeSent").replace("{email}", addr));
  };

  const onVerify = async (e) => {
    e?.preventDefault();
    const t = code.trim();
    if (t.length < 6 || busy) return;
    setBusy(true);
    setError("");
    const { error: err } = await verifyEmailCode(email.trim(), t);
    setBusy(false);
    if (err) {
      setError(t("photo.authCodeErr"));
      return;
    }
    // Succès : la session s'établit en place, la page bascule via AuthContext.
  };

  return (
    <div className="rounded-xl border border-line bg-white p-7 md:p-8">
      <div className="text-center">
        <p className="text-3xl mb-3">📸</p>
        <h2 className="font-display text-2xl text-ink mb-2">{t("photo.authTitle")}</h2>
        <p className="text-muted text-sm leading-relaxed mb-6">
          {t("photo.authSubtitle")}
        </p>
      </div>

      {phase === "options" ? (
        <div className="space-y-3">
          <button
            type="button"
            onClick={() => signInWithGoogle()}
            className="flex w-full items-center justify-center gap-2.5 rounded-full border border-line bg-white px-6 py-3 font-semibold text-ink transition-colors hover:border-haiti-blue"
          >
            <GoogleGlyph />
            {t("photo.authGoogle")}
          </button>
          <button
            type="button"
            onClick={() => signInWithApple()}
            className="flex w-full items-center justify-center gap-2.5 rounded-full bg-ink px-6 py-3 font-semibold text-bg transition-colors hover:bg-ink-deep"
          >
            <AppleGlyph />
            {t("photo.authApple")}
          </button>

          <div className="flex items-center gap-3 py-1 text-xs uppercase tracking-wider text-muted">
            <span className="h-px flex-1 bg-line" />
            {t("photo.authOr")}
            <span className="h-px flex-1 bg-line" />
          </div>

          <form onSubmit={onSendCode} className="space-y-3">
            <input
              type="email"
              autoComplete="email"
              inputMode="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t("photo.authEmailPlaceholder")}
              className="w-full px-4 py-3 rounded-lg border border-line focus:outline-none focus:border-haiti-blue text-ink"
            />
            <button
              type="submit"
              disabled={!email.trim() || busy}
              className="w-full px-6 py-3 bg-haiti-blue text-bg font-semibold rounded-full hover:bg-haiti-blue-dark transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {busy ? t("photo.authSending") : t("photo.authSendCode")}
            </button>
          </form>
        </div>
      ) : (
        <form onSubmit={onVerify} className="space-y-3">
          <p className="text-sm text-ink/80">
            {t("photo.authEnterCode").split("{email}")[0]}
            <span className="font-semibold">{email.trim()}</span>
            {t("photo.authEnterCode").split("{email}")[1]}
          </p>
          <input
            type="text"
            inputMode="numeric"
            autoComplete="one-time-code"
            maxLength={6}
            value={code}
            onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
            placeholder="123456"
            className="w-full px-4 py-3 rounded-lg border border-line focus:outline-none focus:border-haiti-blue text-ink text-center text-lg tracking-[0.4em] tabular-nums"
          />
          <button
            type="submit"
            disabled={code.trim().length < 6 || busy}
            className="w-full px-6 py-3 bg-haiti-red text-bg font-semibold rounded-full hover:bg-haiti-red-dark transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {busy ? t("photo.authVerifying") : t("photo.authVerify")}
          </button>
          <div className="flex items-center justify-between text-sm">
            <button type="button" onClick={onSendCode} disabled={busy} className="font-medium text-haiti-blue hover:text-haiti-red transition-colors disabled:opacity-60">
              {t("photo.authResend")}
            </button>
            <button
              type="button"
              onClick={() => {
                setPhase("options");
                setCode("");
                setError("");
                setNotice("");
              }}
              className="font-medium text-muted hover:text-ink transition-colors"
            >
              {t("photo.authChangeEmail")}
            </button>
          </div>
        </form>
      )}

      {notice && <p className="mt-3 text-sm text-muted">{notice}</p>}
      {error && <p className="mt-3 text-sm text-haiti-red font-medium">{error}</p>}
    </div>
  );
}

function SignedIn({ user, signOut }) {
  const { t } = useT();
  const meta = user.user_metadata || {};
  const name = meta.full_name || meta.name || user.email || t("photo.supporterFallback");

  const [photos, setPhotos] = useState([]);
  const [loadingPhotos, setLoadingPhotos] = useState(true);
  const [done, setDone] = useState(false);
  const [postedFile, setPostedFile] = useState(null); // photo en mémoire, pour le cadre

  const refresh = async () => {
    try {
      setPhotos(await listMyPhotos());
    } catch {
      setPhotos([]);
    }
  };

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const rows = await listMyPhotos();
        if (alive) setPhotos(rows);
      } catch {
        if (alive) setPhotos([]);
      } finally {
        if (alive) setLoadingPhotos(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  const counts = countsByMatch(photos);

  return (
    <div className="space-y-6">
      {/* Bandeau de session discret */}
      <div className="flex items-center justify-between gap-3 text-sm">
        <span className="text-muted truncate">
          {t("photo.signedInAs").split("{name}")[0]}
          <span className="font-semibold text-ink">{name}</span>
          {t("photo.signedInAs").split("{name}")[1]}
        </span>
        <button
          type="button"
          onClick={signOut}
          className="shrink-0 font-medium text-muted hover:text-haiti-red transition-colors rounded-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-haiti-red"
        >
          {t("photo.signOut")}
        </button>
      </div>

      {done ? (
        <Confirmation
          postedFile={postedFile}
          onAgain={() => {
            setDone(false);
            setPostedFile(null);
          }}
        />
      ) : (
        <UploadForm
          counts={counts}
          onPublished={async (file) => {
            setPostedFile(file);
            setDone(true);
            await refresh();
          }}
        />
      )}

      <MyPhotos photos={photos} loading={loadingPhotos} counts={counts} onDeleted={refresh} />
    </div>
  );
}

function UploadForm({ counts, onPublished }) {
  const { t } = useT();
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [match, setMatch] = useState("");
  const [context, setContext] = useState("");
  const [location, setLocation] = useState("");
  const [caption, setCaption] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const fileRef = useRef(null);

  // Libère l'URL d'aperçu quand elle change ou au démontage.
  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  const onPick = (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    if (preview) URL.revokeObjectURL(preview);
    setFile(f);
    setPreview(URL.createObjectURL(f));
    setError("");
  };

  const selectedCount = match ? counts[match] || 0 : 0;
  const matchFull = Boolean(match) && selectedCount >= MAX_PER_MATCH;
  const canSubmit = file && match && context && !matchFull && !submitting;

  // Libellé du lieu selon le contexte : « watch party » regarde, le reste prend.
  const locationLabel =
    context === "watch_party" ? t("photo.locationWatch") : t("photo.locationTaken");

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!canSubmit) return;
    setSubmitting(true);
    setError("");
    try {
      await submitPhoto({ file, match, context, location, caption });
      onPublished(file);
    } catch (err) {
      setError(t(ERROR_KEY[err?.code] || ERROR_KEY.DEFAULT));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="bg-white border border-line rounded-xl overflow-hidden">
      {/* Zone image · grande, en haut. Aperçu contenu, sans recadrage forcé. */}
      <input ref={fileRef} type="file" accept="image/*" onChange={onPick} className="sr-only" />
      {preview ? (
        <div className="relative">
          <div className="flex items-center justify-center bg-ink min-h-[280px] md:min-h-[360px] max-h-[70vh]">
            <img src={preview} alt="" className="max-h-[70vh] w-full object-contain" />
          </div>
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            className="absolute top-3 right-3 rounded-full bg-ink/70 px-3 py-1.5 text-xs font-semibold text-bg backdrop-blur transition-colors hover:bg-ink/90"
          >
            {t("photo.change")}
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          className="flex w-full flex-col items-center justify-center gap-2 border-b border-dashed border-line bg-bg min-h-[280px] md:min-h-[360px] text-muted transition-colors hover:bg-line/30"
        >
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-haiti-blue/10 text-2xl text-haiti-blue">＋</span>
          <span className="text-sm font-semibold text-ink">{t("photo.addPhoto")}</span>
          <span className="text-xs">{t("photo.cameraOrGallery")}</span>
        </button>
      )}

      <div className="p-5 md:p-7 space-y-5">
        {/* Légende · zone de texte principale, juste sous l'image */}
        <div>
          <label className="block text-xs uppercase tracking-wider text-muted font-semibold mb-1.5">
            {t("photo.captionLabel")} <span className="normal-case text-muted/70">{t("common.optional")}</span>
          </label>
          <textarea
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            maxLength={280}
            placeholder={t("photo.captionPlaceholder")}
            className="w-full px-4 py-3 rounded-lg border border-line focus:outline-none focus:border-haiti-blue text-ink resize-y min-h-[96px]"
          />
        </div>

        {/* Match · obligatoire, en tags (avec le compteur par match) */}
        <Segmented label={t("photo.whichMatch")} options={MATCHES} value={match} onChange={setMatch} counts={counts} max={MAX_PER_MATCH} />

        {/* Contexte · obligatoire, en tags */}
        <Segmented label={t("photo.whereWatch")} options={CONTEXTS} value={context} onChange={setContext} />

        {/* Lieu · libellé selon le contexte */}
        <div>
          <label className="block text-xs uppercase tracking-wider text-muted font-semibold mb-1.5">
            {locationLabel}
          </label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            maxLength={120}
            placeholder={t("photo.locationPlaceholder")}
            className="w-full px-4 py-3 rounded-lg border border-line focus:outline-none focus:border-haiti-blue text-ink"
          />
        </div>

        {match && (
          <p className={`text-sm font-medium ${matchFull ? "text-haiti-red" : "text-muted"}`}>
            {matchFull
              ? t("photo.matchFull")
              : t("photo.matchCount").replace("{n}", selectedCount).replace("{max}", MAX_PER_MATCH)}
          </p>
        )}

        {error && <p className="text-sm text-haiti-red font-medium">{error}</p>}

        <button
          type="submit"
          disabled={!canSubmit}
          className="w-full px-6 py-3.5 bg-haiti-red text-bg font-semibold rounded-full hover:bg-haiti-red-dark transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {submitting ? t("photo.publishing") : t("photo.publish")}
        </button>
        <p className="text-xs text-muted text-center leading-relaxed">
          {t("photo.uploadNote")}
        </p>
      </div>
    </form>
  );
}

function Segmented({ label, options, value, onChange, counts, max }) {
  return (
    <div>
      <label className="block text-xs uppercase tracking-wider text-muted font-semibold mb-1.5">{label}</label>
      <div className="grid grid-cols-3 gap-2">
        {options.map((o) => {
          const active = value === o.value;
          const c = counts ? counts[o.value] || 0 : null;
          const full = counts && c >= max;
          return (
            <button
              key={o.value}
              type="button"
              aria-pressed={active}
              onClick={() => onChange(o.value)}
              className={`px-3 py-2.5 rounded-lg border text-sm font-semibold transition-colors ${
                active
                  ? "border-haiti-blue bg-haiti-blue text-bg"
                  : "border-line bg-white text-ink hover:border-haiti-blue"
              }`}
            >
              <span className="block">{o.label}</span>
              {counts && (
                <span className={`block text-[11px] font-normal mt-0.5 ${active ? "text-bg/80" : full ? "text-haiti-red" : "text-muted"}`}>
                  {c}/{max}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function Confirmation({ onAgain, postedFile }) {
  const { t } = useT();
  return (
    <div className="space-y-5">
      <div className="rounded-xl border border-line bg-white p-7 md:p-8 text-center">
        <p className="text-3xl mb-3">🇭🇹</p>
        <h2 className="font-display text-2xl text-ink mb-2">{t("photo.thanks")}</h2>
        <p className="text-muted text-sm leading-relaxed mb-6">
          {t("photo.thanksBody")}
        </p>
        <button
          type="button"
          onClick={onAgain}
          className="inline-flex items-center gap-2 px-6 py-3 bg-haiti-blue text-bg font-semibold rounded-full hover:bg-haiti-blue-dark transition-colors"
        >
          {t("photo.postAnother")}
        </button>
      </div>

      {/* En attendant la validation : partage tout de suite ta photo avec le
          cadre Grenadiers (réutilise la photo déjà en mémoire, sans renvoi). */}
      {postedFile && (
        <div>
          <div className="mb-3 text-center">
            <p className="text-haiti-red text-[10px] md:text-xs uppercase tracking-[0.25em] font-bold mb-1">
              {t("photo.whileWaiting")}
            </p>
            <h3 className="font-display text-xl text-ink">{t("photo.shareWithCadre")}</h3>
          </div>
          <CadreComposer initialFile={postedFile} />
        </div>
      )}
    </div>
  );
}

function MyPhotos({ photos, loading, counts, onDeleted }) {
  const { t } = useT();
  const [deletingId, setDeletingId] = useState(null);

  const onDelete = async (photo) => {
    setDeletingId(photo.id);
    try {
      await deletePhoto(photo);
      await onDeleted();
    } catch {
      /* on garde la ligne affichée ; l'utilisateur peut réessayer */
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div>
      <h2 className="font-display text-xl text-ink mb-1">{t("photo.myPhotos")}</h2>
      <p className="text-xs font-semibold text-muted mb-3 tabular-nums">
        {MATCHES.map((m) => `${m.label} ${counts[m.value] || 0}/${MAX_PER_MATCH}`).join(" · ")}
      </p>

      {loading ? (
        <p className="text-muted text-sm">{t("common.loading")}</p>
      ) : photos.length === 0 ? (
        <p className="text-muted text-sm">{t("photo.noneYet")}</p>
      ) : (
        <ul className="space-y-3">
          {photos.map((p) => {
            const stCls = STATUS_CLS[p.status] || STATUS_CLS.pending;
            const stKey = STATUS_KEY[p.status] || STATUS_KEY.pending;
            return (
              <li key={p.id} className="flex items-center gap-3 rounded-xl border border-line bg-white p-3">
                <img
                  src={photoUrl(p.storage_path)}
                  alt=""
                  loading="lazy"
                  className="h-16 w-16 shrink-0 rounded-lg object-cover bg-ink/5"
                />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className={`inline-block rounded-full border px-2 py-0.5 text-[11px] font-semibold ${stCls}`}>
                      {t(stKey)}
                    </span>
                    <span className="text-xs text-muted truncate">
                      {MATCH_LABEL[p.match] || p.match} · {CONTEXT_LABEL[p.context] || p.context}
                    </span>
                  </div>
                  {p.location && <p className="mt-1 text-sm text-ink/80 truncate">{p.location}</p>}
                </div>
                <button
                  type="button"
                  onClick={() => onDelete(p)}
                  disabled={deletingId === p.id}
                  className="shrink-0 text-sm font-medium text-muted hover:text-haiti-red transition-colors disabled:opacity-50"
                >
                  {deletingId === p.id ? "…" : t("common.delete")}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

function AppleGlyph() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0" fill="currentColor" aria-hidden="true">
      <path d="M16.37 1.43c.06.83-.27 1.64-.83 2.25-.59.65-1.55 1.15-2.46 1.08-.08-.82.32-1.66.84-2.2.59-.62 1.62-1.09 2.45-1.13zM19.7 17.2c-.46 1.06-.68 1.53-1.27 2.46-.83 1.3-2 2.91-3.45 2.92-1.29.01-1.62-.84-3.37-.83-1.75.01-2.11.84-3.4.83-1.45-.01-2.56-1.47-3.39-2.76-2.32-3.62-2.57-7.87-1.13-10.13 1.02-1.61 2.63-2.55 4.14-2.55 1.54 0 2.5.84 3.77.84 1.23 0 1.98-.85 3.76-.85 1.35 0 2.78.73 3.8 2-3.34 1.83-2.8 6.6.94 8.06z" />
    </svg>
  );
}

function GoogleGlyph() {
  return (
    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white">
      <svg viewBox="0 0 18 18" className="h-3.5 w-3.5" aria-hidden="true">
        <path fill="#4285F4" d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84a4.14 4.14 0 0 1-1.8 2.72v2.26h2.92c1.7-1.57 2.68-3.88 2.68-6.62z" />
        <path fill="#34A853" d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.92-2.26c-.8.54-1.84.86-3.04.86-2.34 0-4.32-1.58-5.03-3.7H.96v2.33A9 9 0 0 0 9 18z" />
        <path fill="#FBBC05" d="M3.97 10.72a5.4 5.4 0 0 1 0-3.44V4.95H.96a9 9 0 0 0 0 8.1l3.01-2.33z" />
        <path fill="#EA4335" d="M9 3.58c1.32 0 2.5.45 3.44 1.35l2.58-2.58A9 9 0 0 0 .96 4.95l3.01 2.33C4.68 5.16 6.66 3.58 9 3.58z" />
      </svg>
    </span>
  );
}
