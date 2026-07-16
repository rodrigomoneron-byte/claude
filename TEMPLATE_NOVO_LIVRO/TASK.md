# Fábrica de Livros — [TÍTULO DA SÉRIE], Livro [N] (R.B. Guidenelli)

## Objetivo
Produzir o Livro [N] completo: [N_CAPS] capítulos (~[MIN]–[MAX]k
palavras), fidelidade absoluta ao DNA (references/project_dna.md) e à
bíblia (references/arco-trama-livroN.md), com a cadência de heat e a
régua definidas neste projeto, terminando formatado em EPUB + PDF 6"x9"
KDP.

As skills que escrevem, validam, revisam e formatam ("bia-ferreira-*")
já estão fixadas na raiz deste repositório — não precisam ser
reinstaladas. Só o conteúdo deste projeto (bíblia, DNA, elenco) é novo.

## Gatilho de Disparo
O loop SÓ inicia depois do ONBOARDING: apresentar ao dono as "DECISÕES A
TRAVAR" da bíblia (seção final de arco-trama-livroN.md), gravar as
respostas em PROGRESS.json (campo "decisoes_travadas") e confirmar. Sem
isso, não escrever capítulo nenhum.

## Saída Esperada
- Capítulos em `outputs/conteudo/livroN-capituloNN.md` (01–[N_CAPS])
- Registro de estado em `PROGRESS.json` + `PROGRESS.md`
- Fase final: revisão global + `outputs/final/` com EPUB, PDF, prompt de
  capa (branding R.B. Guidenelli, ver references/branding-rbg.md),
  metadados e relatório

## Escopo e Restrições
- Papéis: Gerente de Projeto, Escritor, Validador, Revisor, Formatador —
  usando as skills da casa (ver LOOP_INSTRUCTIONS.md).
- **DNA:** obedecer rigorosamente references/project_dna.md (régua
  absoluta, cadência de heat, marcas, formato) DESTE projeto — não
  herdar valores de outro livro da casa.
- **Bíblia:** NUNCA contradizer decisões travadas. Mudança de escopo
  (contagem de caps, casal, clímax) = parar e consultar o dono. NUNCA
  decidir sozinho e "vender" depois.
- **Isolamento de universo:** nomes de personagens, mundo e símbolos são
  exclusivos deste projeto — nunca reaproveitar de outro livro da casa.
- **Critério de Parada:** [N_CAPS] capítulos aprovados + revisão global
  aprovada + formatação entregue.

## Política de autonomia
Rodar SEM checkpoint humano entre capítulos. Consultar o dono apenas em:
(a) onboarding, (b) bloqueio estrutural real, (c) fim (entrega).
