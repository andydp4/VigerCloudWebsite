import type { Product } from './types'

// Product portfolio (Brief 03: "no placeholder portfolio"). Only Arcarna is presented as a real
// flagship. Viger Mail is shown as a future product with an honest status. Invented concepts
// (Viger Signals / Viger Connect) have been removed.
export const products: Product[] = [
  {
    slug: 'arcarna',
    name: 'Arcarna',
    tagline: 'Reveal Your Truth.',
    description:
      'Arcarna is Viger Cloud’s flagship retail intelligence and decision-support platform. It brings sales, stock, margin and customer information together to reveal what is shaping performance, understand why it matters and act sooner.',
    status: 'beta',
    brand: 'arcarna',
    sourceStatus: 'confirmed',
  },
  {
    slug: 'viger-mail',
    name: 'Viger Mail',
    tagline: 'Practical communication tools designed around independent businesses.',
    description:
      'A future communications product from Viger Cloud. Scope and availability are being confirmed, so we are not publishing detailed features or a release date yet.',
    status: 'coming-soon',
    brand: 'viger',
    sourceStatus: 'assumption',
  },
]

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug)
}
