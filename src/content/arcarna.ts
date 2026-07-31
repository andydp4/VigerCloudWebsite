import type { FeatureChapter } from './types'

// Arcarna feature chapters (Brief 04). Each states the business RESULT before the mechanism.
// Copy is placeholder/assumption pending real product content from Viger.
export const arcarnaChapters: FeatureChapter[] = [
  {
    id: 'sell',
    label: 'Sell',
    result: 'Close more of the right deals with less manual chasing.',
    mechanism:
      'A shared pipeline highlights the opportunities most likely to move, and drafts the next step for each one.',
    sourceStatus: 'placeholder',
  },
  {
    id: 'understand',
    label: 'Understand',
    result: 'Know what is really happening across the business at a glance.',
    mechanism:
      'Live views connect activity, revenue and customer health so teams stop reconciling spreadsheets.',
    sourceStatus: 'placeholder',
  },
  {
    id: 'control',
    label: 'Control',
    result: 'Keep spend, access and risk inside deliberate limits.',
    mechanism:
      'Role-based controls and clear audit trails make it obvious who changed what, and when.',
    sourceStatus: 'placeholder',
  },
  {
    id: 'act',
    label: 'Act',
    result: 'Turn insight into action without switching tools.',
    mechanism:
      'Recommended actions can be approved and executed in place, then tracked to an outcome.',
    sourceStatus: 'placeholder',
  },
  {
    id: 'grow',
    label: 'Grow',
    result: 'Repeat what works and expand with confidence.',
    mechanism:
      'Cohort and trend views show which motions compound, so you can invest where returns are proven.',
    sourceStatus: 'placeholder',
  },
]

export interface ArcarnaScene {
  id: string
  kicker: string
  title: string
  body: string
}

// Narrative scenes for the scroll experience (Reveal, Problem, Question -> Truth -> Action).
export const arcarnaScenes: ArcarnaScene[] = [
  {
    id: 'reveal',
    kicker: 'Arcarna',
    title: 'The clarity layer for your business',
    body: 'One connected place to sell, understand, control, act and grow.',
  },
  {
    id: 'problem',
    kicker: 'The problem',
    title: 'Work is scattered across too many tools',
    body: 'Decisions wait on exports, and context is lost between apps.',
  },
  {
    id: 'question',
    kicker: 'The question',
    title: 'What if the answer was already in front of you?',
    body: 'Not another dashboard to check — a clear next step you can trust.',
  },
  {
    id: 'truth',
    kicker: 'The truth',
    title: 'Your data already knows the shape of the day',
    body: 'Arcarna connects it, explains it, and keeps the reasoning visible.',
  },
  {
    id: 'action',
    kicker: 'The action',
    title: 'Decide and act in one motion',
    body: 'Approve the recommended step and watch it through to a result.',
  },
]
