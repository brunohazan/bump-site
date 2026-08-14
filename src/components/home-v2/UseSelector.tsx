"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { getProductLine, useCases } from "@/lib/site-data";

export function UseSelector() {
  const [selectedId, setSelectedId] = useState<(typeof useCases)[number]["id"]>(useCases[0].id);
  const selected = useCases.find((item) => item.id === selectedId) ?? useCases[0];
  const line = getProductLine(selected.line)!;

  return (
    <div>
      <div
        role="list"
        aria-label="Escolha como usa sua picape"
        className="-mx-5 flex snap-x gap-2 overflow-x-auto px-5 pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:mx-0 md:grid md:grid-cols-5 md:overflow-visible md:px-0 md:pb-0"
      >
        {useCases.map((item) => {
          const active = item.id === selected.id;
          return (
            <button
              key={item.id}
              type="button"
              aria-pressed={active}
              onClick={() => setSelectedId(item.id)}
              className={`group relative min-h-24 min-w-[172px] snap-start overflow-hidden border p-4 text-left transition-[background-color,border-color,color] md:min-w-0 ${
                active
                  ? "border-accent bg-accent text-ink"
                  : "border-line-2 bg-ink-card text-mute-1 hover:border-line-4 hover:text-paper"
              }`}
            >
              <span className={`font-mono text-[10px] ${active ? "text-ink/70" : "text-accent"}`}>{item.number}</span>
              <strong className="mt-7 block text-sm leading-tight">{item.label}</strong>
              <span className={`absolute right-3 bottom-3 text-xs transition-transform group-hover:translate-x-1 ${active ? "text-ink" : "text-mute-4"}`}>→</span>
            </button>
          );
        })}
        <Link
          href="/configurador?uso=projeto"
          className="group relative flex min-h-24 min-w-[172px] snap-start flex-col justify-between overflow-hidden border border-line-2 bg-ink-card p-4 transition-colors hover:border-accent hover:text-accent md:min-w-0"
        >
          <span className="font-mono text-[10px] text-accent">05</span>
          <strong className="max-w-[12ch] text-sm leading-tight">Monte seu projeto</strong>
          <span className="absolute right-3 bottom-3 text-xs transition-transform group-hover:translate-x-1">↗</span>
        </Link>
      </div>

      <div
        key={line.slug}
        aria-live="polite"
        className="selector-panel-enter mt-3 grid min-h-[560px] overflow-hidden border border-line-2 bg-ink lg:grid-cols-[1.08fr_.92fr]"
      >
        <div className="relative min-h-[390px] overflow-hidden bg-[radial-gradient(circle_at_50%_50%,rgba(211,255,26,.16),transparent_58%)] lg:min-h-[560px]">
          <span className="absolute top-5 left-5 z-10 font-mono text-[10px] tracking-[0.15em] text-mute-3 uppercase">{line.code} · {line.badge}</span>
          <span className="pointer-events-none absolute -right-5 -bottom-16 text-[clamp(9rem,25vw,22rem)] leading-none font-black tracking-[-0.09em] text-paper/[0.025]">{selected.number}</span>
          <Image
            src={line.image}
            alt={line.name}
            fill
            sizes="(min-width: 1024px) 55vw, 100vw"
            className="selector-product object-contain p-8 md:p-14 lg:p-16"
          />
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-ink to-transparent lg:hidden" />
        </div>

        <div className="relative flex flex-col justify-center border-t border-line-1 p-6 md:p-10 lg:border-t-0 lg:border-l lg:p-12">
          <p className="font-mono text-[10px] tracking-[0.15em] text-accent uppercase">Recomendado para o seu uso</p>
          <h3 className="mt-4 text-[clamp(2.2rem,5vw,4.8rem)] leading-[.92] font-black tracking-[-0.055em] uppercase">{line.shortName}</h3>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-mute-1">{selected.description} {line.description}</p>
          <ul className="mt-7 grid gap-3 border-y border-line-1 py-6 text-sm text-mute-2">
            {line.benefits.slice(0, 3).map((benefit) => (
              <li key={benefit} className="flex gap-3">
                <span className="font-mono text-xs text-accent">✓</span>
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
          <div className="mt-7 grid gap-3 sm:grid-cols-2">
            <Link href={`/configurador?linha=${line.slug}&uso=${selected.id}`} className="button-primary">Montar essa linha</Link>
            <Link href={`/linhas/${line.slug}`} className="button-secondary">Ver detalhes</Link>
          </div>
          <p className="mt-5 font-mono text-[9px] leading-relaxed tracking-[0.08em] text-mute-4">A recomendação é inicial. A fábrica confirma veículo, peso, altura e uso antes de produzir.</p>
        </div>
      </div>
    </div>
  );
}
