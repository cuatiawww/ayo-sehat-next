'use client'

import Link from 'next/link'
import { Instagram, Facebook, Youtube, Twitter, User } from 'lucide-react'

export default function TopBar() {
  const socialLinks = [
    { name: 'Instagram', href: 'https://instagram.com/kemenkesri', icon: Instagram, label: 'Ikuti kami di Instagram' },
    { name: 'Facebook', href: 'https://facebook.com/kemenkes', icon: Facebook, label: 'Ikuti kami di Facebook' },
    { name: 'YouTube', href: 'https://youtube.com/@kemenkesri', icon: Youtube, label: 'Langganan channel YouTube kami' },
    { name: 'Twitter', href: 'https://twitter.com/kemenkesri', icon: Twitter, label: 'Ikuti kami di Twitter / X' },
  ]

  return (
    <div className="bg-gray-50 border-b border-gray-200">
      <div className="container-custom py-2 sm:py-3">
        <div className="flex items-center justify-end">
          {/* Mengurangi gap di mobile untuk memberi lebih banyak ruang */}
          <div className="flex items-center gap-2 sm:gap-6">
            {/* Social Media Icons - ukuran disesuaikan untuk mobile */}
            <div className="flex items-center gap-2 sm:gap-3">
              {socialLinks.map((social) => (
                <Link
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-primary hover:text-brand-primary-dark transition-colors"
                  aria-label={social.label}
                  title={social.label}
                >
                  {/* Ikon lebih kecil di mobile (w-4 h-4) dan normal di sm ke atas (w-5 h-5) */}
                  <social.icon className="w-4 h-4 sm:w-5 sm:h-5" strokeWidth={2.5} />
                </Link>
              ))}
            </div>

            {/* KONTAK - ukuran teks disesuaikan untuk mobile */}
            <Link
              href="hubungi-kami"
              className="text-xs sm:text-sm font-semibold text-gray-700 hover:text-brand-primary transition-colors"
              title="Hubungi Kami"
            >
              KONTAK
            </Link>

            {/* LOGIN - ukuran ikon dan teks disesuaikan untuk mobile */}
            <Link
              href="/login"
              className="flex items-center gap-2 hover:opacity-70 transition-opacity"
              title="Masuk ke Akun Anda"
            >
              {/* Ikon lebih kecil di mobile (w-4 h-4) dan normal di sm ke atas (w-5 h-5) */}
              <User className="w-4 h-4 sm:w-5 sm:h-5 text-brand-primary" strokeWidth={2.5} />
              {/* Teks lebih kecil di mobile (text-xs) dan normal di sm ke atas (text-sm) */}
              <span className="text-xs sm:text-sm font-semibold text-gray-700 hidden sm:inline">
                LOGIN
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
