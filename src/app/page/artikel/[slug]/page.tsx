import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import ArtikelDetail from './ArtikelDetail'
import data from '@/data/artikel.json'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return data.articles.map((article) => ({
    slug: article.slug,
  }))
}

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const params = await props.params
  const article = data.articles.find((item) => item.slug === params.slug)
  
  if (!article) {
    return {
      title: 'Artikel Tidak Ditemukan - Ayo Sehat',
    }
  }

  return {
    title: `${article.title} - Artikel Ayo Sehat`,
    description: article.excerpt,
  }
}

// CRITICAL: Named function with default export!
export default async function ArtikelDetailPage(props: PageProps) {
  const params = await props.params
  const article = data.articles.find((item) => item.slug === params.slug)
  
  if (!article) {
    notFound()
  }

  return <ArtikelDetail slug={params.slug} />
}