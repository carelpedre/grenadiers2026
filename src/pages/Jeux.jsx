import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import PageHeader from "../components/PageHeader";
import { useT } from "../lib/i18n";

// ╔══════════════════════════════════════════════════════════════════╗
// ║  JOUEZ — l'espace supporters (hub des jeux)                       ║
// ╚══════════════════════════════════════════════════════════════════╝

export default function Jeux() {
  const { t } = useT();

  const games = [
    {
      title: t("jeux.penalty.title"),
      blurb: t("jeux.penalty.blurb"),
      to: "/jeux/penalty",
      status: "live",
      cta: t("jeux.play"),
    },
    {
      title: t("jeux.quiz.title"),
      blurb: t("jeux.quiz.blurb"),
      to: "/jeux/quiz",
      status: "live",
      cta: t("jeux.play"),
    },
    {
      title: t("jeux.pwonostik.title"),
      blurb: t("jeux.pwonostik.blurb"),
      to: "/jeux/pwonostik",
      status: "live",
      cta: t("jeux.play"),
    },
    {
      title: t("jeux.devine.title"),
      blurb: t("jeux.devine.blurb"),
      to: "/jeux/devine",
      status: "live",
      cta: t("jeux.play"),
    },
    {
      title: t("jeux.onze.title"),
      blurb: t("jeux.onze.blurb"),
      to: "/jeux/onze",
      status: "live",
      cta: t("jeux.play"),
    },
  ];

  return (
    <div className="bg-bg min-h-screen">
      <PageHeader
        eyebrow={t("jeux.eyebrow")}
        title={t("jeux.title")}
        subtitle={t("jeux.subtitle")}
      />

      <div className="max-w-content mx-auto px-5 py-12 md:py-16">
        <div className="grid md:grid-cols-2 gap-5">
          {games.map((g, i) => {
            const card = (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                className={`relative h-full rounded-2xl border p-7 md:p-8 transition-all ${
                  g.status === "live"
                    ? "bg-white border-line hover:border-haiti-blue hover:shadow-lg cursor-pointer"
                    : "bg-surface border-line"
                }`}
              >
                {/* bicolor accent */}
                <div className="absolute top-0 left-7 right-7 h-1 flex rounded-b overflow-hidden opacity-80">
                  <div className="flex-1 bg-haiti-blue" />
                  <div className="flex-1 bg-haiti-red" />
                </div>

                <div className="flex items-center gap-2 mb-3">
                  {g.status === "live" ? (
                    <span className="text-[10px] uppercase tracking-wider font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                      {t("jeux.available")}
                    </span>
                  ) : (
                    <span className="text-[10px] uppercase tracking-wider font-bold text-muted bg-line/60 px-2 py-0.5 rounded-full">
                      {t("jeux.soon")}
                    </span>
                  )}
                </div>

                <h2 className={`font-display text-2xl md:text-3xl mb-2 ${g.status === "live" ? "text-ink" : "text-ink/60"}`}>
                  {g.title}
                </h2>
                <p className={`text-sm leading-relaxed mb-6 ${g.status === "live" ? "text-muted" : "text-muted/80"}`}>
                  {g.blurb}
                </p>

                <span
                  className={`inline-flex items-center gap-2 font-display text-lg ${
                    g.status === "live" ? "text-haiti-red" : "text-muted/60"
                  }`}
                >
                  {g.cta} {g.status === "live" && <span>→</span>}
                </span>
              </motion.div>
            );

            return g.to ? (
              <Link key={g.title} to={g.to} className="block h-full">
                {card}
              </Link>
            ) : (
              <div key={g.title} className="h-full">{card}</div>
            );
          })}
        </div>

        <p className="text-muted text-sm text-center mt-12 max-w-prose mx-auto">
          {t("jeux.footer")}
        </p>
      </div>
    </div>
  );
}
