import { Metadata } from 'next'
import TopikKesehatanClient from './TopikKesehatanClient'
export const metadata: Metadata = {
  title: 'Daftar Topik Kesehatan A‑Z – Ayo Sehat Kemenkes',
  description:
    'Jelajahi ratusan topik kesehatan dari A sampai Z. Temukan info pencegahan, pengobatan, dan gaya hidup sehat dari Kemenkes.',
  keywords: [
    'topik kesehatan',
    'daftar penyakit',
    'A-Z kesehatan',
    'informasi kesehatan',
    'kemenkes',
  ],
  openGraph: {
    title: 'Daftar Topik Kesehatan A‑Z – Ayo Sehat Kemenkes',
    description:
      'Jelajahi ratusan topik kesehatan dari A sampai Z. Temukan info pencegahan, pengobatan, dan gaya hidup sehat dari Kemenkes.',
    url: 'http://localhost:3000/topik-kesehatan',
    type: 'website',
    images: [
      {
        url: 'http://localhost:3000/og-topik-kesehatan.jpg',
        width: 1200,
        height: 630,
        alt: 'Daftar Topik Kesehatan A-Z - Ayo Sehat Kemenkes',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Daftar Topik Kesehatan A‑Z – Ayo Sehat Kemenkes',
    description:
      'Jelajahi ratusan topik kesehatan dari A sampai Z.',
    images: [
      'http://localhost:3000/og-topik-kesehatan.jpg',
    ],
  },
  alternates: {
    canonical: 'http://localhost:3000/topik-kesehatan',
  },
}

export default function TopikKesehatanPage() {
  return <TopikKesehatanClient />
}