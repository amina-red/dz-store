'use client'

import { useRouter } from 'next/navigation'

export default function CategoryFilter({ categories, active }: { categories: string[], active: string }) {
  const router = useRouter()

  return (
    <div className="flex gap-2 flex-wrap">
      {categories.map(cat => (
        <button
          key={cat}
          onClick={() => router.push(cat === 'all' ? '/products' : `/products?category=${cat}`)}
          className={`px-4 py-2 rounded-full text-sm font-semibold border-2 transition-all capitalize ${
            active === cat
              ? 'bg-brand-600 text-white border-brand-600 shadow-md'
              : 'bg-white text-neutral-600 border-orange-200 hover:border-brand-400 hover:text-brand-600'
          }`}
        >
          {cat === 'all' ? '🛍️ All — الكل' : cat}
        </button>
      ))}
    </div>
  )
}