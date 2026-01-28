import Image from "next/image"
import Link from "next/link"
import { getProducts } from "@/lib/data"

export default async function DashboardPage() {
  const products = await getProducts()

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-6">Dashboard - Products</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-white p-4 rounded shadow">

            <Link href={`/dashboard/(modal)/${product.id}`} aria-modal="true">
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

            <Link
              href={`/dashboard/${product.id}`}
              className="inline-block mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              View Details
            </Link>
            
          </div>
        ))}
      </div>
    </div>
  )
}
