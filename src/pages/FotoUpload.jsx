import { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import { fetchAlbums, fetchAlbum, uploadGalleryChunk, backendReady } from "../lib/galleryApi";

// ╔══════════════════════════════════════════════════════════════════╗
// ║  /foto/upload — téléversement + gestion, protégés par mot de passe.║
// ║  Non lié dans la nav, exclu du prerender/sitemap, noindex.         ║
// ║  Redimensionne les images dans le navigateur (canvas) puis envoie  ║
// ║  par lots de 10. Gestion : renommer / dater / créditer / supprimer.║
// ╚══════════════════════════════════════════════════════════════════╝

const PASSWORD_KEY = "foto_upload_password";
const CHUNK = 10;
const NEW = "__new__";

const pad = (n) => String(n).padStart(2, "0");
const todayYmd = () => {
  const d = new Date();
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
};

// Charge une image en respectant l'orientation EXIF quand c'est possible.
async function loadBitmap(file) {
  if (window.createImageBitmap) {
    try {
      return await createImageBitmap(file, { imageOrientation: "from-image" });
    } catch {
      /* repli ci-dessous */
    }
  }
  return await new Promise((res, rej) => {
    const img = new Image();
    img.onload = () => res(img);
    img.onerror = rej;
    img.src = URL.createObjectURL(file);
  });
}

// Redimensionne vers un JPEG (dimension max + qualité).
async function resizeToJpeg(file, maxDim, quality) {
  const bmp = await loadBitmap(file);
  const w0 = bmp.width;
  const h0 = bmp.height;
  const scale = Math.min(1, maxDim / Math.max(w0, h0));
  const w = Math.max(1, Math.round(w0 * scale));
  const h = Math.max(1, Math.round(h0 * scale));
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  canvas.getContext("2d").drawImage(bmp, 0, 0, w, h);
  if (bmp.close) bmp.close();
  return await new Promise((res) => canvas.toBlob(res, "image/jpeg", quality));
}

// Traduit une réponse multipart en message d'erreur clair, ou null si OK.
function errorMessage(status, data) {
  if (status === 401) return "Mot de passe incorrect.";
  if (status === 500 && data?.error === "server_not_configured")
    return "Le service n'est pas configuré côté serveur.";
  if (status === 0) return "Connexion impossible. Réessayez.";
  if (!data?.ok) return "Une erreur est survenue. Réessayez.";
  return null;
}

export default function FotoUpload() {
  const [password, setPassword] = useState(() => {
    try {
      return localStorage.getItem(PASSWORD_KEY) || "";
    } catch {
      return "";
    }
  });
  const [albums, setAlbums] = useState([]);

  // ── Téléversement ──
  const [choice, setChoice] = useState(NEW);
  const [newName, setNewName] = useState("");
  const [eventDate, setEventDate] = useState(todayYmd());
  const [credit, setCredit] = useState("");
  const [files, setFiles] = useState([]);
  const [status, setStatus] = useState("idle"); // idle | working | done | error
  const [progress, setProgress] = useState({ done: 0, total: 0 });
  const [message, setMessage] = useState("");

  // ── Gestion ──
  const [edits, setEdits] = useState({}); // slug -> { name, event_date, credit }
  const [manageMsg, setManageMsg] = useState("");
  const [manageErr, setManageErr] = useState(false);
  const [busySlug, setBusySlug] = useState(null);
  const [openSlug, setOpenSlug] = useState(null); // album déplié (photos visibles)
  const [openPhotos, setOpenPhotos] = useState(null); // null = chargement
  const [deletingPath, setDeletingPath] = useState(null);

  // noindex + titre dédié (route absente du prerender/sitemap).
  useEffect(() => {
    const prevTitle = document.title;
    document.title = "Téléversement · Photos";
    const meta = document.createElement("meta");
    meta.setAttribute("name", "robots");
    meta.setAttribute("content", "noindex,nofollow");
    document.head.appendChild(meta);
    return () => {
      document.title = prevTitle;
      meta.remove();
    };
  }, []);

  const refreshAlbums = useCallback(async () => {
    const data = await fetchAlbums();
    const list = Array.isArray(data) ? data : [];
    setAlbums(list);
    setEdits(
      Object.fromEntries(
        list.map((a) => [a.slug, { name: a.name, event_date: a.event_date || "", credit: a.credit || "" }]),
      ),
    );
  }, []);

  useEffect(() => {
    if (!backendReady) return;
    refreshAlbums();
  }, [refreshAlbums]);

  const rememberPassword = () => {
    try {
      localStorage.setItem(PASSWORD_KEY, password.trim());
    } catch {
      /* ignore */
    }
  };

  const working = status === "working";
  const canSubmit =
    backendReady && password.trim() && files.length > 0 && !working && (choice !== NEW || newName.trim());

  async function handleSubmit(e) {
    e.preventDefault();
    if (!canSubmit) return;

    const existing = albums.find((a) => a.slug === choice);
    const albumName = existing ? existing.name : newName.trim();
    let slug = existing ? existing.slug : null;

    setStatus("working");
    setMessage("");
    setProgress({ done: 0, total: files.length });

    let uploaded = 0;
    try {
      for (let start = 0; start < files.length; start += CHUNK) {
        const batch = files.slice(start, start + CHUNK);
        const fd = new FormData();
        fd.append("password", password.trim());
        fd.append("album", albumName);
        if (slug) fd.append("slug", slug);
        fd.append("credit", credit.trim());
        fd.append("event_date", eventDate || "");

        for (let i = 0; i < batch.length; i++) {
          const f = batch[i];
          const fullBlob = await resizeToJpeg(f, 1920, 0.82);
          const thumbBlob = await resizeToJpeg(f, 500, 0.7);
          const idx = start + i;
          fd.append("full", new File([fullBlob], `full-${idx}.jpg`, { type: "image/jpeg" }));
          fd.append("thumb", new File([thumbBlob], `thumb-${idx}.jpg`, { type: "image/jpeg" }));
          setProgress({ done: idx + 1, total: files.length });
        }

        const { status: st, data } = await uploadGalleryChunk(fd);
        const err = errorMessage(st, data);
        if (err) {
          setStatus("error");
          setMessage(err);
          return;
        }

        uploaded += data.uploaded ?? batch.length;
        // Nouvel album sur plusieurs lots : on récupère le slug créé au 1er lot.
        if (!slug && data.slug) slug = data.slug;
      }

      rememberPassword();
      setFiles([]);
      setStatus("done");
      setMessage(`${uploaded} photo${uploaded > 1 ? "s" : ""} ajoutée${uploaded > 1 ? "s" : ""}.`);
      refreshAlbums();
    } catch {
      setStatus("error");
      setMessage("Le traitement des images a échoué. Réessayez.");
    }
  }

  async function saveAlbum(album) {
    if (!password.trim()) {
      setManageErr(true);
      setManageMsg("Entrez le mot de passe en haut de la page.");
      return;
    }
    const e = edits[album.slug] || {};
    const fd = new FormData();
    fd.append("password", password.trim());
    fd.append("action", "update");
    fd.append("slug", album.slug);
    let changed = false;
    if ((e.name ?? "") !== album.name) { fd.append("album", e.name ?? ""); changed = true; }
    if ((e.event_date || "") !== (album.event_date || "")) { fd.append("event_date", e.event_date || ""); changed = true; }
    if ((e.credit || "") !== (album.credit || "")) { fd.append("credit", e.credit || ""); changed = true; }
    if (!changed) {
      setManageErr(false);
      setManageMsg("Aucune modification.");
      return;
    }

    setBusySlug(album.slug);
    setManageMsg("");
    const { status: st, data } = await uploadGalleryChunk(fd);
    setBusySlug(null);
    const err = errorMessage(st, data);
    if (err) {
      setManageErr(true);
      setManageMsg(err);
      return;
    }
    rememberPassword();
    setManageErr(false);
    setManageMsg(`Album « ${e.name ?? album.name} » mis à jour.`);
    refreshAlbums();
  }

  async function deleteAlbum(album) {
    if (!password.trim()) {
      setManageErr(true);
      setManageMsg("Entrez le mot de passe en haut de la page.");
      return;
    }
    if (!window.confirm(`Supprimer l'album « ${album.name} » et toutes ses photos ?`)) return;

    setBusySlug(album.slug);
    setManageMsg("");
    const fd = new FormData();
    fd.append("password", password.trim());
    fd.append("action", "delete");
    fd.append("slug", album.slug);
    const { status: st, data } = await uploadGalleryChunk(fd);
    setBusySlug(null);
    const err = errorMessage(st, data);
    if (err) {
      setManageErr(true);
      setManageMsg(err);
      return;
    }
    rememberPassword();
    if (openSlug === album.slug) {
      setOpenSlug(null);
      setOpenPhotos(null);
    }
    setManageErr(false);
    setManageMsg(`Album « ${album.name} » supprimé.`);
    refreshAlbums();
  }

  async function toggleAlbumPhotos(slug) {
    if (openSlug === slug) {
      setOpenSlug(null);
      setOpenPhotos(null);
      return;
    }
    setOpenSlug(slug);
    setOpenPhotos(null);
    const data = await fetchAlbum(slug);
    setOpenPhotos(data?.photos ?? []);
  }

  async function deletePhoto(path) {
    if (!password.trim()) {
      setManageErr(true);
      setManageMsg("Entrez le mot de passe en haut de la page.");
      return;
    }
    if (!window.confirm("Supprimer cette photo ?")) return;

    setDeletingPath(path);
    setManageMsg("");
    const fd = new FormData();
    fd.append("password", password.trim());
    fd.append("action", "delete_photo");
    fd.append("path", path);
    const { status: st, data } = await uploadGalleryChunk(fd);
    setDeletingPath(null);
    const err = errorMessage(st, data);
    if (err) {
      setManageErr(true);
      setManageMsg(err);
      return;
    }
    rememberPassword();
    setOpenPhotos((prev) => (prev ? prev.filter((p) => p.path !== path) : prev));
    setManageErr(false);
    setManageMsg("Photo supprimée.");
    refreshAlbums();
  }

  const setEdit = (slug, patch) =>
    setEdits((prev) => ({ ...prev, [slug]: { ...prev[slug], ...patch } }));

  const inputCls = "w-full border border-line rounded-lg px-3 py-2.5 text-ink focus:border-haiti-blue outline-none";

  return (
    <div>
      <PageHeader
        eyebrow="Espace privé"
        title="Téléverser des photos"
        subtitle="Ajoutez des photos à la galerie. Les images sont optimisées automatiquement avant l'envoi."
      />

      <div className="max-w-xl mx-auto px-5 py-12 space-y-14">
        {!backendReady ? (
          <p className="text-muted text-sm">Service indisponible.</p>
        ) : (
          <>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-xs uppercase tracking-wider text-muted font-semibold mb-1.5">
                  Mot de passe
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  className={inputCls}
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-muted font-semibold mb-1.5">
                  Album
                </label>
                <select
                  value={choice}
                  onChange={(e) => setChoice(e.target.value)}
                  className={`${inputCls} bg-white`}
                >
                  <option value={NEW}>Nouvel album</option>
                  {albums.map((a) => (
                    <option key={a.slug} value={a.slug}>
                      {a.name} ({a.count})
                    </option>
                  ))}
                </select>
                {choice === NEW && (
                  <input
                    type="text"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    placeholder="Nom de l'album (ex. Haïti vs Pérou)"
                    className={`mt-2 ${inputCls}`}
                  />
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-muted font-semibold mb-1.5">
                    Date de l'événement
                  </label>
                  <input
                    type="date"
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                    className={`${inputCls} bg-white`}
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-muted font-semibold mb-1.5">
                    Crédit photo
                  </label>
                  <input
                    type="text"
                    value={credit}
                    onChange={(e) => setCredit(e.target.value)}
                    placeholder="ex. Hans Frandjy Darius"
                    className={inputCls}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-muted font-semibold mb-1.5">
                  Photos
                </label>
                <input
                  type="file"
                  accept="image/jpeg,image/png"
                  multiple
                  onChange={(e) => {
                    setFiles(Array.from(e.target.files || []));
                    if (status === "done" || status === "error") {
                      setStatus("idle");
                      setMessage("");
                    }
                  }}
                  className="block w-full text-sm text-ink file:mr-3 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-haiti-blue file:text-bg file:font-semibold file:cursor-pointer"
                />
                {files.length > 0 && (
                  <p className="text-muted text-xs mt-1.5">
                    {files.length} photo{files.length > 1 ? "s" : ""} sélectionnée{files.length > 1 ? "s" : ""}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={!canSubmit}
                className="w-full px-4 py-3 bg-haiti-red hover:bg-haiti-red-dark disabled:opacity-50 disabled:cursor-not-allowed text-bg font-semibold rounded-full transition-colors"
              >
                {working ? `Envoi… ${progress.done}/${progress.total}` : "Téléverser"}
              </button>

              {message && (
                <div
                  className={`rounded-lg p-4 text-sm ${
                    status === "error" ? "bg-haiti-red/10 text-haiti-red" : "bg-emerald-50 text-emerald-700"
                  }`}
                >
                  <p>{message}</p>
                  {status === "done" && (
                    <Link to="/foto" className="inline-block mt-2 font-semibold text-haiti-blue hover:text-haiti-red">
                      Voir l'album →
                    </Link>
                  )}
                </div>
              )}
            </form>

            {/* ── Gestion des albums ── */}
            <section className="border-t border-line pt-10">
              <h2 className="font-display text-xl text-ink mb-1">Gérer les albums</h2>
              <p className="text-muted text-sm mb-5">
                Renommez, datez, créditez ou supprimez un album. Le mot de passe ci-dessus est requis.
              </p>

              {manageMsg && (
                <div
                  className={`rounded-lg p-3 text-sm mb-5 ${
                    manageErr ? "bg-haiti-red/10 text-haiti-red" : "bg-emerald-50 text-emerald-700"
                  }`}
                >
                  {manageMsg}
                </div>
              )}

              {albums.length === 0 ? (
                <p className="text-muted text-sm">Aucun album pour le moment.</p>
              ) : (
                <ul className="space-y-5">
                  {albums.map((a) => {
                    const e = edits[a.slug] || { name: a.name, event_date: a.event_date || "", credit: a.credit || "" };
                    const busy = busySlug === a.slug;
                    return (
                      <li key={a.slug} className="bg-white border border-line rounded-lg p-4">
                        <p className="text-muted text-xs mb-3">
                          {a.count} photo{a.count > 1 ? "s" : ""}
                        </p>
                        <div className="space-y-3">
                          <input
                            type="text"
                            value={e.name}
                            onChange={(ev) => setEdit(a.slug, { name: ev.target.value })}
                            placeholder="Nom de l'album"
                            className={inputCls}
                          />
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <input
                              type="date"
                              value={e.event_date}
                              onChange={(ev) => setEdit(a.slug, { event_date: ev.target.value })}
                              className={`${inputCls} bg-white`}
                            />
                            <input
                              type="text"
                              value={e.credit}
                              onChange={(ev) => setEdit(a.slug, { credit: ev.target.value })}
                              placeholder="Crédit photo"
                              className={inputCls}
                            />
                          </div>
                        </div>
                        <div className="flex items-center gap-2 mt-4">
                          <button
                            type="button"
                            onClick={() => saveAlbum(a)}
                            disabled={busy}
                            className="px-4 py-2 bg-haiti-blue hover:bg-haiti-blue-dark disabled:opacity-50 text-bg text-sm font-semibold rounded-full transition-colors"
                          >
                            {busy ? "…" : "Enregistrer"}
                          </button>
                          <button
                            type="button"
                            onClick={() => deleteAlbum(a)}
                            disabled={busy}
                            className="px-4 py-2 border border-haiti-red text-haiti-red hover:bg-haiti-red/10 disabled:opacity-50 text-sm font-semibold rounded-full transition-colors"
                          >
                            Supprimer
                          </button>
                        </div>

                        {/* Photos de l'album + suppression unitaire */}
                        <div className="mt-4 border-t border-line pt-3">
                          <button
                            type="button"
                            onClick={() => toggleAlbumPhotos(a.slug)}
                            className="text-haiti-blue text-sm font-semibold hover:text-haiti-red transition-colors"
                          >
                            {openSlug === a.slug ? "Masquer les photos" : "Voir les photos"}
                          </button>

                          {openSlug === a.slug &&
                            (openPhotos === null ? (
                              <p className="text-muted text-xs mt-3">Chargement…</p>
                            ) : openPhotos.length === 0 ? (
                              <p className="text-muted text-xs mt-3">Aucune photo.</p>
                            ) : (
                              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 mt-3">
                                {openPhotos.map((p) => (
                                  <div
                                    key={p.path}
                                    className="relative aspect-square rounded-md overflow-hidden border border-line bg-bg"
                                  >
                                    <img src={p.thumb} alt="" loading="lazy" className="w-full h-full object-cover" />
                                    <button
                                      type="button"
                                      onClick={() => deletePhoto(p.path)}
                                      disabled={deletingPath === p.path}
                                      aria-label="Supprimer cette photo"
                                      className="absolute top-1 right-1 w-6 h-6 rounded-full bg-ink/70 hover:bg-haiti-red text-bg flex items-center justify-center disabled:opacity-50"
                                    >
                                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                                      </svg>
                                    </button>
                                  </div>
                                ))}
                              </div>
                            ))}
                        </div>
                      </li>
                    );
                  })}
                </ul>
              )}
            </section>
          </>
        )}
      </div>
    </div>
  );
}
