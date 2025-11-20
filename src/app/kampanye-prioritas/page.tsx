import { Metadata } from 'next'
import KampanyePrioritasClient from './KampanyePrioritasClient'

export const metadata: Metadata = {
  title: 'Kampanye Prioritas - Ayo Sehat Kemenkes',
  description:
    'Kampanye Prioritas berfokus pada isu-isu kesehatan utama yang menjadi perhatian Kementerian Kesehatan RI. Program-program ini dirancang untuk memberikan dampak maksimal bagi kesehatan masyarakat Indonesia.',
  keywords: [
    'kampanye prioritas',
    'program kesehatan',
    'gerakan kesehatan',
    'kemenkes',
    'ayo sehat',
  ],
  openGraph: {
    title: 'Kampanye Prioritas - Ayo Sehat Kemenkes',
    description:
      'Kampanye Prioritas kesehatan dari Kementerian Kesehatan RI.',
    type: 'website',
    url: 'https://staging-ayo-sehat-v2.vercel.app/kampanye-prioritas',
  },
}

export default function KampanyePrioritasPage() {
  return <KampanyePrioritasClient />
}
