import { frName } from "../lib/teamNames";

// Classement du Groupe C (données live, actualisées automatiquement).
// Réutilisé par /matches (onglet Classement) et /live/:slug (aperçu avant-match).
//
// Props :
//   standings   — lignes du classement (vue group_c_standings_public)
//   title       — titre affiché (défaut « Classement — Groupe C »)
//   subtitle    — sous-titre (défaut mention de mise à jour auto)
//   footnote    — afficher la légende qualification (défaut true)
export default function GroupCTable({
  standings,
  title = "Classement — Groupe C",
  subtitle = "Mis à jour automatiquement pendant le Mondial.",
  footnote = true,
}) {
  if (!standings || standings.length === 0) {
    return (
      <div className="bg-white border border-line rounded-lg p-8 text-center">
        <p className="text-ink/80">
          Le classement du Groupe C s'affichera ici. Il s'actualise automatiquement pendant le tournoi.
        </p>
      </div>
    );
  }
  return (
    <section>
      {(title || subtitle) && (
        <div className="border-b border-line pb-3 mb-6">
          {title && <h2 className="font-display text-2xl md:text-3xl">{title}</h2>}
          {subtitle && <p className="text-muted text-sm mt-1">{subtitle}</p>}
        </div>
      )}
      <div className="overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="text-muted text-[10px] md:text-xs uppercase tracking-wider border-b border-line">
              <th className="text-center py-2 w-8 font-semibold">#</th>
              <th className="text-left py-2 px-2 font-semibold">Équipe</th>
              <th className="text-center py-2 px-1.5 font-semibold" title="Joués">J</th>
              <th className="text-center py-2 px-1.5 font-semibold" title="Gagnés">G</th>
              <th className="text-center py-2 px-1.5 font-semibold" title="Nuls">N</th>
              <th className="text-center py-2 px-1.5 font-semibold" title="Perdus">P</th>
              <th className="text-center py-2 px-1.5 font-semibold hidden sm:table-cell" title="Buts pour">BP</th>
              <th className="text-center py-2 px-1.5 font-semibold hidden sm:table-cell" title="Buts contre">BC</th>
              <th className="text-center py-2 px-1.5 font-semibold" title="Différence">Diff</th>
              <th className="text-center py-2 pl-1.5 font-semibold">Pts</th>
            </tr>
          </thead>
          <tbody>
            {standings.map((r) => {
              const isHaiti = r.team_id === 2386;
              const qualifies = r.rank <= 2;
              return (
                <tr
                  key={r.team_id}
                  className={`border-b border-line ${isHaiti ? "bg-haiti-blue/5 font-semibold" : ""}`}
                >
                  <td className="text-center py-2.5">
                    <span
                      className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-xs tabular-nums ${
                        qualifies ? "bg-haiti-blue text-bg" : "text-ink"
                      }`}
                    >
                      {r.rank}
                    </span>
                  </td>
                  <td className="py-2.5 px-2">
                    <span className="flex items-center gap-2 min-w-0">
                      {r.team_logo && (
                        <img
                          src={r.team_logo}
                          alt=""
                          loading="lazy"
                          className="w-5 h-5 md:w-6 md:h-6 object-contain flex-shrink-0"
                        />
                      )}
                      <span className="truncate">{frName(r.team_name)}</span>
                    </span>
                  </td>
                  <td className="text-center px-1.5 tabular-nums">{r.played}</td>
                  <td className="text-center px-1.5 tabular-nums">{r.win}</td>
                  <td className="text-center px-1.5 tabular-nums">{r.draw}</td>
                  <td className="text-center px-1.5 tabular-nums">{r.lose}</td>
                  <td className="text-center px-1.5 tabular-nums hidden sm:table-cell">{r.goals_for}</td>
                  <td className="text-center px-1.5 tabular-nums hidden sm:table-cell">{r.goals_against}</td>
                  <td className="text-center px-1.5 tabular-nums">
                    {r.goals_diff > 0 ? `+${r.goals_diff}` : r.goals_diff}
                  </td>
                  <td className="text-center pl-1.5 font-display tabular-nums">{r.points}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {footnote && (
        <p className="text-xs text-muted mt-4 leading-relaxed">
          <span className="inline-block w-2.5 h-2.5 rounded-full bg-haiti-blue align-middle mr-1.5" />
          Les deux premières équipes accèdent aux 16es de finale, avec les huit meilleures
          troisièmes des douze groupes. Classement actualisé automatiquement.
        </p>
      )}
    </section>
  );
}
