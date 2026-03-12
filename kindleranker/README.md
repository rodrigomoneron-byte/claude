# KindleRanker BR — Setup Inicial
## Pré-requisitos
- PostgreSQL 14+
- Python 3.10+
- pip install pandas openpyxl psycopg2-binary
## 1. Criar o banco
createdb kindleranker
psql kindleranker < kindleranker_br_schema.sql
## 2. Variáveis de ambiente
export DB_HOST=localhost
export DB_PORT=5432
export DB_NAME=kindleranker
export DB_USER=postgres
export DB_PASS=sua-senha
## 3. Importar o relatório KDP
python import_kdp.py --file KDP_KENP_Read.xlsx
## 4. Rodar análise
python calibration_analysis.py
## Estrutura
kindleranker/
├── kindleranker_br_schema.sql
├── import_kdp.py
├── calibration_analysis.py
├── README.md
└── bsr_collector.py  ← próximo passo
