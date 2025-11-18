import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import PerilakuHidupSehatDetail from './PerilakuHidupSehatDetail'
import data from '@/data/perilaku-hidup-sehat.json'

interface PageProps {
  params: Promise<{ slug: string }>
}

// Generate static paths for all behaviors
export async function generateStaticParams() {
  return data.healthyBehaviors.map((behavior) => ({
    slug: behavior.slug,
  }))
}

// Generate metadata for each page
export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const params = await props.params
  const behavior = data.healthyBehaviors.find((item) => item.slug === params.slug)
  
  if (!behavior) {
    return {
      title: 'Tidak Ditemukan - Ayo Sehat',
    }
  }

  return {
    title: `${behavior.title} - Perilaku Hidup Sehat | Ayo Sehat Kemenkes`,
    description: behavior.description,
    keywords: [
      behavior.title,
      'perilaku hidup sehat',
      behavior.category,
      'kesehatan',
      'kemenkes',
    ],
    openGraph: {
      title: `${behavior.title} - Perilaku Hidup Sehat`,
      description: behavior.description,
      type: 'article',
      images: [
        {
          url: behavior.image,
          width: 1200,
          height: 630,
          alt: behavior.title,
        },
      ],
    },
  }
}

export default async function Page(props: PageProps) {
  const params = await props.params
  
  // Check if behavior exists
  const behavior = data.healthyBehaviors.find((item) => item.slug === params.slug)
  
  if (!behavior) {
    notFound()
  }

  return <PerilakuHidupSehatDetail slug={params.slug} />
}