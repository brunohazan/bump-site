import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/site/JsonLd";
import { Breadcrumb, CTASection, Eyebrow, PageHero } from "@/components/site/Primitives";
import { comparisonArticleJsonLd, faqJsonLd } from "@/lib/structured-data";

export const metadata: Metadata = {
  title: "Amortecedor nacional ou importado?",
  description: "Compare amortecedores por acerto, aplicação, suporte, manutenção e recuperabilidade antes de decidir apenas pela origem.",
  alternates: { canonical: "/tecnologia/nacional-ou-importado" },
};

const criteria = [
  {
    title: "Acerto para a aplicação",
    text: "Pergunte se o conjunto considera veículo, carga, altura, acessórios e terreno, ou se repete a mesma configuração para usos diferentes.",
  },
  {
    title: "Suporte técnico",
    text: "Entenda quem responde pela especificação, pela instalação e pelo diagnóstico quando a rotina muda ou surge uma dúvida.",
  },
  {
    title: "Manutenção e recuperação",
    text: "Verifique se o equipamento pode ser desmontado, inspecionado e recuperado e como funciona o acesso a peças e serviço.",
  },
  {
    title: "Custo ao longo do uso",
    text: "Preço de compra é apenas uma parte. Parada, suporte, possibilidade de recuperação e adequação ao trabalho também entram na decisão.",
  },
] as const;

const solutions = [
  ["Original de fábrica", "Compatibilidade com o conjunto original e comportamento previsto pela montadora.", "Reavalie quando carga, altura, acessórios ou severidade deixam de ser os originais."],
  ["Reposição genérica", "Disponibilidade e substituição direta podem atender uma necessidade de manutenção convencional.", "Confirme o quanto a configuração responde ao seu peso e uso, não apenas ao modelo do veículo."],
  ["Importado premium", "Pode oferecer recursos e configurações voltados a performance ou uso específico.", "Verifique calibração para a aplicação, suporte local, prazo, peças e processo de recuperação."],
  ["BUMP sob medida", "Projeto definido por veículo, carga, altura e rotina, com fabricação própria no Brasil.", "A linha e a compatibilidade final ainda dependem de conversa técnica; sob medida não elimina os limites de uso."],
] as const;

const questions = [
  {
    question: "Amortecedor importado é sempre melhor?",
    answer: "Não é possível concluir qualidade ou adequação apenas pela origem. Compare acerto, aplicação, suporte, manutenção e o contexto real de uso.",
  },
  {
    question: "Quando um amortecedor sob medida faz sentido?",
    answer: "Quando carga, terreno, altura, acessórios ou objetivo pedem uma resposta diferente de uma configuração genérica. A equipe ainda precisa confirmar a aplicação.",
  },
  {
    question: "Um amortecedor recuperável dura para sempre?",
    answer: "Não. Recuperável significa que o equipamento pode ser desmontado, inspecionado e reparado quando tecnicamente viável; não é promessa de vida útil infinita.",
  },
] as const;

export default function NationalOrImportedPage() {
  return (
    <>
      <JsonLd data={comparisonArticleJsonLd} />
      <JsonLd data={faqJsonLd(questions)} />
      <Breadcrumb items={[
        { label: "Home", href: "/" },
        { label: "Tecnologia", href: "/tecnologia" },
        { label: "Nacional ou importado" },
      ]} />

      <PageHero
        eyebrow="Guia técnico de decisão"
        title="Amortecedor nacional ou importado? Compare o que muda no uso."
        description="Origem e preço não resolvem a escolha sozinhos. O que importa é a relação entre aplicação, acerto, suporte e manutenção."
      >
        <Link href="#criterios" className="button-primary">Ver critérios</Link>
        <Link href="/configurador" className="button-secondary">Levar meu contexto à fábrica</Link>
      </PageHero>

      <section id="criterios" className="section-space">
        <div className="site-container">
          <div className="grid gap-8 lg:grid-cols-[.72fr_1.28fr] lg:items-end">
            <div>
              <Eyebrow>01 · Antes da marca e do país</Eyebrow>
              <h2 className="text-balance text-4xl font-black tracking-[-0.045em] md:text-6xl">Quatro perguntas tornam a comparação mais honesta.</h2>
            </div>
            <p className="max-w-xl leading-relaxed text-mute-1 lg:justify-self-end">Nenhum critério isolado garante o resultado. A combinação precisa fazer sentido para o veículo, a rotina e o suporte disponível.</p>
          </div>
          <div className="mt-10 grid gap-px overflow-hidden border border-line-1 bg-line-1 md:grid-cols-2">
            {criteria.map((criterion, index) => (
              <article key={criterion.title} data-reveal className="min-h-64 bg-ink-card p-7 md:p-8">
                <span className="font-mono text-[10px] text-accent">0{index + 1}</span>
                <h3 className="mt-12 text-2xl font-black tracking-[-0.035em] md:text-3xl">{criterion.title}</h3>
                <p className="mt-4 leading-relaxed text-mute-1">{criterion.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-space border-y border-line-1 bg-ink-soft">
        <div className="site-container">
          <div className="max-w-4xl">
            <Eyebrow>02 · Quatro lógicas de produto</Eyebrow>
            <h2 className="text-balance text-4xl font-black tracking-[-0.045em] md:text-6xl">Cada solução pode fazer sentido. O contexto decide.</h2>
            <p className="mt-6 max-w-2xl leading-relaxed text-mute-1">A comparação abaixo descreve critérios gerais, não avalia marcas específicas e não promete superioridade universal da BUMP.</p>
          </div>
          <div className="mt-10 overflow-hidden border border-line-2">
            {solutions.map(([solution, strength, check], index) => (
              <article key={solution} data-reveal className="grid gap-5 border-b border-line-1 bg-ink-card p-6 last:border-0 md:grid-cols-[180px_1fr_1fr] md:gap-8 md:p-8">
                <div><span className="font-mono text-[9px] text-accent">0{index + 1}</span><h3 className="mt-3 text-xl font-black">{solution}</h3></div>
                <div><span className="font-mono text-[9px] tracking-[0.08em] text-mute-3 uppercase">O que pode entregar</span><p className="mt-3 leading-relaxed text-mute-1">{strength}</p></div>
                <div><span className="font-mono text-[9px] tracking-[0.08em] text-mute-3 uppercase">O que confirmar</span><p className="mt-3 leading-relaxed text-mute-1">{check}</p></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-space">
        <div className="site-container grid gap-10 lg:grid-cols-[.7fr_1.3fr]">
          <div>
            <Eyebrow>03 · A visão do especialista</Eyebrow>
            <h2 className="text-4xl font-black tracking-[-0.045em] md:text-6xl">Cristian começa pela pergunta que a prateleira não faz.</h2>
          </div>
          <div className="border-l-2 border-accent pl-6 md:pl-9">
            <p className="text-xl leading-relaxed text-mute-1 md:text-2xl">Na BUMP, a conversa começa por veículo, peso, altura, terreno e objetivo. Só depois entram linha, pressão, curso e orçamento.</p>
            <p className="mt-6 leading-relaxed text-mute-2">Essa é a diferença defendida pela marca: não escolher por nacional versus importado, mas pela capacidade de o projeto responder ao uso e continuar acompanhado depois da instalação.</p>
            <Link href="/quem-somos" className="mt-7 inline-flex font-mono text-[11px] text-paper hover:text-accent">Conhecer a origem da BUMP ↗</Link>
          </div>
        </div>
      </section>

      <section className="section-space border-y border-line-1 bg-ink-soft">
        <div className="site-container grid gap-10 lg:grid-cols-[.7fr_1.3fr]">
          <div><Eyebrow>04 · Respostas diretas</Eyebrow><h2 className="text-4xl font-black tracking-[-0.045em]">Antes de decidir.</h2></div>
          <div className="divide-y divide-line-2 border-y border-line-2">
            {questions.map((item) => (
              <article key={item.question} data-reveal className="py-7">
                <h3 className="text-xl font-black">{item.question}</h3>
                <p className="mt-3 leading-relaxed text-mute-1">{item.answer}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="A melhor escolha começa pelo seu uso."
        description="Conte o que a picape enfrenta. A equipe organiza um ponto de partida técnico sem presumir a solução antes do contexto."
      />
    </>
  );
}
