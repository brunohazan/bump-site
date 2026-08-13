# BUMP Amortecedores — Guia de marca

## Fonte oficial recebida

- Arquivo: `bump-amortecedores-guia-basico-de-estilo.pdf`
- Origem: arquivo fornecido pelo cliente em 13/08/2026
- Documento: 2 páginas, criado no Canva por GREEKy Company
- SHA-256: `b632e556e0d99a72b2438aa3e9a98aace4bbb8c1f4f9b82fbd56f1f63f853246`

Este PDF passa a ser a fonte oficial disponível para cores e tipografia. Decisões anteriores do protótipo devem ser consideradas provisórias quando divergirem deste documento.

## Tokens oficiais extraídos

### Cores

| Token | Valor | Uso indicado |
| --- | --- | --- |
| Amarelo Citrus | `#D3FF1A` | Botões e destaques |
| Preto | `#000000` | Background e textos em seções claras |
| Branco | `#FFFFFF` | Prioridade em textos; background apenas em seções de respiro |

### Tipografia

| Hierarquia | Família |
| --- | --- |
| Títulos | Horizon |
| Subtítulos | Montserrat |
| Corpo | Montserrat |

## Divergências do protótipo atual

| Área | Protótipo publicado | Guia oficial |
| --- | --- | --- |
| Accent | Verde `#2FD35D` | Amarelo Citrus `#D3FF1A` |
| Fundo | `#080808` e variações | Preto `#000000` |
| Texto | Off-white `#F2F2EF` | Branco `#FFFFFF` |
| Display | Archivo | Horizon |
| Corpo | Archivo | Montserrat |
| Labels técnicos | IBM Plex Mono | Não especificado |

A linguagem técnica monoespaçada pode continuar apenas como recurso secundário, se aprovada pelo cliente. Ela não deve substituir Montserrat na hierarquia principal.

## Assets ainda necessários

- Arquivo licenciado da fonte Horizon (`woff2`, `woff`, `otf` ou `ttf`).
- Confirmação da licença de uso web da Horizon.
- Logo BUMP em SVG ou outro formato vetorial.
- Variações oficiais do logo sobre preto, branco e Amarelo Citrus.
- Guia de área de proteção e tamanho mínimo do logo.
- Fotografias finais de produto, instalação, fábrica, fundador e equipe.

Montserrat pode ser carregada por `next/font/google`. Horizon não deve ser substituída silenciosamente nem baixada de fonte não autorizada.

## Regra de implementação

1. Preservar o PDF original sem alterações.
2. Tratar este README como índice operacional, não como substituto do PDF.
3. Não publicar a troca tipográfica completa antes de receber a Horizon e sua licença.
4. Protótipos podem usar fallback de geometria semelhante, claramente identificado como temporário.
5. Toda nova imagem de banco deve ter origem, licença, autor, URL e data de download registradas.
