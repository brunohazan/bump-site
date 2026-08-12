import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb, Eyebrow } from "@/components/site/Primitives";

export const metadata: Metadata = {
  title: "Projeto V2 | Decisões técnicas",
  description: "Resumo temporário da estratégia, evolução visual, arquitetura e ferramentas usadas na V2 do site BUMP.",
  robots: { index: false, follow: false },
  alternates: { canonical: "/projeto-v2" },
  openGraph: {
    title: "BUMP V2 | Conforto que faz o corpo chegar inteiro",
    description: "Conheça a evolução do novo site BUMP: experiência, tecnologia e conversão pensadas para quem usa a picape de verdade.",
    url: "/projeto-v2",
    locale: "pt_BR",
    type: "website",
    siteName: "BUMP Amortecedores",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "BUMP Amortecedores, conforto que faz o corpo chegar inteiro",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "BUMP V2 | Conforto que faz o corpo chegar inteiro",
    description: "Conheça a evolução do novo site BUMP, da estratégia ao produto.",
    images: ["/opengraph-image"],
  },
};

const decisions = [
  { title: "Reposicionamento", text: "A comunicação sai de competição como centro e passa para conforto de quem usa a picape como ferramenta. Off-road continua como público secundário." },
  { title: "Direção cinematográfica", text: "As referências orientam ritmo, recorte e comportamento sem copiar identidades. A BUMP mantém o sistema dark, verde e técnico." },
  { title: "Arquitetura multipágina", text: "Rotas próprias para linhas, tecnologia, aplicações, resultados, dúvidas, contato e legais melhoram navegação, busca e evolução do conteúdo." },
  { title: "Conteúdo orientado a dados", text: "Linhas, aplicações, fichas técnicas e FAQs ficam tipadas em TypeScript. Uma alteração central atualiza cards, páginas e recomendações." },
  { title: "Conversão sem desvio", text: "CTAs de compra chegam ao configurador. Contexto de linha, veículo e uso acompanha a navegação por query string." },
  { title: "Mobile com direção própria", text: "Headline, seletor, menu e cenas são adaptados ao viewport móvel em vez de apenas empilhar a composição desktop." },
  { title: "Motion progressivo", text: "CSS e IntersectionObserver revelam a narrativa sem dependência nova. Conteúdo continua íntegro sem JavaScript e com redução de movimento." },
  { title: "Privacidade por padrão", text: "Contato e Configurador estão em modo demonstrativo. Nenhum dado é transmitido ou persistido antes do hardening LGPD." },
] as const;

const visualEvolution = [
  ["Header e mega menu", "Navegação transparente sobre o Hero, estado sólido no scroll, menus ricos por intenção e drawer móvel em tela cheia."],
  ["Hero full-bleed", "Headline preservada em três linhas, mídia imersiva, CTAs claros e faixa de confiança integrada à primeira dobra."],
  ["Home editorial", "Promessa assimétrica, grandes declarações e alternância entre conteúdo, produto e prova para criar ritmo narrativo."],
  ["Seletor de uso", "Controle horizontal no mobile, grid no desktop e recomendação cinematográfica com produto, benefícios e próxima ação."],
  ["Tecnologia cropada", "Produto Premium ultrapassa a moldura em uma cena sticky no desktop, com explicações técnicas traduzidas em benefício."],
  ["Motion responsável", "Reveals, máscara, entrada do seletor e movimentos sutis com fallback completo para prefers-reduced-motion."],
] as const;

const tools = [
  ["Next.js 16", "App Router, Server Components, metadata e geração estática"],
  ["React 19", "Interações do configurador, filtros e recomendação dinâmica"],
  ["TypeScript", "Contratos de conteúdo e validação em tempo de desenvolvimento"],
  ["Tailwind CSS v4", "Tokens CSS-first, cenas editoriais e interface responsiva"],
  ["IntersectionObserver", "Revelação progressiva sem biblioteca adicional de animação"],
  ["Figma MCP", "Leitura direta dos wireframes e conferência da arquitetura visual"],
  ["Kiro CLI", "Implementação, inspeção, validação e fluxo de publicação"],
  ["Vercel", "Hospedagem e publicação contínua do site"],
] as const;

const delivered = [
  "Header transparente, mega menus desktop e drawer mobile acessível",
  "Home cinematográfica com Hero full-bleed e headline preservada",
  "Seletor editorial de uso e recomendação dinâmica de linha",
  "Tecnologia cropada/sticky, marquee, autoridade, resultados e CTA final",
  "Motion progressivo, route-aware e compatível com prefers-reduced-motion",
  "Seis linhas com páginas geradas por template",
  "Configurador interativo de nove passos e rotas institucionais completas",
  "SEO/AEO, headers defensivos e formulários mantidos em modo seguro",
  "Lint, TypeScript, build, rotas e viewports 390×844 e 1440×1000 validados",
] as const;

const nextSteps = [
  "Apresentação e ajuste fino de copy com o cliente",
  "Substituição de fotos e logo provisórios pelos arquivos finais",
  "Conexão segura dos formulários com consentimento e hardening LGPD",
  "Medição de LCP, CLS e INP no tráfego real de produção",
  "Evolução visual das páginas de linha, Tecnologia e Configurador",
] as const;

export default function ProjectV2Page() {
  return (
    <>
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Projeto V2" }]} />

      <section className="border-y border-line-1 bg-ink-soft">
        <div className="site-container py-20 md:py-28">
          <span className="inline-flex rounded-full border border-accent/40 bg-accent-soft px-3 py-1 font-mono text-[11px] text-accent">
            PÁGINA TEMPORÁRIA · NOINDEX
          </span>
          <h1 className="mt-6 max-w-5xl text-balance text-[clamp(2.75rem,7vw,6.5rem)] leading-[.92] font-black tracking-[-0.055em]">
            Projeto V2: estratégia, produto e evolução visual.
          </h1>
          <p className="mt-7 max-w-3xl text-lg leading-relaxed text-mute-1">
            Uma visão transparente do que mudou, por que foi construído assim e como a nova direção combina impacto automotivo, clareza comercial e desempenho mobile.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link href="/" className="button-primary">Ver a nova Home</Link>
            <Link href="/configurador" className="button-secondary">Testar o configurador</Link>
          </div>
        </div>
      </section>

      <section className="section-space">
        <div className="site-container">
          <Eyebrow>01 · Decisões técnicas e de produto</Eyebrow>
          <div className="mt-7 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {decisions.map((item) => (
              <article key={item.title} className="surface-card p-7">
                <h2 className="text-xl font-black">{item.title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-mute-1">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-space border-y border-line-1 bg-ink-soft">
        <div className="site-container">
          <Eyebrow>02 · Evolução visual implementada</Eyebrow>
          <h2 className="max-w-4xl text-4xl font-black tracking-[-0.04em] md:text-5xl">
            Das referências para um sistema que continua sendo BUMP.
          </h2>
          <div className="mt-8 grid gap-px overflow-hidden border border-line-1 bg-line-1 md:grid-cols-2 lg:grid-cols-3">
            {visualEvolution.map(([title, text], index) => (
              <article key={title} className="min-h-64 bg-ink-card p-7">
                <span className="font-mono text-[10px] text-accent">0{index + 1}</span>
                <h3 className="mt-9 text-2xl font-black tracking-[-0.035em]">{title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-mute-1">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-space">
        <div className="site-container grid gap-10 lg:grid-cols-[.75fr_1.25fr]">
          <div>
            <Eyebrow>03 · Ferramentas</Eyebrow>
            <h2 className="text-4xl font-black tracking-[-0.04em]">Stack usada para transformar estratégia e wireframe em produto.</h2>
          </div>
          <div className="divide-y divide-line-1 border-y border-line-1">
            {tools.map(([name, purpose]) => (
              <div key={name} className="grid gap-2 py-5 sm:grid-cols-[170px_1fr]">
                <strong>{name}</strong>
                <span className="text-sm leading-relaxed text-mute-2">{purpose}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-space border-y border-line-1 bg-ink-soft">
        <div className="site-container">
          <Eyebrow>04 · Descoberta e proteção</Eyebrow>
          <h2 className="max-w-4xl text-4xl font-black tracking-[-0.04em]">Base técnica pronta para buscadores, IAs e uma publicação mais segura.</h2>
          <div className="mt-8 grid gap-5 lg:grid-cols-2">
            <article className="surface-card p-7">
              <p className="font-mono text-xs text-accent">SEO E AEO IMPLEMENTADOS</p>
              <h3 className="mt-3 text-2xl font-black">Conteúdo legível por mecanismos de busca e resposta.</h3>
              <ul className="mt-6 grid gap-3 text-sm leading-relaxed text-mute-1">
                {["Canonical específico em cada rota pública", "robots.txt liberando Google e crawlers de IA", "sitemap.xml com as rotas públicas", "llms.txt explicando negócio, linhas e fontes", "JSON-LD de organização, produto, FAQ e breadcrumbs"].map((item) => (
                  <li key={item} className="flex gap-3"><span className="text-accent">✓</span><span>{item}</span></li>
                ))}
              </ul>
              <p className="mt-6 border-t border-line-1 pt-5 text-xs leading-relaxed text-mute-3">Medições reais de LCP, CLS e INP entram após a publicação desta evolução.</p>
            </article>
            <article className="surface-card p-7">
              <p className="font-mono text-xs text-accent">SEGURANÇA IMPLEMENTADA</p>
              <h3 className="mt-3 text-2xl font-black">Políticas defensivas aplicadas em todas as páginas.</h3>
              <ul className="mt-6 grid gap-3 text-sm leading-relaxed text-mute-1">
                {["CSP controla origens permitidas para scripts, estilos e imagens", "HSTS força HTTPS em produção", "X-Frame-Options impede incorporação maliciosa", "nosniff evita interpretação indevida de conteúdo", "Referrer Policy e Permissions Policy reduzem exposição"].map((item) => (
                  <li key={item} className="flex gap-3"><span className="text-accent">✓</span><span>{item}</span></li>
                ))}
              </ul>
              <p className="mt-6 border-t border-line-1 pt-5 text-xs leading-relaxed text-mute-3">Configurador e Contato seguem locais e simulados. Backend, validação e rate limit entram no hardening LGPD.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="section-space">
        <div className="site-container grid gap-10 lg:grid-cols-2">
          <div>
            <Eyebrow>05 · Entregue nesta evolução</Eyebrow>
            <ul className="mt-6 grid gap-3">
              {delivered.map((item) => (
                <li key={item} className="flex gap-3 rounded-sm border border-line-1 bg-ink-card p-4">
                  <span className="text-accent">✓</span><span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <Eyebrow>06 · Próximas etapas</Eyebrow>
            <div className="rounded-sm border border-line-2 bg-ink-card p-7">
              <ol className="grid gap-5">
                {nextSteps.map((item, index) => (
                  <li key={item} className="flex gap-4">
                    <span className="font-mono text-xs text-accent">0{index + 1}</span>
                    <span className="font-semibold">{item}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-line-1 bg-accent text-ink">
        <div className="site-container py-14 text-center">
          <p className="font-mono text-xs font-semibold">STATUS DA ENTREGA</p>
          <h2 className="mt-3 text-3xl font-black md:text-5xl">Evolução visual implementada e validada localmente.</h2>
          <p className="mx-auto mt-4 max-w-2xl">A versão está pronta para publicação e apresentação. Conteúdo final, formulários reais e próximas páginas permanecem separados desta etapa.</p>
        </div>
      </section>
    </>
  );
}
