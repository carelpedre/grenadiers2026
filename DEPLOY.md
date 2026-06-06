# Deploy Grenadiers 2026 → grenadiers2026.com

This site is a static React (Vite) SPA. `npm run build` compiles it to plain
HTML/CSS/JS in `dist/` — no server-side rendering. Deployment is a single
`rsync` of `dist/` to the DreamHost web root for the domain.

> **⚠️ Obsolete strategy:** Earlier versions of this doc described hosting the
> site in a subfolder at `chokarella.com/grenadye2026` (and referenced the
> `grenadye2026.com` domain). **That approach is no longer used.** The site now
> lives at its own domain root — **https://grenadiers2026.com/** — deployed with
> `./deploy.sh`. Ignore any older references to `chokarella.com/grenadye2026`,
> subfolder hosting, or `grenadye2026.com`.

---

## TL;DR — deploying

```bash
cd ~/grenadiers-2026
./deploy.sh
```

That's it. `deploy.sh` is already configured (see values below) and does
everything in order:

1. Generates social-share OG images — `node scripts/generate-og.mjs`
2. Builds the production bundle — `npm run build` → `dist/`
3. Generates per-route HTML for crawlers/SEO — `node scripts/generate-route-html.mjs`
4. Generates `sitemap.xml` + `robots.txt` — `node scripts/generate-sitemap.mjs`
5. Copies `.htaccess` into `dist/` (Vite ignores dotfiles)
6. `rsync`s `dist/` to the server with `--delete`, so the live site mirrors
   `dist/` exactly

Live URL after deploy: **https://grenadiers2026.com/**

---

## Current deploy target

`deploy.sh` already has these values filled in at the top of the script:

```bash
SSH_USER="carelp"
SSH_HOST="iad1-shared-b7-32.dreamhost.com"
REMOTE_PATH="/home/carelp/grenadiers2026.com"
```

`REMOTE_PATH` is the domain's web root on DreamHost — files rsync'd there are
served directly at `https://grenadiers2026.com/`. No subfolder, no base-path
rewriting (`vite.config.js` uses `base: "/"`).

### Server-only files that are never overwritten

`--delete` makes the remote a mirror of `dist/`, but the deploy excludes a few
server-only files so they're never wiped:

- `api/.env` — Brevo newsletter secrets (see **BREVO_SETUP.md**)
- `api/atlas.json`, `api/atlas-rate.json` — Atlas pin data + rate-limit state
- `.DS_Store`, `favicon.gif`, `favicon.ico`

---

## One-time setup (already done — kept here for reference)

### 1. SSH access
DreamHost panel → **Users** → **Manage Users** → ensure the `carelp` user is a
**Shell user (SSH/SFTP)**, not FTP-only.

### 2. (Recommended) SSH key — skip the password on every deploy
```bash
ssh-keygen -t ed25519 -C "carel@grenadiers2026"   # press Enter through prompts
ssh-copy-id carelp@iad1-shared-b7-32.dreamhost.com  # enter password once
```

### 3. Test the connection
```bash
ssh carelp@iad1-shared-b7-32.dreamhost.com   # logs you in → type `exit`
```

### 4. Make the script executable (first time only)
```bash
chmod +x deploy.sh
```

---

## How updates work

**Content edits** (stories, photos, typos):
1. Edit files locally in `~/grenadiers-2026/`
2. Test: `npm run dev` → http://localhost:5173/
3. Deploy: `./deploy.sh`
4. Hard-refresh the live site (Cmd+Shift+R) to bypass cache

**Adding photos:** drop them in `~/grenadiers-2026/public/images/photos/` (see
that folder's README) *before* deploying — the build copies everything under
`public/` into `dist/`.

---

## Troubleshooting

### "Permission denied" running deploy.sh
```bash
chmod +x deploy.sh
```

### "Could not resolve hostname" / "Connection refused"
SSH access isn't enabled for the user — enable Shell access in the DreamHost
panel (see one-time setup step 1).

### Pages show 404 or assets don't load
`.htaccess` probably didn't upload. The deploy script copies it from
`public/.htaccess` into `dist/`; re-run `./deploy.sh`, or push it manually:
```bash
scp dist/.htaccess carelp@iad1-shared-b7-32.dreamhost.com:/home/carelp/grenadiers2026.com/.htaccess
```

### Newsletter signup says "Server not configured"
The server's `api/.env` is missing or misconfigured — see **BREVO_SETUP.md**.
(It's intentionally excluded from the deploy so it's never overwritten.)

### Photos work locally but not on the live site
Make sure they're in `public/images/photos/` *before* you run `./deploy.sh`. The
build copies them from `public/` into `dist/` — they aren't uploaded separately.

### Need to rollback
Keep a backup of the previous `dist/` before deploying:
```bash
mv dist dist-backup-$(date +%Y%m%d)
npm run build
./deploy.sh
```
