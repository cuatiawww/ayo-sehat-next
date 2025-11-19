import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://staging-ayo-sehat-v2.vercel.app'

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/tentang`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/topik-kesehatan`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/siklus-hidup`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/artikel`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
  ]

  // TODO: Add dynamic pages (articles, topics, etc.)
  // const articles = await getArticles()
  // const articlePages = articles.map((article) => ({
  //   url: `${baseUrl}/artikel/${article.slug}`,
  //   lastModified: article.updatedAt,
  //   changeFrequency: 'weekly',
  //   priority: 0.7,
  // }))

  return [...staticPages]
}
