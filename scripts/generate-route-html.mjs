#!/usr/bin/env node
// ╔═══════════════════════════════════════════════════════════════════════╗
// ║  PER-ROUTE OG METADATA GENERATOR                                       ║
// ║                                                                        ║
// ║  For each route, writes a static HTML file with route-specific meta    ║
// ║  tags (og:title, og:description, og:image) to dist/<route>.html        ║
// ║                                                                        ║
// ║  Apache .htaccess routes social-media crawler user agents to these     ║
// ║  static files. Regular users get the SPA from index.html.              ║
// ║                                                                        ║
// ║  Run as part of `./deploy.sh` AFTER npm run build, BEFORE rsync.       ║
// ╚═══════════════════════════════════════════════════════════════════════╝

import { writeFileSync, readFileSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIST = resolve(__dirname, "..", "dist");
const BASE = "https://grenadiers2026.com";

// Single site-wide share image (squad hero). Every route uses this — we no
// longer point og:image at the per-route generated PNGs.
const SHARE_IMAGE = "/og/grenadiers-og.jpg";
const SHARE_IMAGE_TYPE = "image/jpeg";

// Read the built index.html and use it as template
const indexHtml = readFileSync(`${DIST}/index.html`, "utf-8");

// ─── Per-route metadata ────────────────────────────────────────────────
const routes = [
  {
    path: "/",
    file: "index.html", // homepage = root index, we update it in place
    title: "Les Grenadiers sont de retour — Haïti à la Coupe du Monde FIFA 2026",
    description: "Pour la première fois depuis 1974, Haïti retrouve la Coupe du Monde de la FIFA. Brésil. Écosse. Maroc. Un groupe, une nation, une histoire.",
    image: "/og/home.png",
  },
  {
    path: "/squad",
    title: "La sélection — Haïti à la Coupe du Monde FIFA 2026",
    description: "Vingt-six joueurs, une nation. La liste de Sébastien Migné pour la première Coupe du Monde d'Haïti depuis 52 ans.",
    image: "/og/squad.png",
  },
  {
    path: "/matches",
    title: "Calendrier · Groupe C — Brésil, Écosse, Maroc",
    description: "Trois affiches, trois villes américaines. Foxborough · Inglewood · Atlanta.",
    image: "/og/matches.png",
  },
  {
    path: "/watch-parties",
    title: "Retransmissions — Trouvez-en une près de chez vous",
    description: "De Brooklyn à Cap-Haïtien, de Montréal à Miami. 45+ villes, 8 pays, les 10 départements d'Haïti.",
    image: "/og/watch-parties.png",
  },
  {
    path: "/stories",
    title: "Reportages — La route d'Haïti vers 2026",
    description: "Analyses d'avant-match, portraits de joueurs, entretiens familiaux en Haïti, réactions après les matches.",
    image: "/og/stories.png",
  },
  {
    path: "/anthem",
    title: "L'Hommage — Merci aux artistes",
    description: "Clips musicaux, playlist, documentaire, illustrations. La communauté artistique haïtienne qui porte la sélection.",
    image: "/og/anthem.png",
  },
  {
    path: "/federation",
    title: "La Fédération — Le football haïtien depuis 1904",
    description: "Fédération Haïtienne de Football, instance dirigeante du football en Haïti depuis 1904. Membre fondateur de la CONCACAF.",
    image: "/og/federation.png",
  },
  {
    path: "/history-1974",
    title: "Les soixante-dix minutes — Manno Sanon, Dino Zoff, et les 52 ans",
    description: "En 1974, Manno Sanon marquait contre l'Italie et mettait fin à la série record de 1 142 minutes d'invincibilité de Dino Zoff. L'histoire complète.",
    image: "/og/history-1974.png",
  },
  {
    path: "/press",
    title: "Espace presse — Haïti à la Coupe du Monde FIFA 2026",
    description: "Ressources pour les journalistes qui couvrent Haïti au Mondial 2026. Faits, photos, citations, contact.",
    image: "/og/press.png",
  },
  {
    path: "/documentary",
    title: "Le documentaire — Haïti : au-delà du jeu",
    description: "Série documentaire en quatre épisodes par Noémie Ferron pour Ferron Motions Inc. Diffusion en juin 2026 sur TFO et RDS.",
    image: "/og/documentary.png",
  },
  {
    path: "/interviews",
    title: "Entretiens — À découvert avec la sélection",
    description: "Longues conversations avec les joueurs, le sélectionneur et les responsables de la Fédération.",
    image: "/og/interviews.png",
  },
  {
    path: "/say-their-names",
    title: "Prononcez leurs noms — Guide de prononciation",
    description: "Comment prononcer chaque nom de la sélection haïtienne pour le Mondial 2026. Audio enregistré par Carel Pedre.",
    image: "/og/say-their-names.png",
  },
  {
    path: "/atlas",
    title: "L'Atlas — Posez un point depuis votre ville",
    description: "La carte de la diaspora haïtienne. Posez votre point. Montrez d'où vous regardez.",
    image: "/og/atlas.png",
  },
  {
    path: "/gallery",
    title: "Galerie photo — Haïti à la Coupe du Monde FIFA 2026",
    description: "Photos officielles des Grenadiers — joueurs, entraînements, coulisses. Avec l'aimable autorisation de la Fédération Haïtienne de Football.",
    image: "/og/squad.png",
  },
  {
    path: "/journal",
    title: "Le Journal — Chronique de la sélection nationale",
    description: "Reportages, entretiens et portraits sur la route d'Haïti vers la Coupe du Monde 2026.",
    image: "/og/journal.png",
  },
  {
    path: "/about",
    title: "À propos — Grenadiers 2026",
    description: "Site non-officiel des Grenadiers à la Coupe du Monde de la FIFA 2026, créé par Carel Pedre en collaboration avec la Fédération Haïtienne de Football.",
    image: "/og/default.png",
  },
];

function buildMeta({ title, description, path }) {
  const url = `${BASE}${path}`;
  const fullImage = `${BASE}${SHARE_IMAGE}`;
  return `
    <title>${escapeHtml(title)}</title>
    <meta name="description" content="${escapeHtml(description)}" />
    <meta property="og:title" content="${escapeHtml(title)}" />
    <meta property="og:description" content="${escapeHtml(description)}" />
    <meta property="og:url" content="${url}" />
    <meta property="og:image" content="${fullImage}" />
    <meta property="og:image:type" content="${SHARE_IMAGE_TYPE}" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:image:alt" content="${escapeHtml(title)}" />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="Grenadiers 2026" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeHtml(title)}" />
    <meta name="twitter:description" content="${escapeHtml(description)}" />
    <meta name="twitter:image" content="${fullImage}" />
    <meta name="twitter:site" content="@chokarella" />
    <link rel="canonical" href="${url}" />`;
}

function escapeHtml(s) {
  return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

// ─── Generate per-route HTML ──────────────────────────────────────────
console.log("📄 Generating per-route HTML with OG metadata...\n");

for (const route of routes) {
  const meta = buildMeta(route);

  // Replace the <title> and all og:/twitter: tags in the index.html template
  let html = indexHtml;

  // Strip existing meta tags we'll replace
  html = html.replace(/<title>[^<]*<\/title>/g, "");
  html = html.replace(/<meta\s+property="og:[^"]*"[^>]*>/g, "");
  html = html.replace(/<meta\s+name="twitter:[^"]*"[^>]*>/g, "");
  html = html.replace(/<meta\s+name="description"[^>]*>/g, "");
  html = html.replace(/<link\s+rel="canonical"[^>]*>/g, "");

  // Inject new meta right before </head>
  html = html.replace(/<\/head>/, `${meta}\n  </head>`);

  // Write to file
  const outFile = route.file || `${route.path.slice(1) || "home"}.html`;
  const outPath = resolve(DIST, outFile);

  // Make sure directory exists for paths with slashes
  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, html);
  console.log(`  ✓ ${route.path} → ${outFile}`);
}

// ─── Generate dedicated 404.html ───────────────────────────────────
// This is what Apache's ErrorDocument 404 serves. It's a real HTML file
// (not an SPA redirect), so the response status is genuinely 404.
const notFoundMeta = buildMeta({
  path: "/404",
  title: "404 — Page introuvable · Grenadiers 2026",
  description: "La page que vous cherchez n'existe pas sur grenadiers2026.com. Retournez à l'accueil ou consultez la sélection, le calendrier ou les actualités.",
  image: "/og/default.png",
});

let notFoundHtml = indexHtml;
notFoundHtml = notFoundHtml.replace(/<title>[^<]*<\/title>/g, "");
notFoundHtml = notFoundHtml.replace(/<meta\s+property="og:[^"]*"[^>]*>/g, "");
notFoundHtml = notFoundHtml.replace(/<meta\s+name="twitter:[^"]*"[^>]*>/g, "");
notFoundHtml = notFoundHtml.replace(/<meta\s+name="description"[^>]*>/g, "");
notFoundHtml = notFoundHtml.replace(/<link\s+rel="canonical"[^>]*>/g, "");

// Add noindex robots meta — we don't want 404s in Google's index
const noindexMeta = `<meta name="robots" content="noindex,follow" />`;
notFoundHtml = notFoundHtml.replace(/<\/head>/, `${notFoundMeta}\n    ${noindexMeta}\n  </head>`);

writeFileSync(resolve(DIST, "404.html"), notFoundHtml);
console.log("  ✓ 404 → 404.html");

console.log(`\n✅ Generated ${routes.length + 1} HTML files (including 404)\n`);
