# DNA do Projeto — Elite de Cambridge, Livro 2 (R.B. Guidenelli)

> Preenchido no onboarding em 2026-08-04. Segundo livro da série,
> novo par de rivais (Direito/Harvard Law) — decisão de
> par/departamento tomada como DEFAULT ASSUMIDO (usuário não respondeu
> à pergunta de escolha; opção recomendada, já sugerida na própria
> bíblia do Livro 1). Elenco novo, sem protagonismo do elenco do
> Livro 1 (cameo opcional apenas).

## 0. Pseudônimo e branding
- Autor público: **R.B. Guidenelli**, mesma casa multi-série.
- Capa: nova, tom a definir na formatação — sugestão "elite jurídica"
  (mármore, madeira escura de tribunal, luz dourada de biblioteca de
  Direito) — DIFERENTE da capa "dark/light academia" (tijolo/neve/
  código) do Livro 1, mesma lógica da casa de capa própria por livro.

## 1. Estilo e Voz — marcas específicas desta série (herdadas do Livro 1, sem mudança)
1. Competência como flerte — aqui, argumentação jurídica em tempo real
   como forma de sedução intelectual.
2. Sarcasmo/charme como escudo compartilhado.
3. Slow burn medido em proximidade forçada (preparação do caso, noites
   de trabalho conjunto, rodada regional fora de Cambridge).
4. Rivalidade acadêmica que é atração disfarçada.
5. O jogo tem preço estrutural visível — aqui, peso de legado
   familiar/pressão de sobrenome (adaptação de "preço acadêmico/
   imigratório" do Livro 1) em vez de vencer no próprio direito.
6. Humor afiado como blindagem intelectual.
7. Capítulo fecha no gesto que reabre o jogo.

## 2. RÉGUA ABSOLUTA (trava mecânica — regua_gate.py) — NÃO MUDA
- SÓ "nós", NUNCA "a gente" — narração e diálogo, qualquer registro.
- `regua_gate.py` + grep manual em todo capítulo antes de registrar.
- Vigilância REDOBRADA: no Livro 1, o device proibido de autocorreção
  ("a gente— nós") apareceu recorrentemente em quase todos os atos,
  mesmo com aviso explícito repetido — tratar como risco constante,
  não pontual.

## 3. CHECKPOINT DE CADÊNCIA E PROCESSO DE ESCRITA
Conclusão acumulada de 4 livros anteriores (Família Bittencourt x3 +
Elite de Cambridge L1): a taxa de expansão de emergência fica entre
89-100% em praticamente todos os atos, independente da técnica
tentada — só a trava dura no `loop_state.py record` funciona de forma
confiável. O Livro 1 também terminou levemente abaixo do piso total
(53.621 de 56.500) e precisou de um passe de reforço adicional depois
do "fechamento" do livro — para este Livro 2, considerar mirar o TOPO
da faixa de palavras por capítulo (1050-1100) nos últimos capítulos de
cada ato, não só no processo de 2 chamadas, para reduzir a chance de
precisar de reforço pós-fechamento. Não inventar nova técnica
experimental além disso.

## 4. Cadência de heat
- ~10-12 cenas, explícito-elegante, mesmo registro do Livro 1.
- Primeira cena até o cap. 10.
- Gap máximo 6 capítulos (ATENÇÃO: no Livro 1 esse gap foi violado
  duas vezes — 10→19 e 43→50 — porque o `loop_state.py check` só
  valida o gap corrente no momento do registro, não retrospectivamente;
  o agente de escrita deve contar manualmente os capítulos desde a
  última cena de heat a cada capítulo escrito, não confiar só no
  script).
- Primeiro momento de intimidade real sugerido para a rodada regional
  do moot court fora de Cambridge (Ato 2) — equivalente à viagem ao
  Vale do Silício do Livro 1.

## 5. Formato
- ~55-58 capítulos, POV dual — Mariana (ímpar) / Nico (par), primeira
  pessoa do presente.
- Extensão: 950-1100 palavras/capítulo, total ~55.000-58.000 palavras.
- Sem epílogo (mesma lógica do Livro 1 — reservar pra fechamento de
  série, se houver).

## 6. Pipeline operacional
1. ESCREVER (bia-ferreira-chapter-writer) — processo de 2 chamadas
   padrão, mirando topo da faixa nos últimos capítulos de cada ato.
2. RÉGUA (regua_gate.py) — trava dura.
3. VALIDAR (bia-ferreira-voice-validator) — score /7 contra as marcas
   desta série (seção 1).
4. Falha não-estrutural → auto-revisar (máx. 2) → aprovado com ressalva.
5. REGISTRAR (loop_state.py record) — trava dura.
6. Repetir até completar os capítulos.
7. bia-ferreira-editor-global — atenção a: nenhum vazamento de nome/
   fato de outra série da casa (incluindo o próprio Livro 1, exceto o
   cameo opcional autorizado); consistência jurídica básica do caso
   fictício do moot court; consistência do código-switching.
8. bia-ferreira-formatter — capa nova, tom "elite jurídica" próprio.

## 7. Símbolos
A definir na escrita — sugestão: algo ligado ao próprio ritual do moot
court (o martelo/gavel, a toga emprestada, um caderno de anotações
compartilhado que vai se enchendo da letra dos dois) que ganhe peso
simbólico crescente.

## 8. Decisões via AskUserQuestion — registro
Pergunta sobre qual par/departamento protagonizar o Livro 2 ficou SEM
RESPOSTA do usuário. Prossegui com a opção recomendada/primeira
listada — Direito (Harvard Law), elenco novo — como DEFAULT ASSUMIDO,
documentado aqui e em arco-trama-livro2.md, justificado por já constar
como sugestão explícita na própria bíblia do Livro 1. Ajustável se o
usuário discordar ao ver o resultado. Pseudônimo e registro de voz
mantidos sem repergunta, por consistência com o padrão já estabelecido
no catálogo.
