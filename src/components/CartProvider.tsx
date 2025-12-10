"use client"

import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { Location } from '@/components/LocationsMap'

interface CartContextType {
  items: Location[]
  addItem: (location: Location) => void
  removeItem: (locationId: string) => void
  clearCart: () => void
  isInCart: (locationId: string) => boolean
}

const CartContext = createContext<CartContextType | undefined>(undefined)

const STORAGE_KEY = 'location-cart-storage'

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<Location[]>([])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        try {
          setItems(JSON.parse(stored))
        } catch {
          setItems([])
        }
      }
    }
  }, [])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
    }
  }, [items])

  const addItem = useCallback((location: Location) => {
    setItems((prev) => {
      if (!prev.find(item => item.id === location.id)) {
        return [...prev, location]
      }
      return prev
    })
  }, [])

  const removeItem = useCallback((locationId: string) => {
    setItems((prev) => prev.filter(item => item.id !== locationId))
  }, [])

  const clearCart = useCallback(() => {
    setItems([])
  }, [])

  const isInCart = useCallback((locationId: string) => {
    return items.some(item => item.id === locationId)
  }, [items])

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, clearCart, isInCart }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}

