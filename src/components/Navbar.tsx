"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="nav">
      <div className="container-n">
        <div className="flex items-center justify-between h-auto py-4">
          <div className="flex items-center">
            <Link href="/#inicio" className="text-2xl font-bold text-blue-600">
              <Image src="/logo.webp" alt="Netlessa" width={75} height={75} />
            </Link>
          </div>

          <div className="hidden lg:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <Link href="/#beneficios" className="text-gray-700 hover:text-blue-600 transition-colors focus-visible">
                Benefícios
              </Link>
              <Link href="/#ambientes" className="text-gray-700 hover:text-blue-600 transition-colors focus-visible">
                Ambientes
              </Link>
              <Link href="/#como-funciona" className="text-gray-700 hover:text-blue-600 transition-colors focus-visible">
                Como Funciona
              </Link>
              <Link href="/#provas" className="text-gray-700 hover:text-blue-600 transition-colors focus-visible">
                Cases
              </Link>
              {/* <Link href="/#midia-kit" className="text-gray-700 hover:text-blue-600 transition-colors focus-visible">
                Mídia Kit
              </Link> */}
              <Link href="/localizacoes" className="text-gray-700 hover:text-blue-600 transition-colors focus-visible">
                Localizações
              </Link>
              <Link href="/#faq" className="text-gray-700 hover:text-blue-600 transition-colors focus-visible">
                FAQ
              </Link>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/#contato"
              className="hidden sm:inline-flex items-center justify-center px-6 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Falar com especialista
            </Link>
            <Link
              href="/#contato"
              className="sm:hidden inline-flex items-center justify-center px-4 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Contato
            </Link>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Menu"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="lg:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-gray-200">
              <Link
                href="/#beneficios"
                className="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Benefícios
              </Link>
              <Link
                href="/#ambientes"
                className="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Ambientes
              </Link>
              <Link
                href="/#como-funciona"
                className="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Como Funciona
              </Link>
              <Link
                href="/#provas"
                className="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Cases
              </Link>
              {/* <Link
                href="/#midia-kit"
                className="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Mídia Kit
              </Link> */}
              <Link
                href="/localizacoes"
                className="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Localizações
              </Link>
              <Link
                href="/#faq"
                className="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                FAQ
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
