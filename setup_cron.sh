#!/bin/bash
# KindleRanker BR — Setup do Cron Job
# Configura coleta automática de BSR 2x/dia
# Uso: bash setup_cron.sh

PROJECT_DIR="$(cd "$(dirname "$0")" && pwd)"
PYTHON="$(which python3)"
LOG_DIR="$PROJECT_DIR/logs"

# Cria pasta de logs
mkdir -p "$LOG_DIR"

# Verifica variáveis obrigatórias
if [ -z "$RAINFOREST_API_KEY" ]; then
    echo "⚠️  RAINFOREST_API_KEY não definida."
    echo "   Adicione ao seu .bashrc ou .env:"
    echo "   export RAINFOREST_API_KEY=sua_chave_aqui"
    exit 1
fi

# Gera o arquivo .env para o cron (cron não herda variáveis do shell)
cat > "$PROJECT_DIR/.env" << EOF
DB_HOST=${DB_HOST:-localhost}
DB_PORT=${DB_PORT:-5432}
DB_NAME=${DB_NAME:-kindleranker}
DB_USER=${DB_USER:-postgres}
DB_PASS=${DB_PASS:-}
RAINFOREST_API_KEY=${RAINFOREST_API_KEY}
EOF

chmod 600 "$PROJECT_DIR/.env"
echo "✓ .env criado em $PROJECT_DIR/.env"

# Cria wrapper que carrega o .env antes de rodar
cat > "$PROJECT_DIR/run_collector.sh" << EOF
#!/bin/bash
set -a
source "$PROJECT_DIR/.env"
set +a
cd "$PROJECT_DIR"
$PYTHON bsr_collector.py >> "$LOG_DIR/bsr_\$(date +%Y%m).log" 2>&1
EOF

chmod +x "$PROJECT_DIR/run_collector.sh"
echo "✓ run_collector.sh criado"

# Adiciona ao crontab (8h e 20h todos os dias)
CRON_JOB="0 8,20 * * * $PROJECT_DIR/run_collector.sh"
CRONTAB_ATUAL=$(crontab -l 2>/dev/null || echo "")

if echo "$CRONTAB_ATUAL" | grep -q "run_collector.sh"; then
    echo "ℹ️  Cron já configurado. Nenhuma alteração feita."
else
    (echo "$CRONTAB_ATUAL"; echo "$CRON_JOB") | crontab -
    echo "✓ Cron configurado: $CRON_JOB"
fi

echo ""
echo "========================================"
echo "Setup concluído."
echo ""
echo "Teste agora com:"
echo "  bash run_collector.sh"
echo ""
echo "Ou teste um ASIN específico:"
echo "  python bsr_collector.py --asin B08MV39BSH"
echo ""
echo "Dry run (sem salvar):"
echo "  python bsr_collector.py --dry-run"
echo ""
echo "Ver logs:"
echo "  tail -f logs/bsr_$(date +%Y%m).log"
echo "========================================"
