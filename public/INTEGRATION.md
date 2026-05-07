-- ============================================================
-- VALCR + FREELANCE — COMPLETE MIGRATION + INTEGRATION NOTES
-- Run in Supabase SQL Editor
-- ============================================================


-- ── 1. Score system migrations ────────────────────────────────
ALTER TABLE users
  ADD COLUMN IF NOT EXISTS valcr_score      INTEGER,
  ADD COLUMN IF NOT EXISTS score_updated_at TIMESTAMPTZ;

CREATE INDEX IF NOT EXISTS idx_users_valcr_score
  ON users(valcr_score DESC)
  WHERE valcr_score IS NOT NULL;


-- ── 2. User management migrations ────────────────────────────
ALTER TABLE users
  ADD COLUMN IF NOT EXISTS is_active      BOOLEAN DEFAULT TRUE,
  ADD COLUMN IF NOT EXISTS account_source VARCHAR(50) DEFAULT 'email',
  ADD COLUMN IF NOT EXISTS google_sub     VARCHAR(100);

CREATE INDEX IF NOT EXISTS idx_users_account_source
  ON users(account_source);

CREATE INDEX IF NOT EXISTS idx_users_google_sub
  ON users(google_sub) WHERE google_sub IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_users_email_source
  ON users(email, account_source);

CREATE INDEX IF NOT EXISTS idx_users_active
  ON users(is_active) WHERE is_active = FALSE;


-- ── 3. Verify score is working ────────────────────────────────
-- Check that calculation_events has user_id populated:
SELECT
  COUNT(*) FILTER (WHERE user_id IS NOT NULL) as events_with_user,
  COUNT(*) FILTER (WHERE user_id IS NULL)     as events_without_user,
  COUNT(DISTINCT user_id)                     as unique_users,
  COUNT(DISTINCT calculator_slug)             as unique_calcs
FROM calculation_events
WHERE event_type = 'calculation_run';

-- Check distinct calculators per user (what score/me now queries):
SELECT
  user_id,
  COUNT(DISTINCT calculator_slug) as distinct_calcs,
  ARRAY_AGG(DISTINCT calculator_slug) as slugs
FROM calculation_events
WHERE user_id IS NOT NULL
  AND event_type = 'calculation_run'
GROUP BY user_id
ORDER BY distinct_calcs DESC
LIMIT 10;


-- ── 4. Freelance user breakdown ───────────────────────────────
SELECT
  account_source,
  account_tier,
  COUNT(*) as users
FROM users
GROUP BY account_source, account_tier
ORDER BY account_source, users DESC;


-- ============================================================
-- INTEGRATION CHECKLIST
-- ============================================================
--
-- VALCR SCORE FIX:
--   [x] Replace app/api/v1/score.py — now queries calculation_events directly
--   [x] Replace app/services/score_service.py — same direct query approach
--   [x] Replace src/components/ValcrScore.tsx — adds triggerRefetch prop
--   [ ] In Calculator.tsx, pass triggerRefetch={calculationJustRan} to ValcrScore
--       where calculationJustRan is a boolean that flips after each calculation
--   [ ] Add route to main.py:
--       from app.api.v1 import score
--       app.include_router(score.router, prefix="/api/v1", tags=["score"])
--   [ ] Move score_service.py to app/services/score_service.py (not api/v1)
--
-- HOW TO USE triggerRefetch in Calculator.tsx:
--   const [calcRan, setCalcRan] = useState(false)
--   // In your calculate() function, after updating outputs:
--   setCalcRan(r => !r)  // flip the boolean to trigger refetch
--   // In JSX:
--   <ValcrScore triggerRefetch={calcRan} currentCalcSlug={calc.slug} />
--
--
-- FREELANCE GOOGLE OAUTH:
--   [x] backend/api/v1/auth_google.py — exchange Google JWT for session token
--   [x] frontend/freelance/GoogleAuthButton.tsx — renders Google Sign In button
--   [ ] Add to freelance index.html <head>:
--       <script src="https://accounts.google.com/gsi/client" async defer></script>
--   [ ] Add to freelance .env:
--       VITE_GOOGLE_CLIENT_ID=your-client-id.apps.googleusercontent.com
--   [ ] Add GOOGLE_CLIENT_ID to EC2 .env / config.py
--   [ ] Add to main.py:
--       from app.api.v1 import auth_google
--       app.include_router(auth_google.router, prefix="/api/v1", tags=["auth"])
--   [ ] Import GoogleAuthButton in Login.tsx and Signup.tsx:
--       <GoogleAuthButton onSuccess={(token, user) => setAuth(token, user)} label="signin_with" />
--       Add a divider: <div className="divider-text">or continue with email</div>
--
--
-- FREELANCE ADMIN DASHBOARD:
--   [x] frontend/freelance/FreelanceAdmin.tsx — full admin UI
--   [x] backend/api/v1/admin_freelance.py — admin CRUD endpoints
--   [ ] Add to main.py:
--       from app.api.v1 import admin_freelance
--       app.include_router(admin_freelance.router, prefix="/api/v1", tags=["admin"])
--   [ ] Add route to freelance App.tsx:
--       <Route path="/admin" element={<FreelanceAdmin />} />
--   [ ] Ensure your users.is_admin column exists:
--       ALTER TABLE users ADD COLUMN IF NOT EXISTS is_admin BOOLEAN DEFAULT FALSE;
--       UPDATE users SET is_admin = TRUE WHERE email = 'glen@valcr.site';
--
-- FREELANCE PLATFORM SEPARATION:
--   Accounts created on Valcr (valcr.site) have account_source='email'
--   Accounts created on Freelance via Google have account_source='google_freelance'
--   Accounts created on Freelance via email have account_source='email_freelance'
--   The token payload includes "platform": "freelance" so the frontend knows
--   which product context the user is in.
--   IMPORTANT: A user can have the SAME email on both platforms — they are
--   different accounts with different usage data. The admin panel for
--   Freelance filters by account_source to avoid cross-contamination.
--
--
-- ADS:
--   [x] frontend/components/AdBanner.tsx — AdSense + Meta fallback
--   [ ] Apply for AdSense: https://www.google.com/adsense/new/
--       (Valcr.site is better positioned — 20+ content pages, finance niche)
--       (Freelance.valcr.site: apply after Valcr is approved — same publisher account)
--   [ ] After approval, replace ADSENSE_CONFIG.publisherId and slot IDs in AdBanner.tsx
--   [ ] Add to valcr-frontend/index.html <head>:
--       <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXXX" crossorigin="anonymous"></script>
--   [ ] Add AdBanner to Calculator.tsx (free users only):
--       import { CalculatorBottomAd } from '@/components/AdBanner'
--       {hasOutput && !isPro && <CalculatorBottomAd className="mt-6" />}
--   [ ] Add AdBanner to BlogPost.tsx (after first few paragraphs):
--       import { BlogInArticleAd } from '@/components/AdBanner'
--       <BlogInArticleAd className="my-8" />
--   [ ] To switch to Meta: VITE_AD_PROVIDER=meta in .env and redeploy
--   [ ] Meta Audience Network: https://www.facebook.com/audiencenetwork/
--       Apply after Valcr has stable traffic — Meta requires 5K+ MAU minimum
--
-- AD PLACEMENT STRATEGY (don't over-ad):
--   - Calculator pages: 1 ad below results, only for free users
--   - Blog posts: 1 in-article ad per post
--   - Calculator list: 1 ad per 5 calculators scrolled
--   - NO ads on: login, signup, pricing, dashboard, Pro pages
--   - Pro users see zero ads (this is part of the Pro value proposition)
-- ============================================================
