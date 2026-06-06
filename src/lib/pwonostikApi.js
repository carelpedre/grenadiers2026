// ╔══════════════════════════════════════════════════════════════════╗
// ║  PWONOSTIK — client classement (Supabase via REST/PostgREST)     ║
// ║                                                                    ║
// ║  Aucune dépendance ajoutée : appels fetch directs.                ║
// ║  Si les variables d'environnement sont absentes, tout est en      ║
// ║  no-op gracieux — le jeu reste jouable en mode local.             ║
// ║                                                                    ║
// ║  .env (à la racine, non commité) :                                ║
// ║    VITE_SUPABASE_URL=https://xxxx.supabase.co                     ║
// ║    VITE_SUPABASE_ANON_KEY=clé_publique_anon                       ║
// ║  (Ne jamais mettre la clé service_role côté client.)              ║
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

// Enregistre / met à jour l'entrée du joueur via la fonction validée.
export async function submitEntry({ playerId, name, email, picks, points, league }) {
  if (!backendReady) return { ok: false, offline: true };
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/rpc/submit_pwonostik`, {
      method: "POST",
      headers: headers(),
      body: JSON.stringify({
        p_player_id: playerId,
        p_name: name,
        p_email: email || null,
        p_picks: picks,
        p_points: points,
        p_league: league || null,
      }),
    });
    return { ok: res.ok };
  } catch {
    return { ok: false };
  }
}

// Récupère le classement (global ou filtré par code de ligue).
// Retourne un tableau d'entrées { name, picks, points, league_code } ou null.
export async function fetchLeaderboard({ league } = {}) {
  if (!backendReady) return null;
  try {
    let q = `${SUPABASE_URL}/rest/v1/pwonostik_leaderboard` +
      `?select=name,picks,points,league_code,updated_at` +
      `&order=points.desc&limit=200`;
    if (league) q += `&league_code=eq.${encodeURIComponent(league)}`;
    const res = await fetch(q, { headers: headers() });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}
