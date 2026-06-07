// game-of-the-day (v2) — public read endpoint for the widget + hub.
// Reads the full tournament from public.wc_fixtures and returns the ONE match
// to feature. Falls back to public.haiti_fixtures while wc_fixtures is empty
// (before the first tournament sync), so the widget keeps working.
// Selection (default = whole tournament, Haiti prioritised):
//   1. Haiti live -> Haiti
//   2. any live -> marquee (knockout > group, then kickoff)
//   3. Haiti's day -> Haiti upcoming <=18h or Haiti result <=12h
//   4. recent result <=12h -> marquee
//   5. soonest upcoming (marquee within the soonest 12h cluster)
//   6. most recent finished
// ?haiti=1 forces Haiti-only. NO API-Football call. Public. GET / OPTIONS.

const HAITI_TEAM_ID = 2386;
const LIVE_STATUSES = ["1H", "HT", "2H", "ET", "BT", "P", "SUSP", "INT", "LIVE"];
const FINISHED_STATUSES = ["FT", "AET", "PEN"];
const HOUR = 60 * 60 * 1000;

const CORS: Record<string, string> = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "authorization, apikey, content-type",
};

function json(body: unknown, status = 200, extra: Record<string, string> = {}): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", "Cache-Control": "public, max-age=30, s-maxage=30", ...CORS, ...extra },
  });
}

function supabaseEnv() {
  const url = Deno.env.get("SUPABASE_URL");
  const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  if (!url || !serviceKey) throw new Error("Missing SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY");
  return { url, serviceKey };
}

async function readTable(table: string, cols: string[]): Promise<any[]> {
  const { url, serviceKey } = supabaseEnv();
  const q = `${url}/rest/v1/${table}?select=${cols.join(",")}&order=kickoff.asc`;
  const res = await fetch(q, { headers: { apikey: serviceKey, Authorization: `Bearer ${serviceKey}` } });
  if (!res.ok) throw new Error(`${table} read HTTP ${res.status}: ${await res.text()}`);
  return await res.json() as any[];
}

async function loadFixtures(): Promise<{ rows: any[]; source: string }> {
  const wcCols = [
    "fixture_id", "kickoff", "status_short", "status_long", "elapsed",
    "round", "group_name", "league_name", "venue",
    "home_id", "home_name", "home_logo", "away_id", "away_name", "away_logo",
    "goals_home", "goals_away",
  ];
  try {
    const wc = await readTable("wc_fixtures", wcCols);
    if (wc.length) return { rows: wc, source: "wc_fixtures" };
  } catch (err) {
    console.error("wc_fixtures read failed, falling back:", err);
  }
  const haitiCols = [
    "fixture_id", "kickoff", "status_short", "status_long", "elapsed",
    "round", "league_name", "venue",
    "home_id", "home_name", "home_logo", "away_id", "away_name", "away_logo",
    "goals_home", "goals_away", "scorers",
  ];
  const haiti = await readTable("haiti_fixtures", haitiCols);
  return { rows: haiti, source: "haiti_fixtures" };
}

function classify(row: any): "live" | "finished" | "upcoming" | "other" {
  const s = row.status_short;
  if (LIVE_STATUSES.includes(s)) return "live";
  if (FINISHED_STATUSES.includes(s)) return "finished";
  if (s === "NS" || s === "TBD") return "upcoming";
  return "other";
}

function roundRank(round: string | null): number {
  const r = (round || "").toLowerCase();
  if (r.includes("quarter")) return 4;
  if (r.includes("semi")) return 5;
  if (r.includes("round of 16")) return 3;
  if (r.includes("round of 32")) return 2;
  if (r.includes("3rd") || r.includes("third") || r.includes("place")) return 5;
  if (r.includes("final")) return 6;
  return 1;
}

function shape(row: any, state: string) {
  return {
    state,
    fixture_id: row.fixture_id,
    kickoff: row.kickoff,
    status_short: row.status_short,
    status_long: row.status_long,
    elapsed: row.elapsed,
    round: row.round ?? null,
    group: row.group_name ?? null,
    league: row.league_name ?? null,
    venue: row.venue ?? null,
    home: { id: row.home_id, name: row.home_name, logo: row.home_logo },
    away: { id: row.away_id, name: row.away_name, logo: row.away_logo },
    goals: { home: row.goals_home, away: row.goals_away },
    haiti_is_home: row.home_id === HAITI_TEAM_ID,
    is_haiti: row.home_id === HAITI_TEAM_ID || row.away_id === HAITI_TEAM_ID,
    scorers: Array.isArray(row.scorers) ? row.scorers : [],
  };
}

function tag(rows: any[]) {
  return rows.map((r) => ({
    r,
    state: classify(r),
    kt: r.kickoff ? Date.parse(r.kickoff) : 0,
    isHaiti: r.home_id === HAITI_TEAM_ID || r.away_id === HAITI_TEAM_ID,
    rank: roundRank(r.round ?? null),
  }));
}

function pickTournament(rows: any[]) {
  const now = Date.now();
  const t = tag(rows);
  const live = t.filter((x) => x.state === "live");
  if (live.length) {
    const haitiLive = live.find((x) => x.isHaiti);
    if (haitiLive) return shape(haitiLive.r, "live");
    live.sort((a, b) => b.rank - a.rank || a.kt - b.kt);
    return shape(live[0].r, "live");
  }
  const haitiSoon = t.filter((x) => x.isHaiti && x.state === "upcoming" && x.kt - now <= 18 * HOUR && x.kt - now > -HOUR).sort((a, b) => a.kt - b.kt)[0];
  if (haitiSoon) return shape(haitiSoon.r, "upcoming");
  const haitiRecent = t.filter((x) => x.isHaiti && x.state === "finished" && now - x.kt <= 12 * HOUR).sort((a, b) => b.kt - a.kt)[0];
  if (haitiRecent) return shape(haitiRecent.r, "finished");
  const recent = t.filter((x) => x.state === "finished" && now - x.kt <= 12 * HOUR).sort((a, b) => b.rank - a.rank || b.kt - a.kt)[0];
  if (recent) return shape(recent.r, "finished");
  const upcoming = t.filter((x) => x.state === "upcoming" && x.kt >= now - HOUR).sort((a, b) => a.kt - b.kt);
  if (upcoming.length) {
    const soonest = upcoming[0].kt;
    const cluster = upcoming.filter((x) => x.kt - soonest <= 12 * HOUR);
    cluster.sort((a, b) => b.rank - a.rank || a.kt - b.kt);
    return shape(cluster[0].r, "upcoming");
  }
  const last = t.filter((x) => x.state === "finished").sort((a, b) => b.kt - a.kt)[0];
  return last ? shape(last.r, "finished") : null;
}

function pickHaiti(rows: any[]) {
  const now = Date.now();
  const t = tag(rows).filter((x) => x.isHaiti);
  const live = t.filter((x) => x.state === "live").sort((a, b) => a.kt - b.kt)[0];
  if (live) return shape(live.r, "live");
  const recent = t.filter((x) => x.state === "finished" && now - x.kt <= 12 * HOUR).sort((a, b) => b.kt - a.kt)[0];
  if (recent) return shape(recent.r, "finished");
  const upcoming = t.filter((x) => x.state === "upcoming" && x.kt >= now - HOUR).sort((a, b) => a.kt - b.kt)[0];
  if (upcoming) return shape(upcoming.r, "upcoming");
  const last = t.filter((x) => x.state === "finished").sort((a, b) => b.kt - a.kt)[0];
  return last ? shape(last.r, "finished") : null;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: CORS });
  try {
    const haitiOnly = new URL(req.url).searchParams.get("haiti") === "1";
    const { rows, source } = await loadFixtures();
    const match = haitiOnly ? pickHaiti(rows) : pickTournament(rows);
    return json({ ok: true, source, scope: haitiOnly ? "haiti" : "tournament", match: match ?? null });
  } catch (err) {
    console.error(err);
    return json({ ok: false, error: String((err as Error)?.message ?? err) }, 500);
  }
});
