import Link from "next/link";

export function WhatsAppFloat() {
  return (
    <Link
      href="/contato?canal=whatsapp"
      aria-label="Falar com um especialista da BUMP"
      className="fixed right-4 bottom-4 z-[90] inline-flex min-h-12 items-center gap-2 rounded-full bg-accent px-4 py-3 text-sm font-bold text-ink shadow-[0_10px_35px_rgba(211,255,26,0.25)] transition-transform hover:-translate-y-1 focus-visible:-translate-y-1 md:right-6 md:bottom-6"
    >
      <span aria-hidden="true" className="grid size-6 place-items-center rounded-full border border-ink/30">↗</span>
      <span className="hidden sm:inline">Falar com especialista</span>
    </Link>
  );
}
