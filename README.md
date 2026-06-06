# 🛍️ DZ Store — Algerian E-commerce Platform

A full-stack e-commerce web application built for the Algerian market, featuring cash on delivery, bilingual Arabic/English UI, and delivery across all 58 wilayas.

## 🔗 Live Demo
👉 [https://dz-store-weld.vercel.app](https://dz-store-weld.vercel.app)

## 📸 Preview
> Homepage • Products • Cart • Checkout • Admin Dashboard

## ✨ Features

- 🛒 Product catalog with category filtering
- 📄 Product detail pages with stock management
- 🛍️ Persistent shopping cart (localStorage)
- 📦 Checkout form with all 58 Algerian wilayas
- 💵 Cash on delivery — no card required
- ⚙️ Admin dashboard — live order & product management
- 🌍 Bilingual UI — Arabic & English
- 📱 Fully responsive — mobile first design
- ⚡ Server-side rendering with Next.js App Router

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 15, TypeScript, Tailwind CSS |
| Database | Supabase (PostgreSQL) |
| Auth & API | Supabase RLS + REST API |
| Deployment | Vercel |

## 📁 Project Structure

```
src/
├── app/
│   ├── page.tsx          # Homepage with hero & featured products
│   ├── products/         # All products + category filter
│   ├── products/[id]/    # Product detail page
│   ├── cart/             # Shopping cart
│   ├── checkout/         # Order form with wilaya selector
│   └── admin/            # Orders & products dashboard
├── components/
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── ProductCard.tsx
│   ├── CategoryFilter.tsx
│   └── AdminOrderRow.tsx
├── context/
│   └── CartContext.tsx   # Global cart state
└── lib/
    └── supabase.ts       # Database client & types
```

## 🚀 Getting Started

```bash
# Clone the repo
git clone https://github.com/amina-red/dz-store.git
cd dz-store

# Install dependencies
npm install

# Add environment variables
cp .env.example .env.local
# Fill in your Supabase URL and anon key

# Run locally
npm run dev
```

## 🗄️ Database Schema

```sql
-- Products table
create table products (
  id uuid primary key,
  name text,
  description text,
  price numeric,
  image_url text,
  category text,
  stock integer,
  created_at timestamp
);

-- Orders table
create table orders (
  id uuid primary key,
  customer_name text,
  customer_phone text,
  customer_address text,
  wilaya text,
  items jsonb,
  total numeric,
  status text,
  created_at timestamp
);
```

## 👤 Author

Built by **Amina** — Full Stack Developer  
🔗 [GitHub](https://github.com/amina-red)

---

> Built with ❤️ in Algeria 🇩🇿
