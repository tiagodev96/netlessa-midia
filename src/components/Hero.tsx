"use client";

import Link from "next/link";
import Image from "next/image";
import { landingData } from "../data/landing";
import Stats from "./Stats";
import { ArrowRight, Sparkles } from "lucide-react";

export default function Hero() {
  return (
    <section
      id="inicio"
      className="section bg-gradient-to-b from-blue-50 via-white to-white"
    >
      <div className="container-n" data-aos="fade-up">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium w-fit">
                <Sparkles className="w-4 h-4" />
                Mídia estratégica em elevadores
              </div>
              <h1 className="h1 text-gray-900">{landingData.hero_title}</h1>
              <p className="lead">{landingData.hero_subtitle}</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                href="#contato" 
                className="btn btn-primary group flex items-center justify-center gap-2"
              >
                {landingData.hero_cta_primary_label}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link 
                href="/localizacoes" 
                className="btn btn-outline flex items-center justify-center gap-2"
              >
                Ver localizações
              </Link>
            </div>

            <Stats />
          </div>

          <div className="relative" data-aos="fade-left" data-aos-delay="200">
            <div className="aspect-[9/16] max-w-sm mx-auto bg-gray-900 rounded-3xl p-2 shadow-2xl transform hover:scale-105 transition-transform duration-300">
              <div className="w-full h-full bg-blue-600 rounded-2xl flex items-center justify-center p-2">
                <Image
                  src="/image-hero.webp"
                  alt="Tela digital em elevador mostrando publicidade"
                  width={300}
                  height={600}
                  className="rounded-2xl object-cover h-full w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
