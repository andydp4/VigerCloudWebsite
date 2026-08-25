/**
 * Seed the Sanity dataset with the approved website content (Brief 07 "creation").
 *
 * Idempotent: stable `_id`s with createOrReplace, so re-running updates in place. It also removes
 * documents that are no longer used, and writes a few legacy fields alongside the current ones so a
 * previously-deployed build keeps working during a rolling update.
 *
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

const docs = [
  {
    _id: 'siteSettings',
    _type: 'siteSettings',
    brandName: 'Viger Cloud',
    legalName: 'Viger Cloud Ltd',
    companyNumber: '17353296',
    registeredJurisdiction: 'England and Wales',
    registeredAddress: '101, 50 Apex Lofts, Warwick Street, Birmingham, B12 0BA',
    vatNote: 'All prices exclude VAT.',
    group: 'Viger Cloud, part of the Viger Group.',
    sourceStatus: 'confirmed',
  },

  // Products
  {
    _id: 'product.arcarna',
    _type: 'product',
    name: 'Arcarna',
    slug: slug('arcarna'),
    tagline: 'Reveal Your Truth.',
    description:
      'Arcarna is Viger Cloud’s flagship retail intelligence and decision-support platform. It brings sales, stock, margin and customer information together to reveal what is shaping performance, understand why it matters and act sooner.',
    status: 'beta',
    brand: 'arcarna',
    order: 0,
    sourceStatus: 'confirmed',
  },
  {
    _id: 'product.viger-mail',
    _type: 'product',
    name: 'Viger Mail',
    slug: slug('viger-mail'),
    tagline: 'Practical communication tools designed around independent businesses.',
    description:
      'A future communications product from Viger Cloud. Scope and availability are being confirmed, so we are not publishing detailed features or a release date yet.',
    status: 'coming-soon',
    brand: 'viger',
    order: 1,
    sourceStatus: 'assumption',
  },

  // Arcarna feature chapters (current fields + legacy result/mechanism for older builds).
  ...[
    [
      'Sell',
      'Where is the next worthwhile sale?',
      'Put attention behind the sales that matter',
      'See which opportunities, customers or product lines deserve attention instead of treating every signal as equally urgent. Arcarna helps you focus follow-up where the evidence suggests it can make a difference.',
    ],
    [
      'Understand',
      'What is really shaping performance?',
      'See the business more clearly',
      'Bring sales, products, stock, customers, locations and costs into a more useful view. Compare what changed, trace the likely drivers and spend less time reconciling separate reports.',
    ],
    [
      'Control',
      'Where are margin, stock or risk moving outside your limits?',
      'Keep the important measures within view',
      'Monitor the areas that protect the health of the business: margin, stock exposure, access, operational exceptions and agreed limits. Clear history helps you understand what changed and who acted.',
    ],
    [
      'Act',
      'What needs to happen next?',
      'Move from truth to a practical next step',
      'Turn a useful finding into assigned, trackable work without losing the evidence behind it. The aim is not simply to create more alerts; it is to help the right person respond and see whether the action worked.',
    ],
    [
      'Grow',
      'What is genuinely worth repeating?',
      'Grow from what the evidence proves',
      'Identify the products, customers, locations and operating choices that contribute to stronger performance. Use trends and comparisons to invest attention where the evidence is most persuasive.',
    ],
  ].map(([label, question, heading, body], i) => ({
    _id: `featureChapter.${label.toLowerCase()}`,
    _type: 'featureChapter',
    label,
    question,
    heading,
    body,
    // legacy fields for previously-deployed builds
    result: heading,
    mechanism: body,
    order: i,
    sourceStatus: 'confirmed',
  })),

  // Pricing plans (current fields + legacy fields for older builds).
  ...[
    ['solo', 'Solo', 'One owner or operator getting started', '1', 150, 1500, 'Request a Solo trial', 'trial'],
    ['team', 'Team', 'A small team working from a shared view', 'Up to 5', 500, 5000, 'Request a Team trial', 'trial'],
    ['growth', 'Growth', 'A growing business that may need onboarding, migration and training', 'Up to 15', 1050, 10500, 'Discuss the Growth plan', 'demo'],
    ['scale', 'Scale', 'A larger or multi-location organisation with more complex requirements', 'Up to 50', 2500, 25000, 'Discuss the Scale plan', 'demo'],
  ].map(([planId, name, audience, users, monthly, annualTotal, ctaLabel, ctaRoute], i) => ({
    _id: `pricingPlan.${planId}`,
    _type: 'pricingPlan',
    planId,
    name,
    audience,
    users,
    monthly,
    annualTotal,
    ctaLabel,
    ctaRoute,
    // legacy fields for previously-deployed builds
    annual: monthly,
    highlights: [],
    consultationOnly: false,
    order: i,
    sourceStatus: 'confirmed',
  })),

  // FAQs
  ...[
    [
      'faq.vat',
      'Do prices include VAT?',
      'No. All prices shown exclude VAT. Any applicable VAT will be shown before purchase or included in your proposal.',
    ],
    [
      'faq.annual',
      'What does an annual plan cost?',
      'Annual pricing gives you twelve months for the cost of ten compared with paying monthly.',
    ],
    [
      'faq.trial',
      'Can I try Arcarna first?',
      'Solo and Team customers can request a trial. We will explain what is included, what data is needed and what happens when the trial ends before you begin.',
    ],
    [
      'faq.consultation',
      'Why do Growth and Scale begin with a conversation?',
      'Larger organisations may need onboarding, data migration, training, multiple locations, permissions or data-processing arrangements. A short conversation helps us confirm the right setup and an accurate implementation plan.',
    ],
  ].map(([id, question, answer], i) => ({
    _id: id,
    _type: 'faq',
    question,
    answer,
    order: i,
    sourceStatus: 'confirmed',
  })),

  // Legal documents (structural records; pages are no-indexed until reviewed wording is ready).
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
    sourceStatus: 'placeholder',
  })),
]

// Documents removed in this content revision.
const obsoleteIds = [
  'product.viger-signals',
  'product.viger-connect',
  'update.arcarna-beta',
  'update.site-foundation',
  'update.cms-live',
  'faq.availability',
  'faq.card',
]

const mutations = [
  ...docs.map((doc) => ({ createOrReplace: doc })),
  ...obsoleteIds.map((id) => ({ delete: { id } })),
]

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
console.log(`Seeded ${docs.length} documents and removed ${obsoleteIds.length} obsolete ones in "${dataset}".`)
