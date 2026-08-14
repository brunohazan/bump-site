"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ASSET_BASE, faqItems, getProductLine, productLines, useCases } from "@/lib/site-data";
import styles from "./ImpactJourney.module.css";

const stages = [
  { key: "hero", number: "01", label: "O chão", title: "Conforto que faz o corpo chegar inteiro.", text: "Amortecedores desenvolvidos para a sua picape, a sua carga e o seu terreno. Menos impacto acumulado, mais estabilidade com peso e mais controle onde o asfalto termina." },
  { key: "terrain", number: "02", label: "O terreno muda", title: "O chão muda. A força continua.", text: "Asfalto, cascalho, barro e carga alteram a frequência do impacto. O amortecedor precisa responder ao uso real." },
  { key: "compression", number: "03", label: "Compressão", title: "O que para aqui não precisa chegar em você.", text: "A roda sobe, a haste entra e o conjunto controla a energia antes que a carroceria repita todo o movimento." },
  { key: "control", number: "04", label: "Controle", title: "Pressão, fluido e retorno viram conforto.", text: "Cada conjunto é calibrado para o peso e o uso reais da picape, não para uma média de catálogo. Visualização conceitual; o acerto é confirmado antes da produção." },
] as const;

const useImages: Record<string, string> = {
  urbano: `${ASSET_BASE}/banco_web_800/ram1500.webp`, agro: `${ASSET_BASE}/banco_web_800/ranger.webp`,
  trilha: `${ASSET_BASE}/banco_web_800/hilux.webp`, rally: `${ASSET_BASE}/banco_web_800/triton.webp`,
};
const technology = [
  ["01", "Corpo duplo + monotubo", "Mais volume de fluido, proteção externa e resposta consistente quando a jornada se estende."],
  ["02", "Haste de 20 mm", "Aço temperado e construção preparada para o trabalho mecânico do conjunto."],
  ["03", "Pressão sob medida", "Veículo, carga, altura e uso orientam o acerto. Não existe uma pressão única para toda picape."],
  ["04", "Recuperável", "O equipamento pode voltar à fábrica para desmontagem, inspeção e recuperação."],
] as const;

const brandMarks = [
  ["Toyota", "toyota"], ["Ford", "ford"], ["Chevrolet", "chevrolet"], ["Mitsubishi", "mitsubishi"],
  ["Nissan", "nissan"], ["Volkswagen", "volkswagen"], ["RAM", "ram"], ["Jeep", "jeep"],
] as const;

function stageFromProgress(progress: number) {
  if (progress >= .79) return "control";
  if (progress >= .53) return "compression";
  if (progress >= .26) return "terrain";
  return "hero";
}

type FlowVariant = "body-use" | "brands-engineering" | "engineering-lines" | "lines-results" | "results-authority" | "authority-cta" | "cta-faq" | "faq-footer";

function FlowConnector({ variant }: { variant: FlowVariant }) {
  return <div className={styles.flowConnector} data-flow={variant} aria-hidden="true">
    <div className={styles.flowSurface}/>
    <svg className={styles.flowTrace} viewBox="0 0 1600 260" preserveAspectRatio="none">
      <path className={styles.flowTraceBase} d="M-80 152 C170 38 340 230 545 142 S875 45 1080 154 S1395 230 1680 105"/>
      <path className={styles.flowTraceEnergy} d="M-80 152 C170 38 340 230 545 142 S875 45 1080 154 S1395 230 1680 105"/>
    </svg>
    <div className={styles.flowAxis}><i/><span/></div>
    <div className={styles.flowOrbit}><i/><i/><i/></div>
    <div className={styles.flowTicks}><i/><i/><i/><i/><i/><i/><i/></div>
  </div>;
}

export function ImpactJourney({ definitive = false }: { definitive?: boolean }) {
  const journeyRef = useRef<HTMLElement>(null);
  const bridgeRef = useRef<HTMLElement>(null);
  const frameRef = useRef<number | null>(null);
  const bridgeFrameRef = useRef<number | null>(null);
  const flowFrameRef = useRef<number | null>(null);
  const forceMotionRef = useRef(false);
  const [motionReduced, setMotionReduced] = useState(false);
  const [useId, setUseId] = useState<(typeof useCases)[number]["id"]>(useCases[0].id);
  const [lineIndex, setLineIndex] = useState(0);
  const useCase = useCases.find((item) => item.id === useId) ?? useCases[0];
  const useLine = getProductLine(useCase.line)!;
  const activeLine = productLines[lineIndex];

  const enableMotion = () => {
    forceMotionRef.current = true;
    document.body.classList.add("concept-force-motion");
    journeyRef.current?.setAttribute("data-force-motion", "true");
    setMotionReduced(false);
    window.dispatchEvent(new Event("resize"));
  };

  useEffect(() => {
    const body = document.body;
    const journey = journeyRef.current;
    if (!journey) return;

    body.classList.add("concept-mode");
    if (definitive) body.classList.add("concept-definitive");

    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const explicitReduced = new URLSearchParams(window.location.search).get("motion") === "reduce";
    if (!explicitReduced) {
      forceMotionRef.current = true;
      body.classList.add("concept-force-motion");
      journey.setAttribute("data-force-motion", "true");
    }

    const prefersReduced = () => !forceMotionRef.current && (explicitReduced || media.matches);
    let currentProgress = 0;
    let targetProgress = 0;
    let previousTime = performance.now();
    let initialized = false;
    let journeyVisible = true;
    let needsMeasure = true;
    let lastRendered = -1;
    let lastStage = journey.dataset.stage ?? "hero";

    const render = (progress: number, forcedStage?: (typeof stages)[number]["key"]) => {
      if (Math.abs(progress - lastRendered) >= .0005) {
        journey.style.setProperty("--journey", progress.toFixed(4));
        lastRendered = progress;
      }

      const stage = forcedStage ?? stageFromProgress(progress);
      if (stage !== lastStage) {
        journey.dataset.stage = stage;
        lastStage = stage;
      }
    };

    const measure = () => {
      const rect = journey.getBoundingClientRect();
      const distance = Math.max(journey.offsetHeight - window.innerHeight, 1);
      targetProgress = Math.min(1, Math.max(0, -rect.top / distance));
    };

    const tick = (time: number) => {
      frameRef.current = null;

      if (prefersReduced()) {
        currentProgress = .68;
        targetProgress = .68;
        render(.68, "control");
        return;
      }

      if (needsMeasure) {
        measure();
        needsMeasure = false;
        if (!initialized) {
          currentProgress = targetProgress;
          initialized = true;
        }
      }

      const delta = Math.min(Math.max(time - previousTime, 0), 64);
      previousTime = time;

      if (!journeyVisible) {
        currentProgress = targetProgress;
      } else {
        const alpha = 1 - Math.exp(-delta / 90);
        currentProgress += (targetProgress - currentProgress) * alpha;
      }

      if (Math.abs(targetProgress - currentProgress) < .0007) currentProgress = targetProgress;
      render(currentProgress);

      if (journeyVisible && Math.abs(targetProgress - currentProgress) >= .0007) {
        frameRef.current = requestAnimationFrame(tick);
      }
    };

    const schedule = () => {
      if (frameRef.current !== null) return;
      previousTime = performance.now();
      frameRef.current = requestAnimationFrame(tick);
    };

    const requestUpdate = () => {
      needsMeasure = true;
      if (journeyVisible) schedule();
    };

    const syncPreference = () => {
      initialized = false;
      needsMeasure = true;
      setMotionReduced(prefersReduced());
      schedule();
    };

    const journeyObserver = new IntersectionObserver(([entry]) => {
      journeyVisible = entry.isIntersecting;
      if (journeyVisible) journey.dataset.active = "true";
      else journey.removeAttribute("data-active");
      needsMeasure = true;
      schedule();
    }, { rootMargin: "160px 0px", threshold: 0 });
    journeyObserver.observe(journey);

    const revealObserver = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.target.toggleAttribute("data-visible", entry.isIntersecting)),
      { threshold: .12 },
    );
    document.querySelectorAll(`.${styles.experience} [data-reveal]`).forEach((node) => revealObserver.observe(node));

    syncPreference();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    media.addEventListener("change", syncPreference);

    return () => {
      body.classList.remove("concept-mode", "concept-definitive", "concept-force-motion");
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      media.removeEventListener("change", syncPreference);
      journeyObserver.disconnect();
      revealObserver.disconnect();
      journey.removeAttribute("data-active");
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    };
  }, [definitive]);

  useEffect(() => {
    const bridge = bridgeRef.current;
    if (!bridge) return;

    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const explicitReduced = new URLSearchParams(window.location.search).get("motion") === "reduce";
    const prefersReduced = () => !forceMotionRef.current && (explicitReduced || media.matches);
    let currentProgress = 0;
    let targetProgress = 0;
    let previousTime = performance.now();
    let initialized = false;
    let bridgeVisible = false;
    let needsMeasure = true;
    let lastRendered = -1;

    const render = (progress: number) => {
      if (Math.abs(progress - lastRendered) < .0005) return;
      bridge.style.setProperty("--bridge", progress.toFixed(4));
      lastRendered = progress;
    };

    const measure = () => {
      const rect = bridge.getBoundingClientRect();
      const distance = Math.max(bridge.offsetHeight + window.innerHeight, 1);
      targetProgress = Math.min(1, Math.max(0, (window.innerHeight - rect.top) / distance));
    };

    const tick = (time: number) => {
      bridgeFrameRef.current = null;

      if (prefersReduced()) {
        currentProgress = .72;
        targetProgress = .72;
        render(.72);
        return;
      }

      if (needsMeasure) {
        measure();
        needsMeasure = false;
        if (!initialized) {
          currentProgress = targetProgress;
          initialized = true;
        }
      }

      const delta = Math.min(Math.max(time - previousTime, 0), 64);
      previousTime = time;
      const alpha = 1 - Math.exp(-delta / 90);
      currentProgress += (targetProgress - currentProgress) * alpha;

      if (Math.abs(targetProgress - currentProgress) < .0007) currentProgress = targetProgress;
      render(currentProgress);

      if (bridgeVisible && Math.abs(targetProgress - currentProgress) >= .0007) {
        bridgeFrameRef.current = requestAnimationFrame(tick);
      }
    };

    const schedule = () => {
      if (bridgeFrameRef.current !== null) return;
      previousTime = performance.now();
      bridgeFrameRef.current = requestAnimationFrame(tick);
    };

    const requestUpdate = () => {
      if (!bridgeVisible) return;
      needsMeasure = true;
      schedule();
    };

    const syncPreference = () => {
      initialized = false;
      needsMeasure = true;
      schedule();
    };

    const observer = new IntersectionObserver(([entry]) => {
      bridgeVisible = entry.isIntersecting;
      if (bridgeVisible) {
        bridge.dataset.active = "true";
        needsMeasure = true;
        schedule();
      } else {
        bridge.removeAttribute("data-active");
        const restingProgress = entry.boundingClientRect.top < 0 ? 1 : 0;
        currentProgress = restingProgress;
        targetProgress = restingProgress;
        initialized = false;
        render(prefersReduced() ? .72 : restingProgress);
      }
    }, { rootMargin: "120px 0px", threshold: 0 });

    observer.observe(bridge);
    syncPreference();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    media.addEventListener("change", syncPreference);

    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      media.removeEventListener("change", syncPreference);
      observer.disconnect();
      bridge.removeAttribute("data-active");
      if (bridgeFrameRef.current !== null) cancelAnimationFrame(bridgeFrameRef.current);
    };
  }, []);

  useEffect(() => {
    const connectors = Array.from(document.querySelectorAll<HTMLElement>(`.${styles.experience} [data-flow]`));
    if (!connectors.length) return;

    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const explicitReduced = new URLSearchParams(window.location.search).get("motion") === "reduce";
    const prefersReduced = () => !forceMotionRef.current && (explicitReduced || media.matches);
    const states = new Map(connectors.map((node) => [node, {
      current: 0,
      target: 0,
      visible: false,
      needsMeasure: true,
      initialized: false,
      lastRendered: -1,
    }]));
    let previousTime = performance.now();

    const render = (node: HTMLElement, progress: number) => {
      const state = states.get(node)!;
      if (Math.abs(progress - state.lastRendered) < .0005) return;
      node.style.setProperty("--flow", progress.toFixed(4));
      state.lastRendered = progress;
    };

    const measure = (node: HTMLElement) => {
      const state = states.get(node)!;
      const rect = node.getBoundingClientRect();
      const distance = Math.max(node.offsetHeight + window.innerHeight, 1);
      state.target = Math.min(1, Math.max(0, (window.innerHeight - rect.top) / distance));
    };

    const tick = (time: number) => {
      flowFrameRef.current = null;

      if (prefersReduced()) {
        connectors.forEach((node) => {
          const state = states.get(node)!;
          state.current = .72;
          state.target = .72;
          render(node, .72);
        });
        return;
      }

      const delta = Math.min(Math.max(time - previousTime, 0), 64);
      previousTime = time;
      const alpha = 1 - Math.exp(-delta / 90);
      let keepAnimating = false;

      connectors.forEach((node) => {
        const state = states.get(node)!;
        if (!state.visible) return;

        if (state.needsMeasure) {
          measure(node);
          state.needsMeasure = false;
          if (!state.initialized) {
            state.current = state.target;
            state.initialized = true;
          }
        }

        state.current += (state.target - state.current) * alpha;
        if (Math.abs(state.target - state.current) < .0007) state.current = state.target;
        render(node, state.current);
        if (Math.abs(state.target - state.current) >= .0007) keepAnimating = true;
      });

      if (keepAnimating) flowFrameRef.current = requestAnimationFrame(tick);
    };

    const schedule = () => {
      if (flowFrameRef.current !== null) return;
      previousTime = performance.now();
      flowFrameRef.current = requestAnimationFrame(tick);
    };

    const requestUpdate = () => {
      let hasVisibleConnector = false;
      states.forEach((state) => {
        if (!state.visible) return;
        state.needsMeasure = true;
        hasVisibleConnector = true;
      });
      if (hasVisibleConnector) schedule();
    };

    const syncPreference = () => {
      states.forEach((state) => {
        state.initialized = false;
        state.needsMeasure = true;
      });
      schedule();
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const node = entry.target as HTMLElement;
        const state = states.get(node)!;
        state.visible = entry.isIntersecting;
        if (state.visible) {
          node.dataset.active = "true";
          state.needsMeasure = true;
          schedule();
        } else {
          node.removeAttribute("data-active");
          const restingProgress = entry.boundingClientRect.top < 0 ? 1 : 0;
          state.current = restingProgress;
          state.target = restingProgress;
          state.initialized = false;
          render(node, prefersReduced() ? .72 : restingProgress);
        }
      });
    }, { rootMargin: "100px 0px", threshold: 0 });

    connectors.forEach((node) => observer.observe(node));
    syncPreference();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    media.addEventListener("change", syncPreference);

    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      media.removeEventListener("change", syncPreference);
      observer.disconnect();
      connectors.forEach((node) => node.removeAttribute("data-active"));
      if (flowFrameRef.current !== null) cancelAnimationFrame(flowFrameRef.current);
    };
  }, []);

  return <div className={styles.experience} data-motion={motionReduced ? "reduced" : "full"}>
    {definitive && motionReduced && <button type="button" className={styles.motionToggleStandalone} onClick={enableMotion}>Ativar movimento</button>}
    {!definitive && <header className={styles.topbar}>
      <Link href="/" className={styles.brand} aria-label="BUMP Amortecedores"><Image src="/brand/bump-logo.png" alt="" width={180} height={53} priority className={styles.brandLogo}/></Link>
      <nav className={styles.miniNav}><a href="#rotina">Rotina</a><a href="#engenharia">Engenharia</a><a href="#linhas">Linhas</a><a href="#resultados">400 mil km</a></nav>
      <div className={styles.topActions}>{motionReduced && <button type="button" className={styles.motionToggle} onClick={enableMotion}>Ativar movimento</button>}<Link href="/" className={styles.exit}>Sair ↗</Link></div>
    </header>}

    <section ref={journeyRef} className={styles.journey} data-stage="hero">
      <div className={styles.sticky}>
        <div className={styles.grid}/><div className={styles.noise}/>
        <div className={styles.truckLayer}><Image src={`${ASSET_BASE}/amortecedores/hero.png`} alt="Picape atravessando terreno irregular" fill priority sizes="100vw" className={styles.truckImage}/><div className={styles.truckShade}/></div>
        <svg className={styles.terrain} viewBox="0 0 1600 300" preserveAspectRatio="none" aria-hidden="true"><path className={styles.terrainGhost} d="M0 180 C150 120 250 235 390 175 S650 110 770 190 S1030 240 1160 150 S1430 100 1600 185"/><path className={styles.terrainLine} d="M0 180 C150 120 250 235 390 175 S650 110 770 190 S1030 240 1160 150 S1430 100 1600 185"/></svg>
        <div className={styles.impactPulse}><span/><span/><span/></div>
        <div className={styles.productStage}><div className={styles.productHalo}/><Image src={productLines[2].image} alt="Amortecedor BUMP Premium em visualização conceitual" fill sizes="(min-width:900px) 48vw,88vw" className={styles.productImage}/><div className={styles.compressionScale}><span>EXTENSÃO</span><i/><span>COMPRESSÃO</span></div></div>
        <div className={styles.energyPath}><span/><span/><span/></div>
        <nav className={styles.stageRail}>{stages.map((stage) => <div key={stage.key} className={styles.railItem} data-key={stage.key}><span>{stage.number}</span><i/><strong>{stage.label}</strong></div>)}</nav>
        <div className={styles.chapters}>{stages.map((stage) => <article key={stage.key} className={styles.chapter} data-key={stage.key}><p className={styles.eyebrow}>{stage.number} · {stage.label}</p><h1>{stage.title}</h1><p className={styles.description}>{stage.text}</p>{stage.key === "hero" && <div className={styles.heroActions}><Link href="/configurador" className={styles.primaryAction}>Montar meu amortecedor</Link><a href="#rotina" className={styles.heroSecondaryAction}>Acompanhar a força</a><span>Role para entrar no sistema</span></div>}</article>)}</div>
        <div className={styles.journeyExit} aria-hidden="true"><i/><span>ENERGIA CONTROLADA</span></div>
        <div className={styles.progress}><span/></div>
      </div>
    </section>

    <section ref={bridgeRef} className={styles.energyBridge} aria-hidden="true">
      <div className={styles.bridgeGrid}/>
      <div className={styles.bridgeSurface}/>
      <div className={styles.bridgeBeam}><i/><span/></div>
      <svg className={styles.bridgeWave} viewBox="0 0 1600 260" preserveAspectRatio="none">
        <path className={styles.bridgeWaveGhost} d="M0 150 C180 65 330 235 520 145 S850 60 1040 155 S1390 230 1600 120"/>
        <path className={styles.bridgeWaveEnergy} d="M0 150 C180 65 330 235 520 145 S850 60 1040 155 S1390 230 1600 120"/>
      </svg>
      <div className={styles.bridgeTransfer}><span>04 · CONTROLE</span><i/><strong>05 · O CORPO</strong></div>
    </section>

    <section className={styles.promise}>
      <div className={styles.promiseEntry} aria-hidden="true"><i/><span/></div>
      <div className={styles.promiseLead} data-reveal><p className={styles.sectionCode}>05 · O corpo</p><h2>A última peça do sistema não é de metal.</h2></div>
      <div className={styles.bodyGrid} data-reveal><p><strong>Não existe uma pressão única para toda picape.</strong> Seu uso não é igual ao de outra picape, e seu amortecedor também não deveria ser. A BUMP calibra construção, pressão e curso para o peso, a altura e a rotina reais: menos impacto acumulado no corpo, mais estabilidade com carga e mais controle quando o asfalto termina.</p><div className={styles.wave}><i/><i/><i/><span>IMPACTO ENTRA</span><b>ENERGIA CONTROLADA</b></div></div>
      <div className={styles.trust} data-reveal>{[["13+","anos de fábrica"],["2 anos","contra vazamento"],["Sob medida","veículo e uso"],["Brasil","produção própria"],["Envio","nacional"]].map(([a,b])=><div key={b}><strong>{a}</strong><span>{b}</span></div>)}</div>
    </section>

    <FlowConnector variant="body-use"/>

    <section id="rotina" className={styles.uses}>
      <div className={styles.sectionIntro} data-reveal><p className={styles.sectionCode}>06 · O uso define o acerto</p><h2>Qual chão repete no seu corpo todo dia?</h2><p>Escolha a rotina. A cena, o produto e o ponto de partida mudam juntos.</p></div>
      <div className={styles.useTabs}>{useCases.map((item)=><button key={item.id} type="button" data-active={item.id===useId} onClick={()=>setUseId(item.id)}><span>{item.number}</span>{item.label}</button>)}<Link href="/configurador?uso=projeto"><span>05</span>Projeto especial ↗</Link></div>
      <article className={styles.useScene} key={useId}>
        <Image src={useImages[useId]} alt={`Picape em cenário de ${useCase.label.toLowerCase()}`} fill sizes="100vw" className={styles.useBackground}/><div className={styles.useShade}/>
        <div className={styles.useCopy}><p>Recomendado para {useCase.label}</p><h3 className={useLine.shortName.length > 8 ? styles.compactProductName : undefined}>{useLine.shortName}</h3><span>{useCase.description} {useLine.description}</span><small className={styles.investmentNote}>O investimento é definido após confirmar veículo, linha e configuração. O valor final é apresentado no orçamento técnico.</small><div><Link className={styles.primaryAction} href={`/configurador?linha=${useLine.slug}&uso=${useId}`}>Montar essa linha</Link><Link href={`/linhas/${useLine.slug}`}>Ver detalhes ↗</Link></div></div>
        <div className={styles.useProduct}><Image src={useLine.image} alt={useLine.name} fill sizes="(min-width:900px) 42vw,85vw"/></div>
      </article>
    </section>

    <section className={styles.brands}><p>Picapes que encontram seu acerto</p><div className={styles.marquee} aria-label={brandMarks.map(([name]) => name).join(", ")}><div>{[...brandMarks,...brandMarks].map(([name,slug],i)=><span className={styles.brandMark} key={`${slug}-${i}`}><Image src={`/brands/${slug}.svg`} alt="" width={72} height={44} loading="eager" unoptimized className={styles.brandMarkLogo}/><b>{name}</b></span>)}</div></div></section>

    <FlowConnector variant="brands-engineering"/>

    <section id="engenharia" className={styles.engineering}>
      <div className={styles.engineeringVisual}><div className={styles.fluid}><i/><i/><i/><i/><i/></div><Image src={productLines[2].image} alt="Vista técnica do amortecedor BUMP" fill sizes="50vw"/><span>PRESSÃO → FLUIDO → RETORNO</span></div>
      <div className={styles.engineeringCopy}><div className={styles.sectionIntro} data-reveal><p className={styles.sectionCode}>07 · Dentro do amortecedor</p><h2>A engenharia só termina quando chega ao corpo.</h2></div>{technology.map(([n,title,text])=><article key={n} data-reveal><span>{n}</span><div><h3>{title}</h3><p>{text}</p></div></article>)}<Link href="/tecnologia">Entender toda a engenharia ↗</Link></div>
    </section>

    <FlowConnector variant="engineering-lines"/>

    <section id="linhas" className={styles.lines}>
      <div className={styles.sectionIntro} data-reveal><p className={styles.sectionCode}>08 · Anatomia das linhas</p><h2>Seis respostas. A força nunca é a mesma.</h2></div>
      <div className={styles.lineStage}>
        <button type="button" onClick={()=>setLineIndex((lineIndex+productLines.length-1)%productLines.length)} aria-label="Linha anterior">←</button>
        <div className={styles.lineProduct} key={activeLine.slug}><span>{activeLine.code}</span><Image src={activeLine.image} alt={activeLine.name} fill sizes="(min-width:900px) 48vw,90vw"/></div>
        <div className={styles.lineCopy}><p>{activeLine.badge}</p><h3 className={activeLine.shortName.length > 8 ? styles.compactProductName : undefined}>{activeLine.shortName}</h3><strong>{activeLine.headline}</strong><span>{activeLine.description}</span><Link href={`/linhas/${activeLine.slug}`}>Explorar a linha ↗</Link></div>
        <button type="button" onClick={()=>setLineIndex((lineIndex+1)%productLines.length)} aria-label="Próxima linha">→</button>
      </div>
      <div className={styles.lineIndex}>{productLines.map((line,i)=><button type="button" data-active={i===lineIndex} onClick={()=>setLineIndex(i)} key={line.slug}>{line.code}<strong>{line.shortName}</strong></button>)}</div>
    </section>

    <FlowConnector variant="lines-results"/>

    <section id="resultados" className={styles.durability}>
      <div className={styles.odometer} data-reveal><span>CASO REAL · NÃO É GARANTIA UNIVERSAL</span><strong>400.000</strong><b>km</b></div>
      <div className={styles.durabilityCopy} data-reveal><p className={styles.sectionCode}>09 · O tempo volta para a fábrica</p><h2>Não virou descarte. Voltou ao trabalho.</h2><p>Um equipamento real foi desmontado, inspecionado, recuperado e devolvido ao uso. O caso comprova a lógica recuperável da construção. Não promete a mesma quilometragem para toda aplicação.</p><Link href="/resultados">Ver o caso com contexto ↗</Link></div>
      <div className={styles.recovery}>{["Desmontar","Inspecionar","Recuperar","Retornar"].map((item,i)=><div key={item}><span>0{i+1}</span><i/>{item}</div>)}</div>
    </section>

    <FlowConnector variant="results-authority"/>

    <section className={styles.authority}>
      <div className={styles.sectionIntro} data-reveal><p className={styles.sectionCode}>10 · Autoridade com autoria</p><h2>Cristian: piloto antes de fabricante, especialista à frente do projeto.</h2></div>
      <div className={styles.authorityGrid}><article data-reveal><span>CENÁRIO DE APLICAÇÃO</span><h3>Experiência que virou método.</h3><p>Cristian levou o que sentia no volante para a engenharia e para a fábrica. É ele quem define como cada conjunto responde ao peso, à altura e ao terreno informados.</p><Link href="/quem-somos">Conhecer a história ↗</Link></article><article data-reveal><span>EVIDÊNCIA DECLARADA · LIMITES EXPLÍCITOS</span><h3>A fábrica continua depois da escolha.</h3><p>Produção própria no Brasil, projeto sob medida, 2 anos contra vazamento e construção que pode voltar à fábrica para recuperação.</p><Link href="/resultados">Ver evidências ↗</Link></article></div>
    </section>

    <FlowConnector variant="authority-cta"/>

    <section className={styles.finalCta}>
      <Image src={`${ASSET_BASE}/banco_web_800/triton.webp`} alt="Picape pronta para o próximo terreno" fill sizes="100vw"/><div/><div className={styles.finalCopy} data-reveal><p className={styles.sectionCode}>11 · O próximo chão</p><h2>A estrada pode continuar ruim. Seu corpo não precisa repetir tudo.</h2><p>Conte o veículo, a carga e a rotina. A fábrica transforma contexto em um ponto de partida técnico.</p><div className={styles.finalActions}><Link href="/configurador" className={styles.primaryAction}>Montar para o meu chão</Link><Link href="/contato" className={styles.finalSecondaryAction}>Falar com a BUMP</Link></div></div>
    </section>

    <FlowConnector variant="cta-faq"/>

    <section className={styles.faq}>
      <div className={styles.sectionIntro} data-reveal><p className={styles.sectionCode}>12 · Antes de decidir</p><h2>Perguntas que também fazem parte do projeto.</h2></div>
      <div className={styles.faqList}>{faqItems.slice(0,5).map((item,i)=><details key={item.question} data-reveal><summary><span>0{i+1}</span>{item.question}<i>+</i></summary><p>{item.answer}</p></details>)}</div>
      <div className={styles.faqActions}><Link href="/faq">Ver todas as dúvidas ↗</Link><Link href="/contato">Falar com a BUMP ↗</Link></div>
    </section>

    <FlowConnector variant="faq-footer"/>

    {!definitive && <footer className={styles.conceptFooter}><Image src="/brand/bump-logo.png" alt="BUMP Amortecedores" width={180} height={53} className={styles.footerLogo}/><span>DO CHÃO AO CORPO · CONCEITO V0.2</span><Link href="/">Voltar ao site atual ↗</Link></footer>}
  </div>;
}
