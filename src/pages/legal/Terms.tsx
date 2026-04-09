// src/pages/legal/Terms.tsx
import { SEOHead } from '@/components/SEOHead'

export function TermsPage() {
  return (
    <>
      <SEOHead title="Terms of Service — Valcr Freelance" description="Terms of service for Valcr Freelance." canonicalPath="/terms" />
      <div className="pt-28 pb-20 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          <h1 className="font-display font-bold text-4xl text-ink-50 mb-2">Terms of Service</h1>
          <p className="text-ink-600 text-sm mb-10">Last updated: April 2026</p>
          <div className="space-y-8 text-ink-300">
            {[
              { title: 'Use of the service', body: 'Valcr Freelance provides financial calculators for informational purposes. The results are estimates based on the inputs you provide and the mathematical models built into each calculator. They are not financial, legal, or tax advice. You should consult a qualified professional before making significant financial decisions.' },
              { title: 'Free access', body: 'All 10 calculators are free to use without creating an account. We reserve the right to change the availability or functionality of free features with reasonable notice.' },
              { title: 'Pro subscription', body: 'Pro subscriptions are billed monthly through Paystack. You may cancel at any time, effective at the end of your current billing period. We do not offer refunds for partial billing periods.' },
              { title: 'Acceptable use', body: 'You may not use Valcr Freelance for any illegal purpose, to transmit malicious code, or to attempt to gain unauthorized access to our systems. We reserve the right to terminate accounts that violate these terms.' },
              { title: 'Intellectual property', body: 'The Valcr Freelance brand, calculators, and content are owned by Cyntax LLC. You may not reproduce, distribute, or create derivative works from our content without written permission.' },
              { title: 'Limitation of liability', body: 'Cyntax LLC is not liable for any financial loss, decision made in reliance on calculator outputs, or indirect damages arising from use of this service. The calculators are tools, not guarantees.' },
              { title: 'Contact', body: 'Questions: glen@valcr.site' },
            ].map(s => (
              <div key={s.title}>
                <h2 className="font-display font-bold text-ink-100 text-xl mb-3">{s.title}</h2>
                <p className="leading-relaxed">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
