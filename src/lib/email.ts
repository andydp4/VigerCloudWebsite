import nodemailer from 'nodemailer'
import type { LeadInput } from './leadSchema'

/**
 * Lead notification email (Brief 05). Enquiries are emailed to the support inbox
 * (default support@vigercloud.com) using SMTP — works with Hostinger email or any SMTP provider.
 *
 * `buildLeadEmail` is a pure function so the routing/recipient/body can be unit-tested without
 * sending anything. `sendLeadNotification` performs the actual SMTP send in live mode.
 */

const DEFAULT_TO = 'support@vigercloud.com'

export interface BuiltEmail {
  to: string
  from: string
  replyTo: string
  subject: string
  text: string
}

const ROUTE_LABEL: Record<LeadInput['routeType'], string> = {
  trial: 'Free trial',
  demo: 'Demo',
  general: 'General',
  pricing: 'Pricing',
  partner: 'Partner',
  support: 'Support',
  press: 'Press',
  privacy: 'Privacy',
}

export function getNotificationRecipient(): string {
  return process.env.LEAD_NOTIFICATION_EMAIL?.trim() || DEFAULT_TO
}

function getFromAddress(): string {
  // A verified/authenticated sender is required by most providers. Default to the SMTP user.
  return (
    process.env.LEAD_FROM_EMAIL?.trim() ||
    process.env.SMTP_USER?.trim() ||
    'no-reply@vigercloud.com'
  )
}

/** Builds the notification email. Pure — no side effects. */
export function buildLeadEmail(lead: LeadInput): BuiltEmail {
  const label = ROUTE_LABEL[lead.routeType] ?? lead.routeType
  const lines = [
    `New ${label} enquiry from the Viger Cloud website.`,
    '',
    `Type:         ${lead.routeType}`,
    `Name:         ${lead.name}`,
    `Email:        ${lead.email}`,
    `Organisation: ${lead.organisation || '—'}`,
    '',
    'Message:',
    lead.message?.trim() ? lead.message.trim() : '(none)',
    '',
    '— Source —',
    `Page:      ${lead.source?.page || '—'}`,
    `utm_source:  ${lead.source?.utm_source || '—'}`,
    `utm_medium:  ${lead.source?.utm_medium || '—'}`,
    `utm_campaign:${lead.source?.utm_campaign || '—'}`,
  ]

  return {
    to: getNotificationRecipient(),
    from: getFromAddress(),
    // Support can reply straight to the enquirer.
    replyTo: lead.email,
    subject: `New ${label} enquiry — ${lead.name}`,
    text: lines.join('\n'),
  }
}

interface SmtpConfig {
  host: string
  port: number
  secure: boolean
  user: string
  pass: string
}

function readSmtpConfig(): SmtpConfig {
  const host = process.env.SMTP_HOST?.trim()
  const user = process.env.SMTP_USER?.trim()
  const pass = process.env.SMTP_PASS
  if (!host || !user || !pass) {
    throw new Error(
      'SMTP is not configured. Set SMTP_HOST, SMTP_USER and SMTP_PASS to enable live lead email.',
    )
  }
  const port = Number(process.env.SMTP_PORT || 465)
  // Port 465 uses implicit TLS; 587 uses STARTTLS. Allow explicit override via SMTP_SECURE.
  const secure = process.env.SMTP_SECURE ? process.env.SMTP_SECURE === 'true' : port === 465
  return { host, port, secure, user, pass }
}

let cachedTransport: nodemailer.Transporter | null = null

function getTransport(): nodemailer.Transporter {
  if (!cachedTransport) {
    const cfg = readSmtpConfig()
    cachedTransport = nodemailer.createTransport({
      host: cfg.host,
      port: cfg.port,
      secure: cfg.secure,
      auth: { user: cfg.user, pass: cfg.pass },
    })
  }
  return cachedTransport
}

/** Sends the lead notification email via SMTP. Throws if SMTP is not configured or the send fails. */
export async function sendLeadNotification(lead: LeadInput) {
  const email = buildLeadEmail(lead)
  return getTransport().sendMail(email)
}
