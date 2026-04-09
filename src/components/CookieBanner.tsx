// src/components/CookieBanner.tsx
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { X } from 'lucide-react'

export function CookieBanner() {
  const [visible, setVisible] = useState(() => !document.cookie.includes('valcr_cookie_ok=1'))
  if (!visible) return null
  const accept = () => { document.cookie = 'valcr_cookie_ok=1; max-age=31536000; path=/; samesite=lax'; setVisible(false) }
  return (
    <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:max-w-sm z-50 card p-4 shadow-2xl">
      <div className="flex items-start justify-between gap-3 mb-3">
        <p className="text-xs text-ink-400 leading-relaxed">
          We use cookies for session tracking and anonymous analytics. No advertising data is collected or sold.{' '}
          <Link to="/privacy" className="text-acid hover:underline">Privacy policy</Link>
        </p>
        <button onClick={() => setVisible(false)} className="text-ink-600 hover:text-ink-300 shrink-0 mt-0.5">
          <X className="w-4 h-4" />
        </button>
      </div>
      <div className="flex gap-2">
        <button onClick={accept} className="btn-primary text-xs py-1.5 px-3">Accept</button>
        <button onClick={() => setVisible(false)} className="btn-secondary text-xs py-1.5 px-3">Dismiss</button>
      </div>
    </div>
  )
}
