#!/usr/bin/env bash
# KindleRanker BR — Deploy completo (primeira vez ou update)
# Uso: bash deploy.sh
# Requer: Ubuntu 22.04, Node 18+, Python 3.10+, PostgreSQL 14+
set -euo pipefail

REPO_DIR="$HOME/kindleranker"
LOG_DIR="$HOME/logs"
API_SERVICE="kindleranker-api"

GREEN='\033[0;32m'; YELLOW='\033[1;33m'; RED='\033[0;31m'; NC='\033[0m'
ok()   { echo -e "${GREEN}✅  $*${NC}"; }
warn() { echo -e "${YELLOW}⚠️   $*${NC}"; }
fail() { echo -e "${RED}❌  $*${NC}"; exit 1; }
step() { echo -e "\n${YELLOW}── $* ──${NC}"; }

mkdir -p "$LOG_DIR"

# ── 1. Dependências Python ─────────────────────────────────────────────────────
step "Dependências Python"
cd "$REPO_DIR/kindleranker"
pip install -q fastapi uvicorn psycopg2-binary anthropic resend stripe 2>&1 | tail -3
ok "pip install ok"

# ── 2. Schema banco de dados ───────────────────────────────────────────────────
step "Schema PostgreSQL"
DB_NAME="${DB_NAME:-kindleranker}"
DB_USER="${DB_USER:-postgres}"

# Schema principal (ignora erro se já existir)
psql -U "$DB_USER" -d "$DB_NAME" -f "$REPO_DIR/kindleranker/kindleranker_br_schema.sql" \
    2>&1 | grep -E "(ERROR|CREATE|INSERT)" || true

# Schema de usuários/assinaturas
psql -U "$DB_USER" -d "$DB_NAME" -f "$REPO_DIR/kindleranker/schema_users.sql" \
    2>&1 | grep -E "(ERROR|CREATE|INSERT)" || true

ok "Schema aplicado"

# ── 3. API systemd ─────────────────────────────────────────────────────────────
step "Serviço API (systemd)"
if systemctl is-active --quiet "$API_SERVICE" 2>/dev/null; then
    systemctl restart "$API_SERVICE"
    ok "API reiniciada"
else
    warn "Serviço $API_SERVICE não encontrado — inicie manualmente:"
    warn "  cd $REPO_DIR/kindleranker && uvicorn main:app --host 0.0.0.0 --port 8000 &"
fi

# ── 4. Dashboard Next.js ───────────────────────────────────────────────────────
step "Dashboard Next.js"
cd "$REPO_DIR/dashboard"

# Instala dependências
npm install --silent 2>&1 | tail -2

# Build produção
echo "Building Next.js..."
npm run build 2>&1 | tail -10

# Mata processo anterior se existir
pkill -f "node.*next start" 2>/dev/null || true
sleep 1

# Inicia em background
nohup npm start > "$LOG_DIR/dashboard.log" 2>&1 &
DASH_PID=$!
echo "$DASH_PID" > "$LOG_DIR/dashboard.pid"
sleep 3

if kill -0 "$DASH_PID" 2>/dev/null; then
    ok "Dashboard rodando (PID=$DASH_PID)"
else
    fail "Dashboard não iniciou — veja $LOG_DIR/dashboard.log"
fi

# ── 5. Nginx ───────────────────────────────────────────────────────────────────
step "Nginx"
NGINX_CONF="/etc/nginx/sites-available/kindleranker"
NGINX_ENABLED="/etc/nginx/sites-enabled/kindleranker"

if [ -f "$NGINX_CONF" ]; then
    warn "Config Nginx já existe — não sobrescrito"
else
    cp "$REPO_DIR/deploy/nginx/kindleranker.conf" "$NGINX_CONF"
    ok "Config Nginx copiada"
fi

if [ ! -L "$NGINX_ENABLED" ]; then
    ln -s "$NGINX_CONF" "$NGINX_ENABLED"
    ok "Site habilitado"
fi

if nginx -t 2>/dev/null; then
    systemctl reload nginx 2>/dev/null || warn "Não foi possível recarregar Nginx (rode como root)"
    ok "Nginx recarregado"
else
    warn "Nginx config com erro — verifique manualmente: nginx -t"
fi

# ── 6. Teste rápido ────────────────────────────────────────────────────────────
step "Teste de saúde"
sleep 2

if curl -sf http://localhost:8000/health > /dev/null 2>&1; then
    HEALTH=$(curl -s http://localhost:8000/health)
    ok "API health: $HEALTH"
else
    warn "API não respondeu em localhost:8000 — verifique logs"
fi

if curl -sf http://localhost:3000 > /dev/null 2>&1; then
    ok "Dashboard respondendo em localhost:3000"
else
    warn "Dashboard não respondeu em localhost:3000 — verifique $LOG_DIR/dashboard.log"
fi

# ── Resumo ─────────────────────────────────────────────────────────────────────
echo -e "\n══════════════════════════════════════════════════════"
ok "Deploy concluído!"
echo -e "\nPróximos passos:"
echo "  1. python kindleranker/stripe_setup.py   # cria produtos no Stripe"
echo "  2. Edite as variáveis Stripe no .service e: systemctl daemon-reload"
echo "  3. certbot --nginx -d app.kindleranker.com.br -d api.kindleranker.com.br"
echo "  4. python kindleranker/test_beta.py       # valida tudo"
echo -e "══════════════════════════════════════════════════════\n"
