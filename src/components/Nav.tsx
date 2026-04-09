import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, ExternalLink } from 'lucide-react'
import { useAuthStore } from '@/store'
import { telemetryClient } from '@/api/telemetry'

export function Nav() {
  const { isAuthenticated, logout } = useAuthStore()
  const { pathname } = useLocation()
  const [open, setOpen] = useState(false)
  const links = [
    { to: '/calculators', label: 'Calculators' },
    { to: '/pricing', label: 'Pricing' },
    { to: '/blog', label: 'Blog' },
  ]
  const handleLogout = () => { telemetryClient.resetSession(); logout() }
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-ink-800 bg-ink-950/90 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="w-7 h-7 bg-acid rounded-lg flex items-center justify-center">
            <span className="font-display font-bold text-ink-950 text-sm">V</span>
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="font-display font-bold text-ink-50 text-lg">valcr</span>
            <span className="font-mono text-[10px] text-ink-950 bg-acid px-1.5 py-0.5 rounded-md font-medium">freelance</span>
          </div>
        </Link>
        <div className="hidden sm:flex items-center gap-6">
          {links.map(l => (
            <Link key={l.to} to={l.to}
              className={`text-sm transition-colors ${pathname.startsWith(l.to) ? 'text-acid' : 'text-ink-400 hover:text-ink-100'}`}>
              {l.label}
            </Link>
          ))}
          <a href="https://valcr.site" target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-1 text-sm text-ink-600 hover:text-ink-300 transition-colors">
            valcr.site <ExternalLink className="w-3 h-3" />
          </a>
          {isAuthenticated ? (
            <div className="flex items-center gap-3">
              <Link to="/dashboard" className="btn-secondary text-sm py-1.5 px-4">Dashboard</Link>
              <button onClick={handleLogout} className="text-sm text-ink-500 hover:text-ink-200 transition-colors">Log out</button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link to="/login" className="text-sm text-ink-400 hover:text-ink-100 transition-colors">Log in</Link>
              <Link to="/signup" className="btn-primary text-sm py-1.5 px-4">Get started free</Link>
            </div>
          )}
        </div>
        <button className="sm:hidden text-ink-400" onClick={() => setOpen(!open)}>
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>
      {open && (
        <div className="sm:hidden border-t border-ink-800 bg-ink-950 px-4 py-4 space-y-1">
          {links.map(l => (
            <Link key={l.to} to={l.to} onClick={() => setOpen(false)}
              className={`block py-2.5 text-sm ${pathname.startsWith(l.to) ? 'text-acid' : 'text-ink-300'}`}>
              {l.label}
            </Link>
          ))}
          <a href="https://valcr.site" target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-1 py-2.5 text-sm text-ink-600">
            valcr.site <ExternalLink className="w-3 h-3" />
          </a>
          <div className="pt-3 border-t border-ink-800 flex flex-col gap-2">
            {isAuthenticated ? (
              <>
                <Link to="/dashboard" onClick={() => setOpen(false)} className="btn-secondary justify-center">Dashboard</Link>
                <button onClick={() => { handleLogout(); setOpen(false) }} className="text-sm text-ink-500 py-2">Log out</button>
              </>
            ) : (
              <>
                <Link to="/signup" onClick={() => setOpen(false)} className="btn-primary justify-center">Get started free</Link>
                <Link to="/login" onClick={() => setOpen(false)} className="text-center text-sm text-ink-400 py-2">Log in</Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}
