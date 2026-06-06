// ╔══════════════════════════════════════════════════════════════════╗
// ║  moderate-fan-message — modération du Mur des supporters            ║
// ║                                                                    ║
// ║  Protégé par une phrase secrète (MODERATION_SECRET). Toute requête ║
// ║  est rejetée (401) si la phrase ne correspond pas, AVANT toute     ║
// ║  autre action. Seul moyen de lire les messages 'pending' (anon n'a ║
// ║  aucun accès à la table de base — voulu).                          ║
// ║                                                                    ║
// ║  Actions (corps POST) :                                            ║
// ║    { action:"list", passphrase, status? }       — file de modé.    ║
// ║    { action:"approve", passphrase, id }         — publier          ║
// ║    { action:"reject",  passphrase, id }         — retirer/refuser  ║
// ║    { action:"set_wall_open", passphrase, open } — ouvrir/fermer    ║
// ║                                                                    ║
// ║  Secrets / env (jamais codés en dur) :                            ║
// ║    MODERATION_SECRET         — phrase secrète d'accès admin        ║
// ║    SUPABASE_URL              — injecté par le runtime              ║
// ║    SUPABASE_SERVICE_ROLE_KEY — injecté ; contourne la RLS          ║
// ╚══════════════════════════════════════════════════════════════════╝

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const VALID_STATUS = ["pending", "approved", "rejected"];
const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", ...CORS },
  });
}

function supabaseEnv() {
  const url = Deno.env.get("SUPABASE_URL");
  const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  if (!url || !serviceKey) throw new Error("Missing SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY");
  return { url, serviceKey };
}

function serviceHeaders(serviceKey: string, extra: Record<string, string> = {}) {
  return {
    "Content-Type": "application/json",
    apikey: serviceKey,
    Authorization: `Bearer ${serviceKey}`,
    ...extra,
  };
}

// Comparaison à temps (quasi) constant pour éviter la fuite par timing.
function safeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

function displayName(row: any): string {
  return row.is_anonymous ? "Anonyme" : (row.name || "Anonyme");
}

async function listMessages(url: string, serviceKey: string, status: string) {
  const cols = "id,name,is_anonymous,location_city,location_country,message,status,created_at,approved_at";
  const q =
    `${url}/rest/v1/fan_messages?select=${cols}` +
    `&status=eq.${encodeURIComponent(status)}` +
    `&order=created_at.desc&limit=300`;
  const res = await fetch(q, { headers: serviceHeaders(serviceKey) });
  if (!res.ok) throw new Error(`list failed HTTP ${res.status}: ${await res.text()}`);
  const rows: any[] = await res.json();
  // N'expose jamais submitter_hash ; ajoute un display_name calculé.
  return rows.map((r) => ({
    id: r.id,
    display_name: displayName(r),
    name: r.name,
    is_anonymous: r.is_anonymous,
    location_city: r.location_city,
    location_country: r.location_country,
    message: r.message,
    status: r.status,
    created_at: r.created_at,
    approved_at: r.approved_at,
  }));
}

async function patchStatus(url: string, serviceKey: string, id: string, patch: Record<string, unknown>) {
  const res = await fetch(`${url}/rest/v1/fan_messages?id=eq.${encodeURIComponent(id)}`, {
    method: "PATCH",
    headers: serviceHeaders(serviceKey, { Prefer: "return=representation" }),
    body: JSON.stringify(patch),
  });
  if (!res.ok) throw new Error(`patch failed HTTP ${res.status}: ${await res.text()}`);
  const rows: any[] = await res.json();
  return rows.length; // nombre de lignes touchées
}

async function setWallOpen(url: string, serviceKey: string, open: boolean) {
  const res = await fetch(`${url}/rest/v1/site_settings?key=eq.fan_wall_open`, {
    method: "PATCH",
    headers: serviceHeaders(serviceKey, { Prefer: "return=representation" }),
    body: JSON.stringify({ value: open ? "true" : "false", updated_at: new Date().toISOString() }),
  });
  if (!res.ok) throw new Error(`set_wall_open failed HTTP ${res.status}: ${await res.text()}`);
  const rows: any[] = await res.json();
  return rows[0]?.value === "true";
}

async function wallState(url: string, serviceKey: string): Promise<boolean> {
  const q = `${url}/rest/v1/site_settings?select=value&key=eq.fan_wall_open&limit=1`;
  const res = await fetch(q, { headers: serviceHeaders(serviceKey) });
  if (!res.ok) return false;
  const rows = await res.json();
  return rows?.[0]?.value === "true";
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { status: 204, headers: CORS });
  if (req.method !== "POST") return json({ ok: false, error: "method_not_allowed" }, 405);

  // ── Vérification de la phrase secrète AVANT toute autre opération ──
  const secret = Deno.env.get("MODERATION_SECRET");
  if (!secret) return json({ ok: false, error: "moderation_unconfigured" }, 500);

  let body: any;
  try {
    body = await req.json();
  } catch {
    body = {};
  }

  const passphrase = typeof body.passphrase === "string" ? body.passphrase : "";
  if (!passphrase || !safeEqual(passphrase, secret)) {
    return json({ ok: false, error: "unauthorized" }, 401);
  }

  try {
    const { url, serviceKey } = supabaseEnv();
    const action = body.action;

    if (action === "list") {
      const status = VALID_STATUS.includes(body.status) ? body.status : "pending";
      const messages = await listMessages(url, serviceKey, status);
      const open = await wallState(url, serviceKey);
      return json({ ok: true, action, status, wall_open: open, count: messages.length, messages });
    }

    if (action === "approve" || action === "reject") {
      const id = typeof body.id === "string" ? body.id : "";
      if (!UUID_RE.test(id)) return json({ ok: false, error: "invalid_id" }, 400);
      const patch =
        action === "approve"
          ? { status: "approved", approved_at: new Date().toISOString() }
          : { status: "rejected" };
      const touched = await patchStatus(url, serviceKey, id, patch);
      if (touched === 0) return json({ ok: false, error: "not_found" }, 404);
      return json({ ok: true, action, id, status: patch.status });
    }

    if (action === "set_wall_open") {
      const open = body.open === true || body.open === "true";
      const now = await setWallOpen(url, serviceKey, open);
      return json({ ok: true, action, wall_open: now });
    }

    return json({ ok: false, error: "unknown_action" }, 400);
  } catch (err) {
    console.error(err);
    return json({ ok: false, error: "server_error", message: String((err as Error)?.message ?? err) }, 500);
  }
});
