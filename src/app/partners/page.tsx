import { Suspense } from 'react'
import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/metadata'
import { LeadForm } from '@/components/LeadForm'

export const metadata: Metadata = buildMetadata({
  title: 'Partner with Viger Cloud',
  description:
    'Explore technology, referral and service partnerships that help independent businesses get more value from their data and systems.',
  path: '/partners',
})

const partnershipTypes = [
  {
    title: 'Technology and integration partners',
    body: 'Connect relevant sales, stock, customer or operating systems so shared customers can understand and use their information more effectively.',
  },
  {
    title: 'Referral partners',
    body: 'Introduce independent retailers and owner-led businesses that would benefit from a clearer view of performance and a more practical route from evidence to action.',
  },
  {
    title: 'Advisory and service partners',
    body: 'Bring sector expertise, implementation support or complementary services to businesses adopting Viger Cloud products.',
  },
]

export default function PartnersPage() {
  return (
    <section className="section container stack">
      <div>
        <p className="eyebrow">Viger Cloud partners</p>
        <h1 className="h2">Work with us to give independent businesses a clearer view.</h1>
        <p className="lede">
          We welcome conversations with organisations that share our interest in practical technology
          for independent operators. The right partnership should create a useful customer outcome,
          not simply add another logo to a page.
        </p>
      </div>

      <div className="grid grid--3">
        {partnershipTypes.map((p) => (
          <div className="card" key={p.title}>
            <h2 className="h3" style={{ fontSize: 'var(--step-1)' }}>
              {p.title}
            </h2>
            <p className="muted">{p.body}</p>
          </div>
        ))}
      </div>

      <div className="card stack">
        <h2 className="h3" style={{ fontSize: 'var(--step-1)' }}>
          What makes a useful partnership
        </h2>
        <p className="muted">
          We look for a clear customer need, compatible values, proportionate data handling and a
          practical plan for delivery and support. We will be open about product status and expect the
          same clarity from our partners.
        </p>
      </div>

      <div className="card" style={{ maxWidth: 620 }}>
        <h2 className="h3" style={{ fontSize: 'var(--step-1)' }}>
          Start a partnership conversation
        </h2>
        <p className="muted" style={{ marginBottom: 'var(--space-4)' }}>
          Tell us about your organisation, the customers you serve and the outcome you believe we
          could create together. We will route your enquiry to the appropriate person at Viger Cloud.
        </p>
        <Suspense fallback={<p className="muted">Loading form…</p>}>
          <LeadForm defaultRoute="partner" allowRouteSelection={false} />
        </Suspense>
      </div>
    </section>
  )
}
