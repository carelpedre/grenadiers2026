#!/usr/bin/env node
// ╔═══════════════════════════════════════════════════════════════════════╗
// ║  SITEMAP.XML + ROBOTS.TXT GENERATOR                                    ║
// ║                                                                        ║
// ║  Generates dist/sitemap.xml and dist/robots.txt for SEO.               ║
// ║  Run as part of `./deploy.sh` after `npm run build`, before rsync.     ║
// ╚═══════════════════════════════════════════════════════════════════════╝

import { writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIST = resolve(__dirname, "..", "dist");
const BASE = "https://grenadiers2026.com";

// All public routes that should appear in the sitemap.
// priority/changefreq are advisory only; modern Google mostly ignores them
// but other crawlers may use them.
const routes = [
  { path: "/", priority: "1.0", changefreq: "daily" },
  { path: "/squad", priority: "0.9", changefreq: "weekly" },
  { path: "/matches", priority: "0.9", changefreq: "weekly" },
  { path: "/watch-parties", priority: "0.8", changefreq: "weekly" },
  { path: "/stories", priority: "0.8", changefreq: "weekly" },
  { path: "/anthem", priority: "0.6", changefreq: "monthly" },
  { path: "/federation", priority: "0.7", changefreq: "monthly" },
  { path: "/history-1974", priority: "0.7", changefreq: "monthly" },
  { path: "/press", priority: "0.6", changefreq: "monthly" },
  { path: "/documentary", priority: "0.6", changefreq: "monthly" },
  { path: "/interviews", priority: "0.7", changefreq: "weekly" },
  { path: "/say-their-names", priority: "0.5", changefreq: "monthly" },
  { path: "/atlas", priority: "0.7", changefreq: "weekly" },
  { path: "/gallery", priority: "0.7", changefreq: "weekly" },
  { path: "/about", priority: "0.5", changefreq: "monthly" },
];

const today = new Date().toISOString().split("T")[0];

const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(
    (r) => `  <url>
    <loc>${BASE}${r.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority}</priority>
  </url>`
  )
  .join("\n")}
</urlset>
`;

writeFileSync(resolve(DIST, "sitemap.xml"), sitemapXml);
console.log(`✓ sitemap.xml — ${routes.length} URLs`);

const robotsTxt = `# https://grenadiers2026.com/robots.txt
# An independent fan project celebrating Haiti at the FIFA World Cup 2026.

User-agent: *
Allow: /

# Don't index the API endpoints
Disallow: /api/

# Sitemap
Sitemap: ${BASE}/sitemap.xml
`;

writeFileSync(resolve(DIST, "robots.txt"), robotsTxt);
console.log("✓ robots.txt");
