import type { Metadata, Viewport } from "next";
import { Archivo, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const description =
  "Amortecedores de competição desenvolvidos sob medida para o seu veículo, o seu piloto e o seu terreno. Fabricados no Brasil desde 2013.";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://bumpamortecedores.com",
  ),
  title: "BUMP — Domine qualquer terreno",
  description,
  openGraph: {
    title: "BUMP — Domine qualquer terreno",
    description,
    locale: "pt_BR",
    type: "website",
    siteName: "BUMP Amortecedores",
    images: [
      {
        url: "https://pub-8f0b05c2503f42609136a4e1e55a9242.r2.dev/amortecedores/hero.png",
        width: 1200,
        height: 630,
        alt: "Amortecedor BUMP em teste de campo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
  },
};

export const viewport: Viewport = {
  themeColor: "#080808",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${archivo.variable} ${plexMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
