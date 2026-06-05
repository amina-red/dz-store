import { supabase } from '@/lib/supabase'
import { Clock, CheckCircle, TrendingUp, ShoppingBag } from 'lucide-react'
import AdminOrderRow from '@/components/AdminOrderRow'

export const revalidate = 0

export default async function AdminPage() {
  const { data: orders } = await supabase.from('orders').select('*').order('created_at', { ascending: false })
  const { data: products } = await supabase.from('products').select('*')

  const stats = {
    total: orders?.length || 0,
    pending: orders?.filter(o => o.status === 'pending').length || 0,
    confirmed: orders?.filter(o => o.status === 'confirmed').length || 0,
    delivered: orders?.filter(o => o.status === 'delivered').length || 0,
    revenue: orders?.reduce((s, o) => s + o.total, 0) || 0,
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">لوحة التحكم — Admin</h1>
          <p className="text-neutral-500">Manage your store orders and products</p>
        </div>
        <div className="flex items-center gap-2 bg-olive-100 text-olive-700 px-4 py-2 rounded-xl text-sm font-semibold">
          <div className="w-2 h-2 bg-olive-500 rounded-full animate-pulse" />
          Live Dashboard
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {[
          { label: 'Total Orders', arabic: 'إجمالي الطلبات', value: stats.total, icon: <ShoppingBag size={20} />, color: 'text-blue-600 bg-blue-50' },
          { label: 'Pending', arabic: 'قيد الانتظار', value: stats.pending, icon: <Clock size={20} />, color: 'text-amber-600 bg-amber-50' },
          { label: 'Delivered', arabic: 'تم التوصيل', value: stats.delivered, icon: <CheckCircle size={20} />, color: 'text-olive-600 bg-olive-50' },
          { label: 'Revenue (DA)', arabic: 'الإيرادات', value: stats.revenue.toLocaleString(), icon: <TrendingUp size={20} />, color: 'text-brand-600 bg-brand-50' },
        ].map(s => (
          <div key={s.label} className="card p-5 hover:shadow-md transition-shadow">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${s.color}`}>
              {s.icon}
            </div>
            <p className="text-2xl font-bold text-neutral-900">{s.value}</p>
            <p className="text-sm font-medium text-neutral-700">{s.label}</p>
            <p className="text-xs text-neutral-400">{s.arabic}</p>
          </div>
        ))}
      </div>

      {/* Orders */}
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-bold text-xl">الطلبات — Orders</h2>
        <span className="badge bg-brand-100 text-brand-700">{stats.total} total</span>
      </div>
      <div className="card overflow-x-auto mb-10">
        <table className="w-full text-sm">
          <thead className="bg-sand border-b border-orange-100">
            <tr>
              {['Order ID', 'Customer', 'Wilaya', 'Items', 'Total', 'Status', 'Date'].map(h => (
                <th key={h} className="text-left px-4 py-3 font-semibold text-neutral-600 text-xs uppercase tracking-wide">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-orange-50">
            {orders?.map(order => <AdminOrderRow key={order.id} order={order} />)}
          </tbody>
        </table>
        {(!orders || orders.length === 0) && (
          <div className="text-center py-16">
            <p className="text-4xl mb-3">📦</p>
            <p className="text-neutral-400">No orders yet — لا طلبات بعد</p>
          </div>
        )}
      </div>

      {/* Products */}
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-bold text-xl">المنتجات — Products</h2>
        <span className="badge bg-olive-100 text-olive-700">{products?.length} products</span>
      </div>
      <div className="card overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-sand border-b border-orange-100">
            <tr>
              {['Product', 'Category', 'Price (DA)', 'Stock', 'Status'].map(h => (
                <th key={h} className="text-left px-4 py-3 font-semibold text-neutral-600 text-xs uppercase tracking-wide">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-orange-50">
            {products?.map(p => (
              <tr key={p.id} className="hover:bg-sand transition-colors">
                <td className="px-4 py-3 font-medium">{p.name}</td>
                <td className="px-4 py-3"><span className="badge bg-brand-100 text-brand-700 capitalize">{p.category}</span></td>
                <td className="px-4 py-3 font-semibold">{p.price.toLocaleString()}</td>
                <td className="px-4 py-3">
                  <span className={`font-bold ${p.stock === 0 ? 'text-red-500' : p.stock <= 5 ? 'text-amber-600' : 'text-olive-600'}`}>
                    {p.stock}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span className={`badge ${p.stock === 0 ? 'bg-red-100 text-red-700' : 'bg-olive-100 text-olive-700'}`}>
                    {p.stock === 0 ? 'Out of stock' : 'In stock'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}