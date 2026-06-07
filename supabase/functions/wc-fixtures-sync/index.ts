// wc-fixtures-sync — full FIFA World Cup 2026 sync.
// Pulls the ENTIRE tournament into public.wc_fixtures and public.wc_standings.
// Separate from the Haiti tables, so grenadiers2026.com is untouched.
//   default / {}    full sync: all standings + all fixtures (paginated)
//   {"mode":"live"} today's matches only, volatile fields (gated cron)

const API_BASE = "https://v3.football.api-sports.io";
const WC_LEAGUE_ID = 1;
const WC_SEASON = 2026;

function jsonResponse(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json" } });
}
function supabaseEnv() {
  const url = Deno.env.get("SUPABASE_URL");
  const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  if (!url || !serviceKey) throw new Error("Missing SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY");
  return { url, serviceKey };
}
function serviceHeaders(serviceKey: string, extra: Record<string, string> = {}) {
  return { "Content-Type": "application/json", apikey: serviceKey, Authorization: `Bearer ${serviceKey}`, ...extra };
}
async function apiGet(path: string, apiKey: string): Promise<any> {
  const res = await fetch(`${API_BASE}${path}`, { headers: { "x-apisports-key": apiKey } });
  if (!res.ok) throw new Error(`API-Football ${path} -> HTTP ${res.status}`);
  const json = await res.json();
  const errCount = Array.isArray(json?.errors) ? json.errors.length : Object.keys(json?.errors ?? {}).length;
  if (errCount) throw new Error(`API-Football ${path} errors: ${JSON.stringify(json.errors)}`);
  return json;
}
async function upsert(table: string, rows: any[], onConflict: string): Promise<number> {
  if (rows.length === 0) return 0;
  const { url, serviceKey } = supabaseEnv();
  const res = await fetch(`${url}/rest/v1/${table}?on_conflict=${onConflict}`, {
    method: "POST",
    headers: serviceHeaders(serviceKey, { Prefer: "resolution=merge-duplicates,return=minimal" }),
    body: JSON.stringify(rows),
  });
  if (!res.ok) throw new Error(`${table} upsert HTTP ${res.status}: ${await res.text()}`);
  return rows.length;
}
function mapStanding(r: any, groupName: string | null) {
  return {
    team_id: r.team?.id ?? null, group_name: groupName, rank: r.rank ?? null,
    team_name: r.team?.name ?? null, team_logo: r.team?.logo ?? null,
    played: r.all?.played ?? 0, win: r.all?.win ?? 0, draw: r.all?.draw ?? 0, lose: r.all?.lose ?? 0,
    goals_for: r.all?.goals?.for ?? 0, goals_against: r.all?.goals?.against ?? 0,
    goals_diff: r.goalsDiff ?? 0, points: r.points ?? 0, form: r.form ?? null,
    raw: r, updated_at: new Date().toISOString(),
  };
}

// Dedupe by team_id (PK). The WC standings include an extra "third-placed
// teams" ranking that re-lists teams already in their group, which would
// otherwise cause a cardinality violation on upsert. Prefer the real
// "Group X" row over any cross-ranking row.
async function fetchStandings(apiKey: string) {
  const json = await apiGet(`/standings?league=${WC_LEAGUE_ID}&season=${WC_SEASON}`, apiKey);
  const groups: any[] = json.response?.[0]?.league?.standings ?? [];
  const byTeam = new Map<number, any>();
  const meta = new Map<number, { real: boolean; group: string | null }>();
  for (const grp of groups) {
    const list = Array.isArray(grp) ? grp : [grp];
    for (const r of list) {
      const tid = r.team?.id;
      if (tid == null) continue;
      const groupName = r.group ?? null;
      const real = typeof groupName === "string" && /^group\s/i.test(groupName);
      const prev = meta.get(tid);
      if (!prev || (real && !prev.real)) {
        byTeam.set(tid, mapStanding(r, groupName));
        meta.set(tid, { real, group: groupName });
      }
    }
  }
  const rows = [...byTeam.values()];
  const groupMap = new Map<number, string | null>();
  for (const [tid, m] of meta) groupMap.set(tid, m.group);
  return { rows, groupMap };
}

function mapFixture(item: any, groupMap: Map<number, string | null>) {
  const f = item.fixture ?? {};
  const league = item.league ?? {};
  const teams = item.teams ?? {};
  const goals = item.goals ?? {};
  const homeId = teams.home?.id ?? null;
  const awayId = teams.away?.id ?? null;
  const venueName = f.venue?.name ?? null;
  const venueCity = f.venue?.city ?? null;
  const grp = (homeId != null && groupMap.get(homeId)) || (awayId != null && groupMap.get(awayId)) || null;
  return {
    fixture_id: f.id ?? null, kickoff: f.date ?? null,
    status_short: f.status?.short ?? null, status_long: f.status?.long ?? null, elapsed: f.status?.elapsed ?? null,
    round: league.round ?? null, group_name: grp, league_name: league.name ?? null,
    venue: [venueName, venueCity].filter(Boolean).join(", ") || null,
    home_id: homeId, home_name: teams.home?.name ?? null, home_logo: teams.home?.logo ?? null,
    away_id: awayId, away_name: teams.away?.name ?? null, away_logo: teams.away?.logo ?? null,
    goals_home: goals.home ?? null, goals_away: goals.away ?? null,
    raw: item, updated_at: new Date().toISOString(),
  };
}

// Fetch all fixtures. The /fixtures endpoint rejects an explicit page param
// on the first request, so fetch page 1 plainly, then paginate only if the
// API reports more than one page.
async function fetchAllFixtures(apiKey: string): Promise<any[]> {
  const first = await apiGet(`/fixtures?league=${WC_LEAGUE_ID}&season=${WC_SEASON}`, apiKey);
  const items: any[] = [...(first.response ?? [])];
  const total = first.paging?.total ?? 1;
  for (let page = 2; page <= total && page <= 6; page++) {
    const json = await apiGet(`/fixtures?league=${WC_LEAGUE_ID}&season=${WC_SEASON}&page=${page}`, apiKey);
    for (const it of (json.response ?? [])) items.push(it);
  }
  return items;
}

async function runFull(apiKey: string): Promise<Response> {
  const { rows: standRows, groupMap } = await fetchStandings(apiKey);
  const standUpserted = await upsert("wc_standings", standRows, "team_id");
  const items = await fetchAllFixtures(apiKey);
  const rows = items.map((it) => mapFixture(it, groupMap)).filter((r) => r.fixture_id != null);
  const deduped = Array.from(new Map(rows.map((r) => [r.fixture_id, r])).values());
  const fxUpserted = await upsert("wc_fixtures", deduped, "fixture_id");
  return jsonResponse({ ok: true, mode: "full", fixtures: fxUpserted, standings: standUpserted });
}

async function runLive(apiKey: string): Promise<Response> {
  const today = new Date().toISOString().slice(0, 10);
  const fx = await apiGet(`/fixtures?league=${WC_LEAGUE_ID}&season=${WC_SEASON}&date=${today}`, apiKey);
  const items: any[] = fx.response ?? [];
  const rows = items.map((it) => {
    const f = it.fixture ?? {};
    const goals = it.goals ?? {};
    return {
      fixture_id: f.id ?? null, status_short: f.status?.short ?? null, status_long: f.status?.long ?? null,
      elapsed: f.status?.elapsed ?? null, goals_home: goals.home ?? null, goals_away: goals.away ?? null,
      raw: it, updated_at: new Date().toISOString(),
    };
  }).filter((r) => r.fixture_id != null);
  const fxUpserted = await upsert("wc_fixtures", rows, "fixture_id");
  let standUpserted = 0;
  try {
    const { rows: standRows } = await fetchStandings(apiKey);
    standUpserted = await upsert("wc_standings", standRows, "team_id");
  } catch (err) { console.error("live standings refresh failed:", err); }
  return jsonResponse({ ok: true, mode: "live", date: today, fixtures: fxUpserted, standings: standUpserted });
}

Deno.serve(async (req) => {
  try {
    const apiKey = Deno.env.get("API_FOOTBALL_KEY");
    if (!apiKey) return jsonResponse({ ok: false, error: "API_FOOTBALL_KEY is not set" }, 500);
    const body = await req.json().catch(() => ({}));
    if (body?.mode === "live") return await runLive(apiKey);
    return await runFull(apiKey);
  } catch (err) {
    console.error(err);
    return jsonResponse({ ok: false, error: String((err as Error)?.message ?? err) }, 500);
  }
});
