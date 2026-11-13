-- ==============================================================================
-- GOOD GRADE ACADEMY — REVIEWS DATABASE SCHEMA & SECURITY POLICIES
-- Target Platform: Supabase (PostgreSQL 15+)
-- ==============================================================================

-- 1. Create the reviews table
CREATE TABLE IF NOT EXISTS public.reviews (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL CHECK (char_length(trim(name)) > 0),
    role TEXT NOT NULL DEFAULT 'Student' CHECK (role IN ('Student', 'Parent', 'Alumni')),
    rating SMALLINT NOT NULL CHECK (rating >= 1 AND rating <= 5),
    course TEXT NOT NULL CHECK (char_length(trim(course)) > 0),
    message TEXT NOT NULL CHECK (char_length(trim(message)) >= 10),
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    approved_at TIMESTAMPTZ,
    approved_by TEXT
);

-- 2. Performance indexes
CREATE INDEX IF NOT EXISTS idx_reviews_status_created 
    ON public.reviews (status, created_at DESC);

-- 3. Enable Row Level Security (RLS)
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

-- 4. Clean up any existing policies
DROP POLICY IF EXISTS "Public can submit pending reviews" ON public.reviews;
DROP POLICY IF EXISTS "Public can view approved reviews" ON public.reviews;
DROP POLICY IF EXISTS "Authenticated admin can view all reviews" ON public.reviews;
DROP POLICY IF EXISTS "Authenticated admin can update reviews" ON public.reviews;
DROP POLICY IF EXISTS "Authenticated admin can delete reviews" ON public.reviews;
DROP POLICY IF EXISTS "Admins can view all reviews" ON public.reviews;
DROP POLICY IF EXISTS "Admins can update reviews" ON public.reviews;
DROP POLICY IF EXISTS "Admins can delete reviews" ON public.reviews;

-- ==============================================================================
-- TABLE PRIVILEGES (GRANT PERMISSIONS)
-- Ensures explicit least-privilege access for anon and authenticated roles
-- ==============================================================================
REVOKE ALL PRIVILEGES ON TABLE public.reviews FROM anon, authenticated;

GRANT USAGE ON SCHEMA public TO anon, authenticated;

GRANT SELECT ON public.reviews TO anon, authenticated;

GRANT INSERT (name, role, rating, course, message)
ON public.reviews TO anon, authenticated;

GRANT DELETE ON public.reviews TO authenticated;

GRANT UPDATE (status, approved_at, approved_by)
ON public.reviews TO authenticated;

-- ==============================================================================
-- ROW LEVEL SECURITY POLICIES
-- ==============================================================================

-- POLICY 1: Public INSERT
-- Anyone (anonymous or authenticated) can submit a review, BUT:
-- - status must strictly be 'pending'
-- - approved_at and approved_by must strictly be NULL to prevent forgery
CREATE POLICY "Public can submit pending reviews"
    ON public.reviews
    FOR INSERT
    TO anon, authenticated
    WITH CHECK (
        status = 'pending'
        AND approved_at IS NULL
        AND approved_by IS NULL
    );

-- POLICY 2: Public SELECT
-- Anonymous visitors and ordinary authenticated users can view ONLY approved reviews.
CREATE POLICY "Public can view approved reviews"
    ON public.reviews
    FOR SELECT
    TO anon, authenticated
    USING (
        status = 'approved'
    );

-- POLICY 3: Admin SELECT
-- ONLY users with role = 'admin' in trusted auth.jwt() app_metadata can view ALL reviews
-- (pending, approved, rejected). Ordinary authenticated users cannot view unapproved reviews.
CREATE POLICY "Admins can view all reviews"
    ON public.reviews
    FOR SELECT
    TO authenticated
    USING (
        (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin'
    );

-- POLICY 4: Admin UPDATE
-- ONLY users with role = 'admin' in trusted auth.jwt() app_metadata can update review status.
-- Combined with column-level GRANT and immutability trigger below, only moderation fields can change.
CREATE POLICY "Admins can update reviews"
    ON public.reviews
    FOR UPDATE
    TO authenticated
    USING (
        (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin'
    )
    WITH CHECK (
        (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin'
    );

-- POLICY 5: Admin DELETE
-- ONLY users with role = 'admin' in trusted auth.jwt() app_metadata can delete reviews.
CREATE POLICY "Admins can delete reviews"
    ON public.reviews
    FOR DELETE
    TO authenticated
    USING (
        (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin'
    );

-- ==============================================================================
-- CONTENT IMMUTABILITY TRIGGER
-- Strictly enforces that during an UPDATE, review content cannot be tampered with.
-- Only status, approved_at, and approved_by can ever be changed.
-- ==============================================================================

CREATE OR REPLACE FUNCTION public.check_review_update_immutability()
RETURNS TRIGGER AS $$
BEGIN
    IF (NEW.id IS DISTINCT FROM OLD.id) OR
       (NEW.name IS DISTINCT FROM OLD.name) OR
       (NEW.role IS DISTINCT FROM OLD.role) OR
       (NEW.rating IS DISTINCT FROM OLD.rating) OR
       (NEW.course IS DISTINCT FROM OLD.course) OR
       (NEW.message IS DISTINCT FROM OLD.message) OR
       (NEW.created_at IS DISTINCT FROM OLD.created_at) THEN
        RAISE EXCEPTION 'Forbidden: Review content (name, role, rating, course, message, created_at) cannot be modified. Only status, approved_at, and approved_by are editable during moderation.';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY INVOKER SET search_path = '';

DROP TRIGGER IF EXISTS trg_review_immutability ON public.reviews;
CREATE TRIGGER trg_review_immutability
    BEFORE UPDATE ON public.reviews
    FOR EACH ROW
    EXECUTE FUNCTION public.check_review_update_immutability();

-- ==============================================================================
-- ADMINISTRATOR SETUP & PROMOTION INSTRUCTIONS
-- ==============================================================================
-- 1. Create User:
--    In Supabase Dashboard, go to: Authentication -> Users -> "Add User" (enter admin email and password).
--
-- 2. Promote to Admin (app_metadata):
--    Run the SQL query below in the SQL Editor to grant the trusted 'admin' role in app_metadata:
--
--    UPDATE auth.users
--    SET raw_app_meta_data = raw_app_meta_data || '{"role": "admin"}'::jsonb
--    WHERE email = 'YOUR_ADMIN_EMAIL_HERE';
--
-- 3. JWT Refresh Requirement:
--    Supabase JWT tokens are generated at login and cached in browser storage.
--    If the user was already signed in when promoted, their existing JWT will NOT have
--    the new app_metadata claim until they either:
--      a) Sign out and sign in again, OR
--      b) Refresh their session token via supabase.auth.refreshSession().
-- ==============================================================================
