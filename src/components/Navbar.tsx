'use client'

import Link from 'next/link'
import { ShoppingCart, Store, Menu, X, Search } from 'lucide-react'
import { useCart } from '@/context/CartContext'
import { useState } from 'react'

export default function Navbar() {
  const { count } = useCart()
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-orange-100 shadow-sm">
      {/* Top bar */}
      <div className="bg-olive-700 text-white text-xs py-1.5 text-center font-medium tracking-wide">
        🚚 توصيل مجاني لكل الطلبات فوق 5000 دج — Free delivery over 5000 DA
      </div>

      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 flex-shrink-0">
          <div className="w-9 h-9 bg-brand-600 rounded-xl flex items-center justify-center shadow">
            <Store size={18} className="text-white" />
          </div>
          <div>
            <span className="font-bold text-lg text-neutral-900 leading-none block">DZ Store</span>
            <span className="text-[10px] text-brand-600 font-semibold tracking-wide">دي زاد ستور</span>
          </div>
        </Link>

        {/* Search */}
        <div className="hidden md:flex flex-1 max-w-md relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
          <input
            type="text"
            placeholder="ابحث عن منتج... Search products"
            className="w-full pl-9 pr-4 py-2 border border-orange-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-400 bg-sand"
          />
        </div>

        {/* Nav */}
        <nav className="hidden md:flex items-center gap-1 text-sm font-medium">
          <Link href="/" className="px-3 py-2 rounded-lg hover:bg-brand-50 hover:text-brand-700 transition-colors text-neutral-600">Home</Link>
          <Link href="/products" className="px-3 py-2 rounded-lg hover:bg-brand-50 hover:text-brand-700 transition-colors text-neutral-600">Products</Link>
          <Link href="/admin" className="px-3 py-2 rounded-lg hover:bg-brand-50 hover:text-brand-700 transition-colors text-neutral-600">Admin</Link>
        </nav>

        <div className="flex items-center gap-2">
          <Link href="/cart" className="relative p-2 hover:bg-brand-50 rounded-xl transition-colors">
            <ShoppingCart size={22} className="text-neutral-700" />
            {count > 0 && (
              <span className="absolute -top-1 -right-1 bg-brand-600 text-white text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow">
                {count}
              </span>
            )}
          </Link>
          <button onClick={() => setOpen(!open)} className="md:hidden p-2 hover:bg-sand rounded-xl">
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-orange-100 bg-white px-4 py-4 flex flex-col gap-1">
          <div className="relative mb-3">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
            <input type="text" placeholder="Search..." className="w-full pl-9 pr-4 py-2.5 border border-orange-200 rounded-xl text-sm focus:outline-none bg-sand" />
          </div>
          <Link href="/" onClick={() => setOpen(false)} className="px-3 py-2.5 rounded-lg hover:bg-sand font-medium text-neutral-700">🏠 Home</Link>
          <Link href="/products" onClick={() => setOpen(false)} className="px-3 py-2.5 rounded-lg hover:bg-sand font-medium text-neutral-700">🛍️ Products</Link>
          <Link href="/admin" onClick={() => setOpen(false)} className="px-3 py-2.5 rounded-lg hover:bg-sand font-medium text-neutral-700">⚙️ Admin</Link>
        </div>
      )}
    </header>
  )
}