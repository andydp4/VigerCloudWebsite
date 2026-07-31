interface BrandMarkProps {
  label?: string
  href?: string
}

// Simple wordmark lockup. Final logo files are BLOCKED pending brand assets (Brief 00/02);
// this is a typographic placeholder that reads clearly and is themable per brand scope.
export function BrandMark({ label = 'Viger Cloud', href = '/' }: BrandMarkProps) {
  return (
    <a className="brand-lockup" href={href} aria-label={`${label} home`}>
      <span className="brand-mark" aria-hidden="true" />
      {label}
    </a>
  )
}
