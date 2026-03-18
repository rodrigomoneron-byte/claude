# Tema Filho Kadence — Rodrigo Moneron
## Guia de Instalação Passo a Passo

---

## PASSO 1 — Fazer upload do tema filho

### Opção A: Via painel WordPress (mais fácil)
1. Compacte a pasta `kadence-child/` inteira em um arquivo `.zip`
2. Acesse **WordPress Admin → Aparência → Temas → Adicionar Novo → Enviar Tema**
3. Selecione o arquivo `.zip` e clique em **Instalar Agora**
4. Após instalar, clique em **Ativar**

### Opção B: Via FTP/SSH
1. Faça upload da pasta `kadence-child/` para `/wp-content/themes/`
2. Ative o tema em **WordPress Admin → Aparência → Temas**

---

## PASSO 2 — Configurar Google Fonts (se necessário)

Se as fontes não carregarem automaticamente (ambiente sem internet ou CDN blockeado):

1. Acesse **WordPress Admin → Aparência → Personalizar → Tipografia adicional**
2. Cole a URL: `https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,700;1,400;1,700&family=Poppins:wght@700;800&display=swap`

---

## PASSO 3 — Criar a Página Inicial

1. Acesse **WordPress Admin → Páginas → Adicionar Nova**
2. Título: `Início`
3. No menu lateral direito, em **Atributos da Página**, selecione o template: **Homepage — Rodrigo Moneron**
4. Publique a página

5. Acesse **WordPress Admin → Configurações → Leitura**
6. Selecione **Uma página estática** e em "Página inicial" escolha **Início**
7. Salve

---

## PASSO 4 — Configurar o Beehiiv

1. Acesse seu painel Beehiiv → **Grow → Forms → Embed Form**
2. Copie o `publication_id` (formato: `pub_xxxxxxxx`)
3. Copie o `embed_id` do formulário

4. No arquivo `page-home.php` (ou direto no editor do WordPress), localize:
   ```
   [rm_beehiiv publication_id="pub_COLE_AQUI" embed_id="COLE_O_EMBED_ID_AQUI"]
   ```
5. Substitua pelos seus IDs reais

**Alternativa sem editar código:** Crie um shortcode simples no WordPress:
- Acesse **WordPress Admin → Aparência → Editor de Temas** (ou use o plugin "Code Snippets")
- Adicione no `functions.php`:
  ```php
  add_option('rm_beehiiv_pub_id', 'pub_SEU_ID_AQUI');
  add_option('rm_beehiiv_embed_id', 'SEU_EMBED_ID_AQUI');
  ```

---

## PASSO 5 — Configurar URL da Comunidade Secreta

1. Acesse **WordPress Admin → Ferramentas → (qualquer plugin de opções)** ou adicione diretamente:
   - Em **Aparência → Personalizar → CSS Adicional** não funciona para isso
   - Use o plugin **"Advanced Custom Fields"** ou adicione no `functions.php`:
     ```php
     update_option('rm_comunidade_url', 'https://URL-DA-SUA-COMUNIDADE.com');
     ```

---

## PASSO 6 — Configurar Logotipo

### Para usar o logo SVG no header:
1. Acesse **WordPress Admin → Aparência → Personalizar → Identidade do Site → Logotipo do Site**
2. Faça upload do arquivo `assets/logo-rm.svg`

### Para usar o favicon SVG:
1. Acesse **WordPress Admin → Aparência → Personalizar → Identidade do Site → Ícone do Site**
2. Faça upload do arquivo `assets/favicon-rm.svg`

---

## PASSO 7 — Criar posts com o template correto

O template `single.php` é aplicado automaticamente em todos os posts.

Cada post já virá com:
- Categoria em vermelho (`#F64B3D`)
- Tempo de leitura estimado
- CTA da Comunidade Secreta ao final
- Navegação entre posts anterior/próximo

### Para usar o CTA personalizado em qualquer post:
Use o shortcode no editor:
```
[rm_cta_comunidade url="https://URL-DA-COMUNIDADE.com" titulo="Título personalizado" btn="Texto do botão"]
```

### Para usar o bloco do Método L.I.V.R.O em qualquer página:
```
[rm_metodo_livro]
```

### Para usar a prova social da Jussara:
```
[rm_prova_jussara]
```

---

## ESTRUTURA DE ARQUIVOS

```
kadence-child/
├── style.css           ← Identidade visual completa (cores, tipografia, dark mode)
├── functions.php       ← Enqueue de fontes, shortcodes, utilitários
├── single.php          ← Template de post individual
├── page-home.php       ← Template da página inicial
├── assets/
│   ├── logo-rm.svg     ← Logo tipográfico RM (header)
│   ├── favicon-rm.svg  ← Favicon RM (32x32)
│   └── custom.js       ← Micro-interações (scroll suave, reveal)
└── INSTRUCOES.md       ← Este arquivo
```

---

## PALETA DE CORES (referência rápida)

| Variável CSS        | Valor     | Uso                    |
|---------------------|-----------|------------------------|
| `--rm-black`        | `#000000` | Fundo base             |
| `--rm-white`        | `#FFFFFF` | Texto principal        |
| `--rm-red`          | `#F64B3D` | CTA, urgência, acento  |
| `--rm-purple`       | `#7B2FBE` | Revelação, citações    |
| `--rm-gray-1`       | `#0D0D0D` | Fundo seções alt       |
| `--rm-gray-2`       | `#1A1A1A` | Cards, inputs          |
| `--rm-gray-3`       | `#2A2A2A` | Bordas                 |
| `--rm-gray-5`       | `#888888` | Texto secundário       |

---

## SHORTCODES DISPONÍVEIS

| Shortcode | Descrição |
|-----------|-----------|
| `[rm_logo]` | Logo RM tipográfico |
| `[rm_metodo_livro]` | Seção completa do Método L.I.V.R.O |
| `[rm_prova_jussara]` | Bloco de prova social |
| `[rm_cta_comunidade url="..." titulo="..." btn="..."]` | CTA da Comunidade |
| `[rm_beehiiv publication_id="..." embed_id="..."]` | Formulário Beehiiv |
