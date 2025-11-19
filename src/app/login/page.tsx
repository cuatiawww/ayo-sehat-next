import { Metadata } from 'next'
import LoginClient from './LoginClient'

export const metadata: Metadata = {
  title: 'Login - Portal Ayo Sehat Kemenkes',
  description:
    'Masuk ke portal eksklusif Tenaga Kesehatan untuk mengakses informasi terbaru dan sumber daya edukasi profesional dari Kementerian Kesehatan RI.',
  keywords: [
    'login ayo sehat',
    'portal tenaga kesehatan',
    'kemenkes login',
    'akses portal kesehatan',
    'login tenaga medis',
  ],
  openGraph: {
    title: 'Login - Portal Ayo Sehat Kemenkes',
    description:
      'Masuk ke portal eksklusif Tenaga Kesehatan untuk mengakses informasi terbaru dan sumber daya edukasi profesional.',
    type: 'website',
    url: 'https://staging-ayo-sehat-v2.vercel.app/login',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200',
        width: 1200,
        height: 630,
        alt: 'Portal Ayo Sehat Login',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Login - Portal Ayo Sehat Kemenkes',
    description:
      'Portal eksklusif untuk Tenaga Kesehatan dari Kementerian Kesehatan RI.',
    images: [
      'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200',
    ],
  },
  alternates: {
    canonical: 'https://staging-ayo-sehat-v2.vercel.app/login',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function LoginPage() {
  return <LoginClient />
}
