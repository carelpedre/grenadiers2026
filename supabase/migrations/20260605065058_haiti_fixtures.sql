-- ╔══════════════════════════════════════════════════════════════════╗
-- ║  HAITI FIXTURES — matchs & résultats (source : API-Football)       ║
-- ║                                                                    ║
-- ║  Table alimentée UNIQUEMENT par la fonction edge `fixtures-sync`   ║
-- ║  (clé service_role, qui contourne la RLS). Le navigateur n'appelle ║
-- ║  jamais API-Football : il lit la vue publique ci-dessous.          ║
-- ║                                                                    ║
-- ║  Modèle de sécurité (calqué sur pwonostik) :                      ║
-- ║   • Table de base verrouillée (RLS activé, aucun accès « anon »).  ║
-- ║   • Lectures publiques via la vue haiti_fixtures_public.           ║
-- ╚══════════════════════════════════════════════════════════════════╝

-- ── Table ────────────────────────────────────────────────────────────
create table if not exists public.haiti_fixtures (
  fixture_id   bigint primary key,
  kickoff      timestamptz,
  status_short text,
  status_long  text,
  elapsed      int,
  league_name  text,
  round        text,
  venue        text,
  home_id      bigint,
  home_name    text,
  home_logo    text,
  away_id      bigint,
  away_name    text,
  away_logo    text,
  goals_home   int,
  goals_away   int,
  raw          jsonb,
  updated_at   timestamptz not null default now()
);

create index if not exists haiti_fixtures_kickoff_idx on public.haiti_fixtures (kickoff);
create index if not exists haiti_fixtures_status_idx  on public.haiti_fixtures (status_short);

-- ── Verrouillage de la table de base ────────────────────────────────
alter table public.haiti_fixtures enable row level security;
revoke all on public.haiti_fixtures from anon, authenticated;

-- ── Vue publique (colonnes d'affichage, sans le jsonb brut) ─────────
create or replace view public.haiti_fixtures_public as
  select
    fixture_id, kickoff, status_short, status_long, elapsed,
    league_name, round, venue,
    home_id, home_name, home_logo,
    away_id, away_name, away_logo,
    goals_home, goals_away, updated_at
  from public.haiti_fixtures;

grant select on public.haiti_fixtures_public to anon, authenticated;
