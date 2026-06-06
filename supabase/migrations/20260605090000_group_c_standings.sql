-- ╔══════════════════════════════════════════════════════════════════╗
-- ║  GROUP C STANDINGS — classement (source : API-Football)            ║
-- ║                                                                    ║
-- ║  Alimenté par fixtures-sync (standings du Mondial, groupe C).      ║
-- ║  Table verrouillée (RLS) ; lecture publique via la vue.            ║
-- ╚══════════════════════════════════════════════════════════════════╝

create table if not exists public.group_c_standings (
  team_id        bigint primary key,
  rank           int,
  team_name      text,
  team_logo      text,
  played         int,
  win            int,
  draw           int,
  lose           int,
  goals_for      int,
  goals_against  int,
  goals_diff     int,
  points         int,
  raw            jsonb,
  updated_at     timestamptz not null default now()
);

alter table public.group_c_standings enable row level security;
revoke all on public.group_c_standings from anon, authenticated;

create or replace view public.group_c_standings_public as
  select
    team_id, rank, team_name, team_logo,
    played, win, draw, lose,
    goals_for, goals_against, goals_diff, points, updated_at
  from public.group_c_standings;

grant select on public.group_c_standings_public to anon, authenticated;
