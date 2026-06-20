import { teamName } from "../lib/teamNames";
import MatchSectionHead from "./MatchSectionHead";
import { useT } from "../lib/i18n";

// Classement du Groupe C (données live, actualisées automatiquement).
// Réutilisé par /matches (onglet Classement) et /live/:slug (aperçu avant-match).
//
// Props :
//   standings   · lignes du classement (vue group_c_standings_public)
//   title       · titre affiché (défaut « Classement · Groupe C »)
//   subtitle    · sous-titre (défaut mention de mise à jour auto)
//   footnote    · afficher la légende qualification (défaut true)
export default function GroupCTable({
  standings,
  title,
  subtitle,
  footnote = true,
}) {
  const { t, lang } = useT();
  const heading = title !== undefined ? title : t("matches.tabStandings");
  const sub = subtitle !== undefined ? subtitle : t("matches.standingsAuto");
  if (!standings || standings.length === 0) {
    return (
      <section>
        {heading && <MatchSectionHead sub={sub}>{heading}</MatchSectionHead>}
        <div className="rounded-xl border border-line bg-white p-8 text-center">
          <p className="font-cond text-xs uppercase tracking-[0.22em] text-gold font-semibold mb-2">
            {t("matches.statusUpcoming")}
          </p>
          <p className="text-ink/70 text-sm">
            {t("matches.standingsEmptyBody")}
          </p>
        </div>
      </section>
    );
  }
  const th = "text-center py-3 px-1.5 font-semibold";
  return (
    <section>
      {(heading || sub) && <MatchSectionHead sub={sub}>{heading}</MatchSectionHead>}
      <div className="overflow-x-auto rounded-xl border border-line bg-white">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="font-cond text-muted text-[11px] md:text-xs uppercase tracking-[0.1em] border-b border-line">
              <th className="text-center py-3 w-9 font-semibold">#</th>
              <th className="text-left py-3 px-2 font-semibold">{t("matches.std.team")}</th>
              <th className={th} title={t("matches.std.playedFull")}>{t("matches.std.played")}</th>
              <th className={th} title={t("matches.std.wonFull")}>{t("matches.std.won")}</th>
              <th className={th} title={t("matches.std.drawnFull")}>{t("matches.std.drawn")}</th>
              <th className={th} title={t("matches.std.lostFull")}>{t("matches.std.lost")}</th>
              <th className={`${th} hidden sm:table-cell`} title={t("matches.std.gfFull")}>{t("matches.std.gf")}</th>
              <th className={`${th} hidden sm:table-cell`} title={t("matches.std.gaFull")}>{t("matches.std.ga")}</th>
              <th className={th} title={t("matches.std.gdFull")}>{t("matches.std.gd")}</th>
              <th className="text-center py-3 pl-1.5 pr-3 font-semibold">{t("matches.std.pts")}</th>
            </tr>
          </thead>
          <tbody>
            {standings.map((r) => {
              const isHaiti = r.team_id === 2386;
              const qualifies = r.rank <= 2;
              return (
                <tr
                  key={r.team_id}
                  className={`border-b border-line last:border-0 ${isHaiti ? "bg-haiti-blue/[0.06]" : ""}`}
                >
                  <td className="text-center py-3">
                    <span
                      className={`font-cond inline-flex items-center justify-center w-6 h-6 rounded-md text-xs font-bold tabular-nums ${
                        qualifies ? "bg-haiti-blue text-bg" : "text-ink/70"
                      }`}
                    >
                      {r.rank}
                    </span>
                  </td>
                  <td className="py-3 px-2">
                    <span className="flex items-center gap-2 min-w-0">
                      {r.team_logo && (
                        <img
                          src={r.team_logo}
                          alt=""
                          loading="lazy"
                          className="w-5 h-5 md:w-6 md:h-6 object-contain flex-shrink-0"
                        />
                      )}
                      <span
                        className={`font-cond uppercase tracking-tight truncate ${
                          isHaiti ? "font-bold text-ink" : "font-semibold text-ink/90"
                        }`}
                      >
                        {teamName(r.team_name, lang)}
                      </span>
                    </span>
                  </td>
                  <td className="text-center px-1.5 tabular-nums text-ink/80">{r.played}</td>
                  <td className="text-center px-1.5 tabular-nums text-ink/80">{r.win}</td>
                  <td className="text-center px-1.5 tabular-nums text-ink/80">{r.draw}</td>
                  <td className="text-center px-1.5 tabular-nums text-ink/80">{r.lose}</td>
                  <td className="text-center px-1.5 tabular-nums text-ink/80 hidden sm:table-cell">{r.goals_for}</td>
                  <td className="text-center px-1.5 tabular-nums text-ink/80 hidden sm:table-cell">{r.goals_against}</td>
                  <td className="text-center px-1.5 tabular-nums text-ink/80">
                    {r.goals_diff > 0 ? `+${r.goals_diff}` : r.goals_diff}
                  </td>
                  <td className="text-center pl-1.5 pr-3">
                    <span className="font-block text-base md:text-lg text-ink tabular-nums">{r.points}</span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {footnote && (
        <p className="text-xs text-muted mt-4 leading-relaxed">
          <span className="inline-block w-2.5 h-2.5 rounded-sm bg-haiti-blue align-middle mr-1.5" />
          {t("matches.standingsFootnote")}
        </p>
      )}
    </section>
  );
}
