import type { PricingPlan } from './types'

// Approved Arcarna pricing (excludes VAT). Annual plans give twelve months for the cost of ten.
// Solo/Team can request a trial; Growth/Scale begin with a consultation.
export const pricingPlans: PricingPlan[] = [
  {
    id: 'solo',
    name: 'Solo',
    audience: 'One owner or operator getting started',
    users: '1',
    monthly: 150,
    annualTotal: 1500,
    ctaLabel: 'Request a Solo trial',
    ctaRoute: 'trial',
    sourceStatus: 'confirmed',
  },
  {
    id: 'team',
    name: 'Team',
    audience: 'A small team working from a shared view',
    users: 'Up to 5',
    monthly: 500,
    annualTotal: 5000,
    ctaLabel: 'Request a Team trial',
    ctaRoute: 'trial',
    sourceStatus: 'confirmed',
  },
  {
    id: 'growth',
    name: 'Growth',
    audience: 'A growing business that may need onboarding, migration and training',
    users: 'Up to 15',
    monthly: 1050,
    annualTotal: 10500,
    ctaLabel: 'Discuss the Growth plan',
    ctaRoute: 'demo',
    sourceStatus: 'confirmed',
  },
  {
    id: 'scale',
    name: 'Scale',
    audience: 'A larger or multi-location organisation with more complex requirements',
    users: 'Up to 50',
    monthly: 2500,
    annualTotal: 25000,
    ctaLabel: 'Discuss the Scale plan',
    ctaRoute: 'demo',
    sourceStatus: 'confirmed',
  },
]
