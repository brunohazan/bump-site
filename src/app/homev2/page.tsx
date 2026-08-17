import type { Metadata } from "next";
import { ImpactJourney } from "@/components/concept-home/ImpactJourney";

export const metadata: Metadata = {
  title: "Home v2 (enxuta)",
  description: "Versão enxuta da Home BUMP para revisão do cliente.",
  robots: { index: false, follow: false },
  alternates: { canonical: undefined },
};

export default function HomeV2Page() {
  return <ImpactJourney definitive lean />;
}
