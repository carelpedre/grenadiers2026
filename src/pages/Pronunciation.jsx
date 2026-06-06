import { useState, useRef } from "react";
import { motion } from "framer-motion";
import PageHeader from "../components/PageHeader";
import ImagePlaceholder from "../components/ImagePlaceholder";
import { fadeUp, stagger } from "../lib/motion";
import { getPronunciations } from "../data/pronunciations";

// ╔═══════════════════════════════════════════════════════════════════════╗
// ║  PRONUNCIATION GUIDE — /say-their-names                                ║
// ║                                                                        ║
// ║  Built for journalists, commentators, fans who want to say the names   ║
// ║  the right way. Each card has:                                         ║
// ║    - Player photo + name                                               ║
// ║    - Phonetic spelling (lazy, for English speakers)                    ║
// ║    - IPA (linguist-grade accuracy)                                     ║
// ║    - Optional note (e.g. "his surname is really 'Experience'")         ║
// ║    - Play button → loads /audio/pronunciations/<slug>.mp3              ║
// ║                                                                        ║
// ║  Audio files: record yourself saying each name twice, clearly.         ║
// ║  Save as MP3 to public/audio/pronunciations/<slug>.mp3.                ║
// ║  Audio fails gracefully if the file isn't there yet — the rest works.  ║
// ╚═══════════════════════════════════════════════════════════════════════╝

export default function Pronunciation() {
  const list = getPronunciations();

  return (
    <div>
      <PageHeader
        eyebrow="For journalists · For commentators · For fans"
        title="Say their names."
        subtitle="A quick guide to pronouncing every player on Haiti's 2026 World Cup squad. Audio recorded by Carel Pedre. In English, this name is hard. In our mouths, it's home."
      />

      <div className="max-w-content mx-auto px-5 py-12 md:py-16">
        {/* Intro note */}
        <section className="bg-haiti-blue text-bg rounded-2xl p-6 md:p-8 mb-12">
          <div className="grid md:grid-cols-[1fr_auto] gap-6 items-center">
            <div>
              <p className="text-haiti-red text-xs uppercase tracking-wider font-bold mb-2">A note for media</p>
              <h2 className="font-display text-xl md:text-2xl mb-2">Get the names right.</h2>
              <p className="text-bg/80 leading-relaxed text-sm">
                Most of these players have French or Haitian Creole names — and English commentary often mispronounces them. We made this page because we want the world to say "Frantzdy Pierrot" the way his mother does. Tap any 🔊 to hear it spoken by Carel Pedre.
              </p>
            </div>
            <a
              href="mailto:contact@grenadiers2026.com?subject=Pronunciation guide — interview request"
              className="inline-flex items-center gap-2 px-5 py-3 bg-haiti-red hover:bg-haiti-red-dark text-bg font-semibold rounded-full text-sm transition-colors whitespace-nowrap"
            >
              Press inquiries →
            </a>
          </div>
        </section>

        {/* List grid */}
        <motion.div
          className="grid md:grid-cols-2 gap-4"
          variants={stagger(0.04)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.05 }}
        >
          {list.map((entry) => (
            <PronunciationRow key={entry.slug} entry={entry} />
          ))}
        </motion.div>

        {/* IPA legend */}
        <section className="mt-12 pt-8 border-t border-line">
          <p className="text-xs uppercase tracking-wider text-muted font-bold mb-3">A quick legend</p>
          <div className="grid md:grid-cols-2 gap-4 text-sm text-ink/80">
            <p><strong className="text-ink">Phonetic</strong> — read it like English. CAPS for emphasis. "PYAIR" = sounds like "pierre."</p>
            <p><strong className="text-ink">IPA</strong> — the international phonetic alphabet, for linguists and broadcasters who use it.</p>
          </div>
        </section>
      </div>
    </div>
  );
}

function PronunciationRow({ entry }) {
  const [playing, setPlaying] = useState(false);
  const [audioError, setAudioError] = useState(false);
  const audioRef = useRef(null);

  function handlePlay() {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      audio.currentTime = 0;
      setPlaying(false);
    } else {
      audio.play().then(() => setPlaying(true)).catch(() => setAudioError(true));
    }
  }

  return (
    <motion.div variants={fadeUp} className="bg-white border border-line rounded-lg overflow-hidden hover:border-haiti-red transition-colors">
      <div className="flex items-stretch">
        <div className="w-24 md:w-28 flex-shrink-0">
          <ImagePlaceholder src={entry.photo} label={entry.name} aspect="1/1" rounded={false} />
        </div>
        <div className="flex-1 p-4 min-w-0">
          <div className="flex items-baseline gap-2 mb-1">
            <h3 className="font-display text-lg truncate">{entry.name}</h3>
            {entry.number && <span className="text-sm text-muted tabular-nums font-display">#{entry.number}</span>}
          </div>
          <p className="text-haiti-red text-xs uppercase tracking-wider font-bold mb-2">{entry.role}</p>
          <p className="font-display text-base text-ink mb-1">{entry.phonetic}</p>
          <p className="text-xs text-muted font-mono mb-1">/{entry.ipa}/</p>
          {entry.note && <p className="text-xs text-muted italic mt-1">{entry.note}</p>}
        </div>
        <div className="flex items-center pr-4">
          <button
            onClick={handlePlay}
            disabled={audioError}
            className={`w-11 h-11 rounded-full flex items-center justify-center transition-all flex-shrink-0 ${
              audioError
                ? "bg-line/50 text-muted cursor-not-allowed"
                : playing
                ? "bg-haiti-red text-bg scale-110"
                : "bg-haiti-blue text-bg hover:bg-haiti-blue-dark hover:scale-105"
            }`}
            aria-label={`Play pronunciation of ${entry.name}`}
            title={audioError ? "Audio not yet available" : `Play ${entry.name}`}
          >
            {playing ? (
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <rect x="6" y="5" width="4" height="14" />
                <rect x="14" y="5" width="4" height="14" />
              </svg>
            ) : (
              <svg className="w-4 h-4 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </button>
        </div>
        <audio
          ref={audioRef}
          src={entry.audio}
          onEnded={() => setPlaying(false)}
          onError={() => setAudioError(true)}
          preload="none"
        />
      </div>
    </motion.div>
  );
}
