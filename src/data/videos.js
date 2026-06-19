// Vidéos · clips auto-hébergés de la page /foto (onglet « Vidéos »).
// Clips courts publiés par la FHF (ou d'autres médias), servis depuis le site
// (pas YouTube). Distinct de la galerie des supporters (/galerie-supporters).
//
// Où mettre les fichiers (mp4 et poster dans le même dossier média) :
//   mp4    -> /public/media/videos/<slug>.mp4   (URL : /media/videos/<slug>.mp4)
//   poster -> /public/media/videos/<slug>.jpg   (URL : /media/videos/<slug>.jpg)
//
// Pour ajouter un clip : déposer le mp4 et le poster aux chemins ci-dessus,
// puis ajouter une entrée dans le tableau `videos` :
//   {
//     slug:        "migne-avant-bresil",        // identifiant unique
//     title:       "Titre en français",         // peut contenir « guillemets »
//     description: "Phrase de présentation.",    // optionnel
//     src:         "/media/videos/migne-avant-bresil.mp4",
//     poster:      "/media/videos/migne-avant-bresil.jpg",
//     date:        "2026-06-17",  // optionnel · format des albums (YYYY-MM-DD)
//     credit:      "FHF",         // optionnel · défaut "FHF"
//   }

// Crédit par défaut quand une entrée n'en précise pas.
export const DEFAULT_VIDEO_CREDIT = "FHF";

export const videos = [
  {
    slug: "migne-avant-bresil",
    title: "Sébastien Migné: « On est toujours en course »",
    description:
      "Au lendemain de l'Écosse, le sélectionneur Sébastien Migné fait le point sur l'état d'esprit du groupe et répond aux critiques sur le système, à quelques jours du Brésil. Entretien mené par Bermhan Gay.",
    src: "/media/videos/migne-avant-bresil.mp4",
    poster: "/media/videos/migne-avant-bresil.jpg",
    date: "2026-06-17",
    credit: "Chokarella",
  },
];
