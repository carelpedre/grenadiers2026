import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";

// ╔══════════════════════════════════════════════════════════════════════╗
// ║  TIRE PENALTY  ·  /jeux/penalty                                        ║
// ║  Tournoi de tirs au but : Écosse, puis Brésil, puis Maroc.             ║
// ║  Pur client. Mobile first. Aucun son. Respecte prefers-reduced-motion. ║
// ╚══════════════════════════════════════════════════════════════════════╝

// ── Opponents (in order). jersey = keeper shirt color when you shoot. ──
const OPPONENTS = [
  { key: "ecosse", name: "Écosse", nameArt: "l'Écosse", flag: "🏴󠁧󠁢󠁳󠁣󠁴󠁿", jersey: "#1F3A68", memoryBias: 0.15 },
  { key: "bresil", name: "Brésil", nameArt: "le Brésil", flag: "🇧🇷", jersey: "#F4D000", memoryBias: 0.35 },
  { key: "maroc", name: "Maroc", nameArt: "le Maroc", flag: "🇲🇦", jersey: "#C1272D", memoryBias: 0.55 },
];

// ── Zones: id = row*3 + col. 0..2 high (left/center/right), 3..5 low. ──
const ZONE_IDS = [0, 1, 2, 3, 4, 5];
const COL_X = [20.7, 50, 79.3]; // % of pitch width (zone centers)
const ROW_Y = [19, 43]; //          % of pitch height (high / low)
const colOf = (id) => id % 3;
const rowOf = (id) => (id < 3 ? 0 : 1);
const isCornerHigh = (id) => id === 0 || id === 2;
const zonePos = (id) => ({ x: COL_X[colOf(id)], y: ROW_Y[rowOf(id)] });
const SPOT = { x: 50, y: 84 };
const KEEPER_REST = { x: 50, y: 39 };

const TAUNTS = [
  "Il te lit comme un livre...",
  "Quel sang-froid !",
  "Allez, les Grenadiers !",
  "Ça, c'est un penalty !",
  "Ne lâche rien, tout le pays est avec toi !",
  "Le drapeau bien haut !",
  "Le pays entier est derrière toi.",
];

function weightedPick(weights) {
  const total = weights.reduce((a, b) => a + b, 0);
  let r = Math.random() * total;
  for (let i = 0; i < weights.length; i++) {
    r -= weights[i];
    if (r <= 0) return i;
  }
  return weights.length - 1;
}

// Keeper guess when YOU shoot: biased toward your recent aimed zones.
function keeperGuess(opp, recentShots) {
  const w = ZONE_IDS.map(() => 1);
  recentShots.slice(-3).forEach((z) => {
    w[z] += opp.memoryBias * 3;
  });
  return weightedPick(w);
}

// AI shot when YOU defend: mostly corners; Maroc avoids your recent dives.
function aiShot(opp, recentDives) {
  const corners = [0, 2, 3, 5];
  const w = ZONE_IDS.map((i) => (corners.includes(i) ? 1.0 : 0.32));
  if (opp.key === "maroc") {
    recentDives.slice(-3).forEach((z) => {
      w[z] *= 0.4;
    });
  }
  return weightedPick(w);
}

// Resolve a player shot from aim + power. Center band = clean, else drift, top end = over.
function resolveShot(aim, power) {
  const d = Math.abs(power - 0.5);
  if (power > 0.86) return { zone: aim, clean: false, over: true };
  if (d <= 0.15) return { zone: aim, clean: true, over: false };
  // drift one column over (edges drift inward, center drifts to a side)
  const col = colOf(aim);
  let newCol;
  if (col === 1) newCol = power < 0.5 ? 0 : 2;
  else newCol = 1;
  return { zone: rowOf(aim) * 3 + newCol, clean: false, over: false };
}

function vibrate(ms) {
  try {
    if (navigator.vibrate) navigator.vibrate(ms);
  } catch (e) {
    /* no-op */
  }
}

async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (e) {
    try {
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.focus();
      ta.select();
      const ok = document.execCommand("copy");
      document.body.removeChild(ta);
      return ok;
    } catch (e2) {
      return false;
    }
  }
}

const SHARE_TEXT =
  "J'ai éliminé l'Écosse, le Brésil et le Maroc aux tirs au but 🇭🇹 Joue aussi : grenadiers2026.com/jeux/penalty";

export default function Penalty() {
  const reduced = useMemo(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    [],
  );

  // ── Core shootout state ──
  const [oppIndex, setOppIndex] = useState(0);
  const opp = OPPONENTS[oppIndex];
  const [phase, setPhase] = useState("intro"); // intro | aim | power | shoot | dive | defend | review | won | lost | champion
  const [pScore, setPScore] = useState(0);
  const [aScore, setAScore] = useState(0);
  const [pKicks, setPKicks] = useState([]); // booleans (made/not) for the dots
  const [aKicks, setAKicks] = useState([]);
  const [sudden, setSudden] = useState(false);

  // ── Per-kick visuals ──
  const [aim, setAim] = useState(null);
  const [power, setPower] = useState(0);
  const [ball, setBall] = useState({ ...SPOT, flying: false, key: 0 });
  const [keeper, setKeeper] = useState({ ...KEEPER_REST, diving: false });
  const [keeperColor, setKeeperColor] = useState(opp.jersey);
  const [ripple, setRipple] = useState(null); // {x,y,key}
  const [banner, setBanner] = useState(null); // {text, taunt, good}
  const [shake, setShake] = useState(false);

  // ── Memory + tournament stats ──
  const recentShots = useRef([]);
  const recentDives = useRef([]);
  const stats = useRef({ goals: 0, saves: 0 });

  // ── Share ──
  const [copied, setCopied] = useState(false);

  const sweepRef = useRef(0);
  const timers = useRef([]);
  const later = useCallback((fn, ms) => {
    const id = setTimeout(fn, ms);
    timers.current.push(id);
    return id;
  }, []);
  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  // ── Power bar sweep (rAF) ──
  useEffect(() => {
    if (phase !== "power") return;
    let raf;
    const period = 900; // ms per full back-and-forth
    const start = performance.now();
    const tick = (now) => {
      const t = ((now - start) % period) / period; // 0..1
      const p = t < 0.5 ? t * 2 : 2 - t * 2; // triangle 0..1..0
      sweepRef.current = p;
      setPower(p);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [phase]);

  const resetShootout = useCallback((idx) => {
    setPScore(0);
    setAScore(0);
    setPKicks([]);
    setAKicks([]);
    setSudden(false);
    setAim(null);
    setBall((b) => ({ ...SPOT, flying: false, key: b.key + 1 }));
    setKeeper({ ...KEEPER_REST, diving: false });
    setKeeperColor(OPPONENTS[idx].jersey);
    setBanner(null);
    setRipple(null);
    setPhase("intro");
  }, []);

  // Decide the shootout after a kick. ps/as = kicks taken so far (incl. this one).
  const decide = useCallback((ps2, as2, pSc, aSc, sd) => {
    if (!sd) {
      const remP = 5 - ps2;
      const remA = 5 - as2;
      if (pSc > aSc + remA) return "won";
      if (aSc > pSc + remP) return "lost";
      if (ps2 >= 5 && as2 >= 5) {
        if (pSc > aSc) return "won";
        if (aSc > pSc) return "lost";
        return "sudden";
      }
      return "continue";
    }
    if (ps2 === as2) {
      if (pSc > aSc) return "won";
      if (aSc > pSc) return "lost";
    }
    return "continue";
  }, []);

  // ── YOU SHOOT ──
  const onAim = (id) => {
    if (phase !== "aim") return;
    setAim(id);
    setPhase("power");
  };

  const onStopPower = () => {
    if (phase !== "power") return;
    const p = sweepRef.current;
    const shot = resolveShot(aim, p);
    const guess = keeperGuess(opp, recentShots.current);
    recentShots.current = [...recentShots.current, aim].slice(-6);

    // outcome
    let scored;
    if (shot.over) scored = false;
    else if (guess === shot.zone) {
      scored = isCornerHigh(shot.zone) && shot.clean && Math.random() < 0.2;
    } else scored = true;

    // keeper dives to its guess (opponent color)
    setKeeperColor(opp.jersey);
    const kp = zonePos(guess);
    setKeeper({ x: kp.x, y: kp.y, diving: true });

    // ball flies to zone (or over the bar)
    const target = shot.over ? { x: COL_X[colOf(shot.zone)], y: -8 } : zonePos(shot.zone);
    setBall((b) => ({ x: target.x, y: target.y, flying: true, key: b.key + 1 }));
    setPhase("shoot");

    later(() => finishKick({ who: "player", scored, over: shot.over, zone: shot.zone }), 620);
  };

  // ── YOU DEFEND ──
  const onDive = (id) => {
    if (phase !== "dive") return;
    recentDives.current = [...recentDives.current, id].slice(-6);
    const shotZone = aiShot(opp, recentDives.current);

    // you are the keeper now (Haiti blue), dive to your pick
    setKeeperColor("#00209F");
    const kp = zonePos(id);
    setKeeper({ x: kp.x, y: kp.y, diving: true });

    let saved;
    if (id === shotZone) {
      saved = !(isCornerHigh(shotZone) && Math.random() < 0.2);
    } else saved = false;

    const target = zonePos(shotZone);
    setBall((b) => ({ x: target.x, y: target.y, flying: true, key: b.key + 1 }));
    setPhase("defend");

    later(() => finishKick({ who: "ai", scored: !saved, saved, zone: shotZone }), 620);
  };

  // ── Resolve a kick: update score, feedback, then advance ──
  const finishKick = ({ who, scored, over, saved, zone }) => {
    let goodForYou;
    let text;
    if (who === "player") {
      goodForYou = scored;
      if (scored) {
        stats.current.goals += 1;
        text = "But !";
      } else if (over) text = "Au-dessus !";
      else text = "Arrêt !";
    } else {
      goodForYou = saved;
      if (saved) {
        stats.current.saves += 1;
        text = "Arrêt ! 🧤";
      } else text = "Ils marquent...";
    }

    if (goodForYou && !reduced) {
      setRipple({ ...zonePos(zone), key: Date.now() });
      setShake(true);
      later(() => setShake(false), 380);
    }
    if (who === "player" && scored) vibrate(30);
    if (who === "ai" && saved) vibrate(30);

    // tallies
    let nps = pScore;
    let nas = aScore;
    let npk = pKicks;
    let nak = aKicks;
    let pcount;
    let acount;
    if (who === "player") {
      if (scored) nps += 1;
      npk = [...pKicks, scored];
      pcount = npk.length;
      acount = aKicks.length;
      setPScore(nps);
      setPKicks(npk);
    } else {
      if (scored) nas += 1;
      nak = [...aKicks, scored];
      pcount = pKicks.length;
      acount = nak.length;
      setAScore(nas);
      setAKicks(nak);
    }

    const verdict = decide(pcount, acount, nps, nas, sudden);

    setBanner({ text, taunt: TAUNTS[Math.floor(Math.random() * TAUNTS.length)], good: goodForYou });
    setPhase("review");

    later(() => {
      // reset ball + keeper for next kick
      setBall((b) => ({ ...SPOT, flying: false, key: b.key + 1 }));
      setKeeper({ ...KEEPER_REST, diving: false });
      setAim(null);
      setBanner(null);

      if (verdict === "won") return onShootoutWon();
      if (verdict === "lost") return setPhase("lost");
      if (verdict === "sudden") setSudden(true);

      // continue: if player just shot -> defend; if ai just shot -> shoot
      setPhase(who === "player" ? "dive" : "aim");
    }, 1300);
  };

  const onShootoutWon = () => {
    if (!reduced) vibrate(30);
    if (oppIndex >= OPPONENTS.length - 1) {
      setPhase("champion");
    } else {
      setPhase("won");
    }
  };

  const nextOpponent = () => {
    const idx = oppIndex + 1;
    setOppIndex(idx);
    resetShootout(idx);
  };

  const restartOpponent = () => resetShootout(oppIndex);

  const restartTournament = () => {
    recentShots.current = [];
    recentDives.current = [];
    stats.current = { goals: 0, saves: 0 };
    setCopied(false);
    setOppIndex(0);
    resetShootout(0);
  };

  const onShare = async () => {
    const ok = await copyText(SHARE_TEXT);
    setCopied(ok);
    if (ok) later(() => setCopied(false), 2500);
  };

  // current "Tir X / 5" label
  const kickLabel = sudden
    ? "Mort subite"
    : `Tir ${Math.min((phase === "dive" || phase === "defend" ? aKicks.length : pKicks.length) + 1, 5)} / 5`;

  const showField = !["champion"].includes(phase);

  return (
    <div className="bg-bg min-h-screen">
      <PenaltyStyles />

      <div className="max-w-md mx-auto px-4 pt-5 pb-16">
        {/* Tournament steps */}
        <TournamentSteps oppIndex={oppIndex} />

        {phase === "champion" ? (
          <ChampionCard stats={stats.current} onShare={onShare} copied={copied} onReplay={restartTournament} />
        ) : (
          <>
            {/* Scoreboard */}
            <div className="mt-4 rounded-2xl bg-white border border-line px-4 py-3 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-2xl leading-none">🇭🇹</span>
                  <span className="font-display text-lg text-ink">Haïti</span>
                </div>
                <div className="font-display text-2xl text-ink tabular-nums">
                  {pScore} <span className="text-muted">:</span> {aScore}
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-display text-lg text-ink">{opp.name}</span>
                  <span className="text-2xl leading-none">{opp.flag}</span>
                </div>
              </div>
              <div className="mt-3 flex items-center justify-between">
                <ScoreDots kicks={pKicks} align="start" />
                <span className="text-[11px] uppercase tracking-wider font-bold text-muted px-2 text-center">
                  {phase === "dive" || phase === "defend" ? "Défense" : kickLabel}
                </span>
                <ScoreDots kicks={aKicks} align="end" />
              </div>
            </div>

            {/* The pitch */}
            {showField && (
              <div className={`relative mt-4 ${shake ? "pen-shake" : ""}`}>
                <Pitch
                  phase={phase}
                  aim={aim}
                  onZone={phase === "aim" ? onAim : phase === "dive" ? onDive : null}
                  ball={ball}
                  keeper={keeper}
                  keeperColor={keeperColor}
                  ripple={ripple}
                  reduced={reduced}
                />

                {/* Banner / result */}
                {banner && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute inset-x-0 top-2 flex justify-center pointer-events-none"
                  >
                    <div
                      className={`rounded-full px-4 py-1.5 font-display text-lg shadow-lg ${
                        banner.good ? "bg-haiti-blue text-white" : "bg-ink text-white"
                      }`}
                    >
                      {banner.text}
                    </div>
                  </motion.div>
                )}
              </div>
            )}

            {/* Controls / instructions */}
            <div className="mt-4 min-h-[120px]">
              {phase === "intro" && (
                <IntroPanel opp={opp} onStart={() => setPhase("aim")} />
              )}

              {phase === "aim" && (
                <Instruction title="À toi de tirer" text="Tape une zone du but pour viser. Vise les coins, mais attention au gardien." />
              )}

              {phase === "power" && (
                <PowerControl power={power} onStop={onStopPower} />
              )}

              {(phase === "shoot" || phase === "defend") && (
                <Instruction title=" " text="..." muted />
              )}

              {phase === "dive" && (
                <Instruction title="À toi d'arrêter" text="Tape la zone où tu plonges. Devine le tireur." />
              )}

              {phase === "review" && banner && (
                <div className="text-center">
                  <p className="font-display text-xl text-ink">{banner.text}</p>
                  <p className="text-muted text-sm mt-1 italic">{banner.taunt}</p>
                </div>
              )}

              {phase === "won" && (
                <ResultPanel
                  title="Victoire ! 🎉"
                  text={`Tu as battu ${opp.nameArt}. Au suivant !`}
                  cta="Continuer"
                  onCta={nextOpponent}
                  celebrate={!reduced}
                />
              )}

              {phase === "lost" && (
                <ResultPanel
                  title="Éliminé..."
                  text={`Tu n'as pas passé ${opp.nameArt} cette fois. Réessaie.`}
                  cta="Rejouer"
                  onCta={restartOpponent}
                />
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────
//  PITCH (goal + zones + keeper + ball)
// ─────────────────────────────────────────────────────────────────────────
function Pitch({ phase, aim, onZone, ball, keeper, keeperColor, ripple, reduced }) {
  const interactive = phase === "aim" || phase === "dive";
  return (
    <div
      className="relative w-full rounded-2xl overflow-hidden border border-line"
      style={{ aspectRatio: "1 / 1", background: "linear-gradient(180deg,#0A1F3D 0%,#0d2547 55%,#10381f 55%,#0c2c18 100%)" }}
    >
      {/* Goal frame + net */}
      <svg
        className="absolute"
        style={{ left: "6%", top: "7%", width: "88%", height: "48%", pointerEvents: "none" }}
        viewBox="0 0 300 160"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          <pattern id="net" width="14" height="14" patternUnits="userSpaceOnUse">
            <path d="M14 0H0V14" fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="1" />
          </pattern>
        </defs>
        <rect x="6" y="6" width="288" height="150" fill="url(#net)" />
        <rect x="6" y="6" width="288" height="150" fill="none" stroke="#F7F7F5" strokeWidth="6" />
        <line x1="9" y1="9" x2="9" y2="156" stroke="#F7F7F5" strokeWidth="4" />
        <line x1="291" y1="9" x2="291" y2="156" stroke="#F7F7F5" strokeWidth="4" />
      </svg>

      {/* Penalty spot */}
      <div
        className="absolute w-2 h-2 rounded-full bg-white/70"
        style={{ left: `${SPOT.x}%`, top: `${SPOT.y}%`, transform: "translate(-50%,-50%)", pointerEvents: "none" }}
      />

      {/* Keeper */}
      <Keeper x={keeper.x} y={keeper.y} diving={keeper.diving} color={keeperColor} reduced={reduced} />

      {/* Ripple on goal */}
      {ripple && (
        <span
          key={ripple.key}
          className="pen-ripple absolute rounded-full"
          style={{ left: `${ripple.x}%`, top: `${ripple.y}%`, pointerEvents: "none" }}
        />
      )}

      {/* Ball */}
      <div
        key={ball.key}
        className="absolute rounded-full"
        style={{
          left: `${ball.x}%`,
          top: `${ball.y}%`,
          width: "9%",
          aspectRatio: "1 / 1",
          transform: "translate(-50%,-50%)",
          background: "radial-gradient(circle at 35% 30%, #ffffff, #d9d9d9 70%)",
          boxShadow: "0 2px 6px rgba(0,0,0,0.35)",
          transition: ball.flying && !reduced ? "left 0.55s cubic-bezier(.3,.9,.35,1), top 0.55s cubic-bezier(.2,1.25,.4,1)" : "none",
          zIndex: 5,
          pointerEvents: "none",
        }}
      />

      {/* Zones (3 x 2) over the goal mouth */}
      <div
        className="absolute grid grid-cols-3 grid-rows-2"
        style={{ left: "6%", top: "7%", width: "88%", height: "48%" }}
      >
        {ZONE_IDS.map((id) => (
          <button
            key={id}
            type="button"
            disabled={!interactive}
            onClick={() => onZone && onZone(id)}
            aria-label={`Zone ${id + 1}`}
            className="m-0.5 rounded-lg transition-colors"
            style={{
              minWidth: 44,
              minHeight: 44,
              border: interactive ? "1.5px dashed rgba(247,247,245,0.35)" : "1.5px solid transparent",
              background:
                interactive && aim === id && phase === "aim"
                  ? "rgba(0,32,159,0.45)"
                  : interactive
                  ? "rgba(255,255,255,0.04)"
                  : "transparent",
            }}
          />
        ))}
      </div>
    </div>
  );
}

function Keeper({ x, y, diving, color, reduced }) {
  return (
    <div
      className="absolute"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        width: "22%",
        transform: "translate(-50%,-50%)",
        transition: reduced ? "none" : "left 0.42s cubic-bezier(.45,0,.3,1.2), top 0.42s cubic-bezier(.45,0,.3,1.2)",
        zIndex: 4,
        pointerEvents: "none",
      }}
      aria-hidden="true"
    >
      <svg viewBox="0 0 60 80" className="w-full h-auto">
        {/* arms (spread a bit when diving) */}
        <rect x={diving ? -2 : 6} y="26" width="58" height="10" rx="5" fill={color} opacity="0.95" />
        {/* body */}
        <rect x="18" y="24" width="24" height="34" rx="11" fill={color} />
        {/* head */}
        <circle cx="30" cy="16" r="10" fill="#E8B98C" />
        {/* legs */}
        <rect x="20" y="54" width="9" height="22" rx="4" fill="#15233f" />
        <rect x="31" y="54" width="9" height="22" rx="4" fill="#15233f" />
        {/* gloves */}
        <circle cx={diving ? 2 : 8} cy="31" r="6" fill="#F7F7F5" />
        <circle cx={diving ? 58 : 52} cy="31" r="6" fill="#F7F7F5" />
      </svg>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────
//  SMALL UI PIECES
// ─────────────────────────────────────────────────────────────────────────
function TournamentSteps({ oppIndex }) {
  return (
    <div className="flex items-center justify-center gap-2 text-xs">
      {OPPONENTS.map((o, i) => (
        <span key={o.key} className="flex items-center gap-2">
          <span
            className={`uppercase tracking-wider font-bold ${
              i < oppIndex ? "text-emerald-600" : i === oppIndex ? "text-haiti-red" : "text-muted/50"
            }`}
          >
            {i < oppIndex ? "✓ " : ""}
            {o.name}
          </span>
          {i < OPPONENTS.length - 1 && <span className="text-muted/40">›</span>}
        </span>
      ))}
    </div>
  );
}

function ScoreDots({ kicks, align }) {
  const dots = [];
  for (let i = 0; i < 5; i++) {
    const k = kicks[i];
    let cls = "bg-line";
    if (k === true) cls = "bg-emerald-500";
    else if (k === false) cls = "bg-haiti-red";
    dots.push(<span key={i} className={`w-2.5 h-2.5 rounded-full ${cls}`} />);
  }
  return <div className={`flex gap-1.5 ${align === "end" ? "justify-end" : ""}`}>{dots}</div>;
}

function Instruction({ title, text, muted }) {
  return (
    <div className="text-center">
      <p className={`font-display text-xl ${muted ? "text-muted" : "text-ink"}`}>{title}</p>
      <p className="text-muted text-sm mt-1">{text}</p>
    </div>
  );
}

function IntroPanel({ opp, onStart }) {
  return (
    <div className="text-center rounded-2xl bg-white border border-line p-5 shadow-sm">
      <p className="text-[11px] uppercase tracking-[0.2em] font-bold text-haiti-red">Tirs au but</p>
      <h2 className="font-display text-2xl text-ink mt-1">
        Haïti <span className="text-muted">vs</span> {opp.name} {opp.flag}
      </h2>
      <p className="text-muted text-sm mt-2">Le meilleur des 5. Tu tires d'abord, puis tu arrêtes. Égalité = mort subite.</p>
      <button
        type="button"
        onClick={onStart}
        className="mt-4 inline-flex items-center justify-center min-h-[44px] px-8 rounded-full bg-haiti-blue text-white font-display text-lg hover:bg-haiti-blue/90 active:scale-95 transition"
      >
        Commencer
      </button>
    </div>
  );
}

function PowerControl({ power, onStop }) {
  // sweet spot band 35%..65%
  return (
    <div className="text-center">
      <p className="font-display text-xl text-ink mb-3">Tape pour frapper !</p>
      <button
        type="button"
        onClick={onStop}
        className="relative w-full h-12 rounded-full overflow-hidden border border-line bg-white active:scale-[0.99] transition"
        aria-label="Frapper"
      >
        {/* sweet spot zone */}
        <span className="absolute top-0 bottom-0 bg-emerald-200/70" style={{ left: "35%", width: "30%" }} />
        {/* gold edges (over the bar) */}
        <span className="absolute top-0 bottom-0 right-0 bg-gold/30" style={{ width: "14%" }} />
        {/* moving needle */}
        <span
          className="absolute top-1 bottom-1 w-1.5 rounded-full bg-haiti-red"
          style={{ left: `calc(${power * 100}% - 3px)` }}
        />
        <span className="absolute inset-0 flex items-center justify-center font-display text-base text-ink/70 pointer-events-none">
          Frappe au centre
        </span>
      </button>
    </div>
  );
}

function ResultPanel({ title, text, cta, onCta, celebrate }) {
  return (
    <div className="relative text-center rounded-2xl bg-white border border-line p-5 shadow-sm overflow-hidden">
      {celebrate && <Confetti />}
      <h2 className="relative font-display text-2xl text-ink">{title}</h2>
      <p className="relative text-muted text-sm mt-2">{text}</p>
      <button
        type="button"
        onClick={onCta}
        className="relative mt-4 inline-flex items-center justify-center min-h-[44px] px-8 rounded-full bg-haiti-red text-white font-display text-lg hover:bg-haiti-red/90 active:scale-95 transition"
      >
        {cta}
      </button>
    </div>
  );
}

function ChampionCard({ stats, onShare, copied, onReplay }) {
  return (
    <div className="relative mt-5 text-center rounded-2xl bg-ink text-bg p-6 overflow-hidden">
      <Confetti />
      <div className="absolute top-0 left-0 right-0 h-1.5 flex">
        <div className="flex-1 bg-haiti-blue" />
        <div className="flex-1 bg-haiti-red" />
      </div>
      <p className="relative text-5xl">🏆</p>
      <h2 className="relative font-display text-2xl md:text-3xl mt-3 leading-tight">
        Tu as éliminé trois grandes équipes aux tirs au but 🇭🇹
      </h2>
      <div className="relative mt-5 flex items-center justify-center gap-8">
        <div>
          <p className="font-display text-3xl">{stats.goals}</p>
          <p className="text-bg/60 text-xs uppercase tracking-wider">Buts</p>
        </div>
        <div>
          <p className="font-display text-3xl">{stats.saves}</p>
          <p className="text-bg/60 text-xs uppercase tracking-wider">Arrêts</p>
        </div>
      </div>
      <div className="relative mt-6 flex flex-col gap-3">
        <button
          type="button"
          onClick={onShare}
          className="inline-flex items-center justify-center min-h-[44px] px-8 rounded-full bg-haiti-blue text-white font-display text-lg active:scale-95 transition"
        >
          {copied ? "Copié ✓" : "Partager"}
        </button>
        <button
          type="button"
          onClick={onReplay}
          className="inline-flex items-center justify-center min-h-[44px] px-8 rounded-full border border-bg/30 text-bg font-display text-lg active:scale-95 transition"
        >
          Rejouer
        </button>
      </div>
    </div>
  );
}

function Confetti() {
  const pieces = useMemo(
    () =>
      Array.from({ length: 28 }, (_, i) => ({
        left: (i * 37) % 100,
        delay: (i % 7) * 0.12,
        color: ["#00209F", "#D21034", "#C8A45C", "#F7F7F5"][i % 4],
        rot: (i * 53) % 360,
      })),
    [],
  );
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {pieces.map((p, i) => (
        <span
          key={i}
          className="pen-confetti absolute block"
          style={{
            left: `${p.left}%`,
            top: "-10%",
            width: 8,
            height: 12,
            background: p.color,
            transform: `rotate(${p.rot}deg)`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </div>
  );
}

// Self-contained keyframes (shake, ripple, confetti). Respects reduced motion
// by being applied only when the parent opts in.
function PenaltyStyles() {
  return (
    <style>{`
      @keyframes penShake { 0%,100%{transform:translate(0,0)} 20%{transform:translate(-4px,2px)} 40%{transform:translate(4px,-2px)} 60%{transform:translate(-3px,1px)} 80%{transform:translate(3px,-1px)} }
      .pen-shake { animation: penShake 0.38s ease-in-out; }
      @keyframes penRipple { from{ width:6%; opacity:0.9 } to{ width:34%; opacity:0 } }
      .pen-ripple { aspect-ratio:1/1; transform:translate(-50%,-50%); border:3px solid rgba(247,247,245,0.9); animation: penRipple 0.5s ease-out forwards; z-index:5; }
      @keyframes penConfetti { from{ transform:translateY(0) rotate(0); opacity:1 } to{ transform:translateY(420px) rotate(420deg); opacity:0 } }
      .pen-confetti { border-radius:2px; animation: penConfetti 1.5s ease-in forwards; }
      @media (prefers-reduced-motion: reduce) {
        .pen-shake { animation: none !important; }
        .pen-confetti { animation: none !important; opacity:0 !important; }
        .pen-ripple { animation: none !important; opacity:0 !important; }
      }
    `}</style>
  );
}
