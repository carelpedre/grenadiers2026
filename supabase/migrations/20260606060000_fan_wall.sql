-- ╔══════════════════════════════════════════════════════════════════╗
-- ║  MUR DES SUPPORTERS — messages des fans (Supabase / Postgres)      ║
-- ║                                                                    ║
-- ║  Modèle de sécurité (identique à haiti_fixtures / pwonostik) :     ║
-- ║   • Table de base verrouillée (RLS activé, AUCUN accès direct      ║
-- ║     pour « anon »). Le hash IP et le statut ne sont jamais         ║
-- ║     exposés ; les messages en attente/rejetés non plus.           ║
-- ║   • Lecture publique via la vue fan_messages_public (uniquement    ║
-- ║     les messages approuvés, nom masqué si anonyme).               ║
-- ║   • Écriture UNIQUEMENT via la fonction edge submit-fan-message    ║
-- ║     (service role) : Turnstile + anti-spam + limite de débit.     ║
-- ╚══════════════════════════════════════════════════════════════════╝

create extension if not exists "pgcrypto";

-- ── Table de base (verrouillée) ─────────────────────────────────────
create table if not exists public.fan_messages (
  id               uuid primary key default gen_random_uuid(),
  name             text,
  is_anonymous     boolean not null default false,
  location_city    text,
  location_country text,
  message          text not null check (char_length(message) between 1 and 500),
  status           text not null default 'pending' check (status in ('pending','approved','rejected')),
  submitter_hash   text,                         -- IP hachée, anti-spam UNIQUEMENT (jamais affichée)
  created_at       timestamptz not null default now(),
  approved_at      timestamptz
);

create index if not exists fan_messages_status_idx on public.fan_messages (status, approved_at desc);
create index if not exists fan_messages_hash_idx   on public.fan_messages (submitter_hash, created_at desc);

alter table public.fan_messages enable row level security;
revoke all on public.fan_messages from anon, authenticated;

-- ── Vue publique (messages approuvés uniquement) ────────────────────
-- N'expose jamais : name si anonyme, status, submitter_hash, lignes
-- pending/rejected.
create or replace view public.fan_messages_public as
  select
    id,
    case when is_anonymous then 'Anonyme' else name end as display_name,
    location_city,
    location_country,
    message,
    approved_at
  from public.fan_messages
  where status = 'approved';

grant select on public.fan_messages_public to anon, authenticated;

-- ── Réglages du site (drapeau d'ouverture du mur) ───────────────────
create table if not exists public.site_settings (
  key        text primary key,
  value      text,
  updated_at timestamptz not null default now()
);

insert into public.site_settings (key, value)
  values ('fan_wall_open', 'true')
  on conflict (key) do nothing;

alter table public.site_settings enable row level security;
revoke all on public.site_settings from anon, authenticated;

-- Lecture publique des réglages via une vue (clé/valeur seulement).
create or replace view public.site_settings_public as
  select key, value from public.site_settings;

grant select on public.site_settings_public to anon, authenticated;
