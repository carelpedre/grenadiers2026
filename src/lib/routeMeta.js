// ╔══════════════════════════════════════════════════════════════════╗
// ║  routeMeta — SINGLE SOURCE OF TRUTH for per-route head metadata.    ║
// ║                                                                    ║
// ║  Imported by BOTH:                                                  ║
// ║   • the build-time prerender (scripts/generate-route-html.mjs),     ║
// ║     which writes static <title>/OG tags per route for crawlers, and ║
// ║   • the runtime head updater (src/components/RouteHead.jsx), which   ║
// ║     keeps document.title + meta in sync on client-side navigation.  ║
// ║                                                                    ║
// ║  Keep titles/descriptions here only. Do not duplicate them.        ║
// ╚══════════════════════════════════════════════════════════════════╝

export const BASE = "https://grenadiers2026.com";
export const SITE_NAME = "Grenadiers 2026";
export const DEFAULT_IMAGE = "/og/grenadiers-og.jpg";
export const DEFAULT_TITLE = "Grenadiers 2026 — Haïti à la Coupe du Monde FIFA";
export const DEFAULT_DESCRIPTION =
  "Site indépendant et non-officiel sur les Grenadiers à la Coupe du Monde de la FIFA 2026, conçu et développé par Carel Pedre.";

export const ROUTES = [
  {
    path: "/",
    file: "index.html", // homepage = root index, we update it in place
    title: "Les Grenadiers sont de retour — Haïti à la Coupe du Monde FIFA 2026",
    description: "Pour la première fois depuis 1974, Haïti retrouve la Coupe du Monde de la FIFA. Brésil. Écosse. Maroc. Un groupe, une nation, une histoire.",
    // og-home image not yet in public/og/ — keep the default until it ships.
    image: DEFAULT_IMAGE,
    imageAlt: "Les Grenadiers d'Haïti à la Coupe du Monde 2026",
  },
  {
    path: "/squad",
    title: "La sélection — Haïti à la Coupe du Monde FIFA 2026",
    description: "Vingt-six joueurs, une nation. La liste de Sébastien Migné pour la première Coupe du Monde d'Haïti depuis 52 ans.",
    image: "/og/og-effectif.jpg",
    imageAlt: "L'effectif des Grenadiers pour le Mondial 2026",
  },
  {
    path: "/matches",
    title: "Calendrier · Groupe C — Brésil, Écosse, Maroc",
    description: "Trois affiches, trois villes américaines. Foxborough · Inglewood · Atlanta.",
    image: "/og/og-matches.jpg",
    imageAlt: "Le calendrier et les résultats des Grenadiers",
  },
  {
    path: "/mur",
    title: "Mur des supporters · Grenadiers 2026",
    description: "Laissez votre message pour les Grenadiers. Des voix d'Haïti et de la diaspora, du monde entier.",
    image: "/og/og-mur.jpg",
    imageAlt: "Le Mur des Supporters des Grenadiers",
  },
  {
    // Games landing (React route). Prerendered as a flat jeux.html file — never
    // a jeux/ folder, which would shadow the route and expose a directory list.
    path: "/jeux",
    title: "Jouez · Grenadiers 2026",
    description: "Quiz, pronostics et autres jeux pour vivre la route des Grenadiers vers la Coupe du Monde 2026, et la partager.",
    image: "/og/og-quiz.jpg",
    imageAlt: "L'espace jeux des Grenadiers",
  },
  {
    path: "/jeux/quiz",
    // Written under /games/ (not /jeux/) so no physical jeux/ folder is created.
    // .htaccess maps the pretty URL /jeux/quiz to this file.
    file: "games/quiz.html",
    title: "Quiz Grenadier · Grenadiers 2026",
    description: "Testez vos connaissances sur la sélection haïtienne et son histoire à la Coupe du Monde.",
    image: "/og/og-quiz.jpg",
    imageAlt: "Quiz Grenadier",
  },
  {
    path: "/jeux/pwonostik",
    file: "games/pwonostik.html",
    title: "Pwonostik · Vos pronostics du Groupe C",
    description: "Pronostiquez les matchs d'Haïti au Mondial 2026 et partagez vos résultats.",
    // og-pwonostik image not yet in public/og/ — keep the default until it ships.
    image: DEFAULT_IMAGE,
    imageAlt: "Pwonostik, les pronostics des Grenadiers",
  },
  {
    path: "/the-tribute",
    title: "Hommages Créatifs · Grenadiers 2026",
    description: "Clips musicaux, films, illustrations et objets : la communauté artistique haïtienne célèbre les Grenadiers.",
    image: "/og/og-hommages.jpg",
    imageAlt: "Hommages Créatifs aux Grenadiers",
  },
  {
    path: "/watch-parties",
    title: "Retransmissions — Trouvez-en une près de chez vous",
    description: "De Brooklyn à Cap-Haïtien, de Montréal à Miami. 45+ villes, 8 pays, les 10 départements d'Haïti.",
    image: DEFAULT_IMAGE,
  },
  {
    path: "/stories",
    title: "Reportages — La route d'Haïti vers 2026",
    description: "Analyses d'avant-match, portraits de joueurs, entretiens familiaux en Haïti, réactions après les matches.",
    image: DEFAULT_IMAGE,
  },
  {
    path: "/anthem",
    title: "L'Hommage — Merci aux artistes",
    description: "Clips musicaux, playlist, documentaire, illustrations. La communauté artistique haïtienne qui porte la sélection.",
    image: DEFAULT_IMAGE,
  },
  {
    path: "/federation",
    title: "La Fédération — Le football haïtien depuis 1904",
    description: "Fédération Haïtienne de Football, instance dirigeante du football en Haïti depuis 1904. Membre fondateur de la CONCACAF.",
    image: "/og/og-federation.jpg",
    imageAlt: "La Fédération Haïtienne de Football",
  },
  {
    path: "/history-1974",
    title: "Les soixante-dix minutes — Manno Sanon, Dino Zoff, et les 52 ans",
    description: "En 1974, Manno Sanon marquait contre l'Italie et mettait fin à la série record de 1 142 minutes d'invincibilité de Dino Zoff. L'histoire complète.",
    image: "/og/og-1974.jpg",
    imageAlt: "Haïti à la Coupe du Monde 1974",
  },
  {
    path: "/press",
    title: "Espace presse — Haïti à la Coupe du Monde FIFA 2026",
    description: "Ressources pour les journalistes qui couvrent Haïti au Mondial 2026. Faits, photos, citations, contact.",
    image: DEFAULT_IMAGE,
  },
  {
    path: "/documentary",
    title: "Le documentaire — Haïti : au-delà du jeu",
    description: "Série documentaire en quatre épisodes par Noémie Ferron pour Ferron Motions Inc. Diffusion en juin 2026 sur TFO et RDS.",
    image: DEFAULT_IMAGE,
  },
  {
    path: "/interviews",
    title: "Entretiens — À découvert avec la sélection",
    description: "Longues conversations avec les joueurs, le sélectionneur et les responsables de la Fédération.",
    image: DEFAULT_IMAGE,
  },
  {
    path: "/say-their-names",
    title: "Prononcez leurs noms — Guide de prononciation",
    description: "Comment prononcer chaque nom de la sélection haïtienne pour le Mondial 2026. Audio enregistré par Carel Pedre.",
    image: DEFAULT_IMAGE,
  },
  {
    path: "/atlas",
    title: "L'Atlas — Posez un point depuis votre ville",
    description: "La carte de la diaspora haïtienne. Posez votre point. Montrez d'où vous regardez.",
    image: DEFAULT_IMAGE,
  },
  {
    path: "/gallery",
    title: "Galerie photo — Haïti à la Coupe du Monde FIFA 2026",
    description: "Photos officielles des Grenadiers — joueurs, entraînements, coulisses. Avec l'aimable autorisation de la Fédération Haïtienne de Football.",
    image: DEFAULT_IMAGE,
  },
  {
    path: "/journal",
    title: "Le Journal — Chronique de la sélection nationale",
    description: "Reportages, entretiens et portraits sur la route d'Haïti vers la Coupe du Monde 2026.",
    image: "/og/og-journal.jpg",
    imageAlt: "Journal des Grenadiers",
  },
  {
    path: "/foto",
    title: "Photos · Grenadiers 2026",
    description: "La galerie photo des Grenadiers : albums de la route vers la Coupe du Monde 2026.",
    image: "/og/og-photos.jpg",
    imageAlt: "Galerie photo des Grenadiers",
  },
  {
    path: "/about",
    title: "À propos — Grenadiers 2026",
    description: "Site indépendant et non-officiel sur les Grenadiers à la Coupe du Monde de la FIFA 2026, conçu et développé par Carel Pedre.",
    image: DEFAULT_IMAGE,
  },

  // ─── Match pages (one dynamic SPA route /live/:slug) ──────────────────
  // Prerendered per opponent so social cards show the right matchup image.
  {
    path: "/live/scotland",
    title: "Haïti · Écosse · Groupe C",
    description: "Haïti affronte l'Écosse le 13 juin 2026 au Gillette Stadium. Suivez le match en direct.",
    image: "/og/og-match-ecosse.jpg",
    imageAlt: "Haïti contre Écosse, 13 juin 2026",
  },
  {
    path: "/live/brazil",
    title: "Haïti · Brésil · Groupe C",
    description: "Haïti affronte le Brésil le 19 juin 2026 au Lincoln Financial Field. Suivez le match en direct.",
    image: "/og/og-match-bresil.jpg",
    imageAlt: "Haïti contre Brésil, 19 juin 2026",
  },
  {
    path: "/live/morocco",
    title: "Haïti · Maroc · Groupe C",
    description: "Haïti affronte le Maroc le 24 juin 2026 au Mercedes-Benz Stadium. Suivez le match en direct.",
    image: "/og/og-match-maroc.jpg",
    imageAlt: "Haïti contre Maroc, 24 juin 2026",
  },
  // Past / friendly matches fall back to the matches-hub image.
  {
    path: "/live/peru",
    title: "Haïti · Pérou · Match amical",
    description: "Haïti contre le Pérou. Calendrier et résultats des Grenadiers.",
    image: "/og/og-matches.jpg",
    imageAlt: "Le calendrier et les résultats des Grenadiers",
  },
  {
    path: "/live/new-zealand",
    title: "Haïti · Nouvelle-Zélande · Match amical",
    description: "Haïti contre la Nouvelle-Zélande. Calendrier et résultats des Grenadiers.",
    image: "/og/og-matches.jpg",
    imageAlt: "Le calendrier et les résultats des Grenadiers",
  },
];

// Normalise un chemin : retire le slash final (sauf racine).
function norm(p) {
  if (!p) return "/";
  const s = String(p).replace(/\/+$/, "");
  return s === "" ? "/" : s;
}

// Métadonnées exactes d'une route statique, ou null si non listée.
export function resolveRouteMeta(pathname) {
  const p = norm(pathname);
  return ROUTES.find((r) => norm(r.path) === p) || null;
}
