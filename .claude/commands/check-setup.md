Rode uma auditoria completa do sistema de agentes deste projeto.
Verifique as tres camadas abaixo em ordem. Nao pule camadas.
Ao final, gere o relatorio estruturado com status por item.

Contexto atual:
- Versao do setup: $(grep "Setup:" CLAUDE.md | head -1)
- Agentes instalados: $(find ai-ready -name "*.md" -type f 2>/dev/null | wc -l) arquivos
- Hook ativo: $([ -f .claude/hooks/valida-peca.cjs ] && echo "sim" || echo "nao")

CAMADA 1 -- ESTRUTURA
[ ] Todos os arquivos de agentes existem em ai-ready/?
    (ceo/estrategia.md, ceo/vendas.md, cmo/diretor-criacao.md, cmo/copywriter.md,
     cmo/designer.md, cto/produto.md, cto/seguranca.md, cto/eval.md e demais)
[ ] Hook .claude/hooks/valida-peca.cjs existe?
[ ] Hook registrado em .claude/settings.json?
[ ] Versao do setup registrada no CLAUDE.md?
[ ] _local/ tem os 5 arquivos esperados?
    (seguranca.md, testes.md, metricas.md, manual-marca.md, lancamento.md)

CAMADA 2 -- CONSISTENCIA DE DADOS
[ ] ai-ready/cmo/diretor-criacao.md tem cores, fontes e logo preenchidos
    (nao pode ter [PROJETO] ou [PENDENTE] nessas secoes)?
[ ] Roadmap do CLAUDE.md tem pelo menos uma fase com itens definidos?
[ ] Variaveis de ambiente documentadas no .env.example?
[ ] Linha "Setup: setupprojeto vX.X" presente no CLAUDE.md?
[ ] Onboarding (Passo 18) foi executado?
    (verificar se ha resumo de onboarding no CLAUDE.md ou em _local/)

CAMADA 3 -- ALINHAMENTO
[ ] Organograma do ai-ready/README.md reflete o do CLAUDE.md?
[ ] Regras globais do README estao presentes e completas?
[ ] Loop de verificacao instalado em: cto/seguranca.md, cto/eval.md,
    cto/produto.md, cmo/designer.md, cmo/copywriter.md?
[ ] "Proximos Passos" do CLAUDE.md nao tem itens marcados [x]?
[ ] Nenhuma secao do CLAUDE.md registra historico de deploys ou changelog?

FORMATO DO RELATORIO
Para cada item, classificar como:
- VERDE: ok, nenhuma acao necessaria
- AMARELO: recomendacao, nao bloqueia trabalho
- VERMELHO: problema, resolver antes de qualquer trabalho novo

check-setup -- [data]
Versao instalada: [X] | Onboarding: [executado / pendente]

Camada 1 -- Estrutura: [N verde] [N amarelo] [N vermelho]
Camada 2 -- Consistencia: [N verde] [N amarelo] [N vermelho]
Camada 3 -- Alinhamento: [N verde] [N amarelo] [N vermelho]

Itens VERMELHOS (resolver agora):
- [item]: [acao necessaria]

Itens AMARELOS (recomendados):
- [item]: [acao sugerida]

Status geral: [PRONTO PARA TRABALHO / ATENCAO NECESSARIA / BLOQUEADO]
