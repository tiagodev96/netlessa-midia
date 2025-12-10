"use client";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Building2, CheckCircle2, ArrowRight, Sparkles, TrendingUp, Users, Zap } from "lucide-react";

export default function InstaleCondominioPage() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });
  }, []);

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent(
      "Olá! Gostaria de solicitar a instalação do Lessa no meu local. Podem me ajudar a verificar a viabilidade?"
    );
    const whatsappUrl = `https://wa.me/557196455433?text=${message}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      <section className="section bg-gradient-to-b from-blue-50 via-white to-white pt-24">
        <div className="container-n">
          <div className="grid lg:grid-cols-2 gap-12 items-center" data-aos="fade-up">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                <Sparkles className="w-4 h-4" />
                Transforme seu local
              </div>
              
              <h1 className="h1 text-gray-900">
                Instale o Lessa no seu local
              </h1>
              
              <p className="lead text-gray-600">
                Transforme os elevadores do seu prédio com tecnologia moderna. 
                Oferecemos instalação gratuita sem custos para você.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleWhatsAppClick}
                  className="btn btn-primary group flex items-center justify-center gap-2"
                >
                  Verificar viabilidade
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <Link
                  href="/#beneficios"
                  className="btn btn-outline flex items-center justify-center gap-2"
                >
                  Saiba mais sobre o Lessa
                </Link>
              </div>

              <div className="flex flex-wrap gap-6 pt-4">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                  <span className="text-gray-700 font-medium">Instalação gratuita</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                  <span className="text-gray-700 font-medium">Sem custos para você</span>
                </div>
              </div>
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

      <section className="section bg-white">
        <div className="container-n">
          <div className="text-center mb-16" data-aos="fade-up">
            <h2 className="h2 text-gray-900 mb-4">
              Por que instalar o Lessa no seu local?
            </h2>
            <p className="lead max-w-3xl mx-auto">
              Benefícios que transformam os elevadores em uma oportunidade de negócio
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="card group hover:shadow-lg transition-all duration-300" data-aos="fade-up" data-aos-delay="100">
              <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:scale-110 transition-all duration-300">
                <TrendingUp className="w-7 h-7 text-blue-600 group-hover:text-white transition-colors" />
              </div>
              <h3 className="h3 text-gray-900 mb-4">Modernize seu prédio</h3>
              <p className="text-gray-600">
                Transforme os elevadores com tecnologia de ponta e ofereça uma experiência diferenciada aos usuários.
              </p>
            </div>

            <div className="card group hover:shadow-lg transition-all duration-300" data-aos="fade-up" data-aos-delay="200">
              <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:scale-110 transition-all duration-300">
                <Zap className="w-7 h-7 text-blue-600 group-hover:text-white transition-colors" />
              </div>
              <h3 className="h3 text-gray-900 mb-4">Instalação rápida</h3>
              <p className="text-gray-600">
                Processo simples e rápido. Nossa equipe cuida de toda a instalação sem interromper o uso dos elevadores.
              </p>
            </div>

            <div className="card group hover:shadow-lg transition-all duration-300" data-aos="fade-up" data-aos-delay="300">
              <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:scale-110 transition-all duration-300">
                <Users className="w-7 h-7 text-blue-600 group-hover:text-white transition-colors" />
              </div>
              <h3 className="h3 text-gray-900 mb-4">Valorize seu local</h3>
              <p className="text-gray-600">
                Adicione valor ao seu prédio com uma solução tecnológica moderna e inovadora.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-gray-50">
        <div className="container-n">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div data-aos="fade-right">
              <h2 className="h2 text-gray-900 mb-6">
                Como funciona a instalação?
              </h2>
              <p className="lead mb-8 text-gray-600">
                Processo simples em 3 etapas
              </p>

              <div className="space-y-6">
                {[
                  {
                    step: "01",
                    title: "Solicite uma análise",
                    description: "Entre em contato conosco para verificarmos a viabilidade técnica do seu local.",
                  },
                  {
                    step: "02",
                    title: "Aprovação do local",
                    description: "Apresentamos a proposta com todos os detalhes para aprovação.",
                  },
                  {
                    step: "03",
                    title: "Instalação gratuita",
                    description: "Nossa equipe instala as telas digitais nos elevadores sem custos para você.",
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex gap-4 group"
                    data-aos="fade-up"
                    data-aos-delay={index * 100}
                  >
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-blue-600 text-white rounded-xl flex items-center justify-center font-bold text-lg group-hover:scale-110 transition-transform">
                        {item.step}
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {item.title}
                      </h3>
                      <p className="text-gray-600">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative" data-aos="fade-left">
              <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <Building2 className="w-12 h-12 text-blue-600" />
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">
                        Requisitos básicos
                      </h3>
                      <p className="text-gray-600 text-sm">
                        O que seu local precisa ter
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4 pt-4">
                    {[
                      "Elevadores em funcionamento",
                      "Acesso à energia elétrica",
                      "Aprovação do responsável",
                      "Localização estratégica",
                    ].map((requirement, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-blue-50 transition-colors"
                      >
                        <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                        <span className="text-gray-700">{requirement}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-gradient-to-b from-blue-600 to-blue-700 text-white">
        <div className="container-n">
          <div className="max-w-4xl mx-auto text-center" data-aos="fade-up">
            <h2 className="h2 text-white mb-6">
              Pronto para transformar seu local?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Entre em contato agora e descubra como podemos instalar o Lessa no seu prédio. 
              Verificação de viabilidade rápida e sem compromisso.
            </p>
            <button
              onClick={handleWhatsAppClick}
              className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-blue-600 font-semibold rounded-xl hover:bg-blue-50 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
              Falar no WhatsApp
              <ArrowRight className="w-5 h-5" />
            </button>
            <p className="text-blue-100 text-sm mt-4">
              Resposta rápida em até 24 horas
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

