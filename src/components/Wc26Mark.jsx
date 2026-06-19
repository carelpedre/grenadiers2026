// ╔══════════════════════════════════════════════════════════════════╗
// ║  Wc26Mark — our own "26" device                                    ║
// ║                                                                    ║
// ║  Evokes the 2026 host-city numeral treatment WITHOUT using any     ║
// ║  FIFA asset. The numerals are simply set in Anton (a free font)    ║
// ║  and flooded with Haiti's flag palette plus a subtle diagonal      ║
// ║  weave, framed by a thin gold hairline. Purely decorative.         ║
// ╚══════════════════════════════════════════════════════════════════╝

let _id = 0;

export default function Wc26Mark({ className = "" }) {
  // Unique ids so multiple marks on a page never share defs.
  const uid = `wc26-${(_id += 1)}`;
  const flag = `${uid}-flag`;
  const weave = `${uid}-weave`;
  return (
    <svg
      viewBox="0 0 210 150"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id={flag} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#00209F" />
          <stop offset="0.5" stopColor="#00209F" />
          <stop offset="0.5" stopColor="#D21034" />
          <stop offset="1" stopColor="#D21034" />
        </linearGradient>
        <pattern
          id={weave}
          width="12"
          height="12"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(35)"
        >
          <rect width="12" height="12" fill={`url(#${flag})`} />
          <line x1="0" y1="0" x2="0" y2="12" stroke="#FFFFFF" strokeOpacity="0.10" strokeWidth="4" />
        </pattern>
      </defs>
      {/* flag-filled weave inside the numerals */}
      <text
        x="105"
        y="124"
        textAnchor="middle"
        fontFamily="Anton, system-ui, sans-serif"
        fontSize="158"
        fill={`url(#${weave})`}
      >
        26
      </text>
      {/* gold hairline tracing the numerals */}
      <text
        x="105"
        y="124"
        textAnchor="middle"
        fontFamily="Anton, system-ui, sans-serif"
        fontSize="158"
        fill="none"
        stroke="#C8A45C"
        strokeWidth="1.1"
        strokeOpacity="0.9"
      >
        26
      </text>
    </svg>
  );
}
