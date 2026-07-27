# DNA do Projeto — Jogo Infinito, Livro 2: Alianças e Traições (R.B. Guidenelli)

> Preenchido no onboarding em 2026-07-27. Segundo livro da série "Jogo
> Infinito" — herda as decisões de nível-série já travadas no Livro 1
> (ver jogo-infinito-livro1/references/arco-trama-livro1.md, seção
> "DECISÕES A TRAVAR NO ONBOARDING") e trava, via AskUserQuestion, as
> decisões novas específicas deste volume (papel de Alexandra Voss
> Whitfield, traição interna, salto de tempo).

## 0. Pseudônimo e branding
- Autor público: **R.B. Guidenelli** (mesmo branding "The Old English
  Gentleman's Club" — ver references/branding-rbg.md, idêntico ao
  Livro 1). Mesmo universo do Livro 1 — elenco principal herdado,
  ISOLADO de Gelo e Sangue e de qualquer outro livro da casa.

## 1. Estilo e Voz (7 marcas — herdadas do Livro 1, sem mudança)
1. **Estratégia como linguagem corporal**
2. **A neutralidade que já é escolha** — agora aplicada a Patricia, não
   mais a Cami (que já escolheu lado no Livro 1): a "neutralidade
   profissional" dela como conselheira é a fachada que esconde a
   escolha real que ela já fez.
3. **Slow burn medido em conflito de interesse** — reaplicado: Cami e
   Alex já estão juntos, então o conflito de interesse desta vez é
   entre a relação deles e a expansão internacional (trabalhar juntos
   left a intimidade doméstica e a parceria profissional emaranhadas).
4. **Rivalidade que é intimidade antiga** — reaplicada a Alex e
   Alexandra Voss Whitfield: parentesco nunca explorado, rivalidade
   profissional que carrega curiosidade e mágoa genuínas por trás da
   cordialidade calculada.
5. **O jogo tem preço visível e concreto**
6. **Humor ácido como blindagem executiva**
7. **O capítulo fecha no gesto que reabre o jogo**

## 2. RÉGUA ABSOLUTA (trava mecânica — regua_gate.py) — NÃO MUDA ENTRE LIVROS
- SÓ **"nós"**. NUNCA **"a gente"** — em narração NEM em diálogo de
  NENHUM personagem. Mesma régua do Livro 1, idêntica em toda a casa.
- PROIBIDO o device: personagem dizendo "a gente" e se corrigindo, ou a
  narração comentando a própria régua — quebra de quarta parede.
- Falsos positivos permitidos (whitelist do gate): "essa/esta/toda/
  nossa/muita/tanta gente", "gente demais", "gente de/da/que/como" no
  sentido de "pessoas".
- TODO capítulo passa pelo gate + varredura manual `grep -n "a gente"`
  ANTES de ser registrado. Sem exceção. Zero brasileirismo (Nova
  York/Europa continental como cenário).
- **NOVO ACHADO NESTE LIVRO (cap. 2)**: o gate (`\ba gente\b` com
  fronteira de palavra) NÃO captura formas obliquas coladas, tipo
  "pra gente" (= "para nós"), "da gente", "na gente", "com a gente" —
  porque o "a" de "pra" gruda no "r" sem fronteira de palavra antes do
  "a gente" embutido. Essas formas são a MESMA contração proibida
  (usando "gente" como pronome no lugar de "nós"/"nosso"). Rodar
  SEMPRE `grep -n "pra gente\|da gente\|na gente\|com a gente\|dessa gente\|desta gente"`
  manualmente além do `grep -n "a gente"` padrão, em todo capítulo
  deste livro.
- **LIÇÃO DO LIVRO 1**: escrever cada capítulo já na extensão-alvo
  (~950-1100 palavras) desde a primeira versão — o Livro 1 fechou
  50.813 palavras nas 60 capítulos originais e precisou de um passe de
  reforço pós-produção pra chegar a 58.013. Não repetir esse padrão:
  medir `wc -w` a cada capítulo escrito e expandir ANTES de registrar,
  nunca depois.

## 3. HEAT (registro e cadência deste livro)
- Registro: **explícito-elegante** (mesmo padrão da casa).
- Cadência-alvo: **80/20**, ~12 cenas ao longo do livro.
- Janela da primeira cena: bem mais cedo que no Livro 1 — Cami e Alex
  já são casal estabelecido, não há mais conflito de interesse
  bloqueando a intimidade. Primeira cena pode cair já no Ato 1 (~cap.
  4-6), refletindo relação já consolidada.
- Regra de gap máximo: nunca mais de 5-6 capítulos sem oportunidade
  real — **LIÇÃO DO LIVRO 1**: dois gaps excederam o máximo (11 e 7
  capítulos) por respeitar a regra de "nunca forçar cena que contradiga
  o beat da trama"; vigiar cadência ativamente a cada 5 capítulos
  registrados neste livro pra não repetir o padrão.
- Nenhuma cena de heat nos capítulos de clímax (confronto com
  Alexandra, revelação da traição interna, virada final).
- Nunca gratuito: cada cena avança a relação (agora testada por rotina
  e trabalho conjunto, não por crise) ou o conflito de interesse novo
  (tempo/atenção divididos entre casa e expansão).

## 4. Formato
- **60 capítulos**, sem epílogo (reservado ao Livro 5). Mesmo modelo do
  Livro 1.
- Extensão: ~950-1100 palavras/capítulo, total ~58.000-67.000 palavras.
  **Escrever cada capítulo já na extensão-alvo — ver lição da seção 2.**
- Cabeçalho do arquivo: `# Jogo Infinito — Livro 2 — Capítulo N` +
  `### POV: Nome`.
- Arquivos: `outputs/conteudo/jogo2-capituloNN.md` (NN = 01..60).

## 5. Marcas de Qualidade / Checklist de Validação (por capítulo)
- [ ] Régua limpa (gate = LIMPO + grep manual confirmado)
- [ ] POV correto (Cami ímpar / Alex par) e tempo verbal correto (1ª
      pessoa do presente)
- [ ] Extensão dentro de ~950-1100 palavras JÁ na primeira versão
- [ ] Abertura forte + fechamento que vira o chão (marca 7)
- [ ] Continuidade com a bíblia (arco-trama-livro2.md) e com o canon
      herdado do Livro 1 (mundo-personagens-livro2.md) — NUNCA
      contradizer fatos já estabelecidos
- [ ] Heat: cadência monitorada contra a meta da seção 3
- [ ] Score mínimo de aprovação: ~78% das marcas aplicáveis → registrar

## 6. Requisitos de Formatação (fase final)
- EPUB 3.0 + PDF 6"x9" KDP via bia-ferreira-formatter, prompt de capa
  no branding da casa. Imagem-conceito deste livro: evolução da capa
  do Livro 1 — o mesmo relógio de bolso e a mesma caneta, agora ao
  lado de um segundo objeto novo (ex.: um passaporte ou um cartão de
  embarque, representando a expansão internacional), mesma paleta fria
  dominante com acento de ouro envelhecido, chiaroscuro, sem casal, sem
  rosto. Metadados: série "Jogo Infinito", series_index 2.

## 7. DECISÕES NOVAS TRAVADAS NESTE ONBOARDING (via AskUserQuestion, 2026-07-27)
1. ✅ Alexandra Voss Whitfield: **antagonista disfarçada de aliada** —
   entra como parceira legítima, ganha confiança real de Alex e Cami,
   mas carrega agenda oculta ligada ao próprio passado da família Voss;
   a aliança vira traição no clímax.
2. ✅ Traição interna: **sim** — alguém do círculo já estabelecido
   também trai a confiança de Alex/Cami. Escolha de elenco (não
   travada por AskUserQuestion, proposta e documentada na bíblia):
   **Patricia** — não por vilania, mas por convicção genuína de que
   Alexandra representa proteção mais segura pro valor da empresa do
   que a liderança pessoal de Alex; mantém a régua "compreendido, não
   caricato".
3. ✅ Salto de tempo: **poucas semanas** desde o fim do Livro 1 — Cami
   e Alex ainda em consolidação pós-crise, expansão europeia já em
   movimento.
