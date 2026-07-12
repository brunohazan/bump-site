import { steps } from "@/lib/home-data";

export function Processo() {
  return (
    <section
      id="processo"
      className="border-t border-line-1 bg-ink-soft px-5 py-20 md:px-10 md:py-[140px]"
    >
      <div className="mx-auto max-w-[1280px]">
        <div
          data-reveal
          className="mb-6 font-mono text-xs tracking-[0.22em] text-mute-3"
        >
          06 — PROCESSO SOB MEDIDA
        </div>
        <h2
          data-reveal
          className="m-0 mb-12 text-[clamp(34px,5vw,72px)] leading-[0.98] font-black tracking-[-0.03em] uppercase md:mb-[72px]"
        >
          Do seu terreno
          <br />
          <span className="text-mute-3">à sua suspensão.</span>
        </h2>
        <div className="grid grid-cols-1 gap-px border border-line-1 bg-line-1 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => (
            <div
              key={step.num}
              data-reveal
              className="flex flex-col gap-4.5 bg-ink-card px-6 pt-8 pb-9 md:min-h-[260px] md:px-7.5 md:pt-9 md:pb-11"
            >
              <span className="font-mono text-xs tracking-[0.14em] text-accent">
                {step.num}
              </span>
              <h3 className="m-0 text-[22px] leading-tight font-extrabold tracking-[-0.01em] uppercase">
                {step.title}
              </h3>
              <p className="m-0 text-sm leading-relaxed text-mute-2">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
