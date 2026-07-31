'use client'

import { useMemo, useState, type FormEvent } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import { leadSchema, toFieldErrors, type LeadFieldErrors } from '@/lib/leadSchema'
import { contactRoutes } from '@/content/site'
import type { LeadRouteType } from '@/content/types'
import { track } from '@/lib/analytics'

interface LeadFormProps {
  defaultRoute?: LeadRouteType
  /** When true, a route selector is shown so visitors can pick the enquiry type. */
  allowRouteSelection?: boolean
}

const ROUTE_LABEL: Record<LeadRouteType, string> = Object.fromEntries(
  contactRoutes.map((r) => [r.type, r.label]),
) as Record<LeadRouteType, string>

export function LeadForm({ defaultRoute = 'general', allowRouteSelection = true }: LeadFormProps) {
  const searchParams = useSearchParams()
  const pathname = usePathname()

  const initialRoute = useMemo<LeadRouteType>(() => {
    const q = searchParams.get('route')
    const match = contactRoutes.find((r) => r.type === q)
    return match ? match.type : defaultRoute
  }, [searchParams, defaultRoute])

  const [routeType, setRouteType] = useState<LeadRouteType>(initialRoute)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [organisation, setOrganisation] = useState('')
  const [message, setMessage] = useState('')
  const [consent, setConsent] = useState(false)
  const [honeypot, setHoneypot] = useState('')
  const [errors, setErrors] = useState<LeadFieldErrors>({})
  const [submitting, setSubmitting] = useState(false)
  const [succeeded, setSucceeded] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setErrors({})

    const payload = {
      routeType,
      name,
      email,
      organisation,
      message,
      consent,
      company_extra: honeypot,
      source: {
        page: pathname,
        utm_source: searchParams.get('utm_source') ?? undefined,
        utm_medium: searchParams.get('utm_medium') ?? undefined,
        utm_campaign: searchParams.get('utm_campaign') ?? undefined,
      },
    }

    const local = leadSchema.safeParse(payload)
    if (!local.success) {
      setErrors(toFieldErrors(local.error))
      track({ name: 'form_submit', routeType, result: 'error' })
      return
    }

    setSubmitting(true)
    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(local.data),
      })
      const data = (await res.json()) as { ok: boolean; errors?: LeadFieldErrors }
      if (!res.ok || !data.ok) {
        setErrors(data.errors ?? { form: 'Something went wrong. Please try again.' })
        track({ name: 'form_submit', routeType, result: 'error' })
        return
      }
      setSucceeded(true)
      track({ name: 'form_submit', routeType, result: 'success' })
    } catch {
      setErrors({ form: 'Network error. Please try again.' })
      track({ name: 'form_submit', routeType, result: 'error' })
    } finally {
      setSubmitting(false)
    }
  }

  if (succeeded) {
    return (
      <div className="form-success" role="status" aria-live="polite">
        <span className="form-success__check" aria-hidden="true">
          ✓
        </span>
        <h3 className="h3" style={{ fontSize: 'var(--step-1)' }}>
          Thanks — your {ROUTE_LABEL[routeType].toLowerCase()} request is in
        </h3>
        <p className="muted">
          We&apos;ve received your details for <strong>{email}</strong>. This site is running in
          test mode, so no marketing email has been sent yet — a team member will follow up once
          delivery is enabled.
        </p>
        <button
          type="button"
          className="btn btn--ghost"
          onClick={() => {
            setSucceeded(false)
            setName('')
            setEmail('')
            setOrganisation('')
            setMessage('')
            setConsent(false)
          }}
        >
          Send another enquiry
        </button>
      </div>
    )
  }

  return (
    <form className="form" onSubmit={handleSubmit} noValidate aria-describedby="form-mode-note">
      {errors.form && (
        <div className="form-status form-status--error" role="alert">
          {errors.form}
        </div>
      )}

      {allowRouteSelection && (
        <div className="field">
          <label htmlFor="routeType">Enquiry type</label>
          <select
            id="routeType"
            name="routeType"
            value={routeType}
            onChange={(e) => setRouteType(e.target.value as LeadRouteType)}
          >
            {contactRoutes.map((r) => (
              <option key={r.type} value={r.type}>
                {r.label}
              </option>
            ))}
          </select>
        </div>
      )}

      <div className="field">
        <label htmlFor="name">Name</label>
        <input
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? 'name-error' : undefined}
        />
        {errors.name && (
          <span className="error" id="name-error">
            {errors.name}
          </span>
        )}
      </div>

      <div className="field">
        <label htmlFor="email">Work email</label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? 'email-error' : undefined}
        />
        {errors.email && (
          <span className="error" id="email-error">
            {errors.email}
          </span>
        )}
      </div>

      <div className="field">
        <label htmlFor="organisation">Organisation (optional)</label>
        <input
          id="organisation"
          name="organisation"
          type="text"
          autoComplete="organization"
          value={organisation}
          onChange={(e) => setOrganisation(e.target.value)}
        />
      </div>

      <div className="field">
        <label htmlFor="message">How can we help? (optional)</label>
        <textarea
          id="message"
          name="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>

      {/* Honeypot field — hidden from users, must remain empty. */}
      <div className="hp" aria-hidden="true">
        <label htmlFor="company_extra">Company (leave blank)</label>
        <input
          id="company_extra"
          name="company_extra"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
        />
      </div>

      <div className="field">
        <div className="consent">
          <input
            id="consent"
            name="consent"
            type="checkbox"
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            aria-invalid={Boolean(errors.consent)}
            aria-describedby={errors.consent ? 'consent-error' : undefined}
          />
          <label htmlFor="consent">
            I agree to be contacted about this enquiry, as described in the{' '}
            <a href="/legal/privacy-viger">privacy notice</a>.
          </label>
        </div>
        {errors.consent && (
          <span className="error" id="consent-error">
            {errors.consent}
          </span>
        )}
      </div>

      <p id="form-mode-note" className="hint">
        No payment details are requested. This environment runs in test mode.
      </p>

      <button type="submit" className="btn btn--primary" disabled={submitting}>
        {submitting ? 'Sending…' : 'Submit enquiry'}
      </button>
    </form>
  )
}
