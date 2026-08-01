import Link from 'next/link'
import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/metadata'
import { getProducts } from '@/lib/content'
import { StatusBadge } from '@/components/StatusBadge'
import type { ProductStatus } from '@/content/types'

export const metadata: Metadata = buildMetadata({
  title: 'Products',
  description:
    'The Viger Cloud product ecosystem, with honest status labels. Arcarna is our flagship; other products are clearly marked as in progress or exploratory.',
  path: '/products',
})

const STATUS_LABEL: Record<ProductStatus, string> = {
  available: 'Available',
  beta: 'In beta',
  'coming-soon': 'Coming soon',
  concept: 'Concept',
}

export default async function ProductsPage() {
  const products = await getProducts()
  return (
    <section className="section container stack">
      <div>
        <p className="eyebrow">Products</p>
        <h1 className="h2">An ecosystem, built honestly</h1>
        <p className="lede">
          We only present what genuinely exists. Arcarna is our flagship product; anything not yet
          available is clearly labelled so you always know what you can use today.
        </p>
      </div>

      <div className="grid grid--3">
        {products.map((product) => (
          <article className="card stack" key={product.slug}>
            <div style={{ display: 'flex', gap: 'var(--space-2)', alignItems: 'center', flexWrap: 'wrap' }}>
              <span className="badge">{STATUS_LABEL[product.status]}</span>
              <StatusBadge status={product.sourceStatus} />
            </div>
            <h2 className="h3" style={{ fontSize: 'var(--step-1)' }}>
              {product.name}
            </h2>
            <p style={{ fontWeight: 600 }}>{product.tagline}</p>
            <p className="muted">{product.description}</p>
            {product.slug === 'arcarna' && (
              <Link className="btn btn--primary" href="/arcarna">
                Explore Arcarna
              </Link>
            )}
          </article>
        ))}
      </div>
    </section>
  )
}
