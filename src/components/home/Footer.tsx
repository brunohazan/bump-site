const PRODUTOS = ["Performance", "Inox", "Premium", "Coilover", "ByPass"] as const;

const EMPRESA = [
  { href: "#engenharia", label: "Tecnologia" },
  { href: "#aplicacoes", label: "Aplicações" },
  { href: "#prova", label: "Prova de campo" },
  { href: "#projeto", label: "Orçamento" },
] as const;

export function Footer() {
  return (
    <footer className="border-t border-line-1 bg-ink px-10 pt-[72px] pb-10">
      <div className="mx-auto max-w-[1280px]">
        <div className="mb-[72px] grid grid-cols-[2fr_1fr_1fr_1fr] gap-12">
          <div className="flex flex-col gap-4">
            <div className="flex items-baseline gap-2.5">
              <span className="text-[22px] font-black tracking-tight">
                BUMP
              </span>
              <span className="font-mono text-[10px] tracking-[0.14em] text-mute-2">
                SUSPENSION SYSTEMS
              </span>
            </div>
            <p className="m-0 max-w-[34ch] text-[13px] leading-relaxed text-mute-3">
              Sistemas de suspensão de alta performance, sob medida,
              fabricados no Brasil desde 2013.
            </p>
            <span className="font-mono text-[11px] tracking-[0.08em] text-mute-4">
              AV. ELY CORRÊA, 945 · GRAVATAÍ — RS
            </span>
          </div>
          <div className="flex flex-col gap-3.5">
            <span className="font-mono text-[11px] tracking-[0.18em] text-mute-4">
              PRODUTOS
            </span>
            {PRODUTOS.map((produto) => (
              <a
                key={produto}
                href="#linha"
                className="text-[13px] text-mute-1 hover:text-accent"
              >
                {produto}
              </a>
            ))}
          </div>
          <div className="flex flex-col gap-3.5">
            <span className="font-mono text-[11px] tracking-[0.18em] text-mute-4">
              EMPRESA
            </span>
            {EMPRESA.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-[13px] text-mute-1 hover:text-accent"
              >
                {item.label}
              </a>
            ))}
          </div>
          <div className="flex flex-col gap-3.5">
            <span className="font-mono text-[11px] tracking-[0.18em] text-mute-4">
              CONTATO
            </span>
            <a
              href="https://www.instagram.com/bumpamortecedores"
              className="text-[13px] text-mute-1 hover:text-accent"
            >
              @bumpamortecedores
            </a>
            <span className="text-[13px] text-mute-3">
              Seg–Sex · 8h às 18h
            </span>
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-[#161616] pt-7">
          <span className="font-mono text-[11px] tracking-[0.1em] text-mute-4">
            © BUMP AMORTECEDORES · 2013—2026 · CNPJ 18.052.960/0001-60
          </span>
          <span className="font-mono text-[11px] tracking-[0.1em] text-mute-4">
            DOMINE QUALQUER TERRENO
          </span>
        </div>
      </div>
    </footer>
  );
}
