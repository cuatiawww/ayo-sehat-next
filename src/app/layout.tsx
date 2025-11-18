import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import './globals.css'

import TopBar from '@/components/layout/TopBar'
import Navbar from '@/components/layout/NavBar'
import Footer from '@/components/layout/Footer'

// Setup Poppins sebagai font utama
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Ayo Sehat - Portal Kesehatan Keluarga Indonesia',
    template: '%s | Ayo Sehat',
  },
  description:
    'Informasi kesehatan terlengkap dan terpercaya untuk semua usia: bayi, anak, remaja, dewasa, lansia.',
  metadataBase: new URL('https://staging-ayo-sehat.vercel.app'),
  keywords: [
    'kesehatan keluarga',
    'kesehatan anak',
    'kesehatan lansia',
    'pola hidup sehat',
    'ayo sehat',
    'kemenkes',
  ],
  authors: [{ name: 'Kementerian Kesehatan RI' }],
  creator: 'Kementerian Kesehatan RI',
  publisher: 'Kementerian Kesehatan RI',
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    siteName: 'Ayo Sehat Kemenkes',
  },
  twitter: {
    card: 'summary_large_image',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="id" className={poppins.variable}>
      <body className="min-h-screen flex flex-col antialiased">
        <TopBar />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}