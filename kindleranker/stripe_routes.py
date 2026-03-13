"""
KindleRanker BR — Stripe + PIX
Endpoints:
    POST /stripe/criar-sessao   → URL do Checkout (card + PIX)
    POST /stripe/webhook         → processa eventos Stripe
    GET  /stripe/portal/{email}  → link do Customer Portal (cancelar/atualizar)
Env:
    STRIPE_SECRET_KEY      sk_live_... ou sk_test_...
    STRIPE_WEBHOOK_SECRET  whsec_...
    STRIPE_PRICE_MENSAL    price_... (plano mensal em BRL)
    STRIPE_PRICE_ANUAL     price_... (plano anual em BRL, opcional)
    DASHBOARD_URL          https://app.kindleranker.com.br
"""
import os
import logging
from datetime import datetime, timezone

import psycopg2
import psycopg2.extras
import stripe
from fastapi import APIRouter, HTTPException, Request, Header
from pydantic import BaseModel, EmailStr

from email_utils import enviar_email, email_boas_vindas

log = logging.getLogger(__name__)

stripe.api_key     = os.getenv("STRIPE_SECRET_KEY", "")
WEBHOOK_SECRET     = os.getenv("STRIPE_WEBHOOK_SECRET", "")
DASHBOARD_URL      = os.getenv("DASHBOARD_URL", "http://localhost:3000")
PRICE_MENSAL       = os.getenv("STRIPE_PRICE_MENSAL", "")
PRICE_ANUAL        = os.getenv("STRIPE_PRICE_ANUAL", "")

router = APIRouter()

# ── DB ────────────────────────────────────────────────────────────────────────
def get_conn():
    return psycopg2.connect(
        host=os.getenv("DB_HOST", "localhost"),
        port=int(os.getenv("DB_PORT", 5432)),
        dbname=os.getenv("DB_NAME", "kindleranker"),
        user=os.getenv("DB_USER", "postgres"),
        password=os.getenv("DB_PASS", ""),
        cursor_factory=psycopg2.extras.RealDictCursor,
    )

# ── Models ────────────────────────────────────────────────────────────────────
class CheckoutRequest(BaseModel):
    email: str
    nome:  str
    plano: str = "mensal"   # "mensal" | "anual"

# ── Helpers ───────────────────────────────────────────────────────────────────
def _price_id(plano: str) -> str:
    m = {"mensal": PRICE_MENSAL, "anual": PRICE_ANUAL}
    pid = m.get(plano, PRICE_MENSAL)
    if not pid:
        raise HTTPException(400, f"STRIPE_PRICE_{plano.upper()} não configurado.")
    return pid

def _upsert_user(cur, email: str, nome: str, stripe_customer_id: str = None) -> int:
    cur.execute("""
        INSERT INTO users (email, nome, stripe_customer_id)
        VALUES (%s, %s, %s)
        ON CONFLICT (email) DO UPDATE
            SET nome               = EXCLUDED.nome,
                stripe_customer_id = COALESCE(EXCLUDED.stripe_customer_id, users.stripe_customer_id)
        RETURNING id
    """, (email, nome, stripe_customer_id))
    return cur.fetchone()["id"]

def _ativar_usuario(customer_id: str, subscription_id: str, status: str,
                    period_start: int, period_end: int, plano: str):
    """Ativa o usuário após pagamento confirmado."""
    conn = get_conn(); cur = conn.cursor()
    try:
        # Busca customer Stripe para obter email/nome
        customer = stripe.Customer.retrieve(customer_id)
        email    = customer.get("email", "")
        nome     = customer.get("name", "") or customer.get("metadata", {}).get("nome", "")

        user_id = _upsert_user(cur, email, nome, customer_id)

        # Ativa o usuário
        cur.execute("UPDATE users SET ativo = TRUE WHERE id = %s", (user_id,))

        # Upsert na subscriptions
        cur.execute("""
            INSERT INTO subscriptions
                (user_id, stripe_subscription_id, stripe_customer_id, status, plano,
                 current_period_start, current_period_end)
            VALUES (%s, %s, %s, %s, %s,
                    TO_TIMESTAMP(%s), TO_TIMESTAMP(%s))
            ON CONFLICT (stripe_subscription_id) DO UPDATE
                SET status               = EXCLUDED.status,
                    current_period_start = EXCLUDED.current_period_start,
                    current_period_end   = EXCLUDED.current_period_end,
                    atualizado_em        = NOW()
        """, (user_id, subscription_id, customer_id, status, plano,
              period_start, period_end))

        conn.commit()
        log.info(f"Usuário ativado: {email} (sub: {subscription_id})")

        # E-mail de boas-vindas
        if email:
            assunto, html = email_boas_vindas(nome or "Olá", email, DASHBOARD_URL)
            enviar_email(email, assunto, html)

    except Exception as e:
        conn.rollback()
        log.error(f"Erro ao ativar usuário (customer={customer_id}): {e}")
        raise
    finally:
        cur.close(); conn.close()

def _atualizar_status(subscription_id: str, status: str):
    """Atualiza status da assinatura (past_due, canceled, etc.)."""
    conn = get_conn(); cur = conn.cursor()
    try:
        cancelado_em = "NOW()" if status == "canceled" else "NULL"
        cur.execute(f"""
            UPDATE subscriptions
            SET status        = %s,
                cancelado_em  = {cancelado_em},
                atualizado_em = NOW()
            WHERE stripe_subscription_id = %s
        """, (status, subscription_id))

        if status == "canceled":
            cur.execute("""
                UPDATE users SET ativo = FALSE
                WHERE id = (
                    SELECT user_id FROM subscriptions
                    WHERE stripe_subscription_id = %s
                )
            """, (subscription_id,))

        conn.commit()
        log.info(f"Status atualizado: {subscription_id} → {status}")
    except Exception as e:
        conn.rollback()
        log.error(f"Erro ao atualizar status: {e}")
    finally:
        cur.close(); conn.close()

def _log_evento(event_id: str, event_type: str, payload: dict):
    """Persiste o evento Stripe para auditoria (idempotência)."""
    conn = get_conn(); cur = conn.cursor()
    try:
        cur.execute("""
            INSERT INTO stripe_events (event_id, event_type, payload)
            VALUES (%s, %s, %s)
            ON CONFLICT (event_id) DO NOTHING
            RETURNING id
        """, (event_id, event_type, psycopg2.extras.Json(payload)))
        inserted = cur.fetchone()
        conn.commit()
        return bool(inserted)   # False = evento duplicado
    except Exception:
        conn.rollback()
        return False
    finally:
        cur.close(); conn.close()

# ── Endpoints ─────────────────────────────────────────────────────────────────
@router.post("/criar-sessao")
def criar_sessao(body: CheckoutRequest):
    """
    Cria sessão Stripe Checkout.
    Suporta cartão (débito/crédito) e PIX.
    Retorna {url, session_id}.
    """
    if not stripe.api_key:
        raise HTTPException(503, "STRIPE_SECRET_KEY não configurada.")

    price_id = _price_id(body.plano)

    # Verificar/criar customer Stripe
    customers = stripe.Customer.list(email=body.email, limit=1)
    if customers.data:
        customer_id = customers.data[0].id
        stripe.Customer.modify(customer_id, name=body.nome)
    else:
        customer = stripe.Customer.create(email=body.email, name=body.nome)
        customer_id = customer.id

    session = stripe.checkout.Session.create(
        customer=customer_id,
        payment_method_types=["card", "pix"],
        line_items=[{"price": price_id, "quantity": 1}],
        mode="subscription",
        metadata={"nome": body.nome, "plano": body.plano},
        success_url=f"{DASHBOARD_URL}/sucesso?session_id={{CHECKOUT_SESSION_ID}}",
        cancel_url=f"{DASHBOARD_URL}/precos?cancelado=1",
        locale="pt-BR",
        allow_promotion_codes=True,
        subscription_data={
            "metadata": {"plano": body.plano},
            "trial_period_days": 7,       # 7 dias grátis para beta
        },
        payment_method_options={
            "pix": {"expires_after_seconds": 86400},   # PIX expira em 24h
        },
    )

    log.info(f"Sessão Checkout criada: {session.id} para {body.email} ({body.plano})")
    return {"url": session.url, "session_id": session.id}


@router.get("/portal/{email}")
def portal_cliente(email: str):
    """
    Retorna URL do Customer Portal (gerenciar/cancelar assinatura).
    """
    if not stripe.api_key:
        raise HTTPException(503, "STRIPE_SECRET_KEY não configurada.")

    customers = stripe.Customer.list(email=email, limit=1)
    if not customers.data:
        raise HTTPException(404, "Cliente não encontrado no Stripe.")

    session = stripe.billing_portal.Session.create(
        customer=customers.data[0].id,
        return_url=f"{DASHBOARD_URL}",
    )
    return {"url": session.url}


@router.post("/webhook")
async def webhook(request: Request, stripe_signature: str = Header(None, alias="stripe-signature")):
    """
    Recebe e processa eventos Stripe.
    Idempotente: ignora eventos já processados.
    """
    if not WEBHOOK_SECRET:
        raise HTTPException(503, "STRIPE_WEBHOOK_SECRET não configurado.")

    payload = await request.body()
    try:
        event = stripe.Webhook.construct_event(payload, stripe_signature, WEBHOOK_SECRET)
    except stripe.error.SignatureVerificationError:
        log.warning("Webhook recebido com assinatura inválida.")
        raise HTTPException(400, "Assinatura inválida.")

    # Idempotência
    if not _log_evento(event["id"], event["type"], dict(event["data"]["object"])):
        log.info(f"Evento duplicado ignorado: {event['id']}")
        return {"ok": True, "duplicado": True}

    etype = event["type"]
    data  = event["data"]["object"]
    log.info(f"Webhook: {etype} ({event['id']})")

    # ── Checkout concluído (primeiro pagamento ou trial) ──────────────────────
    if etype == "checkout.session.completed":
        sub_id = data.get("subscription")
        if sub_id:
            sub   = stripe.Subscription.retrieve(sub_id)
            plano = sub.get("metadata", {}).get("plano", "mensal")
            _ativar_usuario(
                customer_id=data["customer"],
                subscription_id=sub_id,
                status=sub["status"],
                period_start=sub["current_period_start"],
                period_end=sub["current_period_end"],
                plano=plano,
            )

    # ── Renovação mensal paga ─────────────────────────────────────────────────
    elif etype == "invoice.paid":
        sub_id = data.get("subscription")
        if sub_id:
            sub = stripe.Subscription.retrieve(sub_id)
            _atualizar_status(sub_id, sub["status"])
            # Garante que usuário está ativo
            conn = get_conn(); cur = conn.cursor()
            try:
                cur.execute("""
                    UPDATE users SET ativo = TRUE
                    WHERE id = (SELECT user_id FROM subscriptions WHERE stripe_subscription_id = %s)
                """, (sub_id,))
                conn.commit()
            finally:
                cur.close(); conn.close()

    # ── Pagamento falhou ──────────────────────────────────────────────────────
    elif etype == "invoice.payment_failed":
        sub_id = data.get("subscription")
        if sub_id:
            _atualizar_status(sub_id, "past_due")

    # ── Assinatura atualizada (upgrade/downgrade/cancelamento agendado) ───────
    elif etype == "customer.subscription.updated":
        _atualizar_status(data["id"], data["status"])

    # ── Assinatura cancelada definitivamente ──────────────────────────────────
    elif etype == "customer.subscription.deleted":
        _atualizar_status(data["id"], "canceled")

    return {"ok": True}
