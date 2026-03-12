"""
KindleRanker BR — Análise de Calibração
Uso: python calibration_analysis.py
Env: DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASS
"""
import os
import pandas as pd
import psycopg2
def get_conn():
    return psycopg2.connect(
        host=os.getenv("DB_HOST","localhost"), port=os.getenv("DB_PORT",5432),
        dbname=os.getenv("DB_NAME","kindleranker"), user=os.getenv("DB_USER","postgres"),
        password=os.getenv("DB_PASS",""),
    )
def run(conn):
    print("\n=== PERFORMANCE MENSAL — Amazon.com.br ===")
    df=pd.read_sql("""
        SELECT ms.periodo, COUNT(DISTINCT ms.asin) AS titulos_ativos,
            SUM(ms.unidades_liquidas) AS unidades,
            SUM(ms.royalties) AS royalties_brl,
            SUM(dk.kenp_mensal) AS kenp_total
        FROM monthly_sales ms
        JOIN stores s ON s.id=ms.store_id AND s.codigo='Amazon.com.br'
        LEFT JOIN (
            SELECT asin, DATE_TRUNC('month',data)::DATE AS mes, SUM(kenp) AS kenp_mensal
            FROM daily_kenp dk2
            JOIN stores s2 ON s2.id=dk2.store_id AND s2.codigo='Amazon.com.br'
            GROUP BY asin,mes
        ) dk ON dk.asin=ms.asin AND dk.mes=ms.periodo
        WHERE ms.moeda='BRL'
        GROUP BY ms.periodo ORDER BY ms.periodo
    """,conn)
    print(df.tail(24).to_string(index=False))
    print("\n=== EFEITO CASCATA — Secret 1 e 2 (out 2020 → jan 2021) ===")
    df2=pd.read_sql("""
        SELECT ms.periodo, t.titulo, ms.unidades_liquidas,
            ms.royalties AS royalties_brl, COALESCE(dk.kenp_mensal,0) AS kenp_mensal
        FROM monthly_sales ms
        JOIN titles t ON t.asin=ms.asin
        JOIN stores s ON s.id=ms.store_id AND s.codigo='Amazon.com.br'
        LEFT JOIN (
            SELECT asin, DATE_TRUNC('month',data)::DATE AS mes, SUM(kenp) AS kenp_mensal
            FROM daily_kenp dk2
            JOIN stores s2 ON s2.id=dk2.store_id AND s2.codigo='Amazon.com.br'
            GROUP BY asin,mes
        ) dk ON dk.asin=ms.asin AND dk.mes=ms.periodo
        WHERE ms.moeda='BRL'
          AND ms.periodo BETWEEN '2020-09-01' AND '2021-02-01'
        ORDER BY ms.periodo, kenp_mensal DESC
    """,conn)
    print(df2.to_string(index=False))
    print("\n=== TOP 10 TÍTULOS POR KENP TOTAL — BR ===")
    df3=pd.read_sql("""
        SELECT t.asin, t.titulo, SUM(dk.kenp) AS kenp_total,
            COUNT(DISTINCT dk.data) AS dias_com_leitura,
            MIN(dk.data) AS primeira_leitura, MAX(dk.data) AS ultima_leitura
        FROM daily_kenp dk
        JOIN titles t ON t.asin=dk.asin
        JOIN stores s ON s.id=dk.store_id AND s.codigo='Amazon.com.br'
        GROUP BY t.asin,t.titulo ORDER BY kenp_total DESC LIMIT 10
    """,conn)
    print(df3.to_string(index=False))
    print("\n=== SAZONALIDADE — KENP médio por mês do ano (BR) ===")
    df4=pd.read_sql("""
        SELECT EXTRACT(MONTH FROM data) AS mes,
            TO_CHAR(data,'Month') AS nome_mes,
            ROUND(AVG(kenp)) AS kenp_medio_diario,
            COUNT(DISTINCT DATE_TRUNC('year',data)) AS anos_observados
        FROM daily_kenp dk
        JOIN stores s ON s.id=dk.store_id AND s.codigo='Amazon.com.br'
        GROUP BY EXTRACT(MONTH FROM data), TO_CHAR(data,'Month')
        ORDER BY mes
    """,conn)
    print(df4.to_string(index=False))
    print("\n=== TABELA DE CALIBRAÇÃO ATUAL ===")
    df5=pd.read_sql("""
        SELECT bsr_min,bsr_max,vendas_diarias_min,vendas_diarias_max,
            vendas_diarias_media,amostras,ultima_atualizacao
        FROM bsr_calibration WHERE mercado='Amazon.com.br' ORDER BY bsr_min
    """,conn)
    print(df5.to_string(index=False))
    print("\n✓ Análise concluída.")
if __name__=="__main__":
    conn=get_conn()
    try: run(conn)
    finally: conn.close()
