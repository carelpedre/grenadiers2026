// ╔══════════════════════════════════════════════════════════════════╗
// ║  submit-fan-message — soumission publique au Mur des supporters    ║
// ║                                                                    ║
// ║  Seul chemin d'écriture public vers public.fan_messages.           ║
// ║  Étapes (dans l'ordre) :                                           ║
// ║   1. Mur ouvert ? (site_settings.fan_wall_open = 'true')           ║
// ║   2. Validation longueurs + pré-filtre anti-spam / grossièretés    ║
// ║   3. Vérification du jeton Turnstile auprès de Cloudflare          ║
// ║   4. Limite de débit par IP hachée (~3 / heure)                    ║
// ║   5. Insertion en statut 'pending' via le service role             ║
// ║                                                                    ║
// ║  Secrets / env (jamais codés en dur) :                            ║
// ║    TURNSTILE_SECRET           — clé secrète Cloudflare Turnstile   ║
// ║    SUPABASE_URL               — injecté par le runtime             ║
// ║    SUPABASE_SERVICE_ROLE_KEY  — injecté ; contourne la RLS         ║
// ╚══════════════════════════════════════════════════════════════════╝

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const LIMITS = { message: 500, name: 60, city: 80, country: 80 };
const RATE_MAX = 3; // soumissions max
const RATE_WINDOW_MS = 60 * 60 * 1000; // par heure

// Pré-filtre anti-spam / grossièretés (volontairement court ; la modération
// humaine reste le filet de sécurité — tout entre en 'pending').
const BANNED = [
  // grossièretés / insultes (EN/FR)
  "fuck", "shit", "bitch", "asshole", "cunt", "nigger", "faggot", "putain",
  "merde", "connard", "salope", "enculé", "pute", "bâtard",
  // spam courant
  "viagra", "cialis", "casino", "porn", "xxx", "crypto giveaway", "free money",
  "click here", "buy now", "loan", "bitcoin",
];
// URL / lien → rejeté (les messages de fans ne contiennent pas de liens).
const URL_RE = /(https?:\/\/|www\.|[a-z0-9-]+\.(com|net|org|io|ru|xyz|info|biz)\b)/i;

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

function clientIp(req: Request): string {
  const xff = req.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0].trim();
  return req.headers.get("x-real-ip") || "0.0.0.0";
}

async function sha256Hex(input: string): Promise<string> {
  const data = new TextEncoder().encode(input);
  const buf = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function clean(s: unknown, max: number, allowNewlines = false): string {
  let v = typeof s === "string" ? s : "";
  // retire les caractères de contrôle (garde \n et \t pour les messages)
  v = allowNewlines
    ? v.replace(/[\u0000-\u0008\u000B-\u001F\u007F]/g, "")
    : v.replace(/[\u0000-\u001F\u007F]/g, "");
  v = v.trim();
  return v.slice(0, max);
}

function hasBannedContent(...parts: string[]): boolean {
  const haystack = parts.join(" \n ").toLowerCase();
  if (URL_RE.test(haystack)) return true;
  for (const term of BANNED) {
    // limite de mot pour les termes courts afin d'éviter les faux positifs
    const re = new RegExp(`(^|[^a-zà-ÿ])${term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}([^a-zà-ÿ]|$)`, "i");
    if (re.test(haystack)) return true;
  }
  return false;
}

async function wallIsOpen(url: string, serviceKey: string): Promise<boolean> {
  const q = `${url}/rest/v1/site_settings?select=value&key=eq.fan_wall_open&limit=1`;
  const res = await fetch(q, { headers: serviceHeaders(serviceKey) });
  if (!res.ok) return false;
  const rows = await res.json();
  return rows?.[0]?.value === "true";
}

async function verifyTurnstile(token: string, ip: string): Promise<boolean> {
  const secret = Deno.env.get("TURNSTILE_SECRET");
  if (!secret) throw new Error("TURNSTILE_SECRET not configured");
  const form = new URLSearchParams();
  form.set("secret", secret);
  form.set("response", token);
  if (ip && ip !== "0.0.0.0") form.set("remoteip", ip);
  const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: form.toString(),
  });
  if (!res.ok) return false;
  const out = await res.json();
  return out?.success === true;
}

async function recentCountForHash(url: string, serviceKey: string, hash: string): Promise<number> {
  const since = new Date(Date.now() - RATE_WINDOW_MS).toISOString();
  const q =
    `${url}/rest/v1/fan_messages?select=id` +
    `&submitter_hash=eq.${encodeURIComponent(hash)}` +
    `&created_at=gte.${encodeURIComponent(since)}` +
    `&limit=${RATE_MAX + 1}`;
  const res = await fetch(q, { headers: serviceHeaders(serviceKey) });
  if (!res.ok) return 0;
  const rows = await res.json();
  return Array.isArray(rows) ? rows.length : 0;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { status: 204, headers: CORS });
  if (req.method !== "POST") return json({ ok: false, error: "method_not_allowed" }, 405);

  try {
    const { url, serviceKey } = supabaseEnv();
    const body = await req.json().catch(() => ({} as any));

    // 1. Mur ouvert ?
    if (!(await wallIsOpen(url, serviceKey))) {
      return json({ ok: false, error: "wall_closed", message: "Le mur des supporters est actuellement fermé." }, 403);
    }

    // 2. Validation + anti-spam
    const message = clean(body.message, LIMITS.message, true);
    if (message.length < 1) {
      return json({ ok: false, error: "message_required", message: "Le message est vide." }, 400);
    }
    if (typeof body.message === "string" && body.message.trim().length > LIMITS.message) {
      return json({ ok: false, error: "message_too_long", message: "Le message dépasse 500 caractères." }, 400);
    }

    const wantsAnon = Boolean(body.is_anonymous);
    const nameRaw = clean(body.name, LIMITS.name);
    const isAnonymous = wantsAnon || nameRaw.length === 0;
    const name = isAnonymous ? null : nameRaw;
    const city = clean(body.location_city, LIMITS.city) || null;
    const country = clean(body.location_country, LIMITS.country) || null;
    // Code pays ISO 3166-1 alpha-2 (facultatif côté stockage mais fourni par
    // le formulaire). On ne garde que 2 lettres majuscules, sinon null.
    let countryCode: string | null = clean(body.location_country_code, 2).toUpperCase();
    countryCode = countryCode && /^[A-Z]{2}$/.test(countryCode) ? countryCode : null;

    // Pays requis.
    if (!country) {
      return json({ ok: false, error: "country_required", message: "Veuillez sélectionner votre pays." }, 400);
    }

    if (hasBannedContent(message, nameRaw, city ?? "", country ?? "")) {
      return json({ ok: false, error: "rejected_content", message: "Votre message contient du contenu non autorisé." }, 400);
    }

    // 3. Turnstile
    const token = typeof body.turnstile_token === "string" ? body.turnstile_token : "";
    if (!token) {
      return json({ ok: false, error: "captcha_required", message: "Vérification anti-robot manquante." }, 400);
    }
    const ip = clientIp(req);
    let captchaOk = false;
    try {
      captchaOk = await verifyTurnstile(token, ip);
    } catch (_e) {
      return json({ ok: false, error: "captcha_unconfigured", message: "Vérification anti-robot indisponible." }, 500);
    }
    if (!captchaOk) {
      return json({ ok: false, error: "captcha_failed", message: "Échec de la vérification anti-robot." }, 400);
    }

    // 4. Limite de débit par IP hachée
    const hash = await sha256Hex(`${ip}:${serviceKey}`);
    const recent = await recentCountForHash(url, serviceKey, hash);
    if (recent >= RATE_MAX) {
      return json({ ok: false, error: "rate_limited", message: "Trop de messages envoyés. Réessayez dans une heure." }, 429);
    }

    // 5. Insertion en 'pending'
    const insertRes = await fetch(`${url}/rest/v1/fan_messages`, {
      method: "POST",
      headers: serviceHeaders(serviceKey, { Prefer: "return=minimal" }),
      body: JSON.stringify({
        name,
        is_anonymous: isAnonymous,
        location_city: city,
        location_country: country,
        location_country_code: countryCode,
        message,
        submitter_hash: hash,
        status: "pending",
      }),
    });
    if (!insertRes.ok) {
      const text = await insertRes.text();
      console.error("Insert failed:", insertRes.status, text);
      return json({ ok: false, error: "insert_failed", message: "Impossible d'enregistrer le message." }, 500);
    }

    return json({
      ok: true,
      status: "pending",
      message: "Merci ! Votre message sera publié après modération.",
    });
  } catch (err) {
    console.error(err);
    return json({ ok: false, error: "server_error", message: String((err as Error)?.message ?? err) }, 500);
  }
});
