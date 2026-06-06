// Noms d'équipes en français à partir des libellés du fournisseur de données (anglais).
// Partagé par /matches et /live pour un affichage cohérent.

export const OPP_FR = {
  peru: "Pérou",
  scotland: "Écosse",
  brazil: "Brésil",
  morocco: "Maroc",
  haiti: "Haïti",
  "new zealand": "Nouvelle-Zélande",
  iceland: "Islande",
  tunisia: "Tunisie",
  "costa rica": "Costa Rica",
  nicaragua: "Nicaragua",
};

export function frName(apiName) {
  return OPP_FR[apiName?.toLowerCase()?.trim()] || apiName;
}
