# Como rodar a Fábrica do Livro 3 no Claude Code
### Pacote de arranque — série "A Mão na Alavanca" · R.B. Guidenelli

## O que é isto
Um projeto pronto para o Claude Code produzir o Livro 3 de forma
realmente autônoma (processo persistente — sem precisar de um "seguir"
humano a cada lote, que era o limite do chat). Framework de 4 arquivos:
TASK.md (constituição) · LOOP_INSTRUCTIONS.md (manual por iteração) ·
PROGRESS.json/md (estado) · references/ (DNA, bíblia, mundo, branding).

## Passo 1 — Preparar a pasta do projeto
```bash
mkdir livro3 && cd livro3
unzip livro3-claude-code-starter.zip -d .
```

## Passo 2 — Instalar as skills da casa
Os arquivos .skill (deste mesmo pacote de entregas: chapter-writer,
voice-validator, editor-global, formatter, loop) são ZIPs. No Claude
Code, skills vivem em `.claude/skills/` do projeto:
```bash
mkdir -p .claude/skills
for f in caminho/para/*.skill; do unzip -o "$f" -d .claude/skills/; done
ls .claude/skills/   # deve listar as 5 pastas bia-ferreira-*
```
(Os nomes internos "bia-ferreira-*" são legado; a voz é a mesma e o
formatter já assina R.B. Guidenelli. Renomear é opcional.)

## Passo 3 — Permissões (IMPORTANTE: evita ficar aprovando comando a comando)
O Claude Code, por padrão, pede permissão para CADA comando de shell —
o que mata a autonomia do loop. Para a fábrica, inicie assim, DENTRO da
pasta do projeto:

    claude --dangerously-skip-permissions

Aceite o aviso único da primeira vez. A partir daí o loop roda sem
prompts. Seguro aqui porque a pasta é isolada (só markdown + scripts).
Não rode o terminal como Administrador. Alternativa com mais fricção:
.claude/settings.json com permissions.allow (["Bash(python *)", ...]) e
defaultMode "acceptEdits" — mas comandos com pipe ainda podem pedir
confirmação (bug conhecido), então para autonomia total use o flag.
Dica: Shift+Tab cicla modos numa sessão; /permissions abre a UI de regras.

## Passo 4 — Iniciar
Abra o Claude Code na pasta (com o flag acima) e cole o prompt inicial:

---
Leia TASK.md, LOOP_INSTRUCTIONS.md, PROGRESS.json e a pasta references/
(sobretudo arco-trama-livro3.md e project_dna.md). Este projeto produz o
Livro 3 da série "A Mão na Alavanca" (R.B. Guidenelli).

PRIMEIRO: rode o ONBOARDING — me apresente as "DECISÕES A TRAVAR" da
bíblia, uma a uma, e grave minhas respostas em PROGRESS.json
("decisoes_travadas"). NÃO escreva nenhum capítulo antes disso.

DEPOIS: rode o loop conforme LOOP_INSTRUCTIONS.md — capítulo a capítulo,
sem me consultar entre capítulos, validando cada um com
scripts/regua_gate.py antes de registrar com scripts/loop_state.py.
Só me chame em bloqueio estrutural real ou nos marcos definidos.
Critério de parada: 67 capítulos aprovados + revisão global + formatação.
---

## Passo 5 — Acompanhar
- `cat PROGRESS.md` → placar legível a qualquer momento
- `outputs/conteudo/` → capítulos saindo
- Marcos automáticos nos fins de ato (14/32/48): mini-auditoria interna
- `outputs/final/` → EPUB + PDF + capa + metadados no fim

## Avisos herdados dos Livros 1 e 2 (importam!)
1. **Régua**: o vazamento nº 1 é "a gente" em diálogo de personagem
   popular. O gate pega, mas o writer deve varrer antes. O "device"
   (personagem se autocorrigindo) é proibido — remover inteiro, não trocar
   palavra.
2. **Heat 80/20**: nos dois livros anteriores o modelo entregou heat
   abaixo da cota na primeira passada. Monitorar POR CAPÍTULO (a regra
   está no project_dna.md e no LOOP_INSTRUCTIONS.md).
3. **Escopo**: no L2 o modelo comprimiu o clímax para o cap 40 e propôs
   encurtar o livro. NÃO repetir: a bíblia manda; deriva de escopo = parar
   e reportar, nunca decidir sozinho.
4. **ISBN**: os metadados saem com placeholder urn:uuid — trocar pelo
   ISBN real antes de publicar.
