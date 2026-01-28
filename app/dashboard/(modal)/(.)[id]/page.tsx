import Link from "next/link"
import Image from "next/image"
import { getProductById } from "@/lib/data"
import { notFound } from "next/navigation"

type Props = { params: Promise<{ id: string }> }

export default async function ModalProduct({ params }: Props) {
  const { id } = await params
  const product = await getProductById(id)

  if (!product) notFound()

  return (
    <div className="bg-white p-8 rounded shadow max-w-lg mx-auto">
      <Link href="/dashboard" className="text-blue-600 hover:underline">
        ← Back
      </Link>
      <Image
        src={product.image || "/placeholder.png"}
        alt={product.name}
        width={400}
        height={300}
        className="rounded mt-4"
      />
      <h1 className="text-2xl font-bold mt-4">{product.name}</h1>
      <p className="text-green-600">${product.price}</p>
    </div>
  )
}
