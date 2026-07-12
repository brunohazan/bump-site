import Image from "next/image";
import { worlds } from "@/lib/home-data";

export function Aplicacoes() {
  return (
    <section id="aplicacoes" className="pt-20 md:pt-[140px]">
      <div className="mx-auto mb-12 max-w-[1280px] px-5 md:mb-20 md:px-10">
        <div
          data-reveal
          className="mb-6 font-mono text-xs tracking-[0.22em] text-mute-3"
        >
          05 — APLICAÇÕES
        </div>
        <h2
          data-reveal
          className="m-0 text-[clamp(34px,5vw,72px)] leading-[0.98] font-black tracking-[-0.03em] uppercase"
        >
          Cada terreno
          <br />
          <span className="text-mute-3">é um projeto.</span>
        </h2>
      </div>
      {worlds.map((world) => (
        <div
          key={world.code}
          data-reveal
          className="relative flex min-h-[70vh] items-end overflow-hidden border-t border-line-1 md:min-h-[88vh]"
        >
          <div className="absolute inset-0">
            <Image
              src={world.photo}
              alt={world.name}
              fill
              sizes="100vw"
              className="object-cover"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-ink/94 to-ink/10" />
          <div className="relative mx-auto grid w-full max-w-[1280px] grid-cols-1 items-end gap-6 px-5 pb-10 md:grid-cols-[minmax(0,1fr)_300px] md:gap-12 md:px-10 md:pb-16">
            <div>
              <span className="font-mono text-xs tracking-[0.22em] text-accent">
                {world.code}
              </span>
              <h3 className="m-0 mt-4 mb-3.5 text-[clamp(38px,6vw,96px)] leading-[0.95] font-black tracking-[-0.03em] uppercase">
                {world.name}
              </h3>
              <p className="m-0 max-w-[46ch] text-base leading-relaxed text-mute-1">
                {world.desc}
              </p>
            </div>
            <div className="flex flex-col gap-2.5 border border-line-2 bg-ink/70 px-6 py-5.5 backdrop-blur-md">
              <span className="font-mono text-[10px] tracking-[0.18em] text-mute-3">
                EQUIPAMENTO INDICADO
              </span>
              <span className="text-xl font-extrabold tracking-[-0.01em] uppercase">
                {world.product}
              </span>
              <span className="font-mono text-[11px] tracking-[0.12em] text-accent">
                VER CONFIGURAÇÃO →
              </span>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
