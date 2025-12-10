"use client";

import Image from "next/image"
import { landingData } from "../data/landing"
import { Building2, Briefcase } from "lucide-react"

const environmentIcons = [Building2, Briefcase];

export default function Environments() {
  return (
    <section id="ambientes" className="section bg-gray-50">
      <div className="container-n" data-aos="fade-up">
        <div className="text-center mb-16">
          <h2 className="h2 text-gray-900 mb-4">Ambientes Disponíveis</h2>
          <p className="lead max-w-3xl mx-auto">Escolha o ambiente ideal para alcançar seu público-alvo</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {landingData.environments.map((env: any, index: any) => {
            const Icon = environmentIcons[index] || Building2;
            return (
              <div 
                key={index} 
                className="card group hover:shadow-lg transition-all duration-300"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className="aspect-video mb-6 bg-gray-200 rounded-xl overflow-hidden relative group-hover:scale-105 transition-transform duration-300">
                  <Image
                    src={env.image || `/placeholder.svg?height=300&width=500&query=${env.type} elevator interior`}
                    alt={`Interior de elevador ${env.type}`}
                    width={500}
                    height={300}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
                    <Icon className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
                <h3 className="h3 text-gray-900 mb-4">{env.title}</h3>
                <p className="text-gray-600">{env.text}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  )
}
