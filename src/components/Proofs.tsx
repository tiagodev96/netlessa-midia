import Image from "next/image";
import { landingData } from "../data/landing";
import Marquee from "react-fast-marquee";

export default function Proofs() {
  return (
    <section id="provas" className="section bg-gray-50">
      <div className="container-n" data-aos="fade-up">
        <div className="text-center mb-16">
          <h2 className="h2 text-gray-900 mb-4">Resultados Comprovados</h2>
          <p className="lead max-w-3xl mx-auto">
            Veja quem já confia na Netlessa e os resultados alcançados
          </p>
        </div>

        {/* Clients */}
        <div className="mb-16">
          <h3 className="text-xl font-semibold text-center text-gray-700 mb-8">
            Nossos Clientes
          </h3>
          <Marquee className="opacity-60">
            {landingData.proofs.clients.map((client: any, index: any) => (
              <div key={index} className="mx-6">
                <Image
                  src={
                    client ||
                    `/placeholder.svg?height=60&width=120&query=company logo ${
                      index + 1
                    }`
                  }
                  alt={`Cliente ${index + 1}`}
                  width={120}
                  height={60}
                  className="max-h-12 w-auto object-contain"
                />
              </div>
            ))}
          </Marquee>
        </div>

        {/* Testimonials */}
        <div className="mb-16">
          <h3 className="text-xl font-semibold text-center text-gray-700 mb-8">
            Depoimentos
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            {landingData.proofs.testimonials.map(
              (testimonial: any, index: any) => (
                <div key={index} className="card">
                  <p className="text-gray-600 mb-4 italic">
                    "{testimonial.text}"
                  </p>
                  <div>
                    <p className="font-semibold text-gray-900">
                      {testimonial.author}
                    </p>
                    {testimonial.role && (
                      <p className="text-sm text-gray-500">
                        {testimonial.role}
                      </p>
                    )}
                  </div>
                </div>
              )
            )}
          </div>
        </div>

        {/* Cases */}
        <div>
          <h3 className="text-xl font-semibold text-center text-gray-700 mb-8">
            Cases de Sucesso
          </h3>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {landingData.proofs.cases.map((caseItem: any, index: any) => (
              <div key={index} className="card text-center">
                <h4 className="font-semibold text-gray-900 mb-2">
                  {caseItem.title}
                </h4>
                <div className="text-3xl font-bold text-blue-600 mb-2">
                  {caseItem.metric_value}
                </div>
                <p className="text-gray-600">{caseItem.metric_label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
