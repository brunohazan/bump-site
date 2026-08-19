import type { Metadata, Viewport } from "next";
import { ScrollReveal } from "@/components/ScrollReveal";
import { Footer } from "@/components/site/Footer";
import { JsonLd } from "@/components/site/JsonLd";
import { Header } from "@/components/site/Header";
import { WhatsAppFloat } from "@/components/site/WhatsAppFloat";
import { organizationJsonLd, websiteJsonLd } from "@/lib/structured-data";
import "./globals.css";

const description =
  "Especialista brasileiro em amortecedores sob medida para picapes. Projeto por veículo, carga e uso, produção própria e suporte de fábrica.";

const shareTitle = "BUMP | Especialista em suspensão de picapes";
const shareDescription =
  "Conforto e controle para quem trabalha, viaja e enfrenta terreno real. Amortecedores sob medida, feitos no Brasil.";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://bump-weld.vercel.app"),
  title: { default: "BUMP Amortecedores | Especialista em suspensão de picapes", template: "%s | BUMP Amortecedores" },
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

// Movimento é o padrão em qualquer sistema ou navegador: nada de opt-in.
// O único opt-out é ?motion=reduce, marcado no <html> antes da pintura para
// o CSS e o JS lerem a mesma fonte (data-motion="reduce").
const motionFlagScript =
  'try{var m=new URLSearchParams(location.search).get("motion");' +
  'if(m==="reduce"){document.documentElement.setAttribute("data-motion","reduce")}' +
  'else{document.documentElement.removeAttribute("data-motion")}}catch(e){}';

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>
        <script dangerouslySetInnerHTML={{ __html: motionFlagScript }} />
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
