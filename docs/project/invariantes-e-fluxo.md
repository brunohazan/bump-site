# Invariantes do produto e fluxo de trabalho

Status: vigente
Escopo: todo o repositório

Este documento reúne as regras que precisam sobreviver entre sessões e entre pessoas. Antes, elas
existiam apenas em um arquivo local não versionado, o que impedia que outra pessoa no projeto
tivesse acesso a elas.

## Estado das rotas

| Rota | Papel |
|---|---|
| `/` | Home oficial, configuração v3 de "Do chão ao corpo" (ADR-010) |
| `/home-v1` | Home anterior, arquivada com `noindex,nofollow` |
| `/homev2` | Versão v2, arquivada com `noindex,nofollow` |
| `/homev3` | Redireciona `307` para `/` |
| `/conceito-home` | Preview do conceito completo, `noindex,nofollow` |

Produção: `https://bump-weld.vercel.app`, publicada a partir de `main`.

## Invariantes da Home

- Preservar conteúdo, capítulos, CTAs e scroll nativo.
- Não usar scroll-snap nem bloquear a leitura com animação.
- O Hero mantém os estágios `hero`, `terrain`, `compression` e `control`.
- A ponte Hero → O corpo é a transição principal; os demais conectores são mais curtos.
- Movimento completo é nativo em qualquer sistema ou navegador: nada consulta
  `prefers-reduced-motion` (ADR-013).
- `?motion=reduce` permanece funcional como opt-out por URL. Não existe botão `Ativar movimento`.
- Não reintroduzir avisos visuais sobre motion que já foram removidos.
- Alegações técnicas e imagens temporárias mantêm seus limites explícitos: nenhuma imagem
  temporária representa fundador, fábrica, equipe, cliente ou instalação.

Detalhamento da arquitetura de movimento em [`home-motion-system.md`](home-motion-system.md).

## Identidade visual

Paleta oficial (ADR-012), aplicada por tokens em `src/app/globals.css`:

| Cor | Token | Valor |
|---|---|---|
| Preto | `--color-ink` | `#000000` |
| Amarelo | `--color-accent` | `#fcf313` |
| Branco metal | `--color-paper` | `#f0f1f4` |
| Terreno | `--color-terrain` | `#7e5b3c` |

Em fundo claro o accent é rebaixado para um amarelo escuro legível. Fonte de interface: Montserrat.
Fonte de verdade completa de marca, tipografia e ativos: [`../brand/README.md`](../brand/README.md).

## Gate de validação

Rodar antes de qualquer commit:

```bash
npm run lint
npx tsc --noEmit
npm run build
git diff --check
```

## Regras de commit

- Mensagens em português, descrevendo o que foi feito de forma objetiva.
- Nunca commitar `.kiro/`, `_local/`, `ai-ready/` nem qualquer arquivo `.env`.
- Documentação da área afetada entra no mesmo pacote da mudança.
- Decisões duráveis viram ADR em [`adrs.md`](adrs.md), com Decisão, Motivo, Alternativas e Data.

## Fluxo de entrega

Depois da aprovação explícita do escopo: implementar, validar com o gate, commitar em português,
publicar e conferir o resultado em produção. Ações destrutivas, mudanças de infraestrutura e
decisões de segurança de alto risco exigem confirmação específica, mesmo com o escopo aprovado.

## Pendências abertas

- Conectar Configurador e Contato somente após validação, rate limit, consentimento LGPD e revisão
  de segurança. Hoje os dois simulam envio local e não persistem dados.
- Definir o CMS ou painel editorial.
- Confirmar dados finais de contato, analytics, redirects e Cloudflare.
- Substituir imagens temporárias quando houver fotos oficiais de fábrica, equipe e instalação.
- Medir LCP mobile no domínio final.

Checklists operacionais de segurança, testes, lançamento e métricas em
[`checklists/`](checklists/).
