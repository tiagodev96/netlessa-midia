"use client"

import { useEffect, useRef, useState } from 'react'
import maplibregl from 'maplibre-gl'
import { getLocationPopupHTML } from './LocationPopup'
import { useCart } from '@/hooks/use-cart'
import { useToast } from '@/hooks/use-toast'

export interface Location {
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

interface LocationsMapProps {
  selectedLocationId?: string | null
  onLocationSelect?: (locationId: string) => void
  height?: string
  locations?: Location[]
}

export default function LocationsMap({ selectedLocationId, onLocationSelect, height = '500px', locations: locationsProp }: LocationsMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<maplibregl.Map | null>(null)
  const markersRef = useRef<maplibregl.Marker[]>([])
  const markersMapRef = useRef<Map<string, maplibregl.Marker>>(new Map())
  const [locations, setLocations] = useState<Location[]>([])
  const [mapLoaded, setMapLoaded] = useState(false)
  const [dataLoaded, setDataLoaded] = useState(false)
  const { addItem, isInCart } = useCart()
  const { toast } = useToast()

  useEffect(() => {
    if (locationsProp) {
      const processedData = locationsProp.map((loc: Location) => ({
        ...loc,
        latitude: typeof loc.latitude === 'string' ? parseFloat(loc.latitude) : loc.latitude,
        longitude: typeof loc.longitude === 'string' ? parseFloat(loc.longitude) : loc.longitude,
        preco: typeof loc.preco === 'string' ? parseFloat(loc.preco) : loc.preco,
        tipo: loc.tipo || 'comercial',
      }))
      setLocations(processedData)
      setDataLoaded(true)
    } else {
    fetch('/api/locations')
      .then((res) => res.json())
      .then((data) => {
        const processedData = data.map((loc: Location) => ({
          ...loc,
          latitude: typeof loc.latitude === 'string' ? parseFloat(loc.latitude) : loc.latitude,
          longitude: typeof loc.longitude === 'string' ? parseFloat(loc.longitude) : loc.longitude,
          preco: typeof loc.preco === 'string' ? parseFloat(loc.preco) : loc.preco,
            tipo: loc.tipo || 'comercial',
        }))
        setLocations(processedData)
        setDataLoaded(true)
      })
      .catch((error) => {
        console.error('Error fetching locations:', error)
        setDataLoaded(true)
      })
    }
  }, [locationsProp])

  useEffect(() => {
    if (!mapContainer.current || map.current) return

    // Pequeno delay para garantir que o DOM está pronto
    const timer = setTimeout(() => {
      if (!mapContainer.current || map.current) return

      try {
        console.log('Initializing map...', mapContainer.current)
        map.current = new maplibregl.Map({
          container: mapContainer.current,
          style: {
            version: 8,
            sources: {
              'osm': {
                type: 'raster',
                tiles: [
                  'https://tile.openstreetmap.org/{z}/{x}/{y}.png'
                ],
                tileSize: 256,
                attribution: '© OpenStreetMap contributors'
              }
            },
            layers: [
              {
                id: 'osm-layer',
                type: 'raster',
                source: 'osm',
                minzoom: 0,
                maxzoom: 19
              }
            ]
          },
          center: [-38.45002347178393, -12.968578115330597],
          zoom: 13,
          attributionControl: false as any,
        })

        map.current.on('load', () => {
          console.log('Map loaded successfully')
          setMapLoaded(true)
        })

        map.current.on('error', (e) => {
          console.error('Map error:', e)
          setMapLoaded(true)
        })

        map.current.on('styledata', () => {
          console.log('Map style loaded')
        })

        map.current.addControl(new maplibregl.NavigationControl(), 'top-right')
        map.current.addControl(new maplibregl.AttributionControl(), 'bottom-right')
      } catch (error) {
        console.error('Error initializing map:', error)
        setMapLoaded(true)
      }
    }, 100)

    return () => {
      clearTimeout(timer)
      if (map.current) {
        map.current.remove()
        map.current = null
      }
    }
  }, [])

  useEffect(() => {
    if (!map.current || !mapLoaded) return

    // Remover marcadores antigos
    markersRef.current.forEach((marker) => {
      marker.remove()
    })
    markersRef.current = []
    markersMapRef.current.clear()

    // Adicionar novos marcadores
    locations.forEach((location) => {
      const lat = typeof location.latitude === 'number' ? location.latitude : parseFloat(String(location.latitude))
      const lng = typeof location.longitude === 'number' ? location.longitude : parseFloat(String(location.longitude))
      const preco = typeof location.preco === 'number' ? location.preco : parseFloat(String(location.preco))

      if (isNaN(lat) || isNaN(lng)) {
        console.warn('Invalid coordinates for location:', location.id, lat, lng)
        return
      }

      const el = document.createElement('div')
      el.className = 'marker'
      el.style.cssText = `
        width: 60px !important;
        height: 60px !important;
        cursor: pointer !important;
        transition: none !important;
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
        background-color: transparent !important;
        border: none !important;
        background-image: none !important;
        box-shadow: none !important;
        position: absolute !important;
        transform: translate3d(0, 0, 0) !important;
        pointer-events: auto !important;
      `
      
      const img = document.createElement('img')
      img.src = '/logo.webp'
      img.alt = 'Logo'
      
      const isSelected = selectedLocationId === location.id
      const boxShadow = isSelected 
        ? '0 4px 8px rgba(29, 78, 216, 0.4) !important' 
        : '0 2px 4px rgba(0,0,0,0.3) !important'
      
      img.style.cssText = `
        width: 100% !important;
        height: 100% !important;
        object-fit: contain !important;
        border-radius: 50% !important;
        border: 3px solid white !important;
        background-color: white !important;
        background-image: none !important;
        display: block !important;
        box-shadow: ${boxShadow};
      `
      
      if (isSelected) {
        el.setAttribute('data-selected', 'true')
        el.style.setProperty('transform', 'translate3d(0, 0, 0) scale(1.2)', 'important')
        el.style.setProperty('transition', 'transform 0.2s ease', 'important')
      } else {
        el.setAttribute('data-selected', 'false')
        el.style.setProperty('transition', 'none', 'important')
      }
      
      img.onerror = () => {
        console.error('Erro ao carregar logo:', img.src)
      }
      
      el.appendChild(img)

      const popup = new maplibregl.Popup({ 
        offset: [0, -30],
        anchor: 'bottom',
        closeButton: true,
        closeOnClick: false,
        maxWidth: '600px'
      }).setHTML(
        getLocationPopupHTML({
          id: location.id,
          nome: location.nome,
          endereco: location.endereco,
          pessoas_impactadas: location.pessoas_impactadas,
          preco: preco,
          quantidade_telas: location.quantidade_telas,
          imagem_url: location.imagem_url || null
        })
      )

      popup.on('open', () => {
        setTimeout(() => {
          const popupElement = popup.getElement()
          if (popupElement) {
            const button = popupElement.querySelector(`#add-to-cart-btn-${location.id}`) as HTMLButtonElement
            if (button) {
              const handleAddToCart = (e: Event) => {
                e.stopPropagation()
                if (!isInCart(location.id)) {
                  addItem(location)
                  toast({
                    title: "Adicionado ao carrinho",
                    description: `${location.nome} foi adicionado ao carrinho`,
                  })
                  const span = button.querySelector('span')
                  if (span) span.textContent = 'Já no carrinho'
                  button.style.background = '#94a3b8'
                  button.style.cursor = 'not-allowed'
                  button.disabled = true
                  button.removeEventListener('click', handleAddToCart)
                }
              }
              
              button.removeEventListener('click', handleAddToCart)
              button.addEventListener('click', handleAddToCart)
              
              if (isInCart(location.id)) {
                const span = button.querySelector('span')
                if (span) span.textContent = 'Já no carrinho'
                button.style.background = '#94a3b8'
                button.style.cursor = 'not-allowed'
                button.disabled = true
              } else {
                const span = button.querySelector('span')
                if (span) span.textContent = 'Adicionar ao carrinho'
                button.style.background = '#3b82f6'
                button.style.cursor = 'pointer'
                button.disabled = false
              }
            }
          }
        }, 100)
        
        if (!map.current) return
        if (!map.current) return
        
        setTimeout(() => {
          const popupElement = popup.getElement()
          if (popupElement && map.current) {
            const popupContent = popupElement.querySelector('.maplibregl-popup-content')
            if (popupContent) {
              const contentElement = popupContent as HTMLElement
              const contentWidth = contentElement.offsetWidth || 500
              const contentHeight = contentElement.offsetHeight || 300
              
              const markerPoint = map.current.project([lng, lat])
              const mapWidth = map.current.getContainer().offsetWidth
              const mapHeight = map.current.getContainer().offsetHeight
              
              const popupWidth = contentWidth + 40
              const popupHeight = contentHeight + 40
              
              let offsetX = 0
              let offsetY = -30
              
              if (markerPoint.x < popupWidth / 2 + 20) {
                offsetX = (popupWidth / 2) - markerPoint.x + 20
              } else if (markerPoint.x > mapWidth - popupWidth / 2 - 20) {
                offsetX = -(markerPoint.x - (mapWidth - popupWidth / 2)) - 20
              }
              
              if (markerPoint.y < popupHeight + 20) {
                offsetY = popupHeight - markerPoint.y + 20
              } else if (markerPoint.y > mapHeight - 20) {
                offsetY = -(markerPoint.y - mapHeight) - 20
              }
              
              popup.setOffset([offsetX, offsetY])
            }
          }
        }, 10)
      })

      const marker = new maplibregl.Marker({
        element: el,
        anchor: 'center',
        pitchAlignment: 'map',
        rotationAlignment: 'map'
      })
        .setLngLat([lng, lat])
        .addTo(map.current!)

      setTimeout(() => {
        const markerElement = marker.getElement()
        if (markerElement) {
          markerElement.style.transition = 'none !important'
          markerElement.style.transform = 'none !important'
          
          const svgElements = markerElement.querySelectorAll('svg')
          svgElements.forEach(svg => svg.remove())
          
          const allChildren = Array.from(markerElement.children)
          allChildren.forEach(child => {
            if (child.tagName !== 'IMG') {
              child.remove()
            }
          })
          
          const existingImg = markerElement.querySelector('img')
          if (!existingImg) {
            const newImg = img.cloneNode(true) as HTMLImageElement
            markerElement.appendChild(newImg)
          }
        }
      }, 50)

      map.current?.on('move', () => {
        const markerElement = marker.getElement()
        if (markerElement) {
          const htmlElement = markerElement as HTMLElement
          htmlElement.style.transition = 'none'
          const innerMarker = markerElement.querySelector('.marker') as HTMLElement
          if (innerMarker) {
            innerMarker.style.transition = 'none'
          }
        }
      })

      map.current?.on('moveend', () => {
        const markerElement = marker.getElement()
        if (markerElement) {
          const innerMarker = markerElement.querySelector('.marker') as HTMLElement
          if (innerMarker && isSelected) {
            innerMarker.style.transition = 'transform 0.2s ease'
          }
        }
      })

      marker.setPopup(popup)

      if (onLocationSelect) {
        el.addEventListener('click', () => {
          onLocationSelect(location.id)
        })
      }

      markersRef.current.push(marker)
      markersMapRef.current.set(location.id, marker)
    })
  }, [locations, selectedLocationId, onLocationSelect, mapLoaded])

  useEffect(() => {
    if (!map.current || !mapLoaded || !dataLoaded) return

    markersRef.current.forEach((m) => {
      const popup = m.getPopup()
      if (popup && popup.isOpen()) {
        popup.remove()
      }
    })

    if (selectedLocationId) {
      const selectedLocation = locations.find(loc => loc.id === selectedLocationId)
      if (!selectedLocation) return

      const lat = typeof selectedLocation.latitude === 'number' 
        ? selectedLocation.latitude 
        : parseFloat(String(selectedLocation.latitude))
      const lng = typeof selectedLocation.longitude === 'number' 
        ? selectedLocation.longitude 
        : parseFloat(String(selectedLocation.longitude))

      if (isNaN(lat) || isNaN(lng)) return

      const marker = markersMapRef.current.get(selectedLocationId)

      if (!marker || !map.current) return

      map.current.flyTo({
        center: [lng, lat],
        zoom: 15,
        duration: 1000
      })

      const openPopupSafely = () => {
        if (!map.current || !marker) return
        
        const popup = marker.getPopup()
        if (!popup) return

        try {
          const markerElement = marker.getElement()
          if (!markerElement || !markerElement.parentElement) {
            return
          }

          if (!popup.isOpen()) {
            marker.togglePopup()
          }
        } catch (error) {
          console.error('Error opening popup:', error)
        }
      }

      const handleMoveEnd = () => {
        setTimeout(openPopupSafely, 200)
      }

      map.current.once('moveend', handleMoveEnd)
      
      setTimeout(() => {
        openPopupSafely()
        if (map.current) {
          map.current.off('moveend', handleMoveEnd)
        }
      }, 1100)
    }
  }, [selectedLocationId, locations, mapLoaded, dataLoaded])

  return (
    <div className="w-full rounded-lg overflow-hidden relative bg-gray-100" style={{ height }}>
      {(!mapLoaded || !dataLoaded) && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/80 z-10 rounded-lg">
          <p className="text-gray-600">Carregando mapa...</p>
        </div>
      )}
      <div
        ref={mapContainer}
        className="w-full h-full"
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  )
}

