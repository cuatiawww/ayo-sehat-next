import { Metadata } from 'next'
import ArtikelClient from './ArticleClient'

export const metadata: Metadata = {
  title: 'Artikel Ayo Sehat - Informasi Kesehatan Lengkap untuk Semua Usia',
  description:
    'Temukan artikel kesehatan terbaru tentang pencegahan, deteksi, dan pengobatan sesuai siklus hidup: bayi, anak, remaja, dewasa, lansia.',
  keywords: [
    'artikel kesehatan',
    'tips kesehatan',
    'pencegahan penyakit',
    'deteksi dini',
    'pengobatan',
    'kesehatan keluarga',
    'kemenkes',
  ],
  openGraph: {
    title: 'Artikel Ayo Sehat - Kemenkes',
    description:
      'Pendekatan menjaga kesehatan sejak lahir hingga lanjut usia.',
    type: 'website',
    url: 'https://staging-ayo-sehat-v2.vercel.app/artikel',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200',
        width: 1200,
        height: 630,
        alt: 'Artikel Kesehatan Ayo Sehat',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Artikel Ayo Sehat - Kemenkes',
    description: 'Pendekatan menjaga kesehatan sejak lahir hingga lanjut usia.',
    images: [
      'https://images.unsplash.com/photo-1576091160550-2173dba999ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200',
    ],
  },
  alternates: {
    canonical: 'https://staging-ayo-sehat-v2.vercel.app/artikel',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function ArtikelPage() {
  return <ArtikelClient />
}
