import type { ProductLine, VehicleApplication } from "@/lib/site-data";

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://bump-weld.vercel.app";

export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": ["Organization", "AutomotiveBusiness"],
  "@id": `${SITE_URL}/#organization`,
  name: "BUMP Amortecedores",
  url: SITE_URL,
  logo: `${SITE_URL}/icon.svg`,
  foundingDate: "2013",
  description: "Especialista brasileiro em amortecedores sob medida para picapes, com produção própria para trabalho, agro, estrada e off-road.",
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

export function applicationJsonLd(application: VehicleApplication) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${SITE_URL}/aplicacoes/${application.slug}#service`,
    name: `Amortecedor sob medida para ${application.model}`,
    url: `${SITE_URL}/aplicacoes/${application.slug}`,
    description: application.description,
    serviceType: `Projeto e fabricação de amortecedor para ${application.brand} ${application.model}`,
    provider: { "@id": `${SITE_URL}/#organization` },
    areaServed: { "@type": "Country", name: "Brasil" },
    audience: {
      "@type": "Audience",
      audienceType: application.contexts.map((context) => context.title).join(", "),
    },
  };
}

export const comparisonArticleJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  "@id": `${SITE_URL}/tecnologia/nacional-ou-importado#article`,
  headline: "Amortecedor nacional ou importado: o que comparar antes de decidir",
  description: "Guia técnico para comparar acerto, aplicação, suporte, manutenção e recuperabilidade.",
  inLanguage: "pt-BR",
  mainEntityOfPage: `${SITE_URL}/tecnologia/nacional-ou-importado`,
  author: { "@id": `${SITE_URL}/#organization` },
  publisher: { "@id": `${SITE_URL}/#organization` },
};

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
