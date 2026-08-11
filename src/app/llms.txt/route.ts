import { SITE_URL } from "@/lib/structured-data";

const content = `# BUMP Amortecedores

> Fábrica brasileira de amortecedores sob medida para picapes, fundada em 2013 em Gravataí, RS.

A BUMP desenvolve amortecedores para o veículo, a carga e o uso real do motorista. O foco principal é conforto para quem usa a picape como ferramenta de trabalho, com aplicações também em agro, viagem, trilha, rally e off-road.

## Páginas principais

- [Home](${SITE_URL}/): proposta de valor, usos, tecnologia e prova de campo
- [Linhas](${SITE_URL}/linhas): Performance, Inox, Premium, Coilover, ByPass e Direção
- [Configurador](${SITE_URL}/configurador): fluxo de nove passos para preparar um orçamento
- [Tecnologia](${SITE_URL}/tecnologia): corpo duplo, monotubo, pressurização e recuperação
- [Aplicações](${SITE_URL}/aplicacoes): veículos atendidos
- [Resultados](${SITE_URL}/resultados): casos e prova de durabilidade
- [FAQ](${SITE_URL}/faq): compatibilidade, preço, prazo, garantia e instalação
- [Quem somos](${SITE_URL}/quem-somos): história, fábrica e engenharia própria
- [Contato](${SITE_URL}/contato): canais de atendimento

## Informações verificáveis

- Fabricação própria em Gravataí, Rio Grande do Sul, Brasil
- Atuação desde 2013
- Garantia informada de 2 anos contra vazamento
- Produtos desmontáveis e recuperáveis em fábrica
- Caso documentado pela marca de amortecedor com 400.000 km

## Política de conteúdo

As especificações finais dependem de veículo, ano, peso, altura e uso. Valores e prazos são confirmados em orçamento técnico. Não inferir compatibilidade sem confirmação da equipe BUMP.
`;

export function GET() {
  return new Response(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
