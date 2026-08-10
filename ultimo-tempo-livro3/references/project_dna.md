# DNA do Projeto — Pênalti de Ouro (Estrelas do Gramado, Livro 3 — FECHAMENTO DA TRILOGIA) (R.B. Guidenelli)

> Preenchido no onboarding em 2026-08-10. Terceiro e ÚLTIMO livro da
> trilogia "Estrelas do Gramado" — usuário pediu "vamos para o livro 2
> e depois o 3 para fechar a trilogia". Par novo (Léo Andrade x Renata
> Duprat), caso novo, MAS com cameo cruzado autorizado de Thiago/Júlia
> (L1) e Marcos/Bia (L2) e epílogo obrigatório fechando a série.

## 0. Pseudônimo e branding
- Autor público: **R.B. Guidenelli**, mesma casa multi-série.
- Capa: nova, mesma linha "gramado/estádio/imprensa" da série,
  elemento visual DIFERENTE dos Livros 1 (gramado/estádio noturno) e 2
  (evento/imprensa, dois uniformes) — sugestão: dois uniformes de
  cores rivais lado a lado com uma tela/gráfico de dados de desempenho
  sobreposto (analista + jogador), luz de clássico decisivo.

## 1. Estilo e Voz — marcas específicas deste livro (fechamento, adaptadas dos Livros 1-2)
1. **Carisma como escudo (Léo)** — a marca dele: sorriso fácil e
   intensidade performática cobrindo o medo de ser visto como
   insuficiente por trás do talento; diferente da fachada de "cara que
   resolve tudo" de Marcos e da decadência escondida de Thiago.
2. **Precisão como sobrevivência profissional (Renata)** — a marca
   dela: cada palavra e decisão medida num ambiente que a testa duas
   vezes mais por ser mulher em dados esportivos — diferente da ironia
   de Júlia e da intensidade direta de Bia.
3. **Forbidden real, não performático** — diferente do fake dating do
   Livro 2: aqui o "proibido" é genuíno (conflito de interesse
   profissional real, não só familiar) — a tensão nasce de risco de
   carreira real pros dois lados, não de contrato.
4. **Sombra de outra pessoa (Léo: Thiago/Marcos; Renata: Diego)** —
   tema espelhado: os dois lutam pra ser vistos além do nome/legado de
   outra pessoa mais famosa perto deles.
5. **Dados como linguagem de intimidade** — Renata mostrando a Léo como
   ela o vê "nos números" é um ato de vulnerabilidade equivalente a uma
   confissão — recurso estrutural específico deste livro.
6. **Clássico decisivo como pano de fundo estrutural** — o jogo
   decisivo da temporada funciona como relógio narrativo pro Ato III,
   equivalente estrutural ao apito final (L1) e ao anúncio público (L2).
7. **Capítulo fecha no gancho de perigo/tensão profissional**, exceto
   no epílogo, que fecha em tom sereno (mesma lógica de fechamentos de
   trilogia anteriores da casa).

## 2. RÉGUA ABSOLUTA (trava mecânica — regua_gate.py) — NÃO MUDA
- SÓ "nós", NUNCA "a gente" — narração e diálogo, qualquer registro.
- `regua_gate.py` (word-boundary correto) + grep manual `\ba gente\b`
  em todo capítulo antes de registrar.
- BUG DE WHITELIST CONHECIDO: o script mascara formas "gente da"/
  "gente daqui" (janela de 40 caracteres no `find_oblique()`) — SEMPRE
  rodar `grep -ilE '\ba gente\b' outputs/conteudo/*.md` direto no lote
  completo como checagem adicional, não confiar só no script.
- VIGILÂNCIA MÁXIMA: apareceu em TODOS os livros já produzidos nesta
  casa, sem exceção — tratar como certeza estatística.

## 2b. LIMITE DE CONTEÚDO (mesma lógica adaptada dos Livros 1-2)
- Nenhuma violência física.
- Nem Léo nem Renata exercem controle coercitivo um sobre o outro.
- Consentimento explícito e claro em toda cena de intimidade.
- Plausibilidade de análise de desempenho esportivo (scouting, dados,
  compliance de clube de futebol) e da mecânica de rivalidade entre
  clubes da mesma cidade.
- Age gap tratado com cuidado: ambos adultos plenos, diferença
  moderada (~6-7 anos), sem dinâmica de poder profissional direta
  entre os dois.
- Cameo de Thiago/Júlia/Marcos/Bia: caracterização fiel aos livros
  originais, papel de apoio ativo, sem reabrir arcos próprios.
- Marisa Aquino e Breno Falcão: antagonistas de pressão institucional/
  midiática, NUNCA ameaça física.

## 3. CHECKPOINT DE CADÊNCIA E PROCESSO DE ESCRITA
Conclusão acumulada de 14 livros anteriores da casa: taxa de expansão
de emergência entre 89-100% em quase todos os atos — só a trava dura
no `loop_state.py record` funciona de forma confiável. Usar contagem
via Python (`len(open(f).read().split())`) como padrão, não `wc -w`.
Mirar o TOPO da faixa de palavras desde o Ato 1.

## 4. Cadência de heat
- ~8-9 cenas, explícito-elegante, mesmo registro da série.
- Primeira cena ~cap. 18-20 (entre o ritmo do Livro 1 e do Livro 2) —
  coerente com o forbidden romance mais cauteloso que o fake dating,
  mas sem a barreira contratual rígida do Livro 1.
- Gap máximo 6 capítulos DEPOIS da primeira cena — CONTAR
  MANUALMENTE, mirando o TOPO da meta (9 cenas).

## 5. Formato
- ~55-58 capítulos + EPÍLOGO (2-3 capítulos adicionais, marcados
  "# Epílogo" não "# Capítulo N"), POV dual — Renata (ímpar) / Léo
  (par), primeira pessoa do presente.
- Extensão: 950-1100 palavras/capítulo, total ~55.000-58.000 palavras
  (capítulos numerados) + epílogo à parte — MIRAR TOPO DA FAIXA DESDE
  O ATO 1.
- EPÍLOGO OBRIGATÓRIO — reunião dos três casais (Léo/Renata,
  Thiago/Júlia, Marcos/Bia), tom sereno, fechamento definitivo da
  trilogia, não precisa reabrir conflito novo.

## 6. Pipeline operacional
1. ESCREVER (bia-ferreira-chapter-writer) — processo de 2 chamadas
   padrão, mirando topo da faixa desde o início.
2. RÉGUA (regua_gate.py) — trava dura + gate consolidado obrigatório.
3. LIMITE DE CONTEÚDO (seção 2b) — releitura obrigatória por capítulo.
4. VALIDAR (bia-ferreira-voice-validator) — score /7 contra as marcas
   desta série (seção 1) — atenção a diferenciar as vozes de Léo/
   Renata das de Thiago/Noah... (N/A, série própria) e das de
   Marcos/Bia.
5. Falha não-estrutural → auto-revisar (máx. 2) → aprovado com ressalva.
6. REGISTRAR (loop_state.py record) — trava dura.
7. Repetir até completar os capítulos + epílogo.
8. bia-ferreira-editor-global — atenção a: caracterização fiel dos 4
   personagens em cameo; plausibilidade de análise de desempenho
   esportivo e compliance; RESPEITO ESTRITO ao limite de conteúdo;
   gate consolidado de régua em todos os capítulos.
9. bia-ferreira-formatter — capa nova, tom "clássico decisivo/dados
   de desempenho" próprio. Relatório final com resumo da TRILOGIA
   INTEIRA (3 livros, palavras de cada um, total combinado).

## 7. Símbolos
A definir na escrita — sugestões: a prancheta/tablet de dados de
Renata, algo que reúna os símbolos dos 3 livros no epílogo (apito,
braçadeira/caneta/guardanapo, símbolo novo deste livro).

## 8. Decisões via onboarding — registro
Usuário disse "vamos para o livro 2 e depois o 3 para fechar a
trilogia" — instrução clara de fechamento, sem especificar mecanismo
além do gancho já plantado no Livro 2 (Léo x Renata Duprat, irmã do
capitão do Vitória Atlético, Forbidden Romance/Age Gap leve). Trope
principal (conflito de interesse profissional real, não só familiar),
antagonistas de pressão (Marisa Aquino, Breno Falcão), cadência de
heat, cameo cruzado formal, e epílogo foram CHAMADAS EDITORIAIS
DIRETAS, documentadas aqui e em arco-trama.md, desenhadas
especificamente pra dar um fechamento satisfatório à trilogia.
