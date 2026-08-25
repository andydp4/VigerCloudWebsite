import type { CompanyUpdate, ContactRoute, Faq, LegalDocument } from './types'

// Verified statutory details (Brief 00 confirmed).
export const company = {
  brandName: 'Viger Cloud',
  legalName: 'Viger Cloud Ltd',
  companyNumber: '17353296',
  registeredJurisdiction: 'England and Wales',
  registeredAddress: '101, 50 Apex Lofts, Warwick Street, Birmingham, B12 0BA',
  vatNote: 'All prices exclude VAT.',
  group: 'Viger Cloud, part of the Viger Group.',
  sourceStatus: 'confirmed' as const,
}

// Enquiries initially go to support@vigercloud.com and are passed to the appropriate person.
const SUPPORT_INBOX = 'support@vigercloud.com'

export const contactRoutes: ContactRoute[] = [
  {
    type: 'trial',
    label: 'Request an Arcarna trial',
    description:
      'Tell us about your business, the systems you use and the questions you would like Arcarna to help answer. We will explain suitability, setup and next steps.',
    destination: SUPPORT_INBOX,
    sourceStatus: 'confirmed',
  },
  {
    type: 'demo',
    label: 'Book a demonstration',
    description:
      'See Arcarna through the type of commercial questions that matter to your business.',
    destination: SUPPORT_INBOX,
    sourceStatus: 'confirmed',
  },
  {
    type: 'support',
    label: 'Product support',
    description: 'Get help with an existing Arcarna account, access or product issue.',
    destination: SUPPORT_INBOX,
    sourceStatus: 'confirmed',
  },
  {
    type: 'partner',
    label: 'Partnership enquiry',
    description: 'Discuss an integration, referral, advisory or service partnership.',
    destination: SUPPORT_INBOX,
    sourceStatus: 'confirmed',
  },
  {
    type: 'general',
    label: 'General enquiry',
    description: 'Ask about Viger Cloud, the Viger Group, careers, suppliers, press or another matter.',
    destination: SUPPORT_INBOX,
    sourceStatus: 'confirmed',
  },
  {
    type: 'privacy',
    label: 'Privacy and data request',
    description: 'Ask how personal data is handled or exercise a data protection right.',
    destination: SUPPORT_INBOX,
    sourceStatus: 'confirmed',
  },
]

export const faqs: Faq[] = [
  {
    question: 'Do prices include VAT?',
    answer:
      'No. All prices shown exclude VAT. Any applicable VAT will be shown before purchase or included in your proposal.',
    sourceStatus: 'confirmed',
  },
  {
    question: 'What does an annual plan cost?',
    answer:
      'Annual pricing gives you twelve months for the cost of ten compared with paying monthly.',
    sourceStatus: 'confirmed',
  },
  {
    question: 'Can I try Arcarna first?',
    answer:
      'Solo and Team customers can request a trial. We will explain what is included, what data is needed and what happens when the trial ends before you begin.',
    sourceStatus: 'confirmed',
  },
  {
    question: 'Why do Growth and Scale begin with a conversation?',
    answer:
      'Larger organisations may need onboarding, data migration, training, multiple locations, permissions or data-processing arrangements. A short conversation helps us confirm the right setup and an accurate implementation plan.',
    sourceStatus: 'confirmed',
  },
]

export const legalDocuments: LegalDocument[] = [
  {
    slug: 'privacy-viger',
    title: 'Viger Cloud Privacy Notice',
    brand: 'viger',
    effectiveDate: 'Working draft — 25 August 2026',
    summary: 'How Viger Cloud handles personal data across its corporate site and enquiries.',
    sourceStatus: 'placeholder',
  },
  {
    slug: 'privacy-arcarna',
    title: 'Arcarna Privacy Notice',
    brand: 'arcarna',
    effectiveDate: 'Working draft — 25 August 2026',
    summary: 'How personal data is handled within the Arcarna product experience.',
    sourceStatus: 'placeholder',
  },
  {
    slug: 'cookies',
    title: 'Cookie Notice',
    brand: 'shared',
    effectiveDate: 'Working draft — 25 August 2026',
    summary: 'What cookies and similar technologies we use, and how consent is handled.',
    sourceStatus: 'placeholder',
  },
  {
    slug: 'terms',
    title: 'Terms of Use',
    brand: 'shared',
    effectiveDate: 'Working draft — 25 August 2026',
    summary: 'The terms governing use of this website and its services.',
    sourceStatus: 'placeholder',
  },
  {
    slug: 'accessibility',
    title: 'Accessibility Statement',
    brand: 'shared',
    effectiveDate: 'Working draft — 25 August 2026',
    summary: 'Our accessibility commitments and how to report barriers.',
    sourceStatus: 'placeholder',
  },
  {
    slug: 'security',
    title: 'Security Overview',
    brand: 'shared',
    effectiveDate: 'Working draft — 25 August 2026',
    summary: 'A plain-English overview of our approach to security.',
    sourceStatus: 'placeholder',
  },
]

// No public "Latest updates" until real dated news is approved (the section is hidden when empty).
export const companyUpdates: CompanyUpdate[] = []

export function getLegalDocument(slug: string): LegalDocument | undefined {
  return legalDocuments.find((d) => d.slug === slug)
}
