# DNA do Projeto — A Casa de Vidro (R.B. Guidenelli)

> Preenchido no onboarding em 2026-08-11, a partir do briefing completo
> enviado pelo usuário. Novo projeto standalone (potencial de futura
> antologia "Segredos à Beira-Mar", não trilogia fechada) — primeira
> incursão da casa em Suspense Doméstico / Single Dad / Nanny Romance.

## 0. Pseudônimo e branding
- Autor público: **R.B. Guidenelli**, mesma casa multi-série.
- Capa: nova linha visual — mansão moderna de vidro iluminada à noite
  sobre o mar, tons frios, toque de mistério (conforme a estratégia de
  mercado do próprio briefing) — distinta de toda capa já produzida.

## 1. Estilo e Voz — marcas específicas deste livro
1. **Transparência como ameaça, não conforto** — a casa de vidro
   deveria ser segura (tudo visível), mas a marca do livro é que
   visibilidade não é o mesmo que verdade — recurso estrutural central.
2. **Intuição como competência de Clara** — ela lê Mel e a casa antes
   de entender racionalmente o que está vendo; a marca é confiar na
   própria leitura mesmo sendo a pessoa mais nova/menos poderosa no
   ambiente.
3. **Controle como proteção, não posse (Bernardo)** — diferente de
   qualquer antagonista controlador da casa: o controle de Bernardo é
   inteiramente direcionado à proteção de Mel, NUNCA a Clara — a marca
   é ele aprendendo a permitir que Clara participe da proteção, não
   só executá-la sozinho.
4. **Os desenhos de Mel como segunda linguagem narrativa** — cada
   desenho/sussurro dela funciona como pista real da trama, tratado
   com peso estrutural, não decoração.
5. **A barreira profissional como linha visível (e o momento exato em
   que ela é redesenhada, não cruzada às escondidas)** — diferente do
   fake dating (Livro 2 de Estrelas do Gramado) ou do contrato de
   segurança (Sombras de Aluguel): aqui a mudança de status
   (empregada → parceira) precisa ser uma conversa explícita entre os
   dois, não uma ambiguidade não resolvida.
6. **Tempestade como relógio emocional** — o clima (tempestades,
   noites fechadas) marca a escalada do suspense, ecoando estrutura já
   usada por outros livros da casa (heat cadence ligada a marco de
   confiança), aqui ligado ao clima físico da costa.
7. **Capítulo fecha no gancho de mistério ou perigo**, herdado do
   padrão da casa.

## 2. RÉGUA ABSOLUTA (trava mecânica — regua_gate.py) — NÃO MUDA
- SÓ "nós", NUNCA "a gente" — narração e diálogo, qualquer registro.
- `regua_gate.py` (word-boundary correto) + grep manual `\ba gente\b`
  em todo capítulo antes de registrar.
- BUG DE WHITELIST CONHECIDO (documentado na série Estrelas do
  Gramado): o script mascara formas "gente da"/"gente daqui" — SEMPRE
  rodar `grep -ilE '\ba gente\b' outputs/conteudo/*.md` direto no lote
  completo como checagem adicional, não confiar só no script.
- VIGILÂNCIA MÁXIMA: apareceu em TODOS os livros já produzidos nesta
  casa, sem exceção — tratar como certeza estatística.

## 2b. LIMITE DE CONTEÚDO — REFORÇADO PARA ESTE LIVRO
Este briefing tem dois elementos de risco que exigem trava extra além
do padrão da casa:
- **Criança em perigo**: Mel NUNCA é mostrada como alvo de violência
  física real, gráfica ou prolongada — qualquer ameaça envolvendo ela
  é risco evitado a tempo, tensão psicológica, ou consequência
  emocional (medo, choro, silêncio), NUNCA dano físico consumado ou
  mostrado em detalhe. A "invasão" do Ato II e o confronto do Ato III
  devem ser tensos mas resolvidos antes de qualquer contato físico
  prejudicial a ela.
- **Dinâmica empregador/empregada**: Bernardo NUNCA usa a posição de
  patrão (salário, moradia, autoridade sobre o emprego de Clara) pra
  pressionar ou insinuar avanço romântico/sexual. Qualquer escalada
  física só pode acontecer DEPOIS de uma cena explícita em que os dois
  reformulam a relação (ex: ele oferece rescindir o contrato formal de
  trabalho, ou os dois nomeiam em voz alta que aquilo deixou de ser
  relação de trabalho) — a régua NÃO permite ambiguidade nesse ponto.
- Nenhum controle coercitivo entre Clara e Bernardo em nenhum momento.
- Consentimento explícito e claro em toda cena de intimidade.
- Mateus (stalker): stalking e assédio tratados com seriedade real,
  sem minimizar, mas sem violência física gráfica — resolução via
  intervenção legal/policial, nunca vingança unilateral de Bernardo
  (isso reforçaria exatamente o padrão de controle que Clara está
  fugindo).
- Vitória Andrade: extorsão, manipulação, chantagem — NÃO violência
  física direta contra nenhum personagem em nenhum momento do livro.
- Trauma e mutismo seletivo de Mel: tratados com sensibilidade
  clínica real (consistente com literatura sobre mutismo seletivo
  infantil pós-trauma), nunca explorados pra choque barato; a
  recuperação da fala é processo gradual e crível, não uma virada
  mágica instantânea no clímax.
- Dr. Vicente e Helena: cúmplices por coação/medo/confusão, não por
  malícia — mantém o número de vilões genuínos restrito a Vitória (+
  sócios corruptos não nomeados/pouco desenvolvidos) e Mateus.

## 3. CHECKPOINT DE CADÊNCIA E PROCESSO DE ESCRITA
Conclusão acumulada de 15 livros anteriores da casa: taxa de expansão
de emergência entre 89-100% em quase todos os atos — só a trava dura
no `loop_state.py record` funciona de forma confiável. Usar contagem
via Python (`len(open(f).read().split())`) como padrão, não `wc -w`.
Mirar o TOPO da faixa de palavras desde o Ato 1 — não parar no
primeiro número que passa do piso técnico, mirar pelo menos
1000-1050 depois de cada rodada de expansão.

## 4. Cadência de heat (ADAPTADA — decisão editorial documentada)
- ~8-9 cenas, explícito-elegante, mesmo registro da casa.
- PRIMEIRA CENA ADIADA para ~cap. 20 — coerente com a barreira
  empregador/empregada ATIVA somada à presença de uma criança na casa
  (nenhuma cena de intimidade deve acontecer sem que a relação
  profissional já tenha sido explicitamente redefinida, e a logística
  doméstica — Mel dormindo, ausência de risco de exposição à criança —
  deve estar implícita ou explícita na cena).
- Gap máximo 6 capítulos DEPOIS da primeira cena — CONTAR
  MANUALMENTE, mirando o TOPO da meta (9 cenas).

## 5. Formato
- ~55-58 capítulos, POV dual — Clara (ímpar) / Bernardo (par), primeira
  pessoa do presente.
- Extensão: 950-1100 palavras/capítulo, total ~55.000-58.000 palavras
  — MIRAR TOPO DA FAIXA DESDE O ATO 1.
- SEM epílogo formal obrigatório (livro standalone, não fechamento de
  trilogia) — mas o desfecho final deve deixar claro o "futuro seguro
  e definitivo" pedido no briefing (a casa ganhando "cor e vida nova",
  Mel falando plenamente, o casal consolidado).

## 6. Pipeline operacional
1. ESCREVER (bia-ferreira-chapter-writer) — processo de 2 chamadas
   padrão, mirando topo da faixa desde o início.
2. RÉGUA (regua_gate.py) — trava dura + gate consolidado obrigatório.
3. LIMITE DE CONTEÚDO (seção 2b) — releitura obrigatória por capítulo,
   atenção redobrada em qualquer cena envolvendo risco pra Mel ou
   dinâmica empregador/empregada.
4. VALIDAR (bia-ferreira-voice-validator) — score /7 contra as marcas
   desta série (seção 1).
5. Falha não-estrutural → auto-revisar (máx. 2) → aprovado com ressalva.
6. REGISTRAR (loop_state.py record) — trava dura.
7. Repetir até completar os capítulos.
8. bia-ferreira-editor-global — atenção a: nenhuma violência mostrada
   contra Mel; nenhuma pressão profissional de Bernardo sobre Clara;
   plausibilidade de investigação doméstica/policial; RESPEITO
   ESTRITO ao limite de conteúdo reforçado desta seção.
9. bia-ferreira-formatter — capa nova, tom "mansão de vidro
   noturna/costa catarinense" próprio.

## 7. Símbolos
O vidro (transparência vs. opacidade dos segredos); os desenhos de Mel
como linguagem de verdade; outros a definir na escrita.

## 8. Decisões via onboarding — registro
Briefing completo enviado pelo usuário
(`Briefing_Completo_A_Casa_de_Vidro.pdf`) com a mensagem "próximo
projeto" — seguindo o padrão já estabelecido nesta casa, a onboarding
prosseguiu direto sob o pseudônimo R.B. Guidenelli e as skills
bia-ferreira-*, sem reconsultar o usuário. Decisões editoriais
específicas deste livro, não 100% explícitas no briefing e travadas
aqui: ordem de POV (Clara ímpar/Bernardo par, mantendo o padrão da
casa), o limite de conteúdo REFORÇADO cobrindo os dois riscos
específicos deste briefing (criança em perigo + dinâmica empregador/
empregada), o papel de Dr. Vicente e Helena como cúmplices coagidos
(não vilões plenos, decisão pra manter o foco moral em Vitória),
cadência de heat adiada (~cap. 20), e a ausência de epílogo formal
(livro standalone).
