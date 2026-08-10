# DNA do Projeto — Último Tempo (Estrelas do Gramado, Livro 1) (R.B. Guidenelli)

> Preenchido no onboarding em 2026-08-10, a partir do briefing completo
> enviado pelo usuário. Primeiro livro de uma NOVA trilogia ("Estrelas
> do Gramado") e primeira incursão da casa em Sports Romance —
> subgênero diferente de tudo já produzido (romance de elite/família
> política, dark romance, romantic suspense/legal thriller).

## 0. Pseudônimo e branding
- Autor público: **R.B. Guidenelli**, mesma casa multi-série.
- Capa: nova linha visual — estética de gramado, luzes de estádio,
  silhuetas atléticas (conforme estratégia de mercado do próprio
  briefing), tom emocionante/dinâmico, distinto de toda capa já
  produzida na casa (nenhuma delas usou registro esportivo).

## 1. Estilo e Voz — marcas específicas deste livro
1. **Competência técnica como armadura** — a marca de Júlia: precisão
   clínica e ironia refinada como escudo contra a vulnerabilidade que
   Thiago desperta nela.
2. **Fama como máscara, medo de irrelevância por baixo** — a marca de
   Thiago: a casca de atleta intocável escondendo pavor real de deixar
   de importar quando o corpo falhar.
3. **Dor física como espelho da dor emocional** — cada sessão de
   reabilitação funciona em dois níveis, físico e emocional, ao mesmo
   tempo — recurso estrutural do livro inteiro.
4. **Contrato profissional como linha que não pode ser cruzada** (até
   ser cruzada) — tensão constante entre o dever profissional de Júlia
   e a atração que ela tenta negar.
5. **Mídia esportiva como pressão externa constante** — cada decisão
   do casal tem peso público, diferente da pressão institucional
   (jurídica/política) dos livros de suspense da casa — aqui é pressão
   de holofote e opinião pública.
6. **Redenção via ação concreta, não só palavra** — o arco de Thiago se
   prova por sacrifício real (decisão de aposentar, declaração pública),
   não só por declaração de sentimento.
7. **Capítulo fecha em gancho emocional ou físico** — herdado do
   padrão da casa (farpa, lembrança dolorosa, tensão de imprensa,
   cliffhanger de lesão/recuperação).

## 2. RÉGUA ABSOLUTA (trava mecânica — regua_gate.py) — NÃO MUDA
- SÓ "nós", NUNCA "a gente" — narração e diálogo, qualquer registro.
- `regua_gate.py` (word-boundary correto) + grep manual `\ba gente\b`
  em todo capítulo antes de registrar.
- VIGILÂNCIA MÁXIMA: apareceu em TODOS os livros já produzidos nesta
  casa, sem exceção — tratar como certeza estatística, não hipótese.

## 2b. LIMITE DE CONTEÚDO (adaptado ao gênero esportivo)
- Nenhuma lesão física mostrada de forma gráfica ou clinicamente
  detalhada/prolongada — dor e tensão narrativas sim, conteúdo
  gráfico-médico não.
- Nem Thiago nem Júlia exercem controle coercitivo um sobre o outro —
  decisões médicas (liberação pra jogo, cirurgia) e decisões de
  carreira são sempre negociadas e consentidas, nunca impostas
  unilateralmente por um sobre o outro.
- Consentimento explícito e claro em toda cena de intimidade.
- Plausibilidade médico-esportiva e futebolística básica: protocolos
  de reabilitação de joelho, dinâmica de contrato/clube, cobertura de
  imprensa esportiva devem fazer sentido mínimo dentro do universo
  fictício do São Paulo Metropolitano.
- O antigo empresário de Thiago (antagonista de drama relacional) não
  deve ser escrito como ameaça física/criminosa no registro dos
  antagonistas de suspense da casa — o conflito dele é de
  manipulação/omissão passada, não de perigo físico presente.

## 3. CHECKPOINT DE CADÊNCIA E PROCESSO DE ESCRITA
Conclusão acumulada de 12 livros anteriores da casa: taxa de expansão
de emergência entre 89-100% em quase todos os atos — só a trava dura
no `loop_state.py record` funciona de forma confiável. Usar contagem
via Python (`len(open(f).read().split())`) como padrão, não `wc -w`
(bug de locale documentado). Mirar o TOPO da faixa de palavras desde o
Ato 1, não confiar em passe de reforço no final. Não inventar nova
técnica experimental além disso.

## 4. Cadência de heat (ADAPTADA — decisão editorial documentada)
- ~8-9 cenas, explícito-elegante, mesmo registro da casa.
- PRIMEIRA CENA ADIADA para ~cap. 20 (não cap. 12 como no resto do
  catálogo) — coerente com o conflito central do Ato I: um contrato
  profissional estrito que proíbe qualquer envolvimento, e a "Recaída"
  do briefing é estruturalmente um ponto de virada do Ato II (viagem
  do time, Only One Bed). Forçar uma cena antes disso quebraria a
  lógica do próprio conflito.
- Gap máximo 6 capítulos DEPOIS da primeira cena — CONTAR
  MANUALMENTE, mirando o TOPO da meta (9 cenas) uma vez que a cadência
  comece.
- Tensão sexual crescente SEM consumação deve ser trabalhada
  ativamente nos capítulos 1-19 (olhares, proximidade física da
  reabilitação, quase-toques) pra que a Recaída no cap. ~20 tenha peso
  dramático — não é "sem heat", é heat construído sem consumação até o
  ponto certo da trama.

## 5. Formato
- ~55-58 capítulos, POV dual — Júlia (ímpar) / Thiago (par), primeira
  pessoa do presente.
- Extensão: 950-1100 palavras/capítulo, total ~55.000-58.000 palavras
  — MIRAR TOPO DA FAIXA DESDE O ATO 1.
- SEM epílogo formal — livro de abertura de trilogia em andamento;
  fecha com salto temporal de ~1 ano dentro do próprio Ato III
  (Thiago como técnico das categorias de base), funcionando como
  gancho pro Livro 2 (Marcos/Bia).

## 6. Pipeline operacional
1. ESCREVER (bia-ferreira-chapter-writer) — processo de 2 chamadas
   padrão, mirando topo da faixa desde o início.
2. RÉGUA (regua_gate.py) — trava dura.
3. LIMITE DE CONTEÚDO (seção 2b) — releitura obrigatória por capítulo.
4. VALIDAR (bia-ferreira-voice-validator) — score /7 contra as marcas
   desta série (seção 1).
5. Falha não-estrutural → auto-revisar (máx. 2) → aprovado com ressalva.
6. REGISTRAR (loop_state.py record) — trava dura.
7. Repetir até completar os capítulos.
8. bia-ferreira-editor-global — atenção a: plausibilidade
   médico-esportiva; consistência da cadência de heat adiada; nenhum
   vazamento de nome/fato de outra série da casa; RESPEITO ESTRITO ao
   limite de conteúdo.
9. bia-ferreira-formatter — capa nova, tom "gramado/estádio noturno"
   próprio. Relatório final deve mencionar que este é o Livro 1 de uma
   trilogia em andamento ("Estrelas do Gramado") e sinalizar os
   ganchos deixados pro Livro 2 (Marcos/Bia) e Livro 3 (Léo).

## 7. Símbolos
- O apito (literal no clímax final — Júlia joga o apito pra Thiago — e
  metafórico: "o jogo recomeça").
- O joelho/lesão como símbolo físico da vulnerabilidade escondida de
  Thiago.
- A aliança nunca usada / o vestido não vestido — referência ao altar
  abandonado, retomada conforme surgir na escrita.

## 8. Decisões via briefing/onboarding — registro
Briefing completo enviado pelo usuário (`briefing_ultimo_tempo.pdf`)
sem mensagem de acompanhamento — seguindo o padrão já estabelecido
nesta casa ("mesma casa e mesmas skills e configurações" confirmado
explicitamente no briefing anterior desta sessão), a onboarding
prosseguiu direto sob o pseudônimo R.B. Guidenelli e as skills
bia-ferreira-*, sem reconsultar o usuário. Decisões editoriais
específicas deste livro, não 100% explícitas no briefing e travadas
aqui: ordem de POV (Júlia ímpar/Thiago par, mantendo o padrão da casa
de abrir com a voz da protagonista), adiamento estrutural da cadência
de heat pro Ato II (coerente com o próprio conflito do briefing),
ausência de epílogo formal (por não ser o livro de fechamento da
trilogia), e o registro de que o antagonista deste livro é relacional/
de drama, não físico/criminoso como nos livros de suspense da casa.
