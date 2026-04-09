# Valcr Freelance

Financial intelligence for independent operators. Part of the [Valcr](https://valcr.site) platform.

## Setup

```bash
# In C:\Users\NOMAD\PycharmProjects\valero\
# This project sits NEXT TO valcr-frontend, not inside it

cd valcr-freelance
npm install
cp .env.example .env
# Edit .env with your API URL
npm run dev
# Runs at http://localhost:5174
```

## Deploy to Vercel

1. Push `valcr-freelance/` as a separate GitHub repo or monorepo subfolder
2. Create new Vercel project pointing to this directory
3. Set environment variable: `VITE_API_URL=https://api.valcr.site/api/v1`
4. In Vercel project settings → Domains → Add `freelance.valcr.site`
5. In your DNS: add CNAME `freelance` → `cname.vercel-dns.com`

## Project structure

```
valcr-freelance/
├── src/
│   ├── App.tsx                    Main router
│   ├── main.tsx                   Entry point
│   ├── index.css                  Global styles (Tailwind)
│   ├── api/
│   │   └── telemetry.ts           Analytics client (product_source=freelance)
│   ├── calculators/
│   │   ├── index.ts               10 calculator definitions
│   │   └── engine.ts              Pure math functions
│   ├── components/
│   │   ├── AdBanner.tsx           AdSense placeholder (swap IDs to activate)
│   │   ├── Nav.tsx
│   │   ├── Footer.tsx
│   │   ├── SEOHead.tsx
│   │   ├── CookieBanner.tsx
│   │   └── ConsentBanner.tsx
│   ├── hooks/
│   │   └── useTelemetry.ts        Calculator event tracking
│   ├── pages/
│   │   ├── Home.tsx
│   │   ├── Calculators.tsx
│   │   ├── Calculator.tsx         Single calculator + ad + benchmark
│   │   ├── Pricing.tsx            Free / Pro $9 / Teams $29
│   │   ├── Blog.tsx               10 complete articles
│   │   ├── BlogPost.tsx           Article renderer with calculator CTA
│   │   ├── Login.tsx
│   │   ├── Signup.tsx
│   │   ├── Dashboard.tsx
│   │   ├── NotFound.tsx
│   │   └── legal/
│   │       ├── About.tsx
│   │       ├── Privacy.tsx
│   │       └── Terms.tsx
│   └── store/
│       └── index.ts               Zustand auth (shared valcr-auth key)
├── backend/
│   ├── BACKEND_INTEGRATION.md     Exact steps to update your FastAPI backend
│   ├── benchmark_anchors_migration.sql   Run in Supabase — creates anchor table + seeds data
│   ├── benchmark_service_updated.py      Drop-in replacement for benchmark_service.py
│   ├── segment_classifier_freelance.py   Copy to app/services/
│   └── session_service_patch.py          Reference for product_source update
├── public/
│   └── favicon.svg
├── .env.example
├── index.html
├── package.json
├── tailwind.config.js
├── vite.config.ts
└── vercel.json

## Activating AdSense

Open `src/components/AdBanner.tsx`. Replace:
  const ADSENSE_CLIENT_ID = 'ca-pub-REPLACE_WITH_YOUR_PUBLISHER_ID'
  const ADSENSE_SLOT_ID   = 'REPLACE_WITH_YOUR_SLOT_ID'

With your real values from the AdSense dashboard. One client ID and one slot ID
covers all 10 calculator pages. The placeholder banner disappears automatically.

Also add the AdSense script tag to index.html <head>:
  <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=YOUR_CLIENT_ID" crossorigin="anonymous"></script>

## Auth

Uses the same `valcr-auth` localStorage key as valcr-frontend.
Users logged in at valcr.site are automatically logged in at freelance.valcr.site.
Same JWT, same backend, same Paystack subscription.

## Benchmarks

Benchmarks are Pro-only. The system has two layers:
1. Organic data (from calculation events, requires n>=30 per segment)
2. Anchor data (from public sources — seeded by the SQL migration)

When organic data is insufficient, anchor data is shown with full source
attribution. The frontend displays a transparent label. When organic data
crosses the threshold, it automatically replaces the anchor.
```
