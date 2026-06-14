// ════════════════════════════════════════════════════════════════════════
// GENERATE OG IMAGES — one 1200x630 social card per journal entry.
//
// For every diary entry that has a cover image on disk, we produce a branded
// Open Graph card at public/og/journal/<slug>.jpg:
//   - the entry cover, smart-cropped to fill 1200x630 (1.91:1, the ratio
//     Facebook / X / iMessage expect)
//   - a navy gradient along the bottom for legibility
//   - the Grenadiers tricolor rule + "GRENADIERS 2026" wordmark, bottom-left
// No baked-in title text: the social card already renders og:title / og:description
// beside the image. generate-route-html.mjs points each journal route's
// og:image at the file produced here.
//
// Run before `npm run build` so the cards get copied into dist/ with the rest
// of public/. Idempotent: same cover in, same bytes out (no git churn).
// ════════════════════════════════════════════════════════════════════════

import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import { diaryEntries } from "../src/data/diary.js";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const PUBLIC_DIR = path.join(ROOT, "public");
const OUT_DIR = path.join(PUBLIC_DIR, "og", "journal");

const W = 1200;
const H = 630;

// Brand palette (mirrors tailwind tokens).
const INK = "#0A1F3D";
const BLUE = "#00209F";
const RED = "#D21034";
const GOLD = "#C8A45C";

// Overlay: bottom scrim + tricolor rule + wordmark. Pure shapes plus one fixed
// wordmark string (renders via a bold system sans when Oswald is absent).
const overlaySvg = Buffer.from(`<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="scrim" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0.42" stop-color="${INK}" stop-opacity="0"/>
      <stop offset="1" stop-color="${INK}" stop-opacity="0.93"/>
    </linearGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#scrim)"/>
  <g transform="translate(64, 548)">
    <rect x="0" y="-4" width="8" height="48" fill="${BLUE}"/>
    <rect x="9" y="-4" width="8" height="48" fill="${RED}"/>
    <text x="33" y="33" font-family="Oswald, 'Arial Narrow', Arial, sans-serif" font-size="40" font-weight="700" letter-spacing="3" fill="#FFFFFF">GRENADIERS <tspan fill="${GOLD}">2026</tspan></text>
  </g>
</svg>`);

async function fileExists(p) {
  try {
    await fs.access(p);
    return true;
  } catch {
    return false;
  }
}

async function generateOne(entry) {
  if (!entry.cover) return { slug: entry.slug, status: "skip (no cover)" };
  const coverPath = path.join(PUBLIC_DIR, entry.cover.replace(/^\//, ""));
  if (!(await fileExists(coverPath))) {
    return { slug: entry.slug, status: `skip (cover missing: ${entry.cover})` };
  }

  const base = await sharp(coverPath)
    // Smart crop keeps the salient region (faces) when filling the 1.91:1 frame.
    .resize(W, H, { fit: "cover", position: sharp.strategy.attention })
    .toBuffer();

  const outPath = path.join(OUT_DIR, `${entry.slug}.jpg`);
  await sharp(base)
    .composite([{ input: overlaySvg, top: 0, left: 0 }])
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(outPath);

  return { slug: entry.slug, status: "ok" };
}

async function main() {
  await fs.mkdir(OUT_DIR, { recursive: true });
  const results = [];
  for (const entry of diaryEntries) {
    results.push(await generateOne(entry));
  }
  const ok = results.filter((r) => r.status === "ok").length;
  for (const r of results) {
    if (r.status !== "ok") console.log(`  · ${r.slug}: ${r.status}`);
  }
  console.log(`\n✅ Generated ${ok} journal OG card(s) → public/og/journal/\n`);
}

main().catch((err) => {
  console.error("OG generation failed:", err);
  process.exit(1);
});
