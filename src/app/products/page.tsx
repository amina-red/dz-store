import { supabase, Product } from '@/lib/supabase'
import ProductCard from '@/components/ProductCard'
import CategoryFilter from '@/components/CategoryFilter'
import { SlidersHorizontal } from 'lucide-react'

type Props = {
  searchParams: Promise<{ category?: string }>
}

export default async function ProductsPage({ searchParams }: Props) {
  const { category } = await searchParams

  let query = supabase.from('products').select('*').order('created_at', { ascending: false })
  if (category && category !== 'all') query = query.eq('category', category)

  const { data: products } = await query
  const { data: categories } = await supabase.from('products').select('category')
  const uniqueCategories = ['all', ...new Set(categories?.map(c => c.category) || [])]

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-1">All Products</h1>
        <p className="text-neutral-500">جميع المنتجات — <span className="text-orange-600 font-semibold">{products?.length || 0} items available</span></p>
      </div>

      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <CategoryFilter categories={uniqueCategories} active={category || 'all'} />
        <div className="flex items-center gap-2 text-sm text-neutral-500 border border-orange-200 rounded-xl px-3 py-2 bg-white">
          <SlidersHorizontal size={14} />
          <span>Filter</span>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {(products as Product[])?.map(p => <ProductCard key={p.id} product={p} />)}
      </div>

      {products?.length === 0 && (
        <div className="text-center py-20">
          <p className="text-4xl mb-3">🔍</p>
          <p className="text-neutral-500">No products in this category yet.</p>
        </div>
      )}
    </div>
  )
}