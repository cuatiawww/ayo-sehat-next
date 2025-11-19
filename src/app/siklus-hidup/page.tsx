import { Metadata } from 'next'
import SiklusHidupClient from './SiklusHidupClient'

export const metadata: Metadata = {
  title: 'Siklus Hidup Kesehatan - Ayo Sehat Kemenkes',
  description:
    'Panduan kesehatan lengkap untuk setiap tahap kehidupan: bayi, anak, remaja, dewasa, dan lansia. Informasi gizi, imunisasi, dan pencegahan penyakit.',
  keywords: [
    'siklus hidup kesehatan',
    'kesehatan bayi',
    'kesehatan anak',
    'kesehatan remaja',
    'kesehatan dewasa',
    'kesehatan lansia',
    'kemenkes',
  ],
  openGraph: {
    title: 'Siklus Hidup Kesehatan - Ayo Sehat Kemenkes',
    description:
      'Panduan kesehatan untuk setiap tahap kehidupan dari Kementerian Kesehatan RI.',
    url: 'https://staging-ayo-sehat-v2.vercel.app/siklus-hidup',
    type: 'website',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1200&q=80',
        width: 1200,
        height: 630,
        alt: 'Siklus Hidup Kesehatan - Kemenkes',
      },
    ],
  },
  alternates: {
    canonical: 'https://staging-ayo-sehat-v2.vercel.app/siklus-hidup',
  },
}

export default function SiklusHidupPage() {
  return <SiklusHidupClient />
}
