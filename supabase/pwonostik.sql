-- ╔══════════════════════════════════════════════════════════════════╗
-- ║  PWONOSTIK — classement (Supabase / Postgres)                     ║
-- ║                                                                    ║
-- ║  À exécuter une fois dans l'éditeur SQL de Supabase, dans le      ║
-- ║  projet de votre choix. Réexécutable sans danger.                 ║
-- ║                                                                    ║
-- ║  Modèle de sécurité :                                             ║
-- ║   • La table de base est verrouillée (RLS activé, aucun accès     ║
-- ║     direct pour le rôle « anon »). Les e-mails ne sont jamais     ║
-- ║     exposés publiquement.                                         ║
-- ║   • Les écritures passent UNIQUEMENT par la fonction validée      ║
-- ║     submit_pwonostik() (noms/e-mails/codes nettoyés, points       ║
-- ║     bornés 0–9).                                                  ║
-- ║   • Les lectures passent par la vue pwonostik_leaderboard         ║
-- ║     (sans e-mail).                                                 ║
-- ╚══════════════════════════════════════════════════════════════════╝

create extension if not exists "pgcrypto";

-- ── Table ────────────────────────────────────────────────────────────
create table if not exists public.pwonostik_entries (
  id          uuid primary key default gen_random_uuid(),
  player_id   uuid not null unique,
  name        text not null,
  email       text,
  picks       jsonb not null,
  points      int  not null default 0 check (points >= 0 and points <= 9),
  league_code text,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

create index if not exists pwonostik_points_idx on public.pwonostik_entries (points desc);
create index if not exists pwonostik_league_idx on public.pwonostik_entries (league_code);

-- ── Verrouillage de la table de base ────────────────────────────────
alter table public.pwonostik_entries enable row level security;
revoke all on public.pwonostik_entries from anon, authenticated;

-- ── Vue publique (sans e-mail) ──────────────────────────────────────
create or replace view public.pwonostik_leaderboard as
  select name, picks, points, league_code, updated_at
  from public.pwonostik_entries;

grant select on public.pwonostik_leaderboard to anon, authenticated;

-- ── Écriture validée (seul chemin public d'écriture) ────────────────
create or replace function public.submit_pwonostik(
  p_player_id uuid,
  p_name      text,
  p_email     text,
  p_picks     jsonb,
  p_points    int,
  p_league    text
) returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  v_name   text;
  v_email  text;
  v_league text;
  v_points int;
begin
  -- nom : non vide, sans caractères de contrôle, max 24
  v_name := nullif(btrim(coalesce(p_name, '')), '');
  if v_name is null then v_name := 'Anonyme'; end if;
  v_name := left(regexp_replace(v_name, '[[:cntrl:]]', '', 'g'), 24);

  -- e-mail : forme basique, sinon null
  v_email := nullif(btrim(lower(coalesce(p_email, ''))), '');
  if v_email is not null and v_email !~ '^[^@[:space:]]+@[^@[:space:]]+\.[^@[:space:]]+$' then
    v_email := null;
  end if;

  -- code de ligue : majuscules, alphanum + tirets, max 24
  v_league := nullif(btrim(upper(coalesce(p_league, ''))), '');
  if v_league is not null then
    v_league := nullif(left(regexp_replace(v_league, '[^A-Z0-9\-]', '', 'g'), 24), '');
  end if;

  -- points bornés (3 matchs × 3 pts max)
  v_points := greatest(0, least(9, coalesce(p_points, 0)));

  insert into public.pwonostik_entries as e
    (player_id, name, email, picks, points, league_code, updated_at)
  values
    (p_player_id, v_name, v_email, p_picks, v_points, v_league, now())
  on conflict (player_id) do update
    set name        = excluded.name,
        email       = coalesce(excluded.email, e.email),
        picks       = excluded.picks,
        points      = excluded.points,
        league_code = excluded.league_code,
        updated_at  = now();
end;
$$;

grant execute on function public.submit_pwonostik(uuid, text, text, jsonb, int, text) to anon, authenticated;

-- ── Pour exporter les e-mails vers Brevo (à exécuter au besoin) ─────
--   select distinct email, name from public.pwonostik_entries
--   where email is not null order by name;
