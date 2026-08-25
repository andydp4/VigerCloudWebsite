'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import type { PricingPlan } from '@/content/types'
import { track } from '@/lib/analytics'

type Cycle = 'monthly' | 'annual'

function priceLabel(plan: PricingPlan, cycle: Cycle) {
  const value = cycle === 'monthly' ? plan.monthly : plan.annualTotal
  if (value == null) return 'Let’s talk'
  return `£${value.toLocaleString('en-GB')}`
}

interface PricingTableProps {
  plans: PricingPlan[]
}

export function PricingTable({ plans }: PricingTableProps) {
  const [cycle, setCycle] = useState<Cycle>('monthly')

  useEffect(() => {
    track({ name: 'pricing_view' })
  }, [])

  function changeCycle(next: Cycle) {
    setCycle(next)
    track({ name: 'billing_cycle_change', cycle: next })
  }

  return (
    <div>
      <div
        className="billing-toggle"
        role="group"
        aria-label="Billing cycle"
        style={{ marginTop: 'var(--space-5)' }}
      >
        <button type="button" aria-pressed={cycle === 'monthly'} onClick={() => changeCycle('monthly')}>
          Monthly
        </button>
        <button type="button" aria-pressed={cycle === 'annual'} onClick={() => changeCycle('annual')}>
          Annual
        </button>
      </div>
      <p className="hint" style={{ marginTop: 'var(--space-2)' }}>
        All prices exclude VAT. Annual plans provide twelve months of access for the cost of ten.
      </p>

      <div className="plan-grid">
        {plans.map((plan) => (
          <div className="plan" key={plan.id}>
            <div>
              <strong>{plan.name}</strong>
              <p className="muted" style={{ margin: '2px 0 0', fontSize: 'var(--step--1)' }}>
                {plan.audience}
              </p>
            </div>
            <div className="plan__price">
              {priceLabel(plan, cycle)}
              <small> {cycle === 'monthly' ? '/month' : '/year'}</small>
            </div>
            <ul>
              <li>{plan.users === '1' ? '1 user' : `${plan.users} users`}</li>
            </ul>
            <Link
              className={plan.ctaRoute === 'trial' ? 'btn btn--primary' : 'btn btn--ghost'}
              href={`/contact?route=${plan.ctaRoute}`}
              onClick={() => track({ name: 'plan_select', plan: plan.id })}
            >
              {plan.ctaLabel}
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}
