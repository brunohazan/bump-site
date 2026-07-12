const ASSET_BASE = "https://pub-8f0b05c2503f42609136a4e1e55a9242.r2.dev";

export const specs = [
  { k: "CONSTRUÇÃO", v: "Corpo duplo + tecnologia monotubo" },
  { k: "HASTE", v: "20 mm · aço temperado" },
  { k: "PRESSÃO", v: "Ajustável por válvula" },
  { k: "MANGUEIRA", v: "3.000 psi · resistência máxima" },
  { k: "FLUIDO", v: "Selecionado por aplicação" },
  { k: "CURSO", v: "Sob medida, por veículo" },
  { k: "VIDA ÚTIL", v: "Recuperável · não descartável" },
] as const;

export const families = [
  {
    code: "BP-01",
    tag: "MAIS VENDIDA",
    name: "Performance",
    img: `${ASSET_BASE}/amortecedoressemfundo/amortecedordianteiroetraseirosemfundo.webp`,
    desc: "Pressurizado, dianteiro e traseiro. Haste de 20 mm com ajuste de pressão. Versões com regulagem de altura e reservatório.",
  },
  {
    code: "BP-02",
    tag: "DURABILIDADE",
    name: "Inox",
    img: `${ASSET_BASE}/amortecedoressemfundo/amortecedorinoxsemfundo.webp`,
    desc: "Corpo em inox para durabilidade extrema no chão de terra e no agro. Versão cabeça King para o nível mais exigente.",
  },
  {
    code: "BP-03",
    tag: "TOPO DE LINHA",
    name: "Premium",
    img: `${ASSET_BASE}/amortecedoressemfundo/amortecedorpremiumsemfundo.webp`,
    desc: "Reservatório externo e acabamento all black ou cromado. Estética e alta performance no mesmo equipamento.",
  },
  {
    code: "BP-04",
    tag: "LIFT SEM CALÇO",
    name: "Coilover",
    img: `${ASSET_BASE}/amortecedoressemfundo/amortecedorcoiloversemfundo.webp`,
    desc: "Mola e amortecedor em um conjunto. Eleva o lift sem calço e regula a altura com precisão de projeto.",
  },
  {
    code: "BP-05",
    tag: "EXTREMA",
    name: "ByPass",
    img: `${ASSET_BASE}/amortecedoressemfundo/amortecedorbypasssemfundo.webp`,
    desc: "Controle de rebound em terreno ondulado e alta velocidade. A roda permanece no chão no off-road mais punitivo.",
  },
  {
    code: "BP-06",
    tag: "DIREÇÃO",
    name: "Direção",
    img: `${ASSET_BASE}/amortecedoressemfundo/amortecedordedire%C3%A7%C3%A3osemfundo.webp`,
    desc: "Elimina solavancos no volante, firma a direção e prolonga a vida dos componentes da suspensão.",
  },
] as const;

export const worlds = [
  {
    code: "APL-01",
    name: "Expedição",
    product: "Linha Performance",
    photo: `${ASSET_BASE}/banco_web_800/ram1500.webp`,
    desc: "Milhares de quilômetros longe do asfalto, com carga e sem margem para falha. Dissipação térmica e curso calibrados para dias inteiros de estrada de terra.",
  },
  {
    code: "APL-02",
    name: "Rally",
    product: "ByPass",
    photo: `${ASSET_BASE}/banco_web_800/triton.webp`,
    desc: "Alta velocidade em terreno ondulado. Controle de rebound estágio a estágio para manter a roda colada no chão do início ao fim da especial.",
  },
  {
    code: "APL-03",
    name: "Carga · Agro",
    product: "Linha Inox",
    photo: `${ASSET_BASE}/banco_web_800/ranger.webp`,
    desc: "Peso todos os dias, poeira e barro o ano inteiro. Corpo em inox e acerto de válvulas para estabilidade sob carga máxima, safra após safra.",
  },
  {
    code: "APL-04",
    name: "Trilha",
    product: "Coilover",
    photo: `${ASSET_BASE}/banco_web_800/hilux.webp`,
    desc: "Obstáculos lentos e articulação extrema. Curso e altura sob medida para passar onde a suspensão original desiste.",
  },
] as const;

export const steps = [
  {
    num: "01",
    title: "Configuração",
    desc: "Você informa veículo, ano, uso predominante e como pilota. Cada projeto começa pelo terreno, não pelo produto.",
  },
  {
    num: "02",
    title: "Acerto de engenharia",
    desc: "A equipe define construção, fluido, pressurização e curso — e retorna com a especificação técnica e o orçamento.",
  },
  {
    num: "03",
    title: "Fabricação",
    desc: "Seu sistema é construído sob encomenda na fábrica em Gravataí, RS. Cada unidade é testada antes de sair.",
  },
  {
    num: "04",
    title: "Entrega e suporte",
    desc: "Envio para todo o Brasil, garantia de 2 anos contra vazamento e recuperação de fábrica ao longo da vida útil.",
  },
] as const;

export const heroImage = `${ASSET_BASE}/amortecedores/hero.png`;
export const antesDepoisImage = `${ASSET_BASE}/banco_web_800/ram1500.webp`;
export const premiumFigureImage = `${ASSET_BASE}/amortecedoressemfundo/amortecedorpremiumsemfundo.webp`;
export const inoxFigureImage = `${ASSET_BASE}/amortecedoressemfundo/amortecedorinoxsemfundo.webp`;
export const coiloverFigureImage = `${ASSET_BASE}/amortecedoressemfundo/amortecedorcoiloversemfundo.webp`;
