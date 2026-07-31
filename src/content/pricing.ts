import type { ComparisonRow, PricingPlan } from './types'

// PLACEHOLDER PRICING. Figures below are illustrative and are NOT approved for publication.
// Real monthly/annual figures and entitlements are BLOCKED pending confirmation (Briefs 00, 05).
// All prices EXCLUDE VAT (Brief 05).
export const pricingPlans: PricingPlan[] = [
  {
    id: 'solo',
    name: 'Solo',
    audience: 'Individuals getting started',
    monthly: 19,
    annual: 15,
    highlights: ['1 workspace member', 'Core Sell + Understand', 'Community support'],
    consultationOnly: false,
    sourceStatus: 'placeholder',
  },
  {
    id: 'team',
    name: 'Team',
    audience: 'Small teams working together',
    monthly: 49,
    annual: 39,
    highlights: ['Up to 10 members', 'Adds Control + Act', 'Email support'],
    consultationOnly: false,
    sourceStatus: 'placeholder',
  },
  {
    id: 'growth',
    name: 'Growth',
    audience: 'Scaling organisations',
    monthly: 129,
    annual: 109,
    highlights: ['Up to 50 members', 'Adds Grow analytics', 'Priority support'],
    consultationOnly: false,
    sourceStatus: 'placeholder',
  },
  {
    id: 'scale',
    name: 'Scale',
    audience: 'Larger, regulated organisations',
    monthly: null,
    annual: null,
    highlights: ['Unlimited members', 'Advanced governance', 'Consultation & onboarding'],
    consultationOnly: true,
    sourceStatus: 'placeholder',
  },
]

export const comparisonRows: ComparisonRow[] = [
  {
    capability: 'Workspace members',
    values: { solo: '1', team: 'Up to 10', growth: 'Up to 50', scale: 'Unlimited' },
    sourceStatus: 'placeholder',
  },
  {
    capability: 'Sell + Understand',
    values: { solo: true, team: true, growth: true, scale: true },
    sourceStatus: 'placeholder',
  },
  {
    capability: 'Control + Act',
    values: { solo: false, team: true, growth: true, scale: true },
    sourceStatus: 'placeholder',
  },
  {
    capability: 'Grow analytics',
    values: { solo: false, team: false, growth: true, scale: true },
    sourceStatus: 'placeholder',
  },
  {
    capability: 'Advanced governance & audit',
    values: { solo: false, team: false, growth: false, scale: true },
    sourceStatus: 'placeholder',
  },
  {
    capability: 'Support',
    values: { solo: 'Community', team: 'Email', growth: 'Priority', scale: 'Dedicated' },
    sourceStatus: 'placeholder',
  },
]
