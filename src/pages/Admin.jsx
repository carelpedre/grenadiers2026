import { useState, useEffect, useCallback } from "react";

// ╔══════════════════════════════════════════════════════════════════╗
// ║  /admin · modération unifiée (messages + photos)                   ║
// ║                                                                    ║
// ║  Page NON liée dans la navigation publique. UNE seule connexion :  ║
// ║  les deux fonctions edge (moderate-fan-message, moderate-fan-photo)║
// ║  partagent la MÊME phrase secrète (MODERATION_SECRET), donc une    ║
// ║  seule saisie ouvre les deux espaces. La phrase est gardée en      ║
// ║  sessionStorage et envoyée à chaque appel ; un 401 l'efface et     ║
// ║  redemande. Remplace les anciennes pages /admin/mur et /admin/foto.║
// ╚══════════════════════════════════════════════════════════════════╝

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;
const MSG_FN = `${SUPABASE_URL}/functions/v1/moderate-fan-message`;
const PHOTO_FN = `${SUPABASE_URL}/functions/v1/moderate-fan-photo`;
const PASS_KEY = "grenadiers_mod_pass";

const MATCH_LABEL = { scotland: "vs Écosse", brazil: "vs Brésil", morocco: "vs Maroc" };
const CONTEXT_LABEL = { stadium: "Au stade", watch_party: "Watch party", home: "À la maison" };

// Raisons de refus prédéfinies (clés alignées sur l'edge function). L'auteur
// reçoit un e-mail avec la raison ; « autre » ouvre un champ texte libre.
const REJECT_REASONS = [
  { key: "hors_sujet", label: "Pas une photo de supporter" },
  { key: "qualite", label: "Floue / mauvaise qualité" },
  { key: "inapproprie", label: "Contenu inapproprié" },
];

async function callFn(url, passphrase, payload) {
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(SUPABASE_KEY ? { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` } : {}),
    },
    body: JSON.stringify({ ...payload, passphrase }),
  });
  const data = await res.json().catch(() => ({}));
  return { status: res.status, data };
}

function timeAgo(iso) {
  if (!iso) return "";
  const d = new Date(iso);
  const diff = Date.now() - d.getTime();
  const min = Math.floor(diff / 60000);
  if (min < 1) return "à l'instant";
  if (min < 60) return `il y a ${min} min`;
  const h = Math.floor(min / 60);
  if (h < 24) return `il y a ${h} h`;
  const j = Math.floor(h / 24);
  if (j < 7) return `il y a ${j} j`;
  return d.toLocaleDateString("fr-FR", { day: "numeric", month: "short" });
}

export default function Admin() {
  const [passphrase, setPassphrase] = useState(() => sessionStorage.getItem(PASS_KEY) || "");
  const [authed, setAuthed] = useState(false);
  const [section, setSection] = useState("messages"); // "messages" | "photos"

  // Messages
  const [msgView, setMsgView] = useState("pending"); // "pending" | "approved"
  const [messages, setMessages] = useState([]);
  const [wallOpen, setWallOpen] = useState(null);

  // Photos
  const [photoView, setPhotoView] = useState("pending");
  const [photos, setPhotos] = useState([]);

  // Badges (nombre en attente par espace)
  const [pendingMsg, setPendingMsg] = useState(null);
  const [pendingPhoto, setPendingPhoto] = useState(null);

  // UI
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [busyId, setBusyId] = useState(null);

  const requirePass = useCallback(() => {
    sessionStorage.removeItem(PASS_KEY);
    setPassphrase("");
    setAuthed(false);
    setError("Phrase secrète invalide ou expirée.");
  }, []);

  const loadMessages = useCallback(
    async (status, pass) => {
      const p = pass ?? passphrase;
      if (!p) return;
      setLoading(true);
      setError("");
      const { status: code, data } = await callFn(MSG_FN, p, { action: "list", status });
      setLoading(false);
      if (code === 401) return requirePass();
      if (!data.ok) {
        setError(data.message || "Erreur de chargement.");
        return;
      }
      sessionStorage.setItem(PASS_KEY, p);
      setAuthed(true);
      setMessages(data.messages || []);
      setWallOpen(Boolean(data.wall_open));
      if (status === "pending") setPendingMsg((data.messages || []).length);
    },
    [passphrase, requirePass],
  );

  const loadPhotos = useCallback(
    async (status, pass) => {
      const p = pass ?? passphrase;
      if (!p) return;
      setLoading(true);
      setError("");
      const { status: code, data } = await callFn(PHOTO_FN, p, { action: "list", status });
      setLoading(false);
      if (code === 401) return requirePass();
      if (!data.ok) {
        setError(data.message || "Erreur de chargement.");
        return;
      }
      sessionStorage.setItem(PASS_KEY, p);
      setAuthed(true);
      setPhotos(data.photos || []);
      if (status === "pending") setPendingPhoto((data.photos || []).length);
    },
    [passphrase, requirePass],
  );

  // Compteur « photos en attente » sans changer la vue affichée (pour le badge).
  const loadPhotoBadge = useCallback(async (p) => {
    const { data } = await callFn(PHOTO_FN, p, { action: "list", status: "pending" });
    if (data?.ok) setPendingPhoto((data.photos || []).length);
  }, []);

  // Connexion : on ouvre sur les messages en attente et on récupère aussi le
  // compteur de photos en attente pour afficher les deux badges d'un coup.
  const bootstrap = useCallback(
    (p) => {
      loadMessages("pending", p);
      loadPhotoBadge(p);
    },
    [loadMessages, loadPhotoBadge],
  );

  // Reconnexion automatique si une phrase est déjà en session.
  useEffect(() => {
    if (passphrase) bootstrap(passphrase);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleLogin(e) {
    e.preventDefault();
    const p = e.target.elements.pass.value.trim();
    if (!p) return;
    setPassphrase(p);
    bootstrap(p);
  }

  function switchSection(next) {
    setSection(next);
    setError("");
    if (next === "messages") loadMessages(msgView);
    else loadPhotos(photoView);
  }

  function switchMsgView(next) {
    setMsgView(next);
    loadMessages(next);
  }

  function switchPhotoView(next) {
    setPhotoView(next);
    loadPhotos(next);
  }

  function refresh() {
    if (section === "messages") loadMessages(msgView);
    else loadPhotos(photoView);
  }

  async function moderateMessage(id, action) {
    setBusyId(id);
    const { status: code, data } = await callFn(MSG_FN, passphrase, { action, id });
    setBusyId(null);
    if (code === 401) return requirePass();
    if (!data.ok) {
      setError(data.message || "Action impossible.");
      return;
    }
    setMessages((prev) => prev.filter((m) => m.id !== id));
    if (msgView === "pending") setPendingMsg((n) => (typeof n === "number" ? Math.max(0, n - 1) : n));
  }

  async function moderatePhoto(id, action, reason = "", reasonText = "") {
    setBusyId(id);
    const { status: code, data } = await callFn(PHOTO_FN, passphrase, {
      action,
      id,
      reason,
      reason_text: reasonText,
    });
    setBusyId(null);
    if (code === 401) return requirePass();
    if (!data.ok) {
      setError(data.message || "Action impossible.");
      return;
    }
    setPhotos((prev) => prev.filter((p) => p.id !== id));
    if (photoView === "pending") setPendingPhoto((n) => (typeof n === "number" ? Math.max(0, n - 1) : n));
  }

  async function toggleWall() {
    const next = !wallOpen;
    const { status: code, data } = await callFn(MSG_FN, passphrase, { action: "set_wall_open", open: next });
    if (code === 401) return requirePass();
    if (data.ok) setWallOpen(Boolean(data.wall_open));
  }

  // ── Écran de connexion (une seule saisie pour les deux espaces) ────
  if (!authed) {
    return (
      <div className="min-h-screen bg-ink text-bg flex items-center justify-center px-5">
        <form onSubmit={handleLogin} className="w-full max-w-sm">
          <div className="flex gap-1 mb-6">
            <span className="h-1.5 w-10 bg-haiti-blue rounded-full" />
            <span className="h-1.5 w-10 bg-haiti-red rounded-full" />
          </div>
          <h1 className="font-display text-3xl mb-2">Modération</h1>
          <p className="text-bg/60 text-sm mb-6">Messages et photos · accès réservé</p>
          <input
            name="pass"
            type="password"
            autoFocus
            placeholder="Phrase secrète"
            className="w-full px-4 py-3 rounded-lg bg-bg/10 border border-bg/20 text-bg placeholder-bg/40 focus:outline-none focus:border-haiti-red mb-4"
          />
          {error && <p className="text-haiti-red text-sm mb-4">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full px-6 py-3 bg-haiti-red text-bg font-semibold rounded-full hover:bg-haiti-red-dark transition-colors disabled:opacity-50"
          >
            {loading ? "Connexion…" : "Entrer"}
          </button>
        </form>
      </div>
    );
  }

  const view = section === "messages" ? msgView : photoView;
  const switchView = section === "messages" ? switchMsgView : switchPhotoView;
  const approvedLabel = section === "messages" ? "Publiés" : "Publiées";

  // ── Tableau de bord unifié ────────────────────────────────────────
  return (
    <div className="min-h-screen bg-bg">
      <header className="sticky top-0 z-20 bg-ink text-bg">
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-haiti-blue" />
        <div className="absolute left-1 top-0 bottom-0 w-1 bg-haiti-red" />
        <div className="max-w-2xl mx-auto px-5 py-4">
          <div className="flex items-center justify-between gap-3 mb-4">
            <div>
              <h1 className="font-display text-xl leading-none">Modération</h1>
              <p className="text-bg/50 text-xs mt-1">Grenadiers 2026</p>
            </div>
            <button
              onClick={() => {
                sessionStorage.removeItem(PASS_KEY);
                setAuthed(false);
                setPassphrase("");
              }}
              className="text-bg/50 text-xs uppercase tracking-wider font-bold hover:text-bg"
            >
              Quitter
            </button>
          </div>

          {/* Bascule entre les deux espaces, avec le nombre en attente */}
          <div className="grid grid-cols-2 gap-1 p-1 rounded-xl bg-bg/10">
            <SectionBtn active={section === "messages"} count={pendingMsg} onClick={() => switchSection("messages")}>
              Messages
            </SectionBtn>
            <SectionBtn active={section === "photos"} count={pendingPhoto} onClick={() => switchSection("photos")}>
              Photos
            </SectionBtn>
          </div>
        </div>

        {/* Interrupteur mur ouvert/fermé (messages uniquement) */}
        {section === "messages" && (
          <div className="max-w-2xl mx-auto px-5 pb-4">
            <button
              onClick={toggleWall}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-lg border transition-colors ${
                wallOpen ? "bg-emerald-600/15 border-emerald-500/40" : "bg-haiti-red/15 border-haiti-red/40"
              }`}
            >
              <span className="text-sm font-semibold">
                Mur des supporters :{" "}
                <span className={wallOpen ? "text-emerald-400" : "text-haiti-red"}>
                  {wallOpen ? "OUVERT" : "FERMÉ"}
                </span>
              </span>
              <span
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  wallOpen ? "bg-emerald-500" : "bg-bg/30"
                }`}
              >
                <span
                  className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
                    wallOpen ? "translate-x-5" : "translate-x-0.5"
                  }`}
                />
              </span>
            </button>
          </div>
        )}

        {/* Onglets file / publiés */}
        <div className="max-w-2xl mx-auto px-5 flex gap-1 border-t border-bg/10">
          <TabBtn active={view === "pending"} onClick={() => switchView("pending")}>
            En attente
          </TabBtn>
          <TabBtn active={view === "approved"} onClick={() => switchView("approved")}>
            {approvedLabel}
          </TabBtn>
          <button
            onClick={refresh}
            className="ml-auto text-bg/50 text-xs uppercase tracking-wider font-bold px-3 hover:text-bg"
          >
            ↻ Actualiser
          </button>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-5 py-5 space-y-3">
        {error && (
          <div className="bg-haiti-red/10 border border-haiti-red/30 text-haiti-red rounded-lg px-4 py-3 text-sm">
            {error}
          </div>
        )}

        {loading ? (
          <p className="text-muted text-center py-12">Chargement…</p>
        ) : section === "messages" ? (
          messages.length === 0 ? (
            <p className="text-muted text-center py-12">
              {msgView === "pending" ? "Aucun message en attente. 🎉" : "Aucun message publié."}
            </p>
          ) : (
            messages.map((m) => (
              <MessageCard
                key={m.id}
                m={m}
                view={msgView}
                busy={busyId === m.id}
                onApprove={() => moderateMessage(m.id, "approve")}
                onReject={() => moderateMessage(m.id, "reject")}
              />
            ))
          )
        ) : photos.length === 0 ? (
          <p className="text-muted text-center py-12">
            {photoView === "pending" ? "Aucune photo en attente. 🎉" : "Aucune photo publiée."}
          </p>
        ) : (
          photos.map((p) => (
            <PhotoCard
              key={p.id}
              p={p}
              view={photoView}
              busy={busyId === p.id}
              onApprove={() => moderatePhoto(p.id, "approve")}
              onReject={(reason, reasonText) => moderatePhoto(p.id, "reject", reason, reasonText)}
            />
          ))
        )}
      </main>
    </div>
  );
}

function SectionBtn({ active, count, onClick, children }) {
  return (
    <button
      onClick={onClick}
      className={`relative flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
        active ? "bg-bg text-ink" : "text-bg/70 hover:text-bg"
      }`}
    >
      {children}
      {count > 0 && (
        <span
          className={`inline-flex items-center justify-center min-w-5 h-5 px-1.5 rounded-full text-xs font-bold ${
            active ? "bg-haiti-red text-bg" : "bg-haiti-red text-bg"
          }`}
        >
          {count}
        </span>
      )}
    </button>
  );
}

function TabBtn({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-3 text-sm font-semibold uppercase tracking-wider border-b-2 -mb-px transition-colors ${
        active ? "border-haiti-red text-bg" : "border-transparent text-bg/50 hover:text-bg"
      }`}
    >
      {children}
    </button>
  );
}

function MessageCard({ m, view, busy, onApprove, onReject }) {
  const place = [m.location_city, m.location_country].filter(Boolean).join(", ");
  return (
    <div className="bg-white border border-line rounded-lg p-4 shadow-sm">
      <div className="flex items-baseline justify-between gap-3 mb-2">
        <p className="font-display text-lg leading-none">{m.display_name}</p>
        <span className="text-xs text-muted whitespace-nowrap">{timeAgo(m.created_at)}</span>
      </div>
      {place && <p className="text-xs text-muted mb-2">📍 {place}</p>}
      <p className="text-ink leading-relaxed whitespace-pre-wrap break-words mb-4">{m.message}</p>

      {view === "pending" ? (
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={onReject}
            disabled={busy}
            className="px-4 py-3 rounded-full font-semibold text-haiti-red border border-haiti-red/40 hover:bg-haiti-red/10 transition-colors disabled:opacity-50"
          >
            Rejeter
          </button>
          <button
            onClick={onApprove}
            disabled={busy}
            className="px-4 py-3 rounded-full font-semibold text-bg bg-emerald-600 hover:bg-emerald-700 transition-colors disabled:opacity-50"
          >
            {busy ? "…" : "Approuver"}
          </button>
        </div>
      ) : (
        <button
          onClick={onReject}
          disabled={busy}
          className="w-full px-4 py-3 rounded-full font-semibold text-haiti-red border border-haiti-red/40 hover:bg-haiti-red/10 transition-colors disabled:opacity-50"
        >
          {busy ? "…" : "Retirer de la publication"}
        </button>
      )}
    </div>
  );
}

function PhotoCard({ p, view, busy, onApprove, onReject }) {
  const [rejecting, setRejecting] = useState(false);
  const [autre, setAutre] = useState("");

  return (
    <div className="bg-white border border-line rounded-lg overflow-hidden shadow-sm">
      <img src={p.public_url} alt={p.caption || ""} loading="lazy" className="w-full max-h-80 object-contain bg-ink/5" />
      <div className="p-4">
        <div className="flex items-baseline justify-between gap-3 mb-2">
          <p className="text-[11px] uppercase tracking-wider text-haiti-red font-bold">
            {MATCH_LABEL[p.match] || p.match} · {CONTEXT_LABEL[p.context] || p.context}
          </p>
          <span className="text-xs text-muted whitespace-nowrap">{timeAgo(p.created_at)}</span>
        </div>
        {p.location && <p className="text-sm text-ink/80 mb-1">📍 {p.location}</p>}
        {p.caption && <p className="text-ink leading-relaxed break-words mb-4">{p.caption}</p>}

        {view === "pending" ? (
          rejecting ? (
            // Choix de la raison : l'auteur reçoit un e-mail avec le motif.
            <div className="rounded-lg border border-haiti-red/30 bg-haiti-red/5 p-3">
              <p className="text-xs font-semibold text-ink mb-2">
                Raison du refus · un e-mail est envoyé à l'auteur
              </p>
              <div className="grid gap-2 mb-3">
                {REJECT_REASONS.map((r) => (
                  <button
                    key={r.key}
                    onClick={() => onReject(r.key, "")}
                    disabled={busy}
                    className="text-left px-3 py-2.5 rounded-lg border border-line bg-white text-sm font-medium text-ink hover:border-haiti-red hover:text-haiti-red transition-colors disabled:opacity-50"
                  >
                    {r.label}
                  </button>
                ))}
              </div>
              <input
                value={autre}
                onChange={(e) => setAutre(e.target.value)}
                maxLength={280}
                placeholder="Autre raison (message libre)…"
                className="w-full px-3 py-2.5 rounded-lg border border-line text-sm mb-2 focus:outline-none focus:border-haiti-red"
              />
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => {
                    setRejecting(false);
                    setAutre("");
                  }}
                  disabled={busy}
                  className="px-3 py-2.5 rounded-full text-sm font-semibold text-ink border border-line hover:bg-line/30 transition-colors disabled:opacity-50"
                >
                  Annuler
                </button>
                <button
                  onClick={() => onReject("autre", autre.trim())}
                  disabled={busy || !autre.trim()}
                  className="px-3 py-2.5 rounded-full text-sm font-semibold text-bg bg-haiti-red hover:bg-haiti-red-dark transition-colors disabled:opacity-50"
                >
                  {busy ? "…" : "Refuser + e-mail"}
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setRejecting(true)}
                disabled={busy}
                className="px-4 py-3 rounded-full font-semibold text-haiti-red border border-haiti-red/40 hover:bg-haiti-red/10 transition-colors disabled:opacity-50"
              >
                Rejeter
              </button>
              <button
                onClick={onApprove}
                disabled={busy}
                className="px-4 py-3 rounded-full font-semibold text-bg bg-emerald-600 hover:bg-emerald-700 transition-colors disabled:opacity-50"
              >
                {busy ? "…" : "Approuver"}
              </button>
            </div>
          )
        ) : (
          // Onglet « Publiées » : retrait sans raison -> pas d'e-mail.
          <button
            onClick={() => onReject()}
            disabled={busy}
            className="w-full px-4 py-3 rounded-full font-semibold text-haiti-red border border-haiti-red/40 hover:bg-haiti-red/10 transition-colors disabled:opacity-50"
          >
            {busy ? "…" : "Retirer de la publication"}
          </button>
        )}
      </div>
    </div>
  );
}
