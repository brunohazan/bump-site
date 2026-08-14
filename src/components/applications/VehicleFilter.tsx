"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { getVehicleApplication, vehicles } from "@/lib/site-data";

export function VehicleFilter() {
  const [query, setQuery] = useState("");
  const filtered = useMemo(
    () => vehicles.filter((vehicle) => `${vehicle.brand} ${vehicle.model}`.toLowerCase().includes(query.trim().toLowerCase())),
    [query],
  );

  return (
    <div>
      <label className="mx-auto block max-w-xl">
        <span className="field-label">Buscar marca ou modelo</span>
        <input type="search" value={query} onChange={(event) => setQuery(event.target.value)} className="field" placeholder="Ex.: Hilux, Ranger, RAM" />
      </label>
      {filtered.length > 0 ? (
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((vehicle) => {
            const hasGuide = Boolean(getVehicleApplication(vehicle.slug));
            return (
              <Link
                key={vehicle.slug}
                href={hasGuide ? `/aplicacoes/${vehicle.slug}` : `/configurador?veiculo=${vehicle.slug}`}
                className="rounded-sm border border-line-2 bg-ink-card p-6 transition-colors hover:border-accent"
              >
                <span className="font-mono text-xs text-accent">{vehicle.brand}</span>
                <strong className="mt-2 block text-xl">{vehicle.model}</strong>
                <span className="mt-5 block text-sm text-mute-2">{hasGuide ? "Ver guia da aplicação →" : "Configurar aplicação →"}</span>
              </Link>
            );
          })}
        </div>
      ) : (
        <div role="status" className="mt-8 rounded-sm border border-line-2 bg-ink-card p-7 text-center">
          <h2 className="text-xl font-black">Não encontrou seu veículo?</h2>
          <p className="mt-2 text-mute-1">A lista é inicial. Fale com a fábrica para confirmar uma aplicação especial.</p>
          <Link href="/contato" className="button-secondary mt-5">Falar com especialista</Link>
        </div>
      )}
    </div>
  );
}
