"use client"

import { useEffect, useState } from 'react'
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
import { Upload, X } from 'lucide-react'

interface Location {
  id?: string
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
  const [uploadingImage, setUploadingImage] = useState(false)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [imageFile, setImageFile] = useState<File | null>(null)

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
      pessoas_impactadas: 0,
      preco: 0,
      quantidade_telas: 0,
      latitude: -12.968578115330597,
      longitude: -38.45002347178393,
      tipo: 'comercial',
      imagem_url: null,
    },
    mode: 'onChange',
  })

  const latitude = watch('latitude')
  const longitude = watch('longitude')
  const quantidade_telas = watch('quantidade_telas')
  const imagem_url = watch('imagem_url')

  useEffect(() => {
    if (location) {
      reset({
        ...location,
        pessoas_impactadas: location.pessoas_impactadas || 0,
      })
      setImagePreview(location.imagem_url || null)
    } else {
      reset({
        nome: '',
        endereco: '',
        pessoas_impactadas: 0,
        preco: 0,
        quantidade_telas: 0,
        latitude: -12.968578115330597,
        longitude: -38.45002347178393,
        tipo: 'comercial',
        imagem_url: null,
      })
      setImagePreview(null)
      setImageFile(null)
    }
  }, [location, reset, open])

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (file.size > 5 * 1024 * 1024) {
      alert('A imagem deve ter no máximo 5MB')
      return
    }

    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
    if (!allowedTypes.includes(file.type)) {
      alert('Apenas imagens JPEG, PNG e WebP são permitidas')
      return
    }

    setImageFile(file)
    const reader = new FileReader()
    reader.onloadend = () => {
      setImagePreview(reader.result as string)
    }
    reader.readAsDataURL(file)
  }

  const handleRemoveImage = () => {
    setImageFile(null)
    setImagePreview(null)
    setValue('imagem_url', null)
  }

  const uploadImage = async (): Promise<string | null> => {
    if (!imageFile) {
      return imagem_url || null
    }

    setUploadingImage(true)
    try {
      const supabase = createClient()
      const { data: { session } } = await supabase.auth.getSession()
      
      if (!session) {
        throw new Error('Você precisa estar autenticado para fazer upload de imagens')
      }

      const formData = new FormData()
      formData.append('file', imageFile)

      const response = await fetch('/api/locations/upload', {
        method: 'POST',
        body: formData,
        credentials: 'include',
        headers: {
          'Authorization': `Bearer ${session.access_token}`,
        },
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Erro desconhecido' }))
        const errorMessage = errorData.details ? `${errorData.error}: ${errorData.details}` : (errorData.error || 'Erro ao fazer upload da imagem')
        throw new Error(errorMessage)
      }

      const data = await response.json()
      return data.url
    } catch (error) {
      console.error('Error uploading image:', error)
      alert(error instanceof Error ? error.message : 'Erro ao fazer upload da imagem. Tente novamente.')
      return null
    } finally {
      setUploadingImage(false)
    }
  }

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
      
      const { data: { user }, error: authError } = await supabase.auth.getUser()
      
      if (authError || !user) {
        alert('Você precisa estar autenticado para salvar localizações. Por favor, faça login novamente.')
        return
      }

      const uploadedImageUrl = await uploadImage()

      if (location?.id) {
        const { data: updatedData, error } = await supabase
          .from('locations')
          .update({
            nome: data.nome,
            endereco: data.endereco,
            pessoas_impactadas: data.pessoas_impactadas,
            preco: data.preco,
            quantidade_telas: data.quantidade_telas,
            latitude: data.latitude,
            longitude: data.longitude,
            tipo: data.tipo,
            imagem_url: uploadedImageUrl,
          })
          .eq('id', location.id)
          .select()
          .single()

        if (error) {
          console.error('Error updating location:', error)
          throw new Error(error.message || 'Failed to update location')
        }
      } else {
        const { data: newData, error } = await supabase
          .from('locations')
          .insert({
            nome: data.nome,
            endereco: data.endereco,
            pessoas_impactadas: data.pessoas_impactadas,
            preco: data.preco,
            quantidade_telas: data.quantidade_telas,
            latitude: data.latitude,
            longitude: data.longitude,
            tipo: data.tipo,
            imagem_url: uploadedImageUrl,
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
              <Label htmlFor="pessoas_impactadas">Pessoas Impactadas *</Label>
              <Input
                id="pessoas_impactadas"
                type="number"
                {...register('pessoas_impactadas', {
                  required: 'Pessoas impactadas é obrigatório',
                  valueAsNumber: true,
                  min: { value: 0, message: 'Deve ser positivo' },
                })}
                placeholder="0"
              />
              {errors.pessoas_impactadas && (
                <p className="text-sm text-red-500">
                  {errors.pessoas_impactadas.message}
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
              <p className="text-xs text-gray-500">Preço por 30 dias</p>
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

            <div className="space-y-2">
              <Label htmlFor="exibicoes">Exibições</Label>
              <Input
                id="exibicoes"
                type="number"
                value={quantidade_telas * 5000}
                disabled
                className="bg-gray-50"
              />
              <p className="text-xs text-gray-500">Calculado automaticamente (5.000 × quantidade de telas)</p>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="imagem">Imagem</Label>
            {imagePreview ? (
              <div className="relative">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-48 object-cover rounded-lg border border-gray-200"
                />
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  className="absolute top-2 right-2"
                  onClick={handleRemoveImage}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                <Label htmlFor="imagem-upload" className="cursor-pointer">
                  <span className="text-sm text-gray-600">
                    Clique para fazer upload de uma imagem
                  </span>
                  <Input
                    id="imagem-upload"
                    type="file"
                    accept="image/jpeg,image/jpg,image/png,image/webp"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </Label>
                <p className="text-xs text-gray-500 mt-2">
                  Máximo 5MB. Formatos: JPEG, PNG, WebP
                </p>
              </div>
            )}
            {uploadingImage && (
              <p className="text-sm text-blue-600">Fazendo upload da imagem...</p>
            )}
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
            <Button type="submit" disabled={isSubmitting || uploadingImage}>
              {(isSubmitting || uploadingImage) ? 'Salvando...' : 'Salvar'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

