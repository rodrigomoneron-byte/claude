# Triagem de seguidores — @rodrigomoneron

Ferramenta para decidir **quem remover e em que ordem** ao limpar uma base de
seguidores contaminada por sorteios e por fases antigas do perfil.

## O problema que ela resolve

Não existe remoção de seguidores em massa no Instagram. Não há no app, não há
na Graph API oficial, e não há via Windsor.ai — o conector do Instagram só
escreve post de imagem. **A remoção é manual, um perfil por vez.**

O que dá para automatizar é a decisão. O export oficial da conta traz, para
cada seguidor, a data em que ele passou a te seguir. Sorteios e campanhas
antigas aparecem como picos nessa série temporal, o que transforma "remover
9 mil pessoas no escuro" em "remover estas 6.200, nesta ordem".

## Passo 1 — Baixar o export

No app ou no site: **Central de Contas → Sua informação e permissões → Baixar
suas informações**. Peça em **JSON** (não HTML). Escolha só "Seguidores e
seguindo" para o arquivo sair menor e chegar mais rápido.

O e-mail com o link costuma levar de algumas horas a um dia. Do pacote,
interessam `followers_1.json` (pode vir particionado em `followers_2.json`
etc.) e, opcionalmente, `following.json`.

## Passo 2 — Achar as coortes

```bash
python3 triagem_seguidores.py followers_1.json --histograma
```

Sai um histograma de follows por mês com os picos marcados. A referência é a
**mediana**, não a média — num perfil com sorteios, os próprios picos puxam a
média para cima e passariam despercebidos atrás dela.

```
  2021-02       18  #
  2021-03    3.800  ####################################  <-- pico
  2021-04    2.600  #########################  <-- pico
  2021-05       18  #
```

Confira se os meses marcados batem com as datas dos seus sorteios.

## Passo 3 — Extrair a lista

```bash
python3 triagem_seguidores.py followers_1.json \
    --janela 2021-03-01 2021-04-30 \
    --seguindo following.json \
    --saida coorte-sorteio-2021.csv
```

`--seguindo` protege quem você segue de volta: essas contas quase sempre são
contatos reais, mesmo tendo entrado por um sorteio. O CSV sai ordenado por
data, com uma coluna `removido` em branco para você marcar conforme avança.

## Passo 4 — Remover, com limite

No app: **Perfil → Seguidores → buscar o usuário → Remover**. A pessoa não é
notificada, e a ação **não tem desfazer**.

Duas regras que valem mais que a pressa:

- **Máximo de 100 a 200 por dia.** O Instagram aplica limites de ação não
  publicados; volume alto em pouco tempo aciona bloqueio temporário de ações
  na conta. Nesse ritmo, 6 mil remoções levam de um a dois meses.
- **Nunca use app ou serviço de "limpeza automática".** Todos pedem sua
  senha, violam os termos de uso e colocam a conta em risco de banimento.
  Não existe ganho que compense.

## Passo 5 — Fazer em paralelo, não antes

A limpeza leva semanas. **Não espere terminar para voltar a publicar.** Os
333 dias sem publicar em 14 meses são um problema maior que os seguidores
desqualificados, e os dois se resolvem ao mesmo tempo: a limpeza é trabalho
de bastidor, a cadência é o que muda o resultado.

## Nota sobre os números

O `profile_followers_count` do conector Windsor guarda apenas o total do dia
da consulta — não há histórico de crescimento por lá. A série temporal
começou a se acumular em 28/08/2026. A data de follow por pessoa, que é o que
esta ferramenta usa, só existe no export oficial.
