# DNA do Projeto — Fora de Jogo (Estrelas do Gramado, Livro 2) (R.B. Guidenelli)

> Preenchido no onboarding em 2026-08-10. Segundo livro da trilogia
> "Estrelas do Gramado". Par: Marcos "Marcão" Silveira x Beatriz "Bia"
> Lima, já apresentados no Livro 1.

## 0. Pseudônimo e branding
- Autor público: **R.B. Guidenelli**, mesma casa multi-série.
- Capa: mesma linha visual "gramado/estádio" do Livro 1, mas com
  registro DIFERENTE — sugestão: dois uniformes lado a lado (masculino
  e feminino do universo do clube), luz de flash de evento de
  imprensa/patrocínio em vez da luz de jogo noturno do Livro 1.

## 1. Estilo e Voz — marcas específicas deste livro
1. **Banter afiado como flerte** — a marca do Ato I: atrito verbal
   rápido entre Bia (direta, cortante) e Marcos (bem-humorado,
   desarma com carisma) — registro mais leve que o Livro 1 no início,
   aprofundando pro dramático nos Atos II-III.
2. **Competência escondida atrás de carisma (Marcos)** — ele resolve
   os problemas dos outros com facilidade aparente; a marca é o
   contraste entre essa fachada leve e o peso real que ele carrega
   sozinho (a dívida do pai).
3. **Vulnerabilidade tratada como fraqueza (Bia)** — ela evita
   qualquer sinal de "precisar" de alguém, mesmo quando precisa; a
   marca é o momento em que ela escolhe ativamente deixar Marcos ver
   por dentro.
4. **Performance pública vs. verdade privada** — cada aparição
   "oficial" do casal tem um subtexto real acontecendo por baixo;
   recurso estrutural do livro inteiro.
5. **Vestiário como espaço de verdade** — cenas no vestiário/CT (sem
   câmeras) contrastam com cenas de evento/imprensa (com câmeras) —
   registro de voz muda sutilmente entre os dois espaços.
6. **Pedir ajuda como ato de coragem, não fraqueza** — arco temático
   de Marcos, ecoado no arco de confiança de Bia.
7. **Capítulo fecha em gancho emocional, de imprensa ou de tensão
   financeira** — herdado do padrão da casa.

## 2. RÉGUA ABSOLUTA (trava mecânica — regua_gate.py) — NÃO MUDA
- SÓ "nós", NUNCA "a gente" — narração e diálogo, qualquer registro.
- `regua_gate.py` (word-boundary correto) + grep manual `\ba gente\b`
  em todo capítulo antes de registrar.
- NOTA IMPORTANTE: a revisão do Livro 1 desta série encontrou um HIT
  real ("pra gente daqui pra frente") que escapou do gate mecânico
  individual por um bug de whitelist no `find_oblique()` do script
  (janela de 40 caracteres que confunde "gente da" com "gente daqui").
  Isso significa que o gate individual por capítulo pode ter falsos
  negativos em formas obliquas com "da"/"daqui" logo depois de
  "gente" — releia manualmente essas construções com atenção redobrada,
  não confie 100% no script sozinho, e rode o gate consolidado em
  TODOS os capítulos juntos ao final (mais robusto que rodar um por
  um) antes do editor-global.
- VIGILÂNCIA MÁXIMA: apareceu em TODOS os livros já produzidos nesta
  casa, sem exceção — tratar como certeza estatística, não hipótese.

## 2b. LIMITE DE CONTEÚDO (adaptado ao gênero esportivo/fake dating)
- Nenhuma violência física.
- Nem Marcos nem Bia exercem controle coercitivo um sobre o outro —
  inclusive dentro do próprio fake dating: nenhum dos dois pode forçar
  o outro a manter a farsa contra vontade explícita; qualquer decisão
  de continuar/encerrar o acordo é sempre negociada.
- Consentimento explícito e claro em toda cena de intimidade —
  inclusive a primeira vez que a farsa vira real (deixar claro na
  narrativa o momento exato em que deixa de ser performance).
- Plausibilidade de marketing esportivo (contratos de imagem, agências,
  patrocínio) e de endividamento informal (agiotagem tratada como
  pressão psicológica/social real, SEM mostrar ameaça física direta
  aos Silveira — cobrança por telefone, constrangimento público
  potencial, pressão financeira, não confronto violento).
- O executivo da agência de marketing (antagonista de pressão
  contratual) não deve ser escrito como ameaça física — o conflito
  dele é de multa contratual e risco de vazamento pra imprensa, não
  de perigo físico.

## 3. CHECKPOINT DE CADÊNCIA E PROCESSO DE ESCRITA
Conclusão acumulada de 13 livros anteriores da casa: taxa de expansão
de emergência entre 89-100% em quase todos os atos — só a trava dura
no `loop_state.py record` funciona de forma confiável. Usar contagem
via Python (`len(open(f).read().split())`) como padrão, não `wc -w`
(bug de locale documentado). Mirar o TOPO da faixa de palavras desde o
Ato 1.

## 4. Cadência de heat (ADAPTADA — decisão editorial documentada)
- ~8-9 cenas, explícito-elegante, mesmo registro da casa.
- PRIMEIRA CENA ~cap. 15 (mais cedo que o Livro 1, que adiou pro cap.
  20) — coerente com o próprio trope de fake dating, que já embute
  proximidade física forçada desde o início (mãos dadas em público,
  abraços encenados, etc.) — a linha entre performance e desejo real
  deve ficar tensa desde o Ato I, cruzando fisicamente mais cedo que
  no Livro 1.
- Gap máximo 6 capítulos DEPOIS da primeira cena — CONTAR MANUALMENTE,
  mirando o TOPO da meta (9 cenas).

## 5. Formato
- ~55-58 capítulos, POV dual — Bia (ímpar) / Marcos (par), primeira
  pessoa do presente.
- Extensão: 950-1100 palavras/capítulo, total ~55.000-58.000 palavras
  — MIRAR TOPO DA FAIXA DESDE O ATO 1.
- SEM epílogo formal — livro do meio de uma trilogia em andamento;
  fecha com gancho claro pro Livro 3 (Léo).

## 6. Pipeline operacional
1. ESCREVER (bia-ferreira-chapter-writer) — processo de 2 chamadas
   padrão, mirando topo da faixa desde o início.
2. RÉGUA (regua_gate.py) — trava dura + atenção ao bug de whitelist
   documentado na seção 2 acima.
3. LIMITE DE CONTEÚDO (seção 2b) — releitura obrigatória por capítulo.
4. VALIDAR (bia-ferreira-voice-validator) — score /7 contra as marcas
   desta série (seção 1).
5. Falha não-estrutural → auto-revisar (máx. 2) → aprovado com ressalva.
6. REGISTRAR (loop_state.py record) — trava dura.
7. Repetir até completar os capítulos.
8. bia-ferreira-editor-global — atenção a: consistência com os ganchos
   do Livro 1 (cap. 33); plausibilidade de marketing esportivo e
   endividamento informal; nenhum vazamento de nome/fato de outra
   série da casa; RESPEITO ESTRITO ao limite de conteúdo; rodar o gate
   consolidado em todos os capítulos de uma vez.
9. bia-ferreira-formatter — capa nova (registro de evento/imprensa),
   relatório final sinalizando o gancho pro Livro 3 (Léo).

## 7. Símbolos
A definir na escrita — sugestões: a braçadeira de capitão de Marcos, a
caneta de Bia riscando releases de imprensa escritos pra ela, o
vestiário como espaço de verdade versus o gramado/holofote como espaço
de performance.

## 8. Decisões via onboarding — registro
Usuário pediu "vamos para o livro 2 e depois o 3 para fechar a
trilogia" — instrução clara de continuar a série e fechar no Livro 3,
sem detalhar par/mecanismo deste Livro 2 além do que já estava na
tabela de expansão do briefing original (par Marcos/Bia, trope Grumpy
x Sunshine/Fake Dating). Mecanismo específico do fake dating (agência
de marketing resolvendo dois problemas simultâneos), antagonista de
pressão contratual, a dívida do pai de Marcos como crise familiar
central, a ferida do ex de Bia, e a cadência de heat adiantada foram
CHAMADAS EDITORIAIS DIRETAS, documentadas aqui e em arco-trama.md.
