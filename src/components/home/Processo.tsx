import { steps } from "@/lib/home-data";

export function Processo() {
  return (
    <section
      id="processo"
      className="border-t border-line-1 bg-ink-soft px-10 py-[140px]"
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
          className="m-0 mb-[72px] text-[clamp(40px,5vw,72px)] leading-[0.98] font-black tracking-[-0.03em] uppercase"
        >
          Do seu terreno
          <br />
          <span className="text-mute-3">à sua suspensão.</span>
        </h2>
        <div className="grid grid-cols-4 gap-px border border-line-1 bg-line-1">
          {steps.map((step) => (
            <div
              key={step.num}
              data-reveal
              className="flex min-h-[260px] flex-col gap-4.5 bg-ink-card px-7.5 pt-9 pb-11"
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
