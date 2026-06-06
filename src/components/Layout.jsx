import { Outlet, NavLink, Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useT } from "../lib/i18n";
import EmailSignup from "./EmailSignup";
import ShareButton from "./ShareButton";
import BackToTop from "./BackToTop";
import LiveIsland from "./LiveIsland";

const navItems = [
  { to: "/", labelKey: "nav.home" },
  { to: "/squad", labelKey: "nav.squad" },
  { to: "/matches", labelKey: "nav.matches" },
  { to: "/journal", labelKey: "nav.journal" },
  { to: "/mur", labelKey: "nav.fanwall" },
  { to: "/the-tribute", labelKey: "nav.tribute" },
  { to: "/federation", labelKey: "nav.federation" },
  { to: "/history-1974", labelKey: "nav.history" },
  { to: "/jeux", labelKey: "nav.games" },
];

export default function Layout() {
  const [open, setOpen] = useState(false);
  const { t } = useT();
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-40 bg-bg/95 backdrop-blur border-b border-line">
        <div className="max-w-content mx-auto px-5 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5 group">
            <img
              src="/images/brand/fhf-logo.svg"
              alt="Fédération Haïtienne de Football"
              className="h-10 w-10 shrink-0"
              width="40"
              height="40"
            />
            <span className="font-display text-lg tracking-tight">
              Grenadiers <span className="text-haiti-red">2026</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-7">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === "/"}
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors ${
                    isActive ? "text-haiti-blue" : "text-ink hover:text-haiti-blue"
                  }`
                }
              >
                {t(item.labelKey)}
              </NavLink>
            ))}
          </nav>

          <button
            className="md:hidden p-2"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {open ? <path d="M18 6L6 18M6 6l12 12" /> : <path d="M3 12h18M3 6h18M3 18h18" />}
            </svg>
          </button>
        </div>

        {open && (
          <nav className="md:hidden border-t border-line bg-bg">
            <div className="max-w-content mx-auto px-5 py-3 flex flex-col gap-3">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === "/"}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `text-base font-medium py-1 ${
                      isActive ? "text-haiti-blue" : "text-ink"
                    }`
                  }
                >
                  {t(item.labelKey)}
                </NavLink>
              ))}
            </div>
          </nav>
        )}
      </header>

      <main className="flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Site-wide live match bar (dynamic island), bottom-center */}
      <LiveIsland />

      {/* Floating actions on every page: share (always) + back-to-top (on scroll) */}
      <div className="fixed bottom-6 right-6 z-40">
        <ShareButton floating title="Grenadiers 2026 — Haïti à la Coupe du Monde 2026" />
      </div>
      <div className="fixed bottom-[5.5rem] right-6 z-40">
        <BackToTop />
      </div>

      <footer className="border-t border-line bg-ink text-bg mt-20">
        {/* Email signup strip at top of footer */}
        <div className="border-b border-bg/10">
          <div className="max-w-content mx-auto px-5 py-12">
            <EmailSignup variant="footer" />
          </div>
        </div>

        {/* Crest banner — large centered FHF logo */}
        <div className="border-b border-bg/10">
          <div className="max-w-content mx-auto px-5 pt-12 pb-8 flex flex-col items-center text-center">
            <img
              src="/images/brand/fhf-logo.svg"
              alt="Fédération Haïtienne de Football"
              className="h-24 md:h-32 w-auto"
              width="128"
              height="128"
            />
            <p className="font-display text-2xl md:text-3xl mt-5 tracking-tight">
              Grenadiers <span className="text-haiti-red">2026</span>
            </p>
            <p className="text-bg/60 text-sm mt-1 max-w-prose">
              Fédération Haïtienne de Football · Coupe du Monde de la FIFA 2026
            </p>
          </div>

          {/* Sponsor scarf — chevron-edged white band with logo slots */}
          <FooterSponsorScarf />
        </div>

        <div className="max-w-content mx-auto px-5 py-12 grid md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2.5 mb-3">
              <img
                src="/images/brand/fhf-logo.svg"
                alt="Fédération Haïtienne de Football"
                className="h-10 w-10 shrink-0"
                width="40"
                height="40"
              />
              <span className="font-display text-lg">Grenadiers 2026</span>
            </div>
            <p className="text-sm text-bg/70 leading-relaxed">
              {t("footer.about.body")}
            </p>
          </div>
          <div>
            <h4 className="font-display text-sm mb-3 text-bg/60 uppercase tracking-wider">{t("footer.explore.title")}</h4>
            <ul className="space-y-2 text-sm">
              {navItems.map((item) => (
                <li key={item.to}>
                  <Link to={item.to} className="hover:text-haiti-red transition-colors">
                    {t(item.labelKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-display text-sm mb-3 text-bg/60 uppercase tracking-wider">Pour les médias</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/the-tribute" className="hover:text-haiti-red transition-colors">Hommage créatif</Link></li>
              <li><Link to="/about" className="hover:text-haiti-red transition-colors">À propos de ce site</Link></li>
              <li><a href="mailto:contact@grenadiers2026.com" className="hover:text-haiti-red transition-colors">Nous contacter</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-bg/10">
          <div className="max-w-content mx-auto px-5 py-5 text-xs text-bg/50">
            <span>{t("footer.copyright")}</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

// ─── Sponsor scarf ─────────────────────────────────────────────────
// FFF-inspired chevron-edged white band. Renders 6 logo slots.
// When a slot has logoUrl + name set, displays the logo. Otherwise,
// displays a subtle placeholder text inviting partners.
// Edit the FOOTER_SPONSORS array below to fill the scarf.
const FOOTER_SPONSORS = [
  { name: null, logoUrl: null, url: null },
  { name: null, logoUrl: null, url: null },
  { name: null, logoUrl: null, url: null },
  { name: null, logoUrl: null, url: null },
  { name: null, logoUrl: null, url: null },
  { name: null, logoUrl: null, url: null },
];

function FooterSponsorScarf() {
  return (
    <div className="max-w-content mx-auto px-5 pb-12">
      <p className="text-bg/40 text-[10px] uppercase tracking-[0.2em] text-center mb-4 font-semibold">
        Partenaires officiels
      </p>
      <div
        className="bg-white text-ink py-5 px-6 md:px-10 shadow-lg"
        style={{
          // chevron / scarf shape — pointed ends on both sides
          clipPath:
            "polygon(2% 0, 98% 0, 100% 50%, 98% 100%, 2% 100%, 0 50%)",
        }}
      >
        <div className="grid grid-cols-3 md:grid-cols-6 gap-4 md:gap-6 items-center">
          {FOOTER_SPONSORS.map((sponsor, idx) => (
            <SponsorSlot key={idx} {...sponsor} />
          ))}
        </div>
      </div>
    </div>
  );
}

function SponsorSlot({ name, logoUrl, url }) {
  // No sponsor assigned yet — render a quiet placeholder
  if (!logoUrl) {
    return (
      <div className="h-12 md:h-14 flex items-center justify-center">
        <span className="text-muted/40 text-[10px] md:text-xs uppercase tracking-wider text-center leading-tight">
          Espace<br />partenaire
        </span>
      </div>
    );
  }
  const inner = (
    <img
      src={logoUrl}
      alt={name || "Sponsor"}
      className="max-h-12 md:max-h-14 w-auto max-w-full object-contain"
    />
  );
  if (url) {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="h-12 md:h-14 flex items-center justify-center hover:opacity-80 transition-opacity"
        aria-label={name || "Sponsor"}
      >
        {inner}
      </a>
    );
  }
  return <div className="h-12 md:h-14 flex items-center justify-center">{inner}</div>;
}
