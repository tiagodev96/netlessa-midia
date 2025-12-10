"use client";

import { landingData } from "../data/landing"
import { Search, Upload, Settings } from "lucide-react"

const stepIcons = [Search, Upload, Settings];

export default function HowItWorks() {
  return (
    <section id="como-funciona" className="section">
      <div className="container-n" data-aos="fade-up">
        <div className="text-center mb-16">
          <h2 className="h2 text-gray-900 mb-4">Como Funciona</h2>
          <p className="lead max-w-3xl mx-auto">Processo simples e eficiente para sua campanha</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {landingData.howitworks.map((step: any, index: any) => {
            const Icon = stepIcons[index] || Settings;
            const isLast = index === landingData.howitworks.length - 1;
            return (
              <div 
                key={index} 
                className="text-center relative"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                {!isLast && (
                  <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-blue-200 to-transparent" />
                )}
                <div className="w-16 h-16 bg-blue-600 text-white rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg relative z-10">
                  <Icon className="w-8 h-8" />
                </div>
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2">
                  <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </div>
                </div>
                <h3 className="h3 text-gray-900 mb-4">{step.title}</h3>
                <p className="text-gray-600">{step.text}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  )
}
