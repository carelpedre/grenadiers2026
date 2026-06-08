// wc-h2h — public scouting endpoint. GET ?id=<opponentTeamId>. Returns Haiti's
// head-to-head record + that opponent's last-5 form. Cached in scouting_cache
// (12h TTL) so repeated views don't burn API quota. Only the 3 WC opponents
// are allowed, so it can't be abused for arbitrary teams.

const API_BASE = "https://v3.football.api-sports.io";
const HAITI = 2386;
const ALLOWED = new Set([1108, 6, 31]); // Scotland, Brazil, Morocco
const TTL_MS = 12 * 60 * 60 * 1000;

const CORS = { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Methods": "GET, OPTIONS", "Access-Control-Allow-Headers": "authorization, apikey, content-type" };
const json = (b, s = 200) => new Response(JSON.stringify(b), { status: s, headers: { "Content-Type": "application/json", "Cache-Control": "public, max-age=300", ...CORS } });

function env() {
  const url = Deno.env.get("SUPABASE_URL");
  const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  const apiKey = Deno.env.get("API_FOOTBALL_KEY");
  if (!url || !serviceKey) throw new Error("Missing SUPABASE env");
  if (!apiKey) throw new Error("Missing API_FOOTBALL_KEY");
  return { url, serviceKey, apiKey };
}
const svc = (k, extra = {}) => ({ "Content-Type": "application/json", apikey: k, Authorization: `Bearer ${k}`, ...extra });
async function apiGet(path, apiKey) {
  const r = await fetch(`${API_BASE}${path}`, { headers: { "x-apisports-key": apiKey } });
  if (!r.ok) throw new Error(`API ${path} HTTP ${r.status}`);
  return await r.json();
}
async function readCache(url, k, id) {
  const r = await fetch(`${url}/rest/v1/scouting_cache?opponent_id=eq.${id}&select=payload,updated_at`, { headers: svc(k) });
  if (!r.ok) return null;
  const rows = await r.json();
  return rows[0] ?? null;
}
async function writeCache(url, k, id, payload) {
  await fetch(`${url}/rest/v1/scouting_cache?on_conflict=opponent_id`, {
    method: "POST",
    headers: svc(k, { Prefer: "resolution=merge-duplicates,return=minimal" }),
    body: JSON.stringify({ opponent_id: id, payload, updated_at: new Date().toISOString() }),
  });
}
function buildH2H(items) {
  let played = 0, w = 0, d = 0, l = 0, gf = 0, ga = 0;
  const meetings = [];
  for (const it of items) {
    const h = it.teams?.home, g = it.goals ?? {};
    if (g.home == null || g.away == null) continue;
    const haitiHome = h?.id === HAITI;
    const hgf = haitiHome ? g.home : g.away, hga = haitiHome ? g.away : g.home;
    played++; gf += hgf; ga += hga;
    if (hgf > hga) w++; else if (hgf === hga) d++; else l++;
    meetings.push({ date: it.fixture?.date, competition: it.league?.name, haiti_gf: hgf, haiti_ga: hga, res: hgf > hga ? "V" : hgf === hga ? "N" : "D" });
  }
  meetings.sort((x, y) => (y.date || "").localeCompare(x.date || ""));
  return { played, haiti_wins: w, draws: d, haiti_losses: l, gf, ga, last_meetings: meetings.slice(0, 5) };
}
function buildForm(oppId, items) {
  const rows = items.map((it) => {
    const h = it.teams?.home, a = it.teams?.away, g = it.goals ?? {};
    const isHome = h?.id === oppId;
    const gf = isHome ? g.home : g.away, gc = isHome ? g.away : g.home;
    return { date: it.fixture?.date, opponent: isHome ? a?.name : h?.name, home_away: isHome ? "dom" : "ext", gf, ga: gc, res: gf > gc ? "V" : gf === gc ? "N" : "D" };
  }).filter((r) => r.gf != null);
  rows.sort((x, y) => (y.date || "").localeCompare(x.date || ""));
  const last5 = rows.slice(0, 5);
  return { last5, form: last5.map((r) => r.res).reverse().join("") };
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: CORS });
  try {
    const id = Number(new URL(req.url).searchParams.get("id"));
    if (!id || Number.isNaN(id)) return json({ ok: false, error: "missing id" }, 400);
    if (!ALLOWED.has(id)) return json({ ok: false, error: "opponent not allowed" }, 403);
    const { url, serviceKey, apiKey } = env();

    const cached = await readCache(url, serviceKey, id);
    if (cached?.updated_at && (Date.now() - Date.parse(cached.updated_at) < TTL_MS)) {
      return json({ ok: true, cached: true, ...cached.payload });
    }

    const h2hData = await apiGet(`/fixtures/headtohead?h2h=${HAITI}-${id}`, apiKey);
    const formData = await apiGet(`/fixtures?team=${id}&last=5`, apiKey);

    let oppName = null, oppLogo = null;
    for (const it of (formData.response ?? [])) {
      for (const side of ["home", "away"]) { const t = it.teams?.[side]; if (t?.id === id) { oppName = t.name; oppLogo = t.logo; break; } }
      if (oppName) break;
    }

    const payload = {
      opponent: { id, name: oppName, logo: oppLogo },
      h2h: buildH2H(h2hData.response ?? []),
      opponent_form: buildForm(id, formData.response ?? []),
      cached_at: new Date().toISOString(),
    };
    await writeCache(url, serviceKey, id, payload);
    return json({ ok: true, cached: false, ...payload });
  } catch (err) {
    return json({ ok: false, error: String(err?.message ?? err) }, 500);
  }
});
