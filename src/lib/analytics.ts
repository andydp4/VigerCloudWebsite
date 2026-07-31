'use client'

// Consent-aware analytics interface (Brief 06). No analytics provider runs until consent is
// granted AND a real provider is configured. Until then events are buffered/no-op'd. This keeps a
// stable call site (`track(...)`) across the app so wiring a provider later is a single change.

export type AnalyticsEvent =
  | { name: 'product_view'; product: string }
  | { name: 'scroll_chapter'; chapter: string }
  | { name: 'pricing_view' }
  | { name: 'plan_select'; plan: string }
  | { name: 'billing_cycle_change'; cycle: 'monthly' | 'annual' }
  | { name: 'form_submit'; routeType: string; result: 'success' | 'error' }
  | { name: 'comparison_view' }

let consentGranted = false

export function setAnalyticsConsent(granted: boolean) {
  consentGranted = granted
}

export function hasAnalyticsConsent() {
  return consentGranted
}

export function track(event: AnalyticsEvent) {
  if (!consentGranted) return
  // No provider configured yet (BLOCKED pending decision). Safe dev-only trace.
  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line no-console
    console.debug('[analytics]', event)
  }
}
