import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/metadata'
import { getLegalDocument, getLegalDocuments } from '@/lib/content'

interface Params {
  params: { slug: string }
}

export const revalidate = 60

export async function generateStaticParams() {
  const docs = await getLegalDocuments()
  return docs.map((doc) => ({ slug: doc.slug }))
}

// Legal pages are structural templates pending reviewed wording, so they are never indexed
// (Brief 06 / copy review). Remove `noindex` once each notice contains approved content.
export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const doc = await getLegalDocument(params.slug)
  if (!doc) return buildMetadata({ title: 'Legal', path: `/legal/${params.slug}`, noindex: true })
  return buildMetadata({
    title: doc.title,
    description: doc.summary,
    path: `/legal/${doc.slug}`,
    noindex: true,
  })
}

const BRAND_LABEL: Record<string, string> = {
  viger: 'Viger Cloud',
  arcarna: 'Arcarna',
  shared: 'Viger Cloud & Arcarna',
}

export default async function LegalPage({ params }: Params) {
  const doc = await getLegalDocument(params.slug)
  if (!doc) notFound()

  const wrapperBrand = doc.brand === 'arcarna' ? 'arcarna' : 'viger'

  return (
    <section className="section container stack" data-brand={wrapperBrand}>
      <div>
        <p className="eyebrow">{BRAND_LABEL[doc.brand]} · Legal</p>
        <h1 className="h2" style={{ margin: 0 }}>
          {doc.title}
        </h1>
        <p className="muted">Effective date: {doc.effectiveDate}</p>
      </div>

      <div className="notice">
        <strong>Template only.</strong> This page is a structural placeholder. It does not
        constitute legal advice and must be replaced with reviewed wording before launch. Real data
        flows, retention periods and contact details are pending confirmation.
      </div>

      <div className="card stack" style={{ maxWidth: '72ch' }}>
        <p className="lede" style={{ fontSize: 'var(--step-1)' }}>
          {doc.summary}
        </p>
        <h2 className="h3" style={{ fontSize: 'var(--step-1)' }}>
          What this document will cover
        </h2>
        <ul className="muted">
          <li>Scope and who it applies to</li>
          <li>What information is involved and why</li>
          <li>How choices and rights can be exercised</li>
          <li>Who to contact and how updates are communicated</li>
        </ul>
        <p className="muted">
          For privacy or data requests in the meantime, use the{' '}
          <a href="/contact?route=privacy">privacy contact route</a>.
        </p>
      </div>
    </section>
  )
}
