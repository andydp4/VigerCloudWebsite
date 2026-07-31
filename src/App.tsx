import { WaitlistForm } from './components/WaitlistForm'
import './App.css'

const features = [
  {
    title: 'Deploy in seconds',
    body: 'Push to git and VigerCloud builds, ships, and scales your service automatically.',
    icon: '🚀',
  },
  {
    title: 'Global edge network',
    body: 'Serve users from 30+ regions with automatic routing to the closest healthy node.',
    icon: '🌍',
  },
  {
    title: 'Secure by default',
    body: 'Managed TLS, isolated workloads, and secrets encrypted at rest and in transit.',
    icon: '🔒',
  },
  {
    title: 'Usage-based pricing',
    body: 'Only pay for what you run. Scale to zero when idle, burst when traffic spikes.',
    icon: '📈',
  },
]

const stats = [
  { value: '99.99%', label: 'Uptime SLA' },
  { value: '30+', label: 'Edge regions' },
  { value: '<50ms', label: 'p95 latency' },
]

function App() {
  return (
    <div className="page">
      <header className="nav">
        <a className="brand" href="#top">
          <span className="brand-mark" aria-hidden="true" />
          VigerCloud
        </a>
        <nav className="nav-links">
          <a href="#features">Features</a>
          <a href="#stats">Platform</a>
          <a href="#waitlist">Get started</a>
        </nav>
      </header>

      <main>
        <section className="hero" id="top">
          <span className="pill">Now in early access</span>
          <h1>
            Ship cloud services <span className="grad">without the ops</span>
          </h1>
          <p className="lede">
            VigerCloud is the developer platform for building, deploying, and scaling
            applications on a global edge network — from your first prototype to millions of
            requests.
          </p>
          <div className="cta-row">
            <a className="btn btn-primary" href="#waitlist">
              Request early access
            </a>
            <a className="btn btn-ghost" href="#features">
              Explore features
            </a>
          </div>
        </section>

        <section className="stats" id="stats">
          {stats.map((s) => (
            <div className="stat" key={s.label}>
              <div className="stat-value">{s.value}</div>
              <div className="muted">{s.label}</div>
            </div>
          ))}
        </section>

        <section className="features" id="features">
          <h2>Everything you need to run in production</h2>
          <div className="feature-grid">
            {features.map((f) => (
              <article className="card feature" key={f.title}>
                <div className="feature-icon" aria-hidden="true">
                  {f.icon}
                </div>
                <h3>{f.title}</h3>
                <p className="muted">{f.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="waitlist-section" id="waitlist">
          <WaitlistForm />
        </section>
      </main>

      <footer className="footer">
        <span>© {new Date().getFullYear()} VigerCloud. All rights reserved.</span>
        <span className="muted">Built with Vite + React + TypeScript.</span>
      </footer>
    </div>
  )
}

export default App
