"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { productLines } from "@/lib/site-data";

const companyLinks = [
  { href: "/quem-somos", label: "Quem somos" },
  { href: "/tecnologia", label: "Tecnologia" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line-1 bg-ink/95 backdrop-blur-md">
      <div className="site-container flex h-[72px] items-center justify-between gap-6">
        <Link href="/" aria-label="BUMP, ir para a página inicial" className="flex shrink-0 items-baseline gap-2">
          <span className="text-xl font-black tracking-[-0.04em]">BUMP</span>
          <span className="hidden font-mono text-[10px] tracking-[0.15em] text-mute-2 sm:inline">SUSPENSION SYSTEMS</span>
        </Link>

        <nav aria-label="Navegação principal" className="hidden items-stretch gap-7 lg:flex">
          <NavLink href="/" label="Home" active={pathname === "/"} />
          <Dropdown label="Linhas" active={pathname.startsWith("/linhas")}>
            <Link href="/linhas" className="menu-item font-semibold text-paper">Todas as linhas</Link>
            {productLines.map((line) => (
              <Link key={line.slug} href={`/linhas/${line.slug}`} className="menu-item">{line.shortName}</Link>
            ))}
          </Dropdown>
          <Dropdown label="A BUMP" active={pathname === "/quem-somos" || pathname === "/tecnologia"}>
            {companyLinks.map((item) => (
              <Link key={item.href} href={item.href} className="menu-item">{item.label}</Link>
            ))}
          </Dropdown>
          <NavLink href="/resultados" label="Resultados" active={pathname === "/resultados"} />
        </nav>

        <div className="hidden shrink-0 items-center gap-3 lg:flex">
          <Link href="/configurador" className="button-primary button-sm">Montar meu amortecedor</Link>
          <Link href="/contato" className="button-secondary button-sm">Contato</Link>
        </div>

        <button
          type="button"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((value) => !value)}
          className="grid size-11 place-items-center rounded-sm border border-line-2 text-paper lg:hidden"
        >
          <span className="sr-only">Menu</span>
          <span className="flex flex-col gap-1.5">
            <span className={`h-px w-5 bg-current transition-transform ${open ? "translate-y-[3.5px] rotate-45" : ""}`} />
            <span className={`h-px w-5 bg-current transition-transform ${open ? "-translate-y-[3.5px] -rotate-45" : ""}`} />
          </span>
        </button>
      </div>

      {open && (
        <nav
          id="mobile-menu"
          aria-label="Navegação móvel"
          onClick={(event) => {
            if ((event.target as HTMLElement).closest("a")) setOpen(false);
          }}
          className="max-h-[calc(100dvh-72px)] overflow-y-auto border-t border-line-1 bg-ink px-5 py-5 lg:hidden"
        >
          <div className="mx-auto flex max-w-[1280px] flex-col">
            <Link href="/" className="mobile-link">Home</Link>
            <details className="group border-b border-line-1">
              <summary className="mobile-summary">Linhas <span aria-hidden="true">+</span></summary>
              <div className="flex flex-col pb-3 pl-4">
                <Link href="/linhas" className="mobile-sublink">Todas as linhas</Link>
                {productLines.map((line) => <Link key={line.slug} href={`/linhas/${line.slug}`} className="mobile-sublink">{line.shortName}</Link>)}
              </div>
            </details>
            <details className="group border-b border-line-1">
              <summary className="mobile-summary">A BUMP <span aria-hidden="true">+</span></summary>
              <div className="flex flex-col pb-3 pl-4">
                {companyLinks.map((item) => <Link key={item.href} href={item.href} className="mobile-sublink">{item.label}</Link>)}
              </div>
            </details>
            <Link href="/resultados" className="mobile-link">Resultados</Link>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <Link href="/configurador" className="button-primary">Montar meu amortecedor</Link>
              <Link href="/contato" className="button-secondary">Contato</Link>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}

function NavLink({ href, label, active }: { href: string; label: string; active: boolean }) {
  return <Link href={href} aria-current={active ? "page" : undefined} className={`flex items-center border-b-2 px-1 font-mono text-xs tracking-[0.08em] transition-colors ${active ? "border-accent text-paper" : "border-transparent text-mute-1 hover:text-accent"}`}>{label}</Link>;
}

function Dropdown({ label, active, children }: { label: string; active: boolean; children: React.ReactNode }) {
  return (
    <div className="group relative flex items-stretch">
      <button type="button" className={`flex items-center gap-1 border-b-2 px-1 font-mono text-xs tracking-[0.08em] transition-colors ${active ? "border-accent text-paper" : "border-transparent text-mute-1 group-hover:text-accent"}`}>
        {label} <span aria-hidden="true" className="text-[10px]">⌄</span>
      </button>
      <div className="invisible absolute top-full left-0 min-w-56 translate-y-1 border border-line-2 bg-ink p-2 opacity-0 shadow-2xl transition-all group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
        {children}
      </div>
    </div>
  );
}
