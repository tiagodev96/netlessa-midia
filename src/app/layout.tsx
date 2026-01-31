import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/react"
import "./globals.css"
import "maplibre-gl/dist/maplibre-gl.css"
import { CartProvider } from "@/components/CartProvider"
import { Toaster } from "@/components/ui/toaster"
import { JsonLd } from "@/components/JsonLd"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

export const metadata: Metadata = {
  metadataBase: new URL("https://lessamidia.com.br"),
  title: {
    default: "Netlessa - Mídia em Elevadores Salvador | Publicidade Estratégica",
    template: "%s | Netlessa",
  },
  description:
    "Alcance seu público-alvo com mídia em elevadores em Salvador. Publicidade hiperlocal com atenção cativa e alta frequência. Fale com nossos especialistas!",
  keywords: [
    "mídia em elevador",
    "publicidade em elevador Salvador",
    "marketing local Salvador",
    "elevador digital",
    "mídia OOH Salvador",
    "publicidade em condomínio",
    "tela digital elevador",
    "mídia indoor Salvador",
    "publicidade hiperlocal",
    "anúncio elevador",
  ],
  authors: [{ name: "Netlessa" }],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Netlessa - Mídia em Elevadores Salvador",
    description:
      "Publicidade estratégica em elevadores residenciais e comerciais. Alcance garantido com atenção cativa.",
    url: "https://lessamidia.com.br",
    siteName: "Netlessa",
    locale: "pt_BR",
    type: "website",
    images: [
      {
        url: "/image-hero.webp",
        width: 1200,
        height: 630,
        alt: "Netlessa - Mídia em Elevadores Salvador",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Netlessa - Mídia em Elevadores Salvador",
    description: "Publicidade estratégica em elevadores residenciais e comerciais.",
    images: ["/image-hero.webp"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Netlessa",
    url: "https://lessamidia.com.br",
    logo: "https://lessamidia.com.br/logo.webp",
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+55-71-98606-4654",
      contactType: "sales",
      areaServed: "BR",
      availableLanguage: "Portuguese",
    },
  }

  const localBusinessJsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Netlessa - Mídia em Elevadores",
    description:
      "Publicidade estratégica em elevadores residenciais e comerciais em Salvador e Região Metropolitana.",
    url: "https://lessamidia.com.br",
    telephone: "+55-71-98606-4654",
    email: "net.lessa.net@gmail.com",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Salvador",
      addressRegion: "BA",
      addressCountry: "BR",
    },
    image: "https://lessamidia.com.br/logo.webp",
    priceRange: "$$",
  }

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Netlessa",
    url: "https://lessamidia.com.br",
  }

  return (
    <html lang="pt-BR" className={`${inter.variable} antialiased`}>
      <head>
        <JsonLd data={organizationJsonLd} />
        <JsonLd data={localBusinessJsonLd} />
        <JsonLd data={websiteJsonLd} />
      </head>
      <body className="font-sans">
        <CartProvider>
          {children}
          <Toaster />
        </CartProvider>
        <Analytics />
      </body>
    </html>
  )
}
