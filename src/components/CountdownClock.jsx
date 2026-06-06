import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function CountdownClock({ target }) {
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const diff = new Date(target).getTime() - now;
  const past = diff <= 0;

  const days = Math.max(0, Math.floor(diff / (1000 * 60 * 60 * 24)));
  const hours = Math.max(0, Math.floor((diff / (1000 * 60 * 60)) % 24));
  const minutes = Math.max(0, Math.floor((diff / (1000 * 60)) % 60));
  const seconds = Math.max(0, Math.floor((diff / 1000) % 60));

  if (past) {
    return (
      <div className="inline-flex items-center gap-2 px-4 py-2 bg-haiti-red text-bg rounded-full text-sm font-semibold">
        <span className="w-2 h-2 bg-bg rounded-full animate-pulse"></span>
        Match in progress
      </div>
    );
  }

  return (
    <div className="flex gap-3">
      <TimeBlock value={days} label="jours" />
      <TimeBlock value={hours} label="h" />
      <TimeBlock value={minutes} label="min" />
      <TimeBlock value={seconds} label="sec" pulse />
    </div>
  );
}

function TimeBlock({ value, label, pulse = false }) {
  return (
    <div className="text-center">
      <div className="font-display text-3xl md:text-4xl text-haiti-blue tabular-nums relative overflow-hidden h-[1em] md:h-[1em]">
        {pulse ? (
          <AnimatePresence mode="popLayout">
            <motion.span
              key={value}
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "-100%", opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="block"
            >
              {String(value).padStart(2, "0")}
            </motion.span>
          </AnimatePresence>
        ) : (
          <span>{String(value).padStart(2, "0")}</span>
        )}
      </div>
      <div className="text-xs uppercase tracking-wider text-muted mt-1">{label}</div>
    </div>
  );
}
