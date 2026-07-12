import Image from "next/image";
import { heroImage } from "@/lib/home-data";

export function Hero() {
  return (
    <section
      id="top"
      className="relative flex h-screen min-h-[640px] flex-col justify-end overflow-hidden"
    >
      <div className="absolute inset-0">
        <Image
          src={heroImage}
          alt="Amortecedor BUMP em teste de campo"
          fill
          priority
          sizes="100vw"
          className="object-cover [filter:grayscale(0.15)_contrast(1.08)_brightness(0.85)]"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-ink/92 via-ink/20 to-ink/35" />
      <div className="relative flex flex-col gap-6 px-5 pb-10 md:gap-8 md:px-10 md:pb-16">
        <div data-reveal className="flex items-center gap-3.5">
          <span className="block h-px w-[34px] shrink-0 bg-accent" />
          <span className="font-mono text-[10px] tracking-[0.22em] text-accent md:text-xs">
            SISTEMAS DE SUSPENSÃO SOB MEDIDA · EST. 2013
          </span>
        </div>
        <h1
          data-reveal
          className="m-0 max-w-[14ch] text-[clamp(44px,11vw,168px)] leading-[0.9] font-black tracking-[-0.035em] uppercase"
        >
          Domine qualquer terreno
        </h1>
        <div className="flex flex-wrap items-end justify-between gap-6 md:gap-10">
          <p
            data-reveal
            className="m-0 max-w-[44ch] text-[15px] leading-relaxed font-normal text-mute-1 md:text-[17px]"
          >
            Amortecedores de competição desenvolvidos sob medida para o seu
            veículo, o seu piloto e o seu terreno. Fabricados no Brasil.
          </p>
          <a
            data-reveal
            href="#projeto"
            className="inline-flex items-center gap-3 rounded-sm border border-line-4 px-7 py-4 font-mono text-[13px] tracking-[0.14em] whitespace-nowrap transition-colors hover:border-accent hover:text-accent"
          >
            INICIAR PROJETO <span className="text-accent">→</span>
          </a>
        </div>
        <div className="flex items-center gap-2.5 border-t border-line-1 pt-5">
          <span className="block h-1.5 w-1.5 animate-[bump-pulse_2.4s_ease-in-out_infinite] rounded-full bg-accent" />
          <span className="font-mono text-[11px] tracking-[0.16em] text-mute-3">
            ROLE PARA EXPLORAR · 00 / 08
          </span>
        </div>
      </div>
    </section>
  );
}
