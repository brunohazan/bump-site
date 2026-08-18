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

const leanTechnology = [
  ["01", "Corpo duplo + monotubo", "Mais volume de fluido, proteção externa e resposta consistente quando a jornada se estende."],
  ["02", "Pressão sob medida", "Veículo, carga, altura e uso orientam o acerto. Não existe uma pressão única para toda picape."],
  ["03", "Recuperável", "O equipamento pode voltar à fábrica para desmontagem, inspeção e recuperação."],
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
type RoadSurface = "dirt" | "mud" | "cobble";
type RoadCamera = "tilt" | "diagonal" | "low";
type RoadScene = { surface: RoadSurface; camera: RoadCamera; path: string };
type PickupScene = { motion: "exit" | "cross"; width: number };

const flowPath = "M-80 152 C170 38 340 230 545 142 S875 45 1080 154 S1395 230 1680 105";
const roadSceneByFlow: Partial<Record<FlowVariant, RoadScene>> = {
  "body-use": { surface: "dirt", camera: "tilt", path: "M-180 238 C110 28 405 44 690 158 S1180 270 1780 64" },
};
const pickupSceneByFlow: Partial<Record<FlowVariant, PickupScene>> = {
  "body-use": { motion: "exit", width: 96 },
};

function FlowConnector({ variant }: { variant: FlowVariant }) {
  const roadScene = roadSceneByFlow[variant];
  const pickupScene = pickupSceneByFlow[variant];
  const textureId = `road-texture-${variant}`;
  const dustId = `road-dust-${variant}`;

  return <div className={styles.flowConnector} data-flow={variant} data-road-surface={roadScene?.surface} data-road-camera={roadScene?.camera} aria-hidden="true">
    <div className={styles.flowSurface}/>
    {roadScene && <div className={styles.flowRoadWorld}>
      <div className={styles.flowRoadAtmosphere}/>
      <div className={styles.flowRoadFar}/>
      <svg className={styles.flowRoadScene} viewBox="0 0 1600 360" preserveAspectRatio="none">
        <defs>
          <pattern id={textureId} width={roadScene.surface === "cobble" ? 128 : 180} height={roadScene.surface === "cobble" ? 80 : 124} patternUnits="userSpaceOnUse" patternTransform={roadScene.surface === "cobble" ? "scale(.72)" : roadScene.surface === "dirt" ? "scale(.78) rotate(-2)" : "scale(.82)"}>
            {roadScene.surface === "dirt" && <>
              <ellipse cx="24" cy="19" rx="24" ry="7" fill="#392619" opacity=".2" transform="rotate(-9 24 19)"/>
              <ellipse cx="83" cy="43" rx="31" ry="9" fill="#9c7042" opacity=".18" transform="rotate(7 83 43)"/>
              <ellipse cx="145" cy="22" rx="26" ry="8" fill="#402b1b" opacity=".17" transform="rotate(-5 145 22)"/>
              <ellipse cx="41" cy="91" rx="34" ry="10" fill="#a67a49" opacity=".2" transform="rotate(4 41 91)"/>
              <ellipse cx="130" cy="96" rx="37" ry="11" fill="#3a2718" opacity=".16" transform="rotate(-7 130 96)"/>
              <path d="M99 13 C110 5 126 8 132 17 S126 34 111 33 91 23 99 13Z" fill="#b08350" opacity=".18"/>
              <circle cx="18" cy="60" r="2.2" fill="#c19760" opacity=".38"/><circle cx="67" cy="17" r="1.6" fill="#2e1f13" opacity=".42"/>
              <circle cx="105" cy="73" r="2.4" fill="#c69a61" opacity=".3"/><circle cx="163" cy="55" r="1.8" fill="#382516" opacity=".4"/>
              <circle cx="74" cy="112" r="1.5" fill="#d0a46c" opacity=".32"/><circle cx="151" cy="116" r="2" fill="#2f2015" opacity=".38"/>
            </>}
            {roadScene.surface === "mud" && <>
              <ellipse cx="25" cy="22" rx="30" ry="8" fill="#10110e" opacity=".48" transform="rotate(-5 25 22)"/>
              <ellipse cx="101" cy="19" rx="24" ry="6" fill="#67736e" opacity=".13" transform="rotate(4 101 19)"/>
              <ellipse cx="151" cy="49" rx="38" ry="9" fill="#0b0c0a" opacity=".42" transform="rotate(-6 151 49)"/>
              <ellipse cx="54" cy="72" rx="42" ry="10" fill="#87938e" opacity=".12" transform="rotate(3 54 72)"/>
              <ellipse cx="122" cy="101" rx="46" ry="12" fill="#171713" opacity=".46" transform="rotate(-4 122 101)"/>
              <path d="M4 104 C17 94 37 97 43 108 S33 125 17 122 0 114 4 104Z" fill="#554c3e" opacity=".3"/>
              <circle cx="78" cy="45" r="2" fill="#9ca8a3" opacity=".18"/><circle cx="169" cy="91" r="1.8" fill="#aab5b1" opacity=".16"/>
            </>}
            {roadScene.surface === "cobble" && <>
              <path d="M3 5 38 3 43 29 7 32 1 23Z" fill="#777a70" stroke="#3e413b" strokeWidth="2"/>
              <path d="M47 4 82 7 80 32 46 29 43 17Z" fill="#929488" stroke="#464942" strokeWidth="2"/>
              <path d="M87 6 124 3 130 23 120 32 85 29Z" fill="#696c63" stroke="#383b35" strokeWidth="2"/>
              <path d="M-17 40 20 36 29 61 19 72-15 68Z" fill="#898b80" stroke="#42453e" strokeWidth="2"/>
              <path d="M33 38 70 35 76 61 66 72 29 68Z" fill="#686b62" stroke="#383b35" strokeWidth="2"/>
              <path d="M80 38 116 36 126 57 116 71 79 68 73 51Z" fill="#a0a296" stroke="#4a4d45" strokeWidth="2"/>
              <path d="M123 38 148 41 151 66 124 72 117 57Z" fill="#74776d" stroke="#3d4039" strokeWidth="2"/>
              <path d="M13 11 34 9" stroke="#b8baad" strokeWidth="2" opacity=".3"/><path d="M91 45 113 43" stroke="#c5c6ba" strokeWidth="2" opacity=".25"/>
            </>}
          </pattern>
          {pickupScene && <radialGradient id={dustId}>
            <stop offset="0" stopColor="#f0ddb5" stopOpacity=".9"/>
            <stop offset=".52" stopColor="#cdb17c" stopOpacity=".5"/>
            <stop offset="1" stopColor="#8e784f" stopOpacity="0"/>
          </radialGradient>}
        </defs>
        <path className={styles.flowRoadShadow} d={roadScene.path}/>
        <path className={styles.flowRoadShoulder} d={roadScene.path}/>
        <path className={styles.flowRoadBed} data-road-path d={roadScene.path}/>
        <path className={styles.flowRoadTexture} d={roadScene.path} stroke={`url(#${textureId})`}/>
        <path className={styles.flowRoadTrack} data-track="left" d={roadScene.path} transform="translate(0 -22)"/>
        <path className={styles.flowRoadTrack} data-track="right" d={roadScene.path} transform="translate(0 22)"/>
        <path className={styles.flowRoadEnergy} d={roadScene.path}/>
        {pickupScene && <g
          className={styles.flowPickupMotion}
          data-road-pickup
          data-pickup-motion={pickupScene.motion}
          opacity="0"
        >
          <g className={styles.flowPickupDust} data-road-pickup-dust>
            <ellipse cx="-34" cy="-11" rx="30" ry="18" fill={`url(#${dustId})`}/>
            <ellipse cx="-44" cy="11" rx="24" ry="14" fill={`url(#${dustId})`}/>
            <ellipse cx="-58" cy="1" rx="18" ry="11" fill={`url(#${dustId})`}/>
          </g>
          <ellipse
            className={styles.flowPickupShadow}
            cx="-2"
            cy="3"
            rx={pickupScene.width * .43}
            ry={pickupScene.width * .16}
          />
          <g className={styles.flowPickupBody} data-road-pickup-body>
            <image
              className={styles.flowPickupImage}
              data-road-pickup-image
              x={-pickupScene.width / 2}
              y={-(pickupScene.width / (1200 / 542)) / 2}
              width={pickupScene.width}
              height={pickupScene.width / (1200 / 542)}
              preserveAspectRatio="xMidYMid meet"
            />
          </g>
        </g>}
      </svg>
      <div className={styles.flowDetails}>{Array.from({ length: 8 }, (_, index) => <i key={index}/>)}</div>
      <div className={styles.flowRoadNear}>{Array.from({ length: 5 }, (_, index) => <i key={index}/>)}</div>
    </div>}
    <svg className={styles.flowTrace} viewBox="0 0 1600 260" preserveAspectRatio="none">
      <path className={styles.flowTraceBase} d={flowPath}/>
      <path className={styles.flowTraceEnergy} d={flowPath}/>
    </svg>
    <div className={styles.flowAxis}><i/><span/></div>
    <div className={styles.flowOrbit}><i/><i/><i/></div>
    <div className={styles.flowTicks}><i/><i/><i/><i/><i/><i/><i/></div>
  </div>;
}

export function ImpactJourney({ definitive = false, lean = false }: { definitive?: boolean; lean?: boolean }) {
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
  const useIdx = useCases.findIndex((item) => item.id === useId);
  const sc = (text: string) => (lean ? text.replace(/^\d+\s*·\s*/, "") : text);
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
    if (lean) body.classList.add("concept-lean");

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
      body.classList.remove("concept-mode", "concept-definitive", "concept-force-motion", "concept-lean");
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      media.removeEventListener("change", syncPreference);
      journeyObserver.disconnect();
      revealObserver.disconnect();
      journey.removeAttribute("data-active");
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    };
  }, [definitive, lean]);

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
    const states = new Map(connectors.map((node) => {
      const pickupPath = node.querySelector<SVGPathElement>("[data-road-path]");
      return [node, {
        current: 0,
        target: 0,
        pickupCurrent: 0,
        visible: false,
        needsMeasure: true,
        initialized: false,
        lastRendered: -1,
        lastPickupRendered: -1,
        pickupPath,
        pickupLength: pickupPath?.getTotalLength() ?? 0,
        pickup: node.querySelector<SVGGElement>("[data-road-pickup]"),
        pickupBody: node.querySelector<SVGGElement>("[data-road-pickup-body]"),
        pickupImage: node.querySelector<SVGImageElement>("[data-road-pickup-image]"),
        pickupDust: Array.from(node.querySelectorAll<SVGEllipseElement>("[data-road-pickup-dust] ellipse")),
      }];
    }));
    const desktopMedia = window.matchMedia("(min-width: 901px)");
    const syncPickupAssets = () => {
      states.forEach((state) => {
        if (!state.pickupImage) return;
        if (desktopMedia.matches) state.pickupImage.setAttribute("href", "/media/pickup-top.webp");
        else state.pickupImage.removeAttribute("href");
      });
    };
    syncPickupAssets();
    let previousTime = performance.now();
    const clamp01 = (value: number) => Math.min(1, Math.max(0, value));
    const smoothstep = (value: number) => {
      const clamped = clamp01(value);
      return clamped * clamped * (3 - 2 * clamped);
    };

    const render = (node: HTMLElement, progress: number, pickupProgress = progress) => {
      const state = states.get(node)!;
      const flowChanged = Math.abs(progress - state.lastRendered) >= .0005;
      const pickupChanged = Math.abs(pickupProgress - state.lastPickupRendered) >= .0005;
      if (!flowChanged && !pickupChanged) return;
      if (flowChanged) node.style.setProperty("--flow", progress.toFixed(4));

      if (state.pickup && state.pickupBody && state.pickupPath && state.pickupLength) {
        const exits = node.dataset.flow === "body-use";
        const rawPhase = exits
          ? (pickupProgress - .08) / .62
          : (pickupProgress - .02) / .62;
        const phase = clamp01(rawPhase);
        const travel = exits ? .5 + phase * .5 : phase;
        const distance = travel * state.pickupLength;
        const tangentDelta = Math.max(state.pickupLength * .003, 2);
        const point = state.pickupPath.getPointAtLength(distance);
        const before = state.pickupPath.getPointAtLength(Math.max(0, distance - tangentDelta));
        const after = state.pickupPath.getPointAtLength(Math.min(state.pickupLength, distance + tangentDelta));
        const tangent = Math.atan2(after.y - before.y, after.x - before.x) * 180 / Math.PI;
        const tangentRadians = tangent * Math.PI / 180;
        const laneOffset = exits
          ? -16
          : -55 + smoothstep((phase - .25) / .45) * 150;
        const vehicleX = point.x - Math.sin(tangentRadians) * laneOffset;
        const vehicleY = point.y + Math.cos(tangentRadians) * laneOffset;
        const fadeIn = smoothstep(phase / .11);
        const fadeOut = smoothstep((1 - phase) / (exits ? .15 : .1));
        const opacity = fadeIn * fadeOut;
        const terrainCycles = exits ? 8.5 : 11.5;
        const wave = phase * Math.PI * 2 * terrainCycles;
        const bob = Math.sin(wave) * (exits ? 1.05 : .72) + Math.sin(wave * .43 + .8) * .32;
        const roll = Math.sin(wave * .72 + .35) * (exits ? 1.15 : .82);
        const compression = Math.sin(wave * 1.18) * .008;

        state.pickup.setAttribute(
          "transform",
          `translate(${vehicleX.toFixed(2)} ${vehicleY.toFixed(2)}) rotate(${tangent.toFixed(2)})`,
        );
        state.pickup.setAttribute("opacity", opacity.toFixed(3));
        state.pickupBody.setAttribute(
          "transform",
          `translate(0 ${bob.toFixed(2)}) rotate(${roll.toFixed(2)}) scale(${(1 + compression).toFixed(4)} ${(1 - compression).toFixed(4)})`,
        );

        state.pickupDust.forEach((puff, index) => {
          const puffPhase = (phase * 3.15 + index * .27) % 1;
          const drift = 5 + puffPhase * 42;
          const spread = .62 + puffPhase * .92;
          const crosswind = Math.sin((phase + index * .31) * Math.PI * 4) * (3 + index);
          const dustStrength = exits ? .62 : .64;
          const puffOpacity = opacity
            * Math.pow(1 - puffPhase, 1.2)
            * (dustStrength - index * .045);
          puff.setAttribute(
            "transform",
            `translate(${-drift.toFixed(2)} ${crosswind.toFixed(2)}) scale(${spread.toFixed(3)})`,
          );
          puff.setAttribute("opacity", puffOpacity.toFixed(3));
        });
      }

      state.lastRendered = progress;
      state.lastPickupRendered = pickupProgress;
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
          state.pickupCurrent = .72;
          render(node, .72, .72);
        });
        return;
      }

      const delta = Math.min(Math.max(time - previousTime, 0), 64);
      previousTime = time;
      const alpha = 1 - Math.exp(-delta / 90);
      const pickupAlpha = 1 - Math.exp(-delta / 300);
      let keepAnimating = false;

      connectors.forEach((node) => {
        const state = states.get(node)!;
        if (!state.visible) return;

        if (state.needsMeasure) {
          measure(node);
          state.needsMeasure = false;
          if (!state.initialized) {
            state.current = state.target;
            state.pickupCurrent = state.target;
            state.initialized = true;
          }
        }

        state.current += (state.target - state.current) * alpha;
        if (Math.abs(state.target - state.current) < .0007) state.current = state.target;

        if (state.pickup) {
          state.pickupCurrent += (state.current - state.pickupCurrent) * pickupAlpha;
          if (Math.abs(state.current - state.pickupCurrent) < .0007) state.pickupCurrent = state.current;
        } else {
          state.pickupCurrent = state.current;
        }

        render(node, state.current, state.pickupCurrent);
        const flowMoving = Math.abs(state.target - state.current) >= .0007;
        const pickupMoving = Boolean(state.pickup) && Math.abs(state.current - state.pickupCurrent) >= .0007;
        if (flowMoving || pickupMoving) keepAnimating = true;
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
          state.pickupCurrent = restingProgress;
          state.initialized = false;
          const restingRender = prefersReduced() ? .72 : restingProgress;
          render(node, restingRender, restingRender);
        }
      });
    }, { rootMargin: "100px 0px", threshold: 0 });

    connectors.forEach((node) => observer.observe(node));
    syncPreference();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    media.addEventListener("change", syncPreference);
    desktopMedia.addEventListener("change", syncPickupAssets);

    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      media.removeEventListener("change", syncPreference);
      desktopMedia.removeEventListener("change", syncPickupAssets);
      observer.disconnect();
      connectors.forEach((node) => node.removeAttribute("data-active"));
      if (flowFrameRef.current !== null) cancelAnimationFrame(flowFrameRef.current);
    };
  }, []);

  return <div className={styles.experience} data-motion={motionReduced ? "reduced" : "full"} data-lean={lean ? "true" : undefined}>
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
        {!lean && <svg className={styles.terrain} viewBox="0 0 1600 300" preserveAspectRatio="none" aria-hidden="true"><path className={styles.heroRoadShadow} d="M0 180 C150 120 250 235 390 175 S650 110 770 190 S1030 240 1160 150 S1430 100 1600 185"/><path className={styles.heroRoadShoulder} d="M0 180 C150 120 250 235 390 175 S650 110 770 190 S1030 240 1160 150 S1430 100 1600 185"/><path className={styles.heroRoadBed} d="M0 180 C150 120 250 235 390 175 S650 110 770 190 S1030 240 1160 150 S1430 100 1600 185"/><path className={styles.heroRoadMarkings} d="M0 180 C150 120 250 235 390 175 S650 110 770 190 S1030 240 1160 150 S1430 100 1600 185"/><path className={styles.terrainGhost} d="M0 180 C150 120 250 235 390 175 S650 110 770 190 S1030 240 1160 150 S1430 100 1600 185"/><path className={styles.terrainLine} d="M0 180 C150 120 250 235 390 175 S650 110 770 190 S1030 240 1160 150 S1430 100 1600 185"/></svg>}
        <div className={styles.impactPulse}><span/><span/><span/></div>
        {!lean && <div className={styles.productStage}><div className={styles.productHalo}/><Image src={productLines[2].image} alt="Amortecedor BUMP Premium em visualização conceitual" fill sizes="(min-width:900px) 48vw,88vw" className={styles.productImage}/><div className={styles.compressionScale}><span>EXTENSÃO</span><i/><span>COMPRESSÃO</span></div></div>}
        <div className={styles.energyPath}><span/><span/><span/></div>
        {!lean && <nav className={styles.stageRail}>{stages.map((stage) => <div key={stage.key} className={styles.railItem} data-key={stage.key}><span>{stage.number}</span><i/><strong>{stage.label}</strong></div>)}</nav>}
        <div className={styles.chapters}>{stages.map((stage) => <article key={stage.key} className={styles.chapter} data-key={stage.key}>{!lean && <p className={styles.eyebrow}>{stage.number} · {stage.label}</p>}<h1>{stage.title}</h1><p className={styles.description}>{stage.text}</p>{stage.key === "hero" && <div className={styles.heroActions}><Link href="/configurador" className={styles.primaryAction}>Montar meu amortecedor</Link>{!lean && <a href="#rotina" className={styles.heroSecondaryAction}>Acompanhar a força</a>}{!lean && <span>Role para entrar no sistema</span>}</div>}</article>)}</div>
        {!lean && <div className={styles.journeyExit} aria-hidden="true"><i/><span>ENERGIA CONTROLADA</span></div>}
        <div className={styles.progress}><span/></div>
      </div>
    </section>

    {!lean && <section ref={bridgeRef} className={styles.energyBridge} aria-hidden="true">
      <div className={styles.bridgeGrid}/>
      <div className={styles.bridgeSurface}/>
      <div className={styles.bridgeBeam}><i/><span/></div>
      <svg className={styles.bridgeWave} viewBox="0 0 1600 260" preserveAspectRatio="none">
        <path className={styles.bridgeWaveGhost} d="M0 150 C180 65 330 235 520 145 S850 60 1040 155 S1390 230 1600 120"/>
        <path className={styles.bridgeWaveEnergy} d="M0 150 C180 65 330 235 520 145 S850 60 1040 155 S1390 230 1600 120"/>
      </svg>
      <div className={styles.bridgeTransfer}><span>04 · CONTROLE</span><i/><strong>05 · O CORPO</strong></div>
    </section>}

    <section className={styles.promise}>
      <div className={styles.promiseEntry} aria-hidden="true"><i/><span/></div>
      <div className={styles.promiseLead} data-reveal><p className={styles.sectionCode}>{sc("05 · O corpo")}</p><h2>A última peça do sistema não é de metal.</h2></div>
      <div className={styles.bodyGrid} data-reveal><p><strong>Não existe uma pressão única para toda picape.</strong> Seu uso não é igual ao de outra picape, e seu amortecedor também não deveria ser. A BUMP calibra construção, pressão e curso para o peso, a altura e a rotina reais: menos impacto acumulado no corpo, mais estabilidade com carga e mais controle quando o asfalto termina.</p><div className={styles.wave}><i/><i/><i/><span>IMPACTO ENTRA</span><b>ENERGIA CONTROLADA</b></div></div>
      <div className={styles.trust} data-reveal>{[["13+","anos de fábrica"],["2 anos","contra vazamento"],["Sob medida","veículo e uso"],["Brasil","produção própria"],["Envio","nacional"]].map(([a,b])=><div key={b}><strong>{a}</strong><span>{b}</span></div>)}</div>
      {lean && <div className={styles.leanProof} data-reveal><strong>400.000 km</strong><p>Caso real: um equipamento foi desmontado, inspecionado, recuperado e voltou ao trabalho — prova da construção recuperável. Não é garantia universal.</p><Link href="/resultados">Ver o caso com contexto ↗</Link></div>}
    </section>

    <FlowConnector variant="body-use"/>

    <section id="rotina" className={styles.uses}>
      <div className={styles.sectionIntro} data-reveal><p className={styles.sectionCode}>{sc("06 · O uso define o acerto")}</p><h2>Qual chão repete no seu corpo todo dia?</h2><p>Escolha a rotina. A cena, o produto e o ponto de partida mudam juntos.</p></div>
      <div className={styles.useTabs}>{useCases.map((item)=><button key={item.id} type="button" data-active={item.id===useId} onClick={()=>setUseId(item.id)}><span>{item.number}</span>{item.label}</button>)}<Link href="/configurador?uso=projeto"><span>05</span>Projeto especial ↗</Link></div>
      <article className={styles.useScene} key={useId}>
        <Image src={useImages[useId]} alt={`Picape em cenário de ${useCase.label.toLowerCase()}`} fill sizes="100vw" className={styles.useBackground}/><div className={styles.useShade}/>
        <div className={styles.useCopy}><p>Recomendado para {useCase.label}</p><h3 className={useLine.shortName.length > 8 ? styles.compactProductName : undefined}>{useLine.shortName}</h3><span>{useCase.description} {useLine.description}</span><small className={styles.investmentNote}>O investimento é definido após confirmar veículo, linha e configuração. O valor final é apresentado no orçamento técnico.</small><div><Link className={styles.primaryAction} href={`/configurador?linha=${useLine.slug}&uso=${useId}`}>Montar essa linha</Link><Link href={`/linhas/${useLine.slug}`}>Ver detalhes ↗</Link></div></div>
        <div className={styles.useProduct}><Image src={useLine.image} alt={useLine.name} fill sizes="(min-width:900px) 42vw,85vw"/></div>{lean && <><button type="button" className={styles.useArrow} data-dir="prev" onClick={()=>setUseId(useCases[(useIdx+useCases.length-1)%useCases.length].id)} aria-label="Uso anterior">←</button><button type="button" className={styles.useArrow} data-dir="next" onClick={()=>setUseId(useCases[(useIdx+1)%useCases.length].id)} aria-label="Próximo uso">→</button></>}
      </article>
    </section>

    <section className={styles.brands}><p>Picapes que encontram seu acerto</p><div className={styles.marquee} aria-label={brandMarks.map(([name]) => name).join(", ")}><div>{[...brandMarks,...brandMarks].map(([name,slug],i)=><span className={styles.brandMark} key={`${slug}-${i}`}><Image src={`/brands/${slug}.svg`} alt="" width={72} height={44} loading="eager" unoptimized className={styles.brandMarkLogo}/><b>{name}</b></span>)}</div></div></section>

    <FlowConnector variant="brands-engineering"/>

    <section id="engenharia" className={styles.engineering}>
      <div className={styles.engineeringVisual}><div className={styles.fluid}><i/><i/><i/><i/><i/></div><Image src={productLines[2].image} alt="Vista técnica do amortecedor BUMP" fill sizes="50vw"/><span>PRESSÃO → FLUIDO → RETORNO</span></div>
      <div className={styles.engineeringCopy}><div className={styles.sectionIntro} data-reveal><p className={styles.sectionCode}>{sc("07 · Dentro do amortecedor")}</p><h2>A engenharia só termina quando chega ao corpo.</h2></div>{(lean ? leanTechnology : technology).map(([n,title,text])=><article key={n} data-reveal><span>{n}</span><div><h3>{title}</h3><p>{text}</p></div></article>)}<Link href="/tecnologia">Entender toda a engenharia ↗</Link></div>
    </section>

    {!lean && <>
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

    </>}

    <FlowConnector variant="results-authority"/>

    <section className={styles.authority}>
      <div className={styles.sectionIntro} data-reveal><p className={styles.sectionCode}>{sc("10 · Autoridade com autoria")}</p><h2>Cristian: piloto antes de fabricante, especialista à frente do projeto.</h2></div>
      <div className={styles.authorityGrid}><article data-reveal><span>CENÁRIO DE APLICAÇÃO</span><h3>Experiência que virou método.</h3><p>Cristian levou o que sentia no volante para a engenharia e para a fábrica. É ele quem define como cada conjunto responde ao peso, à altura e ao terreno informados.</p><Link href="/quem-somos">Conhecer a história ↗</Link></article><article data-reveal><span>EVIDÊNCIA DECLARADA · LIMITES EXPLÍCITOS</span><h3>A fábrica continua depois da escolha.</h3><p>Produção própria no Brasil, projeto sob medida, 2 anos contra vazamento e construção que pode voltar à fábrica para recuperação.</p><Link href="/resultados">Ver evidências ↗</Link></article></div>
    </section>

    <FlowConnector variant="authority-cta"/>

    <section className={styles.finalCta}>
      <Image src={`${ASSET_BASE}/banco_web_800/triton.webp`} alt="Picape pronta para o próximo terreno" fill sizes="100vw"/><div/><div className={styles.finalCopy} data-reveal><p className={styles.sectionCode}>{sc("11 · O próximo chão")}</p><h2>A estrada pode continuar ruim. Seu corpo não precisa repetir tudo.</h2><p>Conte o veículo, a carga e a rotina. A fábrica transforma contexto em um ponto de partida técnico.</p><div className={styles.finalActions}><Link href="/configurador" className={styles.primaryAction}>Montar para o meu chão</Link><Link href="/contato" className={styles.finalSecondaryAction}>Falar com a BUMP</Link></div></div>
    </section>

    <FlowConnector variant="cta-faq"/>

    <section className={styles.faq}>
      <div className={styles.sectionIntro} data-reveal><p className={styles.sectionCode}>{sc("12 · Antes de decidir")}</p><h2>Perguntas que também fazem parte do projeto.</h2></div>
      <div className={styles.faqList}>{faqItems.slice(0,5).map((item,i)=><details key={item.question} data-reveal><summary><span>0{i+1}</span>{item.question}<i>+</i></summary><p>{item.answer}</p></details>)}</div>
      <div className={styles.faqActions}><Link href="/faq">Ver todas as dúvidas ↗</Link><Link href="/contato">Falar com a BUMP ↗</Link></div>
    </section>

    <FlowConnector variant="faq-footer"/>

    {!definitive && <footer className={styles.conceptFooter}><Image src="/brand/bump-logo.png" alt="BUMP Amortecedores" width={180} height={53} className={styles.footerLogo}/><span>DO CHÃO AO CORPO · CONCEITO V0.2</span><Link href="/">Voltar ao site atual ↗</Link></footer>}
  </div>;
}
