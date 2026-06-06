// ╔═══════════════════════════════════════════════════════════════════════╗
// ║  SHARE CARD HELPERS                                                    ║
// ║                                                                        ║
// ║  Shared SVG→PNG rasterization + download/share plumbing used by the    ║
// ║  brand share cards (PlayerShareCard, OnzeShareCard, QuizShareCard) so  ║
// ║  the logic stays in one place and doesn't drift.                       ║
// ╚═══════════════════════════════════════════════════════════════════════╝

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
export function saveImageSync(file, dataUrl, { filename, title, text, url } = {}) {
  if (canShareFile(file)) {
    navigator.share({ files: [file], title, text, url }).catch((e) => {
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
export function sharePngSync(file, dataUrl, { title, text, url } = {}, onCopied) {
  if (canShareFile(file)) {
    navigator.share({ files: [file], title, text, url }).catch(() => {});
    return "shared";
  }
  if (navigator.share) {
    navigator.share({ title, text, url }).catch(() => {});
    return "shared";
  }
  if (navigator.clipboard) {
    navigator.clipboard
      .writeText(`${text} → ${url}`)
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
