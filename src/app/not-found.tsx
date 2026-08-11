import Link from "next/link";

export default function NotFound() {
  return <section className="site-container grid min-h-[65svh] place-items-center py-20 text-center"><div><p className="font-mono text-xs text-accent">404</p><h1 className="mt-4 text-5xl font-black tracking-[-0.05em]">Este caminho não existe.</h1><p className="mx-auto mt-4 max-w-lg leading-relaxed text-mute-1">Volte para as linhas ou configure seu amortecedor a partir da sua picape e do seu uso.</p><div className="mt-7 flex flex-wrap justify-center gap-3"><Link href="/" className="button-secondary">Voltar para a Home</Link><Link href="/configurador" className="button-primary">Montar meu amortecedor</Link></div></div></section>;
}
