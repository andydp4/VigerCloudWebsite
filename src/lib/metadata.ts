import type { Metadata } from 'next'
import { allowIndexing, publicEnv } from './env'

const SITE_NAME = 'Viger Cloud'
const DEFAULT_DESCRIPTION =
  'Viger Cloud builds responsible, reliable software for modern teams — home of Arcarna.'

interface PageMetaInput {
  title: string
  description?: string
  path?: string
  /** Override indexing for a specific route (e.g. system pages are always no-index). */
  noindex?: boolean
}

/**
 * Builds Next.js Metadata with canonical URL, Open Graph and robots directives (Brief 06).
 * Non-production environments (staging/system) are never indexed.
 */
export function buildMetadata({
  title,
  description = DEFAULT_DESCRIPTION,
  path = '/',
  noindex,
}: PageMetaInput): Metadata {
  const canonical = `${publicEnv.NEXT_PUBLIC_SITE_URL}${path}`
  const index = allowIndexing && !noindex

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title: `${title} · ${SITE_NAME}`,
      description,
      url: canonical,
      siteName: SITE_NAME,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} · ${SITE_NAME}`,
      description,
    },
    robots: {
      index,
      follow: index,
    },
  }
}

export { SITE_NAME, DEFAULT_DESCRIPTION }
