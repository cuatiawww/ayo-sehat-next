import { Metadata } from 'next'
import HubungiKamiClient from './HubungiKamiClient'

export const metadata: Metadata = {
  title: 'Hubungi Kami - Ayo Sehat Kemenkes',
  description:
    'Hubungi Kementerian Kesehatan RI untuk informasi kesehatan, layanan, dan pertanyaan umum. Kami siap membantu Anda.',
  keywords: [
    'hubungi kemenkes',
    'kontak kesehatan',
    'layanan kesehatan',
    'informasi kesehatan',
    'kementerian kesehatan',
  ],
  openGraph: {
    title: 'Hubungi Kami - Ayo Sehat Kemenkes',
    description:
      'Hubungi kami untuk informasi kesehatan dan layanan yang Anda butuhkan',
    type: 'website',
    url: 'https://staging-ayo-sehat-v2.vercel.app/hubungi-kami',
  },
  alternates: {
    canonical: 'https://staging-ayo-sehat-v2.vercel.app/hubungi-kami',
  },
}

export default function HubungiKamiPage() {
  return <HubungiKamiClient />
}
