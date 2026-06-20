// Pastille de résultat V/N/D partagée (Forme récente + Scouting adversaire).
// Source unique des couleurs : V vert, N or/neutre, D rouge Haïti.
import { useT } from "../lib/i18n";

export const RESULT = {
  V: { color: "#19c37d", full: "Victoire", key: "matches.win", letterEn: "W" },
  N: { color: "#C8A45C", full: "Nul", key: "matches.draw", letterEn: "D" },
  D: { color: "#D21034", full: "Défaite", key: "matches.loss", letterEn: "L" },
};

// size: "lg" (bande de forme) | "sm" (liste / en ligne).
export default function ResultPill({ res, size = "sm", title }) {
  const { t, lang } = useT();
  const r = RESULT[res] || RESULT.N;
  const letter = lang === "en" ? r.letterEn : res;
  const dims =
    size === "lg"
      ? "w-8 h-8 md:w-9 md:h-9 text-sm md:text-base shadow-sm"
      : "w-7 h-7 text-xs";
  return (
    <span
      title={title}
      aria-label={title || t(r.key)}
      className={`${dims} shrink-0 rounded-md flex items-center justify-center font-display text-white`}
      style={{ backgroundColor: r.color }}
    >
      {letter}
    </span>
  );
}
