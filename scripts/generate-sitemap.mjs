#!/usr/bin/env node
// ╔═══════════════════════════════════════════════════════════════════════╗
// ║  SITEMAP.XML + ROBOTS.TXT GENERATOR                                    ║
// ║                                                                        ║
// ║  Generates dist/sitemap.xml and dist/robots.txt for SEO.               ║
// ║  Run as part of `./deploy.sh` after `npm run build`, before rsync.     ║
// ║                                                                        ║
// ║  URLs come from src/lib/routeMeta.js (same source as the prerender)    ║
// ║  plus one entry per journal article from src/data/diary.js, so the     ║
// ║  sitemap can never drift from what is actually prerendered.            ║
// ╚═══════════════════════════════════════════════════════════════════════╝

import { writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { BASE, ROUTES } from "../src/lib/routeMeta.js";
import { diaryEntries } from "../src/data/diary.js";
import { fetchAlbumsForBuild } from "./lib/fetch-albums.mjs";

const albums = await fetchAlbumsForBuild();

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIST = resolve(__dirname, "..", "dist");

// priority/changefreq are advisory only; modern Google mostly ignores them
// but other crawlers may use them. Anything not listed gets the default.
const HINTS = {
  "/": { priority: "1.0", changefreq: "daily" },
  "/squad": { priority: "0.9", changefreq: "weekly" },
  "/matches": { priority: "0.9", changefreq: "weekly" },
  "/journal": { priority: "0.9", changefreq: "daily" },
  "/mur": { priority: "0.8", changefreq: "daily" },
  "/watch-parties": { priority: "0.8", changefreq: "weekly" },
  "/stories": { priority: "0.8", changefreq: "weekly" },
  "/live/scotland": { priority: "0.8", changefreq: "daily" },
  "/live/brazil": { priority: "0.8", changefreq: "daily" },
  "/live/morocco": { priority: "0.8", changefreq: "daily" },
};
const DEFAULT_HINT = { priority: "0.7", changefreq: "weekly" };

const today = new Date().toISOString().split("T")[0];

const urls = [
  // Every prerendered route. /foto/upload is private and is not in ROUTES.
  ...ROUTES.map((r) => ({
    loc: `${BASE}${r.path}`,
    lastmod: today,
    ...(HINTS[r.path] || DEFAULT_HINT),
  })),
  // One entry per journal article, dated by the entry itself.
  ...diaryEntries.map((e) => ({
    loc: `${BASE}/journal/${e.slug}`,
    lastmod: e.date || today,
    priority: "0.6",
    changefreq: "monthly",
  })),
  // One entry per public photo album (/foto/<slug>).
  ...albums.map((a) => ({
    loc: `${BASE}/foto/${a.slug}`,
    lastmod: today,
    priority: "0.6",
    changefreq: "monthly",
  })),
];

const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${u.lastmod}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`
  )
  .join("\n")}
</urlset>
`;

writeFileSync(resolve(DIST, "sitemap.xml"), sitemapXml);
console.log(`✓ sitemap.xml — ${urls.length} URLs (${ROUTES.length} routes + ${diaryEntries.length} journal entries)`);

// Same content as public/robots.txt — keep the two in sync.
const robotsTxt = `# https://grenadiers2026.com/robots.txt
# An independent fan project celebrating Haiti at the FIFA World Cup 2026.

User-agent: *
Allow: /

# Don't index the API endpoints
Disallow: /api/

# Private uploader (password-protected, not for indexing)
Disallow: /foto/upload

# Sitemap
Sitemap: ${BASE}/sitemap.xml
`;

writeFileSync(resolve(DIST, "robots.txt"), robotsTxt);
console.log("✓ robots.txt");
