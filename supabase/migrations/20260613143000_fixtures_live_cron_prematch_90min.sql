-- ╔══════════════════════════════════════════════════════════════════╗
-- ║  FIXTURES-LIVE crons — fenêtre d'avant-match élargie à 90 min       ║
-- ║                                                                    ║
-- ║  Les compositions officielles sortent ~1 h avant le coup d'envoi.  ║
-- ║  Les crons « live » (haiti + WC) ne s'ouvraient qu'à 5 / 15 min    ║
-- ║  avant le coup d'envoi : la compo n'apparaissait donc qu'au tout   ║
-- ║  dernier moment. On ouvre désormais la fenêtre 90 min avant, pour  ║
-- ║  que la compo (et le reste) se synchronise dès sa publication.     ║
-- ║  Le comportement en direct et post-FT reste inchangé.              ║
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
      status_short not in ('FT','AET','PEN','PST','CANC','ABD','AWD','WO')
      and kickoff between now() - interval '3 hours' and now() + interval '90 minutes'
    ) or (
      status_short in ('FT','AET','PEN')
      and kickoff between now() - interval '2 hours 15 minutes' and now()
    )
  );
  $cron$
);

do $$
begin
  if exists (select 1 from cron.job where jobname = 'wc-fixtures-live-every-min') then
    perform cron.unschedule('wc-fixtures-live-every-min');
  end if;
end $$;

select cron.schedule(
  'wc-fixtures-live-every-min',
  '* * * * *',
  $cron$
  select case when exists (
    select 1 from public.wc_fixtures
    where kickoff between now() - interval '3 hours' and now() + interval '90 minutes'
      and status_short not in ('FT','AET','PEN','PST','CANC','ABD','AWD','WO')
  ) then net.http_post(
    url := 'https://dpstwvmjccolxglrvwbj.supabase.co/functions/v1/wc-fixtures-sync',
    headers := jsonb_build_object('Content-Type','application/json','Authorization','Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRwc3R3dm1qY2NvbHhnbHJ2d2JqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAzNDQ2MzMsImV4cCI6MjA5NTkyMDYzM30.QzvpHX_7OVq7nRk8_TUAJlvZm24M8WkHdW93uEbVWZY'),
    body := '{"mode":"live"}'::jsonb,
    timeout_milliseconds := 20000
  ) end;
  $cron$
);
