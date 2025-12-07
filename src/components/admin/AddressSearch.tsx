"use client"

import { useState, useEffect, useRef } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface GeocodeResult {
  display_name: string
  full_display_name?: string
  lat: number
  lon: number
  address: any
}

interface AddressSearchProps {
  value: string
  onChange: (address: string, lat: number, lon: number) => void
  error?: string
}

export default function AddressSearch({
  value,
  onChange,
  error,
}: AddressSearchProps) {
  const [query, setQuery] = useState(value)
  const [suggestions, setSuggestions] = useState<GeocodeResult[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setQuery(value)
  }, [value])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const searchAddress = async (searchQuery: string) => {
    if (searchQuery.length < 3) {
      setSuggestions([])
      return
    }

    setIsLoading(true)
    try {
      const response = await fetch(`/api/geocode?q=${encodeURIComponent(searchQuery)}`)
      if (response.ok) {
        const data = await response.json()
        setSuggestions(data)
        setShowSuggestions(true)
      }
    } catch (error) {
      console.error('Error searching address:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    setQuery(newValue)
    // Não atualiza lat/lon enquanto está digitando, apenas o endereço
    onChange(newValue, 0, 0)

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    if (newValue.length >= 3) {
      timeoutRef.current = setTimeout(() => {
        searchAddress(newValue)
      }, 500)
    } else {
      setSuggestions([])
      setShowSuggestions(false)
    }
  }

  const handleSelectSuggestion = (suggestion: GeocodeResult) => {
    const selectedAddress = suggestion.display_name
    
    setQuery(selectedAddress)
    onChange(selectedAddress, suggestion.lat, suggestion.lon)
    setShowSuggestions(false)
    setSuggestions([])
  }
  
  const handleBlur = () => {
    // Quando o campo perde o foco, se tem um endereço digitado e não foi selecionada uma sugestão,
    // tenta geocodificar o endereço digitado para obter as coordenadas
    if (query.length >= 3 && query !== value) {
      handleGeocodeCurrentAddress()
    }
  }
  
  const handleGeocodeCurrentAddress = async () => {
    if (query.length < 3) return

    setIsLoading(true)
    try {
      const response = await fetch(`/api/geocode?q=${encodeURIComponent(query)}`)
      if (response.ok) {
        const data = await response.json()
        if (data.length > 0) {
          const firstResult = data[0]
          const formattedAddress = firstResult.display_name
          setQuery(formattedAddress)
          onChange(formattedAddress, firstResult.lat, firstResult.lon)
        }
      }
    } catch (error) {
      console.error('Error geocoding address:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-2 relative" ref={containerRef}>
      <Label htmlFor="endereco">Endereço *</Label>
      <div className="relative">
        <Input
          id="endereco"
          value={query}
          onChange={handleInputChange}
          onBlur={handleBlur}
          placeholder="Digite o endereço completo (ex: Rua Gregório Bondar, 86, Salvador, BA)"
          onFocus={() => {
            if (suggestions.length > 0) {
              setShowSuggestions(true)
            }
          }}
        />
        {isLoading && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-gray-300 border-t-gray-600"></div>
          </div>
        )}
      </div>
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-auto">
          {suggestions.map((suggestion, index) => (
            <button
              key={index}
              type="button"
              onClick={() => handleSelectSuggestion(suggestion)}
              className="w-full text-left px-4 py-2 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none transition-colors"
            >
              <div className="text-sm text-gray-900 font-medium">{suggestion.display_name}</div>
              {suggestion.full_display_name && suggestion.full_display_name !== suggestion.display_name && (
                <div className="text-xs text-gray-500 mt-0.5">{suggestion.full_display_name}</div>
              )}
            </button>
          ))}
        </div>
      )}
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  )
}

