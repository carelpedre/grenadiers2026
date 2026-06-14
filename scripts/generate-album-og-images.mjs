#!/usr/bin/env node
// ════════════════════════════════════════════════════════════════════════
//  generate-album-og-images.mjs
//  Builds a self-hosted 1200x630 social card for each /foto album into
//  public/og/foto/<slug>.jpg, so the prerendered album pages can point
//  og:image / twitter:image at a same-origin card whose real pixels match the
//  declared 1200x630 dimensions. (Pointing the tags at the raw 1920x1280
//  Supabase cover while declaring 1200x630 is what makes Twitter refuse to
//  render the large card.) Run in deploy.sh BEFORE `npm run build` so the
//  cards are copied into dist/ with the rest of public/.
//
//  Card: the album cover (cover-fit, top-anchored so faces stay in), a dark
//  bottom-left scrim, a gold "GALERIE PHOTOS" overline, the album name big and
//  bold (2 lines max, shrunk to fit), "grenadiers2026.com", and a 10px
//  blue/red flag bar across the bottom. Identical design to the fanwall-video
//  tool, but written to disk instead of uploaded to the gallery backend.
//
//  NEVER throws: skips an album (or the whole step) on any failure so a flaky
//  network can never break the build.
//
//  Flags:  --force  regenerate cards that already exist on disk.
// ════════════════════════════════════════════════════════════════════════

import { existsSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import { fetchAlbumsForBuild } from "./lib/fetch-albums.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const OUT = resolve(ROOT, "public", "og", "foto");

const W = 1200, H = 630, Q = 80;
const GOLD = "#C8A45C", BLUE = "#00209F", RED = "#D21034", INK = "#06080F";
const FORCE = process.argv.includes("--force");

function esc(s) {
  return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

// Wrap into <=maxLines lines, shrinking the font until it fits maxW.
function layoutTitle(name, maxW, maxLines = 2, maxFont = 78, minFont = 40) {
  const wrap = (text, cpl) => {
    const out = [];
    let cur = "";
    for (const w of text.split(/\s+/)) {
      if (!cur) cur = w;
      else if ((cur + " " + w).length <= cpl) cur += " " + w;
      else { out.push(cur); cur = w; }
    }
    if (cur) out.push(cur);
    return out;
  };
  for (let f = maxFont; f >= minFont; f -= 2) {
    const cpl = Math.max(6, Math.floor(maxW / (0.56 * f)));
    const lines = wrap(name, cpl);
    if (lines.length <= maxLines && lines.every((l) => l.length <= cpl)) return { font: f, lines };
  }
  const cpl = Math.max(6, Math.floor(maxW / (0.56 * minFont)));
  return { font: minFont, lines: wrap(name, cpl).slice(0, maxLines) };
}

function overlaySvg(name) {
  const leftX = 64;
  const { font, lines } = layoutTitle(name, W - leftX - 80);
  const lineH = Math.round(font * 1.1);
  const urlY = 590;
  const nameBottomY = urlY - 40;
  const nameTopY = nameBottomY - (lines.length - 1) * lineH;
  const overlineY = nameTopY - Math.round(font * 0.78) - 8;
  const sans = `font-family="Arial, Helvetica, sans-serif"`;

  const nameTags = lines
    .map((l, i) => {
      const y = nameTopY + i * lineH;
      return (
        `<text x="${leftX + 1.5}" y="${y + 1.5}" ${sans} font-size="${font}" font-weight="800" fill="#000" fill-opacity="0.45">${esc(l)}</text>` +
        `<text x="${leftX}" y="${y}" ${sans} font-size="${font}" font-weight="800" fill="#FFFFFF">${esc(l)}</text>`
      );
    })
    .join("");

  return Buffer.from(
    `<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">` +
      `<defs><linearGradient id="scrim" x1="0" y1="1" x2="0.35" y2="0">` +
        `<stop offset="0" stop-color="${INK}" stop-opacity="0.93"/>` +
        `<stop offset="0.45" stop-color="${INK}" stop-opacity="0.55"/>` +
        `<stop offset="0.85" stop-color="${INK}" stop-opacity="0"/>` +
      `</linearGradient></defs>` +
      `<rect width="${W}" height="${H}" fill="url(#scrim)"/>` +
      `<text x="${leftX}" y="${overlineY}" ${sans} font-size="24" font-weight="700" letter-spacing="4" fill="${GOLD}">GALERIE PHOTOS</text>` +
      nameTags +
      `<text x="${leftX}" y="${urlY}" ${sans} font-size="26" font-weight="600" fill="#FFFFFF" fill-opacity="0.7">grenadiers2026.com</text>` +
      `<rect x="0" y="${H - 10}" width="${W / 2}" height="10" fill="${BLUE}"/>` +
      `<rect x="${W / 2}" y="${H - 10}" width="${W / 2}" height="10" fill="${RED}"/>` +
      `</svg>`,
  );
}

async function buildCard(coverUrl, name) {
  const res = await fetch(coverUrl);
  if (!res.ok) throw new Error(`cover download HTTP ${res.status}`);
  const cover = Buffer.from(await res.arrayBuffer());
  const bg = await sharp(cover).rotate()
    .resize(W, H, { fit: "cover", position: "top" }) // top-anchored keeps faces
    .toBuffer();
  return sharp(bg)
    .composite([{ input: overlaySvg(name), top: 0, left: 0 }])
    .jpeg({ quality: Q, mozjpeg: true })
    .toBuffer();
}

async function main() {
  const albums = await fetchAlbumsForBuild();
  if (!albums.length) {
    console.warn("  ! gallery: no albums returned; skipping album OG cards.");
    return;
  }
  mkdirSync(OUT, { recursive: true });
  let made = 0, skipped = 0, failed = 0;
  for (const a of albums) {
    const dest = resolve(OUT, `${a.slug}.jpg`);
    if (existsSync(dest) && !FORCE) {
      skipped++;
      continue;
    }
    const cover = a.cover_full || a.cover;
    if (!cover) {
      console.log(`  · skip ${a.slug} (no cover image)`);
      skipped++;
      continue;
    }
    try {
      await sharp(await buildCard(cover, a.name || a.slug)).toFile(dest);
      console.log(`  ✓ og/foto/${a.slug}.jpg`);
      made++;
    } catch (e) {
      console.log(`  ! og/foto/${a.slug}.jpg failed: ${e.message || e}`);
      failed++;
    }
  }
  console.log(`\n✅ album OG cards: ${made} generated, ${skipped} skipped${failed ? `, ${failed} failed` : ""}.`);
}

main().catch((e) => {
  // Never break the build over share cards.
  console.warn(`  ! album OG generation skipped: ${e.message || e}`);
});
