import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import MediaDownloadDetail from './MediaDownloadDetail'
import data from '@/data/media-download.json'

interface PageProps {
  params: Promise<{
    slug: string
  }>
}

// Generate static params for all media slugs
export async function generateStaticParams() {
  const slugs = Object.keys(data.mediaDetails || {})
  
  return slugs.map((slug) => ({
    slug: slug,
  }))
}

// Generate metadata for each media
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const mediaDetail = data.mediaDetails?.[slug as keyof typeof data.mediaDetails]

  if (!mediaDetail) {
    return {
      title: 'Media Tidak Ditemukan - Ayo Sehat Kemenkes',
    }
  }

  return {
    title: `${mediaDetail.title} - Ayo Sehat Kemenkes`,
    description: mediaDetail.description || mediaDetail.fullContent?.intro,
    keywords: mediaDetail.tags?.join(', ') || '',
    openGraph: {
      title: mediaDetail.title,
      description: mediaDetail.description || mediaDetail.fullContent?.intro,
      images: [mediaDetail.image],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: mediaDetail.title,
      description: mediaDetail.description || mediaDetail.fullContent?.intro,
      images: [mediaDetail.image],
    },
    alternates: {
      canonical: `https://staging-ayo-sehat-v2.vercel.app/media-download/${slug}`,
    },
  }
}

export default async function MediaDownloadDetailPage({ params }: PageProps) {
  const { slug } = await params
  const mediaDetail = data.mediaDetails?.[slug as keyof typeof data.mediaDetails]

  if (!mediaDetail) {
    notFound()
  }

  return <MediaDownloadDetail slug={slug} />
}