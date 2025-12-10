"use client";

import { landingData } from "../data/landing"
import { HelpCircle } from "lucide-react"

export default function Faq() {
  return (
    <section id="faq" className="section bg-gray-50">
      <div className="container-n" data-aos="fade-up">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-6">
            <HelpCircle className="w-4 h-4" />
            Dúvidas frequentes
          </div>
          <h2 className="h2 text-gray-900 mb-4">Perguntas Frequentes</h2>
          <p className="lead max-w-3xl mx-auto">Tire suas dúvidas sobre mídia em elevadores</p>
        </div>

        <div className="max-w-4xl mx-auto space-y-4">
          {landingData.faq.map((item: any, index: any) => (
            <details 
              key={index} 
              className="card group hover:shadow-md transition-all duration-300"
              data-aos="fade-up"
              data-aos-delay={index * 50}
            >
              <summary className="flex justify-between items-center cursor-pointer list-none group-hover:text-blue-600 transition-colors">
                <h3 className="font-semibold text-gray-900 pr-4 group-hover:text-blue-600">{item.q}</h3>
                <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-blue-50 rounded-full group-hover:bg-blue-100 transition-colors">
                  <svg
                    className="w-5 h-5 text-blue-600 group-open:rotate-180 transition-transform duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </summary>
              <div className="mt-4 pt-4 border-t border-gray-100">
                <p className="text-gray-600 leading-relaxed">{item.a}</p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
