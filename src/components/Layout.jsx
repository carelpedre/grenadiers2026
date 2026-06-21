import { Outlet, NavLink, Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useT } from "../lib/i18n";
import EmailSignup from "./EmailSignup";
import ShareButton from "./ShareButton";
import BackToTop from "./BackToTop";
import LiveIsland from "./LiveIsland";
import { LanguageToggle } from "./LanguagePicker";

const navItems = [
  { to: "/", labelKey: "nav.home" },
  { to: "/squad", labelKey: "nav.squad" },
  { to: "/matches", labelKey: "nav.matches" },
  { to: "/journal", labelKey: "nav.journal" },
  { to: "/foto", labelKey: "nav.photos" },
  { to: "/the-tribute", labelKey: "nav.tribute" },
  { to: "/federation", labelKey: "nav.federation" },
  { to: "/history-1974", labelKey: "nav.history" },
  { to: "/jeux", labelKey: "nav.games" },
];

// Espace Supporters · contenus créés par les fans, regroupés sous un seul menu
// (déroulant sur desktop, section dédiée dans le menu mobile et le pied de page).
const supporterItems = [
  { to: "/mur", labelKey: "nav.fanwall" },
  { to: "/galerie-supporters", labelKey: "nav.gallery" },
  { to: "/partager-ta-photo", labelKey: "nav.sharePhoto" },
];

// Libellé d'un item : clé i18n si présente, sinon libellé brut (français).
const navLabel = (t, item) => (item.labelKey ? t(item.labelKey) : item.label);

export default function Layout() {
  const [open, setOpen] = useState(false);
  const { t } = useT();
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Accessibility: keyboard skip-to-content link (visible only on focus) */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:px-4 focus:py-2 focus:rounded-full focus:bg-haiti-blue focus:text-bg focus:font-semibold focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-haiti-red"
      >
        {t("layout.skipToContent")}
      </a>
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

          <nav className="hidden xl:flex items-center gap-x-5 whitespace-nowrap">
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

            {/* Espace Supporters · menu déroulant (survol souris + focus clavier,
                sans JS : group-hover / group-focus-within). */}
            <div className="relative group">
              <button
                type="button"
                className="inline-flex items-center gap-1 text-sm font-medium text-ink hover:text-haiti-blue transition-colors"
                aria-haspopup="true"
              >
                {t("layout.supportersMenu")}
                <svg
                  className="w-3.5 h-3.5 transition-transform group-hover:rotate-180"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  aria-hidden="true"
                >
                  <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <div className="invisible opacity-0 translate-y-1 transition-all duration-150 group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 group-focus-within:visible group-focus-within:opacity-100 group-focus-within:translate-y-0 absolute right-0 top-full pt-3 z-50">
                <div className="w-60 rounded-xl border border-line bg-bg shadow-lg p-2">
                  {supporterItems.map((item) => (
                    <NavLink
                      key={item.to}
                      to={item.to}
                      className={({ isActive }) =>
                        `block rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                          isActive
                            ? "text-haiti-blue bg-line/40"
                            : "text-ink hover:text-haiti-blue hover:bg-line/30"
                        }`
                      }
                    >
                      {navLabel(t, item)}
                    </NavLink>
                  ))}
                </div>
              </div>
            </div>

            {/* Sélecteur de langue à drapeaux (FR / EN / HT) */}
            <LanguageToggle className="ml-2" />
          </nav>

          {/* Mobile : drapeaux toujours visibles, hors du menu replié */}
          <div className="flex items-center gap-2 xl:hidden">
            <LanguageToggle />
            <button
              className="p-2"
              onClick={() => setOpen(!open)}
              aria-label="Toggle menu"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                {open ? <path d="M18 6L6 18M6 6l12 12" /> : <path d="M3 12h18M3 6h18M3 18h18" />}
              </svg>
            </button>
          </div>
        </div>

        {open && (
          <nav className="xl:hidden border-t border-line bg-bg">
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

              {/* Espace Supporters · section dédiée dans le menu mobile */}
              <div className="mt-1 pt-3 border-t border-line">
                <p className="text-xs uppercase tracking-wider text-muted font-semibold mb-2">
                  {t("layout.supportersMenu")}
                </p>
                <div className="flex flex-col gap-3 pl-1">
                  {supporterItems.map((item) => (
                    <NavLink
                      key={item.to}
                      to={item.to}
                      onClick={() => setOpen(false)}
                      className={({ isActive }) =>
                        `text-base font-medium py-1 ${
                          isActive ? "text-haiti-blue" : "text-ink"
                        }`
                      }
                    >
                      {navLabel(t, item)}
                    </NavLink>
                  ))}
                </div>
              </div>
            </div>
          </nav>
        )}
      </header>

      <main id="main-content" tabIndex={-1} className="flex-1 outline-none">
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

      {/* Floating actions on every page: share (always) + back-to-top (on scroll).
          Positioned with the iOS safe-area inset so they clear the home indicator
          and the auto-hiding toolbar instead of pinning to the raw viewport bottom. */}
      <div
        className="fixed right-5 z-40"
        style={{ bottom: "max(env(safe-area-inset-bottom), 16px)" }}
      >
        <ShareButton floating title={t("layout.shareTitle")} />
      </div>
      <div
        className="fixed right-5 z-40"
        style={{ bottom: "calc(max(env(safe-area-inset-bottom), 16px) + 3.75rem)" }}
      >
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
              {t("layout.footer.tagline")}
            </p>
          </div>
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
              {[...navItems, ...supporterItems].map((item) => (
                <li key={item.to}>
                  <Link to={item.to} className="hover:text-haiti-red transition-colors">
                    {navLabel(t, item)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-display text-sm mb-3 text-bg/60 uppercase tracking-wider">{t("layout.footer.mediaTitle")}</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/the-tribute" className="hover:text-haiti-red transition-colors">{t("nav.tribute")}</Link></li>
              <li><Link to="/about" className="hover:text-haiti-red transition-colors">{t("layout.footer.aboutSite")}</Link></li>
              <li><a href="mailto:contact@grenadiers2026.com" className="hover:text-haiti-red transition-colors">{t("layout.footer.contact")}</a></li>
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

