import type { Metadata, Viewport } from "next";
import { Archivo, IBM_Plex_Mono } from "next/font/google";
import { Footer } from "@/components/site/Footer";
import { JsonLd } from "@/components/site/JsonLd";
import { Header } from "@/components/site/Header";
import { WhatsAppFloat } from "@/components/site/WhatsAppFloat";
import { organizationJsonLd, websiteJsonLd } from "@/lib/structured-data";
import "./globals.css";

const archivo = Archivo({ variable: "--font-archivo", subsets: ["latin"], weight: ["400", "500", "600", "700", "800", "900"] });
const plexMono = IBM_Plex_Mono({ variable: "--font-plex-mono", subsets: ["latin"], weight: ["400", "500", "600"] });

const description = "Amortecedores sob medida para sua picape, seu trabalho e seu chão. Engenharia própria, fabricação no Brasil e 2 anos de garantia.";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://bumpamortecedores.com"),
  title: { default: "BUMP Amortecedores | Conforto feito para o seu chão", template: "%s | BUMP Amortecedores" },
  description,
  applicationName: "BUMP Amortecedores",
  openGraph: {
    title: "BUMP Amortecedores | Conforto feito para o seu chão",
    description,
    locale: "pt_BR",
    type: "website",
    siteName: "BUMP Amortecedores",
    images: [{ url: "https://pub-8f0b05c2503f42609136a4e1e55a9242.r2.dev/amortecedores/hero.png", width: 1200, height: 630, alt: "Picape equipada com amortecedores BUMP" }],
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = { themeColor: "#080808", colorScheme: "dark" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={`${archivo.variable} ${plexMono.variable}`}>
      <body>
        <JsonLd data={organizationJsonLd} />
        <JsonLd data={websiteJsonLd} />
        <Header />
        <main className="pt-[72px]">{children}</main>
        <Footer />
        <WhatsAppFloat />
      </body>
    </html>
  );
}
