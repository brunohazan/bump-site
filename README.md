# BUMP Amortecedores

Site institucional V2 da BUMP, construído com Next.js 16, React 19, TypeScript e Tailwind CSS v4.

## Desenvolvimento

```bash
npm install
npm run dev
```

Acesse `http://localhost:3000`.

## Validação

```bash
npm run lint
npx tsc --noEmit
npm run build
```

## Estrutura da V2

- Home orientada a conforto e uso de trabalho
- Seis linhas com template dinâmico em `/linhas/[slug]`
- Configurador de nove passos em `/configurador`
- Páginas institucionais, aplicações, resultados, FAQ, contato e legais
- Header, Footer e ação de contato persistentes
- Página temporária de apresentação técnica em `/projeto-v2` (`noindex`)

Conteúdo e decisões do redesenho: `_local/plano-v2-site.md`.

## Estado dos formulários

Configurador e Contato estão em modo local simulado. Não enviam nem persistem dados. A conexão
com backend depende do hardening de validação, rate limit, consentimento LGPD e revisão de segurança.


## SEO/AEO e segurança

A V2 inclui canonical por rota, `robots.txt`, `sitemap.xml`, `llms.txt`, JSON-LD de organização,
produto, FAQ e breadcrumbs, além de CSP, HSTS e headers defensivos. Redirects de domínio,
Cloudflare, analytics e medição de LCP dependem do ambiente de produção.
