// Matchs de préparation et camps de concentration des Grenadiers
// Mars 2026 (Toronto) + juin 2026 (Floride du Sud)

export const friendlies = {
  past: [
    {
      date: "Vendredi 5 juin 2026",
      opponent: "Pérou",
      result: "1-2",
      haitiScore: 1,
      opponentScore: 2,
      outcome: "L",
      venue: "Nu Stadium",
      city: "Miami, Floride",
      window: "Fenêtre internationale de juin 2026",
      liveSlug: "peru", // page détaillée /live/peru (chronologie, compos, stats)
    },
    {
      date: "Mardi 2 juin 2026",
      opponent: "Nouvelle-Zélande",
      result: "4-0",
      haitiScore: 4,
      opponentScore: 0,
      outcome: "W",
      venue: "Inter Miami CF Stadium",
      city: "Fort Lauderdale, Floride",
      window: "Fenêtre internationale de juin 2026",
      recapUrl: "/journal/haiti-nouvelle-zelande-amical",
      liveSlug: "new-zealand", // page détaillée /live/new-zealand (compos, chrono, stats)
    },
    {
      date: "31 mars 2026",
      opponent: "Islande",
      result: "1-1",
      haitiScore: 1,
      opponentScore: 1,
      outcome: "D",
      venue: "BMO Field",
      city: "Toronto, Canada",
      window: "Fenêtre internationale de mars 2026",
    },
    {
      date: "29 mars 2026",
      opponent: "Tunisie",
      result: "0-1",
      haitiScore: 0,
      opponentScore: 1,
      outcome: "L",
      venue: "BMO Field",
      city: "Toronto, Canada",
      window: "Fenêtre internationale de mars 2026",
    },
  ],
  upcoming: [],
};

// Camp d'entraînement / camp de concentration
// Deux phases : préparation pré-amicaux à Port St. Lucie (Floride), puis transfert à Stockton/Atlantic City après le 5 juin
export const trainingCamp = {
  phase1: {
    name: "Phase 1 — préparation en Floride du Sud",
    nameEn: "Phase 1: South Florida preparation",
    dates: "24 mai – 8 juin 2026",
    base: "voco Sandpiper All-Inclusive Resort",
    city: "Port St. Lucie, Floride",
    purpose:
      "Préparation pré-Mondial et disputation des deux matchs amicaux face à la Nouvelle-Zélande et au Pérou. Accès aux terrains et aux installations de récupération sur le site, en bordure de la rivière St. Lucie.",
    purposeEn:
      "Pre-World Cup preparation and the two friendlies against New Zealand and Peru. Access to the pitches and recovery facilities on site, along the St. Lucie River.",
  },
  phase2: {
    name: "Phase 2 — Camp de base officiel FIFA",
    nameEn: "Phase 2: Official FIFA base camp",
    dates: "Arrivée le 8 juin 2026",
    base: "Stockton University",
    facility: "G. Larry James Stadium et Sports Center",
    city: "Galloway, New Jersey",
    accommodation: "Sheraton Atlantic City Convention Center Hotel, Atlantic City",
    purpose:
      "Camp de base officiel FIFA pour la durée de la phase de groupes. Deux terrains extérieurs en gazon naturel, installations de physiothérapie et salles de travail technique. L'un des quatre camps de base situés dans le New Jersey, aux côtés du Brésil (Morris Township), du Maroc (Basking Ridge) et du Sénégal (Rutgers).",
    purposeEn:
      "Official FIFA base camp for the duration of the group stage. Two outdoor natural-grass pitches, physiotherapy facilities, and technical work rooms. One of four base camps located in New Jersey, alongside Brazil (Morris Township), Morocco (Basking Ridge), and Senegal (Rutgers).",
    selectedBy: "Fédération Haïtienne de Football, en coordination avec la FIFA",
    selectedByEn: "Haitian Football Federation, in coordination with FIFA",
    announced: "19 mai 2026",
    localTies: [
      {
        player: "Danley Jean-Jacques",
        connection: "Évolue au Philadelphia Union — à courte distance en voiture de Stockton.",
        connectionEn: "Plays for Philadelphia Union, a short drive from Stockton.",
      },
      {
        player: "Duke (Markhus) Lacroix",
        connection:
          "A grandi à Plumsted Township, dans le New Jersey. A joué à l'Université de Pennsylvanie (2011-2014) et avec les Ocean City Nor'easters en 2012-2013.",
        connectionEn:
          "Grew up in Plumsted Township, New Jersey. Played at the University of Pennsylvania (2011-2014) and with the Ocean City Nor'easters in 2012-2013.",
      },
    ],
  },
  notes:
    "Conformément à la réglementation FIFA, l'ensemble des séances d'entraînement à Stockton se déroulent à huis clos. Le site a précédemment accueilli la sélection saoudienne lors de la Coupe du Monde 1994, l'équipe olympique nigériane championne olympique en 1996, et le CR Flamengo pour la Coupe du Monde des Clubs FIFA 2025.",
  notesEn:
    "In line with FIFA regulations, all training sessions at Stockton are held behind closed doors. The site previously hosted the Saudi Arabia national team at the 1994 World Cup, Nigeria's gold-winning Olympic team in 1996, and CR Flamengo for the 2025 FIFA Club World Cup.",
};

// Résultats passés sourcés depuis la page FourFourTwo d'Haïti ; matchs à venir depuis la FHF, Inter Miami CF et The Haitian Times.
// Détails du camp d'entraînement sourcés depuis Stockton University, TCPalm, Yahoo Sports, Courier-Post.
