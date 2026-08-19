# Sistema de motion da Home

Status: ativo em produção
Escopo: `/` e `/conceito-home`
Implementação principal: `src/components/concept-home/ImpactJourney.tsx` e
`ImpactJourney.module.css`

## Objetivo

Conduzir a narrativa “Do chão ao corpo” como um percurso contínuo: terreno, impacto, compressão,
controle, corpo, uso, engenharia, produto, tempo e próximo chão. O sistema não pode bloquear o
scroll nativo, esconder conteúdo ou transformar cada seção em uma animação independente.

## Invariantes

- Scroll do navegador permanece nativo; não usar scroll-snap ou scroll hijacking.
- Conteúdo, capítulos, CTAs, Header, Footer e WhatsApp não dependem do motion para existir.
- Escritas em CSS só ocorrem quando o progresso muda de forma relevante.
- Medições de layout são coalescidas em `requestAnimationFrame`.
- Observers ativam composição somente perto da viewport.
- `will-change` volta para `auto` fora da área ativa.
- Desktop e mobile usam a mesma narrativa, com alturas e composição próprias.
- `?motion=reduce` permanece funcional e oferece `Ativar movimento`.
- Não exibir os textos “Movimento conceitual · acerto sujeito à validação técnica” ou
  “Movimento reduzido pelo sistema”.

## Camada 1 · Jornada inicial

A seção `.journey` contém uma cena sticky e controla `--journey`.

| Item | Desktop | Mobile |
|---|---:|---:|
| Altura da jornada | `410svh` | `330svh` |
| Altura da cena | `100svh` | `100svh` |
| Eixo da energia | 49% | 67% |

Estágios aprovados:

| Progresso | Estágio | Capítulo |
|---:|---|---|
| `< 0.26` | `hero` | O chão |
| `≥ 0.26` | `terrain` | O terreno muda |
| `≥ 0.53` | `compression` | Compressão |
| `≥ 0.79` | `control` | Controle |

O progresso medido vira `targetProgress`. O valor renderizado é interpolado no tempo:

```text
alpha = 1 - exp(-delta / 90)
current += (target - current) * alpha
```

`delta` é limitado a 64 ms. Diferenças menores que `0.0007` são estabilizadas no alvo e mudanças
menores que `0.0005` não geram nova escrita de CSS.

## Camada 2 · Ponte Hero → O corpo

A ponte principal usa `--bridge` e é deliberadamente mais forte que as demais conexões.

| Item | Desktop | Mobile | Movimento reduzido |
|---|---:|---:|---:|
| Altura | `82svh` | `68svh` | `clamp(13rem, 34vw, 18rem)` |
| Progresso estático reduzido | — | — | `0.72` |

A linha Citrus sai do estágio `control`, atravessa o preto, abre uma superfície branca e se converte
na onda da seção “O corpo”. O conteúdo de “O corpo” revela por grupos, enquanto o fundo branco já
está presente, evitando um segundo corte duro.

O progresso considera entrada e saída completas da viewport:

```text
progress = clamp((viewportHeight - rect.top) / (elementHeight + viewportHeight), 0, 1)
```

## Camada 3 · Conectores entre capítulos

`FlowConnector` usa um único observer e um único loop de frames compartilhado. Cada instância é
decorativa (`aria-hidden`) e altera apenas `--flow`.

| Variante | Ligação | Forma | Desktop | Mobile |
|---|---|---|---:|---:|
| `body-use` | O corpo → Rotina | terra batida/vegetação | `32svh` | `20svh` |
| `brands-engineering` | Marcas → Engenharia | órbita/fluido | `16svh` | `12svh` |
| `engineering-lines` | Engenharia → Linhas | eixo técnico | `24svh` | `20svh` |
| `lines-results` | Linhas → Resultados | régua | `18svh` | `16svh` |
| `results-authority` | Resultados → Autoridade | pulso/órbita | `22svh` | `18svh` |
| `authority-cta` | Autoridade → CTA | brita/cascalho | `19svh` | `12svh` |
| `cta-faq` | CTA → FAQ | abertura clara | `24svh` | `20svh` |
| `faq-footer` | FAQ → Footer | fechamento escuro | `16svh` | `14svh` |

### Interlúdios de estrada no desktop

`body-use` e `authority-cta` reutilizam o mesmo SVG de percurso, mas recebem materiais distintos por
`data-road-surface`. O primeiro usa leito de terra, sulcos e árvores abstratas nas bordas; o segundo
usa brita e fragmentos laterais. São camadas procedurais de SVG/CSS, sem mídia externa.

O próprio `--flow` controla a câmera: cada estrada entra ampliada e recua até revelar mais do
percurso, enquanto cenário lateral e leito usam deslocamentos diferentes para sugerir parallax. A
linha Citrus permanece sobre o centro do leito como conduíte de energia. Não há novo observer, loop
de animação ou leitura de layout.

As camadas de material são habilitadas apenas a partir de `901px`. Mobile mantém o enquadramento
amplo já aprovado. Em movimento reduzido, estrada e cenário usam o quadro intermediário estático,
sem transformação ou `will-change` ativo.

No modo reduzido, conectores usam `7rem`; `brands-engineering` e `authority-cta` usam `5rem`.
Todos renderizam `--flow: 0.72` sem acompanhar o scroll.

## Agendamento e visibilidade

Os três controladores usam o mesmo padrão:

1. `scroll` e `resize` apenas marcam necessidade de medição.
2. Um frame mede `getBoundingClientRect()`/altura apenas para elementos visíveis.
3. O progresso alvo é interpolado.
4. CSS custom properties são escritas somente quando mudam.
5. O próximo frame só é solicitado enquanto há diferença relevante.
6. Ao sair da viewport, o elemento estabiliza em `0` ou `1` e perde `data-active`.

A ponte principal e os conectores têm loops separados da jornada porque não ficam ativos ao mesmo
tempo durante a maior parte da página. Entre os conectores compactos, apenas os visíveis participam
do loop compartilhado.

## Movimento reduzido e reativação

- A experiência completa é o padrão aprovado.
- `?motion=reduce` inicia a Home com `data-motion="reduced"`.
- A jornada fica em `--journey: 0.68` e estágio `control`.
- Ponte e conectores usam progresso estático `0.72` e alturas compactas.
- O botão `Ativar movimento` define a preferência forçada para a sessão, restaura alturas e dispara
  nova medição.
- O botão desaparece depois da reativação.

## Validação mínima

```bash
npm run lint
npx tsc --noEmit
npm run build
git diff --check
```

Smoke de navegador obrigatório para mudanças neste sistema:

- `/` em `1440×1000` e `390×844` sem overflow horizontal;
- estágios `hero`, `terrain`, `compression` e `control`;
- progressão monotônica de `--journey`, `--bridge` e `--flow`;
- no máximo os conectores próximos da viewport com `data-active="true"`;
- `will-change: auto` fora da área ativa;
- `?motion=reduce` estático e reativável;
- conteúdo, CTAs, menu e WhatsApp intactos.

## Evolução segura

Ao criar uma nova seção:

1. verificar se a seção anterior já funciona como ponte natural;
2. preferir uma variante compacta de `FlowConnector` a uma nova cena sticky;
3. registrar a variante nesta tabela;
4. manter a ponte Hero → O corpo como o momento de maior intensidade;
5. medir desktop, mobile e reduced motion antes de publicar.

## Camada de refino cinematográfico (v3, Home oficial em `/`)

Desde 2026-08-18, `/` serve a configuração **v3** (`ImpactJourney definitive lean v3`). Além das
três camadas acima, o v3 tem uma camada de refino, sempre escopada a `[data-v3="true"]` e mantendo
os invariantes (scroll nativo, sem lib, `will-change` contido, trabalho perto da viewport).

### Transição esfumaçada de cena (reveal)

- A fumaça é uma textura de ruído fractal (`feTurbulence`) embutida como `data-URI` — sem asset
  externo, sem biblioteca; o filtro é rasterizado uma vez, nunca animado.
- O elemento `.sceneSmoke` (aria-hidden) cobre a cena; o movimento é só `opacity` (compositado).
- Gatilho: um `IntersectionObserver` **dedicado** marca `data-visible` na primeira entrada e faz
  `unobserve` (**one-shot**). Não usa o observer compartilhado de `[data-reveal]`, que reverte o
  estado ao sair parcialmente e deixava a névoa "presa".
- Variante escura `data-tone="dark"` para seções de fundo claro (ex.: O corpo), onde fumaça clara
  não teria contraste; fica acima do conteúdo (z-index) e dissolve revelando a seção.
- `prefers-reduced-motion`: mantém um crossfade suave de opacidade (sem parallax/zoom).
- Por que não `animation-timeline: view()` aqui: o suporte não é universal (Safari/Firefox variam),
  então o reveal ficava invisível para muitos usuários. `IntersectionObserver` cobre todos.

### Parallax de cena

- As imagens full-bleed (`.useBackground` em O uso e a imagem do `.finalCta`) deslizam com leve zoom
  conforme a seção cruza a viewport, via `animation-timeline: view()` (só `transform`).
- Fallback: imagem estática onde `animation-timeline` não é suportado. Desligado em movimento
  reduzido.

### Grade do Hero

- `[data-v3] .truckImage` recebe mais brilho/contraste/saturação e `[data-v3] .truckShade` reduz o
  escurecimento do céu no topo, para um céu/picape mais claros e dramáticos. O gradiente à esquerda
  do `.truckShade` é preservado para manter a legibilidade do H1.

### Ajustes de layout do v3 (referência rápida)

- Seção "Antes e depois na prática": corte transversal (paralelogramo) com laterais diagonais e
  sobreposição em flex; reafirmado em `prefers-reduced-motion` para não virar retângulo.
- Autoridade (Cristian): vídeo institucional ao lado do texto (grid de duas colunas no desktop).
- Marca d'água "CORPO" da seção O corpo com opacidade um pouco maior no v3 (7%).
