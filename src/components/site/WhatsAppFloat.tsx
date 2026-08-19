"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

export function WhatsAppFloat() {
  const pathname = usePathname();
  const linkRef = useRef<HTMLAnchorElement>(null);
  const [compact, setCompact] = useState(false);

  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    const zones = Array.from(document.querySelectorAll<HTMLElement>("[data-wa-compact]"));

    const visible = new Set<Element>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target);
          else visible.delete(entry.target);
        }
        setCompact(visible.size > 0);
      },
      { rootMargin: "0px 0px -35% 0px", threshold: 0.15 },
    );

    zones.forEach((zone) => observer.observe(zone));
    return () => {
      observer.disconnect();
      setCompact(false);
    };
  }, [pathname]);

  return (
    <Link
      ref={linkRef}
      href="/contato?canal=whatsapp"
      aria-label="Falar com um especialista da BUMP"
      data-compact={compact ? "true" : undefined}
      className="group fixed right-3 bottom-3 z-[90] inline-flex size-11 items-center justify-center rounded-full bg-accent p-0 text-sm font-bold text-ink shadow-[0_8px_24px_rgba(252,243,19,0.22)] transition-[transform,width] duration-300 ease-[var(--ease-settle)] hover:-translate-y-1 focus-visible:-translate-y-1 sm:right-4 sm:bottom-4 sm:size-auto sm:min-h-12 sm:gap-2 sm:px-4 sm:py-3 md:right-6 md:bottom-6 data-[compact=true]:sm:size-12 data-[compact=true]:sm:min-h-12 data-[compact=true]:sm:gap-0 data-[compact=true]:sm:p-0"
    >
      <span aria-hidden="true" className="grid size-6 place-items-center rounded-full border border-ink/30">↗</span>
      <span className="hidden sm:inline group-data-[compact=true]:sm:hidden">Falar com especialista</span>
    </Link>
  );
}
