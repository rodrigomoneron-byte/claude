#!/usr/bin/env python3
"""
Triagem de seguidores do Instagram a partir do export oficial da conta.

Para que serve
--------------
O Instagram nao oferece remocao de seguidores em massa: nem no app, nem na
Graph API, nem via Windsor.ai (o conector so escreve post de imagem). A
remocao e manual, um perfil por vez.

O que este script resolve e o "quem remover, e em que ordem". O export
oficial da conta traz, para cada seguidor, a data em que ele passou a te
seguir. Coortes contaminadas -- sorteios, campanhas antigas, fases em que o
perfil falava de outro assunto -- aparecem como picos nessa serie. Isolar o
pico e transformar "remover 9 mil pessoas no escuro" em "remover estas 6.200,
nesta ordem".

Como obter o export
-------------------
No app ou no site: Central de Contas -> Sua informacao e permissoes ->
Baixar suas informacoes -> pedir em formato JSON. O arquivo que interessa e
`followers_1.json` (as vezes vem particionado: followers_2.json etc.).
Opcionalmente `following.json`, usado aqui para proteger quem voce segue de
volta.

Uso
---
  # 1. Ver a distribuicao e achar os picos dos sorteios
  python3 triagem_seguidores.py followers_1.json --histograma

  # 2. Extrair a coorte de uma janela suspeita
  python3 triagem_seguidores.py followers_1.json \
      --janela 2021-03-01 2021-04-15 \
      --seguindo following.json \
      --saida coorte-sorteio-2021.csv

  # Varios arquivos de followers de uma vez
  python3 triagem_seguidores.py followers_*.json --histograma
"""

from __future__ import annotations

import argparse
import csv
import json
import sys
from collections import Counter
from datetime import datetime, timezone
from pathlib import Path
from statistics import median


# --------------------------------------------------------------------------
# Leitura do export
# --------------------------------------------------------------------------

def _extrair_entradas(dados):
    """O export mudou de formato algumas vezes. Aceita as variantes conhecidas.

    - followers_1.json: lista de objetos no topo
    - following.json:   {"relationships_following": [...]}
    - variantes antigas com outras chaves de topo
    """
    if isinstance(dados, list):
        return dados
    if isinstance(dados, dict):
        for chave in (
            "relationships_following",
            "relationships_followers",
            "relationships_follow_requests_sent",
        ):
            if chave in dados:
                return dados[chave]
        # fallback: primeira lista encontrada no topo
        for valor in dados.values():
            if isinstance(valor, list):
                return valor
    return []


def carregar(caminhos):
    """Le um ou mais arquivos do export e devolve {username: datetime}."""
    perfis: dict[str, datetime] = {}
    for caminho in caminhos:
        p = Path(caminho)
        if not p.exists():
            sys.exit(f"erro: arquivo nao encontrado: {caminho}")
        try:
            dados = json.loads(p.read_text(encoding="utf-8"))
        except json.JSONDecodeError as e:
            sys.exit(f"erro: {caminho} nao e um JSON valido ({e})")

        for entrada in _extrair_entradas(dados):
            if not isinstance(entrada, dict):
                continue
            for item in entrada.get("string_list_data") or []:
                usuario = item.get("value") or ""
                ts = item.get("timestamp")
                if not usuario or not ts:
                    continue
                quando = datetime.fromtimestamp(int(ts), tz=timezone.utc)
                # se aparecer duplicado entre arquivos, fica a data mais antiga
                if usuario not in perfis or quando < perfis[usuario]:
                    perfis[usuario] = quando
    return perfis


# --------------------------------------------------------------------------
# Histograma
# --------------------------------------------------------------------------

def br(n):
    """Numero no formato brasileiro: 8493 -> 8.493"""
    return f"{n:,}".replace(",", ".")


def histograma(perfis, largura=52):
    """Follows por mes, com barra proporcional. Os picos sao as coortes."""
    if not perfis:
        sys.exit("erro: nenhum seguidor com data encontrado no export.")

    por_mes = Counter(d.strftime("%Y-%m") for d in perfis.values())
    meses = sorted(por_mes)
    pico = max(por_mes.values())
    total = sum(por_mes.values())

    # A referencia e a MEDIANA, nao a media: num perfil com sorteios, os
    # proprios picos puxam a media para cima e passam a se esconder atras
    # dela. A mediana descreve o mes tipico e deixa os picos aparecerem.
    tipico = median(por_mes.values())
    limiar = max(tipico * 4, 50)

    print(f"\n{br(total)} seguidores com data, entre {meses[0]} e {meses[-1]}")
    print(f"mes tipico (mediana): {tipico:.0f} follows\n")

    for mes in meses:
        n = por_mes[mes]
        barra = "#" * max(1, round(n / pico * largura))
        marca = "  <-- pico" if n >= limiar else ""
        print(f"  {mes}  {br(n):>7}  {barra}{marca}")

    print(f"\nOs meses marcados com <-- pico trouxeram mais de {limiar:.0f} follows,")
    print("varias vezes o mes tipico. Confira se batem com as datas dos seus")
    print("sorteios e use --janela para extrair a lista daquele periodo.\n")


# --------------------------------------------------------------------------
# Extracao de coorte
# --------------------------------------------------------------------------

def extrair(perfis, inicio, fim, seguindo=None, saida=None):
    """Lista quem passou a seguir dentro da janela [inicio, fim]."""
    seguindo = seguindo or set()

    selecionados = [
        (usuario, quando)
        for usuario, quando in perfis.items()
        if inicio <= quando.date() <= fim
    ]
    selecionados.sort(key=lambda par: par[1])

    protegidos = [u for u, _ in selecionados if u in seguindo]
    remover = [(u, q) for u, q in selecionados if u not in seguindo]

    print(f"\njanela {inicio} a {fim}")
    print(f"  {br(len(selecionados))} seguidores entraram nesse periodo")
    if seguindo:
        print(f"  {br(len(protegidos))} preservados (voce segue de volta)")
    print(f"  {br(len(remover))} candidatos a remocao")

    if not saida:
        print("\n  (rode de novo com --saida arquivo.csv para gravar a lista)\n")
        return remover

    with open(saida, "w", newline="", encoding="utf-8") as f:
        w = csv.writer(f)
        w.writerow(["usuario", "url", "seguiu_em", "removido"])
        for usuario, quando in remover:
            w.writerow([
                usuario,
                f"https://www.instagram.com/{usuario}/",
                quando.date().isoformat(),
                "",
            ])

    print(f"\n  lista gravada em {saida}")
    print("  A coluna 'removido' esta vazia de proposito: marque nela conforme")
    print("  for removendo no app, para saber onde parou.\n")
    return remover


def _data(texto):
    try:
        return datetime.strptime(texto, "%Y-%m-%d").date()
    except ValueError:
        raise argparse.ArgumentTypeError(f"data invalida: {texto} (use AAAA-MM-DD)")


def main():
    ap = argparse.ArgumentParser(
        description="Triagem de seguidores do Instagram pelo export oficial.",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog=__doc__.split("Uso\n---")[1] if "Uso\n---" in __doc__ else None,
    )
    ap.add_argument("followers", nargs="+",
                    help="followers_1.json (aceita varios arquivos)")
    ap.add_argument("--histograma", action="store_true",
                    help="mostra follows por mes e marca os picos")
    ap.add_argument("--janela", nargs=2, type=_data, metavar=("INICIO", "FIM"),
                    help="extrai quem seguiu entre duas datas (AAAA-MM-DD)")
    ap.add_argument("--seguindo", metavar="ARQUIVO",
                    help="following.json — protege quem voce segue de volta")
    ap.add_argument("--saida", metavar="CSV",
                    help="grava a lista de candidatos num CSV")
    args = ap.parse_args()

    if not args.histograma and not args.janela:
        ap.error("escolha --histograma ou --janela INICIO FIM")

    perfis = carregar(args.followers)
    print(f"lidos {br(len(perfis))} seguidores")

    if args.histograma:
        histograma(perfis)

    if args.janela:
        seguindo = set(carregar([args.seguindo])) if args.seguindo else None
        inicio, fim = args.janela
        if inicio > fim:
            sys.exit("erro: a data inicial e posterior a final.")
        extrair(perfis, inicio, fim, seguindo, args.saida)


if __name__ == "__main__":
    main()
