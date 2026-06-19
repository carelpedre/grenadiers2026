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
//   coverAtEnd   : optional · when true, the cover is also shown full width
//                  at the end of the article body
//   body         : array of paragraphs
//   source       : optional credit line shown below body
//   sourceUrl    : optional URL · when present, the source line renders as a link
//   type         : optional layout. "press-conference" adds L'article /
//                  Transcription intégrale tabs (alias: format: "presser")
//   transcript   : press-conference only · array of items, each one of:
//                  { time?, topic?, q?, speaker, text } | { speaker, lines: [...] }
//                  | { heading } (section title, e.g. a player's name)
//   transcriptNote: optional italic note shown atop the transcript tab
//   albums       : array of { title?, photos: [{src, alt}, ...] }
//                  - If a single album has no title, it renders as a flat gallery.
//                  - Multiple albums each render with their title as a subsection.
//   gallery      : (legacy) flat photo array — still supported; treated as one untitled album.

export const diaryEntries = [
  {
    slug: "duke-lacroix-philadelphie",
    date: "2026-06-18",
    dateLabel: "18 juin 2026",
    eyebrow: "Portrait · FIFA",
    title: "Le conte de fées de Duke Lacroix, de Philadelphie face à Vinícius",
    dek: "À la veille de Haïti-Brésil, la FIFA consacre un Team Feature au défenseur Duke Lacroix : élevé dans le New Jersey, formé à l'Université de Pennsylvanie, il retrouve Philadelphie pour défier Vinícius Jr et les stars brésiliennes.",
    cover: "/images/journal/duke-lacroix.jpg",
    video: "https://www.youtube.com/watch?v=jyu5HpdP1Os",
    videoExternal: true, // contenu FIFA : intégration bloquée, ouvre sur YouTube
    videoCaption: "Team Feature FIFA consacré à Duke Lacroix.",
    body: [
      "À l'approche du choc tant attendu entre Haïti et le Brésil au Philadelphia Stadium, l'attention se tourne vers un duel aux allures de « David contre Goliath ». Au cœur de cette épopée historique se trouve le défenseur haïtien Duke Lacroix, dont le parcours personnel croise de manière spectaculaire la grande histoire du football de son pays.",
      "## Un retour aux sources chargé d'émotion",
      "Pour Duke Lacroix, ce match à Philadelphie représente bien plus qu'une simple rencontre de Coupe du Monde. Élevé dans le New Jersey, il a passé quatre ans sur les bancs de l'Université de Pennsylvanie pour ses études de premier cycle. C'est là que sa carrière de footballeur a franchi des étapes cruciales. Revenir dans cette ville pour y disputer un match d'une telle envergure internationale est un véritable rêve d'enfant devenu réalité.",
      "Le joueur exprime avec beaucoup de fierté ce que représente le fait de porter les couleurs de sa patrie d'origine :",
      "« C'est définitivement un moment dont j'ai rêvé : jouer contre certaines des icônes de ce sport, dans la région où j'ai grandi, avec le pays auquel je m'identifie et où mes parents ont grandi. Je n'aurais pas pu écrire un meilleur scénario. »",
      "L'émotion est tout aussi intense du côté de sa famille. Lacroix se rappelle avec tendresse la réaction de ses parents lors de sa première sélection, sa « première cape » : alors que l'hymne national retentissait, ses parents criaient de joie devant la télévision et son père en a même pleuré. L'annonce de sa convocation officielle avec les Grenadiers d'Haïti les a transportés de bonheur.",
      "## De l'ombre à la lumière des projecteurs",
      "Le parcours de la sélection haïtienne dans cette campagne de la Coupe du Monde 2026 est la définition même de la persévérance. Duke Lacroix rappelle qu'au tout début de leur aventure en 2024, l'équipe jouait devant à peine quelques centaines de spectateurs à la Barbade.",
      "Le contraste est saisissant : lors de leur premier match de poule face à l'Écosse, soldé par une défaite serrée de 1-0, l'équipe a évolué devant une foule immense de 65 000 personnes. Pour le choc face aux stars brésiliennes comme Vinícius Júnior, le stade de Philadelphie affichera complet.",
      "## Confiance et détermination face au géant brésilien",
      "Malgré la pression grandissante et le statut d'immense favori du Brésil, le groupe haïtien aborde ce rendez-vous sans complexe. Lacroix souligne qu'il règne une forte culture de confiance en soi au sein de l'équipe. Les joueurs sont convaincus de leurs capacités et de ce qu'ils peuvent accomplir sur le rectangle vert.",
      "Pour Haïti, ce match est l'occasion rêvée de prouver sa valeur aux yeux du monde entier, des supporters haïtiens, brésiliens et de tous les passionnés de football. Le rendez-vous est pris pour ce grand moment d'histoire.",
    ],
  },
  {
    slug: "grenadiers-bresil",
    date: "2026-06-17",
    dateLabel: "17 juin 2026",
    eyebrow: "Avant-match · Brésil",
    title: "Les Grenadiers face au Brésil de Neymar",
    dek: "Après l'Écosse, place à la Seleção. Ce vendredi à Philadelphie, les Grenadiers défient le Brésil de Neymar, avec l'interdiction de perdre s'ils veulent garder vivant leur rêve de seizièmes de finale.",
    cover: "/images/journal/grenadiers-bresil.jpg",
    body: [
      "Les Grenadiers, battus par l'Écosse samedi dernier au Gillette Stadium pour leur retour à la Coupe du monde après plus de cinq décennies d'absence, affrontent le Brésil de Neymar Jr ce vendredi 19 juin dans un match à tout casser où la défaite est plutôt déconseillée pour les Haïtiens s'ils veulent garder en vie leur rêve d'accéder aux seizièmes de finale.",
      "L'Écosse, c'est du passé. Place maintenant à la Seleção, quintuple championne du monde, qui a brandi le prestigieux trophée pour la dernière fois en 2002 en Corée du Sud et au Japon. C'est cette équipe affamée, assoiffée de titre et quelque peu frustrée après son match nul (1-1) contre le Maroc lors de son entrée en lice, que les protégés de Sébastien Migné affrontent ce vendredi à Philadelphie.",
      "La peur au ventre, les pieds tremblants ? Absolument pas. La tête haute et une confiance absolue !",
      "Car au-delà de l'écart de niveau qui sépare les deux sélections, les Grenadiers savent qu'ils auront derrière eux tout un peuple prêt à rêver d'un exploit historique. Et quoi de plus symbolique que de le faire face à une équipe du Brésil qui occupe une place particulière dans le cœur des Haïtiens ?",
      "Depuis des générations, la Seleção est sans doute l'équipe étrangère la plus populaire en Haïti. Des rues de Port-au-Prince aux plus petites localités du pays, les maillots jaunes et verts font partie du paysage lors des grandes compétitions internationales. Pelé, Romário, Ronaldo, Ronaldinho, Kaká, Neymar : autant de noms qui ont nourri la passion de millions d'Haïtiens pour le football brésilien.",
      "Mais vendredi, l'admiration laissera place à la compétition. Les supporters haïtiens mettront de côté leur affection pour la Seleção afin de soutenir sans réserve les Grenadiers dans ce qui s'annonce comme l'un des plus grands défis de leur histoire récente.",
      "Les statistiques, elles, ne jouent pas en faveur d'Haïti. La dernière confrontation entre les deux formations s'était soldée par une démonstration brésilienne, les Sud-Américains s'imposant sur le score sans appel de 7 buts à 1 (Copa America Centenario). Un résultat qui rappelle toute l'ampleur de la tâche qui attend les Grenadiers.",
      "Toutefois, les Coupes du monde ont souvent été le théâtre de surprises mémorables. Dans un match où la pression reposera principalement sur les épaules des Brésiliens, contraints de gagner pour se replacer dans la course à la qualification, Haïti pourrait tenter de jouer sa carte à fond : solidarité, discipline tactique et efficacité devant le but. Une finition qui leur a fait faux bond contre les Écossais.",
      "Les Grenadiers auront l'occasion d'écrire une nouvelle page de leur histoire face à l'une des nations les plus prestigieuses du football mondial. L'occasion également pour les Nazon, Pierrot, Isidor et autres de confirmer pourquoi ils sont des Grenadiers et du même coup choquer le monde en écœurant le Brésil.",
      "Wilner Bossou",
    ],
  },
  {
    slug: "national-anthems-haiti-documentaire",
    featured: true,
    date: "2026-06-14",
    dateLabel: "14 juin 2026",
    eyebrow: "Reportage · Documentaire",
    title: "« Bien plus que du sport » : le rêve haïtien raconté par ses joueurs",
    dek: "Dans la série documentaire National Anthems, deux internationaux haïtiens racontent ce que représente ce retour au Mondial : la fierté, la diaspora, et un pays qui se raccroche à son équipe. Un film à voir.",
    cover: "/images/journal/national-anthems-haiti.jpg",
    video: "https://www.youtube.com/watch?v=JR6prnbl3pw",
    videoCaption: "« Haiti's World Cup Dream Is Bigger Than Sports », série National Anthems, sur la chaîne de la MLS.",
    source: "Source : Major League Soccer · série National Anthems.",
    sourceUrl: "https://www.youtube.com/watch?v=JR6prnbl3pw",
    body: [
      "Certains récits dépassent le terrain. National Anthems est une série documentaire en neuf épisodes, produite par Goodform Productions, qui explore l'identité et l'ADN culturel des sélections du Mondial 2026 à travers le regard de joueurs de Major League Soccer et de leurs supporters. Lancée en mai 2026, déclinée en formats courts d'une dizaine de minutes publiés au rythme des grandes affiches du tournoi et diffusée notamment sur Apple TV, Prime Video, Tubi, FOX et les plateformes de la MLS, la série a posé sa caméra sur Haïti. Le résultat est un film dense, où l'on entend directement les Grenadiers raconter ce que signifie représenter leur pays à ce moment de l'histoire.",
      "Le film s'ouvre loin des stades, dans la culture : le pâté haïtien, la cuisine, la fierté d'une diaspora qui veut élever l'image d'Haïti au moment où la sélection accède à la scène mondiale. Car c'est bien de cela qu'il s'agit, une première qualification en Coupe du Monde depuis 52 ans, pour un pays traversé par l'instabilité politique, la violence et l'épreuve. Dans ce contexte, la qualification prend des allures d'éclaircie : une raison d'espérer et de se réjouir, ensemble.",
      "Le documentaire rappelle l'ampleur du défi relevé. Faute de pouvoir jouer le moindre match de qualification à domicile, pour des raisons de sécurité, les Grenadiers ont disputé leurs rencontres « à domicile » à Curaçao. Et malgré ce handicap, ils ont terminé en tête de leur groupe et décroché leur billet.",
      "À l'écran, les voix de Danley Jean-Jacques (Philadelphia Union) et Derrick Etienne Jr. (Toronto FC) racontent la même chose, sous des angles différents : la fierté du maillot, le poids de l'histoire, le rêve de faire mieux que tous ceux qui les ont précédés. Car Haïti n'a jamais gagné le moindre match en Coupe du Monde, et cette génération veut être celle qui change cela, même face à des géants comme le Brésil.",
      "Mis en ligne par la chaîne YouTube de la MLS au lendemain du match d'ouverture, le film prend un relief particulier. Pour leur entrée dans le tournoi, à Foxborough près de Boston, où vit l'une des plus grandes communautés haïtiennes des États-Unis, les Grenadiers ont retrouvé cette atmosphère bouillante de vrai match à domicile loin de la maison, malgré la défaite concédée face à l'Écosse (1-0). La route se poursuit désormais à Philadelphie face au Brésil, puis à Atlanta face au Maroc.",
      "Le film dit, mieux que des chiffres, pourquoi cette équipe compte autant : elle porte un pays tout entier.",
    ],
  },
  {
    slug: "lenny-joseph-ruben-providence-zone-mixte-ecosse",
    featured: true,
    type: "press-conference",
    date: "2026-06-13",
    dateLabel: "13 juin 2026",
    eyebrow: "Zone mixte · Après-match",
    title: "« On a perdu une bataille, pas la guerre » : Joseph et Providence refusent de céder au découragement",
    dek: "En zone mixte après la défaite (1-0) face à l'Écosse, Lenny Joseph et Ruben Providence saluent le contenu d'un match maîtrisé, pointent le manque de réalisme dans les derniers mètres, et refusent déjà d'abandonner avant le Brésil.",
    cover: "/images/journal/joseph-providence-zone-mixte.jpg",
    video: "https://www.youtube.com/watch?v=56tHphNuNpA",
    videoExternal: true, // contenu FIFA : intégration bloquée, ouvre sur YouTube
    videoCaption: "Les réactions de Lenny Joseph et Ruben Providence en zone mixte.",
    source: "Source : Fédération Haïtienne de Football.",
    body: [
      "La déception était visible sur les visages haïtiens au sortir de la défaite contre l'Écosse (1-0). Mais dans les couloirs du stade, ni Lenny Joseph ni Ruben Providence ne donnaient l'impression d'une équipe abattue. Frustrés par le résultat, les deux internationaux retenaient surtout une conviction : Haïti a démontré qu'elle pouvait rivaliser avec des adversaires de haut niveau et reste pleinement en course dans cette Coupe du monde.",
      "Le sentiment dominant était celui d'une occasion manquée. Les Grenadiers ont longtemps tenu tête aux Écossais, se créant plusieurs situations dangereuses sans parvenir à faire trembler les filets. Pour Joseph, la différence s'est jouée dans les derniers mètres.",
      "« On a eu beaucoup d'actions en première mi-temps, après le but aussi et même pendant toute la deuxième période. Il nous manque un peu de justesse dans les derniers mètres, trouver la bonne personne, le bon espace. On doit être plus précis et concrétiser nos actions. »",
      "Même constat du côté de Ruben Providence. L'ailier estime que le contenu produit par les Grenadiers doit servir de base pour la suite de la compétition.",
      "« On a créé pas mal d'occasions. Malheureusement, on n'a pas réussi à mettre le ballon au fond des filets. Mais c'est encourageant pour la suite. On a eu la possession, on a créé des situations, il va simplement falloir être plus concret dans les trente derniers mètres. »",
      "Au-delà du score, les deux joueurs ont surtout insisté sur la qualité de la prestation collective. Longtemps présentée comme l'une des équipes les moins expérimentées du tournoi, la sélection haïtienne a montré qu'elle pouvait répondre au défi physique et tactique imposé par l'Écosse.",
      "Joseph estime même que cette première sortie a envoyé un message au reste du groupe.",
      "« Certains nous sous-estimaient peut-être un peu. Aujourd'hui, on a montré qu'on pouvait être dangereux contre une belle équipe d'Écosse. On a été solides défensivement, on a su les mettre en difficulté. Ce sont de très bons signaux pour l'avenir. »",
      "Providence partage cette analyse. Selon lui, le scénario du match confirme davantage les qualités d'Haïti qu'il ne révèle ses limites.",
      "« Les gens pensaient que ce serait beaucoup plus difficile pour nous. Mais nous connaissions nos qualités. Nous ne pensions pas que l'Écosse allait nous marcher dessus. Au contraire, nous avons montré ce dont nous étions capables. Bien sûr, vu le déroulement du match, nous aurions aimé repartir avec au moins un point. »",
      "Cette confiance n'efface toutefois pas la déception du résultat. Les deux joueurs reconnaissent que débuter la compétition avec une défaite n'était pas le scénario espéré.",
      "« Bien sûr que ça nous affecte », admet Providence. « Nous aurions aimé commencer avec des points. Mais ce n'est pas fini. Il reste deux matchs. Même face à de très grosses équipes, nous pouvons encore obtenir un résultat. »",
      "Car désormais, les regards se tournent vers le Brésil et le Maroc, deux adversaires que beaucoup considèrent comme encore plus redoutables que l'Écosse. Une perspective qui ne semble pourtant pas entamer l'ambition du vestiaire haïtien.",
      "« Aujourd'hui, nous avons surpris beaucoup de monde », affirme Providence. « Nous pouvons faire la même chose contre le Brésil ou le Maroc. Il n'y a aucune raison d'abandonner. »",
      "Le même état d'esprit anime Lenny Joseph, qui a lancé l'un des messages les plus marquants de la soirée à destination des supporters haïtiens.",
      "« On a perdu une bataille, mais pas la guerre. On va tout donner pour essayer de prendre un maximum de points jusqu'à la fin de la compétition. Aujourd'hui, on a vu qu'on pouvait mettre les équipes en danger. »",
      "Les deux joueurs ont également tenu à remercier les milliers de supporters présents dans les tribunes de Boston. Dans un contexte où Haïti ne peut toujours pas accueillir ses matchs internationaux à domicile, leur présence a été ressentie comme un véritable avantage.",
      "« Nous avons besoin d'eux », a insisté Joseph. « C'est très important qu'ils fassent du bruit dans les stades et qu'ils nous poussent pendant les matchs. »",
      "Providence espère désormais retrouver la même ferveur lors du prochain rendez-vous à Philadelphie.",
      "« Il y avait beaucoup de supporters aujourd'hui. C'est exactement ce dont nous avons besoin. Cela nous donne de la force sur le terrain et nous aide à continuer à tout donner. »",
      "Pour les deux Grenadiers, cette Coupe du monde représente déjà un moment historique. Cinquante-deux ans après la dernière participation d'Haïti, entendre l'hymne national résonner avant le coup d'envoi a provoqué une émotion particulière.",
      "« C'est quelque chose d'incroyable de représenter Haïti dans cette compétition », confie Joseph. « Pendant les hymnes, on a des frissons. On veut tout donner pour rendre notre peuple fier. »",
      "Un sentiment partagé par Providence.",
      "« Entendre l'hymne, voir tout le public chanter, cela donne beaucoup d'émotion. Cela nous pousse à nous battre et à tout donner sur le terrain. »",
      "Le résultat n'a donc pas changé l'état d'esprit du groupe. Dans le vestiaire haïtien, la frustration est bien réelle. Mais la conviction l'est tout autant : malgré cette défaite inaugurale, les Grenadiers continuent de croire que leur histoire dans ce Mondial est loin d'être terminée.",
    ],
    transcript: [
      { heading: "Lenny Joseph" },
      { topic: "Sur le soutien des supporters", q: "Après cette défaite, quel est votre message à la communauté haïtienne qui viendra vous soutenir à Philadelphie et à Atlanta ?", speaker: "Lenny Joseph", text: "Nous voulons d'abord remercier tout le monde. Nous avons besoin d'eux dans cette compétition. Ils doivent donner de la force à l'équipe, nous aider. C'est très important qu'ils fassent du bruit dans le stade, qu'ils nous poussent pendant les matchs. Nous avons besoin d'eux." },
      { topic: "Sur ce qui a manqué pour revenir au score", q: "À quel moment avez-vous senti que l'équipe pouvait revenir, et qu'est-ce qui l'a empêchée ?", speaker: "Lenny Joseph", text: "Nous avons eu beaucoup d'actions en première mi-temps, après le but, et même en deuxième période. Il nous manque un peu de justesse dans les derniers mètres, trouver la bonne personne, le bon espace. Nous devons être plus précis et concrétiser." },
      { topic: "Sur l'Écosse", q: "Quelle est votre impression de l'adversaire ?", speaker: "Lenny Joseph", text: "Une équipe très solide, avec de très bons joueurs et une défense très forte. C'était un match difficile. Mais je pense que nous avons eu les espaces pour marquer et peut-être obtenir un nul." },
      { topic: "Sur le retour d'Haïti à la Coupe du Monde", q: "Qu'avez-vous ressenti lors des hymnes, pour le premier match d'Haïti depuis 52 ans ?", speaker: "Lenny Joseph", text: "C'est quelque chose d'incroyable de représenter Haïti. Pendant les hymnes, nous avons des frissons. Nous sommes fiers de représenter ce pays et nous voulons tout donner pour rendre les gens fiers." },
      { topic: "Sur la crédibilité de l'équipe", q: "Pensez-vous que cette prestation a renforcé la crédibilité d'Haïti ?", speaker: "Lenny Joseph", text: "Certains nous sous-estimaient un peu. Aujourd'hui, nous avons montré que nous pouvions être dangereux, solides défensivement, et mettre une équipe comme l'Écosse en difficulté. Ce sont de très bons signaux pour la suite." },
      { topic: "Sur le plan de jeu", speaker: "Lenny Joseph", text: "L'objectif était d'abord de bien défendre, de ne pas encaisser rapidement, mais aussi de jouer les contre-attaques à fond. Nous savions qu'il y avait des espaces derrière leurs latéraux." },
      { topic: "Sur Frantzdy Pierrot", speaker: "Lenny Joseph", text: "J'aime jouer avec Pierrot. C'est un très bon attaquant, très fort dos au but et dans le jeu aérien. Aujourd'hui il n'a pas marqué, mais son premier but dans cette Coupe du Monde arrivera." },
      { topic: "Message final", speaker: "Lenny Joseph", text: "Merci à tous ceux qui sont venus nous soutenir. Nous avons perdu une bataille, mais pas la guerre. Nous allons tout donner pour prendre un maximum de points jusqu'à la fin." },
      { heading: "Ruben Providence" },
      { topic: "Sur ce qui a manqué", q: "Qu'est-ce qui a manqué pour revenir au score ?", speaker: "Ruben Providence", text: "Pas grand-chose. Nous avons créé beaucoup d'occasions mais nous n'avons pas réussi à mettre le ballon au fond. C'est encourageant, mais nous devons être plus efficaces dans les trente derniers mètres." },
      { topic: "Sur l'impact de la défaite", speaker: "Ruben Providence", text: "Bien sûr que cela nous affecte. Nous aurions aimé commencer avec des points. Mais il reste deux matchs et nous pouvons encore obtenir un résultat." },
      { topic: "Sur les regrets", speaker: "Ruben Providence", text: "Beaucoup pensaient que ce serait plus difficile pour nous, mais nous connaissions nos qualités. Nous avons montré ce dont nous étions capables. Vu le déroulement, nous aurions aimé repartir avec au moins un point." },
      { topic: "Sur le Brésil et le Maroc", speaker: "Ruben Providence", text: "Ce sont de grands adversaires, mais nous n'allons pas leur laisser la victoire. Nous allons jouer avec nos qualités, comme aujourd'hui. Nous avons surpris beaucoup de monde et nous pouvons encore le faire." },
      { topic: "Sur le soutien de la communauté", speaker: "Ruben Providence", text: "Il y avait beaucoup de supporters aujourd'hui. C'est exactement ce dont nous avons besoin. Nous espérons le même soutien à Philadelphie. Cela nous donne de la force sur le terrain." },
      { topic: "Sur l'émotion de représenter Haïti", speaker: "Ruben Providence", text: "Entendre l'hymne national et voir tout le public chanter ensemble, cela fait chaud au cœur. Il y avait énormément d'émotion. Cela nous motive à tout donner pour le pays." },
      { topic: "Sur les points forts d'Haïti", speaker: "Ruben Providence", text: "Notre agressivité a été notre meilleure qualité. Nous avons gagné beaucoup de duels, nous n'avons rien lâché, et cela montre que nous sommes une équipe difficile à battre." },
      { topic: "Sur l'Écosse", speaker: "Ruben Providence", text: "Je ne pense pas qu'ils nous aient sous-estimés. Ils savaient que nous étions compétitifs. Ils ont beaucoup travaillé sur nous et repartent certainement très heureux avec les trois points." },
    ],
    albums: [],
  },
  {
    slug: "sebastien-migne-conference-presse-ecosse-apres-match",
    featured: true,
    type: "press-conference",
    date: "2026-06-13",
    dateLabel: "13 juin 2026",
    eyebrow: "Conférence de presse · Après-match",
    title: "Résilience et fierté : Migné refuse le catastrophisme après la défaite face à l'Écosse",
    dek: "Battus mais convaincants pour leur retour au Mondial après 52 ans, les Grenadiers ont poussé l'Écosse dans ses retranchements. En conférence de presse, le sélectionneur oscille entre déception et fierté, et regarde déjà vers le Brésil.",
    cover: "/images/journal/migne-conference-apres-match-ecosse.jpg",
    video: "https://www.youtube.com/watch?v=Y3LQyq_uKdU",
    videoExternal: true, // contenu FIFA : intégration bloquée, ouvre sur YouTube
    videoCaption: "La conférence de presse d'après-match de Sébastien Migné.",
    source: "Source : Fédération Haïtienne de Football.",
    body: [
      "Le résultat est cruel. Pour son retour en Coupe du monde, cinquante-deux ans après l'épopée de 1974, Haïti a quitté le terrain battue par l'Écosse (1-0), vendredi soir, avec le sentiment d'être passée tout près d'un exploit. Les Grenadiers ont longtemps rivalisé avec une sélection écossaise mieux classée et plus habituée aux grands rendez-vous internationaux, sans toutefois parvenir à transformer leurs temps forts en but.",
      "En conférence de presse, Sébastien Migné n'a pas cherché à masquer sa déception. Mais loin de toute forme de résignation, le sélectionneur a surtout retenu la capacité de son équipe à répondre présente sur la plus grande scène du football mondial.",
      "« Quand on s'engage dans un match, c'est pour essayer de le gagner. Il nous en manque un peu ce soir », a-t-il reconnu. « Mais je suis très fier de ce qu'ont montré les garçons, de leur prestation et du jeu pratiqué. Quand on sait d'où on vient, être à la hauteur sur ce type d'événement, c'est d'autant plus rageant. »",
      "Cette frustration est aussi le reflet des ambitions grandissantes d'une sélection qui refuse désormais de se contenter d'un rôle de figurante. Pendant de longues séquences, Haïti a démontré qu'elle avait les moyens de rivaliser avec une nation classée 42e au classement FIFA. Le but écossais, inscrit sur l'une des rares erreurs défensives haïtiennes, a finalement rappelé la réalité du très haut niveau : la moindre hésitation se paie immédiatement.",
      "Pour autant, Migné refuse de considérer cette défaite comme un coup d'arrêt. Depuis le début de la préparation, le technicien français répète à ses joueurs que leur parcours sera semé d'obstacles et que la qualification, si elle doit arriver, ne pourra être obtenue que dans la difficulté.",
      "Il a rappelé que même lors des qualifications, Haïti avait dû attendre les derniers instants pour valider son billet pour le Mondial. « Avec Haïti, rien n'est jamais facile », a-t-il insisté. « Je leur martèle depuis le début que si nous devons nous qualifier, cela se fera peut-être dans les dernières minutes du troisième match. »",
      "Dans ce contexte, il refuse tout emballement, dans un sens comme dans l'autre.",
      "« Si nous avions gagné, il aurait fallu éviter l'euphorie. Aujourd'hui, je ne vais certainement pas tomber dans un catastrophisme ambiant. Il y avait des choses très intéressantes dans cette rencontre. »",
      "L'une de ces satisfactions réside dans la capacité des Grenadiers à construire leurs actions et à se créer des situations dangereuses. Le sélectionneur estime néanmoins que son équipe a manqué de justesse dans les derniers mètres. « Nous avons été très intéressants dans l'élaboration du jeu jusqu'à environ vingt-cinq mètres du but adverse. Ensuite, nous avons manqué un peu de spontanéité dans nos mouvements offensifs, dans le jeu combiné et dans nos prises de décision. »",
      "Cette analyse vaut également pour Frantzdy Pierrot. L'attaquant, né à Boston, rêvait sans doute d'un scénario différent pour cette première Coupe du monde disputée dans sa ville natale. Auteur de plusieurs situations dangereuses, il a toutefois manqué l'efficacité qui aurait pu changer le cours de la rencontre.",
      "Migné s'est montré protecteur envers son avant-centre. « Il s'est procuré des occasions, et c'est souvent le plus difficile pour un attaquant. Il lui a manqué un peu de réussite dans la finition, mais nous n'oublions pas tout ce qu'il apporte à l'équipe. »",
      "Déjà, les regards se tournent vers le prochain défi. Dans cinq jours, Haïti croisera la route du Brésil, l'un des favoris du tournoi. Une affiche prestigieuse qui ne semble pas impressionner outre mesure le sélectionneur.",
      "« Nos adversaires ont beaucoup plus à perdre que nous », a-t-il lancé. « Quelle belle chance pour mes gars de jouer dans ce type d'atmosphère. »",
      "Le nouveau format de la compétition, qui ouvre la porte aux meilleurs troisièmes, entretient par ailleurs l'espoir haïtien. Malgré cette défaite inaugurale, les Grenadiers restent pleinement en vie dans la course à la qualification. Pour Migné, l'histoire de ce Mondial ne fait que commencer.",
      "Et si son équipe a quitté le terrain battue face à l'Écosse, elle est aussi repartie avec une conviction nouvelle : celle d'avoir sa place parmi les meilleures nations du football mondial.",
    ],
    transcript: [
      { speaker: "FIFA Official", text: "Hi, I welcome the head coach, Sébastien Migné, and the press officer. Simultaneous translation is available via the FIFA interpretation app. I hand over to Jeanty Tessieu for the questions." },
      { speaker: "Jeanty Tessieu (attaché de presse)", text: "Merci. Bonsoir tout le monde. Nous avons avec nous le coach Sébastien Migné, qui va très certainement répondre à vos questions après le match que l'équipe haïtienne vient de perdre sur le score de 1 but à 0 face à l'Écosse. Nous sommes prêts pour les questions. Question, please ?" },
      { speaker: "Vincent Duluc (L'Équipe)", text: "Oui, bonjour. Vincent Duluc, L'Équipe. Est-ce que vous n'êtes pas surpris, mais justement encore plus déçu d'être passé aussi près ?" },
      { speaker: "Sébastien Migné", text: "Forcément, quand on s'engage dans un match, c'est pour essayer de le gagner, et on est obligé de constater que ce soir, il nous en manque un peu. D'un côté, très fier de ce qu'ont montré les garçons, de leur prestation, du jeu pratiqué. Quand on sait d'où on vient, être à la hauteur sur ce type d'événement, c'est d'autant plus rageant, il en manque un peu. J'espère qu'on va se servir de ça pour continuer à montrer de belles prestations et garder de l'espoir. On sait qu'avec Haïti, rien n'est jamais facile, il faut faire preuve de résilience. Même quand nous avons gagné notre dernier match contre le Nicaragua, il a fallu attendre quelques minutes avant d'être sûrs d'être qualifiés. J'ai l'impression que c'est la même chose. Je leur martèle depuis le début de notre préparation que ce serait trop facile d'être en tête ce soir après une victoire, que si on doit se qualifier, ça se fera dans la difficulté, peut-être sur les dernières minutes du troisième match. On est conditionnés pour ça. Si nous avions gagné, il n'aurait pas fallu tomber dans l'euphorie, il aurait fallu canaliser tout le monde. Et là, je ne vais pas tomber dans un catastrophisme ambiant. Il y avait des choses plutôt intéressantes. Au très haut niveau, il suffit d'un oubli pour se faire sanctionner, et ça a été le cas ce soir. J'attends de revoir les images sur un plus grand écran. Il y a des images un peu virales depuis quelques minutes dans le vestiaire, avec peut-être une main écossaise, je n'en sais rien. J'attends de revoir la situation, mais je suppose qu'avec la VAR et tout ce qui est en place, si vraiment il y avait eu penalty sur une frappe de Bellegarde, ça aurait été sifflé. Déçu, mais on est là. Maintenant, c'est une montagne qui arrive dans cinq jours avec le Brésil. On va essayer d'être à la hauteur. C'est de toute manière un match de prestige, et quand on a été absents 52 ans de ce type de compétition, on ne peut pas galvauder le plaisir d'être là. Il faudra savourer toutes les minutes, donner le maximum, faire les efforts nécessaires. Et même face au Brésil, il peut se passer beaucoup de choses. Je suis bien placé pour le savoir, puisqu'avec le Cameroun, nous leur avions fait mordre la poussière lors de la dernière édition. C'est ce qu'on va essayer de réaliser." },
      { speaker: "Jeanty Tessieu", text: "Merci. Le prochain ?" },
      { speaker: "Baptiste Desprez (Le Figaro)", text: "Bonsoir, Sébastien. Baptiste Desprez, Le Figaro. Tu as un peu répondu, mais qu'est-ce qu'on se dit quand on va affronter le Brésil et le Maroc, les deux plus costauds du groupe ? Tu parles de fierté, mais qu'est-ce que tu vas dire à tes garçons, et est-ce que tu crois encore à la qualification ?" },
      { speaker: "Sébastien Migné", text: "Bien sûr, je viens de vous le dire. On est conditionnés depuis le départ en se disant que ce ne sera pas facile. Le nouveau règlement, avec les huit meilleurs troisièmes possiblement qualifiables, peut nous offrir la perspective d'être en course en cas de victoire au troisième match. Il était important aussi, alors c'est toujours délicat à 1-0, d'emballer la rencontre sans s'ouvrir complètement, parce qu'on sait qu'à la fin, ça peut se jouer à la différence de buts. On grandit, on apprend encore une fois, et ce sera compliqué. On sait que c'était déjà dur avec l'Écosse, 42e au classement FIFA, et là on va atteindre les sommets. Mais je dirais que nos adversaires ont beaucoup plus à perdre que nous. Et quelle belle chance de jouer dans ce type d'atmosphère pour mes gars ! Quand on sait qu'on n'a pas joué à domicile, qu'on a été privés de toute cette relation avec nos fans, et que là on puisse partager ça avec eux, c'était formidable. Je pense que ce sera le cas encore sur les prochains matchs. On ne va rien lâcher, et on va essayer d'écrire une histoire encore plus belle que celle que les garçons sont en train d'écrire." },
      { speaker: "Jeanty Tessieu", text: "Question ? OK, allez-y, ici." },
      { speaker: "Steph Solis (Axios Boston)", text: "Yes, thank you. Steph Solis, Axios Boston. I'm wondering if you've spoken with Frantzdy Pierrot at this point and had a sense of what was going through his mind, and what was going through your mind as he almost scored that goal in the second half but came up a little short ?" },
      { speaker: "Sébastien Migné", text: "En premier lieu, je suis déçu pour lui, parce qu'il est natif de Boston. C'est formidable de ramener Haïti en Coupe du Monde, et en plus de jouer ce premier match chez lui, dans la ville où il a grandi. Il s'est procuré des occasions aujourd'hui, c'est le plus difficile pour un attaquant. Il en a manqué un peu dans la finition, mais on n'oublie pas tout ce qu'il nous apporte, dans le jeu et depuis le début. Je travaille avec lui depuis deux ans et demi. Il n'y a pas d'affolement à avoir, c'est le lot de tous les attaquants de haut niveau. Aujourd'hui, il lui en a manqué un petit peu. J'espère qu'il se réserve pour les deux prochaines rencontres." },
      { speaker: "Jeanty Tessieu", text: "Merci. Ici ?" },
      { speaker: "Enock E. Arismat", text: "Enock E. Arismat. Qu'est-ce qui a manqué aujourd'hui à Haïti pour obtenir un meilleur résultat ? Et est-ce que vous réfléchissez déjà aux ajustements que vous comptez apporter pour les prochains matchs, qui seront beaucoup plus difficiles ?" },
      { speaker: "Sébastien Migné", text: "Je pense qu'on a été très intéressants dans l'élaboration du jeu jusqu'à 25 mètres du but adverse. Dans ces 25 derniers mètres, on a manqué un peu de spontanéité dans nos mouvements offensifs, dans le jeu combiné, dans nos prises de décision. La marge de progression et l'axe de travail sont tout trouvés. Quant aux changements, je vais me laisser le temps de revoir le match, de débriefer avec mon staff et mes gars dès demain, sur le retour. Et on verra quel réajustement on fera. J'ai effectué des changements parce qu'on a un groupe de plus en plus large, donc j'ai plusieurs options à ma disposition. J'ai confiance en mes garçons. On a un enchaînement de matchs, même si c'est dans cinq jours, donc il s'agit de garder de la fraîcheur offensive, puisque dans tous les cas, il faudra marquer des buts si on veut un espoir de se qualifier. Il faudra que mes attaquants soient suffisamment alertes. C'est tout l'enjeu des prochains jours. On va bien se projeter. On a déjà bossé sur le Brésil, mais on va analyser leur match de cet après-midi, que j'ai observé de loin puisque j'étais concentré sur notre rencontre. On va s'y mettre dès ce soir, analyser le nôtre, et trouver la parade pour contrarier le Brésil." },
      { speaker: "Jeanty Tessieu", text: "OK, le coach vient de répondre à la toute dernière question. Nous vous disons merci." },
      { speaker: "Sébastien Migné", text: "Merci, messieurs dames." },
    ],
    albums: [],
  },
  {
    slug: "gonaives-ferveur-grenadiers",
    date: "2026-06-13",
    dateLabel: "13 juin 2026",
    eyebrow: "Au pays · Gonaïves",
    title: "À Gonaïves, la ferveur déborde dans les rues pour les Grenadiers",
    dek: "Pas une projection sage, mais un véritable défilé : motos, voitures, DJ, drapeaux et chants. La veille du match, la cité de l'Indépendance a célébré les Grenadiers par milliers. Images de Marc Henry Antoine.",
    cover: "/images/journal/gonaives-ferveur.jpg",
    photoCredit: "Marc Henry Antoine",
    body: [
      "Il n'y a pas que la diaspora qui vibre. À Gonaïves, la cité de l'Indépendance, la veille du match a pris des allures de carnaval. Pas une sage projection sur écran, mais un véritable défilé : des motos, des voitures, un DJ, des drapeaux à perte de vue et des chants repris par des milliers de voix. La ville entière est descendue dans la rue pour les Grenadiers.",
      "Les images du photographe Marc Henry Antoine racontent tout : une marée bicolore, des sourires, des poings levés, le drapeau haïtien brandi au milieu de la foule comme une promesse. Une énergie brute, joyeuse, indomptable.",
      "C'est cela, le pouvoir de cette équipe : relier Boston à Gonaïves, la diaspora à la terre natale, dans un même battement de cœur. Avant même le coup d'envoi, les Grenadiers ont déjà gagné quelque chose, ils ont redonné à tout un peuple une raison de se rassembler et de rêver ensemble.",
      "Quand le ballon roulera à Foxborough, les joueurs ne porteront pas seulement leurs propres espoirs. Ils porteront ceux de cette foule de Gonaïves, et de toutes les autres, partout où l'on aime Haïti. Grenadye, tout un pays est derrière vous.",
    ],
    source: "Source : Marc Henry Antoine.",
    // Reportage complet de Marc Henry Antoine (104 photos, ordre de prise de
    // vue) affiché en mosaïque sans recadrage, directement dans la page.
    albums: [
      {
        layout: "masonry",
        caption: "Gonaïves, la veille du match · Marc Henry Antoine",
        photos: Array.from({ length: 104 }, (_, i) => {
          const n = String(i + 1).padStart(3, "0");
          return {
            src: `/images/journal/gonaives/gonaives-${n}.jpg`,
            alt: `Ferveur des supporters des Grenadiers à Gonaïves, la veille du match (${i + 1})`,
          };
        }),
      },
    ],
  },
  {
    slug: "maillot-grenadiers-mupanah",
    date: "2026-06-13",
    dateLabel: "13 juin 2026",
    eyebrow: "Patrimoine · MUPANAH",
    title: "Le maillot des Grenadiers entre au MUPANAH",
    dek: "À quelques heures du premier match de la Coupe du monde 2026, le ministère de la Culture a confié le maillot officiel de la Sélection au Musée du Panthéon National Haïtien.",
    cover: "/images/journal/mupanah-maillot.jpg",
    coverAtEnd: true,
    body: [
      "Le 13 juin 2026, le maillot officiel de la Sélection nationale a fait son entrée dans les collections du Musée du Panthéon National Haïtien. Le ministre de la Culture et de la Communication, le Dr Emmanuel Ménard, a remis la pièce au musée lors d'une cérémonie organisée quelques heures avant le tout premier match des Grenadiers à la Coupe du monde de la FIFA 2026.",
      "Le directeur général du MUPANAH, Jean-Claude Legagneur, entouré de plusieurs directeurs généraux, accompagnait le ministre pour ce geste hautement symbolique. En accueillant ce maillot, le musée qui veille sur la mémoire nationale consacre la portée historique du retour d'Haïti sur la plus grande scène du football mondial, cinquante-deux ans après l'unique participation de 1974.",
      "La date n'a rien d'un hasard. Le 13 juin marque aussi l'anniversaire de la fondation de Port-au-Prince. En rejoignant les collections ce jour-là, le maillot des Grenadiers devient un témoin de l'histoire contemporaine du pays et de la fierté que la Sélection inspire à toute la nation.",
    ],
  },
  {
    slug: "team-feature-fifa-migne-nazon",
    date: "2026-06-12",
    dateLabel: "12 juin 2026",
    eyebrow: "Portrait d'équipe · FIFA",
    title: "Sur les traces de Sanon : Migné et Nazon racontent Haïti au monde",
    dek: "Dans un portrait d'équipe signé FIFA, le sélectionneur Sébastien Migné et Duckens Nazon relient l'exploit de 1974 au rêve de 2026 : marquer enfin, et montrer qu'un groupe uni peut bousculer les plus grands.",
    cover: "/images/journal/team-feature-fifa-migne-nazon.jpg",
    video: "https://www.youtube.com/watch?v=5_fFXj7CK-Q",
    videoExternal: true, // contenu FIFA : intégration bloquée, ouvre sur YouTube
    videoCaption: "Le portrait d'équipe d'Haïti produit par la FIFA.",
    body: [
      "À l'approche du grand soir, la FIFA a consacré un portrait à Haïti, et il commence là où tout a commencé. Un seul joueur haïtien a marqué en phase finale de Coupe du Monde : Emmanuel Sanon, en 1974, face à l'Italie et au légendaire gardien Dino Zoff. Sébastien Migné le rappelle d'emblée, et formule un souhait simple : que ses attaquants suivent les traces de cette légende, et tentent même de la dépasser.",
      "Le sélectionneur ne cache pas son émotion. Conduire Haïti à la Coupe du Monde 52 ans après la dernière fois est une immense fierté, dit-il, mais il s'agit maintenant de répondre présent et d'élever encore le niveau pour être à la hauteur de l'événement. Il s'appuie sur une force : quatre attaquants aux profils différents, qui lui ouvrent des options. Wilson Isidor, qui évolue en Premier League à Sunderland. Frantzdy Pierrot, puissant et redoutable point d'ancrage. Et Duckens Nazon, meilleur buteur en activité de la sélection.",
      "Nazon, justement, prend la parole avec une sincérité désarmante. Devenir le deuxième Haïtien à marquer en Coupe du Monde serait pour lui quelque chose d'extraordinaire, la cerise sur le gâteau d'une carrière en sélection. Mais il pose aussitôt l'essentiel : peu importe qui marque, ce qui compte, c'est qu'Haïti marque. Il aura, dans tous les cas, contribué à cette histoire.",
      "Son message dépasse le terrain. Il veut montrer au monde que cette équipe peut inquiéter les plus grandes nations, et surtout qu'elle est unie. Il cite la devise du drapeau, « L'union fait la force », et dit vouloir l'appliquer pleinement : avec un groupe soudé, on peut accomplir de grandes choses. Rendez-vous samedi soir pour la première réponse.",
    ],
    source: "Source : FIFA.",
    albums: [],
  },
  {
    slug: "sebastien-migne-conference-presse-ecosse",
    date: "2026-06-12",
    dateLabel: "12 juin 2026",
    eyebrow: "Conférence de presse · Avant-match",
    title: "« Laisser une trace » : Sébastien Migné lance les Grenadiers face à l'Écosse",
    dek: "En conférence de presse à la veille du match, le sélectionneur a posé l'ambition, salué l'exploit d'une qualification arrachée loin de ses bases, et appelé ses Grenadiers à marquer la Coupe du Monde de leur empreinte.",
    cover: "/images/journal/migne-conference-presse-ecosse.jpg",
    video: "https://www.youtube.com/watch?v=_rQD2Wy0u20",
    videoExternal: true, // contenu FIFA : intégration bloquée, ouvre sur YouTube
    videoCaption: "La conférence de presse d'avant-match de Sébastien Migné.",
    body: [
      "C'est un moment historique qui se profile. Cinquante-deux ans après l'unique participation d'Haïti à une phase finale, en 1974, les Grenadiers s'apprêtent à faire leur grand retour. À la veille d'affronter l'Écosse à Boston, le sélectionneur Sébastien Migné s'est présenté devant la presse avec de l'ambition, de la sérénité et une fierté immense pour le chemin parcouru.",
      "Interrogé sur l'héritage de 1974 et le but historique inscrit face à l'Italie, il a rappelé l'importance de connaître cette histoire tout en regardant devant. « C'était un grand moment pour Haïti en 74. Maintenant, c'était il y a 52 ans, c'est un peu loin. Aujourd'hui, c'est une autre histoire », a-t-il dit, fixant l'objectif d'un nouveau départ pour viser le tour suivant.",
      "Le technicien n'a pas caché l'ambition : décrocher la première victoire d'Haïti en phase finale, ce qui passera par l'audace offensive. Pour réaliser un exploit, il faudra marquer des buts, quel que soit l'adversaire.",
      "Migné a surtout tenu à souligner l'exploit déjà accompli. En deux ans et demi, la sélection n'a jamais joué à domicile : toutes les qualifications se sont disputées à l'extérieur, y compris celles où Haïti était censée recevoir, en raison de la situation sécuritaire du pays. « Tout ça pour souligner l'exploit qu'ont réalisé mes garçons. C'est pas banal. » Malgré des matchs de préparation parfois compliqués en fin de rencontre, il refuse tout pessimisme : ces tests ont permis de gérer des états de forme disparates en fin de saison européenne et d'éviter les blessures, en dépit du forfait de Leverton Pierre.",
      "Le premier match aura une saveur particulière pour Frantzdy Pierrot, troisième meilleur buteur de l'histoire de la sélection avec 34 buts, qui jouera presque à domicile. « Il est au sommet de son art, avec cette Coupe du Monde, et dans sa ville pour ce premier match », a souligné le coach, qui compte sur son expérience pour tirer le groupe vers le haut, en rappelant que l'animation offensive comme défensive reste l'affaire de tous.",
      "Face à une Écosse emmenée par des cadres comme Scott McTominay, Migné assume le statut d'outsider de ses joueurs, avec l'intention de bousculer la hiérarchie. « J'ai un effectif peut-être moins renommé, moins coté que celui de l'Écosse, mais l'idée, ce sera qu'à la fin de la compétition, on laisse une trace. »",
      "Avec le nouveau format qui repêche les huit meilleurs troisièmes, Haïti entend jouer sa chance à fond jusqu'au dernier match, et devenir par son enthousiasme et son football l'une des belles surprises de cette Coupe du Monde 2026. Le rendez-vous est pris. À l'assaut.",
    ],
    source: "Source : Fédération Haïtienne de Football.",
    albums: [],
  },
  {
    slug: "visite-premier-ministre-grenadiers-boston",
    date: "2026-06-12",
    dateLabel: "12 juin 2026",
    eyebrow: "Sélection · Boston",
    title: "« Vous êtes l'espoir » : le Premier ministre rend visite aux Grenadiers",
    dek: "À quelques heures du coup d'envoi face à l'Écosse, Alix Didier Fils-Aimé est venu transmettre aux joueurs le soutien de l'État et de toute une nation. Les Grenadiers lui ont répondu avec un maillot signé par tout l'effectif.",
    cover: "/images/journal/visite-premier-ministre-boston.jpg",
    body: [
      "À la veille du premier match, la visite avait valeur de symbole. Ce vendredi 12 juin, le Premier ministre haïtien Alix Didier Fils-Aimé s'est rendu à l'hôtel des Grenadiers à Boston pour saluer les joueurs et le staff, accompagné de la ministre des Affaires étrangères et des Cultes, Raina Forbin, et de la ministre des Haïtiens vivant à l'étranger, Kathia Verdier.",
      "Le chef du gouvernement est venu porter aux joueurs le soutien des autorités haïtiennes et celui de la diaspora, en replaçant cette qualification dans ce qu'elle a de plus grand : un moment qui rassemble les Haïtiens autour d'un même idéal, bien au-delà du terrain.",
      "Face au groupe, son message était direct. « Vous êtes bien plus qu'une équipe de football. Vous êtes le visage de la jeunesse haïtienne qui refuse de renoncer, qui ose rêver et qui prouve que, malgré les difficultés, Haïti est capable de se hisser parmi les meilleures nations du monde », a-t-il déclaré, avant d'ajouter : « Vous êtes l'espoir, vous êtes l'opportunité. Vous êtes un exemple, on vous regarde et on compte sur vous. »",
      "Les deux ministres ont pris la parole à leur tour, Raina Forbin pour souligner la portée collective de cette qualification et le travail diplomatique qui a accompagné la route vers le Mondial, Kathia Verdier pour rappeler ce que cette performance représente pour les générations actuelles et futures, en Haïti comme dans la diaspora.",
      "Les joueurs ont répondu par un geste qui dit tout : un maillot officiel signé par l'ensemble de l'effectif, remis au Premier ministre. Puis chacun est retourné à sa mission. La leur commence samedi soir, au Gillette Stadium, et c'est sur le terrain que les Grenadiers donneront leur vraie réponse.",
    ],
    source: "Source : Chokarella.",
    sourceUrl:
      "https://www.chokarella.com/2026/06/12/vous-etes-lespoir-le-message-du-premier-ministre-haitien-aux-grenadiers/",
    albums: [],
  },
  {
    slug: "grenadiers-arrivee-boston-quincy",
    date: "2026-06-12",
    dateLabel: "12 juin 2026",
    eyebrow: "Diaspora · Boston",
    title: "« Sak pase? N ap boule! » : Boston réserve un accueil de héros aux Grenadiers",
    dek: "À la veille du match contre l'Écosse, la sélection a posé ses valises à Quincy sous les acclamations d'une diaspora en fusion. Récit d'une arrivée qui ressemblait déjà à une victoire.",
    cover: "/images/journal/arrivee-boston-quincy.jpg",
    video: "https://www.youtube.com/watch?v=lyKk1YMiKNQ",
    videoCaption: "Le reportage de CBS News Boston sur l'arrivée des Grenadiers à Quincy.",
    body: [
      "Les Grenadiers sont arrivés en terre promise. Au lendemain de leur départ du camp de base du New Jersey, les joueurs de la sélection ont posé leurs valises à Quincy, dans la banlieue de Boston, accueillis devant leur hôtel par une foule en délire, comme l'a rapporté CBS News Boston. Drapeaux bicolores, chants, klaxons : l'arrivée ressemblait déjà à un jour de match.",
      "Il faut dire que le rendez-vous se joue à domicile, ou presque. La grande région de Boston abrite la troisième plus grande communauté haïtienne des États-Unis, et pour ces milliers de familles, voir le pays disputer une Coupe du Monde dans leur propre arrière-cour relève du rêve éveillé. Un supporter a résumé le sentiment général au micro de la chaîne : quand les Grenadiers jouent, c'est toute la communauté qui joue avec eux.",
      "Le long des barrières, l'ambiance était restée fidèle au pays : les « Sak pase? N ap boule! » fusaient de partout, donnant le ton d'un après-midi de fête. Malgré l'enjeu qui les attend, les joueurs ont pris le temps de saluer la foule, de signer des autographes et de poser pour des selfies, rendant à cette communauté l'amour qu'elle leur portait.",
      "Parmi les supporters, un gamin de 12 ans de Hyde Park, Noah Nicholas, footballeur lui-même, a patiemment attendu avec son drapeau et une chaussure de foot à la main. Il est reparti avec la chaussure couverte de signatures et des souvenirs pour la vie, en pensant, dit-il, à son père, à ses grands-parents et à cette communauté haïtienne qui se rassemble dans les grands moments de fierté.",
      "Place maintenant au terrain. Les Grenadiers ouvrent leur Coupe du Monde samedi face à l'Écosse au Gillette Stadium de Foxboro, premier match de la série bostonienne du Mondial. Les supporters écossais ont eux aussi fait le déplacement en nombre, mais les hommes de Sébastien Migné savent désormais qu'ils avanceront portés par toute une région.",
      "Quoi qu'il arrive samedi, quelque chose s'est déjà produit à Quincy : plusieurs générations de la diaspora, des grands-parents de 1974 aux enfants nés ici, réunies sous un seul drapeau, entre héritage et espoir.",
    ],
    source: "Source : CBS News Boston.",
    albums: [],
  },
  {
    slug: "sebastien-migne-entretien-camp-de-base",
    date: "2026-06-11",
    dateLabel: "11 juin 2026",
    eyebrow: "Entretien · Sélection",
    title: "« À l'assaut » : les derniers mots de Sébastien Migné avant Boston",
    dek: "Avant de quitter le camp de base du New Jersey pour Boston, le sélectionneur fait le point : le forfait de Leverton Pierre, la gestion du stress, les derniers réglages et un appel au douzième homme.",
    cover: "/images/journal/migne-entretien-camp-de-base.jpg",
    video: "https://grenadiers2026.com/media/videos/2026-06-11-sebastien-migne-itw-fhf.mp4",
    videoCaption: "L'entretien du sélectionneur Sébastien Migné au camp de base, publié par la Fédération Haïtienne de Football.",
    body: [
      "Avant de boucler les valises pour Boston, le sélectionneur Sébastien Migné s'est confié dans un entretien publié par la Fédération. Installés depuis lundi 8 juin à leur camp de base du New Jersey, les Grenadiers y ont trouvé, selon lui, des conditions parfaites : un accueil chaleureux et des installations très professionnelles. « On n'aura pas d'excuse à ce niveau-là », résume-t-il.",
      "Le coach est aussi revenu sur le coup dur de la semaine : le forfait de Leverton Pierre, remplacé par Garven Metusala. Un moment difficile pour le groupe, et pour le sélectionneur qui a dû annoncer la nouvelle au joueur. Fidèle à l'esprit de cette équipe, il veut transformer la problématique en force et puiser dans la pensée pour Leverton le supplément d'âme nécessaire pour la compétition.",
      "Sur l'état d'esprit du groupe, Sébastien Migné ne cache pas l'enjeu émotionnel. La Coupe du Monde, c'est le Graal dont chaque joueur rêve depuis l'enfance, et il s'agit de vivre pleinement l'événement sans laisser le stress prendre le dessus. Le staff accompagne les joueurs sur ce terrain-là aussi, et le sélectionneur se dit pleinement satisfait de la réaction de son groupe : les garçons sont motivés et ont hâte que ça commence.",
      "Côté terrain, la dernière séance au New Jersey a été consacrée aux coups de pied arrêtés, avec encore quelques réglages prévus à l'entraînement de Boston. L'essentiel du travail est fait, insiste le coach : il reste à entretenir la dynamique, prendre les précautions pour éviter toute blessure et arriver au top dans deux jours.",
      "Le programme est désormais cadencé : départ pour Boston, installation à l'hôtel, entraînement invisible le soir, récupération en salle de soins et briefings sur l'Écosse. Puis place au match.",
      "Le sélectionneur a gardé ses derniers mots pour le public. Touché par la ferveur des supporters en Floride, restés positifs et derrière l'équipe malgré la défaite du dernier match amical, il espère retrouver la même énergie samedi : que le douzième homme soit du côté d'Haïti à Boston. L'entretien se termine comme il se doit. Grenadiers ? À l'assaut.",
    ],
    source: "Source : Fédération Haïtienne de Football.",
    albums: [],
  },
  {
    slug: "leverton-pierre-forfait-metusala-appele",
    date: "2026-06-11",
    dateLabel: "11 juin 2026",
    eyebrow: "Sélection · Mondial 2026",
    title: "Coup dur pour les Grenadiers : Leverton Pierre forfait, Garven Metusala appelé",
    dek: "À deux jours du coup d'envoi, le milieu de terrain Leverton Pierre doit renoncer au Mondial sur blessure. Garven Metusala, présent durant les éliminatoires, rejoint le groupe à Boston.",
    cover: "/images/journal/leverton-pierre-forfait.jpg",
    body: [
      "Mauvaise nouvelle au camp de base des Grenadiers. Le staff médical de la sélection a annoncé que Leverton Pierre ne pourra pas disputer la Coupe du Monde. Le milieu de terrain souffre d'une lésion des adducteurs droits de niveau 2, survenue lors de l'échauffement du match amical, une blessure qui le tiendra éloigné des terrains pendant plusieurs semaines.",
      "Pour le remplacer, le staff technique a fait appel à Garven Metusala. Le défenseur, qui peut aussi évoluer au milieu, connaît bien le groupe : il faisait partie de la sélection pendant les éliminatoires, y compris lors de la fenêtre décisive de novembre. Il rejoindra ses coéquipiers directement à Boston.",
      "Formé au Québec, Metusala évolue aujourd'hui aux Colorado Springs Switchbacks, en USL Championship, après un passage marquant au Forge FC où il a remporté deux titres de champion de la Premier League canadienne. Solide dans les duels et habitué aux rendez-vous internationaux avec une quinzaine de sélections, il apporte au groupe une option supplémentaire dans l'axe.",
      "Dans un message publié sur sa page, Leverton Pierre a réagi avec une dignité qui dit tout du joueur et de l'homme. Le cœur « partagé entre la tristesse et la gratitude », il raconte ce rêve porté depuis tant d'années, le travail sans relâche, les sacrifices, et cette blessure qui le prive du terrain au moment où tout commençait.",
      "Mais il ne quitte pas le navire. Il restera auprès de ses frères jusqu'à la fin de l'aventure, promet-il, et les soutiendra de toutes ses forces, en premier supporter de cette équipe. Il remercie ses coéquipiers, le staff, tous ceux qui lui ont envoyé prières et mots d'encouragement depuis l'annonce, et sa famille, son pilier dans les bons comme dans les mauvais moments.",
      "« Cette blessure ne définit pas mon histoire. Ce n'est qu'un chapitre de plus dans mon parcours. Je reviendrai plus fort. »",
      "Que Dieu bénisse Haïti, conclut-il. Tout un peuple lui répond d'une seule voix : prompt rétablissement, Leverton. Le rêve continue, et il en fait pleinement partie.",
    ],
    source: "Source : communiqué officiel de la sélection.",
    albums: [],
  },
  {
    slug: "frantzdy-pierrot-entretien-fifa",
    date: "2026-06-10",
    dateLabel: "10 juin 2026",
    eyebrow: "Entretien · FIFA",
    title: "Des rues d'Haïti au Mondial : Frantzdy Pierrot se confie à la FIFA",
    dek: "Dans un entretien accordé à la FIFA, l'attaquant des Grenadiers revient sur son enfance, le sacrifice de son père, son parcours jusqu'en Ligue des Champions et le rêve qu'il porte pour tout un peuple.",
    cover: "/images/journal/pierrot-entretien-fifa.jpg",
    body: [
      "À quelques jours du retour d'Haïti en Coupe du Monde, la FIFA a consacré un long entretien à Frantzdy Pierrot. L'attaquant des Grenadiers y retrace un parcours qui commence très loin des grands stades : dans les rues d'Haïti, où il jouait pieds nus avec des ballons improvisés, fabriqués avec ce qui tombait sous la main. Pour lui et ses copains, raconte-t-il, le football était bien plus qu'un jeu : une source de joie, de liberté et de lien entre les enfants du quartier.",
      "Le tournant de sa vie arrive à 11 ans, quand sa famille rejoint le Massachusetts. Son père, installé là-bas depuis plusieurs années, cumulait les emplois pour économiser de quoi faire venir les siens. Pierrot décrit ce départ comme le plus beau jour de sa vie, celui où tout est devenu possible.",
      "La suite, c'est un pari assumé : quitter le confort du parcours universitaire américain pour tenter sa chance en Europe. Le Maccabi Haïfa devient le tremplin décisif, celui qui lui donne confiance et le propulse jusqu'en Ligue des Champions, avant son passage à l'AEK Athènes puis au Çaykur Rizespor. Mais Pierrot n'a jamais coupé le fil avec le pays : sa fondation accompagne aujourd'hui les enfants d'Haïti, avec l'ambition de leur offrir un cadre, des opportunités et une éducation, sur le terrain et en dehors.",
      "Il revient aussi sur son but face au Costa Rica, celui qui a pratiquement scellé la qualification historique des Grenadiers. Un moment presque impossible à décrire, dit-il, où ses premières pensées sont allées à sa famille, à ses coéquipiers et au peuple haïtien, comme si des années de sacrifices trouvaient enfin leur sens. Il se souvient aussi du jour de la qualification, quand des milliers de personnes ont envahi les rues pour chanter et danser, oubliant le temps d'une soirée les difficultés du quotidien.",
      "Face à l'Écosse, au Brésil et au Maroc, Pierrot ne se cache pas : le groupe est relevé, mais l'équipe croit en elle et compte montrer au monde le cœur, l'unité et le courage du peuple haïtien. Son objectif tient en une phrase, qui résume tout l'état d'esprit de cette sélection : « Nous voulons rendre fier le peuple haïtien ».",
      "L'entretien complet est à lire sur fifa.com.",
    ],
    source: "Source : entretien publié par la FIFA (fifa.com).",
    albums: [],
  },
  {
    slug: "maillot-grenadiers-fifa-modifications",
    date: "2026-06-10",
    dateLabel: "10 juin 2026",
    eyebrow: "Équipement · Mondial 2026",
    title: "La FIFA exige des modifications au maillot des Grenadiers, Saeta s'explique",
    dek: "À quelques jours d'Ayiti vs Écosse, l'équipementier Saeta confirme avoir ajusté le maillot officiel à la demande de la FIFA, tout en défendant l'esprit de son design original.",
    cover: "/images/journal/maillot-fifa-modifications.jpg",
    body: [
      "À quelques jours de l'entrée en lice des Grenadiers face à l'Écosse, l'équipementier Saeta a annoncé que des modifications ont été apportées au maillot officiel d'Haïti à la demande de la FIFA. La confirmation est venue d'un communiqué officiel publié par la marque, après plusieurs semaines de spéculations autour de la tenue que porteront les Grenadiers pour leur retour historique en Coupe du Monde.",
      "Dans ce communiqué, Saeta rappelle avoir conçu le maillot en étroite collaboration avec la Fédération Haïtienne de Football, avec une ambition claire : célébrer la fierté, la résilience et l'esprit du peuple haïtien. Le design original rendait hommage aux femmes et aux hommes qui construisent chaque jour l'avenir d'Haïti, autour des symboles du drapeau, de la devise « L'union fait la force » et des héros de l'indépendance.",
      "Selon la marque, plusieurs concepts ont été soumis au processus d'approbation standard de la FIFA. C'est lors de cette évaluation que l'instance a estimé que certains éléments visuels pouvaient être interprétés différemment au regard de sa réglementation sur les équipements, et a demandé des ajustements avant le début de la compétition.",
      "Saeta affirme avoir une lecture différente de ses propres intentions, le design n'ayant, selon elle, aucune portée politique. La marque indique néanmoins avoir respecté la décision et appliqué l'ensemble des modifications exigées.",
      "Les changements sont déjà en vigueur : les joueurs de la sélection ont réalisé leurs photos officielles avec la version modifiée du maillot, et c'est cette tenue que les Grenadiers porteront samedi face à l'Écosse au Gillette Stadium.",
      "Malgré l'épisode, Saeta se dit fière d'avoir contribué, aux côtés de la FHF, à ce moment historique du football haïtien, et souhaite plein succès aux Grenadiers pour cette Coupe du Monde. Le maillot, lui, reste ce qu'il était dès le premier jour : un symbole que tout un peuple porte déjà sur le cœur, des tribunes de Foxborough aux quatre coins de la diaspora.",
    ],
    source: "Sources : communiqué officiel de Saeta · France 24 · Juno7.",
    albums: [
      {
        photos: [
          { src: "/images/journal/saeta-communique-officiel.jpg", alt: "Le communiqué officiel publié par Saeta." },
        ],
      },
    ],
  },
  {
    slug: "grenadiers-stockton-university-camp-de-base",
    date: "2026-06-09",
    dateLabel: "9 juin 2026",
    eyebrow: "Camp de base · New Jersey",
    title: "Les Grenadiers posent leurs valises à Stockton University avant le Mondial",
    dek: "À quelques jours du coup d'envoi, la sélection haïtienne s'installe à Stockton University, son camp de base officiel pour le Mondial, sous les yeux d'une diaspora en ébullition.",
    cover: "/images/journal/community-event.jpg",
    video: "https://www.youtube.com/watch?v=899SgV7MPKc",
    videoCaption: "Reportage de CBS News Philadelphia au camp de base des Grenadiers à Stockton University.",
    body: [
      "À quelques jours du coup d'envoi, les Grenadiers ont officiellement pris leurs quartiers à Stockton University, sur le campus de Galloway dans le sud du New Jersey. C'est ici, dans des installations de premier plan, que la sélection haïtienne prépare son retour historique en Coupe du Monde, comme l'a rapporté CBS News Philadelphia.",
      "L'émotion était palpable autour du terrain. Pour l'immense majorité des supporters haïtiano-américains de la région et des fans venus de loin, c'est la première fois de leur vie qu'ils verront Haïti évoluer à ce niveau. Plus de 50 ans après l'épopée de 1974, la fièvre du Mondial a gagné le New Jersey.",
      "Si les séances d'entraînement au G. Larry James Stadium et au Stockton Sports Center se déroulent à huis clos pour des raisons de sécurité, l'équipe a ouvert ses portes le temps d'un match intra-équipe organisé pour des groupes communautaires et des organisations de jeunesse locales. Au bord du terrain, des enfants observaient les Grenadiers avec des étoiles dans les yeux, certains jeunes footballeurs confiant déjà vouloir reproduire les gestes des professionnels dans leurs propres matchs.",
      "Le défi qui attend Haïti est de taille : un groupe relevé avec l'Écosse, le Brésil et le Maroc. Les supporters locaux ont déjà coché la rencontre face au Brésil, programmée tout près, à Philadelphie. Mais l'optimisme ne faiblit pas.",
      "« Nous sommes très enthousiastes, et nous pensons que nous irons au deuxième tour », a confié un supporter au journaliste Ross DiMattei de CBS News Philadelphia.",
      "Pour Stockton University, accueillir une sélection nationale n'a rien d'inédit. Le campus avait déjà servi de camp de base à l'Arabie saoudite avant le Mondial 1994, et reçu le célèbre club brésilien Flamengo l'an dernier. Un choix qui, selon les responsables de l'université, confirme la qualité de ses infrastructures sportives.",
      "Les Grenadiers utiliseront le campus comme camp de base pendant au moins deux semaines. Et si la foi inébranlable de leurs supporters est un indice, leur séjour dans la région pourrait bien se prolonger au-delà.",
    ],
    source: "Source : CBS News Philadelphia.",
    albums: [],
  },
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

      "Le 13 juin au Gillette Stadium, Haïti entrera en compétition face à l'Écosse. Ce sera, pour Adé, plus qu'un match. « Quand l'hymne va retentir, ce sera tout le pays. Pas une seule personne en moins. Rien que de chanter l'hymne sur la pelouse, j'ai déjà des frissons. Imaginez en Coupe du Monde. »",

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

// Helper · get entries sorted by date desc (newest first). Tri purement
// chronologique : l'entrée la plus récente passe toujours en tête (liste du
// Journal, « à la une » de l'accueil, articles liés).
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
