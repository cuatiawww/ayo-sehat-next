import Link from 'next/link'
import Image from 'next/image'
import { Facebook, Instagram, Youtube, Twitter } from 'lucide-react'

export default function Footer() {
  const socialLinks = [
    {
      name: 'Facebook',
      href: 'https://facebook.com/kemenkes',
      icon: Facebook,
      label: 'Facebook Ayo Sehat',
    },
    {
      name: 'Twitter',
      href: 'https://twitter.com/kemenkesri',
      icon: Twitter,
      label: 'Twitter Ayo Sehat',
    },
    {
      name: 'Instagram',
      href: 'https://instagram.com/kemenkesri',
      icon: Instagram,
      label: 'Instagram Ayo Sehat',
    },
    {
      name: 'YouTube',
      href: 'https://youtube.com/@kemenkesri',
      icon: Youtube,
      label: 'YouTube Ayo Sehat',
    },
  ]

  const footerLinks = {
    layanan: [
      { label: 'Konsultasi Online', href: '/layanan/konsultasi' },
      { label: 'Medical Check-Up', href: '/layanan/mcu' },
      { label: 'Laboratorium', href: '/layanan/lab' },
    ],
    spesialis: [
      { label: 'Dokter Umum', href: '/spesialis/umum' },
      { label: 'Dokter Gigi', href: '/spesialis/gigi' },
    ],
    informasi: [
      { label: 'Tentang Kami', href: '/page/tentang' },
      { label: 'Tim Medis', href: '/tim' },
      { label: 'Karir', href: '/karir' },
    ],
    artikel: [
      { label: 'Tips Kesehatan', href: '/artikel/tips' },
      { label: 'Pencegahan Penyakit', href: '/artikel/pencegahan' },
      { label: 'Gaya Hidup Sehat', href: '/artikel/gaya-hidup' },
      { label: 'Nutrisi & Gizi', href: '/artikel/nutrisi' },
      { label: 'Kesehatan Mental', href: '/artikel/mental' },
    ],
    kontak: [
      { label: 'Customer Service', href: '/kontak/cs' },
      { label: 'WhatsApp', href: 'https://wa.me/6281234567890' },
      { label: 'FAQ', href: '/faq' },
    ],
  }

  return (
    <footer className="bg-white border-t border-gray-300">
      {/* Main Footer Content */}
      <div className="container-custom py-8 sm:py-12 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-12">
          {/* Column 1 - Logo & Info */}
          <div>
            <div className="mb-6">
              {/* Logo */}
              <div className="mb-3 sm:mb-4">
                <Image
                  src="/assets/logo.png"
                  alt="Logo Ayo Sehat - Kementerian Kesehatan RI"
                  title="Ayo Sehat - Platform Kesehatan Resmi Kemenkes"
                  width={160}
                  height={53}
                  className="w-[120px] sm:w-[140px] lg:w-[160px] h-auto object-contain"
                />
              </div>

              {/* Organization Name */}
              <div className="leading-tight mb-3 sm:mb-4">
                <p className="font-bold text-body-sm sm:text-body-md text-gray-900">
                  Ayo Sehat
                </p>
                <p className="font-medium text-body-xs sm:text-body-sm text-gray-900">
                  Kementerian Kesehatan Republik Indonesia
                </p>
              </div>

              {/* Address */}
              <p className="text-body-xs sm:text-body-sm text-gray-900 mb-3 sm:mb-4">
                Jl. H.R. Rasuna Said Blok X5 Kav. 4-9
                <br />
                Jakarta Selatan, DKI Jakarta
              </p>

              {/* WhatsApp Chatbot */}
              <Link
                href="https://wa.me/6281234567890"
                target="_blank"
                rel="noopener noreferrer"
                className="text-body-xs sm:text-body-sm text-brand-primary hover:text-brand-primary-dark transition-colors inline-flex items-center gap-1"
              >
                Chatbot WhatsApp Ayo Sehat
                <svg
                  className="w-3 h-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </Link>
            </div>

            {/* Social Media */}
            <div>
              <h4 className="font-medium text-body-sm sm:text-body-md text-gray-900 mb-3 sm:mb-4">
                Media Sosial
              </h4>
              <div className="flex gap-3">
                {socialLinks.map((social) => (
                  <Link
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-[30px] h-[30px] rounded-md bg-brand-primary-dark hover:bg-brand-primary-hover flex items-center justify-center transition-all duration-300 hover:scale-110"
                    aria-label={social.label}
                  >
                    <social.icon className="w-4 h-4 text-white" />
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Column 2 - Layanan & Spesialis */}
          <div>
            <h3 className="font-bold text-body-sm sm:text-body-md text-gray-900 mb-3 sm:mb-4 uppercase">
              Layanan Kami
            </h3>
            <ul className="space-y-2">
              {footerLinks.layanan.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-tiny sm:text-caption text-brand-primary hover:text-brand-primary-dark transition-all duration-300 inline-block hover:translate-x-1 uppercase"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <h3 className="font-bold text-body-sm sm:text-body-md text-gray-900 mb-3 sm:mb-4 mt-6 sm:mt-8 uppercase">
              Spesialis
            </h3>
            <ul className="space-y-2">
              {footerLinks.spesialis.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-tiny sm:text-caption text-brand-primary hover:text-brand-primary-dark transition-all duration-300 inline-block hover:translate-x-1 uppercase"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 - Informasi & Artikel */}
          <div>
            <h3 className="font-bold text-body-sm sm:text-body-md text-gray-900 mb-3 sm:mb-4 uppercase">
              Informasi
            </h3>
            <ul className="space-y-2">
              {footerLinks.informasi.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-tiny sm:text-caption text-brand-primary hover:text-brand-primary-dark transition-all duration-300 inline-block hover:translate-x-1 uppercase"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <h3 className="font-bold text-body-sm sm:text-body-md text-gray-900 mb-3 sm:mb-4 mt-6 sm:mt-8 uppercase">
              Artikel Kesehatan
            </h3>
            <ul className="space-y-2">
              {footerLinks.artikel.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-tiny sm:text-caption text-brand-primary hover:text-brand-primary-dark transition-all duration-300 inline-block hover:translate-x-1 uppercase"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 - Hubungi Kami */}
          <div>
            <h3 className="font-bold text-body-sm sm:text-body-md text-gray-900 mb-3 sm:mb-4 uppercase">
              Hubungi Kami
            </h3>
            <ul className="space-y-2">
              {footerLinks.kontak.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    target={link.href.startsWith('http') ? '_blank' : undefined}
                    rel={
                      link.href.startsWith('http')
                        ? 'noopener noreferrer'
                        : undefined
                    }
                    className="text-tiny sm:text-caption text-brand-primary hover:text-brand-primary-dark transition-all duration-300 inline-block hover:translate-x-1 uppercase"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-300">
        <div className="container-custom py-4 sm:py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4">
            <p className="text-tiny sm:text-caption text-gray-900 text-center sm:text-left">
              © 2025 Kementerian Kesehatan Republik Indonesia. All rights
              reserved.
            </p>
            <div className="flex gap-3 sm:gap-4">
              <Link
                href="/privacy"
                className="text-tiny sm:text-caption text-brand-primary hover:text-brand-primary-dark transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-tiny sm:text-caption text-brand-primary hover:text-brand-primary-dark transition-colors"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}