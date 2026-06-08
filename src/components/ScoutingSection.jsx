// ╔══════════════════════════════════════════════════════════════════╗
// ║  Scouting adversaire — avant-match (/live/:slug, état "scheduled"). ║
// ║                                                                    ║
// ║  Reçoit la charge utile de la fonction edge wc-h2h (lue via         ║
// ║  getOpponentScouting). Aucune API externe. Deux sous-blocs :        ║
// ║   a) Forme récente de l'adversaire (5 derniers).                    ║
// ║   b) Bilan face à Haïti (H2H) ou première confrontation.            ║
// ║  Se masque si la charge utile est absente.                         ║
// ╚══════════════════════════════════════════════════════════════════╝

import { motion } from "framer-motion";
import ResultPill, { RESULT } from "./ResultPill";
import { frName } from "../lib/teamNames";

// Libellés FR de compétitions pour le bilan H2H.
const COMP_FR = { "Copa America": "Copa América" };
const compLabel = (name) => COMP_FR[name] || name || "";

function frDate(iso) {
  if (!iso) return "";
  return new Intl.DateTimeFormat("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(iso));
}
function frYear(iso) {
  if (!iso) return "";
  return new Date(iso).getFullYear();
}

export default function ScoutingSection({ data }) {
  if (!data || !data.ok) return null;

  const opp = data.opponent ?? {};
  const oppName = frName(opp.name) || "l'adversaire";
  const h2h = data.h2h ?? {};
  const last5 = Array.isArray(data.opponent_form?.last5) ? data.opponent_form.last5 : [];

  if (last5.length === 0 && !(h2h.played > 0)) return null;

  // Bande de forme : du plus ancien au plus récent (le plus récent à droite).
  const strip = [...last5].reverse();

  return (
    <section>
      <div className="border-b border-line pb-3 mb-6">
        <h2 className="font-display text-2xl md:text-3xl">Scouting adversaire</h2>
        <p className="text-muted text-sm mt-1">
          Avant le coup d'envoi : la forme du moment et le bilan face à Haïti.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* a) Forme récente de l'adversaire */}
        <div className="bg-white border border-line rounded-lg p-5">
          <div className="flex items-center gap-2 mb-4">
            {opp.logo && (
              <img src={opp.logo} alt="" loading="lazy" className="w-6 h-6 object-contain shrink-0" />
            )}
            <h3 className="font-display text-lg text-ink">Forme récente de {oppName}</h3>
          </div>

          {strip.length > 0 ? (
            <>
              <div className="flex items-center gap-1.5 mb-4">
                {strip.map((r, i) => (
                  <ResultPill
                    key={i}
                    res={r.res}
                    size="lg"
                    title={`${RESULT[r.res]?.full ?? ""} · ${r.gf}-${r.ga} ${frName(r.opponent)}`}
                  />
                ))}
              </div>

              <ul className="divide-y divide-line">
                {last5.map((r, i) => (
                  <li key={i} className="flex items-center gap-3 py-2.5">
                    <ResultPill res={r.res} size="sm" />
                    <div className="min-w-0 flex-1">
                      <p className="text-[11px] uppercase tracking-wider text-muted font-semibold truncate">
                        {frDate(r.date)}
                        <span className="text-muted/70"> · {r.home_away === "dom" ? "Dom." : "Ext."}</span>
                      </p>
                      <p className="text-sm text-ink truncate">
                        vs {frName(r.opponent)}{" "}
                        <span className="tabular-nums text-muted">
                          {r.gf}
                          <span className="mx-0.5">-</span>
                          {r.ga}
                        </span>
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <p className="text-sm text-muted">Forme récente indisponible.</p>
          )}
        </div>

        {/* b) Face à Haïti */}
        <div className="bg-white border border-line rounded-lg p-5">
          <h3 className="font-display text-lg text-ink mb-4">Face à Haïti</h3>

          {h2h.played > 0 ? (
            <>
              <p className="text-sm text-ink mb-4">
                <span className="font-display text-base">
                  {h2h.played} rencontre{h2h.played > 1 ? "s" : ""}
                </span>
                <span className="text-muted">
                  {" · "}
                  {h2h.haiti_wins} V {h2h.draws} N {h2h.haiti_losses} D
                  {" · "}
                  <span className="tabular-nums">{h2h.gf}-{h2h.ga}</span> buts
                </span>
              </p>

              <ul className="divide-y divide-line">
                {(h2h.last_meetings ?? []).map((m, i) => (
                  <li key={i} className="flex items-center gap-3 py-2.5">
                    <ResultPill res={m.res} size="sm" />
                    <div className="min-w-0 flex-1">
                      <p className="text-[11px] uppercase tracking-wider text-muted font-semibold truncate">
                        {compLabel(m.competition)}
                        {m.date ? <span className="text-muted/70"> · {frYear(m.date)}</span> : null}
                      </p>
                      <p className="text-sm text-ink">
                        Haïti{" "}
                        <span className="tabular-nums">
                          {m.haiti_gf}
                          <span className="text-muted mx-0.5">-</span>
                          {m.haiti_ga}
                        </span>
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <p className="text-sm text-muted leading-relaxed">
              Première confrontation entre les deux nations.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
