'use client'

import { useState } from 'react'
import { ShoppingCart, Check } from 'lucide-react'
import { useCart } from '@/context/CartContext'
import { Product } from '@/lib/supabase'
import Link from 'next/link'

export default function AddToCartButton({ product }: { product: Product }) {
  const { addItem } = useCart()
  const [added, setAdded] = useState(false)

  const handleAdd = () => {
    addItem(product)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <div className="flex flex-col gap-3">
      <button
        onClick={handleAdd}
        disabled={product.stock === 0}
        className={`w-full flex items-center justify-center gap-2 py-3 px-6 rounded-xl font-semibold text-base transition-all duration-150 ${
          added ? 'bg-green-600 text-white' : 'bg-neutral-900 text-white hover:bg-neutral-700'
        } disabled:opacity-50 disabled:cursor-not-allowed`}
      >
        {added ? <><Check size={20} /> Added to cart!</> : <><ShoppingCart size={20} /> Add to cart</>}
      </button>
      {added && (
        <Link href="/cart" className="w-full text-center py-3 px-6 rounded-xl border border-neutral-300 font-medium text-sm hover:bg-neutral-100 transition-colors">
          View cart & checkout →
        </Link>
      )}
    </div>
  )
}