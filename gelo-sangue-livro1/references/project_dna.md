# DNA do Projeto — Gelo e Sangue (R.B. Guidenelli)

## 0. Pseudônimo e branding
- Autor público: **R.B. Guidenelli** (conceito "The Old English
  Gentleman's Club" — ver references/branding-rbg.md). Paleta/textura
  da casa mantida; a imagem-concept da capa deste livro é de gelo/rinque
  (ver seção 6).

## 1. Estilo e Voz (as 7 marcas — próprias deste livro)
1. **Provocação que vira confissão** — a alfinetada mais afiada (trash
   talk em quadra, comentário cortante de Baz, ironia de Isa) entrega,
   sem querer, o que o personagem protege.
2. **Controle como linguagem corporal** — poder/posse mostrados em
   micro-gesto ou objeto (o relógio de Baz, a paleta de cores de Isa
   ficando mais clara perto dele, o ombro que Dante esconde de todos),
   nunca declarado em abstrato ("ele era controlador").
3. **Slow burn medido em proximidade negada** — a tensão entre Dante e
   Isa mora no quase, na distância que diminui aos poucos; nenhum dos
   dois está caçando o outro, os dois estão se reconhecendo.
4. **A máscara pública esconde a ferida privada** — o "casal perfeito"
   de Baz/Isa e o "atleta invencível" de Dante são fachadas que racham
   aos poucos ao longo do livro, sempre por gesto/deslize, nunca por
   declaração direta.
5. **O proibido tem preço visível** — cada aproximação entre Dante e
   Isa custa algo concreto (risco real de exposição, não medo abstrato).
6. **Humor ácido como armadura** — Dante e Isa usam ironia seca como
   escudo emocional; nunca a narração comenta que foi piada.
7. **O capítulo fecha no gesto que abre um loop** — virada um beat
   antes do fim; última linha é reação física que deixa um fio puxando
   o próximo capítulo. Loop suave na maioria, cliffhanger forte em ~30%.

## 2. RÉGUA ABSOLUTA (trava mecânica — regua_gate.py) — NÃO MUDA ENTRE LIVROS
- SÓ **"nós"**. NUNCA **"a gente"** — em narração NEM em diálogo de
  NENHUM personagem (nem popular, nem criança, nem vilão).
- PROIBIDO o device: personagem dizendo "a gente" e se corrigindo,
  citando "a régua", ou "se ouvindo" falar errado. Isso inclui a
  narração comentando que "não corrigiu" a fala de alguém — já é
  quebra de quarta parede. Se surgir o impulso, reescrever a fala
  limpa.
- Falsos positivos permitidos (whitelist do gate): "essa gente",
  "esta gente", "toda gente", "nossa gente", "muita gente", "gente
  demais" etc.
- TODO capítulo passa pelo gate ANTES de ser registrado, E por
  varredura manual `grep -n "a gente"` (o gate tem bug conhecido de
  substring — window de 12 caracteres pode mascarar hit real perto de
  frase whitelisted). HIT = corrigir e revalidar. Sem exceção.
- **Nota de ambientação:** cenário é Boston/Toronto/Alberta (Canadá/
  EUA), mas o livro é escrito em português para o público brasileiro —
  brasileirismo é permitido no registro coloquial dos diálogos (ao
  contrário do L1 original da casa, que proibia por ser ambientado e
  vendido como "muito Nova York"); confirmar bom senso: gíria muito
  regional brasileira (ex.: "mano", "só que não") ainda deve ser evitada
  por destoar do cenário, mas contrações e calor de fala nordestina/
  paulistana não são obrigatórias de evitar como eram no L1.

## 3. HEAT
- Registro: **explícito-elegante** (mostra o ato, sensorial + emocional,
  sem vulgaridade/termo clínico, sem fade to black).
- Cadência-alvo: **80/20** (~12 cenas em 60 capítulos).
- Janela da primeira cena: **a partir do cap 24-28** (trégua não
  planejada, não cálculo — coerente com a psicologia dos dois: nenhum
  dos dois está caçando o outro).
- Regra de gap máximo: nunca mais de 5-6 capítulos sem oportunidade real
  DEPOIS da primeira cena — mas nunca forçar cena que contradiga o beat
  da trama.
- **REVISADO (pós-cap. 40, decisão explícita do dono):** a proibição
  original de cena no Ato 3 foi REABERTA a pedido do dono, para permitir
  bater a meta de ~12 cenas travada no onboarding. Cena(s) no Ato 3 são
  permitidas SE emocionalmente justificadas pelo beat exato do capítulo
  (ex.: última vez juntos antes da exposição, reencontro breve em meio
  ao colapso) — continua valendo "nunca gratuito", só a proibição
  categórica de local-no-ato foi removida. Evitar colocar cena no
  capítulo do clímax da exposição em si nem nos capítulos finais de
  queda pura (maca, fuga) — priorizar janelas de proximidade real ainda
  plausíveis antes da ruptura consumada.
- Nunca gratuito: cada cena avança a relação (identificação mútua,
  trégua, entrega) — nunca é sedução calculada de nenhum dos dois lados.

## 4. Formato
- **60 capítulos** (sem epílogo neste volume — fecha em colapso
  proposital, epílogo fica reservado para o Livro 3 da trilogia).
- Extensão: modelo (a) — número fixo por capítulo: **~950-1100
  palavras/cap**, total estimado **~57.000-66.000 palavras**.
- Cabeçalho do arquivo: `# Gelo — Capítulo N` + `### POV: Nome`
  (o formatter converte em subtítulo discreto na diagramação).
- Arquivos: `outputs/conteudo/gelo-capituloNN.md` (NN = 01..60).

## 5. Marcas de Qualidade / Checklist de Validação (por capítulo)
- [ ] Régua limpa (gate = LIMPO + grep manual confirmado)
- [ ] POV correto (Dante ímpar / Isa par) e 1ª pessoa presente
- [ ] Abertura forte + fechamento que vira o chão
- [ ] Pelo menos 1 imagem concreta ancorando emoção
- [ ] Continuidade com a bíblia (arco-trama-livro1.md) — NUNCA
      contradizer decisões travadas, incluindo os nomes fictícios de
      time (Griffins/Comets, nunca os nomes reais da fonte)
- [ ] Baz nunca tem capítulo de POV próprio
- [ ] Heat: cadência monitorada contra a meta da seção 3
- [ ] Score mínimo de aprovação: ~78% das 7 marcas (≥5,5/7) →
      registrar; abaixo → revisar antes

## 6. Requisitos de Formatação (fase final)
- EPUB 3.0 + PDF 6"x9" KDP via bia-ferreira-formatter (autor default =
  R.B. Guidenelli), prompt de capa no branding da casa (paleta "Old
  English Gentleman's Club") adaptado à imagem-conceito deste livro:
  gelo rachado/rinque vazio sob luz fria, com um acento quente pontual
  (a paleta de cores da Isa, ou a bússola quebrada) — sem casal em pose
  romântica, sem rosto explícito. Metadados: série "Gelo e Sangue",
  series_index 1.
