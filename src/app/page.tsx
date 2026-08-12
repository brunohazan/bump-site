import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { UseSelector } from "@/components/home-v2/UseSelector";
import { FaqList } from "@/components/site/FaqList";
import { SectionHeading, StatsStrip } from "@/components/site/Primitives";
import { ASSET_BASE, faqItems, vehicleBrands } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "BUMP Amortecedores | Conforto feito para o seu chão",
  description: "Amortecedores sob medida para sua picape, seu trabalho e seu chão. Engenharia própria e fabricação no Brasil.",
  alternates: { canonical: "/" },
};

const trust = [
  ["13+", "anos de fábrica"],
  ["2 anos", "de garantia"],
  ["Sob medida", "para veículo e uso"],
  ["Brasil", "produção própria"],
] as const;

const technology = [
  {
    number: "01",
    title: "Corpo duplo e monotubo",
    text: "Mais óleo em circulação, melhor dissipação térmica e a mesma resposta depois de horas rodando.",
    proof: "Consistência do km 1 ao km 1.000",
  },
  {
    number: "02",
    title: "Haste 20 mm e pressão ajustável",
    text: "O acerto considera veículo, peso, altura e rotina. Não existe configuração genérica de prateleira.",
    proof: "Controle calibrado para o seu chão",
  },
  {
    number: "03",
    title: "Recuperável por construção",
    text: "O equipamento volta à fábrica, é desmontado, revisado e retorna ao trabalho em vez de virar descarte.",
    proof: "400 mil km em um amortecedor",
  },
] as const;

export default function HomePage() {
  return (
    <>
      <section className="home-hero relative -mt-[72px] flex min-h-[100svh] items-end overflow-hidden border-b border-line-1 pt-[72px]">
        <Image
          src={`${ASSET_BASE}/amortecedores/hero.png`}
          alt="Picape de trabalho equipada com amortecedores BUMP"
          fill
          priority
          sizes="100vw"
          className="hero-media object-cover object-[58%_center] [filter:saturate(.72)_contrast(1.08)_brightness(.78)] md:object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/62 to-ink/5" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-ink/35" />
        <div className="pointer-events-none absolute inset-0 opacity-25 [background-image:linear-gradient(to_right,rgba(255,255,255,.08)_1px,transparent_1px)] [background-size:25%_100%]" />
        <div className="absolute top-[72px] bottom-0 left-0 w-1 bg-accent" />

        <div className="site-container relative flex min-h-[calc(100svh-72px)] min-w-0 flex-col justify-end py-8 md:py-12 lg:py-14">
          <div className="max-w-[1050px]">
            <div data-reveal className="mb-5 flex items-center gap-3">
              <span className="h-px w-8 bg-accent" />
              <p className="font-mono text-[10px] tracking-[0.18em] text-accent uppercase">Fábrica de conforto · Gravataí, RS</p>
            </div>

            <h1 className="text-[clamp(2rem,9vw,3rem)] leading-[.86] font-black tracking-[-0.065em] uppercase md:text-[clamp(3.75rem,9.8vw,8.8rem)] md:leading-[.85]">
              <span data-reveal className="block whitespace-nowrap">Conforto que</span>
              <span data-reveal data-delay="1" className="block whitespace-nowrap text-accent md:ml-[8vw]">faz o corpo</span>
              <span data-reveal data-delay="2" className="block whitespace-nowrap">chegar inteiro.</span>
            </h1>

            <div className="mt-7 flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">
              <p data-reveal data-delay="2" className="max-w-xl text-[15px] leading-relaxed text-mute-1 md:text-lg">
                Amortecedores sob medida para sua picape, seu trabalho e seu chão. Engenharia própria, fabricação no Brasil e 2 anos de garantia.
              </p>
              <div data-reveal data-delay="3" className="flex flex-col gap-3 sm:flex-row">
                <Link href="/configurador" className="button-primary">Montar meu amortecedor</Link>
                <Link href="/linhas" className="button-secondary backdrop-blur-sm">Explorar as linhas</Link>
              </div>
            </div>
          </div>

          <div data-reveal data-delay="3" className="mt-8 grid grid-cols-2 gap-px overflow-hidden border border-paper/15 bg-paper/15 backdrop-blur-md md:mt-10 md:max-w-4xl md:grid-cols-4">
            {trust.map(([value, label]) => (
              <div key={label} className="bg-ink/62 px-4 py-3.5 md:px-5">
                <strong className="block text-sm font-black text-paper">{value}</strong>
                <span className="mt-1 block font-mono text-[9px] leading-tight tracking-[0.06em] text-mute-2">{label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="absolute right-6 bottom-12 hidden items-center gap-3 [writing-mode:vertical-rl] xl:flex">
          <span className="font-mono text-[9px] tracking-[0.16em] text-mute-3">ROLE PARA EXPLORAR</span>
          <span className="h-12 w-px bg-gradient-to-b from-accent to-transparent" />
        </div>
      </section>

      <section className="section-space relative overflow-hidden">
        <span className="pointer-events-none absolute -top-20 right-0 text-[clamp(15rem,35vw,38rem)] leading-none font-black tracking-[-.1em] text-paper/[.018]">01</span>
        <div className="site-container relative grid gap-12 lg:grid-cols-[1.18fr_.82fr] lg:items-end">
          <div>
            <p data-reveal className="font-mono text-[10px] tracking-[0.16em] text-accent uppercase">A promessa BUMP</p>
            <h2 data-reveal data-delay="1" className="mt-5 max-w-[13ch] text-balance text-[clamp(2.7rem,6.8vw,7.2rem)] leading-[.92] font-black tracking-[-0.055em]">
              Não é peça de prateleira. É conforto feito para o seu trabalho.
            </h2>
          </div>
          <div data-reveal data-delay="2" className="border-l border-accent pl-6 md:pl-8">
            <p className="text-lg leading-relaxed text-mute-1">
              Primeiro entendemos a picape, o peso e o chão. Depois definimos fluido, pressurização e curso para aliviar o corpo sem tirar controle do veículo.
            </p>
            <div className="mt-8 flex flex-wrap gap-2 font-mono text-[9px] tracking-[0.08em] text-mute-2 uppercase">
              <span className="border border-line-2 px-3 py-2">Veículo</span>
              <span className="border border-line-2 px-3 py-2">Carga</span>
              <span className="border border-line-2 px-3 py-2">Altura</span>
              <span className="border border-line-2 px-3 py-2">Uso real</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section-space border-y border-line-1 bg-ink-soft">
        <div className="site-container">
          <div className="mb-12 flex items-end justify-between gap-6">
            <SectionHeading
              eyebrow="02 · Escolha seu uso"
              title="Como você usa a sua picape?"
              description="Selecione sua rotina. A recomendação muda no mesmo bloco para mostrar o melhor ponto de partida."
            />
            <span className="hidden font-mono text-[10px] tracking-[0.12em] text-mute-4 md:block">SELEÇÃO DINÂMICA</span>
          </div>
          <div data-reveal><UseSelector /></div>
        </div>
      </section>

      <section className="overflow-hidden border-b border-line-1 py-10 md:py-12">
        <div className="site-container mb-7 flex items-center gap-4">
          <p className="font-mono text-[10px] tracking-[0.14em] text-mute-3 uppercase">Marcas que a BUMP atende</p>
          <span className="h-px flex-1 bg-line-1" />
        </div>
        <div className="animate-marquee flex w-max" aria-label={vehicleBrands.join(", ")}>
          {[...vehicleBrands, ...vehicleBrands].map((brand, index) => (
            <span key={`${brand}-${index}`} className="mx-1 grid min-w-44 place-items-center border-y border-line-1 bg-ink px-8 py-5 text-lg font-black tracking-[-0.03em] text-mute-2 transition-colors hover:text-paper">
              {brand}
            </span>
          ))}
        </div>
      </section>

      <section className="section-space relative overflow-visible border-b border-line-1 bg-ink-soft">
        <div className="site-container">
          <div className="mb-12 flex items-end justify-between gap-8">
            <SectionHeading
              eyebrow="03 · Tecnologia do conforto"
              title="Engenharia que continua trabalhando quando o terreno aperta."
              description="O que parece detalhe técnico muda o corpo, a direção e o dinheiro gasto com manutenção."
            />
            <Link href="/tecnologia" className="button-secondary hidden md:inline-flex">Ver toda a engenharia</Link>
          </div>

          <div className="grid gap-8 lg:grid-cols-[1.08fr_.92fr] lg:gap-14">
            <div data-reveal="mask" className="relative min-h-[500px] overflow-hidden border border-line-2 bg-[radial-gradient(circle_at_50%_40%,rgba(47,211,93,.18),transparent_55%)] md:min-h-[680px] lg:sticky lg:top-28">
              <span className="absolute top-5 left-5 z-10 font-mono text-[10px] tracking-[0.14em] text-accent uppercase">BUMP · Engenharia própria</span>
              <span className="absolute right-5 bottom-5 z-10 font-mono text-[9px] tracking-[0.1em] text-mute-3">CORPO DUPLO · MONOTUBO</span>
              <span className="pointer-events-none absolute -right-8 -bottom-16 text-[clamp(11rem,30vw,25rem)] leading-none font-black tracking-[-.1em] text-paper/[.025]">20</span>
              <Image
                src={`${ASSET_BASE}/amortecedoressemfundo/amortecedorpremiumsemfundo.webp`}
                alt="Amortecedor BUMP Premium com reservatório externo"
                fill
                sizes="(min-width: 1024px) 52vw, 100vw"
                className="technology-product object-contain p-8 md:p-14"
              />
            </div>

            <div className="flex flex-col">
              {technology.map((item, index) => (
                <article key={item.number} data-reveal data-delay={`${Math.min(index + 1, 3)}`} className="group border-t border-line-2 py-8 first:border-t-0 first:pt-0 md:py-10">
                  <div className="grid grid-cols-[44px_1fr] gap-4 md:grid-cols-[64px_1fr] md:gap-6">
                    <span className="font-mono text-xs text-accent">{item.number}</span>
                    <div>
                      <h3 className="text-2xl font-black tracking-[-0.035em] transition-colors group-hover:text-accent md:text-3xl">{item.title}</h3>
                      <p className="mt-4 max-w-xl leading-relaxed text-mute-1">{item.text}</p>
                      <p className="mt-5 font-mono text-[10px] tracking-[0.08em] text-mute-3 uppercase">{item.proof}</p>
                    </div>
                  </div>
                </article>
              ))}
              <Link href="/tecnologia" className="button-secondary mt-2 md:hidden">Ver toda a engenharia</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section-space">
        <div className="site-container">
          <div className="mb-12 flex items-end justify-between gap-8">
            <SectionHeading
              eyebrow="04 · Prova e autoridade"
              title="Feito por quem conhece o terreno. Provado por quem depende dele."
              description="História de fábrica, engenharia própria e resultado real de quem usa a picape todos os dias."
            />
            <span className="hidden font-mono text-[10px] text-mute-4 md:block">GRAVATAÍ · RS · DESDE 2013</span>
          </div>

          <div className="grid gap-4 lg:grid-cols-[1.15fr_.85fr]">
            <article data-reveal="mask" className="group relative min-h-[480px] overflow-hidden border border-line-1 md:min-h-[600px]">
              <Image src={`${ASSET_BASE}/banco_web_800/ranger.webp`} alt="Picape em uso no campo" fill sizes="(min-width: 1024px) 58vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.025]" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6 md:p-9">
                <p className="font-mono text-[10px] tracking-[0.14em] text-accent uppercase">Autoridade</p>
                <h3 className="mt-3 max-w-xl text-3xl font-black tracking-[-0.04em] md:text-5xl">Piloto antes de fabricante.</h3>
                <p className="mt-4 max-w-lg leading-relaxed text-mute-1">A BUMP nasceu de quem sentiu o terreno no volante e levou formação técnica para dentro da fábrica.</p>
                <Link href="/quem-somos" className="mt-6 inline-flex font-mono text-[11px] text-paper transition-colors hover:text-accent">Conheça a história ↗</Link>
              </div>
            </article>

            <article data-reveal="mask" className="group relative min-h-[480px] overflow-hidden border border-line-1 md:min-h-[600px]">
              <Image src={`${ASSET_BASE}/banco_web_800/ram1500.webp`} alt="Picape equipada com BUMP em estrada" fill sizes="(min-width: 1024px) 42vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.025]" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-ink/5" />
              <div className="absolute inset-x-0 bottom-0 p-6 md:p-9">
                <p className="font-mono text-[10px] tracking-[0.14em] text-accent uppercase">Prova real</p>
                <h3 className="mt-3 text-3xl font-black tracking-[-0.04em] md:text-4xl">400 mil quilômetros. Recuperado e de volta ao trabalho.</h3>
                <p className="mt-4 leading-relaxed text-mute-1">Equipamento feito para durar e voltar à fábrica quando precisa, em vez de virar descarte.</p>
                <Link href="/resultados" className="mt-6 inline-flex font-mono text-[11px] text-paper transition-colors hover:text-accent">Ver resultados ↗</Link>
              </div>
            </article>
          </div>
          <div data-reveal className="mt-4"><StatsStrip /></div>
        </div>
      </section>

      <section className="relative min-h-[68svh] overflow-hidden border-y border-line-1">
        <Image src={`${ASSET_BASE}/banco_web_800/triton.webp`} alt="Picape preparada para o próximo caminho" fill sizes="100vw" className="object-cover [filter:saturate(.72)_contrast(1.06)]" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/75 to-ink/15" />
        <div className="site-container relative flex min-h-[68svh] items-center py-20">
          <div className="max-w-3xl">
            <p data-reveal className="font-mono text-[10px] tracking-[0.14em] text-accent uppercase">05 · Próxima jornada</p>
            <h2 data-reveal data-delay="1" className="mt-5 text-balance text-[clamp(2.8rem,7vw,7rem)] leading-[.9] font-black tracking-[-0.055em]">Seu corpo também faz parte da ferramenta.</h2>
            <p data-reveal data-delay="2" className="mt-6 max-w-xl text-lg leading-relaxed text-mute-1">Configure a suspensão para o trabalho que sua picape realmente enfrenta.</p>
            <div data-reveal data-delay="3" className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/configurador" className="button-primary">Montar meu amortecedor</Link>
              <Link href="/contato" className="button-secondary backdrop-blur-sm">Falar com a BUMP</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section-space">
        <div className="site-container max-w-4xl">
          <SectionHeading eyebrow="06 · FAQ" title="Antes de decidir, tire as dúvidas." align="center" />
          <div data-reveal className="mt-10"><FaqList items={faqItems.slice(0, 5)} /></div>
          <div className="mt-8 text-center"><Link href="/faq" className="button-secondary">Ver todas as dúvidas</Link></div>
        </div>
      </section>
    </>
  );
}
