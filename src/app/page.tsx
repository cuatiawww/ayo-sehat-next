import { Metadata } from 'next'
import { Suspense } from 'react'
import HeroSection from '@/components/sections/HeroSection'
import SearchSection from '@/components/sections/SearchSection'
import CategorySection from '@/components/sections/CategorySection'
import InfoSection from '@/components/sections/InfoSection'
import TopicSection from '@/components/sections/TopicSection'
import ArticleSection from '@/components/sections/ArticleSection'
import FeatureSection from '@/components/sections/FeatureSection'

// ===== SEO METADATA (Server-Side) =====
export const metadata: Metadata = {
  title: 'Ayo Sehat - Portal Kesehatan Keluarga Indonesia',
  description:
    'Informasi kesehatan terlengkap dan terpercaya untuk semua usia: bayi, anak, remaja, dewasa, lansia. Cegah penyakit, deteksi dini, dan pengobatan tepat.',
  keywords: [
    'kesehatan keluarga',
    'kesehatan anak',
    'kesehatan lansia',
    'pola hidup sehat',
    'ayo sehat',
    'kemenkes',
    'portal kesehatan',
    'informasi kesehatan',
    'tips kesehatan',
    'pencegahan penyakit',
  ],
  authors: [{ name: 'Kementerian Kesehatan Republik Indonesia' }],
  creator: 'Kementerian Kesehatan RI',
  publisher: 'Kementerian Kesehatan RI',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    url: 'http://localhost:3000',
    siteName: 'Ayo Sehat Kemenkes',
    title: 'Ayo Sehat - Portal Kesehatan Keluarga Indonesia',
    description:
      'Informasi kesehatan terlengkap dan terpercaya untuk semua usia: bayi, anak, remaja, dewasa, lansia. Cegah penyakit, deteksi dini, dan pengobatan tepat.',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200',
        width: 1200,
        height: 630,
        alt: 'Ilustrasi keluarga sehat dan bahagia bersama dokter - Portal Kesehatan Resmi Kemenkes RI',
        type: 'image/jpeg',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ayo Sehat - Portal Kesehatan Keluarga Indonesia',
    description:
      'Informasi kesehatan terlengkap dan terpercaya untuk semua usia: bayi, anak, remaja, dewasa, lansia.',
    images: [
      'https://images.unsplash.com/photo-1576091160550-2173dba999ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200',
    ],
  },
  alternates: {
    canonical: 'http://localhost:3000',
  },
  verification: {
    google: 'your-google-verification-code', 
  },
}

// ===== JSON-LD STRUCTURED DATA =====
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Ayo Sehat - Portal Kesehatan Keluarga Indonesia',
  description:
    'Informasi kesehatan terlengkap dan terpercaya untuk semua usia: bayi, anak, remaja, dewasa, lansia. Cegah penyakit, deteksi dini, dan pengobatan tepat.',
  url: 'https://staging-ayo-sehat-v2.vercel.app/',
  inLanguage: 'id-ID',
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Beranda',
        item: 'https://staging-ayo-sehat-v2.vercel.app/',
      },
    ],
  },
  publisher: {
    '@type': 'Organization',
    name: 'Kementerian Kesehatan Republik Indonesia',
    url: 'https://kemkes.go.id',
    logo: {
      '@type': 'ImageObject',
      url: 'https://staging-ayo-sehat-v2.vercel.app/logo.png',
      width: 600,
      height: 60,
      caption: 'Logo Kementerian Kesehatan RI',
    },
    sameAs: [
      'https://www.facebook.com/kemenkes',
      'https://twitter.com/kemenkesri',
      'https://www.instagram.com/kemenkesri',
      'https://www.youtube.com/@kemenkesri',
    ],
  },
  image: {
    '@type': 'ImageObject',
    url: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200',
    width: 1200,
    height: 630,
    caption: 'Ayo Sehat - Kesehatan Keluarga Indonesia',
    contentUrl:
      'https://images.unsplash.com/photo-1576091160550-2173dba999ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200',
    inLanguage: 'id-ID',
  },
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate:
        'https://staging-ayo-sehat-v2.vercel.app/search?q={search_term_string}',
    },
    'query-input': 'required name=search_term_string',
  },
}

// Organization Schema
const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'GovernmentOrganization',
  name: 'Kementerian Kesehatan Republik Indonesia',
  alternateName: 'Kemenkes RI',
  url: 'https://kemkes.go.id',
  logo: 'https://staging-ayo-sehat-v2.vercel.app/logo.png',
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+62-21-5201590',
    contactType: 'customer service',
    areaServed: 'ID',
    availableLanguage: ['Indonesian'],
  },
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Jl. H.R. Rasuna Said Blok X5 Kav. 4-9',
    addressLocality: 'Jakarta Selatan',
    addressRegion: 'DKI Jakarta',
    postalCode: '12950',
    addressCountry: 'ID',
  },
  sameAs: [
    'https://www.facebook.com/kemenkes',
    'https://twitter.com/kemenkesri',
    'https://www.instagram.com/kemenkesri',
    'https://www.youtube.com/@kemenkesri',
  ],
}

// ===== MAIN HOMEPAGE COMPONENT =====
export default function HomePage() {
  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />

      {/* Page Content with Suspense */}
      <div className="min-h-screen bg-white">
        <Suspense fallback={<div className="h-screen bg-gray-50" />}>
          <HeroSection />
        </Suspense>

        <Suspense fallback={<div className="h-96 bg-gray-50 animate-pulse" />}>
        <SearchSection />
      </Suspense>

      <Suspense fallback={<div className="h-96 bg-white animate-pulse" />}>
        <CategorySection />
      </Suspense>

        <Suspense fallback={<div className="h-96 bg-white animate-pulse" />}>
          <InfoSection />
        </Suspense>
        
        <Suspense fallback={<div className="h-96 bg-gray-50 animate-pulse" />}>
          <TopicSection />
        </Suspense>

        <Suspense fallback={<div className="h-96 bg-white animate-pulse" />}>
          <ArticleSection />
        </Suspense>

        <Suspense fallback={<div className="h-96 bg-gray-50 animate-pulse" />}>
          <FeatureSection />
        </Suspense>
      </div>
    </>
  )
}