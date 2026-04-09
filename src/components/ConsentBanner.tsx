// src/components/ConsentBanner.tsx
import { useState } from 'react'
import { telemetryClient } from '@/api/telemetry'

export function ConsentBanner() {
  const [visible, setVisible] = useState(
    () => !document.cookie.includes('valcr_consent=') && !document.cookie.includes('valcr_optout=')
  )
  if (!visible) return null
  const accept = () => { document.cookie = 'valcr_consent=1; max-age=31536000; path=/; samesite=lax'; setVisible(false) }
  const decline = () => { telemetryClient.optOut(); setVisible(false) }
  return (
    <div className="fixed bottom-20 sm:bottom-4 left-4 right-4 sm:left-auto sm:right-20 sm:max-w-md z-40 card p-5 border-ink-700 shadow-2xl">
      <h3 className="font-display font-bold text-ink-100 text-sm mb-2">Anonymous analytics</h3>
      <p className="text-xs text-ink-400 mb-4 leading-relaxed">
        Valcr collects anonymized calculation data to build industry benchmarks — the more operators contribute, the more useful the benchmarks become for everyone. No personal data is sold or shared.
      </p>
      <div className="flex gap-2">
        <button onClick={accept} className="btn-primary text-xs py-1.5 px-3">Contribute anonymously</button>
        <button onClick={decline} className="btn-secondary text-xs py-1.5 px-3">Opt out</button>
      </div>
    </div>
  )
}
