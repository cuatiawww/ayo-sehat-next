import { Metadata } from 'next'
import KemitraanClient from './KemitraanClient'

export const metadata: Metadata = {
  title: 'Kemitraan - Bersama untuk Kesehatan Indonesia Lebih Baik',
  description:
    'Kolaborasi antara pemerintah, masyarakat, dan mitra strategis untuk meningkatkan program kesehatan yang lebih inklusif, inovatif, dan berkelanjutan. Bersama kita wujudkan Indonesia yang lebih sehat dan berkualitas.',
  keywords: [
    'kemitraan kesehatan',
    'mitra kemenkes',
    'kolaborasi kesehatan',
    'program kesehatan',
    'daftar mitra',
    'partnership',
  ],
  openGraph: {
    title: 'Kemitraan - Ayo Sehat Kemenkes',
    description:
      'Bersama untuk Kesehatan Indonesia Lebih Baik. Kolaborasi strategis untuk program kesehatan yang inklusif dan berkelanjutan.',
    type: 'website',
    url: 'http://localhost:3000/kemitraan',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200',
        width: 1200,
        height: 630,
        alt: 'Kemitraan Kesehatan Indonesia',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kemitraan - Ayo Sehat Kemenkes',
    description:
      'Bersama untuk Kesehatan Indonesia Lebih Baik.',
    images: [
      'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200',
    ],
  },
  alternates: {
    canonical: 'http://localhost:3000/kemitraan',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function KemitraanPage() {
  return <KemitraanClient />
}
