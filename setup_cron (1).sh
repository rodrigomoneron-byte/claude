#!/bin/bash
# KindleRanker BR — Configuração do cron job
# Executa: bash setup_cron.sh

set -e

PROJETO_DIR="$(cd "$(dirname "$0")" && pwd)"
LOG_DIR="$PROJETO_DIR/logs"
ENV_FILE="$PROJETO_DIR/.env"
WRAPPER="$PROJETO_DIR/run_collector.sh"
PYTHON=$(which python3)

# ── Diretório de logs ─────────────────────────────────────────────────────────

mkdir -p "$LOG_DIR"

# ── .env ─────────────────────────────────────────────────────────────────────
# Cria .env se não existir. Edite com suas credenciais reais.

if [ ! -f "$ENV_FILE" ]; then
  cat > "$ENV_FILE" << 'ENVEOF'
RAINFOREST_API_KEY=sua_chave_aqui
DB_HOST=localhost
DB_PORT=5432
DB_NAME=kindleranker
DB_USER=postgres
DB_PASS=sua_senha_aqui
ENVEOF
  chmod 600 "$ENV_FILE"
  echo "✅ .env criado em $ENV_FILE"
  echo "   ⚠️  Edite o arquivo com suas credenciais antes de continuar."
else
  echo "✅ .env já existe — mantido."
fi

# ── Wrapper de execução ───────────────────────────────────────────────────────

cat > "$WRAPPER" << WRAPEOF
#!/bin/bash
# Carrega variáveis e executa o coletor
set -a
source "$ENV_FILE"
set +a

LOG="$LOG_DIR/bsr_\$(date +%Y%m).log"
echo "--- \$(date '+%Y-%m-%d %H:%M:%S') ---" >> "\$LOG"
$PYTHON "$PROJETO_DIR/bsr_collector.py" >> "\$LOG" 2>&1
echo "Exit: \$?" >> "\$LOG"
WRAPEOF

chmod +x "$WRAPPER"
echo "✅ Wrapper criado: $WRAPPER"

# ── Cron ─────────────────────────────────────────────────────────────────────
# Roda às 08:00 e 20:00 todos os dias

CRON_LINHA_MANHA="0 8  * * * $WRAPPER"
CRON_LINHA_NOITE="0 20 * * * $WRAPPER"

# Remove entradas antigas do kindleranker (se houver) e adiciona as novas
( crontab -l 2>/dev/null | grep -v "kindleranker\|run_collector" ; \
  echo "$CRON_LINHA_MANHA  # kindleranker-manha" ; \
  echo "$CRON_LINHA_NOITE  # kindleranker-noite" ) | crontab -

echo "✅ Cron configurado:"
crontab -l | grep kindleranker

echo ""
echo "──────────────────────────────────────────────"
echo "Setup concluído."
echo "Próximo passo:"
echo "  1. Edite $ENV_FILE com suas credenciais"
echo "  2. Teste manual: python bsr_collector.py --asin B08MV39BSH"
echo "  3. Catálogo completo: python bsr_collector.py"
echo "──────────────────────────────────────────────"
