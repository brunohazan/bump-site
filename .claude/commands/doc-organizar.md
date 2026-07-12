Rode o procedimento completo de organizacao de memoria do COO Documentacao.

Contexto atual:
- Docs .md na raiz: $(find . -maxdepth 1 -name "*.md" -not -name "CLAUDE.md" -not -name "README.md" 2>/dev/null | wc -l)
- Estrutura docs/ ja existe: $([ -d docs ] && echo "sim" || echo "nao")
- Git status: $(git status --short)

## Passo 1 -- Inventariar

Liste todos os .md de memoria versionados (raiz e subdiretorios relevantes).
Para cada um, classifique:
- produto: a qual produto/frente pertence
- tipo: especifico-produto / transversal / dono-externo
- status: ativo / obsoleto / duplicata-de [arquivo]

## Passo 2 -- Consolidar duplicatas

Antes de mover qualquer coisa:
- Identificar docs com conteudo sobreposto
- Fundir conteudo unico em um unico arquivo
- Marcar redundantes para remocao (confirmar com usuario antes de deletar)

## Passo 3 -- Avaliar regra de ativacao

Ativar se QUALQUER uma das condicoes for verdadeira:
[ ] O projeto tem 2+ produtos/frentes distintas
[ ] Mais de 6-8 docs de memoria soltos na raiz
[ ] CLAUDE.md passou de 200 linhas mesmo com 1 produto so
    (ADRs e stack details acumulados sao os principais candidatos a sair)

Se nenhuma passar: manter estrutura plana e registrar decisao no CLAUDE.md:
"ADR: estrutura plana mantida em [data] — criterios de ativacao nao atingidos."
Encerrar aqui.

**Se o unico gatilho foi "CLAUDE.md > 200 linhas" (1 produto, poucos docs soltos):**
Nao executar o procedimento completo de inventario multi-produto (Passos 4-8 abaixo
sao desenhados para reorganizacao ampla). Em vez disso, usar o caminho cirurgico:

```
1. Identificar secoes de referencia que crescem mas raramente sao lidas
   no inicio de uma sessao (candidatos tipicos: ADRs, stack best practices,
   checklists extensos ja resolvidos)
2. Mover cada secao identificada para docs/projeto/[secao].md via git mv
   (criar docs/projeto/ se nao existir)
3. Deixar ponteiro de uma linha no CLAUDE.md no lugar da secao movida:
   | docs/projeto/adrs.md | Decisoes de arquitetura (ADR-001 a ADR-00N) |
4. Atualizar referencias cruzadas (ai-ready/ pode referenciar ADRs especificos)
5. Confirmar que CLAUDE.md ficou abaixo de 200 linhas apos a mudanca
6. Commit "docs: mover [secoes] para docs/projeto/ -- CLAUDE.md compactado"
```

Pular Passos 4 a 8 abaixo neste caso -- eles sao para reorganizacao com multiplos
produtos. Ir direto para o Resumo de Saida.

## Passo 4 -- Propor estrutura

Apresentar ao usuario a estrutura-alvo antes de executar:

CLAUDE.md              ← sempre na raiz, nunca mover
docs/
├── <produto-1>/       ← docs especificos (kebab-case, sem acento)
├── <produto-2>/
└── projeto/           ← transversal: auditorias, decisoes macro, prontidao

Criterio de destino:
- Doc afeta 1 produto → docs/<produto>/
- Doc afeta 2+ produtos ou e decisao de arquitetura global → docs/projeto/

Aguardar aprovacao antes de prosseguir.

## Passo 5 -- Executar (apenas apos aprovacao)

Para cada doc a mover:
- Usar git mv (nunca deletar+recriar — preserva historico)
- Criar pasta de destino antes se nao existir

Fronteiras — NUNCA tocar:
- _local/ (propriedade do instalador)
- ai-ready/ (sistema de agentes)
- .claude/ e configs locais
- .secrets/ (credenciais)
- CLAUDE.md (sempre na raiz)
- Pastas de conteudo gitignored

## Passo 6 -- Atualizar referencias

Apos mover, atualizar em ordem:
1. CLAUDE.md: ponteiros "→ Ver detalhes", tabela de arquivos de memoria, mencoes inline
2. Referencias cruzadas entre docs: corrigir caminhos relativos
3. Arquivos em ai-ready/: agentes podem ter caminhos hardcoded para docs movidos

## Passo 7 -- Verificar links quebrados

Buscar pelos nomes e caminhos antigos no projeto inteiro.
Confirmar que nenhuma referencia ainda aponta para o caminho anterior.

## Passo 8 -- Commit

Mensagem padrao: "docs: organizar memoria em docs/{lista-de-pastas}"
Push imediato apos commit.

## Resumo de Saida

doc-organizar concluido -- [data]
Gatilho: [multi-produto / docs soltos / CLAUDE.md > 200 linhas / nenhum -- plana mantida]
Caminho: [completo (Passos 4-8) / cirurgico (so secoes movidas)]
Docs movidos: [N] | Duplicatas consolidadas: [N] | Pastas criadas: [lista]
Referencias atualizadas: CLAUDE.md [sim/nao] | ai-ready/ [sim/nao] | cruzadas [sim/nao]
Links quebrados encontrados: [N ou "nenhum"]
CLAUDE.md: [N linhas antes] → [N linhas depois]
ADR registrado no CLAUDE.md: [sim]
