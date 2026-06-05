'use client'

import { useState } from 'react'
import { useCart } from '@/context/CartContext'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import { CheckCircle, MapPin, Phone, User, Home, ChevronRight } from 'lucide-react'

const WILAYAS = [
  'Adrar','Chlef','Laghouat','Oum El Bouaghi','Batna','Béjaïa','Biskra','Béchar',
  'Blida','Bouira','Tamanrasset','Tébessa','Tlemcen','Tiaret','Tizi Ouzou','Alger',
  'Djelfa','Jijel','Sétif','Saïda','Skikda','Sidi Bel Abbès','Annaba','Guelma',
  'Constantine','Médéa','Mostaganem','MSila','Mascara','Ouargla','Oran','El Bayadh',
  'Illizi','Bordj Bou Arreridj','Boumerdès','El Tarf','Tindouf','Tissemsilt',
  'El Oued','Khenchela','Souk Ahras','Tipaza','Mila','Aïn Defla','Naâma',
  'Aïn Témouchent','Ghardaïa','Relizane','Timimoun','Bordj Badji Mokhtar',
  'Ouled Djellal','Béni Abbès','In Salah','In Guezzam','Touggourt','Djanet',
  'El MGhair','El Meniaa'
]

export default function CheckoutPage() {
  const { items, total, clearCart } = useCart()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [orderId, setOrderId] = useState('')
  const [form, setForm] = useState({ customer_name: '', customer_phone: '', customer_address: '', wilaya: '' })

  const delivery = total >= 5000 ? 0 : 400

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (items.length === 0) return
    setLoading(true)
    const { data, error } = await supabase.from('orders').insert([{ ...form, items, total: total + delivery }]).select().single()
    setLoading(false)
    if (!error && data) { setOrderId(data.id); setSuccess(true); clearCart() }
  }

  if (success) {
    return (
      <div className="max-w-lg mx-auto px-4 py-24 text-center">
        <div className="w-24 h-24 bg-olive-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle size={48} className="text-olive-600" />
        </div>
        <h1 className="text-3xl font-bold mb-2">تم الطلب! 🎉</h1>
        <p className="text-xl text-neutral-600 mb-2">Order Placed Successfully!</p>
        <div className="bg-sand border border-orange-200 rounded-2xl p-4 my-6 text-sm">
          <p className="text-neutral-500 mb-1">Order ID — رقم الطلب</p>
          <p className="font-mono font-bold text-lg text-brand-700">{orderId.slice(0, 8).toUpperCase()}</p>
        </div>
        <p className="text-neutral-600 mb-8 leading-relaxed">
          سنتصل بك على واتساب لتأكيد التوصيل.<br />
          <span className="text-sm text-neutral-400">We'll contact you on WhatsApp to confirm. Pay cash on arrival.</span>
        </p>
        <button onClick={() => router.push('/')} className="btn-primary py-3 px-10 text-base">
          العودة للرئيسية — Back to Home
        </button>
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-1">إتمام الطلب</h1>
      <p className="text-neutral-500 mb-8">Checkout — fill in your delivery details</p>

      <div className="grid md:grid-cols-5 gap-8">
        <form onSubmit={handleSubmit} className="md:col-span-3 flex flex-col gap-5">
          <div className="card p-6">
            <h2 className="font-bold text-lg mb-5 flex items-center gap-2">
              <User size={18} className="text-brand-600" /> معلومات التوصيل — Delivery Info
            </h2>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-neutral-700 flex items-center gap-1.5"><User size={13} /> Full Name — الاسم الكامل *</label>
                <input required type="text" value={form.customer_name}
                  onChange={e => setForm(f => ({ ...f, customer_name: e.target.value }))}
                  placeholder="Ahmed Benali — أحمد بن علي" className="input" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-neutral-700 flex items-center gap-1.5"><Phone size={13} /> Phone — رقم الهاتف *</label>
                <input required type="tel" value={form.customer_phone}
                  onChange={e => setForm(f => ({ ...f, customer_phone: e.target.value }))}
                  placeholder="0555 000 000" className="input" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-neutral-700 flex items-center gap-1.5"><MapPin size={13} /> Wilaya — الولاية *</label>
                <select required value={form.wilaya}
                  onChange={e => setForm(f => ({ ...f, wilaya: e.target.value }))}
                  className="input bg-white">
                  <option value="">اختر الولاية — Select Wilaya</option>
                  {WILAYAS.map(w => <option key={w} value={w}>{w}</option>)}
                </select>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-neutral-700 flex items-center gap-1.5"><Home size={13} /> Address — العنوان *</label>
                <textarea required value={form.customer_address}
                  onChange={e => setForm(f => ({ ...f, customer_address: e.target.value }))}
                  placeholder="Street, neighbourhood, city... الشارع، الحي، المدينة"
                  rows={3} className="input resize-none" />
              </div>
            </div>
          </div>

          <div className="bg-olive-50 border-2 border-olive-200 rounded-2xl p-4 flex items-start gap-3">
            <span className="text-2xl">💵</span>
            <div>
              <p className="font-bold text-olive-800">الدفع عند الاستلام — Cash on Delivery</p>
              <p className="text-sm text-olive-600">ستدفع <strong>{(total + delivery).toLocaleString()} DA</strong> عند وصول طلبك. لا تحتاج لبطاقة.</p>
            </div>
          </div>

          <button type="submit" disabled={loading || items.length === 0}
            className="btn-primary py-4 text-base flex items-center justify-center gap-2 disabled:opacity-50">
            {loading ? 'جاري الإرسال...' : <><span>تأكيد الطلب — Place Order</span> <ChevronRight size={18} /></>}
          </button>
        </form>

        <div className="md:col-span-2">
          <div className="card p-5 sticky top-24">
            <h2 className="font-bold mb-4">ملخص — Summary</h2>
            <div className="flex flex-col gap-3 mb-4">
              {items.map(item => (
                <div key={item.id} className="flex items-center gap-3">
                  <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-sand flex-shrink-0">
                    <img src={item.image_url} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium truncate">{item.name}</p>
                    <p className="text-xs text-neutral-400">×{item.quantity}</p>
                  </div>
                  <span className="text-sm font-semibold flex-shrink-0">{(item.price * item.quantity).toLocaleString()} DA</span>
                </div>
              ))}
            </div>
            <div className="border-t border-orange-100 pt-3 flex flex-col gap-2 text-sm">
              <div className="flex justify-between text-neutral-600"><span>Subtotal</span><span>{total.toLocaleString()} DA</span></div>
              <div className="flex justify-between text-neutral-600"><span>Delivery</span><span className={delivery === 0 ? 'text-olive-600 font-semibold' : ''}>{delivery === 0 ? 'FREE 🎉' : `${delivery} DA`}</span></div>
              <div className="flex justify-between font-bold text-lg border-t border-orange-100 pt-2 mt-1">
                <span>Total</span><span className="text-brand-700">{(total + delivery).toLocaleString()} DA</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}