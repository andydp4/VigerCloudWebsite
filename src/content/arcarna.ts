import type { FeatureChapter } from './types'

// Arcarna feature chapters (Brief 04). Each begins with a "truth to reveal" — a real retail
// question — then the heading and a plain-English explanation. Kept commercially specific.
export const arcarnaChapters: FeatureChapter[] = [
  {
    id: 'sell',
    label: 'Sell',
    question: 'Where is the next worthwhile sale?',
    heading: 'Put attention behind the sales that matter',
    body: 'See which opportunities, customers or product lines deserve attention instead of treating every signal as equally urgent. Arcarna helps you focus follow-up where the evidence suggests it can make a difference.',
    sourceStatus: 'confirmed',
  },
  {
    id: 'understand',
    label: 'Understand',
    question: 'What is really shaping performance?',
    heading: 'See the business more clearly',
    body: 'Bring sales, products, stock, customers, locations and costs into a more useful view. Compare what changed, trace the likely drivers and spend less time reconciling separate reports.',
    sourceStatus: 'confirmed',
  },
  {
    id: 'control',
    label: 'Control',
    question: 'Where are margin, stock or risk moving outside your limits?',
    heading: 'Keep the important measures within view',
    body: 'Monitor the areas that protect the health of the business: margin, stock exposure, access, operational exceptions and agreed limits. Clear history helps you understand what changed and who acted.',
    sourceStatus: 'confirmed',
  },
  {
    id: 'act',
    label: 'Act',
    question: 'What needs to happen next?',
    heading: 'Move from truth to a practical next step',
    body: 'Turn a useful finding into assigned, trackable work without losing the evidence behind it. The aim is not simply to create more alerts; it is to help the right person respond and see whether the action worked.',
    sourceStatus: 'confirmed',
  },
  {
    id: 'grow',
    label: 'Grow',
    question: 'What is genuinely worth repeating?',
    heading: 'Grow from what the evidence proves',
    body: 'Identify the products, customers, locations and operating choices that contribute to stronger performance. Use trends and comparisons to invest attention where the evidence is most persuasive.',
    sourceStatus: 'confirmed',
  },
]

export interface ArcarnaScene {
  id: string
  kicker: string
  title: string
  body: string
}

// Narrative method scenes: Question -> Truth -> Action.
export const arcarnaMethod: ArcarnaScene[] = [
  {
    id: 'question',
    kicker: 'Question',
    title: 'Start with the commercial question, not the report',
    body: 'Ask what is driving a change, where value is being lost or what deserves attention.',
  },
  {
    id: 'truth',
    kicker: 'Truth',
    title: 'See the evidence and the reasoning behind it',
    body: 'Arcarna connects the relevant evidence and explains the pattern it sees. Sources and reasoning stay visible so you can judge the answer for yourself.',
  },
  {
    id: 'action',
    kicker: 'Action',
    title: 'Turn understanding into a clear next step',
    body: 'Decide what to change, who should act and what result to watch.',
  },
]
