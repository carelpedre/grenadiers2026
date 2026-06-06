import { useState, useMemo } from "react";
import { svgToPng, downloadPng, sharePng } from "../lib/shareCard";

// ╔═══════════════════════════════════════════════════════════════════════╗
// ║  PWONOSTIK SHARE CARD — shareable prediction image (1080×1350)        ║
// ║  Same brand tokens + PNG/share pipeline as the Onze/Quiz cards.       ║
// ║  Renders the user's current 3 Group-C picks. No persistence.          ║
// ╚═══════════════════════════════════════════════════════════════════════╝

const W = 1080;
const H = 1350;
const HAITI_BLUE = "#00209F";
const HAITI_BLUE_DARK = "#001770";
const HAITI_RED = "#D21034";
const GOLD = "#C8A45C";
const BG = "#FAFAF7";
const SHARE_URL = "https://grenadiers2026.com/jeux/pwonostik";
const FILENAME = "pwonostik-grenadiers2026.png";

const escapeXml = (s) =>
  String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");

function buildInner(predictions) {
  const cx = W / 2;
  const rows = predictions
    .map((p, i) => {
      const rowTop = 360 + i * 270;
      const cy = rowTop + 112;
      return `
      <rect x="70" y="${rowTop}" width="${W - 140}" height="205" rx="26" fill="${BG}" fill-opacity="0.06" stroke="${BG}" stroke-opacity="0.12" stroke-width="2"/>
      <text x="${cx}" y="${rowTop + 50}" font-family="Plus Jakarta Sans, sans-serif" font-size="22" font-weight="700" fill="${GOLD}" text-anchor="middle" letter-spacing="2">${escapeXml((p.date || "").toUpperCase())}</text>
      <text x="${cx - 165}" y="${cy + 20}" font-family="Plus Jakarta Sans, sans-serif" font-size="46" font-weight="700" fill="${BG}" text-anchor="end">${escapeXml(p.homeName)}</text>
      <text x="${cx}" y="${cy + 26}" font-family="Plus Jakarta Sans, sans-serif" font-size="68" font-weight="800" fill="${GOLD}" text-anchor="middle">${escapeXml(p.home)}<tspan fill="${BG}"> – </tspan>${escapeXml(p.away)}</text>
      <text x="${cx + 165}" y="${cy + 20}" font-family="Plus Jakarta Sans, sans-serif" font-size="46" font-weight="700" fill="${BG}" text-anchor="start">${escapeXml(p.awayName)}</text>
    `;
    })
    .join("");

  return `
    <defs>
      <linearGradient id="pwo-bg" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="${HAITI_BLUE}"/>
        <stop offset="100%" stop-color="${HAITI_BLUE_DARK}"/>
      </linearGradient>
    </defs>

    <rect width="${W}" height="${H}" fill="url(#pwo-bg)"/>

    <!-- Header -->
    <text x="60" y="120" font-family="Plus Jakarta Sans, sans-serif" font-size="30" font-weight="700" fill="${GOLD}" letter-spacing="4">MON PRONOSTIC</text>
    <text x="60" y="200" font-family="Plus Jakarta Sans, sans-serif" font-size="72" font-weight="800" fill="${BG}">Groupe C</text>
    <text x="60" y="252" font-family="Plus Jakarta Sans, sans-serif" font-size="28" font-weight="500" fill="${BG}" opacity="0.75">Coupe du Monde de la FIFA 2026</text>

    ${rows}

    <!-- Bottom strip -->
    <rect x="0" y="${H - 70}" width="${W * 0.33}" height="70" fill="${HAITI_BLUE_DARK}"/>
    <rect x="${W * 0.33}" y="${H - 70}" width="${W * 0.33}" height="70" fill="${HAITI_RED}"/>
    <rect x="${W * 0.66}" y="${H - 70}" width="${W * 0.34}" height="70" fill="${GOLD}"/>
    <text x="60" y="${H - 27}" font-family="Plus Jakarta Sans, sans-serif" font-size="22" font-weight="800" fill="${BG}" letter-spacing="2">GRENADIERS2026.COM</text>
    <text x="${W - 60}" y="${H - 27}" font-family="Plus Jakarta Sans, sans-serif" font-size="18" font-weight="600" fill="${BG}" text-anchor="end" opacity="0.85">en collaboration avec la FHF</text>
  `;
}

function buildString(predictions) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
${buildInner(predictions)}
</svg>`;
}

export default function PwonostikShareCard({ predictions, onClose }) {
  const [copyStatus, setCopyStatus] = useState("idle");
  const [busy, setBusy] = useState(false);

  const previewInner = useMemo(() => buildInner(predictions), [predictions]);

  function buildPng() {
    return svgToPng(buildString(predictions), { width: W, height: H, background: HAITI_BLUE_DARK });
  }

  async function handleDownload() {
    setBusy(true);
    try {
      const png = await buildPng();
      if (png) downloadPng(png, FILENAME);
    } catch (e) {
      console.error("Pwonostik PNG generation failed", e);
      alert("Impossible de générer l'image — réessayez ou faites une capture d'écran.");
    } finally {
      setBusy(false);
    }
  }

  async function handleShare() {
    setBusy(true);
    let png = null;
    try {
      png = await buildPng();
    } catch (e) {
      // share without the image if rasterization fails
    }
    const result = await sharePng(png, {
      title: "Mon pronostic — Grenadiers 2026",
      text: "Mon pronostic 🇭🇹 Grenadiers 2026 — Coupe du Monde, Groupe C",
      url: SHARE_URL,
      filename: FILENAME,
    });
    if (result === "copied") {
      setCopyStatus("copied");
      setTimeout(() => setCopyStatus("idle"), 2000);
    }
    setBusy(false);
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
          <h2 className="font-display text-xl mb-4">Mon pronostic · Groupe C</h2>

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
              disabled={busy}
              className="px-4 py-3 bg-haiti-blue hover:bg-haiti-blue-dark disabled:opacity-50 text-bg font-semibold rounded-full text-sm transition-colors"
            >
              ↓ Télécharger
            </button>
            <button
              onClick={handleShare}
              disabled={busy}
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
