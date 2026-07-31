import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { WaitlistForm } from './WaitlistForm'

describe('WaitlistForm', () => {
  it('shows validation errors when submitted empty', async () => {
    const user = userEvent.setup()
    render(<WaitlistForm />)

    await user.click(screen.getByRole('button', { name: /request access/i }))

    expect(screen.getByText(/please enter your name/i)).toBeInTheDocument()
    expect(screen.getByText(/please enter your email/i)).toBeInTheDocument()
  })

  it('confirms signup with a valid name and email', async () => {
    const user = userEvent.setup()
    render(<WaitlistForm />)

    await user.type(screen.getByPlaceholderText(/ada lovelace/i), 'Grace Hopper')
    await user.type(screen.getByPlaceholderText(/you@company.com/i), 'grace@viger.cloud')
    await user.click(screen.getByRole('button', { name: /request access/i }))

    expect(screen.getByRole('status')).toHaveTextContent(/you're on the list, grace/i)
    expect(screen.getByText(/grace@viger.cloud/i)).toBeInTheDocument()
  })
})
