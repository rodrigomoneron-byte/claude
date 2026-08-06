# DNA do Projeto — Elite de Cambridge, Livro 3 (R.B. Guidenelli)

> Preenchido no onboarding em 2026-08-06. Terceiro livro da série,
> novo par de rivais (Medicina/Harvard Medical School) — decisão de
> par/departamento tomada como DEFAULT ASSUMIDO (usuário não respondeu
> à pergunta de escolha; opção recomendada, já sugerida na própria
> bíblia do Livro 1). Elenco novo, sem protagonismo dos elencos dos
> Livros 1-2 (cameo cruzado opcional apenas).

## 0. Pseudônimo e branding
- Autor público: **R.B. Guidenelli**, mesma casa multi-série.
- Capa: nova, tom a definir na formatação — sugestão "elite médica"
  (branco clínico + azul frio de hospital + toque quente de luz de
  plantão noturno) — DIFERENTE da capa "dark/light academia" do Livro
  1 e da capa "elite jurídica" (mármore/madeira) do Livro 2.

## 1. Estilo e Voz — marcas específicas desta série (herdadas, sem mudança)
1. Competência como flerte — aqui, leitura clínica/diagnóstico em
   tempo real como forma de sedução intelectual.
2. Sarcasmo/humor como escudo compartilhado (alívio de tensão em
   plantão pesado).
3. Slow burn medido em proximidade forçada — aqui, os plantões de 24h
   repetidos são a proximidade forçada estrutural do livro inteiro,
   não só de um ato.
4. Rivalidade acadêmica/profissional que é atração disfarçada.
5. O jogo tem preço estrutural visível — aqui, vaga única de
   fellowship de pesquisa clínica no fim do ano (adaptação do "preço"
   dos livros anteriores).
6. Humor afiado como blindagem intelectual/emocional.
7. Capítulo fecha no gesto que reabre o jogo.

## 2. RÉGUA ABSOLUTA (trava mecânica — regua_gate.py) — NÃO MUDA
- SÓ "nós", NUNCA "a gente" — narração e diálogo, qualquer registro.
- `regua_gate.py` + grep manual em todo capítulo antes de registrar.
- VIGILÂNCIA MÁXIMA: em TODOS os livros anteriores da série (L1 e L2),
  o device proibido de autocorreção ("a gente— nós") apareceu
  recorrentemente em quase todos os atos, mesmo com aviso explícito
  repetido em cada prompt — tratar como certeza estatística de que vai
  aparecer no rascunho, não como risco hipotético; releitura literal
  obrigatória antes de rodar o gate em CADA capítulo.

## 3. CHECKPOINT DE CADÊNCIA E PROCESSO DE ESCRITA
Conclusão acumulada de 5 livros anteriores (Família Bittencourt x3 +
Elite de Cambridge L1-L2): taxa de expansão de emergência entre
89-100% em praticamente todos os atos — só a trava dura no
`loop_state.py record` funciona de forma confiável. O Livro 1 fechou
abaixo do piso total e precisou de reforço extra pós-fechamento; o
Livro 2 fechou dentro da faixa (55.646-58.751 dependendo do método de
contagem) só porque os agentes miraram ativamente o topo da faixa nos
capítulos finais — CONTINUAR essa prática desde o INÍCIO deste Livro 3
(não só nos atos finais), para reduzir ainda mais a chance de precisar
de reforço. Não inventar nova técnica experimental além disso.

**Nota técnica sobre contagem de palavras**: o formatador do Livro 2
descobriu que `wc -w` pode subcontar palavras acentuadas em UTF-8
dependendo do locale do sistema (divergência observada de até ~3%).
Ao verificar contagens críticas (decisão de registrar ou não um
capítulo, checagem de piso), preferir `python3 -c "print(len(open(f).read().split()))"`
ou equivalente, especialmente se `wc -w` parecer inconsistente com a
extensão visual do texto.

## 4. Cadência de heat
- ~10-12 cenas, explícito-elegante, mesmo registro dos livros
  anteriores.
- Primeira cena até o cap. 10.
- Gap máximo 6 capítulos — CONTAR MANUALMENTE desde o primeiro
  capítulo (o Livro 2 fechou com só 8 cenas, abaixo da meta, apesar do
  aviso; reforçar a contagem manual desde o início do Ato 1, não só
  perto do fim).
- Primeiro momento de intimidade real sugerido para um congresso
  médico fora de Boston OU para uma noite de plantão especialmente
  intensa no Ato 2 (decidir na escrita, conforme fizer mais sentido
  dramático) — equivalente às "viagens" dos livros anteriores.

## 5. Formato
- ~55-58 capítulos, POV dual — Camila (ímpar) / Rafael (par), primeira
  pessoa do presente.
- Extensão: 950-1100 palavras/capítulo, total ~55.000-58.000 palavras
  — MIRAR TOPO DA FAIXA desde o Ato 1.
- Sem epílogo (mesma lógica dos livros anteriores).

## 6. Pipeline operacional
1. ESCREVER (bia-ferreira-chapter-writer) — processo de 2 chamadas
   padrão, mirando topo da faixa desde o início.
2. RÉGUA (regua_gate.py) — trava dura.
3. VALIDAR (bia-ferreira-voice-validator) — score /7 contra as marcas
   desta série (seção 1).
4. Falha não-estrutural → auto-revisar (máx. 2) → aprovado com ressalva.
5. REGISTRAR (loop_state.py record) — trava dura.
6. Repetir até completar os capítulos.
7. bia-ferreira-editor-global — atenção a: nenhum vazamento de nome/
   fato de outra série da casa (incluindo os próprios Livros 1-2,
   exceto cameo opcional); plausibilidade médica básica do caso
   clínico central; consistência do código-switching; nem protocolo
   nem intuição "vencendo" de forma simplista.
8. bia-ferreira-formatter — capa nova, tom "elite médica" próprio.

## 7. Símbolos
A definir na escrita — sugestão: algo ligado ao ritual médico (o
estetoscópio, o prontuário compartilhado do paciente central, o
relógio de plantão, um objeto pessoal ligado à mãe de Camila) que
ganhe peso simbólico crescente.

## 8. Decisões via AskUserQuestion — registro
Pergunta sobre qual par/departamento protagonizar o Livro 3 ficou SEM
RESPOSTA do usuário (segunda vez consecutiva — mesma pergunta análoga
também ficou sem resposta no onboarding do Livro 2). Prossegui com a
opção recomendada/primeira listada — Medicina (Harvard Medical
School), elenco novo — como DEFAULT ASSUMIDO, documentado aqui e em
arco-trama-livro3.md, justificado por já constar como sugestão
explícita na própria bíblia do Livro 1. Ajustável se o usuário
discordar ao ver o resultado. Pseudônimo e registro de voz mantidos
sem repergunta, por consistência com o padrão já estabelecido no
catálogo.
