# DNA do Projeto — Família Bittencourt, Livro 2 (R.B. Guidenelli)

> Preenchido no onboarding em 2026-08-02. Segundo livro da série,
> protagonizado por Pedro Bittencourt (arco de redenção) — herda as
> decisões técnicas do Livro 1 quase sem mudança; a mudança real é de
> protagonista e tom (vilão-vira-herói, não mais fake dating).

## 0. Pseudônimo e branding
- Autor público: **R.B. Guidenelli**, mesma casa multi-série do L1.
- Capa: NÃO herdar automaticamente o prompt do L1 (glamour
  paulistano/taças) nem o branding do "clube de carvalho" de outras
  séries — decidir na formatação, tom mais "redenção"/"segunda
  chance", talvez incorporando Lisboa visualmente (azulejo, luz
  diferente de São Paulo) como contraste.

## 1. Estilo e Voz — marcas herdadas do L1, reapontadas pro Pedro
1. **Fachada que racha em público** — invertida: Pedro já não tem
   mais fachada a proteger (perdeu tudo publicamente no L1); a marca
   aqui é a tentação de reconstruir uma fachada nova (a de "homem
   mudado") em vez de deixar a mudança ser real e imperfeita.
2. **Status como armadura** — Pedro precisa aprender a existir sem o
   cargo/sobrenome como proteção, provavelmente pela primeira vez na
   vida adulta.
3. **Slow burn medido em confiança que precisa ser conquistada, não
   assumida** — diferente do L1 (onde os protagonistas desconfiavam
   um do outro por igual), aqui o desequilíbrio é real: Pedro tem mais
   a provar que a outra pessoa.
4. **Rivalidade vira atração** — NÃO se aplica da mesma forma (Pedro
   não está competindo profissionalmente com o interesse romântico,
   salvo se a escrita decidir criar esse ângulo).
5. **Preço visível** — o preço de Pedro é reputação e tempo, não
   dinheiro (ele já perdeu o cargo).
6. **Humor leve como alívio** — Pedro pode ter humor autodepreciativo
   novo (diferente da arrogância do L1), coerente com humildade
   genuína sendo aprendida.
7. **Capítulo fecha no gesto que reabre o jogo** — herdado sem mudança.

## 2. RÉGUA ABSOLUTA — NÃO MUDA
- SÓ "nós", NUNCA "a gente" — mesma trava mecânica do L1, mesma
  vigilância redobrada (registro brasileiro natural + trecho em
  Lisboa com português europeu em diálogo de personagens locais,
  mas SEM que isso afete a régua da narração/POV de Pedro).
- `regua_gate.py` + grep manual em todo capítulo antes de registrar.

## 3. CHECKPOINT DE CADÊNCIA E PROCESSO DE ESCRITA — status honesto
herdado do L1
- Piso de extensão como TRAVA DURA no `loop_state.py record` —
  confiável, mantém o livro dentro da meta de palavras.
- Processo de escrita em 2 chamadas (Write parcial → `wc -w` real →
  expandir → Edit do resto → `wc -w` final): no Livro 1, a taxa de
  capítulos precisando de expansão de emergência ficou ALTA o livro
  inteiro (100% Ato 1, ~91% Ato 2, 100% Ato 3) — pior que o resultado
  misto observado em Jogo Infinito L5. MIRAR ATIVAMENTE o topo da
  faixa (1050-1100) desde o CAPÍTULO 1 deste livro, não só depois de
  perceber déficit acumulado — essa foi a lição mais clara do L1 (a
  correção só chegou tarde, ato a ato, nunca fechou de vez).

## 4. Cadência de heat
- ~10 cenas, explícito-elegante (80/20), primeira cena até o cap. 10
  (ajustável: como o livro é sobre reconstrução de confiança, pode
  fazer sentido esperar mais — decidir na escrita, mas não deixar
  pra depois do meio do livro sem necessidade, lição do L1 que
  atrasou demais e teve que recuperar ritmo ato a ato).
- Gap máximo 6 capítulos.

## 5. Formato
- ~55 capítulos, POV dual — Pedro (ímpar) / novo interesse romântico
  (par), primeira pessoa do presente.
- Extensão: 950-1100 palavras/capítulo, total ~55.000-58.000 palavras.
- Sem epílogo (reservar decisão pro Livro 3, fechamento da trilogia).

## 6. Pipeline operacional
1. ESCREVER (bia-ferreira-chapter-writer) — processo de 2 chamadas,
   mirando 1050-1100 desde o cap. 1.
2. RÉGUA (regua_gate.py) — trava dura.
3. VALIDAR (bia-ferreira-voice-validator) — score /7 contra as marcas
   adaptadas deste livro (seção 1).
4. Falha não-estrutural → auto-revisar (máx. 2) → aprovado com ressalva.
5. REGISTRAR (loop_state.py record) — trava dura.
6. Repetir até 55 capítulos.
7. bia-ferreira-editor-global — atenção a continuidade com o Livro 1
   (fatos herdados: segredo de Ricardo, demissão de Pedro, Fundo
   Travessia) e a nenhum vazamento de outra série da casa.
8. bia-ferreira-formatter — capa nova, não herdada do L1.

## 7. Símbolos
Nenhum herdado obrigatoriamente do L1 (a taça de vidro era o símbolo
de Isabela/Leo especificamente) — criar um símbolo próprio pro arco de
Pedro na escrita (ex: algo ligado a Lisboa, ou a reconstrução física
de um objeto/lugar, ecoando mas não repetindo o motivo do vidro).

## 8. Decisões via AskUserQuestion sem resposta — defaults assumidos
Enviado no onboarding deste livro (quem protagoniza o Livro 2), sem
resposta do usuário — seguida a primeira opção listada, marcada como
recomendada: **Pedro Bittencourt, arco de redenção**. Justificativa:
Pedro já tem um arco em andamento plantado no fechamento do L1
(Lisboa, terapia, raízes do pai), o que torna a premissa do Livro 2
natural em vez de inventada do zero; "vilão vira herói" é trope forte
e reconhecível pro público-alvo do briefing original (romance
contemporâneo, Kindle Unlimited). Ajustável se o usuário discordar ao
ver o resultado.
