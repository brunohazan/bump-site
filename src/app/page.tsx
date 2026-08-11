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

const trust = ["13+ anos de fábrica", "2 anos de garantia", "Feito sob medida", "Envio nacional"] as const;
const technology = [
  { number: "01", title: "Corpo duplo e monotubo", text: "Mais óleo em circulação, melhor dissipação de calor e resposta constante." },
  { number: "02", title: "Haste 20 mm e pressão ajustável", text: "O acerto considera veículo, carga e rotina. Não existe configuração genérica." },
  { number: "03", title: "Garantia e recuperação", text: "2 anos contra vazamento e construção recuperável para não jogar dinheiro fora." },
] as const;

export default function HomePage() {
  return (
    <>
      <section className="relative flex min-h-[calc(100svh-72px)] items-end overflow-hidden border-b border-line-1">
        <Image src={`${ASSET_BASE}/amortecedores/hero.png`} alt="Picape de trabalho equipada com amortecedores BUMP" fill priority sizes="100vw" className="object-cover [filter:saturate(.65)_contrast(1.08)]" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/75 to-ink/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-ink/30" />
        <div className="site-container relative py-16 md:py-24">
          <p className="mb-5 font-mono text-xs tracking-[0.16em] text-accent uppercase">Fábrica de conforto · Gravataí, RS</p>
          <h1 className="max-w-full text-[clamp(2.35rem,8.4vw,8rem)] leading-[0.88] font-black tracking-[-0.06em] uppercase">
            <span className="block whitespace-nowrap">Conforto que</span>
            <span className="block whitespace-nowrap">faz o corpo</span>
            <span className="block whitespace-nowrap">chegar inteiro.</span>
          </h1>
          <p className="mt-7 max-w-2xl text-base leading-relaxed text-mute-1 md:text-xl">Amortecedores sob medida para sua picape, seu trabalho e seu chão. Engenharia própria, fabricação no Brasil e 2 anos de garantia.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/configurador" className="button-primary">Montar meu amortecedor</Link>
            <Link href="/linhas" className="button-secondary">Ver as linhas</Link>
          </div>
          <div className="mt-10 grid max-w-3xl grid-cols-2 gap-px overflow-hidden rounded-sm border border-line-2 bg-line-2 md:grid-cols-4">
            {trust.map((item) => <span key={item} className="bg-ink/85 px-4 py-3 text-center font-mono text-[11px] text-mute-1 backdrop-blur">{item}</span>)}
          </div>
        </div>
      </section>

      <section className="section-space">
        <div className="site-container text-center">
          <p className="font-mono text-xs tracking-[0.16em] text-accent uppercase">A promessa BUMP</p>
          <h2 className="mx-auto mt-5 max-w-4xl text-balance text-[clamp(2.25rem,6vw,5.5rem)] leading-[.98] font-black tracking-[-0.045em]">A BUMP não vende amortecedor de prateleira.</h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-mute-1">Primeiro entendemos a picape, o peso e o chão. Depois definimos fluido, pressurização e curso para aliviar o corpo e manter o trabalho andando.</p>
        </div>
      </section>

      <section className="section-space border-y border-line-1 bg-ink-soft">
        <div className="site-container">
          <SectionHeading eyebrow="Escolha seu uso" title="Como você usa a sua picape?" description="Selecione sua rotina. A recomendação muda no mesmo bloco para mostrar o ponto de partida mais seguro." align="center" />
          <div className="mt-12"><UseSelector /></div>
        </div>
      </section>

      <section className="overflow-hidden border-b border-line-1 py-12">
        <p className="mb-8 text-center font-mono text-xs tracking-[0.14em] text-mute-3 uppercase">Marcas que a BUMP atende</p>
        <div className="flex w-max animate-marquee" aria-label={vehicleBrands.join(", ")}>
          {[...vehicleBrands, ...vehicleBrands].map((brand, index) => <span key={`${brand}-${index}`} className="mx-3 grid min-w-40 place-items-center border border-line-1 bg-ink-card px-8 py-5 font-black tracking-[-0.02em] text-mute-1">{brand}</span>)}
        </div>
      </section>

      <section className="section-space border-b border-line-1 bg-ink-soft">
        <div className="site-container">
          <SectionHeading eyebrow="Tecnologia do conforto" title="Por que a BUMP amortece igual do km 1 ao km 1.000" description="Engenharia explicada pelo que muda no corpo, na direção e no dinheiro gasto com manutenção." />
          <div className="mt-12 grid gap-px overflow-hidden border border-line-1 bg-line-1 md:grid-cols-3">
            {technology.map((item) => (
              <article key={item.number} className="bg-ink-card p-7 md:p-9">
                <span className="font-mono text-xs text-accent">{item.number}</span>
                <h3 className="mt-10 text-xl font-black">{item.title}</h3>
                <p className="mt-3 leading-relaxed text-mute-2">{item.text}</p>
              </article>
            ))}
          </div>
          <Link href="/tecnologia" className="button-secondary mt-8">Entenda a engenharia</Link>
        </div>
      </section>

      <section className="section-space">
        <div className="site-container">
          <SectionHeading eyebrow="Prova social e autoridade" title="Quem faz a BUMP e quem já roda com ela" description="História de fábrica, engenharia própria e prova real de quem depende da picape todos os dias." align="center" />
          <div className="mt-12 grid gap-5 md:grid-cols-2">
            <article className="surface-card overflow-hidden">
              <div className="relative min-h-64"><Image src={`${ASSET_BASE}/banco_web_800/ranger.webp`} alt="Picape em uso no campo" fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover opacity-70" /></div>
              <div className="p-7"><p className="font-mono text-xs text-accent">Autoridade</p><h3 className="mt-2 text-2xl font-black">Piloto antes de fabricante.</h3><p className="mt-3 leading-relaxed text-mute-1">A BUMP nasceu de quem sentiu o terreno no volante e levou a formação técnica para dentro da fábrica.</p><Link href="/quem-somos" className="mt-5 inline-flex font-mono text-xs text-accent">Conheça a BUMP →</Link></div>
            </article>
            <article className="surface-card overflow-hidden">
              <div className="relative min-h-64"><Image src={`${ASSET_BASE}/banco_web_800/ram1500.webp`} alt="Picape equipada com BUMP em estrada" fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover opacity-70" /></div>
              <div className="p-7"><p className="font-mono text-xs text-accent">Prova real</p><h3 className="mt-2 text-2xl font-black">400 mil quilômetros. Recuperado e de volta ao trabalho.</h3><p className="mt-3 leading-relaxed text-mute-1">Equipamento feito para durar e voltar à fábrica quando precisa, em vez de virar descarte.</p><Link href="/resultados" className="mt-5 inline-flex font-mono text-xs text-accent">Ver resultados →</Link></div>
            </article>
          </div>
          <div className="mt-5"><StatsStrip /></div>
        </div>
      </section>

      <section className="border-y border-line-1 bg-accent text-ink">
        <div className="site-container py-16 text-center md:py-24">
          <p className="font-mono text-xs font-semibold tracking-[0.14em] uppercase">Seu corpo também faz parte da ferramenta</p>
          <h2 className="mx-auto mt-4 max-w-4xl text-balance text-[clamp(2.25rem,6vw,5rem)] leading-none font-black tracking-[-0.05em]">Sua próxima jornada começa com a BUMP.</h2>
          <Link href="/contato" className="mt-8 inline-flex min-h-12 items-center justify-center rounded-sm bg-ink px-6 font-mono text-xs font-semibold text-paper">Falar com a BUMP</Link>
        </div>
      </section>

      <section className="section-space">
        <div className="site-container max-w-4xl">
          <SectionHeading eyebrow="FAQ" title="Dúvidas frequentes" align="center" />
          <div className="mt-10"><FaqList items={faqItems.slice(0, 5)} /></div>
          <div className="mt-8 text-center"><Link href="/faq" className="button-secondary">Ver todas as dúvidas</Link></div>
        </div>
      </section>
    </>
  );
}
