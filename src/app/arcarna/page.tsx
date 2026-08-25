import Link from 'next/link'
import type { Metadata } from 'next'
import '@/styles/arcarna.css'
import { buildMetadata } from '@/lib/metadata'
import { arcarnaMethod } from '@/content/arcarna'
import { getArcarnaChapters } from '@/lib/content'
import { Reveal } from '@/components/Reveal'

export const metadata: Metadata = buildMetadata({
  title: 'Arcarna | Retail intelligence from Viger Cloud',
  description:
    'Arcarna helps independent retailers connect sales, stock, margin and customer data, understand what is driving performance and decide what to do next.',
  path: '/arcarna',
})

export const revalidate = 60

const audiences = [
  {
    title: 'Independent shops and market traders',
    body: 'Get a clearer view without building a manual reporting process around every decision.',
  },
  {
    title: 'Growing and multi-location retailers',
    body: 'Compare performance across locations while keeping the reasons behind a change visible.',
  },
  {
    title: 'Owners and managers',
    body: 'Share one view of what needs attention and what the business is doing about it.',
  },
]

export default async function ArcarnaPage() {
  const arcarnaChapters = await getArcarnaChapters()

  return (
    <div className="arcarna" data-brand="arcarna">
      <section className="container arcarna-hero">
        <span className="arcarna-badge">Arcarna by Viger Cloud</span>
        <h1>Reveal Your Truth.</h1>
        <p className="lede" style={{ color: 'var(--brand-fg-muted)', marginTop: 'var(--space-4)' }}>
          Your business already holds the evidence. Every sale, stock movement, customer visit and
          change in cost tells part of its story. Arcarna brings those signals together so you can
          reveal what is happening, understand why and decide what to do next.
        </p>
        <div className="cta-row">
          <Link className="btn btn--primary" href="/contact?route=trial">
            Request a trial
          </Link>
          <Link className="btn btn--ghost" href="/contact?route=demo">
            Book a demonstration
          </Link>
        </div>
      </section>

      <section className="scene">
        <div className="container">
          <Reveal chapter="problem">
            <p className="scene__kicker">The problem</p>
            <h2>Most systems record what happened. They do not explain why.</h2>
            <p>
              Your till records the sale. Your stock system records the movement. Your accounts show
              the result. But the questions that matter often sit between them.
            </p>
            <p>
              Where is margin leaking? Which products bring customers back? What changed this week?
              Which issue needs attention first?
            </p>
            <p>
              Answering those questions can mean exports, spreadsheets and hours of manual comparison.
              By the time the picture is clear, the opportunity to act may already have passed.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="scene">
        <div className="container">
          <Reveal>
            <p className="scene__kicker">Reveal Your Truth</p>
            <h2>Question. Truth. Action.</h2>
          </Reveal>
          <div className="chapters" style={{ marginTop: 'var(--space-5)' }}>
            {arcarnaMethod.map((step) => (
              <Reveal key={step.id} chapter={`method-${step.id}`}>
                <article className="chapter">
                  <div className="chapter__label">{step.kicker}</div>
                  <div>
                    <p className="chapter__result">{step.title}</p>
                    <p className="chapter__mechanism">{step.body}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <p style={{ marginTop: 'var(--space-5)' }}>
              Arcarna does not impose a generic answer on the business; it helps the operator reveal
              their own commercial truth from their own evidence.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="scene">
        <div className="container">
          <Reveal>
            <p className="scene__kicker">Feature chapters</p>
            <h2>Explore the truth your business already holds</h2>
          </Reveal>
          <div className="chapters">
            {arcarnaChapters.map((chapter) => (
              <Reveal key={chapter.id} chapter={`chapter-${chapter.id}`}>
                <article className="chapter">
                  <div className="chapter__label">{chapter.label}</div>
                  <div>
                    <p className="chapter__question">Truth to reveal: {chapter.question}</p>
                    <p className="chapter__result">{chapter.heading}</p>
                    <p className="chapter__mechanism">{chapter.body}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="scene">
        <div className="container">
          <Reveal>
            <p className="scene__kicker">Who it is for</p>
            <h2>Built for independent retail</h2>
          </Reveal>
          <div className="chapters" style={{ marginTop: 'var(--space-5)' }}>
            {audiences.map((a) => (
              <Reveal key={a.title}>
                <article className="chapter">
                  <div className="chapter__label" style={{ fontSize: 'var(--step-1)' }}>
                    {a.title}
                  </div>
                  <div>
                    <p className="chapter__mechanism">{a.body}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="scene">
        <div className="container">
          <Reveal>
            <p className="scene__kicker">Product status and proof</p>
            <h2>Judge Arcarna by what it shows you</h2>
            <p>
              Arcarna is in beta. Rather than use customer logos, performance figures or testimonials
              before permission and evidence are recorded, we invite you to evaluate it directly:
            </p>
            <ul style={{ color: 'var(--brand-fg-muted)', maxWidth: '52ch' }}>
              <li>connect or provide an agreed sample of business data;</li>
              <li>choose one or two meaningful operating questions;</li>
              <li>review the evidence and explanation Arcarna produces;</li>
              <li>agree whether the result is useful enough to continue.</li>
            </ul>
          </Reveal>
        </div>
      </section>

      <section className="container">
        <div className="arcarna-cta">
          <Reveal>
            <p className="scene__kicker">Reveal Your Truth</p>
            <h2 style={{ fontSize: 'var(--step-3)' }}>
              Bring us the question your business needs answered
            </h2>
            <p style={{ marginInline: 'auto' }}>
              Book a demonstration built around your type of business, or request a trial to reveal
              what Arcarna can help you understand from agreed data with support from the Viger Cloud
              team.
            </p>
            <div className="cta-row" style={{ justifyContent: 'center' }}>
              <Link className="btn btn--primary" href="/contact?route=trial">
                Request an Arcarna trial
              </Link>
              <Link className="btn btn--ghost" href="/contact?route=demo">
                Book a demonstration
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  )
}
