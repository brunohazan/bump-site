import Image from "next/image";
import {
  coiloverFigureImage,
  inoxFigureImage,
  premiumFigureImage,
  specs,
} from "@/lib/home-data";

export function Engenharia() {
  return (
    <section
      id="engenharia"
      className="border-y border-line-1 bg-ink-soft px-5 py-20 md:px-10 md:py-[140px]"
    >
      <div className="mx-auto max-w-[1280px]">
        <div
          data-reveal
          className="mb-8 font-mono text-xs tracking-[0.22em] text-mute-3 md:mb-12"
        >
          02 — ENGENHARIA
        </div>
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:gap-20">
          <div>
            <h2
              data-reveal
              className="m-0 mb-7 text-[clamp(34px,5vw,72px)] leading-[0.98] font-black tracking-[-0.03em] uppercase"
            >
              Corpo duplo.
              <br />
              <span className="text-accent">Monotubo.</span>
            </h2>
            <p
              data-reveal
              className="m-0 mb-12 max-w-[52ch] text-base leading-[1.7] text-mute-1"
            >
              Dois tubos, mais óleo em circulação, dissipação térmica
              superior. O amortecedor aquece — e não perde performance. Seja
              em 1.000 km de estrada de terra ou sob carga máxima no asfalto,
              fluido, pressurização e curso são acerto de engenharia, não
              acaso.
            </p>
            <div className="border border-line-1 bg-ink">
              <div className="flex justify-between border-b border-line-1 bg-[#101010] px-6 py-3.5">
                <span className="font-mono text-[11px] tracking-[0.18em] text-mute-2">
                  FICHA TÉCNICA
                </span>
                <span className="font-mono text-[11px] tracking-[0.18em] text-accent">
                  BUMP-DT-001
                </span>
              </div>
              {specs.map((spec) => (
                <div
                  key={spec.k}
                  className="grid grid-cols-[110px_1fr] gap-3 border-b border-[#161616] px-4 py-[13px] sm:grid-cols-[180px_1fr] sm:gap-4 sm:px-6 sm:py-[15px]"
                >
                  <span className="font-mono text-xs tracking-[0.1em] text-mute-3">
                    {spec.k}
                  </span>
                  <span className="text-sm font-semibold text-paper">
                    {spec.v}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div
            data-reveal
            className="flex flex-col gap-4 lg:sticky lg:top-[100px]"
          >
            <div className="relative grid aspect-[3/4] place-items-center overflow-hidden border border-line-1 bg-ink-frame">
              <Image
                src={premiumFigureImage}
                alt="Amortecedor BUMP Premium"
                fill
                sizes="(min-width: 1024px) 40vw, 90vw"
                className="object-contain p-8"
              />
              <span className="absolute top-4 left-4 font-mono text-[11px] tracking-[0.16em] text-accent">
                FIG. 01 — LINHA PREMIUM
              </span>
              <span className="absolute right-4 bottom-4 font-mono text-[11px] tracking-[0.16em] text-mute-4">
                ESCALA 1:1
              </span>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="relative grid aspect-[4/3] place-items-center overflow-hidden border border-line-1 bg-ink-frame">
                <Image
                  src={inoxFigureImage}
                  alt="Amortecedor BUMP Inox"
                  fill
                  sizes="20vw"
                  className="object-contain p-4.5"
                />
              </div>
              <div className="relative grid aspect-[4/3] place-items-center overflow-hidden border border-line-1 bg-ink-frame">
                <Image
                  src={coiloverFigureImage}
                  alt="Coilover BUMP"
                  fill
                  sizes="20vw"
                  className="object-contain p-4.5"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
