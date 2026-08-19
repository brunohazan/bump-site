"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

// Deriva o cluster de motion a partir do pathname. Cada cluster tem um gesto
// próprio (ver globals.css). O valor é aplicado como data-page-motif no <html>,
// então o CSS aplica o gesto aos [data-reveal] da página MESMO sem um wrapper
// manual data-motif. Home (/) e 404 usam o gesto base.
function motifForPath(pathname: string): string | null {
  if (pathname.startsWith("/linhas")) return "compression"; // produto/linhas
  if (pathname.startsWith("/tecnologia")) return "precision"; // tecnologia/precisão
  if (pathname.startsWith("/aplicacoes")) return "lateral"; // aplicações/terreno lateral
  if (pathname.startsWith("/resultados")) return "rise"; // resultados/evidência
  if (pathname.startsWith("/quem-somos")) return "focus"; // autoridade/foco
  if (
    pathname.startsWith("/configurador") ||
    pathname.startsWith("/contato") ||
    pathname.startsWith("/faq") ||
    pathname.startsWith("/como-comprar")
  ) {
    return "cascade"; // conversão/cascata
  }
  if (
    pathname.startsWith("/politica-de-privacidade") ||
    pathname.startsWith("/termos-de-uso")
  ) {
    return "calm"; // legal/calmo
  }
  return null;
}

export function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;

    // Motivo por cluster no <html>: herdado pelos reveals via CSS.
    const motif = motifForPath(pathname);
    if (motif) root.dataset.pageMotif = motif;
    else delete root.dataset.pageMotif;

    const elements = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion || !("IntersectionObserver" in window)) {
      root.classList.remove("reveal-ready");
      elements.forEach((element) => element.classList.add("is-visible"));
      // Limpa o dataset no cleanup mesmo no caminho estático.
      return () => {
        delete root.dataset.pageMotif;
      };
    }

    root.classList.add("reveal-ready");

    // Reveals são REVERSÍVEIS por padrão: entram ao cruzar a viewport e saem
    // quando deixam de intersectar. Conteúdos que não devem reanimar marcam
    // data-reveal-once (one-shot: fixa o estado após a primeira entrada).
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const target = entry.target as HTMLElement;
          const once = target.hasAttribute("data-reveal-once");
          if (entry.isIntersecting) {
            target.classList.add("is-visible");
            if (once) observer.unobserve(target);
          } else if (!once) {
            target.classList.remove("is-visible");
          }
        }
      },
      { rootMargin: "0px 0px -8%", threshold: 0.1 },
    );

    elements.forEach((element) => observer.observe(element));

    return () => {
      observer.disconnect();
      delete root.dataset.pageMotif;
    };
  }, [pathname]);

  return null;
}
