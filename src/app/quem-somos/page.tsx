import type { Metadata } from "next";
import Image from "next/image";
import { Breadcrumb, CTASection, Eyebrow, PageHero, StatsStrip } from "@/components/site/Primitives";
import { ASSET_BASE } from "@/lib/site-data";

export const metadata: Metadata = { title: "Quem somos", description: "Conheça a história, a fábrica e a engenharia própria da BUMP Amortecedores.", alternates: { canonical: "/quem-somos" } };
const values = [{ title: "A fábrica", text: "Feito no Brasil, à mão e sob medida para a rotina real de cada picape." }, { title: "Engenharia própria", text: "Fluido, pressurização e curso definidos por quem entende veículo e terreno." }, { title: "Valores", text: "Conforto como missão. O corpo do motorista vem antes do adorno." }] as const;

export default function AboutPage() {
  return <><Breadcrumb items={[{ label: "Home", href: "/" }, { label: "A BUMP" }, { label: "Quem somos" }]} /><PageHero eyebrow="Marca e autoridade" title="Quem faz a BUMP" description="Confiança construída por quem pilotou, estudou e decidiu fabricar um amortecedor para o chão brasileiro." />
  <section className="section-space"><div className="site-container grid items-center gap-10 lg:grid-cols-2"><div className="relative min-h-[390px] overflow-hidden rounded-sm border border-line-2"><Image src={`${ASSET_BASE}/banco_web_800/triton.webp`} alt="História do fundador da BUMP" fill sizes="50vw" className="object-cover opacity-75" /></div><div><Eyebrow>História do fundador</Eyebrow><h2 className="text-4xl font-black tracking-[-0.04em]">Formação na Itália. Piloto antes de fabricante.</h2><p className="mt-5 leading-relaxed text-mute-1">A BUMP começou com uma pergunta vivida no volante: por que aceitar uma suspensão que castiga o corpo e perde rendimento no terreno? A resposta virou estudo, engenharia própria e fábrica em Gravataí.</p><p className="mt-4 leading-relaxed text-mute-1">Hoje cada projeto parte do veículo, da carga e da rotina de quem dirige.</p></div></div></section>
  <section className="section-space border-y border-line-1 bg-ink-soft"><div className="site-container grid gap-4 md:grid-cols-3">{values.map((item) => <article key={item.title} className="surface-card min-h-60 p-7"><h2 className="text-2xl font-black">{item.title}</h2><p className="mt-4 leading-relaxed text-mute-1">{item.text}</p></article>)}</div></section>
  <section className="section-space"><div className="site-container"><Eyebrow>Fábrica e bastidores</Eyebrow><div className="grid gap-4 md:grid-cols-3">{["ranger.webp", "hilux.webp", "ram1500.webp"].map((image, index) => <div key={image} className="relative min-h-64 overflow-hidden rounded-sm border border-line-2"><Image src={`${ASSET_BASE}/banco_web_800/${image}`} alt={`Bastidor BUMP ${index + 1}`} fill sizes="33vw" className="object-cover opacity-70" /></div>)}</div><div className="mt-6"><StatsStrip /></div></div></section>
  <CTASection title="Rode com a BUMP." secondaryLabel="Ver as linhas" secondaryHref="/linhas" /></>;
}
