import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { SEOHead } from '@/components/SEOHead'
import { FREELANCE_CALCULATORS } from '@/calculators'

export function CalculatorsPage() {
  return (
    <>
      <SEOHead
        title="Free Freelance Financial Calculators — Valcr Freelance"
        description="10 free financial calculators for freelancers. True hourly rate, project profit, tax reserve, client profitability, proposal pricing, platform fees, and more."
        canonicalPath="/calculators"
        keywords={['freelance calculators free','freelance financial tools','freelance rate calculator','freelance tax calculator']}
      />
      <div className="pt-28 pb-20 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <span className="section-tag mb-4 inline-flex">10 free calculators</span>
            <h1 className="font-display font-bold text-4xl sm:text-5xl text-ink-50 mb-4">Financial clarity for freelancers.</h1>
            <p className="text-ink-300 text-xl max-w-2xl mx-auto">Every calculator does the math most freelancers avoid. No account required. Real numbers in under 30 seconds.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {FREELANCE_CALCULATORS.map(calc => (
              <Link key={calc.slug} to={`/calculators/${calc.slug}`}
                className="card p-6 hover:border-acid/30 hover:bg-acid/5 transition-all group">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 text-2xl"
                  style={{ background: `${calc.color}18`, border: `1px solid ${calc.color}30` }}>
                  {calc.icon}
                </div>
                <h2 className="font-display font-bold text-ink-50 text-base mb-2 group-hover:text-acid transition-colors">{calc.name}</h2>
                <p className="text-ink-500 text-sm mb-4 leading-relaxed">{calc.tagline}</p>
                <div className="flex items-center gap-1 text-xs text-acid">Calculate now <ArrowRight className="w-3 h-3" /></div>
              </Link>
            ))}
          </div>
          <div className="mt-16 p-6 card border-ink-700 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <p className="text-ink-400 text-sm mb-1">Running an e-commerce store?</p>
              <p className="font-display font-bold text-ink-100">Valcr has 20 calculators for Shopify, Amazon FBA, Etsy, and more.</p>
            </div>
            <a href="https://valcr.site/calculators" target="_blank" rel="noopener noreferrer" className="btn-secondary shrink-0">
              View e-commerce tools <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </>
  )
}
