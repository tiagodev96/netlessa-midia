import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const supabase = await createClient()

    const { data, error } = await supabase
      .from('locations')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json(
          { error: 'Location not found' },
          { status: 404 }
        )
      }
      console.error('Error fetching location:', error)
      return NextResponse.json(
        { error: 'Failed to fetch location' },
        { status: 500 }
      )
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error('Error in GET /api/locations/[id]:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const supabase = await createClient()

    const {
      data: { session },
      error: sessionError,
    } = await supabase.auth.getSession()

    let user = session?.user
    if (!user) {
      const {
        data: { user: userData },
        error: authError,
      } = await supabase.auth.getUser()
      user = userData
      
      if (authError || !user) {
        console.error('Auth error:', authError || sessionError)
        return NextResponse.json(
          { error: 'Unauthorized' },
          { status: 401 }
        )
      }
    }

    const body = await request.json()
    const { nome, endereco, pessoas_impactadas, preco, quantidade_telas, latitude, longitude, tipo, imagem_url } = body

    const updateData: Record<string, any> = {}
    if (nome !== undefined) updateData.nome = nome
    if (endereco !== undefined) updateData.endereco = endereco
    if (pessoas_impactadas !== undefined) updateData.pessoas_impactadas = pessoas_impactadas
    if (preco !== undefined) updateData.preco = preco
    if (quantidade_telas !== undefined) updateData.quantidade_telas = quantidade_telas
    if (latitude !== undefined) updateData.latitude = latitude
    if (longitude !== undefined) updateData.longitude = longitude
    if (tipo !== undefined) updateData.tipo = tipo
    if (imagem_url !== undefined) updateData.imagem_url = imagem_url

    const { data, error } = await supabase
      .from('locations')
      .update(updateData)
      .eq('id', id)
      .select()
      .single()

    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json(
          { error: 'Location not found' },
          { status: 404 }
        )
      }
      console.error('Error updating location:', error)
      return NextResponse.json(
        { error: 'Failed to update location' },
        { status: 500 }
      )
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error('Error in PUT /api/locations/[id]:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const supabase = await createClient()

    const {
      data: { session },
      error: sessionError,
    } = await supabase.auth.getSession()

    let user = session?.user
    if (!user) {
      const {
        data: { user: userData },
        error: authError,
      } = await supabase.auth.getUser()
      user = userData
      
      if (authError || !user) {
        console.error('Auth error:', authError || sessionError)
        return NextResponse.json(
          { error: 'Unauthorized' },
          { status: 401 }
        )
      }
    }

    const { error } = await supabase
      .from('locations')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Error deleting location:', error)
      return NextResponse.json(
        { error: 'Failed to delete location' },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error in DELETE /api/locations/[id]:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

