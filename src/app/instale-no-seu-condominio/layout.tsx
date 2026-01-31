import type React from "react"
import type { Metadata } from "next"
import { JsonLd } from "@/components/JsonLd"

export const metadata: Metadata = {
  title: "Instale no Seu Condomínio - Mídia em Elevadores Grátis",
  description:
    "Instale telas digitais nos elevadores do seu condomínio gratuitamente. Modernize seu prédio com tecnologia Netlessa em Salvador e Região Metropolitana.",
  alternates: {
    canonical: "/instale-no-seu-condominio",
  },
  openGraph: {
    title: "Instale o Lessa no Seu Condomínio | Instalação Gratuita",
    description:
      "Transforme os elevadores do seu prédio com tecnologia moderna. Instalação gratuita e sem custos para o condomínio.",
    url: "https://lessamidia.com.br/instale-no-seu-condominio",
  },
}

const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Instalação de Mídia em Elevadores",
  description:
    "Instalação gratuita de telas digitais em elevadores residenciais e comerciais em Salvador e Região Metropolitana.",
  provider: {
    "@type": "Organization",
    name: "Netlessa",
    url: "https://lessamidia.com.br",
  },
  areaServed: {
    "@type": "City",
    name: "Salvador",
    containedInPlace: {
      "@type": "State",
      name: "Bahia",
    },
  },
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "BRL",
    description: "Instalação gratuita para condomínios",
  },
}

export default function InstaleCondominioLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <JsonLd data={serviceJsonLd} />
      {children}
    </>
  )
}
