#!/usr/bin/env python3
"""
loop_state.py — Estado da máquina do loop em JSON (fonte de verdade).

Corrige o bug do orquestrador genérico (que lia o estado num formato de
Markdown e escrevia noutro). Aqui o estado é JSON; o PROGRESS.md legível é
apenas uma renderização.

Comandos:
  init   <proj> --book "A Última Liberdade" --target 67 --first-pov Sloane
                [--word-target 90000] [--heat-target 12] [--max-heat-gap 6]
                [--first-heat-by 6]
  next   <proj>
  record <proj> --n 5 --pov Auden --words 1180 --score 7 --status aprovado
                 [--ressalva "texto"] [--heat yes|no]
  check  <proj>  — checkpoint de cadência (extensão + heat). Rode a cada
                    capítulo (ou no mínimo a cada 5) — NÃO só no fim do
                    livro. Imprime avisos acionáveis se o ritmo real
                    estiver atrasado em relação à meta travada no init.
  show   <proj>

Alternância de POV: default Sloane/Auden. Ajuste --povs "Cassius,Wren" no init
para o Livro 2.

## Por que o comando `check` existe

Histórico do catálogo: TODOS os livros já produzidos por esse pipeline
precisaram de um passe de "reforço" pós-produção pra bater a extensão-alvo
e/ou a cadência de heat, porque o único ponto em que esses dois eixos eram
verificados era a revisão editorial global, no FINAL do livro — tarde
demais pra corrigir sem reforço artificial. `check` fecha esse buraco:
roda o mesmo cálculo de ritmo a qualquer momento durante a produção,
capítulo a capítulo, pra que o desvio seja corrigido nos PRÓXIMOS
capítulos (extensão maior, cena de heat planejada), nunca só no final.
"""
import sys, os, json, argparse, math
from datetime import datetime

STATE = "PROGRESS.json"
MD = "PROGRESS.md"

def _path(proj):
    return os.path.join(proj, STATE)

def load(proj):
    with open(_path(proj), encoding="utf-8") as f:
        return json.load(f)

def save(proj, st):
    with open(_path(proj), "w", encoding="utf-8") as f:
        json.dump(st, f, ensure_ascii=False, indent=2)
    render_md(proj, st)

def other_pov(st, pov):
    a, b = st["povs"]
    return b if pov == a else a

def render_md(proj, st):
    sb = st["scoreboard"]
    lines = [
        f"# Progresso do Loop — {st['book']}",
        "",
        "## Estado atual",
        f"- Status: {st['status']}",
        f"- Capítulos concluídos: {sb['chapters_done']} / {st['target']}",
        f"- Próximo: Capítulo {st['next_chapter']} (POV {st['next_pov']})",
        f"- Última atualização: {st['updated']}",
        "",
        "## Placar",
        f"- Palavras: {sb['total_words']}",
        f"- Páginas KDP (~palavras/300): {sb['pages_kdp']}",
        f"- Score médio: {sb['avg_score']}",
        f"- Meta de palavras: {st.get('word_target','-')} "
        f"({sb['pct_to_target']}%)" if st.get("word_target") else "",
        f"- Cenas de heat: {sb.get('heat_scenes_done', 0)}"
        + (f" / meta {st.get('heat_target')}" if st.get("heat_target") else "")
        + (f" (última no cap. {sb['last_heat_chapter']})" if sb.get("last_heat_chapter") else " (nenhuma ainda)"),
        "",
        "## Capítulos com ressalva (refinar no final)",
    ]
    ress = [c for c in st["chapters"] if c.get("ressalva")]
    if ress:
        for c in ress:
            lines.append(f"- Cap. {c['n']}: {c['ressalva']}")
    else:
        lines.append("- Nenhum.")
    lines += ["", "## Bloqueios"]
    if st.get("blocks"):
        for b in st["blocks"]:
            lines.append(f"- {b}")
    else:
        lines.append("- Nenhum.")
    with open(os.path.join(proj, MD), "w", encoding="utf-8") as f:
        f.write("\n".join([l for l in lines if l is not None]) + "\n")

def cmd_init(args):
    povs = [p.strip() for p in args.povs.split(",")] if args.povs else ["Sloane", "Auden"]
    first = args.first_pov or povs[0]
    st = {
        "book": args.book,
        "target": args.target,
        "word_target": args.word_target,
        "heat_target": args.heat_target,
        "max_heat_gap": args.max_heat_gap,
        "first_heat_by": args.first_heat_by,
        "povs": povs,
        "status": "Em andamento",
        "next_chapter": 1,
        "next_pov": first,
        "updated": datetime.now().strftime("%Y-%m-%d %H:%M"),
        "chapters": [],
        "blocks": [],
        "scoreboard": {"chapters_done": 0, "total_words": 0, "pages_kdp": 0,
                        "avg_score": 0, "pct_to_target": 0,
                        "heat_scenes_done": 0, "last_heat_chapter": None},
    }
    os.makedirs(args.proj, exist_ok=True)
    save(args.proj, st)
    msg = f"Loop iniciado: {args.book} — alvo {args.target} caps, POVs {povs}, começando por {first}."
    if args.heat_target:
        msg += f" Meta de heat: {args.heat_target} cenas, gap máx. {args.max_heat_gap} caps, 1ª cena até cap. {args.first_heat_by}."
    print(msg)

def cmd_next(args):
    st = load(args.proj)
    if st["scoreboard"]["chapters_done"] >= st["target"]:
        print("CRITÉRIO DE PARADA ATINGIDO — seguir para revisão global + formatação.")
    else:
        print(f"Próxima ação: ESCREVER Capítulo {st['next_chapter']} (POV {st['next_pov']}).")

def cmd_record(args):
    st = load(args.proj)

    # PISO DURO por capítulo — corrige o padrão que gerou reforço em TODOS
    # os livros anteriores: o checkpoint de cadência (_print_check) só
    # avisa depois que o déficit já se acumulou, o que na prática nunca foi
    # suficiente pra impedir capítulos curtos de serem registrados como
    # prontos. Este piso bloqueia o REGISTRO do capítulo individual (não
    # só avisa) se ele vier abaixo de ~85% da média-alvo por capítulo,
    # forçando expandir AGORA, no mesmo turno, em vez de empilhar dívida
    # pra um passe de reforço no final.
    word_target = st.get("word_target")
    target = st.get("target")
    if word_target and target and not args.ressalva:
        floor = math.floor(word_target / target * 0.85)
        if args.words < floor:
            print(f"\n🛑 PISO DE EXTENSÃO NÃO ATINGIDO — capítulo NÃO registrado.")
            print(f"  Cap. {args.n}: {args.words} palavras, piso mínimo {floor} "
                  f"(85% da média-alvo de {round(word_target/target)} palavras/capítulo).")
            print(f"  Expanda o capítulo AGORA, neste turno, antes de registrar — "
                  f"não deixe para um passe de reforço no final.")
            print(f"  Se este capítulo específico tem motivo estrutural legítimo pra "
                  f"ser mais curto (ex: clímax rápido, transição), registre de novo "
                  f"com --ressalva explicando o motivo.")
            sys.exit(3)

    ch = {"n": args.n, "pov": args.pov, "words": args.words,
          "score": args.score, "status": args.status,
          "heat": bool(args.heat and args.heat.lower() in ("yes", "sim", "true", "1"))}
    if args.ressalva:
        ch["ressalva"] = args.ressalva
    # substitui se já existir (revisão), senão adiciona
    st["chapters"] = [c for c in st["chapters"] if c["n"] != args.n] + [ch]
    st["chapters"].sort(key=lambda c: c["n"])
    done = len(st["chapters"])
    tw = sum(c["words"] for c in st["chapters"])
    scores = [c["score"] for c in st["chapters"] if isinstance(c["score"], (int, float))]
    avg = round(sum(scores) / len(scores), 2) if scores else 0
    heat_chapters = [c["n"] for c in st["chapters"] if c.get("heat")]
    st["scoreboard"] = {
        "chapters_done": done,
        "total_words": tw,
        "pages_kdp": round(tw / 300),
        "avg_score": avg,
        "pct_to_target": round(tw * 100 / st["word_target"]) if st.get("word_target") else 0,
        "heat_scenes_done": len(heat_chapters),
        "last_heat_chapter": max(heat_chapters) if heat_chapters else None,
    }
    st["next_chapter"] = args.n + 1
    st["next_pov"] = other_pov(st, args.pov)
    st["updated"] = datetime.now().strftime("%Y-%m-%d %H:%M")
    if done >= st["target"]:
        st["status"] = "Manuscrito completo — revisão/formatação pendentes"
    save(args.proj, st)
    sb = st["scoreboard"]
    print(f"Cap. {args.n} ({args.pov}) registrado: {args.words} palavras, score {args.score}, {args.status}"
          + (", COM cena de heat" if ch["heat"] else "") + ".")
    print(f"Placar: {sb['chapters_done']}/{st['target']} caps | {sb['total_words']} palavras | ~{sb['pages_kdp']} págs | média {sb['avg_score']} | próximo: cap {st['next_chapter']} ({st['next_pov']}).")
    # roda o checkpoint automaticamente a cada registro — barato, e é
    # exatamente o hábito que faltava (só checar isso no editor-global, no
    # final, é tarde demais pra corrigir sem reforço artificial depois).
    _print_check(st)

def _print_check(st):
    sb = st["scoreboard"]
    target = st["target"]
    done = sb["chapters_done"]
    warnings = []

    word_target = st.get("word_target")
    if word_target and done > 0:
        expected = word_target * done / target
        actual = sb["total_words"]
        pct_of_pace = round(actual * 100 / expected) if expected else 100
        if pct_of_pace < 90:
            remaining = target - done
            deficit = word_target - actual
            needed_avg = round(deficit / remaining) if remaining > 0 else 0
            warnings.append(
                f"ATRASO DE EXTENSÃO: no ritmo de {pct_of_pace}% da meta "
                f"(esperado ~{round(expected)} palavras até aqui, real {actual}). "
                + (f"Pra fechar em {word_target} até o cap. {target}, os próximos "
                   f"{remaining} capítulos precisam sair com média de ~{needed_avg} "
                   f"palavras (maior que o normal) até o ritmo se recuperar."
                   if remaining > 0 else "Livro já devia ter fechado a meta.")
            )

    heat_target = st.get("heat_target")
    if heat_target and done > 0:
        expected_heat = heat_target * done / target
        actual_heat = sb["heat_scenes_done"]
        if actual_heat < math.floor(expected_heat) - 1:
            warnings.append(
                f"ATRASO DE CADÊNCIA DE HEAT: {actual_heat} cena(s) feita(s), "
                f"esperado ~{round(expected_heat, 1)} nesse ponto do livro "
                f"(meta {heat_target} em {target} capítulos). Considere planejar "
                f"uma cena nos próximos capítulos, se a trama permitir "
                f"(nunca force cena onde o beat não sustenta — mas registre a "
                f"decisão de adiar como escolha consciente, não deixe o "
                f"atraso só acumular em silêncio)."
            )

        max_gap = st.get("max_heat_gap")
        last_heat = sb.get("last_heat_chapter")
        gap = done - (last_heat or 0)
        if max_gap and gap > max_gap:
            warnings.append(
                f"GAP DE HEAT EXCEDIDO: {gap} capítulos desde a última cena "
                f"(cap. {last_heat or 'nenhum ainda'}), acima do máximo definido "
                f"({max_gap}). Avalie os próximos capítulos pra encaixar oportunidade real."
            )

        first_heat_by = st.get("first_heat_by")
        if first_heat_by and actual_heat == 0 and done >= first_heat_by:
            warnings.append(
                f"PRIMEIRA CENA DE HEAT ATRASADA: nenhuma cena ainda no cap. {done}, "
                f"a meta era ter a primeira até o cap. {first_heat_by}."
            )

    if warnings:
        print("\n⚠️  CHECKPOINT DE CADÊNCIA — AÇÃO NECESSÁRIA:")
        for w in warnings:
            print(f"  - {w}")
    elif word_target or heat_target:
        print("\n✅ CHECKPOINT DE CADÊNCIA: ritmo de extensão e heat dentro da meta.")

def cmd_check(args):
    st = load(args.proj)
    _print_check(st)

def cmd_show(args):
    st = load(args.proj)
    print(json.dumps(st["scoreboard"], ensure_ascii=False, indent=2))

def main():
    p = argparse.ArgumentParser()
    sub = p.add_subparsers(dest="cmd", required=True)
    pi = sub.add_parser("init"); pi.add_argument("proj"); pi.add_argument("--book", required=True)
    pi.add_argument("--target", type=int, required=True); pi.add_argument("--word-target", type=int, default=0, dest="word_target")
    pi.add_argument("--heat-target", type=int, default=0, dest="heat_target")
    pi.add_argument("--max-heat-gap", type=int, default=6, dest="max_heat_gap")
    pi.add_argument("--first-heat-by", type=int, default=6, dest="first_heat_by")
    pi.add_argument("--first-pov", dest="first_pov"); pi.add_argument("--povs")
    pi.set_defaults(func=cmd_init)
    pn = sub.add_parser("next"); pn.add_argument("proj"); pn.set_defaults(func=cmd_next)
    pr = sub.add_parser("record"); pr.add_argument("proj")
    pr.add_argument("--n", type=int, required=True); pr.add_argument("--pov", required=True)
    pr.add_argument("--words", type=int, required=True); pr.add_argument("--score", type=float, required=True)
    pr.add_argument("--status", default="aprovado"); pr.add_argument("--ressalva")
    pr.add_argument("--heat", default="no")
    pr.set_defaults(func=cmd_record)
    pc = sub.add_parser("check"); pc.add_argument("proj"); pc.set_defaults(func=cmd_check)
    ps = sub.add_parser("show"); ps.add_argument("proj"); ps.set_defaults(func=cmd_show)
    args = p.parse_args()
    args.func(args)

if __name__ == "__main__":
    main()
