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

    // Extrai número do endereço se existir
    const numberMatch = query.match(/\b(\d+)\b/)
    const hasNumber = !!numberMatch
    
    // Para endereços com número, usa uma busca mais específica
    // Adiciona parâmetros extras para melhor precisão
    const geocodeParams = new URLSearchParams({
      format: 'json',
      q: query,
      limit: '5',
      addressdetails: '1',
      countrycodes: 'br',
    })
    
    if (hasNumber) {
      // Quando há número, adiciona parâmetros para melhor precisão
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

    // Ordena resultados por relevância (importance) quando disponível
    // Endereços com número tendem a ter maior importância
    const sortedData = [...data].sort((a: any, b: any) => {
      const importanceA = a.importance || 0
      const importanceB = b.importance || 0
      return importanceB - importanceA
    })

    const results = sortedData.map((item: any) => ({
      display_name: formatAddress(item, query),
      full_display_name: item.display_name,
      lat: parseFloat(item.lat),
      lon: parseFloat(item.lon),
      address: item.address,
      importance: item.importance || 0,
    }))

    return NextResponse.json(results)
  } catch (error) {
    console.error('Error in GET /api/geocode:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

