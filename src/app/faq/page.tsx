import type { Metadata } from "next";
import Link from "next/link";
import { FaqList } from "@/components/site/FaqList";
import { JsonLd } from "@/components/site/JsonLd";
import { Breadcrumb, PageHero } from "@/components/site/Primitives";
import { faqItems } from "@/lib/site-data";
import { faqJsonLd } from "@/lib/structured-data";

export const metadata: Metadata = { title: "Perguntas frequentes", description: "Respostas sobre compatibilidade, preço, prazo, garantia, instalação e durabilidade BUMP.", alternates: { canonical: "/faq" } };
export default function FaqPage() { return <><JsonLd data={faqJsonLd(faqItems)} /><Breadcrumb items={[{ label: "Home", href: "/" }, { label: "FAQ" }]} /><PageHero eyebrow="Ajuda para decidir" title="Dúvidas frequentes" description="O que você precisa saber antes de configurar, pagar e instalar." /><section className="section-space"><div className="site-container max-w-4xl"><FaqList items={faqItems} /><div className="mt-10 flex flex-wrap justify-center gap-3"><Link href="/configurador" className="button-primary">Montar meu amortecedor</Link><Link href="/contato" className="button-secondary">Falar com especialista</Link></div></div></section></>; }
