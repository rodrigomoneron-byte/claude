# DNA do Projeto — Enseada dos Ausentes (Segredos à Beira-Mar, Livro 2) (R.B. Guidenelli)

> Preenchido no onboarding em 2026-08-11. Segundo livro standalone do
> selo "Segredos à Beira-Mar", a partir da instrução do usuário
> "seguir" após a entrega de "A Casa de Vidro" e a menção ao potencial
> de antologia — par, caso e cidade fictícia inteiramente novos,
> criados pela casa (sem briefing formal desta vez), mantendo o
> registro de suspense doméstico/romance do selo.

## 0. Pseudônimo e branding
- Autor público: **R.B. Guidenelli**, mesma casa multi-série. Selo
  "Segredos à Beira-Mar" (romances standalone, litoral catarinense).
- Capa: mesma linha visual do selo (mistério costeiro, tons frios,
  atmosfera de suspense), elemento visual DIFERENTE do Livro 1 (casa
  de vidro moderna à noite) — sugestão: farol desativado contra um céu
  de tempestade, pousada de madeira envelhecida em segundo plano, luz
  âmbar contrastando com o azul frio do mar.

## 1. Estilo e Voz — marcas específicas deste livro
1. **Cidade pequena como personagem coletivo** — a marca central: o
   silêncio coletivo da vila funciona quase como antagonista
   ambiental, diferente do isolamento físico do Livro 1 (uma casa
   isolada) — aqui o perigo é social, todo mundo sabe e ninguém fala.
2. **Restauro como metáfora ativa** — Marina literalmente restaura a
   pousada enquanto reconstrói a própria capacidade de se apegar a um
   lugar — o trabalho manual dela deve aparecer em detalhe técnico
   real ao longo do livro, não só como pano de fundo.
3. **Obsessão solitária de Theo virando aliança** — ele carregou a
   investigação da mãe sozinho por catorze anos; a marca dele é o
   momento em que aceita ajuda de verdade pela primeira vez, não só
   tolera.
4. **Luto como ponte, não só ferida** — diferente de outros livros da
   casa onde o trauma é obstáculo a superar: aqui o luto compartilhado
   (Marina por Corina/pai; Theo pela mãe) é o que os conecta desde o
   início, não só o que os separa.
5. **O mar como relógio narrativo** — marés, tempestades, o farol —
   ecoando o recurso já usado em outros livros da casa (heat ligado a
   marcos de confiança), aqui ligado ao ritmo físico do oceano.
6. **Silêncio como cumplicidade, fala como coragem** — tema
   recorrente: cada personagem que finalmente fala (Osvaldo, a
   delegada regional) faz isso como ato de coragem custoso, não
   revelação barata.
7. **Capítulo fecha no gancho de mistério ou perigo**, herdado do
   padrão da casa.

## 2. RÉGUA ABSOLUTA (trava mecânica — regua_gate.py) — NÃO MUDA
- SÓ "nós", NUNCA "a gente" — narração e diálogo, qualquer registro.
- `regua_gate.py` (word-boundary correto) + grep manual `\ba gente\b`
  em todo capítulo antes de registrar.
- BUG DE WHITELIST CONHECIDO: o script mascara formas "gente da"/
  "gente daqui" — SEMPRE rodar `grep -ilE '\ba gente\b'
  outputs/conteudo/*.md` direto no lote completo como checagem
  adicional, não confiar só no script.
- VIGILÂNCIA MÁXIMA: apareceu em TODOS os livros já produzidos nesta
  casa, sem exceção — tratar como certeza estatística.

## 2b. LIMITE DE CONTEÚDO
- Nenhuma violência física gráfica/direta consumada contra Marina ou
  Theo em nenhum momento — a ameaça de Nogueira e do capanga dele é
  de intimidação, vigilância, dano a propriedade, pressão econômica;
  qualquer risco físico maior deve ser evitado a tempo dentro da
  própria cena.
- Nenhum controle coercitivo entre Marina e Theo.
- Consentimento explícito e claro em toda cena de intimidade.
- Luto e trauma (morte do pai de Marina, morte da tia-avó Corina,
  desaparecimento da mãe de Theo) tratados com sensibilidade
  psicológica real, nunca explorados pra choque barato.
- Resolução do perigo final via apoio da polícia estadual/sistema
  legal, NÃO vingança unilateral violenta de Theo (mesmo com motivação
  pessoal profunda — catorze anos de obsessão não podem se resolver
  em violência extrajudicial).
- Osvaldo e a delegada regional: cúmplices por medo/negligência
  institucional, não malícia — mantém o número de vilões genuínos
  restrito a Nogueira e o capanga dele.

## 3. CHECKPOINT DE CADÊNCIA E PROCESSO DE ESCRITA
Conclusão acumulada de 16 livros anteriores da casa: taxa de expansão
de emergência entre 89-100% em quase todos os atos — só a trava dura
no `loop_state.py record` funciona de forma confiável. Usar contagem
via Python (`len(open(f).read().split())`) como padrão, não `wc -w`.
Mirar o TOPO da faixa de palavras desde o Ato 1 — não parar no
primeiro número que passa do piso técnico, mirar pelo menos
1000-1050 depois de cada rodada de expansão.

## 4. Cadência de heat
- ~8-9 cenas, explícito-elegante, mesmo registro da casa.
- Primeira cena ~cap. 18-20 — ritmo médio da casa (nem tão adiada
  quanto o Livro 1 do selo, que tinha barreira empregador/empregada;
  nem tão adiantada quanto fake dating).
- Gap máximo 6 capítulos DEPOIS da primeira cena — CONTAR
  MANUALMENTE, mirando o TOPO da meta (9 cenas).

## 5. Formato
- ~55-58 capítulos, POV dual — Marina (ímpar) / Theo (par), primeira
  pessoa do presente.
- Extensão: 950-1100 palavras/capítulo, total ~55.000-58.000 palavras
  — MIRAR TOPO DA FAIXA DESDE O ATO 1.
- SEM epílogo formal — livro standalone do selo.

## 6. Pipeline operacional
1. ESCREVER (bia-ferreira-chapter-writer) — processo de 2 chamadas
   padrão, mirando topo da faixa desde o início.
2. RÉGUA (regua_gate.py) — trava dura + gate consolidado obrigatório.
3. LIMITE DE CONTEÚDO (seção 2b) — releitura obrigatória por capítulo.
4. VALIDAR (bia-ferreira-voice-validator) — score /7 contra as marcas
   desta série (seção 1).
5. Falha não-estrutural → auto-revisar (máx. 2) → aprovado com ressalva.
6. REGISTRAR (loop_state.py record) — trava dura.
7. Repetir até completar os capítulos.
8. bia-ferreira-editor-global — atenção a: nenhuma violência física
   consumada contra os protagonistas; resolução via sistema legal;
   plausibilidade de investigação policial de pequena cidade; nenhum
   vazamento de nome/fato de outra série/livro da casa (incluindo A
   Casa de Vidro); RESPEITO ESTRITO ao limite de conteúdo.
9. bia-ferreira-formatter — capa nova, tom "farol/pousada costeira
   catarinense" próprio.

## 7. Símbolos
O farol desativado; o diário de mergulhos de Corina; outros a definir
na escrita.

## 8. Decisões via onboarding — registro
Usuário respondeu "seguir" depois da entrega de "A Casa de Vidro" e
da menção, no resumo final, ao potencial de futura antologia
"Segredos à Beira-Mar" citado no próprio briefing original. Sem
briefing formal desta vez — par (Marina/Theo), mistério (mortes
"acidentais" ligadas a especulação imobiliária), cidade fictícia
(Angra do Marulho), antagonista, e toda a estrutura de 3 atos foram
CHAMADAS EDITORIAIS DIRETAS, criadas pela casa a partir do registro já
estabelecido pelo Livro 1 do selo, documentadas aqui e em
arco-trama.md.
