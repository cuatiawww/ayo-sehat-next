import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import KegiatanDetail from './KegiatanDetail'
import data from '@/data/kegiatan.json'

interface PageProps {
  params: Promise<{
    slug: string
  }>
}

// Generate static params for all event slugs
export async function generateStaticParams() {
  const slugs = Object.keys(data.eventDetails || {})
  
  return slugs.map((slug) => ({
    slug: slug,
  }))
}

// Generate metadata for each event
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params // TAMBAHKAN await di sini
  const eventDetail = data.eventDetails?.[slug as keyof typeof data.eventDetails]

  if (!eventDetail) {
    return {
      title: 'Kegiatan Tidak Ditemukan - Ayo Sehat Kemenkes',
    }
  }

  return {
    title: `${eventDetail.title} - Ayo Sehat Kemenkes`,
    keywords: eventDetail.tags?.join(', ') || '',
    openGraph: {
      title: eventDetail.title,
      images: [eventDetail.image],
      type: 'article',
      publishedTime: eventDetail.date,
      authors: [eventDetail.author?.name || 'Tim Kesehatan Kemenkes'],
    },
    twitter: {
      card: 'summary_large_image',
      title: eventDetail.title,
      images: [eventDetail.image],
    },
    alternates: {
      canonical: `https://staging-ayo-sehat-v2.vercel.app/page/kegiatan/${slug}`,
    },
  }
}

export default async function KegiatanDetailPage({ params }: PageProps) {
  const { slug } = await params 
  const eventDetail = data.eventDetails?.[slug as keyof typeof data.eventDetails]

  if (!eventDetail) {
    notFound()
  }

  return <KegiatanDetail slug={slug} />
}