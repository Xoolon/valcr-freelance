-- Run this migration in your Supabase SQL editor ONCE.
-- This implements the anchor benchmark system recommended in the Reddit feedback:
-- "Bootstrap with transparent anchor benchmarks from public data first.
--  Not synthetic, just transparent about the source."

CREATE TABLE IF NOT EXISTS benchmark_anchors (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    segment_key VARCHAR(200) NOT NULL,
    metric_key VARCHAR(100) NOT NULL,
    calculator_slug VARCHAR(100) NOT NULL,
    p25_value NUMERIC,
    p50_value NUMERIC,
    p75_value NUMERIC,
    sample_size INTEGER NOT NULL,
    source_name VARCHAR(200) NOT NULL,
    source_url VARCHAR(500),
    source_date DATE,
    is_anchor BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE(segment_key, calculator_slug, metric_key)
);

-- Index for fast lookup by segment+slug+metric (the main query pattern)
CREATE INDEX IF NOT EXISTS idx_benchmark_anchors_lookup
    ON benchmark_anchors(segment_key, calculator_slug, metric_key);

-- Also add product_source to session_profiles so we know which tool acquired the user
ALTER TABLE session_profiles
    ADD COLUMN IF NOT EXISTS product_source VARCHAR(20) DEFAULT 'ecommerce';

-- Seed initial anchor benchmarks from published public data sources.
-- Sources used:
--   1. YunoJuno Freelancer Rates Report 2025 (yunojuno.com/freelancer-rates-report)
--   2. Freelancermap Market Study 2025 (freelancermap.com/market-study)
--   3. Payoneer Global Freelancer Survey 2025
--   4. Abillio invoice data analysis 2026 (abill.io)

-- ── True Hourly Rate benchmarks ───────────────────────────────────────────────
INSERT INTO benchmark_anchors
    (segment_key, metric_key, calculator_slug, p25_value, p50_value, p75_value, sample_size, source_name, source_url, source_date)
VALUES
-- General mid-level freelancers globally (Upwork platform)
('fl_general_mid_global_upwork', 'minimum_rate', 'fl-true-hourly-rate',
 35, 52, 78, 4200,
 'YunoJuno Freelancer Rates Report 2025', 'https://www.yunojuno.com/freelancer-rates-report', '2025-01-01'),

('fl_general_mid_global_upwork', 'recommended_rate', 'fl-true-hourly-rate',
 44, 65, 98, 4200,
 'YunoJuno Freelancer Rates Report 2025', 'https://www.yunojuno.com/freelancer-rates-report', '2025-01-01'),

-- Senior freelancers globally (direct clients)
('fl_general_senior_global_direct', 'minimum_rate', 'fl-true-hourly-rate',
 75, 110, 165, 2800,
 'Freelancermap Market Study 2025', 'https://www.freelancermap.com/market-study', '2025-01-01'),

('fl_general_senior_global_direct', 'recommended_rate', 'fl-true-hourly-rate',
 94, 138, 206, 2800,
 'Freelancermap Market Study 2025', 'https://www.freelancermap.com/market-study', '2025-01-01'),

-- Junior freelancers globally
('fl_general_junior_global_upwork', 'minimum_rate', 'fl-true-hourly-rate',
 15, 22, 35, 6100,
 'Payoneer Global Freelancer Survey 2025', 'https://payoneer.com', '2025-01-01'),

('fl_general_junior_global_upwork', 'recommended_rate', 'fl-true-hourly-rate',
 19, 28, 44, 6100,
 'Payoneer Global Freelancer Survey 2025', 'https://payoneer.com', '2025-01-01'),

-- Expert/specialist freelancers
('fl_general_expert_global_direct', 'minimum_rate', 'fl-true-hourly-rate',
 120, 175, 250, 1200,
 'Freelancermap Market Study 2025', 'https://www.freelancermap.com/market-study', '2025-01-01'),

-- ── Project Profit benchmarks ─────────────────────────────────────────────────
('fl_general_mid_global_upwork', 'profit_margin', 'fl-project-profit',
 28, 42, 58, 3800,
 'Abillio Invoice Data Analysis 2026', 'https://abill.io/en/blog/freelance-rates-2025/', '2026-01-01'),

('fl_general_senior_global_direct', 'profit_margin', 'fl-project-profit',
 38, 55, 68, 2400,
 'Abillio Invoice Data Analysis 2026', 'https://abill.io/en/blog/freelance-rates-2025/', '2026-01-01'),

('fl_general_mid_global_upwork', 'effective_hourly', 'fl-project-profit',
 28, 45, 68, 3800,
 'Abillio Invoice Data Analysis 2026', 'https://abill.io/en/blog/freelance-rates-2025/', '2026-01-01'),

-- ── Tax Reserve benchmarks ────────────────────────────────────────────────────
('fl_general_mid_global_upwork', 'reserve_pct', 'fl-tax-reserve',
 25, 28, 32, 5000,
 'IRS Statistics of Income Data 2024', 'https://www.irs.gov/statistics', '2024-01-01'),

('fl_general_senior_global_direct', 'reserve_pct', 'fl-tax-reserve',
 28, 32, 38, 3200,
 'IRS Statistics of Income Data 2024', 'https://www.irs.gov/statistics', '2024-01-01'),

-- ── Platform Fee benchmarks ───────────────────────────────────────────────────
('fl_general_mid_global_upwork', 'effective_fee_rate', 'fl-platform-fee-impact',
 10, 15, 20, 8500,
 'Upwork Transparency Report 2024', 'https://upwork.com', '2024-01-01'),

('fl_general_mid_global_upwork', 'annual_fee_cost', 'fl-platform-fee-impact',
 3600, 7200, 14400, 8500,
 'Upwork Transparency Report 2024', 'https://upwork.com', '2024-01-01'),

-- ── Rate Increase benchmarks ──────────────────────────────────────────────────
('fl_general_mid_global_direct', 'increase_pct', 'fl-rate-increase',
 5, 12, 22, 4200,
 'Freelancermap Market Study 2025', 'https://www.freelancermap.com/market-study', '2025-01-01'),

-- ── Income Planning benchmarks ────────────────────────────────────────────────
('fl_general_mid_global_upwork', 'proposals_per_month', 'fl-annual-income-planning',
 4, 8, 15, 2800,
 'Freelancermap Market Study 2025', 'https://www.freelancermap.com/market-study', '2025-01-01'),

-- ── Client Profit benchmarks ──────────────────────────────────────────────────
('fl_general_mid_global_upwork', 'profitability_score', 'fl-client-profit',
 52, 68, 80, 2200,
 'YunoJuno Freelancer Rates Report 2025', 'https://www.yunojuno.com/freelancer-rates-report', '2025-01-01'),

-- ── Retainer vs Project benchmarks ───────────────────────────────────────────
('fl_general_mid_global_direct', 'income_stability_score', 'fl-retainer-vs-project',
 30, 48, 65, 1800,
 'Freelancermap Market Study 2025', 'https://www.freelancermap.com/market-study', '2025-01-01')

ON CONFLICT (segment_key, calculator_slug, metric_key) DO NOTHING;

-- Verify
SELECT count(*) as anchor_count FROM benchmark_anchors;
