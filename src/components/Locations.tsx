"use client";

import Link from 'next/link'
import LocationsMap from './LocationsMap'
import { MapPin, ArrowRight } from 'lucide-react'

export default function Locations() {
  return (
    <section id="localizacoes" className="section">
      <div className="container-n" data-aos="fade-up">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-6">
            <MapPin className="w-4 h-4" />
            Nossa rede
          </div>
          <h2 className="h2 text-gray-900 mb-4">
            Nossas Localizações
          </h2>
          <p className="lead max-w-3xl mx-auto">
            Veja onde estão nossos elevadores em Salvador e encontre as melhores
            oportunidades para sua campanha
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
          <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-white">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Mapa Interativo dos Elevadores
            </h3>
            <p className="text-gray-600">
              Explore nossa rede de elevadores distribuídos estrategicamente por
              Salvador
            </p>
          </div>

          <div className="relative">
            <LocationsMap />
          </div>

          <div className="p-6 bg-gray-50">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">
                  Elevadores Residenciais
                </h4>
                <p className="text-gray-600 text-sm">
                  Condomínios de alto padrão em bairros nobres como Pituba,
                  Barra, Ondina e Graça
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">
                  Elevadores Comerciais
                </h4>
                <p className="text-gray-600 text-sm">
                  Prédios corporativos no Centro, Iguatemi, Paralela e
                  principais centros empresariais
                </p>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/localizacoes"
                  className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-md hover:shadow-lg group"
                >
                  <MapPin className="w-5 h-5 mr-2" />
                  Abrir Mapa Completo
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
                <a
                  href="#contato"
                  className="inline-flex items-center justify-center px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 shadow-md hover:shadow-lg"
                >
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    />
                  </svg>
                  Consultar Disponibilidade
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
