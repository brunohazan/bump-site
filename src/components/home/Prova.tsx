export function Prova() {
  return (
    <section
      id="prova"
      className="relative overflow-hidden border-t border-line-1 px-10 py-40"
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "repeating-linear-gradient(115deg, #0B0B0A 0px, #0B0B0A 22px, #0D0D0C 22px, #0D0D0C 44px)",
        }}
      >
        <span className="absolute top-10 right-10 text-right font-mono text-xs leading-[2] tracking-[0.08em] text-mute-4">
          [ FOTO EDITORIAL · amortecedor desmontado na bancada após 400.000
          km,
          <br />
          peças organizadas em grid, luz dura de oficina ]
        </span>
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-ink/96 via-ink/50 to-transparent" />
      <div className="relative mx-auto max-w-[1280px]">
        <div
          data-reveal
          className="mb-6 font-mono text-xs tracking-[0.22em] text-mute-3"
        >
          07 — PROVA DE CAMPO
        </div>
        <h2
          data-reveal
          className="m-0 mb-7 text-[clamp(56px,9vw,140px)] leading-[0.9] font-black tracking-[-0.035em]"
        >
          400.000<span className="text-accent">km</span>
        </h2>
        <p
          data-reveal
          className="m-0 mb-10 max-w-[48ch] text-[17px] leading-[1.7] text-mute-1"
        >
          Um único amortecedor BUMP. Quatrocentos mil quilômetros de estrada
          brasileira. Desmontado, inspecionado, recuperado — e devolvido ao
          trabalho. Um equipamento de engenharia não é descartável.
        </p>
        <div data-reveal className="flex flex-wrap gap-10">
          <div className="flex flex-col gap-1.5">
            <span className="font-mono text-[11px] tracking-[0.16em] text-mute-3">
              GARANTIA
            </span>
            <span className="text-xl font-bold">2 anos contra vazamento</span>
          </div>
          <div className="flex flex-col gap-1.5">
            <span className="font-mono text-[11px] tracking-[0.16em] text-mute-3">
              VIDA ÚTIL
            </span>
            <span className="text-xl font-bold">
              Recuperável, não descartável
            </span>
          </div>
          <div className="flex flex-col gap-1.5">
            <span className="font-mono text-[11px] tracking-[0.16em] text-mute-3">
              ORIGEM
            </span>
            <span className="text-xl font-bold">Gravataí · RS · Brasil</span>
          </div>
        </div>
      </div>
    </section>
  );
}
