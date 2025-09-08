import Image from "next/image"
import { landingData } from "../data/landing"

export default function Environments() {
  return (
    <section id="ambientes" className="section bg-gray-50">
      <div className="container-n">
        <div className="text-center mb-16">
          <h2 className="h2 text-gray-900 mb-4">Ambientes Disponíveis</h2>
          <p className="lead max-w-3xl mx-auto">Escolha o ambiente ideal para alcançar seu público-alvo</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {landingData.environments.map((env: any, index: any) => (
            <div key={index} className="card">
              <div className="aspect-video mb-6 bg-gray-200 rounded-xl overflow-hidden">
                <Image
                  src={env.image || `/placeholder.svg?height=300&width=500&query=${env.type} elevator interior`}
                  alt={`Interior de elevador ${env.type}`}
                  width={500}
                  height={300}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="h3 text-gray-900 mb-4">{env.title}</h3>
              <p className="text-gray-600">{env.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
