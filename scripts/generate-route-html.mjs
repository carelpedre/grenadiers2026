#!/usr/bin/env node
// ╔═══════════════════════════════════════════════════════════════════════╗
// ║  PER-ROUTE OG METADATA GENERATOR                                       ║
// ║                                                                        ║
// ║  For each route, writes a static HTML file with route-specific meta    ║
// ║  tags (title, description, og:image, twitter:image…) to dist/<route>.  ║
// ║                                                                        ║
// ║  Apache .htaccess serves these static files (with correct OG) to       ║
// ║  crawlers and users alike; the SPA still boots from the <script> tag.  ║
// ║                                                                        ║
// ║  Run as part of `./deploy.sh` AFTER npm run build, BEFORE rsync.       ║
// ╚═══════════════════════════════════════════════════════════════════════╝

import { writeFileSync, readFileSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
// SINGLE SOURCE OF TRUTH for per-route head metadata. Shared with the runtime
// head updater (src/components/RouteHead.jsx) so prerender and SPA never drift.
import { BASE, DEFAULT_IMAGE, ROUTES } from "../src/lib/routeMeta.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIST = resolve(__dirname, "..", "dist");

// All OG images are 1200x630 JPEG.
const IMAGE_TYPE = "image/jpeg";

// Read the built index.html and use it as template
const indexHtml = readFileSync(`${DIST}/index.html`, "utf-8");

const routes = ROUTES;


function buildMeta({ title, description, path, image, imageAlt }) {
  const url = `${BASE}${path}`;
  const fullImage = `${BASE}${image || DEFAULT_IMAGE}`;
  const alt = imageAlt || title;
  return `
    <title>${escapeHtml(title)}</title>
    <meta name="description" content="${escapeHtml(description)}" />
    <meta property="og:title" content="${escapeHtml(title)}" />
    <meta property="og:description" content="${escapeHtml(description)}" />
    <meta property="og:url" content="${url}" />
    <meta property="og:image" content="${fullImage}" />
    <meta property="og:image:secure_url" content="${fullImage}" />
    <meta property="og:image:type" content="${IMAGE_TYPE}" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:image:alt" content="${escapeHtml(alt)}" />
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
  image: DEFAULT_IMAGE,
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
