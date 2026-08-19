import type { Metadata } from "next";
import { ImpactJourney } from "@/components/concept-home/ImpactJourney";

export const metadata: Metadata = {
  title: "Home (versão anterior arquivada)",
  description: "Versão anterior da Home BUMP, preservada para referência. Substituída pela v3 em /.",
  robots: { index: false, follow: false },
  alternates: { canonical: undefined },
};

export default function HomeV1ArchivedPage() {
  return <ImpactJourney definitive />;
}
