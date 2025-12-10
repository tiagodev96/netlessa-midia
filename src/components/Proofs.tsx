"use client";

import Image from "next/image";
import { landingData } from "../data/landing";
import Marquee from "react-fast-marquee";
import { CheckCircle2 } from "lucide-react";

export default function Proofs() {
  return (
    <section id="provas" className="section bg-gray-50">
      <div className="container-n" data-aos="fade-up">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-medium mb-6">
            <CheckCircle2 className="w-4 h-4" />
            Resultados comprovados
          </div>
          <h2 className="h2 text-gray-900 mb-4">Quem Confia na Netlessa</h2>
          <p className="lead max-w-3xl mx-auto">
            Empresas que já transformaram seus resultados com mídia em elevadores
          </p>
        </div>

        {/* Clients */}
        <div className="mb-16">
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            <Marquee className="opacity-80 hover:opacity-100 transition-opacity" pauseOnHover>
              {landingData.proofs.clients.map((client: any, index: any) => (
                <div key={index} className="mx-8 flex items-center justify-center">
                  <div className="bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-colors">
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
                      className="max-h-12 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-300"
                    />
                  </div>
                </div>
              ))}
            </Marquee>
          </div>
        </div>

        {/* Testimonials - Commented out */}
        {/* <div className="mb-16">
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
        </div> */}

        {/* Cases - Commented out */}
        {/* <div>
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
        </div> */}
      </div>
    </section>
  );
}
