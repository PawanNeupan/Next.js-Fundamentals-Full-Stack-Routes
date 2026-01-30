import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { getProductById } from "@/lib/data"
import Breadcrumbs from "@/app/components/Breadcrumbs"

type Props = {
  params: Promise<{ id: string }>
}

/* ---------------- Dynamic Metadata ---------------- */
export async function generateMetadata({ params }: Props) {
  const { id } = await params
  const product = await getProductById(id)

  if (!product) {
    return {
      title: "Product Not Found",
      description: "This product does not exist.",
    }
  }

  return {
    title: `${product.name} | Dashboard`,
    description: `Details and price for ${product.name}, $${product.price}`,
  }
}

/* ---------------- Page ---------------- */
export default async function ProductPage({ params }: Props) {
  const { id } = await params
  const product = await getProductById(id)

  if (!product) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      {/* Breadcrumbs */}
      <p><Breadcrumbs /></p>

      <Link
        href="/dashboard"
        className="text-blue-600 hover:underline mb-4 inline-block"
      >
        ← Back to Dashboard
      </Link>

      <div className="bg-white p-8 rounded-lg shadow-xl max-w-lg mx-auto">
        {/* Product Image */}
        <Image
          src={product.image}
          alt={product.name}
          width={300}
          height={300}
          className="rounded mb-4 object-cover"
        />

        <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
        <p className="text-xl text-green-600 font-semibold mb-4">
          ${product.price}
        </p>
        <p className="text-gray-500">Product ID: {product.id}</p>
      </div>
    </div>
  )
}
