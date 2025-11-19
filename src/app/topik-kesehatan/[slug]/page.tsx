import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import TopikKesehatanDetail from './TopikKesehatanDetail'
import data from '@/data/topik-kesehatan.json'

interface PageProps {
  params: Promise<{ slug: string }>
}

// Generate static paths
export async function generateStaticParams() {
  const topicDetails = data.topicDetails || {}
  return Object.keys(topicDetails).map((slug) => ({
    slug: slug,
  }))
}

// Generate metadata
export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const params = await props.params
  const topicDetail = data.topicDetails?.[params.slug as keyof typeof data.topicDetails]
  
  if (!topicDetail) {
    return {
      title: 'Topik Tidak Ditemukan - Ayo Sehat',
    }
  }

  return {
    title: `${topicDetail.title} - Topik Kesehatan Ayo Sehat`,
    description: `Informasi lengkap tentang ${topicDetail.title}. Pelajari penyebab, gejala, pencegahan, dan pengobatan.`,
    keywords: [
      topicDetail.title,
      ...(topicDetail.tags || []),
      'kesehatan',
      'kemenkes',
    ],
    openGraph: {
      title: topicDetail.title,
      description: `Informasi lengkap tentang ${topicDetail.title}`,
      type: 'article',
      images: [
        {
          url: topicDetail.image,
          width: 1200,
          height: 630,
          alt: topicDetail.title,
        },
      ],
    },
  }
}

// Main Page Component
export default async function TopikDetailPage(props: PageProps) {
  const params = await props.params
  const topicDetail = data.topicDetails?.[params.slug as keyof typeof data.topicDetails]
  
  if (!topicDetail) {
    notFound()
  }

  return <TopikKesehatanDetail slug={params.slug} />
}