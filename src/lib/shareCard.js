// ╔═══════════════════════════════════════════════════════════════════════╗
// ║  SHARE CARD HELPERS                                                    ║
// ║                                                                        ║
// ║  Shared SVG→PNG rasterization + download/share plumbing used by the    ║
// ║  brand share cards (PlayerShareCard, OnzeShareCard, QuizShareCard) so  ║
// ║  the logic stays in one place and doesn't drift.                       ║
// ╚═══════════════════════════════════════════════════════════════════════╝

// ─── Taint-safe canvas compositor (iOS WebKit) ───────────────────────────
//
// WebKit (iOS Safari AND iOS Chrome) taints a canvas when you draw an <img>
// whose source is an SVG that itself contains an <image> element — even if that
// embedded image is a same-origin data: URL. A tainted canvas makes toBlob()/
// toDataURL() throw SecurityError, which silently collapses the share to a URL.
//
// The fix: never put rasters inside the SVG. Composite directly on the canvas —
// background paint → photo via drawImage → a VECTOR-ONLY overlay SVG. Rasters
// drawn directly + a vector-only SVG keep the canvas origin-clean, so toBlob()
// succeeds and we get a real File for Web Share Level 2.

// Load an <img> from a URL (data: or same-origin). Resolves null on failure.
function loadImg(src, crossOrigin) {
  return new Promise((resolve) => {
    if (!src) return resolve(null);
    const img = new Image();
    if (crossOrigin) img.crossOrigin = crossOrigin;
    img.onload = () => resolve(img);
    img.onerror = () => resolve(null);
    img.src = src;
  });
}

// Rasterize a VECTOR-ONLY SVG string to an <img> (for compositing). Must have
// width/height on the root <svg> so iOS rasterizes at full size.
function svgToImg(svgString) {
  const blob = new Blob([svgString], { type: "image/svg+xml;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve(img);
    };
    img.onerror = (e) => {
      URL.revokeObjectURL(url);
      reject(e);
    };
    img.src = url;
  });
}

// drawImage with object-fit: cover into a destination rect.
function drawCover(ctx, img, dx, dy, dw, dh) {
  const ir = img.width / img.height;
  const dr = dw / dh;
  let sx = 0, sy = 0, sw = img.width, sh = img.height;
  if (ir > dr) {
    sw = img.height * dr;
    sx = (img.width - sw) / 2;
  } else {
    sh = img.width / dr;
    sy = (img.height - sh) / 2;
  }
  ctx.drawImage(img, sx, sy, sw, sh, dx, dy, dw, dh);
}

// cover-fit a circular photo (clipped to a circle).
function drawCircleCover(ctx, img, cx, cy, r) {
  ctx.save();
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.closePath();
  ctx.clip();
  drawCover(ctx, img, cx - r, cy - r, r * 2, r * 2);
  ctx.restore();
}

async function drawPhoto(ctx, ph) {
  if (!ph || !ph.dataUrl) return;
  // Remote URLs must be requested with CORS so they don't taint the canvas.
  // Same-origin / data: URLs (the default for our cards) don't need it.
  const isRemote = /^https?:\/\//i.test(ph.dataUrl);
  const img = await loadImg(ph.dataUrl, isRemote ? "anonymous" : undefined);
  if (!img) return;
  if (ph.r != null) drawCircleCover(ctx, img, ph.cx, ph.cy, ph.r);
  else drawCover(ctx, img, ph.x || 0, ph.y || 0, ph.w || ctx.canvas.width, ph.h || ctx.canvas.height);
}

// Compose a card to a PNG Blob without tainting the canvas on iOS. Draw order:
//   paintBackground/background → baseSvg → photos → overlaySvg
//   paintBackground(ctx, w, h) — optional custom bg (e.g. a gradient)
//   baseSvg    — vector-only SVG drawn under the photos (e.g. a pitch)
//   photo      — single { dataUrl, x,y,w,h } rect (cover-fit)
//   photos     — array of rects {dataUrl,x,y,w,h} and/or circles {dataUrl,cx,cy,r}
//   overlaySvg — vector-only SVG drawn on top (chrome, text, badges)
// Returns a Blob, or null if rasterization failed.
export async function composeCardBlob({ width, height, background = "#FAFAF7", paintBackground, baseSvg, photo, photos, overlaySvg }) {
  try {
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    if (paintBackground) paintBackground(ctx, width, height);
    else {
      ctx.fillStyle = background;
      ctx.fillRect(0, 0, width, height);
    }
    if (baseSvg) {
      const bimg = await svgToImg(baseSvg);
      ctx.drawImage(bimg, 0, 0, width, height);
    }
    const list = photos && photos.length ? photos : photo ? [photo] : [];
    for (const ph of list) {
      // sequential so draw order is deterministic
      // eslint-disable-next-line no-await-in-loop
      await drawPhoto(ctx, ph);
    }
    if (overlaySvg) {
      const oimg = await svgToImg(overlaySvg);
      ctx.drawImage(oimg, 0, 0, width, height);
    }
    return await new Promise((resolve) => {
      if (canvas.toBlob) canvas.toBlob((b) => resolve(b), "image/png");
      else {
        // Very old fallback — toDataURL is origin-clean here (no SVG <image>).
        try {
          const dataUrl = canvas.toDataURL("image/png");
          fetch(dataUrl).then((r) => r.blob()).then(resolve).catch(() => resolve(null));
        } catch {
          resolve(null);
        }
      }
    });
  } catch {
    return null;
  }
}

// Rasterize an SVG string to a PNG data URL via an offscreen canvas.
export function svgToPng(svgString, { width, height, background = "#FAFAF7" } = {}) {
  const svgBlob = new Blob([svgString], { type: "image/svg+xml;charset=utf-8" });
  const url = URL.createObjectURL(svgBlob);
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      ctx.fillStyle = background;
      ctx.fillRect(0, 0, width, height);
      ctx.drawImage(img, 0, 0, width, height);
      URL.revokeObjectURL(url);
      resolve(canvas.toDataURL("image/png"));
    };
    img.onerror = (e) => {
      URL.revokeObjectURL(url);
      reject(e);
    };
    img.src = url;
  });
}

// Trigger a browser download of a PNG data URL.
export function downloadPng(dataUrl, filename) {
  const a = document.createElement("a");
  a.href = dataUrl;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

// Save a PNG to the device. On mobile (Web Share with files) routes through the
// native sheet so iOS exposes "Save Image" → Photos; on desktop, downloads directly.
export async function saveImage(dataUrl, { filename, title, text, url } = {}) {
  if (!dataUrl) return "failed";
  if (navigator.canShare) {
    try {
      const blob = await (await fetch(dataUrl)).blob();
      const file = new File([blob], filename, { type: "image/png" });
      if (navigator.canShare({ files: [file] })) {
        await navigator.share({ files: [file], title, text, url });
        return "saved";
      }
    } catch (e) {
      if (e && e.name === "AbortError") return "cancelled";
    }
  }
  downloadPng(dataUrl, filename);
  return "downloaded";
}

// Share a PNG via the Web Share API (with file when supported), else share without
// the file, else copy the URL to the clipboard.
// Returns: "shared" | "copied" | "cancelled" | "unsupported".
export async function sharePng(dataUrl, { title, text, url, filename }) {
  if (navigator.share) {
    try {
      if (dataUrl) {
        const blob = await (await fetch(dataUrl)).blob();
        const file = new File([blob], filename, { type: "image/png" });
        if (navigator.canShare && navigator.canShare({ files: [file] })) {
          await navigator.share({ title, text, url, files: [file] });
          return "shared";
        }
      }
      await navigator.share({ title, text, url });
      return "shared";
    } catch (e) {
      if (e && e.name === "AbortError") return "cancelled";
      // fall through to clipboard
    }
  }
  try {
    await navigator.clipboard.writeText(`${text} → ${url}`);
    return "copied";
  } catch {
    return "unsupported";
  }
}

// Convert a PNG data URL into a File so the Web Share sheet can offer
// "Save Image" → Photos on iOS. Returns null if there's nothing to convert or it
// fails. Build this AHEAD of the tap (e.g. when the modal opens) so the save/share
// handlers can stay synchronous — see saveImageSync / sharePngSync below.
export async function pngFile(dataUrl, filename) {
  if (!dataUrl) return null;
  try {
    const blob = await (await fetch(dataUrl)).blob();
    return new File([blob], filename, { type: "image/png" });
  } catch {
    return null;
  }
}

// True when the browser can share an actual image file (iOS Safari, Android Chrome).
export function canShareFile(file) {
  return !!(file && navigator.canShare && navigator.canShare({ files: [file] }));
}

// SAVE — call this SYNCHRONOUSLY inside the tap handler, with no await before it,
// so iOS keeps the user activation and the share sheet exposes "Save Image" →
// Photos. Prefers sharing the pre-built File; falls back to a direct download on
// desktop or when file-sharing isn't supported. The File must already exist (build
// it with pngFile when the modal opens).
export function saveImageSync(file, dataUrl, { filename } = {}) {
  if (canShareFile(file)) {
    // IMAGE ONLY — no title/text/url. On iOS, adding a url/text makes the share
    // sheet treat it as a link share and hides "Save Image" → Photos.
    navigator.share({ files: [file] }).catch((e) => {
      if (e && e.name === "AbortError") return; // user dismissed the sheet
      if (dataUrl) downloadPng(dataUrl, filename); // genuine failure → download
    });
    return "shared";
  }
  if (dataUrl) downloadPng(dataUrl, filename);
  return "downloaded";
}

// SHARE — same synchronous contract as saveImageSync. Prefers native share with the
// image file, then native share without it, then clipboard. `onCopied` fires after a
// successful clipboard write so the caller can flash a "Copié ✓" state.
export function sharePngSync(file, dataUrl, { filename, text, url } = {}, onCopied) {
  if (canShareFile(file)) {
    // IMAGE ONLY — keeps iOS from collapsing into a link/text share.
    navigator.share({ files: [file] }).catch(() => {});
    return "shared";
  }
  // No file-share support (desktop, iOS Chrome): download the PNG. We never fall
  // back to a URL-only share — on iOS that loses the image entirely.
  if (dataUrl) {
    downloadPng(dataUrl, filename || "grenadiers2026.png");
    return "downloaded";
  }
  // Last resort (no image available at all): copy the link.
  if (navigator.clipboard && url) {
    navigator.clipboard
      .writeText(text ? `${text} ${url}` : url)
      .then(() => onCopied && onCopied())
      .catch(() => {});
    return "copied";
  }
  return "unsupported";
}

// Fetch an image path and return a base64 data URL. Embedding the photo as base64
// before rasterizing avoids tainting the canvas (CORS) and guarantees the image is
// present at draw time. Resolves to null on failure so callers can fall back.
export function imageToDataURL(path) {
  return new Promise((resolve) => {
    if (!path) return resolve(null);
    fetch(path)
      .then((res) => (res.ok ? res.blob() : Promise.reject(new Error("bad response"))))
      .then((blob) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = () => resolve(null);
        reader.readAsDataURL(blob);
      })
      .catch(() => resolve(null));
  });
}
