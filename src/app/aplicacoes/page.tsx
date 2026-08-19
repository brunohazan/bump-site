import type { Metadata } from "next";
import Link from "next/link";
import { VehicleFilter } from "@/components/applications/VehicleFilter";
import { Breadcrumb, CTASection, PageHero } from "@/components/site/Primitives";
import { vehicleApplications } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Amortecedores por modelo de picape",
  description: "Encontre guias de amortecedores BUMP para Hilux, S10, Ranger, L200 Triton e Amarok e confirme uma aplicação sob medida.",
  alternates: { canonical: "/aplicacoes" },
};

export default function ApplicationsPage() {
  return (
    <>
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Aplicações" }]} />
      <PageHero
        eyebrow="Aplicações por modelo e uso"
        title="Sua picape é o começo. A rotina define o acerto."
        description="Os guias abaixo ajudam a organizar a escolha por modelo. Ano, versão, carga, altura e alterações continuam sujeitos à confirmação da fábrica."
      />
      <section className="section-space border-b border-line-1 bg-ink-soft">
        <div className="site-container">
          <div className="grid gap-px overflow-hidden border border-line-1 bg-line-1 md:grid-cols-3">
            {[
              ["01", "Modelo", "Identifica a arquitetura inicial da aplicação, sem presumir compatibilidade por ano ou versão."],
              ["02", "Contexto", "Carga, terreno, distância, altura e acessórios mostram o que o conjunto enfrenta de verdade."],
              ["03", "Confirmação", "A equipe técnica revisa medidas, linha e disponibilidade antes de qualquer produção."],
            ].map(([number, title, text]) => (
              <article key={number} data-reveal className="min-h-56 bg-ink-card p-7">
                <span className="font-mono text-[10px] text-accent">{number}</span>
                <h2 className="mt-10 text-2xl font-black">{title}</h2>
                <p className="mt-4 text-sm leading-relaxed text-mute-2">{text}</p>
              </article>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-2">
            {vehicleApplications.map((application) => (
              <Link key={application.slug} href={`/aplicacoes/${application.slug}`} className="button-secondary button-sm">
                {application.model}
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section className="section-space">
        <div className="site-container">
          <VehicleFilter />
        </div>
      </section>
      <CTASection
        title="Não encontrou o seu veículo?"
        description="Projetos especiais começam por uma conversa sobre aplicação, medidas e uso real."
        secondaryLabel="Falar com especialista"
      />
    </>
  );
}
