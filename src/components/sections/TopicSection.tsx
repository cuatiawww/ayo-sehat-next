'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ChevronRight, ChevronDown } from 'lucide-react'
import CustomCalendar from '@/components/CustomCalendar'
import CampaignCard from '@/components/sidebar/CampaignCard'
import { Button } from '@/components/ui/button'

// Data topik kesehatan per huruf
const healthTopicsByLetter: Record<string, string[]> = {
  A: ['ADHD', 'AIDS', 'Alzheimer', 'Anemia', 'Asma', 'Autisme'],
  B: ['Balita', 'Bayi Baru Lahir', 'Bronkitis'],
  C: ['Campak', 'Cacar Air', 'COVID-19'],
  D: ['Demam Berdarah', 'Diabetes', 'Difteri', 'Diare'],
  E: ['Ebola', 'Eksim', 'Epilepsi'],
  F: ['Flu Burung'],
  G: ['Gagal Ginjal', 'Gangguan Jiwa', 'GERD'],
  H: ['Hemofilia', 'Hepatitis', 'Hipertensi', 'HIV/AIDS'],
  I: ['Imunisasi', 'Infeksi Saluran Kemih', 'Insomnia'],
  J: ['Jantung Koroner'],
  K: ['Kanker', 'Kanker Payudara', 'Katarak', 'Kolesterol'],
  L: ['Leukemia', 'Lupus'],
  M: ['Malaria', 'Meningitis', 'Migrain'],
  N: ['NAPZA'],
  O: ['Obesitas', 'Osteoporosis'],
  P: ['Parkinson', 'Pneumonia', 'Polio'],
  Q: ['Quarantine Protocol', 'Query Fever'],
  R: ['Rabies', 'Rheumatoid Arthritis'],
  S: ['Sepsis', 'Stroke', 'Stunting'],
  T: ['Thalassemia', 'TBC', 'Tifus'],
  U: ['Ulcer (Tukak Lambung)', 'Urtikaria'],
  V: ['Vaksin'],
  W: ['Wasting', 'Waspada Demam Musiman'],
  X: ['Xeroderma'],
  Y: ['Yaws (Pian)'],
  Z: ['Zika'],
}

// Topik yang sudah ada kontennya (hanya anemia)
const availableTopics = ['anemia']

// Sample campaign data
const campaigns = [
  {
    id: '1',
    image:
      'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&q=80',
    title: 'Cek Kesehatan Gratis (CKG) di Sekolah',
    description:
      'Program pemeriksaan kesehatan gratis untuk siswa di seluruh Indonesia',
  },
  {
    id: '2',
    image:
      'https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?w=400&q=80',
    title: 'Program Vaksinasi Nasional',
    description: 'Lindungi diri dan keluarga dengan vaksinasi lengkap',
  },
  {
    id: '3',
    image:
      'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=400&q=80',
    title: 'Gerakan Masyarakat Hidup Sehat (GERMAS)',
    description: 'Mari bersama wujudkan Indonesia sehat',
  },
]

export default function TopicSection() {
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null)

  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')

  const handleLetterClick = (letter: string) => {
    if (healthTopicsByLetter[letter]?.length > 0) {
      setSelectedLetter((prev) => (prev === letter ? null : letter))
    }
  }

  // Fungsi untuk mendapatkan URL topik
  const getTopicUrl = (topic: string) => {
    const slug = topic
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '')

    // Cek apakah topik ada di daftar availableTopics
    if (availableTopics.includes(slug)) {
      return `/topik-kesehatan/${slug}`
    }

    // Jika tidak ada, redirect ke anemia
    return '/topik-kesehatan/anemia'
  }

  return (
    <section className="section-padding-lg bg-gray-50">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] xl:grid-cols-[980px_auto] gap-6 lg:gap-12 xl:gap-12">
          {/* Left Column - Topik A-Z */}
          <div className="card-brand w-full lg:max-w-[980px]">
            <div className="px-6 sm:px-8 lg:px-10 py-6 lg:py-8">
              <h2 className="text-heading-lg sm:text-display-sm lg:text-display-md text-brand-primary mb-2 sm:mb-3">
                Topik A-Z
              </h2>
              <p className="text-body-sm sm:text-body-md text-gray-600 mb-6 lg:mb-8">
                Temukan penyakit dan kondisi; hidup sehat; keselamatan di tempat
                kerja; kesehatan lingkungan; cedera, kekerasan, dan keselamatan;
                kesehatan global; kesehatan pelancong, dan banyak lagi.
              </p>

              {/* Alphabet Grid */}
              <div className="grid grid-cols-7 sm:grid-cols-9 md:grid-cols-13 gap-2 lg:gap-2.5 mb-6">
                {alphabet.map((letter) => {
                  const hasContent = healthTopicsByLetter[letter]?.length > 0
                  const isSelected = selectedLetter === letter

                  return (
                    <button
                      key={letter}
                      onClick={() => handleLetterClick(letter)}
                      disabled={!hasContent}
                      className={`aspect-square w-full rounded-lg flex items-center justify-center text-[20px] sm:text-[22px] lg:text-[24px] font-semibold leading-none transition-all duration-200 hover:scale-105 disabled:opacity-30 disabled:cursor-not-allowed ${
                        isSelected
                          ? 'bg-brand-primary text-white shadow-md'
                          : hasContent
                          ? 'bg-white text-gray-900 border border-gray-200 hover:border-brand-primary'
                          : 'bg-gray-100 text-gray-400'
                      }`}
                      aria-label={`Lihat topik huruf ${letter}`}
                    >
                      {letter}
                    </button>
                  )
                })}
              </div>

              {/* Topics Content - Below Alphabet */}
              {selectedLetter && (
                <div className="mb-6 animate-in fade-in slide-in-from-top-3 duration-300">
                  <div className="bg-gradient-to-br from-brand-primary/5 to-brand-primary/10 border-2 border-brand-primary rounded-xl p-4 lg:p-5">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-body-lg sm:text-heading-sm text-brand-primary flex items-center gap-2">
                        <span className="bg-brand-primary text-white w-8 h-8 rounded-full flex items-center justify-center text-body-md font-semibold">
                          {selectedLetter}
                        </span>
                        Topik Kesehatan
                      </h3>
                      <button
                        onClick={() => setSelectedLetter(null)}
                        className="text-gray-400 hover:text-brand-primary transition-colors"
                        aria-label="Tutup topik"
                      >
                        <ChevronDown className="w-5 h-5 rotate-180" />
                      </button>
                    </div>

                    {healthTopicsByLetter[selectedLetter]?.length > 0 ? (
                      <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 mb-3">
                          {healthTopicsByLetter[selectedLetter]
                            .slice(0, 4)
                            .map((topic, index) => (
                              <Link
                                key={index}
                                href={getTopicUrl(topic)}
                                className="group text-left bg-white hover:bg-brand-primary border border-gray-200 hover:border-brand-primary rounded-lg px-3 py-2.5 transition-all duration-200 hover:shadow-md hover:-translate-y-0.5"
                              >
                                <div className="flex items-center gap-2">
                                  <ChevronRight className="w-4 h-4 text-brand-primary group-hover:text-white transition-colors flex-shrink-0" />
                                  <span className="text-body-sm text-gray-700 group-hover:text-white transition-colors">
                                    {topic}
                                  </span>
                                </div>
                              </Link>
                            ))}
                        </div>

                        {/* Show "Lihat Semua" if more than 4 topics */}
                        {healthTopicsByLetter[selectedLetter].length > 4 && (
                          <Link
                            href="/topik-kesehatan"
                            className="inline-flex items-center gap-2 text-brand-primary hover:text-brand-primary-dark font-medium text-body-sm transition-colors"
                          >
                            Lihat Semua ({healthTopicsByLetter[selectedLetter].length} topik)
                            <ChevronRight className="w-4 h-4" />
                          </Link>
                        )}
                      </>
                    ) : (
                      <p className="text-center text-gray-500 text-body-sm py-4">
                        Belum ada topik untuk huruf {selectedLetter}
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* Divider */}
              <div className="h-px bg-gray-300 my-6 lg:my-8" />

              {/* CTA Section  */}
              <div className="relative bg-gradient-to-r from-brand-primary to-brand-primary-dark rounded-xl overflow-hidden p-6 lg:p-8 text-center group">
                {/* Decorative gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

                {/* Content */}
                <div className="relative z-10">
                  <h3 className="text-heading-md lg:text-heading-lg text-white font-semibold mb-3">
                    Tidak Menemukan Topik yang Anda Cari?
                  </h3>
                  <p className="text-body-sm sm:text-body-md text-white/90 mb-5 max-w-2xl mx-auto">
                    Hubungi kami atau gunakan fitur pencarian untuk menemukan
                    informasi kesehatan yang Anda butuhkan
                  </p>
                  <Button
                    size="lg"
                    className="bg-brand-accent hover:bg-brand-accent-hover text-gray-800 font-medium rounded-full px-8 lg:px-10 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
                  >
                    <Link href="/hubungi-kami">Hubungi Kami</Link>
                  </Button>
                </div>

                {/* Decorative circles */}
                <div className="absolute -top-10 -left-10 w-40 h-40 bg-white/5 rounded-full blur-2xl" />
                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/5 rounded-full blur-2xl" />
              </div>
            </div>
          </div>

          {/* Right Column - Calendar, Campaign & Partnership */}
          <div className="flex flex-col gap-5 w-full lg:max-w-[452px]">
            {/* Calendar Section */}
            <div>
              <h3 className="text-body-lg sm:text-heading-sm text-brand-primary font-bold mb-1">
                Kalender Kesehatan
              </h3>
              <p className="text-tiny sm:text-caption text-gray-600 mb-3">
                Informasi terkait dengan hari besar dan agenda kesehatan satu
                tahun penuh
              </p>
              <CustomCalendar />
            </div>

            {/* Campaign Section */}
            <CampaignCard campaigns={campaigns} />
          </div>
        </div>
      </div>
    </section>
  )
}
