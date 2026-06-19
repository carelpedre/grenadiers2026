-- ╔══════════════════════════════════════════════════════════════════╗
-- ║  PHOTOS DES SUPPORTERS · fan_photos (Supabase / Postgres)          ║
-- ║                                                                    ║
-- ║  Première surface AUTHENTIFIÉE du site. Contrairement au mur des   ║
-- ║  supporters (table verrouillée + écriture par fonction edge),      ║
-- ║  fan_photos s'appuie sur des politiques RLS basées sur auth.uid(). ║
-- ║                                                                    ║
-- ║  Modèle d'accès :                                                  ║
-- ║   • Lecture publique : vue fan_photos_public (approuvées only),    ║
-- ║     n'expose jamais user_id ni le statut. anon lit la vue,         ║
-- ║     comme fan_messages_public.                                    ║
-- ║   • Connecté : INSERT / SELECT / DELETE de SES lignes uniquement   ║
-- ║     (auth.uid() = user_id). Pas d'UPDATE : la modération           ║
-- ║     (pending -> approved/rejected) reste service role, comme       ║
-- ║     moderate-fan-message.                                         ║
-- ║   • Plafond strict de 3 photos par utilisateur : trigger BEFORE    ║
-- ║     INSERT (plus fiable qu'un WITH CHECK sur sous-requête).        ║
-- ║   • Stockage : bucket fan-photos, lecture publique, dépôt          ║
-- ║     uniquement dans le dossier {user_id}/ de l'utilisateur.        ║
-- ╚══════════════════════════════════════════════════════════════════╝

-- ── Table de base ───────────────────────────────────────────────────
create table if not exists public.fan_photos (
  id           uuid primary key default gen_random_uuid(),
  user_id      uuid not null references auth.users (id) on delete cascade,
  storage_path text not null,
  -- Matchs de groupe + phases finales (déjà prêtes, inutilisées pour l'instant,
  -- pour éviter une migration en plein tournoi si Haïti se qualifie).
  match        text not null check (match in (
                 'scotland', 'brazil', 'morocco',
                 'round_of_32', 'round_of_16', 'quarter_final',
                 'semi_final', 'third_place', 'final'
               )),
  context      text not null check (context in ('stadium', 'watch_party', 'home')),
  location     text check (location is null or char_length(location) <= 120),
  caption      text check (caption is null or char_length(caption) <= 280),
  status       text not null default 'pending'
                 check (status in ('pending', 'approved', 'rejected')),
  created_at   timestamptz not null default now()
);

create index if not exists fan_photos_user_idx   on public.fan_photos (user_id);
create index if not exists fan_photos_status_idx  on public.fan_photos (status, created_at desc);

-- ── RLS : accès basé sur auth.uid() ────────────────────────────────
alter table public.fan_photos enable row level security;

-- anon n'a aucun accès direct à la table de base : il lit la vue publique.
-- authenticated reçoit les privilèges, filtrés ensuite par les politiques.
revoke all on public.fan_photos from anon, authenticated;
grant select, insert, delete on public.fan_photos to authenticated;

-- SELECT : un utilisateur voit SES lignes, quel que soit le statut
-- (pour le compteur « x sur 3 » et l'affichage de ses photos en attente).
drop policy if exists "fan_photos owner select" on public.fan_photos;
create policy "fan_photos owner select"
  on public.fan_photos for select
  to authenticated
  using (auth.uid() = user_id);

-- INSERT : uniquement pour soi-même.
drop policy if exists "fan_photos owner insert" on public.fan_photos;
create policy "fan_photos owner insert"
  on public.fan_photos for insert
  to authenticated
  with check (auth.uid() = user_id);

-- DELETE : uniquement ses propres lignes.
drop policy if exists "fan_photos owner delete" on public.fan_photos;
create policy "fan_photos owner delete"
  on public.fan_photos for delete
  to authenticated
  using (auth.uid() = user_id);

-- Pas de politique UPDATE : la modération passe par le service role,
-- qui contourne la RLS (cf. moderate-fan-message / AdminMur).

-- ── Plafond de 3 photos par utilisateur (trigger BEFORE INSERT) ─────
create or replace function public.fan_photos_enforce_cap()
  returns trigger
  language plpgsql
  security definer
  set search_path = public, pg_temp
as $$
begin
  -- Verrou par utilisateur, maintenu jusqu'à la fin de la transaction :
  -- sérialise les insertions concurrentes, donc plafond strict (hard cap).
  perform pg_advisory_xact_lock(hashtext(new.user_id::text));
  if (select count(*) from public.fan_photos where user_id = new.user_id) >= 3 then
    raise exception 'Limite de 3 photos atteinte pour cet utilisateur.'
      using errcode = 'check_violation';
  end if;
  return new;
end;
$$;

drop trigger if exists fan_photos_cap on public.fan_photos;
create trigger fan_photos_cap
  before insert on public.fan_photos
  for each row execute function public.fan_photos_enforce_cap();

-- ── Vue publique (photos approuvées uniquement) ─────────────────────
-- N'expose jamais user_id ni status. storage_path sert à construire
-- l'URL publique de l'image (bucket fan-photos en lecture publique) :
--   {SUPABASE_URL}/storage/v1/object/public/fan-photos/{storage_path}
create or replace view public.fan_photos_public as
  select
    id,
    storage_path,
    match,
    context,
    location,
    caption,
    created_at
  from public.fan_photos
  where status = 'approved';

grant select on public.fan_photos_public to anon, authenticated;

-- ── Stockage : bucket fan-photos ───────────────────────────────────
-- file_size_limit + allowed_mime_types : garde-fous (les images sont déjà
-- compressées côté client, long côté ~1600px / qualité ~0.8).
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
  values (
    'fan-photos',
    'fan-photos',
    true,
    5242880, -- 5 Mo
    array['image/jpeg', 'image/png', 'image/webp']
  )
  on conflict (id) do nothing;

-- Lecture publique des objets du bucket.
drop policy if exists "fan_photos storage public read" on storage.objects;
create policy "fan_photos storage public read"
  on storage.objects for select
  to anon, authenticated
  using (bucket_id = 'fan-photos');

-- Note de conception : le chemin public de l'objet contient l'auth uid
-- ({user_id}/...). Accepté pour le lancement (risque faible). La vue publique
-- fan_photos_public, elle, n'expose jamais user_id.
-- Dépôt : connecté uniquement, et seulement dans son dossier {user_id}/.
drop policy if exists "fan_photos storage owner insert" on storage.objects;
create policy "fan_photos storage owner insert"
  on storage.objects for insert
  to authenticated
  with check (
    bucket_id = 'fan-photos'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

-- Suppression : connecté uniquement, dans son dossier {user_id}/ (pour que
-- supprimer une ligne supprime aussi le fichier image correspondant).
drop policy if exists "fan_photos storage owner delete" on storage.objects;
create policy "fan_photos storage owner delete"
  on storage.objects for delete
  to authenticated
  using (
    bucket_id = 'fan-photos'
    and (storage.foldername(name))[1] = auth.uid()::text
  );
