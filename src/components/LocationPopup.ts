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

  const impactoIcon = `
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
      <circle cx="9" cy="7" r="4"></circle>
      <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
      <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
    </svg>
  `

  const precoIcon = `
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
      <line x1="12" y1="2" x2="12" y2="22"></line>
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
    </svg>
  `

  const telasIcon = `
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="2" y="4" width="20" height="14" rx="2" ry="2"></rect>
      <line x1="2" y1="10" x2="22" y2="10"></line>
    </svg>
  `

  const locationIcon = `
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
      <circle cx="12" cy="10" r="3"></circle>
    </svg>
  `

  return `
    <div style="
      min-width: 300px; 
      max-width: 360px; 
      font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: #ffffff;
      border-radius: 20px;
      padding: 0;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(0, 0, 0, 0.05);
      animation: popupSlideIn 0.25s cubic-bezier(0.16, 1, 0.3, 1);
      position: relative;
      overflow: hidden;
    ">
      <style>
        @keyframes popupSlideIn {
          from {
            opacity: 0;
            transform: translateY(-12px) scale(0.96);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      </style>
      
      <div style="
        background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
        padding: 20px 24px;
        position: relative;
      ">
        <div style="
          position: absolute;
          top: 0;
          right: 0;
          width: 120px;
          height: 120px;
          background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);
          border-radius: 50%;
          transform: translate(30px, -30px);
        "></div>
        <h3 style="
          margin: 0; 
          font-size: 20px; 
          font-weight: 700; 
          color: #ffffff;
          letter-spacing: -0.025em;
          line-height: 1.3;
          position: relative;
          z-index: 1;
        ">
          ${escapeHtml(data.nome)}
        </h3>
      </div>

      <div style="padding: 20px 24px;">
        <div style="
          display: flex;
          align-items: flex-start;
          gap: 12px;
          padding: 14px;
          background: #f8fafc;
          border-radius: 12px;
          margin-bottom: 16px;
          border: 1px solid #e2e8f0;
        ">
          <div style="
            width: 36px;
            height: 36px;
            border-radius: 10px;
            background: linear-gradient(135deg, #3b82f6, #2563eb);
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
            color: #ffffff;
            box-shadow: 0 4px 6px -1px rgba(37, 99, 235, 0.2);
          ">
            ${locationIcon}
          </div>
          <div style="flex: 1; min-width: 0;">
            <p style="
              margin: 0; 
              font-size: 13px; 
              color: #475569; 
              line-height: 1.5;
              font-weight: 500;
            ">
              ${escapeHtml(formattedAddress.formatted)}
            </p>
          </div>
        </div>
        
        <div style="
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
          margin-bottom: 10px;
        ">
          <div style="
            padding: 14px;
            background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
            border-radius: 12px;
            border: 1px solid #bae6fd;
            position: relative;
            overflow: hidden;
          ">
            <div style="
              position: absolute;
              top: -20px;
              right: -20px;
              width: 60px;
              height: 60px;
              background: rgba(59, 130, 246, 0.1);
              border-radius: 50%;
            "></div>
            <div style="
              display: flex;
              align-items: center;
              justify-content: center;
              width: 36px;
              height: 36px;
              border-radius: 10px;
              background: #3b82f6;
              color: #ffffff;
              margin-bottom: 10px;
              box-shadow: 0 4px 6px -1px rgba(59, 130, 246, 0.3);
              position: relative;
              z-index: 1;
            ">
              ${impactoIcon}
            </div>
            <div style="position: relative; z-index: 1;">
              <div style="font-size: 10px; color: #64748b; font-weight: 600; margin-bottom: 4px; text-transform: uppercase; letter-spacing: 0.5px;">
                Impacto
              </div>
              <div style="font-size: 18px; font-weight: 700; color: #1e293b; line-height: 1.2;">
                ${formatNumber(data.impacto)}
              </div>
              <div style="font-size: 11px; color: #64748b; margin-top: 2px;">
                pessoas
              </div>
            </div>
          </div>

          <div style="
            padding: 14px;
            background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%);
            border-radius: 12px;
            border: 1px solid #86efac;
            position: relative;
            overflow: hidden;
          ">
            <div style="
              position: absolute;
              top: -20px;
              right: -20px;
              width: 60px;
              height: 60px;
              background: rgba(34, 197, 94, 0.1);
              border-radius: 50%;
            "></div>
            <div style="
              display: flex;
              align-items: center;
              justify-content: center;
              width: 36px;
              height: 36px;
              border-radius: 10px;
              background: #22c55e;
              color: #ffffff;
              margin-bottom: 10px;
              box-shadow: 0 4px 6px -1px rgba(34, 197, 94, 0.3);
              position: relative;
              z-index: 1;
            ">
              ${precoIcon}
            </div>
            <div style="position: relative; z-index: 1;">
              <div style="font-size: 10px; color: #64748b; font-weight: 600; margin-bottom: 4px; text-transform: uppercase; letter-spacing: 0.5px;">
                Preço
              </div>
              <div style="font-size: 18px; font-weight: 700; color: #1e293b; line-height: 1.2;">
                ${formatCurrency(data.preco)}
              </div>
            </div>
          </div>
        </div>

        <div style="
          padding: 14px;
          background: linear-gradient(135deg, #faf5ff 0%, #f3e8ff 100%);
          border-radius: 12px;
          border: 1px solid #d8b4fe;
          position: relative;
          overflow: hidden;
        ">
          <div style="
            position: absolute;
            top: -20px;
            right: -20px;
            width: 60px;
            height: 60px;
            background: rgba(168, 85, 247, 0.1);
            border-radius: 50%;
          "></div>
          <div style="
            display: flex;
            align-items: center;
            gap: 12px;
            position: relative;
            z-index: 1;
          ">
            <div style="
              display: flex;
              align-items: center;
              justify-content: center;
              width: 36px;
              height: 36px;
              border-radius: 10px;
              background: #a855f7;
              color: #ffffff;
              box-shadow: 0 4px 6px -1px rgba(168, 85, 247, 0.3);
              flex-shrink: 0;
            ">
              ${telasIcon}
            </div>
            <div style="flex: 1; min-width: 0;">
              <div style="font-size: 10px; color: #64748b; font-weight: 600; margin-bottom: 4px; text-transform: uppercase; letter-spacing: 0.5px;">
                Quantidade de Telas
              </div>
              <div style="font-size: 18px; font-weight: 700; color: #1e293b; line-height: 1.2;">
                ${formatNumber(data.quantidade_telas)}
              </div>
            </div>
          </div>
        </div>
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
