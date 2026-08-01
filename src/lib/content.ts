import { groq } from 'next-sanity'
import { sanityClient } from '@/sanity/client'
import { isSanityConfigured } from '@/sanity/env'
import type {
  CompanyUpdate,
  FeatureChapter,
  Faq,
  LegalDocument,
  PricingPlan,
  Product,
} from '@/content/types'

// Local fallbacks (used when Sanity is not configured or a fetch fails).
import { products as localProducts } from '@/content/products'
import { arcarnaChapters as localChapters } from '@/content/arcarna'
import { pricingPlans as localPlans } from '@/content/pricing'
import {
  company as localCompany,
  companyUpdates as localUpdates,
  faqs as localFaqs,
  legalDocuments as localLegal,
} from '@/content/site'

/**
 * Content access layer (Brief 07). Each function returns CMS data when Sanity is configured, and
 * otherwise the built-in typed content. Sanity failures fall back to local data so the site stays
 * up. This is the single seam the app uses, so migrating fields to the CMS never touches pages.
 */

async function fromSanity<T>(query: string, fallback: T): Promise<T> {
  if (!isSanityConfigured) return fallback
  try {
    const data = await sanityClient.fetch<T>(query)
    // If the dataset is empty, prefer fallback so we never render a blank site.
    if (Array.isArray(data) && data.length === 0) return fallback
    if (data == null) return fallback
    return data
  } catch {
    return fallback
  }
}

export async function getProducts(): Promise<Product[]> {
  return fromSanity<Product[]>(
    groq`*[_type == "product"] | order(order asc){
      "slug": slug.current, name, tagline, description, status, brand, sourceStatus
    }`,
    localProducts,
  )
}

export async function getProduct(slug: string): Promise<Product | undefined> {
  const all = await getProducts()
  return all.find((p) => p.slug === slug)
}

export async function getArcarnaChapters(): Promise<FeatureChapter[]> {
  return fromSanity<FeatureChapter[]>(
    groq`*[_type == "featureChapter"] | order(order asc){
      "id": lower(label), label, result, mechanism, sourceStatus
    }`,
    localChapters,
  )
}

export async function getPricingPlans(): Promise<PricingPlan[]> {
  return fromSanity<PricingPlan[]>(
    groq`*[_type == "pricingPlan"] | order(order asc){
      "id": planId, name, audience, monthly, annual, highlights, consultationOnly, sourceStatus
    }`,
    localPlans,
  )
}

export async function getFaqs(): Promise<Faq[]> {
  return fromSanity<Faq[]>(
    groq`*[_type == "faq"] | order(order asc){ question, answer, sourceStatus }`,
    localFaqs,
  )
}

export async function getLegalDocuments(): Promise<LegalDocument[]> {
  return fromSanity<LegalDocument[]>(
    groq`*[_type == "legalDocument"]{
      "slug": slug.current, title, brand, effectiveDate, summary, sourceStatus
    }`,
    localLegal,
  )
}

export async function getLegalDocument(slug: string): Promise<LegalDocument | undefined> {
  const all = await getLegalDocuments()
  return all.find((d) => d.slug === slug)
}

export async function getCompanyUpdates(): Promise<CompanyUpdate[]> {
  return fromSanity<CompanyUpdate[]>(
    groq`*[_type == "companyUpdate"] | order(date desc){ title, date, body, sourceStatus }`,
    localUpdates,
  )
}

export async function getSiteSettings(): Promise<typeof localCompany> {
  return fromSanity<typeof localCompany>(
    groq`*[_type == "siteSettings"][0]{
      brandName, legalName, companyNumber, registeredAddress, vatNote, group, sourceStatus
    }`,
    localCompany,
  )
}
