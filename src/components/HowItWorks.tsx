import { landingData } from "../data/landing"

export default function HowItWorks() {
  return (
    <section id="como-funciona" className="section">
      <div className="container-n">
        <div className="text-center mb-16">
          <h2 className="h2 text-gray-900 mb-4">Como Funciona</h2>
          <p className="lead max-w-3xl mx-auto">Processo simples e eficiente para sua campanha</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {landingData.howitworks.map((step: any, index: any) => (
            <div key={index} className="text-center">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                {index + 1}
              </div>
              <h3 className="h3 text-gray-900 mb-4">{step.title}</h3>
              <p className="text-gray-600">{step.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
