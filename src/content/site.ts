import type { CompanyUpdate, ContactRoute, Faq, LegalDocument } from './types'

// Company/legal wording is a PLACEHOLDER. Statutory details (registered name, number, address,
// VAT) are BLOCKED pending confirmation (Brief 00). Do not treat as final legal copy.
export const company = {
  brandName: 'Viger Cloud',
  legalName: 'Viger Cloud (registered name pending confirmation)',
  companyNumber: '00000000',
  registeredAddress: 'Registered address pending confirmation',
  vatNote: 'All prices exclude VAT.',
  group: 'Part of the Viger group (relationship pending confirmation).',
  sourceStatus: 'placeholder' as const,
}

export const contactRoutes: ContactRoute[] = [
  {
    type: 'trial',
    label: 'Start a free trial',
    description: 'Try Arcarna with your own workspace. No payment details required up front.',
    destination: 'onboarding (test mode)',
    sourceStatus: 'assumption',
  },
  {
    type: 'demo',
    label: 'Book a demonstration',
    description: 'See Arcarna walked through by our team for your use case.',
    destination: 'sales (test mode)',
    sourceStatus: 'assumption',
  },
  {
    type: 'general',
    label: 'General enquiry',
    description: 'Questions about Viger Cloud, the group, or anything else.',
    destination: 'hello@ (destination pending confirmation)',
    sourceStatus: 'blocked',
  },
  {
    type: 'partner',
    label: 'Partner with us',
    description: 'Explore integration, referral or reseller partnerships.',
    destination: 'partners@ (destination pending confirmation)',
    sourceStatus: 'blocked',
  },
  {
    type: 'support',
    label: 'Product support',
    description: 'Existing customer needing help with Arcarna.',
    destination: 'support@ (destination pending confirmation)',
    sourceStatus: 'blocked',
  },
  {
    type: 'press',
    label: 'Press & media',
    description: 'Media enquiries and company information requests.',
    destination: 'press@ (destination pending confirmation)',
    sourceStatus: 'blocked',
  },
  {
    type: 'privacy',
    label: 'Privacy & data requests',
    description: 'Exercise your data rights or ask a privacy question.',
    destination: 'privacy@ (destination pending confirmation)',
    sourceStatus: 'blocked',
  },
]

export const faqs: Faq[] = [
  {
    question: 'Is Arcarna generally available?',
    answer:
      'Arcarna is in beta. Availability, entitlements and pricing shown on this site are illustrative and pending confirmation.',
    sourceStatus: 'placeholder',
  },
  {
    question: 'Do prices include VAT?',
    answer: 'No. All prices exclude VAT. Applicable tax is shown before any purchase.',
    sourceStatus: 'assumption',
  },
  {
    question: 'Do I need a payment card to start a trial?',
    answer:
      'No. We confirm that Arcarna suits your needs before any payment details are requested.',
    sourceStatus: 'assumption',
  },
]

export const legalDocuments: LegalDocument[] = [
  {
    slug: 'privacy-viger',
    title: 'Viger Cloud Privacy Notice',
    brand: 'viger',
    effectiveDate: 'Pending',
    summary: 'How Viger Cloud handles personal data across its corporate site and enquiries.',
    sourceStatus: 'placeholder',
  },
  {
    slug: 'privacy-arcarna',
    title: 'Arcarna Privacy Notice',
    brand: 'arcarna',
    effectiveDate: 'Pending',
    summary: 'How personal data is handled within the Arcarna product experience.',
    sourceStatus: 'placeholder',
  },
  {
    slug: 'cookies',
    title: 'Cookie Notice',
    brand: 'shared',
    effectiveDate: 'Pending',
    summary: 'What cookies and similar technologies we use, and how consent is handled.',
    sourceStatus: 'placeholder',
  },
  {
    slug: 'terms',
    title: 'Terms of Use',
    brand: 'shared',
    effectiveDate: 'Pending',
    summary: 'The terms governing use of this website and its services.',
    sourceStatus: 'placeholder',
  },
  {
    slug: 'accessibility',
    title: 'Accessibility Statement',
    brand: 'shared',
    effectiveDate: 'Pending',
    summary: 'Our accessibility commitments and how to report barriers.',
    sourceStatus: 'placeholder',
  },
  {
    slug: 'security',
    title: 'Security Overview',
    brand: 'shared',
    effectiveDate: 'Pending',
    summary: 'A plain-English overview of our approach to security.',
    sourceStatus: 'placeholder',
  },
]

export const companyUpdates: CompanyUpdate[] = [
  {
    date: '2026-07-01',
    title: 'Arcarna enters open beta',
    body: 'We are inviting more teams to try Arcarna. Content on this page is illustrative pending confirmation.',
    sourceStatus: 'placeholder',
  },
  {
    date: '2026-06-10',
    title: 'Viger Cloud website foundation',
    body: 'A new corporate site foundation is in progress, built for accessibility and performance.',
    sourceStatus: 'placeholder',
  },
]

export function getLegalDocument(slug: string): LegalDocument | undefined {
  return legalDocuments.find((d) => d.slug === slug)
}
