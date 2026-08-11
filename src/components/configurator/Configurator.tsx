"use client";

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
  ["urbano", "Urbano e conforto"], ["agro", "Carga e agro"], ["trilha", "Terra e trilha"], ["rally", "Rally e off-road"], ["projeto", "Projeto especial"],
] as const;
const goalOptions = ["Mais conforto", "Mais estabilidade", "Mais capacidade de carga", "Mais durabilidade"] as const;
const colors = [["Preto", "#161616"], ["Verde BUMP", "#2fd35d"], ["Prata", "#bfc4bf"], ["Vermelho", "#c53a35"], ["Azul", "#245fa5"]] as const;

const recommendedByUsage: Record<string, LineSlug> = { urbano: "performance", agro: "inox", trilha: "coilover", rally: "bypass", projeto: "premium" };

export function Configurator({ initial }: { initial: { vehicle?: string; line?: string; usage?: string } }) {
  const validInitialLine = productLines.some((line) => line.slug === initial.line) ? initial.line as LineSlug : "";
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [config, setConfig] = useState<Config>({
    vehicle: initial.vehicle ?? "", year: "", usage: initial.usage ?? "", goal: "", line: validInitialLine,
    color: "Preto", kit: "", hose: "", lift: "", name: "", whatsapp: "", consent: false,
  });

  const recommendedSlug = config.line || recommendedByUsage[config.usage] || "performance";
  const recommended = getProductLine(recommendedSlug)!;
  const progress = Math.round((step / 9) * 100);

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

  function next() {
    if (!canContinue) { setError("Preencha ou selecione uma opção para continuar."); return; }
    if (step === 4 && !config.line) patch("line", recommendedSlug);
    setStep((current) => Math.min(9, current + 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function submit(event: FormEvent) {
    event.preventDefault();
    if (!canContinue) { setError("Informe nome, WhatsApp e confirme o consentimento."); return; }
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div role="status" className="mx-auto max-w-2xl rounded-sm border border-accent/50 bg-accent-soft p-8 text-center md:p-12">
        <span className="mx-auto grid size-14 place-items-center rounded-full bg-accent text-2xl font-black text-ink">✓</span>
        <h2 className="mt-6 text-3xl font-black">Configuração pronta.</h2>
        <p className="mt-4 leading-relaxed text-mute-1">Este protótipo não enviou nem armazenou seus dados. Na próxima fase, o orçamento será conectado a um canal protegido com validação e consentimento LGPD.</p>
        <div className="mt-7 flex flex-wrap justify-center gap-3"><Link href="/contato" className="button-primary">Falar com especialista</Link><button type="button" onClick={() => setSubmitted(false)} className="button-secondary">Revisar escolhas</button></div>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="mx-auto max-w-4xl rounded-sm border border-line-2 bg-ink-card p-5 md:p-9" noValidate>
      <div className="border-b border-line-1 pb-6">
        <div className="flex items-center justify-between gap-4 font-mono text-xs"><span className="text-accent">Passo {step} de 9</span><span className="text-mute-2">{stepLabels[step - 1]}</span></div>
        <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-line-1"><div className="h-full bg-accent transition-[width]" style={{ width: `${progress}%` }} /></div>
        <ol aria-label="Progresso do configurador" className="mt-4 grid grid-cols-9 gap-1">
          {stepLabels.map((label, index) => <li key={label}><button type="button" disabled={index + 1 > step} onClick={() => setStep(index + 1)} aria-label={`Ir para passo ${index + 1}: ${label}`} className={`grid size-7 place-items-center rounded-full font-mono text-[10px] ${index + 1 < step ? "bg-accent text-ink" : index + 1 === step ? "border border-accent text-accent" : "border border-line-2 text-mute-4"}`}>{index + 1 < step ? "✓" : index + 1}</button></li>)}
        </ol>
      </div>

      <div className="min-h-[390px] py-8">
        {step === 1 && <Step title="Qual é a sua picape?" description="Informe modelo e ano. A fábrica confirma a aplicação antes de produzir."><div className="grid gap-5 sm:grid-cols-2"><Field label="Marca e modelo"><input className="field" value={config.vehicle} onChange={(e) => patch("vehicle", e.target.value)} placeholder="Ex.: Hilux" autoComplete="off" /></Field><Field label="Ano"><input className="field" value={config.year} onChange={(e) => patch("year", e.target.value)} placeholder="Ex.: 2022" inputMode="numeric" /></Field></div></Step>}
        {step === 2 && <Step title="Como você usa a picape?" description="Escolha a rotina que mais pesa no seu dia."><OptionGrid options={usageOptions.map(([value, label]) => ({ value, label }))} selected={config.usage} onSelect={(value) => patch("usage", value)} /></Step>}
        {step === 3 && <Step title="O que você mais quer mudar?" description="Escolha a prioridade. O acerto pode equilibrar mais de um objetivo."><OptionGrid options={goalOptions.map((value) => ({ value, label: value }))} selected={config.goal} onSelect={(value) => patch("goal", value)} /></Step>}
        {step === 4 && <Step title="Modelo sugerido" description={`Pelo seu uso, a recomendação inicial é ${recommended.name}. Você pode comparar e escolher outra linha.`}><div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{productLines.filter((line) => line.slug !== "amortecedor-de-direcao").map((line) => { const selected = (config.line || recommendedSlug) === line.slug; return <button key={line.slug} type="button" onClick={() => patch("line", line.slug)} aria-pressed={selected} className={`min-h-28 rounded-sm border p-4 text-left ${selected ? "border-accent bg-accent-soft" : "border-line-2 bg-ink"}`}><span className="font-mono text-[10px] text-accent">{line.slug === recommendedSlug ? "Recomendado" : line.badge}</span><strong className="mt-3 block">{line.shortName}</strong><span className="mt-1 block text-xs text-mute-2">{line.use}</span></button>; })}</div></Step>}
        {step === 5 && <Step title="Qual acabamento combina com o projeto?" description="A disponibilidade final será confirmada no orçamento."><div className="flex flex-wrap gap-4">{colors.map(([name, hex]) => <button key={name} type="button" onClick={() => patch("color", name)} aria-pressed={config.color === name} className={`flex min-h-24 min-w-28 flex-col items-center justify-center gap-3 rounded-sm border p-4 ${config.color === name ? "border-accent" : "border-line-2"}`}><span className="size-9 rounded-full border border-paper/20" style={{ backgroundColor: hex }} /><span className="text-sm">{name}</span></button>)}</div></Step>}
        {step === 6 && <Step title="Qual jogo você precisa?" description="Escolha o conjunto. A compatibilidade será revisada pela equipe."><OptionGrid options={["Dianteiro", "Traseiro", "Kit completo"].map((value) => ({ value, label: value }))} selected={config.kit} onSelect={(value) => patch("kit", value)} /></Step>}
        {step === 7 && <Step title="Tipo de mangueira" description="A opção depende da linha e do reservatório escolhido."><OptionGrid options={["Borracha", "Inox"].map((value) => ({ value, label: value }))} selected={config.hose} onSelect={(value) => patch("hose", value)} /></Step>}
        {step === 8 && <Step title="Lift e altura" description="Informe a altura atual ou desejada. Medidas especiais serão confirmadas pela engenharia."><OptionGrid options={["Original", "+2 polegadas", "+4 polegadas", "Outro"].map((value) => ({ value, label: value }))} selected={config.lift} onSelect={(value) => patch("lift", value)} /></Step>}
        {step === 9 && <Step title="Resumo e contato" description="Revise as escolhas. Seus dados permanecem apenas neste navegador durante este protótipo."><div className="grid gap-6 lg:grid-cols-2"><Summary config={config} lineName={getProductLine(config.line || recommendedSlug)?.name ?? "A definir"} /><div className="grid gap-4"><Field label="Nome"><input className="field" value={config.name} onChange={(e) => patch("name", e.target.value)} autoComplete="name" /></Field><Field label="WhatsApp"><input className="field" value={config.whatsapp} onChange={(e) => patch("whatsapp", e.target.value)} inputMode="tel" autoComplete="tel" placeholder="(51) 99999-9999" /></Field><label className="flex cursor-pointer items-start gap-3 text-sm leading-relaxed text-mute-1"><input type="checkbox" checked={config.consent} onChange={(e) => patch("consent", e.target.checked)} className="mt-1 size-4 accent-[var(--color-accent)]" />Concordo com o uso dos dados para retorno sobre este orçamento, conforme a Política de Privacidade.</label></div></div></Step>}
      </div>

      {error && <p role="alert" className="mb-4 rounded-sm border border-red-500/40 bg-red-950/30 px-4 py-3 text-sm text-red-200">{error}</p>}
      <div className="flex flex-col-reverse justify-between gap-4 border-t border-line-1 pt-6 sm:flex-row sm:items-center">
        <button type="button" onClick={() => setStep((current) => Math.max(1, current - 1))} disabled={step === 1} className="button-secondary disabled:cursor-not-allowed disabled:opacity-30">Voltar</button>
        <Link href="/contato" className="text-center text-sm text-mute-2 underline-offset-4 hover:text-accent hover:underline">Não sei responder. Falar com especialista.</Link>
        {step < 9 ? <button type="button" onClick={next} className="button-primary">Próximo</button> : <button type="submit" className="button-primary">Enviar para orçamento</button>}
      </div>
    </form>
  );
}

function Step({ title, description, children }: { title: string; description: string; children: React.ReactNode }) { return <section><h2 className="text-2xl font-black md:text-3xl">{title}</h2><p className="mt-2 mb-7 text-sm leading-relaxed text-mute-2 md:text-base">{description}</p>{children}</section>; }
function Field({ label, children }: { label: string; children: React.ReactNode }) { return <label><span className="field-label">{label}</span>{children}</label>; }
function OptionGrid({ options, selected, onSelect }: { options: { value: string; label: string }[]; selected: string; onSelect: (value: string) => void }) { return <div className="grid gap-3 sm:grid-cols-2">{options.map((option) => <button key={option.value} type="button" aria-pressed={selected === option.value} onClick={() => onSelect(option.value)} className={`min-h-20 rounded-sm border p-4 text-left font-semibold transition-colors ${selected === option.value ? "border-accent bg-accent-soft" : "border-line-2 bg-ink hover:border-line-4"}`}>{option.label}</button>)}</div>; }
function Summary({ config, lineName }: { config: Config; lineName: string }) { const entries = [["Picape", `${config.vehicle} ${config.year}`], ["Uso", config.usage], ["Objetivo", config.goal], ["Linha", lineName], ["Cor", config.color], ["Jogo", config.kit], ["Mangueira", config.hose], ["Altura", config.lift]]; return <dl className="overflow-hidden rounded-sm border border-line-2">{entries.map(([label, value]) => <div key={label} className="grid grid-cols-[100px_1fr] gap-3 border-b border-line-1 px-4 py-3 last:border-0"><dt className="font-mono text-xs text-mute-3">{label}</dt><dd className="m-0 text-sm font-semibold">{value || "A definir"}</dd></div>)}</dl>; }
