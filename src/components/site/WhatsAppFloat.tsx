import Link from "next/link";

export function WhatsAppFloat() {
  return (
    <Link
      href="/contato?canal=whatsapp"
      aria-label="Falar com um especialista da BUMP"
      className="fixed right-3 bottom-3 z-[90] inline-flex size-11 items-center justify-center rounded-full bg-accent p-0 text-sm font-bold text-ink shadow-[0_8px_24px_rgba(211,255,26,0.22)] transition-transform hover:-translate-y-1 focus-visible:-translate-y-1 sm:right-4 sm:bottom-4 sm:size-auto sm:min-h-12 sm:gap-2 sm:px-4 sm:py-3 md:right-6 md:bottom-6"
    >
      <span aria-hidden="true" className="grid size-6 place-items-center rounded-full border border-ink/30">↗</span>
      <span className="hidden sm:inline">Falar com especialista</span>
    </Link>
  );
}
