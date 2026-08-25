import Link from 'next/link'
import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/metadata'

export const metadata: Metadata = buildMetadata({
  title: 'Viger Cloud | Practical software for independent businesses',
  description:
    'Viger Cloud builds practical technology that helps independent retailers and owner-led businesses understand performance, protect margin and make better decisions. Discover Arcarna.',
  path: '/',
})

const wayItems = [
  {
    title: 'Understand the problem',
    body: 'Start with the work, the obstacle and the person experiencing it.',
  },
  {
    title: 'Build the practical answer',
    body: 'Remove unnecessary complexity and build with care, precision and purpose.',
  },
  {
    title: 'Improve with evidence',
    body: 'Learn from real use, communicate honestly and earn reliability over time.',
  },
]

const audiences = [
  {
    title: 'Independent retailers',
    body: 'Understand sales, stock, margin and customers across one shop or several locations.',
  },
  {
    title: 'Owners and directors',
    body: 'Get a clearer view of performance without waiting for several reports to be assembled.',
  },
  {
    title: 'Shop and operations managers',
    body: 'See what needs attention and give the team a more informed next step.',
  },
  {
    title: 'Retail technology partners',
    body: 'Connect useful systems and data so shared customers get more value from the tools they already use.',
  },
]

export default function HomePage() {
  return (
    <>
      <section className="section container">
        <p className="eyebrow">Technology for independent business</p>
        <h1 className="h1" style={{ maxWidth: '20ch' }}>
          Practical software, built around real business problems.
        </h1>
        <p className="lede" style={{ marginTop: 'var(--space-4)' }}>
          Viger Cloud turns the Viger principles of simplicity, precision, practicality and
          reliability into useful technology. We understand the problem first, remove unnecessary
          complexity and build dependable software that gives independent businesses more time and
          control.
        </p>
        <div className="cta-row">
          <Link className="btn btn--primary" href="/products">
            Explore our products
          </Link>
          <Link className="btn btn--ghost" href="/arcarna">
            Discover Arcarna
          </Link>
        </div>
      </section>

      <section className="section--tight container">
        <div className="card stack">
          <h2 className="h3">Software should solve the problem, not add to it</h2>
          <p className="muted">
            Independent businesses are often asked to fit their work around software designed without
            their reality in mind. That creates more steps, more administration and more systems to
            manage.
          </p>
          <p className="muted">
            We take a different approach. We begin with the person doing the work and the outcome
            they need. Then we design the clearest practical route between the two.
          </p>
          <p className="muted">
            Our mission is to remove unnecessary complexity, solve real operational problems and give
            independent businesses more time and control.
          </p>
        </div>
      </section>

      <section className="section--tight container">
        <div className="card">
          <p className="eyebrow" style={{ margin: 0 }}>
            Our flagship product
          </p>
          <h2 className="h3" style={{ marginTop: 'var(--space-2)' }}>
            Meet Arcarna
          </h2>
          <p className="lede" style={{ fontWeight: 700 }}>
            Reveal Your Truth.
          </p>
          <p className="muted">
            Arcarna brings sales, stock, customer and operational information into one place to reveal
            the commercial truth inside it. Instead of only reporting what happened, it helps
            independent retailers understand why it happened, see what deserves attention and take a
            practical next step.
          </p>
          <p className="muted">
            Use it to investigate the questions that shape day-to-day performance: Which products make
            money? Where is margin leaking? Which customers are drifting away? What changed, and what
            should happen next?
          </p>
          <div className="cta-row">
            <Link className="btn btn--primary" href="/arcarna">
              Discover Arcarna
            </Link>
            <Link className="btn btn--ghost" href="/pricing">
              View Arcarna pricing
            </Link>
          </div>
        </div>
      </section>

      <section className="section--tight container">
        <p className="eyebrow">The Viger Cloud Way</p>
        <h2 className="h3">What Viger Cloud builds</h2>
        <p className="lede">
          The Viger Way began with a commitment to simplicity, efficiency, practicality and
          reliability. Viger Cloud carries those principles into software.
        </p>
        <div className="grid grid--3" style={{ marginTop: 'var(--space-5)' }}>
          {wayItems.map((item) => (
            <div className="card" key={item.title}>
              <h3 className="h3" style={{ fontSize: 'var(--step-1)' }}>
                {item.title}
              </h3>
              <p className="muted">{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section--tight container">
        <p className="eyebrow">Who it&apos;s for</p>
        <h2 className="h3">Built for independent operators</h2>
        <div className="grid grid--2" style={{ marginTop: 'var(--space-5)' }}>
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
            <h2 className="h3" style={{ fontSize: 'var(--step-2)' }}>
              Independent should not mean under-informed
            </h2>
            <p className="muted">
              Large organisations can employ analysts and build internal systems around every
              commercial question. Independent businesses rarely have that luxury, even though their
              decisions are just as important.
            </p>
            <p className="muted">
              We believe useful business intelligence should fit the reality of an owner-led company:
              limited time, practical priorities and a need to see the reasoning before trusting the
              answer.
            </p>
          </div>

          <div className="card stack">
            <h2 className="h3" style={{ fontSize: 'var(--step-2)' }}>
              Clear about the product and careful with the data behind it
            </h2>
            <p className="muted">
              Good decisions depend on information people can trust. We design our products to keep
              sources, reasoning and changes understandable rather than hiding them behind a
              confident-looking score.
            </p>
            <p className="muted">
              We also explain product availability, pricing, privacy and security in plain English.
              Where something is still being developed or confirmed, we say so before asking a
              customer to rely on it.
            </p>
            <div className="cta-row" style={{ marginTop: 0 }}>
              <Link className="btn btn--ghost" href="/legal/security">
                Read about security and data use
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section--tight container">
        <div className="card" style={{ textAlign: 'center' }}>
          <h2 className="h3">Start with the question your business needs answered</h2>
          <p className="lede" style={{ marginInline: 'auto' }}>
            Tell us what you are trying to understand or improve. We can show you how Arcarna
            approaches it and whether the product is a sensible fit for your business.
          </p>
          <div className="cta-row" style={{ justifyContent: 'center' }}>
            <Link className="btn btn--primary" href="/contact?route=demo">
              Book an Arcarna demonstration
            </Link>
            <Link className="btn btn--ghost" href="/contact?route=general">
              Speak to Viger Cloud
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
