// ╔═══════════════════════════════════════════════════════════════════════╗
// ║  DONNÉES DES MATCHS EN DIRECT                                          ║
// ║                                                                        ║
// ║  Chaque match dispose d'un état « par défaut » avant le coup d'envoi ; ║
// ║  pendant la rencontre, la rédaction met à jour le statut, le score    ║
// ║  et la frise chronologique manuellement en éditant ce fichier puis    ║
// ║  en redéployant.                                                       ║
// ║                                                                        ║
// ║  Valeurs de statut :                                                   ║
// ║    "scheduled" — match à venir                                         ║
// ║    "live"      — rencontre en cours                                    ║
// ║    "ht"        — mi-temps                                              ║
// ║    "ft"        — fin de match                                          ║
// ║                                                                        ║
// ║  Types d'événements chronologiques :                                   ║
// ║    "goal" | "yellow" | "red" | "sub" | "kickoff" | "ht" | "ft" | "note"║
// ╚═══════════════════════════════════════════════════════════════════════╝

import { stadiums } from "./stadiums";

export const liveMatches = {
  "new-zealand": {
    slug: "new-zealand",
    // country = nom anglais en minuscules pour relier aux données API.
    opponent: { name: "Nouvelle-Zélande", country: "new zealand" },
    haitiName: "Haïti",
    matchNumber: null,
    group: "Match amical",
    date: "2026-06-02",
    kickoff: "2026-06-02T19:30:00-04:00",
    dateLabel: "Mardi 2 juin 2026",
    timeLabel: "19h30 ET · Inter Miami CF Stadium",
    stadium: {
      fifaName: "Inter Miami CF Stadium",
      city: "Fort Lauderdale, Floride, États-Unis",
      capacity: 21550,
      surface: "Pelouse naturelle",
    },
    status: "scheduled",
    minute: null,
    haitiScore: 0,
    opponentScore: 0,
    timeline: [],
    haitiLineup: [],
    opponentLineup: [],
    journal: "/journal/haiti-nouvelle-zelande-amical",
  },
  peru: {
    slug: "peru",
    opponent: { name: "Pérou", country: "peru" },
    haitiName: "Haïti",
    matchNumber: null, // match amical — pas de numéro de match du Mondial
    group: "Match amical",
    date: "2026-06-05",
    kickoff: "2026-06-05T20:00:00-04:00",
    dateLabel: "Vendredi 5 juin 2026",
    timeLabel: "20h00 ET · Nu Stadium",
    access: "À guichets fermés · Portes 18h · Parking 17h",
    stadium: {
      fifaName: "Nu Stadium",
      city: "Miami, Floride, États-Unis",
      capacity: 26700,
      surface: "Pelouse naturelle",
    },
    status: "scheduled", // scheduled | live | ht | ft
    minute: null,
    haitiScore: 0,
    opponentScore: 0,
    timeline: [],
    haitiLineup: [],
    opponentLineup: [],
    broadcast:
      "Ayibo.tv · FOX One (abonnement, essai gratuit) · Fox Sports (gratuit) · Fubo (abonnement, essai gratuit)",
  },
  scotland: {
    slug: "scotland",
    opponent: { name: "Écosse", country: "scotland" },
    haitiName: "Haïti",
    matchNumber: 5,
    group: "Groupe C",
    date: "2026-06-13",
    kickoff: "2026-06-13T21:00:00-04:00",
    dateLabel: "Samedi 13 juin 2026",
    timeLabel: "21h00 ET · Gillette Stadium",
    stadium: stadiums.gillette,
    status: "scheduled", // scheduled | live | ht | ft
    minute: null,
    haitiScore: 0,
    opponentScore: 0,
    timeline: [],
    haitiLineup: [],
    opponentLineup: [],
    broadcast: "FS1 (États-Unis) · BBC (Royaume-Uni) · TV5 (Caraïbes)",
  },
  brazil: {
    slug: "brazil",
    opponent: { name: "Brésil", country: "brazil" },
    haitiName: "Haïti",
    matchNumber: 27,
    group: "Groupe C",
    date: "2026-06-19",
    kickoff: "2026-06-19T21:00:00-04:00",
    dateLabel: "Vendredi 19 juin 2026",
    timeLabel: "21h00 ET · Lincoln Financial Field",
    stadium: stadiums.lincoln,
    status: "scheduled",
    minute: null,
    haitiScore: 0,
    opponentScore: 0,
    timeline: [],
    haitiLineup: [],
    opponentLineup: [],
    broadcast: "FOX (États-Unis) · Globo (Brésil) · TV5 (Caraïbes)",
  },
  morocco: {
    slug: "morocco",
    opponent: { name: "Maroc", country: "morocco" },
    haitiName: "Haïti",
    matchNumber: 50,
    group: "Groupe C",
    date: "2026-06-24",
    kickoff: "2026-06-24T18:00:00-04:00",
    dateLabel: "Mercredi 24 juin 2026",
    timeLabel: "18h00 ET · Mercedes-Benz Stadium",
    stadium: stadiums.mercedesBenz,
    status: "scheduled",
    minute: null,
    haitiScore: 0,
    opponentScore: 0,
    timeline: [],
    haitiLineup: [],
    opponentLineup: [],
    broadcast: "FOX (États-Unis) · Arryadia (Maroc) · TV5 (Caraïbes)",
  },
};

// ─── Modèles d'événements chronologiques (référence pour la mise à jour) ─
//
// Pré-match :
//   { type: "note", text: "Compositions confirmées. Bellegarde titulaire." }
//
// Coup d'envoi :
//   { type: "kickoff", minute: 0, text: "C'est parti à Foxborough." }
//
// But :
//   { type: "goal", minute: 23, side: "haiti",    scorer: "Frantzdy Pierrot", note: "Tête sur un centre de Bellegarde." }
//   { type: "goal", minute: 41, side: "opponent", scorer: "John McGinn",      note: "Coup franc à 25 mètres." }
//
// Carton :
//   { type: "yellow", minute: 34, side: "haiti",    player: "Hannes Delcroix", note: "Faute tactique." }
//   { type: "red",    minute: 67, side: "opponent", player: "Scott McTominay" }
//
// Changement :
//   { type: "sub", minute: 60, side: "haiti", on: "Lenny Joseph", off: "Frantzdy Pierrot" }
//
// Mi-temps / Fin de match :
//   { type: "ht", text: "Mi-temps. 1-1 au Gillette Stadium." }
//   { type: "ft", text: "Fin de match. Haïti 1, Écosse 1." }

export function getMatch(slug) {
  return liveMatches[slug] || null;
}
