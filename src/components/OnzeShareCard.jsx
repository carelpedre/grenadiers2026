import { useState, useMemo, useEffect } from "react";
import { svgToPng, pngFile, saveImageSync, sharePngSync, imageToDataURL } from "../lib/shareCard";

// ╔═══════════════════════════════════════════════════════════════════════╗
// ║  ONZE SHARE CARD — shareable starting-XI image (1080×1920, 9:16)      ║
// ║  Realistic green striped pitch with full markings; the XI sits well    ║
// ║  inside the field with clear top/bottom margins (no player on the      ║
// ║  goal line, none jammed in the boxes).                                 ║
// ╚═══════════════════════════════════════════════════════════════════════╝

const W = 1080;
const H = 1920;
const HAITI_BLUE = "#00209F";
const HAITI_BLUE_DARK = "#001770";
const HAITI_RED = "#D21034";
const GOLD = "#C8A45C";
const BG = "#FAFAF7";
const SHARE_URL = "https://grenadiers2026.com/jeux/onze";
const FILENAME = "mon-onze-grenadiers2026.png";

const surname = (name) => (name || "").trim().split(/\s+/).slice(-1)[0] || name;
const escapeXml = (s) =>
  String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");

// Portrait pitch inside the card. Generous padTop/padBottom keep the formation
// off the goal lines: formation coords (x,y in %, y:0 attack → 100 keeper) map
// into the padded interior, so the striker lands below the top box and the
// keeper sits near his penalty spot rather than on the line.
const PITCH = { x: 80, y: 285, w: 920, h: 1500, padX: 60, padTop: 120, padBottom: 66 };
// Raw formation coords only reach ~16–84% wide; SPREAD pushes the wide players
// out toward the touchlines around the centre (x=50), clamped so tiles stay on
// the pitch. Vertical placement is untouched.
const SPREAD = 1.32;
function place(slot) {
  const sx = Math.max(5, Math.min(95, 50 + (slot.x - 50) * SPREAD));
  const px = PITCH.x + PITCH.padX + (sx / 100) * (PITCH.w - 2 * PITCH.padX);
  const py = PITCH.y + PITCH.padTop + (slot.y / 100) * (PITCH.h - PITCH.padTop - PITCH.padBottom);
  return { px, py };
}

function pitchMarkup() {
  const x0 = PITCH.x, y0 = PITCH.y, w = PITCH.w, h = PITCH.h;
  const cx = x0 + w / 2, cy = y0 + h / 2;
  const inset = 22;
  const bx = x0 + inset, by = y0 + inset, bw = w - 2 * inset, bh = h - 2 * inset;
  const bx1 = bx + bw, by1 = by + bh;
  const GA = "#2f8f3e", GB = "#27802f", LINE = "rgba(255,255,255,0.72)";
  const stripeN = 10, band = h / stripeN;
  const stripes = Array.from({ length: stripeN }, (_, i) =>
    `<rect x="${x0}" y="${y0 + i * band}" width="${w}" height="${band}" fill="${i % 2 ? GA : GB}"/>`
  ).join("");
  const penH = Math.round(h * 0.14);            // penalty box depth
  const penW = Math.round(w * 0.46), penX = cx - penW / 2;
  const goalH = Math.round(h * 0.04);           // 6-yard box depth
  const goalW = Math.round(w * 0.2), goalX = cx - goalW / 2;
  const spotD = Math.round(penH * 0.62);        // penalty spot distance from goal line
  const ccR = Math.round(w * 0.12);             // center circle radius
  const arcR = 96, half = 64;                   // penalty "D"
  return `
    <clipPath id="pitch-grass"><rect x="${x0}" y="${y0}" width="${w}" height="${h}" rx="26"/></clipPath>
    <g clip-path="url(#pitch-grass)">
      <rect x="${x0}" y="${y0}" width="${w}" height="${h}" fill="${GB}"/>
      ${stripes}
    </g>
    <g fill="none" stroke="${LINE}" stroke-width="3">
      <rect x="${bx}" y="${by}" width="${bw}" height="${bh}" rx="6"/>
      <line x1="${bx}" y1="${cy}" x2="${bx1}" y2="${cy}"/>
      <circle cx="${cx}" cy="${cy}" r="${ccR}"/>
      <rect x="${penX}" y="${by}" width="${penW}" height="${penH}"/>
      <rect x="${goalX}" y="${by}" width="${goalW}" height="${goalH}"/>
      <rect x="${penX}" y="${by1 - penH}" width="${penW}" height="${penH}"/>
      <rect x="${goalX}" y="${by1 - goalH}" width="${goalW}" height="${goalH}"/>
      <path d="M ${cx - half} ${by + penH} A ${arcR} ${arcR} 0 0 1 ${cx + half} ${by + penH}"/>
      <path d="M ${cx - half} ${by1 - penH} A ${arcR} ${arcR} 0 0 0 ${cx + half} ${by1 - penH}"/>
      <path d="M ${bx + 18} ${by} A 18 18 0 0 0 ${bx} ${by + 18}"/>
      <path d="M ${bx1 - 18} ${by} A 18 18 0 0 1 ${bx1} ${by + 18}"/>
      <path d="M ${bx} ${by1 - 18} A 18 18 0 0 0 ${bx + 18} ${by1}"/>
      <path d="M ${bx1} ${by1 - 18} A 18 18 0 0 1 ${bx1 - 18} ${by1}"/>
    </g>
    <g fill="${LINE}">
      <circle cx="${cx}" cy="${cy}" r="5"/>
      <circle cx="${cx}" cy="${by + spotD}" r="5"/>
      <circle cx="${cx}" cy="${by1 - spotD}" r="5"/>
    </g>
    <g fill="rgba(255,255,255,0.9)">
      <rect x="${cx - 55}" y="${by - 6}" width="110" height="12" rx="2"/>
      <rect x="${cx - 55}" y="${by1 - 6}" width="110" height="12" rx="2"/>
    </g>
  `;
}

function buildInner(formation, lineup, photoFor, coach) {
  const R = 60;
  const tiles = lineup
    .map((slot, i) => {
      const p = slot.player;
      const { px, py } = place(slot);
      const src = p ? photoFor(p) : null;
      const clip = `onze-clip-${i}`;
      const initials = p ? escapeXml(String(p.name).split(" ").map((n) => n[0]).join("").slice(0, 2)) : "";
      const photo = src
        ? `<image href="${escapeXml(src)}" x="${px - R}" y="${py - R}" width="${R * 2}" height="${R * 2}" preserveAspectRatio="xMidYMid slice" clip-path="url(#${clip})"/>`
        : `<text x="${px}" y="${py + 14}" font-family="Plus Jakarta Sans, sans-serif" font-size="40" font-weight="800" fill="${BG}" text-anchor="middle">${initials}</text>`;
      return `
      <clipPath id="${clip}"><circle cx="${px}" cy="${py}" r="${R}"/></clipPath>
      <circle cx="${px}" cy="${py}" r="${R}" fill="${HAITI_BLUE_DARK}"/>
      ${photo}
      <circle cx="${px}" cy="${py}" r="${R}" fill="none" stroke="${BG}" stroke-width="4"/>
      <circle cx="${px + 42}" cy="${py + 42}" r="23" fill="${HAITI_BLUE_DARK}" stroke="${BG}" stroke-width="2"/>
      <text x="${px + 42}" y="${py + 50}" font-family="Plus Jakarta Sans, sans-serif" font-size="25" font-weight="800" fill="${GOLD}" text-anchor="middle">${p && p.number != null ? escapeXml(p.number) : ""}</text>
      <text x="${px}" y="${py + R + 36}" font-family="Plus Jakarta Sans, sans-serif" font-size="27" font-weight="700" fill="${BG}" text-anchor="middle" stroke="#0a1f1a" stroke-width="0.6" paint-order="stroke">${p ? escapeXml(surname(p.name)) : ""}</text>
    `;
    })
    .join("");

  return `
    <defs>
      <linearGradient id="onze-bg" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="${HAITI_BLUE}"/>
        <stop offset="100%" stop-color="${HAITI_BLUE_DARK}"/>
      </linearGradient>
    </defs>

    <rect width="${W}" height="${H}" fill="url(#onze-bg)"/>

    <text x="60" y="118" font-family="Plus Jakarta Sans, sans-serif" font-size="30" font-weight="700" fill="${GOLD}" letter-spacing="4">MON ONZE DE DÉPART</text>
    <text x="60" y="208" font-family="Plus Jakarta Sans, sans-serif" font-size="76" font-weight="800" fill="${BG}">${escapeXml(formation)}</text>
    ${coach ? `<text x="${W - 60}" y="126" font-family="Plus Jakarta Sans, sans-serif" font-size="26" font-weight="700" fill="${GOLD}" text-anchor="end" letter-spacing="3">SÉLECTIONNEUR</text>
    <text x="${W - 60}" y="200" font-family="Plus Jakarta Sans, sans-serif" font-size="46" font-weight="800" fill="${BG}" text-anchor="end">${escapeXml(coach)}</text>` : ""}

    ${pitchMarkup()}

    ${tiles}

    <rect x="0" y="${H - 70}" width="${W * 0.33}" height="70" fill="${HAITI_BLUE_DARK}"/>
    <rect x="${W * 0.33}" y="${H - 70}" width="${W * 0.33}" height="70" fill="${HAITI_RED}"/>
    <rect x="${W * 0.66}" y="${H - 70}" width="${W * 0.34}" height="70" fill="${GOLD}"/>
    <text x="60" y="${H - 27}" font-family="Plus Jakarta Sans, sans-serif" font-size="22" font-weight="800" fill="${BG}" letter-spacing="2">GRENADIERS2026.COM</text>
    <text x="${W - 60}" y="${H - 27}" font-family="Plus Jakarta Sans, sans-serif" font-size="18" font-weight="600" fill="${BG}" text-anchor="end" opacity="0.85">en collaboration avec la FHF</text>
  `;
}

function buildString(formation, lineup, photoMap, coach) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
${buildInner(formation, lineup, (p) => photoMap[p.slug] ?? p.photo, coach)}
</svg>`;
}

export default function OnzeShareCard({ formation, lineup, coach = "", onClose }) {
  const [copyStatus, setCopyStatus] = useState("idle");
  const [png, setPng] = useState(null);
  const [file, setFile] = useState(null);
  const [ready, setReady] = useState(false);

  const coachName = (coach || "").trim();

  const previewInner = useMemo(() => buildInner(formation, lineup, (p) => p.photo, coachName), [formation, lineup, coachName]);

  const SHARE_META = {
    title: "Mon Onze de Départ — Grenadiers 2026",
    text: `Mon Onze de Départ 🇭🇹 Grenadiers 2026 — ${formation}${coachName ? ` · par ${coachName}` : ""}`,
    url: SHARE_URL,
  };

  // Stable signature so the build effect only re-runs when the lineup actually
  // changes (the parent passes a fresh `lineup` array on every render).
  const sig = useMemo(
    () => formation + "|" + coachName + "|" + lineup.map((s) => (s.player ? s.player.slug : "_")).join(","),
    [formation, coachName, lineup]
  );

  // Pre-build the PNG + File when the modal opens (photos embedded as base64)
  // so the Save/Share taps stay synchronous → iOS shows "Save Image" → Photos.
  useEffect(() => {
    let cancelled = false;
    setReady(false);
    setPng(null);
    setFile(null);
    (async () => {
      try {
        const entries = await Promise.all(
          lineup
            .filter((s) => s.player)
            .map(async (s) => [s.player.slug, await imageToDataURL(s.player.photo)])
        );
        const photoMap = Object.fromEntries(entries);
        const dataUrl = await svgToPng(buildString(formation, lineup, photoMap, coachName), { width: W, height: H, background: HAITI_BLUE_DARK });
        if (cancelled) return;
        setPng(dataUrl);
        setFile(await pngFile(dataUrl, FILENAME));
      } catch (e) {
        if (!cancelled) console.error("Onze PNG generation failed", e);
      } finally {
        if (!cancelled) setReady(true);
      }
    })();
    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sig]);

  function handleDownload() {
    if (!png) {
      alert("Image en cours de génération — réessayez dans un instant.");
      return;
    }
    saveImageSync(file, png, { ...SHARE_META, filename: FILENAME });
  }

  function handleShare() {
    sharePngSync(file, png, SHARE_META, () => {
      setCopyStatus("copied");
      setTimeout(() => setCopyStatus("idle"), 2000);
    });
  }

  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-ink/80 backdrop-blur-sm" />
      <div className="relative bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-10 w-10 h-10 rounded-full bg-ink/60 hover:bg-ink/80 text-bg flex items-center justify-center backdrop-blur-sm"
          aria-label="Fermer"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="p-5">
          <p className="text-haiti-red text-xs uppercase tracking-wider font-bold mb-1">Carte de partage</p>
          <h2 className="font-display text-xl mb-4">Mon onze de départ · {formation}</h2>

          <div className="rounded-lg overflow-hidden border border-line">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox={`0 0 ${W} ${H}`}
              className="w-full h-auto block"
              dangerouslySetInnerHTML={{ __html: previewInner }}
            />
          </div>

          <div className="grid grid-cols-2 gap-3 mt-5">
            <button
              onClick={handleDownload}
              disabled={!png}
              className="px-4 py-3 bg-haiti-blue hover:bg-haiti-blue-dark disabled:opacity-50 text-bg font-semibold rounded-full text-sm transition-colors"
            >
              ⬇ Enregistrer l'image
            </button>
            <button
              onClick={handleShare}
              disabled={!ready}
              className="px-4 py-3 bg-haiti-red hover:bg-haiti-red-dark disabled:opacity-50 text-bg font-semibold rounded-full text-sm transition-colors"
            >
              {copyStatus === "copied" ? "Copié ✓" : "Partager"}
            </button>
          </div>
          <p className="text-xs text-muted text-center mt-3">
            Enregistrez l'image et publiez-la sur vos stories.
          </p>
        </div>
      </div>
    </div>
  );
}
