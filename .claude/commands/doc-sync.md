Rode o agente COO Documentacao completo:
1. Leia o CLAUDE.md atual e os arquivos em _local/
2. Identifique o que mudou nesta sessao (features, decisoes, itens concluidos)
3. Execute o Checklist de Manutencao do CLAUDE.md
4. Execute o Checklist de Manutencao dos _local/ relevantes
5. Execute a Verificacao Pos-Atualizacao
6. So encerre quando todos os itens estiverem verificados

Contexto atual:
- Git status: $(git status --short)
- Ultima modificacao do CLAUDE.md: $(git log -1 --format="%ar" -- CLAUDE.md 2>/dev/null || echo "nunca commitado")
- Linhas no CLAUDE.md: $(wc -l < CLAUDE.md 2>/dev/null || echo "0")

## Checklist de Manutencao do CLAUDE.md
- [ ] Roadmap reflete o estado atual? (itens concluidos marcados com [x]?)
- [ ] Proximos Passos lista apenas o que vai ser feito agora?
- [ ] Stack table atualizada com versoes corretas?
- [ ] Variaveis de ambiente todas documentadas?
- [ ] Decisoes de arquitetura novas registradas em ADRs?
- [ ] Referencia ao ai-ready/ presente e correta?

## Checklist de Manutencao dos _local/
- [ ] _local/seguranca.md -- atualizado apos mudancas de auth ou dados?
- [ ] _local/testes.md -- atualizado se mudou stack de testes?
- [ ] _local/metricas.md -- metricas de monitoramento corretas?
- [ ] _local/manual-marca.md -- atualizado se houve mudanca visual?

## Verificacao Pos-Atualizacao
- [ ] Nenhuma secao foi deletada
- [ ] Proximos Passos nao tem itens marcados [x]
- [ ] Todo ADR novo tem os 4 campos (Decisao, Motivo, Alternativas, Data)
- [ ] CLAUDE.md tem menos de 200 linhas ou ha justificativa documentada
- [ ] Nenhum conflito pendente entre CLAUDE.md e _local/
- [ ] Nada que seja historico/changelog foi adicionado ao CLAUDE.md

Se qualquer item falhar: corrigir e repetir a verificacao antes de encerrar.

## Resumo de Saida
doc-sync concluido
- Itens atualizados: [lista]
- ADRs adicionados: [lista ou "nenhum"]
- Proximos Passos removidos: [lista ou "nenhum"]
- Itens que precisam atencao humana: [lista ou "nenhum"]
- CLAUDE.md: [N] linhas
