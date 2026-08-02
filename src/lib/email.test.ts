import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

const { mockSendMail, mockCreateTransport } = vi.hoisted(() => {
  const mockSendMail = vi.fn().mockResolvedValue({ messageId: 'test' })
  return {
    mockSendMail,
    mockCreateTransport: vi.fn(() => ({ sendMail: mockSendMail })),
  }
})

vi.mock('nodemailer', () => ({
  default: { createTransport: mockCreateTransport },
}))

import { buildLeadEmail, getNotificationRecipient, sendLeadNotification } from './email'
import type { LeadInput } from './leadSchema'

const lead: LeadInput = {
  routeType: 'trial',
  name: 'Grace Hopper',
  email: 'grace@example.com',
  organisation: 'Navy',
  message: 'Interested in a trial.',
  consent: true,
  source: { page: '/pricing', utm_source: 'newsletter' },
}

const SMTP_KEYS = ['SMTP_HOST', 'SMTP_USER', 'SMTP_PASS', 'SMTP_PORT', 'SMTP_SECURE', 'LEAD_NOTIFICATION_EMAIL', 'LEAD_FROM_EMAIL']

beforeEach(() => {
  vi.clearAllMocks()
  for (const k of SMTP_KEYS) delete process.env[k]
})

afterEach(() => {
  for (const k of SMTP_KEYS) delete process.env[k]
})

describe('buildLeadEmail', () => {
  it('routes to support@vigercloud.com by default', () => {
    expect(buildLeadEmail(lead).to).toBe('support@vigercloud.com')
    expect(getNotificationRecipient()).toBe('support@vigercloud.com')
  })

  it('sets reply-to to the enquirer and includes their details', () => {
    const email = buildLeadEmail(lead)
    expect(email.replyTo).toBe('grace@example.com')
    expect(email.subject).toContain('Grace Hopper')
    expect(email.text).toContain('grace@example.com')
    expect(email.text).toContain('Interested in a trial.')
    expect(email.text).toContain('/pricing')
  })

  it('honours LEAD_NOTIFICATION_EMAIL override', () => {
    process.env.LEAD_NOTIFICATION_EMAIL = 'leads@vigercloud.com'
    expect(buildLeadEmail(lead).to).toBe('leads@vigercloud.com')
  })
})

describe('sendLeadNotification', () => {
  it('throws when SMTP is not configured', async () => {
    await expect(sendLeadNotification(lead)).rejects.toThrow(/SMTP is not configured/)
    expect(mockSendMail).not.toHaveBeenCalled()
  })

  it('sends via SMTP to the support inbox when configured', async () => {
    process.env.SMTP_HOST = 'smtp.hostinger.com'
    process.env.SMTP_USER = 'support@vigercloud.com'
    process.env.SMTP_PASS = 'secret'

    await sendLeadNotification(lead)

    expect(mockCreateTransport).toHaveBeenCalledWith(
      expect.objectContaining({ host: 'smtp.hostinger.com', port: 465, secure: true }),
    )
    expect(mockSendMail).toHaveBeenCalledTimes(1)
    expect(mockSendMail).toHaveBeenCalledWith(
      expect.objectContaining({ to: 'support@vigercloud.com', replyTo: 'grace@example.com' }),
    )
  })
})
