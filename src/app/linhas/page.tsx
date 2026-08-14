import type { Metadata } from "next";
import { ProductLineCard } from "@/components/site/ProductLineCard";
import { Breadcrumb, CTASection, PageHero } from "@/components/site/Primitives";
import { productLines } from "@/lib/site-data";

export const metadata: Metadata = { title: "Linhas de amortecedores", description: "Conheça as seis linhas BUMP e encontre o acerto para sua picape, carga e uso.", alternates: { canonical: "/linhas" } };

export default function LinesPage() {
  return (
    <>
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Linhas" }]} />
      <PageHero eyebrow="Seis linhas. Um acerto para cada rotina." title="Feito para o seu uso, não para uma prateleira." description="Não existe uma pressão única para toda picape. Compare o ponto de partida de cada linha. A configuração final considera veículo, peso, altura e rotina." />
      <section className="section-space">
        <div className="site-container grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {productLines.map((line) => <ProductLineCard key={line.slug} line={line} />)}
        </div>
      </section>
      <CTASection title="Ainda não sabe qual linha escolher?" description="Responda sobre sua picape e sua rotina. O configurador indica um ponto de partida." />
    </>
  );
}
