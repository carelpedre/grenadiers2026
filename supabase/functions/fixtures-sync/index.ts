// ╔══════════════════════════════════════════════════════════════════╗
// ║  fixtures-sync — Haiti fixtures, results & live scoring            ║
// ║                                                                    ║
// ║  Two modes (POST body):                                            ║
// ║   • default / {}        full sync — next=10 + last=5 (every 2 h)   ║
// ║   • {"mode":"live"}     poll only in-window (live) fixtures, fast  ║
// ║                         (gated 1-min cron — costs nothing off-match)║
// ║                                                                    ║
// ║  Secrets / env:                                                    ║
// ║    API_FOOTBALL_KEY          — Supabase secret (NEVER hardcoded)   ║
// ║    SUPABASE_URL              — injected by the runtime             ║
// ║    SUPABASE_SERVICE_ROLE_KEY — injected; bypasses RLS for writes   ║
// ╚══════════════════════════════════════════════════════════════════╝

const API_BASE = "https://v3.football.api-sports.io";

// Haiti men's national team ID in API-Football, resolved once via
// GET /teams?search=Haiti (country = "Haiti", national = true) and hardcoded
// here so we don't spend a daily request resolving it on every run.
// Fallback: if this is ever null, the function resolves it at runtime and
// logs the value.
const HAITI_TEAM_ID: number | null = 2386;

const UPCOMING_COUNT = 10;
const RESULTS_COUNT = 5;

// Squad player ids (= squad.js `apiId`). Used by the "players" mode to pull
// each player's current club + season stats from /players?id=&season=.
// International caps are NOT exposed by the API and stay manual in squad.js.
const SQUAD_PLAYER_IDS: number[] = [
  87789, 174768, 123742, // GK: Placide, Alexandre Pierre, Duverger
  12303, 20850, 190747, 20655, 102505, 275367, 1411, 573613, 20538, // DEF
  338367, 237142, 20665, 371050, 194242, // MID
  45020, 8601, 50958, 128766, 162733, 174915, 48535, 84087, 21613, // FWD/MID
];
// European club seasons run Aug→May, so season "2025" = 2025-26. We try that
// first, then fall back to 2026 for calendar-year leagues (MLS, South America).
const PLAYER_SEASON_DEFAULT = 2025;

// Live window: a fixture is "in play" (worth polling) from kickoff-imminent
// until it reaches a terminal status. Mirrors the gated cron predicate exactly.
const TERMINAL_STATUSES = ["FT", "AET", "PEN", "PST", "CANC", "ABD", "AWD", "WO"];
const FINISHED_STATUSES = ["FT", "AET", "PEN"]; // played to completion
const WINDOW_BEFORE_MS = 3 * 60 * 60 * 1000; // now - 3h
const WINDOW_AFTER_MS = 5 * 60 * 1000; // now + 5min
// Keep polling a finished match until ~match length + 15 min after kickoff, so the
// id-based fetch captures the COMPLETE final events/lineups/stats after the whistle.
const POST_FINISH_WINDOW_MS = (2 * 60 + 15) * 60 * 1000; // ~2h15 from kickoff

function jsonResponse(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

function supabaseEnv() {
  const url = Deno.env.get("SUPABASE_URL");
  const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  if (!url || !serviceKey) {
    throw new Error("Missing SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY");
  }
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

async function apiGet(path: string, apiKey: string): Promise<any> {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { "x-apisports-key": apiKey },
  });
  if (!res.ok) {
    throw new Error(`API-Football ${path} -> HTTP ${res.status}`);
  }
  const json = await res.json();
  if (Array.isArray(json?.errors) ? json.errors.length : Object.keys(json?.errors ?? {}).length) {
    throw new Error(`API-Football ${path} errors: ${JSON.stringify(json.errors)}`);
  }
  return json;
}

// GET /teams?search=Haiti → pick the Haiti national team.
async function resolveHaitiTeamId(apiKey: string): Promise<number> {
  const json = await apiGet(`/teams?search=Haiti`, apiKey);
  const list: any[] = json.response ?? [];
  const match =
    list.find((t) => t.team?.country === "Haiti" && t.team?.national === true) ??
    list.find((t) => t.team?.country === "Haiti") ??
    list[0];
  const id = match?.team?.id;
  if (!id) throw new Error("Could not resolve Haiti team id from /teams?search=Haiti");
  return id;
}

// Full-sync row (next/last): scheduling/score/team columns only. It deliberately
// omits raw/events/lineups/statistics/players so the merge-duplicates upsert
// preserves the rich data written by the id-based fetch (full-sync clobber fix).
function mapFixture(item: any) {
  const f = item.fixture ?? {};
  const league = item.league ?? {};
  const teams = item.teams ?? {};
  const goals = item.goals ?? {};
  const venueName = f.venue?.name ?? null;
  const venueCity = f.venue?.city ?? null;
  return {
    fixture_id: f.id ?? null,
    kickoff: f.date ?? null,
    status_short: f.status?.short ?? null,
    status_long: f.status?.long ?? null,
    elapsed: f.status?.elapsed ?? null,
    league_name: league.name ?? null,
    round: league.round ?? null,
    venue: [venueName, venueCity].filter(Boolean).join(", ") || null,
    home_id: teams.home?.id ?? null,
    home_name: teams.home?.name ?? null,
    home_logo: teams.home?.logo ?? null,
    away_id: teams.away?.id ?? null,
    away_name: teams.away?.name ?? null,
    away_logo: teams.away?.logo ?? null,
    goals_home: goals.home ?? null,
    goals_away: goals.away ?? null,
    updated_at: new Date().toISOString(),
  };
}

// Id-based fetch row (/fixtures?id=). Volatile score/status PLUS the rich
// sub-objects — only this path writes raw/events/lineups/statistics/players,
// so the full sync can never erase them.
function mapLiveFields(item: any) {
  const f = item.fixture ?? {};
  const goals = item.goals ?? {};
  return {
    fixture_id: f.id ?? null,
    goals_home: goals.home ?? null,
    goals_away: goals.away ?? null,
    status_short: f.status?.short ?? null,
    status_long: f.status?.long ?? null,
    elapsed: f.status?.elapsed ?? null,
    raw: item,
    events: item.events ?? null,
    lineups: item.lineups ?? null,
    statistics: item.statistics ?? null,
    players: item.players ?? null,
    updated_at: new Date().toISOString(),
  };
}

// Extract goal scorers from an API-Football events array.
function extractScorers(events: any[]) {
  return (events ?? [])
    .filter((e) => e?.type === "Goal" && e?.detail !== "Missed Penalty")
    .map((e) => ({
      player: e.player?.name ?? "—",
      team: e.team?.id === HAITI_TEAM_ID ? "haiti" : "opp",
      minute: e.time?.elapsed ?? null,
      extra: e.time?.extra ?? null,
      detail: e.detail ?? null, // "Normal Goal" | "Penalty" | "Own Goal"…
      assist: e.assist?.name ?? null,
    }))
    .sort(
      (a, b) =>
        (a.minute ?? 0) + (a.extra ?? 0) - ((b.minute ?? 0) + (b.extra ?? 0)),
    );
}

// Goal scorers for a row. Uses events already present on the raw fixture
// (live single-fixture calls include them); otherwise fetches /fixtures/events.
// Skipped entirely when no goals have been scored (no extra API call).
async function attachScorers(row: any, apiKey: string) {
  const total = (row.goals_home ?? 0) + (row.goals_away ?? 0);
  if (total <= 0) return [];
  let events: any[] | null = Array.isArray(row.events)
    ? row.events
    : Array.isArray(row.raw?.events)
      ? row.raw.events
      : null;
  if (!events || events.length === 0) {
    try {
      const json = await apiGet(`/fixtures/events?fixture=${row.fixture_id}`, apiKey);
      events = json.response ?? [];
    } catch {
      events = [];
    }
  }
  return extractScorers(events);
}

// Upsert rows into public.haiti_fixtures via PostgREST (service-role key).
// With merge-duplicates, only the columns present in each row are written.
async function upsertFixtures(rows: any[]): Promise<number> {
  if (rows.length === 0) return 0;
  const { url, serviceKey } = supabaseEnv();
  const res = await fetch(`${url}/rest/v1/haiti_fixtures?on_conflict=fixture_id`, {
    method: "POST",
    headers: serviceHeaders(serviceKey, {
      Prefer: "resolution=merge-duplicates,return=minimal",
    }),
    body: JSON.stringify(rows),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Upsert failed HTTP ${res.status}: ${text}`);
  }
  return rows.length;
}

// Fixtures worth polling by id (same window as the gated cron):
//   • not-yet-terminal with kickoff in [now-3h, now+5min]  (imminent + live)
//   • recently finished (FT/AET/PEN) — kept ~15 min past the approximate final
//     whistle so the id-based fetch runs a few more times and captures the
//     COMPLETE final events / lineups / statistics, then stops.
async function fetchInWindowFixtureIds(): Promise<number[]> {
  const { url, serviceKey } = supabaseEnv();
  const now = Date.now();
  // Broad query by kickoff (superset), then filter precisely in JS.
  const from = new Date(now - WINDOW_BEFORE_MS).toISOString();
  const to = new Date(now + WINDOW_AFTER_MS).toISOString();
  const q =
    `${url}/rest/v1/haiti_fixtures?select=fixture_id,status_short,kickoff` +
    `&kickoff=gte.${encodeURIComponent(from)}` +
    `&kickoff=lte.${encodeURIComponent(to)}`;
  const res = await fetch(q, { headers: serviceHeaders(serviceKey) });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`In-window query failed HTTP ${res.status}: ${text}`);
  }
  const rows: any[] = await res.json();
  return rows
    .filter((r) => {
      if (!r.kickoff || r.fixture_id == null) return false;
      const kt = new Date(r.kickoff).getTime();
      const terminal = TERMINAL_STATUSES.includes(r.status_short);
      if (!terminal) return true; // imminent or live (kickoff already bounded)
      // Recently finished: keep polling until ~15 min past the approx final whistle.
      if (FINISHED_STATUSES.includes(r.status_short)) {
        return now - kt <= POST_FINISH_WINDOW_MS;
      }
      return false; // PST/CANC/ABD/AWD/WO — nothing to poll
    })
    .map((r) => r.fixture_id);
}

// ─── Full sync (default): next=10 + last=5 ───────────────────────────
async function runFullSync(apiKey: string): Promise<Response> {
  let teamId = HAITI_TEAM_ID;
  let resolvedAtRuntime = false;
  if (!teamId) {
    teamId = await resolveHaitiTeamId(apiKey);
    resolvedAtRuntime = true;
    console.log(
      `Resolved Haiti team id = ${teamId}. ` +
        `Hardcode this as HAITI_TEAM_ID to save one request per run.`,
    );
  }

  const [upcoming, results] = await Promise.all([
    apiGet(`/fixtures?team=${teamId}&next=${UPCOMING_COUNT}`, apiKey),
    apiGet(`/fixtures?team=${teamId}&last=${RESULTS_COUNT}`, apiKey),
  ]);

  const items = [...(upcoming.response ?? []), ...(results.response ?? [])];
  const rows = items.map(mapFixture).filter((r) => r.fixture_id != null);
  const deduped = Array.from(new Map(rows.map((r) => [r.fixture_id, r])).values());
  await Promise.all(
    deduped.map(async (row) => {
      row.scorers = await attachScorers(row, apiKey);
    }),
  );
  const upserted = await upsertFixtures(deduped);
  const standings = await syncStandings(apiKey);

  return jsonResponse({
    ok: true,
    mode: "full",
    team_id: teamId,
    resolved_at_runtime: resolvedAtRuntime,
    upcoming: upcoming.response?.length ?? 0,
    results: results.response?.length ?? 0,
    upserted,
    standings,
  });
}

// ─── Live sync: poll only in-window fixtures, upsert volatile fields ──
async function runLiveSync(apiKey: string): Promise<Response> {
  const ids = await fetchInWindowFixtureIds();
  if (ids.length === 0) {
    // Nothing live — no API call spent.
    return jsonResponse({ ok: true, mode: "live", live_fixtures: 0 });
  }

  const items: any[] = [];
  for (const id of ids) {
    const json = await apiGet(`/fixtures?id=${id}`, apiKey);
    const item = json.response?.[0];
    if (item) items.push(item);
  }

  const rows = items.map(mapLiveFields).filter((r) => r.fixture_id != null);
  await Promise.all(
    rows.map(async (row) => {
      row.scorers = await attachScorers(row, apiKey);
    }),
  );
  const upserted = await upsertFixtures(rows);
  // Refresh Group C standings during match windows (they change at full-time).
  const standings = await syncStandings(apiKey);

  return jsonResponse({
    ok: true,
    mode: "live",
    live_fixtures: ids.length,
    upserted,
    standings,
    fixtures: rows.map((r) => ({
      id: r.fixture_id,
      status: r.status_short,
      elapsed: r.elapsed,
      score: `${r.goals_home ?? 0}-${r.goals_away ?? 0}`,
    })),
  });
}

// ─── Group C standings (FIFA World Cup) ──────────────────────────────
const WC_LEAGUE_ID = 1; // FIFA World Cup in API-Football
const WC_SEASON = 2026;
const GROUP_C = "Group C";

function extractGroup(standings: any[], groupName: string) {
  for (const grp of standings ?? []) {
    if (Array.isArray(grp) && grp.length && grp[0]?.group === groupName) return grp;
  }
  return (standings ?? []).flat().filter((r: any) => r?.group === groupName);
}

function mapStandingRow(r: any) {
  return {
    team_id: r.team?.id ?? null,
    rank: r.rank ?? null,
    team_name: r.team?.name ?? null,
    team_logo: r.team?.logo ?? null,
    played: r.all?.played ?? 0,
    win: r.all?.win ?? 0,
    draw: r.all?.draw ?? 0,
    lose: r.all?.lose ?? 0,
    goals_for: r.all?.goals?.for ?? 0,
    goals_against: r.all?.goals?.against ?? 0,
    goals_diff: r.goalsDiff ?? 0,
    points: r.points ?? 0,
    raw: r,
    updated_at: new Date().toISOString(),
  };
}

async function fetchGroupCStandings(apiKey: string, league = WC_LEAGUE_ID, season = WC_SEASON) {
  const json = await apiGet(`/standings?league=${league}&season=${season}`, apiKey);
  const leagueObj = json.response?.[0]?.league;
  const groups = leagueObj?.standings ?? [];
  const rows = extractGroup(groups, GROUP_C)
    .map(mapStandingRow)
    .filter((r: any) => r.team_id != null);
  return { leagueName: leagueObj?.name ?? null, season: leagueObj?.season ?? null, groupCount: groups.length, rows };
}

async function upsertStandings(rows: any[]): Promise<number> {
  if (rows.length === 0) return 0;
  const { url, serviceKey } = supabaseEnv();
  const res = await fetch(`${url}/rest/v1/group_c_standings?on_conflict=team_id`, {
    method: "POST",
    headers: serviceHeaders(serviceKey, {
      Prefer: "resolution=merge-duplicates,return=minimal",
    }),
    body: JSON.stringify(rows),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Standings upsert failed HTTP ${res.status}: ${text}`);
  }
  return rows.length;
}

// Fetch + store Group C standings. Best-effort: failures are logged, not thrown,
// so a standings hiccup never breaks the fixtures sync.
async function syncStandings(apiKey: string): Promise<number> {
  try {
    const { rows } = await fetchGroupCStandings(apiKey);
    return await upsertStandings(rows);
  } catch (err) {
    console.error("syncStandings failed:", err);
    return 0;
  }
}

// ─── Player stats (current club + season totals) ─────────────────────
//
// For each squad player we call /players?id=&season= and reduce the season's
// `statistics[]` (one entry per competition) down to a single "current club"
// block: appearances / minutes / goals / assists / average rating, plus the
// club name + logo. National-team rows (Haiti) are excluded so the club logo
// is genuinely the player's club, never the federation crest.
function num(v: any): number {
  const n = Number(v);
  return Number.isFinite(n) ? n : 0;
}

function hasClubStats(item: any): boolean {
  const stats: any[] = item?.statistics ?? [];
  return stats.some(
    (s) => s?.team?.id && s.team.id !== HAITI_TEAM_ID && num(s?.games?.appearences) > 0,
  );
}

function buildPlayerRow(item: any, season: number) {
  const player = item?.player ?? {};
  const stats: any[] = item?.statistics ?? [];
  // Keep club competitions only: drop national-team rows AND friendly matches
  // (friendlies aren't meaningful season stats and skew the "primary club").
  const club = stats.filter(
    (s) =>
      s?.team?.id &&
      s.team.id !== HAITI_TEAM_ID &&
      !/friendl/i.test(s?.league?.name ?? ""),
  );

  // Group by club, summing across competitions (league + domestic cups + CL…).
  const byTeam = new Map<number, any>();
  for (const s of club) {
    const id = s.team.id;
    const apps = num(s?.games?.appearences);
    const g = byTeam.get(id) ?? {
      club_id: id,
      club_name: s.team?.name ?? null,
      club_logo: s.team?.logo ?? null,
      league_name: s.league?.name ?? null,
      appearances: 0,
      minutes: 0,
      goals: 0,
      assists: 0,
      _ratingSum: 0,
      _ratingApps: 0,
      _topApps: 0,
    };
    g.appearances += apps;
    g.minutes += num(s?.games?.minutes);
    g.goals += num(s?.goals?.total);
    g.assists += num(s?.goals?.assists);
    const r = parseFloat(s?.games?.rating);
    if (Number.isFinite(r) && apps > 0) {
      g._ratingSum += r * apps;
      g._ratingApps += apps;
    }
    // League name = the competition where the player featured most.
    if (apps >= g._topApps) {
      g._topApps = apps;
      g.league_name = s.league?.name ?? g.league_name;
    }
    byTeam.set(id, g);
  }

  // Primary club = most minutes played this season.
  const primary = [...byTeam.values()].sort((a, b) => b.minutes - a.minutes)[0] ?? null;
  const rating =
    primary && primary._ratingApps > 0
      ? Math.round((primary._ratingSum / primary._ratingApps) * 100) / 100
      : null;

  return {
    player_id: player.id ?? null,
    player_name: player.name ?? null,
    photo: player.photo ?? null,
    club_id: primary?.club_id ?? null,
    club_name: primary?.club_name ?? null,
    club_logo: primary?.club_logo ?? null,
    league_name: primary?.league_name ?? null,
    season,
    appearances: primary?.appearances ?? 0,
    minutes: primary?.minutes ?? 0,
    goals: primary?.goals ?? 0,
    assists: primary?.assists ?? 0,
    rating,
    raw: item,
    updated_at: new Date().toISOString(),
  };
}

async function fetchPlayerSeason(id: number, season: number, apiKey: string): Promise<any | null> {
  try {
    const json = await apiGet(`/players?id=${id}&season=${season}`, apiKey);
    return json.response?.[0] ?? null;
  } catch (err) {
    console.error(`/players?id=${id}&season=${season} failed:`, err);
    return null;
  }
}

async function upsertPlayerStats(rows: any[]): Promise<number> {
  if (rows.length === 0) return 0;
  const { url, serviceKey } = supabaseEnv();
  const res = await fetch(`${url}/rest/v1/haiti_player_stats?on_conflict=player_id`, {
    method: "POST",
    headers: serviceHeaders(serviceKey, {
      Prefer: "resolution=merge-duplicates,return=minimal",
    }),
    body: JSON.stringify(rows),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Player-stats upsert failed HTTP ${res.status}: ${text}`);
  }
  return rows.length;
}

async function runPlayerStatsSync(apiKey: string, body: any): Promise<Response> {
  const season = Number(body?.season) || PLAYER_SEASON_DEFAULT;
  const ids: number[] = Array.isArray(body?.ids) && body.ids.length ? body.ids : SQUAD_PLAYER_IDS;
  const rows: any[] = [];
  for (const id of ids) {
    let item = await fetchPlayerSeason(id, season, apiKey);
    let used = season;
    // Fall back to the calendar-year season for MLS / South-American clubs.
    if (!hasClubStats(item)) {
      const alt = await fetchPlayerSeason(id, season + 1, apiKey);
      if (hasClubStats(alt)) {
        item = alt;
        used = season + 1;
      }
    }
    if (item?.player?.id) rows.push(buildPlayerRow(item, used));
  }
  const upserted = await upsertPlayerStats(rows);
  return jsonResponse({
    ok: true,
    mode: "players",
    requested: ids.length,
    upserted,
    players: rows.map((r) => ({
      id: r.player_id,
      name: r.player_name,
      club: r.club_name,
      apps: r.appearances,
      goals: r.goals,
      rating: r.rating,
      season: r.season,
    })),
  });
}

Deno.serve(async (req) => {
  try {
    const apiKey = Deno.env.get("API_FOOTBALL_KEY");
    if (!apiKey) {
      return jsonResponse({ ok: false, error: "API_FOOTBALL_KEY is not set" }, 500);
    }
    const body = await req.json().catch(() => ({}));
    if (body?.mode === "standings") {
      const result = await fetchGroupCStandings(
        apiKey,
        body.league ?? WC_LEAGUE_ID,
        body.season ?? WC_SEASON,
      );
      const stored = await upsertStandings(result.rows);
      return jsonResponse({ ok: true, mode: "standings", stored, leagueName: result.leagueName, season: result.season, rows: result.rows.length });
    }
    if (body?.mode === "refetch" && body?.id) {
      // Admin/repair: re-fetch a single fixture by id and store its rich data
      // (events/lineups/statistics/players) + score. Used to restore matches.
      const json = await apiGet(`/fixtures?id=${body.id}`, apiKey);
      const item = json.response?.[0];
      if (!item) return jsonResponse({ ok: false, error: "fixture not found" }, 404);
      const row: any = mapLiveFields(item);
      row.scorers = await attachScorers(row, apiKey);
      const upserted = await upsertFixtures([row]);
      return jsonResponse({
        ok: true,
        mode: "refetch",
        id: body.id,
        upserted,
        status: row.status_short,
        score: `${row.goals_home ?? 0}-${row.goals_away ?? 0}`,
        events: Array.isArray(row.events) ? row.events.length : 0,
        lineups: Array.isArray(row.lineups) ? row.lineups.length : 0,
        statistics: Array.isArray(row.statistics) ? row.statistics.length : 0,
        scorers: Array.isArray(row.scorers) ? row.scorers.length : 0,
      });
    }
    if (body?.mode === "players") {
      return await runPlayerStatsSync(apiKey, body);
    }
    if (body?.mode === "live") {
      return await runLiveSync(apiKey);
    }
    return await runFullSync(apiKey);
  } catch (err) {
    console.error(err);
    return jsonResponse({ ok: false, error: String((err as Error)?.message ?? err) }, 500);
  }
});
