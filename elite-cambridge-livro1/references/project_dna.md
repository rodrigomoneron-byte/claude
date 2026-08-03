# DNA do Projeto — Elite de Cambridge, Livro 1: O Código da Revanche (R.B. Guidenelli)

> Preenchido no onboarding em 2026-08-03. Primeiro livro de uma NOVA
> série sob o mesmo pseudônimo da casa, baseado em briefing completo
> fornecido pelo usuário. Quarta série do catálogo (após A Mão na
> Alavanca/clube de carvalho, Jogo Infinito NY/Europa, Família
> Bittencourt Brasil) — esta mistura os dois registros: protagonistas
> brasileiros, ambiente de elite americana.

## 0. Pseudônimo e branding
- Autor público: **R.B. Guidenelli**, mesma casa multi-série.
- Capa: nova, tom "dark academia"/"light academia" pedido no briefing
  — tijolo vermelho, neve, luz de biblioteca, códigos de computador
  como elemento visual sutil. Diferente das capas de todas as séries
  anteriores (nem glamour corporativo paulistano, nem Lisboa/jardim,
  nem clube de carvalho).

## 1. Estilo e Voz — marcas específicas desta série (adaptadas)
1. **Competência como flerte** — resolver problema técnico em tempo
   real, em cena, como forma de sedução intelectual (equivalente à
   "estratégia como linguagem corporal" de Jogo Infinito, mas aplicada
   a ciência da computação/IA em vez de negócios).
2. **Sarcasmo como escudo compartilhado** — os dois usam humor afiado
   pra não admitir vulnerabilidade; a marca aparece quando o sarcasmo
   falha e a vulnerabilidade real escapa.
3. **Slow burn medido em proximidade forçada** — literal (mesmo
   laboratório, mesmas noites em claro), diferente do slow burn mais
   "social" das séries anteriores.
4. **Rivalidade acadêmica que é atração disfarçada** — herdado direto
   do briefing (trope principal).
5. **O jogo tem preço acadêmico/imigratório visível** — bolsa, visto,
   reputação, financiamento do departamento — preço mais estrutural/
   burocrático do que os preços financeiros das séries anteriores.
6. **Humor afiado como blindagem intelectual** — herdado, adaptado ao
   registro "diálogos rápidos e inteligentes" pedido no briefing.
7. **Capítulo fecha no gesto que reabre o jogo** — herdado sem mudança.

## 2. RÉGUA ABSOLUTA (trava mecânica — regua_gate.py) — NÃO MUDA
- SÓ "nós", NUNCA "a gente" — em narração nem em diálogo de nenhum
  personagem, em qualquer registro (formal americano ou momento
  brasileiro íntimo).
- `regua_gate.py` + grep manual em todo capítulo antes de registrar.
- Cuidado: em cenas de código-switching (Helena/Arthur falando
  português um com o outro), a régua se aplica igual — o momento de
  intimidade linguística não pode incluir "a gente" só porque soa mais
  "natural"/coloquial nesse contexto específico.

## 3. CHECKPOINT DE CADÊNCIA E PROCESSO DE ESCRITA — status honesto
Conclusão acumulada de 3 livros anteriores (Família Bittencourt): a
taxa de capítulos precisando de expansão de emergência ficou perto de
100% em praticamente todos os atos de todos os livros, independente
da técnica tentada. A trava dura no `loop_state.py record` é a única
coisa que funciona de forma confiável (impede o livro de sair fora do
tamanho). Pra este livro: usar o processo padrão de 2 chamadas sem
tentar mais uma técnica experimental — focar energia em qualidade de
prosa e deixar a revisão global final capturar duplicações/
redundâncias que a expansão sob pressão tende a gerar (foi assim que
os problemas reais foram pegos nos livros anteriores).

## 4. Cadência de heat
- ~10-12 cenas, explícito-elegante (80/20), tom "sofisticado, intenso"
  pedido no briefing — mais próximo do registro de Jogo Infinito/
  Família Bittencourt L1-L2 do que do L3 (fade-to-warm).
- Primeira cena até o cap. 10 (proximidade forçada desde cedo, mas
  rivalidade real ainda pesando — não apressar antes da tensão
  render).
- Gap máximo 6 capítulos.
- Momento de primeira intimidade REAL (não necessariamente a primeira
  cena de heat, mas emocionalmente) sugerido pelo briefing pra
  acontecer na viagem ao Vale do Silício (Ato 2) — planejar a cadência
  em torno disso.

## 5. Formato
- ~55-58 capítulos, POV dual — Helena (ímpar) / Arthur (par), primeira
  pessoa do presente.
- Extensão: 950-1100 palavras/capítulo, total ~55.000-58.000 palavras.
- Sem epílogo neste Livro 1 (reservar decisão pra fechamento de série,
  se "Elite de Cambridge" continuar com mais volumes).

## 6. Pipeline operacional
1. ESCREVER (bia-ferreira-chapter-writer) — processo de 2 chamadas
   padrão.
2. RÉGUA (regua_gate.py) — trava dura.
3. VALIDAR (bia-ferreira-voice-validator) — score /7 contra as marcas
   adaptadas desta série (seção 1).
4. Falha não-estrutural → auto-revisar (máx. 2) → aprovado com ressalva.
5. REGISTRAR (loop_state.py record) — trava dura.
6. Repetir até completar os capítulos.
7. bia-ferreira-editor-global — atenção a: nenhum vazamento de nome/
   fato de outra série da casa; consistência técnica do próprio
   thriller de IA/dados (a conspiração precisa fazer sentido lógico
   básico, mesmo sendo ficção); consistência do código-switching de
   registro.
8. bia-ferreira-formatter — capa nova, tom "academia" próprio.

## 7. Símbolos
A definir na escrita — sugestão: algo ligado a código/algoritmo (ex:
uma linha de código específica, um objeto do laboratório, o próprio
erro que os uniu) que ganhe peso simbólico crescente ao longo do
livro. Documentar assim que decidido.

## 8. Decisões via AskUserQuestion — registro
Usuário escolheu "tenho um briefing pronto" na pergunta sobre caminho
da próxima série, e forneceu o PDF completo — decisões de enredo vêm
diretamente dele (arco-trama-livro1.md reproduz o briefing). Pseudônimo
mantido como R.B. Guidenelli por consistência com o padrão já
estabelecido nas 3 séries anteriores, não repreguntado neste onboarding
dado que o usuário já sinalizou prontidão pra seguir direto pra
produção. Registro de voz (código-switching) e cadência de heat foram
decisões editoriais documentadas, ajustáveis se o usuário discordar ao
ver o resultado.
