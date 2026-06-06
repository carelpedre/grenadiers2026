-- ╔══════════════════════════════════════════════════════════════════╗
-- ║  FIXTURES-LIVE cron — inclut les matchs récemment terminés         ║
-- ║                                                                    ║
-- ║  Le cron 1 min déclenche désormais aussi ~15 min après le coup de  ║
-- ║  sifflet final (FT/AET/PEN), pour que le fetch par id capture les  ║
-- ║  événements/compositions/statistiques DÉFINITIFS, puis s'arrête.   ║
-- ╚══════════════════════════════════════════════════════════════════╝

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
    where (
      -- imminent or in play
      status_short not in ('FT','AET','PEN','PST','CANC','ABD','AWD','WO')
      and kickoff between now() - interval '3 hours' and now() + interval '5 minutes'
    ) or (
      -- recently finished: keep polling ~15 min past the approximate final whistle
      status_short in ('FT','AET','PEN')
      and kickoff between now() - interval '2 hours 15 minutes' and now()
    )
  );
  $cron$
);
