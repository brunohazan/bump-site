import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb, Eyebrow } from "@/components/site/Primitives";

export const metadata: Metadata = {
  title: "Projeto V2 | Decisões técnicas",
  description: "Resumo temporário da evolução, arquitetura e ferramentas usadas na V2 do site BUMP.",
  robots: { index: false, follow: false },
  alternates: { canonical: "/projeto-v2" },
  openGraph: {
    title: "BUMP V2 | Conforto que faz o corpo chegar inteiro",
    description: "Conheça a evolução do novo site BUMP: experiência, tecnologia e conversão pensadas para quem usa a picape de verdade.",
    url: "/projeto-v2",
    locale: "pt_BR",
    type: "website",
    siteName: "BUMP Amortecedores",
  },
  twitter: {
    card: "summary_large_image",
    title: "BUMP V2 | Conforto que faz o corpo chegar inteiro",
    description: "Conheça a evolução do novo site BUMP, da estratégia ao produto.",
  },
};

const decisions = [
  { title: "Reposicionamento", text: "A comunicação sai de competição como centro e passa para conforto de quem usa a picape como ferramenta. Off-road continua como público secundário." },
  { title: "Arquitetura multipágina", text: "Rotas próprias para linhas, tecnologia, aplicações, resultados, dúvidas, contato e legais. Isso melhora navegação, busca e evolução do conteúdo." },
  { title: "Conteúdo orientado a dados", text: "Linhas, aplicações, fichas técnicas e FAQs ficam tipadas em TypeScript. Uma alteração central atualiza cards, páginas e recomendações." },
  { title: "Conversão sem desvio", text: "CTAs de compra chegam ao configurador. Contexto de linha, veículo e uso acompanha a navegação por query string." },
  { title: "Mobile first", text: "Layout responsivo, alvos de toque amplos, menu móvel, contraste alto e suporte a redução de movimento." },
  { title: "Privacidade por padrão", text: "Contato e Configurador estão em modo demonstrativo. Nenhum dado é transmitido ou persistido antes do hardening LGPD." },
] as const;

const tools = [
  ["Next.js 16", "App Router, Server Components, metadata e geração estática"],
  ["React 19", "Interações do configurador, filtros e recomendação dinâmica"],
  ["TypeScript", "Contratos de conteúdo e validação em tempo de desenvolvimento"],
  ["Tailwind CSS v4", "Tokens CSS-first e interface responsiva"],
  ["Figma MCP", "Leitura direta dos wireframes e conferência da arquitetura visual"],
  ["Kiro CLI", "Implementação, inspeção, validação e fluxo de commit"],
  ["AI Ready", "Checklists de Produto, UX/UI, Segurança, Eval e Documentação"],
  ["Vercel", "Destino planejado para build e publicação do site"],
] as const;

const delivered = [
  "Home V2 com oito blocos e recomendação por uso",
  "Seis linhas com páginas geradas por template",
  "Configurador interativo de nove passos",
  "Quem Somos, Tecnologia, Aplicações, Como Comprar e Resultados",
  "FAQ, Contato, Política de Privacidade e Termos de Uso",
  "Header, dropdowns, Footer e contato persistentes",
  "Lint, TypeScript, build e smoke test das rotas aprovados",
] as const;

export default function ProjectV2Page() {
  return (
    <>
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Projeto V2" }]} />
      <section className="border-y border-line-1 bg-ink-soft">
        <div className="site-container py-20 md:py-28">
          <span className="inline-flex rounded-full border border-accent/40 bg-accent-soft px-3 py-1 font-mono text-[11px] text-accent">PÁGINA TEMPORÁRIA · NOINDEX</span>
          <h1 className="mt-6 max-w-5xl text-balance text-[clamp(2.75rem,7vw,6.5rem)] leading-[.92] font-black tracking-[-0.055em]">Projeto V2: decisões, ferramentas e evolução.</h1>
          <p className="mt-7 max-w-3xl text-lg leading-relaxed text-mute-1">Uma visão transparente do que mudou, por que foi construído assim e o que ainda falta para o lançamento definitivo.</p>
          <div className="mt-9 flex flex-wrap gap-3"><Link href="/" className="button-primary">Ver a nova Home</Link><Link href="/configurador" className="button-secondary">Testar o configurador</Link></div>
        </div>
      </section>

      <section className="section-space"><div className="site-container"><Eyebrow>01 · Decisões técnicas e de produto</Eyebrow><div className="mt-7 grid gap-4 md:grid-cols-2 lg:grid-cols-3">{decisions.map((item) => <article key={item.title} className="surface-card p-7"><h2 className="text-xl font-black">{item.title}</h2><p className="mt-3 text-sm leading-relaxed text-mute-1">{item.text}</p></article>)}</div></div></section>

      <section className="section-space border-y border-line-1 bg-ink-soft"><div className="site-container grid gap-10 lg:grid-cols-[.75fr_1.25fr]"><div><Eyebrow>02 · Ferramentas</Eyebrow><h2 className="text-4xl font-black tracking-[-0.04em]">Stack usada para transformar o wireframe em produto.</h2></div><div className="divide-y divide-line-1 border-y border-line-1">{tools.map(([name, purpose]) => <div key={name} className="grid gap-2 py-5 sm:grid-cols-[150px_1fr]"><strong>{name}</strong><span className="text-sm leading-relaxed text-mute-2">{purpose}</span></div>)}</div></div></section>

      <section className="section-space"><div className="site-container"><Eyebrow>03 · Descoberta e proteção</Eyebrow><h2 className="max-w-4xl text-4xl font-black tracking-[-0.04em]">Base técnica pronta para buscadores, IAs e uma publicação mais segura.</h2><div className="mt-8 grid gap-5 lg:grid-cols-2"><article className="surface-card p-7"><p className="font-mono text-xs text-accent">SEO E AEO IMPLEMENTADOS</p><h3 className="mt-3 text-2xl font-black">Conteúdo legível por mecanismos de busca e resposta.</h3><ul className="mt-6 grid gap-3 text-sm leading-relaxed text-mute-1">{["Canonical específico em cada rota pública", "robots.txt liberando Google e crawlers de IA", "sitemap.xml com as 18 rotas públicas", "llms.txt explicando negócio, linhas e fontes", "JSON-LD de organização, produto, FAQ e breadcrumbs"].map((item) => <li key={item} className="flex gap-3"><span className="text-accent">✓</span><span>{item}</span></li>)}</ul><p className="mt-6 border-t border-line-1 pt-5 text-xs leading-relaxed text-mute-3">Ainda dependem da produção: redirects dos domínios antigos, revisão do Cloudflare, Rich Results Test e medição real de LCP.</p></article><article className="surface-card p-7"><p className="font-mono text-xs text-accent">SEGURANÇA IMPLEMENTADA</p><h3 className="mt-3 text-2xl font-black">Políticas defensivas aplicadas em todas as páginas.</h3><ul className="mt-6 grid gap-3 text-sm leading-relaxed text-mute-1">{["CSP controla as origens permitidas para scripts, estilos e imagens", "HSTS força HTTPS em produção", "X-Frame-Options impede incorporação maliciosa", "nosniff evita interpretação indevida de conteúdo", "Referrer Policy e Permissions Policy reduzem exposição do navegador"].map((item) => <li key={item} className="flex gap-3"><span className="text-accent">✓</span><span>{item}</span></li>)}</ul><p className="mt-6 border-t border-line-1 pt-5 text-xs leading-relaxed text-mute-3">Configurador e Contato seguem locais e simulados. Backend, Zod e rate limit entram apenas no hardening LGPD.</p></article></div></div></section>

      <section className="section-space border-y border-line-1 bg-ink-soft"><div className="site-container grid gap-10 lg:grid-cols-2"><div><Eyebrow>04 · Entregue nesta evolução</Eyebrow><ul className="mt-6 grid gap-3">{delivered.map((item) => <li key={item} className="flex gap-3 rounded-sm border border-line-1 bg-ink-card p-4"><span className="text-accent">✓</span><span>{item}</span></li>)}</ul></div><div><Eyebrow>05 · Próximas etapas</Eyebrow><div className="rounded-sm border border-line-2 bg-ink-card p-7"><ol className="grid gap-5">{["Revisão visual e de copy com o cliente", "Substituição de fotos e logo provisórios", "Conexão segura dos formulários com LGPD", "Validação em produção de performance, Cloudflare e schemas", "CMS, domínio e deploy definitivo"].map((item, index) => <li key={item} className="flex gap-4"><span className="font-mono text-xs text-accent">0{index + 1}</span><span className="font-semibold">{item}</span></li>)}</ol></div></div></div></section>

      <section className="border-y border-line-1 bg-accent text-ink"><div className="site-container py-14 text-center"><p className="font-mono text-xs font-semibold">STATUS DA ENTREGA</p><h2 className="mt-3 text-3xl font-black md:text-5xl">V2 navegável e validada localmente.</h2><p className="mx-auto mt-4 max-w-2xl">A base está pronta para apresentação. Formulários reais, conteúdo final e publicação continuam deliberadamente separados desta etapa.</p></div></section>
    </>
  );
}
