// ╔══════════════════════════════════════════════════════════════════╗
// ║  GALERIE DES SUPPORTERS · lecture publique (anon, fetch brut)      ║
// ║                                                                    ║
// ║  Mêmes conventions que fanWallApi.js : appels fetch directs vers   ║
// ║  PostgREST avec la clé anon. On lit UNIQUEMENT la vue publique     ║
// ║  fan_photos_public (photos approuvées, sans user_id ni statut).    ║
// ║  L'écriture / la modération passent ailleurs (client authentifié  ║
// ║  pour l'upload, fonction edge service role pour la modération).   ║
// ╚══════════════════════════════════════════════════════════════════╝

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const backendReady = Boolean(SUPABASE_URL && SUPABASE_KEY);

function headers() {
  return { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` };
}

// URL publique d'une photo, construite depuis storage_path (bucket public).
export function fanPhotoUrl(storagePath) {
  if (!SUPABASE_URL || !storagePath) return null;
  return `${SUPABASE_URL}/storage/v1/object/public/fan-photos/${storagePath}`;
}

const COLS = "id,storage_path,match,context,location,caption,created_at";

// Une page de photos approuvées (récentes d'abord), filtrable par match et
// par contexte. Pagination par limit + offset (pour un « voir plus »).
// Retourne un tableau (éventuellement vide) ou null si le backend est absent.
export async function fetchApprovedPhotos({ match, context, limit = 24, offset = 0 } = {}) {
  if (!backendReady) return null;
  try {
    let q =
      `${SUPABASE_URL}/rest/v1/fan_photos_public` +
      `?select=${COLS}` +
      `&order=created_at.desc&limit=${limit}&offset=${offset}`;
    if (match) q += `&match=eq.${encodeURIComponent(match)}`;
    if (context) q += `&context=eq.${encodeURIComponent(context)}`;
    const res = await fetch(q, { headers: headers() });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}
