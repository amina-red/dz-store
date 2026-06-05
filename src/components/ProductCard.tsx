'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ShoppingCart, Check, Star, Flame } from 'lucide-react'
import { useState } from 'react'
import { Product } from '@/lib/supabase'
import { useCart } from '@/context/CartContext'

export default function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart()
  const [added, setAdded] = useState(false)

  const rating = 4.5
  const reviews = 124
  const isHot = product.stock <= 5 && product.stock > 0

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault()
    addItem(product)
    setAdded(true)
    setTimeout(() => setAdded(false), 1500)
  }

  return (
    <Link href={`/products/${product.id}`} className="group bg-white rounded-2xl border border-orange-100 overflow-hidden hover:shadow-xl hover:border-orange-300 transition-all duration-300 flex flex-col">
      <div className="relative aspect-square overflow-hidden bg-orange-50">
        <Image
          src={product.image_url}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
          sizes="(max-width: 768px) 50vw, 25vw"
        />
        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {isHot && (
            <span className="badge bg-red-500 text-white">
              <Flame size={10} /> Hot
            </span>
          )}
          {product.stock === 0 && (
            <span className="badge bg-neutral-500 text-white">Out of stock</span>
          )}
        </div>
        {/* Quick add overlay */}
        <div className="absolute inset-x-0 bottom-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <button
            onClick={handleAdd}
            disabled={product.stock === 0}
            className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-all shadow-lg ${
              added ? 'bg-green-600 text-white' : 'bg-orange-600 text-white hover:bg-orange-500'
            } disabled:opacity-50`}
          >
            {added ? <><Check size={14} /> Added!</> : <><ShoppingCart size={14} /> Add to Cart</>}
          </button>
        </div>
      </div>

      <div className="p-3 flex flex-col gap-1.5 flex-1">
        <span className="text-[10px] text-orange-600 font-semibold uppercase tracking-wider">{product.category}</span>
        <h3 className="font-semibold text-neutral-900 text-sm leading-snug line-clamp-2">{product.name}</h3>

        {/* Stars */}
        <div className="flex items-center gap-1">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={10} className={i < Math.floor(rating) ? 'text-orange-500 fill-orange-500' : 'text-neutral-300 fill-neutral-300'} />
            ))}
          </div>
          <span className="text-[10px] text-neutral-400">({reviews})</span>
        </div>

        <div className="flex items-center justify-between mt-auto pt-1">
          <div>
            <span className="font-bold text-base text-neutral-900">{product.price.toLocaleString()}</span>
            <span className="text-xs text-neutral-500 ml-1">DA</span>
          </div>
          <button
            onClick={handleAdd}
            disabled={product.stock === 0}
            className={`md:hidden flex items-center gap-1 text-xs px-3 py-1.5 rounded-lg font-semibold transition-all ${
              added ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700 hover:bg-orange-200'
            } disabled:opacity-40`}
          >
            {added ? <Check size={12} /> : <ShoppingCart size={12} />}
          </button>
        </div>
      </div>
    </Link>
  )
}