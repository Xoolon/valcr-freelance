// src/pages/NotFound.tsx
import { Link } from 'react-router-dom'
import { SEOHead } from '@/components/SEOHead'

export function NotFoundPage() {
  return (
    <div className="pt-28 pb-20 px-4 text-center min-h-screen flex items-center justify-center">
      <div>
        <SEOHead title="Not Found — Valcr Freelance" description="Page not found." />
        <div className="font-display font-bold text-8xl text-acid mb-4">404</div>
        <h1 className="font-display font-bold text-2xl text-ink-50 mb-4">Page not found</h1>
        <p className="text-ink-400 mb-8">This page doesn't exist. Try a calculator instead.</p>
        <div className="flex gap-3 justify-center">
          <Link to="/" className="btn-primary">Go home</Link>
          <Link to="/calculators" className="btn-secondary">See calculators</Link>
        </div>
      </div>
    </div>
  )
}
