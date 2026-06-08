// ╔══════════════════════════════════════════════════════════════════╗
// ║  Forme récente — derniers résultats d'Haïti (lecture DB seule).    ║
// ║                                                                    ║
// ║  Lit la vue publique haiti_fixtures_public via getRecentResults()  ║
// ║  (statuts terminés FT/AET/PEN). Aucune API externe. Dérive les     ║
// ║  scores du point de vue d'Haïti (équipe 2386), affiche une bande   ║
// ║  de forme (5 derniers, le plus récent à droite) puis la liste des  ║
// ║  derniers matchs. Se masque si le backend est indisponible ou      ║
// ║  qu'aucun résultat n'est encore enregistré.                        ║
// ╚══════════════════════════════════════════════════════════════════╝

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getRecentResults, backendReady } from "../lib/fixturesApi";
import { frName } from "../lib/teamNames";
import ResultPill, { RESULT } from "./ResultPill";

const HAITI_TEAM_ID = 2386;

// Libellés courts FR des compétitions.
const COMP_FR = {
  "World Cup - Qualification CONCACAF": "Éliminatoires CDM",
  "CONCACAF Nations League": "Ligue des Nations",
  "CONCACAF Gold Cup": "Gold Cup",
  Friendlies: "Amical",
  "World Cup": "Coupe du Monde",
};
const compLabel = (name) => COMP_FR[name] || name || "";

function frDate(iso) {
  if (!iso) return "";
  return new Intl.DateTimeFormat("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(iso));
}

// Dérive un résultat du point de vue d'Haïti.
function derive(f) {
  const home = f.home_id === HAITI_TEAM_ID;
  const gf = home ? f.goals_home : f.goals_away;
  const ga = home ? f.goals_away : f.goals_home;
  const opponent = home ? f.away_name : f.home_name;
  const oppLogo = home ? f.away_logo : f.home_logo;
  const venue = home ? "dom" : "ext";
  let res = "D";
  if (gf === ga) res = "N";
  else if (gf > ga) res = "V";
  return { id: f.fixture_id, kickoff: f.kickoff, league: f.league_name, gf, ga, opponent, oppLogo, venue, res };
}

export default function RecentForm() {
  const [rows, setRows] = useState(null);

  useEffect(() => {
    if (!backendReady) return;
    let alive = true;
    (async () => {
      const data = await getRecentResults();
      if (!alive) return;
      setRows(Array.isArray(data) ? data : []);
    })();
    return () => {
      alive = false;
    };
  }, []);

  // Backend absent ou pas encore chargé / aucun résultat : on masque la section.
  if (!backendReady) return null;
  if (!rows || rows.length === 0) return null;

  const derived = rows
    .map(derive)
    .filter((r) => Number.isFinite(r.gf) && Number.isFinite(r.ga));
  if (derived.length === 0) return null;

  // Bande de forme : 5 plus récents, le plus récent à droite.
  const strip = derived.slice(0, 5).reverse();
  // Liste : 8 plus récents (déjà du plus récent au plus ancien).
  const list = derived.slice(0, 8);

  return (
    <section>
      <div className="border-b border-line pb-3 mb-6">
        <h2 className="font-display text-2xl md:text-3xl">Forme récente</h2>
        <p className="text-muted text-sm mt-1">
          Les derniers matchs des Grenadiers.
        </p>
      </div>

      {/* Bande de forme — 5 derniers, le plus récent à droite */}
      <div className="flex items-center gap-3 mb-8">
        <span className="text-xs uppercase tracking-wider text-muted font-semibold">
          5 derniers
        </span>
        <div className="flex items-center gap-1.5">
          {strip.map((r) => (
            <ResultPill
              key={r.id}
              res={r.res}
              size="lg"
              title={`${RESULT[r.res].full} · Haïti ${r.gf}-${r.ga} ${frName(r.opponent)}`}
            />
          ))}
        </div>
      </div>

      {/* Liste des résultats récents */}
      <motion.ul
        className="bg-white border border-line rounded-lg divide-y divide-line overflow-hidden"
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.4 }}
      >
        {list.map((r) => (
          <li key={r.id} className="flex items-center gap-3 md:gap-4 px-4 md:px-5 py-3.5">
            {/* Pastille résultat */}
            <ResultPill res={r.res} size="sm" />

            <div className="min-w-0 flex-1">
              <p className="text-[11px] uppercase tracking-wider text-muted font-semibold truncate">
                {frDate(r.kickoff)}
                {r.league ? <span className="text-muted/70"> · {compLabel(r.league)}</span> : null}
                <span className="text-muted/70"> · {r.venue === "dom" ? "Dom." : "Ext."}</span>
              </p>
              <p className="font-display text-base md:text-lg text-ink flex items-center gap-2 mt-0.5 min-w-0">
                <span className="shrink-0">Haïti</span>
                <span className="tabular-nums shrink-0">
                  {r.gf}
                  <span className="text-muted mx-1">-</span>
                  {r.ga}
                </span>
                {r.oppLogo && (
                  <img
                    src={r.oppLogo}
                    alt=""
                    loading="lazy"
                    className="w-5 h-5 object-contain shrink-0"
                  />
                )}
                <span className="truncate">{frName(r.opponent)}</span>
              </p>
            </div>
          </li>
        ))}
      </motion.ul>
    </section>
  );
}
