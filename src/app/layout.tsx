import type { Metadata, Viewport } from "next";
import { ScrollReveal } from "@/components/ScrollReveal";
import { Footer } from "@/components/site/Footer";
import { JsonLd } from "@/components/site/JsonLd";
import { Header } from "@/components/site/Header";
import { WhatsAppFloat } from "@/components/site/WhatsAppFloat";
import { organizationJsonLd, websiteJsonLd } from "@/lib/structured-data";
import "./globals.css";

const description =
  "Amortecedores sob medida para sua picape, seu trabalho e seu chão. Engenharia própria, fabricação no Brasil e 2 anos de garantia.";

const shareTitle = "BUMP | Conforto que faz o corpo chegar inteiro";
const shareDescription =
  "Mais conforto, controle e durabilidade para quem usa a picape como ferramenta de trabalho. Feito sob medida no Brasil.";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://bump-weld.vercel.app"),
  title: { default: "BUMP Amortecedores | Conforto feito para o seu chão", template: "%s | BUMP Amortecedores" },
  description,
  applicationName: "BUMP Amortecedores",
  openGraph: {
    title: shareTitle,
    description: shareDescription,
    url: "/",
    locale: "pt_BR",
    type: "website",
    siteName: "BUMP Amortecedores",
  },
  twitter: {
    card: "summary_large_image",
    title: shareTitle,
    description: shareDescription,
  },
};

export const viewport: Viewport = { themeColor: "#000000", colorScheme: "dark" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>
        <JsonLd data={organizationJsonLd} />
        <JsonLd data={websiteJsonLd} />
        <ScrollReveal />
        <Header />
        <main className="pt-[72px]">{children}</main>
        <Footer />
        <WhatsAppFloat />
      </body>
    </html>
  );
}
