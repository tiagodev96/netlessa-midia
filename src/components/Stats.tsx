"use client"

import { useEffect, useState } from "react"
import { formatStatValue } from "@/lib/utils"

interface StatsData {
  telas_ativas: number
  pessoas_impactadas: number
  impressoes_mensais: number
}

export default function Stats() {
  const [stats, setStats] = useState<StatsData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch("/api/stats")
        if (!response.ok) {
          throw new Error("Failed to fetch stats")
        }
        const data = await response.json()
        setStats(data)
      } catch (error) {
        console.error("Error fetching stats:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  if (loading || !stats) {
    return (
      <div className="flex flex-wrap gap-4">
        <div className="badge hover:bg-blue-100 transition-colors">
          <span className="font-bold mr-2">-</span>
          <span>Telas ativas</span>
        </div>
        <div className="badge hover:bg-blue-100 transition-colors">
          <span className="font-bold mr-2">-</span>
          <span>Impressões mensais</span>
        </div>
        <div className="badge hover:bg-blue-100 transition-colors">
          <span className="font-bold mr-2">95%</span>
          <span>Taxa de atenção</span>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-wrap gap-4">
      <div className="badge hover:bg-blue-100 transition-colors cursor-default">
        <span className="font-bold mr-2">{formatStatValue(stats.telas_ativas)}</span>
        <span>Telas ativas</span>
      </div>
      <div className="badge hover:bg-blue-100 transition-colors cursor-default">
        <span className="font-bold mr-2">{formatStatValue(stats.impressoes_mensais)}</span>
        <span>Impressões mensais</span>
      </div>
      <div className="badge hover:bg-blue-100 transition-colors cursor-default">
        <span className="font-bold mr-2">95%</span>
        <span>Taxa de atenção</span>
      </div>
    </div>
  )
}
