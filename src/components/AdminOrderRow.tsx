'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'

type Order = {
  id: string
  customer_name: string
  customer_phone: string
  wilaya: string
  items: Array<{ name: string; quantity: number }>
  total: number
  status: string
  created_at: string
}

export default function AdminOrderRow({ order }: { order: Order }) {
  const [status, setStatus] = useState(order.status)

  const updateStatus = async (newStatus: string) => {
    await supabase.from('orders').update({ status: newStatus }).eq('id', order.id)
    setStatus(newStatus)
  }

  const statusColors: Record<string, string> = {
    pending: 'bg-amber-100 text-amber-800',
    confirmed: 'bg-blue-100 text-blue-800',
    delivered: 'bg-green-100 text-green-800',
    cancelled: 'bg-red-100 text-red-800',
  }

  return (
    <tr className="hover:bg-neutral-50">
      <td className="px-4 py-3 font-mono text-xs text-neutral-500">{order.id.slice(0, 8).toUpperCase()}</td>
      <td className="px-4 py-3">
        <p className="font-medium">{order.customer_name}</p>
        <p className="text-neutral-400 text-xs">{order.customer_phone}</p>
      </td>
      <td className="px-4 py-3 text-neutral-600">{order.wilaya}</td>
      <td className="px-4 py-3 text-neutral-600">{order.items.length} item{order.items.length > 1 ? 's' : ''}</td>
      <td className="px-4 py-3 font-semibold">{order.total.toLocaleString()} DA</td>
      <td className="px-4 py-3">
        <select
          value={status}
          onChange={e => updateStatus(e.target.value)}
          className={`text-xs font-medium px-2 py-1 rounded-full border-0 cursor-pointer focus:outline-none ${statusColors[status] || 'bg-neutral-100 text-neutral-700'}`}
        >
          <option value="pending">Pending</option>
          <option value="confirmed">Confirmed</option>
          <option value="delivered">Delivered</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </td>
      <td className="px-4 py-3 text-neutral-400 text-xs">
        {new Date(order.created_at).toLocaleDateString('en-GB')}
      </td>
    </tr>
  )
}