// Pastille de résultat V/N/D partagée (Forme récente + Scouting adversaire).
// Source unique des couleurs : V vert, N or/neutre, D rouge Haïti.

export const RESULT = {
  V: { color: "#19c37d", full: "Victoire" },
  N: { color: "#C8A45C", full: "Nul" },
  D: { color: "#D21034", full: "Défaite" },
};

// size: "lg" (bande de forme) | "sm" (liste / en ligne).
export default function ResultPill({ res, size = "sm", title }) {
  const r = RESULT[res] || RESULT.N;
  const dims =
    size === "lg"
      ? "w-8 h-8 md:w-9 md:h-9 text-sm md:text-base shadow-sm"
      : "w-7 h-7 text-xs";
  return (
    <span
      title={title}
      aria-label={title || r.full}
      className={`${dims} shrink-0 rounded-md flex items-center justify-center font-display text-white`}
      style={{ backgroundColor: r.color }}
    >
      {res}
    </span>
  );
}
