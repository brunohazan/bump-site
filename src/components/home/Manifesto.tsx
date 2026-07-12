const STATS = [
  { value: "2013", accent: "", label: "FÁBRICA PRÓPRIA DESDE" },
  { value: "400", accent: "k", label: "KM EM UM ÚNICO AMORTECEDOR" },
  { value: "100", accent: "%", label: "SOB MEDIDA · NADA DE PRATELEIRA" },
  { value: "∞", accent: "", label: "RECUPERÁVEL · NÃO DESCARTÁVEL" },
] as const;

export function Manifesto() {
  return (
    <section
      id="manifesto"
      className="grid grid-cols-[1fr_minmax(0,1080px)_1fr] px-5 pt-24 pb-20 md:px-10 md:pt-40 md:pb-[140px]"
    >
      <div className="col-start-2">
        <div
          data-reveal
          className="mb-8 font-mono text-xs tracking-[0.22em] text-mute-3 md:mb-12"
        >
          01 — MANIFESTO
        </div>
        <h2
          data-reveal
          className="m-0 mb-12 max-w-[22ch] text-[clamp(30px,5vw,68px)] leading-[1.08] font-extrabold tracking-[-0.025em] md:mb-[72px]"
        >
          A BUMP não fabrica amortecedores.{" "}
          <span className="text-mute-3">
            Desenvolve sistemas de suspensão para cada aplicação.
          </span>
        </h2>
        <div className="grid grid-cols-2 gap-px border border-line-1 bg-line-1 lg:grid-cols-4">
          {STATS.map((stat) => (
            <div
              key={stat.label}
              data-reveal
              className="flex flex-col gap-2.5 bg-ink-card px-5 py-6 md:px-7 md:py-8"
            >
              <span className="text-[32px] font-extrabold tracking-[-0.03em] md:text-[44px]">
                {stat.value}
                {stat.accent && (
                  <span className="text-accent">{stat.accent}</span>
                )}
              </span>
              <span className="font-mono text-[11px] tracking-[0.14em] text-mute-2">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
