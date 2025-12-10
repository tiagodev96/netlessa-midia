"use client";

import LeadForm from "./LeadForm"
import { MapPin, Mail, Phone } from "lucide-react"

export default function FinalCta() {
  return (
    <section id="contato" className="section bg-gradient-to-b from-white to-blue-50">
      <div className="container-n" data-aos="fade-up">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-6">
              <Phone className="w-4 h-4" />
              Entre em contato
            </div>
            <h2 className="h2 text-gray-900 mb-6">Pronto para anunciar no seu prédio?</h2>
            <p className="lead mb-8">
              Entre em contato conosco e descubra como a mídia em elevadores pode transformar os resultados do seu
              negócio.
            </p>

            <div className="space-y-4">
              <div className="flex items-center space-x-3 p-4 bg-white rounded-xl hover:shadow-md transition-shadow group">
                <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <MapPin className="w-5 h-5" />
                </div>
                <span className="text-gray-700 font-medium">Salvador, Bahia - Brasil</span>
              </div>

              <div className="flex items-center space-x-3 p-4 bg-white rounded-xl hover:shadow-md transition-shadow group">
                <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <Mail className="w-5 h-5" />
                </div>
                <span className="text-gray-700 font-medium">net.lessa.net@gmail.com</span>
              </div>

              <div className="flex items-center space-x-3 p-4 bg-white rounded-xl hover:shadow-md transition-shadow group">
                <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <Phone className="w-5 h-5" />
                </div>
                <span className="text-gray-700 font-medium">(71) 9 8606-4654</span>
              </div>
            </div>
          </div>

          <div>
            <LeadForm />
          </div>
        </div>
      </div>
    </section>
  )
}
