import { describe, expect, it } from 'vitest'
import { leadSchema, toFieldErrors } from './leadSchema'

const base = {
  routeType: 'trial' as const,
  name: 'Ada Lovelace',
  email: 'ada@viger.cloud',
  consent: true,
  company_extra: '' as const,
}

describe('leadSchema', () => {
  it('accepts a valid lead', () => {
    const result = leadSchema.safeParse(base)
    expect(result.success).toBe(true)
  })

  it('rejects a missing name', () => {
    const result = leadSchema.safeParse({ ...base, name: 'A' })
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(toFieldErrors(result.error).name).toBeDefined()
    }
  })

  it('rejects an invalid email', () => {
    const result = leadSchema.safeParse({ ...base, email: 'nope' })
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(toFieldErrors(result.error).email).toContain('valid email')
    }
  })

  it('requires consent to be true', () => {
    const result = leadSchema.safeParse({ ...base, consent: false })
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(toFieldErrors(result.error).consent).toBeDefined()
    }
  })

  it('rejects an unknown route type', () => {
    const result = leadSchema.safeParse({ ...base, routeType: 'unknown' })
    expect(result.success).toBe(false)
  })

  it('retains source/UTM data when provided', () => {
    const result = leadSchema.safeParse({
      ...base,
      source: { page: '/pricing', utm_source: 'newsletter' },
    })
    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.data.source?.utm_source).toBe('newsletter')
    }
  })
})
