import Link from 'next/link'
import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/metadata'
import { getProducts } from '@/lib/content'
import type { ProductStatus } from '@/content/types'

export const metadata: Metadata = buildMetadata({
  title: 'Products | Viger Cloud',
  description:
    'Explore practical software from Viger Cloud, including Arcarna, the retail intelligence and decision-support platform for independent businesses.',
  path: '/products',
})

const STATUS_LABEL: Record<ProductStatus, string> = {
  available: 'Available',
  beta: 'Beta',
  'coming-soon': 'Coming soon',
  concept: 'Concept',
}

export const revalidate = 60

export default async function ProductsPage() {
  const products = await getProducts()
  return (
    <section className="section container stack">
      <div>
        <p className="eyebrow">Viger Cloud products</p>
        <h1 className="h2">A focused family of practical business tools.</h1>
        <p className="lede">
          Every Viger Cloud product must solve a clear operating problem. We introduce products
          deliberately, explain who they are for and show their availability honestly.
        </p>
      </div>

      <div className="grid grid--2">
        {products.map((product) => (
          <article className="card stack" key={product.slug}>
            <span className="badge">{STATUS_LABEL[product.status]}</span>
            <h2 className="h3" style={{ fontSize: 'var(--step-2)' }}>
              {product.name}
            </h2>
            <p style={{ fontWeight: 700 }}>{product.tagline}</p>
            {product.slug === 'arcarna' && (
              <p className="muted">
                For independent retailers, market traders and multi-location retail businesses.
              </p>
            )}
            <p className="muted">{product.description}</p>
            {product.slug === 'arcarna' && (
              <div className="cta-row" style={{ marginTop: 0 }}>
                <Link className="btn btn--primary" href="/arcarna">
                  Discover Arcarna
                </Link>
              </div>
            )}
          </article>
        ))}
      </div>
    </section>
  )
}
