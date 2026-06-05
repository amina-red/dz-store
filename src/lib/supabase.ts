import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseKey)

export type Product = {
  id: string
  name: string
  description: string
  price: number
  image_url: string
  category: string
  stock: number
}

export type CartItem = Product & { quantity: number }

export type Order = {
  customer_name: string
  customer_phone: string
  customer_address: string
  wilaya: string
  items: CartItem[]
  total: number
}