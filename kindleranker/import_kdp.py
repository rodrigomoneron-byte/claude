"""
KindleRanker BR — Importador KDP
Uso: python import_kdp.py --file caminho/para/relatorio.xlsx
Env: DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASS
"""
import os, sys, argparse
import pandas as pd
import psycopg2
from psycopg2.extras import execute_values
from datetime import datetime
def get_conn():
    return psycopg2.connect(
        host=os.getenv("DB_HOST","localhost"), port=os.getenv("DB_PORT",5432),
        dbname=os.getenv("DB_NAME","kindleranker"), user=os.getenv("DB_USER","postgres"),
        password=os.getenv("DB_PASS",""),
    )
MES_PT = {"janeiro":1,"fevereiro":2,"março":3,"abril":4,"maio":5,"junho":6,
          "julho":7,"agosto":8,"setembro":9,"outubro":10,"novembro":11,"dezembro":12}
def parse_periodo_pt(texto):
    from datetime import date
    partes = str(texto).strip().lower().split()
    if len(partes)==2:
        mes=MES_PT.get(partes[0]); ano=int(partes[1])
        if mes: return date(ano,mes,1)
    return None
def parse_periodo_yyyymm(valor):
    from datetime import date
    if pd.isna(valor): return None
    s=str(valor)[:7]
    try: return date(int(s[:4]),int(s[5:7]),1)
    except: return None
def get_store_id(cur, codigo):
    cur.execute("SELECT id FROM stores WHERE codigo=%s",(codigo,))
    row=cur.fetchone(); return row[0] if row else None
def import_titles(cur, df_vendas, df_kenp):
    print("→ Importando títulos...")
    registros={}
    for _,row in df_vendas.iterrows():
        asin=str(row.get("Código ASIN/ISBN") or row.get("ASIN","")).strip()
        if not asin or asin=="nan": continue
        if asin not in registros:
            registros[asin]={"asin":asin,"titulo":str(row.get("Título","")).strip(),
                "autor":str(row.get("Nome do autor","")).strip(),
                "preco_sugerido":row.get("Preço sugerido médio sem impostos"),
                "tipo_royalty":str(row.get("Tipo de royalty","")).strip(),
                "tamanho_mb":row.get("Tamanho médio do arquivo (MB)")}
    for _,row in df_kenp.iterrows():
        asin=str(row.get("ASIN","")).strip()
        if not asin or asin=="nan": continue
        if asin not in registros:
            registros[asin]={"asin":asin,"titulo":str(row.get("Título","")).strip(),
                "autor":str(row.get("Nome do autor","")).strip(),
                "preco_sugerido":None,"tipo_royalty":None,"tamanho_mb":None}
    rows=[(r["asin"],r["titulo"],r["autor"],
           r["preco_sugerido"] if pd.notna(r["preco_sugerido"]) else None,
           r["tipo_royalty"] or None,
           r["tamanho_mb"] if pd.notna(r.get("tamanho_mb")) else None)
          for r in registros.values()]
    execute_values(cur,"""
        INSERT INTO titles (asin,titulo,autor,preco_sugerido,tipo_royalty,tamanho_mb)
        VALUES %s ON CONFLICT (asin) DO UPDATE SET titulo=EXCLUDED.titulo,updated_at=NOW()
    """,rows)
    print(f"   {len(rows)} títulos processados.")
def import_monthly_summary(cur, df):
    print("→ Importando resumo mensal...")
    rows=[]; skipped=0
    for _,row in df.iterrows():
        periodo=parse_periodo_pt(row.get("Data"))
        if not periodo: skipped+=1; continue
        rows.append((periodo,
            int(row.get("Unidades líquidas vendidas (eBook)") or 0),
            int(row.get("Unidades gratuitas vendidas (eBook)") or 0),
            int(row.get("Kindle Edition Normalized Pages (KENP) lidas") or 0),
            float(row.get("Royalties (BRL)") or 0),float(row.get("Royalties (USD)") or 0),
            float(row.get("Royalties (GBP)") or 0),float(row.get("Royalties (EUR)") or 0),
            float(row.get("Royalties (JPY)") or 0),float(row.get("Royalties (CAD)") or 0),
            float(row.get("Royalties (INR)") or 0),float(row.get("Royalties (AUD)") or 0)))
    execute_values(cur,"""
        INSERT INTO monthly_summary (periodo,unidades_ebook,unidades_gratis,kenp_total,
            royalties_brl,royalties_usd,royalties_gbp,royalties_eur,
            royalties_jpy,royalties_cad,royalties_inr,royalties_aud)
        VALUES %s ON CONFLICT (periodo) DO UPDATE SET
            unidades_ebook=EXCLUDED.unidades_ebook,kenp_total=EXCLUDED.kenp_total,
            royalties_brl=EXCLUDED.royalties_brl
    """,rows)
    print(f"   {len(rows)} meses importados. {skipped} ignorados.")
def import_monthly_sales(cur, df):
    print("→ Importando vendas mensais...")
    dedup={}; skipped=0
    for _,row in df.iterrows():
        asin=str(row.get("Código ASIN/ISBN") or row.get("ASIN","")).strip()
        if not asin or asin=="nan": skipped+=1; continue
        store_id=get_store_id(cur,str(row.get("Loja","")).strip())
        if not store_id: skipped+=1; continue
        periodo=parse_periodo_yyyymm(row.get("Data dos royalties"))
        if not periodo: skipped+=1; continue
        tipo_transacao=str(row.get("Tipo de transação","")).strip() or None
        moeda=str(row.get("Moeda","")).strip()
        key=(asin,store_id,periodo,tipo_transacao,moeda)
        dedup[key]=(asin,store_id,periodo,
            tipo_transacao,
            str(row.get("Tipo de royalty","")).strip() or None,
            int(row.get("Unidades vendidas") or 0),
            int(row.get("Unidades reembolsadas") or 0),
            int(row.get("Número líquido de unidades vendidas") or 0),
            float(row.get("Preço sugerido médio sem impostos") or 0),
            float(row.get("Preço de oferta médio sem impostos") or 0),
            float(row.get("Custo médio de entrega/fabricação") or 0),
            float(row.get("Royalties") or 0),
            moeda)
    rows=list(dedup.values())
    execute_values(cur,"""
        INSERT INTO monthly_sales (asin,store_id,periodo,tipo_transacao,tipo_royalty,
            unidades_vendidas,unidades_reembolso,unidades_liquidas,
            preco_sugerido,preco_oferta,taxa_entrega,royalties,moeda)
        VALUES %s ON CONFLICT (asin,store_id,periodo,tipo_transacao,moeda) DO UPDATE SET
            unidades_liquidas=EXCLUDED.unidades_liquidas,royalties=EXCLUDED.royalties
    """,rows)
    print(f"   {len(rows)} registros importados. {skipped} ignorados.")
def import_daily_kenp(cur, df):
    print("→ Importando KENP diário...")
    dedup={}; skipped=0
    for _,row in df.iterrows():
        asin=str(row.get("ASIN","")).strip()
        if not asin or asin=="nan": skipped+=1; continue
        store_id=get_store_id(cur,str(row.get("Loja","")).strip())
        if not store_id: skipped+=1; continue
        try: data=pd.to_datetime(row["Data"]).date()
        except: skipped+=1; continue
        dedup[(asin,store_id,data)]=(asin,store_id,data,int(row.get("Kindle Edition Normalized Pages (KENP) lidas") or 0))
    rows=list(dedup.values())
    execute_values(cur,"""
        INSERT INTO daily_kenp (asin,store_id,data,kenp) VALUES %s
        ON CONFLICT (asin,store_id,data) DO UPDATE SET kenp=EXCLUDED.kenp
    """,rows)
    print(f"   {len(rows)} registros importados. {skipped} ignorados.")
def import_monthly_orders(cur, df):
    print("→ Importando pedidos mensais...")
    dedup={}; skipped=0
    for _,row in df.iterrows():
        asin=str(row.get("ASIN","")).strip()
        if not asin or asin=="nan": skipped+=1; continue
        store_id=get_store_id(cur,str(row.get("Loja","")).strip())
        if not store_id: skipped+=1; continue
        periodo=parse_periodo_yyyymm(row.get("Data"))
        if not periodo: skipped+=1; continue
        dedup[(asin,store_id,periodo)]=(asin,store_id,periodo,
            int(row.get("Unidades pagas") or 0),
            int(row.get("Unidades gratuitas") or 0))
    rows=list(dedup.values())
    execute_values(cur,"""
        INSERT INTO monthly_orders (asin,store_id,periodo,unidades_pagas,unidades_gratuitas)
        VALUES %s ON CONFLICT (asin,store_id,periodo) DO UPDATE SET
            unidades_pagas=EXCLUDED.unidades_pagas,unidades_gratuitas=EXCLUDED.unidades_gratuitas
    """,rows)
    print(f"   {len(rows)} registros importados. {skipped} ignorados.")
def import_daily_orders(cur, df):
    print("→ Importando pedidos diários...")
    dedup={}; skipped=0
    for _,row in df.iterrows():
        asin=str(row.get("ASIN","")).strip()
        if not asin or asin=="nan": skipped+=1; continue
        store_id=get_store_id(cur,str(row.get("Loja","")).strip())
        if not store_id: skipped+=1; continue
        try: data=pd.to_datetime(row["Data"]).date()
        except: skipped+=1; continue
        dedup[(asin,store_id,data)]=(asin,store_id,data,
            int(row.get("Unidades pagas") or 0),
            int(row.get("Unidades gratuitas") or 0))
    rows=list(dedup.values())
    execute_values(cur,"""
        INSERT INTO daily_orders (asin,store_id,data,unidades_pagas,unidades_gratuitas)
        VALUES %s ON CONFLICT (asin,store_id,data) DO UPDATE SET
            unidades_pagas=EXCLUDED.unidades_pagas,unidades_gratuitas=EXCLUDED.unidades_gratuitas
    """,rows)
    print(f"   {len(rows)} registros importados. {skipped} ignorados.")
def main():
    parser=argparse.ArgumentParser()
    parser.add_argument("--file",required=True)
    args=parser.parse_args()
    print(f"\n{'='*55}\nKindleRanker BR — Importador KDP\nArquivo: {args.file}\n{'='*55}\n")
    sheets=pd.read_excel(args.file,sheet_name=None)
    print(f"Abas encontradas: {list(sheets.keys())}\n")
    conn=get_conn(); conn.autocommit=False; cur=conn.cursor()
    try:
        import_titles(cur,sheets.get("Vendas combinadas",pd.DataFrame()),sheets.get("KENP lidas",pd.DataFrame()))
        import_monthly_summary(cur,sheets.get("Resumo",pd.DataFrame()))
        import_monthly_sales(cur,sheets.get("Vendas combinadas",sheets.get("Royalties de eBooks",pd.DataFrame())))
        import_daily_kenp(cur,sheets.get("KENP lidas",pd.DataFrame()))
        import_monthly_orders(cur,sheets.get("Pedidos processados",pd.DataFrame()))
        import_daily_orders(cur,sheets.get("Pedidos de eBooks realizados",pd.DataFrame()))
        conn.commit()
        print(f"\n{'='*55}\n✓ Importação concluída com sucesso.\n{'='*55}\n")
    except Exception as e:
        conn.rollback(); print(f"\n✗ Erro: {e}"); raise
    finally:
        cur.close(); conn.close()
if __name__=="__main__":
    main()
