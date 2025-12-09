"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Pencil, Trash2 } from 'lucide-react'

interface Location {
  id: string
  nome: string
  endereco: string
  pessoas_impactadas: number
  preco: number
  quantidade_telas: number
  latitude: number
  longitude: number
  tipo: 'comercial' | 'residencial'
  imagem_url?: string | null
}

interface LocationsTableProps {
  locations: Location[]
  onEdit: (location: Location) => void
  onDelete: (id: string) => void
}

export default function LocationsTable({
  locations,
  onEdit,
  onDelete,
}: LocationsTableProps) {
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir esta localização?')) {
      return
    }

    setDeletingId(id)
    try {
      await onDelete(id)
    } finally {
      setDeletingId(null)
    }
  }

  if (locations.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        Nenhuma localização cadastrada. Clique em "Nova Localização" para
        começar.
      </div>
    )
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Nome</TableHead>
          <TableHead>Endereço</TableHead>
          <TableHead>Tipo</TableHead>
          <TableHead className="text-right">Pessoas Impactadas</TableHead>
          <TableHead className="text-right">Preço</TableHead>
          <TableHead className="text-right">Telas</TableHead>
          <TableHead className="text-right">Exibições</TableHead>
          <TableHead className="text-right">Ações</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {locations.map((location) => (
          <TableRow key={location.id}>
            <TableCell className="font-medium">{location.nome}</TableCell>
            <TableCell>{location.endereco}</TableCell>
            <TableCell>
              {location.tipo === 'comercial' ? 'Comercial' : 'Residencial'}
            </TableCell>
            <TableCell className="text-right">
              {location.pessoas_impactadas.toLocaleString()}
            </TableCell>
            <TableCell className="text-right">
              R${' '}
              {location.preco.toLocaleString('pt-BR', {
                minimumFractionDigits: 2,
              })}
            </TableCell>
            <TableCell className="text-right">
              {location.quantidade_telas}
            </TableCell>
            <TableCell className="text-right">
              {(location.quantidade_telas * 5000).toLocaleString('pt-BR')}
            </TableCell>
            <TableCell className="text-right">
              <div className="flex justify-end gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onEdit(location)}
                >
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDelete(location.id)}
                  disabled={deletingId === location.id}
                >
                  <Trash2 className="h-4 w-4 text-red-500" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

