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
