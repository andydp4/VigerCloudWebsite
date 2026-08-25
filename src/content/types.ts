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
  /** One of the five ways customers use Arcarna. */
  label: 'Sell' | 'Understand' | 'Control' | 'Act' | 'Grow'
  /** The commercial "truth to reveal" — a real business question. */
  question: string
  /** The chapter heading. */
  heading: string
  /** Supporting explanation. */
  body: string
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

export interface PricingPlan {
  id: 'solo' | 'team' | 'growth' | 'scale'
  name: string
  /** "For:" line describing who the plan suits. */
  audience: string
  /** e.g. "1", "Up to 5". */
  users: string
  /** Monthly price in GBP, VAT excluded. */
  monthly: number | null
  /** Total annual price in GBP, VAT excluded (twelve months for the cost of ten). */
  annualTotal: number | null
  /** The plan's call-to-action label and the enquiry route it opens. */
  ctaLabel: string
  ctaRoute: LeadRouteType
  sourceStatus: SourceStatus
}

export interface Faq {
  question: string
  answer: string
  sourceStatus: SourceStatus
}

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
