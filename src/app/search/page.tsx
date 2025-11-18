import { Metadata } from 'next'
import { Suspense } from 'react'
import SearchResultsClient from './SearchResultClient'

interface SearchPageProps {
  searchParams: {
    q?: string
  }
}

export async function generateMetadata({
  searchParams,
}: SearchPageProps): Promise<Metadata> {
  const searchQuery = searchParams.q || ''
  const pageTitle = searchQuery
    ? `Hasil Pencarian: "${searchQuery}" - Ayo Sehat Kemenkes`
    : 'Pencarian Kesehatan - Ayo Sehat Kemenkes'

  const pageDescription = searchQuery
    ? `Hasil pencarian untuk "${searchQuery}". Informasi kesehatan terlengkap dari Kemenkes: artikel, download, topik, dan agenda.`
    : 'Cari informasi kesehatan terpercaya: penyakit, gejala, pencegahan, dan layanan medis dari Kementerian Kesehatan RI.'

  return {
    title: pageTitle,
    description: pageDescription,
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      type: 'website',
      url: `http://localhost:3000/search${searchQuery ? `?q=${searchQuery}` : ''}`,
      images: [
        {
          url: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200',
          width: 1200,
          height: 630,
        },
      ],
    },
    robots: {
      index: true,
      follow: true,
    },
  }
}

export default function SearchPage({ searchParams }: SearchPageProps) {
  const searchQuery = searchParams.q || ''

  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-brand-primary border-t-transparent" />
        </div>
      }
    >
      <SearchResultsClient searchQuery={searchQuery} />
    </Suspense>
  )
}