import type { MetadataRoute } from 'next'
import { allowIndexing, publicEnv } from '@/lib/env'

// robots directives (Brief 06). Non-production environments are fully disallowed so staging and
// system pages are never indexed.
export default function robots(): MetadataRoute.Robots {
  const base = publicEnv.NEXT_PUBLIC_SITE_URL

  if (!allowIndexing) {
    return { rules: [{ userAgent: '*', disallow: '/' }] }
  }

  return {
    rules: [{ userAgent: '*', allow: '/', disallow: ['/api/'] }],
    sitemap: `${base}/sitemap.xml`,
    host: base,
  }
}
