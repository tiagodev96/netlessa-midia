import { landingData } from "../data/landing"

export default function Faq() {
  return (
    <section id="faq" className="section bg-gray-50">
      <div className="container-n">
        <div className="text-center mb-16">
          <h2 className="h2 text-gray-900 mb-4">Perguntas Frequentes</h2>
          <p className="lead max-w-3xl mx-auto">Tire suas dúvidas sobre mídia em elevadores</p>
        </div>

        <div className="max-w-4xl mx-auto space-y-4">
          {landingData.faq.map((item: any, index: any) => (
            <details key={index} className="card group">
              <summary className="flex justify-between items-center cursor-pointer list-none">
                <h3 className="font-semibold text-gray-900 pr-4">{item.q}</h3>
                <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center">
                  <svg
                    className="w-4 h-4 text-gray-500 group-open:rotate-180 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </summary>
              <div className="mt-4 pt-4 border-t border-gray-100">
                <p className="text-gray-600">{item.a}</p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
