import { useEffect, useState } from "react";

// Storage key — once chosen, the picker doesn't show again for 30 days
const STORAGE_KEY = "grenadiers-2026-lang";
const STORAGE_TTL_DAYS = 30;

const languages = [
  {
    code: "ht",
    label: "Kreyòl",
    flag: "🇭🇹",
    line1: "Ann ale, Grenadye!",
    line2: "Kreyòl Ayisyen",
  },
  {
    code: "fr",
    label: "Français",
    flag: "🇫🇷",
    line1: "Allons-y, les Grenadiers !",
    line2: "Français",
  },
  {
    code: "en",
    label: "English",
    flag: "🇺🇸",
    line1: "Let's go, Grenadiers!",
    line2: "English",
  },
];

function getStoredLang() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const { value, ts } = JSON.parse(raw);
    const ageMs = Date.now() - ts;
    const ttlMs = STORAGE_TTL_DAYS * 24 * 60 * 60 * 1000;
    if (ageMs > ttlMs) return null;
    return value;
  } catch {
    return null;
  }
}

function setStoredLang(code) {
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ value: code, ts: Date.now() })
    );
  } catch {
    // localStorage blocked — fail silently, picker will show again
  }
}

export default function LanguagePicker({ onChoose }) {
  const [visible, setVisible] = useState(false);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    // Show only if no recent choice stored
    const existing = getStoredLang();
    if (existing) {
      onChoose?.(existing);
      return;
    }
    // Small delay before fade-in for a touch of theater
    const t = setTimeout(() => setVisible(true), 50);
    return () => clearTimeout(t);
  }, [onChoose]);

  const handleChoose = (code) => {
    setStoredLang(code);
    setFading(true);
    setTimeout(() => {
      onChoose?.(code);
    }, 400);
  };

  if (!visible && !fading && getStoredLang()) return null;
  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center transition-opacity duration-500 ${
        fading ? "opacity-0" : "opacity-100"
      }`}
      style={{
        background:
          "linear-gradient(135deg, #00209F 0%, #00209F 48%, #D21034 52%, #D21034 100%)",
      }}
    >
      {/* Coat of arms watermark */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        style={{ opacity: 0.06 }}
      >
        <img
          src="/images/haiti-coat-of-arms.svg"
          alt=""
          className="w-[80vmin] h-[80vmin] object-contain"
        />
      </div>

      {/* Content */}
      <div className="relative w-full max-w-2xl px-6 text-center text-bg">
        {/* Coat of arms — visible at top */}
        <div className="flex justify-center mb-8">
          <img
            src="/images/haiti-coat-of-arms.svg"
            alt="Republic of Haiti"
            className="w-24 h-24 md:w-32 md:h-32 object-contain drop-shadow-lg"
          />
        </div>

        <p className="text-xs uppercase tracking-[0.3em] text-bg/70 font-semibold mb-3">
          Grenadiers · 2026
        </p>
        <h1
          className="font-display text-4xl md:text-6xl mb-3"
          style={{ fontWeight: 800 }}
        >
          Welcome.
        </h1>
        <p className="text-bg/80 text-lg mb-12 max-w-md mx-auto leading-relaxed">
          Choose your language to follow Haiti at the FIFA World Cup 2026.
        </p>

        <div className="grid md:grid-cols-3 gap-3 md:gap-4">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleChoose(lang.code)}
              className="group bg-bg/10 hover:bg-bg/20 active:bg-bg/30 border border-bg/20 hover:border-bg/40 rounded-lg px-6 py-6 transition-all text-center backdrop-blur-sm"
            >
              <div className="text-4xl md:text-5xl mb-3">{lang.flag}</div>
              <p className="font-display text-xl md:text-2xl mb-1">
                {lang.label}
              </p>
              <p className="text-sm text-bg/70 italic">{lang.line1}</p>
              <div className="mt-4 inline-flex items-center gap-1.5 text-xs uppercase tracking-wider font-semibold text-bg/80 group-hover:text-bg transition-colors">
                Enter
                <svg
                  className="w-3.5 h-3.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </button>
          ))}
        </div>

        <p className="text-xs text-bg/50 mt-12 leading-relaxed max-w-md mx-auto">
          The site is currently in English. French (Français) and Haitian Creole (Kreyòl Ayisyen) translations
          coming before the tournament. You can change your language anytime from the footer.
        </p>
      </div>
    </div>
  );
}

// Helper for other components to read/clear the current language
export function getCurrentLang() {
  return getStoredLang();
}

export function clearLangChoice() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    /* ignore */
  }
}
