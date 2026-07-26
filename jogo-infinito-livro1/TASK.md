# Fábrica de Livros — Jogo Infinito, Livro 1: O Início do Jogo (R.B. Guidenelli)

## Objetivo
Produzir o Livro 1 completo: 60 capítulos (~58-67k palavras),
fidelidade absoluta ao DNA (references/project_dna.md) e à bíblia
(references/arco-trama-livro1.md), com heat 80/20 explícito-elegante e
a régua absoluta, terminando formatado em EPUB + PDF 6"x9" KDP.

As skills que escrevem, validam, revisam e formatam ("bia-ferreira-*")
já estão fixadas na raiz deste repositório — não precisam ser
reinstaladas. Só o conteúdo deste projeto (bíblia, DNA, elenco) é
novo. Nota: `bia-ferreira-chapter-writer` e `bia-ferreira-voice-
validator` trazem exemplos hardcoded do primeiro livro da casa
(Sloane/Auden) — usar só a estrutura/framework delas (7 marcas, mapa
de extensão, régua), nunca os nomes/mundo daquele livro. A voz e o
elenco reais deste projeto vêm de references/project_dna.md e
references/arco-trama-livro1.md.

## Gatilho de Disparo
Onboarding concluído em 2026-07-26 (decisões travadas via
AskUserQuestion + conversa, gravadas em PROGRESS.json e na seção final
de references/arco-trama-livro1.md): núcleo romântico (triângulo,
endgame Cami/Alex), POV dual (Cami/Alex, Dan nunca POV), 5 livros de
série, heat explícito-elegante 80/20, elenco central e sobrenomes
(Alex Voss — não "Stone", por pedido do dono). Loop autorizado a
começar no Capítulo 1.

## Saída Esperada
- Capítulos em `outputs/conteudo/jogo1-capituloNN.md` (01–60)
- Registro de estado em `PROGRESS.json` + `PROGRESS.md`
- Fase final: revisão global + `outputs/final/` com EPUB, PDF, prompt
  de capa (branding R.B. Guidenelli, ver references/branding-rbg.md),
  metadados e relatório

## Escopo e Restrições
- Papéis: Gerente de Projeto, Escritor, Validador, Revisor, Formatador
  — usando as skills genéricas da casa (bia-ferreira-editor-global,
  bia-ferreira-formatter) + a voz definida no project_dna.md DESTE
  projeto (ver nota acima sobre chapter-writer/voice-validator).
- **DNA:** obedecer rigorosamente references/project_dna.md (régua
  absoluta, heat 80/20 explícito-elegante, as 7 marcas próprias deste
  livro, formato) DESTE projeto.
- **Bíblia:** NUNCA contradizer decisões travadas em
  references/arco-trama-livro1.md. Mudança de escopo (contagem de
  caps, casal, clímax, arco da série) = parar e consultar o dono.
- **Isolamento de universo:** nomes de personagens, mundo e símbolos
  são exclusivos deste projeto — nunca reaproveitar de Gelo e Sangue
  ou de "A Mão na Alavanca" (Sloane/Auden).
- **Critério de Parada:** 60 capítulos aprovados + revisão global
  aprovada + formatação entregue. SEM epílogo neste volume (fecha em
  gancho pro Livro 2; o epílogo da série fica reservado ao Livro 5).

## Política de autonomia
Rodar SEM checkpoint humano entre capítulos, seguindo o mesmo padrão
já usado com sucesso nos 3 livros anteriores da casa (Gelo, Sangue,
Raiz): verificar extensão e cadência de heat a cada capítulo, nunca
deixar para uma passada de reforço no final. Consultar o dono apenas
em: (a) bloqueio estrutural real, (b) desvio de meta que a própria
trama não permite resolver sem contradizer a bíblia, (c) marcos de fim
de ato (checkpoint informativo, não pedido de permissão), (d) fim
(entrega).
