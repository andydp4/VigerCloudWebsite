'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { primaryNav } from '@/content/navigation'
import { BrandMark } from './BrandMark'

export function SiteHeader() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  return (
    <header className="site-header">
      <div className="container site-header__inner">
        <BrandMark />

        <button
          type="button"
          className="nav-toggle"
          aria-expanded={open}
          aria-controls="primary-navigation"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? 'Close' : 'Menu'}
        </button>

        <nav
          id="primary-navigation"
          className="site-nav"
          data-open={open}
          aria-label="Primary"
        >
          {primaryNav.map((item) => {
            const active = pathname === item.href || pathname.startsWith(`${item.href}/`)
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? 'page' : undefined}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            )
          })}
          <Link className="btn btn--primary" href="/contact?route=trial" onClick={() => setOpen(false)}>
            Start free trial
          </Link>
        </nav>
      </div>
    </header>
  )
}
