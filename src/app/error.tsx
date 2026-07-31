'use client'

import { useEffect } from 'react'

// Route-level error boundary (Brief 01). A real error-monitoring provider is not yet configured
// (BLOCKED pending decision); until then we log to the console as a stable integration point.
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // eslint-disable-next-line no-console
    console.error('[app-error]', error)
  }, [error])

  return (
    <section className="section container" style={{ textAlign: 'center' }}>
      <p className="eyebrow">Something went wrong</p>
      <h1 className="h2">We hit an unexpected error</h1>
      <p className="lede" style={{ marginInline: 'auto' }}>
        Please try again. If the problem continues, contact us and we&apos;ll help.
      </p>
      <div className="cta-row" style={{ justifyContent: 'center' }}>
        <button type="button" className="btn btn--primary" onClick={() => reset()}>
          Try again
        </button>
      </div>
    </section>
  )
}
