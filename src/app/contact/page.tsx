import { Suspense } from 'react'
import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/metadata'
import { LeadForm } from '@/components/LeadForm'
import { contactRoutes } from '@/content/site'

export const metadata: Metadata = buildMetadata({
  title: 'Contact Viger Cloud',
  description:
    'Request an Arcarna trial or demonstration, ask a product question, discuss a partnership or contact the Viger Cloud team.',
  path: '/contact',
})

export default function ContactPage() {
  return (
    <section className="section container">
      <p className="eyebrow">Contact Viger Cloud</p>
      <h1 className="h2">Tell us what you would like to understand, improve or discuss.</h1>
      <p className="lede">
        Choose the route that best matches your enquiry. Your message will initially go to{' '}
        <a href="mailto:support@vigercloud.com">support@vigercloud.com</a> and be passed to the
        appropriate person.
      </p>

      <div className="grid grid--2" style={{ marginTop: 'var(--space-6)', alignItems: 'start' }}>
        <div className="card">
          <Suspense fallback={<p className="muted">Loading form…</p>}>
            <LeadForm />
          </Suspense>
        </div>

        <div className="stack">
          <h2 className="h3" style={{ fontSize: 'var(--step-1)' }}>
            Enquiry routes
          </h2>
          <ul className="stack" style={{ listStyle: 'none', padding: 0 }}>
            {contactRoutes.map((route) => (
              <li key={route.type} className="card" style={{ padding: 'var(--space-4)' }}>
                <strong>{route.label}</strong>
                <p className="muted" style={{ margin: '4px 0 0' }}>
                  {route.description}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
