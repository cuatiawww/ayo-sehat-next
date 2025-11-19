'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

const features = [
  {
    title: 'Tidak Merokok',
    description:
      'Rokok meningkatkan risiko kanker, penyakit jantung, dan paru-paru.',
    position: 'left',
    icon: '/assets/icon1.png',
    alt: 'Ikon larangan merokok',
    slug: 'tidak-merokok',
  },
  {
    title: 'Hindari Konsumsi Alkohol',
    description:
      'Alkohol dapat merusak organ tubuh dan memicu berbagai penyakit kronis.',
    position: 'left',
    icon: '/assets/icon2.png',
    alt: 'Ikon larangan minum alkohol',
    slug: 'hindari-konsumsi-alkohol',
  },
  {
    title: 'Batasi Konsumsi Gula, Garam, dan Lemak',
    description:
      'Gula maksimal 50 gram, garam 5 gram, dan lemak total 67 gram per hari.',
    position: 'left',
    icon: '/assets/icon5.png',
    alt: 'Ikon batasi gula, garam, dan lemak',
    slug: 'batasi-gula-garam-lemak',
  },
  {
    title: 'Minum Air Putih yang Cukup',
    description:
      'Minimal 8 gelas atau 2 liter per hari, sesuaikan dengan aktivitas.',
    position: 'right',
    icon: '/assets/icon4.png',
    alt: 'Ikon minum air putih',
    slug: 'minum-air-putih-cukup',
  },
  {
    title: 'Konsumsi Makanan Bergizi Seimbang',
    description:
      'Utamakan buah, sayur, protein tanpa lemak, dan karbohidrat kompleks.',
    position: 'right',
    icon: '/assets/icon6.png',
    alt: 'Ikon makanan sehat',
    slug: 'konsumsi-makanan-bergizi-seimbang',
  },
  {
    title: 'Rutin Berolahraga',
    description: 'Minimal 150 menit aktivitas fisik sedang setiap minggu.',
    position: 'right',
    icon: '/assets/icon3.png',
    alt: 'Ikon olahraga rutin',
    slug: 'rutin-berolahraga',
  },
]

export default function InfoSection() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement | null>(null)

  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
          }
        })
      },
      { threshold: 0.1 }
    )

    const currentRef = sectionRef.current
    if (currentRef) observer.observe(currentRef)

    return () => {
      if (currentRef) observer.unobserve(currentRef)
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className="section-padding-lg bg-white overflow-hidden"
    >
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <h2 className="text-heading-lg sm:text-display-sm lg:text-display-md text-brand-primary mb-4 sm:mb-5">
            Perilaku Hidup Sehat
          </h2>
          <p className="text-body-md sm:text-body-lg lg:text-heading-sm text-gray-600 max-w-4xl mx-auto">
            Perilaku hidup sehat adalah kebiasaan sehari-hari yang dilakukan
            untuk menjaga dan meningkatkan kesehatan tubuh dan pikiran, seperti
            makan bergizi, olahraga teratur, cukup istirahat, serta menjaga
            kebersihan dan kesehatan mental.
          </p>
        </div>

        {/* Mobile/Tablet View */}
        <div className="lg:hidden space-y-5 sm:space-y-6">
          {features.map((feature, index) => (
            <Link
              key={index}
              href={`/perilaku-hidup-sehat/${feature.slug}`}
              className={`card-brand transition-all duration-500 hover:scale-[1.02] hover:shadow-xl cursor-pointer group ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'
              }`}
              style={{
                transitionDelay: `${index * 0.1}s`,
              }}
            >
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="bg-brand-primary rounded-xl w-[70px] h-[70px] sm:w-[80px] sm:h-[80px] flex-shrink-0 group-hover:bg-brand-primary-dark group-hover:rotate-6 group-hover:scale-110 transition-all duration-500 flex items-center justify-center overflow-hidden shadow-lg">
                  <div className="relative w-[45px] h-[45px] sm:w-[55px] sm:h-[55px]">
                    <Image
                      src={feature.icon}
                      alt={feature.alt}
                      title={feature.title}
                      fill
                      className="object-contain transition-transform duration-500 group-hover:scale-125"
                    />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-body-md sm:text-body-lg text-brand-primary mb-1 sm:mb-2 group-hover:text-brand-primary-dark transition-colors duration-300 font-semibold">
                    {feature.title}
                  </h3>
                  <p className="text-body-sm sm:text-body-md text-gray-600">
                    {feature.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Desktop View - Staggered Layout */}
        <div className="hidden lg:flex items-start justify-between gap-0">
          {/* Left Features */}
          <div className="w-[35%] pt-0">
            {features.slice(0, 3).map((feature, index) => (
              <FeatureItem
                key={index}
                feature={feature}
                index={index}
                isVisible={isVisible}
                side="left"
              />
            ))}
          </div>

          {/* Center Image */}
          <div className="relative w-[400px] h-[400px] xl:w-[500px] xl:h-[500px] flex-shrink-0 mx-8 xl:mx-12 mt-8">
            {/* Animated Circles */}
            <div className="absolute inset-0 animate-pulse opacity-10">
              <div className="w-full h-full rounded-full bg-brand-primary" />
            </div>
            <div className="absolute inset-0 animate-spin-slow opacity-30">
              <svg
                className="w-full h-full"
                viewBox="0 0 522 522"
                fill="none"
              >
                <circle
                  cx="261"
                  cy="261"
                  r="250"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeDasharray="10 20"
                  className="text-brand-primary"
                />
              </svg>
            </div>

            {/* Main Image */}
            <div className="absolute inset-0 hover:scale-110 transition-transform duration-700 cursor-pointer group">
              <div className="absolute inset-0 bg-brand-primary rounded-full opacity-0 group-hover:opacity-20 blur-2xl transition-all duration-700" />
              <div className="relative w-full h-full rounded-full overflow-hidden shadow-2xl group-hover:shadow-[0_0_50px_rgba(24,179,171,0.5)] transition-all duration-700">
                <Image
                  src="/assets/Switch.png"
                  alt="Keluarga bahagia yang mewakili kesehatan dan kesejahteraan"
                  title="Perilaku Hidup Sehat - Keluarga Sehat"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          {/* Right Features */}
          <div className="w-[35%]">
            {features.slice(3, 6).map((feature, index) => (
              <FeatureItem
                key={index}
                feature={feature}
                index={index + 3}
                isVisible={isVisible}
                side="right"
              />
            ))}
          </div>
        </div>

        {/* CTA Button */}
        <div
          className={`text-center mt-8 sm:mt-12 lg:mt-16 transition-all duration-500 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: '1.2s' }}
        >
          <Link href="/perilaku-hidup-sehat">
            <Button
              size="lg"
              className="btn-brand-accent bg-brand-accent hover:bg-brand-accent-hover text-black px-8 sm:px-12 lg:px-16 h-[55px] sm:h-[70px] lg:h-[80px] text-[16px] sm:text-[20px] lg:text-[25px] rounded-full hover:scale-105 transition-transform duration-300"
            >
              Simak Perilaku Hidup Sehat Lainnya
            </Button>
          </Link>
        </div>
      </div>

      <style jsx>{`
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
      `}</style>
    </section>
  )
}

// Feature Item Component (Desktop)
function FeatureItem({
  feature,
  index,
  isVisible,
  side,
}: {
  feature: (typeof features)[0]
  index: number
  isVisible: boolean
  side: 'left' | 'right'
}) {
  const marginBottom = index % 3 < 2 ? '100px' : '0'
  const marginOffset = index % 3 === 1 ? '40px' : '0'

  return (
    <Link
      href={`/perilaku-hidup-sehat/${feature.slug}`}
      className={`flex items-start gap-4 xl:gap-6 group transition-all duration-800 cursor-pointer ${
        isVisible
          ? 'opacity-100 translate-x-0'
          : side === 'left'
          ? 'opacity-0 -translate-x-12'
          : 'opacity-0 translate-x-12'
      }`}
      style={{
        marginBottom,
        marginLeft: side === 'right' ? marginOffset : '0',
        marginRight: side === 'left' ? marginOffset : '0',
        transitionDelay: `${index * 0.2}s`,
      }}
    >
      {side === 'left' ? (
        <>
          <div className="text-right max-w-[280px] xl:max-w-[335px] transition-all duration-500 group-hover:-translate-x-2">
            <h3 className="text-body-lg font-semibold text-brand-primary mb-2 group-hover:text-brand-primary-dark transition-colors duration-300">
              {feature.title}
            </h3>
            <p className="text-body-md text-gray-600">{feature.description}</p>
          </div>
          <IconBox feature={feature} />
        </>
      ) : (
        <>
          <IconBox feature={feature} />
          <div className="max-w-[280px] xl:max-w-[335px] transition-all duration-500 group-hover:translate-x-2">
            <h3 className="text-body-lg font-semibold text-brand-primary mb-2 group-hover:text-brand-primary-dark transition-colors duration-300">
              {feature.title}
            </h3>
            <p className="text-body-md text-gray-600">{feature.description}</p>
          </div>
        </>
      )}
    </Link>
  )
}

// Icon Box Component
function IconBox({ feature }: { feature: (typeof features)[0] }) {
  return (
    <div className="relative">
      <div className="absolute inset-0 bg-brand-primary rounded-xl blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500" />
      <div className="relative bg-brand-primary rounded-xl w-[88px] h-[88px] flex-shrink-0 group-hover:bg-brand-primary-dark group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 cursor-pointer flex items-center justify-center overflow-hidden shadow-lg group-hover:shadow-2xl">
        <div className="relative w-[60px] h-[60px]">
          <Image
            src={feature.icon}
            alt={feature.alt}
            title={feature.title}
            fill
            className="object-contain transition-all duration-500 group-hover:scale-110 group-hover:-rotate-12"
          />
        </div>
      </div>
    </div>
  )
}
