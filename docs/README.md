# Documentação do projeto BUMP

Este diretório contém a documentação canônica e versionada do site. Decisões, arquitetura,
direção criativa e regras que precisam sobreviver entre sessões devem ser registradas aqui.

## Índice

| Área | Documento | Conteúdo |
|---|---|---|
| Estratégia editorial | [`strategy/positioning-and-content.md`](strategy/positioning-and-content.md) | Posicionamento, ICPs, voz, provas, SEO/GEO e limites de alegação |
| Direção criativa | [`creative/home-do-chao-ao-corpo.md`](creative/home-do-chao-ao-corpo.md) | Narrativa, capítulos, linguagem visual, transições e limites de conteúdo |
| Arquitetura | [`project/home-motion-system.md`](project/home-motion-system.md) | Hero, ponte principal, conectores, reduced motion e performance |
| Regras do produto | [`project/invariantes-e-fluxo.md`](project/invariantes-e-fluxo.md) | Invariantes da Home, paleta oficial, gate, regras de commit e pendências |
| Operação | [`project/checklists/`](project/checklists/) | Checklists de segurança, testes, lançamento e métricas |
| Decisões | [`project/adrs.md`](project/adrs.md) | ADRs vigentes do projeto |
| Marca | [`brand/README.md`](brand/README.md) | Guia oficial, fontes, cores e ativos |
| Assets | [`assets/stock-manifest.csv`](assets/stock-manifest.csv) | Manifesto de imagens externas avaliadas |
| Assets | [`assets/brand-logo-sources.csv`](assets/brand-logo-sources.csv) | Origem dos logos de marcas automotivas |

## Regra de memória

- `docs/` é a fonte de verdade versionada.
- `README.md` na raiz explica instalação e estrutura; `CONTRIBUTING.md` explica o fluxo de trabalho.
- `CLAUDE.md` é apenas um mapa mental operacional local, curto e descartável. Não recebe ADRs,
  histórico, changelog nem documentação detalhada.
- `_local/` guarda material operacional ignorado pelo Git e não substitui documentação canônica.
  Checklists de segurança, testes, lançamento e métricas saíram de lá e agora vivem em
  `project/checklists/`.
- `ai-ready/` é o sistema local de agentes e não substitui documentação canônica.
- O histórico de alterações pertence ao Git; documentos descrevem o estado vigente e as decisões.

## Como atualizar

1. Atualize o documento da área afetada no mesmo pacote da mudança.
2. Registre decisões duráveis em `project/adrs.md` com Decisão, Motivo, Alternativas e Data.
3. Mantenha links relativos válidos.
4. Evite duplicar a mesma regra em vários arquivos; prefira links.
5. Não copie logs completos de deploy ou resultados transitórios de ferramentas para a documentação.
