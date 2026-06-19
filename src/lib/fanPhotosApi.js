// ╔══════════════════════════════════════════════════════════════════╗
// ║  FAN PHOTOS · opérations authentifiées (via le client supabase-js) ║
// ║                                                                    ║
// ║  Réservé à la surface « Partage ta photo ». Réutilise le client    ║
// ║  unique de supabaseClient.js (session Google). La RLS auth.uid()   ║
// ║  garantit que l'utilisateur ne voit / écrit / supprime QUE ses     ║
// ║  propres lignes. Lecture publique de la galerie : plus tard, via   ║
// ║  la vue fan_photos_public (fetch brut, hors de ce module).         ║
// ╚══════════════════════════════════════════════════════════════════╝

import { supabase } from "./supabaseClient";
import { prepareImage } from "./imagePrep";

const BUCKET = "fan-photos";
export const MAX_PER_MATCH = 3; // plafond de 3 photos PAR MATCH

// URL publique d'une photo (bucket en lecture publique).
export function photoUrl(storagePath) {
  if (!supabase || !storagePath) return null;
  return supabase.storage.from(BUCKET).getPublicUrl(storagePath).data.publicUrl;
}

// Les photos de l'utilisateur connecté (RLS : ses lignes uniquement).
export async function listMyPhotos() {
  if (!supabase) return [];
  const { data, error } = await supabase
    .from("fan_photos")
    .select("id, storage_path, match, context, location, caption, status, created_at")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data || [];
}

// Soumission avec évitement des orphelins (convention enregistrée) :
// 1) pré-vérifie le compte côté serveur (< 3), 2) compresse, 3) upload,
// 4) insert ; si l'insert échoue (y compris le trigger de plafond), on
// supprime l'objet déjà déposé pour ne laisser aucun orphelin.
export async function submitPhoto({ file, match, context, location, caption }) {
  if (!supabase) throw withCode(new Error("Service indisponible."), "UNAVAILABLE");

  const { data: sessionData } = await supabase.auth.getSession();
  const uid = sessionData?.session?.user?.id;
  if (!uid) throw withCode(new Error("Connexion requise."), "AUTH");

  // 1) Pré-vérif du plafond POUR CE MATCH (head: true => compte seul ;
  //    RLS = ses lignes ; .eq filtre sur le match choisi).
  const { count, error: countErr } = await supabase
    .from("fan_photos")
    .select("id", { count: "exact", head: true })
    .eq("match", match);
  if (countErr) throw countErr;
  if ((count ?? 0) >= MAX_PER_MATCH) throw withCode(new Error("Limite atteinte."), "LIMIT");

  // 2) Compression + retrait EXIF.
  const { blob, ext, contentType } = await prepareImage(file);

  // 3) Chemin {uid}/{uuid}.{ext} puis upload.
  const path = `${uid}/${crypto.randomUUID()}.${ext}`;
  const up = await supabase.storage.from(BUCKET).upload(path, blob, {
    contentType,
    upsert: false,
  });
  if (up.error) throw withCode(new Error("Échec du téléversement."), "UPLOAD");

  // 4) Insert ; en cas d'échec, on nettoie l'objet (pas d'orphelin).
  const ins = await supabase.from("fan_photos").insert({
    user_id: uid,
    storage_path: path,
    match,
    context,
    location: location?.trim() || null,
    caption: caption?.trim() || null,
  });
  if (ins.error) {
    await supabase.storage.from(BUCKET).remove([path]); // nettoyage anti-orphelin
    // 23514 = check_violation, levée par le trigger de plafond.
    const isCap = ins.error.code === "23514" || /Limite de 3/.test(ins.error.message || "");
    throw withCode(new Error(ins.error.message || "Échec de l'enregistrement."), isCap ? "LIMIT" : "INSERT");
  }

  return true;
}

// Supprime une photo : la ligne (RLS owner) puis l'objet de stockage,
// pour libérer un emplacement.
export async function deletePhoto(photo) {
  if (!supabase) return;
  const { error } = await supabase.from("fan_photos").delete().eq("id", photo.id);
  if (error) throw error;
  if (photo.storage_path) {
    await supabase.storage.from(BUCKET).remove([photo.storage_path]);
  }
}

function withCode(err, code) {
  err.code = code;
  return err;
}
