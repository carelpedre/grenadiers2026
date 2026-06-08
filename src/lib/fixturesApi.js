// ╔══════════════════════════════════════════════════════════════════╗
// ║  FIXTURES — lecture des matchs/résultats d'Haïti (Supabase)        ║
// ║                                                                    ║
// ║  Mêmes conventions que pwonostikApi.js : appels fetch directs vers ║
// ║  PostgREST, no-op gracieux si les variables d'environnement sont   ║
// ║  absentes. Le navigateur N'APPELLE JAMAIS données live — la clé    ║
// ║  reste côté serveur (fonction edge fixtures-sync). On lit ici la   ║
// ║  vue publique haiti_fixtures_public, alimentée par le cron.        ║
// ╚══════════════════════════════════════════════════════════════════╝

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const backendReady = Boolean(SUPABASE_URL && SUPABASE_KEY);

function headers() {
  return {
    "Content-Type": "application/json",
    apikey: SUPABASE_KEY,
    Authorization: `Bearer ${SUPABASE_KEY}`,
  };
}

const SELECT = [
  "fixture_id",
  "kickoff",
  "status_short",
  "status_long",
  "elapsed",
  "league_name",
  "round",
  "venue",
  "home_id",
  "home_name",
  "home_logo",
  "away_id",
  "away_name",
  "away_logo",
  "goals_home",
  "goals_away",
  "scorers",
  "updated_at",
].join(",");

// Récupère tous les matchs synchronisés (triés par coup d'envoi croissant).
// Retourne un tableau de fixtures, ou null si le backend est indisponible.
export async function fetchFixtures() {
  if (!backendReady) return null;
  try {
    const q =
      `${SUPABASE_URL}/rest/v1/haiti_fixtures_public` +
      `?select=${SELECT}` +
      `&order=kickoff.asc`;
    const res = await fetch(q, { headers: headers() });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

// Meilleurs buteurs récents d'Haïti (totaux de la fenêtre récente, hors carrière).
// Lit la vue publique haiti_contributions_public, buts > 0, triés buts puis passes
// décisives, limité à 10. Retourne un tableau, ou null si backend indisponible.
export async function getRecentScorers() {
  if (!backendReady) return null;
  try {
    const cols =
      "player_id,player_name,photo,goals,assists,appearances,minutes," +
      "last_goal_date,matches_counted,window_from,window_to,updated_at";
    const q =
      `${SUPABASE_URL}/rest/v1/haiti_contributions_public` +
      `?select=${cols}` +
      `&goals=gt.0` +
      `&order=goals.desc,assists.desc` +
      `&limit=10`;
    const res = await fetch(q, { headers: headers() });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

// Scouting avant-match d'un adversaire : H2H face à Haïti + forme récente de
// l'adversaire. Appelle la fonction edge publique wc-h2h (mise en cache 12h
// côté serveur ; seuls les 3 adversaires du Mondial sont autorisés). Aucune
// API externe côté navigateur. Retourne la charge utile { ok, ... } ou null.
export async function getOpponentScouting(oppId) {
  if (!backendReady || !oppId) return null;
  try {
    const res = await fetch(
      `${SUPABASE_URL}/functions/v1/wc-h2h?id=${encodeURIComponent(oppId)}`,
      { headers: headers() },
    );
    if (!res.ok) return null;
    const data = await res.json();
    return data?.ok ? data : null;
  } catch {
    return null;
  }
}

// Derniers résultats d'Haïti (matchs terminés) pour la « Forme récente ».
// Lit la vue publique, statuts terminés uniquement, du plus récent au plus
// ancien, limité à 10. Retourne un tableau, ou null si backend indisponible.
export async function getRecentResults() {
  if (!backendReady) return null;
  try {
    const cols =
      "fixture_id,kickoff,status_short,league_name,round," +
      "home_id,home_name,home_logo,away_id,away_name,away_logo," +
      "goals_home,goals_away";
    const q =
      `${SUPABASE_URL}/rest/v1/haiti_fixtures_public` +
      `?select=${cols}` +
      `&status_short=in.(FT,AET,PEN)` +
      `&order=kickoff.desc&limit=10`;
    const res = await fetch(q, { headers: headers() });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

// Détail complet d'un match d'Haïti par adversaire (nom anglais en minuscules,
// ex. "peru"). Inclut events / lineups / statistics. Le plus récent si plusieurs.
// Retourne l'objet fixture, ou null.
export async function fetchFixtureByOpponent(slug) {
  if (!backendReady || !slug) return null;
  try {
    const cols =
      "fixture_id,kickoff,status_short,status_long,elapsed,league_name,round,venue," +
      "home_id,home_name,home_logo,away_id,away_name,away_logo," +
      "goals_home,goals_away,scorers,events,lineups,statistics,players,updated_at";
    const name = encodeURIComponent(slug);
    const q =
      `${SUPABASE_URL}/rest/v1/haiti_fixtures_public` +
      `?select=${cols}` +
      `&or=(home_name.ilike.${name},away_name.ilike.${name})` +
      `&order=kickoff.desc&limit=1`;
    const res = await fetch(q, { headers: headers() });
    if (!res.ok) return null;
    const rows = await res.json();
    return rows[0] || null;
  } catch {
    return null;
  }
}

// Classement du groupe C (vue publique), trié par rang croissant.
// Retourne un tableau de lignes, ou null si le backend est indisponible.
export async function fetchGroupCStandings() {
  if (!backendReady) return null;
  try {
    const q =
      `${SUPABASE_URL}/rest/v1/group_c_standings_public` +
      `?select=team_id,rank,team_name,team_logo,played,win,draw,lose,goals_for,goals_against,goals_diff,points,updated_at` +
      `&order=rank.asc`;
    const res = await fetch(q, { headers: headers() });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

// Statistiques de club par joueur (vue publique haiti_player_stats_public),
// alimentée par fixtures-sync mode "players". Retourne un objet indexé par
// player_id (= squad.js apiId), ou null si le backend est indisponible.
export async function fetchPlayerStats() {
  if (!backendReady) return null;
  try {
    const q =
      `${SUPABASE_URL}/rest/v1/haiti_player_stats_public` +
      `?select=player_id,player_name,photo,club_id,club_name,club_logo,league_name,season,appearances,minutes,goals,assists,rating,updated_at`;
    const res = await fetch(q, { headers: headers() });
    if (!res.ok) return null;
    const rows = await res.json();
    const byId = {};
    for (const r of rows) byId[r.player_id] = r;
    return byId;
  } catch {
    return null;
  }
}

// ─── Classification des statuts du fournisseur ─────────────────────────
const FINISHED = new Set(["FT", "AET", "PEN", "WO"]);
const LIVE = new Set(["1H", "HT", "2H", "ET", "BT", "P", "SUSP", "INT", "LIVE"]);
// Statuts à horloge qui tourne (on affiche la minute écoulée).
const RUNNING = new Set(["1H", "2H", "ET", "LIVE"]);
// Statuts terminaux non-joués (ni en cours, ni « terminé »).
const ABANDONED = new Set(["PST", "CANC", "ABD", "AWD"]);

export function isFinished(status) {
  return FINISHED.has(status);
}
export function isLive(status) {
  return LIVE.has(status);
}
export function isRunning(status) {
  return RUNNING.has(status);
}
export function isAbandoned(status) {
  return ABANDONED.has(status);
}

// Libellé d'affichage (FR) à partir du code de statut du fournisseur de données.
export function statusLabel(status) {
  switch (status) {
    case "HT":
      return "Mi-temps";
    case "ET":
      return "Prolongation";
    case "BT":
      return "Pause";
    case "P":
      return "Tirs au but";
    case "SUSP":
      return "Suspendu";
    case "INT":
      return "Interrompu";
    case "PST":
      return "Reporté";
    case "CANC":
      return "Annulé";
    case "ABD":
      return "Abandonné";
    case "AWD":
      return "Sur tapis vert";
    default:
      break;
  }
  if (isFinished(status)) return "Terminé";
  if (isLive(status)) return "En direct";
  return "À venir"; // NS, TBD, etc.
}
