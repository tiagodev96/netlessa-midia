import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { createClient as createSupabaseClient } from '@supabase/supabase-js'
import sharp from 'sharp'

const MAX_FILE_SIZE = 5 * 1024 * 1024
const ALLOWED_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization')
    const token = authHeader?.replace('Bearer ', '')
    
    let supabase = await createClient()
    let user = null
    let session = null
    
    if (token) {
      const tokenSupabase = createSupabaseClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
          global: {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        }
      )
      const { data: { user: tokenUser }, error: tokenError } = await tokenSupabase.auth.getUser(token)
      if (!tokenError && tokenUser) {
        user = tokenUser
        supabase = tokenSupabase
        session = { access_token: token, user: tokenUser }
      }
    }
    
    if (!user) {
      try {
        const {
          data: { session: cookieSession },
          error: sessionError,
        } = await supabase.auth.getSession()

        user = cookieSession?.user
        session = cookieSession
        
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
              { error: 'Unauthorized', details: authError?.message || sessionError?.message || 'Auth session missing!' },
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
    }
    
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized', details: 'No valid session found' },
        { status: 401 }
      )
    }

    const formData = await request.formData()
    const file = formData.get('file') as File

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      )
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: 'File size exceeds 5MB limit' },
        { status: 400 }
      )
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: 'Invalid file type. Only JPEG, PNG, and WebP are allowed' },
        { status: 400 }
      )
    }

    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    const optimizedBuffer = await sharp(buffer)
      .resize(1920, 1920, {
        fit: 'inside',
        withoutEnlargement: true,
      })
      .webp({ quality: 85 })
      .toBuffer()

    const fileExt = 'webp'
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 15)}.${fileExt}`

    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('location-images')
      .upload(fileName, optimizedBuffer, {
        contentType: 'image/webp',
        upsert: false,
      })

    if (uploadError) {
      console.error('Error uploading to storage:', uploadError)
      return NextResponse.json(
        { error: 'Failed to upload image', details: uploadError.message || JSON.stringify(uploadError) },
        { status: 500 }
      )
    }

    const { data: { publicUrl } } = supabase.storage
      .from('location-images')
      .getPublicUrl(fileName)

    return NextResponse.json({
      url: publicUrl,
      path: uploadData.path,
    })
  } catch (error) {
    console.error('Error in POST /api/locations/upload:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

