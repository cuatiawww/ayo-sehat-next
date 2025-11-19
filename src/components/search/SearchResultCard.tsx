'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Download } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

interface BaseResult {
  id: number | string
  title: string
  date: string
  slug?: string
}

interface ArticleResult extends BaseResult {
  type: 'article'
  image: string
  stage?: string
  readTime?: string
}

interface DownloadResult extends BaseResult {
  type: 'download'
  downloads?: number
}

interface TopicResult extends BaseResult {
  type: 'topic'
  image: string
  stages?: string[]
  views?: number
}

interface CampaignResult extends BaseResult {
  type: 'campaign'
  image: string
  views?: number
}

type SearchResult =
  | ArticleResult
  | DownloadResult
  | TopicResult
  | CampaignResult

interface SearchResultCardProps {
  item: SearchResult
}

export default function SearchResultCard({ item }: SearchResultCardProps) {
  const getLink = () => {
    if (item.slug) {
      switch (item.type) {
        case 'article':
          return `/artikel/${item.slug}`
        case 'download':
          return `/download/${item.slug}`
        case 'topic':
          return `/topik/${item.slug}`
        case 'campaign':
          return `/kampanye/${item.slug}`
        default:
          return '#'
      }
    }
    return '#'
  }

  return (
    <article className="cursor-pointer group">
      <Link href={getLink()} className="block">
        {/* Image Section */}
        {(item.type === 'article' ||
          item.type === 'topic' ||
          item.type === 'campaign') && (
          <div className="relative h-[208px] rounded-xl overflow-hidden mb-3">
            <Image
              src={(item as ArticleResult | TopicResult | CampaignResult).image}
              alt={item.title}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-300"
            />
          </div>
        )}

        {/* Download Icon for Downloads */}
        {item.type === 'download' && (
          <div className="relative h-[208px] rounded-xl overflow-hidden mb-3 bg-gradient-to-br from-brand-primary/10 to-brand-primary-dark/10">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-lg">
                <Download className="w-16 h-16 text-brand-primary" />
              </div>
            </div>
          </div>
        )}

        {/* Content */}
        <div className="relative min-h-[122px] border-b border-gray-200 pb-4">
          <div className="flex flex-col gap-2 pt-5">
            {/* Stage/Category Badge */}
            {item.type === 'article' && (item as ArticleResult).stage && (
              <p className="text-caption sm:text-body-sm text-brand-primary">
                {(item as ArticleResult).stage}
              </p>
            )}

            {item.type === 'topic' && (item as TopicResult).stages && (
              <div className="flex gap-2 flex-wrap">
                {(item as TopicResult).stages?.map((stage, idx) => (
                  <Badge
                    key={idx}
                    variant="outline"
                    className="text-tiny border-brand-primary text-brand-primary"
                  >
                    {stage}
                  </Badge>
                ))}
              </div>
            )}

            {item.type === 'campaign' && (
              <p className="text-caption sm:text-body-sm text-brand-primary">
                Kampanye Prioritas
              </p>
            )}

            {item.type === 'download' && (
              <p className="text-caption sm:text-body-sm text-brand-primary">
                Dewasa (18-59 Tahun)
              </p>
            )}

            {/* Title */}
            <h3 className="text-body-md sm:text-body-lg font-medium text-gray-900 group-hover:text-brand-primary transition-colors line-clamp-2">
              {item.title}
            </h3>

            {/* Meta Info */}
            <div className="flex items-center gap-3 text-caption sm:text-body-sm text-gray-600">
              <span>{item.date}</span>
              <div className="w-1 h-1 rounded-full bg-gray-400" />

              {item.type === 'article' && (item as ArticleResult).readTime && (
                <span>Waktu Baca {(item as ArticleResult).readTime}</span>
              )}

              {item.type === 'download' &&
                (item as DownloadResult).downloads && (
                  <span>
                    {(item as DownloadResult).downloads?.toLocaleString()} kali
                    diunduh
                  </span>
                )}

              {item.type === 'topic' && (item as TopicResult).views && (
                <span>
                  {(item as TopicResult).views?.toLocaleString()} kali dilihat
                </span>
              )}

              {item.type === 'campaign' && (item as CampaignResult).views && (
                <span>
                  {(item as CampaignResult).views?.toLocaleString()} kali
                  dilihat
                </span>
              )}
            </div>
          </div>
        </div>
      </Link>
    </article>
  )
}
