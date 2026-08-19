import type { Metadata } from "next";
import { ImpactJourney } from "@/components/concept-home/ImpactJourney";

export const metadata: Metadata = {
  title: "BUMP Amortecedores | Especialista em suspensão de picapes",
  description:
    "Amortecedores sob medida para picapes, feitos no Brasil por quem entende de suspensão. Conforto, controle e suporte para trabalho, estrada e terreno real.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return <ImpactJourney definitive lean v3 />;
}
