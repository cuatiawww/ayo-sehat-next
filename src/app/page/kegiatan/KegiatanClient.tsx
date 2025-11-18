'use client'

import { motion } from 'framer-motion'
import CustomBreadcrumb from '@/components/CustomBreadcrump'
import RightSidebar from '@/components/sidebar/RightSidebar'
import EventList from '@/components/kegiatan/EventList'
import data from '@/data/kegiatan.json'

// Type definition
interface Event {
  id: number
  title: string
  description: string
  image: string
  date: string
  displayDate: string
  slug: string
  status: 'ongoing' | 'upcoming'
}

// Type assertion untuk JSON data
const { ongoingEvents, upcomingEvents } = data as {
  ongoingEvents: Event[]
  upcomingEvents: Event[]
}

export default function KegiatanClient() {
  // JSON-LD
  const allEvents = [...ongoingEvents, ...upcomingEvents]
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Kegiatan Ayo Sehat',
    description:
      'Gerakan nasional yang mengajak seluruh masyarakat Indonesia untuk menerapkan perilaku hidup bersih dan sehat dalam kehidupan sehari-hari.',
    url: 'https://staging-ayo-sehat-v2.vercel.app/kegiatan',
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: allEvents.length,
      itemListElement: allEvents.map((event, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'Event',
          name: event.title,
          description: event.description,
          image: event.image,
          startDate: event.date,
        },
      })),
    },
  }

  return (
    <>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="min-h-screen bg-white">
        <CustomBreadcrumb currentPage="Kegiatan" />

        {/* HERO */}
        <section className="relative bg-brand-gradient py-12 sm:py-16 lg:py-20 overflow-hidden">
          {/* Decorative Background */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute -top-32 -left-32 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] rounded-full bg-white/10 blur-3xl" />
            <div className="absolute -bottom-32 right-0 w-[350px] sm:w-[600px] h-[350px] sm:h-[600px] rounded-full bg-white/5 blur-3xl" />
          </div>

          <div className="container-custom relative z-10">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl"
            >
              <h1 className="font-bold text-display-sm sm:text-display-md lg:text-display-lg leading-tight text-white mb-4 sm:mb-6">
                Kegiatan Ayo Sehat
              </h1>
              <p className="text-body-md sm:text-body-lg leading-relaxed text-white/90">
                Gerakan nasional yang mengajak seluruh masyarakat Indonesia
                untuk menerapkan perilaku hidup bersih dan sehat dalam
                kehidupan sehari-hari. Melalui berbagai kegiatan edukasi, media
                komunikasi, dan kolaborasi lintas sektor, Ayo Sehat berkomitmen
                membangun kesadaran bahwa kesehatan adalah tanggung jawab
                bersama.
              </p>
            </motion.div>
          </div>
        </section>

        {/* MAIN CONTENT */}
        <section className="section-padding-lg bg-white">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] xl:grid-cols-[1fr_380px] gap-8 lg:gap-12">
              {/* LEFT: Event Lists */}
              <div>
                {/* Sedang Berlangsung */}
                <EventList
                  title="Sedang Berlangsung"
                  events={ongoingEvents}
                  type="ongoing"
                />

                {/* Akan Datang */}
                <EventList
                  title="Akan Datang"
                  events={upcomingEvents}
                  type="upcoming"
                />
              </div>

              {/* RIGHT: Sidebar */}
              <div className="lg:sticky lg:top-6 lg:self-start">
                <RightSidebar
                  showCalendar={true}
                  showCampaigns={true}
                  showPublications={true}
                />
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}