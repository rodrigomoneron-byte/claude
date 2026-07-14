#!/usr/bin/env python3
"""
regua_gate.py — Trava mecânica dura da régua de voz da Bia Ferreira.

Uso:
    python regua_gate.py <arquivo.md> [<arquivo2.md> ...]

Verifica DUAS coisas na página (narração + diálogo):
  1) "a gente"  — proibido (a voz usa só "nós"), exceto falsos positivos.
  2) device proibido — personagem dizendo "a gente" e sendo "corrigido",
     ou quebra de 4a parede citando "a régua"/a própria gramática do livro.

Saída: lista de hits por arquivo com nº da linha.
Exit code 0 = LIMPO (pode avançar). Exit code 1 = HIT (corrigir antes de avançar).

Observação: "régua" como metáfora diegética (ex.: "a minha própria régua")
é PERMITIDA. O device só é flagado quando "régua"/"a gente" aparece junto de
um verbo de correção/quebra de 4a parede.
"""
import sys
import re

# Falsos positivos legítimos de "... gente" (não são "a gente" = we)
WHITELIST = [
    "esta gente", "essa gente", "pouca gente", "muita gente", "toda gente",
    "certa gente", "tanta gente", "outra gente", "boa gente", "nome de gente",
    "contra gente", "trata gente", "aquela gente", "pela gente comum",
    "gente como", "gente que", "gente de", "gente da", "gente do",
]

# Padrões de device proibido (quebra de 4a parede / autocorreção da régua)
DEVICE_PATTERNS = [
    r"n[ãa]o (deveria|devia) dizer .?a gente",
    r"a gente.*?(—|-|,).{0,40}(quer dizer|ou melhor|corrig|n[ãa]o,?\s*n[óo]s)",
    r"(quer dizer|ou melhor|corrijo|me corrijo).{0,20}n[óo]s",
    r"(a|essa|aquela) r[ée]gua (dela|do livro|da voz|da autora)",
    r"que r[ée]gua",
    r"nem corrijo",
]

def find_a_gente(text):
    hits = []
    for i, line in enumerate(text.splitlines(), 1):
        low = line.lower()
        # todas as ocorrências de "a gente" na linha
        for m in re.finditer(r"\ba gente\b", low):
            start = m.start()
            # janela ao redor para checar whitelist
            window = low[max(0, start - 12): start + 12]
            if any(w in window for w in WHITELIST):
                continue
            # "a gente" precedido de artigo/nome que forma falso positivo raro
            hits.append((i, line.strip()))
            break  # 1 hit por linha basta para sinalizar
    return hits

def find_device(text):
    hits = []
    for i, line in enumerate(text.splitlines(), 1):
        low = line.lower()
        for pat in DEVICE_PATTERNS:
            if re.search(pat, low):
                hits.append((i, line.strip(), pat))
                break
    return hits

def check_file(path):
    with open(path, encoding="utf-8") as f:
        text = f.read()
    ag = find_a_gente(text)
    dev = find_device(text)
    return ag, dev

def main(argv):
    if len(argv) < 2:
        print("uso: python regua_gate.py <arquivo.md> [...]")
        return 2
    total_hits = 0
    for path in argv[1:]:
        ag, dev = check_file(path)
        if not ag and not dev:
            print(f"LIMPO  {path}")
            continue
        total_hits += len(ag) + len(dev)
        print(f"HIT    {path}")
        for ln, txt in ag:
            print(f"  [a gente] linha {ln}: {txt[:110]}")
        for ln, txt, pat in dev:
            print(f"  [device] linha {ln} (~{pat}): {txt[:100]}")
    print("")
    print(f"RESULTADO: {'LIMPO — pode avançar' if total_hits == 0 else f'{total_hits} hit(s) — CORRIGIR antes de avançar'}")
    return 0 if total_hits == 0 else 1

if __name__ == "__main__":
    sys.exit(main(sys.argv))
