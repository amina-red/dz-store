import ProductSkeleton from '@/components/ProductSkeleton'

export default function Loading() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <div className="h-8 bg-neutral-100 rounded-full w-48 mb-2 animate-pulse" />
      <div className="h-4 bg-neutral-100 rounded-full w-32 mb-8 animate-pulse" />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {[...Array(8)].map((_, i) => (
          <ProductSkeleton key={i} />
        ))}
      </div>
    </div>
  )
}