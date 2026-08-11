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
      <div role="list" aria-label="Escolha como usa sua picape" className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {useCases.map((item) => {
          const active = item.id === selected.id;
          return (
            <button
              key={item.id}
              type="button"
              aria-pressed={active}
              onClick={() => setSelectedId(item.id)}
              className={`min-h-28 rounded-sm border p-4 text-left transition-colors ${active ? "border-accent bg-accent-soft text-paper" : "border-line-2 bg-ink-card text-mute-1 hover:border-line-4"}`}
            >
              <span className="font-mono text-xs text-accent">{item.number}</span>
              <strong className="mt-5 block text-sm">{item.label}</strong>
            </button>
          );
        })}
        <Link href="/configurador?uso=projeto" className="flex min-h-28 flex-col justify-between rounded-sm border border-line-2 bg-ink-card p-4 transition-colors hover:border-accent">
          <span className="font-mono text-xs text-accent">05</span>
          <strong className="text-sm">Monte seu projeto <span aria-hidden="true">→</span></strong>
        </Link>
      </div>

      <div aria-live="polite" className="mt-6 grid overflow-hidden rounded-sm border border-line-2 bg-ink lg:grid-cols-[.9fr_1.1fr]">
        <div className="relative min-h-72 bg-ink-frame lg:min-h-[390px]">
          <Image src={line.image} alt={line.name} fill sizes="(min-width: 1024px) 45vw, 100vw" className="object-contain p-8 md:p-12" />
        </div>
        <div className="flex flex-col justify-center p-7 md:p-12">
          <p className="font-mono text-xs tracking-[0.12em] text-accent uppercase">Recomendado para o seu uso</p>
          <h3 className="mt-3 text-3xl font-black tracking-[-0.035em] md:text-5xl">{line.name}</h3>
          <p className="mt-4 max-w-xl leading-relaxed text-mute-1">{selected.description} {line.description}</p>
          <ul className="mt-5 grid gap-2 text-sm text-mute-2">
            {line.benefits.slice(0, 2).map((benefit) => <li key={benefit} className="flex gap-2"><span className="text-accent">✓</span>{benefit}</li>)}
          </ul>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link href={`/configurador?linha=${line.slug}&uso=${selected.id}`} className="button-primary">Montar essa linha</Link>
            <Link href={`/linhas/${line.slug}`} className="button-secondary">Ver detalhes da linha</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
