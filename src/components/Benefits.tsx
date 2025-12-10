"use client";

import { landingData } from "../data/landing";
import { MapPin, Eye, Repeat2, Target } from "lucide-react";

const benefitIcons = [MapPin, Eye, Repeat2, Target];

export default function Benefits() {
  return (
    <section id="beneficios" className="section">
      <div className="container-n" data-aos="fade-up">
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
          {landingData.benefits.map((benefit: any, index: any) => {
            const Icon = benefitIcons[index] || Target;
            return (
              <div 
                key={index} 
                className="card text-center group hover:shadow-lg transition-all duration-300"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-6 mx-auto group-hover:bg-blue-600 group-hover:scale-110 transition-all duration-300">
                  <Icon className="w-7 h-7 text-blue-600 group-hover:text-white transition-colors" />
                </div>
                <h3 className="h3 text-gray-900 mb-4">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.text}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
