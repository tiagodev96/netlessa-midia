import { formatBrazilianAddress } from '@/lib/addressFormatter'

interface LocationPopupData {
  nome: string
  endereco: string
  impacto: number
  preco: number
  quantidade_telas: number
}

export function getLocationPopupHTML(data: LocationPopupData): string {
  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value)
  }

  const formatNumber = (value: number): string => {
    return new Intl.NumberFormat('pt-BR').format(value)
  }
  
  const formattedAddress = formatBrazilianAddress(data.endereco)

  const whatsappMessage = encodeURIComponent(
    `Quero divulgar minha empresa neste local:\n\n` +
    `*${data.nome}*\n` +
    `*Endereco:* ${formattedAddress.formatted}\n` +
    `*Impacto:* ${formatNumber(data.impacto)} pessoas\n` +
    `*Quantidade de telas:* ${formatNumber(data.quantidade_telas)}`
  )

  const whatsappUrl = `https://wa.me/5571986064654?text=${whatsappMessage}`

  return `
    <div style="
      min-width: 320px; 
      max-width: 380px; 
      font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: #ffffff;
      border-radius: 16px;
      padding: 0;
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(0, 0, 0, 0.05);
      overflow: hidden;
    ">
      <div style="padding: 20px 24px 16px 24px; border-bottom: 1px solid #f1f5f9;">
        <h3 style="
          margin: 0; 
          font-size: 18px; 
          font-weight: 600; 
          color: #0f172a;
          letter-spacing: -0.01em;
          line-height: 1.4;
        ">
          ${escapeHtml(data.nome)}
        </h3>
        <p style="
          margin: 8px 0 0 0; 
          font-size: 13px; 
          color: #64748b; 
          line-height: 1.5;
        ">
          ${escapeHtml(formattedAddress.formatted)}
        </p>
      </div>

      <div style="padding: 20px 24px;">
        <div style="
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
          margin-bottom: 24px;
        ">
          <div>
            <div style="
              font-size: 11px;
              color: #94a3b8;
              font-weight: 500;
              margin-bottom: 6px;
              text-transform: uppercase;
              letter-spacing: 0.5px;
            ">
              Impacto
            </div>
            <div style="
              font-size: 20px;
              font-weight: 600;
              color: #0f172a;
              line-height: 1.2;
            ">
              ${formatNumber(data.impacto)}
            </div>
            <div style="
              font-size: 11px;
              color: #94a3b8;
              margin-top: 2px;
            ">
              pessoas
            </div>
          </div>

          <div>
            <div style="
              font-size: 11px;
              color: #94a3b8;
              font-weight: 500;
              margin-bottom: 6px;
              text-transform: uppercase;
              letter-spacing: 0.5px;
            ">
              Preço
            </div>
            <div style="
              font-size: 20px;
              font-weight: 600;
              color: #0f172a;
              line-height: 1.2;
            ">
              ${formatCurrency(data.preco)}
            </div>
          </div>

          <div>
            <div style="
              font-size: 11px;
              color: #94a3b8;
              font-weight: 500;
              margin-bottom: 6px;
              text-transform: uppercase;
              letter-spacing: 0.5px;
            ">
              Telas
            </div>
            <div style="
              font-size: 20px;
              font-weight: 600;
              color: #0f172a;
              line-height: 1.2;
            ">
              ${formatNumber(data.quantidade_telas)}
            </div>
          </div>
        </div>

        <a 
          href="${whatsappUrl}" 
          target="_blank" 
          rel="noopener noreferrer"
          style="
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            width: 100%;
            padding: 14px 20px;
            background: #25D366;
            color: #ffffff;
            font-weight: 600;
            font-size: 14px;
            text-decoration: none;
            border-radius: 10px;
            transition: all 0.2s ease;
            cursor: pointer;
          "
          onmouseover="this.style.background='#20ba5a'; this.style.transform='translateY(-1px)';"
          onmouseout="this.style.background='#25D366'; this.style.transform='translateY(0)';"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
          </svg>
          <span>Divulgar neste local</span>
        </a>
      </div>
    </div>
  `
}

function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  }
  return text.replace(/[&<>"']/g, (m) => map[m])
}
