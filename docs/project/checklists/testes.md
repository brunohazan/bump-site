# Estratégia de Testes · BUMP Amortecedores

## O Que Testar Primeiro

Prioridade 1, requisitos técnicos inegociáveis do briefing (são os itens que motivaram o
projeto todo, falha aqui é falha do projeto):
- [x] robots.txt local libera GPTBot, ClaudeBot, Google-Extended, CCBot e PerplexityBot
- [ ] Cloudflare não bloqueia os crawlers por fora do arquivo
- [x] sitemap.xml e llms.txt gerados e acessíveis no smoke test local
- [ ] Redirects 301 de www.bumpamortecedores.com/* e lp.bumpamortecedores.com/* funcionando
      e resolvendo DNS
- [x] JSON-LD Organization/AutomotiveBusiness, Product, FAQPage e BreadcrumbList presente localmente
- [ ] Validar schemas no Rich Results Test após deploy
- [x] Canonical presente em todas as páginas públicas no smoke test local
- [ ] LCP mobile abaixo de 2,5s (medir com Lighthouse/PageSpeed Insights, não só localhost)

Prioridade 2, fluxo crítico de negócio:
- [ ] Formulário de orçamento envia corretamente e dispara evento de conversão no GA4/GTM
- [ ] Clique em WhatsApp dispara evento de conversão
- [ ] Painel de conteúdo: time do cliente consegue editar texto, foto, produto e FAQ sem ajuda técnica
- [ ] Home revisada visualmente em viewport real de celular (não só CSS compilado). Feito por
      código/build da V2 em 2026-08-11, ainda sem checagem visual num aparelho ou DevTools

Prioridade 3, integração:
- [x] Navegação entre as 18 rotas da V2 validada por smoke test HTTP 200 em 2026-08-11
- [ ] Página de aplicação por veículo renderiza corretamente mesmo com estrutura preparada
      para crescer (novos veículos adicionados depois)

## O Que NÃO Testar Agora
- Componentes de UI isolados sem lógica de negócio
- Casos de borda improváveis antes do site estar no ar com tráfego real

## Ferramentas
- Lighthouse / PageSpeed Insights para performance e LCP
- Google Rich Results Test para JSON-LD
- Google Search Console para indexação e sitemap
- [PENDENTE] definir se entra Playwright para os fluxos críticos (formulário, navegação)

## Convenção
- CI roda checagem de build (`next build`) e `tsc --noEmit` antes de qualquer deploy
- Verificação de LCP e JSON-LD feita manualmente a cada entrega de página nova, até haver
  automação de Lighthouse CI
