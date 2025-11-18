import { Metadata } from 'next'
import KegiatanClient from './KegiatanClient'

export const metadata: Metadata = {
  title: 'Kegiatan Ayo Sehat - Kemenkes',
  description:
    'Gerakan nasional yang mengajak seluruh masyarakat Indonesia untuk menerapkan perilaku hidup bersih dan sehat dalam kehidupan sehari-hari.',
  keywords: [
    'kegiatan kesehatan',
    'kampanye kesehatan',
    'hari kesehatan',
    'event kesehatan',
    'kemenkes',
    'ayo sehat',
  ],
  openGraph: {
    title: 'Kegiatan Ayo Sehat - Kemenkes',
    description:
      'Gerakan nasional yang mengajak seluruh masyarakat Indonesia untuk menerapkan perilaku hidup bersih dan sehat.',
    type: 'website',
    url: 'http://localhost:3000/kegiatan',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=1200&q=80',
        width: 1200,
        height: 630,
        alt: 'Kegiatan Ayo Sehat - Kemenkes',
      },
    ],
  },
  alternates: {
    canonical: 'http://localhost:3000/kegiatan',
  },
}

export default function KegiatanPage() {
  return <KegiatanClient />
}