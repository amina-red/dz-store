import { supabase, Product } from '@/lib/supabase'
import ProductCard from '@/components/ProductCard'
import Link from 'next/link'
import { ArrowRight, Truck, ShieldCheck, PhoneCall, Star, Zap, Gift } from 'lucide-react'

export default async function HomePage() {
const { data: products } = await supabase
  .from('products')
  .select('*')
  .order('created_at', { ascending: false })
  .limit(8)


  const categories = [
    { name: 'Electronics', arabic: 'إلكترونيات', emoji: '📱', color: 'bg-blue-100 text-blue-700' },
    { name: 'Clothing', arabic: 'ملابس', emoji: '👕', color: 'bg-brand-100 text-brand-700' },
    { name: 'Shoes', arabic: 'أحذية', emoji: '👟', color: 'bg-purple-100 text-purple-700' },
    { name: 'Bags', arabic: 'حقائب', emoji: '👜', color: 'bg-olive-100 text-olive-700' },
    { name: 'Accessories', arabic: 'إكسسوارات', emoji: '⌚', color: 'bg-pink-100 text-pink-700' },
    { name: 'Home', arabic: 'المنزل', emoji: '🏠', color: 'bg-amber-100 text-amber-700' },
  ]

  return (
    <div>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-olive-900 via-olive-800 to-brand-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-hero-pattern opacity-30" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-500 rounded-full blur-3xl opacity-20" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-olive-400 rounded-full blur-3xl opacity-20" />

        <div className="relative max-w-6xl mx-auto px-4 py-24 md:py-32">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 text-sm mb-6">
              <Zap size={14} className="text-brand-400" />
              <span>توصيل لجميع الولايات الـ58 — All 58 Wilayas</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-2">
              تسوق بذكاء
            </h1>
            <h2 className="text-3xl md:text-5xl font-bold text-brand-400 mb-6">
              Shop Smart 🇩🇿
            </h2>
            <p className="text-white/70 text-lg mb-8 leading-relaxed">
              أفضل المنتجات بأسعار لا تُقاوَم مع الدفع عند الاستلام.<br />
              <span className="text-white/50 text-base">The best products at unbeatable prices — pay when it arrives.</span>
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/products" className="flex items-center gap-2 bg-brand-500 hover:bg-brand-400 text-white px-8 py-4 rounded-xl font-bold text-base transition-all hover:scale-105 shadow-lg shadow-brand-900/30">
                تسوق الآن — Shop Now <ArrowRight size={18} />
              </Link>
              <Link href="/products" className="flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 text-white px-8 py-4 rounded-xl font-semibold text-base transition-all">
                <Gift size={18} /> عروض اليوم
              </Link>
            </div>
          </div>
        </div>

        {/* Stats bar */}
        <div className="relative border-t border-white/10 bg-white/5 backdrop-blur-sm">
          <div className="max-w-6xl mx-auto px-4 py-4 grid grid-cols-3 gap-4 text-center">
            {[
              { num: '58', label: 'Wilayas / ولاية' },
              { num: '2-5', label: 'Days delivery / أيام' },
              { num: '100%', label: 'Cash on delivery' },
            ].map(s => (
              <div key={s.label}>
                <p className="text-2xl font-bold text-brand-400">{s.num}</p>
                <p className="text-xs text-white/60">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust badges */}
      <section className="bg-white border-b border-orange-100">
        <div className="max-w-6xl mx-auto px-4 py-5 grid grid-cols-1 md:grid-cols-3 gap-3">
          {[
            { icon: <Truck size={20} />, title: 'Nationwide Delivery', sub: 'جميع الولايات — 2 to 5 days', color: 'text-olive-600 bg-olive-50' },
            { icon: <ShieldCheck size={20} />, title: 'Cash On Delivery', sub: 'الدفع عند الاستلام — No card needed', color: 'text-brand-600 bg-brand-50' },
            { icon: <PhoneCall size={20} />, title: 'WhatsApp Support', sub: 'دعم على واتساب — 7 days a week', color: 'text-green-600 bg-green-50' },
          ].map((item) => (
            <div key={item.title} className="flex items-center gap-3 p-3 rounded-xl hover:bg-sand transition-colors">
              <div className={`p-2.5 rounded-xl ${item.color}`}>{item.icon}</div>
              <div>
                <p className="font-semibold text-neutral-900 text-sm">{item.title}</p>
                <p className="text-neutral-500 text-xs">{item.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold">Shop by Category</h2>
            <p className="text-neutral-500 text-sm">تسوق حسب الفئة</p>
          </div>
        </div>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
          {categories.map(cat => (
            <Link
              key={cat.name}
              href={`/products?category=${cat.name.toLowerCase()}`}
              className="flex flex-col items-center gap-2 p-4 bg-white rounded-2xl border border-orange-100 hover:border-brand-300 hover:shadow-md transition-all group"
            >
              <span className="text-3xl group-hover:scale-110 transition-transform">{cat.emoji}</span>
              <span className="text-xs font-semibold text-neutral-700">{cat.name}</span>
              <span className="text-xs text-neutral-400">{cat.arabic}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured products */}
      <section className="max-w-6xl mx-auto px-4 pb-16">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold">Featured Products</h2>
            <p className="text-neutral-500 text-sm">منتجات مميزة</p>
          </div>
          <Link href="/products" className="flex items-center gap-1 text-sm font-semibold text-brand-600 hover:text-brand-700 transition-colors">
            View all <ArrowRight size={16} />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {(products as Product[])?.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      {/* Banner */}
      <section className="max-w-6xl mx-auto px-4 pb-16">
        <div className="relative bg-gradient-to-r from-brand-600 to-brand-800 rounded-3xl p-8 md:p-12 overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-2xl" />
          <div className="relative">
            <p className="text-brand-200 font-semibold mb-2">🎁 Special Offer — عرض خاص</p>
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-3">
              Free Delivery<br />على أول طلب!
            </h3>
            <p className="text-brand-100 mb-6">Use code <span className="bg-white/20 px-2 py-1 rounded-lg font-mono font-bold">DZFIRST</span> on your first order</p>
            <Link href="/products" className="inline-flex items-center gap-2 bg-white text-brand-700 px-6 py-3 rounded-xl font-bold hover:bg-brand-50 transition-colors">
              Shop Now <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}