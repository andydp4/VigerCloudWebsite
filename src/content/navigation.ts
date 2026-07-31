export interface NavItem {
  href: string
  label: string
}

export const primaryNav: NavItem[] = [
  { href: '/about', label: 'About' },
  { href: '/products', label: 'Products' },
  { href: '/arcarna', label: 'Arcarna' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/partners', label: 'Partners' },
  { href: '/contact', label: 'Contact' },
]

export const footerNav: { heading: string; items: NavItem[] }[] = [
  {
    heading: 'Product',
    items: [
      { href: '/arcarna', label: 'Arcarna' },
      { href: '/products', label: 'All products' },
      { href: '/pricing', label: 'Pricing' },
    ],
  },
  {
    heading: 'Company',
    items: [
      { href: '/about', label: 'About' },
      { href: '/partners', label: 'Partners' },
      { href: '/contact', label: 'Contact' },
    ],
  },
  {
    heading: 'Legal',
    items: [
      { href: '/legal/privacy-viger', label: 'Privacy (Viger Cloud)' },
      { href: '/legal/privacy-arcarna', label: 'Privacy (Arcarna)' },
      { href: '/legal/cookies', label: 'Cookies' },
      { href: '/legal/terms', label: 'Terms' },
      { href: '/legal/accessibility', label: 'Accessibility' },
      { href: '/legal/security', label: 'Security' },
    ],
  },
]
