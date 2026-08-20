# Checklist de Segurança · BUMP Amortecedores

> Site institucional multi-página, sem contas de usuário público. Superfície de risco real:
> painel de conteúdo (CMS) do cliente, formulário de orçamento, e os requisitos técnicos de
> SEO/AEO do briefing (que também têm implicação de segurança: robots.txt e Cloudflare mal
> configurados podem vazar ou bloquear indevidamente).

## Painel de Conteúdo (CMS)
- [ ] Autenticação implementada na área administrativa
- [ ] Apenas o time do cliente tem acesso de edição (texto, foto, produto, FAQ)
- [ ] Tokens de sessão do admin com expiração definida
- [ ] Nenhuma rota administrativa acessível sem autenticação

## Formulário de Orçamento
- [ ] Validação com schema (Zod ou equivalente) em todos os campos
- [ ] Rate limiting no endpoint de envio (evitar spam/flood)
- [ ] Stack trace nunca exposto ao cliente em caso de erro
- [ ] Dados do lead (nome, telefone, veículo, uso) tratados como dado pessoal (ver LGPD abaixo)

## Dados e Inputs
- [ ] Sanitização de inputs em qualquer query (ORM, nunca SQL raw com interpolação)
- [ ] Uploads de imagem no CMS com limite de tamanho e tipo validado no backend

## Transporte e Infraestrutura
- [ ] HTTPS obrigatório em produção (Vercel cobre por padrão, confirmar domínio custom)
- [x] Headers de segurança locais (CSP, HSTS, X-Frame-Options, nosniff, Referrer e Permissions)
- [ ] Configuração do Cloudflare revisada especificamente para não bloquear crawlers de IA
      autorizados (GPTBot, ClaudeBot, Google-Extended, CCBot). Requisito técnico do briefing,
      não apenas item de segurança genérico

## Auditoria
- [ ] Log de acesso e modificação no CMS (quem editou o quê e quando)
- [ ] Backup do conteúdo do CMS antes de mudanças estruturais

## LGPD
- [ ] Política de privacidade publicada (dados coletados no formulário de orçamento)
- [ ] Consentimento coletado no formulário antes do envio
- [ ] Mecanismo de exclusão de dados do titular, se solicitado
- [ ] Contato responsável pelos dados definido
