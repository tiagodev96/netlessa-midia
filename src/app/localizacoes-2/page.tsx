"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Localizacoes2Page() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />

      <main className="flex-1">
        <div className="container-n py-8 md:py-12">
          <div className="mb-8 md:mb-12 text-center">
            <h1 className="h1 text-gray-900 mb-4">
              Nossas Localizações
            </h1>
            <p className="lead text-gray-600 max-w-2xl mx-auto">
              Explore nosso mapa interativo e descubra todas as localizações onde você pode anunciar conosco.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200 hover:shadow-2xl transition-shadow duration-300">
            <div className="relative w-full h-[500px] md:h-[600px] lg:h-[700px]">
              <iframe
                src="https://www.google.com/maps/d/embed?mid=1taEVeIUV2ebJeVwkVtdnFfxpvU3ksXo&ehbc=2E312F"
                className="absolute top-0 left-0 w-full h-full border-0"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Mapa de Localizações - Netlessa"
                aria-label="Mapa interativo com todas as localizações disponíveis"
              />
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500">
              Use os controles do mapa para navegar e explorar todas as localizações disponíveis.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

