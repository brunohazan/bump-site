import type { Metadata } from "next";
import { VehicleFilter } from "@/components/applications/VehicleFilter";
import { Breadcrumb, CTASection, PageHero } from "@/components/site/Primitives";

export const metadata: Metadata = { title: "Aplicações", description: "Encontre sua picape e comece uma configuração BUMP sob medida.", alternates: { canonical: "/aplicacoes" } };
export default function ApplicationsPage() { return <><Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Aplicações" }]} /><PageHero eyebrow="Compatibilidade por veículo" title="Encontre sua picape" description="A lista mostra aplicações iniciais. Veículo, ano, peso e altura serão confirmados pela fábrica." /><section className="section-space"><div className="site-container"><VehicleFilter /></div></section><CTASection title="Não encontrou o seu veículo?" description="Projetos especiais começam por uma conversa com a equipe técnica." secondaryLabel="Falar com especialista" /></>; }
