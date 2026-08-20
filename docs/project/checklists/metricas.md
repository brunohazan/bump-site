# Métricas e Monitoramento · BUMP Amortecedores

## Métricas de Negócio (o objetivo central do projeto)

### Visibilidade em busca e IA
- [ ] Páginas indexadas no Google Search Console (comparar com o site antigo)
- [ ] Citações do site em respostas de IA (ChatGPT, Claude, Perplexity). Checagem manual
      periódica, sem ferramenta automatizada ainda
- [ ] Posição para termos como "amortecedor sob medida", "amortecedor off-road [veículo]"
- [ ] LCP mobile histórico (meta: abaixo de 2,5s, partindo de 5,9s no site antigo)

### Conversão
- [ ] Envios de formulário de orçamento (evento GA4/GTM)
- [ ] Cliques em WhatsApp (evento GA4/GTM)
- [ ] Taxa de conversão por página de origem (qual página de produto/aplicação gera mais orçamento)

## Monitoramento Técnico

- [ ] Error tracking: [PENDENTE, Sentry ou equivalente]
- [ ] Uptime monitoring: [PENDENTE]
- [ ] Performance: Vercel Analytics (nativo do deploy) + Lighthouse CI
- [ ] Logs: painel da Vercel

## Alertas Críticos (configurar antes do lançamento)
- [ ] Erro 500 em qualquer página
- [ ] Falha no envio do formulário de orçamento
- [ ] Queda de indexação no Search Console (sinal de robots.txt ou Cloudflare quebrado de novo)
