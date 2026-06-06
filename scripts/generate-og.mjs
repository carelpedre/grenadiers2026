#!/usr/bin/env node
// ╔═══════════════════════════════════════════════════════════════════════╗
// ║  OG IMAGE GENERATOR                                                    ║
// ║                                                                        ║
// ║  Generates social-share preview images (1200x630 PNG) for each page.   ║
// ║  Run with: node scripts/generate-og.mjs                                ║
// ║                                                                        ║
// ║  Writes to: public/og/*.png                                            ║
// ║  Uses: rsvg-convert (system binary) to rasterize SVG → PNG             ║
// ╚═══════════════════════════════════════════════════════════════════════╝

import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_DIR = resolve(__dirname, "..", "public", "og");
mkdirSync(OUT_DIR, { recursive: true });

const W = 1200;
const H = 630;

const HAITI_BLUE = "#00209F";
const HAITI_BLUE_DARK = "#001770";
const HAITI_RED = "#D21034";
const GOLD = "#C8A45C";
const BG = "#FAFAF7";
const INK = "#0A0A0A";

// ─── SVG template ──────────────────────────────────────────────────────
function og({ eyebrow, title, subtitle, accent = "blue", lineDetail = "" }) {
  const bgColor = accent === "red" ? HAITI_RED : HAITI_BLUE;
  const bgColor2 = accent === "red" ? "#9A0828" : HAITI_BLUE_DARK;

  // Wrap title and subtitle into lines for layout
  const titleFontSize = title.length > 30 ? 72 : 88;
  const titleMaxChars = titleFontSize > 80 ? 18 : 24;
  const titleLines = wrapLines(title, titleMaxChars);
  const titleLh = titleFontSize * 1.05;

  const subtitleFontSize = 26;
  const subtitleLines = subtitle ? wrapLines(subtitle, 58) : [];
  const subtitleLh = subtitleFontSize * 1.4;

  // Layout: eyebrow at y=190, title block centered below, subtitle below title, lineDetail at y=525
  const titleStartY = 250;
  const titleEndY = titleStartY + (titleLines.length - 1) * titleLh + titleFontSize * 0.3;
  const subtitleStartY = titleEndY + 50;

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${bgColor}"/>
      <stop offset="100%" stop-color="${bgColor2}"/>
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="${W}" height="${H}" fill="url(#bg)"/>

  <!-- Stripes left (flag motif) -->
  <rect x="0" y="0" width="40" height="${H}" fill="${HAITI_BLUE}"/>
  <rect x="40" y="0" width="40" height="${H}" fill="${HAITI_RED}"/>

  <!-- Top right brand stamp -->
  <g transform="translate(${W - 280}, 60)">
    <rect width="220" height="36" rx="18" fill="${BG}" fill-opacity="0.12"/>
    <text x="20" y="24" font-family="Plus Jakarta Sans, Arial, sans-serif" font-size="14" font-weight="700" fill="${BG}" letter-spacing="1.2">GRENADIERS2026.COM</text>
  </g>

  ${eyebrow ? `<text x="120" y="160" font-family="Plus Jakarta Sans, Arial, sans-serif" font-size="22" font-weight="700" fill="${GOLD}" letter-spacing="2">${escapeXml(eyebrow.toUpperCase())}</text>` : ""}

  <!-- Title -->
  <text x="120" y="${titleStartY}" font-family="Plus Jakarta Sans, Arial, sans-serif" font-size="${titleFontSize}" font-weight="800" fill="${BG}">${titleLines.map((line, i) => `<tspan x="120" dy="${i === 0 ? 0 : titleLh}">${escapeXml(line)}</tspan>`).join("")}</text>

  ${subtitleLines.length ? `<text x="120" y="${subtitleStartY}" font-family="Plus Jakarta Sans, Arial, sans-serif" font-size="${subtitleFontSize}" font-weight="500" fill="${BG}" opacity="0.85">${subtitleLines.map((line, i) => `<tspan x="120" dy="${i === 0 ? 0 : subtitleLh}">${escapeXml(line)}</tspan>`).join("")}</text>` : ""}

  ${lineDetail ? `<text x="120" y="540" font-family="Plus Jakarta Sans, Arial, sans-serif" font-size="20" font-weight="700" fill="${GOLD}" letter-spacing="1">${escapeXml(lineDetail.toUpperCase())}</text>` : ""}

  <!-- Bottom strip -->
  <rect x="0" y="${H - 6}" width="${W * 0.33}" height="6" fill="${HAITI_BLUE}"/>
  <rect x="${W * 0.33}" y="${H - 6}" width="${W * 0.33}" height="6" fill="${HAITI_RED}"/>
  <rect x="${W * 0.66}" y="${H - 6}" width="${W * 0.34}" height="6" fill="${GOLD}"/>

  <!-- Bottom corner Chokarella attribution -->
  <text x="${W - 60}" y="${H - 30}" font-family="Plus Jakarta Sans, Arial, sans-serif" font-size="14" font-weight="600" fill="${BG}" text-anchor="end" opacity="0.6">by Chokarella Media</text>
</svg>`;
}

function escapeXml(str) {
  return String(str).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");
}

// Split text into lines that fit within maxChars
function wrapLines(text, maxChars) {
  const words = text.split(" ");
  const lines = [];
  let current = "";
  for (const w of words) {
    if ((current + " " + w).trim().length > maxChars && current) {
      lines.push(current.trim());
      current = w;
    } else {
      current = (current + " " + w).trim();
    }
  }
  if (current) lines.push(current.trim());
  return lines;
}

// ─── Pages to generate ────────────────────────────────────────────────
const pages = [
  {
    slug: "default",
    eyebrow: "Groupe C · Coupe du Monde FIFA 2026",
    title: "Les Grenadiers sont de retour.",
    subtitle: "Pour la première fois depuis 1974, Haïti retrouve la Coupe du Monde.",
    lineDetail: "13 · 19 · 24 juin 2026",
    accent: "blue",
  },
  {
    slug: "home",
    eyebrow: "Groupe C · Coupe du Monde FIFA 2026",
    title: "Les Grenadiers sont de retour.",
    subtitle: "Pour la première fois depuis 1974, Haïti retrouve la Coupe du Monde.",
    lineDetail: "13 · 19 · 24 juin 2026",
    accent: "blue",
  },
  {
    slug: "squad",
    eyebrow: "La liste des 26",
    title: "Vingt-six joueurs. Une nation.",
    subtitle: "La sélection de Sébastien Migné pour la première Coupe du Monde d'Haïti depuis 52 ans.",
    lineDetail: "Découvrir la sélection",
    accent: "blue",
  },
  {
    slug: "matches",
    eyebrow: "Calendrier · Groupe C",
    title: "Brésil. Écosse. Maroc.",
    subtitle: "Trois affiches, trois villes américaines.",
    lineDetail: "Foxborough · Inglewood · Atlanta",
    accent: "red",
  },
  {
    slug: "watch-parties",
    eyebrow: "La diaspora se rassemble",
    title: "Où regarderez-vous ?",
    subtitle: "45+ villes. 8 pays. Les 10 départements d'Haïti.",
    lineDetail: "Trouver une retransmission",
    accent: "blue",
  },
  {
    slug: "stories",
    eyebrow: "Reportage Chokarella",
    title: "Les histoires derrière la sélection.",
    subtitle: "Analyses d'avant-match, portraits de joueurs, entretiens familiaux en Haïti.",
    lineDetail: "Lire les reportages",
    accent: "red",
  },
  {
    slug: "anthem",
    eyebrow: "L'Hommage",
    title: "Merci aux artistes.",
    subtitle: "La communauté artistique haïtienne qui porte la sélection.",
    lineDetail: "Clips · Playlist · Documentaire · Illustrations",
    accent: "blue",
  },
  {
    slug: "federation",
    eyebrow: "L'instance dirigeante",
    title: "La Fédération Haïtienne de Football.",
    subtitle: "Le football haïtien depuis 1904. Membre fondateur de la CONCACAF.",
    lineDetail: "1904 — présent",
    accent: "blue",
  },
  {
    slug: "history-1974",
    eyebrow: "1974 · Allemagne fédérale",
    title: "Les soixante-dix minutes.",
    subtitle: "L'histoire de Manno Sanon, du but contre Dino Zoff, et des cinquante-deux ans qui ont suivi.",
    lineDetail: "Lire l'histoire complète",
    accent: "red",
  },
  {
    slug: "press",
    eyebrow: "Pour la presse · Pour les journalistes",
    title: "Ressources presse.",
    subtitle: "Tout ce qu'il faut pour couvrir Haïti à la Coupe du Monde 2026.",
    lineDetail: "contact@grenadiers2026.com",
    accent: "blue",
  },
  {
    slug: "documentary",
    eyebrow: "Un documentaire Ferron Motions",
    title: "Haïti : au-delà du jeu.",
    subtitle: "Cinquante-deux ans après Munich, Haïti revient.",
    lineDetail: "Juin 2026 · TFO · RDS",
    accent: "red",
  },
  {
    slug: "interviews",
    eyebrow: "Entretiens longs",
    title: "Entretiens.",
    subtitle: "À découvert avec les joueurs, le sélectionneur et la Fédération.",
    lineDetail: "Reportage Chokarella",
    accent: "blue",
  },
  {
    slug: "say-their-names",
    eyebrow: "Guide de prononciation",
    title: "Prononcez leurs noms.",
    subtitle: "Chaque joueur. Audio. API. Phonétique. Enregistré par Carel Pedre.",
    lineDetail: "Pour la presse, les commentateurs, les supporters",
    accent: "blue",
  },
  {
    slug: "atlas",
    eyebrow: "La carte de la diaspora",
    title: "L'Atlas.",
    subtitle: "Posez un point. Montrez d'où vous regardez.",
    lineDetail: "Chaque point est l'un des nôtres",
    accent: "red",
  },
  {
    slug: "journal",
    eyebrow: "Chronique de la sélection",
    title: "Le Journal.",
    subtitle: "Reportages, entretiens et portraits sur la route du Mondial.",
    lineDetail: "Mis à jour régulièrement",
    accent: "blue",
  },
];

// ─── Generate ──────────────────────────────────────────────────────────
console.log("🎨 Generating OG images...\n");
for (const page of pages) {
  const svg = og(page);
  const svgPath = `${OUT_DIR}/${page.slug}.svg`;
  const pngPath = `${OUT_DIR}/${page.slug}.png`;
  writeFileSync(svgPath, svg);
  try {
    await sharp(Buffer.from(svg)).png().toFile(pngPath);
    console.log(`  ✓ ${page.slug}.png`);
  } catch (err) {
    console.error(`  ✗ ${page.slug}: ${err.message}`);
  }
}
console.log(`\n✅ Generated ${pages.length} OG images in public/og/\n`);
