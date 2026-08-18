import type { Metadata } from "next";
import { ImpactJourney } from "@/components/concept-home/ImpactJourney";

export const metadata: Metadata = {
  title: "Home v3 (Hero estático)",
  description: "Versão v3 da Home BUMP: Hero estático com passagem em parallax, para revisão do cliente.",
  robots: { index: false, follow: false },
  alternates: { canonical: undefined },
};

export default function HomeV3Page() {
  return <ImpactJourney definitive lean v3 />;
}
