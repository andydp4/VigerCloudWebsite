import { Suspense } from 'react'
import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/metadata'
import { LeadForm } from '@/components/LeadForm'
import { contactRoutes } from '@/content/site'
import { StatusBadge } from '@/components/StatusBadge'

export const metadata: Metadata = buildMetadata({
  title: 'Contact',
  description:
    'Talk to Viger Cloud: start a trial, book a demo, or reach the right team for partnerships, support, press and privacy requests.',
  path: '/contact',
})

export default function ContactPage() {
  return (
    <section className="section container">
      <p className="eyebrow">Contact</p>
      <h1 className="h2">Tell us what you need</h1>
      <p className="lede">
        Pick the enquiry type that fits and we&apos;ll route it to the right team. Each route has a
        transparent destination — some are still being confirmed.
      </p>

      <div className="grid grid--2" style={{ marginTop: 'var(--space-6)', alignItems: 'start' }}>
        <div className="card">
          <Suspense fallback={<p className="muted">Loading form…</p>}>
            <LeadForm />
          </Suspense>
        </div>

        <div className="stack">
          <h2 className="h3" style={{ fontSize: 'var(--step-1)' }}>
            Where enquiries go
          </h2>
          <ul className="stack" style={{ listStyle: 'none', padding: 0 }}>
            {contactRoutes.map((route) => (
              <li key={route.type} className="card" style={{ padding: 'var(--space-4)' }}>
                <div style={{ display: 'flex', gap: 'var(--space-3)', alignItems: 'center', flexWrap: 'wrap' }}>
                  <strong>{route.label}</strong>
                  <StatusBadge status={route.sourceStatus} />
                </div>
                <p className="muted" style={{ margin: '4px 0' }}>
                  {route.description}
                </p>
                <p className="hint">Destination: {route.destination}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
