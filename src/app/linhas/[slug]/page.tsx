import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/site/JsonLd";
import { Breadcrumb, CTASection, Eyebrow } from "@/components/site/Primitives";
import { getProductLine, lineSlugs, vehicles } from "@/lib/site-data";
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

  return (
    <>
      <JsonLd data={productJsonLd(line)} />
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Linhas", href: "/linhas" }, { label: line.shortName }]} />
      <section className="border-y border-line-1 bg-ink-soft">
        <div className="site-container grid items-center gap-10 py-16 lg:grid-cols-2 lg:py-24">
          <div>
            <span className="inline-flex rounded-sm border border-accent/40 bg-accent-soft px-3 py-1 font-mono text-xs text-accent">{line.badge}</span>
            <h1 className="mt-5 text-[clamp(3rem,7vw,7rem)] leading-[.9] font-black tracking-[-0.055em] uppercase">{line.shortName}</h1>
            <p className="mt-5 max-w-xl text-xl font-semibold">{line.headline}</p>
            <p className="mt-4 max-w-xl leading-relaxed text-mute-1">{line.description}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href={`/configurador?linha=${line.slug}`} className="button-primary">Montar essa linha</Link>
              <Link href="/contato" className="button-secondary">Falar com especialista</Link>
            </div>
          </div>
          <div className="relative min-h-[390px] overflow-hidden rounded-sm border border-line-2 bg-ink-frame">
            <Image src={line.image} alt={line.name} fill priority sizes="(min-width: 1024px) 50vw, 100vw" className="object-contain p-9 md:p-14" />
            <span className="absolute right-4 bottom-4 font-mono text-xs text-mute-3">{line.code}</span>
          </div>
        </div>
      </section>

      <section className="section-space">
        <div className="site-container grid gap-12 lg:grid-cols-[.8fr_1.2fr]">
          <div><Eyebrow>O que muda na prática</Eyebrow><h2 className="text-4xl font-black tracking-[-0.04em]">Menos impacto no corpo. Mais controle no trabalho.</h2></div>
          <div className="grid gap-px overflow-hidden border border-line-1 bg-line-1 sm:grid-cols-2">
            {line.benefits.map((benefit) => <div key={benefit} className="bg-ink-card p-6"><span className="text-accent">✓</span><p className="mt-3 font-semibold">{benefit}</p></div>)}
          </div>
        </div>
      </section>

      <section className="section-space border-y border-line-1 bg-ink-soft">
        <div className="site-container grid gap-10 lg:grid-cols-2">
          <div>
            <Eyebrow>Ficha técnica</Eyebrow>
            <h2 className="mb-7 text-3xl font-black">Engenharia aberta, sem promessa vaga.</h2>
            <div className="overflow-hidden border border-line-2">
              {line.specs.map((spec) => <div key={spec.label} className="grid grid-cols-[110px_1fr] gap-4 border-b border-line-1 px-4 py-4 last:border-0 sm:grid-cols-[160px_1fr]"><span className="font-mono text-xs text-mute-3">{spec.label}</span><strong className="text-sm">{spec.value}</strong></div>)}
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <article className="rounded-sm border border-accent/40 bg-accent-soft p-7"><Eyebrow>Para quem é</Eyebrow><p className="text-lg font-semibold leading-relaxed">{line.idealFor}</p></article>
            <article className="rounded-sm border border-line-2 bg-ink-card p-7"><Eyebrow>Para quem não é</Eyebrow><p className="text-lg font-semibold leading-relaxed text-mute-1">{line.notFor}</p></article>
          </div>
        </div>
      </section>

      <section className="section-space">
        <div className="site-container">
          <Eyebrow>Aplicações compatíveis</Eyebrow>
          <h2 className="max-w-3xl text-4xl font-black tracking-[-0.04em]">Comece pelo seu veículo. A fábrica confirma o acerto.</h2>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            {vehicles.map((vehicle) => <Link key={vehicle.slug} href={`/configurador?veiculo=${vehicle.slug}&linha=${line.slug}`} className="min-h-24 rounded-sm border border-line-2 bg-ink-card p-5 transition-colors hover:border-accent"><span className="font-mono text-xs text-mute-3">{vehicle.brand}</span><strong className="mt-2 block">{vehicle.model}</strong></Link>)}
          </div>
        </div>
      </section>

      <section className="border-y border-line-1 bg-ink-soft">
        <div className="site-container grid gap-8 py-16 md:grid-cols-[1fr_auto] md:items-center">
          <div><Eyebrow>Prova de campo</Eyebrow><blockquote className="max-w-3xl text-2xl font-bold leading-snug">“Depois da revisão, o mesmo equipamento voltou para a estrada. O custo para de vazar quando a peça não nasce descartável.”</blockquote></div>
          <Link href="/resultados" className="button-secondary">Ver resultados</Link>
        </div>
      </section>
      <CTASection title={`Pronto para montar a sua ${line.shortName}?`} primaryLabel="Montar essa linha" primaryHref={`/configurador?linha=${line.slug}`} secondaryLabel="Ver outras linhas" secondaryHref="/linhas" />
    </>
  );
}
