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
  const [value, setValue] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    if (!enabled) return;

    // Respect prefers-reduced-motion
    const prefersReduced = typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      setValue(target);
      return;
    }

    let startTs = null;
    let raf = null;
    let observer = null;

    const tick = (ts) => {
      if (startTs === null) startTs = ts;
      const progress = Math.min(1, (ts - startTs) / duration);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(target * eased));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };

    if (ref.current && "IntersectionObserver" in window) {
      observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            raf = requestAnimationFrame(tick);
            observer.disconnect();
          }
        },
        { threshold: 0.5 }
      );
      observer.observe(ref.current);
    } else {
      // Fallback: just animate immediately
      raf = requestAnimationFrame(tick);
    }

    return () => {
      if (raf) cancelAnimationFrame(raf);
      if (observer) observer.disconnect();
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
