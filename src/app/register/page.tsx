import { Metadata } from 'next'
import RegisterClient from './RegisterClient'

export const metadata: Metadata = {
  title: 'Daftar - Portal Ayo Sehat Kemenkes',
  description:
    'Daftar akun untuk mengakses portal eksklusif Tenaga Kesehatan, Tenaga Pendidikan, atau Masyarakat Umum. Dapatkan akses informasi dan edukasi kesehatan dari Kementerian Kesehatan RI.',
  keywords: [
    'daftar ayo sehat',
    'registrasi portal kesehatan',
    'pendaftaran tenaga kesehatan',
    'pendaftaran tenaga pendidikan',
    'daftar akun kemenkes',
  ],
  openGraph: {
    title: 'Daftar - Portal Ayo Sehat Kemenkes',
    description:
      'Daftar akun untuk mengakses portal eksklusif dengan informasi dan edukasi kesehatan terpercaya.',
    type: 'website',
    url: 'https://staging-ayo-sehat-v2.vercel.app/register',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200',
        width: 1200,
        height: 630,
        alt: 'Daftar Portal Ayo Sehat',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Daftar - Portal Ayo Sehat Kemenkes',
    description:
      'Bergabunglah dengan portal kesehatan terpercaya dari Kementerian Kesehatan RI.',
    images: [
      'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200',
    ],
  },
  alternates: {
    canonical: 'https://staging-ayo-sehat-v2.vercel.app/register',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RegisterPage() {
  return <RegisterClient />
}
