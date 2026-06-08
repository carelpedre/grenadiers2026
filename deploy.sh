#!/bin/bash
# ════════════════════════════════════════════════════════════════════════
# DEPLOY SCRIPT — Grenadiers 2026 → grenadiers2026.com
# DreamHost Shared Hosting (Apache)
# ════════════════════════════════════════════════════════════════════════
#
# Usage:
#   ./deploy.sh
#
# What it does:
#   1. Runs `npm run build` to compile the site to dist/
#   2. Copies .htaccess into dist/ (Vite ignores files starting with a dot)
#   3. rsync's everything to the DreamHost server
#
# First time setup:
#   chmod +x deploy.sh
#
# ════════════════════════════════════════════════════════════════════════

SSH_USER="carelp"
SSH_HOST="iad1-shared-b7-32.dreamhost.com"
REMOTE_PATH="/home/carelp/grenadiers2026.com"

set -e  # exit on first error

echo "🛠️   Building production bundle..."
npm run build

echo "📄  Generating per-route HTML (for crawlers + SEO)..."
node scripts/generate-route-html.mjs

echo "🗺️   Generating sitemap.xml + robots.txt..."
node scripts/generate-sitemap.mjs

echo "📋  Copying .htaccess into dist/..."
cp public/.htaccess dist/

echo "🚀  Uploading to ${SSH_USER}@${SSH_HOST}:${REMOTE_PATH}/ ..."
rsync -avz --delete \
  --exclude '.DS_Store' \
  --exclude 'favicon.gif' \
  --exclude 'favicon.ico' \
  --exclude 'api/.env' \
  --exclude 'api/atlas.json' \
  --exclude 'api/atlas-rate.json' \
  dist/ "${SSH_USER}@${SSH_HOST}:${REMOTE_PATH}/"

echo ""
echo "✅  Done! Live at: https://grenadiers2026.com/"
echo "    (give DNS 1-2 min after first deploy)"
