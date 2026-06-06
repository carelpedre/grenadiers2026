// Inline SVG flags — no external dependencies, dark mode friendly
// 3:2 aspect ratio. Use the wrapper Flag component for consistent sizing.
//
// NOTE: Haiti uses an <img> pointing to /images/flags/haiti.svg
// (the official Wikipedia Commons SVG with the full coat of arms).
// Other flags remain inline for performance.

export function Flag({ country, size = "md" }) {
  const sizes = {
    sm: "w-8 h-[22px]",
    md: "w-12 h-8",
    lg: "w-16 h-11",
    xl: "w-20 h-14",
    responsive: "w-16 h-11 md:w-20 md:h-14",
  };
  const sizeClass = sizes[size] || sizes.md;

  // Haiti uses an external SVG file for accuracy
  if (country === "haiti") {
    return (
      <div className={`${sizeClass} rounded overflow-hidden shadow-sm border border-line/40 shrink-0 bg-white`}>
        <img
          src="/images/flags/haiti.svg"
          alt="Drapeau d'Haïti"
          className="w-full h-full object-cover"
        />
      </div>
    );
  }

  const FlagSvg = flags[country];
  if (!FlagSvg) return null;

  return (
    <div className={`${sizeClass} rounded overflow-hidden shadow-sm border border-line/40 shrink-0`}>
      <FlagSvg />
    </div>
  );
}

const flags = {
  scotland: () => (
    <svg viewBox="0 0 60 36" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect width="60" height="36" fill="#0065BD" />
      <path d="M0 0 L60 36 M60 0 L0 36" stroke="#FFFFFF" strokeWidth="7" />
    </svg>
  ),
  brazil: () => (
    <svg viewBox="0 0 720 504" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect width="720" height="504" fill="#009C3B" />
      <polygon points="360,60 660,252 360,444 60,252" fill="#FFDF00" />
      <circle cx="360" cy="252" r="105" fill="#002776" />
      <path d="M 263 244 Q 360 200 457 244" stroke="#FFFFFF" strokeWidth="14" fill="none" />
    </svg>
  ),
  morocco: () => (
    <svg viewBox="0 0 6 4" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect width="6" height="4" fill="#C1272D" />
      <polygon
        points="3,1.2 3.18,1.76 3.77,1.76 3.29,2.1 3.48,2.66 3,2.32 2.52,2.66 2.71,2.1 2.23,1.76 2.82,1.76"
        fill="none"
        stroke="#006233"
        strokeWidth="0.06"
      />
    </svg>
  ),
  peru: () => (
    <svg viewBox="0 0 9 6" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect width="9" height="6" fill="#D91023" />
      <rect x="3" width="3" height="6" fill="#FFFFFF" />
    </svg>
  ),
};
