import { NextResponse } from 'next/server'

function formatAddress(item: any, originalQuery: string): string {
  const addr = item.address || {}
  
  // Extrai número da query original se existir
  const numberMatch = originalQuery.match(/\b(\d+)\b/)
  const originalNumber = numberMatch ? numberMatch[1] : null
  
  // Tenta construir um endereço mais curto e preciso
  const parts: string[] = []
  
  // Rua/Logradouro
  if (addr.road || addr.street) {
    const road = addr.road || addr.street
    // Se tem número na query original, adiciona ao nome da rua
    if (originalNumber) {
      parts.push(`${road}, ${originalNumber}`)
    } else if (addr.house_number || addr.house) {
      parts.push(`${road}, ${addr.house_number || addr.house}`)
    } else {
      parts.push(road)
    }
  } else if (originalNumber) {
    // Se não tem rua mas tem número, usa a query original
    return originalQuery
  }
  
  // Bairro (opcional, só se não ficar muito longo)
  if (parts.length < 2 && (addr.suburb || addr.neighbourhood)) {
    parts.push(addr.suburb || addr.neighbourhood)
  }
  
  // Cidade e Estado
  if (addr.city || addr.town) {
    const city = addr.city || addr.town
    if (addr.state) {
      parts.push(`${city}, ${addr.state}`)
    } else {
      parts.push(city)
    }
  } else if (addr.state) {
    parts.push(addr.state)
  }
  
  // Se conseguiu construir, retorna
  if (parts.length > 0) {
    return parts.join(', ')
  }
  
  // Se tem número na query original, preserva o que o usuário digitou
  if (originalNumber) {
    return originalQuery
  }
  
  // Fallback: retorna display_name mas limitado a 3 partes
  const displayName = item.display_name || ''
  const parts2 = displayName.split(',').slice(0, 3)
  return parts2.join(',').trim()
}

async function geocodeWithGoogle(query: string) {
  const apiKey = process.env.GOOGLE_MAPS_API_KEY
  if (!apiKey) {
    return null
  }

  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(query)}&key=${apiKey}&language=pt-BR&region=br`,
      {
        headers: {
          'User-Agent': 'Netlessa-Midia/1.0',
        },
      }
    )

    if (!response.ok) {
      return null
    }

    const data = await response.json()

    if (data.status !== 'OK' || !data.results || data.results.length === 0) {
      return null
    }

    return data.results.slice(0, 5).map((result: any) => {
      const location = result.geometry.location
      const addressComponents = result.address_components || []
      
      const streetNumber = addressComponents.find((c: any) => c.types.includes('street_number'))?.long_name || ''
      const route = addressComponents.find((c: any) => c.types.includes('route'))?.long_name || ''
      const neighborhood = addressComponents.find((c: any) => c.types.includes('sublocality') || c.types.includes('neighborhood'))?.long_name || ''
      const city = addressComponents.find((c: any) => c.types.includes('administrative_area_level_2'))?.long_name || 
                   addressComponents.find((c: any) => c.types.includes('locality'))?.long_name || ''
      const state = addressComponents.find((c: any) => c.types.includes('administrative_area_level_1'))?.short_name || ''

      let formattedAddress = result.formatted_address
      if (streetNumber && route) {
        formattedAddress = `${route}, ${streetNumber}`
        if (neighborhood) formattedAddress += `, ${neighborhood}`
        if (city && state) formattedAddress += `, ${city}, ${state}`
        else if (city) formattedAddress += `, ${city}`
      }

      return {
        display_name: formattedAddress,
        full_display_name: result.formatted_address,
        lat: location.lat,
        lon: location.lng,
        address: {
          street_number: streetNumber,
          route: route,
          neighborhood: neighborhood,
          city: city,
          state: state,
        },
        importance: result.geometry.location_type === 'ROOFTOP' ? 1 : 0.8,
      }
    })
  } catch (error) {
    console.error('Error with Google Geocoding:', error)
    return null
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get('q')

    if (!query) {
      return NextResponse.json(
        { error: 'Query parameter is required' },
        { status: 400 }
      )
    }

    let results = await geocodeWithGoogle(query)

    if (!results) {
      const numberMatch = query.match(/\b(\d+)\b/)
      const hasNumber = !!numberMatch
      
      const geocodeParams = new URLSearchParams({
        format: 'json',
        q: query,
        limit: '5',
        addressdetails: '1',
        countrycodes: 'br',
      })
      
      if (hasNumber) {
        geocodeParams.append('accept-language', 'pt-BR')
        geocodeParams.append('extratags', '1')
        geocodeParams.append('namedetails', '1')
      }

      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?${geocodeParams.toString()}`,
        {
          headers: {
            'User-Agent': 'Netlessa-Midia/1.0',
          },
        }
      )

      if (!response.ok) {
        throw new Error('Geocoding service unavailable')
      }

      const data = await response.json()

      const sortedData = [...data].sort((a: any, b: any) => {
        const importanceA = a.importance || 0
        const importanceB = b.importance || 0
        return importanceB - importanceA
      })

      results = sortedData.map((item: any) => ({
        display_name: formatAddress(item, query),
        full_display_name: item.display_name,
        lat: parseFloat(item.lat),
        lon: parseFloat(item.lon),
        address: item.address,
        importance: item.importance || 0,
      }))
    }

    return NextResponse.json(results)
  } catch (error) {
    console.error('Error in GET /api/geocode:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

