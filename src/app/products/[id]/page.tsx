import { supabase } from '@/lib/supabase'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import AddToCartButton from '@/components/AddToCartButton'
import { Package, Truck, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

type Props = {
  params: { id: string }
}

export default async function ProductPage({ params }: Props) {
  const { data: product } = await supabase
    .from('products')
    .select('*')
    .eq('id', params.id)
    .single()

  if (!product) notFound()

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <Link href="/products" className="flex items-center gap-2 text-sm text-neutral-500 hover:text-neutral-900 mb-8 transition-colors">
        <ArrowLeft size={16} /> Back to products
      </Link>
      <div className="grid md:grid-cols-2 gap-10">
        <div className="relative aspect-square rounded-xl overflow-hidden bg-neutral-100">
          <Image src={product.image_url} alt={product.name} fill className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw" priority />
        </div>
        <div className="flex flex-col gap-5">
          <div>
            <span className="text-xs text-neutral-400 uppercase tracking-wider">{product.category}</span>
            <h1 className="text-3xl font-bold mt-1 mb-3">{product.name}</h1>
            <p className="text-neutral-600 leading-relaxed">{product.description}</p>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-bold">{product.price.toLocaleString()}</span>
            <span className="text-neutral-500">DA</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Package size={16} className="text-green-600" />
            <span className={product.stock > 0 ? 'text-green-700' : 'text-red-500'}>
              {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
            </span>
          </div>
          <AddToCartButton product={product} />
          <div className="border border-neutral-200 rounded-xl p-4 bg-neutral-50 flex items-start gap-3 text-sm text-neutral-600">
            <Truck size={18} className="mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-medium text-neutral-800">Free delivery on orders over 5000 DA</p>
              <p>Delivered in 2–5 business days. Pay cash on arrival.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}