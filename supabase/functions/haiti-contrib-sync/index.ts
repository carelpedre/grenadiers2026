// haiti-contrib-sync — aggregates Haiti players' recent-window goals, assists, and
// appearances from match events/lineups into haiti_contributions. Reuses cached
// detail in haiti_fixtures; fetches /fixtures?id= only when lineups are missing,
// and stores that detail back. Resilient + idempotent: safe to re-run (it resumes
// fetching any still-missing detail and recomputes the whole board). JWT-gated.

const API_BASE = "https://v3.football.api-sports.io";
const HAITI = 2386;

function env() {
  const url = Deno.env.get("SUPABASE_URL");
  const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  const apiKey = Deno.env.get("API_FOOTBALL_KEY");
  if (!url || !serviceKey) throw new Error("Missing SUPABASE env");
  if (!apiKey) throw new Error("Missing API_FOOTBALL_KEY");
  return { url, serviceKey, apiKey };
}
const svc = (k, extra = {}) => ({ "Content-Type": "application/json", apikey: k, Authorization: `Bearer ${k}`, ...extra });
const json = (b, s = 200) => new Response(JSON.stringify(b, null, 2), { status: s, headers: { "Content-Type": "application/json" } });
async function apiGet(path, apiKey) {
  const r = await fetch(`${API_BASE}${path}`, { headers: { "x-apisports-key": apiKey } });
  if (!r.ok) throw new Error(`API ${path} HTTP ${r.status}`);
  return await r.json();
}
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function getFinished(url, k) {
  const sel = "fixture_id,kickoff,events,lineups";
  const r = await fetch(`${url}/rest/v1/haiti_fixtures?status_short=in.(FT,AET,PEN)&select=${sel}&order=kickoff.asc`, { headers: svc(k) });
  if (!r.ok) throw new Error(`read fixtures HTTP ${r.status}`);
  return await r.json();
}
async function storeDetail(url, k, id, item) {
  const body = { events: item.events ?? [], lineups: item.lineups ?? [], statistics: item.statistics ?? [], players: item.players ?? [], detail_updated_at: new Date().toISOString() };
  await fetch(`${url}/rest/v1/haiti_fixtures?fixture_id=eq.${id}`, { method: "PATCH", headers: svc(k, { Prefer: "return=minimal" }), body: JSON.stringify(body) });
}

function aggregate(fixtures) {
  const agg = {};
  const touch = (id, name) => {
    if (id == null) return null;
    const key = String(id);
    if (!agg[key]) agg[key] = { player_id: Number(id), player_name: name ?? null, goals: 0, assists: 0, appearances: 0, last_goal_date: null };
    if (name && !agg[key].player_name) agg[key].player_name = name;
    return agg[key];
  };
  for (const fx of fixtures) {
    const events = fx.events || [];
    const lineups = fx.lineups || [];
    const date = (fx.kickoff || "").slice(0, 10);
    for (const e of events) {
      if (e?.type !== "Goal") continue;
      if (Number(e?.team?.id) !== HAITI) continue;
      if ((e?.detail || "") === "Own Goal") continue;
      const sc = touch(e?.player?.id, e?.player?.name);
      if (sc) { sc.goals++; if (date > (sc.last_goal_date || "")) sc.last_goal_date = date; }
      if (e?.assist?.id != null) { const as = touch(e.assist.id, e.assist.name); if (as) as.assists++; }
    }
    const hl = lineups.find((l) => Number(l?.team?.id) === HAITI);
    if (hl) {
      const startIds = new Set((hl.startXI || []).map((p) => String(p?.player?.id)));
      const appeared = new Set(startIds);
      for (const p of (hl.startXI || [])) touch(p?.player?.id, p?.player?.name);
      for (const e of events) {
        if (e?.type !== "subst") continue;
        if (Number(e?.team?.id) !== HAITI) continue;
        const a = { id: e?.player?.id, name: e?.player?.name };
        const b = { id: e?.assist?.id, name: e?.assist?.name };
        const cand = !startIds.has(String(a.id)) ? a : (!startIds.has(String(b.id)) ? b : null);
        if (cand && cand.id != null) { appeared.add(String(cand.id)); touch(cand.id, cand.name); }
      }
      for (const id of appeared) { const rec = agg[id]; if (rec) rec.appearances++; }
    }
  }
  return Object.values(agg);
}

async function replaceContrib(url, k, rows, meta) {
  await fetch(`${url}/rest/v1/haiti_contributions?player_id=gte.0`, { method: "DELETE", headers: svc(k, { Prefer: "return=minimal" }) });
  if (!rows.length) return;
  const payload = rows.map((r) => ({ ...r, matches_counted: meta.matches, window_from: meta.from, window_to: meta.to, updated_at: new Date().toISOString() }));
  const r = await fetch(`${url}/rest/v1/haiti_contributions`, { method: "POST", headers: svc(k, { Prefer: "return=minimal" }), body: JSON.stringify(payload) });
  if (!r.ok) throw new Error(`insert HTTP ${r.status}: ${await r.text()}`);
}

Deno.serve(async () => {
  try {
    const { url, serviceKey, apiKey } = env();
    const fixtures = await getFinished(url, serviceKey);
    let fetched = 0;
    for (const fx of fixtures) {
      if (Array.isArray(fx.lineups) && fx.lineups.length > 0) continue;
      try {
        const item = (await apiGet(`/fixtures?id=${fx.fixture_id}`, apiKey)).response?.[0];
        if (item) { await storeDetail(url, serviceKey, fx.fixture_id, item); fx.events = item.events ?? []; fx.lineups = item.lineups ?? []; fetched++; }
      } catch (_e) { /* leave for a re-run */ }
      await sleep(200);
    }
    const rows = aggregate(fixtures);
    const dates = fixtures.map((f) => (f.kickoff || "").slice(0, 10)).filter(Boolean).sort();
    const meta = { matches: fixtures.length, from: dates[0] ?? null, to: dates[dates.length - 1] ?? null };
    await replaceContrib(url, serviceKey, rows, meta);
    const top = rows.slice().sort((a, b) => (b.goals - a.goals) || (b.assists - a.assists)).slice(0, 12);
    return json({ ok: true, matches: fixtures.length, detail_fetched: fetched, players: rows.length,
      top_scorers: top.map((r) => ({ name: r.player_name, goals: r.goals, assists: r.assists, apps: r.appearances })) });
  } catch (err) {
    return json({ ok: false, error: String(err?.message ?? err) }, 500);
  }
});
