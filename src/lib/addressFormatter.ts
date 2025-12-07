export interface FormattedAddress {
  rua: string
  numero: string
  bairro: string
  cidade: string
  cep: string
  formatted: string
}

export function formatBrazilianAddress(address: string): FormattedAddress {
  const parts = address.split(',').map(p => p.trim())
  
  let rua = ''
  let numero = ''
  let bairro = ''
  let cidade = ''
  let cep = ''
  
  if (parts.length >= 1) {
    const firstPart = parts[0]
    const numberMatch = firstPart.match(/(.+?)\s*,\s*(\d+)$|(.+?)\s+(\d+)$|^(.+)$/)
    
    if (numberMatch) {
      if (numberMatch[2]) {
        rua = numberMatch[1].trim()
        numero = numberMatch[2]
      } else if (numberMatch[4]) {
        rua = numberMatch[3].trim()
        numero = numberMatch[4]
      } else {
        rua = firstPart
      }
    } else {
      rua = firstPart
    }
  }
  
  if (parts.length >= 2) {
    const secondPart = parts[1].toLowerCase()
    if (secondPart.match(/^\d{5}-?\d{3}$/)) {
      cep = secondPart.replace(/-/g, '')
      cep = cep.substring(0, 5) + '-' + cep.substring(5)
    } else if (!secondPart.match(/^(salvador|ba|bahia)$/i)) {
      bairro = parts[1]
    }
  }
  
  if (parts.length >= 3) {
    const thirdPart = parts[2].toLowerCase()
    if (thirdPart.match(/^\d{5}-?\d{3}$/)) {
      cep = thirdPart.replace(/-/g, '')
      cep = cep.substring(0, 5) + '-' + cep.substring(5)
    } else if (!thirdPart.match(/^(salvador|ba|bahia)$/i) && !bairro) {
      bairro = parts[2]
    }
  }
  
  for (let i = 1; i < parts.length; i++) {
    const part = parts[i].toLowerCase()
    if (part.match(/^(salvador|ba|bahia)$/i)) {
      cidade = 'Salvador'
      break
    } else if (part.includes('salvador')) {
      cidade = 'Salvador'
      if (!bairro && i > 1) {
        bairro = parts[i - 1]
      }
      break
    }
  }
  
  if (!cidade) {
    cidade = parts.find(p => p.toLowerCase().includes('salvador')) || 'Salvador'
  }
  
  const addressParts: string[] = []
  if (rua) {
    if (numero) {
      addressParts.push(`${rua}, ${numero}`)
    } else {
      addressParts.push(rua)
    }
  }
  
  if (bairro) {
    addressParts.push(bairro)
  }
  
  if (cidade) {
    addressParts.push(`${cidade} - BA`)
  }
  
  if (cep) {
    addressParts.push(`CEP: ${cep}`)
  }
  
  const formatted = addressParts.length > 0 
    ? addressParts.join(' - ') 
    : address
  
  return {
    rua: rua || '',
    numero: numero || '',
    bairro: bairro || '',
    cidade: cidade || '',
    cep: cep || '',
    formatted
  }
}
