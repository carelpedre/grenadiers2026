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
// ║  Also injects JSON-LD structured data: WebSite + Organization on the   ║
// ║  homepage, NewsArticle on each /journal/<slug> page.                   ║
// ║                                                                        ║
// ║  Run as part of `./deploy.sh` AFTER npm run build, BEFORE rsync.       ║
// ╚═══════════════════════════════════════════════════════════════════════╝

import { writeFileSync, readFileSync, mkdirSync, existsSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
// SINGLE SOURCE OF TRUTH for per-route head metadata. Shared with the runtime
// head updater (src/components/RouteHead.jsx) so prerender and SPA never drift.
import { BASE, SITE_NAME, DEFAULT_IMAGE, ROUTES } from "../src/lib/routeMeta.js";
import { diaryEntries } from "../src/data/diary.js";
import { fetchAlbumsForBuild, firstSentence } from "./lib/fetch-albums.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIST = resolve(__dirname, "..", "dist");

// All OG images are 1200x630 JPEG.
const IMAGE_TYPE = "image/jpeg";

// Site logo used in Organization / publisher structured data.
const LOGO_URL = `${BASE}/icon-512.png`;

// Read the built index.html and use it as template
const indexHtml = readFileSync(`${DIST}/index.html`, "utf-8");

// Journal articles get their own prerendered page so news queries can index
// them. Title/description come straight from diary.js (title, dek).
// Prefer the per-entry 1200x630 OG card (generate-og-images.mjs) when present;
// fall back to the raw cover, then the site default.
function ogImageFor(e) {
  const card = `/og/journal/${e.slug}.jpg`;
  if (existsSync(resolve(DIST, `.${card}`))) return card;
  return e.cover || DEFAULT_IMAGE;
}

const journalRoutes = diaryEntries.map((e) => ({
  path: `/journal/${e.slug}`,
  file: `journal/${e.slug}.html`,
  title: `${e.title} · ${SITE_NAME}`,
  description: e.dek,
  image: ogImageFor(e),
  imageAlt: e.title,
  type: "article",
  jsonLd: newsArticleLd(e),
}));

// Public photo albums (/foto/<slug>) get a prerendered page so a shared link
// shows a per-album card. Fetched from gallery-list at build time; on any
// failure fetchAlbumsForBuild() returns [] (with a warning) so the build is
// never broken by a flaky network.
const albums = await fetchAlbumsForBuild();
// Prefer the self-hosted 1200x630 album card (generate-album-og-images.mjs)
// when present — its real pixels match the declared dimensions and it is served
// from our own origin, which Twitter renders far more reliably than the raw
// Supabase cover. Fall back to a backend-set og, then the cover, then default.
function ogImageForAlbum(a) {
  const card = `/og/foto/${a.slug}.jpg`;
  if (existsSync(resolve(DIST, `.${card}`))) return card;
  return a.og || a.cover_full || DEFAULT_IMAGE;
}
const albumRoutes = albums.map((a) => ({
  path: `/foto/${a.slug}`,
  file: `foto/${a.slug}.html`,
  title: `${a.name} · Galerie photos · ${SITE_NAME}`,
  description: a.description
    ? firstSentence(a.description)
    : `${a.count} photo${a.count > 1 ? "s" : ""} · La galerie des supporters d'Haïti pour la Coupe du Monde 2026.`,
  image: ogImageForAlbum(a),
  imageAlt: a.name,
  type: "website",
}));

const routes = [...ROUTES, ...journalRoutes, ...albumRoutes];

// SEO rule: no em dashes in titles or descriptions. Article bodies keep
// their typography; only the generated metadata is normalised.
function noEmDash(s) {
  return String(s).replace(/\s*—\s*/g, " · ");
}

function buildMeta({ title, description, path, image, imageAlt, type, jsonLd }) {
  const url = `${BASE}${path}`;
  const fullImage = image && image.startsWith("http") ? image : `${BASE}${image || DEFAULT_IMAGE}`;
  const cleanTitle = noEmDash(title);
  const cleanDescription = noEmDash(description);
  const alt = imageAlt || cleanTitle;
  const ldBlocks = (jsonLd || [])
    .map((obj) => `\n    <script type="application/ld+json">${JSON.stringify(obj)}</script>`)
    .join("");
  return `
    <title>${escapeHtml(cleanTitle)}</title>
    <meta name="description" content="${escapeHtml(cleanDescription)}" />
    <meta property="og:title" content="${escapeHtml(cleanTitle)}" />
    <meta property="og:description" content="${escapeHtml(cleanDescription)}" />
    <meta property="og:url" content="${url}" />
    <meta property="og:image" content="${fullImage}" />
    <meta property="og:image:secure_url" content="${fullImage}" />
    <meta property="og:image:type" content="${IMAGE_TYPE}" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:image:alt" content="${escapeHtml(alt)}" />
    <meta property="og:type" content="${type || "website"}" />
    <meta property="og:site_name" content="${SITE_NAME}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeHtml(cleanTitle)}" />
    <meta name="twitter:description" content="${escapeHtml(cleanDescription)}" />
    <meta name="twitter:image" content="${fullImage}" />
    <meta name="twitter:site" content="@chokarella" />
    <link rel="canonical" href="${url}" />${ldBlocks}`;
}

function escapeHtml(s) {
  return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

// ─── JSON-LD builders ─────────────────────────────────────────────────

function organizationLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: BASE,
    logo: LOGO_URL,
  };
}

function webSiteLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    alternateName: "Haïti Coupe du Monde 2026",
    url: BASE,
  };
}

function newsArticleLd(entry) {
  return [
    {
      "@context": "https://schema.org",
      "@type": "NewsArticle",
      headline: noEmDash(entry.title),
      description: noEmDash(entry.dek),
      image: [`${BASE}${entry.cover || DEFAULT_IMAGE}`],
      datePublished: entry.date,
      dateModified: entry.date,
      inLanguage: "fr",
      mainEntityOfPage: { "@type": "WebPage", "@id": `${BASE}/journal/${entry.slug}` },
      author: { "@type": "Organization", name: SITE_NAME, url: BASE },
      publisher: {
        "@type": "Organization",
        name: SITE_NAME,
        url: BASE,
        logo: { "@type": "ImageObject", url: LOGO_URL },
      },
    },
  ];
}

// Homepage carries the site-level structured data.
const home = routes.find((r) => r.path === "/");
if (home) home.jsonLd = [webSiteLd(), organizationLd()];

// ─── Generate per-route HTML ──────────────────────────────────────────
console.log("📄 Generating per-route HTML with OG metadata...\n");

function stripHeadMeta(html) {
  return html
    .replace(/<title>[^<]*<\/title>/g, "")
    .replace(/<meta\s+property="og:[^"]*"[^>]*>/g, "")
    .replace(/<meta\s+name="twitter:[^"]*"[^>]*>/g, "")
    .replace(/<meta\s+name="description"[^>]*>/g, "")
    .replace(/<link\s+rel="canonical"[^>]*>/g, "");
}

for (const route of routes) {
  const meta = buildMeta(route);

  // Replace the <title> and all og:/twitter: tags in the index.html template
  let html = stripHeadMeta(indexHtml);

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
  title: "404 · Page introuvable · Grenadiers 2026",
  description: "La page que vous cherchez n'existe pas sur grenadiers2026.com. Retournez à l'accueil ou consultez la sélection, le calendrier ou les actualités.",
  image: DEFAULT_IMAGE,
});

let notFoundHtml = stripHeadMeta(indexHtml);

// Add noindex robots meta — we don't want 404s in Google's index
const noindexMeta = `<meta name="robots" content="noindex,follow" />`;
notFoundHtml = notFoundHtml.replace(/<\/head>/, `${notFoundMeta}\n    ${noindexMeta}\n  </head>`);

writeFileSync(resolve(DIST, "404.html"), notFoundHtml);
console.log("  ✓ 404 → 404.html");

console.log(`\n✅ Generated ${routes.length + 1} HTML files (${journalRoutes.length} journal articles, ${albumRoutes.length} photo albums, including 404)\n`);
