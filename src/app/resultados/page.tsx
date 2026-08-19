import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Breadcrumb, CTASection, Eyebrow } from "@/components/site/Primitives";
import { ASSET_BASE } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Resultados",
  description: "Casos e resultados da engenharia BUMP para conforto, trabalho e durabilidade.",
  alternates: { canonical: "/resultados" },
};

const scenarios = [
  {
    number: "01",
    vehicle: "Hilux",
    use: "Agro e carga",
    title: "A estrada pode continuar ruim. O acerto muda quanto dela chega ao corpo.",
    text: "Peso constante, poeira e piso irregular pedem controle sem transformar a picape vazia em um veículo rígido.",
    image: "hilux.webp",
  },
  {
    number: "02",
    vehicle: "Ranger",
    use: "Uso misto",
    title: "Firme com carga, confortável quando a caçamba esvazia.",
    text: "O projeto parte do peso real e da alternância de rotina para evitar uma solução genérica em extremos opostos.",
    image: "ranger.webp",
  },
  {
    number: "03",
    vehicle: "RAM 1500",
    use: "Viagem",
    title: "Resposta consistente também depois de horas rodando.",
    text: "Volume de fluido e controle térmico importam quando a jornada é longa e a suspensão não pode perder comportamento.",
    image: "ram1500.webp",
  },
] as const;

const evidence = [
  ["13+", "anos de fábrica", "Experiência acumulada em desenvolvimento e produção própria."],
  ["2 anos", "contra vazamento", "Garantia informada para os amortecedores BUMP."],
  ["400 mil km", "em um caso real", "Equipamento recuperado e devolvido ao trabalho."],
  ["Brasil", "produção própria", "Projetos produzidos em Gravataí, Rio Grande do Sul."],
] as const;

export default function ResultsPage() {
  return (
    <div data-motif="rise">
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Resultados" }]} />

      <section className="relative min-h-[760px] overflow-hidden border-y border-line-1">
        <Image src={`${ASSET_BASE}/banco_web_800/ranger.webp`} alt="Picape em cenário de uso real" fill priority sizes="100vw" className="object-cover [filter:saturate(.65)_contrast(1.08)]" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/78 to-ink/15" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-ink/30" />
        <div className="site-container relative flex min-h-[760px] items-end py-14 md:py-20">
          <div className="max-w-5xl">
            <Eyebrow>Prova, contexto e limite</Eyebrow>
            <h1 data-reveal className="max-w-[11ch] text-[clamp(3.5rem,8vw,8rem)] leading-[.84] font-black tracking-[-0.065em] uppercase">Resultado não é slogan. É contexto.</h1>
            <div className="mt-8 grid gap-7 lg:grid-cols-[1fr_auto] lg:items-end">
              <p data-reveal data-delay="1" className="max-w-2xl text-lg leading-relaxed text-mute-1">A BUMP não publica promessa universal de quilometragem ou conforto. Mostra a lógica do projeto, os cenários de uso e o caso factual disponível.</p>
              <Link href="#evidencias" className="button-primary">Ver as evidências</Link>
            </div>
          </div>
        </div>
      </section>

      <section id="evidencias" className="border-b border-line-1 bg-ink-soft">
        <div className="site-container grid gap-px overflow-hidden border-x border-line-1 bg-line-1 sm:grid-cols-2 lg:grid-cols-4">
          {evidence.map(([value, label, context], index) => (
            <article key={label} data-reveal data-delay={`${Math.min(index, 3)}`} className="min-h-52 bg-ink-card p-6 md:p-7">
              <strong className="block text-4xl font-black tracking-[-0.045em] text-accent">{value}</strong>
              <span className="mt-2 block font-mono text-[10px] tracking-[0.08em] text-paper uppercase">{label}</span>
              <p className="mt-7 text-sm leading-relaxed text-mute-2">{context}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-space">
        <div className="site-container">
          <div className="grid gap-8 lg:grid-cols-[.8fr_1.2fr] lg:items-end">
            <div><Eyebrow>01 · Cenários que orientam o acerto</Eyebrow><h2 data-reveal className="text-balance text-[clamp(2.8rem,6vw,6rem)] leading-[.9] font-black tracking-[-0.055em]">O resultado começa antes da peça: começa na pergunta certa.</h2></div>
            <div data-reveal data-delay="1" className="lg:justify-self-end"><p className="max-w-xl leading-relaxed text-mute-1">Os blocos abaixo são cenários de projeto baseados no uso descrito pelo site. Não são depoimentos atribuídos a clientes. A configuração final depende de veículo, carga, altura e rotina.</p></div>
          </div>

          <div className="mt-12 grid gap-4 lg:grid-cols-3">
            {scenarios.map((scenario, index) => (
              <article key={scenario.vehicle} data-reveal="mask" data-delay={`${index}`} className="group relative min-h-[600px] overflow-hidden border border-line-1">
                <Image src={`${ASSET_BASE}/banco_web_800/${scenario.image}`} alt={`${scenario.vehicle} em cenário de ${scenario.use.toLowerCase()}`} fill sizes="(min-width: 1024px) 33vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.025]" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/38 to-ink/5" />
                <div className="absolute inset-x-0 top-0 flex items-center justify-between p-5 font-mono text-[9px] tracking-[0.1em] uppercase"><span className="text-accent">{scenario.number}</span><span className="text-mute-2">{scenario.vehicle} · {scenario.use}</span></div>
                <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
                  <h3 className="text-2xl leading-tight font-black tracking-[-0.035em] md:text-3xl">{scenario.title}</h3>
                  <p className="mt-4 text-sm leading-relaxed text-mute-1">{scenario.text}</p>
                  <Link href={`/configurador?veiculo=${scenario.vehicle.toLowerCase().replace(" ", "-")}`} className="mt-6 inline-flex font-mono text-[10px] text-paper transition-colors hover:text-accent">Usar como ponto de partida →</Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden border-y border-line-1 bg-accent text-ink">
        <span className="pointer-events-none absolute -right-10 -bottom-24 text-[clamp(16rem,40vw,42rem)] leading-none font-black tracking-[-.12em] text-ink/[.055]">400</span>
        <div className="site-container relative grid gap-10 py-16 lg:grid-cols-[.72fr_1.28fr] lg:items-end lg:py-24">
          <div data-reveal><p className="font-mono text-[10px] font-semibold tracking-[0.13em] uppercase">02 · Caso de durabilidade</p><strong className="mt-4 block text-[clamp(4.5rem,11vw,11rem)] leading-[.8] font-black tracking-[-0.07em]">400.000<br />km</strong></div>
          <div data-reveal data-delay="1" className="max-w-3xl">
            <h2 className="text-3xl font-black tracking-[-0.04em] md:text-5xl">Desmontado, inspecionado, recuperado e devolvido ao trabalho.</h2>
            <p className="mt-6 text-lg leading-relaxed text-ink/75">O dado pertence a um equipamento real e demonstra a lógica recuperável da construção. Não é uma promessa de que toda peça, veículo ou condição de uso atingirá a mesma quilometragem.</p>
            <div className="mt-8 grid gap-px overflow-hidden border border-ink/15 bg-ink/15 sm:grid-cols-3">
              {["Desmontagem", "Inspeção", "Retorno ao uso"].map((step, index) => <div key={step} className="bg-accent p-4"><span className="font-mono text-[9px] font-semibold">0{index + 1}</span><p className="mt-2 text-sm font-black">{step}</p></div>)}
            </div>
          </div>
        </div>
      </section>

      <section className="section-space bg-ink-soft">
        <div className="site-container grid gap-10 lg:grid-cols-2">
          <article data-reveal className="border border-line-2 bg-ink-card p-7 md:p-9">
            <Eyebrow>03 · O que estas evidências mostram</Eyebrow>
            <ul className="mt-6 grid gap-4 text-lg font-semibold">
              {["Existe produção própria no Brasil.", "O equipamento foi construído para ser desmontado.", "Há garantia declarada contra vazamento.", "O acerto é definido pela aplicação informada."].map((item) => <li key={item} className="flex gap-3"><span className="text-accent">✓</span><span>{item}</span></li>)}
            </ul>
          </article>
          <article data-reveal data-delay="1" className="border border-line-2 bg-ink p-7 md:p-9">
            <Eyebrow>04 · O que não prometemos</Eyebrow>
            <ul className="mt-6 grid gap-4 text-lg font-semibold text-mute-1">
              {["A mesma quilometragem em toda aplicação.", "Um resultado igual sem considerar carga e uso.", "Correção de defeitos mecânicos preexistentes.", "Depoimentos sem autoria ou validação do cliente."].map((item) => <li key={item} className="flex gap-3"><span className="text-mute-4">✕</span><span>{item}</span></li>)}
            </ul>
          </article>
        </div>
      </section>

      <CTASection title="O próximo resultado começa com o contexto certo." description="Configure veículo, uso e objetivo. A fábrica revisa o ponto de partida antes da produção." />
    </div>
  );
}
