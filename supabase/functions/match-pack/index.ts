// ╔══════════════════════════════════════════════════════════════════╗
// ║  match-pack — editorial match recap for one Haiti fixture.          ║
// ║                                                                    ║
// ║  GET ?id=<fixtureId> (required). ?format=json for the structured   ║
// ║  object; default returns copy-ready French markdown (text/markdown).║
// ║  Looks the id up in wc_fixtures then haiti_fixtures (anti-abuse:    ║
// ║  unknown ids -> 404, never hits the API for arbitrary ids). Uses    ║
// ║  the cached detail when the match is finished; otherwise fetches    ║
// ║  /fixtures?id= from API-Football (same usage as wc-match) and       ║
// ║  PATCHes it back into the source table. Public (verify_jwt=false).  ║
// ╚══════════════════════════════════════════════════════════════════╝

const API_BASE = "https://v3.football.api-sports.io";
const HAITI = 2386;
const FINISHED = ["FT", "AET", "PEN"];
const LIVE = ["1H", "HT", "2H", "ET", "BT", "P", "SUSP", "INT", "LIVE"];

const COLS =
  "fixture_id,kickoff,status_short,status_long,elapsed,league_name,round,venue," +
  "home_id,home_name,home_logo,away_id,away_name,away_logo,goals_home,goals_away," +
  "events,lineups,statistics";

const CORS: Record<string, string> = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "authorization, apikey, content-type",
};

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", "Cache-Control": "public, max-age=120", ...CORS },
  });
}
function markdown(text: string, status = 200): Response {
  return new Response(text, {
    status,
    headers: { "Content-Type": "text/markdown; charset=utf-8", "Cache-Control": "public, max-age=120", ...CORS },
  });
}

function env() {
  const url = Deno.env.get("SUPABASE_URL");
  const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  if (!url || !serviceKey) throw new Error("Missing SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY");
  return { url, serviceKey };
}
const svc = (k: string, extra: Record<string, string> = {}) => ({
  "Content-Type": "application/json", apikey: k, Authorization: `Bearer ${k}`, ...extra,
});
async function apiGet(path: string, apiKey: string): Promise<any> {
  const res = await fetch(`${API_BASE}${path}`, { headers: { "x-apisports-key": apiKey } });
  if (!res.ok) throw new Error(`API-Football ${path} -> HTTP ${res.status}`);
  return await res.json();
}

async function readFrom(table: string, id: number): Promise<any | null> {
  const { url, serviceKey } = env();
  const res = await fetch(`${url}/rest/v1/${table}?fixture_id=eq.${id}&select=${COLS}`, { headers: svc(serviceKey) });
  if (!res.ok) return null;
  const rows = await res.json();
  return rows[0] ?? null;
}
async function storeDetail(table: string, id: number, item: any) {
  const { url, serviceKey } = env();
  const f = item.fixture ?? {};
  const goals = item.goals ?? {};
  const body: Record<string, unknown> = {
    events: item.events ?? [],
    lineups: item.lineups ?? [],
    statistics: item.statistics ?? [],
    goals_home: goals.home ?? null,
    goals_away: goals.away ?? null,
    status_short: f.status?.short ?? null,
    status_long: f.status?.long ?? null,
    elapsed: f.status?.elapsed ?? null,
    updated_at: new Date().toISOString(),
  };
  if (table === "wc_fixtures") body.detail_updated_at = new Date().toISOString();
  await fetch(`${url}/rest/v1/${table}?fixture_id=eq.${id}`, {
    method: "PATCH",
    headers: svc(serviceKey, { Prefer: "return=minimal" }),
    body: JSON.stringify(body),
  });
}

// ─── Localisation ──────────────────────────────────────────────────────
const OPP_FR: Record<string, string> = {
  peru: "Pérou", scotland: "Écosse", brazil: "Brésil", morocco: "Maroc", haiti: "Haïti",
  "new zealand": "Nouvelle-Zélande", iceland: "Islande", tunisia: "Tunisie",
  "costa rica": "Costa Rica", nicaragua: "Nicaragua",
};
const frName = (n: string | null | undefined) => OPP_FR[(n ?? "").toLowerCase().trim()] || (n ?? "");

const COMP_FR: Record<string, string> = {
  "World Cup - Qualification CONCACAF": "Éliminatoires CDM",
  "CONCACAF Nations League": "Ligue des Nations",
  "CONCACAF Gold Cup": "Gold Cup",
  Friendlies: "Amical",
  "World Cup": "Coupe du Monde",
};
const compLabel = (n: string | null | undefined) => COMP_FR[n ?? ""] || (n ?? "");

function frDate(iso: string | null): string {
  if (!iso) return "";
  const d = new Date(iso.replace(" ", "T"));
  if (Number.isNaN(d.getTime())) return "";
  return new Intl.DateTimeFormat("fr-FR", {
    weekday: "long", day: "numeric", month: "long", year: "numeric", timeZone: "America/New_York",
  }).format(d);
}
function frStamp(): string {
  return new Intl.DateTimeFormat("fr-FR", {
    dateStyle: "long", timeStyle: "short", timeZone: "America/New_York",
  }).format(new Date());
}

const minStr = (t: any) => `${t?.elapsed ?? 0}${t?.extra ? "+" + t.extra : ""}'`;

// ─── Construction du récap ─────────────────────────────────────────────
function buildPack(row: any, events: any[], lineups: any[], statistics: any[]) {
  const homeIsHaiti = row.home_id === HAITI;
  const gf = homeIsHaiti ? row.goals_home : row.goals_away;
  const ga = homeIsHaiti ? row.goals_away : row.goals_home;
  const oppRaw = homeIsHaiti ? row.away_name : row.home_name;
  const opp = frName(oppRaw);
  const teamLabel = (teamId: any) => (teamId === HAITI ? "Haïti" : opp);

  const ev = Array.isArray(events) ? events : [];
  const lus = Array.isArray(lineups) ? lineups : [];
  const sts = Array.isArray(statistics) ? statistics : [];

  // ids des titulaires (pour déterminer entrant/sortant des remplacements)
  const startIds = new Set<number>();
  for (const l of lus) for (const p of (l.startXI ?? [])) if (p.player?.id != null) startIds.add(p.player.id);

  // ── Buteurs (ordre chronologique) ──
  const goals = ev.filter((e) => e.type === "Goal")
    .sort((a, b) => ((a.time?.elapsed ?? 0) + (a.time?.extra ?? 0)) - ((b.time?.elapsed ?? 0) + (b.time?.extra ?? 0)))
    .map((e) => {
      const own = e.detail === "Own Goal";
      // un csc compte pour l'équipe adverse à celle du buteur
      const scoringTeamId = own ? (e.team?.id === HAITI ? (homeIsHaiti ? row.away_id : row.home_id) : HAITI) : e.team?.id;
      let suffix = "";
      if (own) suffix = " (csc)";
      else if (e.detail === "Penalty") suffix = " (pen.)";
      return { minute: minStr(e.time), player: e.player?.name ?? "Inconnu", team: teamLabel(scoringTeamId), suffix };
    });

  // ── Faits marquants : cartons + remplacements ──
  const CARD_FR: Record<string, string> = {
    "Yellow Card": "Carton jaune", "Red Card": "Carton rouge", "Second Yellow card": "Carton rouge (2e jaune)",
  };
  const highlights = ev
    .filter((e) => e.type === "Card" || e.type === "subst")
    .sort((a, b) => ((a.time?.elapsed ?? 0) + (a.time?.extra ?? 0)) - ((b.time?.elapsed ?? 0) + (b.time?.extra ?? 0)))
    .map((e) => {
      if (e.type === "Card") {
        const label = CARD_FR[e.detail] || "Carton";
        return { minute: minStr(e.time), text: `${label} : ${e.player?.name ?? ""} (${teamLabel(e.team?.id)})` };
      }
      // subst : par défaut player = sortant, assist = entrant ; on affine via les titulaires
      let outName = e.player?.name, inName = e.assist?.name;
      if (e.assist?.id != null && startIds.has(e.assist.id) && !startIds.has(e.player?.id)) {
        outName = e.assist?.name; inName = e.player?.name;
      }
      return { minute: minStr(e.time), text: `Remplacement : ${inName ?? ""} pour ${outName ?? ""} (${teamLabel(e.team?.id)})` };
    });

  // ── Statistiques clés ──
  const statSide = (teamId: any) => sts.find((s) => s.team?.id === teamId)?.statistics ?? [];
  const haitiSt = statSide(HAITI);
  const oppTeamId = homeIsHaiti ? row.away_id : row.home_id;
  const oppSt = statSide(oppTeamId);
  const val = (arr: any[], type: string) => {
    const f = arr.find((x) => x.type === type);
    return f && f.value != null ? f.value : null;
  };
  const STAT_ROWS: Array<{ label: string; type: string }> = [
    { label: "Possession", type: "Ball Possession" },
    { label: "Tirs", type: "Total Shots" },
    { label: "Tirs cadrés", type: "Shots on Goal" },
    { label: "Corners", type: "Corner Kicks" },
    { label: "Fautes", type: "Fouls" },
  ];
  const stats = STAT_ROWS.map((r) => ({ label: r.label, haiti: val(haitiSt, r.type), opp: val(oppSt, r.type) }))
    .filter((r) => r.haiti != null || r.opp != null);

  // ── Compositions ──
  const lineupOf = (teamId: any) => {
    const l = lus.find((x) => x.team?.id === teamId);
    if (!l) return null;
    return {
      formation: l.formation ?? null,
      coach: l.coach?.name ?? null,
      startXI: (l.startXI ?? []).map((p: any) => p.player?.name).filter(Boolean),
      subs: (l.substitutes ?? []).map((p: any) => p.player?.name).filter(Boolean),
    };
  };
  const haitiLine = lineupOf(HAITI);
  const oppLine = lineupOf(oppTeamId);

  return {
    info: {
      gf, ga, opponent: opp,
      competition: compLabel(row.league_name),
      date: frDate(row.kickoff),
      venue: row.venue ?? null,
      status: row.status_short ?? null,
    },
    goals, highlights, stats,
    lineups: { haiti: haitiLine, opp: oppLine },
  };
}

function toMarkdown(p: any): string {
  const { info, goals, highlights, stats, lineups } = p;
  const L: string[] = [];
  L.push(`# Haïti ${info.gf ?? "-"}-${info.ga ?? "-"} ${info.opponent}`);
  L.push([info.competition, info.date, info.venue].filter(Boolean).join(" · "));
  L.push("");

  L.push("## Buteurs");
  if (goals.length === 0) {
    L.push("Aucun but");
  } else {
    for (const g of goals) L.push(`- ${g.minute} ${g.player}${g.suffix} · ${g.team}`);
  }
  L.push("");

  if (highlights.length > 0) {
    L.push("## Faits marquants");
    for (const h of highlights) L.push(`- ${h.minute} ${h.text}`);
    L.push("");
  }

  if (stats.length > 0) {
    L.push("## Statistiques clés");
    for (const s of stats) {
      L.push(`- ${s.label} : Haïti ${s.haiti ?? "-"} · ${info.opponent} ${s.opp ?? "-"}`);
    }
    L.push("");
  }

  const hasLineups = lineups.haiti || lineups.opp;
  if (hasLineups) {
    L.push("## Compositions");
    const block = (label: string, ln: any) => {
      if (!ln) return;
      const meta = [ln.formation ? ln.formation : null, ln.coach ? `entraîneur ${ln.coach}` : null].filter(Boolean).join(", ");
      L.push(`**${label}**${meta ? " · " + meta : ""}`);
      if (ln.startXI?.length) L.push(`Titulaires : ${ln.startXI.join(", ")}`);
      if (ln.subs?.length) L.push(`Remplaçants : ${ln.subs.join(", ")}`);
      L.push("");
    };
    block("Haïti", lineups.haiti);
    block(info.opponent, lineups.opp);
  }

  L.push("---");
  L.push(`Généré pour Chokarella · ${frStamp()} (heure de Miami)`);
  return L.join("\n");
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: CORS });
  try {
    const params = new URL(req.url).searchParams;
    const id = Number(params.get("id"));
    const format = params.get("format");
    if (!id || Number.isNaN(id)) return json({ ok: false, error: "missing id" }, 400);

    // Anti-abuse : seules les rencontres connues d'Haïti sont autorisées.
    let table = "wc_fixtures";
    let row = await readFrom(table, id);
    if (!row) { table = "haiti_fixtures"; row = await readFrom(table, id); }
    if (!row) return json({ ok: false, error: "unknown fixture" }, 404);

    const status = row.status_short;
    const finished = FINISHED.includes(status);
    const live = LIVE.includes(status);
    const hasDetail = (Array.isArray(row.events) && row.events.length > 0) ||
      (Array.isArray(row.lineups) && row.lineups.length > 0) ||
      (Array.isArray(row.statistics) && row.statistics.length > 0);

    let events = row.events, lineups = row.lineups, statistics = row.statistics;
    let cached = true;

    const useCache = hasDetail && finished;
    if (!useCache && (finished || live)) {
      const apiKey = Deno.env.get("API_FOOTBALL_KEY");
      if (apiKey) {
        const item = (await apiGet(`/fixtures?id=${id}`, apiKey)).response?.[0];
        if (item) {
          await storeDetail(table, id, item);
          events = item.events; lineups = item.lineups; statistics = item.statistics;
          const goals = item.goals ?? {};
          row.goals_home = goals.home ?? row.goals_home;
          row.goals_away = goals.away ?? row.goals_away;
          row.status_short = item.fixture?.status?.short ?? row.status_short;
          cached = false;
        }
      }
    }

    const pack = buildPack(row, events, lineups, statistics);

    if (format === "json") {
      return json({ ok: true, cached, source: table, fixture_id: id, ...pack, generated_at: new Date().toISOString() });
    }
    return markdown(toMarkdown(pack));
  } catch (err) {
    console.error(err);
    return json({ ok: false, error: String((err as Error)?.message ?? err) }, 500);
  }
});
