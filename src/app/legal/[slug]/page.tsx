import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/metadata'
import { getLegalDocument, getLegalDocuments } from '@/lib/content'
import { getLegalBody } from '@/content/legal'

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
  const body = getLegalBody(params.slug)

  return (
    <section className="section container stack" data-brand={wrapperBrand}>
      <div>
        <p className="eyebrow">{BRAND_LABEL[doc.brand]} · Legal</p>
        <h1 className="h2" style={{ margin: 0 }}>
          {doc.title}
        </h1>
        <p className="muted">Version: {doc.effectiveDate}</p>
      </div>

      <div className="notice">
        <strong>Working draft.</strong> This notice is being finalised and is pending review. Items
        shown in [square brackets] are still to be confirmed. For a privacy or data request in the
        meantime, use the <a href="/contact?route=privacy">privacy contact route</a>.
      </div>

      <div className="card stack" style={{ maxWidth: '72ch' }}>
        <p className="lede" style={{ fontSize: 'var(--step-1)' }}>
          {doc.summary}
        </p>

        {body?.map((section, i) => (
          <section key={section.heading ?? i} className="stack">
            {section.heading && (
              <h2 className="h3" style={{ fontSize: 'var(--step-1)' }}>
                {section.heading}
              </h2>
            )}
            {section.paragraphs?.map((p, j) => (
              <p key={j} className="muted" style={{ margin: 0 }}>
                {p}
              </p>
            ))}
            {section.bullets && (
              <ul className="muted" style={{ margin: 0 }}>
                {section.bullets.map((b, j) => (
                  <li key={j}>{b}</li>
                ))}
              </ul>
            )}
          </section>
        ))}
      </div>
    </section>
  )
}
