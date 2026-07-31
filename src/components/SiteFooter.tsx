import Link from 'next/link'
import { footerNav } from '@/content/navigation'
import { company } from '@/content/site'
import { BrandMark } from './BrandMark'

export function SiteFooter() {
  const year = new Date().getFullYear()
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="site-footer__grid">
          <div className="stack">
            <BrandMark />
            <p className="muted" style={{ maxWidth: '32ch' }}>
              Responsible, reliable software for modern teams. Home of Arcarna.
            </p>
            <p className="muted" style={{ fontSize: 'var(--step--1)' }}>
              {company.group}
            </p>
          </div>

          {footerNav.map((group) => (
            <div key={group.heading}>
              <h4>{group.heading}</h4>
              <ul>
                {group.items.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href}>{item.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="site-footer__legal">
          <span>
            © {year} {company.legalName}. Company no. {company.companyNumber}.{' '}
            {company.registeredAddress}.
          </span>
          <span>{company.vatNote}</span>
        </div>
      </div>
    </footer>
  )
}
