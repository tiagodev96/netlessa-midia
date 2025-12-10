import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const supabase = await createClient()
    
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser()

    if (error) {
      if (error.message?.includes('Refresh Token') || error.message?.includes('refresh_token')) {
        console.warn('No refresh token found - user not authenticated')
        return NextResponse.json(
          { error: 'Unauthorized' },
          { status: 401 }
        )
      }
      throw error
    }

    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    return NextResponse.json({ user })
  } catch (error: any) {
    if (error?.message?.includes('Refresh Token') || error?.message?.includes('refresh_token')) {
      console.warn('No refresh token found - user not authenticated')
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }
    console.error('Error in GET /api/auth/me:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

