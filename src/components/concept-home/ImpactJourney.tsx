"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { ASSET_BASE } from "@/lib/site-data";
import styles from "./ImpactJourney.module.css";

const stages = [
  { key: "hero", number: "01", label: "O chão", title: "Conforto que faz o corpo chegar inteiro.", text: "Toda força começa no terreno. A jornada mostra o caminho que ela percorre antes de chegar em quem dirige." },
  { key: "terrain", number: "02", label: "O terreno muda", title: "O chão muda. A força continua.", text: "Asfalto, cascalho, barro e carga alteram a frequência do impacto. O amortecedor precisa responder ao uso real." },
  { key: "compression", number: "03", label: "Compressão", title: "O que para aqui não precisa chegar em você.", text: "A roda sobe, a haste entra e o conjunto controla a energia antes que a carroceria repita todo o movimento." },
  { key: "control", number: "04", label: "Controle", title: "Pressão, fluido e retorno viram conforto.", text: "Esta é uma visualização conceitual. O acerto final considera veículo, carga, altura e rotina antes da produção." },
] as const;

function stageFromProgress(progress: number) {
  if (progress >= 0.79) return "control";
  if (progress >= 0.53) return "compression";
  if (progress >= 0.26) return "terrain";
  return "hero";
}

export function ImpactJourney() {
  const journeyRef = useRef<HTMLElement>(null);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    const body = document.body;
    const journey = journeyRef.current;
    if (!journey) return;

    body.classList.add("concept-mode");
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");

    const update = () => {
      frameRef.current = null;
      if (media.matches) {
        journey.style.setProperty("--journey", "0.68");
        journey.dataset.stage = "control";
        return;
      }

      const rect = journey.getBoundingClientRect();
      const distance = Math.max(journey.offsetHeight - window.innerHeight, 1);
      const progress = Math.min(1, Math.max(0, -rect.top / distance));
      journey.style.setProperty("--journey", progress.toFixed(4));
      journey.dataset.stage = stageFromProgress(progress);
    };

    const requestUpdate = () => {
      if (frameRef.current !== null) return;
      frameRef.current = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    media.addEventListener("change", requestUpdate);

    return () => {
      body.classList.remove("concept-mode");
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      media.removeEventListener("change", requestUpdate);
      if (frameRef.current !== null) window.cancelAnimationFrame(frameRef.current);
    };
  }, []);

  return (
    <div className={styles.experience}>
      <header className={styles.topbar}>
        <Link href="/" className={styles.brand} aria-label="Voltar para a Home BUMP">BUMP</Link>
        <div className={styles.prototypeTag}><span /> Conceito navegável · v0.1</div>
        <Link href="/" className={styles.exit}>Sair do conceito ↗</Link>
      </header>

      <section ref={journeyRef} className={styles.journey} data-stage="hero" aria-label="Jornada do impacto, do chão ao corpo">
        <div className={styles.sticky}>
          <div className={styles.grid} aria-hidden="true" />
          <div className={styles.noise} aria-hidden="true" />

          <div className={styles.truckLayer}>
            <Image
              src={`${ASSET_BASE}/amortecedores/hero.png`}
              alt="Picape atravessando terreno irregular"
              fill
              priority
              sizes="100vw"
              className={styles.truckImage}
            />
            <div className={styles.truckShade} />
          </div>

          <svg className={styles.terrain} viewBox="0 0 1600 300" preserveAspectRatio="none" aria-hidden="true">
            <path className={styles.terrainGhost} d="M0 180 C150 120 250 235 390 175 S650 110 770 190 S1030 240 1160 150 S1430 100 1600 185" />
            <path className={styles.terrainLine} d="M0 180 C150 120 250 235 390 175 S650 110 770 190 S1030 240 1160 150 S1430 100 1600 185" />
          </svg>

          <div className={styles.impactPulse} aria-hidden="true">
            <span /><span /><span />
          </div>

          <div className={styles.productStage}>
            <div className={styles.productHalo} aria-hidden="true" />
            <Image
              src={`${ASSET_BASE}/amortecedoressemfundo/amortecedorpremiumsemfundo.webp`}
              alt="Amortecedor BUMP Premium em visualização conceitual de compressão"
              fill
              sizes="(min-width: 900px) 48vw, 88vw"
              className={styles.productImage}
            />
            <div className={styles.compressionScale} aria-hidden="true">
              <span>EXTENSÃO</span>
              <i />
              <span>COMPRESSÃO</span>
            </div>
          </div>

          <div className={styles.energyPath} aria-hidden="true">
            <span className={styles.energyOne} />
            <span className={styles.energyTwo} />
            <span className={styles.energyThree} />
          </div>

          <nav className={styles.stageRail} aria-label="Capítulos do conceito">
            {stages.map((stage) => (
              <div key={stage.key} className={styles.railItem} data-key={stage.key}>
                <span>{stage.number}</span><i /><strong>{stage.label}</strong>
              </div>
            ))}
          </nav>

          <div className={styles.chapters}>
            {stages.map((stage) => (
              <article key={stage.key} className={styles.chapter} data-key={stage.key}>
                <p className={styles.eyebrow}>{stage.number} · {stage.label}</p>
                <h1>{stage.title}</h1>
                <p className={styles.description}>{stage.text}</p>
                {stage.key === "hero" && (
                  <div className={styles.heroActions}>
                    <Link href="/configurador" className={styles.primaryAction}>Montar para o meu chão</Link>
                    <span>Role para acompanhar o impacto</span>
                  </div>
                )}
              </article>
            ))}
          </div>

          <div className={styles.progress} aria-hidden="true"><span /></div>
          <p className={styles.conceptNote}>Visualização conceitual · produto e movimento sujeitos à validação técnica</p>
        </div>
      </section>

      <section className={styles.respite}>
        <p className={styles.respiteEyebrow}>Fim do primeiro protótipo</p>
        <h2>A história continua dentro do amortecedor.</h2>
        <p>Este slice valida Hero, mudança de terreno e compressão. As próximas cenas podem revelar fluido, retorno, rotinas, linhas e o caso de 400 mil km.</p>
        <div className={styles.respiteActions}>
          <Link href="/" className={styles.darkAction}>Comparar com a Home atual</Link>
          <Link href="/configurador" className={styles.outlineAction}>Testar configurador</Link>
        </div>
        <div className={styles.pending}>
          <strong>Assets pendentes para produção final</strong>
          <span>Horizon licenciada · logo vetorial · produto comprimido/estendido · instalação real · terrenos aprovados</span>
        </div>
      </section>
    </div>
  );
}
