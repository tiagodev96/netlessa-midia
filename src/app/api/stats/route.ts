import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

const IMPRESSOES_POR_TELA_MENSAL = 5000

export async function GET() {
  try {
    const supabase = await createClient()
    
    const { data, error } = await supabase
      .from('locations')
      .select('quantidade_telas, pessoas_impactadas')

    if (error) {
      console.error('Error fetching locations for stats:', error)
      return NextResponse.json(
        { error: 'Failed to fetch statistics' },
        { status: 500 }
      )
    }

    if (!data || data.length === 0) {
      return NextResponse.json({
        telas_ativas: 0,
        pessoas_impactadas: 0,
        impressoes_mensais: 0,
      })
    }

    const telas_ativas = data.reduce((sum, location) => {
      return sum + (location.quantidade_telas || 0)
    }, 0)

    const pessoas_impactadas = data.reduce((sum, location) => {
      return sum + (location.pessoas_impactadas || 0)
    }, 0)

    const impressoes_mensais = telas_ativas * IMPRESSOES_POR_TELA_MENSAL

    return NextResponse.json({
      telas_ativas,
      pessoas_impactadas,
      impressoes_mensais,
    })
  } catch (error) {
    console.error('Error in GET /api/stats:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

