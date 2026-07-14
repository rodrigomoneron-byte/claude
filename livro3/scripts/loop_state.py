#!/usr/bin/env python3
"""
loop_state.py — Estado da máquina do loop em JSON (fonte de verdade).

Corrige o bug do orquestrador genérico (que lia o estado num formato de
Markdown e escrevia noutro). Aqui o estado é JSON; o PROGRESS.md legível é
apenas uma renderização.

Comandos:
  init   <proj> --book "A Última Liberdade" --target 67 --first-pov Sloane
  next   <proj>
  record <proj> --n 5 --pov Auden --words 1180 --score 7 --status aprovado
                 [--ressalva "texto"]
  show   <proj>

Alternância de POV: default Sloane/Auden. Ajuste --povs "Cassius,Wren" no init
para o Livro 2.
"""
import sys, os, json, argparse
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
        "povs": povs,
        "status": "Em andamento",
        "next_chapter": 1,
        "next_pov": first,
        "updated": datetime.now().strftime("%Y-%m-%d %H:%M"),
        "chapters": [],
        "blocks": [],
        "scoreboard": {"chapters_done": 0, "total_words": 0, "pages_kdp": 0,
                        "avg_score": 0, "pct_to_target": 0},
    }
    os.makedirs(args.proj, exist_ok=True)
    save(args.proj, st)
    print(f"Loop iniciado: {args.book} — alvo {args.target} caps, POVs {povs}, começando por {first}.")

def cmd_next(args):
    st = load(args.proj)
    if st["scoreboard"]["chapters_done"] >= st["target"]:
        print("CRITÉRIO DE PARADA ATINGIDO — seguir para revisão global + formatação.")
    else:
        print(f"Próxima ação: ESCREVER Capítulo {st['next_chapter']} (POV {st['next_pov']}).")

def cmd_record(args):
    st = load(args.proj)
    ch = {"n": args.n, "pov": args.pov, "words": args.words,
          "score": args.score, "status": args.status}
    if args.ressalva:
        ch["ressalva"] = args.ressalva
    # substitui se já existir (revisão), senão adiciona
    st["chapters"] = [c for c in st["chapters"] if c["n"] != args.n] + [ch]
    st["chapters"].sort(key=lambda c: c["n"])
    done = len(st["chapters"])
    tw = sum(c["words"] for c in st["chapters"])
    scores = [c["score"] for c in st["chapters"] if isinstance(c["score"], (int, float))]
    avg = round(sum(scores) / len(scores), 2) if scores else 0
    st["scoreboard"] = {
        "chapters_done": done,
        "total_words": tw,
        "pages_kdp": round(tw / 300),
        "avg_score": avg,
        "pct_to_target": round(tw * 100 / st["word_target"]) if st.get("word_target") else 0,
    }
    st["next_chapter"] = args.n + 1
    st["next_pov"] = other_pov(st, args.pov)
    st["updated"] = datetime.now().strftime("%Y-%m-%d %H:%M")
    if done >= st["target"]:
        st["status"] = "Manuscrito completo — revisão/formatação pendentes"
    save(args.proj, st)
    sb = st["scoreboard"]
    print(f"Cap. {args.n} ({args.pov}) registrado: {args.words} palavras, score {args.score}, {args.status}.")
    print(f"Placar: {sb['chapters_done']}/{st['target']} caps | {sb['total_words']} palavras | ~{sb['pages_kdp']} págs | média {sb['avg_score']} | próximo: cap {st['next_chapter']} ({st['next_pov']}).")

def cmd_show(args):
    st = load(args.proj)
    print(json.dumps(st["scoreboard"], ensure_ascii=False, indent=2))

def main():
    p = argparse.ArgumentParser()
    sub = p.add_subparsers(dest="cmd", required=True)
    pi = sub.add_parser("init"); pi.add_argument("proj"); pi.add_argument("--book", required=True)
    pi.add_argument("--target", type=int, required=True); pi.add_argument("--word-target", type=int, default=0, dest="word_target")
    pi.add_argument("--first-pov", dest="first_pov"); pi.add_argument("--povs")
    pi.set_defaults(func=cmd_init)
    pn = sub.add_parser("next"); pn.add_argument("proj"); pn.set_defaults(func=cmd_next)
    pr = sub.add_parser("record"); pr.add_argument("proj")
    pr.add_argument("--n", type=int, required=True); pr.add_argument("--pov", required=True)
    pr.add_argument("--words", type=int, required=True); pr.add_argument("--score", type=float, required=True)
    pr.add_argument("--status", default="aprovado"); pr.add_argument("--ressalva")
    pr.set_defaults(func=cmd_record)
    ps = sub.add_parser("show"); ps.add_argument("proj"); ps.set_defaults(func=cmd_show)
    args = p.parse_args()
    args.func(args)

if __name__ == "__main__":
    main()
