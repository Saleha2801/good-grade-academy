import React, { useState, useEffect, useCallback } from 'react';
import {
  Shield,
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
  Search,
  ExternalLink,
  UserCheck,
  ArrowLeft,
  MessageSquare,
  FileText,
  AlertTriangle,
} from 'lucide-react';
import {
  isSupabaseConfigured,
  isUserAdmin,
  adminSignIn,
  adminSignOut,
  getAdminSession,
  onAuthStateChange,
  fetchAllReviewsForAdmin,
  updateReviewStatus,
  deleteReview,
} from '../lib/supabase';
import { academyInfo } from '../config/academyInfo';

export default function AdminPage({ onNavigateHome }) {
  // Authentication State
  const [session, setSession] = useState(null);
  const [adminUser, setAdminUser] = useState(null);
  const [authChecking, setAuthChecking] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState('');

  // Reviews Data & Queue State
  const [reviews, setReviews] = useState([]);
  const [loadingReviews, setLoadingReviews] = useState(false);
  const [activeTab, setActiveTab] = useState('all'); // 'all' | 'pending' | 'approved' | 'rejected'
  const [searchQuery, setSearchQuery] = useState('');
  const [actionMessage, setActionMessage] = useState({ type: '', text: '' });
  const [actionProcessingId, setActionProcessingId] = useState(null);

  // Delete Confirmation Modal State
  const [reviewToDelete, setReviewToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const configured = isSupabaseConfigured();

  // Load reviews for authenticated admin
  const loadReviews = useCallback(async () => {
    setLoadingReviews(true);
    try {
      const { data, error } = await fetchAllReviewsForAdmin();
      if (!error && data) {
        setReviews(data);
      } else if (error) {
        setActionMessage({ type: 'error', text: `Failed to load reviews: ${error.message}` });
      }
    } catch (err) {
      setActionMessage({ type: 'error', text: `Unexpected error: ${err.message}` });
    } finally {
      setLoadingReviews(false);
    }
  }, []);

  // Listen to Supabase Auth state changes & verify initial session
  useEffect(() => {
    let isMounted = true;

    // Check existing session
    getAdminSession().then((activeSession) => {
      if (!isMounted) return;
      if (activeSession && isUserAdmin(activeSession.user)) {
        setSession(activeSession);
        setAdminUser(activeSession.user);
        loadReviews();
      } else {
        setSession(null);
        setAdminUser(null);
      }
      setAuthChecking(false);
    });

    // Supabase Auth listener for login, token refresh, and logout
    const { data: { subscription } } = onAuthStateChange((event, newSession) => {
      if (!isMounted) return;

      if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED' || event === 'USER_UPDATED') {
        if (newSession?.user && isUserAdmin(newSession.user)) {
          setSession(newSession);
          setAdminUser(newSession.user);
          loadReviews();
        } else {
          setSession(null);
          setAdminUser(null);
        }
      } else if (event === 'SIGNED_OUT') {
        setSession(null);
        setAdminUser(null);
        setReviews([]);
      }
    });

    return () => {
      isMounted = false;
      subscription?.unsubscribe();
    };
  }, [loadReviews]);

  // Handle Admin Sign In
  const handleLogin = async (e) => {
    e.preventDefault();
    setAuthLoading(true);
    setAuthError('');
    setActionMessage({ type: '', text: '' });

    try {
      const data = await adminSignIn(email.trim(), password);
      setSession(data.session);
      setAdminUser(data.user);
      await loadReviews();
    } catch (err) {
      setAuthError(err.message || 'Authentication failed. Please verify your administrator credentials.');
    } finally {
      setAuthLoading(false);
    }
  };

  // Handle Admin Sign Out
  const handleLogout = async () => {
    await adminSignOut();
    setSession(null);
    setAdminUser(null);
    setReviews([]);
    setActionMessage({ type: '', text: '' });
  };

  // Handle Moderation Action (Approve / Reject)
  const handleStatusChange = async (id, newStatus) => {
    setActionProcessingId(id);
    setActionMessage({ type: '', text: '' });

    try {
      const adminEmail = adminUser?.email || 'admin@goodgradeacademy.com';
      const { error } = await updateReviewStatus(id, newStatus, adminEmail);

      if (error) {
        setActionMessage({ type: 'error', text: `Failed to update status: ${error.message}` });
      } else {
        setActionMessage({
          type: 'success',
          text: `Review marked as ${newStatus} successfully.`,
        });
        await loadReviews();
      }
    } catch (err) {
      setActionMessage({ type: 'error', text: `Error updating review: ${err.message}` });
    } finally {
      setActionProcessingId(null);
    }
  };

  // Handle Permanent Deletion
  const confirmDelete = async () => {
    if (!reviewToDelete) return;
    setIsDeleting(true);

    try {
      const { error } = await deleteReview(reviewToDelete.id);
      if (error) {
        setActionMessage({ type: 'error', text: `Failed to delete review: ${error.message}` });
      } else {
        setActionMessage({ type: 'success', text: 'Review permanently deleted.' });
        setReviewToDelete(null);
        await loadReviews();
      }
    } catch (err) {
      setActionMessage({ type: 'error', text: `Error deleting review: ${err.message}` });
    } finally {
      setIsDeleting(false);
    }
  };

  // Filter reviews by status and search query
  const pendingCount = reviews.filter((r) => r.status === 'pending').length;
  const approvedCount = reviews.filter((r) => r.status === 'approved').length;
  const rejectedCount = reviews.filter((r) => r.status === 'rejected').length;

  const filteredReviews = reviews.filter((r) => {
    // Status filter
    if (activeTab !== 'all' && r.status !== activeTab) return false;

    // Search query filter (name, course, message)
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      const matchName = r.name?.toLowerCase().includes(query);
      const matchCourse = r.course?.toLowerCase().includes(query);
      const matchMessage = r.message?.toLowerCase().includes(query);
      return matchName || matchCourse || matchMessage;
    }

    return true;
  });

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col text-slate-800 font-sans selection:bg-emerald-100 selection:text-emerald-900">
      {/* Top Admin Navbar */}
      <header className="sticky top-0 z-40 bg-[#0f2c59] text-white border-b border-sky-950 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white shadow-xs p-0.5 overflow-hidden flex items-center justify-center shrink-0">
              <img
                src={academyInfo.logoUrl}
                alt={`${academyInfo.name} Logo`}
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-base sm:text-lg tracking-tight leading-none">
                  {academyInfo.name}
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-md bg-white/15 text-sky-200 border border-white/20">
                  Admin Portal
                </span>
              </div>
              <p className="text-[11px] text-sky-200 mt-0.5 hidden sm:block">
                Secure Review Moderation &amp; Quality Control
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {onNavigateHome && (
              <button
                type="button"
                onClick={onNavigateHome}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-sky-100 hover:text-white hover:bg-white/10 transition-colors"
                title="Return to Public Website"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Back to Website</span>
              </button>
            )}

            {adminUser && (
              <div className="flex items-center gap-2 border-l border-white/15 pl-3">
                <div className="hidden md:flex flex-col text-right">
                  <span className="text-xs font-bold leading-tight">{adminUser.email}</span>
                  <span className="text-[10px] text-emerald-400 font-medium">Verified Administrator</span>
                </div>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-white/10 hover:bg-rose-600 text-white transition-colors border border-white/15"
                  title="Sign out of Admin Session"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Sign Out</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {authChecking ? (
          /* Initial Authentication Checking State */
          <div className="py-24 text-center space-y-3">
            <RefreshCw className="w-8 h-8 animate-spin mx-auto text-[#0f2c59]" />
            <p className="text-sm font-semibold text-slate-600">
              Verifying administrator authorization...
            </p>
          </div>
        ) : !configured ? (
          /* Supabase Unconfigured Warning */
          <div className="max-w-lg mx-auto p-8 bg-white rounded-3xl border border-amber-200 shadow-md text-center space-y-4">
            <div className="w-14 h-14 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center mx-auto border border-amber-200">
              <AlertTriangle className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-[#0f2c59]">
              Supabase Configuration Missing
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Please ensure your <code className="bg-slate-100 px-1 py-0.5 rounded text-sky-800 font-mono">.env.local</code> file contains valid <code className="bg-slate-100 px-1 py-0.5 rounded text-sky-800 font-mono">VITE_SUPABASE_URL</code> and <code className="bg-slate-100 px-1 py-0.5 rounded text-sky-800 font-mono">VITE_SUPABASE_ANON_KEY</code>.
            </p>
            {onNavigateHome && (
              <button
                type="button"
                onClick={onNavigateHome}
                className="px-5 py-2.5 rounded-xl bg-[#0f2c59] text-white text-xs font-bold shadow-xs hover:bg-[#0a1e3f] transition-all"
              >
                Return to Website
              </button>
            )}
          </div>
        ) : !adminUser ? (
          /* Admin Sign-In Screen */
          <div className="max-w-md mx-auto py-10 sm:py-16 space-y-6">
            <div className="text-center space-y-2">
              <div className="w-14 h-14 bg-sky-50 text-[#0f2c59] rounded-2xl flex items-center justify-center mx-auto border border-sky-100 shadow-xs">
                <Lock className="w-7 h-7 text-sky-700" />
              </div>
              <h2 className="text-2xl font-extrabold text-[#0f2c59] tracking-tight">
                Administrator Sign-In
              </h2>
              <p className="text-xs sm:text-sm text-slate-500">
                Restricted portal for authorized Good Grade Academy administration.
              </p>
            </div>

            {/* Security Advisory */}
            <div className="p-3.5 bg-sky-50/70 rounded-2xl border border-sky-100 text-xs text-sky-900 flex items-start gap-3">
              <Shield className="w-4 h-4 text-sky-700 shrink-0 mt-0.5" />
              <p className="leading-relaxed">
                <strong>Access Control:</strong> Only accounts with administrator privileges (<code className="bg-white px-1 py-0.2 rounded border border-sky-200 font-mono text-[11px]">app_metadata.role = &apos;admin&apos;</code>) can sign in. Public registration is disabled.
              </p>
            </div>

            {/* Error Message */}
            {authError && (
              <div className="p-4 bg-rose-50 rounded-2xl border border-rose-200 text-xs text-rose-800 flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                <span className="font-semibold">{authError}</span>
              </div>
            )}

            {/* Sign-In Form */}
            <form onSubmit={handleLogin} className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xl space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Admin Email
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
                  <Mail className="w-4 h-4 text-slate-400 absolute right-3.5 top-3 pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
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
                  <Key className="w-4 h-4 text-slate-400 absolute right-3.5 top-3 pointer-events-none" />
                </div>
              </div>

              <div className="pt-2">
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
              </div>

              <div className="pt-3 text-center border-t border-slate-100">
                {onNavigateHome && (
                  <button
                    type="button"
                    onClick={onNavigateHome}
                    className="text-xs font-semibold text-slate-500 hover:text-sky-700 transition-colors"
                  >
                    ← Return to Public Website
                  </button>
                )}
              </div>
            </form>
          </div>
        ) : (
          /* Authenticated Admin Dashboard */
          <div className="space-y-8">
            {/* Action Feedback Banner */}
            {actionMessage.text && (
              <div
                className={`p-4 rounded-2xl border text-xs sm:text-sm font-semibold flex items-center justify-between gap-3 shadow-xs animate-in fade-in ${
                  actionMessage.type === 'error'
                    ? 'bg-rose-50 border-rose-200 text-rose-800'
                    : 'bg-emerald-50 border-emerald-200 text-emerald-800'
                }`}
              >
                <div className="flex items-center gap-2">
                  {actionMessage.type === 'error' ? (
                    <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                  ) : (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  )}
                  <span>{actionMessage.text}</span>
                </div>
                <button
                  type="button"
                  onClick={() => setActionMessage({ type: '', text: '' })}
                  className="text-slate-400 hover:text-slate-600"
                >
                  <XCircle className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Dashboard Header & KPI Metrics */}
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0f2c59] tracking-tight">
                    Review Moderation Dashboard
                  </h1>
                  <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
                    Manage student &amp; parent feedback submissions with Row Level Security protection.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={loadReviews}
                  disabled={loadingReviews}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 shadow-2xs transition-all shrink-0 self-start sm:self-auto"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${loadingReviews ? 'animate-spin' : ''}`} />
                  <span>Refresh Queue</span>
                </button>
              </div>

              {/* KPI Cards Grid */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                {/* Total */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
                  <div className="flex items-center justify-between text-slate-500 mb-2">
                    <span className="text-xs font-bold uppercase tracking-wider">Total Feedback</span>
                    <FileText className="w-4 h-4 text-slate-400" />
                  </div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-[#0f2c59]">
                    {reviews.length}
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1">All submissions recorded</p>
                </div>

                {/* Pending */}
                <div className="bg-white p-5 rounded-2xl border border-amber-200 shadow-2xs relative overflow-hidden">
                  <div className="flex items-center justify-between text-amber-700 mb-2">
                    <span className="text-xs font-bold uppercase tracking-wider">Pending Action</span>
                    <Clock className="w-4 h-4 text-amber-600" />
                  </div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-amber-900">
                    {pendingCount}
                  </div>
                  <p className="text-[11px] text-amber-700/80 mt-1">Requires review &amp; approval</p>
                  {pendingCount > 0 && (
                    <span className="absolute top-3 right-3 w-2 h-2 rounded-full bg-amber-500 animate-ping" />
                  )}
                </div>

                {/* Approved */}
                <div className="bg-white p-5 rounded-2xl border border-emerald-200 shadow-2xs">
                  <div className="flex items-center justify-between text-emerald-700 mb-2">
                    <span className="text-xs font-bold uppercase tracking-wider">Approved Live</span>
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  </div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-emerald-900">
                    {approvedCount}
                  </div>
                  <p className="text-[11px] text-emerald-700/80 mt-1">Visible on public website</p>
                </div>

                {/* Rejected */}
                <div className="bg-white p-5 rounded-2xl border border-rose-200 shadow-2xs">
                  <div className="flex items-center justify-between text-rose-700 mb-2">
                    <span className="text-xs font-bold uppercase tracking-wider">Rejected</span>
                    <XCircle className="w-4 h-4 text-rose-600" />
                  </div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-rose-900">
                    {rejectedCount}
                  </div>
                  <p className="text-[11px] text-rose-700/80 mt-1">Hidden from public listing</p>
                </div>
              </div>
            </div>

            {/* Filter Tabs & Search Controls */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
              {/* Category Status Tabs */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
                <button
                  type="button"
                  onClick={() => setActiveTab('all')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
                    activeTab === 'all'
                      ? 'bg-[#0f2c59] text-white shadow-xs'
                      : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  All ({reviews.length})
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('pending')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 flex items-center gap-1.5 ${
                    activeTab === 'pending'
                      ? 'bg-amber-500 text-white shadow-xs'
                      : 'bg-white text-amber-900 border border-amber-200 hover:bg-amber-50'
                  }`}
                >
                  <Clock className="w-3.5 h-3.5" />
                  <span>Pending ({pendingCount})</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('approved')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 flex items-center gap-1.5 ${
                    activeTab === 'approved'
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'bg-white text-emerald-900 border border-emerald-200 hover:bg-emerald-50'
                  }`}
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Approved ({approvedCount})</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('rejected')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 flex items-center gap-1.5 ${
                    activeTab === 'rejected'
                      ? 'bg-rose-600 text-white shadow-xs'
                      : 'bg-white text-rose-900 border border-rose-200 hover:bg-rose-50'
                  }`}
                >
                  <XCircle className="w-3.5 h-3.5" />
                  <span>Rejected ({rejectedCount})</span>
                </button>
              </div>

              {/* Search Bar */}
              <div className="relative w-full sm:w-72">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search name, course, or text..."
                  className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 bg-white text-xs text-slate-800 placeholder-slate-400 focus:border-sky-500 focus:ring-2 focus:ring-sky-200 outline-hidden transition-all"
                />
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2.5 top-2.5 text-xs text-slate-400 hover:text-slate-600"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>

            {/* Reviews List Cards */}
            {loadingReviews ? (
              <div className="py-16 text-center space-y-3 bg-white rounded-3xl border border-slate-200">
                <RefreshCw className="w-7 h-7 animate-spin mx-auto text-[#0f2c59]" />
                <p className="text-xs font-semibold text-slate-500">
                  Fetching feedback records from Supabase...
                </p>
              </div>
            ) : filteredReviews.length === 0 ? (
              <div className="py-16 text-center space-y-3 bg-white rounded-3xl border border-dashed border-slate-300 p-8">
                <div className="w-12 h-12 bg-slate-100 text-slate-400 rounded-2xl flex items-center justify-center mx-auto">
                  <MessageSquare className="w-6 h-6" />
                </div>
                <h4 className="text-base font-bold text-slate-800">
                  No Reviews Found in This View
                </h4>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  {searchQuery
                    ? `No submissions match "${searchQuery}". Try clearing your search.`
                    : `There are currently no reviews with status "${activeTab}".`}
                </p>
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="text-xs text-sky-700 font-bold hover:underline"
                  >
                    Clear Search
                  </button>
                )}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredReviews.map((rev) => {
                  const isProcessing = actionProcessingId === rev.id;

                  return (
                    <div
                      key={rev.id}
                      className="p-5 sm:p-6 bg-white rounded-2xl border border-slate-200 hover:border-slate-300 shadow-2xs transition-all flex flex-col md:flex-row md:items-start justify-between gap-5"
                    >
                      {/* Review Details */}
                      <div className="space-y-3 grow">
                        {/* Header: Name, Role, Course, Rating, Status */}
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="text-base font-bold text-[#0f2c59] leading-tight">
                            {rev.name}
                          </h3>

                          <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                            {rev.role}
                          </span>

                          <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-lg bg-sky-50 text-sky-800 border border-sky-100">
                            {rev.course}
                          </span>

                          <div className="flex items-center gap-0.5 ml-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-3.5 h-3.5 ${
                                  i < rev.rating
                                    ? 'text-amber-400 fill-amber-400'
                                    : 'text-slate-200'
                                }`}
                              />
                            ))}
                          </div>

                          <span
                            className={`ml-auto text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                              rev.status === 'approved'
                                ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                                : rev.status === 'rejected'
                                ? 'bg-rose-100 text-rose-800 border border-rose-300'
                                : 'bg-amber-100 text-amber-900 border border-amber-300'
                            }`}
                          >
                            {rev.status}
                          </span>
                        </div>

                        {/* Review Message Text */}
                        <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100 text-xs sm:text-sm text-slate-700 leading-relaxed italic">
                          &ldquo;{rev.message}&rdquo;
                        </div>

                        {/* Metadata Footer */}
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-slate-400 pt-1">
                          <span>
                            Submitted:{' '}
                            <strong className="text-slate-600 font-semibold">
                              {new Date(rev.created_at).toLocaleDateString()}
                            </strong>
                          </span>

                          {rev.approved_by && (
                            <span>
                              Moderator:{' '}
                              <strong className="text-slate-600 font-semibold">
                                {rev.approved_by}
                              </strong>
                            </span>
                          )}

                          {rev.approved_at && (
                            <span>
                              Approved on:{' '}
                              <strong className="text-slate-600 font-semibold">
                                {new Date(rev.approved_at).toLocaleDateString()}
                              </strong>
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Moderation Action Buttons */}
                      <div className="flex sm:flex-col items-center gap-2 shrink-0 border-t md:border-t-0 md:border-l border-slate-100 pt-3 md:pt-0 md:pl-5 w-full md:w-36">
                        {rev.status !== 'approved' && (
                          <button
                            type="button"
                            disabled={isProcessing}
                            onClick={() => handleStatusChange(rev.id, 'approved')}
                            className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-2xs transition-all disabled:opacity-50"
                          >
                            <Check className="w-3.5 h-3.5" />
                            <span>Approve</span>
                          </button>
                        )}

                        {rev.status !== 'rejected' && (
                          <button
                            type="button"
                            disabled={isProcessing}
                            onClick={() => handleStatusChange(rev.id, 'rejected')}
                            className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-600 text-white shadow-2xs transition-all disabled:opacity-50"
                          >
                            <XCircle className="w-3.5 h-3.5" />
                            <span>Reject</span>
                          </button>
                        )}

                        <button
                          type="button"
                          disabled={isProcessing}
                          onClick={() => setReviewToDelete(rev)}
                          className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-white hover:bg-rose-50 text-slate-600 hover:text-rose-700 border border-slate-200 transition-colors disabled:opacity-50"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Delete</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </main>

      {/* Delete Confirmation Modal */}
      {reviewToDelete && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-xs animate-in fade-in duration-200"
          role="dialog"
          aria-modal="true"
          aria-labelledby="delete-dialog-title"
        >
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-6 space-y-4 border border-slate-200">
            <div className="w-12 h-12 bg-rose-50 text-rose-600 rounded-2xl flex items-center justify-center border border-rose-100">
              <AlertTriangle className="w-6 h-6" />
            </div>

            <div>
              <h3 id="delete-dialog-title" className="text-lg font-bold text-slate-900 leading-tight">
                Permanently Delete Review?
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Are you sure you want to delete the feedback submitted by{' '}
                <strong className="text-slate-800">{reviewToDelete.name}</strong>?
              </p>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl text-xs text-slate-600 border border-slate-200 italic line-clamp-3">
              &ldquo;{reviewToDelete.message}&rdquo;
            </div>

            <p className="text-[11px] text-rose-700 font-semibold">
              Warning: This action cannot be undone and will permanently remove this record from the database.
            </p>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                disabled={isDeleting}
                onClick={() => setReviewToDelete(null)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={isDeleting}
                onClick={confirmDelete}
                className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl text-xs font-bold bg-rose-600 hover:bg-rose-700 text-white shadow-md transition-all disabled:opacity-50"
              >
                {isDeleting ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Deleting...</span>
                  </>
                ) : (
                  <>
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Confirm Delete</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

