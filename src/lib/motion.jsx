// ╔═══════════════════════════════════════════════════════════════════════╗
// ║  MOTION PRIMITIVES                                                     ║
// ║  Shared animation variants used across the site.                       ║
// ║  All respect prefers-reduced-motion (Framer Motion handles this).      ║
// ╚═══════════════════════════════════════════════════════════════════════╝

import { useEffect, useRef, useState } from "react";

// ─── Variants for fade-and-rise ──────────────────────────────────────────
export const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.45 } },
};

// Container that staggers its children with a small delay
export const stagger = (delayBetween = 0.06, initialDelay = 0) => ({
  hidden: { opacity: 1 }, // container stays visible — children handle fade
  show: {
    opacity: 1,
    transition: {
      staggerChildren: delayBetween,
      delayChildren: initialDelay,
    },
  },
});

// Flag slide-in from sides (for match cards)
export const slideInLeft = {
  hidden: { opacity: 0, x: -40 },
  show: { opacity: 1, x: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
};
export const slideInRight = {
  hidden: { opacity: 0, x: 40 },
  show: { opacity: 1, x: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
};

// Pin drop for the map (gravity feel)
export const pinDrop = {
  hidden: { opacity: 0, y: -20, scale: 0.4 },
  show: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 320, damping: 18 } },
};

// ─── Counter hook: counts from 0 to target when element enters view ─────
export function useCountUp(target, duration = 1800, enabled = true) {
  // Default to the final value so the number is correct at rest even before /
  // without the animation — it can never get stuck at 0.
  const [value, setValue] = useState(target);
  const ref = useRef(null);

  useEffect(() => {
    if (!enabled) {
      setValue(target);
      return;
    }

    // Respect prefers-reduced-motion → snap to the final value, no animation.
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      setValue(target);
      return;
    }

    // Animation runs to completion on mount (not gated on viewport), so it
    // always lands on `target` and is never left at 0.
    let startTs = null;
    let raf = null;
    setValue(0);

    const tick = (ts) => {
      if (startTs === null) startTs = ts;
      const progress = Math.min(1, (ts - startTs) / duration);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      if (progress < 1) {
        setValue(Math.round(target * eased));
        raf = requestAnimationFrame(tick);
      } else {
        setValue(target); // land exactly on target
      }
    };
    raf = requestAnimationFrame(tick);

    return () => {
      if (raf) cancelAnimationFrame(raf);
    };
  }, [target, duration, enabled]);

  return [value, ref];
}

// ─── Inline component: number that counts up when scrolled into view ────
export function CountUpNumber({ target, duration = 1800, format = (n) => n.toLocaleString(), className = "" }) {
  const [value, ref] = useCountUp(target, duration);
  return (
    <span ref={ref} className={`tabular-nums ${className}`}>
      {format(value)}
    </span>
  );
}
