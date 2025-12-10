import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const supabase = await createClient()
    
    let user
    let authError
    
    try {
      const {
        data: { session },
        error: sessionError,
      } = await supabase.auth.getSession()

      console.log('[change-password] Session check:', {
        hasSession: !!session,
        hasUser: !!session?.user,
        sessionError: sessionError?.message,
      })

      user = session?.user
      
      if (!user) {
        console.log('[change-password] No user in session, trying getUser()')
        const result = await supabase.auth.getUser()
        user = result.data.user
        authError = result.error
        console.log('[change-password] getUser() result:', {
          hasUser: !!user,
          authError: authError?.message,
        })
      }
    } catch (getUserException: any) {
      console.error('Exception during getUser():', getUserException)
      const errorName = getUserException?.name || ''
      const errorMessage = getUserException?.message || ''
      
      if (
        errorName.includes('AuthSessionMissing') ||
        errorMessage.includes('Auth session missing') ||
        errorMessage.includes('AuthSessionMissingError')
      ) {
        return NextResponse.json(
          { error: 'Erro de autenticação. Faça login novamente.', details: errorMessage },
          { status: 401 }
        )
      }
      throw getUserException
    }

    if (authError) {
      const errorName = authError.name || ''
      const errorMessage = authError.message || ''
      
      if (errorMessage.includes('Refresh Token') || errorMessage.includes('refresh_token')) {
        console.warn('No refresh token found - user not authenticated')
        return NextResponse.json(
          { error: 'Unauthorized' },
          { status: 401 }
        )
      }
      if (
        errorName.includes('AuthSessionMissing') ||
        errorMessage.includes('Auth session missing') ||
        errorMessage.includes('AuthSessionMissingError')
      ) {
        return NextResponse.json(
          { error: 'Erro de autenticação. Faça login novamente.', details: errorMessage },
          { status: 401 }
        )
      }
      throw authError
    }

    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { currentPassword, newPassword, confirmPassword } = await request.json()

    if (!currentPassword) {
      return NextResponse.json(
        { error: 'Senha atual é obrigatória' },
        { status: 400 }
      )
    }

    if (!newPassword || !confirmPassword) {
      return NextResponse.json(
        { error: 'Nova senha e confirmação são obrigatórias' },
        { status: 400 }
      )
    }

    if (newPassword.length < 6) {
      return NextResponse.json(
        { error: 'A nova senha deve ter pelo menos 6 caracteres' },
        { status: 400 }
      )
    }

    if (newPassword !== confirmPassword) {
      return NextResponse.json(
        { error: 'As senhas não coincidem' },
        { status: 400 }
      )
    }

    if (currentPassword === newPassword) {
      return NextResponse.json(
        { error: 'A nova senha deve ser diferente da senha atual' },
        { status: 400 }
      )
    }

    if (!user || !user.email) {
      return NextResponse.json(
        { error: 'Unauthorized', details: 'Usuário não encontrado' },
        { status: 401 }
      )
    }

    let signInData
    let signInError
    
    try {
      const result = await supabase.auth.signInWithPassword({
        email: user.email,
        password: currentPassword,
      })
      signInData = result.data
      signInError = result.error
    } catch (signInException: any) {
      console.error('Exception during signInWithPassword:', signInException)
      const errorName = signInException?.name || ''
      const errorMessage = signInException?.message || ''
      
      if (
        errorName.includes('AuthSessionMissing') ||
        errorMessage.includes('Auth session missing') ||
        errorMessage.includes('AuthSessionMissingError')
      ) {
        return NextResponse.json(
          { error: 'Erro de autenticação. Faça login novamente.', details: errorMessage },
          { status: 401 }
        )
      }
      throw signInException
    }

    if (signInError) {
      console.error('Error validating current password:', signInError)
      if (signInError.message?.includes('Invalid login credentials')) {
        return NextResponse.json(
          { error: 'Senha atual incorreta' },
          { status: 401 }
        )
      }
      return NextResponse.json(
        { error: 'Erro ao validar senha atual', details: signInError.message },
        { status: 401 }
      )
    }

    if (!signInData.session) {
      console.error('No session after sign in')
      return NextResponse.json(
        { error: 'Erro ao validar senha. Tente novamente.' },
        { status: 500 }
      )
    }

    const updateResponse = await fetch(
      `${process.env.NEXT_PUBLIC_SUPABASE_URL}/auth/v1/user`,
      {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${signInData.session.access_token}`,
          'Content-Type': 'application/json',
          'apikey': process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        },
        body: JSON.stringify({
          password: newPassword,
        }),
      }
    )

    if (!updateResponse.ok) {
      const errorData = await updateResponse.json().catch(() => ({}))
      console.error('Error updating password via API:', errorData)
      
      let errorMessage = 'Erro ao atualizar senha. Tente novamente.'
      const apiMessage = errorData.message || errorData.error || ''
      
      if (apiMessage.includes('New password should be different from the old password') || 
          apiMessage.includes('should be different')) {
        errorMessage = 'A nova senha deve ser diferente da senha atual'
      }
      
      return NextResponse.json(
        { error: errorMessage, details: apiMessage },
        { status: 400 }
      )
    }

    return NextResponse.json({ success: true, message: 'Senha alterada com sucesso' })
  } catch (error: any) {
    console.error('Error in POST /api/auth/change-password:', error)
    console.error('Error details:', {
      message: error?.message,
      name: error?.name,
      code: error?.code,
      status: error?.status,
    })
    
    const errorName = error?.name || ''
    const errorMessage = error?.message || ''
    
    if (
      errorName.includes('AuthSessionMissing') ||
      errorMessage.includes('Auth session missing') ||
      errorMessage.includes('AuthSessionMissingError')
    ) {
      return NextResponse.json(
        { error: 'Erro de autenticação. Faça login novamente.', details: errorMessage },
        { status: 401 }
      )
    }
    
    if (error?.message?.includes('Refresh Token') || error?.message?.includes('refresh_token')) {
      console.warn('No refresh token found - user not authenticated')
      return NextResponse.json(
        { error: 'Unauthorized', details: error?.message },
        { status: 401 }
      )
    }
    return NextResponse.json(
      { error: 'Internal server error', details: error?.message || 'Erro desconhecido' },
      { status: 500 }
    )
  }
}

