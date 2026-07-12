import Image from "next/image";
import { families } from "@/lib/home-data";

export function Linha() {
  return (
    <section id="linha" className="px-5 py-20 md:px-10 md:py-[140px]">
      <div className="mx-auto max-w-[1280px]">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6 md:mb-[72px] md:gap-10">
          <div>
            <div
              data-reveal
              className="mb-6 font-mono text-xs tracking-[0.22em] text-mute-3"
            >
              03 — A LINHA
            </div>
            <h2
              data-reveal
              className="m-0 text-[clamp(34px,5vw,72px)] leading-[0.98] font-black tracking-[-0.03em] uppercase"
            >
              Seis equipamentos.
              <br />
              <span className="text-mute-3">Uma exigência cada.</span>
            </h2>
          </div>
          <a
            data-reveal
            href="#projeto"
            className="border-b border-line-4 pb-1.5 font-mono text-xs tracking-[0.14em] text-mute-1 transition-colors hover:border-accent hover:text-accent"
          >
            NÃO SEI QUAL ESCOLHER →
          </a>
        </div>
        <div className="grid grid-cols-1 gap-px border border-line-1 bg-line-1 sm:grid-cols-2 lg:grid-cols-3">
          {families.map((family) => (
            <div
              key={family.code}
              data-reveal
              className="flex min-h-[380px] flex-col gap-0 bg-ink-card px-6 pt-8 pb-9 transition-colors hover:bg-[#101010] md:px-8 md:pt-9 md:pb-10"
            >
              <div className="mb-7 flex items-baseline justify-between">
                <span className="font-mono text-xs tracking-[0.14em] text-accent">
                  {family.code}
                </span>
                <span className="rounded-sm border border-line-2 px-2.5 py-1 font-mono text-[10px] tracking-[0.16em] text-mute-3">
                  {family.tag}
                </span>
              </div>
              <div className="relative mb-7 h-[150px] overflow-hidden border border-[#1a1a1a] bg-ink-frame">
                <Image
                  src={family.img}
                  alt={family.name}
                  fill
                  sizes="(min-width: 1024px) 33vw, 90vw"
                  className="object-contain p-3.5"
                />
              </div>
              <h3 className="m-0 mb-3 text-[26px] font-extrabold tracking-[-0.02em] uppercase">
                {family.name}
              </h3>
              <p className="m-0 mb-6 flex-1 text-sm leading-relaxed text-mute-2">
                {family.desc}
              </p>
              <span className="font-mono text-[11px] tracking-[0.14em] text-mute-1">
                EXPLORAR <span className="text-accent">→</span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
