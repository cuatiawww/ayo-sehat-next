'use client'

import Link from 'next/link'
import { Instagram, Facebook, Youtube, Twitter, User } from 'lucide-react'

export default function TopBar() {
  const socialLinks = [
    {
      name: 'Instagram',
      href: 'https://instagram.com/kemenkesri',
      icon: Instagram,
      label: 'Ikuti kami di Instagram',
    },
    {
      name: 'Facebook',
      href: 'https://facebook.com/kemenkes',
      icon: Facebook,
      label: 'Ikuti kami di Facebook',
    },
    {
      name: 'YouTube',
      href: 'https://youtube.com/@kemenkesri',
      icon: Youtube,
      label: 'Langganan channel YouTube kami',
    },
    {
      name: 'Twitter',
      href: 'https://twitter.com/kemenkesri',
      icon: Twitter,
      label: 'Ikuti kami di Twitter / X',
    },
  ]

  return (
    <div className="bg-white border-b border-gray-100">
      <div className="container-custom py-3">
        <div className="flex items-center justify-end">
          <div className="flex items-center gap-3 sm:gap-6">
            {/* Social Media Icons */}
            <div className="flex items-center gap-3">
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
                  <social.icon className="w-[13px] h-[13px]" />
                </Link>
              ))}
            </div>

            {/* Contact Link */}
            <Link
              href="/kontak"
              className="text-caption text-gray-600 hover:text-brand-primary transition-colors"
              title="Hubungi Kami"
            >
              Kontak
            </Link>

            {/* Login Button */}
            <Link
              href="/login"
              className="flex items-center gap-2 hover:opacity-70 transition-opacity"
              title="Masuk ke Akun Anda"
            >
              <User className="w-5 h-5 text-brand-primary" />
              <span className="text-caption text-gray-600 hidden sm:inline">
                Login
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}