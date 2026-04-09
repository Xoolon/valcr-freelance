import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Check, Zap } from 'lucide-react'
import { SEOHead } from '@/components/SEOHead'
import { useAuthStore } from '@/store'

const API = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1'

const PLANS = [
  {
    name: 'Free', price: '$0', period: 'forever', plan: 'free',
    tagline: 'All 10 calculators, always free.',
    color: '#7070A0', highlighted: false,
    features: [
      'All 10 freelance calculators',
      'Instant results, no account needed',
      'Mobile-friendly on all devices',
      'FAQ explanations with every result',
    ],
    cta: 'Start calculating',
  },
  {
    name: 'Pro', price: '$9', period: '/month', plan: 'pro',
    tagline: 'Benchmarks, saves, and PDF exports.',
    color: '#C8FF57', highlighted: true,
    features: [
      'Everything in Free',
      'Percentile benchmarks vs peers',
      'Benchmark source transparency',
      'Save unlimited calculations',
      'PDF export of results',
      'Scenario comparison (up to 5)',
      'Priority email support',
    ],
    cta: 'Get Pro',
  },
  {
    name: 'Teams', price: '$29', period: '/month', plan: 'teams',
    tagline: 'For agencies and small teams.',
    color: '#57C8FF', highlighted: false,
    features: [
      'Everything in Pro',
      'Up to 5 team members',
      'Shared saved calculations',
      'Team benchmark aggregation',
      'Admin dashboard',
      'Priority support',
    ],
    cta: 'Get Teams',
  },
]

export function PricingPage() {
  const { isAuthenticated, token } = useAuthStore()
  const navigate = useNavigate()
  const [loading, setLoading] = useState<string|null>(null)
  const [error, setError] = useState<string|null>(null)

  const handleClick = async (plan: string) => {
    if (plan === 'free') { navigate('/calculators'); return }
    if (!isAuthenticated) { navigate(`/signup?plan=${plan}`); return }
    setLoading(plan); setError(null)
    try {
      const res = await fetch(`${API}/payments/subscribe`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ plan, with_trial: false }),
      })
      const data = await res.json()
      if (!res.ok) { setLoading(null); setError(data.detail || 'Could not start checkout'); return }
      window.location.href = data.authorization_url
    } catch (e: any) { setLoading(null); setError(e.message || 'Error') }
  }

  return (
    <>
      <SEOHead title="Pricing — Valcr Freelance" description="Free forever for all 10 calculators. Pro unlocks benchmarks, saved calculations, and PDF exports at $9/month." canonicalPath="/pricing" />
      <div className="pt-28 pb-20 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <span className="section-tag mb-4 inline-flex">Simple pricing</span>
            <h1 className="font-display font-bold text-5xl text-ink-50 mb-4">Free forever. Pro when you're ready.</h1>
            <p className="text-ink-300 text-xl max-w-xl mx-auto">All calculators are free. Pro adds the benchmark context that turns your number into a decision.</p>
          </div>
          {error && <div className="mb-6 px-4 py-3 bg-red-500/10 border border-red-500/30 text-red-400 text-sm rounded-xl max-w-md mx-auto">{error}</div>}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
            {PLANS.map(plan => (
              <div key={plan.name} className={`card p-8 relative flex flex-col ${plan.highlighted ? 'border-acid/40' : ''}`}>
                {plan.highlighted && (
                  <>
                    <div className="absolute top-0 left-0 right-0 h-0.5 bg-acid rounded-t-2xl" />
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-acid text-ink-950 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest">Most popular</div>
                  </>
                )}
                <div className="mb-6">
                  <h2 className="font-display font-bold text-ink-50 text-xl mb-1">{plan.name}</h2>
                  <p className="text-ink-500 text-sm mb-4">{plan.tagline}</p>
                  <div className="flex items-end gap-1">
                    <span className="font-display font-bold text-4xl" style={{ color: plan.color }}>{plan.price}</span>
                    <span className="text-ink-500 text-sm mb-1.5">{plan.period}</span>
                  </div>
                </div>
                <ul className="space-y-2.5 mb-8 flex-1">
                  {plan.features.map(f => (
                    <li key={f} className="flex items-start gap-2.5 text-sm">
                      <Check className="w-4 h-4 shrink-0 mt-0.5" style={{ color: plan.color }} />
                      <span className="text-ink-200">{f}</span>
                    </li>
                  ))}
                </ul>
                <button onClick={() => handleClick(plan.plan)} disabled={!!loading}
                  className={`w-full justify-center ${plan.highlighted ? 'btn-primary' : 'btn-secondary'}`}>
                  {loading === plan.plan ? 'Loading...' : plan.cta}
                </button>
              </div>
            ))}
          </div>
          <div className="card p-5 text-center border-ink-700 max-w-2xl mx-auto">
            <p className="text-ink-400 text-sm">
              A single Pro subscription covers both <a href="https://valcr.site" className="text-acid hover:underline" target="_blank" rel="noopener noreferrer">valcr.site</a> (e-commerce) and Valcr Freelance. One account, everything unlocked.
            </p>
          </div>
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
            {[
              { icon: '🔒', title: 'No credit card required', desc: 'Start with free calculators instantly.' },
              { icon: '⚡', title: 'Cancel any time', desc: 'No lock-in. Cancel in one click.' },
              { icon: '🌐', title: 'Works everywhere', desc: 'Desktop, tablet, and mobile.' },
            ].map(item => (
              <div key={item.title} className="card p-5">
                <div className="text-2xl mb-2">{item.icon}</div>
                <h3 className="font-display font-bold text-ink-100 text-sm mb-1">{item.title}</h3>
                <p className="text-ink-500 text-xs">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
