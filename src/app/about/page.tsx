import Link from 'next/link'
import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/metadata'
import { getSiteSettings } from '@/lib/content'

export const metadata: Metadata = buildMetadata({
  title: 'About Viger Cloud | Technology for independent business',
  description:
    'Learn why Viger Cloud builds practical software for independent businesses and how it fits within the Viger Group.',
  path: '/about',
})

export const revalidate = 60

const principles = [
  {
    title: 'Understand the real problem',
    body: 'Begin with the work, the obstacle and the outcome — not with a technology looking for a use.',
  },
  {
    title: 'Remove unnecessary complexity',
    body: 'Make difficult tasks easier to understand and reduce the effort needed to complete them.',
  },
  {
    title: 'Build with precision',
    body: 'Design carefully, test deliberately and treat details, data and permissions with respect.',
  },
  {
    title: 'Apply intelligence with purpose',
    body: 'Use software, data and automation where they produce a genuinely useful result.',
  },
  {
    title: 'Turn understanding into action',
    body: 'Help work move forward while keeping the person informed and in control.',
  },
  {
    title: 'Earn reliability over time',
    body: 'Communicate honestly, learn from real use and improve the product steadily.',
  },
]

export default async function AboutPage() {
  const company = await getSiteSettings()
  return (
    <section className="section container stack">
      <div>
        <p className="eyebrow">About Viger Cloud</p>
        <h1 className="h2">Technology that gives independent businesses a clearer view.</h1>
        <p className="lede">
          Viger Cloud was created to build practical products for the people running independent
          businesses. We focus on a familiar gap: companies have more data than ever, but still spend
          too much time trying to understand what happened and what to do next.
        </p>
      </div>

      <div className="grid grid--2">
        <div className="card stack">
          <h2 className="h3" style={{ fontSize: 'var(--step-2)' }}>
            Better information should lead to a better decision
          </h2>
          <p className="muted">
            A sale, a stock movement, a returning customer or a change in cost all tells part of the
            story. The difficulty is joining those pieces together while there is still time to act.
          </p>
          <p className="muted">
            We develop software that reduces that burden. Our products bring relevant information
            together, show the reasoning behind an insight and help an operator move from a business
            question to a practical next step.
          </p>
        </div>

        <div className="card stack">
          <h2 className="h3" style={{ fontSize: 'var(--step-2)' }}>
            Build software that gives people more time and control
          </h2>
          <p className="muted">
            Our mission is to build clear, dependable software that removes unnecessary complexity and
            solves real operational problems for independent businesses.
          </p>
          <p className="muted">
            We do that by understanding the work before designing the technology, making difficult
            tasks easier to follow and improving products through evidence from real use.
          </p>
        </div>
      </div>

      <div className="card stack">
        <h2 className="h3" style={{ fontSize: 'var(--step-2)' }}>
          Practical products, deliberately developed
        </h2>
        <p className="muted">
          Our flagship product is Arcarna, a retail intelligence and decision-support platform.
          Arcarna is designed to help independent retailers understand sales, stock, margin, customers
          and performance in one connected place.
        </p>
        <p className="muted">
          As Viger Cloud grows, new products will only appear on this website when they have a clear
          purpose and an honest status. We will not pad the portfolio with concepts simply to look
          larger.
        </p>
        <div className="cta-row" style={{ marginTop: 0 }}>
          <Link className="btn btn--ghost" href="/arcarna">
            Discover Arcarna
          </Link>
        </div>
      </div>

      <div className="card stack">
        <h2 className="h3" style={{ fontSize: 'var(--step-2)' }}>
          Part of a wider commitment to independent business
        </h2>
        <p className="muted">
          Viger Cloud is the technology division of the Viger Group. Viger Ltd is the corporate parent
          and brand owner. Viger Assist is the Group&apos;s human-service division, while Viger Cloud
          develops and publishes technology products including Arcarna.
        </p>
        <p className="muted">
          The shared idea is straightforward: combine useful human support with well-designed
          technology so independent businesses can operate with greater clarity and confidence.
        </p>
      </div>

      <div>
        <p className="eyebrow">The Viger Cloud Way</p>
        <h2 className="h3" style={{ fontSize: 'var(--step-2)' }}>
          How we work
        </h2>
        <p className="lede">
          Viger Assist applies the Viger principles through trusted human support. Viger Cloud carries
          the same foundation into technology: simplicity, efficiency, practicality and reliability,
          combined with careful order, intelligent strategy and determined problem-solving.
        </p>
        <div className="grid grid--3" style={{ marginTop: 'var(--space-5)' }}>
          {principles.map((p) => (
            <div className="card" key={p.title}>
              <h3 className="h3" style={{ fontSize: 'var(--step-1)' }}>
                {p.title}
              </h3>
              <p className="muted">{p.body}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="card">
        <h2 className="h3" style={{ fontSize: 'var(--step-1)' }}>
          Company details
        </h2>
        <p className="muted" style={{ marginTop: 'var(--space-3)' }}>
          {company.legalName} is registered in {company.registeredJurisdiction} under company number{' '}
          {company.companyNumber}. Its registered office is {company.registeredAddress}.
        </p>
        <div className="cta-row">
          <Link className="btn btn--ghost" href="/contact?route=general">
            Speak to Viger Cloud
          </Link>
        </div>
      </div>
    </section>
  )
}
