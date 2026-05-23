import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { supabase } from '../services/supabase';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

const generateUUID = () => {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  return Math.random().toString(36).substring(2, 15) + '-' + Date.now().toString(36);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  // fetchProfile is memoized so the auth listener always has a stable reference
  const fetchProfile = useCallback(async (currentUser) => {
    try {
      console.log('[Auth] 5. Fetching profile data from database...');
      const { data, error } = await supabase
        .from('profiles')
        .select('email, full_name, course_active, course_expiry, placement_active, placement_expiry, mock_remaining')
        .eq('id', currentUser.id)
        .single();

      if (error || !data) {
        if (error) console.error('Error fetching profile:', error.message);
        // Fallback profile if row doesn't exist or RLS denies access
        setProfile({
          email: currentUser.email,
          full_name: currentUser.user_metadata?.full_name || 'Student',
          course_active: false,
          placement_active: false,
          mock_remaining: 0,
        });
      } else {
        setProfile(data);
      }
    } catch (err) {
      console.error('Critical error in fetchProfile:', err);
      // Only sign out on a truly unrecoverable error, keep fallback profile
      setProfile({
        email: currentUser.email,
        full_name: currentUser.user_metadata?.full_name || 'Student',
        course_active: false,
        placement_active: false,
        mock_remaining: 0,
      });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // Check if we have recovery tokens in the query string or hash on homepage redirect
    const hasRecoveryQuery = window.location.search && window.location.search.includes('type=recovery');
    const hasRecoveryHash = window.location.hash && window.location.hash.includes('type=recovery');
    
    if (
      (hasRecoveryQuery || hasRecoveryHash) && 
      window.location.pathname !== '/reset-password'
    ) {
      // Retain search and hash so Supabase client on /reset-password can parse them
      const targetUrl = '/reset-password' + window.location.search + window.location.hash;
      window.location.replace(targetUrl);
      return;
    }

    let isMounted = true;

    // Wraps a promise with a timeout so a silently-hung network call
    // (e.g. CORS failure, Supabase unreachable) doesn't freeze the app.
    const withTimeout = (promise, ms = 5000, label = 'call') =>
      Promise.race([
        promise,
        new Promise((_, reject) =>
          setTimeout(() => reject(new Error(`[Auth] ${label} timed out after ${ms}ms`)), ms)
        ),
      ]);

    const initSession = async () => {
      try {
        console.log('[Auth] 1. Starting initSession: checking local session...');

        // 1. Check local session first (5 s timeout guards against silent hangs)
        let sessionResult;
        try {
          sessionResult = await withTimeout(supabase.auth.getSession(), 5000, 'getSession()');
        } catch (timeoutErr) {
          console.warn(timeoutErr.message, '— treating as no session.');
          if (isMounted) { setUser(null); setProfile(null); setLoading(false); }
          return;
        }

        const { data: { session }, error: sessionError } = sessionResult;

        if (sessionError || !session) {
          console.log('[Auth] 2. No local session found. Loading app as guest.');
          if (isMounted) {
            setUser(null);
            setProfile(null);
            setLoading(false);
          }
          return;
        }

        console.log('[Auth] 3. Local session found. Validating token via server...');

        // 2. Validate token server-side (5 s timeout)
        let userResult;
        try {
          userResult = await withTimeout(supabase.auth.getUser(), 5000, 'getUser()');
        } catch (timeoutErr) {
          console.warn(timeoutErr.message, '— session may be expired. Signing out.');
          try { await supabase.auth.signOut(); } catch (e) { /* ignore */ }
          if (isMounted) { setUser(null); setProfile(null); setLoading(false); }
          return;
        }

        const { data: { user: validatedUser }, error: userError } = userResult;

        if (userError || !validatedUser) {
          console.warn('[Auth] 4. Session expired or invalid on server:', userError?.message);
          try { await supabase.auth.signOut(); } catch (e) { /* ignore */ }
          if (isMounted) {
            setUser(null);
            setProfile(null);
            setLoading(false);
          }
          return;
        }

        if (isMounted) {
          // Validate session ID
          let localSessionId = localStorage.getItem('active_session_id');
          const serverSessionId = validatedUser.user_metadata?.last_session_id;

          if (serverSessionId && localSessionId && serverSessionId !== localSessionId) {
            console.warn('[Auth] Session ID mismatch on init. Signing out...');
            localStorage.removeItem('active_session_id');
            await supabase.auth.signOut();
            setUser(null);
            setProfile(null);
            setLoading(false);
            window.location.replace('/login?reason=concurrent_login');
            return;
          }

          // If logged in but no local session ID exists (e.g. first login or cache cleared)
          if (!localSessionId) {
            localSessionId = generateUUID();
            localStorage.setItem('active_session_id', localSessionId);
            await supabase.auth.updateUser({
              data: { last_session_id: localSessionId }
            });
            validatedUser.user_metadata = {
              ...validatedUser.user_metadata,
              last_session_id: localSessionId
            };
          }

          setUser(validatedUser);
          console.log('[Auth] 4. Token valid! Fetching profile...');
          await fetchProfile(validatedUser);
          console.log('[Auth] 6. Profile fetch complete. App ready to render.');
        }
      } catch (err) {
        console.error('Session initialization error:', err);
        if (isMounted) {
          setUser(null);
          setProfile(null);
          setLoading(false);
        }
      }
    };

    initSession();

    // Listen for auth state changes (login, logout, token refresh, password recovery)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (!isMounted) return;
        
        // Skip INITIAL_SESSION since initSession securely handles the first load
        if (event === 'INITIAL_SESSION') return;
        
        if (event === 'SIGNED_OUT') {
          setUser(null);
          setProfile(null);
          setLoading(false);
        } else if (event === 'PASSWORD_RECOVERY') {
          if (session?.user) {
            setUser(session.user);
            fetchProfile(session.user);
            if (window.location.pathname !== '/reset-password') {
              window.location.replace('/reset-password');
            }
          }
        } else if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
          if (session?.user) {
            setUser(session.user);
            fetchProfile(session.user);
          }
        }
      }
    );

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, [fetchProfile]);

  useEffect(() => {
    if (!user) return;

    let isChecking = false;

    const checkSessionId = async () => {
      if (isChecking) return;
      isChecking = true;

      try {
        console.log('[Auth] Checking session validity...');
        const { data, error } = await supabase.auth.getUser();

        if (error || !data?.user) {
          return;
        }

        const serverSessionId = data.user.user_metadata?.last_session_id;
        const localSessionId = localStorage.getItem('active_session_id');

        if (serverSessionId && localSessionId && serverSessionId !== localSessionId) {
          console.warn('[Auth] Session ID mismatch detected! Logging out...');
          localStorage.removeItem('active_session_id');
          await supabase.auth.signOut();
          window.location.href = '/login?reason=concurrent_login';
        }
      } catch (err) {
        console.error('Error checking session ID:', err);
      } finally {
        isChecking = false;
      }
    };

    // Run check immediately on mount/focus
    checkSessionId();

    // Check periodically every 30 seconds
    const intervalId = setInterval(checkSessionId, 30000);

    // Check on window focus and visibility change
    const handleFocus = () => {
      checkSessionId();
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        checkSessionId();
      }
    };

    window.addEventListener('focus', handleFocus);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      clearInterval(intervalId);
      window.removeEventListener('focus', handleFocus);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [user]);

  const refreshProfile = useCallback(() => {
    if (user) return fetchProfile(user);
  }, [user, fetchProfile]);

  const login = async (email, password) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        console.error('Login error:', error.message);
        return { data, error };
      }

      if (data?.user) {
        const newSessionId = generateUUID();
        localStorage.setItem('active_session_id', newSessionId);
        await supabase.auth.updateUser({
          data: { last_session_id: newSessionId }
        });
      }

      return { data, error };
    } catch (err) {
      console.error('Unexpected login error:', err);
      return { data: null, error: err };
    }
  };

  const logout = async () => {
    try {
      localStorage.removeItem('active_session_id');
      const { error } = await supabase.auth.signOut();
      if (error) console.error('Logout error:', error.message);
      return { error };
    } catch (err) {
      console.error('Unexpected logout error:', err);
      return { error: err };
    }
  };

  const resetPassword = async (email) => {
    try {
      const redirectTo = `${window.location.origin}/?type=recovery`;
      const { data, error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo });
      if (error) console.error('Reset password error:', error.message);
      return { data, error };
    } catch (err) {
      console.error('Unexpected reset password error:', err);
      return { data: null, error: err };
    }
  };

  const updatePassword = async (newPassword) => {
    try {
      const { data, error } = await supabase.auth.updateUser({ password: newPassword });
      if (error) console.error('Update password error:', error.message);
      return { data, error };
    } catch (err) {
      console.error('Unexpected update password error:', err);
      return { data: null, error: err };
    }
  };

  const value = {
    user,
    profile,
    login,
    logout,
    loading,
    refreshProfile,
    resetPassword,
    updatePassword,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
