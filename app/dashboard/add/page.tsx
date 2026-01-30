"use client"

import { addProduct, getProducts } from "../actions"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"

export default function ProductForm() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [products, setProducts] = useState<any[]>([])
  const [preview, setPreview] = useState<string | null>(null) // For local preview
  const router = useRouter()

  // Initial Fetch
  const fetchProducts = async () => {
    const data = await getProducts()
    setProducts(data || [])
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  // Handle local image preview
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setPreview(URL.createObjectURL(file))
    }
  }

  async function handleSubmit(formData: FormData) {
    setLoading(true)
    setError(null)
    
    const result = await addProduct(formData)
    
    if (result?.error) {
      setError(result.error)
      setLoading(false)
    } else {
      await fetchProducts() // Refresh list
      setLoading(false)
      setPreview(null) // Clear preview
      const form = document.getElementById("product-form") as HTMLFormElement
      form.reset()
      router.refresh() 
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-12">
      {/* --- FORM SECTION --- */}
      <section className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200">
        <h2 className="text-2xl font-black text-slate-800 mb-6">Create Listing</h2>
        
        <form id="product-form" action={handleSubmit} className="flex flex-col gap-6">
          {error && (
            <div className="p-3 bg-red-50 text-red-600 text-sm border border-gray-800 rounded-2xl">{error}</div>
          )}

          <div className="space-y-4">
            <input name="name" placeholder="Product Name" required className="w-full bg-gray-500 p-4 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500/20 border-0" />
            <input name="price" type="number" step="0.01" placeholder="Price " required className="w-full bg-gray-500 p-4 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500/20" />
            
            <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
              <div className="flex-1">
                <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Product Photo</label>
                <input 
                  name="image" 
                  type="file" 
                  accept="image/*" 
                  onChange={handleImageChange}
                  className="text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-blue-600 file:text-white"
                />
              </div>
              
              {/* SMALL PREVIEW BOX */}
              {preview && (
                <div className="relative w-16 h-16 rounded-xl overflow-hidden border-2 border-white shadow-md">
                  <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                </div>
              )}
            </div>
            <div className=" h-16 rounded-xl  border-white   ">
          <button 
            type="submit" 
            disabled={loading}
            className="flex items-center justify-center bg-green-600 text-white py-4 rounded font-bold hover:bg-green-700 disabled:opacity-50 transition-all shadow-lg shadow-green-100/50 w-4xl"
          >
            {loading ? "Uploading..." : "Publish Product"}
          </button>
          </div>
          </div>
              
        </form>
      </section>

      {/* --- LIST SECTION --- */}
      <section className="space-y-4">
        <h3 className="text-xl font-bold text-slate-800 ml-2">Your Inventory</h3>
        <div className="grid gap-4">
          {products.map((product) => (
            <div key={product.id} className="flex justify-between items-center p-4 bg-white rounded-2xl border border-slate-100 shadow-sm transition-transform hover:scale-[1.01]">
              <div className="flex items-center gap-4">
                {/* SMALL CONSTRAINED IMAGE */}
                <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-slate-100 shrink-0">
                  {product.image ? (
                    <Image 
                      src={product.image} 
                      alt={product.name} 
                      
                      sizes="56px"
                      height="56"
                      width="56"
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-[10px] text-slate-400">No Img</div>
                  )}
                </div>
                <div>
                  <p className="font-bold text-slate-900">{product.name}</p>
                  <p className="text-[10px] text-slate-400 font-mono">ID: {product.id.slice(0, 8)}</p>
                </div>
              </div>
              <p className="text-blue-600 font-black text-lg">NPR {Number(product.price).toFixed(2)} </p>
            </div>
          ))}
          
          {products.length === 0 && !loading && (
            <p className="text-center text-slate-400 py-10 italic">No products yet.</p>
          )}
        </div>
      </section>
    </div>
  )
}