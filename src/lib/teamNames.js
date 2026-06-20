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

// Noms d'équipes en anglais (exonymes). Pour l'affichage en mode anglais.
export const OPP_EN = {
  peru: "Peru",
  scotland: "Scotland",
  brazil: "Brazil",
  morocco: "Morocco",
  haiti: "Haiti",
  "new zealand": "New Zealand",
  iceland: "Iceland",
  tunisia: "Tunisia",
  "costa rica": "Costa Rica",
  nicaragua: "Nicaragua",
};

export function enName(apiName) {
  return OPP_EN[apiName?.toLowerCase()?.trim()] || apiName;
}

// Nom d'équipe selon la langue active ("en" → exonyme anglais, sinon français).
export function teamName(apiName, lang) {
  return lang === "en" ? enName(apiName) : frName(apiName);
}
