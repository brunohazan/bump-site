const USOS = ["EXPEDIÇÃO", "RALLY", "CARGA / AGRO", "TRILHA"] as const;

export function Projeto() {
  return (
    <section
      id="projeto"
      className="border-t border-line-1 bg-ink-soft px-5 py-24 md:px-10 md:py-40"
    >
      <div className="mx-auto grid max-w-[1280px] grid-cols-1 items-center gap-12 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:gap-20">
        <div>
          <div
            data-reveal
            className="mb-6 font-mono text-xs tracking-[0.22em] text-mute-3"
          >
            08 — INICIAR PROJETO
          </div>
          <h2
            data-reveal
            className="m-0 mb-7 text-[clamp(38px,6vw,88px)] leading-[0.95] font-black tracking-[-0.03em] uppercase"
          >
            Seu terreno.
            <br />
            Seu veículo.
            <br />
            <span className="text-accent">Seu acerto.</span>
          </h2>
          <p
            data-reveal
            className="m-0 max-w-[46ch] text-base leading-[1.7] text-mute-1"
          >
            Informe o veículo e o uso. A engenharia BUMP define construção,
            fluido, pressurização e curso — e retorna com o acerto técnico e
            o orçamento do seu sistema.
          </p>
        </div>
        <div
          data-reveal
          className="border border-line-2 bg-ink p-6 md:p-10"
        >
          <div className="flex flex-col gap-5.5">
            <div className="flex flex-col gap-2">
              <span className="font-mono text-[11px] tracking-[0.16em] text-mute-2">
                01 · VEÍCULO
              </span>
              <div className="flex justify-between border border-line-2 px-4 py-3.5 text-[15px] text-mute-3">
                <span>Selecionar modelo e ano</span>
                <span className="text-accent">▾</span>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <span className="font-mono text-[11px] tracking-[0.16em] text-mute-2">
                02 · USO PREDOMINANTE
              </span>
              <div className="grid grid-cols-2 gap-2">
                {USOS.map((uso, i) => (
                  <div
                    key={uso}
                    className={`border px-3 py-3 text-center font-mono text-xs tracking-[0.1em] ${
                      i === 0
                        ? "border-accent text-accent"
                        : "border-line-2 text-mute-2"
                    }`}
                  >
                    {uso}
                  </div>
                ))}
              </div>
            </div>
            <a
              href="#projeto"
              className="block rounded-sm bg-accent px-4.5 py-4.5 text-center font-mono text-[13px] font-semibold tracking-[0.14em] text-ink transition-colors hover:bg-paper"
            >
              SOLICITAR ACERTO E ORÇAMENTO →
            </a>
            <span className="text-center font-mono text-[10px] tracking-[0.12em] text-mute-4">
              RESPOSTA TÉCNICA EM ATÉ 1 DIA ÚTIL · SEG–SEX 8H–18H
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
