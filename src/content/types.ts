/**
 * Typed content models (Brief 02). Components consume these structured records rather than
 * hard-coding prose, so content can later move to a CMS (Brief 07) without touching components.
 *
 * Every externally-meaningful claim carries a `sourceStatus` so we never present unconfirmed
 * pricing, entitlements or legal text as final (Briefs 00, 02, 06).
 */

export type SourceStatus = 'confirmed' | 'assumption' | 'placeholder' | 'blocked'

export type Brand = 'viger' | 'arcarna'

export type ProductStatus = 'available' | 'beta' | 'coming-soon' | 'concept'

export interface Product {
  slug: string
  name: string
  tagline: string
  description: string
  status: ProductStatus
  brand: Brand
  sourceStatus: SourceStatus
}

export interface FeatureChapter {
  id: string
  /** Short verb label used in the Arcarna scene rail. */
  label: 'Sell' | 'Understand' | 'Control' | 'Act' | 'Grow'
  /** The business result stated BEFORE any technical mechanism (Brief 04). */
  result: string
  mechanism: string
  sourceStatus: SourceStatus
}

export interface PricingPlan {
  id: 'solo' | 'team' | 'growth' | 'scale'
  name: string
  audience: string
  /** Monthly price in GBP, VAT excluded. `null` => consultation only (Brief 05). */
  monthly: number | null
  /** Annual price per month in GBP, VAT excluded. `null` => consultation only. */
  annual: number | null
  highlights: string[]
  consultationOnly: boolean
  sourceStatus: SourceStatus
}

export interface ComparisonRow {
  capability: string
  values: Record<PricingPlan['id'], string | boolean>
  sourceStatus: SourceStatus
}

export interface Faq {
  question: string
  answer: string
  sourceStatus: SourceStatus
}

export type LeadRouteType =
  | 'trial'
  | 'demo'
  | 'general'
  | 'pricing'
  | 'partner'
  | 'support'
  | 'press'
  | 'privacy'

export interface ContactRoute {
  type: LeadRouteType
  label: string
  description: string
  /** Where this enquiry is intended to be routed. Real inboxes are BLOCKED pending decisions. */
  destination: string
  sourceStatus: SourceStatus
}

export interface LegalDocument {
  slug: string
  title: string
  brand: Brand | 'shared'
  effectiveDate: string
  summary: string
  sourceStatus: SourceStatus
}

export interface CompanyUpdate {
  date: string
  title: string
  body: string
  sourceStatus: SourceStatus
}
