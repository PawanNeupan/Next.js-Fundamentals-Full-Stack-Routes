"use client"

import { addProduct, getProducts } from "../actions"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

export default function ProductForm() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [products, setProducts] = useState<any[]>([]) // State to store products
  const router = useRouter()

  // 1. Fetch products when the page loads
  const fetchProducts = async () => {
    const data = await getProducts()
    setProducts(data || [])
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  async function handleSubmit(formData: FormData) {
    setLoading(true)
    setError(null)
    
    const result = await addProduct(formData)
    
    if (result?.error) {
      setError(result.error)
      setLoading(false)
    } else {
      // 2. Refresh the list locally after adding a product
      await fetchProducts()
      setLoading(false)
      
      // Reset the form inputs
      const form = document.getElementById("product-form") as HTMLFormElement
      form.reset()
      
      // Optional: router.push is not strictly needed if we update state manually
      router.refresh() 
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-10">
      {/* FORM SECTION */}
      <form 
        id="product-form"
        action={handleSubmit} 
        className="flex flex-col gap-5 bg-white p-6 rounded-2xl shadow-sm border border-gray-200"
      >
        <h2 className="text-xl font-bold text-gray-800">Add New Product</h2>
        
        {error && (
          <div className="p-3 bg-red-50 text-red-600 rounded-xl text-sm border border-red-100">
            {error}
          </div>
        )}

        <div className="flex flex-col gap-4">
          <input 
            name="name" 
            placeholder="Product Name" 
            required 
            className="bg-gray-100 p-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-500/20" 
          />
          <input 
            name="price" 
            type="number" 
            placeholder="Price" 
            required 
            className="bg-gray-100 p-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-500/20" 
          />

          <button 
            type="submit" 
            disabled={loading}
            className="bg-blue-600 text-white py-4 rounded-xl font-bold disabled:opacity-50 hover:bg-blue-700 transition-colors"
          >
            {loading ? "Adding Product..." : "List Product"}
          </button>
        </div>
      </form>

      {/* VIEW SECTION (Data from getProducts) */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-gray-700 ml-2">Product List</h3>
        <div className="grid gap-3">
          {products.length > 0 ? (
            products.map((product) => (
              <div 
                key={product.id} 
                className="flex justify-between items-center p-4 bg-white rounded-xl border border-gray-100 shadow-sm"
              >
                <div>
                  <p className="font-semibold text-gray-800">{product.name}</p>
                  <p className="text-xs text-gray-400 font-mono">{product.id.slice(0, 8)}</p>
                </div>
                <div className="text-right">
                  <p className="text-blue-600 font-black text-lg">${product.price}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-400 py-10">No products found in the database.</p>
          )}
        </div>
      </div>
    </div>
  )
}