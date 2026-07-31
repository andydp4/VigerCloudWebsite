import { describe, expect, it } from 'vitest'
import { validateWaitlist } from './validation'

describe('validateWaitlist', () => {
  it('accepts a valid name and email', () => {
    const result = validateWaitlist({ name: 'Ada Lovelace', email: 'ada@viger.cloud' })
    expect(result.valid).toBe(true)
    expect(result.errors).toEqual({})
  })

  it('rejects an empty name', () => {
    const result = validateWaitlist({ name: '   ', email: 'ada@viger.cloud' })
    expect(result.valid).toBe(false)
    expect(result.errors.name).toBeDefined()
  })

  it('rejects a missing email', () => {
    const result = validateWaitlist({ name: 'Ada', email: '' })
    expect(result.valid).toBe(false)
    expect(result.errors.email).toBeDefined()
  })

  it('rejects a malformed email', () => {
    const result = validateWaitlist({ name: 'Ada', email: 'not-an-email' })
    expect(result.valid).toBe(false)
    expect(result.errors.email).toBe('Please enter a valid email address.')
  })
})
