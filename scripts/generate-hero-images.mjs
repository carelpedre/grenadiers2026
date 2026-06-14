#!/usr/bin/env node
// ════════════════════════════════════════════════════════════════════════
//  generate-hero-images.mjs
//  Builds responsive WebP + JPEG derivatives of the homepage squad poster
//  from assets/source/haiti-squad-hero.png into public/images/photos/, so the
//  hero <picture>/srcset never ships the full PNG and mobile downloads a small
//  file. Run in deploy.sh BEFORE `npm run build` (the derivatives are copied
//  with the rest of public/). Skips gracefully if the source is missing, and
//  never upscales beyond the source width.
// ════════════════════════════════════════════════════════════════════════

import { existsSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const SRC = resolve(ROOT, "assets", "source", "haiti-squad-hero.png");
const OUT = resolve(ROOT, "public", "images", "photos");
const OG_HOME = resolve(ROOT, "public", "og", "og-home.jpg");
const WIDTHS = [2560, 1920, 1280, 768];
const Q = 80;

async function main() {
  if (!existsSync(SRC)) {
    console.warn(`  ! hero source not found at ${SRC}; skipping hero derivatives.`);
    return;
  }
  mkdirSync(OUT, { recursive: true });
  const meta = await sharp(SRC).metadata();
  let made = 0;
  for (const w of WIDTHS) {
    if (w > meta.width) {
      console.log(`  · skip ${w}w (source is ${meta.width}w; no upscale)`);
      continue;
    }
    const base = resolve(OUT, `haiti-squad-hero-${w}`);
    await sharp(SRC).resize(w).webp({ quality: Q }).toFile(`${base}.webp`);
    await sharp(SRC).resize(w).jpeg({ quality: Q, mozjpeg: true }).toFile(`${base}.jpg`);
    made++;
    console.log(`  ✓ haiti-squad-hero-${w}.{webp,jpg}`);
  }

  // Homepage OG card (1200x630): crop the face grid, dropping the dark top band
  // with the HAITI title so the faces are bigger and become the card.
  const top = 150; // skip the title band
  const h = Math.min(920, meta.height - top); // ~3 rows of faces
  const w = Math.round((h * 1200) / 630); // 1.905 aspect to match 1200x630
  const left = Math.max(0, Math.round((meta.width - w) / 2));
  mkdirSync(dirname(OG_HOME), { recursive: true });
  await sharp(SRC)
    .extract({ left, top, width: Math.min(w, meta.width - left), height: h })
    .resize(1200, 630, { fit: "cover" })
    .jpeg({ quality: Q, mozjpeg: true })
    .toFile(OG_HOME);
  console.log("  ✓ og/og-home.jpg (homepage share card)");

  console.log(`\n✅ hero derivatives generated (${made} width${made > 1 ? "s" : ""} + og-home).`);
}

main().catch((e) => {
  console.error("hero derivatives failed:", e.message || e);
  process.exit(1);
});
