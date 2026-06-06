-- ╔══════════════════════════════════════════════════════════════════╗
-- ║  FIXTURES-SYNC — scoring en direct (cron 1 min, AUTO-GATÉ)         ║
-- ║                                                                    ║
-- ║  S'exécute chaque minute MAIS n'appelle la fonction QUE s'il       ║
-- ║  existe un match « dans la fenêtre » (coup d'envoi imminent →      ║
-- ║  jusqu'au statut terminal). Hors match : 0 appel, coût nul.        ║
-- ║                                                                    ║
-- ║  Le cron complet 2 h (fixtures-sync-every-2h) reste inchangé.      ║
-- ╚══════════════════════════════════════════════════════════════════╝

create extension if not exists pg_cron;
create extension if not exists pg_net;

do $$
begin
  if exists (select 1 from cron.job where jobname = 'fixtures-live-every-min') then
    perform cron.unschedule('fixtures-live-every-min');
  end if;
end $$;

select cron.schedule(
  'fixtures-live-every-min',
  '* * * * *',
  $cron$
  select net.http_post(
    url     := 'https://dpstwvmjccolxglrvwbj.supabase.co/functions/v1/fixtures-sync',
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRwc3R3dm1qY2NvbHhnbHJ2d2JqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAzNDQ2MzMsImV4cCI6MjA5NTkyMDYzM30.QzvpHX_7OVq7nRk8_TUAJlvZm24M8WkHdW93uEbVWZY'
    ),
    body    := '{"mode":"live"}'::jsonb
  )
  where exists (
    select 1 from public.haiti_fixtures
    where kickoff between now() - interval '3 hours' and now() + interval '5 minutes'
      and status_short not in ('FT','AET','PEN','PST','CANC','ABD','AWD','WO')
  );
  $cron$
);
