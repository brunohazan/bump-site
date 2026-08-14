import type { Metadata } from "next";
import { ImpactJourney } from "@/components/concept-home/ImpactJourney";

export const metadata: Metadata = {
  title: "BUMP Amortecedores | Conforto feito para o seu chão",
  description:
    "Amortecedores sob medida para sua picape, seu trabalho e seu chão. Engenharia própria e fabricação no Brasil.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return <ImpactJourney definitive />;
}
