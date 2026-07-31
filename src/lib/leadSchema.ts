import { z } from 'zod'

export const LEAD_ROUTE_TYPES = [
  'trial',
  'demo',
  'general',
  'pricing',
  'partner',
  'support',
  'press',
  'privacy',
] as const

/**
 * Shared lead schema (Brief 05). Validated on both client and server. Includes:
 *  - consent capture,
 *  - source/UTM retention,
 *  - a honeypot field (`company_extra`) that must stay empty (basic spam protection).
 */
export const leadSchema = z.object({
  routeType: z.enum(LEAD_ROUTE_TYPES),
  name: z.string().trim().min(2, 'Please enter your name.').max(120),
  email: z.string().trim().min(1, 'Please enter your email.').email('Enter a valid email address.'),
  organisation: z.string().trim().max(160).optional().or(z.literal('')),
  message: z.string().trim().max(2000).optional().or(z.literal('')),
  consent: z
    .boolean()
    .refine((v) => v === true, 'Please agree to be contacted about your enquiry.'),
  // Honeypot: real users never fill this. Accepted by the schema but dropped server-side so bots
  // receive a normal-looking success instead of a validation error.
  company_extra: z.string().max(200).optional(),
  source: z
    .object({
      page: z.string().max(300).optional(),
      utm_source: z.string().max(120).optional(),
      utm_medium: z.string().max(120).optional(),
      utm_campaign: z.string().max(120).optional(),
    })
    .optional(),
})

export type LeadInput = z.infer<typeof leadSchema>

export type LeadFieldErrors = Partial<Record<keyof LeadInput | 'form', string>>

/** Flattens zod errors into a simple field->message map for form display. */
export function toFieldErrors(error: z.ZodError<LeadInput>): LeadFieldErrors {
  const out: LeadFieldErrors = {}
  for (const issue of error.issues) {
    const key = (issue.path[0] as keyof LeadInput) ?? 'form'
    if (!out[key]) out[key] = issue.message
  }
  return out
}
