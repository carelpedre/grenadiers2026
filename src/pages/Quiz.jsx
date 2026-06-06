import { useState, useMemo, useCallback } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { quizThemes, quizQuestions } from "../data/quizQuestions";
import QuizShareCard from "../components/QuizShareCard";

// ╔══════════════════════════════════════════════════════════════════╗
// ║  QUIZ GRENADIER                                                   ║
// ║  Phases : intro (choix du thème) → jeu → résultats.              ║
// ║  Score record stocké en localStorage par thème.                  ║
// ║  Résultat partageable (Web Share API + repli presse-papier).     ║
// ╚══════════════════════════════════════════════════════════════════╝

const QUESTIONS_PER_ROUND = 10;

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function bestKey(themeId) {
  return `grenadiers_quiz_best_${themeId}`;
}

function readBest(themeId) {
  try {
    const v = localStorage.getItem(bestKey(themeId));
    return v ? JSON.parse(v) : null;
  } catch {
    return null;
  }
}

function writeBest(themeId, score, total) {
  try {
    const prev = readBest(themeId);
    if (!prev || score > prev.score) {
      localStorage.setItem(bestKey(themeId), JSON.stringify({ score, total }));
    }
  } catch {
    /* ignore */
  }
}

export default function Quiz() {
  const [phase, setPhase] = useState("intro"); // intro | play | results
  const [themeId, setThemeId] = useState(null);
  const [round, setRound] = useState([]); // array of question objects
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null); // index chosen
  const [results, setResults] = useState([]); // bool per question

  const startRound = useCallback((id) => {
    const pool = id === "all" ? quizQuestions : quizQuestions.filter((q) => q.theme === id);
    const picked = shuffle(pool).slice(0, QUESTIONS_PER_ROUND);
    setThemeId(id);
    setRound(picked);
    setCurrent(0);
    setSelected(null);
    setResults([]);
    setPhase("play");
  }, []);

  const handleAnswer = (idx) => {
    if (selected !== null) return; // lock after first choice
    setSelected(idx);
    setResults((r) => [...r, idx === round[current].answer]);
  };

  const next = () => {
    if (current + 1 >= round.length) {
      const score = results.filter(Boolean).length;
      writeBest(themeId, score, round.length);
      setPhase("results");
    } else {
      setCurrent((c) => c + 1);
      setSelected(null);
    }
  };

  const score = results.filter(Boolean).length;

  return (
    <div className="bg-bg min-h-screen">
      {/* Compact hero */}
      <section className="bg-ink text-bg">
        <div className="max-w-content mx-auto px-5 py-10 md:py-14">
          <Link to="/jeux" className="text-bg/50 hover:text-bg text-xs uppercase tracking-wider font-bold transition-colors">
            ← Jouez
          </Link>
          <p className="text-haiti-red text-xs uppercase tracking-wider font-bold mb-3 mt-4">Jeu · Connaissances</p>
          <h1 className="font-display text-4xl md:text-5xl">Quiz Grenadier</h1>
        </div>
      </section>

      <div className="max-w-2xl mx-auto px-5 py-10 md:py-14">
        <AnimatePresence mode="wait">
          {phase === "intro" && (
            <Intro key="intro" onStart={startRound} />
          )}
          {phase === "play" && (
            <Play
              key={`play-${current}`}
              question={round[current]}
              index={current}
              total={round.length}
              selected={selected}
              onAnswer={handleAnswer}
              onNext={next}
            />
          )}
          {phase === "results" && (
            <Results
              key="results"
              themeId={themeId}
              score={score}
              total={round.length}
              results={results}
              onReplay={() => startRound(themeId)}
              onChange={() => setPhase("intro")}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// ─── INTRO ───────────────────────────────────────────────────────────
function Intro({ onStart }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.4 }}
    >
      <p className="text-ink text-lg leading-relaxed mb-8">
        Huit questions, quatre réponses possibles. Choisissez un thème — ou mélangez tout. Votre meilleur score est conservé sur cet appareil.
      </p>

      <div className="space-y-3">
        {quizThemes.map((th) => {
          const best = readBest(th.id);
          return (
            <button
              key={th.id}
              onClick={() => onStart(th.id)}
              className="w-full text-left bg-white border border-line rounded-xl p-5 hover:border-haiti-blue hover:shadow-md transition-all group"
            >
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="font-display text-xl text-ink group-hover:text-haiti-blue transition-colors">{th.title}</p>
                  <p className="text-muted text-sm mt-0.5">{th.blurb}</p>
                </div>
                <div className="text-right shrink-0">
                  {best && (
                    <p className="text-xs text-muted">
                      Record <span className="font-bold text-gold">{best.score}/{best.total}</span>
                    </p>
                  )}
                  <span className="text-haiti-red text-2xl leading-none">→</span>
                </div>
              </div>
            </button>
          );
        })}

        <button
          onClick={() => onStart("all")}
          className="w-full text-center bg-haiti-blue text-bg rounded-xl p-5 font-display text-xl hover:bg-haiti-blue-dark transition-colors mt-2"
        >
          Tout mélanger
        </button>
      </div>
    </motion.div>
  );
}

// ─── PLAY ────────────────────────────────────────────────────────────
function Play({ question, index, total, selected, onAnswer, onNext }) {
  const answered = selected !== null;
  const progress = ((index + (answered ? 1 : 0)) / total) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -24 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Progress */}
      <div className="flex items-center justify-between mb-2">
        <p className="text-xs uppercase tracking-wider font-bold text-muted">Question {index + 1} / {total}</p>
      </div>
      <div className="h-1.5 bg-line rounded-full overflow-hidden mb-8">
        <motion.div
          className="h-full bg-haiti-red"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.4 }}
        />
      </div>

      <h2 className="font-display text-2xl md:text-3xl text-ink leading-snug mb-7">{question.q}</h2>

      <div className="space-y-3">
        {question.options.map((opt, i) => {
          const isCorrect = i === question.answer;
          const isChosen = i === selected;
          let state = "idle";
          if (answered) {
            if (isCorrect) state = "correct";
            else if (isChosen) state = "wrong";
            else state = "dim";
          }
          const styles = {
            idle: "bg-white border-line hover:border-haiti-blue text-ink",
            correct: "bg-emerald-50 border-emerald-500 text-emerald-900",
            wrong: "bg-red-50 border-haiti-red text-red-900",
            dim: "bg-white border-line text-muted opacity-60",
          }[state];
          return (
            <button
              key={i}
              onClick={() => onAnswer(i)}
              disabled={answered}
              className={`w-full text-left rounded-xl border-2 p-4 md:p-5 font-medium transition-all flex items-center justify-between gap-3 ${styles}`}
            >
              <span>{opt}</span>
              {answered && isCorrect && <span className="text-emerald-600 text-lg shrink-0">✓</span>}
              {answered && isChosen && !isCorrect && <span className="text-haiti-red text-lg shrink-0">✕</span>}
            </button>
          );
        })}
      </div>

      <AnimatePresence>
        {answered && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="mt-6 p-4 bg-surface rounded-xl border-l-4 border-gold">
              <p className="text-sm text-ink leading-relaxed">{question.fact}</p>
            </div>
            <button
              onClick={onNext}
              className="w-full mt-5 bg-ink text-bg rounded-xl p-4 font-display text-lg hover:bg-ink-deep transition-colors"
            >
              {index + 1 >= total ? "Voir mon score" : "Question suivante →"}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ─── RESULTS ─────────────────────────────────────────────────────────
function Results({ themeId, score, total, results, onReplay, onChange }) {
  const [showShare, setShowShare] = useState(false);
  const pct = Math.round((score / total) * 100);

  const themeLabel = useMemo(() => {
    if (themeId === "all") return "Tout mélanger";
    return quizThemes.find((t) => t.id === themeId)?.title || "Quiz";
  }, [themeId]);

  const verdict = useMemo(() => {
    if (pct === 100) return "Sans-faute. Un vrai Grenadier.";
    if (pct >= 75) return "Solide. Vous connaissez votre histoire.";
    if (pct >= 50) return "Pas mal — il reste des pages à relire.";
    return "Le maillot s'apprend. Rejouez !";
  }, [pct]);

  const grid = results.map((r) => (r ? "🟩" : "🟥")).join("");

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.4 }}
      className="text-center"
    >
      <p className="text-xs uppercase tracking-wider font-bold text-muted mb-3">{themeLabel}</p>

      <div className="font-display text-7xl md:text-8xl text-haiti-blue leading-none mb-2">
        {score}<span className="text-3xl md:text-4xl text-muted">/{total}</span>
      </div>
      <p className="font-display text-xl text-ink mb-6">{verdict}</p>

      <div className="text-2xl tracking-widest mb-8" aria-label={`${score} sur ${total}`}>
        {grid}
      </div>

      <div className="space-y-3 max-w-sm mx-auto">
        <button
          onClick={() => setShowShare(true)}
          className="w-full bg-haiti-red text-bg rounded-xl p-4 font-display text-lg hover:bg-red-700 transition-colors"
        >
          Partager mon score
        </button>
        <button
          onClick={onReplay}
          className="w-full bg-haiti-blue text-bg rounded-xl p-4 font-display text-lg hover:bg-haiti-blue-dark transition-colors"
        >
          Rejouer ce thème
        </button>
        <button
          onClick={onChange}
          className="w-full bg-white border border-line text-ink rounded-xl p-4 font-medium hover:border-haiti-blue transition-colors"
        >
          Changer de thème
        </button>
      </div>

      <p className="text-muted text-sm mt-8">
        Envie d'aller plus loin ? <Link to="/history-1974" className="text-haiti-blue hover:text-haiti-red underline underline-offset-4 transition-colors">Relisez le récit de 1974</Link>.
      </p>

      {showShare && (
        <QuizShareCard score={score} total={total} themeLabel={themeLabel} onClose={() => setShowShare(false)} />
      )}
    </motion.div>
  );
}
