import { useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { Eye, EyeOff, AlertCircle, Check } from 'lucide-react'
import { SEOHead } from '@/components/SEOHead'
import { useAuthStore } from '@/store'

const API = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1'

export function SignupPage() {
  const { setAuth } = useAuthStore()
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const plan = params.get('plan') || 'free'

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPw, setShowPw] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSignup = async () => {
    if (!firstName || !email || !password) { setError('Please fill in all required fields.'); return }
    if (password.length < 8) { setError('Password must be at least 8 characters.'); return }
    setLoading(true); setError('')
    try {
      const res = await fetch(`${API}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, first_name: firstName, last_name: lastName, turnstile_token: '' }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.detail || 'Registration failed')
      setAuth({
        id: data.user_id, email: data.email, firstName: data.first_name,
        lastName: data.last_name, accountTier: data.account_tier,
        emailVerified: data.email_verified, isAdmin: data.is_admin === true,
      }, data.access_token)
      if (plan !== 'free') {
        navigate('/pricing')
      } else {
        navigate('/dashboard')
      }
    } catch (err: any) { setError(err.message) }
    finally { setLoading(false) }
  }

  return (
    <>
      <SEOHead title="Sign Up Free | Valcr Freelance" description="Create your free Valcr account to save calculations and access benchmarks." noIndex />
      <div className="min-h-screen flex items-center justify-center px-4 pt-16 pb-10">
        <div className="w-full max-w-sm">
          <div className="text-center mb-8">
            <Link to="/">
              <div className="w-10 h-10 bg-acid rounded-xl flex items-center justify-center mx-auto mb-6">
                <span className="font-display font-bold text-ink-950">V</span>
              </div>
            </Link>
            <h1 className="font-display font-bold text-3xl text-ink-50 mb-2">Get started free</h1>
            <p className="text-ink-400 text-sm">All 10 calculators, no credit card required.</p>
          </div>
          <div className="card p-7 space-y-4">
            {error && (
              <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm rounded-xl px-4 py-3 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />{error}
              </div>
            )}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="label">First name *</label>
                <input type="text" className="input-field" placeholder="Glen"
                  value={firstName} onChange={e=>setFirstName(e.target.value)} />
              </div>
              <div>
                <label className="label">Last name</label>
                <input type="text" className="input-field" placeholder="Alexander"
                  value={lastName} onChange={e=>setLastName(e.target.value)} />
              </div>
            </div>
            <div>
              <label className="label">Email *</label>
              <input type="email" className="input-field" placeholder="you@example.com"
                value={email} onChange={e=>setEmail(e.target.value)} />
            </div>
            <div>
              <label className="label">Password *</label>
              <div className="relative">
                <input type={showPw?'text':'password'} className="input-field pr-11"
                  placeholder="Min 8 characters" value={password}
                  onChange={e=>setPassword(e.target.value)}
                  onKeyDown={e=>e.key==='Enter'&&handleSignup()} />
                <button type="button" onClick={()=>setShowPw(!showPw)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-ink-400 hover:text-ink-200">
                  {showPw?<EyeOff className="w-4 h-4"/>:<Eye className="w-4 h-4"/>}
                </button>
              </div>
            </div>
            <button onClick={handleSignup} disabled={loading} className="btn-primary w-full justify-center">
              {loading?'Creating account…':'Create free account'}
            </button>
            <p className="text-xs text-ink-600 text-center">
              By signing up you agree to our <Link to="/terms" className="text-acid hover:underline">Terms</Link> and <Link to="/privacy" className="text-acid hover:underline">Privacy Policy</Link>.
            </p>
          </div>
          <div className="mt-5 space-y-2">
            {['All 10 calculators free','Save and compare results (Pro)','Benchmarks vs peers (Pro)'].map(f=>(
              <div key={f} className="flex items-center gap-2 text-xs text-ink-400">
                <Check className="w-3.5 h-3.5 text-acid shrink-0"/>{f}
              </div>
            ))}
          </div>
          <p className="text-center text-ink-400 text-sm mt-6">
            Already have an account?{' '}
            <Link to="/login" className="text-acid hover:text-acid/80 transition-colors">Sign in</Link>
          </p>
        </div>
      </div>
    </>
  )
}
