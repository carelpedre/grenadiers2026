// ╔══════════════════════════════════════════════════════════════════╗
// ║  CLIENT SUPABASE (AUTH) · surface photos des supporters           ║
// ║                                                                    ║
// ║  Unique client @supabase/supabase-js du site, réservé à la         ║
// ║  nouvelle surface authentifiée (auth Google + photos). Les API     ║
// ║  existantes (fanWallApi, pwonostikApi, fixturesApi, galleryApi)    ║
// ║  gardent VOLONTAIREMENT leurs appels fetch bruts : on ne les       ║
// ║  migre pas.                                                        ║
// ║                                                                    ║
// ║  Sûr pour le prérendu : le client n'est construit que dans le      ║
// ║  navigateur (garde typeof window), donc aucun accès top-level à    ║
// ║  window / localStorage côté Node (generate-route-html.mjs).        ║
// ╚══════════════════════════════════════════════════════════════════╝

import { createClient } from "@supabase/supabase-js";

const url = import.meta.env.VITE_SUPABASE_URL;
const key = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const authReady = Boolean(url && key);

// null hors navigateur (prérendu Node) ou si les variables d'env manquent.
// Les consommateurs (AuthContext) gèrent ce cas sans casser.
export const supabase =
  authReady && typeof window !== "undefined"
    ? createClient(url, key, {
        auth: {
          persistSession: true,
          autoRefreshToken: true,
          detectSessionInUrl: true,
          flowType: "pkce",
        },
      })
    : null;
