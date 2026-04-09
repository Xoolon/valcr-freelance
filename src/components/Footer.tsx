import { Link } from 'react-router-dom'
import { ExternalLink } from 'lucide-react'

const CALC_LINKS = [
  { to: '/calculators/fl-true-hourly-rate', label: 'True Hourly Rate' },
  { to: '/calculators/fl-project-profit', label: 'Project Profit' },
  { to: '/calculators/fl-tax-reserve', label: 'Tax Reserve' },
  { to: '/calculators/fl-proposal-pricing', label: 'Proposal Pricing' },
  { to: '/calculators/fl-client-profit', label: 'Client Profitability' },
  { to: '/calculators/fl-platform-fee-impact', label: 'Platform Fees' },
  { to: '/calculators/fl-rate-increase', label: 'Rate Increase' },
  { to: '/calculators/fl-freelance-vs-employment', label: 'Freelance vs Job' },
  { to: '/calculators/fl-annual-income-planning', label: 'Income Planning' },
  { to: '/calculators/fl-retainer-vs-project', label: 'Retainer vs Project' },
]

export function Footer() {
  return (
    <footer className="border-t border-ink-800 py-14 px-4 sm:px-6 bg-ink-950">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-10 mb-12">
          <div className="col-span-2 sm:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-6 bg-acid rounded-md flex items-center justify-center">
                <span className="font-display font-bold text-ink-950 text-xs">V</span>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="font-display font-bold text-ink-50 text-sm">valcr</span>
                <span className="font-mono text-[9px] text-ink-950 bg-acid px-1 py-0.5 rounded">freelance</span>
              </div>
            </div>
            <p className="text-ink-500 text-xs leading-relaxed mb-3">
              Financial intelligence for independent operators. Free, always.
            </p>
            <a href="https://valcr.site" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs text-ink-600 hover:text-acid transition-colors">
              valcr.site — E-commerce tools <ExternalLink className="w-3 h-3" />
            </a>
          </div>
          <div>
            <p className="text-ink-300 text-xs font-bold uppercase tracking-widest mb-4">Calculators</p>
            <div className="space-y-2">
              {CALC_LINKS.slice(0, 5).map(l => (
                <Link key={l.to} to={l.to} className="block text-xs text-ink-500 hover:text-ink-200 transition-colors">{l.label}</Link>
              ))}
            </div>
          </div>
          <div>
            <p className="text-ink-300 text-xs font-bold uppercase tracking-widest mb-4 opacity-0 select-none">.</p>
            <div className="space-y-2">
              {CALC_LINKS.slice(5).map(l => (
                <Link key={l.to} to={l.to} className="block text-xs text-ink-500 hover:text-ink-200 transition-colors">{l.label}</Link>
              ))}
            </div>
          </div>
          <div>
            <p className="text-ink-300 text-xs font-bold uppercase tracking-widest mb-4">Company</p>
            <div className="space-y-2">
              {[
                { to: '/pricing', label: 'Pricing' },
                { to: '/blog', label: 'Blog' },
                { to: '/about', label: 'About' },
                { to: '/privacy', label: 'Privacy Policy' },
                { to: '/terms', label: 'Terms of Service' },
              ].map(l => (
                <Link key={l.to} to={l.to} className="block text-xs text-ink-500 hover:text-ink-200 transition-colors">{l.label}</Link>
              ))}
              <a href="mailto:glen@valcr.site" className="block text-xs text-ink-500 hover:text-ink-200 transition-colors">glen@valcr.site</a>
            </div>
          </div>
        </div>
        <div className="border-t border-ink-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-ink-600 text-xs">© {new Date().getFullYear()} Cyntax LLC · Valcr Freelance</p>
          <p className="text-ink-600 text-xs">
            Part of the <a href="https://valcr.site" className="text-acid hover:underline">Valcr</a> financial intelligence platform
          </p>
        </div>
      </div>
    </footer>
  )
}
