// src/components/auth/authHandlers.ts
import { supabase } from '../lib/supabaseClient'
import type { NavigateFunction } from 'react-router-dom'
// import { emailService } from '../../services/emailService' // Uncomment if using custom email service

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

export async function handleForgotPassword(
  email: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    })

    if (error) {
      console.error('Password reset error:', error.message)
      return { success: false, error: error.message }
    }

    console.log('Password reset email sent successfully')
    return { success: true }
  } catch (err: any) {
    console.error('Unexpected password reset error:', err.message)
    return { success: false, error: 'Unexpected error occurred' }
  }
}

// Alternative function using custom email service (uncomment if you want to use custom emails)
/*
export async function handleForgotPasswordCustom(
  email: string
): Promise<{ success: boolean; error?: string }> {
  try {
    // Generate a custom reset URL (you'll need to implement this)
    const resetUrl = `${window.location.origin}/reset-password?token=custom-token`;
    
    // Send custom branded email
    const result = await emailService.sendPasswordResetEmail(email, resetUrl);
    
    if (!result.success) {
      return { success: false, error: result.error || 'Failed to send reset email' };
    }

    console.log('Custom password reset email sent successfully');
    return { success: true };
  } catch (err: any) {
    console.error('Unexpected password reset error:', err.message);
    return { success: false, error: 'Unexpected error occurred' };
  }
}
*/
