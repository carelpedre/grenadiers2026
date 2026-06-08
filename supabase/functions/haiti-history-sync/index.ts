// haiti-history-sync — admin backfill of Haiti (team 2386) match history into
// haiti_fixtures for the rich 2021+ window. Basic info + score only (cheap:
// one API call per season). Detail stays on-demand. JWT-gated.

const API_BASE = "https://v3.football.api-sports.io";
const DEFAULT_SEASONS = [2021, 2022, 2023, 2024, 2025, 2026];
const TEAM = 2386;

function env() {
  const url = Deno.env.get("SUPABASE_URL");
  const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  const apiKey = Deno.env.get("API_FOOTBALL_KEY");
  if (!url || !serviceKey) throw new Error("Missing SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY");
  if (!apiKey) throw new Error("Missing API_FOOTBALL_KEY");
  return { url, serviceKey, apiKey };
}
const json = (b, s = 200) =>
  new Response(JSON.stringify(b, null, 2), { status: s, headers: { "Content-Type": "application/json" } });

async function apiGet(path, apiKey) {
  const res = await fetch(`${API_BASE}${path}`, { headers: { "x-apisports-key": apiKey } });
  if (!res.ok) throw new Error(`API-Football ${path} -> HTTP ${res.status}`);
  return await res.json();
}

function mapRow(item) {
  const f = item.fixture ?? {}, lg = item.league ?? {}, t = item.teams ?? {}, g = item.goals ?? {};
  return {
    fixture_id: f.id,
    kickoff: f.date ?? null,
    status_short: f.status?.short ?? null,
    status_long: f.status?.long ?? null,
    elapsed: f.status?.elapsed ?? null,
    league_name: lg.name ?? null,
    round: lg.round ?? null,
    venue: f.venue?.name ?? null,
    home_id: t.home?.id ?? null, home_name: t.home?.name ?? null, home_logo: t.home?.logo ?? null,
    away_id: t.away?.id ?? null, away_name: t.away?.name ?? null, away_logo: t.away?.logo ?? null,
    goals_home: g.home ?? null, goals_away: g.away ?? null,
    raw: item,
    updated_at: new Date().toISOString(),
  };
}

async function upsert(url, serviceKey, rows) {
  if (!rows.length) return 0;
  const res = await fetch(`${url}/rest/v1/haiti_fixtures?on_conflict=fixture_id`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json", apikey: serviceKey, Authorization: `Bearer ${serviceKey}`,
      Prefer: "resolution=merge-duplicates,return=minimal",
    },
    body: JSON.stringify(rows),
  });
  if (!res.ok) throw new Error(`upsert HTTP ${res.status}: ${await res.text()}`);
  return rows.length;
}

Deno.serve(async (req) => {
  try {
    const { url, serviceKey, apiKey } = env();
    const qp = new URL(req.url).searchParams;
    const team = Number(qp.get("team") ?? TEAM);
    const seasons = qp.get("seasons")?.split(",").map(Number).filter(Boolean) ?? DEFAULT_SEASONS;

    const per_season = {};
    let total = 0;
    for (const season of seasons) {
      const data = await apiGet(`/fixtures?team=${team}&season=${season}`, apiKey);
      const rows = (data.response ?? []).map(mapRow).filter((r) => r.fixture_id);
      per_season[String(season)] = await upsert(url, serviceKey, rows);
      total += rows.length;
    }
    return json({ ok: true, team, seasons, upserted: total, per_season, at: new Date().toISOString() });
  } catch (err) {
    return json({ ok: false, error: String(err?.message ?? err) }, 500);
  }
});
