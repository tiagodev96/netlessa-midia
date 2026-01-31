import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Localizações - Elevadores com Mídia Digital em Salvador",
  description:
    "Encontre nossos elevadores com mídia digital em Salvador e Região Metropolitana. Veja no mapa todos os pontos disponíveis para sua campanha publicitária.",
  alternates: {
    canonical: "/localizacoes",
  },
  openGraph: {
    title: "Localizações | Netlessa - Mídia em Elevadores Salvador",
    description:
      "Explore nosso mapa interativo com todos os elevadores disponíveis para publicidade em Salvador.",
    url: "https://lessamidia.com.br/localizacoes",
  },
}

export default function LocalizacoesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
