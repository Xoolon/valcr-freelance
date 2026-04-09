// src/pages/legal/About.tsx
import { Link } from 'react-router-dom'
import { SEOHead } from '@/components/SEOHead'

export function AboutPage() {
  return (
    <>
      <SEOHead title="About Valcr Freelance" description="Valcr Freelance is financial intelligence for independent operators — freelancers, consultants, and contractors." canonicalPath="/about" />
      <div className="pt-28 pb-20 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          <span className="section-tag mb-6 inline-flex">About</span>
          <h1 className="font-display font-bold text-4xl text-ink-50 mb-6">Financial intelligence shouldn't require a CFO.</h1>
          <div className="space-y-5 text-ink-300 text-lg">
            <p>Valcr Freelance is part of the <a href="https://valcr.site" className="text-acid hover:underline" target="_blank" rel="noopener noreferrer">Valcr</a> financial intelligence platform. Where valcr.site serves e-commerce operators, Valcr Freelance is built for independent operators — freelancers, consultants, and contractors who run their business alone and deserve the same financial clarity as companies with entire finance teams.</p>
            <p>The 10 calculators do the math most freelancers avoid: true hourly rates that account for non-billable time and taxes, project pricing that accounts for scope risk and revision rounds, tax reserves that account for self-employment tax and quarterly payments. Real numbers, in 30 seconds, no account required.</p>
            <p>The longer-term vision: as operators contribute their calculation data anonymously, Valcr builds real-time benchmark data segmented by skill category, experience tier, and geography. For the first time, freelancers will be able to see not just their number — but where it sits versus their peers.</p>
            <p>Built by Glen Norman Alexander, Founder & CEO, Cyntax LLC.</p>
            <p>Questions or feedback: <a href="mailto:glen@valcr.site" className="text-acid hover:underline">glen@valcr.site</a></p>
          </div>
          <div className="mt-10 p-5 card border-ink-700 flex items-center justify-between gap-4">
            <p className="text-ink-400 text-sm">Also from Valcr: 20 free calculators for Shopify, Amazon FBA, Etsy, and WooCommerce operators.</p>
            <a href="https://valcr.site" target="_blank" rel="noopener noreferrer" className="btn-secondary shrink-0 text-sm">Visit valcr.site</a>
          </div>
        </div>
      </div>
    </>
  )
}
