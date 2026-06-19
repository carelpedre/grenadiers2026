import { useEffect, useRef, useState } from "react";
import { prepareImage } from "../lib/imagePrep";
import { useT } from "../lib/i18n";

// ╔══════════════════════════════════════════════════════════════════╗
// ║  CADRE GRENADIERS · composeur de partage (100% client)            ║
// ║                                                                    ║
// ║  L'utilisateur choisit une photo de son appareil, on la composite  ║
// ║  sur un canvas avec un cadre dessiné par code (langage visuel du   ║
// ║  site), puis on partage via la feuille native (navigator.share     ║
// ║  avec un File) ou, à défaut, en téléchargement. Aucun envoi,       ║
// ║  aucune connexion, aucune modération : c'est SA photo, sur SON     ║
// ║  appareil.                                                        ║
// ║                                                                    ║
// ║  Sûr pour le prérendu : canvas, document.fonts et File ne sont     ║
// ║  touchés que dans des gestionnaires / effets (navigateur).        ║
// ╚══════════════════════════════════════════════════════════════════╝

const NAVY = "#0D1B3E";
const HAITI_BLUE = "#00209F";
const HAITI_RED = "#D21034";
const GOLD = "#C8A45C";

const FORMATS = [
  { value: "9:16", label: "Story 9:16", w: 1080, h: 1920, band: 340 },
  { value: "1:1", label: "Carré 1:1", w: 1080, h: 1080, band: 300 },
];
const MATCHES = [
  { value: "", label: "Générique" },
  { value: "scotland", label: "vs Écosse" },
  { value: "brazil", label: "vs Brésil" },
  { value: "morocco", label: "vs Maroc" },
];
// Infos par match : libellé, drapeau adverse (même origine, /public) et date.
// Dates : source de vérité src/data/matches.js (phase de groupes, Gr. C).
const HAITI_FLAG = "/images/flags/haiti.svg";
const MATCH_INFO = {
  scotland: { label: "vs Écosse", flag: "/images/flags/scotland.svg", date: "13 juin 2026" },
  brazil: { label: "vs Brésil", flag: "/images/flags/brazil.svg", date: "19 juin 2026" },
  morocco: { label: "vs Maroc", flag: "/images/flags/morocco.svg", date: "24 juin 2026" },
};

// Charge une image une seule fois (cache). Images même origine : pas de « taint »
// du canvas, l'export en JPEG reste possible.
const imgCache = {};
function loadImage(src) {
  if (imgCache[src]) return imgCache[src];
  const p = new Promise((resolve, reject) => {
    const i = new Image();
    i.onload = () => resolve(i);
    i.onerror = reject;
    i.src = src;
  });
  imgCache[src] = p;
  return p;
}

function roundRectPath(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

// Dessine un drapeau (ratio conservé) dans une pastille à coin arrondi avec un
// fin liseré blanc. Renvoie sa largeur pour enchaîner les éléments.
function drawFlag(ctx, img, x, y, h) {
  const ratio = img.naturalWidth && img.naturalHeight ? img.naturalWidth / img.naturalHeight : 1.5;
  const w = Math.round(h * ratio);
  const r = 6;
  ctx.save();
  roundRectPath(ctx, x, y, w, h, r);
  ctx.clip();
  ctx.drawImage(img, x, y, w, h);
  ctx.restore();
  ctx.save();
  roundRectPath(ctx, x, y, w, h, r);
  ctx.lineWidth = 2;
  ctx.strokeStyle = "rgba(255,255,255,0.55)";
  ctx.stroke();
  ctx.restore();
  return w;
}

// drawImage en object-cover dans un rectangle (focusY bas pour garder les visages).
function cover(ctx, img, dx, dy, dw, dh, focusY = 0.5) {
  const ir = img.width / img.height;
  const dr = dw / dh;
  let sx = 0, sy = 0, sw = img.width, sh = img.height;
  if (ir > dr) {
    sw = img.height * dr;
    sx = (img.width - sw) / 2;
  } else {
    sh = img.width / dr;
    sy = (img.height - sh) * focusY;
  }
  ctx.drawImage(img, sx, sy, sw, sh, dx, dy, dw, dh);
}

// Dessine le cadre : photo (cover) + bande navy avec wordmark, filet drapeau,
// libellé du match et watermark. Les polices doivent être prêtes avant le texte.
async function drawCadre(canvas, img, fmt, match) {
  const { w, h, band } = fmt;
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d");

  // Polices chargées avant tout texte, pour le vrai font et non un repli système.
  try {
    await Promise.all([
      document.fonts.load("800 70px 'Plus Jakarta Sans'"),
      document.fonts.load("600 30px 'Plus Jakarta Sans'"),
    ]);
  } catch {
    /* on dessine quand même */
  }
  await document.fonts.ready;

  const info = match ? MATCH_INFO[match] : null;

  // Drapeaux (Haïti + adversaire) chargés avant de composer la bande.
  let haitiFlag = null;
  let oppFlag = null;
  if (info) {
    try {
      [haitiFlag, oppFlag] = await Promise.all([loadImage(HAITI_FLAG), loadImage(info.flag)]);
    } catch {
      haitiFlag = null;
      oppFlag = null;
    }
  }
  const hasFlags = Boolean(haitiFlag && oppFlag);

  const bandTop = h - band;

  // Photo (ou navy si pas encore de photo).
  ctx.fillStyle = NAVY;
  ctx.fillRect(0, 0, w, h);
  if (img) cover(ctx, img, 0, 0, w, bandTop, 0.4);

  // Bande navy.
  ctx.fillStyle = NAVY;
  ctx.fillRect(0, bandTop, w, band);

  // Filet drapeau (bleu / rouge) à la jonction photo / bande.
  ctx.fillStyle = HAITI_BLUE;
  ctx.fillRect(0, bandTop, w / 2, 12);
  ctx.fillStyle = HAITI_RED;
  ctx.fillRect(w / 2, bandTop, w - w / 2, 12);

  const P = 64;
  ctx.textBaseline = "alphabetic";
  ctx.textAlign = "left";

  // Affiche d'affrontement : drapeaux Haïti « vs » adversaire, en haut de la
  // bande (uniquement si un match est choisi).
  if (hasFlags) {
    const flagH = Math.round(band * 0.15);
    const gap = 16;
    const centerY = bandTop + Math.round(band * 0.27);
    const topY = centerY - flagH / 2;
    let x = P;
    x += drawFlag(ctx, haitiFlag, x, topY, flagH) + gap;
    ctx.font = "700 30px 'Plus Jakarta Sans', system-ui, sans-serif";
    ctx.fillStyle = "rgba(255,255,255,0.85)";
    ctx.textBaseline = "middle";
    ctx.fillText("vs", x, centerY + 1);
    const vsW = ctx.measureText("vs").width;
    ctx.textBaseline = "alphabetic";
    x += vsW + gap;
    drawFlag(ctx, oppFlag, x, topY, flagH);
  }

  // Wordmark "GRENADIERS 2026" (2026 en rouge). Descend sous les drapeaux quand
  // un match est affiché, sinon centré dans la bande.
  ctx.font = "800 70px 'Plus Jakarta Sans', system-ui, sans-serif";
  const wmY = bandTop + Math.round(band * (hasFlags ? 0.62 : 0.46));
  ctx.fillStyle = "#FFFFFF";
  ctx.fillText("GRENADIERS ", P, wmY);
  const gw = ctx.measureText("GRENADIERS ").width;
  ctx.fillStyle = HAITI_RED;
  ctx.fillText("2026", P + gw, wmY);

  // Sous-titre gold : match + date du match, sinon générique.
  ctx.font = "600 30px 'Plus Jakarta Sans', system-ui, sans-serif";
  ctx.fillStyle = GOLD;
  const sub = info ? `${info.label} · ${info.date}` : "Coupe du Monde 2026";
  ctx.fillText(sub, P, wmY + 46);

  // Watermark, descendu tout en bas à droite, ramène toujours au site.
  ctx.font = "600 26px 'Plus Jakarta Sans', system-ui, sans-serif";
  ctx.fillStyle = "rgba(255,255,255,0.6)";
  ctx.textAlign = "right";
  ctx.fillText("grenadiers2026.com", w - P, h - Math.round(band * 0.13));
  ctx.textAlign = "left";
}

export default function CadreComposer({ initialFile = null }) {
  const { t } = useT();
  const canvasRef = useRef(null);
  const imgRef = useRef(null);
  const fileInputRef = useRef(null);
  const [hasPhoto, setHasPhoto] = useState(false);
  const [match, setMatch] = useState("");
  const [format, setFormat] = useState("9:16");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  // Charge un File : compresse (réutilise imagePrep, retire l'EXIF) puis décode.
  const loadFile = async (file) => {
    setBusy(true);
    setError("");
    try {
      const { blob } = await prepareImage(file);
      const url = URL.createObjectURL(blob);
      const img = await new Promise((res, rej) => {
        const i = new Image();
        i.onload = () => res(i);
        i.onerror = rej;
        i.src = url;
      });
      URL.revokeObjectURL(url);
      imgRef.current = img;
      setHasPhoto(true);
    } catch {
      setError(t("cadre.errLoad"));
    } finally {
      setBusy(false);
    }
  };

  // Réutilise la photo déjà en mémoire (écran « Merci » après publication).
  useEffect(() => {
    if (initialFile) loadFile(initialFile);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialFile]);

  // (Re)compose à chaque changement de photo / format / match.
  useEffect(() => {
    let alive = true;
    (async () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const fmt = FORMATS.find((f) => f.value === format) || FORMATS[0];
      await drawCadre(canvas, imgRef.current, fmt, match);
      if (!alive) return;
    })();
    return () => {
      alive = false;
    };
  }, [hasPhoto, format, match]);

  const onPick = (e) => {
    const f = e.target.files?.[0];
    if (f) loadFile(f);
  };

  const onShare = async () => {
    const canvas = canvasRef.current;
    if (!canvas || !hasPhoto || busy) return;
    setBusy(true);
    setError("");
    try {
      const blob = await new Promise((res) => canvas.toBlob(res, "image/jpeg", 0.9));
      if (!blob) throw new Error("blob");
      const name = `grenadiers-2026-${format === "9:16" ? "story" : "carre"}.jpg`;
      const file = new File([blob], name, { type: "image/jpeg" });
      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({ files: [file] }).catch((err) => {
          if (err && err.name !== "AbortError") throw err;
        });
      } else {
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = name;
        document.body.appendChild(a);
        a.click();
        a.remove();
        setTimeout(() => URL.revokeObjectURL(url), 1000);
      }
    } catch {
      setError(t("cadre.errShare"));
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="bg-white border border-line rounded-xl p-5 md:p-7 space-y-5">
      <input ref={fileInputRef} type="file" accept="image/*" onChange={onPick} className="sr-only" />

      {/* Aperçu live du cadre */}
      <div className="mx-auto max-w-[300px]">
        <canvas ref={canvasRef} className="block w-full h-auto rounded-xl border border-line bg-ink" />
      </div>

      <button
        type="button"
        onClick={() => fileInputRef.current?.click()}
        className="w-full rounded-full border border-line px-6 py-3 text-sm font-semibold text-ink transition-colors hover:border-haiti-blue"
      >
        {hasPhoto ? t("cadre.changePhoto") : t("cadre.choosePhoto")}
      </button>

      <Chips
        label={t("cadre.formatLabel")}
        options={FORMATS.map((f) => ({
          value: f.value,
          label: t(f.value === "9:16" ? "cadre.formatStory" : "cadre.formatSquare"),
        }))}
        value={format}
        onChange={setFormat}
        cols={2}
      />
      <Chips label={t("cadre.matchLabel")} options={MATCHES} value={match} onChange={setMatch} cols={2} />

      {error && <p className="text-sm text-haiti-red font-medium">{error}</p>}

      <button
        type="button"
        onClick={onShare}
        disabled={!hasPhoto || busy}
        className="w-full px-6 py-3.5 bg-haiti-red text-bg font-semibold rounded-full hover:bg-haiti-red-dark transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {busy ? t("cadre.preparing") : t("cadre.shareButton")}
      </button>
      <p className="text-xs text-muted text-center leading-relaxed">
        {t("cadre.note")}
      </p>
    </div>
  );
}

function Chips({ label, options, value, onChange, cols = 2 }) {
  return (
    <div>
      <label className="block text-xs uppercase tracking-wider text-muted font-semibold mb-1.5">{label}</label>
      <div className={`grid gap-2 ${cols === 2 ? "grid-cols-2" : "grid-cols-3"}`}>
        {options.map((o) => {
          const active = value === o.value;
          return (
            <button
              key={o.value || "_"}
              type="button"
              aria-pressed={active}
              onClick={() => onChange(o.value)}
              className={`px-3 py-2.5 rounded-lg border text-sm font-semibold transition-colors ${
                active ? "border-haiti-blue bg-haiti-blue text-bg" : "border-line bg-white text-ink hover:border-haiti-blue"
              }`}
            >
              {o.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
