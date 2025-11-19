import { Metadata } from 'next'
import TentangClient from './TentangClient'

export const metadata: Metadata = {
  title: 'Tentang Kami - Ayo Sehat Kemenkes',
  description:
    'Ayo Sehat merupakan wadah penyediaan platform terbaik dalam upaya informasi, edukasi kesehatan, serta gaya hidup sehat bagi kami dari Kementerian Kesehatan sebagai bagian dari program pemerintah.',
  keywords: [
    'tentang ayo sehat',
    'kemenkes',
    'kementerian kesehatan',
    'program kesehatan',
    'edukasi kesehatan indonesia',
  ],
  openGraph: {
    title: 'Tentang Kami - Ayo Sehat Kemenkes',
    description:
      'Ayo Sehat merupakan wadah penyediaan platform terbaik dalam upaya informasi, edukasi kesehatan, serta gaya hidup sehat bagi kami dari Kementerian Kesehatan sebagai bagian dari program pemerintah.',
    type: 'website',
    url: 'https://staging-ayo-sehat-v2.vercel.app/tentang',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200',
        width: 1200,
        height: 630,
        alt: 'Tentang Ayo Sehat Kemenkes',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tentang Kami - Ayo Sehat Kemenkes',
    description:
      'Platform informasi dan edukasi kesehatan dari Kementerian Kesehatan RI.',
    images: [
      'https://images.unsplash.com/photo-1576091160550-2173dba999ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200',
    ],
  },
  alternates: {
    canonical: 'https://staging-ayo-sehat-v2.vercel.app/tentang',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function TentangPage() {
  return <TentangClient />
}
