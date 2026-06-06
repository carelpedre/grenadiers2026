-- ╔══════════════════════════════════════════════════════════════════╗
-- ║  FIXTURES-SYNC — planification (pg_cron + pg_net)                  ║
-- ║                                                                    ║
-- ║  Invoque la fonction edge fixtures-sync toutes les 2 heures.       ║
-- ║  ~12 appels/jour à la fonction → bien sous le palier gratuit       ║
-- ║  d'API-Football (100 requêtes/jour ; chaque run = 2 requêtes).     ║
-- ║                                                                    ║
-- ║  CADENCE : modifier l'expression cron ci-dessous (ligne unique).   ║
-- ║    '0 */2 * * *'   = toutes les 2 h   (défaut)                     ║
-- ║    '*/30 * * * *'  = toutes les 30 min                             ║
-- ║                                                                    ║
-- ║  AUTH : on envoie la clé « anon » (publique — déjà livrée dans le  ║
-- ║  bundle frontend, donc sans risque ici). La fonction utilise en    ║
-- ║  interne sa propre clé service_role pour écrire en base.           ║
-- ╚══════════════════════════════════════════════════════════════════╝

create extension if not exists pg_cron;
create extension if not exists pg_net;

-- Replanification idempotente.
do $$
begin
  if exists (select 1 from cron.job where jobname = 'fixtures-sync-every-2h') then
    perform cron.unschedule('fixtures-sync-every-2h');
  end if;
end $$;

select cron.schedule(
  'fixtures-sync-every-2h',
  '0 */2 * * *',  -- ← CADENCE : changez ici
  $cron$
  select net.http_post(
    url     := 'https://dpstwvmjccolxglrvwbj.supabase.co/functions/v1/fixtures-sync',
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRwc3R3dm1qY2NvbHhnbHJ2d2JqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAzNDQ2MzMsImV4cCI6MjA5NTkyMDYzM30.QzvpHX_7OVq7nRk8_TUAJlvZm24M8WkHdW93uEbVWZY'
    ),
    body    := '{}'::jsonb
  );
  $cron$
);
