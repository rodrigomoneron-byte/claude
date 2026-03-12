#!/usr/bin/env bash
# KindleRanker BR — Configura cron do coletor de BSR
# Cria .env, wrapper e registra jobs das 08h e 20h
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ENV_FILE="$SCRIPT_DIR/.env"
WRAPPER="$SCRIPT_DIR/run_bsr.sh"
LOG_DIR="$SCRIPT_DIR/logs"

# ── 1. Cria o diretório de logs ───────────────────────────────────────────────
mkdir -p "$LOG_DIR"

# ── 2. Cria .env se não existir ───────────────────────────────────────────────
if [ ! -f "$ENV_FILE" ]; then
    cat > "$ENV_FILE" <<'EOF'
RAINFOREST_API_KEY=sua_chave_aqui
DB_HOST=localhost
DB_PORT=5432
DB_NAME=kindleranker
DB_USER=postgres
DB_PASS=
EOF
    echo "✓ .env criado em $ENV_FILE — edite com as credenciais reais."
else
    echo "✓ .env já existe, mantido."
fi

chmod 600 "$ENV_FILE"

# ── 3. Cria wrapper que carrega o .env antes de rodar ────────────────────────
cat > "$WRAPPER" <<EOF
#!/usr/bin/env bash
set -a
source "$ENV_FILE"
set +a
cd "$SCRIPT_DIR"
exec python "$SCRIPT_DIR/bsr_collector.py" "\$@"
EOF
chmod +x "$WRAPPER"
echo "✓ Wrapper criado em $WRAPPER"

# ── 4. Registra cron jobs (08h e 20h) sem duplicar ───────────────────────────
CRON_JOB_8="0 8 * * * $WRAPPER >> $LOG_DIR/bsr.log 2>&1"
CRON_JOB_20="0 20 * * * $WRAPPER >> $LOG_DIR/bsr.log 2>&1"

TMPFILE=$(mktemp)
# Exporta crontab atual, remove linhas do wrapper se já existirem, adiciona novas
crontab -l 2>/dev/null | grep -v "$WRAPPER" > "$TMPFILE" || true
echo "$CRON_JOB_8"  >> "$TMPFILE"
echo "$CRON_JOB_20" >> "$TMPFILE"
crontab "$TMPFILE"
rm "$TMPFILE"

echo "✓ Cron registrado:"
echo "    $CRON_JOB_8"
echo "    $CRON_JOB_20"
echo ""
echo "Próximos passos:"
echo "  1. nano $ENV_FILE   # preencha as credenciais reais"
echo "  2. bash $WRAPPER --asin B08MV39BSH   # teste manual"
echo "  3. bash $WRAPPER                     # catálogo completo"
