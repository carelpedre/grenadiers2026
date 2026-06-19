// ╔══════════════════════════════════════════════════════════════════╗
// ║  moderate-fan-photo · modération de la galerie des supporters      ║
// ║                                                                    ║
// ║  Calque exact de moderate-fan-message : protégé par la MÊME phrase ║
// ║  secrète (MODERATION_SECRET). Toute requête est rejetée (401) si   ║
// ║  la phrase ne correspond pas, AVANT toute autre action. Un simple ║
// ║  utilisateur connecté NE PEUT PAS approuver / rejeter quoi que ce  ║
// ║  soit, y compris ses propres photos : seul le service role (qui    ║
// ║  contourne la RLS) agit ici, derrière la phrase secrète.          ║
// ║                                                                    ║
// ║  Approve / reject préviennent l'auteur par e-mail (Brevo) : photo  ║
// ║  en ligne, ou refus avec une raison prédéfinie (ou texte libre).   ║
// ║  L'e-mail est best effort : un échec n'annule pas la modération.   ║
// ║                                                                    ║
// ║  Actions (corps POST) :                                            ║
// ║    { action:"list", passphrase, status? }   · file de modération   ║
// ║    { action:"approve", passphrase, id }     · publier + e-mail     ║
// ║    { action:"reject", passphrase, id,       · refuser + supprimer  ║
// ║      reason?, reason_text? }                   l'objet ET la ligne ║
// ║                                               + e-mail « pourquoi » ║
// ║                                                                    ║
// ║  Secrets / env (jamais codés en dur) :                            ║
// ║    MODERATION_SECRET         · phrase secrète d'accès admin        ║
// ║    SUPABASE_URL              · injecté par le runtime              ║
// ║    SUPABASE_SERVICE_ROLE_KEY · injecté ; contourne la RLS          ║
// ║    BREVO_API_KEY             · clé API Brevo (envoi des e-mails)    ║
// ║    BREVO_SENDER_EMAIL/NAME   · expéditeur vérifié (optionnel)       ║
// ╚══════════════════════════════════════════════════════════════════╝

const BUCKET = "fan-photos";

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

function publicUrl(url: string, path: string): string {
  return `${url}/storage/v1/object/public/${BUCKET}/${path}`;
}

// ── Notifications e-mail (Brevo) ──────────────────────────────────────
// On prévient l'auteur quand sa photo est publiée ou refusée. L'e-mail est
// « best effort » : un échec d'envoi ne doit JAMAIS faire échouer la
// modération (le statut/suppression a déjà eu lieu).
const SITE = "https://grenadiers2026.com";
const BREVO_API = "https://api.brevo.com/v3/smtp/email";

function senderConfig() {
  return {
    email: Deno.env.get("BREVO_SENDER_EMAIL") ?? "contact@grenadiers2026.com",
    name: Deno.env.get("BREVO_SENDER_NAME") ?? "Grenadiers 2026",
  };
}

// Raisons de refus prédéfinies : clé -> bout de phrase inséré dans l'e-mail.
// Le moderateur choisit une clé (ou "autre" + texte libre) dans /admin.
const REJECT_REASONS: Record<string, string> = {
  hors_sujet:
    "la galerie met en avant les supporters et l'ambiance des fans, pas les photos de joueurs ni les images trouvées ailleurs",
  qualite: "elle est un peu trop floue ou trop sombre pour bien rendre dans la galerie",
  inapproprie: "elle contient un élément qui n'a pas vraiment sa place dans la galerie",
};

function escapeHtml(s: string): string {
  return s.replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c] as string),
  );
}

// Récupère l'e-mail de l'auteur via l'API admin (service role).
async function getUserEmail(url: string, serviceKey: string, userId: string): Promise<string | null> {
  try {
    const res = await fetch(`${url}/auth/v1/admin/users/${encodeURIComponent(userId)}`, {
      headers: serviceHeaders(serviceKey),
    });
    if (!res.ok) return null;
    const u = await res.json();
    return typeof u?.email === "string" && u.email.includes("@") ? u.email : null;
  } catch {
    return null;
  }
}

async function sendEmail(to: string, subject: string, html: string): Promise<boolean> {
  const key = Deno.env.get("BREVO_API_KEY");
  if (!key) {
    console.warn("BREVO_API_KEY absent : notification e-mail ignorée");
    return false;
  }
  try {
    const res = await fetch(BREVO_API, {
      method: "POST",
      headers: { "api-key": key, "Content-Type": "application/json", accept: "application/json" },
      body: JSON.stringify({ sender: senderConfig(), to: [{ email: to }], subject, htmlContent: html }),
    });
    if (!res.ok) {
      console.error(`Brevo HTTP ${res.status}: ${await res.text()}`);
      return false;
    }
    return true;
  } catch (e) {
    console.error("Brevo error", e);
    return false;
  }
}

// Gabarit e-mail branché aux couleurs du site.
function emailLayout(headline: string, bodyHtml: string, cta?: { href: string; label: string }): string {
  const button = cta
    ? `<a href="${cta.href}" style="display:inline-block;background:#D21034;color:#ffffff;text-decoration:none;font-weight:700;padding:12px 24px;border-radius:9999px;font-size:15px">${cta.label}</a>`
    : "";
  return `<!doctype html><html lang="fr"><body style="margin:0;background:#FAFAF7;font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:#0D1B3E">
  <div style="max-width:520px;margin:0 auto;padding:24px">
    <div style="background:#0D1B3E;border-radius:16px;overflow:hidden">
      <div style="height:6px;background:linear-gradient(90deg,#00209F 50%,#D21034 50%)"></div>
      <div style="padding:28px 28px 8px">
        <p style="margin:0;color:#C8A45C;font-size:12px;letter-spacing:2px;text-transform:uppercase;font-weight:700">Grenadiers 2026</p>
        <h1 style="margin:8px 0 0;color:#ffffff;font-size:24px;line-height:1.25">${headline}</h1>
      </div>
      <div style="background:#ffffff;margin:16px;border-radius:12px;padding:24px">
        ${bodyHtml}
        ${button ? `<div style="margin-top:20px">${button}</div>` : ""}
      </div>
      <p style="margin:0;padding:0 28px 24px;color:rgba(255,255,255,0.5);font-size:12px">Galerie des supporters · grenadiers2026.com</p>
    </div>
  </div></body></html>`;
}

async function notifyApproved(url: string, serviceKey: string, userId: string) {
  const email = await getUserEmail(url, serviceKey, userId);
  if (!email) return;
  const html = emailLayout(
    "Ta photo est en ligne 🇭🇹",
    `<p style="margin:0;font-size:15px;line-height:1.6">Bonjour 👋</p>
     <p style="margin:12px 0 0;font-size:15px;line-height:1.6">Super nouvelle : ta photo vient d'être approuvée ! Elle est maintenant dans la galerie des supporters, au milieu de toutes les couleurs des Grenadiers. Merci de faire vivre cette aventure avec nous.</p>
     <p style="margin:12px 0 0;font-size:15px;line-height:1.6">Mèsi anpil pou pataj la. Ann ale Grenadiers ! 🇭🇹</p>`,
    { href: `${SITE}/galerie-supporters`, label: "Voir la galerie" },
  );
  await sendEmail(email, "Ta photo est en ligne ! 🇭🇹", html);
}

async function notifyRejected(
  url: string,
  serviceKey: string,
  userId: string,
  reasonKey?: string,
  reasonText?: string,
) {
  const email = await getUserEmail(url, serviceKey, userId);
  if (!email) return;
  let clause = "elle ne correspond pas tout à fait à l'esprit de la galerie";
  if (reasonKey === "autre" && reasonText && reasonText.trim()) {
    clause = reasonText.trim().slice(0, 280);
  } else if (reasonKey && REJECT_REASONS[reasonKey]) {
    clause = REJECT_REASONS[reasonKey];
  }
  const html = emailLayout(
    "Merci pour ta photo 🇭🇹",
    `<p style="margin:0;font-size:15px;line-height:1.6">Bonjour 👋</p>
     <p style="margin:12px 0 0;font-size:15px;line-height:1.6">Merci beaucoup de l'avoir partagée et de faire vivre les couleurs des Grenadiers. Pour cette fois, on ne va pas pouvoir la publier dans la galerie, car ${escapeHtml(clause)}.</p>
     <p style="margin:12px 0 0;font-size:15px;line-height:1.6">Rien de grave, ça arrive ! Tu peux en envoyer une autre quand tu veux, on serait vraiment ravis de la voir. Ann ale Grenadiers ! 🇭🇹</p>`,
    { href: `${SITE}/partager-ta-photo`, label: "Envoyer une autre photo" },
  );
  await sendEmail(email, "Merci pour ta photo · Grenadiers 2026", html);
}

async function listPhotos(url: string, serviceKey: string, status: string) {
  const cols = "id,storage_path,match,context,location,caption,status,created_at";
  const q =
    `${url}/rest/v1/fan_photos?select=${cols}` +
    `&status=eq.${encodeURIComponent(status)}` +
    `&order=created_at.desc&limit=300`;
  const res = await fetch(q, { headers: serviceHeaders(serviceKey) });
  if (!res.ok) throw new Error(`list failed HTTP ${res.status}: ${await res.text()}`);
  const rows: any[] = await res.json();
  // N'expose pas user_id ; ajoute l'URL publique pour l'aperçu admin.
  return rows.map((r) => ({
    id: r.id,
    storage_path: r.storage_path,
    public_url: publicUrl(url, r.storage_path),
    match: r.match,
    context: r.context,
    location: r.location,
    caption: r.caption,
    status: r.status,
    created_at: r.created_at,
  }));
}

// Métadonnées nécessaires au refus : chemin de stockage + auteur (pour l'e-mail).
async function getPhotoMeta(
  url: string,
  serviceKey: string,
  id: string,
): Promise<{ storage_path: string; user_id: string } | null> {
  const q = `${url}/rest/v1/fan_photos?id=eq.${encodeURIComponent(id)}&select=storage_path,user_id&limit=1`;
  const res = await fetch(q, { headers: serviceHeaders(serviceKey) });
  if (!res.ok) throw new Error(`lookup failed HTTP ${res.status}: ${await res.text()}`);
  const rows: any[] = await res.json();
  const row = rows[0];
  return row ? { storage_path: row.storage_path, user_id: row.user_id } : null;
}

// Met à jour le statut et renvoie la ligne (pour récupérer user_id), sinon null.
async function patchStatus(url: string, serviceKey: string, id: string, status: string): Promise<any | null> {
  const res = await fetch(`${url}/rest/v1/fan_photos?id=eq.${encodeURIComponent(id)}`, {
    method: "PATCH",
    headers: serviceHeaders(serviceKey, { Prefer: "return=representation" }),
    body: JSON.stringify({ status }),
  });
  if (!res.ok) throw new Error(`patch failed HTTP ${res.status}: ${await res.text()}`);
  const rows: any[] = await res.json();
  return rows[0] ?? null;
}

// Supprime l'objet du bucket. 404 toléré (déjà absent) pour rester idempotent.
async function deleteObject(url: string, serviceKey: string, path: string): Promise<boolean> {
  const res = await fetch(`${url}/storage/v1/object/${BUCKET}/${path}`, {
    method: "DELETE",
    headers: serviceHeaders(serviceKey),
  });
  return res.ok || res.status === 404;
}

// Supprime la ligne fan_photos. Retourne le nombre de lignes supprimées.
async function deleteRow(url: string, serviceKey: string, id: string): Promise<number> {
  const res = await fetch(`${url}/rest/v1/fan_photos?id=eq.${encodeURIComponent(id)}`, {
    method: "DELETE",
    headers: serviceHeaders(serviceKey, { Prefer: "return=representation" }),
  });
  if (!res.ok) throw new Error(`delete failed HTTP ${res.status}: ${await res.text()}`);
  const rows: any[] = await res.json();
  return rows.length;
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
      const photos = await listPhotos(url, serviceKey, status);
      return json({ ok: true, action, status, count: photos.length, photos });
    }

    if (action === "approve") {
      const id = typeof body.id === "string" ? body.id : "";
      if (!UUID_RE.test(id)) return json({ ok: false, error: "invalid_id" }, 400);
      const row = await patchStatus(url, serviceKey, id, "approved");
      if (!row) return json({ ok: false, error: "not_found" }, 404);
      // Notification « photo en ligne » (best effort, ne bloque pas le succès).
      if (row.user_id) await notifyApproved(url, serviceKey, row.user_id);
      return json({ ok: true, action, id, status: "approved" });
    }

    if (action === "reject") {
      const id = typeof body.id === "string" ? body.id : "";
      if (!UUID_RE.test(id)) return json({ ok: false, error: "invalid_id" }, 400);
      const reasonKey = typeof body.reason === "string" ? body.reason : "";
      const reasonText = typeof body.reason_text === "string" ? body.reason_text : "";
      // On récupère l'auteur AVANT de supprimer (l'e-mail en a besoin).
      // Refus = suppression complète : on retire l'objet de stockage PUIS la
      // ligne. Garder une ligne 'rejected' brûlerait un des 3 emplacements du
      // match (le trigger compte toutes les lignes, quel que soit le statut)
      // et laisserait une vignette cassée dans « Tes photos ». La supprimer
      // libère l'emplacement et reflète les onglets admin (en attente / publiées).
      const meta = await getPhotoMeta(url, serviceKey, id);
      if (meta === null) return json({ ok: false, error: "not_found" }, 404);
      await deleteObject(url, serviceKey, meta.storage_path);
      const removed = await deleteRow(url, serviceKey, id);
      if (removed === 0) return json({ ok: false, error: "not_found" }, 404);
      // Notification « voici pourquoi » (best effort, après la suppression).
      // Seulement si une raison est fournie : retirer une photo déjà publiée
      // (onglet « Publiées », sans raison) n'envoie pas d'e-mail.
      if (meta.user_id && (reasonKey || reasonText)) {
        await notifyRejected(url, serviceKey, meta.user_id, reasonKey, reasonText);
      }
      return json({ ok: true, action, id, deleted: true });
    }

    return json({ ok: false, error: "unknown_action" }, 400);
  } catch (err) {
    console.error(err);
    return json({ ok: false, error: "server_error", message: String((err as Error)?.message ?? err) }, 500);
  }
});
