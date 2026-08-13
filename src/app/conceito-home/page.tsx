import type { Metadata } from "next";
import { ImpactJourney } from "@/components/concept-home/ImpactJourney";

export const metadata: Metadata = {
  title: "Conceito Home · Do chão ao corpo",
  description: "Protótipo navegável da nova narrativa interativa da Home BUMP.",
  robots: { index: false, follow: false },
};

export default function HomeConceptPage() {
  return <ImpactJourney />;
}
