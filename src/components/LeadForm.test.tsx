import { afterEach, describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { LeadForm } from './LeadForm'

// Mock Next.js navigation hooks used by the form.
vi.mock('next/navigation', () => ({
  useSearchParams: () => new URLSearchParams(''),
  usePathname: () => '/contact',
}))

afterEach(() => {
  vi.restoreAllMocks()
})

describe('LeadForm', () => {
  it('shows validation errors when submitted empty', async () => {
    const user = userEvent.setup()
    render(<LeadForm />)

    await user.click(screen.getByRole('button', { name: /submit enquiry/i }))

    expect(screen.getByText(/please enter your name/i)).toBeInTheDocument()
    expect(screen.getByText(/please enter your email/i)).toBeInTheDocument()
    expect(screen.getByText(/please agree to be contacted/i)).toBeInTheDocument()
  })

  it('submits successfully and shows confirmation', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ ok: true, mode: 'test', routeType: 'general' }),
    })
    vi.stubGlobal('fetch', fetchMock)

    const user = userEvent.setup()
    render(<LeadForm />)

    await user.type(screen.getByLabelText(/^name$/i), 'Grace Hopper')
    await user.type(screen.getByLabelText(/work email/i), 'grace@viger.cloud')
    await user.click(screen.getByLabelText(/agree to be contacted/i))
    await user.click(screen.getByRole('button', { name: /submit enquiry/i }))

    expect(fetchMock).toHaveBeenCalledWith('/api/lead', expect.objectContaining({ method: 'POST' }))
    expect(await screen.findByRole('status')).toHaveTextContent(/request is in/i)
    expect(screen.getByText(/grace@viger.cloud/i)).toBeInTheDocument()
  })
})
