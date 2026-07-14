# DNA do Projeto — Série "A Mão na Alavanca" (R.B. Guidenelli)

## 0. Pseudônimo e branding
- Autor público: **R.B. Guidenelli** (conceito "The Old English
  Gentleman's Club" — ver references/branding-rbg.md).
- Nota histórica: referências internas antigas a "Bia Ferreira" (nomes de
  skills/arquivos) designam a MESMA voz da casa. A voz não mudou; só o
  pseudônimo público.

## 1. Estilo e Voz (as 7 marcas — resumo operacional)
1. **1ª pessoa do PRESENTE**, sempre. Dual POV alternado, 1 POV por
   capítulo, nome do POV no cabeçalho.
2. **Frase de abertura forte** que planta o conflito do capítulo na
   primeira linha.
3. **Fechamento que vira o chão**: última frase de cada capítulo
   reorganiza ou aprofunda (nunca resumo morno).
4. **Interioridade com imagem concreta**: emoção sempre ancorada em
   objeto/gesto físico (terra, chave, pão, tailleur), nunca abstração pura.
5. **Diálogo como duelo**: personagens falam com subtexto e estratégia;
   ninguém explica a trama em voz alta.
6. **Símbolos recorrentes costurados** (mín. 3 aparições ao longo do livro
   por símbolo central).
7. **Slow burn com temperatura**: desejo presente desde cedo, consumação
   controlada, heat a serviço do arco.

## 2. RÉGUA ABSOLUTA (trava mecânica — regua_gate.py)
- SÓ **"nós"**. NUNCA **"a gente"** — em narração NEM em diálogo de
  NENHUM personagem (nem popular, nem criança, nem vilão).
- PROIBIDO o device: personagem dizendo "a gente" e se corrigindo,
  citando "a régua", ou "se ouvindo" falar errado. Se surgir o impulso,
  reescrever a fala limpa.
- Falsos positivos permitidos (whitelist do gate): "essa gente",
  "esta gente", "toda gente", "nossa gente", "muita gente", "gente demais" etc.
- TODO capítulo passa pelo gate ANTES de ser registrado. HIT = corrigir
  e revalidar. Sem exceção.

## 3. HEAT (new adult, público feminino — 80/20)
- **~20% dos capítulos** com cena íntima DE VERDADE (67 caps ≈ 13-14 cenas).
- Registro: **explícito mas elegante** — mostra o ato (corpos, sensações,
  ritmo), sensorial + emocional, SEM vulgaridade/termo clínico, SEM fade
  to black.
- Nunca gratuito: cada cena avança a relação (trégua, reconciliação,
  entrega, celebração, sobrevivência).
- Nunca desertos de 10+ caps sem cena. Verificar a cada capítulo: "há
  quantos caps desde a última?" Se >5, a próxima oportunidade natural vira cena.
- Régua vale DENTRO da cena também.

## 4. Formato
- 67 capítulos (66 + Epílogo), ~950–1100 palavras/cap, total ~63–70k.
- Cabeçalho do arquivo: `# Livro 3 — Capítulo N` + `### POV: Nome`
  (o formatter converte em subtítulo discreto na diagramação).
- Arquivos: `outputs/conteudo/livro3-capituloNN.md` (NN = 01..67).

## 5. Marcas de Qualidade / Checklist de Validação (por capítulo)
- [ ] Régua limpa (gate = LIMPO)
- [ ] POV correto (Daniel ímpar / Consultora par) e 1ª pessoa presente
- [ ] Abertura forte + fechamento que vira o chão
- [ ] Pelo menos 1 imagem concreta ancorando emoção
- [ ] Continuidade com a bíblia (arco-trama-livro3.md) — NUNCA contradizer
      decisões travadas
- [ ] Heat: cadência 80/20 monitorada
- [ ] Score mínimo de aprovação: 7/7 marcas → registrar; <7 → revisar antes

## 6. Requisitos de Formatação (fase final)
- EPUB 3.0 + PDF 6"x9" KDP via bia-ferreira-formatter (autor default já
  = R.B. Guidenelli), prompt de capa no branding Gentleman's Club,
  metadados com série "A Mão na Alavanca", series_index 3.
