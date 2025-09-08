import { landingData } from "../data/landing";

export default function Benefits() {
  return (
    <section id="beneficios" className="section">
      <div className="container-n">
        <div className="text-center mb-16">
          <h2 className="h2 text-gray-900 mb-4">
            Por que anunciar em elevadores?
          </h2>
          <p className="lead max-w-3xl mx-auto">
            Descubra as vantagens únicas da mídia em elevadores para o seu
            negócio
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {landingData.benefits.map((benefit: any, index: any) => (
            <div key={index} className="card text-center">
              <h3 className="h3 text-gray-900 mb-4">{benefit.title}</h3>
              <p className="text-gray-600">{benefit.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
