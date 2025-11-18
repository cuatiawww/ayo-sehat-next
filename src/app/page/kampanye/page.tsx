import { Metadata } from 'next'
import KampanyeClient from './KampanyeClient'

export const metadata: Metadata = {
  title: 'Kampanye Ayo Sehat - Kemenkes',
  description:
    'Kampanye dan peringatan hari besar kesehatan yang diselenggarakan oleh Kementerian Kesehatan dan mitra terkait. Melalui kampanye ini, masyarakat dapat berpartisipasi aktif dalam berbagai kegiatan edukasi, dan nyata untuk meningkatkan kualitas kesehatan.',
  keywords: [
    'kampanye kesehatan',
    'hari kesehatan',
    'gerakan kesehatan',
    'kampanye prioritas',
    'kemenkes',
    'ayo sehat',
  ],
  openGraph: {
    title: 'Kampanye Ayo Sehat - Kemenkes',
    description:
      'Kampanye dan peringatan hari besar kesehatan dari Kementerian Kesehatan RI.',
    type: 'website',
    url: 'https://staging-ayo-sehat-v2.vercel.app/kampanye',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=1200&q=80',
        width: 1200,
        height: 630,
      },
    ],
  },
  alternates: {
    canonical: 'https://staging-ayo-sehat-v2.vercel.app/page/kampanye',
  },
}

export default function KampanyePage() {
  return <KampanyeClient />
}