import { NextResponse } from 'next/server'
import { leadSchema, toFieldErrors } from '@/lib/leadSchema'
import { getServerEnv } from '@/lib/env'
import { sendLeadNotification } from '@/lib/email'

/**
 * Lead intake endpoint (Brief 05).
 * - Validates server-side with the shared zod schema.
 * - Honeypot + basic shape checks for spam protection.
 * - Retains consent/source/UTM in the accepted payload.
 * - Stays in TEST MODE: does not send to any external provider until Staging Gate approval.
 */
export async function POST(request: Request) {
  let json: unknown
  try {
    json = await request.json()
  } catch {
    return NextResponse.json({ ok: false, errors: { form: 'Invalid request body.' } }, { status: 400 })
  }

  const parsed = leadSchema.safeParse(json)
  if (!parsed.success) {
    return NextResponse.json({ ok: false, errors: toFieldErrors(parsed.error) }, { status: 422 })
  }

  const lead = parsed.data

  // Honeypot triggered: pretend success to not tip off bots, but drop the lead.
  if (lead.company_extra) {
    return NextResponse.json({ ok: true, mode: 'dropped' })
  }

  const { LEAD_DELIVERY_MODE } = getServerEnv()

  if (LEAD_DELIVERY_MODE === 'test') {
    // In test mode we only log server-side. No email is sent.
    // eslint-disable-next-line no-console
    console.info('[lead:test-mode]', {
      routeType: lead.routeType,
      email: lead.email,
      organisation: lead.organisation || null,
      source: lead.source ?? null,
      receivedAt: new Date().toISOString(),
    })
    return NextResponse.json({ ok: true, mode: 'test', routeType: lead.routeType })
  }

  // Live mode: email the enquiry to the support inbox (support@vigercloud.com by default).
  try {
    await sendLeadNotification(lead)
    return NextResponse.json({ ok: true, mode: 'live', routeType: lead.routeType })
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('[lead:send-failed]', error)
    return NextResponse.json(
      { ok: false, errors: { form: 'We could not send your enquiry. Please try again shortly.' } },
      { status: 502 },
    )
  }
}
