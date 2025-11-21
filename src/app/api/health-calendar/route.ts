import { NextResponse } from 'next/server'
import * as cheerio from 'cheerio'

export interface HealthObservance {
  date: string // Format: "MM-DD"
  title: string
  description: string
  category?: string
}

// Cache untuk menyimpan hasil scraping (optional)
let cachedData: HealthObservance[] | null = null
let cacheTimestamp: number | null = null
const CACHE_DURATION = 24 * 60 * 60 * 1000 // 24 jam dalam milliseconds

// Mapping bulan Indonesia ke angka
const monthMap: { [key: string]: string } = {
  januari: '01',
  februari: '02',
  maret: '03',
  april: '04',
  mei: '05',
  juni: '06',
  juli: '07',
  agustus: '08',
  september: '09',
  oktober: '10',
  november: '11',
  desember: '12'
}

async function scrapeHealthCalendar(): Promise<HealthObservance[]> {
  try {
    const url = 'https://kesmas-id.com/kalender-peringatan-hari-besar-kesehatan/'

    // Fetch HTML dari website
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      },
      next: { revalidate: 86400 } // Cache 24 jam
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.status}`)
    }

    const html = await response.text()
    const $ = cheerio.load(html)
    const healthObservances: HealthObservance[] = []

    // Scraping data dari halaman
    // Struktur HTML bisa berbeda, ini contoh umum untuk mengekstrak list items

    // Coba beberapa selector yang umum digunakan
    const contentSelectors = [
      '.entry-content',
      '.post-content',
      'article',
      '.content',
      'main'
    ]

    let $content = null
    for (const selector of contentSelectors) {
      const element = $(selector)
      if (element.length > 0) {
        $content = element
        break
      }
    }

    if (!$content) {
      throw new Error('Could not find content container')
    }

    // Ekstrak data berdasarkan struktur yang ditemukan
    let currentMonth = ''

    // Cari semua heading dan paragraf/list items
    $content.find('h2, h3, h4, p, li').each((_, element) => {
      const $el = $(element)
      const text = $el.text().trim()

      // Deteksi nama bulan
      const lowerText = text.toLowerCase()
      for (const [monthName, monthNum] of Object.entries(monthMap)) {
        if (lowerText.includes(monthName)) {
          currentMonth = monthNum
          break
        }
      }

      // Ekstrak event dengan pattern: tanggal + nama event
      // Pattern umum: "1 Jan", "15 Januari", "2 Feb:", dll
      const datePattern = /^(\d{1,2})\s+(?:jan(?:uari)?|feb(?:ruari)?|mar(?:et)?|apr(?:il)?|mei|jun(?:i)?|jul(?:i)?|agu(?:stus)?|sep(?:tember)?|okt(?:ober)?|nov(?:ember)?|des(?:ember)?)[:\s-]*/i
      const match = text.match(datePattern)

      if (match && currentMonth) {
        const day = match[1].padStart(2, '0')
        const dateKey = `${currentMonth}-${day}`

        // Ambil nama event (teks setelah tanggal)
        const eventTitle = text.replace(datePattern, '').trim()

        if (eventTitle && eventTitle.length > 3) {
          // Cek apakah sudah ada (hindari duplikat)
          const exists = healthObservances.some(obs => obs.date === dateKey)

          if (!exists) {
            // Cari deskripsi dari elemen berikutnya jika ada
            let description = `Peringatan ${eventTitle} untuk meningkatkan kesadaran kesehatan masyarakat.`
            const $next = $el.next()
            if ($next.length > 0) {
              const nextText = $next.text().trim()
              if (nextText.length > 20 && nextText.length < 500) {
                description = nextText
              }
            }

            healthObservances.push({
              date: dateKey,
              title: eventTitle,
              description: description,
              category: 'Kesehatan'
            })
          }
        }
      }
    })

    // Jika scraping gagal atau tidak menemukan data, gunakan data fallback minimal
    if (healthObservances.length === 0) {
      console.warn('Scraping returned no results, using fallback data')
      return getFallbackData()
    }

    return healthObservances

  } catch (error) {
    console.error('Error scraping health calendar:', error)
    // Return fallback data jika scraping gagal
    return getFallbackData()
  }
}

// Data fallback jika scraping gagal
function getFallbackData(): HealthObservance[] {
  return [
    {
      date: '01-25',
      title: 'Hari Gizi Nasional',
      description: 'Memperingati pentingnya gizi seimbang untuk kesehatan optimal dan pencegahan stunting pada anak-anak Indonesia.',
      category: 'Gizi'
    },
    {
      date: '02-04',
      title: 'Hari Kanker Sedunia',
      description: 'Meningkatkan kesadaran global tentang pencegahan, deteksi dini, dan pengobatan kanker untuk menyelamatkan jutaan nyawa.',
      category: 'Kanker'
    },
    {
      date: '03-24',
      title: 'Hari Tuberkulosis Sedunia',
      description: 'Membangun kesadaran global tentang TB dan upaya untuk mengakhiri epidemi penyakit menular ini.',
      category: 'Penyakit Menular'
    },
    {
      date: '04-07',
      title: 'Hari Kesehatan Sedunia',
      description: 'Memperingati pendirian WHO dan fokus pada isu kesehatan global yang memerlukan perhatian mendesak.',
      category: 'Umum'
    },
    {
      date: '05-12',
      title: 'Hari Perawat Internasional',
      description: 'Menghormati dedikasi dan kontribusi perawat dalam memberikan pelayanan kesehatan berkualitas.',
      category: 'Tenaga Kesehatan'
    },
    {
      date: '06-14',
      title: 'Hari Donor Darah Sedunia',
      description: 'Meningkatkan kesadaran tentang pentingnya donor darah untuk menyelamatkan nyawa.',
      category: 'Donor'
    },
    {
      date: '07-28',
      title: 'Hari Hepatitis Sedunia',
      description: 'Meningkatkan kesadaran tentang hepatitis viral dan pentingnya vaksinasi serta pengobatan.',
      category: 'Penyakit Menular'
    },
    {
      date: '09-12',
      title: 'Hari Kesehatan Nasional',
      description: 'Memperingati gerakan kesehatan masyarakat Indonesia dan komitmen untuk Indonesia sehat.',
      category: 'Nasional'
    },
    {
      date: '10-10',
      title: 'Hari Kesehatan Jiwa Sedunia',
      description: 'Meningkatkan kesadaran tentang kesehatan mental dan menghilangkan stigma terhadap gangguan mental.',
      category: 'Kesehatan Mental'
    },
    {
      date: '11-14',
      title: 'Hari Diabetes Sedunia',
      description: 'Meningkatkan kesadaran tentang diabetes, pentingnya pencegahan, dan pengelolaan gula darah.',
      category: 'Diabetes'
    },
    {
      date: '12-01',
      title: 'Hari AIDS Sedunia',
      description: 'Meningkatkan kesadaran tentang HIV/AIDS, mengurangi stigma, dan mendorong pencegahan serta pengobatan.',
      category: 'HIV/AIDS'
    }
  ]
}

export async function GET() {
  try {
    // Cek cache terlebih dahulu
    const now = Date.now()
    if (cachedData && cacheTimestamp && (now - cacheTimestamp) < CACHE_DURATION) {
      return NextResponse.json({
        success: true,
        data: cachedData,
        count: cachedData.length,
        cached: true,
        source: 'cache'
      })
    }

    // Scrape data baru
    const data = await scrapeHealthCalendar()

    // Update cache
    cachedData = data
    cacheTimestamp = now

    return NextResponse.json({
      success: true,
      data: data,
      count: data.length,
      cached: false,
      source: 'scraped'
    })
  } catch (error) {
    console.error('API Error:', error)

    // Jika ada cache lama, gunakan itu
    if (cachedData) {
      return NextResponse.json({
        success: true,
        data: cachedData,
        count: cachedData.length,
        cached: true,
        source: 'cache-fallback'
      })
    }

    // Last resort: return fallback data
    const fallbackData = getFallbackData()
    return NextResponse.json({
      success: true,
      data: fallbackData,
      count: fallbackData.length,
      source: 'fallback'
    })
  }
}
