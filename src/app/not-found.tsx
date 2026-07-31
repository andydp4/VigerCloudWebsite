import Link from 'next/link'
import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/metadata'

export const metadata: Metadata = buildMetadata({
  title: 'Page not found',
  path: '/404',
  noindex: true,
})

export default function NotFound() {
  return (
    <section className="section container" style={{ textAlign: 'center' }}>
      <p className="eyebrow">404</p>
      <h1 className="h2">We couldn&apos;t find that page</h1>
      <p className="lede" style={{ marginInline: 'auto' }}>
        The page you were looking for may have moved. Try one of these instead.
      </p>
      <div className="cta-row" style={{ justifyContent: 'center' }}>
        <Link className="btn btn--primary" href="/">
          Go home
        </Link>
        <Link className="btn btn--ghost" href="/contact">
          Contact us
        </Link>
      </div>
    </section>
  )
}
