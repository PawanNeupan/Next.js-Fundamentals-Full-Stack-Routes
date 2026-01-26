import { notFound } from "next/navigation";
import Link from "next/link";
import { getProductById } from "@/lib/data";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function ProductPage({ params }: Props) {
  // NEXT.js 15 FIX: You must await the params object
  const { id } = await params;
  
  // Now pass the string 'id' to your helper
  const product = await getProductById(id);

  if (!product) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <Link href="/dashboard" className="text-blue-600 hover:underline mb-4 inline-block">
        &larr; Back to Dashboard
      </Link>
      <div className="bg-white p-8 rounded-lg shadow-xl max-w-lg mx-auto">
        <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
        <p className="text-xl text-green-600 font-semibold mb-4">${product.price}</p>
        <p className="text-gray-500">Product Database ID: {product.id}</p>
      </div>
    </div>
  );
}