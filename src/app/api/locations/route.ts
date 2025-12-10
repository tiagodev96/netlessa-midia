import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const supabase = await createClient()
    
    const { data, error } = await supabase
      .from('locations')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching locations:', error)
      return NextResponse.json(
        { error: 'Failed to fetch locations' },
        { status: 500 }
      )
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error('Error in GET /api/locations:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const supabase = await createClient()
    
    let user = null
    try {
      const {
        data: { session },
        error: sessionError,
      } = await supabase.auth.getSession()

      user = session?.user
      
      if (!user) {
        const {
          data: { user: userData },
          error: authError,
        } = await supabase.auth.getUser()
        user = userData
        
        if (authError || !user) {
          if (authError?.message?.includes('Refresh Token') || authError?.message?.includes('refresh_token')) {
            console.warn('No refresh token found - user not authenticated')
          } else {
            console.error('Auth error - Session:', sessionError, 'User:', authError)
          }
          return NextResponse.json(
            { error: 'Unauthorized', details: authError?.message || sessionError?.message },
            { status: 401 }
          )
        }
      }
    } catch (error: any) {
      if (error?.message?.includes('Refresh Token') || error?.message?.includes('refresh_token')) {
        console.warn('No refresh token found - user not authenticated')
        return NextResponse.json(
          { error: 'Unauthorized' },
          { status: 401 }
        )
      }
      throw error
    }

    const body = await request.json()
    const { nome, endereco, pessoas_impactadas, preco, quantidade_telas, latitude, longitude, tipo, imagem_url } = body

    if (!nome || !endereco || pessoas_impactadas === undefined || preco === undefined || quantidade_telas === undefined || latitude === undefined || longitude === undefined) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const { data, error } = await supabase
      .from('locations')
      .insert({
        nome,
        endereco,
        pessoas_impactadas,
        preco,
        quantidade_telas,
        latitude,
        longitude,
        tipo: tipo || 'comercial',
        imagem_url: imagem_url || null,
      })
      .select()
      .single()

    if (error) {
      console.error('Error creating location:', error)
      return NextResponse.json(
        { error: 'Failed to create location' },
        { status: 500 }
      )
    }

    return NextResponse.json(data, { status: 201 })
  } catch (error) {
    console.error('Error in POST /api/locations:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

