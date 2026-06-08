// supabase/functions/haiti-data-map/index.ts
// One-shot map of every competition + season + coverage flag API-Football
// holds for a national team. Reads the key from an existing project secret,
// so no key is hard-coded. Default team = Haiti (2386).

const API_BASE = "https://v3.football.api-sports.io";

// Reuse whatever secret your other functions already use. Tries the common
// names; if yours differs, add it here (run `supabase secrets list` to check).
function getKey(): string | null {
  for (const n of ["API_FOOTBALL_KEY","APIFOOTBALL_KEY","API_SPORTS_KEY","APISPORTS_KEY","FOOTBALL_API_KEY","API_FOOTBALL"]) {
    const v = Deno.env.get(n);
    if (v) return v;
  }
  return null;
}

const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};
const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body, null, 2), { status, headers: { ...cors, "Content-Type": "application/json" } });

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: cors });

  const key = getKey();
  if (!key) return json({ error: "No API-Football key found in env. Set/confirm the secret name your other functions use." }, 500);

  const url = new URL(req.url);
  const team = url.searchParams.get("team") ?? "2386"; // Haiti
  const season = url.searchParams.get("season");        // optional: also list that season's matches

  try {
    const leaguesRes = await fetch(`${API_BASE}/leagues?team=${team}`, { headers: { "x-apisports-key": key } });
    const leaguesData = await leaguesRes.json();

    const competitions = (leaguesData.response ?? []).map((item: any) => {
      const seasons = (item.seasons ?? []).map((s: any) => ({
        year: s.year,
        fixtures_events: s.coverage?.fixtures?.events ?? false,
        fixtures_lineups: s.coverage?.fixtures?.lineups ?? false,
        fixtures_stats: s.coverage?.fixtures?.statistics_fixtures ?? false,
        player_stats: s.coverage?.fixtures?.statistics_players ?? false,
        standings: s.coverage?.standings ?? false,
        players: s.coverage?.players ?? false,
      }));
      return {
        league_id: item.league?.id,
        name: item.league?.name,
        type: item.league?.type,
        country: item.country?.name,
        years: seasons.map((s: any) => s.year),
        seasons,
      };
    });

    const allYears = [...new Set(competitions.flatMap((c: any) => c.years))].sort((a: number, b: number) => a - b);

    const out: any = {
      team: Number(team),
      source: "API-Football /leagues",
      generated_at: new Date().toISOString(),
      summary: {
        total_competitions: competitions.length,
        earliest_year: allYears[0] ?? null,
        latest_year: allYears[allYears.length - 1] ?? null,
        all_years: allYears,
      },
      competitions,
    };

    if (season) {
      const fxRes = await fetch(`${API_BASE}/fixtures?team=${team}&season=${season}`, { headers: { "x-apisports-key": key } });
      const fxData = await fxRes.json();
      out.fixtures_for_season = {
        season: Number(season),
        count: fxData.results ?? 0,
        matches: (fxData.response ?? []).map((f: any) => ({
          date: f.fixture?.date,
          competition: f.league?.name,
          round: f.league?.round,
          home: f.teams?.home?.name,
          away: f.teams?.away?.name,
          score: `${f.goals?.home ?? "-"}-${f.goals?.away ?? "-"}`,
          status: f.fixture?.status?.short,
        })),
      };
    }

    return json(out, 200);
  } catch (e) {
    return json({ error: String(e) }, 500);
  }
});
