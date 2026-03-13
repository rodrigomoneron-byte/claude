"""
KindleRanker BR — Utilitário de e-mail via Resend
Uso:
    pip install resend
    export RESEND_API_KEY=re_...
"""
import os
import logging

log = logging.getLogger(__name__)

FROM_EMAIL = os.getenv("FROM_EMAIL", "KindleRanker BR <ola@kindleranker.com.br>")


def enviar_email(para: str, assunto: str, html: str) -> bool:
    """
    Envia e-mail via Resend.
    Retorna True se enviado, False se RESEND_API_KEY não configurada.
    Levanta exceção em caso de erro da API.
    """
    api_key = os.getenv("RESEND_API_KEY", "")
    if not api_key:
        log.warning("RESEND_API_KEY não configurada — e-mail não enviado.")
        return False

    import resend
    resend.api_key = api_key

    resp = resend.Emails.send({
        "from":    FROM_EMAIL,
        "to":      [para],
        "subject": assunto,
        "html":    html,
    })
    log.info(f"E-mail enviado para {para} — id: {resp.get('id')}")
    return True


# ── Templates ─────────────────────────────────────────────────────────────────
def _base(conteudo: str, titulo_header: str = "KindleRanker BR") -> str:
    return f"""<!DOCTYPE html>
<html><head><meta charset="utf-8">
<style>
  body {{ background:#0a0a0a; color:#e8e8e8; font-family:sans-serif; margin:0; padding:0; }}
  .wrap {{ max-width:600px; margin:0 auto; padding:32px 24px; }}
  h1 {{ color:#c9a84c; font-size:20px; margin:0 0 4px; }}
  .sub {{ color:#777; font-size:13px; margin:0 0 24px; }}
  .btn {{ display:inline-block; background:#c9a84c; color:#000; padding:10px 24px;
          border-radius:8px; text-decoration:none; font-weight:700; font-size:14px; }}
  .footer {{ color:#444; font-size:11px; margin-top:32px; border-top:1px solid #222; padding-top:16px; }}
</style></head>
<body><div class="wrap">
  <h1>📊 {titulo_header}</h1>
  {conteudo}
  <div class="footer">KindleRanker BR · Amazon.com.br · Cancelar inscrição</div>
</div></body></html>"""


def email_boas_vindas(nome: str, email: str, dashboard_url: str) -> tuple[str, str]:
    """Retorna (assunto, html) para e-mail de boas-vindas."""
    assunto = "🎉 Bem-vindo ao KindleRanker BR!"
    html = _base(f"""
<p class="sub">Olá, {nome}! Sua conta foi criada com sucesso.</p>
<p style="line-height:1.6;margin-bottom:20px">
  Agora você pode acompanhar o BSR de todos os seus títulos Kindle na Amazon Brasil,
  estimar vendas pela calibração real e receber análises automáticas com IA.
</p>
<p><a href="{dashboard_url}" class="btn">Acessar o Dashboard →</a></p>
<p style="color:#777;font-size:13px;margin-top:20px">
  O primeiro relatório semanal chega toda segunda-feira às 9h.
</p>
""", "Bem-vindo!")
    return assunto, html


def email_alerta_bsr(alertas: list, dashboard_url: str) -> tuple[str, str]:
    """Retorna (assunto, html) para alerta de BSR."""
    criticos = [a for a in alertas if a.get("nivel") == "critico"]
    n = len(alertas)
    assunto = f"⚠️ KindleRanker — {n} alerta{'s' if n != 1 else ''} de BSR"

    def cor(nivel):
        return "#d95050" if nivel == "critico" else "#e07830"

    items = "".join(
        f"""<div style="padding:10px 14px;margin:6px 0;background:#111;border-radius:6px;
                        border-left:3px solid {cor(a.get('nivel','atencao'))}">
              <div style="font-weight:600;font-size:14px">{a.get('titulo','?')[:50]}</div>
              <div style="color:#aaa;font-size:12px;margin-top:2px">{a.get('motivo','')}</div>
            </div>"""
        for a in alertas
    )

    html = _base(f"""
<p class="sub">{'⚠️ ' + str(len(criticos)) + ' crítico(s) · ' if criticos else ''}{n} alerta(s) detectado(s)</p>
{items}
<p style="margin-top:20px"><a href="{dashboard_url}" class="btn">Ver no Dashboard →</a></p>
""", "Alerta de BSR")
    return assunto, html
