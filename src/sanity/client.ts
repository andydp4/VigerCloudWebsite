import { createClient } from 'next-sanity'
import { apiVersion, dataset, projectId, useCdn } from './env'

// Server-only read token. Required when the dataset is PRIVATE (Sanity's default). Never exposed to
// the client because it has no NEXT_PUBLIC_ prefix and this module is only imported server-side.
const token = process.env.SANITY_API_READ_TOKEN

// Read-only client for server-side content fetching (Brief 07). Only used when Sanity is
// configured; otherwise the content layer returns local fallback data. When a token is present we
// disable the CDN so authenticated reads of a private dataset are reliable.
export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: token ? false : useCdn,
  token,
  perspective: 'published',
})
