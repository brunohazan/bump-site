import type { Metadata } from "next";
import { Configurator } from "@/components/configurator/Configurator";
import { Breadcrumb, Eyebrow } from "@/components/site/Primitives";

export const metadata: Metadata = {
  title: "Monte seu amortecedor",
  description: "Configure o amortecedor BUMP para sua picape, seu uso e seu chão em nove passos.",
  alternates: { canonical: "/configurador" },
};

type ConfiguratorPageProps = { searchParams: Promise<Record<string, string | string[] | undefined>> };

export default async function ConfiguratorPage({ searchParams }: ConfiguratorPageProps) {
  const params = await searchParams;
  const read = (value: string | string[] | undefined) => typeof value === "string" ? value : undefined;

  return (
    <>
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Monte seu amortecedor" }]} />
      <section className="relative overflow-hidden border-y border-line-1 bg-ink-soft">
        <span className="pointer-events-none absolute -right-8 -bottom-20 text-[clamp(16rem,35vw,38rem)] leading-none font-black tracking-[-.1em] text-paper/[.018]">09</span>
        <div className="site-container relative grid gap-10 py-16 lg:grid-cols-[1.05fr_.95fr] lg:items-end lg:py-24">
          <div>
            <Eyebrow>Projeto sob medida · nove etapas</Eyebrow>
            <h1 data-reveal className="max-w-[11ch] text-[clamp(3.5rem,7vw,7.5rem)] leading-[.86] font-black tracking-[-0.06em] uppercase">Sua rotina vira um ponto de partida técnico.</h1>
          </div>
          <div data-reveal data-delay="1" className="lg:border-l lg:border-accent lg:pl-8">
            <p className="max-w-xl text-lg leading-relaxed text-mute-1">Conte sobre picape, uso, objetivo e projeto. A recomendação organiza a conversa; a fábrica confirma aplicação, medidas e disponibilidade antes de produzir.</p>
            <div className="mt-7 grid gap-px overflow-hidden border border-line-1 bg-line-1 sm:grid-cols-3">
              {["Sem envio de dados", "Resumo em tempo real", "Revisão pela fábrica"].map((item, index) => (
                <div key={item} className="bg-ink-card p-4"><span className="font-mono text-[9px] text-accent">0{index + 1}</span><p className="mt-3 text-sm font-semibold">{item}</p></div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-space bg-ink-soft">
        <div className="site-container">
          <Configurator initial={{ vehicle: read(params.veiculo), line: read(params.linha), usage: read(params.uso) }} />
          <p className="mx-auto mt-6 max-w-3xl text-center font-mono text-[9px] leading-relaxed tracking-[0.06em] text-mute-4">DEMONSTRAÇÃO LOCAL · NENHUM DADO É TRANSMITIDO OU PERSISTIDO · A CONEXÃO REAL DEPENDE DE HARDENING LGPD</p>
        </div>
      </section>
    </>
  );
}
