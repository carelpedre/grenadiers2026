// ╔═══════════════════════════════════════════════════════════════════════╗
// ║  TRANSLATION DICTIONARY                                                ║
// ║  Every visible string on the site, in English / French / Haitian Creole║
// ║                                                                        ║
// ║  HOW TO EDIT A CREOLE TRANSLATION:                                     ║
// ║    1. Find the key (the `en` line has the English text)                ║
// ║    2. Edit the `ht` line                                               ║
// ║    3. Save the file → translation updates everywhere on the site       ║
// ║                                                                        ║
// ║  Creole notes: First draft. Edit liberally — your Kreyòl is better.    ║
// ╚═══════════════════════════════════════════════════════════════════════╝

const dict = {
  // ─── NAVIGATION ──────────────────────────────────────────────────────
  "nav.home": {
    en: "Home",
    fr: "Accueil",
    ht: "Akèy",
  },
  "nav.squad": {
    en: "Squad",
    fr: "La sélection",
    ht: "Seleksyon",
  },
  "nav.matches": {
    en: "Matches",
    fr: "Matchs",
    ht: "Match yo",
  },
  "nav.live": {
    en: "Live",
    fr: "En direct",
    ht: "An dirèk",
  },
  "nav.watchParties": {
    en: "Watch Parties",
    fr: "Soirées de visionnage",
    ht: "Watch Party",
  },
  "nav.journal": {
    en: "Journal",
    fr: "Le Journal",
    ht: "Jounal",
  },
  "nav.stories": {
    en: "Stories",
    fr: "Histoires",
    ht: "Istwa",
  },
  "nav.anthem": {
    en: "Anthem",
    fr: "Hymne",
    ht: "Im",
  },
  "nav.coverage": {
    en: "The Coverage",
    fr: "La Couverture",
    ht: "Kouvèti a",
  },
  "nav.tribute": {
    en: "Creative Tribute",
    fr: "Hommage créatif",
    ht: "Omaj kreyatif",
  },
  "nav.federation": {
    en: "Federation",
    fr: "Fédération",
    ht: "Federasyon",
  },
  "nav.history": {
    en: "1974",
    fr: "1974",
    ht: "1974",
  },
  "nav.games": {
    en: "Play",
    fr: "Jouez",
    ht: "Jwe",
  },
  "nav.gallery": {
    en: "Gallery",
    fr: "Galerie",
    ht: "Galri",
  },
  "nav.fanwall": {
    en: "Fan Wall",
    fr: "Mur des supporters",
    ht: "Mi sipòtè yo",
  },
  "nav.sharePhoto": {
    en: "Share your photo",
    fr: "Partage ta photo",
    ht: "Pataje foto ou",
  },
  "nav.photos": {
    en: "Media",
    fr: "Média",
    ht: "Medya",
  },

  // ─── GALLERY PAGE ────────────────────────────────────────────────────
  "gallery.eyebrow": {
    en: "Photo gallery",
    fr: "Galerie photo",
    ht: "Galri foto",
  },
  "gallery.title": {
    en: "The faces of the moment.",
    fr: "Les visages du moment.",
    ht: "Vizaj moman an.",
  },
  "gallery.subtitle": {
    en: "Players, training, behind the scenes — official photos from the Fédération Haïtienne de Football, used with permission. Click any photo to view it full size.",
    fr: "Les joueurs, l'entraînement, les coulisses — photos officielles de la Fédération Haïtienne de Football, utilisées avec permission. Cliquez sur une photo pour l'agrandir.",
    ht: "Jwè yo, antrènman, dèyè syèn lan — foto ofisyèl Federasyon Foutbòl Ayisyen, itilize avèk pèmisyon. Klike sou yon foto pou wè li gwo.",
  },

  // ─── LANGUAGE PICKER ─────────────────────────────────────────────────
  "picker.welcome": {
    en: "Welcome.",
    fr: "Bienvenue.",
    ht: "Byenveni.",
  },
  "picker.subtitle": {
    en: "Choose your language to follow Haiti at the FIFA World Cup 2026.",
    fr: "Choisissez votre langue pour suivre Haïti à la Coupe du Monde FIFA 2026.",
    ht: "Chwazi lang ou pou suiv Ayiti nan FIFA World Cup 2026 la.",
  },
  "picker.enter": {
    en: "Enter",
    fr: "Entrer",
    ht: "Antre",
  },
  "picker.note": {
    en: "You can change your language anytime from the footer.",
    fr: "Vous pouvez changer de langue à tout moment depuis le pied de page.",
    ht: "Ou ka chanje lang ou nenpòt lè nan pye paj la.",
  },
  "footer.changeLang": {
    en: "Change language",
    fr: "Changer de langue",
    ht: "Chanje lang",
  },

  // ─── HOME PAGE ───────────────────────────────────────────────────────
  "home.eyebrow": {
    en: "Group C · FIFA World Cup 2026",
    fr: "Groupe C · Coupe du Monde FIFA 2026",
    ht: "Gwoup C · FIFA World Cup 2026",
  },
  "home.hero.badge": {
    en: "52 years in the making",
    fr: "52 ans d'attente",
    ht: "52 ane n ap tann",
  },
  "home.hero.title1": {
    en: "Les Grenadiers",
    fr: "Les Grenadiers",
    ht: "Grenadye yo",
  },
  "home.hero.title2": {
    en: "are back.",
    fr: "sont de retour.",
    ht: "tounen.",
  },
  "home.hero.fixtures": {
    en: "Fixtures",
    fr: "Calendrier",
    ht: "Pwogram",
  },
  "home.hero.watchParty": {
    en: "Find a watch party",
    fr: "Trouvez une soirée",
    ht: "Jwenn yon watch party",
  },
  "home.nextMatch": {
    en: "Next match",
    fr: "Prochain match",
    ht: "Pwochen match",
  },
  "home.title": {
    en: "Haiti is back.",
    fr: "Haïti est de retour.",
    ht: "Ayiti tounen.",
  },
  "home.countdown.title": {
    en: "Countdown to Scotland",
    fr: "Compte à rebours pour l'Écosse",
    ht: "Dekont pou Eskòs",
  },
  "home.countdown.subtitle": {
    en: "June 13, 2026 · Gillette Stadium, Foxborough",
    fr: "13 juin 2026 · Stade Gillette, Foxborough",
    ht: "13 jen 2026 · Estad Gillette, Foxborough",
  },
  "home.countdown.days": {
    en: "Days",
    fr: "Jours",
    ht: "Jou",
  },
  "home.countdown.hours": {
    en: "Hours",
    fr: "Heures",
    ht: "Èdtan",
  },
  "home.countdown.minutes": {
    en: "Minutes",
    fr: "Minutes",
    ht: "Minit",
  },
  "home.countdown.seconds": {
    en: "Seconds",
    fr: "Secondes",
    ht: "Segond",
  },
  "home.groupC.title": {
    en: "The three matches",
    fr: "Les trois matchs",
    ht: "Twa match yo",
  },
  "home.groupC.subtitle": {
    en: "Group C. Three opponents. Three American cities.",
    fr: "Groupe C. Trois adversaires. Trois villes américaines.",
    ht: "Gwoup C. Twa advèsè. Twa vil ameriken.",
  },
  "home.squad.title": {
    en: "The squad",
    fr: "L'effectif",
    ht: "Ekip la",
  },
  "home.squad.subtitle": {
    en: "26 players. 25 abroad. 1 from home.",
    fr: "26 joueurs. 25 à l'étranger. 1 au pays.",
    ht: "26 jwè. 25 etranje. 1 anndan peyi a.",
  },
  "home.squad.viewAll": {
    en: "See the full squad →",
    fr: "Voir l'effectif complet →",
    ht: "Wè tout ekip la →",
  },
  "home.stories.title": {
    en: "Latest stories",
    fr: "Dernières histoires",
    ht: "Dènye istwa yo",
  },
  "home.stories.viewAll": {
    en: "All stories →",
    fr: "Toutes les histoires →",
    ht: "Tout istwa yo →",
  },
  "home.1974.eyebrow": {
    en: "The history",
    fr: "L'histoire",
    ht: "Istwa a",
  },
  "home.1974.title": {
    en: "It's been 52 years.",
    fr: "Cela fait 52 ans.",
    ht: "Sa fè 52 ane.",
  },
  "home.1974.body": {
    en: "In 1974, in Munich, Haiti scored against Italy. Manno Sanon ended Dino Zoff's 1,142-minute shutout streak. Then the silence. Until now.",
    fr: "En 1974, à Munich, Haïti a marqué contre l'Italie. Manno Sanon a mis fin à 1142 minutes d'invincibilité de Dino Zoff. Puis le silence. Jusqu'à maintenant.",
    ht: "Nan 1974, nan Munich, Ayiti te make kont Itali. Manno Sanon te fini 1,142 minit Dino Zoff san pran gòl. Apre sa, silans. Jiska kounye a.",
  },
  "home.1974.cta": {
    en: "Read the full story →",
    fr: "Lire l'histoire complète →",
    ht: "Li tout istwa a →",
  },
  "home.watchParty.title": {
    en: "Find a watch party",
    fr: "Trouvez une soirée",
    ht: "Jwenn yon watch party",
  },
  "home.watchParty.subtitle": {
    en: "From Brooklyn to Cap-Haïtien, Montréal to Miami. 45+ cities, 8 countries, all 10 Haitian departments.",
    fr: "De Brooklyn au Cap-Haïtien, de Montréal à Miami. 45+ villes, 8 pays, les 10 départements d'Haïti.",
    ht: "Soti Brooklyn jiska Cap-Haïtien, Monreyal pou Miami. 45+ vil, 8 peyi, tout 10 depatman Ayiti yo.",
  },
  "home.watchParty.cta": {
    en: "Find one near you →",
    fr: "En trouver une près de vous →",
    ht: "Jwenn youn toupre w →",
  },

  // ─── COMMON / SHARED ──────────────────────────────────────────────────
  "common.featured": {
    en: "Featured",
    fr: "À la une",
    ht: "Vedèt",
  },
  "common.viewProfile": {
    en: "View profile →",
    fr: "Voir le profil →",
    ht: "Wè pwofil la →",
  },
  "common.allMatches": {
    en: "All 3 matches",
    fr: "Les 3 matchs",
    ht: "Tout 3 match yo",
  },
  "common.readMore": {
    en: "Read more",
    fr: "Lire la suite",
    ht: "Li plis",
  },
  "common.backTo": {
    en: "← Back to",
    fr: "← Retour à",
    ht: "← Tounen nan",
  },

  // ─── PLAYER LABELS ────────────────────────────────────────────────────
  "player.captain": {
    en: "Captain",
    fr: "Capitaine",
    ht: "Kapitèn",
  },
  "player.star": {
    en: "Star",
    fr: "Star",
    ht: "Vedèt",
  },
  "player.age": {
    en: "Age",
    fr: "Âge",
    ht: "Laj",
  },
  "player.caps": {
    en: "Caps",
    fr: "Sélections",
    ht: "Seleksyon",
  },
  "player.goals": {
    en: "Goals",
    fr: "Buts",
    ht: "Gòl",
  },
  "player.club": {
    en: "Club",
    fr: "Club",
    ht: "Klèb",
  },
  "player.league": {
    en: "League",
    fr: "Championnat",
    ht: "Chanpyona",
  },
  "player.born": {
    en: "Born",
    fr: "Né le",
    ht: "Fèt",
  },
  "player.birthplace": {
    en: "Birthplace",
    fr: "Lieu de naissance",
    ht: "Kote li te fèt",
  },
  "player.debut": {
    en: "Haiti debut",
    fr: "Début avec Haïti",
    ht: "Premye match ak Ayiti",
  },
  "player.position.gk": {
    en: "Goalkeeper",
    fr: "Gardien de but",
    ht: "Gadyen",
  },
  "player.position.df": {
    en: "Defender",
    fr: "Défenseur",
    ht: "Defansè",
  },
  "player.position.mf": {
    en: "Midfielder",
    fr: "Milieu de terrain",
    ht: "Milye teren",
  },
  "player.position.fw": {
    en: "Forward",
    fr: "Attaquant",
    ht: "Atakan",
  },
  "player.positions.goalkeepers": {
    en: "Goalkeepers",
    fr: "Gardiens de but",
    ht: "gadyen yo",
  },
  "player.positions.defenders": {
    en: "Defenders",
    fr: "Défenseurs",
    ht: "Defansè yo",
  },
  "player.positions.midfielders": {
    en: "Midfielders",
    fr: "Milieux de terrain",
    ht: "Milye teren yo",
  },
  "player.positions.forwards": {
    en: "Forwards",
    fr: "Attaquants",
    ht: "Atakan yo",
  },

  // ─── SQUAD PAGE ───────────────────────────────────────────────────────
  // squad.eyebrow / squad.title / squad.subtitle live in the SQUAD PAGE
  // (additions) block below (single canonical definition each).
  "squad.staff": {
    en: "Technical Staff",
    fr: "Staff technique",
    ht: "Estaf teknik",
  },
  "squad.stat.players": {
    en: "Players",
    fr: "Joueurs",
    ht: "Jwè",
  },
  "squad.stat.avgAge": {
    en: "Average age",
    fr: "Âge moyen",
    ht: "Laj mwayèn",
  },
  "squad.stat.diaspora": {
    en: "Diaspora",
    fr: "Diaspora",
    ht: "Dyaspora",
  },
  "squad.stat.domestic": {
    en: "Domestic",
    fr: "Au pays",
    ht: "Anndan peyi",
  },
  "squad.role.headCoach": {
    en: "Head Coach",
    fr: "Sélectionneur",
    ht: "Antrenè",
  },
  "squad.role.captain": {
    en: "Captain",
    fr: "Capitaine",
    ht: "Kapitèn",
  },
  "squad.trainingCamp.title": {
    en: "Training camp",
    fr: "Stage de préparation",
    ht: "Antrenman",
  },

  // ─── MATCHES PAGE ─────────────────────────────────────────────────────
  "matches.eyebrow": {
    en: "Group C",
    fr: "Groupe C",
    ht: "Gwoup C",
  },
  "matches.subtitle": {
    en: "Boston, Philadelphia, Atlanta · plus the warm-up games in South Florida before the tournament opens.",
    fr: "Boston, Philadelphie, Atlanta · et les matchs de préparation en Floride avant l'ouverture du tournoi.",
    ht: "Boston, Filadèlfi, Atlanta · plis match preparasyon yo nan Sid Florida anvan mondyal la kòmanse.",
  },
  "matches.worldCup.title": {
    en: "World Cup · Group C",
    fr: "Coupe du Monde · Groupe C",
    ht: "Coupe du Monde · Gwoup C",
  },
  "matches.worldCup.subtitle": {
    en: "The three matches that define the campaign.",
    fr: "Les trois matchs qui définissent la campagne.",
    ht: "Twa match ki defini kanpay la.",
  },
  "matches.match": {
    en: "Match",
    fr: "Match",
    ht: "Match",
  },
  "matches.capacity": {
    en: "Capacity",
    fr: "Capacité",
    ht: "Kapasite",
  },
  "matches.surface": {
    en: "Surface",
    fr: "Surface",
    ht: "Sifas",
  },
  "matches.broadcast": {
    en: "Where to watch",
    fr: "Où regarder",
    ht: "Ki kote pou gade",
  },
  "matches.weather": {
    en: "Weather",
    fr: "Météo",
    ht: "Tanperati",
  },
  "matches.upcoming.title": {
    en: "Preparation games",
    fr: "Matchs de préparation",
    ht: "Match preparasyon",
  },
  "matches.upcoming.subtitle": {
    en: "Final tune-ups in South Florida, hosted by Inter Miami CF.",
    fr: "Dernières mises au point en Floride du Sud, organisées par l'Inter Miami CF.",
    ht: "Dènye preparasyon yo nan Sid Florida, lakay Inter Miami CF.",
  },
  "matches.past.title": {
    en: "Recent results",
    fr: "Résultats récents",
    ht: "Dènye rezilta yo",
  },
  "matches.win": {
    en: "Win",
    fr: "Victoire",
    ht: "Genyen",
  },
  "matches.draw": {
    en: "Draw",
    fr: "Nul",
    ht: "Match nil",
  },
  "matches.loss": {
    en: "Loss",
    fr: "Défaite",
    ht: "Pèdi",
  },
  "matches.statusUpcoming": {
    en: "Upcoming",
    fr: "À venir",
    ht: "Ap vini",
  },
  // Live match statuses (rendered from the fixture status code)
  "matches.statusFinished": { en: "Finished", fr: "Terminé", ht: "Fini" },
  "matches.statusLive": { en: "Live", fr: "En direct", ht: "An dirèk" },
  "matches.statusHalftime": { en: "Half-time", fr: "Mi-temps", ht: "Mitan match" },
  "matches.statusExtraTime": { en: "Extra time", fr: "Prolongation", ht: "Pwolongasyon" },
  "matches.statusBreak": { en: "Break", fr: "Pause", ht: "Poz" },
  "matches.statusPenalties": { en: "Penalty shootout", fr: "Tirs au but", ht: "Tir o bi" },
  "matches.statusSuspended": { en: "Suspended", fr: "Suspendu", ht: "Sispann" },
  "matches.statusInterrupted": { en: "Interrupted", fr: "Interrompu", ht: "Entèwonp" },
  "matches.statusPostponed": { en: "Postponed", fr: "Reporté", ht: "Ranvwaye" },
  "matches.statusCancelled": { en: "Canceled", fr: "Annulé", ht: "Anile" },
  "matches.statusAbandoned": { en: "Abandoned", fr: "Abandonné", ht: "Abandone" },
  "matches.statusAwarded": { en: "Awarded", fr: "Sur tapis vert", ht: "Sou desizyon" },
  // Calendar reminder button
  "matches.calReminder": { en: "📅 Add to calendar", fr: "📅 Rappel agenda", ht: "📅 Mete nan ajanda" },
  "matches.calAdded": { en: "✓ Added to calendar", fr: "✓ Ajouté à l'agenda", ht: "✓ Antre nan ajanda" },
  // Stadium weather
  "matches.weatherInCity": { en: "in {city}", fr: "à {city}", ht: "nan {city}" },
  "matches.weatherLoading": { en: "Loading weather…", fr: "Chargement de la météo…", ht: "Meteyo a ap chaje…" },
  // Group C standings table
  "matches.standingsAuto": {
    en: "Updated automatically during the World Cup.",
    fr: "Mis à jour automatiquement pendant le Mondial.",
    ht: "L ap mete ajou otomatikman pandan Mondyal la.",
  },
  "matches.standingsPrematch": {
    en: "Before the match · updated automatically",
    fr: "Avant le match · actualisé automatiquement",
    ht: "Anvan match la · l ap mete ajou otomatikman",
  },
  "matches.standingsEmptyBody": {
    en: "The Group C standings will appear here. They update automatically during the tournament.",
    fr: "Le classement du Groupe C s'affichera ici. Il s'actualise automatiquement pendant le tournoi.",
    ht: "Klasman Gwoup C la ap parèt isit la. L ap mete ajou otomatikman pandan tounwa a.",
  },
  "matches.standingsFootnote": {
    en: "The top two teams reach the round of 32, along with the eight best third-placed teams across the twelve groups. Standings update automatically.",
    fr: "Les deux premières équipes accèdent aux 16es de finale, avec les huit meilleures troisièmes des douze groupes. Classement actualisé automatiquement.",
    ht: "De premye ekip yo pase nan 16yèm final yo, ansanm ak uit pi bon twazyèm nan douz gwoup yo. Klasman an mete ajou otomatikman.",
  },
  "matches.std.team": { en: "Team", fr: "Équipe", ht: "Ekip" },
  "matches.std.played": { en: "P", fr: "J", ht: "J" },
  "matches.std.playedFull": { en: "Played", fr: "Joués", ht: "Jwe" },
  "matches.std.won": { en: "W", fr: "G", ht: "G" },
  "matches.std.wonFull": { en: "Won", fr: "Gagnés", ht: "Genyen" },
  "matches.std.drawn": { en: "D", fr: "N", ht: "N" },
  "matches.std.drawnFull": { en: "Drawn", fr: "Nuls", ht: "Nil" },
  "matches.std.lost": { en: "L", fr: "P", ht: "P" },
  "matches.std.lostFull": { en: "Lost", fr: "Perdus", ht: "Pèdi" },
  "matches.std.gf": { en: "GF", fr: "BP", ht: "BP" },
  "matches.std.gfFull": { en: "Goals for", fr: "Buts pour", ht: "Gòl pou" },
  "matches.std.ga": { en: "GA", fr: "BC", ht: "BC" },
  "matches.std.gaFull": { en: "Goals against", fr: "Buts contre", ht: "Gòl kont" },
  "matches.std.gd": { en: "GD", fr: "Diff", ht: "Dif" },
  "matches.std.gdFull": { en: "Goal difference", fr: "Différence", ht: "Diferans" },
  "matches.std.pts": { en: "Pts", fr: "Pts", ht: "Pts" },
  // Recent form section
  "matches.recentForm": { en: "Recent form", fr: "Forme récente", ht: "Dènye fòm" },
  "matches.recentFormSub": {
    en: "The Grenadiers' latest matches.",
    fr: "Les derniers matchs des Grenadiers.",
    ht: "Dènye match Grenadye yo.",
  },
  "matches.last5": { en: "Last 5", fr: "5 derniers", ht: "5 dènye yo" },
  "matches.venueHome": { en: "Home", fr: "Dom.", ht: "Lak." },
  "matches.venueAway": { en: "Away", fr: "Ext.", ht: "Dey." },
  "matches.compWcQual": { en: "WC Qualifiers", fr: "Éliminatoires CDM", ht: "Eliminatwa Mondyal" },
  "matches.compNationsLeague": { en: "Nations League", fr: "Ligue des Nations", ht: "Lig Nasyon yo" },
  "matches.compGoldCup": { en: "Gold Cup", fr: "Gold Cup", ht: "Gold Cup" },
  "matches.compFriendly": { en: "Friendly", fr: "Amical", ht: "Amikal" },
  "matches.compWorldCup": { en: "World Cup", fr: "Coupe du Monde", ht: "Koup di Mond" },

  // ─── LIVE MATCH CENTER (/live/:slug) ──────────────────────────────────
  "live.backToMatches": { en: "← All matches", fr: "← Tous les matchs", ht: "← Tout match yo" },
  "live.kickoffIn": { en: "Kickoff in", fr: "Coup d'envoi dans", ht: "Match la kòmanse nan" },
  "live.accessLabel": { en: "Access:", fr: "Accès :", ht: "Aksè :" },
  "live.broadcastLabel": { en: "Broadcast:", fr: "Diffusion :", ht: "Difizyon :" },
  "live.readRecap": { en: "Read the match recap →", fr: "Lire le résumé du match →", ht: "Li rezime match la →" },
  "live.seats": { en: "seats", fr: "places", ht: "plas" },
  "live.statusFullTime": { en: "Full time", fr: "Fin de match", ht: "Match fini" },
  "live.tabTimeline": { en: "Timeline", fr: "Chronologie", ht: "Kronoloji" },
  "live.tabLineups": { en: "Lineups", fr: "Compositions", ht: "Konpozisyon" },
  "live.tabStats": { en: "Stats", fr: "Statistiques", ht: "Estatistik" },
  "live.tabPlayers": { en: "Players", fr: "Joueurs", ht: "Jwè yo" },
  "live.preMatch": { en: "Before the match", fr: "Avant le match", ht: "Anvan match la" },
  "live.liveUpdates": { en: "Live updates", fr: "Mises à jour en direct", ht: "Mizajou an dirèk" },
  "live.endedMsg": {
    en: "Match over. The final score is shown above.",
    fr: "Match terminé. Le score final est affiché ci-dessus.",
    ht: "Match la fini. Eskò final la parèt anwo a.",
  },
  "live.startedMsg": {
    en: "The match has started. The score updates automatically above.",
    fr: "Le match a commencé. Le score est mis à jour automatiquement ci-dessus.",
    ht: "Match la kòmanse. Eskò a ap mete ajou otomatikman anwo a.",
  },
  "live.otherMatches": { en: "Other matches", fr: "Autres matchs", ht: "Lòt match yo" },
  "live.evGoalUpper": { en: "GOAL", fr: "BUT", ht: "GÒL" },
  "live.evGoal": { en: "Goal", fr: "But", ht: "Gòl" },
  "live.evYellow": { en: "Yellow card", fr: "Carton jaune", ht: "Kat jòn" },
  "live.evRed": { en: "Red card", fr: "Carton rouge", ht: "Kat wouj" },
  "live.evSub": { en: "Substitution", fr: "Changement", ht: "Chanjman" },
  "live.subInOut": { en: "{on} on, {off} off", fr: "entrée de {on}, sortie de {off}", ht: "{on} antre, {off} soti" },
  "live.assistLabel": { en: "assist:", fr: "passe :", ht: "pas :" },
  "live.tagPen": { en: "(pen.)", fr: "(pén.)", ht: "(pen.)" },
  "live.tagOwnGoal": { en: "(o.g.)", fr: "(csc)", ht: "(otogòl)" },
  "live.subsTitle": { en: "Substitutes", fr: "Remplaçants", ht: "Ranplasan yo" },
  "live.benchTitle": { en: "Bench", fr: "Banc", ht: "Ban an" },
  "live.coachLabel": { en: "Coach:", fr: "Sélectionneur :", ht: "Antrenè :" },
  "live.statsKey": { en: "Key stats", fr: "Statistiques clés", ht: "Estatistik kle yo" },
  "live.statsAll": { en: "All stats", fr: "Toutes les statistiques", ht: "Tout estatistik yo" },
  "live.colPlayer": { en: "Player", fr: "Joueur", ht: "Jwè" },
  "live.colRating": { en: "Rating", fr: "Note", ht: "Nòt" },
  "live.colMin": { en: "Min", fr: "Min", ht: "Min" },
  "live.colMinFull": { en: "Minutes", fr: "Minutes", ht: "Minutes" },
  "live.colGoals": { en: "G", fr: "B", ht: "G" },
  "live.colGoalsFull": { en: "Goals", fr: "Buts", ht: "Gòl" },
  "live.colAssists": { en: "A", fr: "PD", ht: "PD" },
  "live.colAssistsFull": { en: "Assists", fr: "Passes décisives", ht: "Pas desizif" },
  "live.colShots": { en: "S", fr: "T", ht: "T" },
  "live.colShotsFull": { en: "Shots", fr: "Tirs", ht: "Tir" },
  "live.colShotsOn": { en: "SOT", fr: "TC", ht: "TK" },
  "live.colShotsOnFull": { en: "Shots on target", fr: "Tirs cadrés", ht: "Tir kadre" },
  "live.cdDays": { en: "days", fr: "jours", ht: "jou" },
  // Scouting (pre-match opponent form + head-to-head)
  "live.scoutingSub": {
    en: "Before kickoff: current form and the record against Haiti.",
    fr: "Avant le coup d'envoi : la forme du moment et le bilan face à Haïti.",
    ht: "Anvan match la kòmanse : fòm aktyèl la ak bilan an fas ak Ayiti.",
  },
  "live.scoutingForm": { en: "Recent form", fr: "Forme récente", ht: "Dènye fòm" },
  "live.scoutingVsHaiti": { en: "Against Haiti", fr: "Face à Haïti", ht: "Fas ak Ayiti" },
  "live.scoutingFirstMeeting": {
    en: "First ever meeting between the two nations.",
    fr: "Première confrontation entre les deux nations.",
    ht: "Premye fwa de nasyon yo ap jwe youn kont lòt.",
  },
  "live.theOpponent": { en: "the opponent", fr: "l'adversaire", ht: "advèsè a" },
  "live.scoutingTitle": { en: "Opponent scouting", fr: "Scouting adversaire", ht: "Etid advèsè a" },
  "live.scoutingFormOf": { en: "Recent form: {name}", fr: "Forme récente de {name}", ht: "Dènye fòm {name}" },
  "live.scoutingFormUnavail": { en: "Recent form unavailable.", fr: "Forme récente indisponible.", ht: "Dènye fòm pa disponib." },
  "live.meetingSingular": { en: "meeting", fr: "rencontre", ht: "rankont" },
  "live.meetingsPlural": { en: "meetings", fr: "rencontres", ht: "rankont" },
  "live.goalsWord": { en: "goals", fr: "buts", ht: "gòl" },
  "matches.details": {
    en: "Details",
    fr: "Détails",
    ht: "Detay",
  },

  // ─── JOURNAL (Le Journal: list + article chrome) ──────────────────────
  "journal.mastheadTitle": { en: "Journal", fr: "Le Journal", ht: "Jounal la" },
  "journal.mastheadSub": {
    en: "Chronicle of the national team",
    fr: "Chronique de la sélection nationale",
    ht: "Kwonik seleksyon nasyonal la",
  },
  "journal.archives": { en: "Archives", fr: "Archives", ht: "Achiv" },
  "journal.empty": {
    en: "First articles coming soon.",
    fr: "Premières chroniques à paraître prochainement.",
    ht: "Premye kwonik yo ap parèt talè.",
  },
  "journal.edition": { en: "Edition of {date}", fr: "Édition du {date}", ht: "Edisyon {date}" },
  "journal.countdown": {
    en: "{days} days until Haiti vs Scotland",
    fr: "J-{days} avant Ayiti vs Écosse",
    ht: "J-{days} anvan Ayiti vs Eskòs",
  },
  "journal.tabArticle": { en: "The article", fr: "L'article", ht: "Atik la" },
  "journal.tabTranscript": {
    en: "Full transcript",
    fr: "Transcription intégrale",
    ht: "Tout transkripsyon an",
  },
  "journal.formatAria": { en: "Article format", fr: "Format de l'article", ht: "Fòma atik la" },
  "journal.notFound": { en: "Article not found.", fr: "Chronique introuvable.", ht: "Nou pa jwenn kwonik la." },
  "journal.backToJournal": {
    en: "← Back to the Journal",
    fr: "← Retour au Journal",
    ht: "← Retounen nan Jounal la",
  },
  "journal.watchYoutube": { en: "Watch on YouTube", fr: "Regarder sur YouTube", ht: "Gade sou YouTube" },
  "journal.galleryEyebrow": { en: "The gallery", fr: "La galerie", ht: "Galri a" },
  "journal.inImages": { en: "In pictures", fr: "En images", ht: "An imaj" },
  "journal.photosCredit": { en: "Photos:", fr: "Photos :", ht: "Foto :" },
  "journal.unitPhoto": { en: "photo", fr: "photo", ht: "foto" },
  "journal.unitPhotos": { en: "photos", fr: "photos", ht: "foto" },
  "journal.alsoRead": { en: "Also read", fr: "À lire aussi", ht: "Pou li tou" },
  "journal.otherEntries": { en: "More articles", fr: "Autres chroniques", ht: "Lòt kwonik yo" },
  "journal.allJournal": { en: "The whole Journal →", fr: "Tout le Journal →", ht: "Tout Jounal la →" },
  "journal.lightboxPrev": { en: "Previous", fr: "Précédent", ht: "Anvan" },
  "journal.lightboxNext": { en: "Next", fr: "Suivant", ht: "Apre" },

  // ─── WATCH PARTIES ────────────────────────────────────────────────────
  "watchParties.eyebrow": {
    en: "Where Haitians gather",
    fr: "Où les Haïtiens se rassemblent",
    ht: "Kote Ayisyen rasanble",
  },
  "watchParties.title": {
    en: "Watch parties",
    fr: "Watch parties",
    ht: "Watch party yo",
  },
  "watchParties.subtitle": {
    en: "A directory of Haitian-frequented venues — bars, restaurants, community centers, cultural spaces — from Brooklyn to Cap-Haïtien, Montréal to Miami, Paris to Pétion-Ville.",
    fr: "Un répertoire de lieux fréquentés par la communauté haïtienne — bars, restaurants, centres communautaires, espaces culturels — de Brooklyn au Cap-Haïtien, de Montréal à Miami, de Paris à Pétion-Ville.",
    ht: "Yon repèrtwa kote Ayisyen rankontre — ba, restoran, sant kominotè, espas kiltirèl — soti Brooklyn jiska Cap-Haïtien, Monreyal pou Miami, Pari pou Pétion-Ville.",
  },
  "watchParties.stat.cities": {
    en: "Cities",
    fr: "Villes",
    ht: "Vil",
  },
  "watchParties.stat.countries": {
    en: "Countries",
    fr: "Pays",
    ht: "Peyi",
  },
  "watchParties.stat.depts": {
    en: "Haiti depts",
    fr: "Dépts Haïti",
    ht: "Depatman",
  },
  "watchParties.hosting.title": {
    en: "Know a Haitian spot?",
    fr: "Vous connaissez un lieu haïtien ?",
    ht: "Ou konnen yon kote ayisyen?",
  },
  "watchParties.hosting.subtitle": {
    en: "Restaurant, bar, community center, cultural space — wherever Haitians gather in your city, we want to list it. Help us build the directory.",
    fr: "Restaurant, bar, centre communautaire, espace culturel — partout où les Haïtiens se rassemblent dans votre ville, nous voulons l'inscrire. Aidez-nous à bâtir le répertoire.",
    ht: "Restoran, ba, sant kominotè, espas kiltirèl — nenpòt kote Ayisyen rasanble nan vil ou, nou vle anrejistre l. Ede nou bati repèrtwa a.",
  },
  "watchParties.hosting.cta": {
    en: "Submit a venue",
    fr: "Soumettre un lieu",
    ht: "Soumèt yon kote",
  },
  "watchParties.view.map": {
    en: "Map",
    fr: "Carte",
    ht: "Kat",
  },
  "watchParties.view.list": {
    en: "List",
    fr: "Liste",
    ht: "Lis",
  },
  "watchParties.map.hint": {
    en: "Click a pin for details",
    fr: "Cliquez sur un point pour plus de détails",
    ht: "Klike sou yon poto pou plis detay",
  },
  "watchParties.list.hint": {
    en: "Browse by region",
    fr: "Parcourir par région",
    ht: "Gade pa rejyon",
  },
  "watchParties.legend.featured": {
    en: "Featured hub",
    fr: "Point principal",
    ht: "Kote prensipal",
  },
  "watchParties.legend.regular": {
    en: "Watch party",
    fr: "Soirée",
    ht: "Watch party",
  },

  // ─── WATCH PARTIES PAGE (Phase 2 additions) ──────────────────────────
  "watchParties.statDepartments": {
    en: "Departments (Haiti)",
    fr: "Départements (Haïti)",
    ht: "Départements (Haïti)",
  },
  "watchParties.submitTitle": {
    en: "Know a spot the Haitian community gathers at?",
    fr: "Vous connaissez un lieu fréquenté par la communauté haïtienne ?",
    ht: "Vous connaissez un lieu fréquenté par la communauté haïtienne ?",
  },
  "watchParties.submitBody": {
    en: "Restaurant, bar, community center, cultural space: wherever the Haitian community gathers in your city, we want to add it to the directory. Help us grow the list.",
    fr: "Restaurant, bar, centre communautaire, espace culturel : où que la communauté haïtienne se réunisse dans votre ville, nous voulons l'inscrire au répertoire. Aidez-nous à enrichir la liste.",
    ht: "Restaurant, bar, centre communautaire, espace culturel : où que la communauté haïtienne se réunisse dans votre ville, nous voulons l'inscrire au répertoire. Aidez-nous à enrichir la liste.",
  },
  "watchParties.submitButton": {
    en: "Suggest a venue",
    fr: "Proposer un lieu",
    ht: "Proposer un lieu",
  },
  "watchParties.mapHint": {
    en: "Click a pin for details",
    fr: "Cliquer sur une épingle pour les détails",
    ht: "Cliquer sur une épingle pour les détails",
  },
  "watchParties.featured": {
    en: "Featured",
    fr: "À l'affiche",
    ht: "À l'affiche",
  },
  "watchParties.legendFeatured": {
    en: "Featured venue",
    fr: "Lieu à l'affiche",
    ht: "Lieu à l'affiche",
  },
  "watchParties.legendHaitian": {
    en: "Haitian venue",
    fr: "Lieu haïtien",
    ht: "Lieu haïtien",
  },
  "watchParties.aboutTitle": {
    en: "About this directory",
    fr: "À propos de ce répertoire",
    ht: "À propos de ce répertoire",
  },
  "watchParties.aboutBody": {
    en: "This is a community directory of venues frequented by the Haitian community: bars, restaurants, community centers, cultural spaces. All entries are currently placeholder locations awaiting community submissions. To add or edit a listing, email",
    fr: "Il s'agit d'un répertoire communautaire de lieux fréquentés par la communauté haïtienne : bars, restaurants, centres communautaires, espaces culturels. Toutes les entrées sont actuellement des emplacements en attente de propositions de la part de la communauté. Pour ajouter ou modifier une fiche, écrire à",
    ht: "Il s'agit d'un répertoire communautaire de lieux fréquentés par la communauté haïtienne : bars, restaurants, centres communautaires, espaces culturels. Toutes les entrées sont actuellement des emplacements en attente de propositions de la part de la communauté. Pour ajouter ou modifier une fiche, écrire à",
  },
  "watchParties.broadcastNoticeLabel": {
    en: "Public broadcast notice:",
    fr: "Note relative à la diffusion publique :",
    ht: "Note relative à la diffusion publique :",
  },
  "watchParties.broadcastNoticeBody": {
    en: "Public broadcast of FIFA World Cup matches requires a FIFA Public Viewing license, separate from any commercial broadcast rights some venues may already hold. This directory does not organize or endorse public match screenings. Any venue that chooses to show a match is solely responsible for it, including obtaining the required FIFA license and complying with applicable regulations.",
    fr: "La diffusion publique des matchs de la Coupe du Monde de la FIFA requiert une licence FIFA Public Viewing, distincte des droits de retransmission commerciale que peuvent déjà détenir certains établissements. Ce répertoire n'organise pas et ne cautionne pas l'organisation de projections publiques de matchs. Tout établissement qui choisit de retransmettre un match en est seul responsable, notamment en ce qui concerne l'obtention de la licence FIFA requise et le respect de la réglementation applicable.",
    ht: "La diffusion publique des matchs de la Coupe du Monde de la FIFA requiert une licence FIFA Public Viewing, distincte des droits de retransmission commerciale que peuvent déjà détenir certains établissements. Ce répertoire n'organise pas et ne cautionne pas l'organisation de projections publiques de matchs. Tout établissement qui choisit de retransmettre un match en est seul responsable, notamment en ce qui concerne l'obtention de la licence FIFA requise et le respect de la réglementation applicable.",
  },
  "watchParties.venue": {
    en: "venue",
    fr: "lieu",
    ht: "lieu",
  },
  "watchParties.venues": {
    en: "venues",
    fr: "lieux",
    ht: "lieux",
  },

  // ─── FAN WALL / MUR (Phase 2 additions) ──────────────────────────────
  "mur.eyebrow": {
    en: "The voice of the Grenadiers",
    fr: "La voix des Grenadiers",
    ht: "Vwa Grenadye yo",
  },
  "mur.title": {
    en: "Fan wall",
    fr: "Mur des supporters",
    ht: "Miray sipòtè yo",
  },
  "mur.subtitle": {
    en: "Leave your message for the team, from Haiti, from the diaspora, from all over the world. Messages are published after moderation.",
    fr: "Laissez votre message pour la sélection, d'Haïti, de la diaspora, du monde entier. Les messages sont publiés après modération.",
    ht: "Kite mesaj ou pou seleksyon an, soti Ayiti, soti nan dyaspora a, soti toupatou nan mond lan. Mesaj yo pibliye apre yon moderasyon.",
  },
  "mur.messagesTitle": {
    en: "Fan messages",
    fr: "Les messages des supporters",
    ht: "Mesaj sipòtè yo",
  },
  "mur.beFirst": {
    en: "Be the first to write.",
    fr: "Soyez le premier à écrire.",
    ht: "Se ou ki pou ekri an premye.",
  },
  "mur.empty": {
    en: "No messages yet. Yours could be the first. 🇭🇹",
    fr: "Aucun message pour le moment. Votre message pourrait être le premier. 🇭🇹",
    ht: "Pa gen mesaj pou kounye a. Pa ou a ka premye a. 🇭🇹",
  },

  // ─── 404 / NOT FOUND (Phase 2 additions) ─────────────────────────────
  "notFound.docTitle": {
    en: "404 · Page not found · Grenadiers 2026",
    fr: "404 · Page introuvable · Grenadiers 2026",
    ht: "404 · Page introuvable · Grenadiers 2026",
  },
  "notFound.title": {
    en: "Page not found.",
    fr: "Page introuvable.",
    ht: "Page introuvable.",
  },
  "notFound.body": {
    en: "The page you asked for doesn't exist. The link may be broken, the page may have moved, or it may never have existed. Here are a few ways to keep going.",
    fr: "La page demandée n'existe pas, le lien est peut-être rompu, la page a peut-être été déplacée, ou elle n'a jamais existé. Voici quelques pistes pour continuer.",
    ht: "La page demandée n'existe pas, le lien est peut-être rompu, la page a peut-être été déplacée, ou elle n'a jamais existé. Voici quelques pistes pour continuer.",
  },
  "notFound.reportPrefix": {
    en: "Broken link on the site? Email",
    fr: "Lien cassé sur le site ? Écrire à",
    ht: "Lien cassé sur le site ? Écrire à",
  },
  "notFound.reportSuffix": {
    en: "to report the problem.",
    fr: "pour signaler le problème.",
    ht: "pour signaler le problème.",
  },

  // ─── GAMES HUB (Jeux) Phase 2 ────────────────────────────────────────
  "jeux.eyebrow": {
    en: "Fan zone",
    fr: "Espace supporters",
    ht: "Espace supporters",
  },
  "jeux.title": {
    en: "Play.",
    fr: "Jouez.",
    ht: "Jouez.",
  },
  "jeux.subtitle": {
    en: "Games to live the Grenadiers' road to the World Cup, and share it.",
    fr: "Des jeux pour vivre la route des Grenadiers vers la Coupe du Monde, et la partager.",
    ht: "Des jeux pour vivre la route des Grenadiers vers la Coupe du Monde, et la partager.",
  },
  "jeux.available": {
    en: "Available",
    fr: "Disponible",
    ht: "Disponible",
  },
  "jeux.soon": {
    en: "Soon",
    fr: "Bientôt",
    ht: "Bientôt",
  },
  "jeux.play": {
    en: "Play",
    fr: "Jouer",
    ht: "Jouer",
  },
  "jeux.footer": {
    en: "More games are coming before and during the tournament. Check back often, or follow Chokarella Media so you don't miss anything.",
    fr: "D'autres jeux arrivent avant et pendant le tournoi. Revenez régulièrement, ou suivez Chokarella Media pour ne rien manquer.",
    ht: "D'autres jeux arrivent avant et pendant le tournoi. Revenez régulièrement, ou suivez Chokarella Media pour ne rien manquer.",
  },
  "jeux.penalty.title": {
    en: "Penalty Shootout",
    fr: "Tire Penalty",
    ht: "Tire Penalty",
  },
  "jeux.penalty.blurb": {
    en: "Knock out Scotland, Brazil, and Morocco in a shootout.",
    fr: "Élimine l'Écosse, le Brésil et le Maroc aux tirs au but.",
    ht: "Élimine l'Écosse, le Brésil et le Maroc aux tirs au but.",
  },
  "jeux.quiz.title": {
    en: "Grenadier Quiz",
    fr: "Quiz Grenadier",
    ht: "Quiz Grenadier",
  },
  "jeux.quiz.blurb": {
    en: "Eight questions on 1974, the 2026 squad, and the Federation. Shareable score.",
    fr: "Huit questions sur 1974, la sélection 2026 et la Fédération. Score partageable.",
    ht: "Huit questions sur 1974, la sélection 2026 et la Fédération. Score partageable.",
  },
  "jeux.pwonostik.title": {
    en: "Pwonostik",
    fr: "Pwonostik",
    ht: "Pwonostik",
  },
  "jeux.pwonostik.blurb": {
    en: "Predict the score of Haiti's three matches. Exact score = 3 pts, right result = 1 pt.",
    fr: "Pronostiquez le score des trois matchs d'Haïti. Score exact = 3 pts, bon résultat = 1 pt.",
    ht: "Pronostiquez le score des trois matchs d'Haïti. Score exact = 3 pts, bon résultat = 1 pt.",
  },
  "jeux.devine.title": {
    en: "Guess the Grenadier",
    fr: "Devine le Grenadier",
    ht: "Devine le Grenadier",
  },
  "jeux.devine.blurb": {
    en: "A mystery player every day. Six tries, hints, a result to share.",
    fr: "Un joueur mystère chaque jour. Six essais, des indices, un résultat à partager.",
    ht: "Un joueur mystère chaque jour. Six essais, des indices, un résultat à partager.",
  },
  "jeux.onze.title": {
    en: "Your Starting XI",
    fr: "Ton Onze de Départ",
    ht: "Ton Onze de Départ",
  },
  "jeux.onze.blurb": {
    en: "Build your starting eleven from the 26 Grenadiers, then share it with your group.",
    fr: "Composez votre onze de départ parmi les 26 Grenadiers, puis partagez-le avec votre groupe.",
    ht: "Composez votre onze de départ parmi les 26 Grenadiers, puis partagez-le avec votre groupe.",
  },
  "games.backToHub": {
    en: "Games",
    fr: "Jouez",
    ht: "Jouez",
  },

  // ─── QUIZ GAME (Phase 2) ─────────────────────────────────────────────
  "quiz.eyebrow": {
    en: "Game · Knowledge",
    fr: "Jeu · Connaissances",
    ht: "Jeu · Connaissances",
  },
  "quiz.intro": {
    en: "Eight questions, four possible answers. Pick a theme, or mix everything. Your best score is kept on this device.",
    fr: "Huit questions, quatre réponses possibles. Choisissez un thème, ou mélangez tout. Votre meilleur score est conservé sur cet appareil.",
    ht: "Huit questions, quatre réponses possibles. Choisissez un thème, ou mélangez tout. Votre meilleur score est conservé sur cet appareil.",
  },
  "quiz.record": {
    en: "Best",
    fr: "Record",
    ht: "Record",
  },
  "quiz.mixAll": {
    en: "Mix it all",
    fr: "Tout mélanger",
    ht: "Tout mélanger",
  },
  "quiz.questionProgress": {
    en: "Question {n} / {total}",
    fr: "Question {n} / {total}",
    ht: "Question {n} / {total}",
  },
  "quiz.seeScore": {
    en: "See my score",
    fr: "Voir mon score",
    ht: "Voir mon score",
  },
  "quiz.nextQuestion": {
    en: "Next question",
    fr: "Question suivante",
    ht: "Question suivante",
  },
  "quiz.verdict100": {
    en: "Flawless. A true Grenadier.",
    fr: "Sans-faute. Un vrai Grenadier.",
    ht: "Sans-faute. Un vrai Grenadier.",
  },
  "quiz.verdict75": {
    en: "Solid. You know your history.",
    fr: "Solide. Vous connaissez votre histoire.",
    ht: "Solide. Vous connaissez votre histoire.",
  },
  "quiz.verdict50": {
    en: "Not bad, there are still pages to revisit.",
    fr: "Pas mal, il reste des pages à relire.",
    ht: "Pas mal, il reste des pages à relire.",
  },
  "quiz.verdict0": {
    en: "The shirt takes learning. Play again!",
    fr: "Le maillot s'apprend. Rejouez !",
    ht: "Le maillot s'apprend. Rejouez !",
  },
  "quiz.scoreAria": {
    en: "{score} out of {total}",
    fr: "{score} sur {total}",
    ht: "{score} sur {total}",
  },
  "quiz.share": {
    en: "Share my score",
    fr: "Partager mon score",
    ht: "Partager mon score",
  },
  "quiz.replayTheme": {
    en: "Replay this theme",
    fr: "Rejouer ce thème",
    ht: "Rejouer ce thème",
  },
  "quiz.changeTheme": {
    en: "Change theme",
    fr: "Changer de thème",
    ht: "Changer de thème",
  },
  "quiz.goFurther": {
    en: "Want to go further?",
    fr: "Envie d'aller plus loin ?",
    ht: "Envie d'aller plus loin ?",
  },
  "quiz.read1974": {
    en: "Revisit the 1974 story",
    fr: "Relisez le récit de 1974",
    ht: "Relisez le récit de 1974",
  },

  // ─── PWONOSTIK GAME (Phase 2) ────────────────────────────────────────
  "pwonostik.eyebrow": {
    en: "Game · Predictions",
    fr: "Jeu · Pronostics",
    ht: "Jeu · Pronostics",
  },
  "pwonostik.intro": {
    en: "Predict the score of Haiti's three group-stage matches. 3 points for the exact score, 1 point for the right result. Each match locks at kickoff.",
    fr: "Pronostiquez le score des trois matchs d'Haïti en phase de groupes. 3 points pour le score exact, 1 point pour le bon résultat. Chaque match se verrouille au coup d'envoi.",
    ht: "Pronostiquez le score des trois matchs d'Haïti en phase de groupes. 3 points pour le score exact, 1 point pour le bon résultat. Chaque match se verrouille au coup d'envoi.",
  },
  "pwonostik.nameLabel": {
    en: "Your name",
    fr: "Votre nom",
    ht: "Votre nom",
  },
  "pwonostik.nameHint": {
    en: "(for the leaderboard)",
    fr: "(pour le classement)",
    ht: "(pour le classement)",
  },
  "pwonostik.namePlaceholder": {
    en: "e.g. Carel",
    fr: "Ex. Carel",
    ht: "Ex. Carel",
  },
  "pwonostik.emailLabel": {
    en: "Email",
    fr: "E-mail",
    ht: "E-mail",
  },
  "pwonostik.emailHint": {
    en: "(optional, to receive the results)",
    fr: "(optionnel, pour recevoir les résultats)",
    ht: "(optionnel, pour recevoir les résultats)",
  },
  "pwonostik.emailPlaceholder": {
    en: "you@example.com",
    fr: "vous@exemple.com",
    ht: "vous@exemple.com",
  },
  "pwonostik.leagueLabel": {
    en: "League code",
    fr: "Code de ligue",
    ht: "Code de ligue",
  },
  "pwonostik.leagueHint": {
    en: "(optional, create one, share it)",
    fr: "(optionnel, créez-en un, partagez-le)",
    ht: "(optionnel, créez-en un, partagez-le)",
  },
  "pwonostik.leaguePlaceholder": {
    en: "e.g. FANMI-CAREL",
    fr: "Ex. FANMI-CAREL",
    ht: "Ex. FANMI-CAREL",
  },
  "pwonostik.leagueNote": {
    en: "Type the same code with friends to compare yourselves in a private leaderboard.",
    fr: "Tapez le même code entre amis pour vous comparer dans un classement privé.",
    ht: "Tapez le même code entre amis pour vous comparer dans un classement privé.",
  },
  "pwonostik.yourTotal": {
    en: "Your total",
    fr: "Votre total",
    ht: "Votre total",
  },
  "pwonostik.locked": {
    en: "Locked",
    fr: "Verrouillé",
    ht: "Verrouillé",
  },
  "pwonostik.open": {
    en: "Open",
    fr: "Ouvert",
    ht: "Ouvert",
  },
  "pwonostik.resultLabel": {
    en: "Result:",
    fr: "Résultat :",
    ht: "Résultat :",
  },
  "pwonostik.exactScore": {
    en: "Exact score · +3",
    fr: "Score exact · +3",
    ht: "Score exact · +3",
  },
  "pwonostik.rightResult": {
    en: "Right result · +1",
    fr: "Bon résultat · +1",
    ht: "Bon résultat · +1",
  },
  "pwonostik.zeroPt": {
    en: "0 pts",
    fr: "0 pt",
    ht: "0 pt",
  },
  "pwonostik.saved": {
    en: "Predictions saved ✓",
    fr: "Pronostics enregistrés ✓",
    ht: "Pronostics enregistrés ✓",
  },
  "pwonostik.save": {
    en: "Save my predictions",
    fr: "Enregistrer mes pronostics",
    ht: "Enregistrer mes pronostics",
  },
  "pwonostik.share": {
    en: "Share my prediction",
    fr: "Partager mon pronostic",
    ht: "Partager mon pronostic",
  },
  "pwonostik.leaderboard": {
    en: "Leaderboard",
    fr: "Classement",
    ht: "Classement",
  },
  "pwonostik.leaderboardSoon": {
    en: "The leaderboard will switch on as soon as the backend connects. Your predictions are already saved on this device.",
    fr: "Le classement s'activera dès la connexion du backend. Vos pronostics sont déjà sauvegardés sur cet appareil.",
    ht: "Le classement s'activera dès la connexion du backend. Vos pronostics sont déjà sauvegardés sur cet appareil.",
  },
  "pwonostik.global": {
    en: "Global",
    fr: "Mondial",
    ht: "Mondial",
  },
  "pwonostik.myLeague": {
    en: "My league",
    fr: "Ma ligue",
    ht: "Ma ligue",
  },
  "pwonostik.emptyLeague": {
    en: "No one in this league yet. Share your code!",
    fr: "Personne dans cette ligue pour l'instant. Partagez votre code !",
    ht: "Personne dans cette ligue pour l'instant. Partagez votre code !",
  },
  "pwonostik.emptyGlobal": {
    en: "Be the first to save your predictions.",
    fr: "Soyez le premier à enregistrer vos pronostics.",
    ht: "Soyez le premier à enregistrer vos pronostics.",
  },
  "pwonostik.boardCountPlural": {
    en: "{n} players have already submitted their predictions. Points will appear after the first match.",
    fr: "{n} joueurs ont déjà soumis leurs pronostics. Les points s'afficheront après le premier match.",
    ht: "{n} joueurs ont déjà soumis leurs pronostics. Les points s'afficheront après le premier match.",
  },
  "pwonostik.boardCountSingular": {
    en: "{n} player has already submitted their predictions. Points will appear after the first match.",
    fr: "{n} joueur a déjà soumis ses pronostics. Les points s'afficheront après le premier match.",
    ht: "{n} joueur a déjà soumis ses pronostics. Les points s'afficheront après le premier match.",
  },
  "pwonostik.minusGoalAria": {
    en: "Minus one goal {name}",
    fr: "Moins un but {name}",
    ht: "Moins un but {name}",
  },
  "pwonostik.plusGoalAria": {
    en: "Plus one goal {name}",
    fr: "Plus un but {name}",
    ht: "Plus un but {name}",
  },

  // ─── PENALTY GAME (Phase 2) ──────────────────────────────────────────
  "penalty.shareText": {
    en: "I knocked out Scotland, Brazil, and Morocco in a shootout 🇭🇹 Play too: grenadiers2026.com/jeux/penalty",
    fr: "J'ai éliminé l'Écosse, le Brésil et le Maroc aux tirs au but 🇭🇹 Joue aussi : grenadiers2026.com/jeux/penalty",
    ht: "J'ai éliminé l'Écosse, le Brésil et le Maroc aux tirs au but 🇭🇹 Joue aussi : grenadiers2026.com/jeux/penalty",
  },
  "penalty.goal": {
    en: "Goal!",
    fr: "But !",
    ht: "But !",
  },
  "penalty.over": {
    en: "Over the bar!",
    fr: "Au-dessus !",
    ht: "Au-dessus !",
  },
  "penalty.save": {
    en: "Saved!",
    fr: "Arrêt !",
    ht: "Arrêt !",
  },
  "penalty.saveYou": {
    en: "Saved! 🧤",
    fr: "Arrêt ! 🧤",
    ht: "Arrêt ! 🧤",
  },
  "penalty.theyScore": {
    en: "They score...",
    fr: "Ils marquent...",
    ht: "Ils marquent...",
  },
  "penalty.suddenDeath": {
    en: "Sudden death",
    fr: "Mort subite",
    ht: "Mort subite",
  },
  "penalty.kickLabel": {
    en: "Kick {n} / 5",
    fr: "Tir {n} / 5",
    ht: "Tir {n} / 5",
  },
  "penalty.defense": {
    en: "Defense",
    fr: "Défense",
    ht: "Défense",
  },
  "penalty.aimTitle": {
    en: "Your shot",
    fr: "À toi de tirer",
    ht: "À toi de tirer",
  },
  "penalty.aimText": {
    en: "Tap a zone of the goal to aim. Go for the corners, but watch the keeper.",
    fr: "Tape une zone du but pour viser. Vise les coins, mais attention au gardien.",
    ht: "Tape une zone du but pour viser. Vise les coins, mais attention au gardien.",
  },
  "penalty.diveTitle": {
    en: "Your save",
    fr: "À toi d'arrêter",
    ht: "À toi d'arrêter",
  },
  "penalty.diveText": {
    en: "Tap the zone where you dive. Read the shooter.",
    fr: "Tape la zone où tu plonges. Devine le tireur.",
    ht: "Tape la zone où tu plonges. Devine le tireur.",
  },
  "penalty.winTitle": {
    en: "Win! 🎉",
    fr: "Victoire ! 🎉",
    ht: "Victoire ! 🎉",
  },
  "penalty.winText": {
    en: "You beat {opponent}. On to the next!",
    fr: "Tu as battu {opponent}. Au suivant !",
    ht: "Tu as battu {opponent}. Au suivant !",
  },
  "penalty.continue": {
    en: "Continue",
    fr: "Continuer",
    ht: "Continuer",
  },
  "penalty.lostTitle": {
    en: "Out...",
    fr: "Éliminé...",
    ht: "Éliminé...",
  },
  "penalty.lostText": {
    en: "You didn't get past {opponent} this time. Try again.",
    fr: "Tu n'as pas passé {opponent} cette fois. Réessaie.",
    ht: "Tu n'as pas passé {opponent} cette fois. Réessaie.",
  },
  "penalty.replay": {
    en: "Play again",
    fr: "Rejouer",
    ht: "Rejouer",
  },
  "penalty.eyebrow": {
    en: "Shootout",
    fr: "Tirs au but",
    ht: "Tirs au but",
  },
  "penalty.introText": {
    en: "Best of 5. You shoot first, then you save. A tie means sudden death.",
    fr: "Le meilleur des 5. Tu tires d'abord, puis tu arrêtes. Égalité = mort subite.",
    ht: "Le meilleur des 5. Tu tires d'abord, puis tu arrêtes. Égalité = mort subite.",
  },
  "penalty.start": {
    en: "Start",
    fr: "Commencer",
    ht: "Commencer",
  },
  "penalty.powerTitle": {
    en: "Tap to strike!",
    fr: "Tape pour frapper !",
    ht: "Tape pour frapper !",
  },
  "penalty.strikeAria": {
    en: "Strike",
    fr: "Frapper",
    ht: "Frapper",
  },
  "penalty.strikeCenter": {
    en: "Strike the center",
    fr: "Frappe au centre",
    ht: "Frappe au centre",
  },
  "penalty.championTitle": {
    en: "You knocked out three great teams in a shootout 🇭🇹",
    fr: "Tu as éliminé trois grandes équipes aux tirs au but 🇭🇹",
    ht: "Tu as éliminé trois grandes équipes aux tirs au but 🇭🇹",
  },
  "penalty.goalsStat": {
    en: "Goals",
    fr: "Buts",
    ht: "Buts",
  },
  "penalty.savesStat": {
    en: "Saves",
    fr: "Arrêts",
    ht: "Arrêts",
  },
  "penalty.copied": {
    en: "Copied ✓",
    fr: "Copié ✓",
    ht: "Copié ✓",
  },
  "penalty.share": {
    en: "Share",
    fr: "Partager",
    ht: "Partager",
  },
  "penalty.zoneAria": {
    en: "Zone {n}",
    fr: "Zone {n}",
    ht: "Zone {n}",
  },

  // ─── ONZE DE DÉPART GAME (Phase 2) ───────────────────────────────────
  "games.allGames": {
    en: "All games",
    fr: "Tous les jeux",
    ht: "Tous les jeux",
  },
  "onze.subtitle": {
    en: "Build your starting eleven for the Grenadiers, then share it with your group.",
    fr: "Composez votre onze de départ pour les Grenadiers, puis partagez-le avec votre groupe.",
    ht: "Composez votre onze de départ pour les Grenadiers, puis partagez-le avec votre groupe.",
  },
  "onze.clearAll": {
    en: "Clear all",
    fr: "Tout effacer",
    ht: "Tout effacer",
  },
  "onze.coachLabel": {
    en: "Your manager name",
    fr: "Votre nom de sélectionneur",
    ht: "Votre nom de sélectionneur",
  },
  "onze.optional": {
    en: "(optional)",
    fr: "(optionnel)",
    ht: "(optionnel)",
  },
  "onze.coachPlaceholder": {
    en: "e.g. Sébastien Migné",
    fr: "Ex. Sébastien Migné",
    ht: "Ex. Sébastien Migné",
  },
  "onze.share": {
    en: "Share my XI",
    fr: "Partager mon onze",
    ht: "Partager mon onze",
  },
  "onze.completeRemaining": {
    en: "Complete your XI ({n} left to place)",
    fr: "Complétez votre onze ({n} à placer)",
    ht: "Complétez votre onze ({n} à placer)",
  },
  "onze.role.GK": {
    en: "Goalkeeper",
    fr: "Gardien",
    ht: "Gardien",
  },
  "onze.role.DEF": {
    en: "Defender",
    fr: "Défenseur",
    ht: "Défenseur",
  },
  "onze.role.MID": {
    en: "Midfielder",
    fr: "Milieu",
    ht: "Milieu",
  },
  "onze.role.FWD": {
    en: "Forward",
    fr: "Attaquant",
    ht: "Attaquant",
  },
  "onze.roleShort.GK": {
    en: "GK",
    fr: "GAR",
    ht: "GAR",
  },
  "onze.roleShort.DEF": {
    en: "DEF",
    fr: "DÉF",
    ht: "DÉF",
  },
  "onze.roleShort.MID": {
    en: "MID",
    fr: "MIL",
    ht: "MIL",
  },
  "onze.roleShort.FWD": {
    en: "FWD",
    fr: "ATT",
    ht: "ATT",
  },
  "onze.pickerTitle": {
    en: "Choose a {role}",
    fr: "Choisir un {role}",
    ht: "Choisir un {role}",
  },
  "onze.close": {
    en: "Close",
    fr: "Fermer",
    ht: "Fermer",
  },
  "onze.filterByPosition": {
    en: "Filter by position",
    fr: "Filtrer par poste",
    ht: "Filtrer par poste",
  },
  "onze.seeAllPlayers": {
    en: "See all players",
    fr: "Voir tous les joueurs",
    ht: "Voir tous les joueurs",
  },
  "onze.remove": {
    en: "Remove",
    fr: "Retirer",
    ht: "Retirer",
  },
  "onze.noPlayers": {
    en: "No players available for this position.",
    fr: "Aucun joueur disponible à ce poste.",
    ht: "Aucun joueur disponible à ce poste.",
  },

  // ─── DEVINE LE GRENADIER GAME (Phase 2) ──────────────────────────────
  "devine.subtitle": {
    en: "A mystery player from the squad every day. Six tries to find them.",
    fr: "Un joueur mystère de la sélection chaque jour. Six essais pour le trouver.",
    ht: "Un joueur mystère de la sélection chaque jour. Six essais pour le trouver.",
  },
  "devine.puzzleProgress": {
    en: "Puzzle no.{n} · {tries}/{max} tries",
    fr: "Énigme nº{n} · {tries}/{max} essais",
    ht: "Énigme nº{n} · {tries}/{max} essais",
  },
  "devine.streak": {
    en: "Streak: {n} 🔥",
    fr: "Série : {n} 🔥",
    ht: "Série : {n} 🔥",
  },
  "devine.howToPlay": {
    en: "How to play",
    fr: "Comment jouer",
    ht: "Comment jouer",
  },
  "devine.hide": {
    en: "Hide ▾",
    fr: "Masquer ▾",
    ht: "Masquer ▾",
  },
  "devine.show": {
    en: "Show ▸",
    fr: "Afficher ▸",
    ht: "Afficher ▸",
  },
  "devine.howText": {
    en: "A mystery Grenadier is hiding in the squad. Guess players from the group: with each try, the game reveals what your pick shares with the player you're after (position, age, club country, and club). Six tries to unmask them.",
    fr: "Un Grenadier mystère se cache dans la sélection. Devinez des joueurs du groupe : à chaque essai, le jeu révèle ce que votre choix partage avec le joueur recherché (poste, âge, pays du club et club). Six essais pour le démasquer.",
    ht: "Un Grenadier mystère se cache dans la sélection. Devinez des joueurs du groupe : à chaque essai, le jeu révèle ce que votre choix partage avec le joueur recherché (poste, âge, pays du club et club). Six essais pour le démasquer.",
  },
  "devine.legend": {
    en: "Legend",
    fr: "Légende",
    ht: "Légende",
  },
  "devine.legendGreenLabel": {
    en: "Green",
    fr: "Vert",
    ht: "Vert",
  },
  "devine.legendGreen": {
    en: "exact match: right position, right country, right club, or exact age.",
    fr: "identique : bon poste, bon pays, bon club, ou âge exact.",
    ht: "identique : bon poste, bon pays, bon club, ou âge exact.",
  },
  "devine.legendYellowLabel": {
    en: "Yellow",
    fr: "Jaune",
    ht: "Jaune",
  },
  "devine.legendYellow": {
    en: "close age: within 2 years of the mystery player.",
    fr: "âge proche : à 2 ans près du joueur mystère.",
    ht: "âge proche : à 2 ans près du joueur mystère.",
  },
  "devine.legendGrayLabel": {
    en: "Gray",
    fr: "Gris",
    ht: "Gris",
  },
  "devine.legendGray": {
    en: "no match.",
    fr: "aucune correspondance.",
    ht: "aucune correspondance.",
  },
  "devine.legendArrowsLabel": {
    en: "Age arrows",
    fr: "Flèches sur l'âge",
    ht: "Flèches sur l'âge",
  },
  "devine.legendArrows": {
    en: "the mystery Grenadier is older (↑) or younger (↓) than your guess.",
    fr: "le Grenadier mystère est plus âgé (↑) ou plus jeune (↓) que votre essai.",
    ht: "le Grenadier mystère est plus âgé (↑) ou plus jeune (↓) que votre essai.",
  },
  "devine.searchPlaceholder": {
    en: "Type a player's name…",
    fr: "Tapez le nom d'un joueur…",
    ht: "Tapez le nom d'un joueur…",
  },
  "devine.found": {
    en: "Found!",
    fr: "Trouvé !",
    ht: "Trouvé !",
  },
  "devine.attrPoste": {
    en: "Position",
    fr: "Poste",
    ht: "Poste",
  },
  "devine.attrAge": {
    en: "Age",
    fr: "Âge",
    ht: "Âge",
  },
  "devine.attrPays": {
    en: "Club country",
    fr: "Pays du club",
    ht: "Pays du club",
  },
  "devine.attrClub": {
    en: "Club",
    fr: "Club",
    ht: "Club",
  },
  "devine.win": {
    en: "Nice, found in {n}!",
    fr: "Bravo, trouvé en {n} !",
    ht: "Bravo, trouvé en {n} !",
  },
  "devine.lose": {
    en: "Missed it for today.",
    fr: "Raté pour aujourd'hui.",
    ht: "Raté pour aujourd'hui.",
  },
  "devine.answerPrefix": {
    en: "The mystery Grenadier was",
    fr: "Le Grenadier mystère était",
    ht: "Le Grenadier mystère était",
  },
  "devine.share": {
    en: "Share my result",
    fr: "Partager mon résultat",
    ht: "Partager mon résultat",
  },
  "devine.tomorrow": {
    en: "A new mystery player tomorrow.",
    fr: "Un nouveau joueur mystère demain.",
    ht: "Un nouveau joueur mystère demain.",
  },

  // ─── STORIES ──────────────────────────────────────────────────────────
  "stories.eyebrow": {
    en: "Chokarella editorial",
    fr: "Chokarella · Éditorial",
    ht: "Istwa",
  },
  "stories.title": {
    en: "Stories",
    fr: "Histoires",
    ht: "Istwa yo.",
  },
  "stories.subtitle": {
    en: "Pre-match analysis, player profiles, family interviews from Haiti, and post-match reaction. The Chokarella treatment for Les Grenadiers' return.",
    fr: "Analyses d'avant-match, portraits de joueurs, interviews avec les familles en Haïti, et réactions d'après-match. Le traitement Chokarella pour le retour des Grenadiers.",
    ht: "Atik long sou kòch la, chwa yo, taktik yo, moun yo. Ekri pou moman sa a.",
  },
  "stories.moreStories": {
    en: "More stories",
    fr: "Plus d'histoires",
    ht: "Plis istwa",
  },
  "stories.keepReading": {
    en: "Keep reading",
    fr: "Continuer la lecture",
    ht: "Kontinye li",
  },
  "stories.allStories": {
    en: "All stories",
    fr: "Toutes les histoires",
    ht: "Tout istwa yo",
  },

  // ─── ANTHEM ───────────────────────────────────────────────────────────
  "anthem.eyebrow": {
    en: "The soundtrack",
    fr: "La bande-son",
    ht: "Mizik la",
  },
  "anthem.title": {
    en: "Anthem",
    fr: "Hymne",
    ht: "Im",
  },
  "anthem.subtitle": {
    en: "Music for the red and blue. The Grenadiers' playlist, curated by Chokarella, plus the videos powering the streets, the watch parties, and the locker room.",
    fr: "Musique pour le rouge et le bleu. La playlist des Grenadiers, curatée par Chokarella, plus les vidéos qui animent les rues, les soirées et le vestiaire.",
    ht: "Mizik pou wouj ak ble. Playlist Grenadye yo, kreye pa Chokarella, plis videyo k ap fè lari yo, watch party yo, ak vestyè a sote.",
  },
  "anthem.submit.title": {
    en: "Submit a song",
    fr: "Soumettre une chanson",
    ht: "Soumèt yon chante",
  },
  "anthem.submit.subtitle": {
    en: "Got a song that captures the moment? Send it over.",
    fr: "Vous avez une chanson qui capture le moment ? Envoyez-la.",
    ht: "W gen yon chante ki kenbe moman an? Voye li ban nou.",
  },

  // ─── FEDERATION (header + subtitle handled in dedicated block below) ──

  // ─── HISTORY 1974 ────────────────────────────────────────────────────
  "history.eyebrow": {
    en: "1974 · West Germany",
    fr: "1974 · Allemagne de l'Ouest",
    ht: "1974 · Almay Lwès",
  },
  "history.title": {
    en: "The 70 minutes.",
    fr: "Les 70 minutes.",
    ht: "70 minit yo.",
  },
  "history.subtitle": {
    en: "The story of Manno Sanon, the goal that broke Dino Zoff, and the 52 years that followed. By Chokarella.",
    fr: "L'histoire de Manno Sanon, du but qui a brisé Dino Zoff, et des 52 années qui ont suivi. Par Chokarella.",
    ht: "Istwa Manno Sanon, gòl ki te kase Dino Zoff la, ak 52 ane ki te swiv yo. Pa Chokarella.",
  },

  // ─── FOOTER ───────────────────────────────────────────────────────────
  "footer.about.title": {
    en: "About",
    fr: "À propos",
    ht: "Konsènan",
  },
  "footer.about.body": {
    en: "Independent, unofficial site about Les Grenadiers at the FIFA World Cup 2026, designed and built by Carel Pedre.",
    fr: "Site indépendant et non-officiel sur les Grenadiers à la Coupe du Monde de la FIFA 2026, conçu et développé par Carel Pedre.",
    ht: "Sit endepandan ki pa ofisyèl sou Grenadye yo nan Coupe du Monde FIFA 2026 a, konsevwa ak devlope pa Carel Pedre.",
  },
  "footer.explore.title": {
    en: "Explore",
    fr: "Explorer",
    ht: "Eksplore",
  },
  "footer.media.title": {
    en: "For media",
    fr: "Pour les médias",
    ht: "Pou medya yo",
  },
  "footer.about.link": {
    en: "About this site",
    fr: "À propos de ce site",
    ht: "Konsènan sit sa a",
  },
  "footer.contact.link": {
    en: "Contact the team",
    fr: "Contacter l'équipe",
    ht: "Kontakte ekip la",
  },
  "footer.press.link": {
    en: "Press kit",
    fr: "Kit de presse",
    ht: "Kit pou laprès",
  },
  "footer.copyright": {
    en: "© 2026 grenadiers2026.com. All rights reserved.",
    fr: "© 2026 grenadiers2026.com. Tous droits réservés.",
    ht: "© 2026 grenadiers2026.com. Tout dwa rezève.",
  },

  // ─── NAV (additions) ─────────────────────────────────────────────────
  "nav.about": {
    en: "About",
    fr: "À propos",
    ht: "Konsènan",
  },
  "nav.press": {
    en: "Press",
    fr: "Presse",
    ht: "Laprès",
  },
  "nav.interviews": {
    en: "Interviews",
    fr: "Entrevues",
    ht: "Entèvyou",
  },
  "nav.atlas": {
    en: "The Atlas",
    fr: "L'Atlas",
    ht: "Atlas la",
  },

  // ─── COMMON UI ───────────────────────────────────────────────────────
  "common.readMore": {
    en: "Read more",
    fr: "Lire la suite",
    ht: "Li plis",
  },
  "common.readStory": {
    en: "Read the story",
    fr: "Lire l'histoire",
    ht: "Li istwa a",
  },
  "common.keepReading": {
    en: "Keep reading",
    fr: "Continuer la lecture",
    ht: "Kontinye li",
  },
  "common.backToStories": {
    en: "← All stories",
    fr: "← Toutes les histoires",
    ht: "← Tout istwa yo",
  },
  "common.viewAll": {
    en: "View all",
    fr: "Voir tout",
    ht: "Wè tout",
  },
  "common.learnMore": {
    en: "Learn more",
    fr: "En savoir plus",
    ht: "Aprann plis",
  },
  "common.share": {
    en: "Share",
    fr: "Partager",
    ht: "Pataje",
  },
  "common.copy": {
    en: "Copy",
    fr: "Copier",
    ht: "Kopye",
  },
  "common.copied": {
    en: "Copied",
    fr: "Copié",
    ht: "Kopye fini",
  },
  "common.loading": {
    en: "Loading...",
    fr: "Chargement...",
    ht: "K ap chaje...",
  },
  "common.minRead": {
    en: "min read",
    fr: "min de lecture",
    ht: "min pou li",
  },
  "common.by": {
    en: "By",
    fr: "Par",
    ht: "Pa",
  },

  // ─── ABOUT PAGE ──────────────────────────────────────────────────────
  "about.eyebrow": {
    en: "About this site",
    fr: "À propos de ce site",
    ht: "Konsènan sit sa a",
  },
  "about.title": {
    en: "A love letter to Haitian football.",
    fr: "Une lettre d'amour au football haïtien.",
    ht: "Yon lèt damou pou foutbòl Ayisyen an.",
  },
  "about.subtitle": {
    en: "grenadiers2026.com is an independent, unofficial fan project celebrating Haiti's return to the FIFA World Cup.",
    fr: "grenadiers2026.com est un projet de fan indépendant et non officiel célébrant le retour d'Haïti à la Coupe du Monde FIFA.",
    ht: "grenadiers2026.com se yon pwojè endepandan, ki pa ofisyèl, k ap selebre retou Ayiti nan FIFA World Cup la.",
  },
  "about.h2.whyThisExists": {
    en: "Why this site exists",
    fr: "Pourquoi ce site existe",
    ht: "Poukisa sit sa a egziste",
  },
  "about.h2.languages": {
    en: "Three languages, one nation",
    fr: "Trois langues, une nation",
    ht: "Twa lang, yon sèl nasyon",
  },
  "about.h2.whatsOnTheSite": {
    en: "What's on the site",
    fr: "Ce qu'on trouve sur le site",
    ht: "Sa ki sou sit la",
  },
  "about.h2.whoIsBehindIt": {
    en: "Who's behind it",
    fr: "Qui est derrière",
    ht: "Ki moun ki dèyè li",
  },
  "about.h2.corrections": {
    en: "Corrections and contact",
    fr: "Corrections et contact",
    ht: "Korèksyon ak kontak",
  },
  "about.h2.finalNote": {
    en: "A final note",
    fr: "Un dernier mot",
    ht: "Yon dènye mo",
  },
  "about.closing": {
    en: "Ann ale, Grenadye.",
    fr: "Ann ale, Grenadye.",
    ht: "Ann ale, Grenadye.",
  },

  // ─── PRESS PAGE ──────────────────────────────────────────────────────
  "press.eyebrow": {
    en: "For media",
    fr: "Pour les médias",
    ht: "Pou medya yo",
  },
  "press.title": {
    en: "Press kit",
    fr: "Kit de presse",
    ht: "Kit pou laprès",
  },
  "press.subtitle": {
    en: "Everything journalists need to cover Haiti at the 2026 FIFA World Cup. Facts, photos, contacts, context — all in one place.",
    fr: "Tout ce dont les journalistes ont besoin pour couvrir Haïti à la Coupe du Monde FIFA 2026. Faits, photos, contacts, contexte — au même endroit.",
    ht: "Tout sa jounalis yo bezwen pou kouvri Ayiti nan FIFA World Cup 2026. Enfòmasyon, foto, kontak, kontèks — tout nan yon sèl kote.",
  },
  "press.cta.needQuote": {
    en: "Need a quote, an interview, or context?",
    fr: "Besoin d'une citation, d'une entrevue ou de contexte ?",
    ht: "Bezwen yon sitasyon, yon entèvyou, oswa kontèks?",
  },
  "press.cta.body": {
    en: "Carel Pedre and the Chokarella Media team are available for interviews, quotes, fact-checking, and on-the-ground reporting from Haiti. Working in English, French, and Haitian Creole.",
    fr: "Carel Pedre et l'équipe Chokarella Media sont disponibles pour des entrevues, citations, vérification des faits, et reportage sur le terrain en Haïti. Travaillent en anglais, français et créole haïtien.",
    ht: "Carel Pedre ak ekip Chokarella Media disponib pou entèvyou, sitasyon, verifikasyon enfòmasyon, ak repòtaj sou teren an Ayiti. Yo travay nan anglè, franse, ak kreyòl ayisyen.",
  },
  "press.cta.button": {
    en: "Contact the team →",
    fr: "Contacter l'équipe →",
    ht: "Kontakte ekip la →",
  },

  // ─── HOME PAGE (additions) ───────────────────────────────────────────
  "home.stats.players": {
    en: "Players",
    fr: "Joueurs",
    ht: "Jwè",
  },
  "home.stats.clubCountries": {
    en: "Club countries",
    fr: "Pays de clubs",
    ht: "Peyi klèb yo",
  },
  "home.stats.topScorers": {
    en: "Top scorers · 10+ goals",
    fr: "Meilleurs buteurs · 10+ buts",
    ht: "Pi gwo katchè yo · 10+ gòl",
  },
  "home.stats.yearsSince": {
    en: "Years since 1974",
    fr: "Ans depuis 1974",
    ht: "Ane depi 1974",
  },
  "home.matchLabels.opener": {
    en: "MATCH 1 · OPENER",
    fr: "MATCH 1 · OUVERTURE",
    ht: "MATCH 1 · OUVÈTI",
  },
  "home.matchLabels.match2": {
    en: "MATCH 2",
    fr: "MATCH 2",
    ht: "MATCH 2",
  },
  "home.matchLabels.decider": {
    en: "MATCH 3 · DECIDER",
    fr: "MATCH 3 · DÉCISIF",
    ht: "MATCH 3 · DESIZIF",
  },

  // ─── MATCHES PAGE (additions) ────────────────────────────────────────
  "matches.title": {
    en: "Three matches in June.",
    fr: "Trois matchs en juin.",
    ht: "Twa match an jen.",
  },
  "matches.fixture.scotland": {
    en: "Haiti vs Scotland",
    fr: "Haïti vs Écosse",
    ht: "Ayiti vs Eskòs",
  },
  "matches.fixture.brazil": {
    en: "Brazil vs Haiti",
    fr: "Brésil vs Haïti",
    ht: "Brezil vs Ayiti",
  },
  "matches.fixture.morocco": {
    en: "Morocco vs Haiti",
    fr: "Maroc vs Haïti",
    ht: "Mawòk vs Ayiti",
  },
  "matches.kickoff": {
    en: "Kickoff",
    fr: "Coup d'envoi",
    ht: "Lè match la kòmanse",
  },
  "matches.venue": {
    en: "Venue",
    fr: "Stade",
    ht: "Estad",
  },
  "matches.fixtures": {
    en: "Fixtures",
    fr: "Calendrier",
    ht: "Pwogram match yo",
  },

  // ─── MATCHES PAGE (Phase 2 additions) ────────────────────────────────
  "matches.tabOverview": {
    en: "Overview",
    fr: "Aperçu",
    ht: "Apèsi",
  },
  "matches.tabStandings": {
    en: "Standings · Group C",
    fr: "Classement · Groupe C",
    ht: "Klasman · Gwoup C",
  },
  "matches.wcSub": {
    en: "Three opponents. Three cities. One flag.",
    fr: "Trois adversaires. Trois villes. Un seul drapeau.",
    ht: "Twa advèsè. Twa vil. Yon sèl drapo.",
  },
  "matches.liveCenterAria": {
    en: "Live match center · {home} vs {away}",
    fr: "Centre match en direct · {home} contre {away}",
    ht: "Sant match an dirèk · {home} kont {away}",
  },
  "matches.prepSub": {
    en: "Final tune-ups in South Florida, under the Inter Miami CF banner.",
    fr: "Derniers réglages en Floride du Sud, sous l'égide de l'Inter Miami CF.",
    ht: "Dènye reglaj nan Sid Florida, ak sipò Inter Miami CF.",
  },
  "matches.groupCTeams": {
    en: "The Group C teams",
    fr: "Les équipes du Groupe C",
    ht: "Ekip Gwoup C yo",
  },
  "matches.qualifyNote": {
    en: "The top two teams in the group reach the round of 32. The eight best third-placed teams across the twelve groups complete the 32-team bracket.",
    fr: "Les deux premières équipes du groupe accèdent aux 16es de finale. Les huit meilleures troisièmes des douze groupes complètent le tableau des 32.",
    ht: "De premye ekip nan gwoup la pase nan 16yèm final yo. Uit pi bon twazyèm nan douz gwoup yo konplete tablo 32 a.",
  },
  "matches.matchCenter": {
    en: "Match center",
    fr: "Centre du match",
    ht: "Sant match la",
  },
  "matches.groupCMatch": {
    en: "Group C · Match {n}",
    fr: "Groupe C · Match {n}",
    ht: "Gwoup C · Match {n}",
  },
  "matches.wcFifa2026": {
    en: "FIFA World Cup 2026",
    fr: "Coupe du Monde FIFA 2026",
    ht: "Koup di Mond FIFA 2026",
  },
  "matches.pitch": {
    en: "Pitch",
    fr: "Pelouse",
    ht: "Teren",
  },
  "matches.naturalGrass": {
    en: "Natural grass",
    fr: "Gazon naturel",
    ht: "Gazon natirèl",
  },
  "matches.broadcastLabel": {
    en: "Broadcast",
    fr: "Diffusion",
    ht: "Difizyon",
  },
  "matches.liveCenter": {
    en: "Live match center",
    fr: "Centre match en direct",
    ht: "Sant match an dirèk",
  },
  "matches.prepUpcoming": {
    en: "Friendly · Upcoming",
    fr: "Préparation · À venir",
    ht: "Preparasyon · Ap vini",
  },
  "matches.prepResult": {
    en: "Friendly · Result",
    fr: "Préparation · Résultat",
    ht: "Preparasyon · Rezilta",
  },
  "matches.ticketsTicketmaster": {
    en: "Tickets on Ticketmaster",
    fr: "Billetterie sur Ticketmaster",
    ht: "Tikè sou Ticketmaster",
  },
  "matches.recap": {
    en: "Recap",
    fr: "Résumé",
    ht: "Rezime",
  },
  "matches.viewMatch": {
    en: "View the match",
    fr: "Voir le match",
    ht: "Gade match la",
  },

  // ─── WATCH PARTIES PAGE ──────────────────────────────────────────────
  "watch.eyebrow": {
    en: "Watch parties",
    fr: "Soirées de visionnage",
    ht: "Watch party",
  },
  "watch.title": {
    en: "Watch with the family.",
    fr: "Regarder en famille.",
    ht: "Gade ansanm tankou yon fanmi.",
  },
  "watch.subtitle": {
    en: "Find a Haitian watch party near you. Bars, restaurants, community centers, family living rooms — wherever the diaspora gathers.",
    fr: "Trouvez une soirée de visionnage haïtienne près de chez vous. Bars, restaurants, centres communautaires, salons familiaux — partout où la diaspora se rassemble.",
    ht: "Jwenn yon watch party ayisyen toupre w. Ba, restoran, sant kominote, salon fanmi — kèlkeswa kote dyaspora a rasanble.",
  },
  "watch.host.button": {
    en: "Host a watch party",
    fr: "Organiser une soirée",
    ht: "Òganize yon watch party",
  },

  // ─── SQUAD PAGE (additions) ──────────────────────────────────────────
  "squad.eyebrow": {
    en: "The 26",
    fr: "Les 26",
    ht: "26 jwè yo",
  },
  "squad.title": {
    en: "The squad.",
    fr: "L'effectif.",
    ht: "Ekip la.",
  },
  "squad.subtitle": {
    en: "26 players. 15 countries. One flag. Coach Sébastien Migné's final roster for the 2026 FIFA World Cup.",
    fr: "26 joueurs. 15 pays. Un seul drapeau. La sélection finale du coach Sébastien Migné pour la Coupe du Monde FIFA 2026.",
    ht: "26 jwè. 15 peyi. Yon sèl drapo. Lis final kòch Sébastien Migné pou FIFA World Cup 2026.",
  },
  "squad.section.goalkeepers": {
    en: "Goalkeepers",
    fr: "Gardiens de but",
    ht: "Gadyen-bi yo",
  },
  "squad.section.defenders": {
    en: "Defenders",
    fr: "Défenseurs",
    ht: "Defansè yo",
  },
  "squad.section.midfielders": {
    en: "Midfielders",
    fr: "Milieux de terrain",
    ht: "Mil-teren yo",
  },
  "squad.section.forwards": {
    en: "Forwards",
    fr: "Attaquants",
    ht: "Atakan yo",
  },
  "squad.label.born": {
    en: "Born",
    fr: "Né",
    ht: "Fèt",
  },
  "squad.label.birthplace": {
    en: "Birthplace",
    fr: "Lieu de naissance",
    ht: "Kote l fèt",
  },
  "squad.label.club": {
    en: "Club",
    fr: "Club",
    ht: "Klèb",
  },
  "squad.label.league": {
    en: "League",
    fr: "Championnat",
    ht: "Lig",
  },
  "squad.label.caps": {
    en: "Caps",
    fr: "Sélections",
    ht: "Match nasyonal",
  },
  "squad.label.goals": {
    en: "Goals",
    fr: "Buts",
    ht: "Gòl",
  },
  "squad.label.captain": {
    en: "Captain",
    fr: "Capitaine",
    ht: "Kapitèn",
  },
  "squad.label.coach": {
    en: "Head Coach",
    fr: "Sélectionneur",
    ht: "Kòch prensipal",
  },

  // ─── SQUAD PAGE (Phase 2 additions) ──────────────────────────────────
  "squad.heroEyebrow": {
    en: "Haiti's squad · 2026 World Cup",
    fr: "La sélection d'Haïti · Coupe du Monde 2026",
    ht: "Seleksyon Ayiti a · Koup di Mond 2026",
  },
  "squad.heroTitle1": {
    en: "Players and staff.",
    fr: "Joueurs et staff.",
    ht: "Jwè ak estaf.",
  },
  "squad.heroTitle2": {
    en: "One mission.",
    fr: "Une seule mission.",
    ht: "Yon sèl misyon.",
  },
  "squad.heroSubtext": {
    en: "Fifty-two years after Munich, the Grenadiers return to the FIFA World Cup. The 26 players selected, unveiled by the Haitian Football Federation on May 16, 2026.",
    fr: "Cinquante-deux ans après Munich, les Grenadiers retrouvent la Coupe du Monde de la FIFA. Les 26 joueurs retenus, dévoilés par la Fédération Haïtienne de Football le 16 mai 2026.",
    ht: "Senkant-de ane apre Munich, Grenadye yo retounen nan Koup di Mond FIFA a. Se 26 jwè ki chwazi yo, Federasyon Ayisyen Foutbòl la te devwale 16 me 2026.",
  },
  "squad.navGoalkeepers": {
    en: "Goalkeepers",
    fr: "Gardiens",
    ht: "Gadyen",
  },
  "squad.navMidfielders": {
    en: "Midfielders",
    fr: "Milieux",
    ht: "Milye",
  },
  "squad.forfaits": {
    en: "Withdrawals",
    fr: "Forfaits",
    ht: "Forfè",
  },
  "squad.forfaitsNote": {
    en: "They are part of the journey but had to pull out through injury.",
    fr: "Ils font partie de l'aventure mais ont dû renoncer sur blessure.",
    ht: "Yo fè pati avanti a men yo te oblije kite akoz blesi.",
  },
  "squad.player": {
    en: "player",
    fr: "joueur",
    ht: "jwè",
  },
  "squad.players": {
    en: "players",
    fr: "joueurs",
    ht: "jwè",
  },
  "squad.members": {
    en: "members",
    fr: "membres",
    ht: "manm",
  },
  "squad.kitTitle": {
    en: "The kit",
    fr: "Le maillot",
    ht: "Mayo a",
  },
  "squad.kitSubtext": {
    en: "Three kits by Saeta. One signature: the story of Haiti, stitched into the fabric.",
    fr: "Trois tenues signées Saeta. Une seule signature : l'histoire d'Haïti, cousue dans le tissu.",
    ht: "Twa tenu Saeta siyen. Yon sèl siyati : istwa Ayiti, koud nan twal la.",
  },
  "squad.kitImageLabel": {
    en: "Official 2026 World Cup kits · Saeta",
    fr: "Maillots officiels de la Coupe du Monde 2026 · Saeta",
    ht: "Mayo ofisyèl Koup di Mond 2026 · Saeta",
  },
  "squad.kitIntro": {
    en: "Every inch of the original design, created by Saeta, tells the story of Haiti past and present. Far from a simple uniform, the kit is the country's own narrative, translated into patterns and material.",
    fr: "Chaque centimètre du design original, conçu par Saeta, raconte l'Haïti d'hier et d'aujourd'hui. Loin d'être un simple habillage, la tenue est le récit même du pays, traduit en motifs et en matière.",
    ht: "Chak santimèt nan desen orijinal la, Saeta konsevwa, rakonte Ayiti yè ak jodi a. Pi lwen pase yon senp abiman, tenu a se istwa peyi a menm, tradui an modèl ak an matyè.",
  },
  "squad.kit1Label": {
    en: "Lower right of the chest",
    fr: "Côté droit du torse, en bas",
    ht: "Bò dwat lestonmak la, anba",
  },
  "squad.kit1Body": {
    en: "A tribute to the fighters of the Battle of Vertières, where the indigenous troops defeated Napoleon's army, sealing Haiti's independence and giving birth to the first Black republic of the modern world.",
    fr: "Hommage aux combattants de la Bataille de Vertières, où les troupes indigènes ont défait l'armée napoléonienne, scellant l'indépendance d'Haïti et donnant naissance à la première République noire du monde moderne.",
    ht: "Yon omaj pou konbatan Batay Vertières yo, kote twoup endijèn yo te bat lame Napoleon an, ki sele endepandans Ayiti epi ki bay nesans premye Repiblik nwa nan mond modèn nan.",
  },
  "squad.kit2Label": {
    en: "Hidden across the front",
    fr: "Dissimulé sur tout le devant",
    ht: "Kache sou tout devan an",
  },
  "squad.kit2Title": {
    en: "Strength in unity",
    fr: "« L'union fait la force »",
    ht: "« L'union fait la force »",
  },
  "squad.kit2Body": {
    en: "The national motto, printed in tiny letters across the chest of the shirt. Legible only up close. A message the players carry within them, even when invisible from afar.",
    fr: "La devise nationale, inscrite en lettres minuscules sur tout le buste du maillot. Lisible uniquement de très près. Un message que les joueurs portent en eux, même invisible à distance.",
    ht: "Deviz nasyonal la, ekri an tou piti sou tout devan mayo a. Ou ka li l sèlman lè ou byen pre. Yon mesaj jwè yo pote nan kè yo, menm si ou pa ka wè l de lwen.",
  },
  "squad.kit3Label": {
    en: "On the back",
    fr: "Sur le dos",
    ht: "Sou do a",
  },
  "squad.kit3Title": {
    en: "Mountains and palms",
    fr: "Montagnes et palmiers",
    ht: "Mòn ak palmis",
  },
  "squad.kit3Body": {
    en: "The silhouette of Ayiti itself: the mountains that gave the country its Taino name (land of high mountains) and the palms of the national coat of arms. The whole country, carried on the players' shoulders.",
    fr: "La silhouette d'Ayiti elle-même : les montagnes qui ont donné au pays son nom taïno (« terre des hautes montagnes ») et les palmiers des armoiries nationales. Le pays entier, porté sur les épaules des joueurs.",
    ht: "Silwèt Ayiti li menm : mòn ki bay peyi a non taino li (« peyi mòn ki wo yo ») ak palmis ki nan blazon nasyonal la. Tout peyi a, sou zepòl jwè yo.",
  },
  "squad.kitUpdatePrefix": {
    en: "Update, June 9, 2026:",
    fr: "Mise à jour, 9 juin 2026 :",
    ht: "Mizajou, 9 jen 2026 :",
  },
  "squad.kitUpdateLink": {
    en: "at FIFA's request",
    fr: "à la demande de la FIFA",
    ht: "sou demann FIFA",
  },
  "squad.kitUpdateSuffix": {
    en: ", some visual elements of the original design were adjusted before the competition began. Saeta, defending the spirit of its creation, applied the required changes, and it is this version the Grenadiers will wear during the World Cup.",
    fr: ", certains éléments visuels du design original ont été ajustés avant le début de la compétition. Saeta, qui défend l'esprit de sa création, a appliqué les modifications exigées, et c'est cette version que les Grenadiers porteront pendant la Coupe du Monde.",
    ht: ", yo te ajiste kèk eleman vizyèl nan desen orijinal la anvan konpetisyon an kòmanse. Saeta, ki defann lespri kreyasyon li, te aplike chanjman yo te mande yo, epi se vèsyon sa a Grenadye yo ap pote pandan Koup di Mond la.",
  },
  "squad.kitMadeByPrefix": {
    en: "Made by",
    fr: "Fabriqué par",
    ht: "Fabrike pa",
  },
  "squad.kitMadeBySuffix": {
    en: ", partner of the Haitian Football Federation since 2014.",
    fr: ", partenaire de la Fédération Haïtienne de Football depuis 2014.",
    ht: ", patnè Federasyon Ayisyen Foutbòl la depi 2014.",
  },
  "squad.kitBuy": {
    en: "Buy the kit",
    fr: "Acheter le maillot",
    ht: "Achte mayo a",
  },
  "squad.campTitle": {
    en: "Training bases",
    fr: "Centres de préparation",
    ht: "Sant preparasyon yo",
  },
  "squad.campSubtext": {
    en: "Where the Grenadiers prepare for the World Cup: two phases, two mindsets.",
    fr: "Là où Les Grenadiers préparent la Coupe du Monde : deux phases, deux états d'esprit.",
    ht: "Kote Grenadye yo prepare Koup di Mond la : de faz, de eta lespri.",
  },
  "squad.lodging": {
    en: "Lodging",
    fr: "Hébergement",
    ht: "Lojman",
  },
  "squad.selectedBy": {
    en: "Selected by",
    fr: "Choisi par",
    ht: "Chwazi pa",
  },
  "squad.localTies": {
    en: "Local ties to the base camp",
    fr: "Liens locaux avec le camp de base",
    ht: "Lyen lokal ak kan baz la",
  },
  "squad.aboutSelection": {
    en: "About this selection",
    fr: "À propos de cette sélection",
    ht: "Konsènan seleksyon sa a",
  },
  "squad.qualifRecordTitle": {
    en: "Qualifying record · CONCACAF · Sept. 2024 to Nov. 2025",
    fr: "Bilan des éliminatoires · CONCACAF · sept. 2024 à nov. 2025",
    ht: "Bilan eliminatwa yo · CONCACAF · sept. 2024 a nov. 2025",
  },
  "squad.winsDrawsLosses": {
    en: "Wins · Draws · Losses",
    fr: "Victoires · Nuls · Défaites",
    ht: "Viktwa · Nil · Defèt",
  },
  "squad.goalsForAgainst": {
    en: "Goals for · against",
    fr: "Buts pour · contre",
    ht: "Gòl pou · kont",
  },
  "squad.rankingsTitle": {
    en: "Squad rankings",
    fr: "Classements de la sélection",
    ht: "Klasman seleksyon an",
  },
  "squad.topScorers": {
    en: "Top scorers",
    fr: "Meilleurs buteurs",
    ht: "Pi gwo katchè yo",
  },
  "squad.mostCapped": {
    en: "Most caps",
    fr: "Plus sélectionnés",
    ht: "Plis seleksyone yo",
  },
  "squad.goalsUnit": {
    en: "goals",
    fr: "buts",
    ht: "gòl",
  },
  "squad.capsUnit": {
    en: "caps",
    fr: "sél.",
    ht: "sel.",
  },
  "squad.ageUnit": {
    en: "yrs",
    fr: "ans",
    ht: "an",
  },
  "squad.ctaEyebrow": {
    en: "2026 World Cup · Group C",
    fr: "Coupe du Monde 2026 · Groupe C",
    ht: "Koup di Mond 2026 · Gwoup C",
  },
  "squad.ctaTitle1": {
    en: "Three opponents.",
    fr: "Trois adversaires.",
    ht: "Twa advèsè.",
  },
  "squad.ctaTitle2": {
    en: "Three cities. One flag.",
    fr: "Trois villes. Un seul drapeau.",
    ht: "Twa vil. Yon sèl drapo.",
  },
  "squad.ctaBody": {
    en: "Scotland in Foxborough, Brazil in Philadelphia, Morocco in Atlanta. Eleven days on American soil for the second World Cup in Haiti's history.",
    fr: "Écosse à Foxborough, Brésil à Philadelphie, Maroc à Atlanta. Onze jours sur le sol américain pour la deuxième Coupe du Monde de l'histoire d'Haïti.",
    ht: "Eskòs nan Foxborough, Brezil nan Philadelphie, Mawòk nan Atlanta. Onz jou sou tè ameriken pou dezyèm Koup di Mond nan istwa Ayiti.",
  },
  "squad.ctaButton": {
    en: "See the schedule",
    fr: "Découvrir le calendrier",
    ht: "Dekouvri pwogram nan",
  },
  "squad.profile": {
    en: "Profile",
    fr: "Profil",
    ht: "Pwofil",
  },
  "squad.statsDisclaimer": {
    en: "Stats and cap totals come from third-party sources and may differ from official figures.",
    fr: "Les statistiques et le nombre de sélections proviennent de sources tierces et peuvent différer des chiffres officiels.",
    ht: "Estatistik yo ak kantite seleksyon yo soti nan sous twazyèm pati epi yo ka diferan de chif ofisyèl yo.",
  },

  // ─── PLAYER MODAL + SQUAD CONTENT (Phase 2 content) ──────────────────
  "squad.starTag": {
    en: "Key player",
    fr: "Cadre",
    ht: "Pilye",
  },
  "squad.playerGeneric": {
    en: "Player",
    fr: "Joueur",
    ht: "Jwè",
  },
  "squad.label.age": {
    en: "Age",
    fr: "Âge",
    ht: "Laj",
  },
  "squad.label.goalsCaps": {
    en: "Goals (intl.)",
    fr: "Buts (sél.)",
    ht: "Gòl (sel.)",
  },
  "squad.label.bornOn": {
    en: "Born",
    fr: "Né le",
    ht: "Fèt",
  },
  "squad.label.height": {
    en: "Height",
    fr: "Taille",
    ht: "Wotè",
  },
  "squad.label.debut": {
    en: "International debut",
    fr: "Première sélection",
    ht: "Premye seleksyon",
  },
  "squad.label.positions": {
    en: "Positions",
    fr: "Postes",
    ht: "Pòs yo",
  },
  "squad.label.apps": {
    en: "Matches",
    fr: "Matchs",
    ht: "Match",
  },
  "squad.label.assists": {
    en: "Assists",
    fr: "Passes D.",
    ht: "Pas D.",
  },
  "squad.label.rating": {
    en: "Avg. rating",
    fr: "Note moy.",
    ht: "Nòt mwayèn",
  },
  "squad.modalClubSeason": {
    en: "At club this season",
    fr: "En club cette saison",
    ht: "Nan klèb sezon sa a",
  },
  "squad.modalAllComps": {
    en: "all competitions this season",
    fr: "toutes compétitions cette saison",
    ht: "tout konpetisyon sezon sa a",
  },
  "squad.modalBio": {
    en: "Biography",
    fr: "Biographie",
    ht: "Biyografi",
  },
  "squad.modalFollow": {
    en: "Follow",
    fr: "Suivre",
    ht: "Swiv",
  },
  "squad.modalShareProfile": {
    en: "Share this profile",
    fr: "Partager cette fiche",
    ht: "Pataje fich sa a",
  },
  "squad.modalCapsInfoLabel": {
    en: "About the cap count",
    fr: "À propos du nombre de sélections",
    ht: "Konsènan kantite seleksyon yo",
  },
  "squad.modalCapsInfoText": {
    en: "The cap count comes from third-party sources and can vary: some matches are not always counted the same way.",
    fr: "Le nombre de sélections provient de sources tierces et peut varier : certains matchs ne sont pas toujours comptabilisés de la même façon.",
    ht: "Kantite seleksyon yo soti nan sous twazyèm pati epi li ka varye : gen kèk match yo pa toujou konte menm jan an.",
  },
  "squad.bestScorer": {
    en: "top scorer",
    fr: "meilleur buteur",
    ht: "pi gwo katchè",
  },
  "squad.bestPasser": {
    en: "top assister",
    fr: "meilleur passeur",
    ht: "pi gwo pasè",
  },
  "squad.goalsInQualif": {
    en: "{n} goals in qualifying",
    fr: "{n} buts en qualif.",
    ht: "{n} gòl nan eliminatwa",
  },
  "squad.goalsShort": {
    en: "{n} goals",
    fr: "{n} buts",
    ht: "{n} gòl",
  },
  "squad.assistsInQualif": {
    en: "{n} assists in qualifying",
    fr: "{n} passes en qualif.",
    ht: "{n} pas nan eliminatwa",
  },
  "squad.assistsShort": {
    en: "{n} assists",
    fr: "{n} passes",
    ht: "{n} pas",
  },

  // ─── PLAYER SHARE CARD (Phase 2 content) ─────────────────────────────
  "share.title": {
    en: "Share card",
    fr: "Carte de partage",
    ht: "Carte de partage",
  },
  "share.generating": {
    en: "Image is being generated · try again in a moment.",
    fr: "Image en cours de génération · réessayez dans un instant.",
    ht: "Image en cours de génération · réessayez dans un instant.",
  },
  "share.save": {
    en: "↓ Save",
    fr: "↓ Enregistrer",
    ht: "↓ Enregistrer",
  },
  "share.copied": {
    en: "Copied ✓",
    fr: "Copié ✓",
    ht: "Copié ✓",
  },
  "share.share": {
    en: "Share",
    fr: "Partager",
    ht: "Partager",
  },
  "share.hint": {
    en: "« Save » → Save image (Photos). « Share » → stories, Messages…",
    fr: "« Enregistrer » → Enregistrer l'image (Photos). « Partager » → stories, Messages…",
    ht: "« Enregistrer » → Enregistrer l'image (Photos). « Partager » → stories, Messages…",
  },
  "share.byline": {
    en: "A project by Carel Pedre",
    fr: "Un projet de Carel Pedre",
    ht: "Un projet de Carel Pedre",
  },
  "share.metaText": {
    en: "{name} · Haiti at the 2026 World Cup 🇭🇹",
    fr: "{name} · Haïti à la Coupe du Monde 2026 🇭🇹",
    ht: "{name} · Haïti à la Coupe du Monde 2026 🇭🇹",
  },

  // ─── RECENT TOP SCORERS (Phase 2 content) ────────────────────────────
  "topScorers.title": {
    en: "Recent top scorers",
    fr: "Top buteurs récents",
    ht: "Top buteurs récents",
  },
  "topScorers.sinceYear": {
    en: "Capped since {year}",
    fr: "En sélection depuis {year}",
    ht: "En sélection depuis {year}",
  },
  "topScorers.recentWindow": {
    en: "Recent window",
    fr: "Fenêtre récente",
    ht: "Fenêtre récente",
  },
  "topScorers.matchesCount": {
    en: "{n} matches",
    fr: "{n} matchs",
    ht: "{n} matchs",
  },
  "topScorers.note": {
    en: "Recent totals, excluding career stats.",
    fr: "Totaux récents, hors statistiques de carrière.",
    ht: "Totaux récents, hors statistiques de carrière.",
  },
  "topScorers.goalSingular": {
    en: "goal",
    fr: "but",
    ht: "but",
  },
  "topScorers.goalPlural": {
    en: "goals",
    fr: "buts",
    ht: "buts",
  },
  "topScorers.assistSingular": {
    en: "assist",
    fr: "passe déc.",
    ht: "passe déc.",
  },
  "topScorers.assistPlural": {
    en: "assists",
    fr: "passes déc.",
    ht: "passes déc.",
  },
  "topScorers.capSingular": {
    en: "cap",
    fr: "sélection",
    ht: "sélection",
  },
  "topScorers.capPlural": {
    en: "caps",
    fr: "sélections",
    ht: "sélections",
  },

  // ─── HOMEPAGE: ROUTE MONDIAL + FAN WALL (Phase 2) ────────────────────
  "home.routeTitle": {
    en: "The World Cup begins.",
    fr: "Le Mondial commence.",
    ht: "Mondyal la kòmanse.",
  },
  "home.fanwall.title": {
    en: "The fan wall.",
    fr: "Le mur des supporters.",
    ht: "Miray sipòtè yo.",
  },
  "home.fanwall.subtitle": {
    en: "Messages from Haiti and the diaspora, from all over the world, for the team.",
    fr: "Des messages d'Haïti et de la diaspora, du monde entier, pour la sélection.",
    ht: "Mesaj soti Ayiti ak dyaspora a, soti toupatou nan mond lan, pou seleksyon an.",
  },
  "home.fanwall.leaveCta": {
    en: "Leave a message",
    fr: "Laisser un message",
    ht: "Kite yon mesaj",
  },
  "home.fanwall.viewCta": {
    en: "See the wall",
    fr: "Voir le mur",
    ht: "Gade miray la",
  },
  "home.fanwall.empty": {
    en: "Be the first to leave a message for the Grenadiers.",
    fr: "Soyez le premier à laisser un message pour Les Grenadiers.",
    ht: "Se ou ki pou premye moun ki kite yon mesaj pou Grenadye yo.",
  },
  "wall.message": {
    en: "message",
    fr: "message",
    ht: "message",
  },
  "wall.messages": {
    en: "messages",
    fr: "messages",
    ht: "messages",
  },
  "wall.from": {
    en: "from",
    fr: "de",
    ht: "de",
  },
  "wall.country": {
    en: "country",
    fr: "pays",
    ht: "pays",
  },
  "wall.countries": {
    en: "countries",
    fr: "pays",
    ht: "pays",
  },

  // ─── NEWSLETTER (Le Brief Grenadier) Phase 2 ─────────────────────────
  "newsletter.eyebrow": {
    en: "The Grenadier Brief",
    fr: "Le Brief Grenadier",
    ht: "Brief Grenadye a",
  },
  "newsletter.heroTitle": {
    en: "One email before each match. One after. Nothing more.",
    fr: "Un e-mail avant chaque match. Un après. Rien de plus.",
    ht: "Yon imèl anvan chak match. Yon lòt apre. Anyen anplis.",
  },
  "newsletter.heroSubtitle": {
    en: "The Grenadiers newsletter, in French.",
    fr: "La newsletter des Grenadiers, en français.",
    ht: "Bilten Grenadye yo, an franse.",
  },
  "newsletter.footerTitle": {
    en: "One email per match. That's it.",
    fr: "Un e-mail par match. C'est tout.",
    ht: "Yon imèl pou chak match. Se sa.",
  },
  "newsletter.footerSubtitle": {
    en: "Get a short recap before and after each Haiti match.",
    fr: "Recevez un court résumé avant et après chaque rencontre d'Haïti.",
    ht: "Resevwa yon ti rezime anvan ak apre chak match Ayiti.",
  },
  "newsletter.placeholder": {
    en: "you@email.com",
    fr: "votre@email.com",
    ht: "imel.ou@egzanp.com",
  },
  "newsletter.submit": {
    en: "Subscribe",
    fr: "S'abonner",
    ht: "Abòne",
  },
  "newsletter.success": {
    en: "✓ You're in. Welcome to the Grenadier Brief.",
    fr: "✓ Inscription confirmée. Bienvenue au Brief Grenadier.",
    ht: "✓ Enskripsyon konfime. Byenveni nan Brief Grenadye a.",
  },
  "newsletter.invalidEmail": {
    en: "Please enter a valid email address.",
    fr: "Veuillez saisir une adresse e-mail valide.",
    ht: "Tanpri antre yon adrès imèl ki valab.",
  },
  "newsletter.generic": {
    en: "Something went wrong. Please try again.",
    fr: "Une erreur est survenue. Veuillez réessayer.",
    ht: "Gen yon erè ki rive. Tanpri eseye ankò.",
  },
  "newsletter.emailAria": {
    en: "Email address",
    fr: "Adresse e-mail",
    ht: "Adrès imèl",
  },

  // ─── FEDERATION: team-category tags (Phase 2) ────────────────────────
  "federation.team.institution": {
    en: "Institution",
    fr: "Institution",
    ht: "Enstitisyon",
  },
  "federation.team.menA": {
    en: "Men A",
    fr: "Hommes A",
    ht: "Gason A",
  },
  "federation.team.womenA": {
    en: "Women A",
    fr: "Femmes A",
    ht: "Fanm A",
  },
  "federation.team.menU17": {
    en: "Men U-17",
    fr: "Hommes U-17",
    ht: "Gason U-17",
  },
  "federation.team.menU20": {
    en: "Men U-20",
    fr: "Hommes U-20",
    ht: "Gason U-20",
  },
  "federation.team.womenU20": {
    en: "Women U-20",
    fr: "Femmes U-20",
    ht: "Fanm U-20",
  },
  "federation.team.womenU17": {
    en: "Women U-17",
    fr: "Femmes U-17",
    ht: "Fanm U-17",
  },

  // ─── STORIES (additions) ─────────────────────────────────────────────
  "stories.eyebrow": {
    en: "Stories",
    fr: "Histoires",
    ht: "Istwa",
  },
  "stories.title": {
    en: "The stories.",
    fr: "Les histoires.",
    ht: "Istwa yo.",
  },
  "stories.subtitle": {
    en: "Long-form features on the coach, the choices, the tactics, the people. Written for the moment.",
    fr: "Articles approfondis sur le coach, les choix, la tactique, les gens. Écrits pour l'occasion.",
    ht: "Atik long sou kòch la, chwa yo, taktik yo, moun yo. Ekri pou moman sa a.",
  },

  // ─── HISTORY 1974 (additions) ────────────────────────────────────────
  "history.h2.theGoal": {
    en: "The goal.",
    fr: "Le but.",
    ht: "Gòl la.",
  },
  "history.h2.theMen": {
    en: "The men who made it.",
    fr: "Les hommes qui l'ont fait.",
    ht: "Mesye ki te fè sa.",
  },
  "history.h2.fiftyTwoYears": {
    en: "52 years.",
    fr: "52 ans.",
    ht: "52 ane.",
  },

  // ─── FEDERATION (additions) ──────────────────────────────────────────
  "federation.eyebrow": {
    en: "The Federation",
    fr: "La Fédération",
    ht: "Federasyon an",
  },
  "federation.title": {
    en: "Fédération Haïtienne de Football.",
    fr: "Fédération Haïtienne de Football.",
    ht: "Federasyon Foutbòl Ayisyen.",
  },
  "federation.subtitle": {
    en: "Founded 1904. FIFA member since 1934. Founding member of CONCACAF, 1961. The institution that carries Haiti's football identity.",
    fr: "Fondée en 1904. Membre de la FIFA depuis 1934. Membre fondateur de la CONCACAF, 1961. L'institution qui porte l'identité du football haïtien.",
    ht: "Fonde an 1904. Manm FIFA depi 1934. Manm fondatè CONCACAF, 1961. Enstitisyon ki pote idantite foutbòl Ayisyen an.",
  },

  // ─── FEDERATION PAGE (Phase 2 additions) ─────────────────────────────
  "federation.logoAlt": {
    en: "Crest of the Haitian Football Federation",
    fr: "Écusson de la Fédération Haïtienne de Football",
    ht: "Ekison Federasyon Ayisyen Foutbòl la",
  },
  "federation.governingBody": {
    en: "The governing body",
    fr: "L'instance dirigeante",
    ht: "Enstans dirijan an",
  },
  "federation.identityLine": {
    en: "Founded in {founded}. Headquartered in {hq}. A FIFA member since {fifa}, a founding member of CONCACAF since {concacaf}.",
    fr: "Fondée en {founded}. Siège à {hq}. Membre de la FIFA depuis {fifa}, membre fondateur de la CONCACAF depuis {concacaf}.",
    ht: "Fonde an {founded}. Syèj li nan {hq}. Manm FIFA depi {fifa}, manm fondatè CONCACAF depi {concacaf}.",
  },
  "federation.statFounded": {
    en: "Founded",
    fr: "Fondation",
    ht: "Fondasyon",
  },
  "federation.statYears": {
    en: "Years of existence",
    fr: "Années d'existence",
    ht: "Ane depi li egziste",
  },
  "federation.statFifaMember": {
    en: "FIFA member",
    fr: "Membre FIFA",
    ht: "Manm FIFA",
  },
  "federation.newsEyebrow": {
    en: "Top story · May 31, 2026",
    fr: "À la une · 31 mai 2026",
    ht: "Aktyalite · 31 me 2026",
  },
  "federation.newsTitle": {
    en: "FHF's new statutes adopted unanimously.",
    fr: "Adoption à l'unanimité des nouveaux statuts de la FHF.",
    ht: "Yo adopte nouvo estati FHF yo alinanimite.",
  },
  "federation.newsBody1": {
    en: "Meeting in special congress, twenty delegates representing the men's and women's clubs and the leagues unanimously adopted the new statutes of the Haitian Football Federation. These statutes, the result of several years of work between the FHF and the figures of Haitian football, give the institution a new legal foundation.",
    fr: "Réunis en congrès extraordinaire, vingt délégués représentant les clubs masculins, féminins et les ligues ont adopté à l'unanimité les nouveaux statuts de la Fédération Haïtienne de Football. Ces statuts, fruit de plusieurs années de travail entre la FHF et les acteurs du mouvement footballistique haïtien, dotent l'institution d'une nouvelle fondation légale.",
    ht: "Reyini nan yon kongrè ekstraòdinè, ven delege ki reprezante klèb gason, klèb fanm ak lig yo adopte nouvo estati Federasyon Ayisyen Foutbòl la alinanimite. Estati sa yo, ki se rezilta plizyè ane travay ant FHF ak aktè mouvman foutbòl ayisyen an, bay enstitisyon an yon nouvo fondasyon legal.",
  },
  "federation.newsBody2": {
    en: "The session was held under the supervision of the Normalization Committee (Yvon Sévère and Gally Amazan) and FIFA representatives: Ms. Salomé Tally, online, and Mr. Belval Juventino, present in Port-au-Prince. Adopting these statutes was among the main objectives FIFA had assigned to the Normalization Committee.",
    fr: "La session s'est tenue sous la supervision du Comité de Normalisation (Yvon Sévère et Gally Amazan) et des représentants de la FIFA : Mme Salomé Tally, en ligne, et M. Belval Juventino, présent à Port-au-Prince. L'adoption de ces statuts figurait parmi les principaux objectifs confiés au Comité de Normalisation par la FIFA.",
    ht: "Sesyon an te fèt anba sipèvizyon Komite Nòmalizasyon an (Yvon Sévère ak Gally Amazan) ak reprezantan FIFA yo : Madan Salomé Tally, an liy, ak Mesye Belval Juventino, ki te prezan nan Pòtoprens. Adopsyon estati sa yo te pami pi gwo objektif FIFA te bay Komite Nòmalizasyon an.",
  },
  "federation.pioneer": {
    en: "The pioneer · 1904",
    fr: "Le pionnier · 1904",
    ht: "Pyonye a · 1904",
  },
  "federation.currentLeadership": {
    en: "Current leadership",
    fr: "La direction actuelle",
    ht: "Direksyon aktyèl la",
  },
  "federation.inOffice": {
    en: "In office · Since {since}",
    fr: "En fonction · Depuis le {since}",
    ht: "An fonksyon · Depi {since}",
  },
  "federation.keyMoments": {
    en: "Key moments",
    fr: "Moments clés",
    ht: "Moman kle yo",
  },
  "federation.restOfCommittee": {
    en: "And the rest of the committee",
    fr: "Et le reste du comité",
    ht: "Ak rès komite a",
  },
  "federation.homeStadiumEyebrow": {
    en: "The home ground",
    fr: "Le stade fétiche",
    ht: "Estad fetich la",
  },
  "federation.competitionsTitle": {
    en: "Competitions organized by the FHF",
    fr: "Les compétitions organisées par la FHF",
    ht: "Konpetisyon FHF òganize yo",
  },
  "federation.timelineTitle": {
    en: "Timeline",
    fr: "Chronologie",
    ht: "Kronoloji",
  },
  "federation.timelineSubtext": {
    en: "Men's and women's national teams, plus youth levels: the FHF's milestones.",
    fr: "Sélection nationale masculine, féminine, et catégories de jeunes : les jalons de la FHF.",
    ht: "Seleksyon nasyonal gason, fanm, ak kategori jèn yo : gwo etap FHF yo.",
  },
  "federation.visitSite": {
    en: "Visit the official FHF website",
    fr: "Visiter le site officiel de la FHF",
    ht: "Vizite sit ofisyèl FHF la",
  },

  // ─── COVERAGE / L'HOMMAGE ────────────────────────────────────────────
  "coverage.eyebrow": {
    en: "A community standing with the team",
    fr: "Une communauté qui porte la sélection",
    ht: "Yon kominote ki dèyè seleksyon an",
  },
  "coverage.title": {
    en: "Thank you, artists.",
    fr: "Merci aux artistes.",
    ht: "Mèsi atis yo.",
  },
  "coverage.subtitle": {
    en: "The Haitian Football Federation and Les Grenadiers acknowledge the artists, musicians, photographers, documentary makers, and journalists rallying around the team on the road to the 2026 World Cup.",
    fr: "La Fédération Haïtienne de Football et Les Grenadiers saluent les artistes, musiciens, photographes, documentaristes et journalistes qui accompagnent la sélection sur la route du Mondial 2026.",
    ht: "Federasyon Foutbòl Ayisyen ak Grenadye yo salye atis, mizisyen, fotograf, dokimantè ak jounalis k ap akonpaye seleksyon an sou wout Mondyal 2026 la.",
  },

  // ─── INTERVIEWS ──────────────────────────────────────────────────────
  "interviews.eyebrow": {
    en: "Interviews",
    fr: "Entrevues",
    ht: "Entèvyou",
  },
  "interviews.title": {
    en: "In their own words.",
    fr: "Dans leurs propres mots.",
    ht: "Nan pwòp pawòl yo.",
  },
  "interviews.subtitle": {
    en: "Conversations with the players, the coaches, the families behind Haiti's return to the World Cup.",
    fr: "Conversations avec les joueurs, les coachs, les familles derrière le retour d'Haïti à la Coupe du Monde.",
    ht: "Konvèsasyon ak jwè yo, kòch yo, fanmi yo ki dèyè retou Ayiti nan World Cup la.",
  },

  // ─── ATLAS ───────────────────────────────────────────────────────────
  "atlas.eyebrow": {
    en: "The Atlas",
    fr: "L'Atlas",
    ht: "Atlas la",
  },
  "atlas.title": {
    en: "Where the squad lives.",
    fr: "Où vit l'effectif.",
    ht: "Kote ekip la abite.",
  },
  "atlas.subtitle": {
    en: "26 players. 15 club countries. From Iran to Ecuador, Switzerland to Slovakia, the United States to Haiti itself. The diaspora made visible on the map.",
    fr: "26 joueurs. 15 pays de clubs. De l'Iran à l'Équateur, de la Suisse à la Slovaquie, des États-Unis à Haïti même. La diaspora rendue visible sur la carte.",
    ht: "26 jwè. 15 peyi klèb. Soti nan Iran jiska Ekwatè, Swis jiska Slovaki, Etazini jiska Ayiti li menm. Dyaspora a vizib sou kat la.",
  },

  // ─── Héros du compte à rebours (CountdownHero) · ht = placeholder fr ──
  "hero.overline.next": { en: "NEXT MATCH", fr: "PROCHAIN MATCH", ht: "PWOCHEN MATCH" },
  "hero.overline.matchday": { en: "MATCHDAY 🇭🇹", fr: "JOU A RIVE 🇭🇹", ht: "JOU A RIVE 🇭🇹" },
  "hero.live": { en: "Match in progress", fr: "Match en cours", ht: "Match ap jwe" },
  "hero.qualifDate": { en: "November 18, 2025", fr: "18 novembre 2025", ht: "18 novanm 2025" },
  "hero.daysCount": { en: "{n} days", fr: "{n} jours", ht: "{n} jou" },
  "hero.story.pre": {
    en: "On {date}, Haiti booked its ticket to the World Cup. {days} later, the wait is almost over.",
    fr: "Le {date}, Haïti décrochait son billet pour le Mondial. {days} plus tard, l'attente touche à sa fin.",
    ht: "{date}, Ayiti te pran tikè li pou Mondyal la. {days} apre, tann nan prèske fini.",
  },
  "hero.story.matchday": {
    en: "On {date}, a whole nation dreamed of this day. Now it is here.",
    fr: "Le {date}, tout un peuple rêvait de ce jour. Il est arrivé.",
    ht: "{date}, tout yon pèp t ap reve jou sa a. Li rive.",
  },
  "hero.story.live": {
    en: "{days} after qualifying, the Grenadiers are finally on the pitch.",
    fr: "{days} après la qualification, les Grenadiers sont enfin sur le terrain.",
    ht: "{days} apre kalifikasyon an, Grenadye yo anfen sou teren an.",
  },
  "hero.kickoff": { en: "Kick-off", fr: "Coup d'envoi", ht: "Lè match la kòmanse" },
  "hero.localTime": { en: "your local time", fr: "votre heure locale", ht: "lè lakay ou" },
  "hero.fullSchedule": { en: "Full schedule", fr: "Calendrier complet", ht: "Pwogram konplè a" },
  "hero.followMatch": { en: "Follow the match", fr: "Suivre le match", ht: "Swiv match la" },
  "hero.farewell.eyebrow": { en: "FIFA World Cup 2026", fr: "Coupe du Monde 2026", ht: "Koup di Mond 2026" },
  "hero.farewell.title": { en: "Thank you, Grenadiers 🇭🇹", fr: "Mèsi Grenadye 🇭🇹", ht: "Mèsi Grenadye 🇭🇹" },
  "hero.farewell.body": {
    en: "Three matches. One flag. A pride that never fades.",
    fr: "Trois matchs. Un seul drapeau. Une fierté qui ne s'éteint pas.",
    ht: "Twa match. Yon sèl drapo. Yon fyète ki pa janm etenn.",
  },
  "hero.farewell.cta": { en: "Relive the adventure", fr: "Revivre l'aventure", ht: "Reviv avanti a" },

  // ─── Accueil · partagé / poster (Home) · ht = placeholder fr ──
  "home.squadPhotoAlt": {
    en: "Haiti's team for the 2026 FIFA World Cup",
    fr: "L'équipe d'Haïti pour la Coupe du Monde 2026",
    ht: "Ekip Ayiti a pou Koup di Mond 2026 la",
  },
  "home.poster.ariaOpen": {
    en: "View the team poster full size",
    fr: "Voir le poster de l'équipe en grand",
    ht: "Gade gwo pòtre ekip la",
  },

  // ─── Accueil · cartes d'appel à l'action ──
  "home.cta.murTitle": {
    en: "Post your message before kickoff",
    fr: "Envoyez votre message avant le coup d'envoi",
    ht: "Voye mesaj ou anvan match la",
  },
  "home.cta.murAction": { en: "Sign the wall", fr: "Signer le mur", ht: "Siyen miray la" },
  "home.cta.journalTitle": {
    en: "Follow the Grenadiers day by day",
    fr: "Suivez les Grenadiers jour après jour",
    ht: "Swiv Grenadye yo jou apre jou",
  },
  "home.cta.journalAction": { en: "Read the stories", fr: "Lire les chroniques", ht: "Li kwonik yo" },

  // ─── Accueil · galerie des supporters ──
  "home.gallery.eyebrow": { en: "Supporter photos", fr: "Photos des supporters", ht: "Foto sipòtè yo" },
  "home.gallery.title": { en: "The supporters' gallery.", fr: "La galerie des supporters.", ht: "Galri sipòtè yo." },
  "home.gallery.subtitle": {
    en: "The Grenadiers seen by their people: at the stadium, at watch parties, and at home. Show us how you live the World Cup.",
    fr: "Les Grenadiers vus par leur peuple : au stade, en watch party et à la maison. Montre comment tu vis le Mondial.",
    ht: "Grenadye yo jan pèp yo wè yo : nan estad la, nan watch party ak lakay. Montre kijan w ap viv Mondyal la.",
  },
  "home.gallery.viewLink": {
    en: "See the supporters' gallery",
    fr: "Voir la galerie des supporters",
    ht: "Gade galri sipòtè yo",
  },
  "home.gallery.shareCta": { en: "Share your photo", fr: "Partage ta photo", ht: "Pataje foto ou" },
  "home.gallery.viewAllCta": { en: "See the full gallery", fr: "Voir toute la galerie", ht: "Gade tout galri a" },
  "home.gallery.photoAlt": { en: "Supporter photo", fr: "Photo de supporter", ht: "Foto yon sipòtè" },
  "home.gallery.matchScotland": { en: "vs Scotland", fr: "vs Écosse", ht: "vs Eskòs" },
  "home.gallery.matchBrazil": { en: "vs Brazil", fr: "vs Brésil", ht: "vs Brezil" },
  "home.gallery.matchMorocco": { en: "vs Morocco", fr: "vs Maroc", ht: "vs Mawòk" },
  "home.gallery.ctxStadium": { en: "At the stadium", fr: "Au stade", ht: "Nan estad la" },
  "home.gallery.ctxWatch": { en: "Watch party", fr: "Watch party", ht: "Watch party" },
  "home.gallery.ctxHome": { en: "At home", fr: "À la maison", ht: "Lakay" },

  // ─── Accueil · Journal ──
  "home.journal.title": { en: "The team, day by day.", fr: "La sélection, jour après jour.", ht: "Seleksyon an, jou apre jou." },
  "home.journal.allLink": { en: "All stories", fr: "Toutes les chroniques", ht: "Tout kwonik yo" },
  "home.journal.readCta": { en: "Read the story", fr: "Lire la chronique", ht: "Li kwonik la" },

  // ─── Accueil · 1974 (Munich) · ht = placeholder fr ──
  "home.munich.eyebrow": { en: "1974 · West Germany", fr: "1974 · Allemagne de l'Ouest", ht: "1974 · Almay Lwès" },
  "home.munich.title1": { en: "The men who", fr: "Les hommes qui ont", ht: "Mesye ki te" },
  "home.munich.title2": { en: "opened the road.", fr: "ouvert la route.", ht: "louvri wout la." },
  "home.munich.body1": {
    en: "On June 15, 1974, in Munich, 53,000 fans watched a Caribbean side take on Italy. Henri Françillon held the Azzurri in the first half. Then Manno Sanon opened the scoring, the first goal Dino Zoff had conceded in",
    fr: "Le 15 juin 1974, à Munich, 53 000 spectateurs voient une équipe caribéenne défier l'Italie. Henri Françillon tient les Azzurri en échec en première période. Puis Manno Sanon ouvre le score, premier but encaissé par Dino Zoff depuis",
    ht: "15 jen 1974, nan Munich, 53 000 espektatè wè yon ekip karayibeyen defye Itali. Henri Françillon kenbe Azzurri yo an echèk nan premye peryòd la. Apre sa Manno Sanon louvri make a, premye gòl Dino Zoff pran depi",
  },
  "home.munich.minutes": { en: "minutes.", fr: "minutes.", ht: "minutes." },
  "home.munich.body2": {
    en: "Twenty-two Haitians. Three matches. The road that leads all the way to 2026.",
    fr: "Vingt-deux Haïtiens. Trois matchs. La route qui mène jusqu'en 2026.",
    ht: "Vennde Ayisyen. Twa match. Wout ki mennen jiska 2026 la.",
  },
  "home.munich.cta": { en: "Read the full story", fr: "Lire le récit complet", ht: "Li tout istwa a" },

  // ─── Mise en page (Layout) · ht = placeholder fr ──
  "layout.skipToContent": { en: "Skip to content", fr: "Aller au contenu", ht: "Ale nan kontni an" },
  "layout.supportersMenu": { en: "Supporters", fr: "Espace Supporters", ht: "Espas Sipòtè" },
  "layout.shareTitle": {
    en: "Grenadiers 2026 · Haiti at the 2026 World Cup",
    fr: "Grenadiers 2026 · Haïti à la Coupe du Monde 2026",
    ht: "Grenadiers 2026 · Ayiti nan Koup di Mond 2026",
  },
  "layout.language": { en: "Language", fr: "Langue", ht: "Lang" },
  "layout.footer.tagline": {
    en: "FIFA World Cup 2026",
    fr: "Coupe du Monde de la FIFA 2026",
    ht: "Koup di Mond FIFA 2026",
  },
  "layout.footer.mediaTitle": { en: "For media", fr: "Pour les médias", ht: "Pou medya yo" },
  "layout.footer.aboutSite": { en: "About this site", fr: "À propos de ce site", ht: "Apropo sit sa a" },
  "layout.footer.contact": { en: "Contact us", fr: "Nous contacter", ht: "Kontakte nou" },

  // ─── Accessibilité ──
  "a11y.close": { en: "Close", fr: "Fermer", ht: "Fermer" },

  // ─── Communs (chunk 2) · ht = placeholder fr ──
  // (common.loading existe déjà plus haut, avec un vrai ht : on le réutilise.)
  "common.delete": { en: "Delete", fr: "Supprimer", ht: "Supprimer" },
  "common.optional": { en: "(optional)", fr: "(facultatif)", ht: "(facultatif)" },

  // ─── Galerie des supporters (/galerie-supporters) ──
  "galerie.title": { en: "The supporters' gallery", fr: "La galerie des supporters", ht: "La galerie des supporters" },
  "galerie.subtitle": {
    en: "The Grenadiers seen by their people: at the stadium, at watch parties, and at home, all over the world.",
    fr: "Les Grenadiers vus par leur peuple : au stade, en watch party et à la maison, partout dans le monde.",
    ht: "Les Grenadiers vus par leur peuple : au stade, en watch party et à la maison, partout dans le monde.",
  },
  "galerie.filterMatch": { en: "Match", fr: "Match", ht: "Match" },
  "galerie.filterWhere": { en: "Where", fr: "Où", ht: "Où" },
  "galerie.error": {
    en: "The gallery is temporarily unavailable. Please try again later.",
    fr: "La galerie est momentanément indisponible. Réessaie plus tard.",
    ht: "La galerie est momentanément indisponible. Réessaie plus tard.",
  },
  "galerie.loadMore": { en: "See more", fr: "Voir plus", ht: "Voir plus" },
  "galerie.emptyTitle": { en: "No photos here yet.", fr: "Pas encore de photo ici.", ht: "Pas encore de photo ici." },
  "galerie.emptyBody": {
    en: "Be the first to show how you live the Grenadiers' World Cup.",
    fr: "Sois le premier à montrer comment tu vis le Mondial des Grenadiers.",
    ht: "Sois le premier à montrer comment tu vis le Mondial des Grenadiers.",
  },
  "galerie.emptyCta": { en: "Share your photo", fr: "Partager ta photo", ht: "Partager ta photo" },

  // ─── Page Média (/foto) ──
  "media.subtitle": {
    en: "The Grenadiers' road to the 2026 World Cup, in pictures.",
    fr: "La route des Grenadiers vers la Coupe du Monde 2026, en images.",
    ht: "La route des Grenadiers vers la Coupe du Monde 2026, en images.",
  },
  "media.tabPhotos": { en: "Photos", fr: "Photos", ht: "Photos" },
  "media.tabVideos": { en: "Videos", fr: "Vidéos", ht: "Vidéos" },
  "media.loadingAlbums": { en: "Loading albums…", fr: "Chargement des albums…", ht: "Chargement des albums…" },
  "media.loadingPhotos": { en: "Loading photos…", fr: "Chargement des photos…", ht: "Chargement des photos…" },
  "media.albumFallback": { en: "Album", fr: "Album", ht: "Album" },
  "media.videoFallback": { en: "Video", fr: "Vidéo", ht: "Vidéo" },
  "media.albumEmptyTitle": { en: "Coming soon in pictures", fr: "Bientôt en images", ht: "Bientôt en images" },
  "media.albumEmptyBody": {
    en: "No album yet. The first photos are coming very soon.",
    fr: "Aucun album pour le moment. Les premières photos arrivent très vite.",
    ht: "Aucun album pour le moment. Les premières photos arrivent très vite.",
  },
  "media.videoEmptyTitle": { en: "Coming soon in video", fr: "Bientôt en vidéos", ht: "Bientôt en vidéos" },
  "media.videoEmptyBody": {
    en: "No video yet. The first clips are coming very soon.",
    fr: "Aucune vidéo pour le moment. Les premiers clips arrivent très vite.",
    ht: "Aucune vidéo pour le moment. Les premiers clips arrivent très vite.",
  },
  "media.backToAlbums": { en: "All albums", fr: "Tous les albums", ht: "Tous les albums" },
  "media.photosBy": { en: "Photos:", fr: "Photos :", ht: "Photos :" },
  "media.albumEmpty": { en: "This album is empty for now.", fr: "Cet album est vide pour le moment.", ht: "Cet album est vide pour le moment." },
  "media.prevPhoto": { en: "Previous photo", fr: "Photo précédente", ht: "Photo précédente" },
  "media.nextPhoto": { en: "Next photo", fr: "Photo suivante", ht: "Photo suivante" },

  // ─── Cadre Grenadiers (CadreComposer + /cadre-grenadiers) ──
  "cadre.pageEyebrow": { en: "Grenadiers frame", fr: "Cadre Grenadiers", ht: "Cadre Grenadiers" },
  "cadre.pageTitle": { en: "Put your photo in the Grenadiers' colors", fr: "Mets ta photo aux couleurs des Grenadiers", ht: "Mets ta photo aux couleurs des Grenadiers" },
  "cadre.pageSubtitle": {
    en: "Pick a photo, add the Grenadiers 2026 frame, and share it on social. Everything happens on your device: nothing is sent or published.",
    fr: "Choisis une photo, ajoute le cadre Grenadiers 2026, et partage-la sur tes réseaux. Tout se passe sur ton appareil : rien n'est envoyé ni publié.",
    ht: "Choisis une photo, ajoute le cadre Grenadiers 2026, et partage-la sur tes réseaux. Tout se passe sur ton appareil : rien n'est envoyé ni publié.",
  },
  "cadre.errLoad": { en: "Could not load this photo. Please try again.", fr: "Impossible de charger cette photo. Réessaie.", ht: "Impossible de charger cette photo. Réessaie." },
  "cadre.errShare": { en: "Sharing failed. Please try again.", fr: "Le partage a échoué. Réessaie.", ht: "Le partage a échoué. Réessaie." },
  "cadre.changePhoto": { en: "Change photo", fr: "Changer la photo", ht: "Changer la photo" },
  "cadre.choosePhoto": { en: "Choose a photo", fr: "Choisir une photo", ht: "Choisir une photo" },
  "cadre.formatLabel": { en: "Format", fr: "Format", ht: "Format" },
  "cadre.matchLabel": { en: "Match (optional)", fr: "Match (facultatif)", ht: "Match (facultatif)" },
  "cadre.formatStory": { en: "Story 9:16", fr: "Story 9:16", ht: "Story 9:16" },
  "cadre.formatSquare": { en: "Square 1:1", fr: "Carré 1:1", ht: "Carré 1:1" },
  "cadre.preparing": { en: "Preparing…", fr: "Préparation…", ht: "Préparation…" },
  "cadre.shareButton": { en: "Share the frame", fr: "Partager le cadre", ht: "Partager le cadre" },
  "cadre.note": {
    en: "The frame is created on your device. Nothing is sent or published: share it wherever you like.",
    fr: "Le cadre est créé sur ton appareil. Rien n'est envoyé ni publié : tu le partages où tu veux.",
    ht: "Le cadre est créé sur ton appareil. Rien n'est envoyé ni publié : tu le partages où tu veux.",
  },

  // ─── Partage ta photo (/partager-ta-photo) ──
  "photo.statusPending": { en: "Pending", fr: "En attente", ht: "En attente" },
  "photo.statusApproved": { en: "Published", fr: "Publiée", ht: "Publiée" },
  "photo.statusRejected": { en: "Rejected", fr: "Refusée", ht: "Refusée" },
  "photo.errLimit": { en: "You already have 3 photos for this match. Delete one for this match.", fr: "Tu as déjà 3 photos pour ce match. Supprime-en une pour ce match.", ht: "Tu as déjà 3 photos pour ce match. Supprime-en une pour ce match." },
  "photo.errUpload": { en: "Upload failed. Check your connection and try again.", fr: "Le téléversement a échoué. Vérifie ta connexion et réessaie.", ht: "Le téléversement a échoué. Vérifie ta connexion et réessaie." },
  "photo.errInsert": { en: "Something went wrong while saving. Please try again.", fr: "Une erreur est survenue à l'enregistrement. Réessaie.", ht: "Une erreur est survenue à l'enregistrement. Réessaie." },
  "photo.errAuth": { en: "Your session has expired. Please sign in again.", fr: "Ta session a expiré. Reconnecte-toi.", ht: "Ta session a expiré. Reconnecte-toi." },
  "photo.errUnavailable": { en: "The service is temporarily unavailable.", fr: "Le service est momentanément indisponible.", ht: "Le service est momentanément indisponible." },
  "photo.errDefault": { en: "Something went wrong. Please try again.", fr: "Une erreur est survenue. Réessaie.", ht: "Une erreur est survenue. Réessaie." },
  "photo.pageSubtitle": {
    en: "Show how you live the Grenadiers' World Cup: at the stadium, at a watch party, or at home.",
    fr: "Montre comment tu vis la Coupe du Monde des Grenadiers : au stade, en watch party ou à la maison.",
    ht: "Montre comment tu vis la Coupe du Monde des Grenadiers : au stade, en watch party ou à la maison.",
  },
  "photo.howItWorks": { en: "How it works", fr: "Comment ça marche", ht: "Comment ça marche" },
  "photo.step1": { en: "Sign in with Google, Apple, or your email.", fr: "Connecte-toi avec Google, Apple ou ton e-mail.", ht: "Connecte-toi avec Google, Apple ou ton e-mail." },
  "photo.step2": { en: "Pick your photo, the match, and the context.", fr: "Choisis ta photo, le match et le contexte.", ht: "Choisis ta photo, le match et le contexte." },
  "photo.step3": { en: "Publish. Every photo is reviewed before it appears in the public gallery.", fr: "Publie. Chaque photo est validée avant d'apparaître dans la galerie publique.", ht: "Publie. Chaque photo est validée avant d'apparaître dans la galerie publique." },
  "photo.rulePre": { en: "You can post up to", fr: "Tu peux publier jusqu'à", ht: "Tu peux publier jusqu'à" },
  "photo.ruleBold": { en: "3 photos per match", fr: "3 photos par match", ht: "3 photos par match" },
  "photo.rulePost": {
    en: ". Signing in is only for posting: you can browse the whole site without an account.",
    fr: ". La connexion sert uniquement à publier : tu peux parcourir tout le site sans compte.",
    ht: ". La connexion sert uniquement à publier : tu peux parcourir tout le site sans compte.",
  },
  "photo.cadreLink": { en: "Share your photo with the Grenadiers frame", fr: "Partage ta photo avec le cadre Grenadiers", ht: "Partage ta photo avec le cadre Grenadiers" },
  "photo.authSendErr": { en: "Could not send. Check your email address and try again.", fr: "Envoi impossible. Vérifie ton adresse e-mail et réessaie.", ht: "Envoi impossible. Vérifie ton adresse e-mail et réessaie." },
  "photo.authCodeErr": { en: "Wrong or expired code. Request a new one.", fr: "Code incorrect ou expiré. Demande un nouveau code.", ht: "Code incorrect ou expiré. Demande un nouveau code." },
  "photo.authCodeSent": { en: "Code sent to {email}.", fr: "Code envoyé à {email}.", ht: "Code envoyé à {email}." },
  "photo.authTitle": { en: "Ready to post?", fr: "Prêt à publier ?", ht: "Prêt à publier ?" },
  "photo.authSubtitle": {
    en: "Sign in to add your photo. Nothing else is locked: the gallery and the whole site stay open.",
    fr: "Connecte-toi pour ajouter ta photo. Rien d'autre n'est verrouillé : la galerie et tout le site restent ouverts.",
    ht: "Connecte-toi pour ajouter ta photo. Rien d'autre n'est verrouillé : la galerie et tout le site restent ouverts.",
  },
  "photo.authGoogle": { en: "Continue with Google", fr: "Continuer avec Google", ht: "Continuer avec Google" },
  "photo.authApple": { en: "Continue with Apple", fr: "Continuer avec Apple", ht: "Continuer avec Apple" },
  "photo.authOr": { en: "or", fr: "ou", ht: "ou" },
  "photo.authEmailPlaceholder": { en: "you@email.com", fr: "ton@email.com", ht: "ton@email.com" },
  "photo.authSending": { en: "Sending…", fr: "Envoi…", ht: "Envoi…" },
  "photo.authSendCode": { en: "Get a code", fr: "Recevoir un code", ht: "Recevoir un code" },
  "photo.authEnterCode": { en: "Enter the 6 digit code sent to {email}.", fr: "Entre le code à 6 chiffres envoyé à {email}.", ht: "Entre le code à 6 chiffres envoyé à {email}." },
  "photo.authVerifying": { en: "Checking…", fr: "Validation…", ht: "Validation…" },
  "photo.authVerify": { en: "Verify", fr: "Valider", ht: "Valider" },
  "photo.authResend": { en: "Resend the code", fr: "Renvoyer le code", ht: "Renvoyer le code" },
  "photo.authChangeEmail": { en: "Change address", fr: "Changer d'adresse", ht: "Changer d'adresse" },
  "photo.signedInAs": { en: "Signed in as {name}", fr: "Connecté en tant que {name}", ht: "Connecté en tant que {name}" },
  "photo.signOut": { en: "Sign out", fr: "Se déconnecter", ht: "Se déconnecter" },
  "photo.supporterFallback": { en: "supporter", fr: "supporter", ht: "supporter" },
  "photo.change": { en: "Change", fr: "Changer", ht: "Changer" },
  "photo.addPhoto": { en: "Add your photo", fr: "Ajoute ta photo", ht: "Ajoute ta photo" },
  "photo.cameraOrGallery": { en: "Camera or gallery", fr: "Appareil photo ou galerie", ht: "Appareil photo ou galerie" },
  "photo.captionLabel": { en: "Caption", fr: "Légende", ht: "Légende" },
  "photo.captionPlaceholder": { en: "Write a caption…", fr: "Écris une légende…", ht: "Écris une légende…" },
  "photo.whichMatch": { en: "Which match?", fr: "Quel match ?", ht: "Quel match ?" },
  "photo.whereWatch": { en: "Where are you watching?", fr: "Tu regardes d'où ?", ht: "Tu regardes d'où ?" },
  "photo.locationWatch": { en: "Where are you watching the match?", fr: "Où regardes-tu le match ?", ht: "Où regardes-tu le match ?" },
  "photo.locationTaken": { en: "Where did you take this photo?", fr: "Où as-tu pris cette photo ?", ht: "Où as-tu pris cette photo ?" },
  "photo.locationPlaceholder": {
    en: "e.g. Boston, at Tonton's place, Pétion-Ville fan zone…",
    fr: "Ex : Boston, chez Tonton, fan zone de Pétion-Ville…",
    ht: "Ex : Boston, chez Tonton, fan zone de Pétion-Ville…",
  },
  "photo.matchFull": { en: "You already have 3 photos for this match. Delete one below for this match.", fr: "Tu as déjà 3 photos pour ce match. Supprime-en une ci-dessous pour ce match.", ht: "Tu as déjà 3 photos pour ce match. Supprime-en une ci-dessous pour ce match." },
  "photo.matchCount": { en: "{n} of {max} for this match.", fr: "{n} sur {max} pour ce match.", ht: "{n} sur {max} pour ce match." },
  "photo.publishing": { en: "Publishing…", fr: "Publication…", ht: "Publication…" },
  "photo.publish": { en: "Publish my photo", fr: "Publier ma photo", ht: "Publier ma photo" },
  "photo.uploadNote": {
    en: "Your photo goes through review before it appears in the gallery. GPS location is removed automatically.",
    fr: "Ta photo passe en validation avant d'apparaître dans la galerie. La position GPS est retirée automatiquement.",
    ht: "Ta photo passe en validation avant d'apparaître dans la galerie. La position GPS est retirée automatiquement.",
  },
  "photo.thanks": { en: "Thank you!", fr: "Merci !", ht: "Merci !" },
  "photo.thanksBody": {
    en: "Your photo is awaiting review. It will appear in the supporters' gallery once approved.",
    fr: "Ta photo est en attente de validation. Elle apparaîtra dans la galerie des supporters une fois approuvée.",
    ht: "Ta photo est en attente de validation. Elle apparaîtra dans la galerie des supporters une fois approuvée.",
  },
  "photo.postAnother": { en: "Post another photo", fr: "Publier une autre photo", ht: "Publier une autre photo" },
  "photo.whileWaiting": { en: "While you wait", fr: "En attendant", ht: "En attendant" },
  "photo.shareWithCadre": { en: "Share it now with the Grenadiers frame", fr: "Partage-la déjà avec le cadre Grenadiers", ht: "Partage-la déjà avec le cadre Grenadiers" },
  "photo.myPhotos": { en: "Your photos", fr: "Tes photos", ht: "Tes photos" },
  "photo.noneYet": { en: "You haven't posted a photo yet.", fr: "Tu n'as pas encore publié de photo.", ht: "Tu n'as pas encore publié de photo." },

  // ─── Téléversement photos (/foto/upload, protégé par mot de passe) ──
  "fotoup.errPassword": { en: "Wrong password.", fr: "Mot de passe incorrect.", ht: "Mot de passe incorrect." },
  "fotoup.errServerConfig": { en: "The service is not configured on the server side.", fr: "Le service n'est pas configuré côté serveur.", ht: "Le service n'est pas configuré côté serveur." },
  "fotoup.errConnection": { en: "Connection failed. Please try again.", fr: "Connexion impossible. Réessayez.", ht: "Connexion impossible. Réessayez." },
  "fotoup.errGeneric": { en: "Something went wrong. Please try again.", fr: "Une erreur est survenue. Réessayez.", ht: "Une erreur est survenue. Réessayez." },
  "fotoup.errProcessing": { en: "Image processing failed. Please try again.", fr: "Le traitement des images a échoué. Réessayez.", ht: "Le traitement des images a échoué. Réessayez." },
  "fotoup.docTitle": { en: "Upload · Photos", fr: "Téléversement · Photos", ht: "Téléversement · Photos" },
  "fotoup.needPassword": { en: "Enter the password at the top of the page.", fr: "Entrez le mot de passe en haut de la page.", ht: "Entrez le mot de passe en haut de la page." },
  "fotoup.noChanges": { en: "No changes.", fr: "Aucune modification.", ht: "Aucune modification." },
  "fotoup.albumUpdated": { en: 'Album "{name}" updated.', fr: "Album « {name} » mis à jour.", ht: "Album « {name} » mis à jour." },
  "fotoup.confirmDeleteAlbum": { en: 'Delete the album "{name}" and all its photos?', fr: "Supprimer l'album « {name} » et toutes ses photos ?", ht: "Supprimer l'album « {name} » et toutes ses photos ?" },
  "fotoup.albumDeleted": { en: 'Album "{name}" deleted.', fr: "Album « {name} » supprimé.", ht: "Album « {name} » supprimé." },
  "fotoup.confirmDeletePhoto": { en: "Delete this photo?", fr: "Supprimer cette photo ?", ht: "Supprimer cette photo ?" },
  "fotoup.photoDeleted": { en: "Photo deleted.", fr: "Photo supprimée.", ht: "Photo supprimée." },
  "fotoup.coverUpdated": { en: "Cover updated.", fr: "Couverture mise à jour.", ht: "Couverture mise à jour." },
  "fotoup.eyebrow": { en: "Private area", fr: "Espace privé", ht: "Espace privé" },
  "fotoup.title": { en: "Upload photos", fr: "Téléverser des photos", ht: "Téléverser des photos" },
  "fotoup.subtitle": {
    en: "Add photos to the gallery. Images are optimized automatically before upload.",
    fr: "Ajoutez des photos à la galerie. Les images sont optimisées automatiquement avant l'envoi.",
    ht: "Ajoutez des photos à la galerie. Les images sont optimisées automatiquement avant l'envoi.",
  },
  "fotoup.unavailable": { en: "Service unavailable.", fr: "Service indisponible.", ht: "Service indisponible." },
  "fotoup.password": { en: "Password", fr: "Mot de passe", ht: "Mot de passe" },
  "fotoup.albumField": { en: "Album", fr: "Album", ht: "Album" },
  "fotoup.newAlbum": { en: "New album", fr: "Nouvel album", ht: "Nouvel album" },
  "fotoup.newAlbumPlaceholder": { en: "Album name (e.g. Haiti vs Peru)", fr: "Nom de l'album (ex. Haïti vs Pérou)", ht: "Nom de l'album (ex. Haïti vs Pérou)" },
  "fotoup.eventDate": { en: "Event date", fr: "Date de l'événement", ht: "Date de l'événement" },
  "fotoup.creditLabel": { en: "Photo credit", fr: "Crédit photo", ht: "Crédit photo" },
  "fotoup.creditPlaceholder": { en: "e.g. Hans Frandjy Darius", fr: "ex. Hans Frandjy Darius", ht: "ex. Hans Frandjy Darius" },
  "fotoup.photosLabel": { en: "Photos", fr: "Photos", ht: "Photos" },
  "fotoup.upload": { en: "Upload", fr: "Téléverser", ht: "Téléverser" },
  "fotoup.uploadingProgress": { en: "Uploading… {done}/{total}", fr: "Envoi… {done}/{total}", ht: "Envoi… {done}/{total}" },
  "fotoup.viewAlbum": { en: "View the album", fr: "Voir l'album", ht: "Voir l'album" },
  "fotoup.manageTitle": { en: "Manage albums", fr: "Gérer les albums", ht: "Gérer les albums" },
  "fotoup.manageHint": {
    en: "Rename, date, credit, or delete an album. The password above is required.",
    fr: "Renommez, datez, créditez ou supprimez un album. Le mot de passe ci-dessus est requis.",
    ht: "Renommez, datez, créditez ou supprimez un album. Le mot de passe ci-dessus est requis.",
  },
  "fotoup.noAlbums": { en: "No album yet.", fr: "Aucun album pour le moment.", ht: "Aucun album pour le moment." },
  "fotoup.albumNamePlaceholder": { en: "Album name", fr: "Nom de l'album", ht: "Nom de l'album" },
  "fotoup.descPlaceholder": {
    en: "Description (bio). First line: Position · Club, then a blank line, then the text.",
    fr: "Description (bio). 1re ligne : Poste · Club, puis une ligne vide, puis le texte.",
    ht: "Description (bio). 1re ligne : Poste · Club, puis une ligne vide, puis le texte.",
  },
  "fotoup.save": { en: "Save", fr: "Enregistrer", ht: "Enregistrer" },
  "fotoup.showPhotos": { en: "Show photos", fr: "Voir les photos", ht: "Voir les photos" },
  "fotoup.hidePhotos": { en: "Hide photos", fr: "Masquer les photos", ht: "Masquer les photos" },
  "fotoup.noPhotos": { en: "No photos.", fr: "Aucune photo.", ht: "Aucune photo." },
  "fotoup.deletePhotoAria": { en: "Delete this photo", fr: "Supprimer cette photo", ht: "Supprimer cette photo" },
  "fotoup.setCoverAria": { en: "Set as cover", fr: "Définir comme couverture", ht: "Définir comme couverture" },
  "fotoup.currentCover": { en: "Current cover", fr: "Couverture actuelle", ht: "Couverture actuelle" },
  "fotoup.cover": { en: "Cover", fr: "Couverture", ht: "Couverture" },
};

// ─── LOOKUP HELPER ───────────────────────────────────────────────────
// Usage: t("home.title", "en") → "Haiti is back."
// Falls back to English if the key/lang is missing.
export function t(key, lang = "en") {
  const entry = dict[key];
  if (!entry) {
    // Missing key — return the key itself as a visible warning in dev
    if (typeof window !== "undefined" && window.location.hostname === "localhost") {
      console.warn(`[i18n] Missing key: ${key}`);
    }
    return key;
  }
  return entry[lang] || entry.en || key;
}

export default dict;
