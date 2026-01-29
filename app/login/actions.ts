'use server'

import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

async function getSupabase() {
  const cookieStore = cookies()
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        async get(name: string) { return (await cookieStore).get(name)?.value },
        async set(name: string, value: string, options: CookieOptions) {
          (await cookieStore).set({ name, value, ...options })
        },
        async remove(name: string, options: CookieOptions) {
          (await cookieStore).set({ name, value: '', ...options })
        },
      },
    }
  )
}

export async function signup(formData: FormData) {
  const supabase = await getSupabase()
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/auth/callback`,
    },
  })

  if (error) redirect(`/login?error=${error.message}`)
  redirect('/login?message=Check your email to confirm')
}

export async function login(formData: FormData) {
  const supabase = await getSupabase()
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  const { error } = await supabase.auth.signInWithPassword({ email, password })
  
  if (error) redirect(`/login?error=${error.message}`)
  redirect('/dashboard')
}

export async function signout() {
  const supabase = await getSupabase()
  await supabase.auth.signOut()
  redirect('/login')
}