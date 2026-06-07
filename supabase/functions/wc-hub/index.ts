// wc-hub — public read endpoint for chokarella.com/wc26.
// One call returns the whole tournament from the cached tables: all group
// standings (grouped + ranked) and all fixtures (with a derived state).
// No API-Football call, no key in the browser. Public. GET / OPTIONS.

const HAITI_TEAM_ID = 2386;
const LIVE_STATUSES = ["1H", "HT", "2H", "ET", "BT", "P", "SUSP", "INT", "LIVE"];
const FINISHED_STATUSES = ["FT", "AET", "PEN"];

const CORS: Record<string, string> = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "authorization, apikey, content-type",
};

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", "Cache-Control": "public, max-age=30, s-maxage=30", ...CORS },
  });
}

function supabaseEnv() {
  const url = Deno.env.get("SUPABASE_URL");
  const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  if (!url || !serviceKey) throw new Error("Missing SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY");
  return { url, serviceKey };
}

function state(s: string): "live" | "finished" | "upcoming" | "other" {
  if (LIVE_STATUSES.includes(s)) return "live";
  if (FINISHED_STATUSES.includes(s)) return "finished";
  if (s === "NS" || s === "TBD") return "upcoming";
  return "other";
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: CORS });
  try {
    const { url, serviceKey } = supabaseEnv();
    const h = { apikey: serviceKey, Authorization: `Bearer ${serviceKey}` };
    const sRes = await fetch(`${url}/rest/v1/wc_standings?select=group_name,rank,team_id,team_name,team_logo,played,win,draw,lose,goals_for,goals_against,goals_diff,points&order=group_name.asc,rank.asc`, { headers: h });
    const fRes = await fetch(`${url}/rest/v1/wc_fixtures?select=fixture_id,kickoff,status_short,status_long,elapsed,round,group_name,home_id,home_name,home_logo,away_id,away_name,away_logo,goals_home,goals_away&order=kickoff.asc`, { headers: h });
    if (!sRes.ok) throw new Error(`wc_standings HTTP ${sRes.status}`);
    if (!fRes.ok) throw new Error(`wc_fixtures HTTP ${fRes.status}`);
    const standings = await sRes.json() as any[];
    const fixtures = await fRes.json() as any[];
    const groupMap = new Map<string, any[]>();
    for (const r of standings) {
      const g = r.group_name ?? "\u2014";
      if (!groupMap.has(g)) groupMap.set(g, []);
      groupMap.get(g)!.push({
        rank: r.rank, team_id: r.team_id, name: r.team_name, logo: r.team_logo,
        played: r.played, win: r.win, draw: r.draw, lose: r.lose,
        gf: r.goals_for, ga: r.goals_against, gd: r.goals_diff, points: r.points,
        is_haiti: r.team_id === HAITI_TEAM_ID,
      });
    }
    const groups = [...groupMap.entries()].sort((a, b) => a[0].localeCompare(b[0])).map(([group, teams]) => ({ group, teams }));
    const fx = fixtures.map((r) => ({
      fixture_id: r.fixture_id,
      kickoff: r.kickoff,
      state: state(r.status_short),
      status_short: r.status_short,
      status_long: r.status_long,
      elapsed: r.elapsed,
      round: r.round,
      group: r.group_name,
      home: { id: r.home_id, name: r.home_name, logo: r.home_logo },
      away: { id: r.away_id, name: r.away_name, logo: r.away_logo },
      goals: { home: r.goals_home, away: r.goals_away },
      is_haiti: r.home_id === HAITI_TEAM_ID || r.away_id === HAITI_TEAM_ID,
    }));
    return json({ ok: true, generated_at: new Date().toISOString(), groups, fixtures: fx, counts: { groups: groups.length, fixtures: fx.length } });
  } catch (err) {
    console.error(err);
    return json({ ok: false, error: String((err as Error)?.message ?? err) }, 500);
  }
});
