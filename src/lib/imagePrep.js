// ╔══════════════════════════════════════════════════════════════════╗
// ║  IMAGE PREP · compression + retrait EXIF (navigateur uniquement)   ║
// ║                                                                    ║
// ║  Dessine la photo sur un canvas, plafonne le grand côté autour de  ║
// ║  1600px, ré-encode en jpeg (ou webp) à ~0.8. Le ré-encodage par    ║
// ║  canvas supprime l'EXIF (donc le GPS) et réduit le poids, utile    ║
// ║  pour les données mobiles en Haïti. Sortie bornée à 5 Mo et aux    ║
// ║  types autorisés par le bucket (jpeg/png/webp -> jpeg/webp).      ║
// ║                                                                    ║
// ║  Tout l'accès navigateur (document, canvas) est dans des fonctions ║
// ║  appelées à l'exécution, jamais au chargement du module : sûr pour ║
// ║  le build et le prérendu.                                         ║
// ╚══════════════════════════════════════════════════════════════════╝

const MAX_EDGE = 1600;
const QUALITY = 0.8;
const MAX_BYTES = 5 * 1024 * 1024; // 5 Mo, limite du bucket

async function loadBitmap(file) {
  if (typeof createImageBitmap === "function") {
    try {
      return await createImageBitmap(file, { imageOrientation: "from-image" });
    } catch {
      /* repli ci-dessous */
    }
  }
  return await new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = URL.createObjectURL(file);
  });
}

function encode(canvas, type, quality) {
  return new Promise((resolve) => canvas.toBlob(resolve, type, quality));
}

function draw(source, w, h) {
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  canvas.getContext("2d").drawImage(source, 0, 0, w, h);
  return canvas;
}

// Prend un File image, renvoie { blob, ext, contentType } prêt pour l'upload.
export async function prepareImage(file) {
  const bmp = await loadBitmap(file);
  const w0 = bmp.width;
  const h0 = bmp.height;
  const scale = Math.min(1, MAX_EDGE / Math.max(w0, h0));
  const w = Math.max(1, Math.round(w0 * scale));
  const h = Math.max(1, Math.round(h0 * scale));
  const canvas = draw(bmp, w, h);
  if (bmp.close) bmp.close();

  // webp si la source est déjà webp (et que le navigateur l'encode), sinon jpeg.
  const wantWebp = file.type === "image/webp";
  let type = wantWebp ? "image/webp" : "image/jpeg";
  let blob = await encode(canvas, type, QUALITY);
  if (!blob || (wantWebp && blob.type !== "image/webp")) {
    type = "image/jpeg";
    blob = await encode(canvas, type, QUALITY);
  }

  // Garde-fou 5 Mo : ré-encode plus petit et plus compressé si besoin.
  if (blob && blob.size > MAX_BYTES) {
    const s2 = Math.min(1, 1280 / Math.max(w, h));
    const smaller = draw(canvas, Math.max(1, Math.round(w * s2)), Math.max(1, Math.round(h * s2)));
    type = "image/jpeg";
    blob = await encode(smaller, type, 0.72);
  }

  if (!blob) throw new Error("encode_failed");
  const ext = type === "image/webp" ? "webp" : "jpg";
  return { blob, ext, contentType: type };
}
