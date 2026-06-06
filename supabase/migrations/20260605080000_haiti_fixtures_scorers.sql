-- ╔══════════════════════════════════════════════════════════════════╗
-- ║  HAITI FIXTURES — buteurs (scorers)                                ║
-- ║                                                                    ║
-- ║  Colonne jsonb alimentée par fixtures-sync à partir des événements ║
-- ║  de but d'API-Football. Format :                                   ║
-- ║    [{ player, team: 'haiti'|'opp', minute, extra, detail, assist }]║
-- ╚══════════════════════════════════════════════════════════════════╝

alter table public.haiti_fixtures add column if not exists scorers jsonb;

-- Vue publique : on ajoute « scorers » en fin de liste (create or replace
-- exige que les colonnes existantes gardent le même ordre).
create or replace view public.haiti_fixtures_public as
  select
    fixture_id, kickoff, status_short, status_long, elapsed,
    league_name, round, venue,
    home_id, home_name, home_logo,
    away_id, away_name, away_logo,
    goals_home, goals_away, updated_at, scorers
  from public.haiti_fixtures;

grant select on public.haiti_fixtures_public to anon, authenticated;
