// ╔══════════════════════════════════════════════════════════════════╗
// ║  GALERIE PHOTO — client (fonctions edge Supabase)                  ║
// ║                                                                    ║
// ║  Mêmes conventions que fixturesApi.js / fanWallApi.js : appels     ║
// ║  fetch directs, clé anon en apikey + Authorization Bearer.         ║
// ║   • Lecture : fonction gallery-list (albums + photos).            ║
// ║   • Écriture : fonction gallery-upload (multipart, mot de passe). ║
// ║  Le backend existe déjà ; on ne fait que le lire/l'appeler.       ║
// ╚══════════════════════════════════════════════════════════════════╝

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const backendReady = Boolean(SUPABASE_URL && SUPABASE_KEY);

// En-têtes d'auth seulement. Pour l'upload multipart on ne fixe PAS
// Content-Type : le navigateur ajoute la frontière (boundary) lui-même.
function authHeaders() {
  return { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` };
}

// Liste des albums. Retourne un tableau (éventuellement vide), ou null.
export async function fetchAlbums() {
  if (!backendReady) return null;
  try {
    const res = await fetch(`${SUPABASE_URL}/functions/v1/gallery-list`, { headers: authHeaders() });
    if (!res.ok) return null;
    const data = await res.json();
    return data?.ok ? data.albums ?? [] : null;
  } catch {
    return null;
  }
}

// Photos d'un album (les plus récentes d'abord). Retourne { album, slug, photos } ou null.
export async function fetchAlbum(slug) {
  if (!backendReady || !slug) return null;
  try {
    const res = await fetch(
      `${SUPABASE_URL}/functions/v1/gallery-list?album=${encodeURIComponent(slug)}`,
      { headers: authHeaders() },
    );
    if (!res.ok) return null;
    const data = await res.json();
    return data?.ok ? data : null;
  } catch {
    return null;
  }
}

// Envoie un lot (multipart) déjà construit. Retourne { status, data }.
// formData doit contenir : password, album, slug?, full[], thumb[] (même ordre).
export async function uploadGalleryChunk(formData) {
  if (!backendReady) return { status: 0, data: { ok: false } };
  try {
    const res = await fetch(`${SUPABASE_URL}/functions/v1/gallery-upload`, {
      method: "POST",
      headers: authHeaders(),
      body: formData,
    });
    const data = await res.json().catch(() => ({}));
    return { status: res.status, data };
  } catch {
    return { status: 0, data: { ok: false } };
  }
}
