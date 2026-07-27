#!/usr/bin/env python3
"""
regua_gate.py — Trava mecânica dura da régua de voz da Bia Ferreira.

Uso:
    python regua_gate.py <arquivo.md> [<arquivo2.md> ...]

Verifica na página (narração + diálogo):
  1) "a gente"            — proibido (a voz usa só "nós"), exceto falsos positivos.
  2) formas obliquas coladas — "pra gente", "da gente", "na gente", "dessa
     gente", "desta gente" (= "para nós", "de nós" etc, mesmo pronome
     proibido). "com a gente" já cai no caso 1 (o "a" é token isolado ali).
  3) device proibido — personagem dizendo "a gente" e sendo "corrigido",
     ou quebra de 4a parede citando "a régua"/a própria gramática do livro.

Saída: lista de hits por arquivo com nº da linha.
Exit code 0 = LIMPO (pode avançar). Exit code 1 = HIT (corrigir antes de avançar).

Observação: "régua" como metáfora diegética (ex.: "a minha própria régua")
é PERMITIDA. O device só é flagado quando "régua"/"a gente" aparece junto de
um verbo de correção/quebra de 4a parede.

## Histórico de bugs corrigidos neste script

- **Bug 1 (form obliqua)**: `\ba gente\b` nunca capturava "pra gente", "da
  gente", "na gente" — porque o "a" ali está colado ao token anterior
  ("pr-a", "d-a", "n-a"), sem fronteira de palavra antes dele. Documentado
  manualmente desde o Livro 2 (exigia um grep extra separado toda vez);
  agora é checagem própria do gate, não depende mais de lembrar de rodar
  outro comando.
- **Bug 2 (quebra de linha)**: a versão anterior verificava linha por
  linha (`text.splitlines()`). Quando "a gente" cai exatamente na quebra
  de linha do markdown (ex.: linha termina em "...mentira, a" e a próxima
  começa "gente aprendeu..."), o regex de linha única nunca via as duas
  palavras juntas — LIMPO falso. Confirmado na produção do Livro 3
  (Jogo Infinito). Corrigido normalizando quebras de linha pra espaço
  antes de buscar, mapeando a posição do match de volta pro número da
  linha original só pra fins de relatório.
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

# Formas obliquas coladas — mesma contração proibida, "a" sem fronteira antes
OBLIQUE_PATTERNS = [
    r"\bpra gente\b", r"\bda gente\b", r"\bna gente\b",
    r"\bdessa gente\b", r"\bdesta gente\b", r"\bduma gente\b", r"\bnuma gente\b",
]

def _line_of(text, pos):
    """Número da linha (1-indexed) correspondente à posição `pos` no texto ORIGINAL."""
    return text.count("\n", 0, pos) + 1

def _line_text(text, pos):
    """Texto da linha original que contém a posição `pos` (pra exibir no relatório)."""
    start = text.rfind("\n", 0, pos) + 1
    end = text.find("\n", pos)
    if end == -1:
        end = len(text)
    return text[start:end].strip()

def find_a_gente(text):
    # normaliza quebras de linha pra espaço SEM mudar o tamanho do texto,
    # assim a posição do match ainda mapeia 1:1 pro texto original (pro
    # cálculo de número de linha) — é isso que resolve o bug da quebra de
    # linha partindo "a gente" ao meio.
    normalized = text.replace("\n", " ")
    low = normalized.lower()
    hits = []
    seen_lines = set()
    for m in re.finditer(r"\ba gente\b", low):
        start = m.start()
        window = low[max(0, start - 12): start + 12]
        if any(w in window for w in WHITELIST):
            continue
        ln = _line_of(text, start)
        if ln in seen_lines:
            continue
        seen_lines.add(ln)
        hits.append((ln, _line_text(text, start)))
    return hits

def find_oblique(text):
    normalized = text.replace("\n", " ")
    low = normalized.lower()
    hits = []
    seen = set()
    for pat in OBLIQUE_PATTERNS:
        for m in re.finditer(pat, low):
            ln = _line_of(text, m.start())
            key = (ln, pat)
            if key in seen:
                continue
            seen.add(key)
            hits.append((ln, _line_text(text, m.start()), pat))
    return hits

def find_device(text):
    normalized = text.replace("\n", " ")
    low = normalized.lower()
    hits = []
    seen = set()
    for pat in DEVICE_PATTERNS:
        for m in re.finditer(pat, low):
            ln = _line_of(text, m.start())
            key = (ln, pat)
            if key in seen:
                continue
            seen.add(key)
            hits.append((ln, _line_text(text, m.start()), pat))
    return hits

def check_file(path):
    with open(path, encoding="utf-8") as f:
        text = f.read()
    ag = find_a_gente(text)
    ob = find_oblique(text)
    dev = find_device(text)
    return ag, ob, dev

def main(argv):
    if len(argv) < 2:
        print("uso: python regua_gate.py <arquivo.md> [...]")
        return 2
    total_hits = 0
    for path in argv[1:]:
        ag, ob, dev = check_file(path)
        if not ag and not ob and not dev:
            print(f"LIMPO  {path}")
            continue
        total_hits += len(ag) + len(ob) + len(dev)
        print(f"HIT    {path}")
        for ln, txt in ag:
            print(f"  [a gente] linha {ln}: {txt[:110]}")
        for ln, txt, pat in ob:
            print(f"  [forma oblíqua] linha {ln} (~{pat}): {txt[:110]}")
        for ln, txt, pat in dev:
            print(f"  [device] linha {ln} (~{pat}): {txt[:100]}")
    print("")
    print(f"RESULTADO: {'LIMPO — pode avançar' if total_hits == 0 else f'{total_hits} hit(s) — CORRIGIR antes de avançar'}")
    return 0 if total_hits == 0 else 1

if __name__ == "__main__":
    sys.exit(main(sys.argv))
