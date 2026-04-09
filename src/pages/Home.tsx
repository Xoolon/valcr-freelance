import { Link } from 'react-router-dom'
import { ArrowRight, TrendingUp, Calculator, BarChart3, Star, Check } from 'lucide-react'
import { SEOHead } from '@/components/SEOHead'
import { FREELANCE_CALCULATORS } from '@/calculators'

const STATS = [
  { value: '10', label: 'Free calculators' },
  { value: '60%', label: 'Avg non-billable time' },
  { value: '$0', label: 'Forever free' },
  { value: '30s', label: 'Time to your answer' },
]

const PROBLEMS = [
  ['Non-billable time', '40% of your hours go to admin, proposals, revisions, and prep — all unpaid. Most rates never account for this.'],
  ['Self-employment tax', '15.3% on top of income tax. Most freelancers discover this at the worst possible moment.'],
  ['Platform fees', 'Upwork takes 10–20%. Fiverr takes 20%. That comes out of your quoted hourly — not in addition to it.'],
  ['Slow months', 'You need to earn enough in busy months to cover the quiet ones. Most rates don\'t build this buffer in.'],
  ['Business costs', 'Software, equipment, insurance. Invisible until they aren\'t.'],
]

const HOW = [
  { icon: <Calculator className="w-5 h-5" />, title: 'Enter your real numbers', desc: 'Your actual income target, hours, tax rate, and costs. Not a template — your situation.' },
  { icon: <TrendingUp className="w-5 h-5" />, title: 'Get the honest answer', desc: 'The math most freelancers never do — accounting for taxes, non-billable time, platform fees, and business costs.' },
  { icon: <BarChart3 className="w-5 h-5" />, title: 'See how you compare', desc: 'As more operators use Valcr, real-time benchmarks surface. See where your rates and margins sit versus your peers.' },
]

export function HomePage() {
  return (
    <>
      <SEOHead
        title="Valcr Freelance — Financial Intelligence for Independent Operators"
        description="10 free financial calculators for freelancers. True hourly rate, project profit, tax reserve, client profitability, and more. Real numbers in 30 seconds. No account required."
        canonicalPath="/"
        keywords={['freelance rate calculator','freelance financial tools','freelance tax calculator','how much to charge freelancing','valcr freelance']}
      />

      {/* Hero */}
      <section className="pt-28 pb-16 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-acid/10 border border-acid/20 rounded-full px-4 py-1.5 mb-8">
            <Star className="w-3 h-3 text-acid" />
            <span className="text-xs font-mono text-acid tracking-widest uppercase">A Valcr product — valcr.site</span>
          </div>
          <h1 className="font-display font-bold text-4xl sm:text-6xl text-ink-50 leading-tight mb-6">
            Your freelance numbers.<br /><span className="text-acid">No guesswork.</span>
          </h1>
          <p className="text-ink-300 text-lg sm:text-xl max-w-2xl mx-auto mb-10">
            Most freelancers quote rates they can't sustain, take projects that lose money, and discover their tax bill at the worst possible time. Valcr Freelance closes every one of those gaps — free, in under 30 seconds.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/calculators" className="btn-primary text-base px-8 py-3">
              Start calculating <ArrowRight className="w-4 h-4" />
            </Link>
            <Link to="/calculators/fl-true-hourly-rate" className="btn-secondary text-base px-8 py-3">
              Find your true hourly rate
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-8 border-y border-ink-800 px-4">
        <div className="max-w-4xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-8">
          {STATS.map(s => (
            <div key={s.label} className="text-center">
              <div className="font-display font-bold text-3xl text-acid mb-1">{s.value}</div>
              <div className="text-ink-400 text-sm">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Problem */}
      <section className="py-20 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          <span className="section-tag mb-6 inline-flex">The problem</span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-ink-50 mb-6">
            You charge $75/hour.<br />You're netting $31.
          </h2>
          <p className="text-ink-300 text-lg mb-8">The gap isn't your rate — it's the math you haven't done.</p>
          <div className="space-y-3 mb-10">
            {PROBLEMS.map(([label, desc]) => (
              <div key={label} className="flex gap-4 p-4 bg-ink-900 rounded-xl border border-ink-800">
                <div className="w-2 h-2 mt-2 rounded-full bg-acid shrink-0" />
                <div>
                  <span className="font-bold text-ink-100 text-sm">{label}: </span>
                  <span className="text-ink-400 text-sm">{desc}</span>
                </div>
              </div>
            ))}
          </div>
          <p className="text-ink-300 text-lg">Valcr Freelance calculates all of it in one place. Enter your numbers once. Get the truth.</p>
        </div>
      </section>

      {/* Calculators grid */}
      <section className="py-16 px-4 sm:px-6 bg-ink-900/40">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span className="section-tag mb-4 inline-flex">10 free calculators</span>
            <h2 className="font-display font-bold text-4xl text-ink-50">Every number that matters.</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
            {FREELANCE_CALCULATORS.map(calc => (
              <Link key={calc.slug} to={`/calculators/${calc.slug}`}
                className="card p-6 hover:border-acid/30 hover:bg-acid/5 transition-all group">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 text-xl"
                  style={{ background: `${calc.color}18`, border: `1px solid ${calc.color}30` }}>
                  {calc.icon}
                </div>
                <h3 className="font-display font-bold text-ink-50 text-sm mb-1 group-hover:text-acid transition-colors">{calc.name}</h3>
                <p className="text-ink-500 text-xs">{calc.tagline}</p>
              </Link>
            ))}
          </div>
          <div className="text-center">
            <Link to="/calculators" className="btn-secondary">See all calculators <ArrowRight className="w-4 h-4" /></Link>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-display font-bold text-4xl text-ink-50">How it works</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {HOW.map((step, i) => (
              <div key={step.title} className="text-center">
                <div className="w-12 h-12 rounded-2xl bg-acid/10 border border-acid/20 flex items-center justify-center text-acid mx-auto mb-4">
                  {step.icon}
                </div>
                <div className="text-xs font-mono text-ink-600 mb-2">0{i+1}</div>
                <h3 className="font-display font-bold text-ink-100 mb-2">{step.title}</h3>
                <p className="text-ink-400 text-sm">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benchmark teaser */}
      <section className="py-16 px-4 sm:px-6 bg-ink-900/40">
        <div className="max-w-3xl mx-auto text-center">
          <span className="section-tag mb-4 inline-flex">Pro feature</span>
          <h2 className="font-display font-bold text-3xl text-ink-50 mb-4">
            See how your rates compare to every freelancer in your category.
          </h2>
          <p className="text-ink-400 mb-8 max-w-xl mx-auto">
            As operators use these calculators, Valcr builds real-time benchmark data segmented by skill category, experience tier, and geography. For the first time, you'll know not just your number — but where it sits versus your peers.
          </p>
          <Link to="/pricing" className="btn-primary">Unlock benchmarks — $9/mo</Link>
        </div>
      </section>

      {/* Cross-link to valcr.site */}
      <section className="py-12 px-4 border-t border-ink-800">
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-ink-400 text-sm mb-1">Also from Valcr</p>
            <h3 className="font-display font-bold text-ink-100">E-commerce financial intelligence</h3>
            <p className="text-ink-500 text-sm mt-1">20 free calculators for Shopify, Amazon FBA, Etsy, and WooCommerce operators.</p>
          </div>
          <a href="https://valcr.site" target="_blank" rel="noopener noreferrer" className="btn-secondary shrink-0">
            Visit valcr.site <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </section>
    </>
  )
}
