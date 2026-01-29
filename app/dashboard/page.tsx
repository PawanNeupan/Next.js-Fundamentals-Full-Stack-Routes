import Image from "next/image"
import Link from "next/link"
import { getProducts } from "@/lib/data"
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export default async function DashboardPage() {
  // Task 2: Implement Supabase SSR in Server Component
  const cookieStore = cookies()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        async get(name: string) { return (await cookieStore).get(name)?.value },
      },
    }
  )

  const { data: { user } } = await supabase.auth.getUser()
  const products = await getProducts()

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        {user && <span className="text-sm text-gray-500">User: {user.email}</span>}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-white p-4 rounded shadow">
            <Link href={`/dashboard/${product.id}`}>
              <Image
                src={product.image || "/placeholder.png"}
                alt={product.name}
                width={200}
                height={200}
                className="rounded mb-3 object-cover cursor-pointer"
              />
            </Link>
            <h2 className="text-xl font-semibold">{product.name}</h2>
            <p className="text-gray-600 mb-2">${product.price}</p>
          </div>
        ))}
      </div>
    </div>
  )
}