// AdBanner.tsx
// PLACEHOLDER — Replace ADSENSE_CLIENT_ID and ADSENSE_SLOT_ID with your real values
// from Google AdSense once approved. Everything else stays the same.
//
// HOW TO ACTIVATE:
// 1. Get your AdSense publisher ID (looks like: ca-pub-XXXXXXXXXXXXXXXX)
// 2. Create one ad unit in AdSense dashboard (responsive, auto)
// 3. Replace the two constants below — done.
//
// You only need ONE ad client ID and ONE ad slot ID for all 10 calculator pages.
// The same unit shows different ads on each page based on page content.
// Create separate slot IDs only if you want per-page analytics later.

const ADSENSE_CLIENT_ID = 'ca-pub-REPLACE_WITH_YOUR_PUBLISHER_ID'
const ADSENSE_SLOT_ID   = 'REPLACE_WITH_YOUR_SLOT_ID'
const IS_PLACEHOLDER    = ADSENSE_CLIENT_ID.includes('REPLACE')

import { useEffect } from 'react'

interface AdBannerProps {
  className?: string
}

export function AdBanner({ className = '' }: AdBannerProps) {
  useEffect(() => {
    if (IS_PLACEHOLDER) return
    try {
      // Push ad after mount
      ;(window as any).adsbygoogle = (window as any).adsbygoogle || []
      ;(window as any).adsbygoogle.push({})
    } catch {}
  }, [])

  if (IS_PLACEHOLDER) {
    return (
      <div className={`w-full flex items-center justify-center bg-ink-800/40 border border-dashed border-ink-700 rounded-xl text-ink-600 text-xs font-mono ${className}`}
        style={{ minHeight: 90 }}>
        [ Ad placeholder — replace ADSENSE_CLIENT_ID and ADSENSE_SLOT_ID in AdBanner.tsx ]
      </div>
    )
  }

  return (
    <div className={`w-full overflow-hidden ${className}`}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={ADSENSE_CLIENT_ID}
        data-ad-slot={ADSENSE_SLOT_ID}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  )
}
