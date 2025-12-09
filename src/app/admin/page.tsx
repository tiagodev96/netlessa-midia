"use client"

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import LoginForm from '@/components/admin/LoginForm'
import LocationsTable from '@/components/admin/LocationsTable'
import LocationForm from '@/components/admin/LocationForm'
import LocationFilters from '@/components/LocationFilters'
import { LogOut, Plus } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

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

export default function AdminPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [locations, setLocations] = useState<Location[]>([])
  const [filteredLocations, setFilteredLocations] = useState<Location[]>([])
  const [formOpen, setFormOpen] = useState(false)
  const [editingLocation, setEditingLocation] = useState<Location | null>(null)

  useEffect(() => {
    checkAuth()
  }, [])

  useEffect(() => {
    if (user) {
      fetchLocations()
    }
  }, [user])

  const checkAuth = async () => {
    try {
      const supabase = createClient()
      const { data: { user }, error } = await supabase.auth.getUser()
      
      if (error || !user) {
        setUser(null)
      } else {
        setUser(user)
      }
    } catch (error) {
      console.error('Error checking auth:', error)
      setUser(null)
    } finally {
      setLoading(false)
    }
  }

  const fetchLocations = async () => {
    try {
      const response = await fetch('/api/locations', {
        credentials: 'include',
      })
      if (response.ok) {
        const data = await response.json()
        const processedData = data.map((loc: Location) => ({
          ...loc,
          tipo: loc.tipo || 'comercial',
        }))
        setLocations(processedData)
        setFilteredLocations(processedData)
      }
    } catch (error) {
      console.error('Error fetching locations:', error)
    }
  }

  const handleLoginSuccess = () => {
    checkAuth()
  }

  const handleLogout = async () => {
    try {
      const supabase = createClient()
      await supabase.auth.signOut()
      setUser(null)
      router.refresh()
    } catch (error) {
      console.error('Error logging out:', error)
    }
  }

  const handleCreate = () => {
    setEditingLocation(null)
    setFormOpen(true)
  }

  const handleEdit = (location: Location) => {
    setEditingLocation(location)
    setFormOpen(true)
  }

  const handleDelete = async (id: string) => {
    try {
      const supabase = createClient()
      
      const { error } = await supabase
        .from('locations')
        .delete()
        .eq('id', id)

      if (error) {
        console.error('Error deleting location:', error)
        throw new Error(error.message || 'Failed to delete location')
      }

      const updatedLocations = locations.filter((loc) => loc.id !== id)
      setLocations(updatedLocations)
      setFilteredLocations(updatedLocations)
    } catch (error) {
      console.error('Error deleting location:', error)
      alert(error instanceof Error ? error.message : 'Erro ao excluir localização. Tente novamente.')
    }
  }

  const handleFormSuccess = () => {
    fetchLocations()
    setFormOpen(false)
    setEditingLocation(null)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Carregando...</p>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Painel Admin
          </h1>
          <LoginForm onSuccess={handleLoginSuccess} />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Gerenciar Localizações
            </h1>
            <p className="text-gray-600 mt-1">
              Gerencie os condomínios e localizações dos elevadores
            </p>
          </div>
          <div className="flex gap-2">
            <Button onClick={handleCreate}>
              <Plus className="h-4 w-4 mr-2" />
              Nova Localização
            </Button>
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Sair
            </Button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow">
          <LocationFilters locations={locations} onFilterChange={(filtered: any[]) => setFilteredLocations(filtered as Location[])} />
          <div className="p-6">
            <LocationsTable
              locations={filteredLocations}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </div>
        </div>

        <LocationForm
          open={formOpen}
          onOpenChange={setFormOpen}
          location={editingLocation}
          onSuccess={handleFormSuccess}
        />
      </div>
    </div>
  )
}

