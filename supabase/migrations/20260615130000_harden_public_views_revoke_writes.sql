-- ╔══════════════════════════════════════════════════════════════════╗
-- ║  DURCISSEMENT · vues publiques en LECTURE SEULE                    ║
-- ║                                                                    ║
-- ║  Les privilèges par défaut de Supabase accordent ALL (dont        ║
-- ║  INSERT/UPDATE/DELETE) à anon et authenticated sur les objets du   ║
-- ║  schéma public. Sur une vue simple (non security_invoker), une     ║
-- ║  écriture s'exécute avec les droits du propriétaire (postgres) et  ║
-- ║  contournerait la RLS de la table de base. On retire donc tout     ║
-- ║  sauf SELECT sur ces vues publiques.                              ║
-- ║                                                                    ║
-- ║  CONVENTION : toute nouvelle vue public.*_public doit, juste       ║
-- ║  après son « grant select ... to anon, authenticated », révoquer  ║
-- ║  insert, update, delete, truncate, references, trigger de ces      ║
-- ║  mêmes rôles (lecture seule).                                     ║
-- ╚══════════════════════════════════════════════════════════════════╝

revoke insert, update, delete, truncate, references, trigger
  on table
    public.fan_messages_public,
    public.fan_photos_public,
    public.group_c_standings_public,
    public.haiti_contributions_public,
    public.haiti_fixtures_public,
    public.haiti_player_stats_public,
    public.pwonostik_leaderboard,
    public.site_settings_public
  from anon, authenticated;
