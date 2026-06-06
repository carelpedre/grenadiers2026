import { useState, useRef } from "react";
import { svgToPng, downloadPng, sharePng, imageToDataURL } from "../lib/shareCard";

// ╔═══════════════════════════════════════════════════════════════════════╗
// ║  PLAYER SHARE CARD                                                     ║
// ║                                                                        ║
// ║  Renders an SVG card with a player's photo, stats, and brand chrome.   ║
// ║  Two actions:                                                          ║
// ║    1. "Download card" — generates a PNG and saves to user's device     ║
// ║    2. "Share / copy link" — uses Web Share API or copies the URL       ║
// ║                                                                        ║
// ║  Why SVG? Because it renders crisp at any size, can be converted to    ║
// ║  PNG client-side without any server, and doesn't need html2canvas.     ║
// ╚═══════════════════════════════════════════════════════════════════════╝

const W = 1080;
const H = 1350; // Instagram portrait 4:5

const HAITI_BLUE = "#00209F";
const HAITI_BLUE_DARK = "#001770";
const HAITI_RED = "#D21034";
const GOLD = "#C8A45C";
const BG = "#FAFAF7";

export default function PlayerShareCard({ player, onClose }) {
  const [imageDataUrl, setImageDataUrl] = useState(null);
  const [copyStatus, setCopyStatus] = useState("idle");
  const svgRef = useRef(null);

  const isStar = player.star;
  const isCaptain = player.captain;
  const playerUrl = `https://grenadiers2026.com/squad`;

  // ─── Build the PNG (embeds the player photo as base64) ───────────────
  async function generatePng() {
    const photoDataUrl = await imageToDataURL(player.photo);
    const svgString = buildSvgString(player, photoDataUrl);
    return svgToPng(svgString, { width: W, height: H, background: BG });
  }

  async function handleDownload() {
    try {
      const png = await generatePng();
      if (!png) return;
      downloadPng(png, `${player.slug || "grenadier"}-grenadiers2026.png`);
    } catch (e) {
      console.error("PNG generation failed", e);
      alert("Couldn't generate the image — please try again or take a screenshot.");
    }
  }

  async function handleShare() {
    let png = null;
    try {
      png = await generatePng();
    } catch (e) {
      // Share without the image if rasterization fails
    }
    const result = await sharePng(png, {
      title: `${player.name} — Grenadiers 2026`,
      text: `${player.name} — Haiti at the FIFA World Cup 2026 🇭🇹`,
      url: playerUrl,
      filename: `${player.slug}-grenadiers2026.png`,
    });
    if (result === "copied") {
      setCopyStatus("copied");
      setTimeout(() => setCopyStatus("idle"), 2000);
    }
  }

  return (
    <div
      className="fixed inset-0 z-[90] flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-ink/80 backdrop-blur-sm" />
      <div
        className="relative bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
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
          <h2 className="font-display text-xl mb-4">{player.name}</h2>

          {/* SVG preview */}
          <div className="rounded-lg overflow-hidden border border-line">
            <svg
              ref={svgRef}
              xmlns="http://www.w3.org/2000/svg"
              viewBox={`0 0 ${W} ${H}`}
              className="w-full h-auto block"
              dangerouslySetInnerHTML={{ __html: buildSvgInner(player, player.photo) }}
            />
          </div>

          <div className="grid grid-cols-2 gap-3 mt-5">
            <button
              onClick={handleDownload}
              className="px-4 py-3 bg-haiti-blue hover:bg-haiti-blue-dark text-bg font-semibold rounded-full text-sm transition-colors"
            >
              ↓ Télécharger
            </button>
            <button
              onClick={handleShare}
              className="px-4 py-3 bg-haiti-red hover:bg-haiti-red-dark text-bg font-semibold rounded-full text-sm transition-colors"
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

// ─── SVG content (used both for preview render and PNG conversion) ───
function buildSvgInner(player, photoSrc) {
  const isStar = player.star;
  const isCaptain = player.captain;
  const accent = isStar || isCaptain;
  const accentColor = isCaptain ? HAITI_BLUE : HAITI_RED;

  const escapeXml = (s) =>
    String(s || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");

  return `
    <defs>
      <linearGradient id="bg-grad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="${HAITI_BLUE}"/>
        <stop offset="100%" stop-color="${HAITI_BLUE_DARK}"/>
      </linearGradient>
      <linearGradient id="photo-fade" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="50%" stop-color="${HAITI_BLUE_DARK}" stop-opacity="0"/>
        <stop offset="100%" stop-color="${HAITI_BLUE_DARK}" stop-opacity="0.95"/>
      </linearGradient>
      <clipPath id="photo-clip">
        <rect x="0" y="0" width="${W}" height="${Math.floor(H * 0.55)}"/>
      </clipPath>
    </defs>

    <rect width="${W}" height="${H}" fill="url(#bg-grad)"/>

    ${photoSrc ? `
      <g clip-path="url(#photo-clip)">
        <image href="${escapeXml(photoSrc)}" x="0" y="0" width="${W}" height="${Math.floor(H * 0.55)}" preserveAspectRatio="xMidYMid slice"/>
        <rect x="0" y="0" width="${W}" height="${Math.floor(H * 0.55)}" fill="url(#photo-fade)"/>
      </g>
    ` : `
      <rect x="0" y="0" width="${W}" height="${Math.floor(H * 0.55)}" fill="${HAITI_BLUE_DARK}"/>
      <text x="${W / 2}" y="${Math.floor(H * 0.3)}" font-family="Plus Jakarta Sans, sans-serif" font-size="200" font-weight="800" fill="${BG}" text-anchor="middle" opacity="0.15">${escapeXml(player.name.split(" ").map(n => n[0]).join("").slice(0,2))}</text>
    `}

    <!-- Position pill -->
    <g transform="translate(60, 60)">
      <rect width="220" height="46" rx="23" fill="${BG}" fill-opacity="0.15"/>
      <text x="110" y="30" font-family="Plus Jakarta Sans, sans-serif" font-size="20" font-weight="700" fill="${BG}" text-anchor="middle" letter-spacing="1.5">${escapeXml((player.positionFull || "PLAYER").toUpperCase())}</text>
    </g>

    ${accent ? `
      <g transform="translate(${W - 260}, 60)">
        <rect width="200" height="46" rx="23" fill="${accentColor}"/>
        <text x="100" y="30" font-family="Plus Jakarta Sans, sans-serif" font-size="20" font-weight="700" fill="${BG}" text-anchor="middle" letter-spacing="1.5">${isCaptain ? "CAPITAINE" : "CADRE"}</text>
      </g>
    ` : ""}

    <!-- Player number -->
    ${player.number ? `
      <text x="60" y="${Math.floor(H * 0.5)}" font-family="Plus Jakarta Sans, sans-serif" font-size="120" font-weight="800" fill="${GOLD}">${player.number}</text>
    ` : ""}

    <!-- Name -->
    <text x="60" y="${Math.floor(H * 0.62)}" font-family="Plus Jakarta Sans, sans-serif" font-size="84" font-weight="800" fill="${BG}">
      ${wrapTspans(player.name, 60, Math.floor(H * 0.62), 84, 14)}
    </text>

    <!-- Club -->
    <text x="60" y="${Math.floor(H * 0.74)}" font-family="Plus Jakarta Sans, sans-serif" font-size="28" font-weight="500" fill="${BG}" opacity="0.85">
      ${escapeXml(player.club || "")}${player.clubCountry ? ` · ${escapeXml(player.clubCountry)}` : ""}
    </text>

    <!-- Stats row -->
    <g transform="translate(60, ${Math.floor(H * 0.81)})">
      ${player.caps != null ? `
        <g transform="translate(0, 0)">
          <text font-family="Plus Jakarta Sans, sans-serif" font-size="64" font-weight="800" fill="${BG}">${escapeXml(player.caps)}</text>
          <text y="34" font-family="Plus Jakarta Sans, sans-serif" font-size="18" font-weight="700" fill="${GOLD}" letter-spacing="1.5">SÉLECTIONS</text>
        </g>
      ` : ""}
      ${(player.goals != null && player.goals > 0) ? `
        <g transform="translate(260, 0)">
          <text font-family="Plus Jakarta Sans, sans-serif" font-size="64" font-weight="800" fill="${HAITI_RED}">${escapeXml(player.goals)}</text>
          <text y="34" font-family="Plus Jakarta Sans, sans-serif" font-size="18" font-weight="700" fill="${GOLD}" letter-spacing="1.5">BUTS</text>
        </g>
      ` : ""}
      ${player.age ? `
        <g transform="translate(460, 0)">
          <text font-family="Plus Jakarta Sans, sans-serif" font-size="64" font-weight="800" fill="${BG}">${escapeXml(player.age)}</text>
          <text y="34" font-family="Plus Jakarta Sans, sans-serif" font-size="18" font-weight="700" fill="${GOLD}" letter-spacing="1.5">ANS</text>
        </g>
      ` : ""}
      ${player.height ? `
        <g transform="translate(660, 0)">
          <text font-family="Plus Jakarta Sans, sans-serif" font-size="64" font-weight="800" fill="${BG}">${(player.height / 100).toFixed(2)}<tspan font-size="40" dx="6">m</tspan></text>
          <text y="34" font-family="Plus Jakarta Sans, sans-serif" font-size="18" font-weight="700" fill="${GOLD}" letter-spacing="1.5">TAILLE</text>
        </g>
      ` : ""}
    </g>

    <!-- Bottom strip + URL -->
    <rect x="0" y="${H - 70}" width="${W * 0.33}" height="70" fill="${HAITI_BLUE_DARK}"/>
    <rect x="${W * 0.33}" y="${H - 70}" width="${W * 0.33}" height="70" fill="${HAITI_RED}"/>
    <rect x="${W * 0.66}" y="${H - 70}" width="${W * 0.34}" height="70" fill="${GOLD}"/>

    <text x="60" y="${H - 27}" font-family="Plus Jakarta Sans, sans-serif" font-size="22" font-weight="800" fill="${BG}" letter-spacing="2">GRENADIERS2026.COM</text>
    <text x="${W - 60}" y="${H - 27}" font-family="Plus Jakarta Sans, sans-serif" font-size="18" font-weight="600" fill="${BG}" text-anchor="end" opacity="0.85">en collaboration avec la FHF</text>
  `;
}

function buildSvgString(player, photoDataUrl) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
${buildSvgInner(player, photoDataUrl)}
</svg>`;
}

// Helper: wrap long text into multiple tspan lines
function wrapTspans(text, x, y, fontSize, maxChars) {
  const escapeXml = (s) =>
    String(s || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");
  const words = String(text).split(" ");
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
  return lines.map((line, i) => `<tspan x="${x}" dy="${i === 0 ? 0 : fontSize * 1.05}">${escapeXml(line)}</tspan>`).join("");
}
