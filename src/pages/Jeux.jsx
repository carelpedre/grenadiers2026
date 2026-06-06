import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import PageHeader from "../components/PageHeader";

// ╔══════════════════════════════════════════════════════════════════╗
// ║  JOUEZ — l'espace supporters (hub des jeux)                       ║
// ╚══════════════════════════════════════════════════════════════════╝

const games = [
  {
    title: "Quiz Grenadier",
    blurb: "Huit questions sur 1974, la sélection 2026 et la Fédération. Score partageable.",
    to: "/jeux/quiz",
    status: "live",
    cta: "Jouer",
  },
  {
    title: "Pwonostik",
    blurb: "Pronostiquez le score des trois matchs d'Haïti. Score exact = 3 pts, bon résultat = 1 pt.",
    to: "/jeux/pwonostik",
    status: "live",
    cta: "Jouer",
  },
  {
    title: "Devine le Grenadier",
    blurb: "Un joueur mystère chaque jour. Six essais, des indices, un résultat à partager.",
    to: "/jeux/devine",
    status: "live",
    cta: "Jouer",
  },
  {
    title: "Ton Onze de Départ",
    blurb: "Composez votre onze de départ parmi les 26 Grenadiers, puis partagez-le avec votre groupe.",
    to: "/jeux/onze",
    status: "live",
    cta: "Jouer",
  },
];

export default function Jeux() {
  return (
    <div className="bg-bg min-h-screen">
      <PageHeader
        eyebrow="Espace supporters"
        title="Jouez."
        subtitle="Des jeux pour vivre la route des Grenadiers vers la Coupe du Monde — et la partager."
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
                      Disponible
                    </span>
                  ) : (
                    <span className="text-[10px] uppercase tracking-wider font-bold text-muted bg-line/60 px-2 py-0.5 rounded-full">
                      Bientôt
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
          D'autres jeux arrivent avant et pendant le tournoi. Revenez régulièrement — ou suivez Chokarella Media pour ne rien manquer.
        </p>
      </div>
    </div>
  );
}
