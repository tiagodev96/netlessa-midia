"use client"

import { useEffect, useRef, useState } from 'react'
import maplibregl from 'maplibre-gl'
import { getLocationPopupHTML } from './LocationPopup'

export interface Location {
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
  const [locations, setLocations] = useState<Location[]>([])
  const [mapLoaded, setMapLoaded] = useState(false)
  const [dataLoaded, setDataLoaded] = useState(false)

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
      el.style.width = '30px'
      el.style.height = '30px'
      el.style.borderRadius = '50%'
      const isSelected = selectedLocationId === location.id
      el.style.backgroundColor = isSelected ? '#1d4ed8' : '#3b82f6'
      el.style.border = '3px solid white'
      el.style.cursor = 'pointer'
      el.style.boxShadow = isSelected ? '0 4px 8px rgba(29, 78, 216, 0.4)' : '0 2px 4px rgba(0,0,0,0.3)'
      el.style.transition = 'all 0.2s ease'
      if (isSelected) {
        el.style.transform = 'scale(1.2)'
      }

      const popup = new maplibregl.Popup({ 
        offset: [10, -100],
        anchor: 'left',
        closeButton: true,
        closeOnClick: false
      }).setHTML(
        getLocationPopupHTML({
          nome: location.nome,
          endereco: location.endereco,
          impacto: location.impacto,
          preco: preco,
          quantidade_telas: location.quantidade_telas
        })
      )

      popup.on('open', () => {
        const popupElement = popup.getElement()
        if (popupElement) {
          const popupContent = popupElement.querySelector('.maplibregl-popup-content')
          if (popupContent) {
            const contentHeight = (popupContent as HTMLElement).offsetHeight
            popup.setOffset([10, -contentHeight / 2])
          }
        }
      })

      const marker = new maplibregl.Marker(el)
        .setLngLat([lng, lat])
        .addTo(map.current!)

      marker.setPopup(popup)

      if (onLocationSelect) {
        el.addEventListener('click', () => {
          onLocationSelect(location.id)
        })
      }

      markersRef.current.push(marker)
    })
  }, [locations, selectedLocationId, onLocationSelect, mapLoaded])

  useEffect(() => {
    if (!map.current || !selectedLocationId || !mapLoaded) return

    const selectedLocation = locations.find(loc => loc.id === selectedLocationId)
    if (!selectedLocation) return

    const lat = typeof selectedLocation.latitude === 'number' 
      ? selectedLocation.latitude 
      : parseFloat(String(selectedLocation.latitude))
    const lng = typeof selectedLocation.longitude === 'number' 
      ? selectedLocation.longitude 
      : parseFloat(String(selectedLocation.longitude))

    if (isNaN(lat) || isNaN(lng)) return

    const marker = markersRef.current.find((m, index) => {
      const location = locations[index]
      return location?.id === selectedLocationId
    })

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

        if (map.current.getContainer() && !popup.isOpen()) {
          popup.addTo(map.current)
        }
      } catch (error) {
        console.error('Error opening popup:', error)
      }
    }

    const handleMoveEnd = () => {
      setTimeout(openPopupSafely, 100)
    }

    map.current.once('moveend', handleMoveEnd)
    
    setTimeout(() => {
      openPopupSafely()
      if (map.current) {
        map.current.off('moveend', handleMoveEnd)
      }
    }, 1200)
  }, [selectedLocationId, locations, mapLoaded])

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

