import type { MetadataRoute } from 'next'
import { publicEnv } from '@/lib/env'

// Public sitemap (Brief 06). Only real, indexable routes are listed. Legal pages are excluded
// while they remain structural templates pending reviewed wording (copy review).
export default function sitemap(): MetadataRoute.Sitemap {
  const base = publicEnv.NEXT_PUBLIC_SITE_URL
  const now = new Date()

  const staticPaths = ['', '/about', '/products', '/arcarna', '/pricing', '/partners', '/contact']

  return staticPaths.map((path) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: path === '' ? 1 : 0.7,
  }))
}
