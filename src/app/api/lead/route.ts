import { type NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const { nome, empresa, email, telefone, objetivo, mensagem } = body

    if (!nome || !email || !telefone) {
      return NextResponse.json(
        { error: "Nome, e-mail e telefone são obrigatórios" },
        { status: 400 }
      )
    }

    const objetivoLabels: Record<string, string> = {
      branding: "Branding/Reconhecimento de marca",
      leads: "Geração de leads",
      vendas: "Aumento de vendas",
      lancamento: "Lançamento de produto/serviço",
      evento: "Divulgação de evento",
      outro: "Outro",
    }

    const objetivoText = objetivo ? objetivoLabels[objetivo] || objetivo : "Não informado"

    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #2563eb; color: white; padding: 20px; border-radius: 8px 8px 0 0; }
            .content { background-color: #f9fafb; padding: 20px; border-radius: 0 0 8px 8px; }
            .field { margin-bottom: 15px; }
            .label { font-weight: bold; color: #1f2937; }
            .value { color: #4b5563; margin-top: 5px; }
            .footer { margin-top: 20px; padding-top: 20px; border-top: 1px solid #e5e7eb; font-size: 12px; color: #6b7280; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2>Novo Lead Recebido - Netlessa</h2>
            </div>
            <div class="content">
              <div class="field">
                <div class="label">Nome:</div>
                <div class="value">${nome}</div>
              </div>
              ${empresa ? `
              <div class="field">
                <div class="label">Empresa:</div>
                <div class="value">${empresa}</div>
              </div>
              ` : ""}
              <div class="field">
                <div class="label">E-mail:</div>
                <div class="value">${email}</div>
              </div>
              <div class="field">
                <div class="label">Telefone/WhatsApp:</div>
                <div class="value">${telefone}</div>
              </div>
              <div class="field">
                <div class="label">Objetivo da campanha:</div>
                <div class="value">${objetivoText}</div>
              </div>
              ${mensagem ? `
              <div class="field">
                <div class="label">Mensagem:</div>
                <div class="value">${mensagem.replace(/\n/g, "<br>")}</div>
              </div>
              ` : ""}
            </div>
            <div class="footer">
              <p>Este e-mail foi enviado automaticamente pelo formulário de contato do site Netlessa.</p>
              <p>Data: ${new Date().toLocaleString("pt-BR")}</p>
            </div>
          </div>
        </body>
      </html>
    `

    const emailText = `
Novo Lead Recebido - Netlessa

Nome: ${nome}
${empresa ? `Empresa: ${empresa}\n` : ""}E-mail: ${email}
Telefone/WhatsApp: ${telefone}
Objetivo da campanha: ${objetivoText}
${mensagem ? `Mensagem: ${mensagem}\n` : ""}

Data: ${new Date().toLocaleString("pt-BR")}
    `.trim()

    if (!resend) {
      console.error("RESEND_API_KEY não configurada. Configure a variável de ambiente.")
      return NextResponse.json(
        { error: "Serviço de e-mail não configurado. Entre em contato com o administrador." },
        { status: 500 }
      )
    }

    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev",
      to: "netlessamidia.adm@gmail.com",
      subject: `Novo Lead: ${nome}${empresa ? ` - ${empresa}` : ""}`,
      text: emailText,
      html: emailHtml,
      reply_to: email,
    })

    console.log("Lead email sent successfully:", { nome, email })

    return NextResponse.json({ ok: true, message: "E-mail enviado com sucesso" })
  } catch (error) {
    console.error("Error processing lead:", error)
    return NextResponse.json(
      { error: "Erro ao processar o lead. Tente novamente mais tarde." },
      { status: 500 }
    )
  }
}
