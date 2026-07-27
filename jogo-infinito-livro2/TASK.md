# Fábrica de Livros — Jogo Infinito, Livro 2: Alianças e Traições (R.B. Guidenelli)

## Objetivo
Produzir o Livro 2 completo: 60 capítulos (~58-67k palavras),
fidelidade absoluta ao DNA (references/project_dna.md) e à bíblia
(references/arco-trama-livro2.md), com heat 80/20 explícito-elegante e
a régua absoluta, terminando formatado em EPUB + PDF 6"x9" KDP.

As skills genéricas da casa (bia-ferreira-editor-global,
bia-ferreira-formatter) já estão fixadas na raiz do repositório. Nota:
`bia-ferreira-chapter-writer` e `bia-ferreira-voice-validator` trazem
exemplos hardcoded do primeiro livro da casa (Sloane/Auden) — usar só
a estrutura/framework delas (7 marcas, mapa de extensão, régua), nunca
os nomes/mundo daquele livro. A voz e o elenco reais deste projeto
vêm de references/project_dna.md e references/arco-trama-livro2.md.

## Gatilho de Disparo
Onboarding concluído em 2026-07-27 (decisões novas travadas via
AskUserQuestion, gravadas em PROGRESS.json e na seção final de
references/arco-trama-livro2.md): papel de Alexandra Voss Whitfield
(antagonista disfarçada de aliada), traição interna de Patricia, salto
de tempo curto desde o Livro 1. Decisões de nível-série (POV, heat,
régua, extensão, elenco central) herdadas do Livro 1 sem retravamento.
Loop autorizado a começar no Capítulo 1.

## Saída Esperada
- Capítulos em `outputs/conteudo/jogo2-capituloNN.md` (01–60)
- Registro de estado em `PROGRESS.json` + `PROGRESS.md`
- Fase final: revisão global + `outputs/final/` com EPUB, PDF, prompt
  de capa (branding R.B. Guidenelli, ver references/branding-rbg.md),
  metadados e relatório

## Escopo e Restrições
- **DNA:** obedecer rigorosamente references/project_dna.md DESTE
  projeto — inclui a lição explícita do Livro 1: escrever cada
  capítulo já na extensão-alvo (~950-1100 palavras), nunca deixar
  reforço para depois.
- **Bíblia:** NUNCA contradizer decisões travadas em
  references/arco-trama-livro2.md nem fatos canônicos herdados do
  Livro 1 (ver references/mundo-personagens-livro2.md, seção "Fatos
  herdados"). Mudança de escopo = parar e consultar o dono.
- **Isolamento de universo:** nomes/mundo/símbolos exclusivos desta
  série — nunca reaproveitar de Gelo e Sangue ou de "A Mão na
  Alavanca" (Sloane/Auden).
- **Critério de Parada:** 60 capítulos aprovados + revisão global
  aprovada + formatação entregue. SEM epílogo (reservado ao Livro 5).

## Política de autonomia
Rodar SEM checkpoint humano entre capítulos, seguindo o padrão já
usado com sucesso nos 4 livros anteriores da casa. Verificar extensão
e cadência de heat a cada capítulo — a lição do Livro 1 é medir
`wc -w` e expandir ANTES de registrar, não depois. Consultar o dono
apenas em: (a) bloqueio estrutural real, (b) desvio de meta que a
própria trama não permite resolver sem contradizer a bíblia, (c)
marcos de fim de ato (checkpoint informativo), (d) fim (entrega).
