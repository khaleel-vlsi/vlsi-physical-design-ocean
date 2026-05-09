import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { supabase } from '../services/supabase';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  // fetchProfile is memoized so the auth listener always has a stable reference
  const fetchProfile = useCallback(async (currentUser) => {
    try {
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
    let isMounted = true;

    // Check active session on initial load
    supabase.auth.getSession().then(({ data, error }) => {
      if (!isMounted) return;
      if (error) {
        console.error('Auth session error:', error.message);
        supabase.auth.signOut();
        setUser(null);
        setLoading(false);
        return;
      }
      const session = data?.session;
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchProfile(session.user);
      } else {
        setLoading(false);
      }
    }).catch((err) => {
      if (!isMounted) return;
      console.error('Unexpected session error:', err);
      setUser(null);
      setLoading(false);
    });

    // Listen for auth state changes (login, logout, token refresh)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (!isMounted) return;
        setUser(session?.user ?? null);
        if (session?.user) {
          fetchProfile(session.user);
        } else {
          setProfile(null);
          setLoading(false);
        }
      }
    );

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, [fetchProfile]);

  const refreshProfile = useCallback(() => {
    if (user) return fetchProfile(user);
  }, [user, fetchProfile]);

  const login = async (email, password) => {
    return supabase.auth.signInWithPassword({ email, password });
  };

  const logout = async () => {
    return supabase.auth.signOut();
  };

  const value = {
    user,
    profile,
    login,
    logout,
    loading,
    refreshProfile,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
