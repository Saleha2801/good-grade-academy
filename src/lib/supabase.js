import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

/**
 * Checks whether valid Supabase credentials have been provided in environment.
 * Rejects placeholder or undefined values.
 */
export const isSupabaseConfigured = () => {
  return Boolean(
    supabaseUrl &&
    supabaseAnonKey &&
    supabaseUrl.startsWith('http') &&
    !supabaseUrl.includes('your-project-id') &&
    !supabaseAnonKey.includes('your-supabase-anon')
  );
};

/**
 * Supabase client instance (or null if unconfigured).
 * Uses standard public anon key for all client interactions.
 * Never includes or exposes the service_role key.
 */
export const supabase = isSupabaseConfigured()
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
      },
    })
  : null;

/**
 * Validates whether a user has administrator authorization.
 * 
 * CRITICAL SECURITY RULE:
 * Reads exclusively from `app_metadata` (server/admin controlled claims in JWT),
 * NEVER from user-editable `user_metadata`.
 */
export function isUserAdmin(user) {
  if (!user || typeof user !== 'object') return false;
  const appMeta = user.app_metadata;
  return Boolean(appMeta && appMeta.role === 'admin');
}

/**
 * Fetches all approved reviews for public display.
 * RLS enforces that only status = 'approved' is returned for public queries.
 * Database columns queried: id, name, role, rating, course, message, created_at, status
 */
export async function fetchApprovedReviews() {
  if (!isSupabaseConfigured() || !supabase) {
    return { data: [], error: null, isConfigured: false };
  }

  try {
    const { data, error } = await supabase
      .from('reviews')
      .select('id, name, role, rating, course, message, created_at, status')
      .eq('status', 'approved')
      .order('created_at', { ascending: false });

    if (error) {
      console.warn('Error fetching approved reviews from Supabase:', error.message);
      return { data: [], error, isConfigured: true };
    }

    return { data: data || [], error: null, isConfigured: true };
  } catch (err) {
    console.warn('Unexpected error in fetchApprovedReviews:', err);
    return { data: [], error: err, isConfigured: true };
  }
}

/**
 * Submits a new review with status = 'pending'.
 * Accessible to public visitors via RLS policy.
 * 
 * Database columns inserted:
 * - name, role, rating, course, message, status ('pending')
 * 
 * Omitted to prevent tampering:
 * - approved_at (null)
 * - approved_by (null)
 */
export async function submitReview({ name, role, rating, course, message }) {
  if (!isSupabaseConfigured() || !supabase) {
    return {
      data: null,
      error: new Error(
        'Database is not configured. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env file.'
      ),
      isConfigured: false,
    };
  }

  // Frontend input validation
  const sanitizedName = String(name || '').trim();
  const sanitizedCourse = String(course || '').trim();
  const sanitizedMessage = String(message || '').trim();
  const sanitizedRole = ['Student', 'Parent', 'Alumni'].includes(role) ? role : 'Student';
  const sanitizedRating = Math.min(5, Math.max(1, Math.round(Number(rating) || 5)));

  if (!sanitizedName) {
    return { data: null, error: new Error('Please enter your full name.'), isConfigured: true };
  }
  if (!sanitizedCourse) {
    return { data: null, error: new Error('Please select a course or standard.'), isConfigured: true };
  }
  if (sanitizedMessage.length < 10) {
    return { data: null, error: new Error('Review message must be at least 10 characters.'), isConfigured: true };
  }

  try {
    const { error } = await supabase
      .from('reviews')
      .insert([
        {
          name: sanitizedName,
          role: sanitizedRole,
          rating: sanitizedRating,
          course: sanitizedCourse,
          message: sanitizedMessage,
          // status is omitted so the database sets its default ('pending')
        },
      ]);

    if (error) {
      return { data: null, error, isConfigured: true };
    }

    return { data: null, error: null, isConfigured: true };
  } catch (err) {
    return { data: null, error: err, isConfigured: true };
  }
}

/**
 * Admin Sign-in with Supabase Auth.
 * Authenticates the user AND strictly verifies that their JWT `app_metadata.role` is 'admin'.
 * If an ordinary authenticated user signs in, they are immediately signed out and rejected.
 */
export async function adminSignIn(email, password) {
  if (!isSupabaseConfigured() || !supabase) {
    throw new Error('Supabase backend is not configured.');
  }

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error;

  const user = data.user;
  if (!isUserAdmin(user)) {
    // Unprivileged user: immediately invalidate session so they cannot retain tokens
    await supabase.auth.signOut();
    throw new Error(
      'Access Denied: This account does not possess administrator privileges. Only users with role: "admin" in app_metadata are authorized.'
    );
  }

  return data;
}

/**
 * Refreshes the active session to pick up recently updated `app_metadata` claims.
 * Required after promoting a user in the Supabase SQL Editor / Dashboard.
 */
export async function refreshAdminSession() {
  if (!isSupabaseConfigured() || !supabase) return null;
  const { data, error } = await supabase.auth.refreshSession();
  if (error) throw error;
  
  const user = data?.session?.user;
  if (user && !isUserAdmin(user)) {
    await supabase.auth.signOut();
    return null;
  }
  return data?.session || null;
}

/**
 * Admin Sign-out
 */
export async function adminSignOut() {
  if (!supabase) return;
  await supabase.auth.signOut();
}

/**
 * Get current authenticated administrator session.
 * Re-validates that the session belongs to a verified admin.
 */
export async function getAdminSession() {
  if (!isSupabaseConfigured() || !supabase) return null;
  const { data } = await supabase.auth.getSession();
  const session = data?.session;
  
  if (session?.user) {
    if (!isUserAdmin(session.user)) {
      // Ordinary user session detected in storage: invalidate
      await supabase.auth.signOut();
      return null;
    }
    return session;
  }
  return null;
}

/**
 * Fetches all reviews across statuses (pending, approved, rejected) for moderation.
 * Protected by frontend admin guard and PostgreSQL Row Level Security (RLS).
 * Database columns queried: id, name, role, rating, course, message, status, created_at, approved_at, approved_by
 */
export async function fetchAllReviewsForAdmin() {
  if (!isSupabaseConfigured() || !supabase) {
    return { data: [], error: new Error('Supabase not configured') };
  }

  const session = await getAdminSession();
  if (!session) {
    return { data: [], error: new Error('Unauthorized: Administrator session required.') };
  }

  const { data, error } = await supabase
    .from('reviews')
    .select('id, name, role, rating, course, message, status, created_at, approved_at, approved_by')
    .order('created_at', { ascending: false });

  return { data: data || [], error };
}

/**
 * Updates review moderation status (approve / reject).
 * Protected by frontend admin guard, PostgreSQL column-level privileges, and immutability trigger.
 * Editable fields: status, approved_at, approved_by
 */
export async function updateReviewStatus(id, newStatus, adminIdentifier = 'Admin') {
  if (!isSupabaseConfigured() || !supabase) {
    return { error: new Error('Supabase not configured') };
  }

  const session = await getAdminSession();
  if (!session) {
    return { error: new Error('Unauthorized: Administrator authorization required.') };
  }

  const validStatuses = ['pending', 'approved', 'rejected'];
  if (!validStatuses.includes(newStatus)) {
    return { error: new Error('Invalid review status requested.') };
  }

  // Modifies strictly moderation columns. Original content fields are untouched.
  const updatePayload = {
    status: newStatus,
    approved_at: newStatus === 'approved' ? new Date().toISOString() : null,
    approved_by: newStatus === 'approved' ? adminIdentifier : null,
  };

  const { data, error } = await supabase
    .from('reviews')
    .update(updatePayload)
    .eq('id', id)
    .select('id, name, role, rating, course, message, status, created_at, approved_at, approved_by');

  return { data, error };
}

/**
 * Permanently deletes a review.
 * Protected by frontend admin guard and PostgreSQL Row Level Security (RLS).
 */
export async function deleteReview(id) {
  if (!isSupabaseConfigured() || !supabase) {
    return { error: new Error('Supabase not configured') };
  }

  const session = await getAdminSession();
  if (!session) {
    return { error: new Error('Unauthorized: Administrator authorization required.') };
  }

  const { error } = await supabase.from('reviews').delete().eq('id', id);
  return { error };
}
