"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ASSET_BASE, faqItems, getProductLine, productLines, useCases } from "@/lib/site-data";
import styles from "./ImpactJourney.module.css";

const stages = [
  { key: "hero", number: "01", label: "O chão", title: "Conforto que faz o corpo chegar inteiro.", text: "Toda força começa no terreno. A jornada acompanha o caminho que ela percorre antes de chegar em quem dirige." },
  { key: "terrain", number: "02", label: "O terreno muda", title: "O chão muda. A força continua.", text: "Asfalto, cascalho, barro e carga alteram a frequência do impacto. O amortecedor precisa responder ao uso real." },
  { key: "compression", number: "03", label: "Compressão", title: "O que para aqui não precisa chegar em você.", text: "A roda sobe, a haste entra e o conjunto controla a energia antes que a carroceria repita todo o movimento." },
  { key: "control", number: "04", label: "Controle", title: "Pressão, fluido e retorno viram conforto.", text: "Visualização conceitual. O acerto final considera veículo, carga, altura e rotina antes da produção." },
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

export function ImpactJourney({ definitive = false }: { definitive?: boolean }) {
  const journeyRef = useRef<HTMLElement>(null);
  const frameRef = useRef<number | null>(null);
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
        <div className={styles.chapters}>{stages.map((stage) => <article key={stage.key} className={styles.chapter} data-key={stage.key}><p className={styles.eyebrow}>{stage.number} · {stage.label}</p><h1>{stage.title}</h1><p className={styles.description}>{stage.text}</p>{stage.key === "hero" && <div className={styles.heroActions}><a href="#rotina" className={styles.primaryAction}>Acompanhar a força</a><a href="#linhas" className={styles.heroSecondaryAction}>Ver as linhas</a><span>Role para entrar no sistema</span></div>}</article>)}</div>
        <div className={styles.progress}><span/></div>
      </div>
    </section>

    <section className={styles.promise} data-reveal>
      <p className={styles.sectionCode}>05 · O corpo</p><h2>A última peça do sistema não é de metal.</h2>
      <div className={styles.bodyGrid}><p><strong>A BUMP não vende amortecedor de prateleira.</strong> É o corpo de quem dirige. Conforto não é adorno: é reduzir o impacto acumulado sem tirar controle da ferramenta. Fluido, pressurização e curso são definidos pela engenharia para cada aplicação.</p><div className={styles.wave}><i/><i/><i/><span>IMPACTO ENTRA</span><b>ENERGIA CONTROLADA</b></div></div>
      <div className={styles.trust}>{[["13+","anos de fábrica"],["2 anos","contra vazamento"],["Sob medida","veículo e uso"],["Brasil","produção própria"],["Envio","nacional"]].map(([a,b])=><div key={b}><strong>{a}</strong><span>{b}</span></div>)}</div>
    </section>

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

    <section id="engenharia" className={styles.engineering}>
      <div className={styles.engineeringVisual}><div className={styles.fluid}><i/><i/><i/><i/><i/></div><Image src={productLines[2].image} alt="Vista técnica do amortecedor BUMP" fill sizes="50vw"/><span>PRESSÃO → FLUIDO → RETORNO</span></div>
      <div className={styles.engineeringCopy}><div className={styles.sectionIntro} data-reveal><p className={styles.sectionCode}>07 · Dentro do amortecedor</p><h2>A engenharia só termina quando chega ao corpo.</h2></div>{technology.map(([n,title,text])=><article key={n} data-reveal><span>{n}</span><div><h3>{title}</h3><p>{text}</p></div></article>)}<Link href="/tecnologia">Entender toda a engenharia ↗</Link></div>
    </section>

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

    <section id="resultados" className={styles.durability}>
      <div className={styles.odometer} data-reveal><span>CASO REAL · NÃO É GARANTIA UNIVERSAL</span><strong>400.000</strong><b>km</b></div>
      <div className={styles.durabilityCopy} data-reveal><p className={styles.sectionCode}>09 · O tempo volta para a fábrica</p><h2>Não virou descarte. Voltou ao trabalho.</h2><p>Um equipamento real foi desmontado, inspecionado, recuperado e devolvido ao uso. O caso comprova a lógica recuperável da construção — não promete a mesma quilometragem para toda aplicação.</p><Link href="/resultados">Ver o caso com contexto ↗</Link></div>
      <div className={styles.recovery}>{["Desmontar","Inspecionar","Recuperar","Retornar"].map((item,i)=><div key={item}><span>0{i+1}</span><i/>{item}</div>)}</div>
    </section>

    <section className={styles.authority}>
      <div className={styles.sectionIntro} data-reveal><p className={styles.sectionCode}>10 · Autoridade sem personagem</p><h2>Fábrica própria. Engenharia que começa no volante.</h2></div>
      <div className={styles.authorityGrid}><article data-reveal><span>CENÁRIO DE APLICAÇÃO · IMAGEM TEMPORÁRIA</span><h3>Piloto antes de fabricante.</h3><p>A experiência no terreno virou método técnico e produção sob medida. A imagem ilustra o tipo de aplicação; não representa fundador ou fábrica.</p><Link href="/quem-somos">Conhecer a história ↗</Link></article><article data-reveal><span>EVIDÊNCIA DECLARADA · CENÁRIO TEMPORÁRIO</span><h3>O que afirmamos tem limite.</h3><p>13+ anos de fábrica, produção própria no Brasil, 2 anos contra vazamento e o caso factual de 400 mil km.</p><Link href="/resultados">Ver evidências ↗</Link></article></div>
    </section>

    <section className={styles.finalCta}>
      <Image src={`${ASSET_BASE}/banco_web_800/triton.webp`} alt="Picape pronta para o próximo terreno" fill sizes="100vw"/><div/><div className={styles.finalCopy} data-reveal><p className={styles.sectionCode}>11 · O próximo chão</p><h2>A estrada pode continuar ruim. Seu corpo não precisa repetir tudo.</h2><p>Conte o veículo, a carga e a rotina. A fábrica transforma contexto em um ponto de partida técnico.</p><div className={styles.finalActions}><Link href="/configurador" className={styles.primaryAction}>Montar para o meu chão</Link><Link href="/contato" className={styles.finalSecondaryAction}>Falar com a BUMP</Link></div></div>
    </section>

    <section className={styles.faq}>
      <div className={styles.sectionIntro} data-reveal><p className={styles.sectionCode}>12 · Antes de decidir</p><h2>Perguntas que também fazem parte do projeto.</h2></div>
      <div className={styles.faqList}>{faqItems.slice(0,5).map((item,i)=><details key={item.question} data-reveal><summary><span>0{i+1}</span>{item.question}<i>+</i></summary><p>{item.answer}</p></details>)}</div>
      <div className={styles.faqActions}><Link href="/faq">Ver todas as dúvidas ↗</Link><Link href="/contato">Falar com a BUMP ↗</Link></div>
    </section>

    {!definitive && <footer className={styles.conceptFooter}><Image src="/brand/bump-logo.png" alt="BUMP Amortecedores" width={180} height={53} className={styles.footerLogo}/><span>DO CHÃO AO CORPO · CONCEITO V0.2</span><Link href="/">Voltar ao site atual ↗</Link></footer>}
  </div>;
}
