import Link from 'next/link'
import Image from 'next/image'
import { Facebook, Instagram, Youtube, Twitter } from 'lucide-react'

export default function Footer() {
  const socialLinks = [
    { href: 'https://facebook.com/kemenkes', icon: Facebook },
    { href: 'https://twitter.com/kemenkesri', icon: Twitter },
    { href: 'https://instagram.com/kemenkesri', icon: Instagram },
    { href: 'https://youtube.com/@kemenkesri', icon: Youtube },
  ]

  return (
    <footer className="bg-white border-t border-gray-300">
      {/* MAIN FOOTER – 2 KOLOM SAJA */}
      <div className="max-w-7xl mx-auto px-6 py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          {/* KOLOM KIRI – Logo & Info (seperti permintaan: bold, tidak turun ke bawah) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-start gap-4">
              <Image
                src="/assets/logo.png"
                alt="Ayo Sehat - Kementerian Kesehatan RI"
                width={160}
                height={53}
                className="w-36 lg:w-40 h-auto"
              />
            </div>

            <div className="space-y-3 text-gray-700">
              <p className="font-bold text-lg text-gray-900">Ayo Sehat</p>
              <p className="font-bold text-base text-gray-900">
                Kementerian Kesehatan Republik Indonesia
              </p>

              <p className="text-sm leading-relaxed">
                Jl. H.R. Rasuna Said Blok X5 Kav. 4-9
                <br />
                Jakarta Selatan, DKI Jakarta
              </p>

              <Link
                href="https://wa.me/6281234567890"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-brand-primary hover:text-brand-primary-dark font-medium text-sm"
              >
                Chatbot WhatsApp Ayo Sehat
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </Link>
            </div>

            <div>
              <p className="font-medium text-gray-900 mb-3">Media Sosial</p>
              <div className="flex gap-3">
                {socialLinks.map((social, i) => (
                  <Link
                    key={i}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 bg-brand-primary-dark hover:bg-brand-primary-hover rounded-md flex items-center justify-center transition-all hover:scale-110"
                  >
                    <social.icon className="w-5 h-5 text-white" />
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* KOLOM KANAN – Semua menu dalam 1 blok rapi */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
              {/* Program Unggulan */}
              <div>
                <h3 className="font-bold text-sm uppercase tracking-wider text-gray-900 mb-4">
                  Program Unggulan
                </h3>
                <ul className="space-y-2 text-sm text-brand-primary">
                  <li><Link href="#" className="hover:underline">Pemeriksaan Kesehatan Gratis</Link></li>
                  <li><Link href="#" className="hover:underline">1000 Hari Pertama Kehidupan</Link></li>
                  <li><Link href="#" className="hover:underline">Penanganan Stunting</Link></li>
                </ul>
              </div>

              {/* Kampanye Prioritas */}
              <div>
                <h3 className="font-bold text-sm uppercase tracking-wider text-gray-900 mb-4">
                  Kampanye Prioritas
                </h3>
                <ul className="space-y-2 text-sm text-brand-primary">
                  <li><Link href="#" className="hover:underline">Mudik Sehat</Link></li>
                  <li><Link href="#" className="hover:underline">Program Inovasi Edukasi Kesehatan</Link></li>
                  <li><Link href="#" className="hover:underline">Gerakan Aksi Bergizi</Link></li>
                  <li><Link href="#" className="hover:underline">Cegah Stunting</Link></li>
                  <li><Link href="#" className="hover:underline">Gerakan Sehat</Link></li>
                  <li><Link href="#" className="hover:underline">Germas</Link></li>
                </ul>
              </div>

              {/* Informasi */}
              <div>
                <h3 className="font-bold text-sm uppercase tracking-wider text-gray-900 mb-4">
                  Informasi
                </h3>
                <ul className="space-y-2 text-sm text-brand-primary">
                  <li><Link href="#" className="hover:underline">Kampanye Kesehatan</Link></li>
                </ul>
              </div>

              {/* Link Terkait */}
              <div>
                <h3 className="font-bold text-sm uppercase tracking-wider text-gray-900 mb-4">
                  Link Terkait
                </h3>
                <ul className="space-y-2 text-sm text-brand-primary">
                  <li>
                    <Link href="https://kemenkes.go.id" target="_blank" rel="noopener noreferrer" className="hover:underline">
                      Kementerian Kesehatan
                    </Link>
                  </li>
                  <li>
                    <Link href="https://sehatnegeriku.kemkes.go.id" target="_blank" rel="noopener noreferrer" className="hover:underline">
                      Sehat Negeriku
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM BAR – TETAP SAMA PERSIS SEPERTI AWAL */}
      <div className="border-t border-gray-300">
        <div className="max-w-7xl mx-auto px-6 py-5">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm">
            <p className="text-gray-900 text-center sm:text-left">
              © 2025 Kementerian Kesehatan Republik Indonesia. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link href="/privacy" className="text-brand-primary hover:text-brand-primary-dark">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-brand-primary hover:text-brand-primary-dark">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
