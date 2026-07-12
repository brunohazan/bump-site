"use client";

import { useState } from "react";

const LINKS = [
  { href: "#engenharia", label: "TECNOLOGIA" },
  { href: "#linha", label: "PRODUTOS" },
  { href: "#aplicacoes", label: "APLICAÇÕES" },
  { href: "#prova", label: "PROVA" },
] as const;

export function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed inset-x-0 top-0 z-[100]">
      <div className="flex h-[72px] items-center justify-between bg-gradient-to-b from-ink/85 to-ink/0 px-5 backdrop-blur-[2px] md:px-10">
        <a href="#top" className="flex items-baseline gap-2.5">
          <span className="text-[22px] font-black tracking-tight">BUMP</span>
          <span className="font-mono text-[10px] tracking-[0.14em] text-mute-2 max-[400px]:hidden">
            SUSPENSION SYSTEMS
          </span>
        </a>
        <div className="hidden items-center gap-9 md:flex">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-mono text-xs tracking-[0.12em] text-mute-1 transition-colors hover:text-accent"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#projeto"
            className="rounded-sm bg-paper px-5 py-2.5 font-mono text-xs tracking-[0.12em] text-ink transition-colors hover:bg-accent"
          >
            INICIAR PROJETO
          </a>
        </div>
        <div className="flex items-center gap-4 md:hidden">
          <a
            href="#projeto"
            className="rounded-sm bg-paper px-4 py-2 font-mono text-[11px] tracking-[0.12em] text-ink transition-colors hover:bg-accent"
            onClick={() => setOpen(false)}
          >
            INICIAR
          </a>
          <button
            type="button"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="flex h-10 w-10 flex-col items-center justify-center gap-[5px] rounded-sm border border-line-4"
          >
            <span
              className={`block h-px w-4 bg-paper transition-transform ${open ? "translate-y-[3px] rotate-45" : ""}`}
            />
            <span
              className={`block h-px w-4 bg-paper transition-transform ${open ? "-translate-y-[3px] -rotate-45" : ""}`}
            />
          </button>
        </div>
      </div>
      {open && (
        <div className="border-b border-line-1 bg-ink/95 px-5 py-4 backdrop-blur-md md:hidden">
          <div className="flex flex-col gap-1">
            {LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="py-3 font-mono text-sm tracking-[0.12em] text-mute-1 transition-colors hover:text-accent"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
