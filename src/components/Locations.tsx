import Link from 'next/link'
import LocationsMap from './LocationsMap'

export default function Locations() {
  return (
    <section id="localizacoes" className="section">
      <div className="container-n" data-aos="fade-up">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Nossas Localizações
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Veja onde estão nossos elevadores em Salvador e encontre as melhores
            oportunidades para sua campanha
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="p-6 border-b border-gray-200">
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
                  className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
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
                      d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                    />
                  </svg>
                  Abrir Mapa Completo
                </Link>
                <a
                  href="#contato"
                  className="inline-flex items-center justify-center px-6 py-3 bg-green-500 text-white font-medium rounded-lg hover:bg-green-600 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
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
