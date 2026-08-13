import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { ImpactJourney } from "@/components/concept-home/ImpactJourney";

const montserrat = Montserrat({
  variable: "--font-concept",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Conceito Home · Do chão ao corpo",
  description: "Protótipo navegável da nova narrativa interativa da Home BUMP.",
  robots: { index: false, follow: false },
};

export default function HomeConceptPage() {
  return (
    <div className={montserrat.variable}>
      <ImpactJourney />
    </div>
  );
}
