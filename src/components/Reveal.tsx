'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'
import { track } from '@/lib/analytics'

interface RevealProps {
  children: ReactNode
  /** Optional analytics chapter id fired once when the block first becomes visible. */
  chapter?: string
  className?: string
}

/**
 * Fades content in when scrolled into view (Brief 04 targeted motion). Falls back to fully-visible
 * content when IntersectionObserver is unavailable or motion is reduced (handled in CSS). The DOM
 * is identical either way, so the reduced-motion experience carries the same information/actions.
 */
export function Reveal({ children, chapter, className }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const reduced =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

    if (reduced || typeof IntersectionObserver === 'undefined') {
      setVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true)
            if (chapter) track({ name: 'scroll_chapter', chapter })
            observer.disconnect()
          }
        }
      },
      { threshold: 0.25 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [chapter])

  return (
    <div ref={ref} className={`reveal ${className ?? ''}`} data-visible={visible}>
      {children}
    </div>
  )
}
