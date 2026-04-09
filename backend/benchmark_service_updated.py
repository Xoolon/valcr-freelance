"""
benchmark_service.py — UPDATED VERSION
Implements the anchor benchmark system from Reddit feedback:
  "Bootstrap with transparent anchor benchmarks from public data first.
   Not synthetic, just transparent about the source. Partners signed because
   something was there already."

Changes from original:
1. get_benchmark() now falls back to benchmark_anchors table when organic
   data (benchmark_snapshots) has no published row for the segment.
2. Returns is_anchor=True and source info when anchor data is used.
3. Auto-upgrades: once organic n >= MIN_SAMPLE_SIZE, anchor is ignored.
4. Fallback chain: exact segment → generic fallback segment → anchor → None

Drop-in replacement for app/services/benchmark_service.py.
"""
import logging
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, text
from app.models.calculation_event import CalculationEvent
from app.database import AsyncSessionLocal

logger = logging.getLogger(__name__)
MIN_SAMPLE_SIZE = 30

# ── Metric keys for all calculators (ecommerce + freelance) ──────────────────

METRIC_KEYS: dict[str, list[str]] = {
    # E-commerce
    "true-landed-cost":            ["landed_cost", "gross_margin", "cost_breakdown"],
    "shopify-profit-margin":       ["net_profit", "net_margin", "shopify_fees_total"],
    "break-even-units":            ["break_even_units", "contribution_margin_ratio"],
    "roas-calculator":             ["roas", "break_even_roas", "profit_margin_on_ad_revenue"],
    "customer-acquisition-cost":   ["blended_cac", "ltv_cac_ratio", "payback_months"],
    "inventory-reorder-point":     ["reorder_point", "safety_stock", "days_of_safety_stock"],
    "cash-flow-runway":            ["current_burn", "runway_months"],
    "subscription-ltv":            ["gross_ltv", "net_ltv", "ltv_cac_ratio"],
    "amazon-fba-calculator":       ["net_profit", "net_margin", "roi"],
    "pricing-strategy":            ["minimum_price", "target_price", "markup_multiplier"],
    "refund-rate-impact":          ["total_refund_cost", "refunds_as_pct_revenue"],
    "bundle-pricing-optimizer":    ["bundle_margin", "margin_delta"],
    "influencer-roi-calculator":   ["campaign_roas", "net_profit"],
    "chargeback-impact":           ["total_monthly_loss", "cost_per_chargeback"],
    "shipping-cost-optimizer":     ["estimated_cost_usps", "shipping_as_pct_aov"],
    "wholesale-margin-calculator": ["wholesale_margin", "retailer_margin"],
    "etsy-fee-calculator":         ["net_margin", "total_fees_pct"],
    "profit-per-sku":              ["margin_per_unit", "roi_per_unit"],
    "ad-spend-budget-calculator":  ["budget_as_pct_revenue", "required_ad_budget"],
    "email-marketing-roi":         ["roi", "revenue_per_subscriber"],
    # Freelance (fl- prefix prevents any collision)
    "fl-true-hourly-rate":         ["minimum_rate", "recommended_rate", "effective_hourly_net"],
    "fl-project-profit":           ["project_profit", "profit_margin", "effective_hourly"],
    "fl-tax-reserve":              ["reserve_pct", "effective_tax_rate", "self_employment_tax"],
    "fl-rate-increase":            ["increase_pct", "justified_new_rate"],
    "fl-client-profit":            ["true_hourly_rate", "profitability_score"],
    "fl-freelance-vs-employment":  ["freelance_net", "employment_total_comp", "freelance_advantage"],
    "fl-proposal-pricing":         ["recommended_price", "premium_price"],
    "fl-annual-income-planning":   ["proposals_per_month", "pipeline_value_needed"],
    "fl-retainer-vs-project":      ["income_stability_score", "retainer_effective_hourly"],
    "fl-platform-fee-impact":      ["effective_fee_rate", "annual_fee_cost"],
}

# Fallback segment keys when exact segment has no data
# Ecommerce fallback
_ECOM_FALLBACK = "other_dtc_unknown_us_general"
# Freelance fallback — most general possible
_FL_FALLBACK = "fl_general_mid_global_upwork"


# ── Nightly aggregation job ───────────────────────────────────────────────────

async def run_benchmark_job() -> int:
    async with AsyncSessionLocal() as db:
        logger.info("Benchmark job starting...")
        total = 0
        for slug, metrics in METRIC_KEYS.items():
            total += await _process_calculator(db, slug, metrics)
        logger.info(f"Benchmark job done. {total} snapshots written.")
    return total


async def _process_calculator(db: AsyncSession, slug: str, metric_keys: list[str]) -> int:
    result = await db.execute(
        select(CalculationEvent.segment_key, CalculationEvent.output_snapshot)
        .where(CalculationEvent.calculator_slug == slug)
        .where(CalculationEvent.event_type == "calculation_run")
        .where(CalculationEvent.output_snapshot.isnot(None))
        .where(CalculationEvent.segment_key.isnot(None))
    )
    rows = result.fetchall()
    if not rows:
        return 0

    segments: dict[str, list[dict]] = {}
    for seg_key, output in rows:
        if seg_key and output:
            segments.setdefault(seg_key, []).append(output)

    written = 0
    for seg_key, outputs in segments.items():
        if len(outputs) < MIN_SAMPLE_SIZE:
            continue
        for metric_key in metric_keys:
            values = sorted([
                float(o[metric_key]) for o in outputs
                if o.get(metric_key) is not None and _is_numeric(o[metric_key])
            ])
            if len(values) < MIN_SAMPLE_SIZE:
                continue
            n = len(values)

            def pct(p: float) -> float:
                idx = (p / 100) * (n - 1)
                lo, hi = int(idx), min(int(idx) + 1, n - 1)
                return values[lo] + (values[hi] - values[lo]) * (idx - lo)

            await db.execute(text("""
                INSERT INTO benchmark_snapshots
                    (segment_key, calculator_slug, metric_key, sample_count,
                     p10_value, p25_value, p50_value, p75_value, p90_value,
                     mean_value, computed_at, is_published)
                VALUES (:seg, :slug, :metric, :n,
                        :p10, :p25, :p50, :p75, :p90, :mean, NOW(), :pub)
                ON CONFLICT (segment_key, calculator_slug, metric_key) DO UPDATE SET
                    sample_count=EXCLUDED.sample_count,
                    p10_value=EXCLUDED.p10_value, p25_value=EXCLUDED.p25_value,
                    p50_value=EXCLUDED.p50_value, p75_value=EXCLUDED.p75_value,
                    p90_value=EXCLUDED.p90_value, mean_value=EXCLUDED.mean_value,
                    computed_at=EXCLUDED.computed_at, is_published=EXCLUDED.is_published
            """), dict(
                seg=seg_key, slug=slug, metric=metric_key, n=n,
                p10=round(pct(10), 4), p25=round(pct(25), 4),
                p50=round(pct(50), 4), p75=round(pct(75), 4),
                p90=round(pct(90), 4), mean=round(sum(values)/n, 4),
                pub=(n >= MIN_SAMPLE_SIZE)
            ))
            written += 1
    await db.commit()
    return written


# ── Main benchmark lookup (anchor-aware) ─────────────────────────────────────

async def get_benchmark(
    db: AsyncSession,
    calculator_slug: str,
    metric_key: str,
    user_value: float,
    segment_key: str,
) -> dict | None:
    """
    Returns benchmark data for a user value, or None if nothing available.

    Lookup chain:
    1. benchmark_snapshots — exact segment (organic, n>=30, auto-published)
    2. benchmark_snapshots — generic fallback segment
    3. benchmark_anchors   — exact segment (public-data-seeded, transparent)
    4. benchmark_anchors   — generic fallback segment
    5. None

    The returned dict always includes is_anchor (bool) and, when True,
    source_name and source_url so the frontend can display attribution.
    """
    try:
        # Determine fallback segment based on calculator type
        fallback = _FL_FALLBACK if calculator_slug.startswith("fl-") else _ECOM_FALLBACK

        # ── Step 1 & 2: Organic benchmark_snapshots ───────────────────────────
        for seg in [segment_key, fallback]:
            row = await _fetch_organic(db, seg, calculator_slug, metric_key)
            if row:
                return _build_result(user_value, row, seg, is_anchor=False)

        # ── Step 3 & 4: Anchor benchmarks (public data) ───────────────────────
        for seg in [segment_key, fallback]:
            row = await _fetch_anchor(db, seg, calculator_slug, metric_key)
            if row:
                return _build_result(user_value, row, seg, is_anchor=True,
                                     source_name=row["source_name"],
                                     source_url=row["source_url"])

        return None

    except Exception as e:
        logger.error(f"get_benchmark error: {e}")
        return None


async def _fetch_organic(
    db: AsyncSession, seg: str, slug: str, metric: str
) -> dict | None:
    result = await db.execute(text("""
        SELECT p10_value, p25_value, p50_value, p75_value, p90_value,
               mean_value, sample_count
        FROM benchmark_snapshots
        WHERE segment_key = :seg
          AND calculator_slug = :slug
          AND metric_key = :metric
          AND is_published = TRUE
        LIMIT 1
    """), {"seg": seg, "slug": slug, "metric": metric})
    row = result.fetchone()
    if not row or row[2] is None:
        return None
    return {
        "p10": _f(row[0]), "p25": _f(row[1]), "p50": _f(row[2]),
        "p75": _f(row[3]), "p90": _f(row[4]), "mean": _f(row[5]),
        "sample_count": int(row[6]) if row[6] else 0,
    }


async def _fetch_anchor(
    db: AsyncSession, seg: str, slug: str, metric: str
) -> dict | None:
    result = await db.execute(text("""
        SELECT p25_value, p50_value, p75_value, sample_size,
               source_name, source_url
        FROM benchmark_anchors
        WHERE segment_key = :seg
          AND calculator_slug = :slug
          AND metric_key = :metric
        LIMIT 1
    """), {"seg": seg, "slug": slug, "metric": metric})
    row = result.fetchone()
    if not row or row[1] is None:
        return None
    # Estimate p10 and p90 from IQR for anchor data (we only have p25/p50/p75)
    p25, p50, p75 = _f(row[0]), _f(row[1]), _f(row[2])
    iqr = (p75 or 0) - (p25 or 0)
    return {
        "p10": max(0, (p25 or 0) - iqr * 0.5),
        "p25": p25, "p50": p50, "p75": p75,
        "p90": (p75 or 0) + iqr * 0.5,
        "mean": p50,  # use median as mean approximation for anchor
        "sample_count": int(row[3]) if row[3] else 0,
        "source_name": row[4] or "",
        "source_url": row[5] or "",
    }


def _build_result(
    user_value: float,
    data: dict,
    segment_key: str,
    is_anchor: bool,
    source_name: str = "",
    source_url: str = "",
) -> dict:
    p50 = data["p50"] or 0
    pts = [
        (data["p10"] or 0, 10), (data["p25"] or 0, 25),
        (p50, 50), (data["p75"] or 0, 75), (data["p90"] or 0, 90),
    ]
    user_pct = _estimate_pct(user_value, pts)
    diff = ((user_value - p50) / abs(p50) * 100) if p50 else 0
    vs_label = "above median" if diff > 20 else "below median" if diff < -20 else "at median"

    result = {
        "segment_key": segment_key,
        "sample_count": data["sample_count"],
        "p10": data["p10"], "p25": data["p25"], "p50": p50,
        "p75": data["p75"], "p90": data["p90"], "mean": data["mean"],
        "user_value": user_value,
        "user_percentile": user_pct,
        "user_vs_median": vs_label,
        "is_anchor": is_anchor,
    }
    if is_anchor:
        result["source_name"] = source_name
        result["source_url"] = source_url
        result["anchor_note"] = (
            f"Based on {source_name} (n={data['sample_count']:,}). "
            "Updates to live Valcr data as your segment grows."
        )
    return result


def _f(v) -> float | None:
    try: return float(v) if v is not None else None
    except: return None


def _is_numeric(v) -> bool:
    try: float(v); return True
    except: return False


def _estimate_pct(value: float, pts: list) -> int:
    if value <= pts[0][0]: return 5
    if value >= pts[-1][0]: return 95
    for i in range(len(pts) - 1):
        lo_v, lo_p = pts[i]; hi_v, hi_p = pts[i + 1]
        if lo_v <= value <= hi_v:
            r = (value - lo_v) / (hi_v - lo_v) if hi_v != lo_v else 0
            return int(lo_p + r * (hi_p - lo_p))
    return 50
