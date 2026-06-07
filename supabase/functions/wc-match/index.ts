// ╔══════════════════════════════════════════════════════════════════╗
// ║  wc-match — public, on-demand match detail with DB caching          ║
// ║                                                                    ║
// ║  GET ?id=<fixture_id>. Returns shaped events / lineups / statistics ║
// ║  for one match. Calls API-Football only when needed and caches into ║
// ║  wc_fixtures, so repeated opens are free. Only serves fixture ids   ║
// ║  that already exist in wc_fixtures, so it can't be used to burn     ║
// ║  quota on arbitrary ids. Public (verify_jwt=false). GET / OPTIONS.  ║
// ╚══════════════════════════════════════════════════════════════════╝

const API_BASE = "https://v3.football.api-sports.io";
const FINISHED = ["FT", "AET", "PEN"];
const LIVE = ["1H", "HT", "2H", "ET", "BT", "P", "SUSP", "INT", "LIVE"];
const FRESH_MS = 45 * 1000;                 // live detail re-fetch cadence
const PREMATCH_MS = 2 * 60 * 60 * 1000;     // fetch lineups within 2h of kickoff

const CORS: Record<string, string> = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "authorization, apikey, content-type",
};

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", "Cache-Control": "public, max-age=30", ...CORS },
  });
}
function supabaseEnv() {
  const url = Deno.env.get("SUPABASE_URL");
  const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  if (!url || !serviceKey) throw new Error("Missing SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY");
  return { url, serviceKey };
}
function svc(serviceKey: string, extra: Record<string, string> = {}) {
  return { "Content-Type": "application/json", apikey: serviceKey, Authorization: `Bearer ${serviceKey}`, ...extra };
}
async function apiGet(path: string, apiKey: string): Promise<any> {
  const res = await fetch(`${API_BASE}${path}`, { headers: { "x-apisports-key": apiKey } });
  if (!res.ok) throw new Error(`API-Football ${path} -> HTTP ${res.status}`);
  return await res.json();
}

const COLS =
  "fixture_id,kickoff,status_short,status_long,elapsed,round,group_name,venue," +
  "home_id,home_name,home_logo,away_id,away_name,away_logo,goals_home,goals_away," +
  "events,lineups,statistics,detail_updated_at";

async function readRow(id: number): Promise<any | null> {
  const { url, serviceKey } = supabaseEnv();
  const res = await fetch(`${url}/rest/v1/wc_fixtures?fixture_id=eq.${id}&select=${COLS}`, { headers: svc(serviceKey) });
  if (!res.ok) throw new Error(`wc_fixtures read HTTP ${res.status}`);
  const rows = await res.json();
  return rows[0] ?? null;
}

async function storeDetail(id: number, item: any) {
  const { url, serviceKey } = supabaseEnv();
  const f = item.fixture ?? {};
  const goals = item.goals ?? {};
  const body = {
    events: item.events ?? [],
    lineups: item.lineups ?? [],
    statistics: item.statistics ?? [],
    goals_home: goals.home ?? null,
    goals_away: goals.away ?? null,
    status_short: f.status?.short ?? null,
    status_long: f.status?.long ?? null,
    elapsed: f.status?.elapsed ?? null,
    detail_updated_at: new Date().toISOString(),
  };
  await fetch(`${url}/rest/v1/wc_fixtures?fixture_id=eq.${id}`, {
    method: "PATCH",
    headers: svc(serviceKey, { Prefer: "return=minimal" }),
    body: JSON.stringify(body),
  });
}

const sideOf = (teamId: any, homeId: any) => (teamId === homeId ? "home" : "away");

function shapeEvents(events: any[], homeId: any) {
  return (events ?? [])
    .map((e) => ({
      minute: e.time?.elapsed ?? null,
      extra: e.time?.extra ?? null,
      side: sideOf(e.team?.id, homeId),
      type: e.type ?? null,
      detail: e.detail ?? null,
      player: e.player?.name ?? null,
      assist: e.assist?.name ?? null,
    }))
    .sort((a, b) => ((a.minute ?? 0) + (a.extra ?? 0)) - ((b.minute ?? 0) + (b.extra ?? 0)));
}
function shapeLineups(lineups: any[], homeId: any) {
  const out: any = { home: null, away: null };
  for (const l of (lineups ?? [])) {
    const s = sideOf(l.team?.id, homeId);
    out[s] = {
      formation: l.formation ?? null,
      coach: l.coach?.name ?? null,
      startXI: (l.startXI ?? []).map((p: any) => ({ name: p.player?.name, number: p.player?.number, pos: p.player?.pos })),
      subs: (l.substitutes ?? []).map((p: any) => ({ name: p.player?.name, number: p.player?.number, pos: p.player?.pos })),
    };
  }
  return out;
}
function shapeStats(statistics: any[], homeId: any) {
  const out: any = { home: [], away: [] };
  for (const s of (statistics ?? [])) {
    const sd = sideOf(s.team?.id, homeId);
    out[sd] = (s.statistics ?? []).map((x: any) => ({ type: x.type, value: x.value }));
  }
  return out;
}

function basic(row: any) {
  return {
    fixture_id: row.fixture_id,
    kickoff: row.kickoff,
    status_short: row.status_short,
    status_long: row.status_long,
    elapsed: row.elapsed,
    round: row.round,
    group: row.group_name,
    venue: row.venue,
    home: { id: row.home_id, name: row.home_name, logo: row.home_logo },
    away: { id: row.away_id, name: row.away_name, logo: row.away_logo },
    goals: { home: row.goals_home, away: row.goals_away },
  };
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: CORS });
  try {
    const id = Number(new URL(req.url).searchParams.get("id"));
    if (!id || Number.isNaN(id)) return json({ ok: false, error: "missing id" }, 400);

    const row = await readRow(id);
    if (!row) return json({ ok: false, error: "unknown fixture" }, 404); // no API call for unknown ids

    const status = row.status_short;
    const finished = FINISHED.includes(status);
    const live = LIVE.includes(status);
    const hasDetail = row.events != null || row.lineups != null;
    const fresh = row.detail_updated_at && (Date.now() - Date.parse(row.detail_updated_at) < FRESH_MS);
    const kt = row.kickoff ? Date.parse(row.kickoff) : 0;
    const nearKO = kt > 0 && (kt - Date.now() < PREMATCH_MS);

    const useCache = hasDetail && (finished || fresh);
    const shouldFetch = !useCache && (finished || live || nearKO);

    let src = row;
    let info = basic(row);

    if (shouldFetch) {
      const apiKey = Deno.env.get("API_FOOTBALL_KEY");
      if (apiKey) {
        const item = (await apiGet(`/fixtures?id=${id}`, apiKey)).response?.[0];
        if (item) {
          await storeDetail(id, item);
          src = { events: item.events, lineups: item.lineups, statistics: item.statistics };
          const f = item.fixture ?? {};
          const goals = item.goals ?? {};
          info = {
            ...info,
            status_short: f.status?.short ?? info.status_short,
            status_long: f.status?.long ?? info.status_long,
            elapsed: f.status?.elapsed ?? info.elapsed,
            goals: { home: goals.home ?? info.goals.home, away: goals.away ?? info.goals.away },
          };
        }
      }
    }

    const homeId = row.home_id;
    return json({
      ok: true,
      match: {
        ...info,
        events: shapeEvents(src.events, homeId),
        lineups: shapeLineups(src.lineups, homeId),
        statistics: shapeStats(src.statistics, homeId),
      },
    });
  } catch (err) {
    console.error(err);
    return json({ ok: false, error: String((err as Error)?.message ?? err) }, 500);
  }
});
