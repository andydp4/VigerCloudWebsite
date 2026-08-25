interface BrandMarkProps {
  label?: string
  href?: string
  /** Rendered logo height in px (defaults to the header size). */
  height?: number
}

// The real Viger Cloud Ltd logo lockup (cloud + wordmark). Sourced from the supplied artwork and
// cropped to a transparent SVG in /public/brand.
export function BrandMark({ label = 'Viger Cloud', href = '/', height = 40 }: BrandMarkProps) {
  return (
    <a className="brand-lockup" href={href} aria-label={`${label} home`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className="brand-logo"
        src="/brand/viger-cloud-logo.svg"
        alt={label}
        style={{ height }}
        width={height * 1.37}
        height={height}
      />
    </a>
  )
}
