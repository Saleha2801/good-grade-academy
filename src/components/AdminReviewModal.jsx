import React, { useState, useEffect } from 'react';
import {
  X,
  Shield,
  ShieldAlert,
  Lock,
  Mail,
  Key,
  LogOut,
  Check,
  XCircle,
  Trash2,
  RefreshCw,
  Star,
  Clock,
  CheckCircle2,
  AlertCircle,
  Database,
  ExternalLink,
  UserCheck,
} from 'lucide-react';
import {
  isSupabaseConfigured,
  isUserAdmin,
  adminSignIn,
  adminSignOut,
  getAdminSession,
  refreshAdminSession,
  fetchAllReviewsForAdmin,
  updateReviewStatus,
  deleteReview,
} from '../lib/supabase';

export default function AdminReviewModal({ isOpen, onClose, onReviewsUpdated }) {
  const [session, setSession] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState('');

  const [reviews, setReviews] = useState([]);
  const [loadingReviews, setLoadingReviews] = useState(false);
  const [activeTab, setActiveTab] = useState('pending'); // 'pending' | 'approved' | 'rejected' | 'all'
  const [actionMessage, setActionMessage] = useState('');
  const [isRefreshingToken, setIsRefreshingToken] = useState(false);

  const configured = isSupabaseConfigured();

  // Check existing session on mount or open
  useEffect(() => {
    if (isOpen && configured) {
      getAdminSession().then((activeSession) => {
        if (activeSession && isUserAdmin(activeSession.user)) {
          setSession(activeSession);
          loadReviews();
        } else {
          setSession(null);
        }
      });
    }
  }, [isOpen, configured]);

  const loadReviews = async () => {
    setLoadingReviews(true);
    setActionMessage('');
    try {
      const { data, error } = await fetchAllReviewsForAdmin();
      if (!error && data) {
        setReviews(data);
      } else if (error) {
        setActionMessage(`Error: ${error.message}`);
      }
    } catch (err) {
      console.error('Failed to load reviews:', err);
    } finally {
      setLoadingReviews(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setAuthLoading(true);
    setAuthError('');
    setActionMessage('');
    try {
      const data = await adminSignIn(email.trim(), password);
      setSession(data.session);
      await loadReviews();
    } catch (err) {
      setAuthError(err.message || 'Authentication failed. Please verify your admin credentials.');
    } finally {
      setAuthLoading(false);
    }
  };

  const handleRefreshToken = async () => {
    setIsRefreshingToken(true);
    setActionMessage('');
    try {
      const refreshed = await refreshAdminSession();
      if (refreshed && isUserAdmin(refreshed.user)) {
        setSession(refreshed);
        setActionMessage('Session token refreshed successfully with latest app_metadata.');
        await loadReviews();
      } else {
        setSession(null);
        setAuthError('Token refreshed: Account does not have role: "admin" in app_metadata.');
      }
    } catch (err) {
      setActionMessage(`Could not refresh token: ${err.message}`);
    } finally {
      setIsRefreshingToken(false);
    }
  };

  const handleLogout = async () => {
    await adminSignOut();
    setSession(null);
    setReviews([]);
    setActionMessage('');
  };

  const handleStatusChange = async (id, newStatus) => {
    setActionMessage(`Updating review to ${newStatus}...`);
    try {
      const adminEmail = session?.user?.email || 'admin';
      const { error } = await updateReviewStatus(id, newStatus, adminEmail);
      if (error) {
        setActionMessage(`Failed: ${error.message}`);
      } else {
        setActionMessage(`Review marked as ${newStatus}`);
        await loadReviews();
        if (onReviewsUpdated) onReviewsUpdated();
      }
    } catch (err) {
      setActionMessage(`Error: ${err.message}`);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to permanently delete this review?')) {
      return;
    }
    setActionMessage('Deleting review...');
    try {
      const { error } = await deleteReview(id);
      if (error) {
        setActionMessage(`Failed: ${error.message}`);
      } else {
        setActionMessage('Review permanently deleted');
        await loadReviews();
        if (onReviewsUpdated) onReviewsUpdated();
      }
    } catch (err) {
      setActionMessage(`Error: ${err.message}`);
    }
  };

  if (!isOpen) return null;

  // Filter reviews for admin view
  const pendingCount = reviews.filter((r) => r.status === 'pending').length;
  const approvedCount = reviews.filter((r) => r.status === 'approved').length;
  const rejectedCount = reviews.filter((r) => r.status === 'rejected').length;

  const filteredReviews = reviews.filter((r) => {
    if (activeTab === 'all') return true;
    return r.status === activeTab;
  });

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-xs animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="admin-modal-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full overflow-hidden border border-slate-200 flex flex-col max-h-[92vh]">
        {/* Modal Header */}
        <div className="bg-[#0f2c59] text-white px-6 py-4 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center border border-white/20">
              <Shield className="w-5 h-5 text-sky-400" />
            </div>
            <div>
              <h3 id="admin-modal-title" className="text-base sm:text-lg font-bold leading-tight">
                Review Moderation Portal
              </h3>
              <p className="text-xs text-sky-200">
                Authorized Administrator Access — Good Grade Academy
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {session && (
              <button
                type="button"
                onClick={handleLogout}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-white/10 hover:bg-white/20 text-white transition-colors"
                title="Sign out of Admin Portal"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Sign Out</span>
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto grow flex flex-col">
          {!configured ? (
            /* Database Not Configured Setup Guide */
            <div className="p-6 sm:p-8 max-w-2xl mx-auto text-center space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center mx-auto">
                <Database className="w-7 h-7" />
              </div>
              <h4 className="text-xl font-bold text-[#0f2c59]">
                Supabase Backend Setup Instructions
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-lg mx-auto">
                Follow these 4 steps to configure your database and create your secure administrator account:
              </p>

              <div className="p-4 sm:p-5 bg-slate-50 rounded-2xl border border-slate-200 text-left text-xs space-y-3 font-mono text-slate-700">
                <div className="flex items-start gap-2.5">
                  <span className="font-bold text-[#0f2c59] bg-white px-2 py-0.5 rounded border border-slate-200 shrink-0 font-sans">
                    Step 1
                  </span>
                  <span>Create a free project at https://supabase.com</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="font-bold text-[#0f2c59] bg-white px-2 py-0.5 rounded border border-slate-200 shrink-0 font-sans">
                    Step 2
                  </span>
                  <span>
                    In your Supabase SQL Editor, run the script from{' '}
                    <strong className="text-sky-700 font-bold">supabase/schema.sql</strong> to create the table, immutability trigger, and strict RLS policies.
                  </span>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="font-bold text-[#0f2c59] bg-white px-2 py-0.5 rounded border border-slate-200 shrink-0 font-sans">
                    Step 3
                  </span>
                  <div>
                    <span>
                      In Supabase Dashboard, go to <strong>Authentication &gt; Users &gt; Add User</strong>, create your admin account, then run:
                    </span>
                    <code className="text-emerald-700 font-semibold block mt-1 bg-white p-2 rounded border border-slate-200 select-all overflow-x-auto text-[11px]">
                      {"UPDATE auth.users SET raw_app_meta_data = raw_app_meta_data || '{\"role\": \"admin\"}'::jsonb WHERE email = 'YOUR_EMAIL';"}
                    </code>
                    <p className="font-sans text-[11px] text-amber-800 mt-1 bg-amber-50 p-1.5 rounded border border-amber-200">
                      <strong>Important:</strong> Supabase JWTs cache role claims at login. If you were already signed in when running this command, sign out and sign in again to refresh your token.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="font-bold text-[#0f2c59] bg-white px-2 py-0.5 rounded border border-slate-200 shrink-0 font-sans">
                    Step 4
                  </span>
                  <span>
                    Create a <strong className="text-sky-700 font-bold">.env</strong> file in your project root using{' '}
                    <strong className="text-sky-700 font-bold">.env.example</strong> with your Project URL &amp; Anon Key.
                  </span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-2.5 bg-[#0f2c59] hover:bg-[#0a1e3f] text-white rounded-xl text-xs font-bold shadow-md transition-all"
                >
                  Understood
                </button>
              </div>
            </div>
          ) : !session ? (
            /* Admin Sign-in Screen */
            <div className="max-w-md mx-auto w-full py-8 space-y-6">
              <div className="text-center space-y-2">
                <div className="w-12 h-12 bg-sky-50 text-[#0f2c59] rounded-2xl flex items-center justify-center mx-auto border border-sky-100">
                  <Lock className="w-6 h-6 text-sky-700" />
                </div>
                <h4 className="text-xl font-bold text-[#0f2c59]">Admin Authentication</h4>
                <p className="text-xs text-slate-500">
                  Sign in with your verified administrator credentials.
                </p>
              </div>

              {/* Security Advisory */}
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-start gap-2.5 text-xs text-slate-600">
                <Shield className="w-4 h-4 text-sky-700 shrink-0 mt-0.5" />
                <p>
                  <strong>Role-Based Access:</strong> Only users with the <code className="bg-white px-1 py-0.5 rounded border border-slate-200 text-sky-800 font-mono">role: "admin"</code> in trusted <code className="bg-white px-1 py-0.5 rounded border border-slate-200 text-sky-800 font-mono">app_metadata</code> are permitted. Ordinary users cannot access moderation functions.
                </p>
              </div>

              {authError && (
                <div className="p-3.5 bg-rose-50 rounded-xl border border-rose-200 flex items-start gap-2 text-xs text-rose-700">
                  <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{authError}</span>
                </div>
              )}

              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Administrator Email
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="admin@goodgradeacademy.com"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-sky-500 focus:ring-2 focus:ring-sky-200 text-sm text-slate-800 transition-all outline-hidden"
                    />
                    <Mail className="w-4 h-4 text-slate-400 absolute right-3.5 top-3" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••••••"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-sky-500 focus:ring-2 focus:ring-sky-200 text-sm text-slate-800 transition-all outline-hidden"
                    />
                    <Key className="w-4 h-4 text-slate-400 absolute right-3.5 top-3" />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={authLoading}
                  className="w-full py-3 bg-[#0f2c59] hover:bg-[#0a1e3f] text-white font-bold text-sm rounded-xl shadow-md transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {authLoading ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Verifying Authorization...</span>
                    </>
                  ) : (
                    <>
                      <Lock className="w-4 h-4" />
                      <span>Sign In as Admin</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          ) : (
            /* Moderation Queue Dashboard */
            <div className="space-y-5 grow flex flex-col">
              {/* Authenticated Admin Status Badge */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-xs">
                <div className="flex items-center gap-2 flex-wrap">
                  <UserCheck className="w-4 h-4 text-emerald-700" />
                  <span className="text-emerald-950">
                    Logged in as: <strong>{session.user.email}</strong>
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-200 text-emerald-900 font-bold text-[10px] uppercase tracking-wider">
                    Role: Admin (app_metadata)
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleRefreshToken}
                    disabled={isRefreshingToken}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-white border border-emerald-300 text-emerald-800 text-[11px] font-semibold hover:bg-emerald-100 transition-colors"
                    title="Refresh JWT token claims from Supabase Auth"
                  >
                    <RefreshCw className={`w-3 h-3 ${isRefreshingToken ? 'animate-spin' : ''}`} />
                    <span>Refresh Token</span>
                  </button>
                  <span className="text-emerald-700 font-semibold text-[11px] hidden md:inline">
                    PostgreSQL RLS Active
                  </span>
                </div>
              </div>

              {/* Controls & Filter Tabs */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200">
                <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
                  <button
                    type="button"
                    onClick={() => setActiveTab('pending')}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-colors flex items-center gap-1.5 ${
                      activeTab === 'pending'
                        ? 'bg-amber-100 text-amber-900 border border-amber-300'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    <Clock className="w-3.5 h-3.5 text-amber-600" />
                    <span>Pending</span>
                    <span className="px-1.5 py-0.2 rounded-full bg-amber-200 text-amber-900 text-[10px]">
                      {pendingCount}
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveTab('approved')}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-colors flex items-center gap-1.5 ${
                      activeTab === 'approved'
                        ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Approved</span>
                    <span className="px-1.5 py-0.2 rounded-full bg-emerald-200 text-emerald-900 text-[10px]">
                      {approvedCount}
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveTab('rejected')}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-colors flex items-center gap-1.5 ${
                      activeTab === 'rejected'
                        ? 'bg-rose-100 text-rose-900 border border-rose-300'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    <XCircle className="w-3.5 h-3.5 text-rose-600" />
                    <span>Rejected</span>
                    <span className="px-1.5 py-0.2 rounded-full bg-rose-200 text-rose-900 text-[10px]">
                      {rejectedCount}
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveTab('all')}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                      activeTab === 'all'
                        ? 'bg-slate-800 text-white'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    All ({reviews.length})
                  </button>
                </div>

                <button
                  type="button"
                  onClick={loadReviews}
                  disabled={loadingReviews}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors shrink-0"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${loadingReviews ? 'animate-spin' : ''}`} />
                  <span>Refresh Queue</span>
                </button>
              </div>

              {actionMessage && (
                <div className="p-2.5 bg-sky-50 rounded-lg border border-sky-200 text-xs text-sky-800 font-medium">
                  {actionMessage}
                </div>
              )}

              {/* Review Cards List */}
              {loadingReviews ? (
                <div className="py-12 text-center text-slate-500 space-y-2">
                  <RefreshCw className="w-6 h-6 animate-spin mx-auto text-[#0f2c59]" />
                  <p className="text-xs">Fetching reviews from Supabase...</p>
                </div>
              ) : filteredReviews.length === 0 ? (
                <div className="py-12 text-center text-slate-400 space-y-2">
                  <p className="text-sm font-semibold">No reviews in this queue.</p>
                  <p className="text-xs">
                    Reviews with status &quot;{activeTab}&quot; will appear here.
                  </p>
                </div>
              ) : (
                <div className="space-y-3 overflow-y-auto">
                  {filteredReviews.map((rev) => (
                    <div
                      key={rev.id}
                      className="p-4 rounded-xl border border-slate-200 hover:border-slate-300 bg-white transition-all shadow-2xs flex flex-col md:flex-row md:items-start justify-between gap-4"
                    >
                      <div className="space-y-2 grow">
                        <div className="flex flex-wrap items-center gap-2">
                          <h5 className="text-sm font-bold text-slate-900">{rev.name}</h5>
                          <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                            {rev.role}
                          </span>
                          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-sky-50 text-sky-800 border border-sky-100">
                            {rev.course}
                          </span>
                          <div className="flex items-center gap-0.5 ml-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-3 h-3 ${
                                  i < rev.rating
                                    ? 'text-amber-400 fill-amber-400'
                                    : 'text-slate-200'
                                }`}
                              />
                            ))}
                          </div>
                        </div>

                        <p className="text-xs text-slate-600 leading-relaxed italic bg-slate-50 p-3 rounded-lg border border-slate-100">
                          &ldquo;{rev.message}&rdquo;
                        </p>

                        <div className="flex items-center gap-3 text-[11px] text-slate-400 flex-wrap">
                          <span>Submitted: {new Date(rev.created_at).toLocaleDateString()}</span>
                          {rev.approved_by && (
                            <span>• Moderated by: {rev.approved_by}</span>
                          )}
                          <span
                            className={`font-bold uppercase tracking-wider px-1.5 py-0.2 rounded text-[9px] ${
                              rev.status === 'approved'
                                ? 'bg-emerald-100 text-emerald-800'
                                : rev.status === 'rejected'
                                ? 'bg-rose-100 text-rose-800'
                                : 'bg-amber-100 text-amber-800'
                            }`}
                          >
                            {rev.status}
                          </span>
                        </div>
                      </div>

                      {/* Action buttons */}
                      <div className="flex sm:flex-col items-center gap-2 shrink-0 border-t sm:border-t-0 sm:border-l border-slate-100 pt-3 sm:pt-0 sm:pl-4">
                        {rev.status !== 'approved' && (
                          <button
                            type="button"
                            onClick={() => handleStatusChange(rev.id, 'approved')}
                            className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white transition-colors"
                          >
                            <Check className="w-3.5 h-3.5" />
                            <span>Approve</span>
                          </button>
                        )}

                        {rev.status !== 'rejected' && (
                          <button
                            type="button"
                            onClick={() => handleStatusChange(rev.id, 'rejected')}
                            className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-amber-500 hover:bg-amber-600 text-white transition-colors"
                          >
                            <XCircle className="w-3.5 h-3.5" />
                            <span>Reject</span>
                          </button>
                        )}

                        <button
                          type="button"
                          onClick={() => handleDelete(rev.id)}
                          className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 hover:bg-rose-50 text-slate-600 hover:text-rose-700 border border-slate-200 transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Delete</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
