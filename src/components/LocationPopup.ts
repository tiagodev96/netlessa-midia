import { formatBrazilianAddress } from '@/lib/addressFormatter'

interface LocationPopupData {
  id: string
  nome: string
  endereco: string
  pessoas_impactadas: number
  preco: number
  quantidade_telas: number
  imagem_url?: string | null
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

  const exibicoes = data.quantidade_telas * 5000

  const locationId = escapeHtml(data.id)

  return `
    <div style="
      min-width: 500px; 
      max-width: 600px; 
      font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: #ffffff;
      border-radius: 16px;
      padding: 0;
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(0, 0, 0, 0.05);
      overflow: hidden;
      display: flex;
      flex-direction: row;
      align-items: stretch;
    ">
      ${data.imagem_url ? `
        <div style="
          width: 200px; 
          min-width: 200px; 
          flex-shrink: 0;
          align-self: stretch;
          overflow: hidden; 
          background: #f1f5f9;
          position: relative;
        ">
          <img src="${escapeHtml(data.imagem_url)}" alt="${escapeHtml(data.nome)}" style="
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            width: 100%;
            height: 100%;
            object-fit: cover;
            object-position: top center;
            display: block;
          " />
        </div>
      ` : ''}
      <div style="
        flex: 1;
        display: flex;
        flex-direction: column;
        padding: 20px 24px;
      ">
        <div style="padding-bottom: 16px; border-bottom: 1px solid #f1f5f9; margin-bottom: 16px;">
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

        <div style="
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
          margin-bottom: 16px;
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
              Preço
            </div>
            <div style="
              font-size: 18px;
              font-weight: 600;
              color: #0f172a;
              line-height: 1.2;
            ">
              ${formatCurrency(data.preco)}
            </div>
            <div style="
              font-size: 11px;
              color: #94a3b8;
              margin-top: 2px;
            ">
              / 30 dias
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
              font-size: 18px;
              font-weight: 600;
              color: #0f172a;
              line-height: 1.2;
            ">
              ${formatNumber(data.quantidade_telas)}
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
              Pessoas Impactadas
            </div>
            <div style="
              font-size: 18px;
              font-weight: 600;
              color: #0f172a;
              line-height: 1.2;
            ">
              ${formatNumber(data.pessoas_impactadas)}
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
              Exibições
            </div>
            <div style="
              font-size: 18px;
              font-weight: 600;
              color: #0f172a;
              line-height: 1.2;
            ">
              ${formatNumber(exibicoes)}
            </div>
          </div>
        </div>

        <button 
          id="add-to-cart-btn-${locationId}"
          data-location-id="${locationId}"
          style="
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            width: 100%;
            padding: 14px 20px;
            background: #3b82f6;
            color: #ffffff;
            font-weight: 600;
            font-size: 14px;
            border: none;
            border-radius: 10px;
            transition: all 0.2s ease;
            cursor: pointer;
            margin-top: auto;
          "
          onmouseover="this.style.background='#2563eb'; this.style.transform='translateY(-1px)';"
          onmouseout="this.style.background='#3b82f6'; this.style.transform='translateY(0)';"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="9" cy="21" r="1"/>
            <circle cx="20" cy="21" r="1"/>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
          </svg>
          <span>Adicionar ao carrinho</span>
        </button>
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
