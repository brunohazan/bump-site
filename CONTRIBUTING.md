# Como contribuir

Site institucional da BUMP em Next.js 16 (App Router), React 19, TypeScript e Tailwind CSS v4.
Deploy na Vercel a partir de `main`.

## Ambiente

```bash
npm ci
npm run dev
```

O app sobe em `http://localhost:3000`. Copie `.env.example` para `.env.local` se precisar das
variáveis; hoje o código usa apenas `NEXT_PUBLIC_SITE_URL`. As variáveis reais de produção ficam no
painel da Vercel e nunca no repositório.

Antes de mudanças estruturais no App Router, leia a documentação instalada em
`node_modules/next/dist/docs/`. Esta versão do Next tem convenções diferentes das de versões
anteriores.

## Gate de validação

Rode os quatro comandos antes de abrir PR:

```bash
npm run lint
npx tsc --noEmit
npm run build
git diff --check
```

## Fluxo de trabalho

1. Crie uma branch a partir de `main` (`git switch -c ajuste-do-hero`).
2. Faça a mudança e atualize a documentação da área afetada no mesmo commit.
3. Rode o gate.
4. Abra PR para `main`. Cada PR ganha um preview na Vercel; `main` publica produção.

Commits e PRs em português, descrevendo o que foi feito de forma objetiva.

## O que nunca vai para o Git

- `.env` e qualquer arquivo com valor real de variável.
- `.kiro/`, `_local/` e `ai-ready/`: material local de ferramentas e operação.
- Builds (`.next/`, `out/`) e `node_modules/`.

## Onde ficam as regras do projeto

A documentação canônica está em [`docs/`](docs/README.md). Antes de mexer na Home, leia:

- [`docs/project/invariantes-e-fluxo.md`](docs/project/invariantes-e-fluxo.md): invariantes,
  paleta oficial, gate e pendências abertas.
- [`docs/project/home-motion-system.md`](docs/project/home-motion-system.md): arquitetura de
  scroll, transições e o opt-out `?motion=reduce`.
- [`docs/project/adrs.md`](docs/project/adrs.md): decisões de arquitetura vigentes.
- [`docs/creative/home-do-chao-ao-corpo.md`](docs/creative/home-do-chao-ao-corpo.md): narrativa
  aprovada e limites de conteúdo.
- [`docs/brand/README.md`](docs/brand/README.md): marca, fontes e ativos oficiais.

Decisão durável nova entra como ADR em `docs/project/adrs.md`, com Decisão, Motivo, Alternativas e
Data. Não duplique a mesma regra em vários arquivos: prefira link.
