import { useState, useEffect, useCallback } from "react";

// ╔══════════════════════════════════════════════════════════════════╗
// ║  /admin/mur — modération du Mur des supporters                     ║
// ║                                                                    ║
// ║  Page NON liée dans la navigation publique. Protégée uniquement   ║
// ║  par la phrase secrète (vérifiée côté fonction edge). La phrase   ║
// ║  est gardée en sessionStorage et envoyée à chaque appel ; un 401  ║
// ║  l'efface et redemande.                                           ║
// ╚══════════════════════════════════════════════════════════════════╝

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;
const FN_URL = `${SUPABASE_URL}/functions/v1/moderate-fan-message`;
const PASS_KEY = "fanwall_mod_pass";

async function callModeration(passphrase, payload) {
  const res = await fetch(FN_URL, {
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

export default function AdminMur() {
  const [passphrase, setPassphrase] = useState(() => sessionStorage.getItem(PASS_KEY) || "");
  const [authed, setAuthed] = useState(false);
  const [view, setView] = useState("pending"); // "pending" | "approved"
  const [messages, setMessages] = useState([]);
  const [wallOpen, setWallOpen] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [busyId, setBusyId] = useState(null);

  const requirePass = useCallback(() => {
    sessionStorage.removeItem(PASS_KEY);
    setPassphrase("");
    setAuthed(false);
    setError("Phrase secrète invalide ou expirée.");
  }, []);

  const load = useCallback(
    async (status, pass) => {
      const p = pass ?? passphrase;
      if (!p) return;
      setLoading(true);
      setError("");
      const { status: code, data } = await callModeration(p, { action: "list", status });
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
    },
    [passphrase, requirePass],
  );

  // Tentative de connexion automatique si une phrase est déjà en session.
  useEffect(() => {
    if (passphrase) load("pending", passphrase);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleLogin(e) {
    e.preventDefault();
    const p = e.target.elements.pass.value.trim();
    if (!p) return;
    setPassphrase(p);
    load(view, p);
  }

  function switchView(next) {
    setView(next);
    load(next);
  }

  async function moderate(id, action) {
    setBusyId(id);
    const { status: code, data } = await callModeration(passphrase, { action, id });
    setBusyId(null);
    if (code === 401) return requirePass();
    if (!data.ok) {
      setError(data.message || "Action impossible.");
      return;
    }
    // Retire la carte de la liste courante.
    setMessages((prev) => prev.filter((m) => m.id !== id));
  }

  async function toggleWall() {
    const next = !wallOpen;
    const { status: code, data } = await callModeration(passphrase, {
      action: "set_wall_open",
      open: next,
    });
    if (code === 401) return requirePass();
    if (data.ok) setWallOpen(Boolean(data.wall_open));
  }

  // ── Écran de connexion ────────────────────────────────────────────
  if (!authed) {
    return (
      <div className="min-h-screen bg-ink text-bg flex items-center justify-center px-5">
        <form onSubmit={handleLogin} className="w-full max-w-sm">
          <div className="flex gap-1 mb-6">
            <span className="h-1.5 w-10 bg-haiti-blue rounded-full" />
            <span className="h-1.5 w-10 bg-haiti-red rounded-full" />
          </div>
          <h1 className="font-display text-3xl mb-2">Modération</h1>
          <p className="text-bg/60 text-sm mb-6">Mur des supporters · accès réservé</p>
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

  // ── Tableau de bord ───────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-bg">
      {/* En-tête */}
      <header className="sticky top-0 z-20 bg-ink text-bg">
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-haiti-blue" />
        <div className="absolute left-1 top-0 bottom-0 w-1 bg-haiti-red" />
        <div className="max-w-2xl mx-auto px-5 py-4">
          <div className="flex items-center justify-between gap-3 mb-4">
            <div>
              <h1 className="font-display text-xl leading-none">Mur · Modération</h1>
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

          {/* Interrupteur mur ouvert/fermé */}
          <button
            onClick={toggleWall}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-lg border transition-colors ${
              wallOpen
                ? "bg-emerald-600/15 border-emerald-500/40"
                : "bg-haiti-red/15 border-haiti-red/40"
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

        {/* Onglets file / publiés */}
        <div className="max-w-2xl mx-auto px-5 flex gap-1 border-t border-bg/10">
          <TabBtn active={view === "pending"} onClick={() => switchView("pending")}>
            En attente
          </TabBtn>
          <TabBtn active={view === "approved"} onClick={() => switchView("approved")}>
            Publiés
          </TabBtn>
          <button
            onClick={() => load(view)}
            className="ml-auto text-bg/50 text-xs uppercase tracking-wider font-bold px-3 hover:text-bg"
          >
            ↻ Actualiser
          </button>
        </div>
      </header>

      {/* Liste */}
      <main className="max-w-2xl mx-auto px-5 py-5 space-y-3">
        {error && (
          <div className="bg-haiti-red/10 border border-haiti-red/30 text-haiti-red rounded-lg px-4 py-3 text-sm">
            {error}
          </div>
        )}

        {loading ? (
          <p className="text-muted text-center py-12">Chargement…</p>
        ) : messages.length === 0 ? (
          <p className="text-muted text-center py-12">
            {view === "pending" ? "Aucun message en attente. 🎉" : "Aucun message publié."}
          </p>
        ) : (
          messages.map((m) => (
            <MessageCard
              key={m.id}
              m={m}
              view={view}
              busy={busyId === m.id}
              onApprove={() => moderate(m.id, "approve")}
              onReject={() => moderate(m.id, "reject")}
            />
          ))
        )}
      </main>
    </div>
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
