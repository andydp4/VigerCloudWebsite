import type { Metadata } from 'next'
import '@/styles/pricing.css'
import { buildMetadata } from '@/lib/metadata'
import { PricingTable } from '@/components/PricingTable'
import { getFaqs, getPricingPlans } from '@/lib/content'
import { comparisonRows } from '@/content/pricing'
import { StatusBadge } from '@/components/StatusBadge'

export const metadata: Metadata = buildMetadata({
  title: 'Pricing',
  description:
    'Viger Cloud pricing for Arcarna — Solo, Team, Growth and Scale plans. Prices exclude VAT. Figures are illustrative placeholders pending confirmation.',
  path: '/pricing',
})

export default async function PricingPage() {
  const [plans, faqs] = await Promise.all([getPricingPlans(), getFaqs()])
  return (
    <section className="section container stack">
      <div>
        <div style={{ display: 'flex', gap: 'var(--space-3)', alignItems: 'center', flexWrap: 'wrap' }}>
          <p className="eyebrow" style={{ margin: 0 }}>
            Pricing
          </p>
          <StatusBadge status="placeholder" />
        </div>
        <h1 className="h2">Simple plans that grow with you</h1>
        <p className="lede">
          Choose the plan that fits today and move up as you grow. Larger organisations get a
          consultation instead of self-serve checkout. All prices exclude VAT.
        </p>
      </div>

      <div className="notice">
        These figures are illustrative placeholders for build purposes only. Final prices and
        entitlements are not yet approved (see the decision log).
      </div>

      <PricingTable plans={plans} rows={comparisonRows} />

      <div>
        <h2 className="h3" style={{ fontSize: 'var(--step-2)' }}>
          Pricing FAQs
        </h2>
        <div className="grid grid--2" style={{ marginTop: 'var(--space-4)' }}>
          {faqs.map((faq) => (
            <div className="card" key={faq.question}>
              <div style={{ display: 'flex', gap: 'var(--space-2)', alignItems: 'center', flexWrap: 'wrap' }}>
                <strong>{faq.question}</strong>
                <StatusBadge status={faq.sourceStatus} />
              </div>
              <p className="muted" style={{ marginBottom: 0 }}>
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
