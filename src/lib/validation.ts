export interface WaitlistInput {
  name: string
  email: string
}

export interface ValidationResult {
  valid: boolean
  errors: Partial<Record<keyof WaitlistInput, string>>
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/**
 * Validates a waitlist signup submission. Kept as a pure function so it can be
 * unit-tested independently of the React component.
 */
export function validateWaitlist(input: WaitlistInput): ValidationResult {
  const errors: ValidationResult['errors'] = {}

  if (!input.name.trim()) {
    errors.name = 'Please enter your name.'
  }

  const email = input.email.trim()
  if (!email) {
    errors.email = 'Please enter your email.'
  } else if (!EMAIL_RE.test(email)) {
    errors.email = 'Please enter a valid email address.'
  }

  return { valid: Object.keys(errors).length === 0, errors }
}
