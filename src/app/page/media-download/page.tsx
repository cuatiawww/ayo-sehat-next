import { Metadata } from 'next'
import MediaDownloadClient from './MediaDownloadClient'

export const metadata: Metadata = {
  title: 'Media Download - Ayo Sehat Kemenkes',
  description:
    'Download berbagai media edukasi kesehatan: publikasi, buku, flyer, brosur, infografis, video, audio, dan media promosi kesehatan lainnya.',
  keywords: [
    'media download',
    'publikasi kesehatan',
    'infografis kesehatan',
    'video edukasi',
    'brosur kesehatan',
    'kemenkes',
  ],
  openGraph: {
    title: 'Media Download - Ayo Sehat Kemenkes',
    description:
      'Download berbagai media edukasi kesehatan dari Kementerian Kesehatan RI.',
    type: 'website',
    url: 'http://localhost:3000/media-download',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=1200&q=80',
        width: 1200,
        height: 630,
      },
    ],
  },
  alternates: {
    canonical: 'http://localhost:3000/media-download',
  },
}

export default function MediaDownloadPage() {
  return <MediaDownloadClient />
}