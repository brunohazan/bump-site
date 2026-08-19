# Decisões de arquitetura — BUMP

Este arquivo registra decisões duráveis. O estado operacional e o histórico de commits permanecem
no código e no Git; `CLAUDE.md` apenas aponta para este documento.

## ADR-001 · Next.js App Router e Tailwind CSS v4

**Decisão:** usar Next.js 16 App Router, React 19, TypeScript e Tailwind CSS v4 com configuração
CSS-first.

**Motivo:** padronização do time, suporte ao deploy Vercel, Server Components e páginas com SEO
estático/SSR.

**Alternativas:** manter a antiga one-page estática; usar Pages Router; manter configuração
Tailwind v3.

**Data:** 2026-07-12.

## ADR-002 · Converter o design para React nativo

**Decisão:** manter a interface como componentes React/CSS Modules/Tailwind, sem incorporar HTML
proprietário exportado de ferramenta de design.

**Motivo:** permitir manutenção, semântica, acessibilidade, tokens reais, Server Components e
controle de performance.

**Alternativas:** `dangerouslySetInnerHTML`; iframe; manter o artefato de design como runtime.

**Data:** 2026-07-12.

## ADR-003 · CLAUDE.md é mapa mental local, não documentação canônica

**Decisão:** manter `CLAUDE.md` na raiz, ignorado pelo Git e limitado a um mapa operacional curto.
Toda informação durável deve estar em `docs/`, no README ou no próprio código.

**Motivo:** evitar que um arquivo de contexto de agente vire repositório paralelo, acumule histórico
obsoleto e contradiga a documentação versionada.

**Alternativas:** versionar `CLAUDE.md`; concentrar ADRs, roadmap e changelog nele; usar `_local/`
como fonte de verdade.

**Data:** 2026-07-12; reafirmado em 2026-08-13.

## ADR-004 · Seletores globais dentro de uma layer

**Decisão:** seletores globais de elemento em `globals.css` devem ficar em `@layer base`.

**Motivo:** seletores fora de layer podem vencer utilitários Tailwind e tornar texto/estados de
links invisíveis, independentemente da intenção da classe aplicada.

**Alternativas:** elevar especificidade; espalhar `!important`; repetir correções por componente.

**Data:** 2026-07-12.

## ADR-005 · Motion orientado por scroll nativo em três camadas

**Decisão:** implementar a Home com três camadas de motion: jornada sticky do Hero, ponte principal
Hero → O corpo e conectores compactos entre os capítulos. O scroll permanece nativo; progresso é
calculado em JavaScript e entregue ao CSS por custom properties.

**Motivo:** garantir continuidade narrativa sem scroll hijacking, preservar conteúdo/CTAs e limitar
trabalho de composição ao que está próximo da viewport.

**Alternativas:** scroll-snap; uma sequência única longa; animações independentes sem linguagem
comum; WebGL/3D; bibliotecas externas de scroll.

**Data:** 2026-08-13.

## ADR-006 · Home cinematográfica em `/` e preview preservado

> **Status: superada pela ADR-010 (2026-08-18).** A configuração servida em `/` passou a ser a v3;
> a Home `definitive` original foi arquivada em `/home-v1`. O preview `/conceito-home` permanece.

**Decisão:** servir “Do chão ao corpo” como Home definitiva em `/` e manter `/conceito-home` como
preview com `noindex,nofollow`.

**Motivo:** preservar um ponto de inspeção isolado sem criar concorrência de indexação ou manter a
Home antiga como implementação paralela.

**Alternativas:** manter o conceito apenas em rota separada; remover o preview; duplicar duas Homes
independentes.

**Data:** 2026-08-13.

## ADR-007 · Destinos canônicos por modelo em `/aplicacoes/[modelo]`

**Decisão:** publicar páginas estáticas por modelo prioritário sob `/aplicacoes/[modelo]`, com
metadados descritivos, conteúdo próprio, breadcrumbs, JSON-LD, sitemap e links internos. Manter a
comparação de soluções como conteúdo técnico editorial, sem páginas concorrentes para a mesma
intenção.

**Motivo:** capturar buscas específicas por veículo, aumentar a profundidade útil do site e tornar
os atributos da BUMP citáveis por buscadores e sistemas generativos sem recorrer a rotas artificiais
ou repetição de palavra-chave.

**Alternativas:** enviar todo veículo diretamente ao Configurador; criar rotas de topo como
`/amortecedor-[modelo]`; criar landing pages paralelas fora do domínio ou sem vínculo com a
arquitetura principal.

**Data:** 2026-08-14.

## ADR-008 · Vídeo institucional com carregamento sob clique

**Decisão:** hospedar o vídeo institucional em `/quem-somos` por meio de um player que só carrega o
YouTube após interação do usuário, usando `youtube-nocookie.com`. A miniatura é servida pela própria
origem através do otimizador de imagens do Next. O CSP recebe apenas `frame-src` para
`https://www.youtube-nocookie.com`; `img-src` permanece restrito a `'self'`, `data:`, `blob:` e ao
bucket R2.

**Motivo:** dar autoria real e verificável à autoridade da marca sem depender de retrato estático,
preservando LCP, evitando requisições e cookies de terceiros na primeira visita e mantendo a
superfície do CSP mínima.

**Alternativas:** iframe carregado de imediato; `youtube.com` padrão com cookies; hospedar o arquivo
de vídeo no próprio bucket; usar um frame do vídeo como fotografia estática.

**Consequências:** o título do vídeo no YouTube aparece no player após o play. Títulos com alegações
não sustentadas contradizem a disciplina de conteúdo do site e devem ser renomeados na origem.

**Data:** 2026-08-14.


## ADR-009 · Interlúdios de estrada procedurais no sistema de conectores

**Decisão:** ampliar no desktop os conectores `body-use` e `authority-cta` como interlúdios de
estrada com zoom regressivo orientado por `--flow`. `body-use` representa terra batida com vegetação
lateral; `authority-cta` representa brita/cascalho. Leito, texturas e cenário são SVG/CSS e reutilizam
o observer e o loop compartilhado de `FlowConnector`. Mobile mantém a composição anterior e
movimento reduzido recebe um quadro estático.

**Motivo:** aproximar o impacto visual do desktop da personalidade já percebida no mobile e fazer o
terreno evoluir junto com a narrativa, sem introduzir vídeo, Canvas, WebGL, mídia adicional ou um
novo controlador de scroll.

**Alternativas:** apenas engrossar a linha existente; aplicar estrada a todos os conectores; usar
imagens ou vídeo; criar novas cenas sticky; alterar também a composição mobile.

**Consequências:** a ponte Hero → O corpo continua sendo a transição principal; conectores de
órbita, eixo, régua, FAQ e Footer preservam suas formas sem material rodoviário. As duas estradas
recebem alturas desktop próprias e exigem smoke em desktop, mobile e `?motion=reduce`.

**Data:** 2026-08-14.

## ADR-010 · v3 promovida a Home oficial em `/`; versões anteriores arquivadas

**Decisão:** `/` passa a servir a experiência **v3** (`<ImpactJourney definitive lean v3 />`),
indexada e canônica em `/`. A Home anterior (`definitive`) foi arquivada em `/home-v1`
(`noindex,nofollow`); a v2 (`definitive lean`) permanece em `/homev2` como arquivo
(`noindex,nofollow`); `/homev3` responde `307 → /` para preservar links compartilhados e evitar
conteúdo duplicado. Atualiza a ADR-006.

**Motivo:** a v3 foi aprovada pelo cliente como versão final (Hero estático de estágio único,
passagem em parallax e camada de refino cinematográfico). Evitar duas Homes concorrentes e não
descartar as versões anteriores.

**Alternativas:** manter `/homev3` como rota separada indexável; excluir as versões anteriores;
manter a Home `definitive` antiga em `/`.

**Consequências:** `docs/`, `README.md` e `CLAUDE.md` passam a apontar `/` = v3. `/conceito-home`
segue como preview do conceito completo (`noindex`). O `sitemap` já usava `/`, então não muda; as
rotas arquivadas ficam fora do sitemap por serem `noindex`. Nenhum link interno apontava para as
rotas de revisão.

**Data:** 2026-08-18.

## ADR-011 · Camada de refino cinematográfico do v3 (transição esfumaçada, parallax, grade do Hero)

**Decisão:** adicionar, **escopado a `[data-v3="true"]`**, uma camada de refino:

- **Transição esfumaçada de cena:** a imagem/seção emerge de uma fumaça que dissolve. A fumaça é uma
  textura de ruído fractal (`feTurbulence`) embutida como `data-URI` (sem asset externo, sem
  biblioteca). O reveal é **one-shot**, disparado por um `IntersectionObserver` dedicado que marca
  `data-visible` uma vez e não reverte (evita a névoa "presa" ao sair parcialmente). Há uma variante
  **escura** (`data-tone="dark"`) para seções de fundo claro, onde fumaça clara não teria contraste.
- **Parallax de cena:** as imagens full-bleed (O uso, CTA final) deslizam com leve zoom via
  `animation-timeline: view()`, com fallback estático.
- **Grade do Hero:** brilho/contraste/saturação da imagem do Hero e redução do escurecimento do céu
  no `.truckShade`, para um céu/picape mais claros e dramáticos, preservando o gradiente à esquerda
  para legibilidade do H1.

Todo o movimento usa apenas `transform`/`opacity` (compositados). Em `prefers-reduced-motion` o
reveal vira crossfade suave de opacidade e o parallax é desligado.

**Motivo:** tornar a jornada mais cinematográfica sem peso — sem vídeo, WebGL ou biblioteca de
scroll — respeitando LCP e os princípios de movimento já documentados.

**Alternativas:** vídeo de fundo ou sprites de fumaça; WebGL/Canvas; bibliotecas de scroll; animar
o filtro `feTurbulence` (rejeitado por custo de repaint); usar `animation-timeline: view()` também
para os reveals (rejeitado: suporte não universal — Safari/Firefox variam — por isso os reveals
usam `IntersectionObserver` e só o parallax usa `animation-timeline`, que degrada para estático).

**Consequências:** reveals funcionam em todos os navegadores; o parallax degrada para imagem
estática onde `animation-timeline` não é suportado; efeitos são suprimidos/atenuados em movimento
reduzido; tudo escopado ao v3, mantendo `/home-v1`, `/homev2` e `/conceito-home` inalterados.

**Data:** 2026-08-18.

## ADR-012 · Evolução estética cinematográfica global e nova paleta do cliente

**Decisão:** estender a linguagem cinematográfica do v3 para todo o site, sobre uma base de tokens
compartilhados, sem alterar copy, ordem de seções, rotas ou estratégia comercial. Compreende:

- **Nova paleta oficial do cliente** aplicada via tokens em `globals.css`: preto `#000000`,
  amarelo `#fcf313` (`--color-accent`, antes `#d3ff1a`), branco metal `#f0f1f4` (`--color-paper`,
  antes `#ffffff`) e terreno `#7e5b3c` (novo `--color-terrain`). Derivados: `--color-accent-soft`
  reaquecido para `#2a2600` e `--color-accent-rgb: 252 243 19` para `rgba()` arbitrárias. Literais
  antigos (`#d3ff1a`, `#fef213`, `rgb(211 255 26 / …)`, olivas `#647800`) migrados nas superfícies
  ativas, incluindo `ImpactJourney.module.css`, páginas, `opengraph-image.tsx` e Header.
- **Tokens de easing "amortecedor"** (`--ease-impact`, `--ease-settle`, `--dur-impact`,
  `--dur-settle`) e keyframes `bump-settle`, `bump-rise`, `clip-wipe`, traduzindo o gesto
  impacto → absorção → estabilidade.
- **CTAs unificados:** `.button-primary`/`.button-secondary` ganham micro-press (`:active`) sob o
  mesmo easing; `CTASection` compartilhado passa a revelar com o gesto de conversão, mantendo
  labels e destinos.
- **Motor de reveal evoluído** (`ScrollReveal.tsx` + `globals.css`): mantém `data-reveal`/`mask`
  e o guard de movimento reduzido; adiciona variantes por `data-motif` e reveals **reversíveis por
  padrão** (entram e saem ao cruzar a viewport). `data-reveal-once` fixa o estado após a primeira
  entrada (one-shot), reservado a conteúdos que não devem reanimar.
- **Cluster por pathname:** `ScrollReveal` deriva o cluster da rota e o aplica como
  `data-page-motif` no `<html>` (limpo no cleanup). O CSS usa o gesto do cluster nos `[data-reveal]`
  **mesmo sem wrapper manual** `data-motif`; quando os dois coexistem, o wrapper local vence.
- **Motivos por cluster** (`data-motif` no wrapper e/ou `data-page-motif` no `<html>`): produto/linhas →
  `compression`; tecnologia → `precision`; aplicações → `lateral`; resultados → `rise`;
  autoridade → `focus`; conversão (configurador/contato/faq/como-comprar) → `cascade`;
  legal (política/termos) → `calm`.
- **Divisores cinematográficos da Home (v3):** o componente decorativo `CinematicDivider` substitui
  os `barDivider` repetidos por transições narrativas distintas e sem texto
  (`pressao`/`controle`/`prova`/`terreno`/`estabilizacao`/`fechamento`), usando apenas
  transform/opacity/CSS com traço base como fallback estático.
- **Fumaça de cena reversível:** o `sceneSmoke` do v3 passa a alternar `data-visible` no observer
  (dissolve ao entrar, adensa ao sair), em vez do reveal one-shot que fazia `unobserve`.
- **Zonas de foco marcadas** com `data-wa-compact` (inclui o CTA final do v3, com formulário), para o
  WhatsApp flutuante recolher.
- **Primitivas evoluídas:** `PageHero`, `CTASection`, `Breadcrumb` e `StatsStrip` ganham classes
  semânticas e camadas decorativas (auras) que variam por cluster; o conteúdo do `PageHero` recebe
  `data-reveal` sem copy nova e o `CTASection` preserva labels e destinos. Cobertura de reveal
  moderada em `ProductLineCard`, `FaqList` e páginas antes sem movimento; wrappers de produto
  recebem luz percorrendo/profundidade discretas. Tudo simplifica no mobile e é estático em
  `prefers-reduced-motion`.
- **WhatsApp flutuante compactável:** `WhatsAppFloat` vira client component com `IntersectionObserver`
  observando zonas `data-wa-compact` (form de contato, configurador); ao entrar na zona, recolhe para
  ícone preservando `aria-label` e alvo de toque.

**Correção de movimento reduzido (núcleo):** *superada pela ADR-013.* Este trecho fazia o v3
respeitar por padrão a preferência de movimento do sistema; hoje a redução acontece somente com
`?motion=reduce`.

**Motivo:** unificar a identidade visual sob a paleta oficial e dar a cada cluster um gesto próprio,
mantendo continuidade cinematográfica e corrigindo o desrespeito à preferência de movimento do
sistema apontado após a ADR-011.

**Alternativas:** manter paleta antiga; aplicar o mesmo reveal em todo o site; forçar movimento
sempre com botão de reduzir (rejeitado por acessibilidade); introduzir biblioteca de animação
(rejeitado — sem novas dependências).

**Consequências:** todo o movimento continua compositor-only (`transform`/`opacity`/`clip-path`),
sem scroll-hijack e com scroll nativo; páginas sem `data-reveal` não ganham movimento novo; layouts
de `/home-v1`, `/homev2` e `/conceito-home` permanecem inalterados, herdando apenas a paleta.
Referencia e estende a ADR-011.

**Data:** 2026-08-19.

## ADR-013 · Movimento nativo em qualquer sistema; redução só por `?motion=reduce`

**Decisão:** o site deixa de consultar `prefers-reduced-motion` para decidir se anima. A experiência
cinematográfica completa é entregue por padrão em qualquer computador, sistema ou navegador, e o
único opt-out é o parâmetro explícito `?motion=reduce`. Substitui a "correção de movimento reduzido"
registrada na ADR-012.

Implementação:

- `layout.tsx` grava `data-motion="reduce"` no `<html>` antes da pintura quando a URL traz
  `?motion=reduce`, e remove o atributo caso contrário. `ScrollReveal` revalida o atributo a cada
  navegação de rota.
- Todo o CSS que antes vivia em `@media (prefers-reduced-motion: reduce)` passa a ser escopado por
  `html[data-motion="reduce"]`; o que vivia em `@media (prefers-reduced-motion: no-preference)`
  passa a valer sempre (ou é escopado por `html:not([data-motion="reduce"])` quando o reduzido não
  tinha regra de desligamento equivalente).
- `ImpactJourney`, `ScrollReveal` e `Configurator` leem o mesmo sinal: `prefersReduced()` depende
  apenas de `explicitReduced`, sem `matchMedia`.
- Com `?motion=reduce`, a Home continua estática (`data-motion="reduced"`), o botão
  `Ativar movimento` continua aparecendo e `body.concept-force-motion` continua restaurando a cena.

**Motivo:** pedido do cliente. Em máquinas Windows com animações desligadas no sistema (e em perfis
de navegador que reportam redução), a Home aparecia estática com o botão `Ativar movimento`, o que
foi lido como defeito: a experiência aprovada não estava sendo mostrada.

**Alternativas:** manter o respeito automático à preferência do sistema (rejeitado pelo cliente);
inverter para "movimento sempre, com botão de reduzir" na interface (rejeitado por poluir a Home);
detectar apenas Windows (rejeitado por ser frágil e arbitrário).

**Consequências:** usuários que configuram redução de movimento no sistema operacional passam a
receber a experiência completa, o que contraria a recomendação de acessibilidade (WCAG 2.3.3) que a
ADR-012 seguia; a rota de escape passa a ser explícita e por URL (`?motion=reduce`), documentada
aqui e mantida funcional. Nenhuma copy, rota ou layout muda; o movimento segue compositor-only, sem
scroll-hijack.

**Data:** 2026-08-19.
