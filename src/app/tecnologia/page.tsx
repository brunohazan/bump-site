import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Breadcrumb, CTASection, Eyebrow } from "@/components/site/Primitives";
import { ASSET_BASE } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Tecnologia",
  description: "Entenda a engenharia de conforto, controle térmico e durabilidade dos amortecedores BUMP.",
  alternates: { canonical: "/tecnologia" },
};

const chapters = [
  {
    number: "01",
    title: "Corpo duplo, leitura de monotubo",
    technical: "Mais volume de fluido, proteção externa e pressão controlada para reduzir cavitação e perda de resposta.",
    effect: "O comportamento se mantém mais consistente quando a estrada piora ou a jornada se estende.",
  },
  {
    number: "02",
    title: "Haste de 20 mm",
    technical: "Aço temperado e dimensão definida para suportar o trabalho mecânico do conjunto.",
    effect: "Mais controle da roda e menos impacto chegando ao volante, aos braços e à coluna.",
  },
  {
    number: "03",
    title: "Pressão feita para a aplicação",
    technical: "O acerto considera veículo, carga, altura e uso. Não existe uma pressão única para toda picape.",
    effect: "A suspensão pode equilibrar conforto sem abandonar firmeza, estabilidade e capacidade de trabalho.",
  },
  {
    number: "04",
    title: "Desmontável e recuperável",
    technical: "O equipamento pode voltar à fábrica para desmontagem, inspeção e recuperação.",
    effect: "A vida útil não precisa terminar no primeiro desgaste e a peça não nasce com descarte como destino.",
  },
] as const;

const comparison = [
  ["Acerto", "Por veículo, carga e uso", "Configuração genérica"],
  ["Temperatura", "Maior controle térmico", "Pode perder resposta em uso severo"],
  ["Vida útil", "Desmontável e recuperável", "Frequentemente descartável"],
  ["Garantia", "2 anos contra vazamento", "Varia por produto"],
] as const;

const glossary = [
  ["Pressurizado", "Gás e fluido trabalham sob pressão controlada."],
  ["Curso", "Distância útil que a suspensão percorre entre compressão e extensão."],
  ["Rebound", "Velocidade de retorno depois que o amortecedor é comprimido."],
] as const;

export default function TechnologyPage() {
  return (
    <>
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "A BUMP" }, { label: "Tecnologia" }]} />

      <section className="relative overflow-hidden border-y border-line-1 bg-ink-soft">
        <div className="pointer-events-none absolute inset-0 opacity-20 [background-image:linear-gradient(to_right,rgba(255,255,255,.07)_1px,transparent_1px)] [background-size:25%_100%]" />
        <div className="site-container relative grid min-h-[760px] items-center gap-8 py-14 lg:grid-cols-[.85fr_1.15fr] lg:py-20">
          <div className="relative z-10">
            <Eyebrow>Engenharia do conforto</Eyebrow>
            <h1 data-reveal className="max-w-[10ch] text-[clamp(3.5rem,8vw,8.5rem)] leading-[.84] font-black tracking-[-0.065em] uppercase">O corpo sente cada decisão técnica.</h1>
            <p data-reveal data-delay="1" className="mt-7 max-w-xl text-lg leading-relaxed text-mute-1">Corpo duplo, tecnologia monotubo, pressão e curso só importam quando mudam a rotina de quem dirige. Aqui a ficha técnica vira efeito no veículo e no corpo.</p>
            <div data-reveal data-delay="2" className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="#componentes" className="button-primary">Explorar os componentes</Link>
              <Link href="/configurador" className="button-secondary">Montar meu projeto</Link>
            </div>
          </div>
          <div data-reveal="mask" className="relative min-h-[480px] overflow-hidden border border-line-2 bg-[radial-gradient(circle_at_50%_45%,rgba(211,255,26,.2),transparent_58%)] md:min-h-[650px]">
            <span className="absolute top-5 left-5 z-10 font-mono text-[9px] tracking-[0.14em] text-accent">BUMP · SISTEMA RECUPERÁVEL</span>
            <span className="pointer-events-none absolute -right-5 -bottom-16 text-[clamp(14rem,30vw,30rem)] leading-none font-black tracking-[-.1em] text-paper/[.025]">20</span>
            <Image src={`${ASSET_BASE}/amortecedoressemfundo/amortecedorpremiumsemfundo.webp`} alt="Amortecedor BUMP Premium com reservatório externo" fill priority sizes="(min-width: 1024px) 58vw, 100vw" className="technology-product object-contain p-8 md:p-16" />
            <div className="absolute right-5 bottom-5 z-10 text-right font-mono text-[9px] leading-relaxed tracking-[0.1em] text-mute-3">HASTE 20 MM<br />PRESSÃO SOB MEDIDA</div>
          </div>
        </div>
      </section>

      <section id="componentes" className="section-space">
        <div className="site-container">
          <div className="mb-12 grid gap-7 lg:grid-cols-[.75fr_1.25fr] lg:items-end">
            <div><Eyebrow>01 · Do componente ao resultado</Eyebrow><h2 data-reveal className="text-balance text-[clamp(2.8rem,6vw,6rem)] leading-[.9] font-black tracking-[-0.055em]">A engenharia só termina quando chega ao corpo.</h2></div>
            <p data-reveal data-delay="1" className="max-w-xl leading-relaxed text-mute-1 lg:justify-self-end">No desktop, o produto permanece em cena enquanto cada capítulo explica uma decisão. No mobile, a mesma história aparece em etapas diretas e sem sticky prolongado.</p>
          </div>

          <div className="grid gap-8 lg:grid-cols-[1.05fr_.95fr] lg:gap-14">
            <div data-reveal="mask" className="relative min-h-[500px] overflow-hidden border border-line-2 bg-ink-soft lg:sticky lg:top-28 lg:min-h-[680px]">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,rgba(211,255,26,.17),transparent_57%)]" />
              <div className="absolute inset-5 border border-line-1" />
              <Image src={`${ASSET_BASE}/amortecedoressemfundo/amortecedorpremiumsemfundo.webp`} alt="Vista técnica do amortecedor BUMP" fill sizes="(min-width: 1024px) 52vw, 100vw" className="selector-product object-contain p-12 md:p-20" />
              <span className="absolute top-8 left-8 font-mono text-[9px] tracking-[0.12em] text-accent">CENA TÉCNICA · 01—04</span>
              <span className="absolute right-8 bottom-8 font-mono text-[9px] tracking-[0.1em] text-mute-3">GRAVATAÍ · RS</span>
            </div>

            <div>
              {chapters.map((chapter, index) => (
                <article key={chapter.number} data-reveal data-delay={`${Math.min(index, 3)}`} className="border-t border-line-2 py-9 first:border-t-0 first:pt-0 md:py-12">
                  <div className="grid grid-cols-[42px_1fr] gap-4 md:grid-cols-[58px_1fr] md:gap-6">
                    <span className="font-mono text-xs text-accent">{chapter.number}</span>
                    <div>
                      <h3 className="text-2xl font-black tracking-[-0.035em] md:text-4xl">{chapter.title}</h3>
                      <p className="mt-5 leading-relaxed text-mute-1"><strong className="text-paper">O que acontece:</strong> {chapter.technical}</p>
                      <p className="mt-4 border-l-2 border-accent pl-4 leading-relaxed text-mute-1"><strong className="text-paper">O que você sente:</strong> {chapter.effect}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-space border-y border-line-1 bg-ink-soft">
        <div className="site-container">
          <div className="grid gap-8 lg:grid-cols-[.7fr_1.3fr] lg:items-end">
            <div><Eyebrow>02 · BUMP versus solução comum</Eyebrow><h2 data-reveal className="text-4xl font-black tracking-[-0.045em] md:text-6xl">Compare a lógica, não só a aparência.</h2></div>
            <p data-reveal data-delay="1" className="max-w-xl leading-relaxed text-mute-1 lg:justify-self-end">A comparação descreve princípios de construção e serviço. O comportamento final depende da aplicação e do acerto confirmado pela fábrica.</p>
          </div>

          <div className="mt-10 grid gap-px overflow-hidden border border-line-1 bg-line-1 md:grid-cols-2">
            {comparison.map(([criterion, bump, common], index) => (
              <article key={criterion} data-reveal data-delay={`${Math.min(index, 3)}`} className="bg-ink-card p-6 md:p-8">
                <span className="font-mono text-[10px] tracking-[0.1em] text-mute-3 uppercase">{criterion}</span>
                <div className="mt-6 grid gap-5 sm:grid-cols-2">
                  <div><span className="font-mono text-[9px] text-accent">BUMP</span><p className="mt-2 font-bold">{bump}</p></div>
                  <div><span className="font-mono text-[9px] text-mute-4">COMUM</span><p className="mt-2 text-mute-2">{common}</p></div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-space">
        <div className="site-container grid gap-10 lg:grid-cols-[.7fr_1.3fr]">
          <div><Eyebrow>03 · Glossário sem complicação</Eyebrow><h2 data-reveal className="text-4xl font-black tracking-[-0.045em]">Três termos para escolher com mais clareza.</h2></div>
          <div className="divide-y divide-line-2 border-y border-line-2">
            {glossary.map(([term, meaning], index) => (
              <article key={term} data-reveal data-delay={`${index}`} className="grid gap-3 py-7 sm:grid-cols-[160px_1fr] sm:gap-7">
                <h3 className="text-xl font-black text-accent">{term}</h3>
                <p className="leading-relaxed text-mute-1">{meaning}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-line-1 bg-accent text-ink">
        <div className="site-container grid gap-8 py-14 md:grid-cols-[.7fr_1.3fr] md:items-end md:py-20">
          <div data-reveal><p className="font-mono text-[10px] font-semibold tracking-[0.12em] uppercase">04 · Durabilidade recuperável</p><strong className="mt-3 block text-[clamp(3.5rem,8vw,8rem)] leading-none font-black tracking-[-0.06em]">400 mil km</strong></div>
          <div data-reveal data-delay="1"><h2 className="text-2xl font-black tracking-[-0.035em] md:text-4xl">O caso demonstra que um amortecedor pode voltar à fábrica em vez de virar descarte.</h2><p className="mt-4 max-w-2xl leading-relaxed text-ink/75">O equipamento foi desmontado, inspecionado, recuperado e devolvido ao trabalho. A quilometragem é um caso real, não uma garantia universal.</p><Link href="/resultados" className="mt-6 inline-flex font-mono text-[11px] font-semibold">Ver resultados e contexto ↗</Link></div>
        </div>
      </section>

      <CTASection title="Engenharia feita para o seu chão." description="Conte sobre a picape, carga e rotina. A fábrica transforma essas informações em um ponto de partida técnico." />
    </>
  );
}
