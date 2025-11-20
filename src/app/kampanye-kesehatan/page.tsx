import { Metadata } from 'next'
import KampanyeKesehatanClient from './KampanyeKesehatanClient'

export const metadata: Metadata = {
  title: 'Kampanye Kesehatan - Ayo Sehat Kemenkes',
  description:
    'Kampanye Kesehatan menyediakan informasi dan materi edukatif terkait berbagai program kesehatan dari Kementerian Kesehatan RI. Dapatkan pengetahuan terbaru untuk hidup lebih sehat.',
  keywords: [
    'kampanye kesehatan',
    'edukasi kesehatan',
    'program kesehatan',
    'kemenkes',
    'ayo sehat',
  ],
  openGraph: {
    title: 'Kampanye Kesehatan - Ayo Sehat Kemenkes',
    description:
      'Program dan kampanye kesehatan dari Kementerian Kesehatan RI.',
    type: 'website',
    url: 'https://staging-ayo-sehat-v2.vercel.app/kampanye-kesehatan',
  },
}

export default function KampanyeKesehatanPage() {
  return <KampanyeKesehatanClient />
}
