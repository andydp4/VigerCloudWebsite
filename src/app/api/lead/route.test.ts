import { describe, expect, it } from 'vitest'
import { POST } from './route'

function post(body: unknown) {
  return POST(
    new Request('http://localhost/api/lead', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    }),
  )
}

const validLead = {
  routeType: 'trial',
  name: 'Grace Hopper',
  email: 'grace@viger.cloud',
  consent: true,
  company_extra: '',
}

describe('POST /api/lead', () => {
  it('accepts a valid lead in test mode', async () => {
    const res = await post(validLead)
    expect(res.status).toBe(200)
    const json = await res.json()
    expect(json.ok).toBe(true)
    expect(json.mode).toBe('test')
    expect(json.routeType).toBe('trial')
  })

  it('rejects an invalid lead with 422 and field errors', async () => {
    const res = await post({ ...validLead, email: 'bad', consent: false })
    expect(res.status).toBe(422)
    const json = await res.json()
    expect(json.ok).toBe(false)
    expect(json.errors.email).toBeDefined()
    expect(json.errors.consent).toBeDefined()
  })

  it('silently drops a honeypot-triggered submission', async () => {
    const res = await post({ ...validLead, company_extra: 'I am a bot' })
    // Honeypot filled => looks successful to the bot, but is dropped (not delivered).
    expect(res.status).toBe(200)
    const json = await res.json()
    expect(json.ok).toBe(true)
    expect(json.mode).toBe('dropped')
  })
})
