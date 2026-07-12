const LINKS = [
  { href: "#engenharia", label: "TECNOLOGIA" },
  { href: "#linha", label: "PRODUTOS" },
  { href: "#aplicacoes", label: "APLICAÇÕES" },
  { href: "#prova", label: "PROVA" },
] as const;

export function Nav() {
  return (
    <nav className="fixed inset-x-0 top-0 z-[100] flex h-[72px] items-center justify-between bg-gradient-to-b from-ink/85 to-ink/0 px-10 backdrop-blur-[2px]">
      <a href="#top" className="flex items-baseline gap-2.5">
        <span className="text-[22px] font-black tracking-tight">BUMP</span>
        <span className="font-mono text-[10px] tracking-[0.14em] text-mute-2">
          SUSPENSION SYSTEMS
        </span>
      </a>
      <div className="flex items-center gap-9">
        {LINKS.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="font-mono text-xs tracking-[0.12em] text-mute-1 hover:text-accent"
          >
            {link.label}
          </a>
        ))}
        <a
          href="#projeto"
          className="rounded-sm bg-paper px-5 py-2.5 font-mono text-xs tracking-[0.12em] text-ink hover:bg-accent"
        >
          INICIAR PROJETO
        </a>
      </div>
    </nav>
  );
}
