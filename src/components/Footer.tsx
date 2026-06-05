import Link from 'next/link'
import { Store, Phone, Mail, MapPin, Globe, Share2 } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-neutral-900 text-white mt-20">
      {/* WhatsApp CTA */}
      <div className="bg-green-800 py-6">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <p className="font-bold text-lg">تحتاج مساعدة؟ Need help?</p>
            <p className="text-green-200 text-sm">
              Our team is available 7 days a week on WhatsApp
            </p>
          </div>

          <a
            href="https://wa.me/213555000000"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-green-500 hover:bg-green-400 text-white px-6 py-3 rounded-xl font-semibold transition-colors shadow-lg"
          >
            <Phone size={18} />
            WhatsApp Us
          </a>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="md:col-span-1">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-9 h-9 bg-orange-600 rounded-xl flex items-center justify-center">
              <Store size={18} className="text-white" />
            </div>
            <div>
              <p className="font-bold text-white">DZ Store</p>
              <p className="text-xs text-neutral-400">دي زاد ستور</p>
            </div>
          </div>

          <p className="text-neutral-400 text-sm leading-relaxed">
            Algeria&apos;s trusted online store. Shop quality products with cash
            on delivery across all 58 wilayas.
          </p>

          <div className="flex gap-3 mt-4">
            <a
              href="#"
              className="p-2 bg-neutral-800 hover:bg-orange-600 rounded-lg transition-colors"
            >
              <Globe size={16} />
            </a>

            <a
              href="#"
              className="p-2 bg-neutral-800 hover:bg-orange-600 rounded-lg transition-colors"
            >
              <Share2 size={16} />
            </a>
          </div>
        </div>

        <div>
          <p className="font-semibold text-white mb-4">Quick Links</p>

          <div className="flex flex-col gap-2 text-sm text-neutral-400">
            <Link href="/" className="hover:text-orange-400 transition-colors">
              Home — الرئيسية
            </Link>

            <Link
              href="/products"
              className="hover:text-orange-400 transition-colors"
            >
              Products — المنتجات
            </Link>

            <Link
              href="/cart"
              className="hover:text-orange-400 transition-colors"
            >
              Cart — السلة
            </Link>

            <Link
              href="/checkout"
              className="hover:text-orange-400 transition-colors"
            >
              Checkout — الدفع
            </Link>
          </div>
        </div>

        <div>
          <p className="font-semibold text-white mb-4">Delivery Info</p>

          <div className="flex flex-col gap-2 text-sm text-neutral-400">
            <p>✅ All 58 wilayas</p>
            <p>📦 2–5 business days</p>
            <p>💵 Cash on delivery</p>
            <p>🆓 Free over 5000 DA</p>
            <p>↩️ Easy returns</p>
          </div>
        </div>

        <div>
          <p className="font-semibold text-white mb-4">Contact Us</p>

          <div className="flex flex-col gap-3 text-sm text-neutral-400">
            <a
              href="https://wa.me/213555000000"
              className="flex items-center gap-2 hover:text-green-400 transition-colors"
            >
              <Phone size={14} />
              +213 555 000 000
            </a>

            <a
              href="mailto:hello@dzstore.dz"
              className="flex items-center gap-2 hover:text-orange-400 transition-colors"
            >
              <Mail size={14} />
              hello@dzstore.dz
            </a>

            <div className="flex items-center gap-2">
              <MapPin size={14} />
              Algiers, Algeria
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-neutral-800 py-4 text-center text-xs text-neutral-500">
        © 2025 DZ Store — دي زاد ستور. Built with ❤️ in Algeria 🇩🇿
      </div>
    </footer>
  )
}