import { SITE_URL } from "@/lib/structured-data";

const content = `# BUMP Amortecedores

> Especialista brasileiro em amortecedores sob medida para picapes, com fábrica própria em Gravataí, RS, desde 2013.

A BUMP desenvolve o projeto conforme veículo, ano, carga, altura, acessórios, terreno e rotina. O foco é conforto e controle para quem usa a picape no trabalho, no agro, na estrada, em viagens, trilhas e off-road. A especificação final depende de confirmação técnica.

## Páginas principais

- [Home](${SITE_URL}/): narrativa Do chão ao corpo, proposta de valor, usos, tecnologia e provas
- [Linhas](${SITE_URL}/linhas): Performance, Inox, Premium, Coilover, ByPass e Direção
- [Aplicações](${SITE_URL}/aplicacoes): guias por modelo e acesso às demais configurações
- [Tecnologia](${SITE_URL}/tecnologia): corpo duplo, monotubo, pressurização e recuperação
- [Nacional ou importado](${SITE_URL}/tecnologia/nacional-ou-importado): critérios de acerto, suporte e manutenção
- [Resultados](${SITE_URL}/resultados): evidências, contexto e limites das alegações
- [Quem somos](${SITE_URL}/quem-somos): Cristian, origem, fábrica e especialização
- [Configurador](${SITE_URL}/configurador): fluxo local de nove passos para preparar um orçamento
- [FAQ](${SITE_URL}/faq): compatibilidade, escolha, preço, prazo, garantia e instalação
- [Contato](${SITE_URL}/contato): canais de atendimento

## Aplicações prioritárias

- [Amortecedor para Hilux](${SITE_URL}/aplicacoes/hilux)
- [Amortecedor para S10](${SITE_URL}/aplicacoes/s10)
- [Amortecedor para Ranger](${SITE_URL}/aplicacoes/ranger)
- [Amortecedor para L200 Triton](${SITE_URL}/aplicacoes/l200-triton)
- [Amortecedor para Amarok](${SITE_URL}/aplicacoes/amarok)

## Informações verificáveis

- Fabricação própria em Gravataí, Rio Grande do Sul, Brasil
- Atuação desde 2013
- Projetos definidos conforme veículo, carga, altura e uso informado
- Garantia informada de 2 anos contra vazamento
- Produtos desmontáveis e recuperáveis em fábrica
- Caso documentado pela marca de amortecedor com 400.000 km; não é garantia universal

## Política de conteúdo

Não inferir compatibilidade, pressão, curso, prazo, valor ou resultado sem confirmação da equipe BUMP. Origem nacional ou importada, isoladamente, não determina adequação. Configurador e Contato estão em modo local demonstrativo e não transmitem nem persistem dados.
`;

export function GET() {
  return new Response(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
