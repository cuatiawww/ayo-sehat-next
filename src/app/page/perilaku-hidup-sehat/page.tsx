import { Metadata } from 'next'
import PerilakuHidupSehatClient from './PerilakuHidupSehatClient'

export const metadata: Metadata = {
  title: 'Perilaku Hidup Sehat - Ayo Sehat Kemenkes',
  description:
    'Panduan lengkap perilaku hidup sehat untuk mencegah penyakit dan meningkatkan kualitas hidup. Tips konsumsi makanan bergizi, aktivitas fisik, dan pola hidup sehat.',
  keywords: [
    'perilaku hidup sehat',
    'pola hidup sehat',
    'makanan bergizi',
    'air putih',
    'olahraga rutin',
    'tidak merokok',
    'cuci tangan',
    'kemenkes',
  ],
  openGraph: {
    title: 'Perilaku Hidup Sehat - Ayo Sehat Kemenkes',
    description:
      'Panduan lengkap perilaku hidup sehat untuk mencegah penyakit dan meningkatkan kualitas hidup.',
    type: 'website',
    url: 'http://localhost:3000/perilaku-hidup-sehat',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=1200&q=80',
        width: 1200,
        height: 630,
        alt: 'Perilaku Hidup Sehat - Kemenkes',
      },
    ],
  },
  alternates: {
    canonical: 'http://localhost:3000/perilaku-hidup-sehat',
  },
}

export default function PerilakuHidupSehatPage() {
  return <PerilakuHidupSehatClient />
}