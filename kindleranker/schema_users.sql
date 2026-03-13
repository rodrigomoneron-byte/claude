-- KindleRanker BR — Usuários e Assinaturas
-- Executar após kindleranker_br_schema.sql
-- psql -U postgres -d kindleranker -f schema_users.sql

-- ── Usuários ──────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS users (
    id                   SERIAL PRIMARY KEY,
    email                TEXT        NOT NULL UNIQUE,
    nome                 TEXT        NOT NULL,
    stripe_customer_id   TEXT        UNIQUE,
    ativo                BOOLEAN     NOT NULL DEFAULT FALSE,  -- ativa após pagamento
    criado_em            TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    ultimo_acesso        TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS idx_users_email             ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_stripe_customer   ON users(stripe_customer_id);

-- ── Assinaturas ───────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS subscriptions (
    id                       SERIAL PRIMARY KEY,
    user_id                  INT         NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    stripe_subscription_id   TEXT        NOT NULL UNIQUE,
    stripe_customer_id       TEXT        NOT NULL,
    status                   TEXT        NOT NULL,   -- active | past_due | canceled | trialing
    plano                    TEXT        NOT NULL DEFAULT 'mensal',
    preco_brl                NUMERIC(8,2),
    current_period_start     TIMESTAMPTZ,
    current_period_end       TIMESTAMPTZ,
    cancelado_em             TIMESTAMPTZ,
    criado_em                TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    atualizado_em            TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_subs_user_id    ON subscriptions(user_id);
CREATE INDEX IF NOT EXISTS idx_subs_stripe_id  ON subscriptions(stripe_subscription_id);
CREATE INDEX IF NOT EXISTS idx_subs_customer   ON subscriptions(stripe_customer_id);
CREATE INDEX IF NOT EXISTS idx_subs_status     ON subscriptions(status);

-- ── Eventos Stripe (log de auditoria) ────────────────────────────────────────
CREATE TABLE IF NOT EXISTS stripe_events (
    id           SERIAL PRIMARY KEY,
    event_id     TEXT        NOT NULL UNIQUE,  -- previne duplicatas
    event_type   TEXT        NOT NULL,
    payload      JSONB,
    processado   BOOLEAN     NOT NULL DEFAULT FALSE,
    recebido_em  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_stripe_events_type ON stripe_events(event_type);

-- ── View: assinantes ativos ───────────────────────────────────────────────────
CREATE OR REPLACE VIEW assinantes_ativos AS
SELECT
    u.id,
    u.email,
    u.nome,
    u.criado_em,
    s.plano,
    s.status,
    s.preco_brl,
    s.current_period_end,
    s.stripe_subscription_id
FROM users u
JOIN subscriptions s ON s.user_id = u.id
WHERE s.status IN ('active', 'trialing')
ORDER BY u.criado_em DESC;

COMMENT ON TABLE users         IS 'Usuários do KindleRanker BR';
COMMENT ON TABLE subscriptions IS 'Assinaturas Stripe (mensal/anual)';
COMMENT ON TABLE stripe_events IS 'Log de todos os webhooks Stripe recebidos';
