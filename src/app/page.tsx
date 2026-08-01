import Link from 'next/link'
import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/metadata'
import { getCompanyUpdates, getProducts } from '@/lib/content'
import { StatusBadge } from '@/components/StatusBadge'

export const metadata: Metadata = buildMetadata({
  title: 'Viger Cloud',
  description:
    'Viger Cloud builds responsible, reliable software for modern teams — home of Arcarna. Start a free trial or book a demo.',
  path: '/',
})

const audiences = [
  { title: 'Operations', body: 'See the whole picture and act without switching tools.' },
  { title: 'Revenue teams', body: 'Focus on the deals most likely to move, sooner.' },
  { title: 'Leadership', body: 'Make confident calls backed by clear, auditable data.' },
]

// Revalidate CMS-backed content periodically so Studio edits appear without a redeploy (ISR).
export const revalidate = 60

export default async function HomePage() {
  const [products, companyUpdates] = await Promise.all([getProducts(), getCompanyUpdates()])
  const flagship = products.find((p) => p.slug === 'arcarna')

  return (
    <>
      <section className="section container">
        <p className="eyebrow">Viger Cloud</p>
        <h1 className="h1" style={{ maxWidth: '18ch' }}>
          Clarity and control for how modern teams work
        </h1>
        <p className="lede" style={{ marginTop: 'var(--space-4)' }}>
          Viger Cloud builds responsible, reliable software that turns everyday activity into clear
          decisions. Our flagship product, Arcarna, brings selling, understanding, control and
          growth into one connected place.
        </p>
        <div className="cta-row">
          <Link className="btn btn--primary" href="/contact?route=trial">
            Start a free trial
          </Link>
          <Link className="btn btn--ghost" href="/arcarna">
            Explore Arcarna
          </Link>
        </div>
      </section>

      {flagship && (
        <section className="section--tight container">
          <div className="card">
            <div style={{ display: 'flex', gap: 'var(--space-3)', alignItems: 'center', flexWrap: 'wrap' }}>
              <p className="eyebrow" style={{ margin: 0 }}>
                Featured product
              </p>
              <StatusBadge status={flagship.sourceStatus} />
            </div>
            <h2 className="h3" style={{ marginTop: 'var(--space-3)' }}>
              {flagship.name}
            </h2>
            <p className="lede">{flagship.tagline}</p>
            <p className="muted">{flagship.description}</p>
            <div className="cta-row">
              <Link className="btn btn--primary" href="/arcarna">
                See the Arcarna story
              </Link>
              <Link className="btn btn--ghost" href="/pricing">
                View pricing
              </Link>
            </div>
          </div>
        </section>
      )}

      <section className="section--tight container">
        <p className="eyebrow">Who it&apos;s for</p>
        <h2 className="h3">Built for the people who run the business</h2>
        <div className="grid grid--3" style={{ marginTop: 'var(--space-5)' }}>
          {audiences.map((a) => (
            <div className="card" key={a.title}>
              <h3 className="h3" style={{ fontSize: 'var(--step-1)' }}>
                {a.title}
              </h3>
              <p className="muted">{a.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section--tight container">
        <div className="grid grid--2">
          <div className="card stack">
            <p className="eyebrow" style={{ margin: 0 }}>
              Responsible by design
            </p>
            <h2 className="h3" style={{ fontSize: 'var(--step-2)' }}>
              Reliability and data you can stand behind
            </h2>
            <p className="muted">
              We build for uptime, clear reasoning and transparent data handling. Our approach to
              security and privacy is written in plain English.
            </p>
            <div className="cta-row" style={{ marginTop: 0 }}>
              <Link className="btn btn--ghost" href="/legal/security">
                Security overview
              </Link>
            </div>
          </div>

          <div className="card">
            <p className="eyebrow" style={{ margin: 0 }}>
              Latest updates
            </p>
            <ul className="stack" style={{ listStyle: 'none', padding: 0, marginTop: 'var(--space-4)' }}>
              {companyUpdates.map((u) => (
                <li key={u.title}>
                  <div style={{ display: 'flex', gap: 'var(--space-3)', alignItems: 'baseline' }}>
                    <time className="muted" style={{ fontSize: 'var(--step--1)' }} dateTime={u.date}>
                      {u.date}
                    </time>
                    <StatusBadge status={u.sourceStatus} />
                  </div>
                  <strong>{u.title}</strong>
                  <p className="muted" style={{ margin: '4px 0 0' }}>
                    {u.body}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section--tight container">
        <div className="card" style={{ textAlign: 'center' }}>
          <h2 className="h3">Ready to see it in action?</h2>
          <p className="lede" style={{ marginInline: 'auto' }}>
            Start a free trial or book a demonstration tailored to your team.
          </p>
          <div className="cta-row" style={{ justifyContent: 'center' }}>
            <Link className="btn btn--primary" href="/contact?route=trial">
              Start free trial
            </Link>
            <Link className="btn btn--ghost" href="/contact?route=demo">
              Book a demo
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
