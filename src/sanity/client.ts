import { createClient } from 'next-sanity'
import { apiVersion, dataset, projectId, useCdn } from './env'

// Read-only client for server-side content fetching (Brief 07). Only used when Sanity is
// configured; otherwise the content layer returns local fallback data.
export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn,
  perspective: 'published',
})
