import Link from "next/link"
import { landingData } from "../data/landing"

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container-n py-16">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <Link href="#inicio" className="text-2xl font-bold text-white mb-4 block">
              Netlessa
            </Link>
            <p className="text-gray-300 mb-6 max-w-md">
              Mídia estratégica em elevadores para alcançar seu público-alvo no momento certo, no lugar certo.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <span className="sr-only">LinkedIn</span>
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <span className="sr-only">Instagram</span>
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987s11.987-5.367 11.987-11.987C24.014 5.367 18.647.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.708 13.744 3.708 12.447s.49-2.448 1.418-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.928.875 1.418 2.026 1.418 3.323s-.49 2.448-1.418 3.244c-.875.807-2.026 1.297-3.323 1.297zm7.83-9.781c-.49 0-.928-.175-1.297-.49-.368-.315-.49-.753-.49-1.243 0-.49.122-.928.49-1.243.369-.315.807-.49 1.297-.49s.928.175 1.297.49c.315.315.49.753.49 1.243 0 .49-.175.928-.49 1.243-.369.315-.807.49-1.297.49z" />
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Empresa</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#beneficios" className="text-gray-300 hover:text-white transition-colors">
                  Sobre nós
                </Link>
              </li>
              <li>
                <Link href="#provas" className="text-gray-300 hover:text-white transition-colors">
                  Cases
                </Link>
              </li>
              <li>
                <Link href="#midia-kit" className="text-gray-300 hover:text-white transition-colors">
                  Mídia Kit
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Contato</h3>
            <ul className="space-y-2 text-gray-300">
              <li>{landingData.contact.address}</li>
              <li>{landingData.contact.email}</li>
              <li>{landingData.contact.phone}</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <p className="text-gray-300">© 2024 Netlessa. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
