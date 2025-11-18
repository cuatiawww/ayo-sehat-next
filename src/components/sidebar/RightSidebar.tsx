/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import CalendarCard from './CalendarCard'
import CampaignCard from '@/components/sidebar/CampaignCard'
import PublicationCard from './PublicationCard'
import RelatedArticlesCard from './RelatedArticlesCard'

interface RightSidebarProps {
  className?: string
  showCalendar?: boolean
  showRelatedArticles?: boolean
  showCampaigns?: boolean
  showPublications?: boolean
  relatedArticles?: any[]
  campaigns?: any[]
  publications?: any[]
  onCampaignDetailClick?: () => void
  onPublicationDetailClick?: () => void
  onRelatedArticlesClick?: () => void
}

export default function RightSidebar({
  className = '',
  showCalendar = true,
  showRelatedArticles = false,
  showCampaigns = false,
  showPublications = false,
  relatedArticles = [],
  campaigns = [],
  publications = [],
  onCampaignDetailClick,
  onPublicationDetailClick,
  onRelatedArticlesClick,
}: RightSidebarProps) {
  return (
    <aside className={`space-y-6 lg:space-y-8 ${className}`}>
      {/* Calendar */}
      {showCalendar && <CalendarCard delay={0.3} />}

      {/* Related Articles */}
      {showRelatedArticles && relatedArticles.length > 0 && (
        <RelatedArticlesCard
          articles={relatedArticles}
          onViewMore={onRelatedArticlesClick}
          delay={0.4}
        />
      )}

      {/* Campaigns */}
      {showCampaigns && campaigns.length > 0 && (
        <div className="mt-6">
          <CampaignCard campaigns={campaigns} />
        </div>
      )}

      {/* Publications */}
      {showPublications && publications.length > 0 && (
        <PublicationCard
          publications={publications}
          onViewDetail={onPublicationDetailClick}
          delay={0.5}
        />
      )}
    </aside>
  )
}