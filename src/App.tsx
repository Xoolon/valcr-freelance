import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { Nav } from '@/components/Nav'
import { Footer } from '@/components/Footer'
import { CookieBanner } from '@/components/CookieBanner'
import { ConsentBanner } from '@/components/ConsentBanner'

import { HomePage } from '@/pages/Home'
import { CalculatorsPage } from '@/pages/Calculators'
import { CalculatorPage } from '@/pages/Calculator'
import { PricingPage } from '@/pages/Pricing'
import { BlogPage } from '@/pages/Blog'
import { BlogPostPage } from '@/pages/BlogPost'
import { LoginPage } from '@/pages/Login'
import { SignupPage } from '@/pages/Signup'
import { DashboardPage } from '@/pages/Dashboard'
import { AboutPage } from '@/pages/legal/About'
import { PrivacyPage } from '@/pages/legal/Privacy'
import { TermsPage } from '@/pages/legal/Terms'
import { NotFoundPage } from '@/pages/NotFound'

const API = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1'
const NO_FOOTER = ['/login', '/signup']

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

function PageTracker() {
  const { pathname } = useLocation()
  useEffect(() => {
    const skip = ['/dashboard', '/login', '/signup']
    if (skip.some(p => pathname.startsWith(p))) return
    fetch(`${API}/analytics/pageview`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ path: `freelance:${pathname}`, referrer: document.referrer || '' }),
    }).catch(() => {})
  }, [pathname])
  return null
}

export default function App() {
  const { pathname } = useLocation()
  const showFooter = !NO_FOOTER.some(p => pathname.startsWith(p))
  return (
    <div className="min-h-screen flex flex-col">
      <ScrollToTop />
      <PageTracker />
      <Nav />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/calculators" element={<CalculatorsPage />} />
          <Route path="/calculators/:slug" element={<CalculatorPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<BlogPostPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      {showFooter && <Footer />}
      <CookieBanner />
      <ConsentBanner />
    </div>
  )
}
