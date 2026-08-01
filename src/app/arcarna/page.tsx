import Link from 'next/link'
import type { Metadata } from 'next'
import '@/styles/arcarna.css'
import { buildMetadata } from '@/lib/metadata'
import { arcarnaScenes } from '@/content/arcarna'
import { getArcarnaChapters, getPricingPlans } from '@/lib/content'
import { Reveal } from '@/components/Reveal'
import { StatusBadge } from '@/components/StatusBadge'

export const metadata: Metadata = buildMetadata({
  title: 'Arcarna',
  description:
    'Arcarna by Viger Cloud — sell, understand, control, act and grow in one connected place. A premium, accessible product story.',
  path: '/arcarna',
})

export const revalidate = 60

export default async function ArcarnaPage() {
  const [arcarnaChapters, pricingPlans] = await Promise.all([
    getArcarnaChapters(),
    getPricingPlans(),
  ])
  const entryPlan = pricingPlans[0]

  return (
    <div className="arcarna" data-brand="arcarna">
      <section className="container arcarna-hero">
        <span className="arcarna-badge">
          Arcarna
          <StatusBadge status="placeholder" />
        </span>
        <h1>The clarity layer for your business</h1>
        <p className="lede" style={{ color: 'var(--brand-fg-muted)', marginTop: 'var(--space-4)' }}>
          One connected place to sell, understand, control, act and grow. Built to explain every
          business result before the mechanism behind it.
        </p>
        <div className="cta-row">
          <Link className="btn btn--primary" href="/contact?route=trial">
            Start free trial
          </Link>
          <Link className="btn btn--ghost" href="/contact?route=demo">
            Book a demo
          </Link>
        </div>
        <p className="motion-toggle">
          Motion is subtle and respects your system “reduced motion” setting — all content and
          actions are available with animation disabled.
        </p>
      </section>

      {arcarnaScenes.map((scene) => (
        <section className="scene" key={scene.id}>
          <div className="container">
            <Reveal chapter={scene.id}>
              <p className="scene__kicker">{scene.kicker}</p>
              <h2>{scene.title}</h2>
              <p>{scene.body}</p>
            </Reveal>
          </div>
        </section>
      ))}

      <section className="scene">
        <div className="container">
          <Reveal>
            <p className="scene__kicker">Feature chapters</p>
            <h2>Five moves, one workspace</h2>
          </Reveal>
          <div className="chapters">
            {arcarnaChapters.map((chapter) => (
              <Reveal key={chapter.id} chapter={`chapter-${chapter.id}`}>
                <article className="chapter">
                  <div className="chapter__label">{chapter.label}</div>
                  <div>
                    <p className="chapter__result">{chapter.result}</p>
                    <p className="chapter__mechanism">{chapter.mechanism}</p>
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
            <p className="scene__kicker">Proof</p>
            <h2>Honest about where we are</h2>
            <p>
              Arcarna is in beta. Rather than invent customer logos or metrics, we show clear status
              on every claim and invite you to judge it yourself in a trial.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="container">
        <div className="arcarna-cta">
          <Reveal>
            <p className="scene__kicker">Get started</p>
            <h2 style={{ fontSize: 'var(--step-3)' }}>See Arcarna with your own data</h2>
            <p style={{ marginInline: 'auto' }}>
              Plans start from an illustrative £{entryPlan.monthly}/month (excl. VAT). Pricing is not
              yet final.
            </p>
            <div className="cta-row" style={{ justifyContent: 'center' }}>
              <Link className="btn btn--primary" href="/contact?route=trial">
                Start free trial
              </Link>
              <Link className="btn btn--ghost" href="/pricing">
                Compare plans
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  )
}
