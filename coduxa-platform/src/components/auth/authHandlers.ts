// src/components/auth/authHandlers.ts
import { supabase } from '../lib/supabaseClient'
import type { NavigateFunction } from 'react-router-dom'

export async function handleLogin(
  email: string,
  password: string,
  navigate: NavigateFunction // pass navigate from your component
): Promise<{ success: boolean; error?: string }> {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      console.error('Login error:', error.message)
      return { success: false, error: error.message }
    }

    console.log('Login success:', data)

    // ✅ Use navigate instead of window.location
    navigate('/dashboard') // for now everyone goes here

    return { success: true }
  } catch (err: any) {
    console.error('Unexpected login error:', err.message)
    return { success: false, error: 'Unexpected login error' }
  }
}
