export const ASSET_BASE =
  "https://pub-8f0b05c2503f42609136a4e1e55a9242.r2.dev";

export const lineSlugs = [
  "performance",
  "inox",
  "premium",
  "coilover",
  "bypass",
  "amortecedor-de-direcao",
] as const;

export type LineSlug = (typeof lineSlugs)[number];

export type ProductLine = {
  slug: LineSlug;
  code: string;
  name: string;
  shortName: string;
  badge: string;
  headline: string;
  description: string;
  image: string;
  use: string;
  benefits: readonly string[];
  specs: readonly { label: string; value: string }[];
  idealFor: string;
  notFor: string;
};

const baseSpecs = [
  { label: "Construção", value: "Corpo duplo com tecnologia monotubo" },
  { label: "Haste", value: "20 mm em aço temperado" },
  { label: "Pressão", value: "Ajustada para veículo, carga e uso" },
  { label: "Produção", value: "Sob medida em Gravataí, RS" },
  { label: "Garantia", value: "2 anos contra vazamento" },
] as const;

export const productLines: readonly ProductLine[] = [
  {
    slug: "performance",
    code: "BP-01",
    name: "Linha Performance",
    shortName: "Performance",
    badge: "Mais vendida",
    headline: "Conforto no asfalto sem perder firmeza na estrada.",
    description:
      "O acerto equilibrado para quem trabalha durante a semana e não quer limitar a picape quando o chão muda.",
    image: `${ASSET_BASE}/amortecedoressemfundo/amortecedordianteiroetraseirosemfundo.webp`,
    use: "Urbano, estrada, viagem e uso misto",
    benefits: [
      "Menos impacto transferido para coluna e braços",
      "Estabilidade com carga e em curvas",
      "Acerto individual para o peso real da picape",
      "Recuperável em fábrica, sem descarte prematuro",
    ],
    specs: baseSpecs,
    idealFor: "Quem quer conforto diário com margem para terra, carga e viagem.",
    notFor: "Quem precisa de lift extremo ou competição de alta velocidade.",
  },
  {
    slug: "inox",
    code: "BP-02",
    name: "Linha Inox",
    shortName: "Inox",
    badge: "Agro e carga",
    headline: "Terra, barro e carga sem transformar manutenção em rotina.",
    description:
      "Corpo em inox e acerto para trabalho severo. Feita para a picape que entra cedo no campo e volta só no fim do dia.",
    image: `${ASSET_BASE}/amortecedoressemfundo/amortecedorinoxsemfundo.webp`,
    use: "Agro, carga, fazenda e estrada de terra",
    benefits: [
      "Resistência superior à corrosão",
      "Controle sob carga constante",
      "Conforto em costela de vaca e estrada irregular",
      "Menos paradas por desgaste prematuro",
    ],
    specs: [
      ...baseSpecs.slice(0, 2),
      { label: "Corpo", value: "Aço inoxidável de alta resistência" },
      ...baseSpecs.slice(2),
    ],
    idealFor: "Produtor, prestador e motorista que vive entre poeira, barro e carga.",
    notFor: "Quem usa a picape apenas em asfalto leve e procura a opção de entrada.",
  },
  {
    slug: "premium",
    code: "BP-03",
    name: "Linha Premium",
    shortName: "Premium",
    badge: "Topo de linha",
    headline: "Mais controle térmico para rodar forte por mais tempo.",
    description:
      "Reservatório externo, maior volume de fluido e acabamento all black ou cromado para projetos exigentes.",
    image: `${ASSET_BASE}/amortecedoressemfundo/amortecedorpremiumsemfundo.webp`,
    use: "Viagem longa, carga, uso misto severo e projeto especial",
    benefits: [
      "Dissipação de calor em jornadas longas",
      "Resposta consistente do primeiro ao último quilômetro",
      "Ajuste fino para peso e condução",
      "Reservatório externo com maior volume de fluido",
    ],
    specs: [
      ...baseSpecs,
      { label: "Reservatório", value: "Externo com mangueira de alta pressão" },
      { label: "Acabamento", value: "All black ou cromado" },
    ],
    idealFor: "Quem exige consistência em jornadas longas e quer o acerto mais completo.",
    notFor: "Quem procura somente substituir o conjunto original sem mudar o acerto.",
  },
  {
    slug: "coilover",
    code: "BP-04",
    name: "Linha Coilover",
    shortName: "Coilover",
    badge: "Lift sem calço",
    headline: "Ganhe altura sem pagar com um carro duro o dia inteiro.",
    description:
      "Mola e amortecedor trabalham como conjunto. A altura nasce do projeto, não de um calço improvisado.",
    image: `${ASSET_BASE}/amortecedoressemfundo/amortecedorcoiloversemfundo.webp`,
    use: "Lift, trilha, expedição e projeto personalizado",
    benefits: [
      "Altura regulável com precisão",
      "Curso aproveitado sem endurecimento desnecessário",
      "Conjunto calibrado para o peso do veículo",
      "Mais articulação e controle em baixa velocidade",
    ],
    specs: [
      ...baseSpecs,
      { label: "Altura", value: "Regulável conforme projeto" },
      { label: "Conjunto", value: "Mola e amortecedor integrados" },
    ],
    idealFor: "Quem precisa de lift funcional para trilha, viagem ou equipamento adicional.",
    notFor: "Quem quer apenas aparência de picape alta sem revisar a geometria do conjunto.",
  },
  {
    slug: "bypass",
    code: "BP-05",
    name: "Linha ByPass",
    shortName: "ByPass",
    badge: "Uso extremo",
    headline: "Controle quando o terreno deixa de perdoar erro.",
    description:
      "Estágios de amortecimento e controle de retorno para manter a roda no chão em alta velocidade e terreno punitivo.",
    image: `${ASSET_BASE}/amortecedoressemfundo/amortecedorbypasssemfundo.webp`,
    use: "Rally, off-road severo e alta velocidade",
    benefits: [
      "Controle progressivo por estágio",
      "Retorno calibrado para manter tração",
      "Menos perda de desempenho por temperatura",
      "Construção recuperável para uso de competição",
    ],
    specs: [
      ...baseSpecs,
      { label: "Controle", value: "Bypass externo por estágios" },
      { label: "Retorno", value: "Rebound configurado para o terreno" },
    ],
    idealFor: "Piloto e projeto que trabalham no limite em terreno ondulado.",
    notFor: "Uso urbano como prioridade ou quem busca apenas mais conforto.",
  },
  {
    slug: "amortecedor-de-direcao",
    code: "BP-06",
    name: "Amortecedor de Direção",
    shortName: "Direção",
    badge: "Controle do volante",
    headline: "O impacto fica no chão, não nas suas mãos.",
    description:
      "Complemento para firmar a direção, reduzir solavancos no volante e proteger componentes do conjunto.",
    image: `${ASSET_BASE}/amortecedoressemfundo/amortecedordedire%C3%A7%C3%A3osemfundo.webp`,
    use: "Pneu maior, terra, trilha, carga e direção instável",
    benefits: [
      "Reduz trancos e retorno brusco do volante",
      "Mais firmeza com pneus maiores",
      "Ajuda a preservar terminais e caixa de direção",
      "Menos fadiga nos braços em piso ruim",
    ],
    specs: [
      { label: "Aplicação", value: "Sob medida por veículo" },
      { label: "Haste", value: "Aço temperado" },
      { label: "Fixação", value: "Kit específico para o conjunto" },
      { label: "Produção", value: "Gravataí, RS" },
      { label: "Garantia", value: "2 anos contra vazamento" },
    ],
    idealFor: "Quem sente o volante puxar, bater ou cansar os braços em piso irregular.",
    notFor: "Quem precisa corrigir folgas ou defeitos mecânicos que exigem manutenção prévia.",
  },
] as const;

export const useCases = [
  {
    id: "urbano",
    number: "01",
    label: "Urbano e conforto",
    line: "performance" as LineSlug,
    description: "Conforto diário, estabilidade e menos fadiga no fim do expediente.",
  },
  {
    id: "agro",
    number: "02",
    label: "Carga e agro",
    line: "inox" as LineSlug,
    description: "Resistência para poeira, barro e peso constante na caçamba.",
  },
  {
    id: "trilha",
    number: "03",
    label: "Terra e trilha",
    line: "coilover" as LineSlug,
    description: "Curso, altura e controle para sair do asfalto com conforto.",
  },
  {
    id: "rally",
    number: "04",
    label: "Rally e off-road",
    line: "bypass" as LineSlug,
    description: "Controle de retorno e temperatura para terreno punitivo.",
  },
] as const;

export const vehicleBrands = [
  "Toyota",
  "Ford",
  "Chevrolet",
  "Mitsubishi",
  "Nissan",
  "Volkswagen",
  "RAM",
  "Jeep",
] as const;

export const vehicles = [
  { brand: "Toyota", model: "Hilux", slug: "hilux" },
  { brand: "Toyota", model: "SW4", slug: "sw4" },
  { brand: "Ford", model: "Ranger", slug: "ranger" },
  { brand: "Ford", model: "F-250", slug: "f-250" },
  { brand: "Chevrolet", model: "S10", slug: "s10" },
  { brand: "Mitsubishi", model: "L200 Triton", slug: "l200-triton" },
  { brand: "Nissan", model: "Frontier", slug: "frontier" },
  { brand: "Volkswagen", model: "Amarok", slug: "amarok" },
  { brand: "RAM", model: "1500", slug: "ram-1500" },
  { brand: "Jeep", model: "Gladiator", slug: "gladiator" },
] as const;

export const applicationSlugs = ["hilux", "s10", "ranger", "l200-triton", "amarok"] as const;

export type ApplicationSlug = (typeof applicationSlugs)[number];

export type VehicleApplication = {
  slug: ApplicationSlug;
  brand: string;
  model: string;
  headline: string;
  description: string;
  contexts: readonly { title: string; text: string }[];
  questions: readonly string[];
  startingLines: readonly LineSlug[];
};

export const vehicleApplications: readonly VehicleApplication[] = [
  {
    slug: "hilux",
    brand: "Toyota",
    model: "Hilux",
    headline: "O amortecedor para Hilux começa pelo que ela carrega — e por onde passa.",
    description:
      "A configuração BUMP para Hilux considera versão, carga, acessórios, altura e rotina antes de definir linha, pressão e curso.",
    contexts: [
      { title: "Agro e carga", text: "Para a Hilux que alterna peso na caçamba, poeira, barro e estrada irregular." },
      { title: "Uso misto", text: "Para equilibrar conforto no deslocamento diário e controle quando o asfalto termina." },
      { title: "Lift e expedição", text: "Para projetos com altura, pneus ou equipamentos que mudam o conjunto original." },
    ],
    questions: ["Qual é o ano e a versão da Hilux?", "Quanto peso ela leva e com que frequência?", "Há lift, acessórios ou alteração de pneus?"],
    startingLines: ["performance", "inox", "coilover"],
  },
  {
    slug: "s10",
    brand: "Chevrolet",
    model: "S10",
    headline: "A S10 muda de rotina. O acerto precisa acompanhar.",
    description:
      "Trabalho, cidade, estrada e terra exigem respostas diferentes. A BUMP parte do uso real da S10 para preparar a configuração.",
    contexts: [
      { title: "Trabalho diário", text: "Para uso frequente, carga variável e a necessidade de chegar ao fim do dia com menos impacto acumulado." },
      { title: "Estrada e viagem", text: "Para quem procura estabilidade sem transformar a picape vazia em um conjunto rígido." },
      { title: "Terra e projeto", text: "Para rotinas fora do asfalto e alterações que precisam ser avaliadas como sistema." },
    ],
    questions: ["Qual é o ano e a versão da S10?", "A caçamba roda mais vazia ou carregada?", "O objetivo principal é conforto, carga, altura ou controle?"],
    startingLines: ["performance", "inox", "coilover"],
  },
  {
    slug: "ranger",
    brand: "Ford",
    model: "Ranger",
    headline: "Na Ranger, conforto e trabalho precisam caber no mesmo projeto.",
    description:
      "A aplicação é definida conforme versão, peso constante, alternância de carga, altura e terreno percorrido pela Ranger.",
    contexts: [
      { title: "Uso misto", text: "Para a picape que trabalha durante a semana e percorre estrada ou terra sem uma rotina única." },
      { title: "Jornada longa", text: "Para quem valoriza resposta consistente, estabilidade e menos fadiga depois de horas ao volante." },
      { title: "Campo e carga", text: "Para operação com piso irregular, peso e necessidade de suporte técnico depois da instalação." },
    ],
    questions: ["Qual é o ano e a versão da Ranger?", "Existe peso permanente na caçamba ou em acessórios?", "Quais terrenos ocupam a maior parte da rotina?"],
    startingLines: ["performance", "premium", "inox"],
  },
  {
    slug: "l200-triton",
    brand: "Mitsubishi",
    model: "L200 Triton",
    headline: "A L200 Triton pede um acerto tão específico quanto o caminho.",
    description:
      "A BUMP organiza o projeto da L200 Triton a partir do terreno, da carga, da altura e do nível de severidade informado.",
    contexts: [
      { title: "Terra e trilha", text: "Para buscar curso e controle sem tratar toda saída do asfalto como competição." },
      { title: "Expedição", text: "Para considerar bagagem, acessórios e longas distâncias dentro do mesmo contexto de uso." },
      { title: "Agro e rotina severa", text: "Para poeira, barro, carga e repetição diária em piso irregular." },
    ],
    questions: ["Qual é o ano e a versão da L200 Triton?", "Há peso permanente, bagagem ou acessórios?", "O uso é cotidiano, expedição, trilha ou competição?"],
    startingLines: ["performance", "inox", "coilover"],
  },
  {
    slug: "amarok",
    brand: "Volkswagen",
    model: "Amarok",
    headline: "A Amarok não precisa escolher entre estrada e terreno real.",
    description:
      "A configuração considera como a Amarok roda de fato: distância, carga, altura, acessórios e frequência fora do asfalto.",
    contexts: [
      { title: "Estrada e viagem", text: "Para quem percorre longas distâncias e precisa preservar consistência e conforto." },
      { title: "Trabalho e campo", text: "Para alternância entre asfalto, acesso rural e carga sem adotar uma calibração genérica." },
      { title: "Lift e off-road", text: "Para projetos em que altura, pneus e acessórios precisam entrar na definição do conjunto." },
    ],
    questions: ["Qual é o ano e a versão da Amarok?", "A carga é eventual ou permanece na picape?", "Existem alterações de altura, pneus ou acessórios?"],
    startingLines: ["performance", "premium", "coilover"],
  },
] as const;

export const faqItems = [
  {
    category: "Compatibilidade",
    question: "Serve na minha picape?",
    answer:
      "A BUMP fabrica sob medida para veículo, ano, peso e uso. O configurador reúne essas informações antes do orçamento técnico.",
  },
  {
    category: "Preço",
    question: "Quanto custa?",
    answer:
      "O valor depende da linha, do veículo e do acerto. Por isso o orçamento vem depois da configuração, sem empurrar uma peça genérica.",
  },
  {
    category: "Prazo",
    question: "Qual é o prazo de produção e entrega?",
    answer:
      "O prazo é confirmado no orçamento conforme a configuração e a fila de fábrica. A equipe informa produção e frete antes do pagamento.",
  },
  {
    category: "Garantia",
    question: "Como funciona a garantia?",
    answer:
      "São 2 anos de garantia contra vazamento. O equipamento também pode ser recuperado em fábrica ao longo da vida útil.",
  },
  {
    category: "Instalação",
    question: "A instalação exige adaptação?",
    answer:
      "Cada kit é definido para a aplicação. A equipe orienta instalação e eventuais requisitos do projeto antes da produção.",
  },
  {
    category: "Pagamento",
    question: "Como funciona o pagamento?",
    answer:
      "Condições, frete e início da produção são apresentados junto do orçamento técnico para você decidir com todas as informações.",
  },
  {
    category: "Escolha",
    question: "Amortecedor nacional ou importado: como comparar?",
    answer:
      "Compare o acerto para o seu uso, a possibilidade de manutenção, o suporte disponível e o que precisa ser confirmado para o veículo. A origem, sozinha, não garante o melhor resultado.",
  },
  {
    category: "Durabilidade",
    question: "O amortecedor é descartável?",
    answer:
      "Não. A BUMP é desmontável e recuperável. Há equipamento real com 400 mil quilômetros que voltou à fábrica, foi revisado e retornou ao trabalho.",
  },
] as const;

export function getProductLine(slug: string) {
  return productLines.find((line) => line.slug === slug);
}

export function getVehicleApplication(slug: string) {
  return vehicleApplications.find((application) => application.slug === slug);
}
