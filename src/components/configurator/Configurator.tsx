"use client";

import Image from "next/image";
import Link from "next/link";
import { FormEvent, useMemo, useState } from "react";
import { getProductLine, productLines, type LineSlug } from "@/lib/site-data";

type Config = {
  vehicle: string;
  year: string;
  usage: string;
  goal: string;
  line: LineSlug | "";
  color: string;
  kit: string;
  hose: string;
  lift: string;
  name: string;
  whatsapp: string;
  consent: boolean;
};

const stepLabels = ["Sua picape", "Como você usa", "Seu objetivo", "Modelo sugerido", "Cor", "Jogo", "Mangueira", "Lift e altura", "Resumo e contato"] as const;
const usageOptions = [
  ["urbano", "Urbano e conforto"],
  ["agro", "Carga e agro"],
  ["trilha", "Terra e trilha"],
  ["rally", "Rally e off-road"],
  ["projeto", "Projeto especial"],
] as const;
const goalOptions = ["Mais conforto", "Mais estabilidade", "Mais capacidade de carga", "Mais durabilidade"] as const;
const colors = [["Preto", "#161616"], ["Amarelo Citrus", "#d3ff1a"], ["Prata", "#bfc4bf"], ["Vermelho", "#c53a35"], ["Azul", "#245fa5"]] as const;
const recommendedByUsage: Record<string, LineSlug> = { urbano: "performance", agro: "inox", trilha: "coilover", rally: "bypass", projeto: "premium" };

export function Configurator({ initial }: { initial: { vehicle?: string; line?: string; usage?: string } }) {
  const validInitialLine = productLines.some((line) => line.slug === initial.line) ? initial.line as LineSlug : "";
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [config, setConfig] = useState<Config>({
    vehicle: initial.vehicle ?? "",
    year: "",
    usage: initial.usage ?? "",
    goal: "",
    line: validInitialLine,
    color: "Preto",
    kit: "",
    hose: "",
    lift: "",
    name: "",
    whatsapp: "",
    consent: false,
  });

  const recommendedSlug = config.line || recommendedByUsage[config.usage] || "performance";
  const recommended = getProductLine(recommendedSlug)!;
  const progress = Math.round((step / stepLabels.length) * 100);

  const canContinue = useMemo(() => {
    if (step === 1) return Boolean(config.vehicle.trim() && config.year.trim());
    if (step === 2) return Boolean(config.usage);
    if (step === 3) return Boolean(config.goal);
    if (step === 4) return Boolean(config.line || recommendedSlug);
    if (step === 5) return Boolean(config.color);
    if (step === 6) return Boolean(config.kit);
    if (step === 7) return Boolean(config.hose);
    if (step === 8) return Boolean(config.lift);
    return Boolean(config.name.trim() && config.whatsapp.trim() && config.consent);
  }, [config, recommendedSlug, step]);

  function patch<K extends keyof Config>(key: K, value: Config[K]) {
    setConfig((current) => ({ ...current, [key]: value }));
    setError("");
  }

  function goToStep(nextStep: number) {
    setStep(Math.max(1, Math.min(stepLabels.length, nextStep)));
    setError("");
    requestAnimationFrame(() => {
      document.getElementById("configurator-panel")?.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
        block: "start",
      });
    });
  }

  function next() {
    if (!canContinue) {
      setError("Preencha ou selecione uma opção para continuar.");
      return;
    }
    if (step === 4 && !config.line) patch("line", recommendedSlug);
    goToStep(step + 1);
  }

  function submit(event: FormEvent) {
    event.preventDefault();
    if (!canContinue) {
      setError("Informe nome, WhatsApp e confirme o consentimento.");
      return;
    }
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div role="status" className="mx-auto max-w-3xl border border-accent/50 bg-accent-soft p-8 text-center md:p-14">
        <span className="mx-auto grid size-14 place-items-center rounded-full bg-accent text-2xl font-black text-ink">✓</span>
        <p className="mt-6 font-mono text-[10px] tracking-[0.14em] text-accent uppercase">Simulação concluída</p>
        <h2 className="mt-3 text-3xl font-black md:text-5xl">Seu projeto está organizado.</h2>
        <p className="mx-auto mt-5 max-w-2xl leading-relaxed text-mute-1">Nenhum dado foi enviado ou armazenado. Use o resumo para conversar com a equipe; a conexão de orçamento só será ativada após validação, rate limit e consentimento LGPD.</p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/contato" className="button-primary">Falar com especialista</Link>
          <button type="button" onClick={() => setSubmitted(false)} className="button-secondary">Revisar escolhas</button>
        </div>
      </div>
    );
  }

  return (
    <form id="configurator-panel" onSubmit={submit} className="scroll-mt-24 overflow-hidden border border-line-2 bg-ink-card lg:grid lg:grid-cols-[minmax(0,1fr)_380px]" noValidate>
      <div className="min-w-0 p-5 md:p-8 lg:p-10">
        <header className="border-b border-line-1 pb-6">
          <div className="flex items-center justify-between gap-4 font-mono text-[10px] tracking-[0.1em] uppercase">
            <span className="text-accent">Passo {String(step).padStart(2, "0")} de 09</span>
            <span className="text-right text-mute-2">{stepLabels[step - 1]}</span>
          </div>
          <div className="mt-4 h-1 overflow-hidden bg-line-1" role="progressbar" aria-label="Progresso do configurador" aria-valuemin={1} aria-valuemax={9} aria-valuenow={step}>
            <div className="h-full bg-accent transition-[width] duration-300" style={{ width: `${progress}%` }} />
          </div>
          <ol aria-label="Etapas do configurador" className="-mx-5 mt-5 flex snap-x gap-2 overflow-x-auto px-5 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:mx-0 md:px-0">
            {stepLabels.map((label, index) => {
              const number = index + 1;
              const active = number === step;
              const complete = number < step;
              return (
                <li key={label} className="shrink-0 snap-start">
                  <button
                    type="button"
                    disabled={number > step}
                    onClick={() => goToStep(number)}
                    aria-current={active ? "step" : undefined}
                    aria-label={`Ir para passo ${number}: ${label}`}
                    className={`flex min-h-10 items-center gap-2 border px-3 font-mono text-[9px] transition-colors ${complete ? "border-accent bg-accent text-ink" : active ? "border-accent text-accent" : "border-line-2 text-mute-4"}`}
                  >
                    <span>{complete ? "✓" : String(number).padStart(2, "0")}</span>
                    <span className={active ? "inline" : "hidden sm:inline"}>{label}</span>
                  </button>
                </li>
              );
            })}
          </ol>
        </header>

        <details className="mt-5 border border-line-2 bg-ink lg:hidden">
          <summary className="flex min-h-14 cursor-pointer items-center justify-between px-4 font-mono text-[10px] tracking-[0.1em] text-accent uppercase">
            Ver resumo atual <span aria-hidden="true">＋</span>
          </summary>
          <div className="border-t border-line-1 p-4"><ProjectSummary config={config} lineName={recommended.name} /></div>
        </details>

        <div key={step} className="selector-panel-enter min-h-[440px] py-9 md:py-12">
          {step === 1 && <Step number="01" title="Qual é a sua picape?" description="Informe modelo e ano. A fábrica confirma a aplicação antes de produzir."><div className="grid gap-5 sm:grid-cols-2"><Field label="Marca e modelo"><input className="field" value={config.vehicle} onChange={(event) => patch("vehicle", event.target.value)} placeholder="Ex.: Hilux" autoComplete="off" /></Field><Field label="Ano"><input className="field" value={config.year} onChange={(event) => patch("year", event.target.value)} placeholder="Ex.: 2022" inputMode="numeric" /></Field></div></Step>}
          {step === 2 && <Step number="02" title="Como você usa a picape?" description="Escolha a rotina que mais pesa no seu dia."><OptionGrid options={usageOptions.map(([value, label]) => ({ value, label }))} selected={config.usage} onSelect={(value) => patch("usage", value)} /></Step>}
          {step === 3 && <Step number="03" title="O que você mais quer mudar?" description="Escolha a prioridade. O acerto pode equilibrar mais de um objetivo."><OptionGrid options={goalOptions.map((value) => ({ value, label: value }))} selected={config.goal} onSelect={(value) => patch("goal", value)} /></Step>}
          {step === 4 && <Step number="04" title="Modelo sugerido" description={`Pelo seu uso, a recomendação inicial é ${recommended.name}. Você pode comparar e escolher outra linha.`}><div className="grid gap-3 sm:grid-cols-2">{productLines.filter((line) => line.slug !== "amortecedor-de-direcao").map((line) => { const selected = (config.line || recommendedSlug) === line.slug; return <button key={line.slug} type="button" onClick={() => patch("line", line.slug)} aria-pressed={selected} className={`group min-h-36 border p-5 text-left transition-colors ${selected ? "border-accent bg-accent-soft" : "border-line-2 bg-ink hover:border-line-4"}`}><span className="font-mono text-[9px] tracking-[0.08em] text-accent uppercase">{line.slug === recommendedSlug ? "Recomendado" : line.code}</span><strong className="mt-6 block text-xl tracking-[-0.03em] group-hover:text-accent">{line.shortName}</strong><span className="mt-2 block text-xs leading-relaxed text-mute-2">{line.use}</span></button>; })}</div></Step>}
          {step === 5 && <Step number="05" title="Qual acabamento combina com o projeto?" description="A disponibilidade final será confirmada no orçamento."><div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">{colors.map(([name, hex]) => <button key={name} type="button" onClick={() => patch("color", name)} aria-pressed={config.color === name} className={`flex min-h-28 flex-col items-center justify-center gap-3 border p-4 ${config.color === name ? "border-accent bg-accent-soft" : "border-line-2 bg-ink"}`}><span className="size-9 rounded-full border border-paper/20" style={{ backgroundColor: hex }} /><span className="text-xs font-semibold">{name}</span></button>)}</div></Step>}
          {step === 6 && <Step number="06" title="Qual jogo você precisa?" description="Escolha o conjunto. A compatibilidade será revisada pela equipe."><OptionGrid options={["Dianteiro", "Traseiro", "Kit completo"].map((value) => ({ value, label: value }))} selected={config.kit} onSelect={(value) => patch("kit", value)} /></Step>}
          {step === 7 && <Step number="07" title="Tipo de mangueira" description="A opção depende da linha e do reservatório escolhido."><OptionGrid options={["Borracha", "Inox"].map((value) => ({ value, label: value }))} selected={config.hose} onSelect={(value) => patch("hose", value)} /></Step>}
          {step === 8 && <Step number="08" title="Lift e altura" description="Informe a altura atual ou desejada. Medidas especiais serão confirmadas pela engenharia."><OptionGrid options={["Original", "+2 polegadas", "+4 polegadas", "Outro"].map((value) => ({ value, label: value }))} selected={config.lift} onSelect={(value) => patch("lift", value)} /></Step>}
          {step === 9 && <Step number="09" title="Resumo e contato" description="Revise as escolhas. Seus dados permanecem apenas neste navegador durante este protótipo."><div className="grid gap-7 xl:grid-cols-2"><ProjectSummary config={config} lineName={getProductLine(config.line || recommendedSlug)?.name ?? "A definir"} /><div className="grid gap-4"><Field label="Nome"><input className="field" value={config.name} onChange={(event) => patch("name", event.target.value)} autoComplete="name" /></Field><Field label="WhatsApp"><input className="field" value={config.whatsapp} onChange={(event) => patch("whatsapp", event.target.value)} inputMode="tel" autoComplete="tel" placeholder="(51) 99999-9999" /></Field><label className="flex cursor-pointer items-start gap-3 text-sm leading-relaxed text-mute-1"><input type="checkbox" checked={config.consent} onChange={(event) => patch("consent", event.target.checked)} className="mt-1 size-4 accent-[var(--color-accent)]" /><span>Concordo com o uso dos dados para retorno sobre este orçamento, conforme a <Link href="/politica-de-privacidade" className="text-paper underline underline-offset-4">Política de Privacidade</Link>.</span></label></div></div></Step>}
        </div>

        {error && <p role="alert" className="mb-5 border border-red-500/40 bg-red-950/30 px-4 py-3 text-sm text-red-200">{error}</p>}
        <footer className="flex flex-col-reverse justify-between gap-4 border-t border-line-1 pt-6 sm:flex-row sm:items-center">
          <button type="button" onClick={() => goToStep(step - 1)} disabled={step === 1} className="button-secondary disabled:cursor-not-allowed disabled:opacity-30">Voltar</button>
          <Link href="/contato" className="text-center text-sm text-mute-2 underline-offset-4 hover:text-accent hover:underline">Não sei responder. Falar com especialista.</Link>
          {step < 9 ? <button type="button" onClick={next} className="button-primary">Próximo passo</button> : <button type="submit" className="button-primary">Concluir simulação</button>}
        </footer>
      </div>

      <aside className="relative hidden border-l border-line-2 bg-ink lg:block">
        <div className="sticky top-24">
          <div className="relative min-h-80 overflow-hidden border-b border-line-2 bg-[radial-gradient(circle_at_50%_45%,rgba(211,255,26,.18),transparent_58%)]">
            <span className="absolute top-5 left-5 z-10 font-mono text-[9px] tracking-[0.12em] text-accent uppercase">Recomendação atual</span>
            <Image key={recommended.slug} src={recommended.image} alt={recommended.name} fill sizes="380px" className="selector-panel-enter object-contain p-10" />
            <span className="absolute right-5 bottom-5 font-mono text-[9px] text-mute-3">{recommended.code}</span>
          </div>
          <div className="p-6">
            <p className="font-mono text-[9px] tracking-[0.12em] text-mute-3 uppercase">Linha de partida</p>
            <h2 className="mt-2 text-3xl font-black tracking-[-0.045em]">{recommended.shortName}</h2>
            <p className="mt-3 text-sm leading-relaxed text-mute-1">{recommended.use}</p>
            <div className="mt-6"><ProjectSummary config={config} lineName={recommended.name} compact /></div>
            <p className="mt-5 border-t border-line-1 pt-5 font-mono text-[9px] leading-relaxed text-mute-4">A recomendação é inicial. A fábrica confirma aplicação, medidas e disponibilidade antes de produzir.</p>
          </div>
        </div>
      </aside>
    </form>
  );
}

function Step({ number, title, description, children }: { number: string; title: string; description: string; children: React.ReactNode }) {
  return <section aria-labelledby={`step-title-${number}`}><span className="font-mono text-[10px] tracking-[0.12em] text-accent">ETAPA {number}</span><h2 id={`step-title-${number}`} className="mt-3 text-3xl font-black tracking-[-0.04em] md:text-5xl">{title}</h2><p className="mt-4 mb-8 max-w-2xl text-sm leading-relaxed text-mute-2 md:text-base">{description}</p>{children}</section>;
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <label><span className="field-label">{label}</span>{children}</label>;
}

function OptionGrid({ options, selected, onSelect }: { options: { value: string; label: string }[]; selected: string; onSelect: (value: string) => void }) {
  return <div className="grid gap-3 sm:grid-cols-2">{options.map((option, index) => <button key={option.value} type="button" aria-pressed={selected === option.value} onClick={() => onSelect(option.value)} className={`group flex min-h-24 items-center justify-between border p-5 text-left font-semibold transition-colors ${selected === option.value ? "border-accent bg-accent-soft" : "border-line-2 bg-ink hover:border-line-4"}`}><span><span className="mr-3 font-mono text-[9px] text-mute-3">0{index + 1}</span>{option.label}</span><span className={`text-sm ${selected === option.value ? "text-accent" : "text-mute-4 group-hover:text-paper"}`}>{selected === option.value ? "✓" : "→"}</span></button>)}</div>;
}

function ProjectSummary({ config, lineName, compact = false }: { config: Config; lineName: string; compact?: boolean }) {
  const usageLabel = usageOptions.find(([value]) => value === config.usage)?.[1] ?? "A definir";
  const entries = [["Picape", [config.vehicle, config.year].filter(Boolean).join(" ")], ["Uso", usageLabel], ["Objetivo", config.goal], ["Linha", lineName], ["Cor", config.color], ["Jogo", config.kit], ["Mangueira", config.hose], ["Altura", config.lift]];
  const visibleEntries = compact ? entries.slice(0, 5) : entries;
  return <dl className="overflow-hidden border border-line-2">{visibleEntries.map(([label, value]) => <div key={label} className="grid grid-cols-[88px_1fr] gap-3 border-b border-line-1 px-3 py-3 last:border-0"><dt className="font-mono text-[9px] tracking-[0.06em] text-mute-3 uppercase">{label}</dt><dd className="m-0 text-xs font-semibold">{value || "A definir"}</dd></div>)}</dl>;
}
