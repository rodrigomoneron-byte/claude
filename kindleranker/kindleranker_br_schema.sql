-- ============================================================
-- KindleRanker BR — Schema PostgreSQL
-- Gerado com base no catálogo real da autora Jussara Leal
-- ============================================================
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE IF NOT EXISTS titles (
    id              SERIAL PRIMARY KEY,
    asin            VARCHAR(20) NOT NULL UNIQUE,
    titulo          TEXT NOT NULL,
    autor           TEXT,
    preco_sugerido  NUMERIC(8,2),
    tipo_royalty    VARCHAR(5),
    tamanho_mb      NUMERIC(6,2),
    ativo           BOOLEAN DEFAULT TRUE,
    created_at      TIMESTAMPTZ DEFAULT NOW(),
    updated_at      TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX idx_titles_asin ON titles(asin);
CREATE TABLE IF NOT EXISTS stores (
    id      SERIAL PRIMARY KEY,
    codigo  VARCHAR(20) NOT NULL UNIQUE,
    pais    VARCHAR(50),
    moeda   VARCHAR(5)
);
INSERT INTO stores (codigo, pais, moeda) VALUES
    ('Amazon.com.br','Brasil','BRL'),('Amazon.com','EUA','USD'),
    ('Amazon.co.uk','Reino Unido','GBP'),('Amazon.de','Alemanha','EUR'),
    ('Amazon.fr','França','EUR'),('Amazon.es','Espanha','EUR'),
    ('Amazon.it','Itália','EUR'),('Amazon.ca','Canadá','CAD'),
    ('Amazon.co.jp','Japão','JPY'),('Amazon.in','Índia','INR'),
    ('Amazon.com.mx','México','MXN'),('Amazon.com.au','Austrália','AUD')
ON CONFLICT (codigo) DO NOTHING;
CREATE TABLE IF NOT EXISTS monthly_sales (
    id                  SERIAL PRIMARY KEY,
    asin                VARCHAR(20) NOT NULL REFERENCES titles(asin),
    store_id            INTEGER REFERENCES stores(id),
    periodo             DATE NOT NULL,
    tipo_transacao      VARCHAR(30),
    tipo_royalty        VARCHAR(5),
    unidades_vendidas   INTEGER DEFAULT 0,
    unidades_reembolso  INTEGER DEFAULT 0,
    unidades_liquidas   INTEGER DEFAULT 0,
    preco_sugerido      NUMERIC(8,2),
    preco_oferta        NUMERIC(8,2),
    taxa_entrega        NUMERIC(8,2),
    royalties           NUMERIC(12,2),
    moeda               VARCHAR(5),
    UNIQUE (asin, store_id, periodo, tipo_transacao, moeda)
);
CREATE INDEX idx_monthly_sales_asin    ON monthly_sales(asin);
CREATE INDEX idx_monthly_sales_periodo ON monthly_sales(periodo);
CREATE INDEX idx_monthly_sales_store   ON monthly_sales(store_id);
CREATE TABLE IF NOT EXISTS daily_kenp (
    id          SERIAL PRIMARY KEY,
    asin        VARCHAR(20) NOT NULL REFERENCES titles(asin),
    store_id    INTEGER REFERENCES stores(id),
    data        DATE NOT NULL,
    kenp        BIGINT DEFAULT 0,
    UNIQUE (asin, store_id, data)
);
CREATE INDEX idx_daily_kenp_asin  ON daily_kenp(asin);
CREATE INDEX idx_daily_kenp_data  ON daily_kenp(data);
CREATE INDEX idx_daily_kenp_store ON daily_kenp(store_id);
CREATE TABLE IF NOT EXISTS monthly_orders (
    id                  SERIAL PRIMARY KEY,
    asin                VARCHAR(20) NOT NULL REFERENCES titles(asin),
    store_id            INTEGER REFERENCES stores(id),
    periodo             DATE NOT NULL,
    unidades_pagas      INTEGER DEFAULT 0,
    unidades_gratuitas  INTEGER DEFAULT 0,
    UNIQUE (asin, store_id, periodo)
);
CREATE INDEX idx_monthly_orders_asin    ON monthly_orders(asin);
CREATE INDEX idx_monthly_orders_periodo ON monthly_orders(periodo);
CREATE TABLE IF NOT EXISTS daily_orders (
    id                  SERIAL PRIMARY KEY,
    asin                VARCHAR(20) NOT NULL REFERENCES titles(asin),
    store_id            INTEGER REFERENCES stores(id),
    data                DATE NOT NULL,
    unidades_pagas      INTEGER DEFAULT 0,
    unidades_gratuitas  INTEGER DEFAULT 0,
    UNIQUE (asin, store_id, data)
);
CREATE INDEX idx_daily_orders_asin ON daily_orders(asin);
CREATE INDEX idx_daily_orders_data ON daily_orders(data);
CREATE TABLE IF NOT EXISTS bsr_history (
    id              SERIAL PRIMARY KEY,
    asin            VARCHAR(20) NOT NULL REFERENCES titles(asin),
    store_id        INTEGER REFERENCES stores(id),
    coletado_em     TIMESTAMPTZ NOT NULL,
    bsr_geral       INTEGER,
    bsr_categoria   INTEGER,
    categoria_nome  TEXT,
    browse_node_id  TEXT,
    UNIQUE (asin, store_id, coletado_em)
);
CREATE INDEX idx_bsr_asin      ON bsr_history(asin);
CREATE INDEX idx_bsr_data      ON bsr_history(coletado_em);
CREATE INDEX idx_bsr_store     ON bsr_history(store_id);
CREATE INDEX idx_bsr_categoria ON bsr_history(browse_node_id);
CREATE TABLE IF NOT EXISTS monthly_summary (
    id              SERIAL PRIMARY KEY,
    periodo         DATE NOT NULL UNIQUE,
    unidades_ebook  INTEGER DEFAULT 0,
    unidades_gratis INTEGER DEFAULT 0,
    kenp_total      BIGINT DEFAULT 0,
    royalties_brl   NUMERIC(12,2) DEFAULT 0,
    royalties_usd   NUMERIC(12,2) DEFAULT 0,
    royalties_gbp   NUMERIC(12,2) DEFAULT 0,
    royalties_eur   NUMERIC(12,2) DEFAULT 0,
    royalties_jpy   NUMERIC(12,2) DEFAULT 0,
    royalties_cad   NUMERIC(12,2) DEFAULT 0,
    royalties_inr   NUMERIC(12,2) DEFAULT 0,
    royalties_aud   NUMERIC(12,2) DEFAULT 0
);
CREATE TABLE IF NOT EXISTS bsr_calibration (
    id                      SERIAL PRIMARY KEY,
    bsr_min                 INTEGER NOT NULL,
    bsr_max                 INTEGER NOT NULL,
    vendas_diarias_min      NUMERIC(8,2),
    vendas_diarias_max      NUMERIC(8,2),
    vendas_diarias_media    NUMERIC(8,2),
    kenp_diario_medio       BIGINT,
    amostras                INTEGER DEFAULT 0,
    mercado                 VARCHAR(20) DEFAULT 'Amazon.com.br',
    categoria               TEXT,
    ultima_atualizacao      DATE,
    UNIQUE (bsr_min, bsr_max, mercado, categoria)
);
INSERT INTO bsr_calibration
    (bsr_min, bsr_max, vendas_diarias_min, vendas_diarias_max, vendas_diarias_media, mercado, ultima_atualizacao)
VALUES
    (1,      100,    100, 999, 300,  'Amazon.com.br', CURRENT_DATE),
    (101,    250,    50,  100, 70,   'Amazon.com.br', CURRENT_DATE),
    (251,    500,    25,  50,  35,   'Amazon.com.br', CURRENT_DATE),
    (501,    1000,   15,  25,  18,   'Amazon.com.br', CURRENT_DATE),
    (1001,   4000,   5,   15,  8,    'Amazon.com.br', CURRENT_DATE),
    (4001,   8000,   1,   5,   2.5,  'Amazon.com.br', CURRENT_DATE),
    (8001,   999999, 0,   1,   0.3,  'Amazon.com.br', CURRENT_DATE)
ON CONFLICT DO NOTHING;
CREATE TABLE IF NOT EXISTS users (
    id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email       TEXT NOT NULL UNIQUE,
    nome        TEXT,
    plano       VARCHAR(20) DEFAULT 'autor',
    stripe_id   TEXT,
    ativo       BOOLEAN DEFAULT TRUE,
    created_at  TIMESTAMPTZ DEFAULT NOW()
);
CREATE TABLE IF NOT EXISTS user_tracked_books (
    id          SERIAL PRIMARY KEY,
    user_id     UUID REFERENCES users(id) ON DELETE CASCADE,
    asin        VARCHAR(20) NOT NULL,
    store_id    INTEGER REFERENCES stores(id),
    apelido     TEXT,
    ativo       BOOLEAN DEFAULT TRUE,
    criado_em   TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE (user_id, asin, store_id)
);
CREATE OR REPLACE VIEW vw_titulo_mensal_br AS
SELECT t.asin, t.titulo, ms.periodo, ms.unidades_liquidas, ms.royalties,
    COALESCE(k.kenp_mensal, 0) AS kenp_mensal
FROM monthly_sales ms
JOIN titles t ON t.asin = ms.asin
JOIN stores s ON s.id = ms.store_id AND s.codigo = 'Amazon.com.br'
LEFT JOIN (
    SELECT asin, DATE_TRUNC('month', data)::DATE AS mes, SUM(kenp) AS kenp_mensal
    FROM daily_kenp dk JOIN stores s2 ON s2.id = dk.store_id AND s2.codigo = 'Amazon.com.br'
    GROUP BY asin, mes
) k ON k.asin = ms.asin AND k.mes = ms.periodo
WHERE ms.moeda = 'BRL';
CREATE OR REPLACE VIEW vw_top_kenp_br AS
SELECT t.asin, t.titulo, SUM(dk.kenp) AS kenp_total,
    COUNT(DISTINCT DATE_TRUNC('month', dk.data)) AS meses_ativos,
    MAX(dk.data) AS ultima_leitura
FROM daily_kenp dk
JOIN titles t ON t.asin = dk.asin
JOIN stores s ON s.id = dk.store_id AND s.codigo = 'Amazon.com.br'
GROUP BY t.asin, t.titulo ORDER BY kenp_total DESC;
CREATE OR REPLACE VIEW vw_efeito_lancamento AS
SELECT periodo, COUNT(DISTINCT asin) AS titulos_ativos,
    SUM(kenp_mensal) AS kenp_total,
    SUM(unidades_liquidas) AS unidades_total,
    SUM(royalties) AS royalties_brl
FROM vw_titulo_mensal_br
GROUP BY periodo ORDER BY periodo;
