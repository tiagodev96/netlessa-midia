"use client"

import { formatBrazilianAddress } from '@/lib/addressFormatter'

interface Location {
  id: string
  nome: string
  endereco: string
  pessoas_impactadas: number
  preco: number | string
  quantidade_telas: number
  latitude: number | string
  longitude: number | string
  tipo: 'comercial' | 'residencial'
  imagem_url?: string | null
}

interface LocationsGridProps {
  locations: Location[]
  selectedLocationId: string | null
  onLocationSelect: (locationId: string) => void
}

export default function LocationsGrid({ locations, selectedLocationId, onLocationSelect }: LocationsGridProps) {
  const formatPreco = (preco: number | string) => {
    const num = typeof preco === 'number' ? preco : parseFloat(String(preco))
    return num.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
  }

  const hasSingleItem = locations.length === 1

  return (
    <div className="h-full overflow-y-auto flex flex-col">
      <div className="p-4 border-b border-gray-200 bg-white sticky top-0 z-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-1">Locais</h2>
        <p className="text-sm text-gray-600">{locations.length} localizações cadastradas</p>
      </div>
      <div className={`p-4 space-y-3 flex-1 ${hasSingleItem ? 'flex flex-col justify-start' : ''}`}>
        {locations.length === 0 ? (
          <div className="text-center py-12 text-gray-500 flex-1 flex items-center justify-center">
            <div>
              <p className="text-lg mb-2">Nenhum local cadastrado</p>
              <p className="text-sm text-gray-400">Adicione localizações para começar</p>
            </div>
          </div>
        ) : (
          <>
            {locations.map((location) => {
              const isSelected = selectedLocationId === location.id
              return (
                <div
                  key={location.id}
                  onClick={() => onLocationSelect(location.id)}
                  className={`
                    bg-white rounded-xl border-2 p-4 cursor-pointer transition-all duration-200
                    ${isSelected 
                      ? 'border-blue-500 shadow-lg shadow-blue-100 bg-blue-50/30' 
                      : 'border-gray-200 hover:border-blue-300 hover:shadow-md'
                    }
                    ${hasSingleItem ? 'max-w-full' : ''}
                  `}
                >
                  <h3 className={`font-bold text-lg mb-1 ${isSelected ? 'text-blue-700' : 'text-gray-900'}`}>
                    {location.nome}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">{formatBrazilianAddress(location.endereco).formatted}</p>
                  <div className="grid grid-cols-3 gap-3 pt-3 border-t border-gray-100">
                    <div className="flex flex-col">
                      <div className="flex items-center gap-1.5 mb-1">
                        <div className="w-6 h-6 rounded-md bg-blue-100 flex items-center justify-center flex-shrink-0">
                          <svg className="w-3.5 h-3.5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                          </svg>
                        </div>
                        <span className="text-xs text-gray-500 font-medium">Pessoas Impactadas</span>
                      </div>
                      <p className="text-sm font-semibold text-gray-900">{location.pessoas_impactadas.toLocaleString('pt-BR')}</p>
                    </div>
                    <div className="flex flex-col">
                      <div className="flex items-center gap-1.5 mb-1">
                        <div className="w-6 h-6 rounded-md bg-green-100 flex items-center justify-center flex-shrink-0">
                          <svg className="w-3.5 h-3.5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <span className="text-xs text-gray-500 font-medium">Preço</span>
                      </div>
                      <p className="text-sm font-semibold text-gray-900">R$ {formatPreco(location.preco)}</p>
                    </div>
                    <div className="flex flex-col">
                      <div className="flex items-center gap-1.5 mb-1">
                        <div className="w-6 h-6 rounded-md bg-purple-100 flex items-center justify-center flex-shrink-0">
                          <svg className="w-3.5 h-3.5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <span className="text-xs text-gray-500 font-medium">Telas</span>
                      </div>
                      <p className="text-sm font-semibold text-gray-900">{location.quantidade_telas}</p>
                    </div>
                  </div>
                </div>
              )
            })}
            {hasSingleItem && (
              <div className="flex-1 min-h-[50vh] flex items-center justify-center py-8">
                <div className="text-center text-gray-400 max-w-md px-4">
                  <svg className="w-20 h-20 mx-auto mb-4 opacity-40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  <p className="text-sm leading-relaxed">Mais locais serão exibidos aqui conforme forem adicionados ao sistema</p>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
