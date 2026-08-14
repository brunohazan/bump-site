<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Regra de documentação

A fonte de verdade do projeto é a documentação versionada em `docs/`, indexada por
`docs/README.md`. `CLAUDE.md` é somente um mapa mental operacional local: não deve acumular
arquitetura detalhada, ADRs, histórico de deploy, changelog ou conteúdo canônico. Decisões novas
vão para `docs/project/adrs.md`; arquitetura vai para `docs/project/`; direção criativa vai para
`docs/creative/`.

Não usar `_local/` ou `ai-ready/` como substitutos da documentação canônica do repositório.

## Fluxo de publicação aprovado

Após o usuário aprovar explicitamente uma mudança, concluir o ciclo sem pedir nova confirmação:
validar, criar commit em português, fazer push e confirmar o deploy. Continuam exigindo confirmação
separada apenas ações destrutivas, mudanças de infraestrutura/segurança de alto risco ou publicação
sem aprovação prévia do escopo.
