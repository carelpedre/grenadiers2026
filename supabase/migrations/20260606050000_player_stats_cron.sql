-- ╔══════════════════════════════════════════════════════════════════╗
-- ║  PLAYER-STATS SYNC — planification (pg_cron + pg_net)              ║
-- ║                                                                    ║
-- ║  Invoque fixtures-sync en mode "players" une fois par jour.        ║
-- ║  Un run = 1 appel /players/squads + ~26 appels /players → ~27      ║
-- ║  requêtes API-Football, anodin sur le plan Pro (7500/jour).        ║
-- ║  Les profils/clubs/stats changent lentement : quotidien suffit.    ║
-- ║                                                                    ║
-- ║  AUTH : clé « anon » publique (cf. fixtures-sync-every-2h).        ║
-- ╚══════════════════════════════════════════════════════════════════╝

create extension if not exists pg_cron;
create extension if not exists pg_net;

do $$
begin
  if exists (select 1 from cron.job where jobname = 'player-stats-sync-daily') then
    perform cron.unschedule('player-stats-sync-daily');
  end if;
end $$;

select cron.schedule(
  'player-stats-sync-daily',
  '20 6 * * *',  -- ← CADENCE : tous les jours à 06h20 UTC
  $cron$
  select net.http_post(
    url     := 'https://dpstwvmjccolxglrvwbj.supabase.co/functions/v1/fixtures-sync',
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRwc3R3dm1qY2NvbHhnbHJ2d2JqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAzNDQ2MzMsImV4cCI6MjA5NTkyMDYzM30.QzvpHX_7OVq7nRk8_TUAJlvZm24M8WkHdW93uEbVWZY'
    ),
    body    := '{"mode":"players"}'::jsonb
  );
  $cron$
);
