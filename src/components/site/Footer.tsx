import Link from "next/link";
import { productLines } from "@/lib/site-data";

const company = [
  ["Quem somos", "/quem-somos"],
  ["Tecnologia", "/tecnologia"],
  ["Resultados", "/resultados"],
] as const;

const help = [
  ["Aplicações", "/aplicacoes"],
  ["FAQ", "/faq"],
  ["Contato", "/contato"],
  ["Montar meu amortecedor", "/configurador"],
] as const;

export function Footer() {
  return (
    <footer className="border-t border-line-1 bg-ink-soft">
      <div className="site-container py-14 md:py-20">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1.35fr]">
          <div>
            <FooterTitle>Linhas</FooterTitle>
            <div className="flex flex-col gap-3">
              {productLines.map((line) => <FooterLink key={line.slug} href={`/linhas/${line.slug}`}>{line.shortName}</FooterLink>)}
            </div>
          </div>
          <div>
            <FooterTitle>A BUMP</FooterTitle>
            <div className="flex flex-col gap-3">{company.map(([label, href]) => <FooterLink key={href} href={href}>{label}</FooterLink>)}</div>
          </div>
          <div>
            <FooterTitle>Ajuda</FooterTitle>
            <div className="flex flex-col gap-3">{help.map(([label, href]) => <FooterLink key={href} href={href}>{label}</FooterLink>)}</div>
          </div>
          <div>
            <FooterTitle>Contato</FooterTitle>
            <div className="flex flex-col gap-3 text-sm leading-relaxed text-mute-2">
              <Link href="/contato" className="transition-colors hover:text-accent">WhatsApp, telefone e e-mail</Link>
              <span>Segunda a sexta, 8h às 18h</span>
              <span>Gravataí, RS</span>
              <a href="https://www.instagram.com/bumpamortecedores" target="_blank" rel="noreferrer" className="transition-colors hover:text-accent">Instagram</a>
            </div>
          </div>
        </div>
        <div className="mt-14 flex flex-col gap-4 border-t border-line-1 pt-7 font-mono text-[11px] leading-relaxed tracking-[0.04em] text-mute-4 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            <Link href="/projeto-v2" className="text-accent hover:text-paper">Projeto V2</Link>
            <Link href="/politica-de-privacidade" className="hover:text-accent">Política de Privacidade</Link>
            <Link href="/termos-de-uso" className="hover:text-accent">Termos de Uso</Link>
          </div>
          <span>CNPJ 18.052.960/0001-60 · © 2013–2026 BUMP Amortecedores</span>
        </div>
      </div>
    </footer>
  );
}

function FooterTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="mb-5 font-mono text-xs font-semibold tracking-[0.14em] text-paper uppercase">{children}</h2>;
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return <Link href={href} className="text-sm text-mute-2 transition-colors hover:text-accent">{children}</Link>;
}
