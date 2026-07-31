import type { MetadataRoute } from 'next'
import { publicEnv } from '@/lib/env'
import { legalDocuments } from '@/content/site'

// Public sitemap (Brief 06). Only real, indexable routes are listed.
export default function sitemap(): MetadataRoute.Sitemap {
  const base = publicEnv.NEXT_PUBLIC_SITE_URL
  const now = new Date()

  const staticPaths = ['', '/about', '/products', '/arcarna', '/pricing', '/partners', '/contact']
  const legalPaths = legalDocuments.map((d) => `/legal/${d.slug}`)

  return [...staticPaths, ...legalPaths].map((path) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: path === '' ? 1 : 0.7,
  }))
}
