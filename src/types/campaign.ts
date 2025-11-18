export type Campaign = {
  id: number
  title: string
  description: string
  image: string
  slug: string
  category: 'prioritas' | 'kesehatan' | 'umum' 
  date?: string
  displayDate?: string
  status?: string
}