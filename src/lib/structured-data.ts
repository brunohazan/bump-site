import type { ProductLine } from "@/lib/site-data";

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://bump-weld.vercel.app";

export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": ["Organization", "AutomotiveBusiness"],
  "@id": `${SITE_URL}/#organization`,
  name: "BUMP Amortecedores",
  url: SITE_URL,
  logo: `${SITE_URL}/icon.svg`,
  foundingDate: "2013",
  description: "Fábrica brasileira de amortecedores sob medida para picapes, trabalho, agro e off-road.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Gravataí",
    addressRegion: "RS",
    addressCountry: "BR",
  },
  sameAs: ["https://www.instagram.com/bumpamortecedores"],
};

export const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: SITE_URL,
  name: "BUMP Amortecedores",
  inLanguage: "pt-BR",
  publisher: { "@id": `${SITE_URL}/#organization` },
};

export function breadcrumbJsonLd(items: readonly { label: string; href?: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      ...(item.href ? { item: new URL(item.href, SITE_URL).toString() } : {}),
    })),
  };
}

export function productJsonLd(line: ProductLine) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${SITE_URL}/linhas/${line.slug}#product`,
    name: line.name,
    image: line.image,
    description: line.description,
    category: "Amortecedor automotivo sob medida",
    brand: { "@type": "Brand", name: "BUMP" },
    manufacturer: { "@id": `${SITE_URL}/#organization` },
    additionalProperty: line.specs.map((spec) => ({
      "@type": "PropertyValue",
      name: spec.label,
      value: spec.value,
    })),
    audience: { "@type": "Audience", audienceType: line.use },
  };
}

export function faqJsonLd(items: readonly { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}
