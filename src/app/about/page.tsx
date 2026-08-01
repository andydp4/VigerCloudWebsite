import Link from 'next/link'
import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/metadata'
import { getSiteSettings } from '@/lib/content'
import { StatusBadge } from '@/components/StatusBadge'

export const metadata: Metadata = buildMetadata({
  title: 'About',
  description:
    'Who Viger Cloud is, what we build, and who we serve — responsible, reliable software for modern teams.',
  path: '/about',
})

export default async function AboutPage() {
  const company = await getSiteSettings()
  return (
    <section className="section container stack">
      <div>
        <p className="eyebrow">About</p>
        <h1 className="h2">Responsible software, built to last</h1>
        <p className="lede">
          Viger Cloud designs and operates software that helps teams see clearly and act with
          confidence. We focus on reliability, transparent data handling, and results that hold up
          over time.
        </p>
      </div>

      <div className="grid grid--2">
        <div className="card stack">
          <h2 className="h3" style={{ fontSize: 'var(--step-1)' }}>
            What we build
          </h2>
          <p className="muted">
            Our flagship product, Arcarna, brings selling, understanding, control, action and growth
            into one connected workspace. We are expanding the ecosystem deliberately, with honest
            status labels on everything not yet generally available.
          </p>
          <Link className="btn btn--ghost" href="/products">
            See our products
          </Link>
        </div>

        <div className="card stack">
          <h2 className="h3" style={{ fontSize: 'var(--step-1)' }}>
            Who we serve
          </h2>
          <p className="muted">
            Operations, revenue teams and leaders who need dependable software and a clear view of
            what&apos;s happening — without stitching together a dozen tools.
          </p>
          <Link className="btn btn--ghost" href="/contact?route=demo">
            Book a demo
          </Link>
        </div>
      </div>

      <div className="card">
        <div style={{ display: 'flex', gap: 'var(--space-3)', alignItems: 'center', flexWrap: 'wrap' }}>
          <h2 className="h3" style={{ fontSize: 'var(--step-1)', margin: 0 }}>
            Group & company details
          </h2>
          <StatusBadge status={company.sourceStatus} />
        </div>
        <p className="muted" style={{ marginTop: 'var(--space-3)' }}>
          {company.group} Statutory details ({company.legalName}, company no.{' '}
          {company.companyNumber}, {company.registeredAddress}) are shown as placeholders and will be
          confirmed before launch.
        </p>
      </div>
    </section>
  )
}
