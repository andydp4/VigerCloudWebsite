import { z } from 'zod'

/**
 * Strict environment validation (Brief 01). Server code imports `serverEnv`; client-safe values
 * live in `publicEnv`. Validation is lazy so unit tests and builds don't crash when optional
 * integration secrets are absent — but malformed values still fail fast.
 */

const publicSchema = z.object({
  NEXT_PUBLIC_SITE_URL: z
    .string()
    .url()
    .default('http://localhost:3000')
    .transform((value) => value.replace(/\/$/, '')),
  NEXT_PUBLIC_APP_ENV: z
    .enum(['development', 'staging', 'production'])
    .default('development'),
})

const serverSchema = z.object({
  // Lead delivery stays in test mode until Staging Gate approval (Brief 05).
  LEAD_DELIVERY_MODE: z.enum(['test', 'live']).default('test'),
})

export const publicEnv = publicSchema.parse({
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
  NEXT_PUBLIC_APP_ENV: process.env.NEXT_PUBLIC_APP_ENV,
})

let cachedServerEnv: z.infer<typeof serverSchema> | null = null

export function getServerEnv() {
  if (!cachedServerEnv) {
    cachedServerEnv = serverSchema.parse({
      LEAD_DELIVERY_MODE: process.env.LEAD_DELIVERY_MODE,
    })
  }
  return cachedServerEnv
}

export const isProduction = publicEnv.NEXT_PUBLIC_APP_ENV === 'production'
export const isStaging = publicEnv.NEXT_PUBLIC_APP_ENV === 'staging'

/** Staging and system environments must not be indexed by search engines (Brief 06). */
export const allowIndexing = isProduction
