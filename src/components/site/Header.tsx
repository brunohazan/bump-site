"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { productLines } from "@/lib/site-data";

type DesktopMenu = "lines" | "company" | null;

const companyLinks = [
  {
    href: "/quem-somos",
    label: "Quem somos",
    description: "História, fábrica e a engenharia que nasceu no chão brasileiro.",
    code: "01",
  },
  {
    href: "/tecnologia",
    label: "Tecnologia",
    description: "Corpo duplo, monotubo e acerto traduzidos em conforto real.",
    code: "02",
  },
] as const;

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [desktopMenu, setDesktopMenu] = useState<DesktopMenu>(null);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const transparent = pathname === "/" && !scrolled && !mobileOpen && !desktopMenu;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    if (!mobileOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [mobileOpen]);

  function closeAll() {
    setMobileOpen(false);
    setDesktopMenu(null);
  }

  return (
    <header
      onMouseLeave={() => setDesktopMenu(null)}
      className={`fixed inset-x-0 top-0 z-[100] transition-[background-color,border-color,backdrop-filter] duration-300 ${
        transparent
          ? "border-b border-transparent bg-gradient-to-b from-ink/80 to-transparent"
          : "border-b border-line-1 bg-ink/92 backdrop-blur-xl"
      }`}
    >
      <div className="site-container flex h-[72px] items-center justify-between gap-5">
        <Link
          href="/"
          onClick={closeAll}
          aria-label="BUMP Amortecedores, ir para a página inicial"
          className="group flex shrink-0 items-center"
        >
          <Image
            src="/brand/bump-logo.png"
            alt=""
            width={180}
            height={53}
            priority
            className="h-auto w-[132px] transition-transform duration-300 group-hover:scale-[1.03] sm:w-[148px]"
          />
        </Link>

        <nav aria-label="Navegação principal" className="hidden h-full items-stretch lg:flex">
          <NavLink href="/" label="Home" active={pathname === "/"} onNavigate={closeAll} />
          <MenuButton
            label="Linhas"
            active={pathname.startsWith("/linhas")}
            expanded={desktopMenu === "lines"}
            onOpen={() => setDesktopMenu("lines")}
            onToggle={() => setDesktopMenu((current) => current === "lines" ? null : "lines")}
          />
          <NavLink href="/aplicacoes" label="Aplicações" active={pathname.startsWith("/aplicacoes")} onNavigate={closeAll} />
          <MenuButton
            label="A BUMP"
            active={pathname === "/quem-somos" || pathname === "/tecnologia"}
            expanded={desktopMenu === "company"}
            onOpen={() => setDesktopMenu("company")}
            onToggle={() => setDesktopMenu((current) => current === "company" ? null : "company")}
          />
          <NavLink href="/resultados" label="Resultados" active={pathname === "/resultados"} onNavigate={closeAll} />
        </nav>

        <div className="hidden shrink-0 items-center gap-3 lg:flex">
          <Link href="/contato" onClick={closeAll} className="px-2 font-mono text-[11px] tracking-[0.08em] text-mute-1 transition-colors hover:text-accent">
            Contato
          </Link>
          <Link href="/configurador" onClick={closeAll} className="button-primary button-sm gap-2">
            Montar meu amortecedor <span aria-hidden="true">↗</span>
          </Link>
        </div>

        <button
          type="button"
          aria-label={mobileOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
          onClick={() => setMobileOpen((value) => !value)}
          className="relative grid size-11 shrink-0 place-items-center rounded-full border border-paper/25 text-paper transition-colors hover:border-accent hover:text-accent lg:hidden"
        >
          <span className="sr-only">Menu</span>
          <span className="flex flex-col gap-1.5">
            <span className={`h-px w-5 bg-current transition-transform duration-300 ${mobileOpen ? "translate-y-[3.5px] rotate-45" : ""}`} />
            <span className={`h-px w-5 bg-current transition-transform duration-300 ${mobileOpen ? "-translate-y-[3.5px] -rotate-45" : ""}`} />
          </span>
        </button>
      </div>

      {desktopMenu && (
        <div className="hidden border-t border-line-1 bg-ink/98 shadow-[0_30px_60px_rgba(0,0,0,.45)] backdrop-blur-xl lg:block">
          {desktopMenu === "lines" ? (
            <div className="site-container py-7">
              <div className="mb-5 flex items-end justify-between">
                <div>
                  <p className="font-mono text-[10px] tracking-[0.16em] text-accent uppercase">Escolha pelo seu uso</p>
                  <p className="mt-1 text-sm text-mute-2">Seis linhas. Um acerto para cada rotina.</p>
                </div>
                <Link href="/linhas" onClick={closeAll} className="font-mono text-[11px] text-mute-1 transition-colors hover:text-accent">
                  Comparar todas as linhas ↗
                </Link>
              </div>
              <div className="grid grid-cols-3 gap-px overflow-hidden border border-line-1 bg-line-1 xl:grid-cols-6">
                {productLines.map((line, index) => (
                  <Link
                    key={line.slug}
                    href={`/linhas/${line.slug}`}
                    onClick={closeAll}
                    className="group flex min-h-36 flex-col bg-ink-card p-4 transition-colors hover:bg-accent-soft"
                  >
                    <span className="font-mono text-[10px] text-accent">0{index + 1}</span>
                    <strong className="mt-6 text-base tracking-[-0.02em] group-hover:text-accent">{line.shortName}</strong>
                    <span className="mt-2 line-clamp-2 text-xs leading-relaxed text-mute-2">{line.use}</span>
                    <span className="mt-auto pt-4 text-xs text-mute-3 transition-transform group-hover:translate-x-1 group-hover:text-paper">→</span>
                  </Link>
                ))}
              </div>
            </div>
          ) : (
            <div className="site-container grid grid-cols-[1fr_1fr_.7fr] gap-px bg-line-1 py-7">
              {companyLinks.map((item) => (
                <Link key={item.href} href={item.href} onClick={closeAll} className="group min-h-48 bg-ink-card p-7 transition-colors hover:bg-accent-soft">
                  <span className="font-mono text-[10px] text-accent">{item.code}</span>
                  <h2 className="mt-8 text-2xl font-black tracking-[-0.04em] group-hover:text-accent">{item.label}</h2>
                  <p className="mt-3 max-w-sm text-sm leading-relaxed text-mute-2">{item.description}</p>
                </Link>
              ))}
              <div className="flex min-h-48 flex-col justify-between bg-accent p-7 text-ink">
                <p className="font-mono text-[10px] font-semibold tracking-[0.12em] uppercase">Prova de campo</p>
                <div>
                  <strong className="block text-4xl font-black tracking-[-0.05em]">400 mil km</strong>
                  <p className="mt-2 text-sm">Caso real recuperado e de volta ao trabalho.</p>
                </div>
                <Link href="/resultados" onClick={closeAll} className="font-mono text-[11px] font-semibold">Ver resultados ↗</Link>
              </div>
            </div>
          )}
        </div>
      )}

      <nav
        id="mobile-menu"
        aria-label="Navegação móvel"
        aria-hidden={!mobileOpen}
        onClick={(event) => {
          if ((event.target as HTMLElement).closest("a")) closeAll();
        }}
        className={`fixed inset-x-0 top-[72px] z-10 h-[calc(100dvh-72px)] overflow-y-auto bg-ink transition-[opacity,transform,visibility] duration-300 lg:hidden ${
          mobileOpen ? "visible translate-y-0 opacity-100" : "invisible -translate-y-3 opacity-0"
        }`}
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_90%_10%,rgba(211,255,26,.16),transparent_32%)]" />
        <div className="site-container relative flex min-h-full flex-col py-7">
          <div className="grid gap-0">
            {[
              ["01", "Home", "/"],
              ["02", "Todas as linhas", "/linhas"],
              ["03", "Aplicações", "/aplicacoes"],
              ["04", "Quem somos", "/quem-somos"],
              ["05", "Tecnologia", "/tecnologia"],
              ["06", "Resultados", "/resultados"],
            ].map(([number, label, href]) => (
              <Link key={href} href={href} className="group flex min-h-16 items-center gap-4 border-b border-line-1 py-3">
                <span className="font-mono text-[10px] text-accent">{number}</span>
                <span className="text-2xl font-black tracking-[-0.04em] transition-transform group-hover:translate-x-1 group-hover:text-accent">{label}</span>
              </Link>
            ))}
          </div>

          <div className="mt-8">
            <p className="mb-3 font-mono text-[10px] tracking-[0.14em] text-mute-3 uppercase">Linhas BUMP</p>
            <div className="grid grid-cols-2 gap-px overflow-hidden border border-line-1 bg-line-1">
              {productLines.map((line) => (
                <Link key={line.slug} href={`/linhas/${line.slug}`} className="min-h-14 bg-ink-card p-3 text-sm font-semibold transition-colors hover:bg-accent-soft hover:text-accent">
                  {line.shortName}
                </Link>
              ))}
            </div>
          </div>

          <div className="mt-auto grid gap-3 pt-8 sm:grid-cols-2">
            <Link href="/configurador" className="button-primary">Montar meu amortecedor</Link>
            <Link href="/contato" className="button-secondary">Falar com especialista</Link>
          </div>
          <div className="mt-7 flex items-center justify-between border-t border-line-1 pt-4 font-mono text-[9px] text-mute-4">
            <span>GRAVATAÍ · RS</span>
            <span>DESDE 2013</span>
          </div>
        </div>
      </nav>
    </header>
  );
}

function NavLink({ href, label, active, onNavigate }: { href: string; label: string; active: boolean; onNavigate: () => void }) {
  return (
    <Link
      href={href}
      onClick={onNavigate}
      aria-current={active ? "page" : undefined}
      className={`relative flex items-center px-5 font-mono text-[11px] tracking-[0.08em] transition-colors after:absolute after:inset-x-5 after:bottom-0 after:h-px after:origin-left after:bg-accent after:transition-transform ${
        active ? "text-paper after:scale-x-100" : "text-mute-1 after:scale-x-0 hover:text-paper hover:after:scale-x-100"
      }`}
    >
      {label}
    </Link>
  );
}

function MenuButton({ label, active, expanded, onOpen, onToggle }: { label: string; active: boolean; expanded: boolean; onOpen: () => void; onToggle: () => void }) {
  return (
    <button
      type="button"
      aria-expanded={expanded}
      onMouseEnter={onOpen}
      onFocus={onOpen}
      onClick={onToggle}
      className={`relative flex items-center gap-1.5 px-5 font-mono text-[11px] tracking-[0.08em] transition-colors after:absolute after:inset-x-5 after:bottom-0 after:h-px after:origin-left after:bg-accent after:transition-transform ${
        active || expanded ? "text-paper after:scale-x-100" : "text-mute-1 after:scale-x-0 hover:text-paper hover:after:scale-x-100"
      }`}
    >
      {label}
      <span aria-hidden="true" className={`text-[9px] transition-transform duration-200 ${expanded ? "rotate-180" : ""}`}>⌄</span>
    </button>
  );
}
