-- ╔══════════════════════════════════════════════════════════════════╗
-- ║  HAITI_PLAYER_STATS — club courant + stats de saison (API-Football) ║
-- ║                                                                    ║
-- ║  Alimenté par fixtures-sync (mode "players") : pour chaque joueur  ║
-- ║  de la sélection, on récupère /players?id=&season= → club actuel   ║
-- ║  (nom + logo) et statistiques de saison (matchs, buts, passes,    ║
-- ║  note moyenne). Les sélections internationales (caps) restent      ║
-- ║  manuelles dans squad.js — l'API ne les expose pas.               ║
-- ║                                                                    ║
-- ║  Table verrouillée (RLS) ; lecture publique via la vue.           ║
-- ╚══════════════════════════════════════════════════════════════════╝

create table if not exists public.haiti_player_stats (
  player_id     bigint primary key,   -- API-Football player id (= squad.js apiId)
  player_name   text,
  photo         text,                 -- headshot CDN url
  club_id       bigint,
  club_name     text,
  club_logo     text,
  league_name   text,
  season        int,                  -- saison source (ex. 2025 = 2025-26)
  appearances   int,
  minutes       int,
  goals         int,
  assists       int,
  rating        numeric,              -- note moyenne de saison
  raw           jsonb,                -- réponse /players brute
  updated_at    timestamptz not null default now()
);

alter table public.haiti_player_stats enable row level security;
revoke all on public.haiti_player_stats from anon, authenticated;

create or replace view public.haiti_player_stats_public as
  select
    player_id, player_name, photo,
    club_id, club_name, club_logo, league_name,
    season, appearances, minutes, goals, assists, rating,
    updated_at
  from public.haiti_player_stats;

grant select on public.haiti_player_stats_public to anon, authenticated;
