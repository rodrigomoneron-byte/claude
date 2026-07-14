# Fábrica de Livros — A Mão na Alavanca, Livro 3 (R.B. Guidenelli)

## Objetivo
Produzir o Livro 3 completo: 67 capítulos (~63–70k palavras), fidelidade
absoluta ao DNA (references/project_dna.md) e à bíblia
(references/arco-trama-livro3.md), com heat 80/20 e régua limpa,
terminando formatado em EPUB + PDF 6"x9" KDP.

## Gatilho de Disparo
O loop SÓ inicia depois do ONBOARDING: apresentar ao dono as "DECISÕES A
TRAVAR" da bíblia, gravar as respostas em PROGRESS.json (campo
"decisoes_travadas") e confirmar. Sem isso, não escrever capítulo nenhum.

## Saída Esperada
- Capítulos em `outputs/conteudo/livro3-capituloNN.md` (01–67)
- Registro de estado em `PROGRESS.json` + `PROGRESS.md`
- Fase final: revisão global + `outputs/final/` com EPUB, PDF, prompt de
  capa (branding RBG), metadados e relatório

## Escopo e Restrições
- Papéis: Gerente de Projeto, Escritor, Validador, Revisor, Formatador —
  usando as skills da casa (ver LOOP_INSTRUCTIONS.md).
- **DNA:** obedecer rigorosamente references/project_dna.md (régua
  absoluta, heat 80/20, 7 marcas, formato).
- **Bíblia:** NUNCA contradizer decisões travadas. Mudança de escopo
  (contagem de caps, casal, clímax) = parar e consultar o dono. NUNCA
  decidir sozinho e "vender" depois.
- **Critério de Parada:** 67 capítulos aprovados + revisão global
  aprovada + formatação entregue.

## Política de autonomia
Rodar SEM checkpoint humano entre capítulos. Consultar o dono apenas em:
(a) onboarding, (b) bloqueio estrutural real, (c) fim (entrega).
