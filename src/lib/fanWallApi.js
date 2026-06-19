// ╔══════════════════════════════════════════════════════════════════╗
// ║  MUR DES SUPPORTERS — client (Supabase via REST/PostgREST)        ║
// ║                                                                    ║
// ║  Mêmes conventions que pwonostikApi.js : appels fetch directs.    ║
// ║   • Lecture : vue publique fan_messages_public (approuvés only)   ║
// ║     + drapeau fan_wall_open via site_settings_public.             ║
// ║   • Écriture : fonction edge submit-fan-message (Turnstile +      ║
// ║     anti-spam + limite de débit ; insère en 'pending').           ║
// ╚══════════════════════════════════════════════════════════════════╝

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const backendReady = Boolean(SUPABASE_URL && SUPABASE_KEY);

function headers() {
  return {
    "Content-Type": "application/json",
    apikey: SUPABASE_KEY,
    Authorization: `Bearer ${SUPABASE_KEY}`,
  };
}

// Messages approuvés (les plus récents d'abord). Retourne [] / null.
export async function fetchApprovedMessages(limit = 60) {
  if (!backendReady) return null;
  try {
    const q =
      `${SUPABASE_URL}/rest/v1/fan_messages_public` +
      `?select=id,display_name,location_city,location_country,location_country_code,message,approved_at` +
      `&order=approved_at.desc&limit=${limit}`;
    const res = await fetch(q, { headers: headers() });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

// Le mur est-il ouvert ? true / false / null (inconnu).
export async function fetchWallOpen() {
  if (!backendReady) return null;
  try {
    const q =
      `${SUPABASE_URL}/rest/v1/site_settings_public` +
      `?select=value&key=eq.fan_wall_open&limit=1`;
    const res = await fetch(q, { headers: headers() });
    if (!res.ok) return null;
    const rows = await res.json();
    if (!rows?.length) return null;
    return rows[0].value === "true";
  } catch {
    return null;
  }
}

// PostgREST plafonne chaque réponse à 1000 lignes. On pagine au-delà.
const PAGE_SIZE = 1000;

// Nombre exact de messages approuvés. Lu dans l'en-tête Content-Range de
// PostgREST (Prefer: count=exact), donc jamais plafonné à 1000.
export async function fetchApprovedCount() {
  if (!backendReady) return 0;
  try {
    const q = `${SUPABASE_URL}/rest/v1/fan_messages_public?select=id&limit=1`;
    const res = await fetch(q, { headers: { ...headers(), Prefer: "count=exact" } });
    if (!res.ok) return 0;
    const total = parseInt((res.headers.get("content-range") || "").split("/")[1], 10);
    return Number.isFinite(total) ? total : 0;
  } catch {
    return 0;
  }
}

// Récupère toutes les lignes approuvées pour les colonnes demandées, en
// paginant par tranches de 1000 jusqu'à une page incomplète. Contourne le
// plafond de 1000 lignes par requête de PostgREST.
async function fetchAllApprovedColumns(select) {
  const all = [];
  for (let from = 0; ; from += PAGE_SIZE) {
    const q =
      `${SUPABASE_URL}/rest/v1/fan_messages_public` +
      `?select=${select}&offset=${from}&limit=${PAGE_SIZE}`;
    const res = await fetch(q, { headers: headers() });
    if (!res.ok) break;
    const rows = await res.json();
    all.push(...rows);
    if (rows.length < PAGE_SIZE) break;
  }
  return all;
}

// Statistiques globales du mur : total approuvé + pays distincts.
// Le total vient d'un count exact (non plafonné) ; les pays d'un balayage
// paginé des colonnes pays (léger) sur tout l'historique.
export async function fetchWallStats() {
  if (!backendReady) return { count: 0, countries: 0 };
  try {
    const [count, rows] = await Promise.all([
      fetchApprovedCount(),
      fetchAllApprovedColumns("location_country,location_country_code"),
    ]);
    return { count, countries: distinctCountries(rows) };
  } catch {
    return { count: 0, countries: 0 };
  }
}

// Nombre de pays distincts parmi des messages (code pays, sinon nom).
export function distinctCountries(rows) {
  const set = new Set();
  for (const r of rows || []) {
    const key = (r.location_country_code || r.location_country || "").trim().toLowerCase();
    if (key) set.add(key);
  }
  return set.size;
}

// Soumet un message via la fonction edge. Retourne { status, data }.
export async function submitFanMessage(payload) {
  if (!backendReady) return { status: 0, data: { ok: false, message: "Service indisponible." } };
  try {
    const res = await fetch(`${SUPABASE_URL}/functions/v1/submit-fan-message`, {
      method: "POST",
      headers: headers(),
      body: JSON.stringify(payload),
    });
    const data = await res.json().catch(() => ({}));
    return { status: res.status, data };
  } catch {
    return { status: 0, data: { ok: false, message: "Connexion impossible. Réessayez." } };
  }
}
