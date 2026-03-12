# KindleRanker BR — Integração Claude AI
# Como plugar o componente AIAnalysis nas páginas existentes

## 1. Backend — adicionar ao main.py

```python
# Adicione após os imports existentes:
from ai import router as ai_router
app.include_router(ai_router, prefix="/ai", tags=["IA"])
```

```bash
# Instalar dependência:
pip install anthropic

# Variável de ambiente:
export ANTHROPIC_API_KEY=sk-ant-...
# (adicione também no .env)
```

---

## 2. Página: Título — [asin].js

### Import
```js
import AIAnalysis from '../../components/AIAnalysis';
```

### Onde adicionar (após o bloco de vendas mensais, antes do fechamento de `</main>`):
```jsx
{titulo && (
  <AIAnalysis
    tipo="titulo"
    contexto={{
      asin,
      titulo: titulo.titulo?.titulo,
      autor: titulo.titulo?.autor,
      preco_sugerido: titulo.titulo?.preco_sugerido,
      bsr_geral: titulo.bsr_atual?.bsr_geral,
      bsr_categoria: titulo.bsr_atual?.bsr_categoria,
      categoria_nome: titulo.bsr_atual?.categoria_nome,
      vendas_diarias_estimadas: titulo.vendas_diarias_estimadas,
      total_royalties_brl: titulo.historico?.total_royalties_brl,
      total_kenp_br: titulo.historico?.total_kenp_br,
      total_unidades: titulo.historico?.total_unidades_br,
      meses_com_venda: titulo.historico?.meses_com_venda,
      historico_bsr: bsr,        // state existente
      kenp_mensal: kenp,         // state existente
    }}
    style={{ marginTop: 24 }}
  />
)}
```

---

## 3. Página: Catálogo — index.js

### Import
```js
import AIAnalysis from '../components/AIAnalysis';
```

### Onde adicionar (após o bloco Top KENP):
```jsx
{resumo && (
  <AIAnalysis
    tipo="catalogo"
    contexto={{
      total_titulos: resumo.totais?.total_titulos,
      total_royalties_brl: resumo.totais?.total_royalties_brl,
      total_kenp_br: resumo.totais?.total_kenp_br,
      total_unidades_br: resumo.totais?.total_unidades_br,
      top_kenp: resumo.top_kenp || [],
      evolucao_mensal: resumo.evolucao_mensal || [],
    }}
    style={{ marginTop: 48 }}
  />
)}
```

---

## 4. Página: Estimador — estimador.js

### Import
```js
import AIAnalysis from '../components/AIAnalysis';
```

### Onde adicionar (após o bloco de resultado, antes da tabela de calibração):
```jsx
{resultado && !loading && (
  <AIAnalysis
    tipo="estimador"
    contexto={{
      bsr,
      vendas_diarias_estimadas: resultado.vendas_diarias_estimadas,
      receita_diaria_estimada_brl: resultado.receita_diaria_estimada_brl,
      receita_mensal_estimada_brl: resultado.receita_mensal_estimada_brl,
      amostras_calibracao: resultado.amostras_calibracao,
      faixa_min: resultado.faixa?.min,
      faixa_max: resultado.faixa?.max,
    }}
    style={{ marginBottom: 40 }}
  />
)}
```

---

## 5. Variáveis de ambiente completas (.env)

```env
# Banco
DB_HOST=localhost
DB_PORT=5432
DB_NAME=kindleranker
DB_USER=postgres
DB_PASS=sua_senha

# APIs
RAINFOREST_API_KEY=sua_chave_rainforest
ANTHROPIC_API_KEY=sk-ant-sua_chave_aqui

# Frontend
NEXT_PUBLIC_API_URL=http://localhost:8000
```

---

## 6. Custo estimado por análise

| Tipo       | Tokens médios | Custo ~USD |
|------------|:-------------:|:----------:|
| Título     | ~700          | $0.0021    |
| Catálogo   | ~800          | $0.0024    |
| Estimador  | ~400          | $0.0012    |

Modelo: claude-sonnet-4-20250514
Preço referência: $3/M input + $15/M output

Para 1.000 análises/mês: ~$2–5 (irrelevante vs. receita de assinatura)
