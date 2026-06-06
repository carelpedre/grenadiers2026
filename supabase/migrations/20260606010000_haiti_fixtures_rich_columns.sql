-- ╔══════════════════════════════════════════════════════════════════╗
-- ║  HAITI FIXTURES — données riches en colonnes dédiées               ║
-- ║                                                                    ║
-- ║  events / lineups / statistics / players ne sont écrits QUE par le ║
-- ║  fetch par id (mode live + refetch). Le full sync (next/last)      ║
-- ║  ne les touche jamais → il ne peut plus les effacer.               ║
-- ╚══════════════════════════════════════════════════════════════════╝

alter table public.haiti_fixtures
  add column if not exists events     jsonb,
  add column if not exists lineups    jsonb,
  add column if not exists statistics jsonb,
  add column if not exists players    jsonb;

create or replace view public.haiti_fixtures_public as
  select
    fixture_id, kickoff, status_short, status_long, elapsed,
    league_name, round, venue,
    home_id, home_name, home_logo,
    away_id, away_name, away_logo,
    goals_home, goals_away, updated_at, scorers,
    events, lineups, statistics
  from public.haiti_fixtures;

grant select on public.haiti_fixtures_public to anon, authenticated;
