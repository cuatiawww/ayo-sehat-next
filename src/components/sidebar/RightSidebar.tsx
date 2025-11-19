'use client'

import CalendarCard from './CalendarCard'
import CampaignCard from './CampaignCard'
import PublicationCard from './PublicationCard'
import RelatedArticlesCard from './RelatedArticlesCard'
import CTACard from './CtaCard'

interface Campaign {
  id: string
  image: string
  title: string
  description?: string
  link?: string
}

interface Publication {
  id: number | string
  title: string
  type?: string
  image: string
  link?: string
}

interface RelatedArticle {
  id: number | string
  title: string
  description?: string
  image: string
  category?: string[]
  lifecycleStage?: string[]
  date?: string
  readTime?: string
  slug?: string
}

interface CTAData {
  title: string
  description: string
  buttonText: string
  buttonLink: string
  image: string
}

interface ViewMoreLinks {
  articles?: string
  campaigns?: string
  publications?: string
}

interface RightSidebarProps {
  className?: string
  
  // Calendar
  showCalendar?: boolean
  
  // Related Articles
  showRelatedArticles?: boolean
  relatedArticles?: RelatedArticle[]
  onRelatedArticlesClick?: () => void
  
  // Campaigns
  showCampaigns?: boolean
  campaigns?: Campaign[]
  
  // Publications
  showPublications?: boolean
  publications?: Publication[]
  
  // CTA Card
  showCTA?: boolean
  ctaData?: CTAData
  
  // View More Links
  viewMoreLinks?: ViewMoreLinks
}

// Default data
const DEFAULT_CAMPAIGNS: Campaign[] = [
  {
    id: '1',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600',
    title: 'Gerakan Anak Bergizi',
    description: 'Program nasional untuk meningkatkan gizi anak Indonesia',
    link: '/kampanye/gerakan-anak-bergizi',
  },
]

const DEFAULT_PUBLICATIONS: Publication[] = [
  {
    id: 1,
    title: 'Panduan Kesehatan Ibu dan Anak',
    image: 'https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=600',
    type: 'PDF',
    link: '/publikasi/panduan-kesehatan-ibu-anak',
  },
]

export default function RightSidebar({
  className = '',
  
  // Calendar
  showCalendar = false,
  
  // Related Articles
  showRelatedArticles = false,
  relatedArticles = [],
  onRelatedArticlesClick,
  
  // Campaigns
  showCampaigns = false,
  campaigns = DEFAULT_CAMPAIGNS,
  
  // Publications
  showPublications = false,
  publications = DEFAULT_PUBLICATIONS,
  
  // CTA
  showCTA = false,
  ctaData,
  
  // View More Links
  viewMoreLinks = {},
}: RightSidebarProps) {
  return (
    <aside className={`space-y-8 ${className}`}>
      {/* Calendar */}
      {showCalendar && <CalendarCard delay={0.2} />}

      {/* Related Articles */}
      {showRelatedArticles && relatedArticles && relatedArticles.length > 0 && (
        <RelatedArticlesCard
          articles={relatedArticles}
          onViewMore={onRelatedArticlesClick}
          viewMoreLink={viewMoreLinks.articles || '/artikel'}
          delay={0.3}
        />
      )}

      {/* Campaigns */}
      {showCampaigns && campaigns && campaigns.length > 0 && (
        <CampaignCard 
          campaigns={campaigns}
          viewMoreLink={viewMoreLinks.campaigns || '/kampanye'}
        />
      )}

      {/* Publications */}
      {showPublications && publications && publications.length > 0 && (
        <PublicationCard
          publications={publications}
          viewMoreLink={viewMoreLinks.publications || '/publikasi'}
          delay={0.4}
        />
      )}

      {/* CTA Card */}
      {showCTA && ctaData && (
        <CTACard
          title={ctaData.title}
          description={ctaData.description}
          buttonText={ctaData.buttonText}
          buttonLink={ctaData.buttonLink}
          image={ctaData.image}
          delay={0.5}
        />
      )}
    </aside>
  )
}
