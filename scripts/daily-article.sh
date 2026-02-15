#!/bin/bash
# Script diário para gerar artigo e fazer deploy
# Executado via cron job diariamente

cd /home/agdev/.openclaw/workspace/gps-advertorial

# Gera novo artigo
echo "🚀 Gerando artigo diário..."
node scripts/generate-article.js

# Adiciona mudanças ao git
echo "📝 Commitando mudanças..."
git add -A
git commit -m "feat: daily article $(date +%Y-%m-%d)"

# Faz push
echo "⬆️ Fazendo push..."
git push origin main

# Deploy no Cloudflare Pages
echo "🌐 Fazendo deploy..."
CLOUDFLARE_API_TOKEN=hsw_f2O5KHHo29Z1m8N_hhs-duFRh-9DkkjwEdE8 npx wrangler pages deploy . --project-name gps-advertorial --branch main

echo "✅ Deploy completo! Novo artigo disponível em https://gps-advertorial.pages.dev"