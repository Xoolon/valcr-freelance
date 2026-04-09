# Backend Integration — Exact Steps

## Overview
The freelance frontend uses the **same FastAPI backend** as valcr.site.
No new server. No new domain. Same API keys. Same Paystack.
These are the only backend changes required.

---

## Step 1 — Run the SQL migration (Supabase SQL Editor)

Open `benchmark_anchors_migration.sql` and run it in your Supabase SQL editor.
This creates:
- `benchmark_anchors` table with seeded anchor data from public sources
- Adds `product_source` column to `session_profiles`

**Run once. Idempotent (safe to run again).**

---

## Step 2 — Replace benchmark_service.py

Replace `app/services/benchmark_service.py` with `benchmark_service_updated.py`.

Key change: `get_benchmark()` now falls back to `benchmark_anchors` when
organic data (n<30) is unavailable. Returns `is_anchor=True` with source
attribution when anchor data is used. The frontend benchmark badge reads this
and shows the source label transparently.

---

## Step 3 — Add segment_classifier_freelance.py

Copy `segment_classifier_freelance.py` to `app/services/`.

Then update `app/services/segment_classifier.py` — add 4 lines at the top
of `compute_segment_key()`:

```python
from app.services.segment_classifier_freelance import compute_freelance_segment_key

def compute_segment_key(inputs: dict, calculator_slug: str) -> str:
    # Route freelance slugs to freelance classifier
    if calculator_slug and calculator_slug.startswith("fl-"):
        return compute_freelance_segment_key(inputs, calculator_slug)
    # ... rest of existing ecommerce logic unchanged ...
```

---

## Step 4 — Update session init endpoint in telemetry.py

Open `app/api/v1/telemetry.py`. Find `@router.post("/session")`.

Add `SessionInitPayload` model and update the endpoint to accept
`product_source` from the request body. See `session_service_patch.py`
for the exact replacement code.

Also add `product_source` column to `SessionProfile` model in
`app/models/session_profile.py`:
```python
product_source = Column(String(20), default="ecommerce", nullable=True)
```

---

## Step 5 — Update SessionProfile model

In `app/models/session_profile.py`, add after existing columns:
```python
product_source = Column(String(20), default="ecommerce", nullable=True)
```

---

## Step 6 — Restart your EC2 backend

```bash
sudo systemctl restart valcr-api
# or however you manage the process
```

---

## That's it — no other backend changes needed.

- Auth endpoints: unchanged (shared login works automatically)
- Paystack endpoints: unchanged (same plan codes, same webhook)
- Telemetry events endpoint: unchanged (fl- slugs route correctly)
- Benchmark lookup endpoints: unchanged (now anchor-aware via updated service)
- Calculations save/compare/export: unchanged
- CORS: add `freelance.valcr.site` to your allowed origins if you have it
  explicitly listed. If you use wildcard `*` you're already fine.

---

## CORS update (if needed)

In your FastAPI main.py or CORS middleware config, ensure:
```python
allow_origins=[
    "https://valcr.site",
    "https://www.valcr.site",
    "https://freelance.valcr.site",  # ADD THIS
    "http://localhost:5173",
    "http://localhost:5174",          # ADD THIS (dev)
]
```

---

## Verifying it works

After deployment, open browser devtools on freelance.valcr.site and check:
1. Network tab → POST /telemetry/session returns 200 with anonymous_id
2. POST /telemetry/events returns 202 when you run a calculator
3. GET /telemetry/recent-calculators returns fl- prefixed slugs after login
4. POST /benchmarks/lookup-bulk returns benchmark data (may be anchor initially)

The session_profiles table in Supabase should show product_source='freelance'
for sessions initiated from freelance.valcr.site.
