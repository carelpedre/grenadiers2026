import { useState, useMemo, useEffect } from "react";
import { svgToPng, pngFile, saveImageSync, sharePngSync } from "../lib/shareCard";

// ╔═══════════════════════════════════════════════════════════════════════╗
// ║  DEVINE LE GRENADIER · carte de résultat partageable (1080×1350)       ║
// ║  Grille de couleurs façon Wordle (sans nom de joueur = sans spoiler).  ║
// ║  Même pipeline PNG/partage synchrone que les autres cartes.            ║
// ╚═══════════════════════════════════════════════════════════════════════╝

const W = 1080;
const H = 1350;
const HAITI_BLUE = "#00209F";
const HAITI_BLUE_DARK = "#001770";
const HAITI_RED = "#D21034";
const GOLD = "#C8A45C";
const BG = "#FAFAF7";
const HIT = "#16A34A";
const NEAR = "#E0A100";
const MISS = "#42597A";

const escapeXml = (s) =>
  String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");

const cellFill = (s) => (s === "hit" ? HIT : s === "near" ? NEAR : MISS);

function buildInner({ puzzle, scoreLabel, won, cols, grid }) {
  const cx = W / 2;
  const nCols = Math.max(1, cols.length);
  const gap = 18;
  const cell = Math.min(150, Math.floor((W - 200 - (nCols - 1) * gap) / nCols));
  const gridW = nCols * cell + (nCols - 1) * gap;
  const startX = cx - gridW / 2;
  const labelsY = 470;
  const gridTop = 500;

  const colLabels = cols
    .map((label, c) => {
      const x = startX + c * (cell + gap) + cell / 2;
      return `<text x="${x}" y="${labelsY}" font-family="Plus Jakarta Sans, sans-serif" font-size="20" font-weight="700" fill="${GOLD}" text-anchor="middle" letter-spacing="1">${escapeXml(label.toUpperCase())}</text>`;
    })
    .join("");

  const cells = grid
    .map((row, r) =>
      row
        .map((status, c) => {
          const x = startX + c * (cell + gap);
          const y = gridTop + r * (cell + gap);
          return `<rect x="${x}" y="${y}" width="${cell}" height="${cell}" rx="20" fill="${cellFill(status)}"/>`;
        })
        .join("")
    )
    .join("");

  return `
    <defs>
      <linearGradient id="dv-bg" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="${HAITI_BLUE}"/>
        <stop offset="100%" stop-color="${HAITI_BLUE_DARK}"/>
      </linearGradient>
    </defs>

    <rect width="${W}" height="${H}" fill="url(#dv-bg)"/>

    <!-- Header -->
    <text x="60" y="120" font-family="Plus Jakarta Sans, sans-serif" font-size="30" font-weight="700" fill="${GOLD}" letter-spacing="4">DEVINE LE GRENADIER</text>
    <text x="60" y="210" font-family="Plus Jakarta Sans, sans-serif" font-size="76" font-weight="800" fill="${BG}">Énigme nº${escapeXml(puzzle)}</text>
    <text x="60" y="280" font-family="Plus Jakarta Sans, sans-serif" font-size="40" font-weight="800" fill="${won ? HIT : HAITI_RED}">${won ? `Trouvé en ${escapeXml(scoreLabel)}` : `Raté · ${escapeXml(scoreLabel)}`}</text>
    <text x="60" y="330" font-family="Plus Jakarta Sans, sans-serif" font-size="26" font-weight="500" fill="${BG}" opacity="0.7">Coupe du Monde de la FIFA 2026 · 🇭🇹</text>

    ${colLabels}
    ${cells}

    <!-- Legend -->
    <g transform="translate(60, ${H - 150})" font-family="Plus Jakarta Sans, sans-serif" font-size="22" font-weight="600">
      <rect x="0" y="-20" width="28" height="28" rx="7" fill="${HIT}"/><text x="40" y="2" fill="${BG}">Exact</text>
      <rect x="180" y="-20" width="28" height="28" rx="7" fill="${NEAR}"/><text x="220" y="2" fill="${BG}">Proche</text>
      <rect x="380" y="-20" width="28" height="28" rx="7" fill="${MISS}"/><text x="420" y="2" fill="${BG}">Loin</text>
    </g>

    <!-- Bottom strip -->
    <rect x="0" y="${H - 70}" width="${W * 0.33}" height="70" fill="${HAITI_BLUE_DARK}"/>
    <rect x="${W * 0.33}" y="${H - 70}" width="${W * 0.33}" height="70" fill="${HAITI_RED}"/>
    <rect x="${W * 0.66}" y="${H - 70}" width="${W * 0.34}" height="70" fill="${GOLD}"/>
    <text x="60" y="${H - 27}" font-family="Plus Jakarta Sans, sans-serif" font-size="22" font-weight="800" fill="${BG}" letter-spacing="2">GRENADIERS2026.COM/JEUX/DEVINE</text>
  `;
}

function buildString(data) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
${buildInner(data)}
</svg>`;
}

export default function DevineShareCard({ puzzle, scoreLabel, won, cols, grid, onClose }) {
  const [copyStatus, setCopyStatus] = useState("idle");
  const [png, setPng] = useState(null);
  const [file, setFile] = useState(null);
  const [ready, setReady] = useState(false);

  const data = { puzzle, scoreLabel, won, cols, grid };
  const previewInner = useMemo(() => buildInner(data), [puzzle, scoreLabel, won, cols, grid]);

  const FILENAME = `devine-grenadier-${puzzle}.png`;
  const SHARE_META = {
    title: "Devine le Grenadier · Grenadiers 2026",
    text: `Devine le Grenadier nº${puzzle} · ${scoreLabel} 🇭🇹 Grenadiers 2026`,
    url: "https://grenadiers2026.com/jeux/devine",
  };

  useEffect(() => {
    let cancelled = false;
    setReady(false);
    setPng(null);
    setFile(null);
    (async () => {
      try {
        const dataUrl = await svgToPng(buildString(data), { width: W, height: H, background: HAITI_BLUE_DARK });
        if (cancelled) return;
        setPng(dataUrl);
        setFile(await pngFile(dataUrl, FILENAME));
      } catch (e) {
        if (!cancelled) console.error("Devine PNG generation failed", e);
      } finally {
        if (!cancelled) setReady(true);
      }
    })();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [puzzle]);

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
          <h2 className="font-display text-xl mb-4">Mon résultat · Énigme nº{puzzle}</h2>

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
