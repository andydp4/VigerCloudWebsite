/**
 * Seed the Sanity dataset with the current placeholder content (Brief 07 "creation").
 *
 * Idempotent: uses stable `_id`s with createOrReplace, so re-running updates in place.
 * Requires env: NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET, and a WRITE token in
 * SANITY_API_WRITE_TOKEN (falls back to SANITY_API_READ_TOKEN if it has write access).
 *
 * Usage: node scripts/seed-sanity.mjs
 */

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
const token = process.env.SANITY_API_WRITE_TOKEN || process.env.SANITY_API_READ_TOKEN
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-10-01'

if (!projectId || projectId === 'placeholder' || !dataset || !token) {
  console.error(
    'Missing config. Set NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET and a write token.',
  )
  process.exit(1)
}

const slug = (current) => ({ _type: 'slug', current })
const ps = 'placeholder'

const docs = [
  {
    _id: 'siteSettings',
    _type: 'siteSettings',
    brandName: 'Viger Cloud',
    legalName: 'Viger Cloud (registered name pending confirmation)',
    companyNumber: '00000000',
    registeredAddress: 'Registered address pending confirmation',
    vatNote: 'All prices exclude VAT.',
    group: 'Part of the Viger group (relationship pending confirmation).',
    sourceStatus: ps,
  },

  // Products
  {
    _id: 'product.arcarna',
    _type: 'product',
    name: 'Arcarna',
    slug: slug('arcarna'),
    tagline: 'Sell, understand, control, act and grow — in one place.',
    description:
      'Arcarna is Viger Cloud’s flagship product: a connected workspace that turns everyday commercial activity into clear decisions and measurable results.',
    status: 'beta',
    brand: 'arcarna',
    order: 0,
    sourceStatus: 'assumption',
  },
  {
    _id: 'product.viger-signals',
    _type: 'product',
    name: 'Viger Signals',
    slug: slug('viger-signals'),
    tagline: 'Responsible, explainable insight across your data.',
    description:
      'A planned analytics layer that surfaces trends and anomalies with transparent, auditable logic. Exploratory — not yet available.',
    status: 'coming-soon',
    brand: 'viger',
    order: 1,
    sourceStatus: ps,
  },
  {
    _id: 'product.viger-connect',
    _type: 'product',
    name: 'Viger Connect',
    slug: slug('viger-connect'),
    tagline: 'Secure integrations between the tools you already use.',
    description:
      'A concept for a governed integration hub. Included to show ecosystem direction; scope and availability are unconfirmed.',
    status: 'concept',
    brand: 'viger',
    order: 2,
    sourceStatus: ps,
  },

  // Arcarna feature chapters
  ...[
    ['Sell', 'Close more of the right deals with less manual chasing.', 'A shared pipeline highlights the opportunities most likely to move, and drafts the next step for each one.'],
    ['Understand', 'Know what is really happening across the business at a glance.', 'Live views connect activity, revenue and customer health so teams stop reconciling spreadsheets.'],
    ['Control', 'Keep spend, access and risk inside deliberate limits.', 'Role-based controls and clear audit trails make it obvious who changed what, and when.'],
    ['Act', 'Turn insight into action without switching tools.', 'Recommended actions can be approved and executed in place, then tracked to an outcome.'],
    ['Grow', 'Repeat what works and expand with confidence.', 'Cohort and trend views show which motions compound, so you can invest where returns are proven.'],
  ].map(([label, result, mechanism], i) => ({
    _id: `featureChapter.${label.toLowerCase()}`,
    _type: 'featureChapter',
    label,
    result,
    mechanism,
    order: i,
    sourceStatus: ps,
  })),

  // Pricing plans
  {
    _id: 'pricingPlan.solo',
    _type: 'pricingPlan',
    name: 'Solo',
    planId: 'solo',
    audience: 'Individuals getting started',
    monthly: 19,
    annual: 15,
    highlights: ['1 workspace member', 'Core Sell + Understand', 'Community support'],
    consultationOnly: false,
    order: 0,
    sourceStatus: ps,
  },
  {
    _id: 'pricingPlan.team',
    _type: 'pricingPlan',
    name: 'Team',
    planId: 'team',
    audience: 'Small teams working together',
    monthly: 49,
    annual: 39,
    highlights: ['Up to 10 members', 'Adds Control + Act', 'Email support'],
    consultationOnly: false,
    order: 1,
    sourceStatus: ps,
  },
  {
    _id: 'pricingPlan.growth',
    _type: 'pricingPlan',
    name: 'Growth',
    planId: 'growth',
    audience: 'Scaling organisations',
    monthly: 129,
    annual: 109,
    highlights: ['Up to 50 members', 'Adds Grow analytics', 'Priority support'],
    consultationOnly: false,
    order: 2,
    sourceStatus: ps,
  },
  {
    _id: 'pricingPlan.scale',
    _type: 'pricingPlan',
    name: 'Scale',
    planId: 'scale',
    audience: 'Larger, regulated organisations',
    monthly: null,
    annual: null,
    highlights: ['Unlimited members', 'Advanced governance', 'Consultation & onboarding'],
    consultationOnly: true,
    order: 3,
    sourceStatus: ps,
  },

  // FAQs
  {
    _id: 'faq.availability',
    _type: 'faq',
    question: 'Is Arcarna generally available?',
    answer:
      'Arcarna is in beta. Availability, entitlements and pricing shown on this site are illustrative and pending confirmation.',
    order: 0,
    sourceStatus: ps,
  },
  {
    _id: 'faq.vat',
    _type: 'faq',
    question: 'Do prices include VAT?',
    answer: 'No. All prices exclude VAT. Applicable tax is shown before any purchase.',
    order: 1,
    sourceStatus: 'assumption',
  },
  {
    _id: 'faq.card',
    _type: 'faq',
    question: 'Do I need a payment card to start a trial?',
    answer:
      'No. We confirm that Arcarna suits your needs before any payment details are requested.',
    order: 2,
    sourceStatus: 'assumption',
  },

  // Legal documents
  ...[
    ['privacy-viger', 'Viger Cloud Privacy Notice', 'viger', 'How Viger Cloud handles personal data across its corporate site and enquiries.'],
    ['privacy-arcarna', 'Arcarna Privacy Notice', 'arcarna', 'How personal data is handled within the Arcarna product experience.'],
    ['cookies', 'Cookie Notice', 'shared', 'What cookies and similar technologies we use, and how consent is handled.'],
    ['terms', 'Terms of Use', 'shared', 'The terms governing use of this website and its services.'],
    ['accessibility', 'Accessibility Statement', 'shared', 'Our accessibility commitments and how to report barriers.'],
    ['security', 'Security Overview', 'shared', 'A plain-English overview of our approach to security.'],
  ].map(([s, title, brand, summary]) => ({
    _id: `legal.${s}`,
    _type: 'legalDocument',
    title,
    slug: slug(s),
    brand,
    effectiveDate: 'Pending',
    summary,
    sourceStatus: ps,
  })),

  // Company updates
  {
    _id: 'update.arcarna-beta',
    _type: 'companyUpdate',
    title: 'Arcarna enters open beta',
    date: '2026-07-01',
    body: 'We are inviting more teams to try Arcarna. Content on this page is illustrative pending confirmation.',
    sourceStatus: ps,
  },
  {
    _id: 'update.site-foundation',
    _type: 'companyUpdate',
    title: 'Viger Cloud website foundation',
    date: '2026-06-10',
    body: 'A new corporate site foundation is in progress, built for accessibility and performance.',
    sourceStatus: ps,
  },
]

const mutations = docs.map((doc) => ({ createOrReplace: doc }))

const url = `https://${projectId}.api.sanity.io/v${apiVersion}/data/mutate/${dataset}?returnIds=true`

const res = await fetch(url, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
  body: JSON.stringify({ mutations }),
})

const body = await res.json()
if (!res.ok) {
  console.error('Seed failed:', JSON.stringify(body, null, 2))
  process.exit(1)
}
console.log(`Seeded ${docs.length} documents into "${dataset}".`)
