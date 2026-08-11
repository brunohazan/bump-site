import type { Metadata } from "next";
import { Configurator } from "@/components/configurator/Configurator";
import { Breadcrumb, PageHero } from "@/components/site/Primitives";

export const metadata: Metadata = { title: "Monte seu amortecedor", description: "Configure o amortecedor BUMP para sua picape, seu uso e seu chão em nove passos.", alternates: { canonical: "/configurador" } };

type ConfiguratorPageProps = { searchParams: Promise<Record<string, string | string[] | undefined>> };

export default async function ConfiguratorPage({ searchParams }: ConfiguratorPageProps) {
  const params = await searchParams;
  const read = (value: string | string[] | undefined) => typeof value === "string" ? value : undefined;
  return (
    <>
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Monte seu amortecedor" }]} />
      <PageHero eyebrow="Projeto sob medida" title="Monte o seu amortecedor" description="Nove passos para a fábrica entender sua picape e preparar um orçamento técnico. Nenhum dado é enviado nesta versão de demonstração." />
      <section className="section-space bg-ink-soft">
        <div className="site-container"><Configurator initial={{ vehicle: read(params.veiculo), line: read(params.linha), usage: read(params.uso) }} /></div>
      </section>
    </>
  );
}
