"use client"

import { useEffect, useRef } from 'react'
import maplibregl from 'maplibre-gl'
import 'maplibre-gl/dist/maplibre-gl.css'

interface LocationMapProps {
  latitude: number
  longitude: number
  onLocationChange: (lat: number, lng: number) => void
}

export default function LocationMap({ latitude, longitude, onLocationChange }: LocationMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<maplibregl.Map | null>(null)
  const marker = useRef<maplibregl.Marker | null>(null)

  useEffect(() => {
    if (!mapContainer.current || map.current) return

    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: 'https://tiles.openfreemap.org/styles/liberty',
      center: [longitude || -38.45002347178393, latitude || -12.968578115330597],
      zoom: 13,
    })

    map.current.addControl(new maplibregl.NavigationControl(), 'top-right')

    if (latitude && longitude) {
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
      img.style.cssText = `
        width: 100% !important;
        height: 100% !important;
        object-fit: contain !important;
        border-radius: 50% !important;
        border: 3px solid white !important;
        background-color: white !important;
        background-image: none !important;
        display: block !important;
        box-shadow: 0 2px 4px rgba(0,0,0,0.3) !important;
      `
      
      img.onerror = () => {
        console.error('Erro ao carregar logo:', img.src)
      }
      
      el.appendChild(img)

      marker.current = new maplibregl.Marker({
        element: el,
        anchor: 'center',
        pitchAlignment: 'map',
        rotationAlignment: 'map'
      })
        .setLngLat([longitude, latitude])
        .addTo(map.current)

      setTimeout(() => {
        const markerElement = marker.current?.getElement()
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
        const markerElement = marker.current?.getElement()
        if (markerElement) {
          const htmlElement = markerElement as HTMLElement
          htmlElement.style.transition = 'none'
          const innerMarker = markerElement.querySelector('.marker') as HTMLElement
          if (innerMarker) {
            innerMarker.style.transition = 'none'
          }
        }
      })
    }

    map.current.on('click', (e) => {
      const { lng, lat } = e.lngLat
      
      if (!marker.current) {
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
        img.style.cssText = `
          width: 100% !important;
          height: 100% !important;
          object-fit: contain !important;
          border-radius: 50% !important;
          border: 3px solid white !important;
          background-color: white !important;
          background-image: none !important;
          display: block !important;
          box-shadow: 0 2px 4px rgba(0,0,0,0.3) !important;
        `
        
        img.onerror = () => {
          console.error('Erro ao carregar logo:', img.src)
        }
        
        el.appendChild(img)

        marker.current = new maplibregl.Marker({
          element: el,
          anchor: 'center',
          pitchAlignment: 'map',
          rotationAlignment: 'map'
        })
          .setLngLat([lng, lat])
          .addTo(map.current!)

        setTimeout(() => {
          const markerElement = marker.current?.getElement()
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
      } else {
        marker.current.setLngLat([lng, lat])
      }

      onLocationChange(lat, lng)
    })

    return () => {
      if (map.current) {
        map.current.remove()
        map.current = null
      }
    }
  }, [])

  useEffect(() => {
    if (map.current && latitude && longitude) {
      if (marker.current) {
        marker.current.setLngLat([longitude, latitude])
      } else {
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
        img.style.cssText = `
          width: 100% !important;
          height: 100% !important;
          object-fit: contain !important;
          border-radius: 50% !important;
          border: 3px solid white !important;
          background-color: white !important;
          background-image: none !important;
          display: block !important;
          box-shadow: 0 2px 4px rgba(0,0,0,0.3) !important;
        `
        
        img.onerror = () => {
          console.error('Erro ao carregar logo:', img.src)
        }
        
        el.appendChild(img)

        marker.current = new maplibregl.Marker({
          element: el,
          anchor: 'center',
          pitchAlignment: 'map',
          rotationAlignment: 'map'
        })
          .setLngLat([longitude, latitude])
          .addTo(map.current)

        setTimeout(() => {
          const markerElement = marker.current?.getElement()
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
      }
      map.current.setCenter([longitude, latitude])
    }
  }, [latitude, longitude])

  return (
    <div
      ref={mapContainer}
      className="w-full h-[400px] rounded-lg overflow-hidden border border-gray-200"
    />
  )
}

