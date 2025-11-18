/* eslint-disable react-hooks/set-state-in-effect */
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'

// Menu Items Configuration
const menuItems = [
  {
    label: 'Tentang',
    href: '/page/tentang',
    iconPath: '/assets/info.svg',
  },
  {
    label: 'Topik',
    href: '/page/topik-kesehatan',
    iconPath: '/assets/category.svg',
  },
  {
    label: 'Siklus Hidup',
    href: '/page/siklus-hidup',
    iconPath: '/assets/user.svg',
  },
  {
    label: 'Hidup Sehat',
    href: '/page/hidup-sehat',
    iconPath: '/assets/heart.svg',
  },
  {
    label: 'Kegiatan',
    href: '/page/kegiatan',
    iconPath: '/assets/calendar.svg',
  },
  {
    label: 'Download',
    href: '/page/download',
    iconPath: '/assets/paper.svg',
  },
  {
    label: 'Kampanye',
    href: '/page/kampanye',
    iconPath: '/assets/Activity.svg',
  },
  {
    label: 'Kemitraan',
    href: '/page/kemitraan',
    iconPath: '/assets/Document.svg',
  },
]

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isSticky, setIsSticky] = useState(false)
  const pathname = usePathname()

  // Sticky navbar on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false)
  }, [pathname])

  const isHomePage = pathname === '/'

  return (
    <nav
      className={`bg-white border-b border-gray-300 transition-all duration-300 ${
        isSticky ? 'fixed top-0 left-0 right-0 z-50 shadow-md' : ''
      }`}
      aria-label="Navigasi utama"
    >
      <div className="container-custom">
        <div className="relative py-2 lg:py-3">
          {/* ===== DESKTOP LAYOUT ===== */}
          <div className="hidden lg:flex items-center gap-4 xl:gap-6">
            {/* Logo */}
            <Link
              href="/"
              className="block w-[150px] xl:w-[180px] hover:opacity-80 transition-opacity"
              aria-label={
                isHomePage
                  ? 'Beranda Kemenkes Ayo Sehat'
                  : 'Kembali ke beranda'
              }
            >
              <Image
                src="/assets/logo.png"
                alt="Kemenkes Ayo Sehat"
                title="Kemenkes Ayo Sehat - Platform Kesehatan Resmi"
                width={180}
                height={60}
                priority
                className="w-full h-auto"
              />
            </Link>

            {/* Menu Items */}
            <div className="flex-1 flex justify-end gap-4 xl:gap-5 2xl:gap-6">
              {menuItems.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex flex-col items-center justify-center gap-2 rounded-xl w-[85px] h-[85px] xl:w-[95px] xl:h-[95px] transition-all duration-300 group ${
                      isActive
                        ? 'bg-brand-primary shadow-card'
                        : 'bg-transparent hover:bg-[#e9fffe] hover:shadow-md'
                    }`}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {/* Icon */}
                    <div
                      className={`relative w-[42px] h-[42px] transition-all duration-300 ${
                        isActive ? 'brightness-0 invert' : 'group-hover:scale-110'
                      }`}
                    >
                      <Image
                        src={item.iconPath}
                        alt={`Ikon ${item.label}`}
                        fill
                        className="object-contain"
                      />
                    </div>

                    {/* Label */}
                    <span
                      className={`font-semibold text-[10px] xl:text-[11px] 2xl:text-caption leading-tight text-center transition-colors duration-300 ${
                        isActive
                          ? 'text-white'
                          : 'text-brand-primary group-hover:text-brand-primary-dark'
                      }`}
                    >
                      {item.label}
                    </span>
                  </Link>
                )
              })}
            </div>
          </div>

          {/* ===== TABLET LAYOUT ===== */}
          <div className="hidden md:flex lg:hidden items-center justify-between gap-3">
            <Link
              href="/"
              className="block w-[130px] hover:opacity-80 transition-opacity"
              aria-label={isHomePage ? 'Beranda' : 'Kembali ke beranda'}
            >
              <Image
                src="/assets/logo.png"
                alt="Kemenkes Ayo Sehat"
                width={130}
                height={43}
                priority
                className="w-full h-auto"
              />
            </Link>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-brand-primary p-1.5 hover:bg-gray-100 rounded-lg transition-colors shrink-0"
              aria-label={mobileMenuOpen ? 'Tutup menu' : 'Buka menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* ===== MOBILE LAYOUT ===== */}
          <div className="flex md:hidden items-center justify-between">
            <Link
              href="/"
              className="block w-[100px] hover:opacity-80 transition-opacity"
              aria-label={isHomePage ? 'Beranda' : 'Kembali ke beranda'}
            >
              <Image
                src="/assets/logo.png"
                alt="Kemenkes Ayo Sehat"
                width={100}
                height={33}
                priority
                className="w-full h-auto"
              />
            </Link>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-brand-primary p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label={mobileMenuOpen ? 'Tutup menu' : 'Buka menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* ===== MOBILE MENU DROPDOWN ===== */}
        {mobileMenuOpen && (
          <div className="lg:hidden pb-3 space-y-2 border-t border-gray-200 pt-3 bg-white">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
              {menuItems.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex flex-col items-center justify-center gap-1 rounded-xl w-full aspect-square transition-all duration-300 ${
                      isActive
                        ? 'bg-brand-primary shadow-card'
                        : 'bg-transparent hover:bg-[#e9fffe]'
                    }`}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {/* Icon */}
                    <div
                      className={`relative w-[42px] h-[42px] scale-75 ${
                        isActive ? 'brightness-0 invert' : ''
                      }`}
                    >
                      <Image
                        src={item.iconPath}
                        alt={`Ikon ${item.label}`}
                        fill
                        className="object-contain"
                      />
                    </div>

                    {/* Label */}
                    <span
                      className={`font-semibold text-[10px] leading-tight text-center transition-colors duration-300 ${
                        isActive ? 'text-white' : 'text-brand-primary'
                      }`}
                    >
                      {item.label}
                    </span>
                  </Link>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}