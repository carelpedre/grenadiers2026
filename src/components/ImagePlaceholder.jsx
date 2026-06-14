import { useState } from "react";

// ImagePlaceholder: shows an image with graceful fallback.
// Falls back to the bicolor Haiti flag placeholder if src is empty OR fails to load.
// `objectPosition` lets you point at a focal area like "top", "center" (default),
// "bottom", or any CSS object-position string (e.g. "50% 20%") — useful when a
// portrait subject's face would otherwise be cropped out of a wide aspect ratio.

export default function ImagePlaceholder({
  src,
  alt,
  aspect = "16/9",
  label,
  className = "",
  rounded = true,
  objectPosition = "center",
  fit = "cover",
  loading = "lazy",
}) {
  const [errored, setErrored] = useState(false);

  const aspectClass = {
    "16/9": "aspect-video",
    "16/10": "aspect-[16/10]",
    "4/3": "aspect-[4/3]",
    "1/1": "aspect-square",
    "3/4": "aspect-[3/4]",
    "4/5": "aspect-[4/5]",
    "21/9": "aspect-[21/9]",
  }[aspect] || "aspect-video";

  if (src && !errored) {
    return (
      <div
        className={`${aspectClass} ${rounded ? "rounded-lg" : ""} overflow-hidden bg-line ${className}`}
      >
        <img
          src={src}
          alt={alt || ""}
          className={`w-full h-full ${fit === "contain" ? "object-contain" : "object-cover"}`}
          style={{ objectPosition }}
          loading={loading}
          decoding="async"
          onError={() => setErrored(true)}
        />
      </div>
    );
  }

  // Visual placeholder — quiet editorial slot
  return (
    <div
      className={`${aspectClass} ${rounded ? "rounded-lg" : ""} overflow-hidden relative flex items-center justify-center bg-gradient-to-br from-ink to-ink-deep ${className}`}
    >
      {/* subtle FHF crest watermark */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: "url(/images/brand/fhf-logo.svg)",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "60%",
        }}
      />
      {/* thin bicolor accent at top */}
      <div className="absolute top-0 left-0 right-0 h-1 flex">
        <div className="flex-1 bg-haiti-blue/60"></div>
        <div className="flex-1 bg-haiti-red/60"></div>
      </div>
      <div className="relative text-bg/70 text-center px-6 max-w-[80%]">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="mx-auto mb-3 opacity-50">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
        </svg>
        {label && (
          <p className="text-[10px] md:text-xs uppercase tracking-[0.15em] font-semibold text-bg/80 leading-snug mb-1">
            {label}
          </p>
        )}
        <p className="text-[10px] uppercase tracking-wider text-bg/40 font-medium">Photo à venir</p>
      </div>
    </div>
  );
}
