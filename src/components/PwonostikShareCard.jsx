import { useState, useMemo, useEffect } from "react";
import { svgToPng, pngFile, saveImageSync, sharePngSync } from "../lib/shareCard";

// ╔═══════════════════════════════════════════════════════════════════════╗
// ║  PWONOSTIK SHARE CARD · shareable prediction image (1080×1350)        ║
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
    <text x="${W - 60}" y="${H - 27}" font-family="Plus Jakarta Sans, sans-serif" font-size="18" font-weight="600" fill="${BG}" text-anchor="end" opacity="0.85">Un projet de Carel Pedre</text>
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
  const [png, setPng] = useState(null);
  const [file, setFile] = useState(null);
  const [ready, setReady] = useState(false);

  const previewInner = useMemo(() => buildInner(predictions), [predictions]);

  const SHARE_META = {
    title: "Mon pronostic · Grenadiers 2026",
    text: "Mon pronostic 🇭🇹 Grenadiers 2026 · Coupe du Monde, Groupe C",
    url: SHARE_URL,
  };

  // Stable signature so the build effect only re-runs when the picks change.
  const sig = useMemo(
    () =>
      (predictions || [])
        .map((p) => `${p.date}|${p.homeName}:${p.home}-${p.away}:${p.awayName}`)
        .join(","),
    [predictions]
  );

  // Pre-build the PNG + File when the modal opens so the Save/Share taps stay
  // synchronous → iOS keeps the tap activation and the share sheet exposes
  // "Save Image" → Photos (and shares the actual card, not just the page).
  useEffect(() => {
    let cancelled = false;
    setReady(false);
    setPng(null);
    setFile(null);
    (async () => {
      try {
        const dataUrl = await svgToPng(buildString(predictions), {
          width: W,
          height: H,
          background: HAITI_BLUE_DARK,
        });
        if (cancelled) return;
        setPng(dataUrl);
        setFile(await pngFile(dataUrl, FILENAME));
      } catch (e) {
        if (!cancelled) console.error("Pwonostik PNG generation failed", e);
      } finally {
        if (!cancelled) setReady(true);
      }
    })();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sig]);

  function handleDownload() {
    if (!png) {
      alert("Image en cours de génération · réessayez dans un instant.");
      return;
    }
    saveImageSync(file, png, { ...SHARE_META, filename: FILENAME });
  }

  function handleShare() {
    sharePngSync(file, png, { ...SHARE_META, filename: FILENAME }, () => {
      setCopyStatus("copied");
      setTimeout(() => setCopyStatus("idle"), 2000);
    });
  }

  return (
    <div className="fixed inset-0 z-[90] flex items-end sm:items-center justify-center sm:p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-ink/80 backdrop-blur-sm" />
      <div
        className="relative bg-white w-full sm:max-w-md rounded-t-2xl sm:rounded-lg flex flex-col max-h-[92dvh] overflow-hidden shadow-2xl"
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

        <div className="overflow-y-auto p-5 min-h-0">
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
        </div>

        <div
          className="border-t border-line bg-white px-5 pt-3"
          style={{ paddingBottom: "max(env(safe-area-inset-bottom), 16px)" }}
        >
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={handleDownload}
              disabled={!ready}
              className="px-4 py-3 bg-haiti-blue hover:bg-haiti-blue-dark disabled:opacity-50 text-bg font-semibold rounded-full text-sm transition-colors"
            >
              {ready ? "↓ Enregistrer" : "…"}
            </button>
            <button
              onClick={handleShare}
              disabled={!ready}
              className="px-4 py-3 bg-haiti-red hover:bg-haiti-red-dark disabled:opacity-50 text-bg font-semibold rounded-full text-sm transition-colors"
            >
              {copyStatus === "copied" ? "Copié ✓" : "Partager"}
            </button>
          </div>
          <p className="text-xs text-muted text-center mt-2">
            « Enregistrer » → Enregistrer l'image (Photos). « Partager » → stories, Messages…
          </p>
        </div>
      </div>
    </div>
  );
}
