import Link from "next/link"
import { landingData } from "../data/landing"

export default function MediaKit() {
  return (
    <section id="midia-kit" className="section">
      <div className="container-n" data-aos="fade-up">
        <div className="max-w-4xl mx-auto text-center">
          <div className="card">
            <h2 className="h2 text-gray-900 mb-4">Mídia Kit Completo</h2>
            <p className="lead mb-8">
              Baixe nosso mídia kit com informações detalhadas sobre formatos, localizações, preços e cases de sucesso.
            </p>
            <Link href={landingData.media_kit_file} className="btn btn-primary">
              Baixar mídia kit
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
