import { useState, useEffect } from "react";
import { composeCardBlob, saveImageSync, sharePngSync, imageToDataURL } from "../lib/shareCard";
import { useT } from "../lib/i18n";

// Map stored French position label → shared role key for t("onze.role.*").
const POS_ROLE = { Gardien: "GK", "Défenseur": "DEF", Milieu: "MID", Attaquant: "FWD" };

// ╔═══════════════════════════════════════════════════════════════════════╗
// ║  PLAYER SHARE CARD                                                     ║
// ║                                                                        ║
// ║  Renders an SVG card with a player's photo, stats, and brand chrome.   ║
// ║  Two actions:                                                          ║
// ║    1. "Download card" · generates a PNG and saves to user's device     ║
// ║    2. "Share / copy link" · uses Web Share API or copies the URL       ║
// ║                                                                        ║
// ║  Why SVG? Because it renders crisp at any size, can be converted to    ║
// ║  PNG client-side without any server, and doesn't need html2canvas.     ║
// ╚═══════════════════════════════════════════════════════════════════════╝

const W = 1080;
const H = 1350; // Instagram portrait 4:5

// Layout: the photo takes ~70% of the card so the face has room; the navy info
// panel is the bottom ~30%. Number + name overlay the photo's faded bottom,
// club + stats sit in the panel. Both renderers (preview SVG + export overlay)
// use these so they stay in sync.
const PHOTO_H = Math.floor(H * 0.7);
const NUM_Y = Math.floor(H * 0.585);
const NAME_Y = Math.floor(H * 0.685);
const CLUB_Y = Math.floor(H * 0.795);
const STATS_Y = Math.floor(H * 0.85);

const HAITI_BLUE = "#00209F";
const HAITI_BLUE_DARK = "#001770";
const HAITI_RED = "#D21034";
const GOLD = "#C8A45C";
const BG = "#FAFAF7";

// Canvas background paint · the FHF blue gradient (drawn directly so no raster
// needs to live inside the SVG → keeps the canvas origin-clean on iOS).
function paintPlayerBg(ctx, w, h) {
  const g = ctx.createLinearGradient(0, 0, 0, h);
  g.addColorStop(0, HAITI_BLUE);
  g.addColorStop(1, HAITI_BLUE_DARK);
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, w, h);
}

export default function PlayerShareCard({ player, onClose }) {
  const { t } = useT();
  const [copyStatus, setCopyStatus] = useState("idle");
  const [file, setFile] = useState(null);
  const [downloadUrl, setDownloadUrl] = useState(null);
  const [ready, setReady] = useState(false);

  // Resolved labels baked into the SVG card (kept out of the pure builders).
  const roleKey = POS_ROLE[player.positionFull];
  const labels = {
    position: roleKey ? t(`onze.role.${roleKey}`) : t("squad.playerGeneric"),
    captain: t("squad.role.captain"),
    star: t("squad.starTag"),
    caps: t("squad.label.caps"),
    goals: t("squad.label.goals"),
    age: t("squad.ageUnit"),
    height: t("squad.label.height"),
    byline: t("share.byline"),
  };

  const playerUrl = `https://grenadiers2026.com/squad`;
  const FILENAME = `${player.slug || "grenadier"}-grenadiers2026.png`;
  const SHARE_META = {
    title: `${player.name} · Grenadiers 2026`,
    text: t("share.metaText").replace("{name}", player.name),
    url: playerUrl,
  };

  // Pre-build the PNG Blob + File when the modal opens, so Save/Share taps run
  // synchronously inside the user gesture (iOS) → the native sheet offers
  // "Save Image" → Photos and shares the actual card. The photo is composited
  // directly on the canvas (NOT via an SVG <image>), which is what keeps
  // toBlob() from throwing a SecurityError on WebKit.
  useEffect(() => {
    let cancelled = false;
    let objUrl = null;
    setReady(false);
    setFile(null);
    setDownloadUrl(null);
    (async () => {
      try {
        const photoDataUrl = await imageToDataURL(player.photo); // local → base64
        const blob = await composeCardBlob({
          width: W,
          height: H,
          paintBackground: paintPlayerBg,
          photo: photoDataUrl
            ? { dataUrl: photoDataUrl, x: 0, y: 0, w: W, h: PHOTO_H, focusY: 0.04 }
            : null,
          overlaySvg: buildOverlayString(player, !!photoDataUrl, labels),
        });
        if (cancelled || !blob) return;
        objUrl = URL.createObjectURL(blob);
        setFile(new File([blob], FILENAME, { type: "image/png" }));
        setDownloadUrl(objUrl);
      } catch (e) {
        if (!cancelled) console.error("Player card generation failed", e);
      } finally {
        if (!cancelled) setReady(true);
      }
    })();
    return () => {
      cancelled = true;
      if (objUrl) URL.revokeObjectURL(objUrl);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [player.slug]);

  function handleDownload() {
    if (!file && !downloadUrl) {
      alert(t("share.generating"));
      return;
    }
    saveImageSync(file, downloadUrl, { filename: FILENAME });
  }

  function handleShare() {
    sharePngSync(file, downloadUrl, { ...SHARE_META, filename: FILENAME }, () => {
      setCopyStatus("copied");
      setTimeout(() => setCopyStatus("idle"), 2000);
    });
  }

  return (
    <div
      className="fixed inset-0 z-[90] flex items-end sm:items-center justify-center sm:p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-ink/80 backdrop-blur-sm" />
      {/* Sheet: dynamic viewport height + flex column so the footer never scrolls away */}
      <div
        className="relative bg-white w-full sm:max-w-md rounded-t-2xl sm:rounded-lg flex flex-col max-h-[92dvh] overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-10 w-10 h-10 rounded-full bg-ink/60 hover:bg-ink/80 text-bg flex items-center justify-center backdrop-blur-sm"
          aria-label={t("onze.close")}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Scrollable content (preview) */}
        <div className="overflow-y-auto p-5 min-h-0">
          <p className="text-haiti-red text-xs uppercase tracking-wider font-bold mb-1">{t("share.title")}</p>
          <h2 className="font-display text-xl mb-4">{player.name}</h2>

          <div className="rounded-lg overflow-hidden border border-line">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox={`0 0 ${W} ${H}`}
              className="w-full h-auto block"
              dangerouslySetInnerHTML={{ __html: buildSvgInner(player, player.photo, labels) }}
            />
          </div>
        </div>

        {/* Sticky footer · always visible, padded for the iOS home indicator */}
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
              {ready ? t("share.save") : "…"}
            </button>
            <button
              onClick={handleShare}
              disabled={!ready}
              className="px-4 py-3 bg-haiti-red hover:bg-haiti-red-dark disabled:opacity-50 text-bg font-semibold rounded-full text-sm transition-colors"
            >
              {copyStatus === "copied" ? t("share.copied") : t("share.share")}
            </button>
          </div>
          <p className="text-xs text-muted text-center mt-2">
            {t("share.hint")}
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── SVG content (used both for preview render and PNG conversion) ───
function buildSvgInner(player, photoSrc, labels) {
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
        <rect x="0" y="0" width="${W}" height="${PHOTO_H}"/>
      </clipPath>
    </defs>

    <rect width="${W}" height="${H}" fill="url(#bg-grad)"/>

    ${photoSrc ? `
      <g clip-path="url(#photo-clip)">
        <image href="${escapeXml(photoSrc)}" x="0" y="0" width="${W}" height="${PHOTO_H}" preserveAspectRatio="xMidYMin slice"/>
        <rect x="0" y="0" width="${W}" height="${PHOTO_H}" fill="url(#photo-fade)"/>
      </g>
    ` : `
      <rect x="0" y="0" width="${W}" height="${PHOTO_H}" fill="${HAITI_BLUE_DARK}"/>
      <text x="${W / 2}" y="${Math.floor(H * 0.3)}" font-family="Plus Jakarta Sans, sans-serif" font-size="200" font-weight="800" fill="${BG}" text-anchor="middle" opacity="0.15">${escapeXml(player.name.split(" ").map(n => n[0]).join("").slice(0,2))}</text>
    `}

    <!-- Position pill -->
    <g transform="translate(60, 60)">
      <rect width="220" height="46" rx="23" fill="${BG}" fill-opacity="0.15"/>
      <text x="110" y="30" font-family="Plus Jakarta Sans, sans-serif" font-size="20" font-weight="700" fill="${BG}" text-anchor="middle" letter-spacing="1.5">${escapeXml(labels.position.toUpperCase())}</text>
    </g>

    ${accent ? `
      <g transform="translate(${W - 260}, 60)">
        <rect width="200" height="46" rx="23" fill="${accentColor}"/>
        <text x="100" y="30" font-family="Plus Jakarta Sans, sans-serif" font-size="20" font-weight="700" fill="${BG}" text-anchor="middle" letter-spacing="1.5">${escapeXml((isCaptain ? labels.captain : labels.star).toUpperCase())}</text>
      </g>
    ` : ""}

    <!-- Player number -->
    ${player.number ? `
      <text x="60" y="${NUM_Y}" font-family="Plus Jakarta Sans, sans-serif" font-size="120" font-weight="800" fill="${GOLD}">${player.number}</text>
    ` : ""}

    <!-- Name -->
    <text x="60" y="${NAME_Y}" font-family="Plus Jakarta Sans, sans-serif" font-size="84" font-weight="800" fill="${BG}">
      ${wrapTspans(player.name, 60, NAME_Y, 84, 14)}
    </text>

    <!-- Club -->
    <text x="60" y="${CLUB_Y}" font-family="Plus Jakarta Sans, sans-serif" font-size="28" font-weight="500" fill="${BG}" opacity="0.85">
      ${escapeXml(player.club || "")}${player.clubCountry ? ` · ${escapeXml(player.clubCountry)}` : ""}
    </text>

    <!-- Stats row -->
    <g transform="translate(60, ${STATS_Y})">
      ${player.caps != null ? `
        <g transform="translate(0, 0)">
          <text font-family="Plus Jakarta Sans, sans-serif" font-size="64" font-weight="800" fill="${BG}">${escapeXml(player.caps)}</text>
          <text y="34" font-family="Plus Jakarta Sans, sans-serif" font-size="18" font-weight="700" fill="${GOLD}" letter-spacing="1.5">${escapeXml(labels.caps.toUpperCase())}</text>
        </g>
      ` : ""}
      ${(player.goals != null && player.goals > 0) ? `
        <g transform="translate(260, 0)">
          <text font-family="Plus Jakarta Sans, sans-serif" font-size="64" font-weight="800" fill="${HAITI_RED}">${escapeXml(player.goals)}</text>
          <text y="34" font-family="Plus Jakarta Sans, sans-serif" font-size="18" font-weight="700" fill="${GOLD}" letter-spacing="1.5">${escapeXml(labels.goals.toUpperCase())}</text>
        </g>
      ` : ""}
      ${player.age ? `
        <g transform="translate(460, 0)">
          <text font-family="Plus Jakarta Sans, sans-serif" font-size="64" font-weight="800" fill="${BG}">${escapeXml(player.age)}</text>
          <text y="34" font-family="Plus Jakarta Sans, sans-serif" font-size="18" font-weight="700" fill="${GOLD}" letter-spacing="1.5">${escapeXml(labels.age.toUpperCase())}</text>
        </g>
      ` : ""}
      ${player.height ? `
        <g transform="translate(660, 0)">
          <text font-family="Plus Jakarta Sans, sans-serif" font-size="64" font-weight="800" fill="${BG}">${(player.height / 100).toFixed(2)}<tspan font-size="40" dx="6">m</tspan></text>
          <text y="34" font-family="Plus Jakarta Sans, sans-serif" font-size="18" font-weight="700" fill="${GOLD}" letter-spacing="1.5">${escapeXml(labels.height.toUpperCase())}</text>
        </g>
      ` : ""}
    </g>

    <!-- Bottom strip + URL -->
    <rect x="0" y="${H - 70}" width="${W * 0.33}" height="70" fill="${HAITI_BLUE_DARK}"/>
    <rect x="${W * 0.33}" y="${H - 70}" width="${W * 0.33}" height="70" fill="${HAITI_RED}"/>
    <rect x="${W * 0.66}" y="${H - 70}" width="${W * 0.34}" height="70" fill="${GOLD}"/>

    <text x="60" y="${H - 27}" font-family="Plus Jakarta Sans, sans-serif" font-size="22" font-weight="800" fill="${BG}" letter-spacing="2">GRENADIERS2026.COM</text>
    <text x="${W - 60}" y="${H - 27}" font-family="Plus Jakarta Sans, sans-serif" font-size="18" font-weight="600" fill="${BG}" text-anchor="end" opacity="0.85">${escapeXml(labels.byline)}</text>
  `;
}

// VECTOR-ONLY overlay used for the canvas export (no <image>, no full bg rect —
// the gradient bg + photo are painted directly on the canvas). This is what
// keeps the iOS canvas origin-clean so toBlob() succeeds.
function buildOverlayInner(player, hasPhoto, labels) {
  const isStar = player.star;
  const isCaptain = player.captain;
  const accent = isStar || isCaptain;
  const accentColor = isCaptain ? HAITI_BLUE : HAITI_RED;

  const escapeXml = (s) =>
    String(s || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");

  return `
    <defs>
      <linearGradient id="photo-fade" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="50%" stop-color="${HAITI_BLUE_DARK}" stop-opacity="0"/>
        <stop offset="100%" stop-color="${HAITI_BLUE_DARK}" stop-opacity="0.95"/>
      </linearGradient>
    </defs>

    ${hasPhoto
      ? `<rect x="0" y="0" width="${W}" height="${PHOTO_H}" fill="url(#photo-fade)"/>`
      : `<text x="${W / 2}" y="${Math.floor(H * 0.3)}" font-family="Plus Jakarta Sans, sans-serif" font-size="200" font-weight="800" fill="${BG}" text-anchor="middle" opacity="0.15">${escapeXml(player.name.split(" ").map((n) => n[0]).join("").slice(0, 2))}</text>`}

    <!-- Position pill -->
    <g transform="translate(60, 60)">
      <rect width="220" height="46" rx="23" fill="${BG}" fill-opacity="0.15"/>
      <text x="110" y="30" font-family="Plus Jakarta Sans, sans-serif" font-size="20" font-weight="700" fill="${BG}" text-anchor="middle" letter-spacing="1.5">${escapeXml(labels.position.toUpperCase())}</text>
    </g>

    ${accent ? `
      <g transform="translate(${W - 260}, 60)">
        <rect width="200" height="46" rx="23" fill="${accentColor}"/>
        <text x="100" y="30" font-family="Plus Jakarta Sans, sans-serif" font-size="20" font-weight="700" fill="${BG}" text-anchor="middle" letter-spacing="1.5">${escapeXml((isCaptain ? labels.captain : labels.star).toUpperCase())}</text>
      </g>
    ` : ""}

    ${player.number ? `
      <text x="60" y="${NUM_Y}" font-family="Plus Jakarta Sans, sans-serif" font-size="120" font-weight="800" fill="${GOLD}">${player.number}</text>
    ` : ""}

    <text x="60" y="${NAME_Y}" font-family="Plus Jakarta Sans, sans-serif" font-size="84" font-weight="800" fill="${BG}">
      ${wrapTspans(player.name, 60, NAME_Y, 84, 14)}
    </text>

    <text x="60" y="${CLUB_Y}" font-family="Plus Jakarta Sans, sans-serif" font-size="28" font-weight="500" fill="${BG}" opacity="0.85">
      ${escapeXml(player.club || "")}${player.clubCountry ? ` · ${escapeXml(player.clubCountry)}` : ""}
    </text>

    <g transform="translate(60, ${STATS_Y})">
      ${player.caps != null ? `
        <g transform="translate(0, 0)">
          <text font-family="Plus Jakarta Sans, sans-serif" font-size="64" font-weight="800" fill="${BG}">${escapeXml(player.caps)}</text>
          <text y="34" font-family="Plus Jakarta Sans, sans-serif" font-size="18" font-weight="700" fill="${GOLD}" letter-spacing="1.5">${escapeXml(labels.caps.toUpperCase())}</text>
        </g>
      ` : ""}
      ${(player.goals != null && player.goals > 0) ? `
        <g transform="translate(260, 0)">
          <text font-family="Plus Jakarta Sans, sans-serif" font-size="64" font-weight="800" fill="${HAITI_RED}">${escapeXml(player.goals)}</text>
          <text y="34" font-family="Plus Jakarta Sans, sans-serif" font-size="18" font-weight="700" fill="${GOLD}" letter-spacing="1.5">${escapeXml(labels.goals.toUpperCase())}</text>
        </g>
      ` : ""}
      ${player.age ? `
        <g transform="translate(460, 0)">
          <text font-family="Plus Jakarta Sans, sans-serif" font-size="64" font-weight="800" fill="${BG}">${escapeXml(player.age)}</text>
          <text y="34" font-family="Plus Jakarta Sans, sans-serif" font-size="18" font-weight="700" fill="${GOLD}" letter-spacing="1.5">${escapeXml(labels.age.toUpperCase())}</text>
        </g>
      ` : ""}
      ${player.height ? `
        <g transform="translate(660, 0)">
          <text font-family="Plus Jakarta Sans, sans-serif" font-size="64" font-weight="800" fill="${BG}">${(player.height / 100).toFixed(2)}<tspan font-size="40" dx="6">m</tspan></text>
          <text y="34" font-family="Plus Jakarta Sans, sans-serif" font-size="18" font-weight="700" fill="${GOLD}" letter-spacing="1.5">${escapeXml(labels.height.toUpperCase())}</text>
        </g>
      ` : ""}
    </g>

    <rect x="0" y="${H - 70}" width="${W * 0.33}" height="70" fill="${HAITI_BLUE_DARK}"/>
    <rect x="${W * 0.33}" y="${H - 70}" width="${W * 0.33}" height="70" fill="${HAITI_RED}"/>
    <rect x="${W * 0.66}" y="${H - 70}" width="${W * 0.34}" height="70" fill="${GOLD}"/>

    <text x="60" y="${H - 27}" font-family="Plus Jakarta Sans, sans-serif" font-size="22" font-weight="800" fill="${BG}" letter-spacing="2">GRENADIERS2026.COM</text>
    <text x="${W - 60}" y="${H - 27}" font-family="Plus Jakarta Sans, sans-serif" font-size="18" font-weight="600" fill="${BG}" text-anchor="end" opacity="0.85">${escapeXml(labels.byline)}</text>
  `;
}

function buildOverlayString(player, hasPhoto, labels) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
${buildOverlayInner(player, hasPhoto, labels)}
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
