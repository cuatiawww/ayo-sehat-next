import { Metadata } from 'next'
import KampanyeDetailClient from './KampanyeDetailClient'
import data from '@/data/kampanye.json'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const allCampaigns = [
    ...data.priorityCampaigns,
    ...data.healthCampaigns
  ]

  return allCampaigns.map((campaign) => ({
    slug: campaign.slug,
  }))
}

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const params = await props.params
  const allCampaigns = [
    ...data.priorityCampaigns,
    ...data.healthCampaigns
  ]
  const campaign = allCampaigns.find((item) => item.slug === params.slug)

  if (!campaign) {
    return {
      title: 'Kampanye Tidak Ditemukan - Ayo Sehat',
    }
  }

  return {
    title: `${campaign.title} - Kampanye Ayo Sehat`,
    description: campaign.description,
    keywords: ['kampanye kesehatan', campaign.category, 'kemenkes', 'ayo sehat'],
  }
}

export default async function KampanyeDetailPage(props: PageProps) {
  const params = await props.params

  return <KampanyeDetailClient slug={params.slug} />
}
