-- ╔══════════════════════════════════════════════════════════════════╗
-- ║  PHOTOS DES SUPPORTERS · plafond PAR MATCH (correction)            ║
-- ║                                                                    ║
-- ║  Le plafond passe de 3 photos par utilisateur (global) à 3 photos  ║
-- ║  par utilisateur ET PAR MATCH. Un supporter peut donc avoir        ║
-- ║  jusqu'à 3 photos pour chaque rencontre.                          ║
-- ║                                                                    ║
-- ║  On remplace seulement le corps de la fonction du trigger BEFORE   ║
-- ║  INSERT (le trigger fan_photos_cap reste en place). Le verrou      ║
-- ║  consultatif est désormais par (user_id, match) pour garder un     ║
-- ║  plafond strict sous concurrence.                                 ║
-- ╚══════════════════════════════════════════════════════════════════╝

-- Index dédié au comptage par (utilisateur, match).
create index if not exists fan_photos_user_match_idx
  on public.fan_photos (user_id, match);

create or replace function public.fan_photos_enforce_cap()
  returns trigger
  language plpgsql
  security definer
  set search_path = public, pg_temp
as $$
begin
  -- Verrou par (utilisateur, match), maintenu jusqu'à la fin de la
  -- transaction : sérialise les insertions concurrentes pour ce match.
  perform pg_advisory_xact_lock(hashtext(new.user_id::text || ':' || new.match));
  if (
    select count(*)
    from public.fan_photos
    where user_id = new.user_id and match = new.match
  ) >= 3 then
    raise exception 'Limite de 3 photos par match atteinte pour cet utilisateur.'
      using errcode = 'check_violation';
  end if;
  return new;
end;
$$;
