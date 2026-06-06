-- Expose the per-player stats block (players) in the public view, for the
-- player-stats table + ratings on the match page.
create or replace view public.haiti_fixtures_public as
  select
    fixture_id, kickoff, status_short, status_long, elapsed,
    league_name, round, venue,
    home_id, home_name, home_logo,
    away_id, away_name, away_logo,
    goals_home, goals_away, updated_at, scorers,
    events, lineups, statistics, players
  from public.haiti_fixtures;

grant select on public.haiti_fixtures_public to anon, authenticated;
