"use client"

import type React from "react"

import { useState } from "react"

export default function LeadForm() {
  const [formData, setFormData] = useState({
    nome: "",
    empresa: "",
    email: "",
    telefone: "",
    objetivo: "",
    mensagem: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setIsSubmitted(true)
        setFormData({
          nome: "",
          empresa: "",
          email: "",
          telefone: "",
          objetivo: "",
          mensagem: "",
        })
      }
    } catch (error) {
      console.error("Erro ao enviar formulário:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  if (isSubmitted) {
    return (
      <div className="card text-center">
        <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="h3 text-gray-900 mb-2">Obrigado!</h3>
        <p className="text-gray-600">Recebemos sua mensagem e entraremos em contato em breve.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="card space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="nome" className="block text-sm font-medium text-gray-700 mb-2">
            Nome completo *
          </label>
          <input
            type="text"
            id="nome"
            name="nome"
            required
            value={formData.nome}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label htmlFor="empresa" className="block text-sm font-medium text-gray-700 mb-2">
            Empresa
          </label>
          <input
            type="text"
            id="empresa"
            name="empresa"
            value={formData.empresa}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            E-mail *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label htmlFor="telefone" className="block text-sm font-medium text-gray-700 mb-2">
            Telefone/WhatsApp *
          </label>
          <input
            type="tel"
            id="telefone"
            name="telefone"
            required
            value={formData.telefone}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      <div>
        <label htmlFor="objetivo" className="block text-sm font-medium text-gray-700 mb-2">
          Objetivo da campanha
        </label>
        <select
          id="objetivo"
          name="objetivo"
          value={formData.objetivo}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="">Selecione uma opção</option>
          <option value="branding">Branding/Reconhecimento de marca</option>
          <option value="leads">Geração de leads</option>
          <option value="vendas">Aumento de vendas</option>
          <option value="lancamento">Lançamento de produto/serviço</option>
          <option value="evento">Divulgação de evento</option>
          <option value="outro">Outro</option>
        </select>
      </div>

      <div>
        <label htmlFor="mensagem" className="block text-sm font-medium text-gray-700 mb-2">
          Mensagem
        </label>
        <textarea
          id="mensagem"
          name="mensagem"
          rows={4}
          value={formData.mensagem}
          onChange={handleChange}
          placeholder="Conte-nos mais sobre seu projeto..."
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full btn btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? "Enviando..." : "Enviar mensagem"}
      </button>
    </form>
  )
}
