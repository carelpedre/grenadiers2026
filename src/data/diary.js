// Le Journal — chronique de la sélection nationale haïtienne durant
// la campagne de la Coupe du Monde 2026.
//
// Schéma d'une entrée :
//   slug         : URL slug (/journal/<slug>)
//   date         : ISO date YYYY-MM-DD (used for sorting)
//   dateLabel    : human-readable date (e.g. "30 mai 2026")
//   eyebrow      : small overline above title (e.g. "Diaspora · North Miami")
//   title        : article title
//   dek          : 1-2 sentence subtitle/standfirst
//   cover        : hero image path
//   body         : array of paragraphs
//   source       : optional credit line shown below body
//   albums       : array of { title?, photos: [{src, alt}, ...] }
//                  - If a single album has no title, it renders as a flat gallery.
//                  - Multiple albums each render with their title as a subsection.
//   gallery      : (legacy) flat photo array — still supported; treated as one untitled album.

export const diaryEntries = [
  {
    slug: "haiti-perou-bilan-2-1",
    date: "2026-06-05",
    dateLabel: "5 juin 2026",
    eyebrow: "Actualité · Rapport de match",
    // Lie l'article au match correspondant dans les données live.
    fixtureOpponent: "peru",
    fixtureOpponentLabel: "Pérou",
    title: "Une heure de maîtrise, dix minutes fatales : Haïti s'incline 2-1 face au Pérou",
    dek: "Au Nu Stadium de Miami, les Grenadiers ont maîtrisé près d'une heure de jeu avant de céder sur deux coups de pied arrêtés. Bilan d'une défaite riche d'enseignements, à huit jours de l'entrée en lice face à l'Écosse.",
    cover: "/images/journal/journal-perou-bilan.jpg",
    coverCredit: "Photo : Matias J. Ocner / Miami Herald",
    body: [
      "Pour son ultime répétition avant la Coupe du Monde, Haïti a longtemps tenu tête au Pérou au Nu Stadium de Miami, avant de céder dans le dernier quart d'heure et de s'incliner 2-1. Une soirée à deux visages, qui laisse autant de motifs d'encouragement que de chantiers à régler, à huit jours de l'entrée en lice face à l'Écosse.",
      "Tout avait pourtant bien commencé. Galvanisés par leur succès 4-0 contre la Nouvelle-Zélande, les Grenadiers ont imposé leur intensité d'entrée. À la 16e minute, le pressing a payé : Jean-Ricner Bellegarde a récupéré le ballon dans les pieds d'André Carrillo, Louicius Deedson a glissé une passe parfaite, et Wilson Isidor a conclu sans trembler. 1-0, et un Isidor encore décisif, dans la continuité de l'engagement qu'il affiche depuis son choix de représenter Haïti.",
      "Pendant près d'une heure, Haïti a maîtrisé son sujet. Solide défensivement, propre dans la relance, dangereux en transition, l'équipe de Sébastien Migné a longtemps muselé un adversaire pourtant mieux classé. Ruben Providence et Frantzdy Pierrot se sont même procuré quelques occasions de faire le break.",
      "Mais le Pérou est revenu des vestiaires avec d'autres intentions. Plus présents, plus patients, les Sud-Américains ont progressivement repoussé Haïti dans son camp. Et c'est sur coups de pied arrêtés que tout a basculé. À la 81e minute, Renzo Garcés a égalisé de près sur un corner. Trois minutes plus tard, Jairo Vélez a complété la remontée d'une frappe du droit, encore après un corner travaillé par Yoshimar Yotún. En quelques minutes, un match maîtrisé s'est mué en défaite.",
      "Haïti a tenté de réagir dans le temps additionnel, sans trouver la faille. Score final : Pérou 2, Haïti 1.",
      "Que retenir ? D'abord que c'était un match amical, et que le résultat compte moins que les enseignements. Le pressing, la première période de référence, la forme d'Isidor : il y a de quoi aborder le Mondial avec confiance. Mais la fin de match laisse un avertissement clair : la gestion des coups de pied arrêtés et la capacité à tenir un résultat seront déterminantes face à l'Écosse, au Brésil et au Maroc. Autant de détails que le staff a désormais huit jours pour corriger.",
      "Le 13 juin à Boston, plus rien ne sera amical.",
    ],
    source: "D'après la couverture presse du match Haïti–Pérou, 5 juin 2026 (Miami Herald, Bolavip).",
    albums: [],
  },
  {
    slug: "perou-dernier-test-avant-mondial",
    date: "2026-06-04",
    dateLabel: "4 juin 2026",
    eyebrow: "Conférence de presse · Avant-match",
    title: "Cap sur le Pérou, dernier test avant le Mondial",
    dek: "Après leur démonstration contre la Nouvelle-Zélande (4-0), les Grenadiers bouclent leur camp d'entraînement à Miami et défient le Pérou en match amical. En conférence de presse, le sélectionneur Sébastien Migné et le défenseur Ricardo Adé ont partagé leurs intentions tactiques, salué les nouvelles recrues et adressé un message au peuple haïtien, à quelques jours du Mondial.",
    cover: "/images/journal/journal-perou-conference.jpg",
    video: "https://www.youtube.com/watch?v=CouTaufrzik",
    videoCaption: "Conférence de presse d'avant-match — Sébastien Migné et Ricardo Adé",
    body: [
      "## Un système, plus qu'une formation",
      "Malgré le large succès face à la Nouvelle-Zélande, Sébastien Migné garde les pieds sur terre. Interrogé sur le débat autour de son duo d'attaquants, il a rappelé que la formation compte moins que la manière de l'animer. Que l'on aligne deux ou trois attaquants, a-t-il souligné, les quatre buts contre la Nouvelle-Zélande sont tous venus des côtés. Le 4-4-2 observé sert surtout à replacer le bloc défensif quand l'équipe n'a pas le ballon. Lucide, le sélectionneur a estimé que le score était un peu sévère pour les Néo-Zélandais, et que des adversaires d'un autre calibre ne pardonneront pas les mêmes erreurs. À l'approche de l'entrée en lice contre l'Écosse le 13 juin, le match face au Pérou s'annonce comme le dernier laboratoire pour tester de nouvelles associations.",
      "## Une défense qui tient, un collectif soudé",
      "Ricardo Adé a prolongé le discours de son entraîneur. Pour lui, garder sa cage inviolée n'est pas l'affaire des seuls défenseurs centraux ou latéraux, mais un effort collectif. Toute l'équipe a répondu présent, ce qui représente un vrai gain de confiance pour le groupe. Le défenseur a aussi salué l'apport des nouvelles recrues, Dominique Simon et Lenny Joseph, remarqués contre la Nouvelle-Zélande dans la récupération du ballon et l'équilibre de l'équipe.",
      "## S'adapter au style sud-américain",
      "Le choix du Pérou n'a rien d'anodin. Là où la Nouvelle-Zélande proposait un jeu direct, le Pérou impose un défi fondé sur la possession et les transmissions courtes. Aucune sélection ne reproduit parfaitement un mastodonte comme le Brésil, mais le jeu de passes péruvien obligera les Grenadiers à s'ajuster vite, un test nécessaire avant la scène mondiale. Migné a aussi relevé l'angle psychologique de la rencontre : le Pérou, non qualifié pour ce Mondial, jouera libéré, sans pression, tandis qu'Haïti devra concilier l'envie de gagner et la nécessité de se préserver avant le plus grand tournoi de sa carrière.",
      "## Le football comme lueur d'espoir",
      "La conférence a pris une tournure plus grave au moment d'évoquer la situation du pays. Parce que la sélection a dû disputer toutes ses qualifications hors d'Haïti, les joueurs ressentent une responsabilité supplémentaire. Ricardo Adé, qui a grandi au pays, a dit avec force ce que cette aventure représente pour une nation traversée par l'épreuve. Le meilleur que les joueurs puissent offrir, c'est leur performance sur le terrain. À travers le football bien joué, ils peuvent rendre fierté et joie au peuple. Plus de cinquante ans après la dernière participation au Mondial, le football demeure, selon lui, l'une des rares choses capables de faire sourire les Haïtiens et de leur faire oublier l'insécurité, ne serait-ce qu'un instant.",
      "## Un appel aux supporters",
      "Migné comme Adé ont dit toute leur gratitude pour l'ambiance offerte par la diaspora lors du premier match en Floride. Pour la rencontre face au Pérou, le sélectionneur espère un stade plein. Ses joueurs, a-t-il dit, méritent d'évoluer devant une foule nombreuse : ce serait déjà une première victoire, et cette énergie poussera l'équipe à donner le meilleur d'elle-même.",
    ],
    source: "D'après la conférence de presse d'avant-match des Grenadiers (Sébastien Migné et Ricardo Adé), juin 2026.",
    albums: [],
  },
  {
    slug: "wilson-isidor-choix-du-coeur",
    date: "2026-03-18",
    dateLabel: "18 mars 2026",
    eyebrow: "Portrait · Entretien",
    title: "Wilson Isidor : un choix du cœur et de l'histoire",
    dek: "Pour un footballeur possédant plusieurs nationalités, le choix d'une sélection nationale dépasse souvent le simple cadre sportif. Il s'agit d'une décision intime, liée à l'histoire familiale, à l'identité et à l'héritage que l'on souhaite transmettre. Pour l'attaquant de Sunderland AFC, Wilson Isidor, répondre à l'appel d'Haïti représente exactement cela : un retour aux sources et un engagement envers tout un peuple.",
    cover: "/images/journal/isidor-portrait/journal-isidor.jpg",
    cta: {
      label: "Voir l'entrevue sur la chaîne officielle de Sunderland AFC",
      url: "https://www.youtube.com/watch?v=7s8A3Cgis80",
    },
    body: [
      "Dans une entrevue accordée à Sunderland AFC, l'attaquant franco-haïtien s'est confié avec émotion sur les raisons qui l'ont poussé à choisir les Grenadiers, sur la fierté de représenter ses origines et sur ses ambitions à l'approche de la Coupe du Monde 2026.",
      "## Une décision profondément personnelle",
      "Né en France, Wilson Isidor possède des liens familiaux forts avec Haïti. Son père et son grand-père sont tous deux nés dans le pays. Cette double appartenance a longtemps nourri une réflexion complexe quant à son avenir international.",
      "Pour lui, choisir entre la France et Haïti n'était pas une simple question de carrière.",
      "« Parfois, faire un choix est difficile. C'était comme devoir choisir entre ma mère et mon père », a-t-il expliqué.",
      "Des mots qui illustrent toute la charge émotionnelle de cette décision. Finalement, c'est le désir de contribuer au développement du football haïtien et de rendre hommage à ses origines qui a fait pencher la balance.",
      "En acceptant sa convocation avec les Grenadiers, Isidor inscrit également son nom dans l'histoire de Sunderland. Il devient le premier international haïtien à représenter le club anglais.",
      "## Plus qu'un maillot : apporter de la joie à tout un peuple",
      "Le moment choisi pour rejoindre la sélection haïtienne n'est pas anodin. Haïti s'apprête à vivre l'un des chapitres les plus importants de son histoire sportive avec sa participation à la Coupe du Monde 2026, plus de cinquante ans après sa seule apparition au Mondial en 1974.",
      "Pour Isidor, cette qualification historique a joué un rôle majeur dans sa décision.",
      "Mais au-delà du football, l'attaquant est conscient de la portée symbolique de cet événement pour des millions d'Haïtiens, au pays comme dans la diaspora.",
      "« J'espère qu'avec cette compétition, nous allons construire quelque chose pour l'avenir de notre pays et aider beaucoup de personnes qui vivent encore là-bas. Leur apporter de la joie, un peu de liberté, même si ce n'est que pendant quelques heures ou quelques jours. »",
      "Dans un contexte national souvent marqué par les difficultés, le football devient un rare espace de rassemblement et d'espoir. Isidor comprend parfaitement ce rôle et souhaite contribuer à offrir ces moments de bonheur collectif.",
      "## Sur les traces d'Emmanuel Sanon",
      "Lors de la Coupe du Monde 2026, Haïti devra relever un défi colossal dans un groupe comprenant le Brésil, le Maroc et l'Écosse.",
      "Pourtant, Wilson Isidor ne cache pas ses ambitions.",
      "Depuis plus de cinquante ans, un nom demeure gravé dans l'histoire du football haïtien : celui d'Emmanuel Sanon. En Allemagne de l'Ouest en 1974, Sanon avait inscrit les seuls buts d'Haïti en Coupe du Monde et mis fin à l'impressionnante série d'invincibilité du gardien italien Dino Zoff.",
      "Aujourd'hui encore, son exploit demeure l'un des moments les plus mythiques du sport haïtien.",
      "Wilson Isidor espère désormais écrire son propre chapitre.",
      "« Le premier joueur à avoir marqué est une immense légende. J'espère être le deuxième. »",
      "Une déclaration simple mais chargée de sens. Marquer pour Haïti en Coupe du Monde serait non seulement un accomplissement personnel, mais également une façon d'entrer dans l'histoire du pays.",
      "## Une nouvelle génération tournée vers l'avenir",
      "Avant de se projeter vers le Mondial, Isidor aura l'occasion de découvrir pleinement l'environnement des Grenadiers lors des rencontres internationales contre la Tunisie et l'Islande.",
      "Il se dit particulièrement impatient de rencontrer les supporters haïtiens, dont la présence est particulièrement forte aux États-Unis et au Canada, deux pays qui accueilleront une grande partie des matchs de la Coupe du Monde.",
      "Après avoir réalisé son rêve d'évoluer en Premier League anglaise, l'attaquant voit désormais plus loin. Son objectif est de bâtir un héritage durable, pour sa famille, pour ses enfants et pour tout un peuple qui rêve de voir Haïti briller sur la plus grande scène du football mondial.",
      "À travers son choix, Wilson Isidor rappelle que le football n'est pas seulement une question de résultats ou de trophées. C'est aussi une histoire de racines, d'identité et de fierté.",
      "Et pour lui, cette histoire s'écrit désormais en bleu et rouge.",
    ],
    source: "D'après une entrevue accordée à Sunderland AFC (chaîne officielle), mars 2026.",
    albums: [],
  },
  {
    slug: "ricardo-ade-co-capitaine-reve-52-ans",
    date: "2026-06-04",
    dateLabel: "4 juin 2026",
    eyebrow: "Portrait · Entretien",
    title: "Ricardo Adé, le co-capitaine d'un rêve vieux de 52 ans",
    dek: "Né à Saint-Marc, défenseur central de la LDU Quito, Ricardo Adé portera le brassard de co-capitaine quand Haïti retrouvera la Coupe du Monde, un demi-siècle après les pionniers de 1974. Derrière le joueur, un parcours fait de patience, d'exil et de refus d'abandonner.",
    cover: "/images/photos/ricardo-ade.jpg",
    body: [
      "Avant d'être l'un des visages du retour d'Haïti sur la plus grande scène du football, Ricardo Adé était un enfant de Saint-Marc avec un rêve qui semblait presque irréaliste : disputer une Coupe du Monde sous le maillot haïtien, et la jouer en capitaine. Il a grandi avec le récit de 1974 dans les oreilles, en se posant une seule question : pourquoi pas nous, pourquoi pas sa génération ?",
      "La route a été tout sauf rectiligne. Après une première apparition en Gold Cup au début de la vingtaine, Adé tente sa chance en Thaïlande, loin de tout. La période est rude. C'est là, confie-t-il, qu'il fait l'expérience du racisme pour la première fois, une épreuve qu'il choisit de transformer en force et qui forge encore aujourd'hui sa façon de mener un groupe.",
      "Le tournant vient de Miami. Dans une ligue dominicale enracinée dans la communauté haïtienne, il porte les couleurs d'une équipe de Saint-Marc, avant qu'une rencontre ne le conduise vers Miami United. Là, il obtient enfin ce qui manquait cruellement au pays : des images de son jeu. En Haïti, expliquait-il, le premier obstacle est souvent l'absence de vidéo, ce que les clubs réclament pourtant avant tout. Ces images lui ouvrent les portes. Viendront ensuite le Chili, puis l'Équateur. Sa chargée de communication, Erica Dumas, résume ce parcours d'un trait : de l'isolement en Thaïlande à Miami, au Chili, jusqu'à devenir une référence en Équateur.",
      "Aujourd'hui pilier de la défense sous les ordres du sélectionneur français Sébastien Migné, Adé évolue à la LDU Quito, dans un championnat dont l'intensité physique correspond, dit-il, exactement au défenseur qu'il est. Co-capitaine, il connaît le poids du maillot. Il rappelle que la sélection a dû disputer ses qualifications à domicile à Curaçao, faute de stabilité dans le pays, et que le football peut offrir de la joie à un peuple qui souffre. Être le visage d'Haïti, faire quelque chose de bon pour le pays : c'est ainsi qu'il résume la mission.",
      "Il y a, dans le calendrier, un rendez-vous qui résonne plus fort que les autres. Le 19 juin, Haïti affronte le Brésil à Philadelphie. Adé le sait : faute de Mondial, des générations de Haïtiens ont grandi en soutenant la Seleção. Cette fois, ils porteront leurs propres couleurs. Le co-capitaine refuse pourtant d'en faire une montagne infranchissable. Sur le terrain, rappelle-t-il, c'est onze contre onze, et tout peut arriver.",
      "Reste l'essentiel, ce qu'il adresse aux supporters : la conscience de ce que représente ce moment. Se préparer, rester humble devant l'ampleur de la scène, et représenter le pays du mieux possible. Cinquante-deux ans après Munich, un enfant de Saint-Marc s'apprête à entrer dans l'histoire, le brassard au bras.",
    ],
    source: "D'après un entretien accordé à FOX 29 (Tyler Thrasher), juin 2026.",
    albums: [],
  },
  {
    slug: "haiti-nouvelle-zelande-amical",
    date: "2026-06-02",
    dateLabel: "2 juin 2026",
    eyebrow: "Amical · Rapport de match",
    // Lie l'article au match correspondant dans les données live.
    fixtureOpponent: "new zealand",
    fixtureOpponentLabel: "Nouvelle-Zélande",
    title: "Avant le Mondial, Haïti domine la Nouvelle-Zélande 4-0",
    dek: "Providence lance les Grenadiers, Lenny Joseph, Pierrot et Lacroix concluent : à Fort Lauderdale, Haïti s'impose 4-0 pour son premier test d'avant-Mondial.",
    cover: "/images/journal/haiti-nouvelle-zelande-amical/cover.jpg",
    video: "https://www.youtube.com/watch?v=gGGVBaLe0w0",
    videoCaption: "Temps forts — Haïti 4-0 Nouvelle-Zélande",
    body: [
      "Pour le premier de ses deux amicaux de préparation, Haïti a livré une copie aboutie en dominant la Nouvelle-Zélande 4-0, mardi 2 juin 2026 à l'Inter Miami CF Stadium de Fort Lauderdale. À une dizaine de jours de son entrée dans la Coupe du Monde de la FIFA, la sélection de Sébastien Migné a transformé sa promesse de jeu en résultat net.",
      "Le coup d'envoi, prévu à 19 h 30 (heure de l'Est), a été retardé d'une trentaine de minutes en raison d'un risque d'orage, conformément aux protocoles locaux. Sous une chaleur proche de 30 °C, l'arbitre a accordé deux pauses fraîcheur — à la 35ᵉ puis à la 77ᵉ minute —, nouvelle disposition de la FIFA pour le tournoi. Autant de conditions que les Grenadiers retrouveront en juin.",
      "Haïti n'a pas tardé à frapper. Dès la 12ᵉ minute, Wilson Isidor a glissé un ballon dans le dos de la défense pour Ruben Providence, qui s'est retourné dans un mouchoir de poche avant de battre Alex Paulsen d'un angle fermé. 1-0, et le scénario idéal pour une équipe décidée à imposer son tempo.",
      "Bousculée, la Nouvelle-Zélande a réagi et tenu le ballon une bonne partie de la première période, sans parvenir à tromper Johny Placide. À la pause, les Grenadiers viraient en tête, maîtres de l'essentiel.",
      "Au retour des vestiaires, alors que les All Whites avaient procédé à de multiples changements, Haïti a creusé l'écart. Trouvé dans un intervalle entre les défenseurs adverses, Lenny Joseph a résisté au retour de la défense pour doubler la mise (2-0).",
      "Peu après, Frantzdy Pierrot — entré à la pause à la place de Duckens Nazon — a coupé un centre de Carlens Arcus d'une tête libre au cœur de la surface pour porter le score à 3-0 à la 62ᵉ minute, à un peu moins d'une demi-heure du terme.",
      "Le récital s'est conclu à la 87ᵉ minute par une réussite de grande facture : dans une action brouillonne, Duke Lacroix a enroulé une frappe que Max Crocombe, entré en seconde période, n'a pu détourner. 4-0, sans appel.",
      "Fidèle à l'intention affichée par Migné en conférence de presse — « Nous ne garerons pas le bus » —, Haïti a cherché le jeu et concrétisé ses temps forts : quatre buteurs différents et un Placide impérial pour préserver sa cage inviolée.",
      "C'était la toute première confrontation entre les deux nations au niveau senior. Au classement FIFA, la Nouvelle-Zélande (85ᵉ) était l'adversaire le plus proche d'Haïti (83ᵉ) parmi les sélections qualifiées pour le Mondial — un test calibré avant des oppositions d'un autre calibre. Côté néo-zélandais, qualifié lui aussi (Groupe G), le sélectionneur a fait largement tourner son effectif, partageant notamment le temps de jeu entre ses deux gardiens.",
      "Ce succès net relance la dynamique d'un groupe qui restait sur une défaite (0-1) contre la Tunisie et un nul (1-1) face à l'Islande en mars. Installés en Floride pour leur stage, les Grenadiers ont vu leur effectif se compléter avec l'arrivée de Jean-Ricner Bellegarde ; Woodensky Pierre, milieu du Violette AC et seul joueur du groupe évoluant au pays, reste attendu.",
      "Reste un dernier test avant le grand saut : le Pérou, le 5 juin au NU Stadium de Miami. Puis viendra l'entrée en lice, le 13 juin face à l'Écosse, au Gillette Stadium de Foxborough — premier rendez-vous d'un Groupe C qui réserve ensuite le Brésil et le Maroc. Objectif affiché : les 16ᵉ de finale.",
    ],
    source: "D'après le match amical Haïti–Nouvelle-Zélande, 2 juin 2026 à Fort Lauderdale. Sources : RNZ, New Zealand Herald.",
    albums: [],
  },
  {
    slug: "conference-avant-nouvelle-zelande",
    date: "2026-06-01",
    dateLabel: "1ᵉʳ juin 2026",
    eyebrow: "Conférence de presse · Avant-match",
    title: "Migné, avant la Nouvelle-Zélande : « Nous ne garerons pas le bus »",
    dek: "À la veille du premier match amical, Sébastien Migné et Frantzdy Pierrot ont dit l'ambition d'une sélection décidée à aller de l'avant — à douze jours de l'entrée en lice face à l'Écosse.",
    cover: "/images/journal/conference-avant-nouvelle-zelande/cover.jpg",
    body: [
      "À la veille du match amical contre la Nouvelle-Zélande, prévu le 2 juin à Fort Lauderdale, Sébastien Migné et Frantzdy Pierrot se sont présentés devant la presse. État d'esprit du groupe, approche tactique, fierté de représenter tout un peuple : à douze jours de l'entrée en lice face à l'Écosse, le sélectionneur et son attaquant ont tracé les contours d'une équipe qui n'entend rien renier de ses ambitions.",
      "Le sélectionneur a d'abord rappelé la vocation de ces rencontres : régler la mécanique. À ce stade de la saison, la condition physique varie fortement d'un joueur à l'autre — certains sortent d'un exercice de club éprouvant, d'autres manquent de temps de jeu. « Demain, nous allons partager les minutes », a indiqué Migné, à l'image de ce que font les autres sélections, afin de monter en puissance vers le 13 juin sans courir de risques inutiles.",
      "L'effectif, lui, est annoncé en bonne santé et pleinement mobilisé. Seul Woodensky Pierre, milieu de Violette AC et unique joueur de la sélection évoluant au pays, rejoindra le groupe avec un léger différé, le temps de finaliser les formalités liées à son visa. Pour le reste, la sélection devrait être au complet dans les jours à venir.",
      "Interrogé sur le visage qu'offrira Haïti face à des adversaires du calibre de l'Écosse ou du Brésil, Migné a écarté toute approche purement défensive. Un bloc solide reste indispensable pour rivaliser au plus haut niveau, mais se contenter de défendre serait, dit-il, contraire au caractère de ses joueurs. « Nous aimons aller de l'avant et utiliser les côtés », a-t-il résumé, convaincu qu'il faudra marquer pour espérer créer la surprise.",
      "Cette ambition s'appuie sur une concurrence devenue, à ses yeux, un véritable luxe. L'éclosion de jeunes éléments comme Louicius Don Deedson et Shanyder Borgelin, aux côtés d'un cadre tel que Pierrot, a densifié le secteur offensif et oblige les plus expérimentés à rester affûtés. De quoi offrir au staff des profils variés : du point d'appui physique aux ailiers tranchants dans le un-contre-un.",
      "Le sélectionneur n'ignore pas l'écart de notoriété qui sépare Haïti d'un géant comme le Brésil. Mais, fort de ses précédentes confrontations avec la Seleção, il en tire une conviction : sur le terrain, tant qu'un groupe demeure collectivement soudé, tout reste possible.",
      "Frantzdy Pierrot, lui, a assumé pleinement le poids attaché au maillot. Loin de le subir, l'attaquant en fait un moteur. « Nous portons ce drapeau pour représenter toute une nation », a-t-il déclaré, conscient que le peuple compte sur ses joueurs et se déplacera en nombre pour les soutenir.",
      "Reste le cap, que Migné se garde de brûler. L'objectif affiché ne varie pas : se hisser au moins jusqu'aux 16ᵉ de finale, premier tour à élimination directe du format à quarante-huit équipes. Mais la priorité immédiate tient en deux rendez-vous de préparation — la Nouvelle-Zélande, puis le Pérou le 5 juin à Miami — avant de tourner pleinement les regards vers l'Écosse, le 13 juin à Foxborough.",
    ],
    source: "D'après la conférence de presse d'avant-match de la sélection nationale, 1ᵉʳ juin 2026 (Sébastien Migné et Frantzdy Pierrot).",
    albums: [],
  },
  {
    slug: "derrick-etienne-jr-portrait",
    date: "2026-05-21",
    dateLabel: "21 mai 2026",
    eyebrow: "Portrait · Entretien",
    title: "Derrick Etienne Jr. : « laisse ton football parler »",
    dek: "Dans un entretien publié par Toronto FC, l'ailier des Grenadiers revient sur le retour historique d'Haïti au Mondial, l'héritage de sa famille et la fierté de jouer pour tout un pays.",
    cover: "/images/journal/derrick-etienne-jr-portrait/cover.jpg",
    video: "https://www.youtube.com/watch?v=J7pArK-01jE",
    videoCaption: "Toronto FC — Entretien avec Derrick Etienne Jr.",
    body: [
      "Le club de Toronto FC a publié, le 21 mai 2026, un entretien vidéo avec Derrick Etienne Jr., ailier des Grenadiers. L'international y revient sur le chemin parcouru jusqu'à la qualification d'Haïti pour la Coupe du Monde de la FIFA — une première depuis 1974, au terme d'une attente de cinquante-deux ans.",
      "Etienne décrit l'intensité du moment où la sélection a validé son billet, rendu plus fort encore par la présence de son père dans les tribunes — un père qui n'était pas encore né la dernière fois qu'Haïti avait disputé un Mondial. Un passage de témoin entre les générations, à l'échelle d'une seule famille.",
      "Car représenter Haïti est, chez les Etienne, une affaire de famille. Son père et son oncle ont connu avant lui le maillot national ; sa sœur s'est illustrée très jeune avec la sélection féminine. Un héritage que l'ailier porte à son tour.",
      "À ses débuts en sélection, Etienne ne maîtrisait encore ni le français ni le créole. Son père lui a alors transmis un conseil simple, devenu le fil conducteur de sa carrière internationale : « laisse ton football parler ».",
      "Au-delà des trajectoires individuelles, l'ailier attribue ce parcours à une fraternité forgée par une fierté commune. Le groupe, dit-il, s'est concentré sur ce qu'il pouvait maîtriser, convaincu que le travail finirait par payer — et il a payé.",
      "Reste, surtout, le sens de cette aventure : quand les Grenadiers jouent, tout un pays s'arrête pour les regarder. Offrir de la joie et un motif de fierté à tout un peuple et à sa diaspora, voilà ce qui rassemble chaque joueur au moment de rejoindre la sélection.",
      "À quelques jours d'entrer dans la compétition, Etienne et ses coéquipiers se préparent à porter, sur la plus grande scène du football, le rêve de toute une nation.",
    ],
    albums: [],
  },
  {
    slug: "frantzdy-pierrot-melrose",
    date: "2026-05-27",
    dateLabel: "27 mai 2026",
    eyebrow: "Portrait · Boston · State House",
    title: "Frantzdy Pierrot, l'enfant de Melrose qui ramène Haïti à Foxborough",
    dek: "À deux semaines du match d'ouverture face à l'Écosse, le Massachusetts a déclaré le 26 mai « Frantzdy Pierrot Day ». L'attaquant retrouvera, à Gillette Stadium, le sol où il a appris le football américain.",
    cover: "/images/journal/frantzdy-pierrot-melrose/cover.jpg",
    body: [
      "Boston, 26 mai 2026. Au Massachusetts State House, la gouverneure Maura Healey a proclamé la journée « Frantzdy Pierrot Day » à travers tout le Commonwealth. Le conseil municipal de Boston, par la voix de la conseillère Ruthzee Louijeune — d'origine haïtienne — a fait de même pour la ville. Au centre de la cérémonie : un attaquant de 31 ans, dossard numéro 20 de la sélection nationale, troisième meilleur buteur de l'histoire des Grenadiers.",

      "Né en Haïti, arrivé dans le Massachusetts à onze ans, Frantzdy Pierrot a fait son football dans l'État qu'il s'apprête à retrouver. Melrose High School d'abord, où il guide les Red Hawks jusqu'aux demi-finales de la Division 2 Nord (MIAA) en 2013. Puis Northeastern University, où il est nommé Rookie of the Year de la conférence CAA en 2014. Puis Coastal Carolina, où il est désigné meilleur joueur du Sun Belt en 2017 et marque face à Clemson, alors classée 8ᵉ nationale, dans le tournoi NCAA.",

      "En 2018, le draft MLS l'appelle : sélectionné par les Colorado Rapids, il a la signature à portée de main — la voie classique. Il refuse. Direction l'Europe, où il enchaîne sur sept saisons les clubs au Portugal, en Belgique, en Grèce, en France, en Turquie. Aujourd'hui à Çaykur Rizespor, il porte un palmarès international que peu de joueurs nés au pays auraient pu imaginer en quittant Port-au-Prince.",

      "« Je n'ai pas pu prendre cette décision facilement, mais je savais que pour aller plus loin, il fallait choisir un autre chemin », a-t-il déjà raconté à la presse américaine. Au pays comme à l'étranger, il a coché 33 buts en sélection — derrière Duckens Nazon (44) et un autre dans le décompte historique, ce qui le place au 3ᵉ rang de l'histoire haïtienne. Et il en veut encore.",

      "À la cérémonie du State House, l'émotion s'est lue sur le visage de ses parents, de son ancien entraîneur Corlton Simmonds, des proches venus l'entourer. Pierrot a évoqué son enfance, simplement : « Comme beaucoup d'enfants, le football était tout pour nous. Mais nous n'avions pas grand-chose. On jouait pieds nus dans la rue avec ce qu'on trouvait. Parfois même avec des oranges. Le football nous donnait notre joie. » Une phrase qui mesure, mieux que n'importe quel chiffre, la distance parcourue.",

      "Le 13 juin, à Foxborough — à une demi-heure de Melrose, sur la même pelouse que celle qu'il rêvait enfant —, il portera les couleurs d'Haïti face à l'Écosse. « Ça va sembler irréel. Mon premier match au Mondial, à Boston. Toute ma famille est là, tous mes amis. J'ai étudié ici. Ça va être un match très émouvant », a-t-il confié.",
    ],
    source: "Cérémonie de proclamation tenue au Massachusetts State House, Boston, 26 mai 2026. Sources : bureau de la gouverneure Maura Healey, Boston 25 News, Yahoo Sports, The Haitian Times.",
    albums: [],
  },
  {
    slug: "duke-lacroix-entretien",
    date: "2026-05-19",
    dateLabel: "19 mai 2026",
    eyebrow: "Entretien · FIFA",
    title: "Duke Lacroix : dix ans de route, le Mondial au bout du chemin",
    dek: "Latéral à Colorado Springs (USL Championship), formé à l'Université de Pennsylvanie, le défenseur de 32 ans devient avec Carl Sainté le premier joueur en activité dans la deuxième division américaine à disputer une Coupe du Monde.",
    cover: "/images/journal/duke-lacroix-entretien/cover.jpg",
    body: [
      "Le 19 mai 2026, lorsque la Fédération Haïtienne de Football a officiellement publié sa liste, Duke Lacroix y figurait. Le défenseur de 32 ans, latéral droit aux Colorado Springs Switchbacks, devient — avec son compatriote Carl-Fred Sainté, milieu à El Paso Locomotive — le premier joueur de la deuxième division américaine en activité à disputer une Coupe du Monde.",

      "Natif de New Egypt, dans le New Jersey, ancien élève de la Lawrenceville School, Duke Lacroix a connu une formation universitaire singulière : quatre saisons en All-Ivy à l'Université de Pennsylvanie, Rookie of the Year en première année, Offensive Player of the Year de l'Ivy League en 2013. Diplômé en 2015, il entame ensuite une carrière professionnelle au long cours : Indianapolis, Reno, Charlotte, Sacramento, et désormais Colorado Springs depuis trois saisons.",

      "« C'est le rêve de tout footballeur que de disputer une Coupe du Monde et de représenter son pays. Je suis profondément honoré d'avoir été retenu et heureux d'avoir cette opportunité », a-t-il déclaré à son club. La Fédération Haïtienne de Football l'avait approché une première fois en 2019. Quatre ans plus tard, lors d'une nouvelle prise de contact, Lacroix accepte. Il fait ses débuts internationaux face à St. Kitts-et-Nevis, puis enchaîne les sélections — quatorze à ce jour, dont cinq des six matches du troisième tour qualificatif, et le premier but international de sa carrière contre la Barbade le 9 juin 2025.",

      "« J'ai même vu des drapeaux haïtiens dans les tribunes lors de mes matchs au Colorado », confiait-il récemment. La phrase dit beaucoup de la trajectoire : une diaspora attentive, un joueur qui s'est construit hors des feux de la rampe, et qui rejoint aujourd'hui, à l'aube de la trentaine, le club très fermé des joueurs de la sélection appelés à fouler une pelouse de Coupe du Monde.",

      "Son deuxième match face au Brésil le 19 juin l'amènera à Inglewood. Mais c'est à Foxborough, le 13 juin, qu'il découvrira la scène mondiale — face à l'Écosse, et après dix ans à se battre dans des stades plus modestes que celui qui l'accueillera.",
    ],
    source: "Entretien à FIFA.com, mai 2026. Compléments : USL Championship, Penn Athletics, The Pennsylvania Gazette.",
    albums: [],
  },
  {
    slug: "ricardo-ade-portrait",
    date: "2026-01-12",
    dateLabel: "12 janvier 2026",
    eyebrow: "Entretien · FIFA",
    title: "Ricardo Adé : « Affronter le Brésil, c'est un rêve qui se réalise »",
    dek: "Capitaine d'Haïti et défenseur central de Liga de Quito, l'enfant de Saint-Marc évoque le retour des Grenadiers au Mondial, son parcours hors des sentiers battus, et le souvenir intact des grandes nations qu'il a un jour côtoyées sur un terrain.",
    cover: "/images/journal/ricardo-ade-portrait/cover.jpg",
    body: [
      "« L'une des caractéristiques d'un Haïtien, c'est de savoir que la vie elle-même est un combat. Ça n'a jamais été facile. On garde l'espoir que les choses changent et on se bat pour cela. » Ricardo Adé, capitaine et défenseur central de la sélection nationale, ouvre son entretien à FIFA.com par une formule qui résume sa propre trajectoire autant que celle de l'équipe qu'il porte au brassard.",

      "Les Grenadiers ont disputé l'intégralité de leur campagne qualificative à l'extérieur, leurs rencontres à domicile s'étant tenues à Curaçao. Cinquante-deux ans après Munich, ils sont revenus parmi les nations qualifiées. « Nous avons disputé toute la campagne loin de chez nous, mais nous avons senti l'énergie positive de notre peuple. Ce sera la même chose au Mondial. C'est une grande responsabilité, que nous portons avec affection et respect », explique-t-il.",

      "Le Groupe C — Brésil, Maroc, Écosse — figure parmi les plus relevés de la compétition. Adé ne sous-estime aucun adversaire, mais ne se présente pas non plus en victime. « Le plus important, c'était d'arriver au Mondial. Une fois sur place, n'importe quel groupe est difficile. Nous sommes dans un groupe très exigeant, mais nous avons les moyens de faire du mal. C'est un processus. On y va étape par étape. »",

      "Son propre parcours porte les marques de la même patience. Né à Saint-Marc le 21 mai 1990, formé à Baltimore SC, il s'expatrie tôt : une opportunité en Asie qui ne se concrétise jamais ; un passage par un club de quatrième division aux États-Unis ; un retour à Don Bosco ; et enfin, à vingt-six ans, son premier contrat professionnel — à Santiago Morning, au Chili. La suite l'amène à Mushuc Runa, à Aucas (premier titre du club en soixante-dix-sept ans), et depuis 2023 à Liga de Quito.",

      "« Quand je suis arrivé en Équateur, j'ai eu le sentiment d'avoir trouvé mon endroit dans le monde, ma deuxième maison. Je suis loin de ma famille, je travaille pour eux et pour moi. J'ai trouvé ma place. »",

      "Parmi les trois adversaires du groupe, le Brésil occupe une place à part dans sa mémoire. En 2004, il avait quatorze ans lorsque la Seleção, alors emmenée par Ronaldinho, Ronaldo et Roberto Carlos, s'était déplacée à Port-au-Prince pour disputer ce qui restera dans l'histoire comme le « Match de la Paix ». Une rencontre perdue 6-0, mais un souvenir intact. « J'étais encore enfant, mais je revois très clairement ce match à la télévision. Nous sommes de grands fans du Brésil, de l'Argentine… Quand ces pays jouent, c'est la fête. Les gens descendent dans la rue. »",

      "« Mon rêve, c'était d'être un jour sur le terrain, de partager cette pelouse avec des joueurs qui s'étaient déjà fait un nom, qui évoluaient dans les plus grands championnats. Et j'aurai peut-être l'occasion de vivre ce rêve cette année face à une équipe comme le Brésil. C'est incroyable. Je n'arrive pas à le formuler tellement c'est exaltant. »",

      "Il a déjà eu, une fois, ce frisson — face à un autre des plus grands. En 2018, à La Bombonera, Lionel Messi avait régalé Buenos Aires d'un triplé et d'une passe décisive lors d'un amical Argentine-Haïti (4-0). « Concourir à ce niveau, avec autant de monde, avec Messi et Agüero sur le terrain, c'est comme être dans un rêve. Je garde l'image. Il y a une photo qui a circulé, un coéquipier et moi au sol — mais c'est Messi, c'est ce qu'il fait. C'était fantastique d'avoir pu y être. »",

      "Une question, presque pour le plaisir : quel joueur, hors Groupe C, aimerait-il croiser ? « Cristiano Ronaldo. C'est mon idole, un joueur que j'admire vraiment. Son histoire parle d'elle-même. Il travaille énormément, et je suis comme lui. »",

      "Le 13 juin à Boston Stadium, Haïti entrera en compétition face à l'Écosse. Ce sera, pour Adé, plus qu'un match. « Quand l'hymne va retentir, ce sera tout le pays. Pas une seule personne en moins. Rien que de chanter l'hymne sur la pelouse, j'ai déjà des frissons. Imaginez en Coupe du Monde. »",

      "Et un dernier souhait, formulé comme une évidence : « Mon rêve, ce serait de pouvoir, comme d'autres pays, jouer un match à la maison avant la Coupe du Monde, et célébrer. Pourquoi pas, cinquante-deux ans après ? Je sais que tout le pays sera avec nous. Nous savons ce que nous représentons, et nous allons bien le représenter. »",
    ],
    source: "Entretien accordé à FIFA.com, publié le 12 janvier 2026.",
    albums: [],
  },
  {
    slug: "derrick-etienne-entretien",
    date: "2026-05-17",
    dateLabel: "17 mai 2026",
    eyebrow: "Entretien · FIFA",
    title: "Derrick Etienne Jr. : « Tous mes matches du Mondial seront près de chez moi »",
    dek: "Ailier du Toronto FC, vingt-neuf ans, quarante-six sélections, l'Américain d'origine haïtienne disputera son premier Mondial à quelques heures de route de la Virginie qui l'a vu grandir.",
    cover: "/images/journal/derrick-etienne-entretien/cover.jpg",
    body: [
      "Né à Roanoke, en Virginie, Derrick Etienne Jr. portait les couleurs d'Haïti dès le 10 novembre 2016, à vingt ans, lors d'une rencontre face à la Guyane française. Près de dix ans plus tard, il accroche son quarante-sixième écusson sur le maillot national — huit buts, sept passes décisives. Et il s'apprête à disputer une Coupe du Monde dans le pays où il a grandi.",

      "Le soir où la Fédération a officialisé sa convocation, Etienne Jr. s'est trouvé sur le terrain de Toronto FC contre Charlotte FC. Il a marqué d'une frappe lointaine. « C'est un beau sentiment. Je crois que le rêve de tout joueur est de représenter son pays en Coupe du Monde », a-t-il déclaré après la rencontre. « Et le fait que ce soit aux États-Unis, avec des matches proches de chez moi, c'est quelque chose de très spécial. »",

      "L'ailier choisit la sélection haïtienne par filiation : son grand-père est haïtien. Au sein du groupe constitué très majoritairement de joueurs de la diaspora, il défend depuis dix ans une appartenance que sa génération a dû, en grande partie, choisir et construire. Au moment où la qualification s'est jouée à Curaçao en novembre 2025, c'est lui qui suivait, sur son téléphone, la dernière minute de Costa Rica-Honduras avec ses coéquipiers — espérant la fin d'une attente de cinquante-deux ans.",

      "Le 13 juin, à Foxborough, dans le Massachusetts. Le 19 juin à Inglewood, en Californie. Le 24 juin à Atlanta, dans la même ville où il a évolué deux saisons avant d'être transféré à Toronto. La géographie de ce Mondial coïncide, presque ligne à ligne, avec la sienne. « Mes matches du Mondial seront près de chez moi. C'est très spécial. »",
    ],
    source: "Entretien à FIFA.com, mai 2026. Compléments : Toronto FC, Waking The Red.",
    albums: [],
  },
  {
    slug: "migne-liste-26",
    date: "2026-05-16",
    dateLabel: "16 mai 2026",
    eyebrow: "Officiel · La liste des 26",
    title: "Sébastien Migné dévoile sa liste : objectif les 16ᵉ de finale",
    dek: "Le sélectionneur haïtien a annoncé la liste des vingt-six joueurs retenus pour le Mondial. Au-delà du premier point historique, l'objectif fixé est plus ambitieux : la qualification pour le tour à élimination directe.",
    cover: "/images/journal/migne-liste-26/cover.jpg",
    body: [
      "La Fédération Haïtienne de Football a officialisé la liste des vingt-six joueurs retenus par Sébastien Migné pour le Mondial 2026. Une sélection internationale au sens littéral : des joueurs évoluant en France, en Angleterre, au Portugal, en Belgique, en Suisse, en Allemagne, aux Pays-Bas, en Hongrie, en Slovaquie, en Iran, en Turquie, en Équateur, au Canada, aux États-Unis. Un seul homme évolue au pays — Woodensky Pierre, milieu défensif de Violette AC.",

      "Capitaine et gardien d'expérience : Johny Placide, à 38 ans, vétéran du SC Bastia, dont la sélectivité aura traversé tout le cycle de qualification. Numéro un offensif : Duckens Nazon, meilleur buteur de l'histoire des Grenadiers (44 buts), dont la prolificité aura porté l'équipe jusqu'au billet de Curaçao. Renforts récents : Wilson Isidor (Sunderland, Premier League), Jean-Ricner Bellegarde (Wolverhampton, Premier League), Hannes Delcroix (FC Lugano), Josué Casimir (AJ Auxerre).",

      "Au-delà des noms, le ton fixé par Migné est clair. « Le premier objectif sera, bien sûr, d'essayer d'obtenir notre premier point en phase finale de Coupe du Monde », a déclaré le sélectionneur. « Mais ce serait une motivation trop maigre pour mes joueurs, tels que je les connais. Quand on entre dans une compétition, c'est pour essayer de bien performer. Notre nouvelle feuille de route, c'est la qualification pour les 16ᵉ de finale. »",

      "L'ambition rompt avec une certaine prudence d'usage qui aurait pu, à l'approche d'une compétition disputée face au Brésil, à l'Écosse et au Maroc, dicter un discours plus mesuré. Migné fait le pari inverse : assumer la cible. Avec le nouveau format à quarante-huit équipes, le tour à élimination directe commence aux 16ᵉ — soit, pour Haïti, une qualification parmi les deux premiers de son groupe ou parmi les meilleurs troisièmes.",

      "Les Grenadiers entreront en compétition le 13 juin à Foxborough face à l'Écosse, retrouveront le Brésil le 19 juin à Inglewood, et clôtureront leur phase de groupes face au Maroc le 24 juin à Atlanta.",
    ],
    source: "Communiqué officiel de la Fédération Haïtienne de Football, 16 mai 2026. Citations : Sébastien Migné via FIFA.com et extratime.com.",
    albums: [],
  },
  {
    slug: "migne-entretien-toronto",
    date: "2026-03-22",
    dateLabel: "22 mars 2026",
    eyebrow: "Entretien · FIFA",
    title: "Migné, avant les amicaux : « Ancelotti est la référence pour tout entraîneur »",
    dek: "À quelques jours d'affronter la Tunisie puis l'Islande à Toronto, le sélectionneur des Grenadiers a accordé un entretien à FIFA.com. Brésil, Carlo Ancelotti, attentes : un état des lieux à 81 jours du coup d'envoi.",
    cover: "/images/journal/migne-entretien-toronto/cover.jpg",
    body: [
      "À 81 jours du début du Mondial, la sélection haïtienne s'apprête à disputer deux amicaux à Toronto Stadium — face à la Tunisie le 28 mars, puis face à l'Islande trois jours plus tard. Deux adversaires choisis pour préparer Les Grenadiers aux profils qu'ils retrouveront en juin : une équipe africaine de premier rang, une formation européenne au jeu structuré.",

      "Dans son entretien à FIFA.com, Sébastien Migné, ancien adjoint au Cameroun et entraîneur globe-trotter passé par plusieurs sélections africaines, n'a pas masqué l'envergure de la tâche. Le tirage du Brésil, en particulier, occupe l'esprit du staff. « Après s'être étendu sur le talent brésilien, Migné a tenu à saluer son homologue à venir, Carlo Ancelotti, contre qui il s'apprête à mener un duel tactique. Ancelotti est une référence pour tout entraîneur. Il fixe la barre », a-t-il déclaré.",

      "Le Français mesure aussi la pression qui s'installe autour de la sélection à mesure que la compétition approche. « Le public verra Haïti jouer contre le Brésil, et je crois qu'il en savourera l'expérience. Mais le connaissant, il attendra de grandes choses de nous, ce qui ajoute un peu de pression. Le staff et moi devrons concevoir un plan de jeu qui nous mette à la hauteur. »",

      "L'expression résume bien la position dans laquelle se trouve l'équipe à l'approche du Mondial : entre l'enthousiasme d'un retour cinquante-deux ans attendu et le réalisme d'un tirage qui a placé Haïti dans le groupe de l'une des trois sélections les plus titrées de l'histoire. Les amicaux de Toronto, fin mars, seront le premier rendez-vous d'évaluation grandeur nature avant le coup d'envoi.",
    ],
    source: "Entretien accordé à FIFA.com, mars 2026.",
    albums: [],
  },
  {
    slug: "rencontre-north-miami",
    date: "2026-05-30",
    dateLabel: "30 mai 2026",
    eyebrow: "Diaspora · North Miami",
    title: "À North Miami, la diaspora célèbre ses Grenadiers",
    dek: "Au Museum of Contemporary Art, la sélection nationale a rencontré ses supporters lors d'un rassemblement organisé pour le Mois du patrimoine haïtien, à treize jours du coup d'envoi.",
    cover: "/images/journal/rencontre-north-miami/01-arrivee-equipe.jpg",
    body: [
      "Un samedi pluvieux à North Miami. Au Museum of Contemporary Art (MOCA), des membres de la communauté haïtienne se sont massés pour la rencontre publique organisée avec la sélection nationale, à l'occasion du Mois du patrimoine haïtien — à treize jours du coup d'envoi de la Coupe du Monde de la FIFA 2026.",

      "Les joueurs de Sébastien Migné, en pleine préparation à Port St. Lucie, ont fait le déplacement pour aller à la rencontre de leurs supporters. Duckens Nazon, meilleur buteur de l'histoire d'Haïti, et Martin Experience, défenseur, ont pris la parole devant un public conquis. Daniella Levine Cava, maire du comté de Miami-Dade, a salué les Grenadiers et les fidèles venus à leur rencontre. La pluie n'a pas eu raison de l'enthousiasme.",

      "« Nous montrerons que nous sommes unis, quoi qu'il arrive », a déclaré Nazon en créole, ses coéquipiers à ses côtés.",

      "Dans la foule, les drapeaux ont dansé. Jeffrey Pluviose a soufflé dans la conque, instrument hérité des cérémonies traditionnelles haïtiennes. Odeline Paul a tournoyé avec son drapeau, le bicolore au-dessus de la tête. Guensine Ambo, installée à Miami depuis trente-cinq ans, ne cachait pas son émotion : « C'est l'une des choses qui nous aident à nous rassembler en tant que peuple. Nous sommes au sommet. »",

      "Cinquante-deux ans après Munich, la sélection nationale retrouve la scène mondiale — et, avec elle, sa diaspora. La rencontre du MOCA n'était qu'une avant-première : le 2 juin, les Grenadiers affrontent la Nouvelle-Zélande à Fort Lauderdale ; le 5 juin, ils défient le Pérou à Miami. Puis, le 13 juin, l'entrée en compétition face à l'Écosse, à Foxborough.",
    ],
    source: "Source : Associated Press, via le Miami Herald. Photos : Matias J. Ocner / Miami Herald.",
    albums: [
      {
        // single untitled album — renders as flat gallery
        photos: [
          { src: "/images/journal/rencontre-north-miami/01-arrivee-equipe.jpg", alt: "La foule réagit à l'arrivée de la sélection nationale au Museum of Contemporary Art" },
          { src: "/images/journal/rencontre-north-miami/02-nazon-discours.jpg", alt: "Duckens Nazon prend la parole devant les supporters" },
          { src: "/images/journal/rencontre-north-miami/03-levine-cava.jpg", alt: "Daniella Levine Cava, maire du comté de Miami-Dade, échange avec le public" },
          { src: "/images/journal/rencontre-north-miami/04-nazon-depart.jpg", alt: "Duckens Nazon quitte la scène après son intervention" },
        ],
      },
    ],
  },

  {
    slug: "martin-experience-fifa",
    date: "2026-05-22",
    dateLabel: "22 mai 2026",
    eyebrow: "Entretien · FIFA",
    title: "Martin Expérience : « C'est l'arène des grands joueurs »",
    dek: "Dans un entretien accordé à FIFA.com, le défenseur de la sélection nationale évoque le tirage face au Brésil, son admiration pour Ronaldinho, et la conscience d'avoir rejoint le club très fermé des nations qualifiées.",
    cover: "/images/journal/martin-experience-fifa/cover.jpg",
    body: [
      "Né à Châteaubriant en 1999, latéral gauche de l'AS Nancy-Lorraine (Ligue 2), Martin Expérience compte aujourd'hui dix-neuf sélections avec la sélection nationale. À quelques semaines de l'entrée en compétition d'Haïti, il a accordé à FIFA.com un entretien sur ce que représente, pour sa génération, la perspective d'un Mondial — et sur ce que signifie, en particulier, l'affiche du 19 juin face au Brésil.",

      "Sur le tirage du Groupe C, le défenseur ne masque ni l'ampleur de l'adversaire ni la part de fascination qui l'accompagne. « Bien qu'ils soient une force redoutable, ils sont l'équipe que tout le monde veut affronter en Coupe du Monde. Mon joueur préféré de tous les temps, c'est Ronaldinho — j'ai toujours eu une admiration particulière pour le Brésil », confie-t-il. Le 19 juin à Inglewood, Haïti croisera ainsi, dans son deuxième match du Mondial, l'une des trois sélections les plus titrées de l'histoire du football.",

      "L'ensemble du groupe, néanmoins, n'est pas pris à la légère. Aux côtés du Brésil, l'Écosse et le Maroc — deux sélections que la sélection haïtienne se gardera bien de sous-estimer. « C'est véritablement l'arène des grands joueurs. Nous sommes placés dans un groupe avec trois équipes solides, et ce tirage confirme bien que nous nous sommes qualifiés pour la Coupe du Monde. »",

      "La phrase, brève, dit ce qu'il faut entendre. Cinquante-deux ans après Munich, Haïti revient à la table des grandes nations — non parce qu'on le lui aura concédé, mais parce qu'elle s'y est qualifiée.",
    ],
    source: "Entretien accordé à FIFA.com, mai 2026.",
    albums: [],
  },
  {
    slug: "le-flambeau-passe",
    date: "2026-05-18",
    dateLabel: "18 mai 2026",
    eyebrow: "Palais National · Port-au-Prince",
    title: "Le drapeau passe de 1974 à 2026",
    dek: "Mario Léandre, survivant de la sélection de Munich, transmet le drapeau national à Woodensky Pierre, seul joueur de la sélection 2026 évoluant en championnat haïtien.",
    cover: "/images/journal/le-flambeau-passe/01-leandre-flambeau.jpg",
    body: [
      "Port-au-Prince, 18 mai 2026. Le Palais National accueille la cérémonie du 223ᵉ anniversaire du Bicolore. C'est dans ce cadre — celui de la Fête du Drapeau, l'une des dates majeures du calendrier patriotique haïtien — qu'est choisie une mise en scène hautement symbolique : le drapeau national change de mains, d'une génération de Grenadiers à une autre.",

      "Mario Léandre, l'un des derniers survivants de la sélection de 1974, la première à avoir représenté Haïti en Coupe du Monde, reçoit le drapeau des mains du Premier ministre Alix Didier Fils-Aimé. Cinquante-deux ans plus tôt, c'est lui qui portait l'emblème sur les pelouses ouest-allemandes. Il le transmet aujourd'hui à Woodensky Pierre, milieu défensif de Violette AC, seul joueur de la sélection 2026 évoluant en championnat haïtien.",

      "Le geste, plus que protocolaire, dessine une ligne. De Violette à Violette : Manno Sanon, l'auteur du but de Munich, sortait du club de Bourdon ; Woodensky Pierre en porte aujourd'hui les couleurs. Le drapeau, lui, n'a pas oublié le chemin.",

      "Plus tôt dans la cérémonie, le Premier ministre avait remis au ministre de la Culture et de la Communication, Emmanuel Ménard, le maillot officiel de la sélection nationale, béni par le pape Léon XIV. Une tunique appelée à voyager — du Vatican à Foxborough, où Haïti affrontera l'Écosse le 13 juin pour son entrée en compétition.",

      "« 1974 n'oublie pas. 2026 avance. Haïti croit. » Le mot d'ordre, retenu pour la cérémonie, laisse peu de place à l'interprétation.",
    ],
    source: "Cérémonie publique tenue au Palais National le 18 mai 2026, à l'occasion du 223ᵉ anniversaire du Bicolore.",
    albums: [
      {
        photos: [
          { src: "/images/journal/le-flambeau-passe/01-leandre-flambeau.jpg", alt: "Mario Léandre, sélectionné de 1974, transmet le drapeau national à Woodensky Pierre" },
          { src: "/images/journal/le-flambeau-passe/02-premier-ministre-maillot.jpg", alt: "Le Premier ministre Alix Didier Fils-Aimé présente le maillot officiel béni par le pape Léon XIV" },
        ],
      },
    ],
  },

  {
    slug: "villa-accueil-soutien",
    date: "2026-04-08",
    dateLabel: "8 avril 2026",
    eyebrow: "Villa d'Accueil · Port-au-Prince",
    title: "528 millions de gourdes pour la sélection nationale",
    dek: "Deux chèques remis au Comité de normalisation de la FHF : l'un pour la prime de qualification, l'autre pour la préparation. L'État annonce également un dispositif national d'écrans géants pour suivre la compétition.",
    cover: "/images/journal/villa-accueil-soutien/01-ceremonie-villa-accueil.jpg",
    body: [
      "Port-au-Prince, 8 avril 2026. À la Villa d'Accueil, résidence officielle du chef du Gouvernement, le Premier ministre Alix Didier Fils-Aimé a remis deux chèques au Comité de normalisation de la Fédération haïtienne de football. Montant total : 528 millions de gourdes.",

      "Les deux chèques, d'un montant identique (264 millions de gourdes chacun), répondent à deux logiques. Le premier correspond à la prime de qualification, due à la sélection nationale au titre de son retour en Coupe du Monde de la FIFA — attendu depuis 1974. Le second est destiné à la préparation : transports, hébergements, séances d'entraînement, encadrement médical et technique.",

      "Au-delà de l'enveloppe financière, le Premier ministre a annoncé un dispositif national de retransmission populaire pour les matchs du Mondial : installation d'écrans géants dans les grandes villes et mise à disposition de téléviseurs dans les zones les plus éloignées, afin que la compétition soit accessible au plus grand nombre.",

      "Aux côtés du Premier ministre, la présidente du Comité de normalisation Monique André, le ministre des Sports Pythagore Dumas et Woodensky Pierre — milieu défensif de Violette AC et seul joueur de la sélection évoluant au pays — ont participé à la cérémonie.",

      "Dans son intervention, le chef du Gouvernement a qualifié le football de « puissant levier de cohésion, un langage universel qui rapproche, fédère et transcende les différences ». Pour la Fédération, c'est l'un des soutiens publics les plus importants jamais consacrés à la sélection nationale masculine.",
    ],
    source: "Cérémonie publique tenue à la Villa d'Accueil, Port-au-Prince, le 8 avril 2026. Photo : Clarens Siffroy / AFP via Getty Images.",
    albums: [
      {
        photos: [
          { src: "/images/journal/villa-accueil-soutien/01-ceremonie-villa-accueil.jpg", alt: "Le Premier ministre Alix Didier Fils-Aimé, la présidente du Comité de normalisation Monique André, le ministre des Sports Pythagore Dumas et le joueur Woodensky Pierre à la Villa d'Accueil" },
        ],
      },
    ],
  },

  {
    slug: "arrivee-des-grenadiers",
    date: "2026-05-28",
    dateLabel: "Fin mai 2026",
    eyebrow: "Préparation · Port St. Lucie",
    title: "L'arrivée des Grenadiers",
    dek: "Vague après vague, les vingt-six rejoignent la Floride pour le dernier rassemblement avant la Coupe du Monde.",
    cover: "/images/journal/arrivee-des-grenadiers/cover.jpg",
    body: [
      "Le dernier rassemblement de la sélection nationale haïtienne avant la Coupe du Monde s'est ouvert en Floride à la fin du mois de mai. Vague après vague, les vingt-six Grenadiers retenus par Sébastien Migné ont rejoint la base de préparation, marquant le coup d'envoi des semaines qui mèneront l'équipe au 13 juin et à son entrée en compétition face à l'Écosse, à Foxborough.",

      "Le premier arrivé fut Ruben Providence. Le buteur du deuxième but face au Nicaragua — celui qui, le 18 novembre 2025, a scellé la qualification — a posé ses valises à Miami, ouvrant le long défilé. Quelques jours plus tard, Hannes Delcroix, Josué Duverger, Louicius Deedson et Duke Lacroix rejoignaient le groupe à leur tour, inscrivant leurs noms au cahier des présents.",

      "La cadence s'est accélérée. Martin Experience, Wilguens Paugain, Johny Placide, Keeto Thermoncy et Lenny Joseph se sont présentés ensemble — le capitaine et quatre de ses cadres venus prendre place dans le rassemblement. Carl Fred Sainté et Danley Jean-Jacques ont posé le pied sur le sol floridien à leur tour, dans la foulée.",

      "Le mardi 26 mai, à Port St. Lucie, la sélection a tenu sa première séance d'entraînement collective. Sous l'œil du sélectionneur et de son staff, le groupe a entamé le travail. Josué Casimir et Jean-Kévin Duverne complétaient les effectifs dans la foulée ; Ricardo Adé débarquait quelques heures plus tard.",

      "Les internationaux basés en Europe se sont joints au groupe au fil des jours suivants. Jean-Ricner Bellegarde, Wilson Isidor, Dominique Simon, Leverton Pierre et Duckens Nazon — qui font la richesse de cette sélection — ont tour à tour rejoint le rassemblement, leurs saisons en club tout juste achevées. La deuxième séance, plus poussée, marquait une étape supplémentaire dans la préparation des deux rencontres amicales à venir.",

      "Frantzdy Pierrot, dernier à rejoindre le camp, est arrivé avec la détermination des grandes occasions. L'effectif est désormais au complet. Les Grenadiers entrent dans leur dernière ligne droite : deux matchs de préparation, le 2 juin face à la Nouvelle-Zélande et le 5 juin face au Pérou, avant le grand rendez-vous.",

      "Cinquante-deux ans après Munich, la sélection nationale d'Haïti se prépare à reprendre sa place sur la scène mondiale.",
    ],
    albums: [
      {
        title: "Les premières vagues",
        photos: [
          { src: "/images/journal/arrivee-des-grenadiers/01-providence.jpg", alt: "Ruben Providence arrive à Miami" },
          { src: "/images/journal/arrivee-des-grenadiers/02-delcroix.jpg", alt: "Hannes Delcroix rejoint le camp" },
          { src: "/images/journal/arrivee-des-grenadiers/03-duverger.jpg", alt: "Josué Duverger au rassemblement" },
          { src: "/images/journal/arrivee-des-grenadiers/04-deedson.jpg", alt: "Louicius Deedson à son arrivée" },
          { src: "/images/journal/arrivee-des-grenadiers/05-lacroix.jpg", alt: "Duke Lacroix rejoint le groupe" },
          { src: "/images/journal/arrivee-des-grenadiers/06-experience.jpg", alt: "Martin Experience à son arrivée" },
          { src: "/images/journal/arrivee-des-grenadiers/07-paugain.jpg", alt: "Wilguens Paugain rejoint le rassemblement" },
          { src: "/images/journal/arrivee-des-grenadiers/08-placide.jpg", alt: "Johny Placide, capitaine, à son arrivée" },
          { src: "/images/journal/arrivee-des-grenadiers/09-thermoncy.jpg", alt: "Keeto Thermoncy au camp" },
          { src: "/images/journal/arrivee-des-grenadiers/10-joseph.jpg", alt: "Lenny Joseph rejoint le groupe" },
          { src: "/images/journal/arrivee-des-grenadiers/11-sainte-jean-jacques.jpg", alt: "Carl Fred Sainté et Danley Jean-Jacques à Port St. Lucie" },
        ],
      },
      {
        title: "Premier entraînement et nouvelles arrivées",
        photos: [
          { src: "/images/journal/arrivee-des-grenadiers/12-entrainement-1.jpg", alt: "Première séance d'entraînement, mardi 26 mai" },
          { src: "/images/journal/arrivee-des-grenadiers/13-entrainement-1-detail.jpg", alt: "Premier entraînement collectif à Port St. Lucie" },
          { src: "/images/journal/arrivee-des-grenadiers/14-casimir-duverne.jpg", alt: "Josué Casimir et Jean-Kévin Duverne rejoignent le rassemblement" },
          { src: "/images/journal/arrivee-des-grenadiers/15-ade.jpg", alt: "Ricardo Adé débarque" },
        ],
      },
      {
        title: "Les internationaux européens",
        photos: [
          { src: "/images/journal/arrivee-des-grenadiers/16-bellegarde.jpg", alt: "Jean-Ricner Bellegarde arrive de Premier League" },
          { src: "/images/journal/arrivee-des-grenadiers/17-isidor.jpg", alt: "Wilson Isidor rejoint le groupe" },
          { src: "/images/journal/arrivee-des-grenadiers/18-simon.jpg", alt: "Dominique Simon au camp" },
          { src: "/images/journal/arrivee-des-grenadiers/19-pierre.jpg", alt: "Leverton Pierre à son arrivée" },
          { src: "/images/journal/arrivee-des-grenadiers/20-nazon.jpg", alt: "Duckens Nazon, meilleur buteur de l'histoire d'Haïti" },
        ],
      },
      {
        title: "Deuxième séance et dernier arrivé",
        photos: [
          { src: "/images/journal/arrivee-des-grenadiers/21-entrainement-2.jpg", alt: "Deuxième séance d'entraînement" },
          { src: "/images/journal/arrivee-des-grenadiers/22-entrainement-2-detail.jpg", alt: "Le groupe au travail" },
          { src: "/images/journal/arrivee-des-grenadiers/23-pierrot.jpg", alt: "Frantzdy Pierrot, dernier arrivé" },
        ],
      },
    ],
  },
];

// Helper — get entry by slug
export function getEntryBySlug(slug) {
  return diaryEntries.find((e) => e.slug === slug) || null;
}

// Helper — get entries sorted by date desc (newest first)
export function getEntriesSorted() {
  return [...diaryEntries].sort((a, b) => b.date.localeCompare(a.date));
}

// Helper — normalize entry to an array of albums.
// Handles both new schema (entry.albums) and legacy schema (entry.gallery).
export function getAlbums(entry) {
  if (entry.albums && entry.albums.length > 0) return entry.albums;
  if (entry.gallery && entry.gallery.length > 0) return [{ photos: entry.gallery }];
  return [];
}
