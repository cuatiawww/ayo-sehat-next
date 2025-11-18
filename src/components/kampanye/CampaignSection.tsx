'use client'

import CampaignCard from './CampaignCard'
import { Megaphone } from 'lucide-react'

// IMPORT TIPE DARI SATU SUMBER AJA → ini yang bikin Vercel happy!
import type { Campaign } from '@/types/campaign'

interface CampaignSectionProps {
  title: string
  description?: string
  campaigns: Campaign[]        // ← semua Campaign sekarang pakai tipe yang sama
}

export default function CampaignSection({
  title,
  description,
  campaigns,
}: CampaignSectionProps) {
  // Kalau kosong → tampilkan empty state
  if (!campaigns || campaigns.length === 0) {
    return (
      <div className="mb-16">
        <h2 className="text-heading-lg sm:text-display-sm text-brand-primary mb-3 font-semibold">
          {title}
        </h2>
        {description && (
          <p className="text-body-md text-gray-600 mb-8 max-w-3xl">{description}</p>
        )}

        <div className="text-center py-12 bg-gray-50 rounded-2xl">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
            <Megaphone className="w-8 h-8 text-gray-400" />
          </div>
          <p className="text-body-md text-gray-500">
            Tidak ada kampanye tersedia saat ini
          </p>
        </div>
      </div>
    )
  }

  // Kalau ada data → tampilkan grid kartu
  return (
    <div className="mb-16">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-heading-lg sm:text-display-sm text-brand-primary mb-3 font-semibold">
          {title}
        </h2>
        {description && (
          <p className="text-body-md text-gray-600 max-w-3xl leading-relaxed">
            {description}
          </p>
        )}
      </div>

      {/* Grid Kampanye */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
        {campaigns.map((campaign, index) => (
          <CampaignCard
            key={campaign.id}
            campaign={campaign}
            index={index}
          />
        ))}
      </div>
    </div>
  )
}