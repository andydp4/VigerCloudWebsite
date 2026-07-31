import { Suspense } from 'react'
import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/metadata'
import { LeadForm } from '@/components/LeadForm'

export const metadata: Metadata = buildMetadata({
  title: 'Partners',
  description:
    'Partner with Viger Cloud on integrations, referrals or reselling. A distinct enquiry path with transparent routing.',
  path: '/partners',
})

const partnershipTypes = [
  { title: 'Integration partners', body: 'Connect your product to Arcarna for shared customers.' },
  { title: 'Referral partners', body: 'Introduce teams that would benefit from Viger Cloud.' },
  { title: 'Resellers', body: 'Offer Viger Cloud products as part of your portfolio.' },
]

export default function PartnersPage() {
  return (
    <section className="section container stack">
      <div>
        <p className="eyebrow">Partners</p>
        <h1 className="h2">Grow with Viger Cloud</h1>
        <p className="lede">
          Partnerships have their own dedicated route, separate from sales and support, so your
          enquiry reaches the right people.
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

      <div className="card" style={{ maxWidth: 620 }}>
        <h2 className="h3" style={{ fontSize: 'var(--step-1)' }}>
          Start a partnership conversation
        </h2>
        <p className="muted" style={{ marginBottom: 'var(--space-4)' }}>
          Tell us a little about your organisation and how you&apos;d like to work together.
        </p>
        <Suspense fallback={<p className="muted">Loading form…</p>}>
          <LeadForm defaultRoute="partner" allowRouteSelection={false} />
        </Suspense>
      </div>
    </section>
  )
}
