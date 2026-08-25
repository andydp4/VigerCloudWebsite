import type { Metadata } from 'next'
import '@/styles/pricing.css'
import { buildMetadata } from '@/lib/metadata'
import { PricingTable } from '@/components/PricingTable'
import { getFaqs, getPricingPlans } from '@/lib/content'

export const metadata: Metadata = buildMetadata({
  title: 'Arcarna pricing | Plans for independent retailers',
  description:
    'Compare Arcarna plans for independent retailers, from a single user to growing multi-location organisations. Prices exclude VAT.',
  path: '/pricing',
})

export const revalidate = 60

export default async function PricingPage() {
  const [plans, faqs] = await Promise.all([getPricingPlans(), getFaqs()])
  return (
    <section className="section container stack">
      <div>
        <p className="eyebrow">Arcarna pricing</p>
        <h1 className="h2">Choose the level of access and support your business needs.</h1>
        <p className="lede">
          Arcarna plans grow from one user exploring the core product to larger teams requiring
          onboarding, migration and stronger governance. All prices below exclude VAT.
        </p>
      </div>

      <PricingTable plans={plans} />

      <div className="notice">
        Solo and Team customers can request a trial. Growth and Scale begin with a consultation
        because onboarding, data migration, training, permissions and data-processing arrangements may
        need to be agreed first. A detailed plan comparison is shared as part of that conversation.
      </div>

      <div>
        <h2 className="h3" style={{ fontSize: 'var(--step-2)' }}>
          Pricing FAQs
        </h2>
        <div className="grid grid--2" style={{ marginTop: 'var(--space-4)' }}>
          {faqs.map((faq) => (
            <div className="card" key={faq.question}>
              <strong>{faq.question}</strong>
              <p className="muted" style={{ marginBottom: 0, marginTop: 'var(--space-2)' }}>
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
