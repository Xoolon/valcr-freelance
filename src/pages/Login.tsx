// src/pages/Login.tsx
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff, AlertCircle } from 'lucide-react'
import { SEOHead } from '@/components/SEOHead'
import { useAuthStore } from '@/store'

const API = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1'

export function LoginPage() {
  const { setAuth } = useAuthStore()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPw, setShowPw] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleLogin = async () => {
    if (!email || !password) { setError('Please fill in both fields.'); return }
    setLoading(true); setError('')
    try {
      const res = await fetch(`${API}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, turnstile_token: '' }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.detail || 'Login failed')
      setAuth({
        id: data.user_id, email: data.email, firstName: data.first_name,
        lastName: data.last_name, accountTier: data.account_tier,
        emailVerified: data.email_verified, isAdmin: data.is_admin === true,
      }, data.access_token)
      navigate('/dashboard')
    } catch (err: any) { setError(err.message) }
    finally { setLoading(false) }
  }

  return (
    <>
      <SEOHead title="Log In | Valcr Freelance" description="Log in to your Valcr account." noIndex />
      <div className="min-h-screen flex items-center justify-center px-4 pt-16">
        <div className="w-full max-w-sm">
          <div className="text-center mb-8">
            <Link to="/">
              <div className="w-10 h-10 bg-acid rounded-xl flex items-center justify-center mx-auto mb-6">
                <span className="font-display font-bold text-ink-950">V</span>
              </div>
            </Link>
            <h1 className="font-display font-bold text-3xl text-ink-50 mb-2">Welcome back</h1>
            <p className="text-ink-400 text-sm">Sign in to your Valcr account</p>
          </div>
          <div className="card p-7 space-y-5">
            {error && (
              <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm rounded-xl px-4 py-3 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />{error}
              </div>
            )}
            <div>
              <label className="label">Email</label>
              <input type="email" className="input-field" placeholder="you@example.com"
                value={email} onChange={e=>setEmail(e.target.value)}
                onKeyDown={e=>e.key==='Enter'&&handleLogin()} />
            </div>
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="label mb-0">Password</label>
                <Link to="/forgot-password" className="text-xs text-acid hover:text-acid/80 transition-colors">Forgot?</Link>
              </div>
              <div className="relative">
                <input type={showPw?'text':'password'} className="input-field pr-11"
                  placeholder="••••••••" value={password}
                  onChange={e=>setPassword(e.target.value)}
                  onKeyDown={e=>e.key==='Enter'&&handleLogin()} />
                <button type="button" onClick={()=>setShowPw(!showPw)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-ink-400 hover:text-ink-200">
                  {showPw?<EyeOff className="w-4 h-4"/>:<Eye className="w-4 h-4"/>}
                </button>
              </div>
            </div>
            <button onClick={handleLogin} disabled={loading} className="btn-primary w-full justify-center">
              {loading?'Signing in…':'Sign in'}
            </button>
          </div>
          <p className="text-center text-ink-400 text-sm mt-6">
            Don't have an account?{' '}
            <Link to="/signup" className="text-acid hover:text-acid/80 transition-colors">Sign up free</Link>
          </p>
          <p className="text-center text-ink-600 text-xs mt-4">
            Same account works on <a href="https://valcr.site" className="text-acid hover:underline" target="_blank" rel="noopener noreferrer">valcr.site</a>
          </p>
        </div>
      </div>
    </>
  )
}
