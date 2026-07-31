import type { Product } from './types'

// Product portfolio. Statuses are honest (Brief 03: "no placeholder portfolio"): only Arcarna is
// presented as a real flagship; others are clearly labelled concept/coming-soon and marked as
// assumptions pending confirmation in DECISIONS.md.
export const products: Product[] = [
  {
    slug: 'arcarna',
    name: 'Arcarna',
    tagline: 'Sell, understand, control, act and grow — in one place.',
    description:
      'Arcarna is Viger Cloud’s flagship product: a connected workspace that turns everyday commercial activity into clear decisions and measurable results.',
    status: 'beta',
    brand: 'arcarna',
    sourceStatus: 'assumption',
  },
  {
    slug: 'viger-signals',
    name: 'Viger Signals',
    tagline: 'Responsible, explainable insight across your data.',
    description:
      'A planned analytics layer that surfaces trends and anomalies with transparent, auditable logic. Exploratory — not yet available.',
    status: 'coming-soon',
    brand: 'viger',
    sourceStatus: 'placeholder',
  },
  {
    slug: 'viger-connect',
    name: 'Viger Connect',
    tagline: 'Secure integrations between the tools you already use.',
    description:
      'A concept for a governed integration hub. Included to show ecosystem direction; scope and availability are unconfirmed.',
    status: 'concept',
    brand: 'viger',
    sourceStatus: 'placeholder',
  },
]

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug)
}
