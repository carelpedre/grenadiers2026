// ╔══════════════════════════════════════════════════════════════════╗
// ║  QUIZ GRENADIER — banque de questions                             ║
// ║  Français uniquement. Faits vérifiés et cohérents avec le site.  ║
// ║                                                                    ║
// ║  Chaque question : { theme, q, options[4], answer (index 0-3),    ║
// ║  fact (explication affichée après la réponse) }.                  ║
// ╚══════════════════════════════════════════════════════════════════╝

export const quizThemes = [
  {
    id: "1974",
    label: "1974",
    title: "La première Coupe du Monde",
    blurb: "Munich, Manno Sanon et les pionniers.",
  },
  {
    id: "squad2026",
    label: "La sélection 2026",
    title: "Les Grenadiers d'aujourd'hui",
    blurb: "Les vingt-six hommes de Sébastien Migné.",
  },
  {
    id: "fhf",
    label: "Fédération & histoire",
    title: "La FHF et les repères",
    blurb: "Institution, chiffres et grandes dates.",
  },
];

export const quizQuestions = [
  // ─── THÈME 1 · 1974 ───────────────────────────────────────────────
  {
    theme: "1974",
    q: "En quelle année Haïti a-t-il disputé sa première Coupe du Monde ?",
    options: ["1970", "1974", "1978", "1982"],
    answer: 1,
    fact: "En 1974, en Allemagne de l'Ouest, Haïti disputait la première — et jusqu'en 2026, la seule — Coupe du Monde masculine de son histoire.",
  },
  {
    theme: "1974",
    q: "Quel gardien italien Manno Sanon a-t-il battu, mettant fin à une série record d'invincibilité ?",
    options: ["Walter Zenga", "Gianluigi Buffon", "Dino Zoff", "Enrico Albertosi"],
    answer: 2,
    fact: "Le 15 juin 1974, Sanon contourne Dino Zoff et marque — le premier but encaissé par le gardien italien en sélection depuis près de deux ans.",
  },
  {
    theme: "1974",
    q: "Combien de minutes durait la série d'invincibilité de Dino Zoff avant le but de Sanon ?",
    options: ["870 minutes", "1 142 minutes", "1 320 minutes", "998 minutes"],
    answer: 1,
    fact: "1 142 minutes sans encaisser le moindre but en sélection — une séquence exceptionnelle, stoppée net par un attaquant haïtien.",
  },
  {
    theme: "1974",
    q: "Dans quel pays s'est déroulée la Coupe du Monde 1974 ?",
    options: ["Italie", "Argentine", "Allemagne de l'Ouest", "Espagne"],
    answer: 2,
    fact: "La compétition s'est tenue en Allemagne de l'Ouest. Haïti a joué ses trois matchs à l'Olympiastadion de Munich.",
  },
  {
    theme: "1974",
    q: "Combien de buts Manno Sanon a-t-il inscrits lors de la Coupe du Monde 1974 ?",
    options: ["1", "2", "3", "5"],
    answer: 1,
    fact: "Deux buts — face à l'Italie, puis face à l'Argentine. Ce sont les seuls buts haïtiens en Coupe du Monde à ce jour.",
  },
  {
    theme: "1974",
    q: "Qui était le sélectionneur d'Haïti en 1974 ?",
    options: ["Antoine Tassy", "Wilner Nazaire", "Philippe Vorbe", "Henri Françillon"],
    answer: 0,
    fact: "Antoine Tassy a conduit la sélection à son titre CONCACAF de 1973, puis à sa première Coupe du Monde.",
  },
  {
    theme: "1974",
    q: "Quel titre Haïti a-t-il remporté en 1973 pour se qualifier ?",
    options: ["La Gold Cup", "Le Championnat de la CONCACAF", "La Copa América", "La Coupe Caribéenne"],
    answer: 1,
    fact: "Champion de la CONCACAF à Port-au-Prince en 1973 — pour la première et, à ce jour, la seule fois de son histoire.",
  },
  {
    theme: "1974",
    q: "Quel surnom le gardien Henri Françillon a-t-il gagné à Munich ?",
    options: ["Le Mur", "L'Aigle Noir", "Le Chat des Caraïbes", "La Panthère"],
    answer: 2,
    fact: "« Le Chat des Caraïbes » : ses arrêts ont tenu l'Italie en échec pendant toute la première période (0-0 à la mi-temps).",
  },
  {
    theme: "1974",
    q: "Quelle place la Pologne — adversaire d'Haïti en 1974 — a-t-elle décrochée à ce Mondial ?",
    options: ["Championne", "Finaliste", "Troisième", "Éliminée au premier tour"],
    answer: 2,
    fact: "La Pologne de Lato, Szarmach et Deyna a terminé troisième de la Coupe du Monde 1974.",
  },
  {
    theme: "1974",
    q: "En 1994, quel magazine a inclus Manno Sanon parmi les cent plus grandes figures de la Coupe du Monde ?",
    options: ["France Football", "L'Équipe", "So Foot", "World Soccer"],
    answer: 0,
    fact: "France Football a classé Sanon parmi les légendes du Mondial — un Haïtien aux côtés des plus grands.",
  },

  // ─── 1974 · ajouts difficiles ─────────────────────────────────────
  {
    theme: "1974",
    q: "Quels furent les trois adversaires d'Haïti lors du Mondial 1974 ?",
    options: ["Italie, Pologne, Argentine", "Italie, Brésil, Pologne", "Allemagne, Italie, Argentine", "Pologne, Uruguay, Italie"],
    answer: 0,
    fact: "Groupe 4 à Munich : l'Italie, la Pologne, puis l'Argentine — trois cadors pour des débutants.",
  },
  {
    theme: "1974",
    q: "Sur quel score Haïti s'est-il incliné face à la Pologne en 1974 ?",
    options: ["3-0", "7-0", "5-1", "4-1"],
    answer: 1,
    fact: "Défaite 7-0 contre la Pologne de Lato et Szarmach, future troisième du tournoi.",
  },
  {
    theme: "1974",
    q: "Quel fut le score du match Haïti–Argentine en 1974 ?",
    options: ["4-1", "2-1", "3-0", "4-2"],
    answer: 0,
    fact: "Défaite 4-1 — mais Sanon y inscrit son second but du tournoi, après celui contre l'Italie.",
  },
  {
    theme: "1974",
    q: "Qui portait le brassard de capitaine d'Haïti à Munich en 1974 ?",
    options: ["Philippe Vorbe", "Wilner Nazaire", "Manno Sanon", "Henri Françillon"],
    answer: 1,
    fact: "Wilner Nazaire, capitaine des pionniers de Munich — et toujours vivant aujourd'hui.",
  },
  {
    theme: "1974",
    q: "Dans quel stade Haïti a-t-il disputé ses trois matchs en 1974 ?",
    options: ["Westfalenstadion (Dortmund)", "Volksparkstadion (Hambourg)", "Olympiastadion (Munich)", "Waldstadion (Francfort)"],
    answer: 2,
    fact: "Les trois rencontres se sont jouées à l'Olympiastadion de Munich.",
  },
  {
    theme: "1974",
    q: "Qui a délivré la passe décisive sur le but de Sanon contre l'Italie ?",
    options: ["Guy Saint-Vil", "Philippe Vorbe", "Wilner Nazaire", "Henri Françillon"],
    answer: 1,
    fact: "Philippe Vorbe, meneur du Violette AC, est à l'origine du but le plus célèbre du football haïtien.",
  },

  // ─── THÈME 2 · LA SÉLECTION 2026 ──────────────────────────────────
  {
    theme: "squad2026",
    q: "Qui est le sélectionneur d'Haïti pour la Coupe du Monde 2026 ?",
    options: ["Marc Collat", "Sébastien Migné", "Gabriel Calderón", "Jean-Jacques Pierre"],
    answer: 1,
    fact: "Sébastien Migné a dévoilé sa liste définitive de 26 joueurs le 16 mai 2026.",
  },
  {
    theme: "squad2026",
    q: "Qui est le capitaine de la sélection 2026 ?",
    options: ["Duckens Nazon", "Frantzdy Pierrot", "Johny Placide", "Carl Fred Sainté"],
    answer: 2,
    fact: "Le gardien Johny Placide, 38 ans, est le capitaine et le doyen de la sélection.",
  },
  {
    theme: "squad2026",
    q: "Combien de joueurs composent la liste finale retenue par Migné ?",
    options: ["23", "25", "26", "28"],
    answer: 2,
    fact: "Vingt-six joueurs. Vingt-cinq évoluent à l'étranger, un seul au pays.",
  },
  {
    theme: "squad2026",
    q: "Quel est le seul joueur de la sélection évoluant dans le championnat haïtien ?",
    options: ["Keeto Thermoncy", "Woodensky Pierre", "Lenny Joseph", "Wilguens Paugain"],
    answer: 1,
    fact: "Woodensky Pierre, milieu défensif du Violette AC à Port-au-Prince — le seul « local » du groupe.",
  },
  {
    theme: "squad2026",
    q: "Pour quel club Woodensky Pierre joue-t-il à Port-au-Prince ?",
    options: ["Racing Club Haïtien", "Aigle Noir AC", "Violette AC", "Cavaly AS"],
    answer: 2,
    fact: "Le Violette Athletic Club — le doyen des clubs haïtiens, qui avait déjà fourni des joueurs à la sélection de 1974.",
  },
  {
    theme: "squad2026",
    q: "Qui est le meilleur buteur de l'histoire de la sélection haïtienne ?",
    options: ["Frantzdy Pierrot", "Wilson Isidor", "Duckens Nazon", "Manno Sanon"],
    answer: 2,
    fact: "Duckens Nazon est le meilleur buteur de tous les temps des Grenadiers.",
  },
  {
    theme: "squad2026",
    q: "Dans quel groupe Haïti évolue-t-il à la Coupe du Monde 2026 ?",
    options: ["Groupe A", "Groupe C", "Groupe E", "Groupe G"],
    answer: 1,
    fact: "Haïti figure dans le Groupe C de la Coupe du Monde FIFA 2026.",
  },
  {
    theme: "squad2026",
    q: "Qui est le plus jeune joueur de la sélection 2026 ?",
    options: ["Woodensky Pierre", "Keeto Thermoncy", "Lenny Joseph", "Wilson Isidor"],
    answer: 1,
    fact: "Keeto Thermoncy, défenseur né le 29 mars 2006 — le cadet du groupe à 20 ans.",
  },
  {
    theme: "squad2026",
    q: "Contre quelle équipe Haïti dispute-t-il son premier match du Mondial 2026 ?",
    options: ["Le Brésil", "L'Argentine", "L'Écosse", "Le Maroc"],
    answer: 2,
    fact: "Premier match le 13 juin 2026 face à l'Écosse, au Gillette Stadium de Foxborough, près de Boston.",
  },
  {
    theme: "squad2026",
    q: "Près de quelle ville américaine Haïti dispute-t-il son premier match ?",
    options: ["New York", "Miami", "Boston", "Atlanta"],
    answer: 2,
    fact: "Au Gillette Stadium de Foxborough, dans la région de Boston — l'équivalent le plus proche d'un match à domicile pour la diaspora.",
  },

  // ─── squad2026 · ajouts difficiles ────────────────────────────────
  {
    theme: "squad2026",
    q: "Combien d'attaquants figurent dans la liste des 26 de Migné ?",
    options: ["6", "7", "8", "9"],
    answer: 3,
    fact: "Neuf attaquants, pour 3 gardiens, 8 défenseurs et 6 milieux — un groupe tourné vers l'avant.",
  },
  {
    theme: "squad2026",
    q: "Dans combien de pays différents évoluent les clubs des 26 sélectionnés ?",
    options: ["11", "13", "15", "18"],
    answer: 2,
    fact: "Quinze pays — de la France au Canada en passant par l'Iran : le reflet d'une diaspora mondiale.",
  },
  {
    theme: "squad2026",
    q: "Quel Grenadier évolue au Toronto FC, au Canada ?",
    options: ["Derrick Etienne Jr.", "Danley Jean Jacques", "Carl Sainté", "Ruben Providence"],
    answer: 0,
    fact: "Derrick Etienne Jr., ailier du Toronto FC — seul représentant de la MLS canadienne dans le groupe.",
  },
  {
    theme: "squad2026",
    q: "Sur quel score Haïti a-t-il battu la Nouvelle-Zélande en amical, le 2 juin 2026 ?",
    options: ["1-0", "2-1", "3-1", "4-0"],
    answer: 3,
    fact: "Large victoire 4-0 à Fort Lauderdale (Providence, Joseph, Pierrot, Lacroix) à dix jours du Mondial.",
  },
  {
    theme: "squad2026",
    q: "À quel poste joue le capitaine Johny Placide ?",
    options: ["Défenseur central", "Gardien", "Milieu défensif", "Latéral"],
    answer: 1,
    fact: "Gardien de but et doyen du groupe à 38 ans, Placide porte le brassard.",
  },

  // ─── THÈME 3 · FÉDÉRATION & HISTOIRE ──────────────────────────────
  {
    theme: "fhf",
    q: "Qui préside le Comité de Normalisation de la FHF ?",
    options: ["Monique André", "Pia Sundhage", "Carine Roy", "Yves Jean-Bart"],
    answer: 0,
    fact: "Monique André, nommée par la FIFA à la tête du Comité de Normalisation le 30 novembre 2024.",
  },
  {
    theme: "fhf",
    q: "Qui a été nommée à la tête de la sélection féminine d'Haïti en février 2026 ?",
    options: ["Corinne Diacre", "Nora Häuptle", "Pia Sundhage", "Monique André"],
    answer: 2,
    fact: "La nomination historique de la Suédoise Pia Sundhage, double championne olympique comme sélectionneuse.",
  },
  {
    theme: "fhf",
    q: "Dans quel stade de Port-au-Prince Haïti a-t-il décroché sa qualification de 1973 ?",
    options: ["Stade Sylvio Cator", "Parc Sainte-Thérèse", "Stade Pradel", "Stade Robert Duval"],
    answer: 0,
    fact: "Le Stade Sylvio Cator, au cœur de Port-au-Prince — le théâtre du titre CONCACAF 1973.",
  },
  {
    theme: "fhf",
    q: "Combien d'années séparent les deux Coupes du Monde masculines d'Haïti (1974 et 2026) ?",
    options: ["44 ans", "48 ans", "52 ans", "60 ans"],
    answer: 2,
    fact: "Cinquante-deux ans — toute une histoire entre les pionniers de Munich et les Grenadiers de 2026.",
  },
  {
    theme: "fhf",
    q: "Quel joueur de 1974 incarne le lien avec le Violette AC, repris en 2026 par Woodensky Pierre ?",
    options: ["Philippe Vorbe", "Wilner Nazaire", "Henri Françillon", "Guy Saint-Vil"],
    answer: 0,
    fact: "Philippe Vorbe, meneur du Violette en 1974, a délivré la passe du but de Sanon. Le même club envoie aujourd'hui Woodensky Pierre au Mondial.",
  },
  {
    theme: "fhf",
    q: "En 2025-2026, quel programme de jeunes d'Haïti s'est qualifié pour une Coupe du Monde FIFA U-17 ?",
    options: ["Aucun", "Les U-17 masculins", "Les U-23", "Les U-15"],
    answer: 1,
    fact: "Sous la direction du Comité de Normalisation, les jeunes Grenadiers se sont qualifiés pour la Coupe du Monde U-17.",
  },

  // ─── fhf · ajouts difficiles ──────────────────────────────────────
  {
    theme: "fhf",
    q: "Quand la FIFA a-t-elle installé le Comité de Normalisation à la tête de la FHF ?",
    options: ["Le 30 novembre 2024", "En janvier 2023", "En juin 2025", "En mars 2024"],
    answer: 0,
    fact: "Le 30 novembre 2024, la FIFA confie la FHF à un Comité de Normalisation présidé par Monique André.",
  },
  {
    theme: "fhf",
    q: "Quel exploit Pia Sundhage, sélectionneuse des Grenadières, a-t-elle réalisé comme entraîneuse ?",
    options: ["Une Coupe du Monde", "Deux titres olympiques", "Une Ligue des Champions", "Trois Euros"],
    answer: 1,
    fact: "Double championne olympique sur le banc (2008 et 2012) — une référence mondiale.",
  },
  {
    theme: "fhf",
    q: "Combien de Coupes du Monde masculines Haïti avait-il disputées avant 2026 ?",
    options: ["Aucune", "Une seule", "Deux", "Trois"],
    answer: 1,
    fact: "Une seule, en 1974. 2026 marque le retour, 52 ans plus tard.",
  },
  {
    theme: "fhf",
    q: "Quel sélectionneur a offert à Haïti son titre CONCACAF de 1973 ?",
    options: ["Antoine Tassy", "Sébastien Migné", "Philippe Vorbe", "Marc Collat"],
    answer: 0,
    fact: "Antoine Tassy, architecte du sacre continental de 1973 qui ouvrit la route de Munich.",
  },
  {
    theme: "fhf",
    q: "En quelle année la sélection féminine d'Haïti a-t-elle disputé sa première Coupe du Monde féminine ?",
    options: ["2015", "2019", "2023", "2011"],
    answer: 2,
    fact: "Les Grenadières se sont qualifiées pour la première fois en 2023 (Australie–Nouvelle-Zélande) — une qualification historique.",
  },
  {
    theme: "fhf",
    q: "Quel est le surnom de la sélection masculine d'Haïti ?",
    options: ["Les Cacos", "Les Grenadiers", "Les Citadelles", "Les Bicolores"],
    answer: 1,
    fact: "« Les Grenadiers » — en hommage aux soldats de l'indépendance haïtienne.",
  },
  {
    theme: "fhf",
    q: "Quelles couleurs portent traditionnellement les Grenadiers ?",
    options: ["Noir et or", "Bleu et rouge", "Vert et rouge", "Blanc et bleu"],
    answer: 1,
    fact: "Le bleu et le rouge du drapeau haïtien — sans noir, conformément à l'identité de la sélection.",
  },
];
