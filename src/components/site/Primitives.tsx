import Link from "next/link";
import { JsonLd } from "@/components/site/JsonLd";
import { breadcrumbJsonLd } from "@/lib/structured-data";

export function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className="mb-4 font-mono text-xs tracking-[0.16em] text-accent uppercase">{children}</p>;
}

export function SectionHeading({ eyebrow, title, description, align = "left" }: { eyebrow?: string; title: string; description?: string; align?: "left" | "center" }) {
  return (
    <div className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h2 className="text-balance text-[clamp(2rem,5vw,4.5rem)] leading-[0.98] font-black tracking-[-0.04em]">{title}</h2>
      {description && <p className={`mt-5 max-w-2xl text-base leading-relaxed text-mute-1 md:text-lg ${align === "center" ? "mx-auto" : ""}`}>{description}</p>}
    </div>
  );
}

export function Breadcrumb({ items }: { items: readonly { label: string; href?: string }[] }) {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(items)} />
      <nav aria-label="Navegação estrutural" className="breadcrumb site-container py-5">
        <ol className="flex flex-wrap items-center gap-2 font-mono text-xs text-mute-3">
          {items.map((item, index) => (
            <li key={`${item.label}-${index}`} className="flex items-center gap-2">
              {index > 0 && <span aria-hidden="true">/</span>}
              {item.href ? <Link href={item.href} className="transition-colors hover:text-accent">{item.label}</Link> : <span aria-current="page" className="text-mute-1">{item.label}</span>}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}

export function PageHero({ eyebrow, title, description, children }: { eyebrow: string; title: string; description: string; children?: React.ReactNode }) {
  return (
    <section className="page-hero border-y border-line-1 bg-ink-soft">
      <span aria-hidden="true" className="page-hero-aura" />
      <div className="relative site-container py-20 md:py-28">
        <div className="max-w-4xl">
          <p data-reveal className="mb-4 font-mono text-xs tracking-[0.16em] text-accent uppercase">{eyebrow}</p>
          <h1 data-reveal data-delay="1" className="text-balance text-[clamp(2.75rem,7vw,7rem)] leading-[0.9] font-black tracking-[-0.055em] uppercase">{title}</h1>
          <p data-reveal data-delay="2" className="mt-7 max-w-2xl text-base leading-relaxed text-mute-1 md:text-xl">{description}</p>
          {children && <div data-reveal data-delay="3" className="mt-9 flex flex-wrap gap-3">{children}</div>}
        </div>
      </div>
    </section>
  );
}

export function CTASection({ title, description, primaryLabel = "Montar meu amortecedor", primaryHref = "/configurador", secondaryLabel = "Falar com especialista", secondaryHref = "/contato" }: { title: string; description?: string; primaryLabel?: string; primaryHref?: string; secondaryLabel?: string; secondaryHref?: string }) {
  return (
    <section className="cta-section border-t border-line-1 bg-ink-soft" data-motif="cascade">
      <span aria-hidden="true" className="cta-section-aura" />
      <div className="relative site-container py-20 text-center md:py-28">
        <h2 data-reveal className="mx-auto max-w-4xl text-balance text-[clamp(2rem,5vw,4rem)] leading-tight font-black tracking-[-0.04em]">{title}</h2>
        {description && <p data-reveal data-delay="1" className="mx-auto mt-5 max-w-2xl text-mute-1">{description}</p>}
        <div data-reveal data-delay="2" className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href={primaryHref} className="button-primary">{primaryLabel}</Link>
          <Link href={secondaryHref} className="button-secondary">{secondaryLabel}</Link>
        </div>
      </div>
    </section>
  );
}

export function StatsStrip() {
  return (
    <div className="stats-strip grid gap-px overflow-hidden rounded-sm border border-line-2 bg-line-2 sm:grid-cols-3">
      {[
        ["13+", "anos de fábrica"],
        ["400 mil km", "em um caso real"],
        ["Brasil", "produção própria"],
      ].map(([value, label], index) => (
        <div key={label} data-reveal data-delay={`${index}`} className="stats-strip-cell bg-ink px-6 py-8 text-center">
          <strong className="block text-3xl font-black text-paper">{value}</strong>
          <span className="mt-1 block font-mono text-xs text-mute-2">{label}</span>
        </div>
      ))}
    </div>
  );
}
