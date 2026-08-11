"use client";

import { FormEvent, useState } from "react";

export function ContactForm() {
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (!data.get("name") || !data.get("whatsapp") || !data.get("message") || !data.get("consent")) {
      setError("Preencha os campos obrigatórios e confirme o consentimento.");
      return;
    }
    setError("");
    setSent(true);
  }

  if (sent) return <div role="status" className="rounded-sm border border-accent/50 bg-accent-soft p-7"><h2 className="text-2xl font-black">Mensagem preparada.</h2><p className="mt-3 leading-relaxed text-mute-1">Nenhum dado foi enviado ou armazenado nesta demonstração. Use os canais ao lado para falar com a equipe.</p><button type="button" onClick={() => setSent(false)} className="button-secondary mt-5">Voltar ao formulário</button></div>;

  return (
    <form onSubmit={submit} className="grid gap-5 rounded-sm border border-line-2 bg-ink-card p-6 md:p-8" noValidate>
      <label><span className="field-label">Nome *</span><input name="name" className="field" autoComplete="name" /></label>
      <label><span className="field-label">WhatsApp *</span><input name="whatsapp" className="field" inputMode="tel" autoComplete="tel" /></label>
      <label><span className="field-label">Veículo</span><input name="vehicle" className="field" autoComplete="off" /></label>
      <label><span className="field-label">Mensagem *</span><textarea name="message" rows={5} className="field resize-y" /></label>
      <label className="flex items-start gap-3 text-sm leading-relaxed text-mute-1"><input name="consent" value="accepted" type="checkbox" className="mt-1 size-4 accent-[var(--color-accent)]" />Concordo com o uso dos dados para retorno sobre este contato, conforme a Política de Privacidade.</label>
      {error && <p role="alert" className="rounded-sm border border-red-500/40 bg-red-950/30 px-4 py-3 text-sm text-red-200">{error}</p>}
      <button type="submit" className="button-primary">Enviar mensagem</button>
      <p className="text-xs leading-relaxed text-mute-3">Demonstração segura: o formulário ainda não transmite dados.</p>
    </form>
  );
}
