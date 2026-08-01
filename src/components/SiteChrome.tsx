'use client'

import { usePathname } from 'next/navigation'
import type { ReactNode } from 'react'
import { SkipLink } from './SkipLink'
import { SiteHeader } from './SiteHeader'
import { SiteFooter } from './SiteFooter'

/**
 * Renders the corporate site chrome (skip link, header, footer) around page content — except on
 * the embedded Sanity Studio route (`/studio`), which takes over the full viewport.
 */
export function SiteChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const isStudio = pathname?.startsWith('/studio')

  if (isStudio) {
    return <>{children}</>
  }

  return (
    <>
      <SkipLink />
      <SiteHeader />
      <main id="main-content" tabIndex={-1}>
        {children}
      </main>
      <SiteFooter />
    </>
  )
}
