import type { SourceStatus } from '@/content/types'

const LABELS: Record<SourceStatus, string> = {
  confirmed: 'Confirmed',
  assumption: 'Assumption',
  placeholder: 'Placeholder',
  blocked: 'Blocked',
}

/**
 * Visible source-status label (Briefs 00/02/06). Makes it obvious where copy, pricing or legal
 * text is not yet final, so nothing unconfirmed is mistaken for approved content.
 */
export function StatusBadge({ status }: { status: SourceStatus }) {
  return <span className={`badge badge--${status}`}>{LABELS[status]}</span>
}
