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
      el.style.width = '30px'
      el.style.height = '30px'
      el.style.borderRadius = '50%'
      el.style.backgroundColor = '#3b82f6'
      el.style.border = '3px solid white'
      el.style.cursor = 'pointer'
      el.style.boxShadow = '0 2px 4px rgba(0,0,0,0.3)'

      marker.current = new maplibregl.Marker(el)
        .setLngLat([longitude, latitude])
        .addTo(map.current)
    }

    map.current.on('click', (e) => {
      const { lng, lat } = e.lngLat
      
      if (!marker.current) {
        const el = document.createElement('div')
        el.className = 'marker'
        el.style.width = '30px'
        el.style.height = '30px'
        el.style.borderRadius = '50%'
        el.style.backgroundColor = '#3b82f6'
        el.style.border = '3px solid white'
        el.style.cursor = 'pointer'
        el.style.boxShadow = '0 2px 4px rgba(0,0,0,0.3)'

        marker.current = new maplibregl.Marker(el)
          .setLngLat([lng, lat])
          .addTo(map.current!)
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
        el.style.width = '30px'
        el.style.height = '30px'
        el.style.borderRadius = '50%'
        el.style.backgroundColor = '#3b82f6'
        el.style.border = '3px solid white'
        el.style.cursor = 'pointer'
        el.style.boxShadow = '0 2px 4px rgba(0,0,0,0.3)'

        marker.current = new maplibregl.Marker(el)
          .setLngLat([longitude, latitude])
          .addTo(map.current)
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

