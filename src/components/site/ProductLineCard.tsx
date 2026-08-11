import Image from "next/image";
import Link from "next/link";
import type { ProductLine } from "@/lib/site-data";

export function ProductLineCard({ line }: { line: ProductLine }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-sm border border-line-1 bg-ink-card transition-colors hover:border-line-4">
      <Link href={`/linhas/${line.slug}`} className="relative block min-h-56 overflow-hidden bg-ink-frame">
        <Image src={line.image} alt={line.name} fill sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="object-contain p-7 transition-transform duration-300 group-hover:scale-[1.04]" />
        <span className="absolute top-4 left-4 rounded-sm border border-accent/40 bg-ink/85 px-2.5 py-1 font-mono text-[10px] text-accent">{line.badge}</span>
      </Link>
      <div className="flex flex-1 flex-col p-6">
        <span className="font-mono text-xs text-mute-3">{line.code}</span>
        <h2 className="mt-2 text-2xl font-black">{line.shortName}</h2>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-mute-2">{line.description}</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href={`/configurador?linha=${line.slug}`} className="button-primary button-sm">Montar</Link>
          <Link href={`/linhas/${line.slug}`} className="button-secondary button-sm">Ver detalhes</Link>
        </div>
      </div>
    </article>
  );
}
