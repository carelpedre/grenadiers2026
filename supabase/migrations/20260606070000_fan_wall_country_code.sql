-- ╔══════════════════════════════════════════════════════════════════╗
-- ║  MUR DES SUPPORTERS — code pays ISO 3166-1 (pour la future carte)  ║
-- ║                                                                    ║
-- ║  Ajoute location_country_code (alpha-2) et l'expose dans la vue    ║
-- ║  publique. Le pays devient requis côté formulaire + fonction.     ║
-- ╚══════════════════════════════════════════════════════════════════╝

alter table public.fan_messages
  add column if not exists location_country_code text;

-- La vue doit être recréée (insertion d'une colonne au milieu).
drop view if exists public.fan_messages_public;

create view public.fan_messages_public as
  select
    id,
    case when is_anonymous then 'Anonyme' else name end as display_name,
    location_city,
    location_country,
    location_country_code,
    message,
    approved_at
  from public.fan_messages
  where status = 'approved';

grant select on public.fan_messages_public to anon, authenticated;
