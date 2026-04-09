// src/pages/legal/Privacy.tsx
import { SEOHead } from '@/components/SEOHead'

export function PrivacyPage() {
  return (
    <>
      <SEOHead title="Privacy Policy — Valcr Freelance" description="Privacy policy for Valcr Freelance." canonicalPath="/privacy" />
      <div className="pt-28 pb-20 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          <h1 className="font-display font-bold text-4xl text-ink-50 mb-2">Privacy Policy</h1>
          <p className="text-ink-600 text-sm mb-10">Last updated: April 2026</p>
          <div className="space-y-8 text-ink-300">
            {[
              { title: 'What we collect', body: 'When you use Valcr Freelance calculators, we collect anonymized calculation inputs and outputs stored as value buckets (ranges, not exact figures). We also collect session metadata: approximate device type, country code (via Cloudflare headers), and referrer. We never collect or store personally identifiable information unless you create an account.' },
              { title: 'Why we collect it', body: 'Calculation data is aggregated to build anonymous industry benchmarks — the more operators contribute, the more useful the benchmarks become for everyone. Session data is used to improve the product and understand usage patterns. We do not sell any data to third parties.' },
              { title: 'Account data', body: 'If you create an account, we store your email address, name, hashed password, and account tier. We use this data to provide your account functionality (saved calculations, benchmark access) and to send transactional emails (verification, password reset). You may opt out of marketing emails at any time.' },
              { title: 'Cookies', body: 'We use two cookies: valcr_aid (anonymous session identifier, 2-year expiry) and valcr_optout (opt-out preference). We do not use advertising cookies or third-party tracking cookies.' },
              { title: 'Your rights', body: 'You may opt out of anonymous data collection at any time using the consent banner. If you have an account, you may request deletion of your account and associated data by emailing glen@valcr.site. We will process deletion requests within 30 days.' },
              { title: 'Third parties', body: 'We use Vercel (hosting), Supabase (database), and Paystack (payments). Each maintains their own privacy practices. We do not share your data with advertisers.' },
              { title: 'Contact', body: 'Questions about this policy: glen@valcr.site' },
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
