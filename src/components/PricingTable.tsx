'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import type { ComparisonRow, PricingPlan } from '@/content/types'
import { track } from '@/lib/analytics'

type Cycle = 'monthly' | 'annual'

function priceLabel(plan: PricingPlan, cycle: Cycle) {
  if (plan.consultationOnly) return 'Let’s talk'
  const value = cycle === 'monthly' ? plan.monthly : plan.annual
  if (value == null) return 'Let’s talk'
  return `£${value}`
}

interface PricingTableProps {
  plans: PricingPlan[]
  rows: ComparisonRow[]
}

export function PricingTable({ plans: pricingPlans, rows: comparisonRows }: PricingTableProps) {
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
        All prices exclude VAT. Figures are illustrative placeholders and not yet approved.
      </p>

      <div className="plan-grid">
        {pricingPlans.map((plan) => (
          <div className="plan" key={plan.id}>
            <div>
              <strong>{plan.name}</strong>
              <p className="muted" style={{ margin: '2px 0 0', fontSize: 'var(--step--1)' }}>
                {plan.audience}
              </p>
            </div>
            <div className="plan__price">
              {priceLabel(plan, cycle)}
              {!plan.consultationOnly && (
                <small> /user/mo{cycle === 'annual' ? ', billed annually' : ''}</small>
              )}
            </div>
            <ul>
              {plan.highlights.map((h) => (
                <li key={h}>{h}</li>
              ))}
            </ul>
            {plan.consultationOnly ? (
              <Link
                className="btn btn--ghost"
                href="/contact?route=pricing"
                onClick={() => track({ name: 'plan_select', plan: plan.id })}
              >
                Request a consultation
              </Link>
            ) : (
              <Link
                className="btn btn--primary"
                href="/contact?route=trial"
                onClick={() => track({ name: 'plan_select', plan: plan.id })}
              >
                Start free trial
              </Link>
            )}
          </div>
        ))}
      </div>

      <div className="compare-scroll">
        <table className="compare">
          <caption className="hint" style={{ textAlign: 'left', marginBottom: 'var(--space-2)' }}>
            Plan comparison (placeholder entitlements)
          </caption>
          <thead>
            <tr>
              <th scope="col">Capability</th>
              {pricingPlans.map((p) => (
                <th scope="col" key={p.id}>
                  {p.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {comparisonRows.map((row) => (
              <tr key={row.capability}>
                <th scope="row" style={{ fontWeight: 600 }}>
                  {row.capability}
                </th>
                {pricingPlans.map((p) => {
                  const value = row.values[p.id]
                  if (typeof value === 'boolean') {
                    return <td key={p.id} data-yes={value} aria-label={value ? 'Included' : 'Not included'} />
                  }
                  return <td key={p.id}>{value}</td>
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
