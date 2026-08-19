# BUMP Amortecedores

Site institucional da BUMP, construído com Next.js 16, React 19, TypeScript e Tailwind CSS v4.

A Home oficial em `/` é a configuração **v3** da narrativa cinematográfica **“Do chão ao corpo”**:
Hero estático de estágio único (picape em parallax), ponte principal até a seção “O corpo”,
conectores entre os capítulos e uma camada de refino cinematográfico (transição esfumaçada de cena,
parallax nas imagens full-bleed e grade mais dramática do Hero). As versões anteriores foram
arquivadas em `/home-v1` e `/homev2` (ambas `noindex,nofollow`) e `/homev3` redireciona para `/`.
`/conceito-home` preserva o conceito completo como preview `noindex,nofollow`.

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
git diff --check
```

## Estrutura

- Home cinematográfica orientada a conforto, trabalho e engenharia aplicada
- Seis linhas com template dinâmico em `/linhas/[slug]`
- Configurador de nove passos em `/configurador`
- Páginas de tecnologia, aplicações, resultados, FAQ, contato e institucionais
- Header, Footer e ação de WhatsApp persistentes
- SEO/AEO com canonical, sitemap, `llms.txt`, robots e JSON-LD

## Documentação

A documentação canônica versionada começa em [`docs/README.md`](docs/README.md):

- direção criativa: [`docs/creative/home-do-chao-ao-corpo.md`](docs/creative/home-do-chao-ao-corpo.md)
- arquitetura do motion: [`docs/project/home-motion-system.md`](docs/project/home-motion-system.md)
- decisões de arquitetura: [`docs/project/adrs.md`](docs/project/adrs.md)
- marca e ativos: [`docs/brand/README.md`](docs/brand/README.md)

A evolução estética cinematográfica global (nova paleta do cliente — preto `#000000`, amarelo
`#fcf313`, branco metal `#f0f1f4`, terreno `#7e5b3c` —, motivos de motion por cluster, CTAs
unificados e WhatsApp compactável) está registrada na ADR-012. O movimento completo é nativo em
qualquer sistema ou navegador, com redução apenas por `?motion=reduce` (ADR-013).

`CLAUDE.md`, quando presente no ambiente local, é apenas um mapa mental operacional. Ele não é
fonte de verdade, repositório de conhecimento, changelog ou substituto de `docs/`.

## Estado dos formulários

Configurador e Contato estão em modo local simulado. Não enviam nem persistem dados. A conexão
com backend depende de validação, rate limit, consentimento LGPD e revisão de segurança.

## Produção

Deploy atual: [bump-weld.vercel.app](https://bump-weld.vercel.app).

Redirects do domínio final, Cloudflare, analytics e medição de LCP dependem do ambiente de
produção definitivo.
