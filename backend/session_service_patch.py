"""
session_service PATCH — product_source support.

Apply to your existing app/api/v1/telemetry.py — update the /session endpoint
to accept an optional product_source field and store it on the session profile.

Step 1: Update the session init endpoint in telemetry.py:
    Replace your existing @router.post("/session") with the version below.

Step 2: Run the migration SQL (already in benchmark_anchors_migration.sql):
    ALTER TABLE session_profiles ADD COLUMN IF NOT EXISTS product_source VARCHAR(20) DEFAULT 'ecommerce';

This lets you query:
    SELECT product_source, COUNT(*) FROM session_profiles GROUP BY product_source;
    -- Returns: ecommerce | 1,842 / freelance | 394

And in the admin dashboard:
    SELECT
        product_source,
        COUNT(DISTINCT user_id) as registered_users,
        COUNT(*) as total_sessions
    FROM session_profiles
    WHERE user_id IS NOT NULL
    GROUP BY product_source;
"""

# ── Paste this into telemetry.py, replacing the existing /session route ───────

UPDATED_SESSION_ENDPOINT = '''
class SessionInitPayload(BaseModel):
    product_source: str = "ecommerce"  # "ecommerce" or "freelance"


@router.post("/session")
async def init_session(
    request: Request,
    body: SessionInitPayload | None = None,
    db: AsyncSession = Depends(get_db),
    anonymous_id: str | None = Cookie(default=None, alias="valcr_aid"),
):
    meta = _extract_meta(request)
    profile, is_new = await get_or_create_session(db, anonymous_id, meta)

    # Update product_source on new sessions (tells us which tool acquired this user)
    if is_new and body and body.product_source in ("ecommerce", "freelance"):
        profile.product_source = body.product_source
        await db.commit()

    response = JSONResponse(content={
        "anonymous_id": profile.anonymous_id,
        "is_new": is_new,
        "show_consent_banner": is_new,
        "session_count": profile.session_count,
    })
    response.set_cookie(
        key=COOKIE_NAME, value=profile.anonymous_id,
        max_age=COOKIE_MAX_AGE, httponly=True, secure=False, samesite="lax"
    )
    return response
'''

# ── Also add product_source to SessionProfile model ───────────────────────────
MODEL_ADDITION = '''
# Add to app/models/session_profile.py after the existing columns:
product_source = Column(String(20), default="ecommerce", nullable=True)
'''

if __name__ == "__main__":
    print("This file is documentation/reference only.")
    print("Apply the patches manually as described in the docstring.")
    print()
    print("Updated /session endpoint:")
    print(UPDATED_SESSION_ENDPOINT)
    print()
    print("Add to SessionProfile model:")
    print(MODEL_ADDITION)
