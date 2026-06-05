'use client'

import { useCart } from '@/context/CartContext'
import Image from 'next/image'
import Link from 'next/link'
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, Tag } from 'lucide-react'

export default function CartPage() {
  const { items, removeItem, updateQty, total, clearCart } = useCart()

  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-24 text-center">
        <div className="w-24 h-24 bg-brand-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <ShoppingBag size={40} className="text-brand-500" />
        </div>
        <h1 className="text-2xl font-bold mb-2">سلتك فارغة — Cart is Empty</h1>
        <p className="text-neutral-500 mb-8">Add some products to get started</p>
        <Link href="/products" className="btn-primary inline-flex items-center gap-2 py-3 px-8">
          تسوق الآن — Browse Products <ArrowRight size={16} />
        </Link>
      </div>
    )
  }

  const delivery = total >= 5000 ? 0 : 400

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-1">سلة التسوق</h1>
      <p className="text-neutral-500 mb-8">Your Cart — {items.length} item{items.length > 1 ? 's' : ''}</p>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 flex flex-col gap-3">
          {items.map(item => (
            <div key={item.id} className="card flex gap-4 p-4 hover:shadow-md transition-shadow">
              <div className="relative w-24 h-24 flex-shrink-0 rounded-xl overflow-hidden bg-sand">
                <Image src={item.image_url} alt={item.name} fill className="object-cover" sizes="96px" />
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-xs text-brand-600 font-semibold uppercase">{item.category}</span>
                <p className="font-semibold text-neutral-900 leading-snug mb-3">{item.name}</p>
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center bg-sand rounded-xl overflow-hidden border border-orange-200">
                    <button onClick={() => updateQty(item.id, item.quantity - 1)} className="px-3 py-2 hover:bg-brand-100 hover:text-brand-700 transition-colors">
                      <Minus size={14} />
                    </button>
                    <span className="px-4 py-2 text-sm font-bold border-x border-orange-200">{item.quantity}</span>
                    <button onClick={() => updateQty(item.id, item.quantity + 1)} className="px-3 py-2 hover:bg-brand-100 hover:text-brand-700 transition-colors">
                      <Plus size={14} />
                    </button>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-lg text-neutral-900">{(item.price * item.quantity).toLocaleString()} <span className="text-sm font-normal text-neutral-500">DA</span></span>
                    <button onClick={() => removeItem(item.id)} className="p-1.5 text-neutral-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <button onClick={clearCart} className="self-start text-sm text-neutral-400 hover:text-red-500 transition-colors mt-1 flex items-center gap-1">
            <Trash2 size={14} /> Clear cart
          </button>
        </div>

        <div className="flex flex-col gap-4">
          <div className="card p-5">
            <h2 className="font-bold text-lg mb-4">ملخص الطلب — Order Summary</h2>
            <div className="flex flex-col gap-2 text-sm mb-4">
              {items.map(item => (
                <div key={item.id} className="flex justify-between text-neutral-600">
                  <span className="truncate mr-2">{item.name} ×{item.quantity}</span>
                  <span className="flex-shrink-0 font-medium">{(item.price * item.quantity).toLocaleString()} DA</span>
                </div>
              ))}
            </div>
            <div className="border-t border-orange-100 pt-3 flex flex-col gap-2 text-sm">
              <div className="flex justify-between text-neutral-600">
                <span>Subtotal</span>
                <span>{total.toLocaleString()} DA</span>
              </div>
              <div className="flex justify-between text-neutral-600">
                <span>Delivery</span>
                <span className={delivery === 0 ? 'text-olive-600 font-semibold' : ''}>{delivery === 0 ? 'FREE 🎉' : `${delivery} DA`}</span>
              </div>
              {delivery > 0 && (
                <p className="text-xs text-brand-600 bg-brand-50 rounded-lg p-2">
                  Add {(5000 - total).toLocaleString()} DA more for free delivery!
                </p>
              )}
            </div>
            <div className="border-t border-orange-100 mt-3 pt-3 flex justify-between font-bold text-lg">
              <span>Total</span>
              <span className="text-brand-700">{(total + delivery).toLocaleString()} DA</span>
            </div>
            <Link href="/checkout" className="btn-primary text-center block mt-4 py-3">
              إتمام الطلب — Checkout →
            </Link>
          </div>

          <div className="bg-olive-50 border border-olive-200 rounded-2xl p-4 text-sm">
            <div className="flex items-center gap-2 text-olive-700 font-semibold mb-1">
              <Tag size={14} /> Promo code?
            </div>
            <div className="flex gap-2">
              <input type="text" placeholder="DZFIRST" className="input text-xs py-2" />
              <button className="btn-green text-xs px-3 py-2">Apply</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}