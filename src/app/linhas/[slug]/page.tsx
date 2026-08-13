import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/site/JsonLd";
import { Breadcrumb, CTASection, Eyebrow } from "@/components/site/Primitives";
import { getProductLine, lineSlugs, productLines, vehicles } from "@/lib/site-data";
import { productJsonLd } from "@/lib/structured-data";

export function generateStaticParams() {
  return lineSlugs.map((slug) => ({ slug }));
}

type LinePageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: LinePageProps): Promise<Metadata> {
  const { slug } = await params;
  const line = getProductLine(slug);
  if (!line) return {};
  return { title: line.name, description: line.description, alternates: { canonical: `/linhas/${line.slug}` } };
}

export default async function ProductLinePage({ params }: LinePageProps) {
  const { slug } = await params;
  const line = getProductLine(slug);
  if (!line) notFound();

  const lineIndex = productLines.findIndex((item) => item.slug === line.slug);
  const nextLine = productLines[(lineIndex + 1) % productLines.length];
  const lineNumber = String(lineIndex + 1).padStart(2, "0");

  return (
    <>
      <JsonLd data={productJsonLd(line)} />
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Linhas", href: "/linhas" }, { label: line.shortName }]} />

      <section className="relative overflow-hidden border-y border-line-1 bg-ink-soft">
        <div className="pointer-events-none absolute inset-0 opacity-25 [background-image:linear-gradient(to_right,rgba(255,255,255,.06)_1px,transparent_1px)] [background-size:25%_100%]" />
        <div className="site-container relative grid min-h-[calc(100svh-132px)] items-center gap-8 py-12 lg:grid-cols-[.86fr_1.14fr] lg:gap-4 lg:py-16">
          <div className="relative z-10 lg:py-8">
            <div data-reveal className="flex items-center gap-3">
              <span className="font-mono text-[10px] tracking-[0.14em] text-accent">{lineNumber} · {line.code}</span>
              <span className="h-px w-10 bg-accent" />
              <span className="font-mono text-[10px] tracking-[0.12em] text-mute-2 uppercase">{line.badge}</span>
            </div>
            <h1 data-reveal data-delay="1" className="mt-6 text-[clamp(3.5rem,8.5vw,8.5rem)] leading-[.82] font-black tracking-[-0.065em] uppercase">
              {line.shortName}
            </h1>
            <p data-reveal data-delay="2" className="mt-7 max-w-xl text-xl leading-tight font-black tracking-[-0.025em] md:text-3xl">{line.headline}</p>
            <p data-reveal data-delay="2" className="mt-5 max-w-xl leading-relaxed text-mute-1">{line.description}</p>
            <div data-reveal data-delay="3" className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href={`/configurador?linha=${line.slug}`} className="button-primary">Montar essa linha</Link>
              <Link href="#engenharia" className="button-secondary">Ver a engenharia</Link>
            </div>
            <div data-reveal data-delay="3" className="mt-9 flex flex-wrap gap-2">
              {line.use.split(", ").map((use) => (
                <span key={use} className="border border-line-2 bg-ink/60 px-3 py-2 font-mono text-[9px] tracking-[0.08em] text-mute-2 uppercase">{use}</span>
              ))}
            </div>
          </div>

          <div data-reveal="mask" className="relative min-h-[420px] overflow-hidden border border-line-2 bg-[radial-gradient(circle_at_50%_45%,rgba(47,211,93,.18),transparent_56%)] md:min-h-[580px] lg:min-h-[680px]">
            <span className="pointer-events-none absolute -right-5 -bottom-12 text-[clamp(12rem,30vw,30rem)] leading-none font-black tracking-[-.1em] text-paper/[.025]">{lineNumber}</span>
            <span className="absolute top-5 left-5 z-10 font-mono text-[9px] tracking-[0.14em] text-accent uppercase">Produzido sob medida · Gravataí, RS</span>
            <Image src={line.image} alt={line.name} fill priority sizes="(min-width: 1024px) 58vw, 100vw" className="technology-product object-contain p-7 md:p-14 lg:p-16" />
            <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-ink-soft to-transparent" />
            <span className="absolute right-5 bottom-5 z-10 font-mono text-[9px] tracking-[0.1em] text-mute-3">2 ANOS DE GARANTIA</span>
          </div>
        </div>
      </section>

      <section className="section-space relative overflow-hidden">
        <span className="pointer-events-none absolute -top-16 right-0 text-[clamp(14rem,32vw,34rem)] leading-none font-black tracking-[-.1em] text-paper/[.018]">01</span>
        <div className="site-container relative grid gap-12 lg:grid-cols-[.72fr_1.28fr]">
          <div>
            <Eyebrow>O que muda na prática</Eyebrow>
            <h2 data-reveal className="text-balance text-[clamp(2.6rem,5.5vw,5.5rem)] leading-[.92] font-black tracking-[-0.05em]">Menos impacto no corpo. Mais controle no trabalho.</h2>
            <p data-reveal data-delay="1" className="mt-6 max-w-lg leading-relaxed text-mute-1">O acerto parte da realidade do veículo. Cada benefício abaixo é consequência de calibrar construção, pressão e curso para o uso informado.</p>
          </div>
          <div className="grid gap-px overflow-hidden border border-line-1 bg-line-1 sm:grid-cols-2">
            {line.benefits.map((benefit, index) => (
              <article key={benefit} data-reveal data-delay={`${Math.min(index, 3)}`} className="group min-h-52 bg-ink-card p-6 transition-colors hover:bg-accent-soft md:p-8">
                <span className="font-mono text-[10px] text-accent">0{index + 1}</span>
                <p className="mt-12 text-xl leading-tight font-black tracking-[-0.025em] group-hover:text-accent">{benefit}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="engenharia" className="section-space border-y border-line-1 bg-ink-soft">
        <div className="site-container">
          <div className="mb-12 grid gap-6 lg:grid-cols-[.8fr_1.2fr] lg:items-end">
            <div><Eyebrow>02 · Engenharia aberta</Eyebrow><h2 data-reveal className="text-4xl font-black tracking-[-0.045em] md:text-6xl">Sem promessa vaga. Cada escolha tem uma função.</h2></div>
            <p data-reveal data-delay="1" className="max-w-xl leading-relaxed text-mute-1 lg:justify-self-end">A ficha é o ponto de partida. Pressão e medidas finais são confirmadas pela fábrica conforme veículo, carga, altura e rotina.</p>
          </div>

          <div className="grid gap-6 lg:grid-cols-[1.05fr_.95fr] lg:gap-12">
            <div data-reveal="mask" className="relative min-h-[480px] overflow-hidden border border-line-2 bg-ink lg:sticky lg:top-28 lg:min-h-[660px]">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(47,211,93,.14),transparent_58%)]" />
              <Image src={line.image} alt={`Detalhe técnico da ${line.name}`} fill sizes="(min-width: 1024px) 52vw, 100vw" className="selector-product object-contain p-10 md:p-16" />
              <span className="absolute top-5 left-5 font-mono text-[9px] tracking-[0.12em] text-accent">{line.code} · VISTA TÉCNICA</span>
            </div>
            <div>
              <div className="overflow-hidden border border-line-2">
                {line.specs.map((spec, index) => (
                  <article key={`${spec.label}-${index}`} data-reveal data-delay={`${Math.min(index, 3)}`} className="grid gap-3 border-b border-line-1 bg-ink-card px-5 py-6 last:border-0 sm:grid-cols-[150px_1fr] sm:gap-6 md:px-7 md:py-7">
                    <span className="font-mono text-[10px] tracking-[0.08em] text-mute-3 uppercase">{spec.label}</span>
                    <strong className="text-base leading-relaxed md:text-lg">{spec.value}</strong>
                  </article>
                ))}
              </div>
              <div className="mt-5 grid gap-5 sm:grid-cols-2">
                <article data-reveal className="border border-accent/40 bg-accent-soft p-6 md:p-7">
                  <Eyebrow>Para quem é</Eyebrow>
                  <p className="text-lg leading-relaxed font-semibold">{line.idealFor}</p>
                </article>
                <article data-reveal data-delay="1" className="border border-line-2 bg-ink-card p-6 md:p-7">
                  <Eyebrow>Antes de escolher</Eyebrow>
                  <p className="text-lg leading-relaxed font-semibold text-mute-1">{line.notFor}</p>
                </article>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-space">
        <div className="site-container">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div><Eyebrow>03 · Aplicações compatíveis</Eyebrow><h2 data-reveal className="max-w-4xl text-4xl font-black tracking-[-0.045em] md:text-6xl">Comece pelo veículo. A fábrica confirma o acerto.</h2></div>
            <Link href="/aplicacoes" className="button-secondary">Ver aplicações</Link>
          </div>
          <div className="mt-10 grid gap-px overflow-hidden border border-line-1 bg-line-1 sm:grid-cols-2 lg:grid-cols-5">
            {vehicles.map((vehicle, index) => (
              <Link key={vehicle.slug} data-reveal data-delay={`${Math.min(index % 5, 3)}`} href={`/configurador?veiculo=${vehicle.slug}&linha=${line.slug}`} className="group min-h-36 bg-ink-card p-5 transition-colors hover:bg-accent-soft">
                <span className="font-mono text-[9px] tracking-[0.1em] text-mute-3 uppercase">{vehicle.brand}</span>
                <strong className="mt-5 block text-xl tracking-[-0.03em] group-hover:text-accent">{vehicle.model}</strong>
                <span className="mt-8 block font-mono text-[10px] text-mute-3 transition-transform group-hover:translate-x-1 group-hover:text-paper">Configurar →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-line-1 bg-accent text-ink">
        <div className="site-container grid gap-8 py-14 md:grid-cols-[.7fr_1.3fr] md:items-end md:py-20">
          <div data-reveal><p className="font-mono text-[10px] font-semibold tracking-[0.12em] uppercase">04 · Construção recuperável</p><strong className="mt-3 block text-[clamp(3.5rem,8vw,8rem)] leading-none font-black tracking-[-0.06em]">400 mil km</strong></div>
          <div data-reveal data-delay="1"><h2 className="text-2xl font-black tracking-[-0.035em] md:text-4xl">Um equipamento real voltou à fábrica, foi recuperado e retornou ao trabalho.</h2><p className="mt-4 max-w-2xl leading-relaxed text-ink/75">O caso comprova a lógica desmontável e recuperável da construção BUMP. Não representa uma garantia de quilometragem para toda aplicação.</p><Link href="/resultados" className="mt-6 inline-flex font-mono text-[11px] font-semibold">Entender o caso ↗</Link></div>
        </div>
      </section>

      <section className="border-b border-line-1 bg-ink">
        <div className="site-container flex flex-col gap-5 py-10 sm:flex-row sm:items-center sm:justify-between">
          <div><p className="font-mono text-[9px] tracking-[0.12em] text-mute-3 uppercase">Próxima linha · {nextLine.code}</p><p className="mt-2 text-2xl font-black">{nextLine.shortName}</p></div>
          <Link href={`/linhas/${nextLine.slug}`} className="button-secondary">Explorar próxima linha</Link>
        </div>
      </section>

      <CTASection title={`Pronto para montar a sua ${line.shortName}?`} description="A recomendação final considera veículo, ano, carga, altura e rotina antes da produção." primaryLabel="Montar essa linha" primaryHref={`/configurador?linha=${line.slug}`} secondaryLabel="Comparar linhas" secondaryHref="/linhas" />
    </>
  );
}
