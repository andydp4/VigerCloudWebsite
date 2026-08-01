import type { Metadata, Viewport } from 'next'
import Link from 'next/link'
import { isSanityConfigured } from '@/sanity/env'
import Studio from './Studio'

// Studio is a system route — never indexed.
export const metadata: Metadata = {
  title: 'Studio',
  robots: { index: false, follow: false },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

// The Studio renders entirely on the client.
export const dynamic = 'force-static'

export default function StudioPage() {
  if (!isSanityConfigured) {
    return (
      <section className="section container stack" style={{ maxWidth: '72ch' }}>
        <p className="eyebrow">Content Studio</p>
        <h1 className="h2">Sanity is not connected yet</h1>
        <div className="notice">
          The CMS is scaffolded but no Sanity project is configured, so the site is running on its
          built-in fallback content. To enable editing here, set the environment variables below and
          reload.
        </div>
        <div className="card stack">
          <p className="muted" style={{ margin: 0 }}>
            Required environment variables (see <code>.env.example</code>):
          </p>
          <ul className="muted">
            <li>
              <code>NEXT_PUBLIC_SANITY_PROJECT_ID</code>
            </li>
            <li>
              <code>NEXT_PUBLIC_SANITY_DATASET</code> (e.g. <code>production</code>)
            </li>
            <li>
              <code>SANITY_API_READ_TOKEN</code> (optional, for drafts/preview)
            </li>
          </ul>
          <p className="muted">
            Create a free project at <a href="https://www.sanity.io/">sanity.io</a>, then run{' '}
            <code>npx sanity@latest init</code> or paste the project id into your environment. Full
            steps are in <code>DEPLOYMENT.md</code>.
          </p>
          <Link className="btn btn--ghost" href="/">
            Back to site
          </Link>
        </div>
      </section>
    )
  }

  return <Studio />
}
