export default function ProductSkeleton() {
  return (
    <div className="bg-white rounded-2xl border border-orange-100 overflow-hidden animate-pulse flex flex-col">
      <div className="aspect-square bg-orange-50" />
      <div className="p-3 flex flex-col gap-2">
        <div className="h-2.5 bg-orange-100 rounded-full w-16" />
        <div className="h-3.5 bg-neutral-100 rounded-full w-3/4" />
        <div className="h-3.5 bg-neutral-100 rounded-full w-1/2" />
        <div className="flex gap-1 mt-1">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="w-2.5 h-2.5 bg-orange-100 rounded-full" />
          ))}
        </div>
        <div className="flex justify-between items-center mt-2">
          <div className="h-4 bg-neutral-100 rounded-full w-20" />
          <div className="h-7 w-7 bg-orange-100 rounded-lg" />
        </div>
      </div>
    </div>
  )
}