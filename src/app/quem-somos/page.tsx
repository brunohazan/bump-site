import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Breadcrumb, CTASection, Eyebrow } from "@/components/site/Primitives";
import { VideoEmbed } from "@/components/site/VideoEmbed";
import { ASSET_BASE } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Cristian e a história da BUMP",
  description: "Conheça Cristian, a origem da BUMP e a fábrica brasileira especializada em amortecedores sob medida para picapes.",
  alternates: { canonical: "/quem-somos" },
};

const principles = [
  { number: "01", title: "O corpo vem primeiro", text: "Conforto não é adorno. É reduzir o impacto acumulado em quem usa a picape como ferramenta." },
  { number: "02", title: "O uso define o projeto", text: "Veículo, carga, altura e rotina orientam pressão, curso e configuração antes da produção." },
  { number: "03", title: "A peça não nasce descartável", text: "A construção desmontável permite inspecionar, recuperar e devolver o equipamento ao trabalho." },
] as const;

const process = [
  ["01", "Entender", "A conversa começa no veículo, peso, altura, terreno e objetivo de quem dirige."],
  ["02", "Definir", "A equipe transforma o contexto em linha, pressão, curso e conjunto compatível."],
  ["03", "Produzir", "O projeto é fabricado sob medida em Gravataí, no Rio Grande do Sul."],
  ["04", "Acompanhar", "Garantia e possibilidade de recuperação mantêm a fábrica presente depois da instalação."],
] as const;

const applications = [
  ["ranger.webp", "Ranger", "Uso misto"],
  ["hilux.webp", "Hilux", "Agro e carga"],
  ["ram1500.webp", "RAM 1500", "Viagem e projeto"],
] as const;

export default function AboutPage() {
  return (
    <>
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "A BUMP" }, { label: "Quem somos" }]} />

      <section className="relative overflow-hidden border-y border-line-1 bg-ink-soft">
        <div className="pointer-events-none absolute inset-0 opacity-20 [background-image:linear-gradient(to_right,rgba(255,255,255,.07)_1px,transparent_1px)] [background-size:25%_100%]" />
        <div className="site-container relative grid min-h-[760px] items-center gap-10 py-14 lg:grid-cols-[.9fr_1.1fr] lg:py-20">
          <div className="relative z-10">
            <Eyebrow>Cristian · origem, fábrica e propósito</Eyebrow>
            <h1 data-reveal className="max-w-[10ch] text-[clamp(2.2rem,11vw,3.25rem)] leading-[.88] font-black tracking-[-0.065em] uppercase md:text-[clamp(3.5rem,8vw,8.5rem)] md:leading-[.84]">Piloto antes de fabricante.</h1>
            <p data-reveal data-delay="1" className="mt-7 max-w-xl text-lg leading-relaxed text-mute-1">Cristian transformou uma pergunta sentida no volante em método de engenharia: por que aceitar uma suspensão que castiga o corpo e perde comportamento quando o terreno exige mais?</p>
            <div data-reveal data-delay="2" className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="#historia" className="button-primary">Conhecer a origem</Link>
              <Link href="/tecnologia" className="button-secondary">Ver a engenharia</Link>
            </div>
          </div>
          <div data-reveal="mask" className="relative min-h-[500px] overflow-hidden border border-line-2 md:min-h-[650px]">
            <Image src={`${ASSET_BASE}/banco_web_800/triton.webp`} alt="Picape em terreno brasileiro representando a origem da BUMP" fill priority sizes="(min-width: 1024px) 55vw, 100vw" className="object-cover [filter:saturate(.65)_contrast(1.08)]" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-ink/15" />
            <div className="absolute inset-x-0 bottom-0 p-6 md:p-8"><span className="font-mono text-[9px] tracking-[0.12em] text-accent uppercase">Gravataí · Rio Grande do Sul</span><p className="mt-3 max-w-md text-xl font-black tracking-[-0.03em] md:text-3xl">Engenharia para o chão brasileiro, produzida no Brasil.</p></div>
          </div>
        </div>
      </section>

      <section id="historia" className="section-space relative overflow-hidden">
        <span className="pointer-events-none absolute -top-16 right-0 text-[clamp(15rem,35vw,38rem)] leading-none font-black tracking-[-.1em] text-paper/[.018]">13</span>
        <div className="site-container relative grid gap-12 lg:grid-cols-[.72fr_1.28fr]">
          <div><Eyebrow>01 · História do fundador</Eyebrow><h2 data-reveal className="text-balance text-[clamp(2.8rem,6vw,6rem)] leading-[.9] font-black tracking-[-0.055em]">Experiência no volante. Engenharia aplicada. Fábrica em Gravataí.</h2></div>
          <div data-reveal data-delay="1" className="lg:border-l lg:border-accent lg:pl-10">
            <p className="text-xl leading-relaxed text-mute-1">A experiência de Cristian como piloto colocou o problema no corpo. A observação virou método. A fábrica transformou esse método em amortecedores desenvolvidos para cada aplicação.</p>
            <p className="mt-6 leading-relaxed text-mute-1">É daí que vem a especialização da BUMP: entender primeiro qual veículo, quanto peso, que altura, qual terreno e o que precisa mudar para quem dirige — só depois definir a peça.</p>
            <div className="mt-9 grid gap-px overflow-hidden border border-line-1 bg-line-1 sm:grid-cols-3">
              {[["13+", "anos de fábrica"], ["Brasil", "produção própria"], ["2 anos", "contra vazamento"]].map(([value, label]) => <div key={label} className="bg-ink-card p-5"><strong className="block text-2xl font-black text-accent">{value}</strong><span className="mt-2 block font-mono text-[9px] tracking-[0.08em] text-mute-3 uppercase">{label}</span></div>)}
            </div>
          </div>
        </div>
      </section>

      <section className="section-space border-y border-line-1 bg-ink-soft">
        <div className="site-container grid gap-10 lg:grid-cols-[.62fr_1.38fr] lg:items-center">
          <div>
            <Eyebrow>02 · Vídeo institucional</Eyebrow>
            <h2 data-reveal className="text-4xl font-black tracking-[-0.045em] md:text-5xl">O especialista, o produto e o terreno na mesma cena.</h2>
            <p data-reveal data-delay="1" className="mt-6 max-w-md leading-relaxed text-mute-1">Cristian apresenta a aplicação em veículos reais, com a suspensão instalada e em uso. É o registro mais direto de como a BUMP trabalha: começa pela conversa sobre o veículo e termina no comportamento sentido no terreno.</p>
          </div>
          <div data-reveal="mask">
            <VideoEmbed
              videoId="AYLSZZo0-N8"
              title="Vídeo institucional BUMP Amortecedores"
              caption="Publicado no canal oficial da BUMP. As aplicações mostradas são exemplos reais e não representam compatibilidade automática com outros veículos ou versões."
            />
          </div>
        </div>
      </section>

      <section className="section-space">
        <div className="site-container">
          <div className="grid gap-7 lg:grid-cols-[.75fr_1.25fr] lg:items-end">
            <div><Eyebrow>03 · Princípios</Eyebrow><h2 data-reveal className="text-4xl font-black tracking-[-0.045em] md:text-6xl">Três decisões que orientam cada projeto.</h2></div>
            <p data-reveal data-delay="1" className="max-w-xl leading-relaxed text-mute-1 lg:justify-self-end">A marca não começa no acabamento. Começa no efeito que o conjunto precisa produzir no corpo, no veículo e no custo de manter a ferramenta trabalhando.</p>
          </div>
          <div className="mt-10 grid gap-px overflow-hidden border border-line-1 bg-line-1 md:grid-cols-3">
            {principles.map((principle, index) => (
              <article key={principle.number} data-reveal data-delay={`${index}`} className="min-h-80 bg-ink-card p-7 md:p-8">
                <span className="font-mono text-[10px] text-accent">{principle.number}</span>
                <h3 className="mt-14 text-3xl font-black tracking-[-0.04em]">{principle.title}</h3>
                <p className="mt-5 leading-relaxed text-mute-1">{principle.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-space border-y border-line-1 bg-ink-soft">
        <div className="site-container grid gap-12 lg:grid-cols-[.72fr_1.28fr]">
          <div className="lg:sticky lg:top-28 lg:self-start"><Eyebrow>04 · Da conversa à fábrica</Eyebrow><h2 data-reveal className="text-4xl font-black tracking-[-0.045em] md:text-6xl">Sob medida é um processo, não um rótulo.</h2><p data-reveal data-delay="1" className="mt-6 max-w-md leading-relaxed text-mute-1">Sem fotografias documentais da fábrica nesta versão, o processo é apresentado de forma textual e verificável, sem simular bastidores inexistentes.</p></div>
          <div className="divide-y divide-line-2 border-y border-line-2">
            {process.map(([number, title, text], index) => (
              <article key={number} data-reveal data-delay={`${Math.min(index, 3)}`} className="grid gap-4 py-8 sm:grid-cols-[52px_150px_1fr] sm:gap-6 md:py-10">
                <span className="font-mono text-xs text-accent">{number}</span>
                <h3 className="text-2xl font-black tracking-[-0.035em]">{title}</h3>
                <p className="leading-relaxed text-mute-1">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-space">
        <div className="site-container">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div><Eyebrow>05 · Veículos e aplicações</Eyebrow><h2 data-reveal className="max-w-4xl text-4xl font-black tracking-[-0.045em] md:text-6xl">O trabalho aparece no veículo. O acerto nasce no contexto.</h2></div>
            <Link href="/aplicacoes" className="button-secondary">Ver aplicações</Link>
          </div>
          <p className="mt-6 max-w-2xl leading-relaxed text-mute-2">As imagens abaixo representam aplicações e cenários de uso. Não são fotografias da fábrica, da equipe ou do fundador.</p>
          <div className="mt-10 grid gap-4 lg:grid-cols-3">
            {applications.map(([image, vehicle, use], index) => (
              <article key={image} data-reveal="mask" data-delay={`${index}`} className="group relative min-h-[480px] overflow-hidden border border-line-1">
                <Image src={`${ASSET_BASE}/banco_web_800/${image}`} alt={`${vehicle} em cenário de ${use.toLowerCase()}`} fill sizes="(min-width: 1024px) 33vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.025]" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6"><span className="font-mono text-[9px] tracking-[0.1em] text-accent uppercase">Aplicação {String(index + 1).padStart(2, "0")}</span><h3 className="mt-2 text-3xl font-black">{vehicle}</h3><p className="mt-1 text-sm text-mute-1">{use}</p></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CTASection title="Conheça a BUMP pelo seu próximo projeto." description="Escolha a linha ou conte como usa a picape. A conversa técnica começa pelo contexto." secondaryLabel="Ver as linhas" secondaryHref="/linhas" />
    </>
  );
}
