// Données de la Fédération Haïtienne de Football (FHF)
// Sources : fhf.ht (officiel), Wikipedia, Le Nouvelliste, FIFA, Sport Passion Info

export const federation = {
  name: {
    en: "Haitian Football Federation",
    fr: "Fédération Haïtienne de Football",
    ht: "Federasyon Foutbòl Ayisyen",
  },
  abbreviation: "FHF",
  logo: "/images/brand/fhf-logo.svg",
  founded: 1904,
  founder: "Constantin Henriquez",
  founderNote:
    "Médecin, olympien, pionnier qui a introduit le football en Haïti. Après avoir remporté l'or olympique avec la France en rugby aux Jeux de Paris en 1900 — devenant le premier médaillé d'or olympique noir reconnu —, Henriquez rentre en Haïti et introduit le football d'association en 1904. Il inscrit ce qui est considéré comme le premier but officiellement répertorié en Haïti dans un match organisé, et cofonde l'Union Sportive Haïtienne avec son frère Alphonse. La Fédération Haïtienne de Football émerge de cet écosystème la même année. Il devient ensuite sénateur de la République.",
  publicUtility: 1952,
  publicUtilityNote: "Reconnue d'utilité publique en Haïti par décret présidentiel le 4 avril 1952.",
  fifaAffiliation: 1934,
  concacafAffiliation: 1961,
  concacafFoundingMember: true,
  headquarters: "Port-au-Prince, Haïti",
  homeStadium: {
    name: "Stade Sylvio Cator",
    city: "Port-au-Prince",
    note: "Enceinte historique de la sélection nationale, inscrite au patrimoine sportif haïtien.",
  },
  website: "https://fhf.ht",
  currentLeadership: {
    structure: "Comité de Normalisation",
    structureNote:
      "Depuis décembre 2020, la FHF est administrée par un Comité de Normalisation nommé par la FIFA, suite à la suspension à vie prononcée contre l'ancien président Yves Jean-Bart par la Commission d'éthique de la FIFA en novembre 2020.",
    featured: {
      name: "Monique André",
      role: "Présidente · Comité de Normalisation",
      since: "30 novembre 2024",
      photo: "/images/photos/monique-andre.jpg",
      photoLabel: "Monique André · Présidente du Comité de Normalisation de la FHF",
      bio: "Nommée par la FIFA à la tête du Comité de Normalisation de la FHF le 30 novembre 2024, en remplacement de l'administrateur cubain Luiz Hernandez. Son mandat a depuis été reconduit par la FIFA. Sous sa direction, la fédération a mené à bien la qualification d'Haïti pour la Coupe du Monde 2026, la campagne éliminatoire de la sélection masculine senior disputée sans stade à domicile, la qualification du programme de jeunes pour la Coupe du Monde FIFA U-17 au Qatar, ainsi que la nomination historique de Pia Sundhage à la tête de la sélection féminine en février 2026.",
      milestones: [
        "30 novembre 2024 — Nomination à la présidence du Comité de Normalisation",
        "14 janvier 2025 — Rencontre à haut niveau avec la FIFA à Zurich",
        "Février 2025 — Entretien au Le Nouvelliste sur les perspectives du programme",
        "18 novembre 2025 — À la tête de la FHF lors de la qualification masculine pour le Mondial à Curaçao",
        "26 novembre 2025 — Don de 13 millions de gourdes reçu de Natcom S.A. pour le programme masculin",
        "13 février 2026 — Annonce de la nomination de Pia Sundhage comme sélectionneure des Grenadières",
      ],
      previousRoles:
        "Précédemment membre du Comité de Normalisation aux côtés d'Yvon Sévère. A représenté Haïti au 2e Symposium FIFA sur le football féminin à Sydney, dans le sillage de la Coupe du Monde féminine 2023.",
    },
    committee: [
      { role: "Présidente", name: "Monique André" },
      { role: "Membre", name: "Yvon Sévère" },
      { role: "Membre", name: "Gally Amazan" },
    ],
    members: [
      { role: "Secrétaire général", name: "Patrick Massenat" },
      { role: "Directeur technique national", name: "Pierre Cherry" },
      { role: "Sélectionneur des Grenadiers", name: "Sébastien Migné" },
      { role: "Sélectionneure des Grenadières", name: "Pia Sundhage" },
      { role: "Responsable communication", name: "Louis Charles" },
      { role: "Coordonnateur futsal", name: "Frédéric Aupont" },
      { role: "Président de la Commission des arbitres", name: "Wilson Tolus" },
    ],
  },
  competitionsOrganized: [
    "Ligue Haïtienne — championnat de première division masculine professionnelle",
    "Coupe d'Haïti — compétition nationale à élimination directe",
    "Championnat féminin de Ligue Haïtienne",
    "Compétitions des sélections jeunes (U-15, U-17, U-20, U-23)",
    "Championnat national de futsal",
  ],
  notableMilestones: [
    // ─── Institution ──────────────────────────────────────────────
    { year: 1904, team: "Institution", event: "Fondation de la fédération sous le nom de Commission de Football de l'Union des Sociétés Sportives Haïtiennes" },
    { year: 1934, team: "Institution", event: "Affiliation à la FIFA" },
    { year: 1952, team: "Institution", event: "Reconnaissance d'utilité publique par décret présidentiel" },
    { year: 1961, team: "Institution", event: "Membre fondateur de la CONCACAF" },

    // ─── Sélection nationale A masculine ─────────────────────────
    { year: 1973, team: "Hommes A", event: "Champion CONCACAF à Port-au-Prince — premier titre continental masculin, qualification pour la Coupe du Monde" },
    { year: 1974, team: "Hommes A", event: "Première participation à la Coupe du Monde de la FIFA en Allemagne de l'Ouest — but de Manno Sanon face à l'Italie" },

    // ─── Sélection nationale A féminine ──────────────────────────
    { year: 1991, team: "Femmes A", event: "Premier match international des Grenadières : Haïti–Jamaïque (1-0) à Port-au-Prince" },

    // ─── Jeunes U-17 masculin (premiers pas internationaux) ──────
    { year: 2007, team: "Hommes U-17", event: "Première participation à la Coupe du Monde U-17 de la FIFA, en Corée du Sud" },

    // ─── A masculin — Coupe des Caraïbes ────────────────────────
    { year: 2007, team: "Hommes A", event: "Champion de la Coupe des Caraïbes" },

    // ─── U-17 masculin — titre régional ─────────────────────────
    { year: 2014, team: "Hommes U-17", event: "Champion du Tournoi CFU U-17 à Port-au-Prince" },

    // ─── U-20 masculin — titre régional ─────────────────────────
    { year: 2016, team: "Hommes U-20", event: "Champion du Tournoi CFU U-20, face à Antigua-et-Barbuda en finale" },

    // ─── U-20 féminin — première participation mondiale ─────────
    { year: 2018, team: "Femmes U-20", event: "Première participation à la Coupe du Monde U-20 féminine de la FIFA, en France. Troisième place au CONCACAF U-20 féminin" },

    // ─── U-17 masculin — qualification Coupe du Monde ───────────
    { year: 2019, team: "Hommes U-17", event: "Troisième place au CONCACAF U-17, qualification pour la Coupe du Monde U-17 de la FIFA au Brésil" },

    // ─── 2020 — Normalisation + U-20 féminin podium ─────────────
    { year: 2020, team: "Institution", event: "Mise en place du Comité de Normalisation par la FIFA" },
    { year: 2020, team: "Femmes U-20", event: "Troisième place au CONCACAF U-20 féminin" },

    // ─── 2023 — Première Coupe du Monde féminine ───────────────
    { year: 2023, team: "Femmes A", event: "Première participation à la Coupe du Monde féminine de la FIFA, en Australie et en Nouvelle-Zélande" },

    // ─── 2024 — Présidence + U-17 féminin demi-finale ──────────
    { year: 2024, team: "Institution", event: "Nomination de Monique André à la présidence du Comité de Normalisation" },
    { year: 2024, team: "Femmes U-17", event: "Demi-finales du Championnat CONCACAF U-17 féminin — meilleur parcours à ce jour" },

    // ─── 2025 — Hommes A qualifié + U-17 masculin Qatar ────────
    { year: 2025, team: "Hommes A", event: "Qualification d'Haïti pour la Coupe du Monde de la FIFA 2026 — premier retour masculin en 52 ans" },
    { year: 2025, team: "Hommes U-17", event: "Qualification pour la Coupe du Monde U-17 de la FIFA au Qatar (Groupe E remporté)" },

    // ─── 2026 — Année record ───────────────────────────────────
    { year: 2026, team: "Femmes A", event: "Pia Sundhage — Sélectionneuse de l'Année FIFA 2012 — nommée à la tête des Grenadières" },
    { year: 2026, team: "Hommes U-17", event: "Deuxième qualification consécutive pour la Coupe du Monde U-17 de la FIFA — une première dans l'histoire haïtienne" },
    { year: 2026, team: "Hommes U-20", event: "Qualification pour le Championnat CONCACAF U-20" },
    { year: 2026, team: "Institution", event: "Adoption à l'unanimité des nouveaux statuts de la FHF — vingt délégués des clubs masculins, féminins et des ligues réunis en congrès extraordinaire sous la supervision du Comité de Normalisation et de la FIFA" },
    { year: 2026, team: "Hommes A", event: "Deuxième Coupe du Monde de la FIFA — Groupe C face à l'Écosse, au Brésil et au Maroc" },
  ],
};
