"use client"

import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import LocationMap from './LocationMap'
import AddressSearch from './AddressSearch'
import { createClient } from '@/lib/supabase/client'

interface Location {
  id?: string
  nome: string
  endereco: string
  impacto: number
  preco: number
  quantidade_telas: number
  latitude: number
  longitude: number
  tipo: 'comercial' | 'residencial'
}

interface LocationFormProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  location?: Location | null
  onSuccess: () => void
}

export default function LocationForm({
  open,
  onOpenChange,
  location,
  onSuccess,
}: LocationFormProps) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<Location>({
    defaultValues: {
      nome: '',
      endereco: '',
      impacto: 0,
      preco: 0,
      quantidade_telas: 0,
      latitude: -12.968578115330597,
      longitude: -38.45002347178393,
      tipo: 'comercial',
    },
    mode: 'onChange',
  })

  const latitude = watch('latitude')
  const longitude = watch('longitude')

  useEffect(() => {
    if (location) {
      reset(location)
    } else {
      reset({
        nome: '',
        endereco: '',
        impacto: 0,
        preco: 0,
        quantidade_telas: 0,
        latitude: -12.968578115330597,
        longitude: -38.45002347178393,
        tipo: 'comercial',
      })
    }
  }, [location, reset, open])

  const onSubmit = async (data: Location) => {
    try {
      if (!data.endereco || data.endereco.trim() === '') {
        alert('Por favor, informe um endereço válido.')
        return
      }

      if (!data.latitude || !data.longitude || data.latitude === 0 || data.longitude === 0) {
        alert('Por favor, selecione um endereço válido da lista de sugestões ou clique no mapa para definir a localização.')
        return
      }

      const supabase = createClient()
      
      // Verificar se está autenticado
      const { data: { user }, error: authError } = await supabase.auth.getUser()
      
      if (authError || !user) {
        alert('Você precisa estar autenticado para salvar localizações. Por favor, faça login novamente.')
        return
      }

      // Usar o cliente do Supabase diretamente para inserir/atualizar
      if (location?.id) {
        // Atualizar
        const { data: updatedData, error } = await supabase
          .from('locations')
          .update({
            nome: data.nome,
            endereco: data.endereco,
            impacto: data.impacto,
            preco: data.preco,
            quantidade_telas: data.quantidade_telas,
            latitude: data.latitude,
            longitude: data.longitude,
            tipo: data.tipo,
          })
          .eq('id', location.id)
          .select()
          .single()

        if (error) {
          console.error('Error updating location:', error)
          throw new Error(error.message || 'Failed to update location')
        }
      } else {
        // Inserir
        const { data: newData, error } = await supabase
          .from('locations')
          .insert({
            nome: data.nome,
            endereco: data.endereco,
            impacto: data.impacto,
            preco: data.preco,
            quantidade_telas: data.quantidade_telas,
            latitude: data.latitude,
            longitude: data.longitude,
            tipo: data.tipo,
          })
          .select()
          .single()

        if (error) {
          console.error('Error creating location:', error)
          throw new Error(error.message || 'Failed to create location')
        }
      }

      onSuccess()
      onOpenChange(false)
    } catch (error) {
      console.error('Error saving location:', error)
      alert(error instanceof Error ? error.message : 'Erro ao salvar localização. Tente novamente.')
    }
  }

  const handleLocationChange = (lat: number, lng: number) => {
    setValue('latitude', lat, { shouldValidate: true })
    setValue('longitude', lng, { shouldValidate: true })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {location?.id ? 'Editar Localização' : 'Nova Localização'}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="nome">Nome *</Label>
              <Input
                id="nome"
                {...register('nome', { required: 'Nome é obrigatório' })}
                placeholder="Nome do condomínio"
              />
              {errors.nome && (
                <p className="text-sm text-red-500">{errors.nome.message}</p>
              )}
            </div>

            <div className="space-y-2">
            <AddressSearch
              value={watch('endereco')}
              onChange={(address, lat, lon) => {
                setValue('endereco', address, { shouldValidate: true })
                if (lat !== 0 && lon !== 0) {
                  setValue('latitude', lat, { shouldValidate: true })
                  setValue('longitude', lon, { shouldValidate: true })
                }
              }}
              error={errors.endereco?.message}
            />
              {errors.endereco && (
                <p className="text-sm text-red-500">{errors.endereco.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="tipo">Tipo *</Label>
              <Select
                value={watch('tipo')}
                onValueChange={(value: 'comercial' | 'residencial') => {
                  setValue('tipo', value, { 
                    shouldValidate: true,
                    validate: (val) => val === 'comercial' || val === 'residencial' || 'Tipo é obrigatório'
                  })
                }}
              >
                <SelectTrigger id="tipo">
                  <SelectValue placeholder="Selecione o tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="comercial">Comercial</SelectItem>
                  <SelectItem value="residencial">Residencial</SelectItem>
                </SelectContent>
              </Select>
              {errors.tipo && (
                <p className="text-sm text-red-500">{errors.tipo.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="impacto">Impacto (pessoas) *</Label>
              <Input
                id="impacto"
                type="number"
                {...register('impacto', {
                  required: 'Impacto é obrigatório',
                  valueAsNumber: true,
                  min: { value: 0, message: 'Impacto deve ser positivo' },
                })}
                placeholder="0"
              />
              {errors.impacto && (
                <p className="text-sm text-red-500">
                  {errors.impacto.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="preco">Preço (R$) *</Label>
              <Input
                id="preco"
                type="number"
                step="0.01"
                {...register('preco', {
                  required: 'Preço é obrigatório',
                  valueAsNumber: true,
                  min: { value: 0, message: 'Preço deve ser positivo' },
                })}
                placeholder="0.00"
              />
              {errors.preco && (
                <p className="text-sm text-red-500">{errors.preco.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="quantidade_telas">Quantidade de Telas *</Label>
              <Input
                id="quantidade_telas"
                type="number"
                {...register('quantidade_telas', {
                  required: 'Quantidade de telas é obrigatória',
                  valueAsNumber: true,
                  min: {
                    value: 1,
                    message: 'Deve ter pelo menos 1 tela',
                  },
                })}
                placeholder="0"
              />
              {errors.quantidade_telas && (
                <p className="text-sm text-red-500">
                  {errors.quantidade_telas.message}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium text-gray-900 mb-2">
                Localização no Mapa *
              </p>
              <p className="text-sm text-gray-500 mb-2">
                O mapa será atualizado automaticamente quando você selecionar um endereço. Você também pode clicar no mapa para ajustar a posição.
              </p>
              <LocationMap
                latitude={latitude}
                longitude={longitude}
                onLocationChange={handleLocationChange}
              />
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Salvando...' : 'Salvar'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

