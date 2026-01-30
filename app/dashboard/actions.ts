'use server'

import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'

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

/** * Fetches all products from the table
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

/** * Protected Action to upload image and add product
 */
export async function addProduct(formData: FormData) {
  const supabase = await getSupabaseClient()
  
  // TASK 3: Verify User Session
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: "Unauthorized: Please log in." }

  const name = formData.get('name') as string
  const price = parseFloat(formData.get('price') as string)
  const imageFile = formData.get('image') as File

  let imageUrl = ""

  // 1. Handle Image Upload to 'product-images' bucket
  if (imageFile && imageFile.size > 0) {
    const fileExt = imageFile.name.split('.').pop()
    const fileName = `${user.id}-${Date.now()}.${fileExt}`
    
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('product-images')
      .upload(fileName, imageFile)

    if (uploadError) return { error: "Upload failed: " + uploadError.message }

    // 2. Generate the Public URL
    const { data: urlData } = supabase.storage
      .from('product-images')
      .getPublicUrl(fileName)
    
    imageUrl = urlData.publicUrl
  }

  // 3. Insert into Database
  const { error } = await supabase.from('products').insert([
    { 
      name, 
      price, 
      image: imageUrl, 
      user_id: user.id 
    }
  ])

  if (error) return { error: error.message }
  
  revalidatePath('/dashboard/add')
  return { success: true }
}