'use server'

import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'

// Helper to initialize Supabase inside actions
async function getSupabaseClient() {
  const cookieStore = await cookies()
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) { return cookieStore.get(name)?.value },
      },
    }
  )
}

/** * NEW: Function to view/fetch all products 
 * Use this in your Server Components
 */
export async function getProducts() {
  const supabase = await getSupabaseClient()

  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Fetch error:', error.message)
    return []
  }

  return data
}

/** * TASK 3: Protected Add Product Action
 */
export async function addProduct(formData: FormData) {
  const supabase = await getSupabaseClient()

  // TASK 3 Verification
  const { data: { user } } = await supabase.auth.getUser()
  
  // Correction: Server actions can't 'alert()', we return an error instead
  if (!user) return { error: "Unauthorized: Please log in." }

  const rawFormData = {
    name: formData.get('name') as string,
    price: parseFloat(formData.get('price') as string),
    image: formData.get('image') as string,
    user_id: user.id
  }

  const { error } = await supabase.from('products').insert([rawFormData])

  if (error) return { error: error.message }
  
  revalidatePath('/dashboard')
  return { success: true }
}