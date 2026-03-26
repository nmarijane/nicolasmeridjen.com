#!/bin/bash
set -e
APP_DIR="/root/repos/nicolasmeridjen.com"
LOG="/var/log/nicolasmeridjen-blog-deploy.log"

echo "$(date) — Deploy triggered" >> "$LOG"
cd "$APP_DIR"
git pull origin main >> "$LOG" 2>&1
docker compose up -d --build >> "$LOG" 2>&1
echo "$(date) — Deploy complete" >> "$LOG"
