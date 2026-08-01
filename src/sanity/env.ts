/**
 * Sanity configuration (Brief 07). The CMS is OPTIONAL: when a real project id is not configured,
 * `isSanityConfigured` is false and the site falls back to the typed content in `src/content/**`.
 * This keeps the app fully runnable without a Sanity account/token (currently blocked).
 */

export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-10-01'

export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

// `placeholder` is a valid-format id that lets the Studio and build load without a real project.
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'placeholder'

/** True only when a real Sanity project id has been supplied. */
export const isSanityConfigured = projectId !== 'placeholder' && projectId.length > 0

export const useCdn = process.env.NEXT_PUBLIC_APP_ENV === 'production'
