import { useState, type FormEvent } from 'react'
import { validateWaitlist, type ValidationResult } from '../lib/validation'

export function WaitlistForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [errors, setErrors] = useState<ValidationResult['errors']>({})
  const [submitted, setSubmitted] = useState<{ name: string; email: string } | null>(null)

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const result = validateWaitlist({ name, email })
    if (!result.valid) {
      setErrors(result.errors)
      return
    }
    setErrors({})
    setSubmitted({ name: name.trim(), email: email.trim() })
  }

  if (submitted) {
    return (
      <div className="card waitlist" role="status">
        <div className="waitlist-success">
          <span className="waitlist-check" aria-hidden="true">
            ✓
          </span>
          <h3>You're on the list, {submitted.name.split(' ')[0]}!</h3>
          <p className="muted">
            We'll reach out to <strong>{submitted.email}</strong> as soon as your VigerCloud
            workspace is ready.
          </p>
          <button
            type="button"
            className="btn btn-ghost"
            onClick={() => {
              setSubmitted(null)
              setName('')
              setEmail('')
            }}
          >
            Add another teammate
          </button>
        </div>
      </div>
    )
  }

  return (
    <form className="card waitlist" onSubmit={handleSubmit} noValidate>
      <h3>Join the early access waitlist</h3>
      <p className="muted">Deploy your first service in minutes. No credit card required.</p>

      <label className="field">
        <span>Name</span>
        <input
          type="text"
          name="name"
          value={name}
          placeholder="Ada Lovelace"
          onChange={(e) => setName(e.target.value)}
          aria-invalid={Boolean(errors.name)}
        />
        {errors.name && <span className="error">{errors.name}</span>}
      </label>

      <label className="field">
        <span>Work email</span>
        <input
          type="email"
          name="email"
          value={email}
          placeholder="you@company.com"
          onChange={(e) => setEmail(e.target.value)}
          aria-invalid={Boolean(errors.email)}
        />
        {errors.email && <span className="error">{errors.email}</span>}
      </label>

      <button type="submit" className="btn btn-primary">
        Request access
      </button>
    </form>
  )
}
