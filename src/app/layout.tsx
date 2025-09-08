import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: "Netlessa - Mídia em Elevadores Salvador | Publicidade Estratégica",
  description:
    "Alcance seu público-alvo com mídia em elevadores em Salvador. Publicidade hiperlocal com atenção cativa e alta frequência. Fale com nossos especialistas!",
  keywords: "mídia elevador, publicidade Salvador, marketing local, elevador digital, mídia OOH",
  authors: [{ name: "Netlessa" }],
  openGraph: {
    title: "Netlessa - Mídia em Elevadores Salvador",
    description:
      "Publicidade estratégica em elevadores residenciais e comerciais. Alcance garantido com atenção cativa.",
    url: "https://netlessa.com.br",
    siteName: "Netlessa",
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Netlessa - Mídia em Elevadores Salvador",
    description: "Publicidade estratégica em elevadores residenciais e comerciais.",
  },
  robots: {
    index: true,
    follow: true,
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" className={`${inter.variable} antialiased`}>
      <body className="font-sans">{children}</body>
    </html>
  )
}
