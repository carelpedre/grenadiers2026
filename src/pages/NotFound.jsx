import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useT } from "../lib/i18n";

export default function NotFound() {
  const { t } = useT();
  useEffect(() => {
    document.title = t("notFound.docTitle");
  }, [t]);

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-5 py-16 bg-bg">
      <div className="max-w-xl text-center">
        <p className="font-display text-7xl md:text-8xl text-haiti-blue mb-4">404</p>
        <h1 className="font-display text-3xl md:text-4xl mb-4 text-ink">
          {t("notFound.title")}
        </h1>
        <p className="text-muted leading-relaxed mb-8">
          {t("notFound.body")}
        </p>

        <div className="grid grid-cols-2 gap-3 max-w-sm mx-auto">
          <Link
            to="/"
            className="px-4 py-3 bg-haiti-red hover:bg-haiti-red-dark text-bg font-semibold rounded-full transition-colors"
          >
            {t("nav.home")}
          </Link>
          <Link
            to="/squad"
            className="px-4 py-3 bg-white border border-line hover:border-haiti-red text-ink font-semibold rounded-full transition-colors"
          >
            {t("nav.squad")}
          </Link>
          <Link
            to="/matches"
            className="px-4 py-3 bg-white border border-line hover:border-haiti-red text-ink font-semibold rounded-full transition-colors"
          >
            {t("matches.fixtures")}
          </Link>
          <Link
            to="/federation"
            className="px-4 py-3 bg-white border border-line hover:border-haiti-red text-ink font-semibold rounded-full transition-colors"
          >
            {t("federation.eyebrow")}
          </Link>
        </div>

        <p className="text-xs text-muted mt-10 italic">
          {t("notFound.reportPrefix")}{" "}
          <a href="mailto:contact@grenadiers2026.com" className="text-haiti-blue underline hover:no-underline">
            contact@grenadiers2026.com
          </a>{" "}
          {t("notFound.reportSuffix")}
        </p>
      </div>
    </div>
  );
}
