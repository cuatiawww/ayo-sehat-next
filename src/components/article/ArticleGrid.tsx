'use client'

import ArticleCard from './ArticleCard'

interface Article {
  id: number
  title: string
  excerpt: string
  image: string
  date: string
  views: string
  readTime: string
  category: string
  lifecycleStage: string
  slug: string
}

interface ArticleGridProps {
  articles: Article[]
}

export default function ArticleGrid({ articles }: ArticleGridProps) {
  return (
    <div className="space-y-5">
      {articles.map((article, index) => (
        <ArticleCard key={article.id} article={article} index={index} />
      ))}
    </div>
  )
}
