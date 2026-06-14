import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import ImagePlaceholder from "../components/ImagePlaceholder";
import { getEntriesSorted, getAlbums } from "../data/diary";
import { fadeUp, stagger } from "../lib/motion";

// ╔══════════════════════════════════════════════════════════════════════╗
// ║  Le Journal : editorial front page (index of /journal).                ║
// ║  Masthead · À la une (hero) · Grid (up to 6) · Archives (rest).         ║
// ║  Visual redesign only. DiaryEntry, diary.js, routes and meta untouched. ║
// ╚══════════════════════════════════════════════════════════════════════╝

export default function Diary() {
  const entries = getEntriesSorted();
  const hero = entries[0];
  const grid = entries.slice(1, 7); // entries[1..6]
  const archive = entries.slice(7); // entries[7+]
  const edition = useEditionLine();

  return (
    <div className="bg-bg">
      {/* ───────── MASTHEAD ───────── */}
      <section className="bg-bg border-b border-line">
        <div className="max-w-content mx-auto px-5 pt-14 pb-10 md:pt-24 md:pb-14">
          <motion.div variants={fadeUp} initial="hidden" animate="show">
            <h1 className="font-display text-ink text-5xl md:text-7xl leading-[0.95]">
              Le Journal
            </h1>
            {/* thin flag double-rule */}
            <div className="mt-5 w-28">
              <div className="h-[2px] bg-haiti-blue" />
              <div className="h-[2px] bg-haiti-red mt-[3px]" />
            </div>
            <p className="mt-5 text-muted text-lg md:text-xl">
              Chronique de la sélection nationale
            </p>
            {edition && (
              <p className="mt-4 text-gold text-xs md:text-sm uppercase tracking-[0.2em] font-semibold">
                {edition}
              </p>
            )}
          </motion.div>
        </div>
      </section>

      {entries.length === 0 ? (
        <section className="max-w-content mx-auto px-5 py-24 text-center">
          <p className="text-muted text-lg">
            Premières chroniques à paraître prochainement.
          </p>
        </section>
      ) : (
        <>
          {/* ───────── À LA UNE (hero) ───────── */}
          <section className="max-w-content mx-auto px-5 pt-10 md:pt-14">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
            >
              <Link to={`/journal/${hero.slug}`} className="group block">
                {/* Feature image (rounded, keeps the badge). Overlay text only on md+. */}
                <div className="relative rounded-xl overflow-hidden">
                  <div className="transition-transform duration-500 ease-out group-hover:scale-[1.02]">
                    <ImagePlaceholder
                      src={hero.cover}
                      alt={hero.title}
                      aspect="16/9"
                      rounded={false}
                      loading="eager"
                    />
                  </div>
                  {/* scrim + overlay: md and up only (mobile leaves the image uncovered) */}
                  <div className="hidden md:block pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/30 to-transparent" />
                  <CoverBadges entry={hero} />
                  <div className="hidden md:flex md:flex-col absolute inset-x-0 bottom-0 p-6 md:p-10 max-h-[55%] overflow-hidden">
                    {hero.eyebrow && (
                      <p className="text-gold text-sm uppercase tracking-[0.18em] font-bold mb-3">
                        {hero.eyebrow}
                      </p>
                    )}
                    <h2 className="font-display text-bg text-5xl leading-[1.05] max-w-3xl line-clamp-2">
                      {hero.title}
                    </h2>
                    <div className="h-[3px] w-0 bg-haiti-red mt-3 transition-all duration-500 ease-out group-hover:w-24" />
                    {hero.dek && (
                      <p className="text-bg/80 text-lg mt-4 max-w-2xl line-clamp-2">
                        {hero.dek}
                      </p>
                    )}
                    <p className="text-bg/60 text-sm uppercase tracking-wider mt-4">
                      {hero.dateLabel}
                    </p>
                  </div>
                </div>

                {/* Stacked content: mobile only (below md), nothing overlaid on the image */}
                <div className="md:hidden pt-4">
                  {hero.eyebrow && (
                    <p className="text-gold text-xs uppercase tracking-[0.18em] font-bold mb-2">
                      {hero.eyebrow}
                    </p>
                  )}
                  <h2 className="font-display text-ink text-2xl leading-[1.12]">
                    {hero.title}
                  </h2>
                  {hero.dek && (
                    <p className="text-muted text-sm leading-relaxed mt-2 line-clamp-2">
                      {hero.dek}
                    </p>
                  )}
                  <p className="text-muted text-xs uppercase tracking-wider mt-3">
                    {hero.dateLabel}
                  </p>
                </div>
              </Link>
            </motion.div>
          </section>

          {/* ───────── GRID ───────── */}
          {grid.length > 0 && (
            <section className="max-w-content mx-auto px-5 pt-12 md:pt-16">
              <motion.div
                className="grid md:grid-cols-2 gap-8 md:gap-10"
                variants={stagger(0.1)}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.1 }}
              >
                {grid.map((entry) => (
                  <GridCard key={entry.slug} entry={entry} />
                ))}
              </motion.div>
            </section>
          )}

          {/* ───────── ARCHIVES ───────── */}
          {archive.length > 0 && (
            <section className="max-w-content mx-auto px-5 pt-16 md:pt-20 pb-20">
              <div className="flex items-center gap-4 mb-4">
                <h2 className="text-gold text-xs uppercase tracking-[0.2em] font-bold shrink-0">
                  Archives
                </h2>
                <div className="flex-1 h-px bg-line" />
              </div>
              <motion.ul
                variants={stagger(0.05)}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.05 }}
              >
                {archive.map((entry) => (
                  <motion.li
                    key={entry.slug}
                    variants={fadeUp}
                    className="border-t border-line last:border-b"
                  >
                    <Link
                      to={`/journal/${entry.slug}`}
                      className="group flex flex-col gap-1 py-4 md:flex-row md:items-baseline md:gap-5"
                    >
                      <span className="text-muted text-xs md:text-sm uppercase tracking-wider md:w-32 md:shrink-0">
                        {entry.dateLabel}
                      </span>
                      {entry.eyebrow && (
                        <span className="text-gold text-xs uppercase tracking-wider font-bold md:w-52 md:shrink-0">
                          {entry.eyebrow}
                        </span>
                      )}
                      <span className="font-display text-ink text-lg md:text-xl leading-snug transition-colors group-hover:text-haiti-blue">
                        {entry.title}
                      </span>
                    </Link>
                  </motion.li>
                ))}
              </motion.ul>
            </section>
          )}
        </>
      )}
    </div>
  );
}

// ───────── Grid card ─────────
function GridCard({ entry }) {
  return (
    <motion.div variants={fadeUp}>
      <Link to={`/journal/${entry.slug}`} className="group block">
        <div className="relative rounded-xl overflow-hidden">
          <div className="overflow-hidden">
            <div className="transition-transform duration-500 ease-out group-hover:scale-[1.02]">
              <ImagePlaceholder
                src={entry.cover}
                alt={entry.title}
                aspect="16/10"
                rounded={false}
              />
            </div>
          </div>
          <CoverBadges entry={entry} />
        </div>
        <div className="pt-5">
          {entry.eyebrow && (
            <span className="inline-block text-gold text-[11px] uppercase tracking-[0.16em] font-bold border border-line rounded-full px-3 py-1">
              {entry.eyebrow}
            </span>
          )}
          <h3 className="font-display text-ink text-2xl md:text-[1.7rem] leading-snug mt-4 line-clamp-2">
            {entry.title}
          </h3>
          <div className="h-[3px] w-0 bg-haiti-red mt-2 transition-all duration-500 ease-out group-hover:w-16" />
          {entry.dek && (
            <p className="text-muted text-sm md:text-base leading-relaxed mt-3 line-clamp-2">
              {entry.dek}
            </p>
          )}
          <p className="text-muted text-xs uppercase tracking-wider mt-4">
            {entry.dateLabel}
          </p>
        </div>
      </Link>
    </motion.div>
  );
}

// ───────── Cover badges: play (has video) and/or photo stack (has albums) ─────────
function CoverBadges({ entry }) {
  const hasVideo = Boolean(entry.video);
  const photoCount = getAlbums(entry).reduce(
    (n, a) => n + (a.photos ? a.photos.length : 0),
    0
  );
  if (!hasVideo && photoCount === 0) return null;

  return (
    <div className="absolute top-4 right-4 flex items-center gap-2">
      {hasVideo && (
        <span
          className="flex items-center justify-center w-10 h-10 rounded-full bg-ink/70 backdrop-blur-sm ring-1 ring-bg/25"
          aria-hidden="true"
        >
          <svg className="w-4 h-4 text-bg ml-0.5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M8 5v14l11-7z" />
          </svg>
        </span>
      )}
      {photoCount > 0 && (
        <span
          className="flex items-center gap-1.5 h-8 px-3 rounded-full bg-ink/70 backdrop-blur-sm ring-1 ring-bg/25 text-bg text-xs font-semibold"
          aria-hidden="true"
        >
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="6" y="6" width="14" height="14" rx="2" />
            <path d="M4 16V5a1 1 0 0 1 1-1h11" />
          </svg>
          {photoCount}
        </span>
      )}
    </div>
  );
}

// ───────── "Édition du <date>" line, computed client-side ─────────
function useEditionLine() {
  const [line, setLine] = useState("");
  useEffect(() => {
    const now = new Date();
    const dateStr = new Intl.DateTimeFormat("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(now);
    let s = `Édition du ${dateStr}`;
    const target = new Date(2026, 5, 13); // 13 June 2026 (local)
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const days = Math.round((target - today) / 86400000);
    if (days > 0) s += ` · J-${days} avant Ayiti vs Écosse`;
    setLine(s);
  }, []);
  return line;
}
