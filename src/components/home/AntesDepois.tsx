import { antesDepoisImage } from "@/lib/home-data";
import { BeforeAfterSlider } from "./BeforeAfterSlider";

export function AntesDepois() {
  return (
    <section
      id="antesdepois"
      className="border-y border-line-1 bg-ink-soft px-5 py-20 md:px-10 md:py-[140px]"
    >
      <div className="mx-auto max-w-[1280px]">
        <div
          data-reveal
          className="mb-6 font-mono text-xs tracking-[0.22em] text-mute-3"
        >
          04 — A DIFERENÇA NO TERRENO
        </div>
        <h2
          data-reveal
          className="m-0 mb-10 text-[clamp(34px,5vw,72px)] leading-[0.98] font-black tracking-[-0.03em] uppercase md:mb-16"
        >
          Antes. <span className="text-accent">Depois.</span>
        </h2>
        <BeforeAfterSlider image={antesDepoisImage} alt="RAM 1500 com BUMP" />
        <p
          data-reveal
          className="mt-6 mb-0 font-mono text-xs tracking-[0.1em] text-mute-3"
        >
          ARRASTE PARA COMPARAR · RAM 1500 · MESMO OBSTÁCULO, MESMA VELOCIDADE
        </p>
      </div>
    </section>
  );
}
