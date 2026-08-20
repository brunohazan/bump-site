# Checklist de Lançamento · BUMP Amortecedores

## Técnico
- [ ] Variáveis de ambiente de produção configuradas na Vercel
- [ ] SSL/HTTPS configurado e funcionando no domínio custom
- [ ] Headers de segurança ativos
- [ ] Domínio bumpamortecedores.com apontado e propagado
- [ ] Subdomínios www. e lp. voltam a resolver DNS e redirecionam (301) para as páginas novas
- [ ] robots.txt liberado para crawlers de IA, conferido também na config do Cloudflare
- [ ] sitemap.xml e llms.txt publicados
- [ ] JSON-LD validado em todos os tipos de página
- [ ] Canonical em toda página
- [ ] LCP mobile abaixo de 2,5s
- [ ] GA4 e GTM configurados com eventos de conversão (orçamento, WhatsApp)
- [ ] CI/CD funcionando (push na main = deploy automático na Vercel)

## Produto
- [ ] Fluxo completo testado em produção: veículo até formulário de orçamento até WhatsApp
- [ ] Painel de conteúdo testado pelo time do cliente (não só pela equipe técnica)
- [ ] Mobile testado (iOS Safari e Chrome Android)
- [ ] Todas as páginas da arquitetura no ar: Home, 4 famílias de produto, Engenharia,
      Aplicações (uso e veículo), FAQ técnico, Orçamento, Sobre

## Legal e Compliance
- [ ] Política de privacidade publicada
- [ ] CNPJ e informações legais no rodapé
- [ ] Consentimento de dados no formulário de orçamento

## Comunicação
- [ ] sameAs do JSON-LD com Instagram, YouTube e Facebook (hoje só tem Instagram)
- [ ] Redes sociais com bio e link atualizados para o site novo

## Pós-lançamento (primeiras 48h)
- [ ] Monitorar Search Console para reindexação das URLs antigas
- [ ] Confirmar que www.bumpamortecedores.com e lp.bumpamortecedores.com estão redirecionando
- [ ] Medir LCP real em produção, não só em build local
- [ ] Responder aos primeiros orçamentos recebidos pelo painel
