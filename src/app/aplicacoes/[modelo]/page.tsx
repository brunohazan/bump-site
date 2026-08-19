import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/site/JsonLd";
import { ProductLineCard } from "@/components/site/ProductLineCard";
import { Breadcrumb, CTASection, Eyebrow, PageHero } from "@/components/site/Primitives";
import {
  applicationSlugs,
  getProductLine,
  getVehicleApplication,
  type ProductLine,
} from "@/lib/site-data";
import { applicationJsonLd } from "@/lib/structured-data";

export function generateStaticParams() {
  return applicationSlugs.map((slug) => ({ modelo: slug }));
}

type ApplicationPageProps = { params: Promise<{ modelo: string }> };

export async function generateMetadata({ params }: ApplicationPageProps): Promise<Metadata> {
  const { modelo } = await params;
  const application = getVehicleApplication(modelo);
  if (!application) return {};

  return {
    title: `Amortecedor para ${application.model}`,
    description: application.description,
    alternates: { canonical: `/aplicacoes/${application.slug}` },
  };
}

export default async function ApplicationPage({ params }: ApplicationPageProps) {
  const { modelo } = await params;
  const application = getVehicleApplication(modelo);
  if (!application) notFound();

  const startingLines = application.startingLines
    .map((slug) => getProductLine(slug))
    .filter((line): line is ProductLine => Boolean(line));

  return (
    <>
      <JsonLd data={applicationJsonLd(application)} />
      <Breadcrumb items={[
        { label: "Home", href: "/" },
        { label: "Aplicações", href: "/aplicacoes" },
        { label: application.model },
      ]} />

      <PageHero
        eyebrow={`${application.brand} ${application.model} · projeto sob medida`}
        title={application.headline}
        description={application.description}
      >
        <Link href={`/configurador?veiculo=${application.slug}`} className="button-primary">Configurar minha {application.model}</Link>
        <Link href="#antes-de-definir" className="button-secondary">O que precisamos saber</Link>
      </PageHero>

      <section className="section-space">
        <div className="site-container">
          <div className="grid gap-8 lg:grid-cols-[.7fr_1.3fr] lg:items-end">
            <div>
              <Eyebrow>01 · Contextos de uso</Eyebrow>
              <h2 className="text-balance text-4xl font-black tracking-[-0.045em] md:text-6xl">O mesmo modelo pode pedir respostas diferentes.</h2>
            </div>
            <p className="max-w-xl leading-relaxed text-mute-1 lg:justify-self-end">Esses cenários organizam o ponto de partida. Eles não substituem a confirmação de versão, medidas, carga e alterações do veículo.</p>
          </div>
          <div className="mt-10 grid gap-px overflow-hidden border border-line-1 bg-line-1 md:grid-cols-3">
            {application.contexts.map((context, index) => (
              <article key={context.title} data-reveal className="min-h-64 bg-ink-card p-7 md:p-8">
                <span className="font-mono text-[10px] text-accent">0{index + 1}</span>
                <h3 className="mt-12 text-2xl font-black tracking-[-0.035em]">{context.title}</h3>
                <p className="mt-4 leading-relaxed text-mute-1">{context.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="antes-de-definir" className="section-space border-y border-line-1 bg-ink-soft">
        <div className="site-container grid gap-10 lg:grid-cols-[.75fr_1.25fr]">
          <div>
            <Eyebrow>02 · Antes de definir o conjunto</Eyebrow>
            <h2 className="text-4xl font-black tracking-[-0.045em] md:text-6xl">A recomendação começa pelas perguntas certas.</h2>
            <p className="mt-6 max-w-lg leading-relaxed text-mute-1">A página confirma que a BUMP desenvolve aplicações para este modelo. A compatibilidade final depende das respostas e da revisão técnica.</p>
          </div>
          <div className="divide-y divide-line-2 border-y border-line-2">
            {application.questions.map((question, index) => (
              <article key={question} data-reveal className="grid grid-cols-[44px_1fr] gap-5 py-7 md:py-9">
                <span className="font-mono text-xs text-accent">0{index + 1}</span>
                <h3 className="text-xl font-black tracking-[-0.025em] md:text-2xl">{question}</h3>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-space">
        <div className="site-container">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <Eyebrow>03 · Linhas para começar a conversa</Eyebrow>
              <h2 className="max-w-4xl text-4xl font-black tracking-[-0.045em] md:text-6xl">Três pontos de partida. O uso decide qual avança.</h2>
            </div>
            <Link href="/linhas" className="button-secondary">Comparar todas as linhas</Link>
          </div>
          <p className="mt-6 max-w-2xl leading-relaxed text-mute-1">As linhas abaixo cobrem contextos frequentes deste modelo. Não constituem indicação automática nem confirmam compatibilidade com toda versão.</p>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {startingLines.map((line) => <ProductLineCard key={line.slug} line={line} />)}
          </div>
        </div>
      </section>

      <section className="border-y border-line-1 bg-accent text-ink">
        <div className="site-container grid gap-8 py-12 sm:grid-cols-2 lg:grid-cols-4 lg:py-16">
          {[
            ["Desde 2013", "experiência de fábrica"],
            ["Gravataí · RS", "produção própria"],
            ["2 anos", "contra vazamento"],
            ["Recuperável", "retorno possível à fábrica"],
          ].map(([value, label], index) => (
            <div key={label} data-reveal data-delay={`${Math.min(index, 3)}`}>
              <strong className="block text-2xl font-black tracking-[-0.035em]">{value}</strong>
              <span className="mt-2 block font-mono text-[9px] tracking-[0.08em] uppercase">{label}</span>
            </div>
          ))}
        </div>
      </section>

      <CTASection
        title={`Conte como a sua ${application.model} trabalha.`}
        description="A fábrica transforma versão, carga, altura, terreno e objetivo em um ponto de partida técnico."
        primaryLabel={`Configurar ${application.model}`}
        primaryHref={`/configurador?veiculo=${application.slug}`}
        secondaryLabel="Falar com especialista"
      />
    </>
  );
}
