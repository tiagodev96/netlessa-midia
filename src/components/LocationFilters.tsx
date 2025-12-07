"use client"

import { useState, useEffect, useRef } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { formatBrazilianAddress } from '@/lib/addressFormatter'

interface Location {
  id: string
  nome: string
  endereco: string
  impacto: number
  preco: number | string
  quantidade_telas: number
  latitude: number | string
  longitude: number | string
  tipo: 'comercial' | 'residencial'
}

interface LocationFiltersProps {
  locations: Location[]
  onFilterChange: (filtered: Location[]) => void
}

export default function LocationFilters({ locations, onFilterChange }: LocationFiltersProps) {
  const [nomeFilter, setNomeFilter] = useState('')
  const [bairroFilter, setBairroFilter] = useState('')
  const [precoMin, setPrecoMin] = useState('')
  const [precoMax, setPrecoMax] = useState('')
  const [telasMin, setTelasMin] = useState('')
  const [telasMax, setTelasMax] = useState('')
  const onFilterChangeRef = useRef(onFilterChange)

  useEffect(() => {
    onFilterChangeRef.current = onFilterChange
  }, [onFilterChange])

  const bairros = Array.from(
    new Set(
      locations
        .map((loc) => {
          const formatted = formatBrazilianAddress(loc.endereco)
          return formatted.bairro
        })
        .filter((b) => b !== '')
    )
  ).sort()

  useEffect(() => {
    let filtered = [...locations]

    if (nomeFilter.trim() !== '') {
      const searchTerm = nomeFilter.toLowerCase().trim()
      filtered = filtered.filter((loc) =>
        loc.nome.toLowerCase().includes(searchTerm)
      )
    }

    if (bairroFilter !== '' && bairroFilter !== 'all') {
      filtered = filtered.filter((loc) => {
        const formatted = formatBrazilianAddress(loc.endereco)
        return formatted.bairro === bairroFilter
      })
    }

    if (precoMin !== '') {
      const min = parseFloat(precoMin)
      if (!isNaN(min)) {
        filtered = filtered.filter((loc) => {
          const preco = typeof loc.preco === 'number' ? loc.preco : parseFloat(String(loc.preco))
          return preco >= min
        })
      }
    }

    if (precoMax !== '') {
      const max = parseFloat(precoMax)
      if (!isNaN(max)) {
        filtered = filtered.filter((loc) => {
          const preco = typeof loc.preco === 'number' ? loc.preco : parseFloat(String(loc.preco))
          return preco <= max
        })
      }
    }

    if (telasMin !== '') {
      const min = parseInt(telasMin)
      if (!isNaN(min)) {
        filtered = filtered.filter((loc) => loc.quantidade_telas >= min)
      }
    }

    if (telasMax !== '') {
      const max = parseInt(telasMax)
      if (!isNaN(max)) {
        filtered = filtered.filter((loc) => loc.quantidade_telas <= max)
      }
    }

    onFilterChangeRef.current(filtered)
  }, [nomeFilter, bairroFilter, precoMin, precoMax, telasMin, telasMax, locations])

  return (
    <div className="p-4 border-b border-gray-200 bg-white space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="nome-filter">Nome</Label>
          <Input
            id="nome-filter"
            placeholder="Pesquisar por nome..."
            value={nomeFilter}
            onChange={(e) => setNomeFilter(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="bairro-filter">Bairro</Label>
          <Select value={bairroFilter === '' ? 'all' : bairroFilter} onValueChange={(value) => setBairroFilter(value === 'all' ? '' : value)}>
            <SelectTrigger id="bairro-filter">
              <SelectValue placeholder="Todos os bairros" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os bairros</SelectItem>
              {bairros.map((bairro) => (
                <SelectItem key={bairro} value={bairro}>
                  {bairro}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Preço (R$)</Label>
          <div className="flex gap-2">
            <Input
              type="number"
              placeholder="Mín"
              value={precoMin}
              onChange={(e) => setPrecoMin(e.target.value)}
              step="0.01"
            />
            <Input
              type="number"
              placeholder="Máx"
              value={precoMax}
              onChange={(e) => setPrecoMax(e.target.value)}
              step="0.01"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label>Quantidade de Telas</Label>
          <div className="flex gap-2">
            <Input
              type="number"
              placeholder="Mín"
              value={telasMin}
              onChange={(e) => setTelasMin(e.target.value)}
            />
            <Input
              type="number"
              placeholder="Máx"
              value={telasMax}
              onChange={(e) => setTelasMax(e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
