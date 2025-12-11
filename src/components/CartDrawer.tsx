"use client"

import { useState, useEffect, useRef } from 'react'
import { useCart } from '@/hooks/use-cart'
import { Location } from '@/components/LocationsMap'
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer'
import { Button } from '@/components/ui/button'
import { formatBrazilianAddress } from '@/lib/addressFormatter'
import { useToast } from '@/hooks/use-toast'
import { ShoppingCart, X, Plus, MessageCircle, Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface CartDrawerProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CartDrawer({ open, onOpenChange }: CartDrawerProps) {
  const { items, removeItem, clearCart } = useCart()
  const { toast } = useToast()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [countdown, setCountdown] = useState<number | null>(null)
  const [messageCopied, setMessageCopied] = useState(false)
  const countdownIntervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    return () => {
      if (countdownIntervalRef.current) {
        clearInterval(countdownIntervalRef.current)
      }
    }
  }, [])

  const handleRemoveItem = (location: Location) => {
    removeItem(location.id)
    toast({
      title: "Removido do carrinho",
      description: `${location.nome} foi removido do carrinho`,
      variant: "info",
    })
  }

  const formatPreco = (preco: number | string) => {
    const num = typeof preco === 'number' ? preco : parseFloat(String(preco))
    return num.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
  }

  const formatNumber = (value: number) => {
    return new Intl.NumberFormat('pt-BR').format(value)
  }

  const totalPreco = items.reduce((sum, item) => {
    const preco = typeof item.preco === 'number' ? item.preco : parseFloat(String(item.preco))
    return sum + preco
  }, 0)

  const handleDivulgar = () => {
    if (items.length === 0 || isLoading) return

    setIsLoading(true)

    const isPlural = items.length > 1
    const localText = isPlural ? 'locais' : 'local'

    let message = `Quero divulgar minha empresa ${isPlural ? 'nestes' : 'neste'} ${localText}:\n\n`

    items.forEach((location, index) => {
      const formattedAddress = formatBrazilianAddress(location.endereco)
      const preco = typeof location.preco === 'number' ? location.preco : parseFloat(String(location.preco))
      const exibicoes = location.quantidade_telas * 5000

      message += `*${location.nome}*\n`
      message += `*Endereço:* ${formattedAddress.formatted}\n`
      message += `*Pessoas Impactadas:* ${formatNumber(location.pessoas_impactadas)}\n`
      message += `*Quantidade de telas:* ${formatNumber(location.quantidade_telas)}\n`
      message += `*Exibições:* ${formatNumber(exibicoes)}\n`
      message += `*Preço:* R$ ${formatPreco(preco)}\n`

      if (index < items.length - 1) {
        message += '\n---\n\n'
      }
    })

    setCountdown(5)
    
    navigator.clipboard.writeText(message).then(() => {
      setMessageCopied(true)
    }).catch(() => {
      setMessageCopied(false)
    })
    let currentCountdown = 5

    if (countdownIntervalRef.current) {
      clearInterval(countdownIntervalRef.current)
    }

    countdownIntervalRef.current = setInterval(() => {
      currentCountdown--
      setCountdown(currentCountdown)
      if (currentCountdown <= 0) {
        if (countdownIntervalRef.current) {
          clearInterval(countdownIntervalRef.current)
          countdownIntervalRef.current = null
        }
        setCountdown(null)
      }
    }, 1000)

    setTimeout(() => {
      if (countdownIntervalRef.current) {
        clearInterval(countdownIntervalRef.current)
        countdownIntervalRef.current = null
      }
      setIsLoading(false)
      setCountdown(null)
      setMessageCopied(false)
      
      const whatsappMessage = encodeURIComponent(message)
      const phoneNumber = '557188664159'
      const whatsappUrl = `https://wa.me/${phoneNumber}?text=${whatsappMessage}`

      const link = document.createElement('a')
      link.href = whatsappUrl
      link.target = '_blank'
      link.rel = 'noopener noreferrer'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }, 5000)
  }

  const handleAddMore = () => {
    onOpenChange(false)
    router.push('/localizacoes')
  }

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="max-h-[90vh]">
        <DrawerHeader className="border-b">
          <div className="flex items-center justify-between">
            <div>
              <DrawerTitle className="flex items-center gap-2">
                <ShoppingCart className="w-5 h-5" />
                Carrinho de Localizações
              </DrawerTitle>
              <DrawerDescription className="mt-1">
                {items.length === 0
                  ? 'Seu carrinho está vazio'
                  : `${items.length} ${items.length === 1 ? 'localização selecionada' : 'localizações selecionadas'}`}
              </DrawerDescription>
            </div>
          </div>
        </DrawerHeader>

        <div className="flex-1 overflow-y-auto p-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <ShoppingCart className="w-16 h-16 text-gray-300 mb-4" />
              <p className="text-gray-600 mb-2">Nenhuma localização no carrinho</p>
              <p className="text-sm text-gray-400 mb-6">
                Adicione localizações para começar a divulgar
              </p>
              <Button onClick={handleAddMore}>
                <Plus className="w-4 h-4 mr-2" />
                Ver Localizações
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              {items.map((location) => (
                <div
                  key={location.id}
                  className="bg-white border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 mb-1">{location.nome}</h3>
                      <p className="text-sm text-gray-600 mb-3">
                        {formatBrazilianAddress(location.endereco).formatted}
                      </p>
                      <div className="grid grid-cols-3 gap-3 text-sm">
                        <div>
                          <span className="text-gray-500">Pessoas:</span>
                          <p className="font-semibold text-gray-900">
                            {formatNumber(location.pessoas_impactadas)}
                          </p>
                        </div>
                        <div>
                          <span className="text-gray-500">Telas:</span>
                          <p className="font-semibold text-gray-900">
                            {location.quantidade_telas}
                          </p>
                        </div>
                        <div>
                          <span className="text-gray-500">Preço:</span>
                          <p className="font-semibold text-gray-900">
                            R$ {formatPreco(location.preco)}
                          </p>
                        </div>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleRemoveItem(location)}
                      className="flex-shrink-0"
                      aria-label="Remover do carrinho"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <DrawerFooter className="border-t bg-gray-50">
            <div className="flex items-center justify-between mb-4">
              <span className="text-lg font-semibold text-gray-900">Total:</span>
              <span className="text-xl font-bold text-blue-600">
                R$ {formatPreco(totalPreco)}
              </span>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" onClick={handleAddMore} className="flex-1">
                <Plus className="w-4 h-4 mr-2" />
                Adicionar Mais
              </Button>
              <Button 
                onClick={handleDivulgar} 
                className="flex-1 bg-green-600 hover:bg-green-700"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Redirecionando...
                  </>
                ) : (
                  <>
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Divulgar {items.length === 1 ? 'neste local' : 'nestes locais'}
                  </>
                )}
              </Button>
            </div>
          </DrawerFooter>
        )}
      </DrawerContent>
      
      {countdown !== null && (
        <div className="fixed bottom-4 right-4 z-[100] flex items-start gap-3 bg-blue-600 text-white px-4 py-3 rounded-lg shadow-lg border border-blue-500 animate-in slide-in-from-bottom-2 max-w-sm">
          <Loader2 className="w-5 h-5 animate-spin mt-0.5 flex-shrink-0" />
          <div className="flex-1">
            <p className="font-semibold text-sm mb-1">Redirecionando para WhatsApp...</p>
            <p className="text-xs opacity-90 mb-1">
              Você será redirecionado automaticamente em {countdown} segundo{countdown !== 1 ? 's' : ''}.
            </p>
            {messageCopied && (
              <p className="text-xs opacity-90 mt-1 pt-1 border-t border-blue-500">
                ✓ Mensagem copiada para a área de transferência. Se não aparecer automaticamente, cole no WhatsApp.
              </p>
            )}
          </div>
        </div>
      )}
    </Drawer>
  )
}

