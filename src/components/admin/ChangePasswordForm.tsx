"use client"

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { PasswordInput } from '@/components/ui/password-input'
import { Label } from '@/components/ui/label'
import { createClient } from '@/lib/supabase/client'

interface ChangePasswordFormProps {
  onSuccess: () => void
}

interface ChangePasswordData {
  currentPassword: string
  newPassword: string
  confirmPassword: string
}

export default function ChangePasswordForm({ onSuccess }: ChangePasswordFormProps) {
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<ChangePasswordData>()

  const newPassword = watch('newPassword')

  const validatePassword = (password: string) => {
    if (password.length < 8) {
      return 'A senha deve ter no mínimo 8 caracteres'
    }
    if (!/[A-Z]/.test(password)) {
      return 'A senha deve conter pelo menos uma letra maiúscula'
    }
    if (!/[a-z]/.test(password)) {
      return 'A senha deve conter pelo menos uma letra minúscula'
    }
    if (!/[0-9]/.test(password)) {
      return 'A senha deve conter pelo menos um número'
    }
    if (!/[^A-Za-z0-9]/.test(password)) {
      return 'A senha deve conter pelo menos um caractere especial'
    }
    return true
  }

  const onSubmit = async (data: ChangePasswordData) => {
    setIsLoading(true)
    setError(null)

    try {
      const supabase = createClient()
      
      const { data: { user }, error: userError } = await supabase.auth.getUser()
      
      if (userError || !user || !user.email) {
        throw new Error('Você precisa estar autenticado para alterar a senha')
      }

      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: user.email,
        password: data.currentPassword,
      })

      if (signInError) {
        throw new Error('Senha atual incorreta')
      }

      if (data.currentPassword === data.newPassword) {
        throw new Error('A nova senha deve ser diferente da senha atual')
      }

      const { error: updateError } = await supabase.auth.updateUser({
        password: data.newPassword,
      })

      if (updateError) {
        let errorMessage = updateError.message || 'Erro ao atualizar senha. Tente novamente.'
        
        if (errorMessage.includes('New password should be different from the old password') || 
            errorMessage.includes('should be different')) {
          errorMessage = 'A nova senha deve ser diferente da senha atual'
        }
        
        throw new Error(errorMessage)
      }

      onSuccess()
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Erro ao alterar senha. Tente novamente.'
      )
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="currentPassword">Senha Atual</Label>
        <PasswordInput
          id="currentPassword"
          {...register('currentPassword', {
            required: 'Senha atual é obrigatória',
          })}
          placeholder="••••••••"
        />
        {errors.currentPassword && (
          <p className="text-sm text-red-500">{errors.currentPassword.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="newPassword">Nova Senha</Label>
        <PasswordInput
          id="newPassword"
          {...register('newPassword', {
            required: 'Nova senha é obrigatória',
            validate: validatePassword,
          })}
          placeholder="••••••••"
        />
        {errors.newPassword && (
          <p className="text-sm text-red-500">{errors.newPassword.message}</p>
        )}
        <p className="text-xs text-muted-foreground">
          A senha deve ter no mínimo 8 caracteres, incluindo letra maiúscula, minúscula, número e caractere especial
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="confirmPassword">Confirmar Nova Senha</Label>
        <PasswordInput
          id="confirmPassword"
          {...register('confirmPassword', {
            required: 'Confirmação de senha é obrigatória',
            validate: (value) =>
              value === newPassword || 'As senhas não coincidem',
          })}
          placeholder="••••••••"
        />
        {errors.confirmPassword && (
          <p className="text-sm text-red-500">{errors.confirmPassword.message}</p>
        )}
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? 'Alterando...' : 'Alterar Senha'}
      </Button>
    </form>
  )
}

