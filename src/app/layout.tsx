import type { Metadata, Viewport } from 'next'
import '@/styles/globals.css'
import '@/styles/components.css'
import '@/styles/forms.css'
import { SkipLink } from '@/components/SkipLink'
import { SiteHeader } from '@/components/SiteHeader'
import { SiteFooter } from '@/components/SiteFooter'
import { DEFAULT_DESCRIPTION, SITE_NAME } from '@/lib/metadata'
import { allowIndexing, publicEnv } from '@/lib/env'

export const metadata: Metadata = {
  metadataBase: new URL(publicEnv.NEXT_PUBLIC_SITE_URL),
  title: {
    default: `${SITE_NAME} — Responsible, reliable software for modern teams`,
    template: `%s · ${SITE_NAME}`,
  },
  description: DEFAULT_DESCRIPTION,
  robots: { index: allowIndexing, follow: allowIndexing },
}

export const viewport: Viewport = {
  themeColor: '#0f1b2d',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // Default brand scope is Viger corporate; the Arcarna route overrides to data-brand="arcarna".
  return (
    <html lang="en-GB" data-brand="viger">
      <body>
        <SkipLink />
        <SiteHeader />
        <main id="main-content" tabIndex={-1}>
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  )
}
