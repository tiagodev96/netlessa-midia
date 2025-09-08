export default function Locations() {
  return (
    <section id="localizacoes" className="section">
      <div className="container-n">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Nossas Localizações</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Veja onde estão nossos elevadores em Salvador e encontre as melhores oportunidades para sua campanha
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Mapa Interativo dos Elevadores</h3>
            <p className="text-gray-600">Explore nossa rede de elevadores distribuídos estrategicamente por Salvador</p>
          </div>

          <div className="relative">
            <iframe
              src="https://www.google.com/maps/d/u/1/embed?mid=16fROmtJg8q8anGk8KjhOGhmIxugiW1qM&ehbc=2E312F&ll=-12.968578115330597%2C-38.45002347178393&z=13"
              width="100%"
              height="500"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Localizações dos Elevadores Netlessa em Salvador"
            />
          </div>

          <div className="p-6 bg-gray-50">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Elevadores Residenciais</h4>
                <p className="text-gray-600 text-sm">
                  Condomínios de alto padrão em bairros nobres como Pituba, Barra, Ondina e Graça
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Elevadores Comerciais</h4>
                <p className="text-gray-600 text-sm">
                  Prédios corporativos no Centro, Iguatemi, Paralela e principais centros empresariais
                </p>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="https://www.google.com/maps/d/u/1/viewer?hl=pt-BR&mid=16fROmtJg8q8anGk8KjhOGhmIxugiW1qM&ll=-12.968578115330597%2C-38.45002347178393&z=13"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                  Abrir Mapa Completo
                </a>
                <a
                  href="#contato"
                  className="inline-flex items-center justify-center px-6 py-3 bg-green-500 text-white font-medium rounded-lg hover:bg-green-600 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
  )
}
