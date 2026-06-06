import { Link } from "react-router-dom";
import { useLiveFixtures } from "../lib/useLiveFixtures";

// ╔══════════════════════════════════════════════════════════════════╗
// ║  MatchResultCard — score officiel d'un match, depuis l'API         ║
// ║                                                                    ║
// ║  Affiche le résultat (ou le score en direct) d'un match d'Haïti,   ║
// ║  alimenté par la même source que /matches (vue haiti_fixtures).    ║
// ║  À glisser dans un article de journal lié à un match.              ║
// ║                                                                    ║
// ║  props :                                                           ║
// ║    opponentSlug  — nom anglais en minuscules (ex. "new zealand")   ║
// ║    opponentLabel — nom FR affiché (ex. "Nouvelle-Zélande")         ║
// ║  Rend null tant que la donnée n'est pas disponible (no-op).        ║
// ╚══════════════════════════════════════════════════════════════════╝

function Side({ name, logo }) {
  return (
    <div className="flex flex-col items-center gap-2 flex-1 min-w-0">
      {logo ? (
        <img src={logo} alt="" loading="lazy" className="w-10 h-10 md:w-12 md:h-12 object-contain" />
      ) : (
        <span className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-line" />
      )}
      <span className="font-display text-sm md:text-base uppercase tracking-tight text-center leading-tight">
        {name}
      </span>
    </div>
  );
}

export default function MatchResultCard({ opponentSlug, opponentLabel }) {
  const { byOpponent } = useLiveFixtures();
  const m = opponentSlug ? byOpponent[opponentSlug] : null;
  if (!m) return null; // pas encore chargé / indisponible → on n'affiche rien

  const oppName = opponentLabel || m.oppName;
  const showScore = m.isFinished || m.isLive;
  const scorers = Array.isArray(m.scorers) ? m.scorers : [];
  const haitiScorers = scorers.filter((s) => s.team === "haiti");
  const oppScorers = scorers.filter((s) => s.team === "opp");

  const fmtScorer = (s) => {
    const min = s.minute != null ? `${s.minute}${s.extra ? `+${s.extra}` : ""}'` : "";
    const tag =
      s.detail === "Penalty" ? " (pén.)" : s.detail === "Own Goal" ? " (csc)" : "";
    return `${s.player} ${min}${tag}`.trim();
  };

  return (
    <div className="border border-line rounded-lg bg-bg p-5 md:p-6 my-2">
      <div className="flex items-center justify-between mb-4">
        <p className="text-haiti-red text-[10px] md:text-xs uppercase tracking-[0.2em] font-bold">
          {m.isLive ? "Score en direct" : "Résultat"}
        </p>
        {m.isLive ? (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-haiti-red text-bg text-[10px] font-bold uppercase tracking-wider rounded-full">
            <span className="w-1.5 h-1.5 bg-bg rounded-full animate-pulse" />
            {m.label}
            {m.isRunning && m.elapsed ? ` · ${m.elapsed}'` : ""}
          </span>
        ) : (
          <span className="text-muted text-[10px] md:text-xs uppercase tracking-wider font-semibold">
            {m.label}
          </span>
        )}
      </div>

      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3 md:gap-6">
        <Side name="Haïti" logo={m.haitiLogo} />
        <p className="font-display text-3xl md:text-5xl text-haiti-red tabular-nums text-center">
          {showScore ? (
            <>
              {m.haitiGoals}
              <span className="text-ink/30 mx-1.5 md:mx-2">–</span>
              {m.oppGoals}
            </>
          ) : (
            <span className="text-ink/40 text-2xl md:text-3xl">vs</span>
          )}
        </p>
        <Side name={oppName} logo={m.oppLogo} />
      </div>

      {scorers.length > 0 && (
        <div className="mt-4 pt-4 border-t border-line grid grid-cols-2 gap-4 text-sm">
          <div className="text-right">
            {haitiScorers.map((s, i) => (
              <p key={i} className="text-ink/80 leading-snug">
                {fmtScorer(s)} <span className="text-haiti-red">⚽</span>
              </p>
            ))}
          </div>
          <div className="text-left">
            {oppScorers.map((s, i) => (
              <p key={i} className="text-ink/80 leading-snug">
                <span className="text-muted">⚽</span> {fmtScorer(s)}
              </p>
            ))}
          </div>
        </div>
      )}

      <div className="mt-4 pt-3 border-t border-line text-center">
        <Link
          to="/matches"
          className="text-haiti-blue text-xs font-semibold hover:text-haiti-red transition-colors"
        >
          Tous les matchs des Grenadiers →
        </Link>
      </div>
    </div>
  );
}
