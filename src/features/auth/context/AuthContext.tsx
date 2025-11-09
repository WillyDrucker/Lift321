// ==========================================================================
// AUTH CONTEXT
//
// Manages authentication state and session for the app.
// Provides auth methods to all components via useAuth hook.
//
// Pattern: Context + custom hook (never use useContext directly)
// Dependencies: Supabase client, auth service
// Used by: All components requiring auth state
// ==========================================================================

import React, {createContext, useContext, useState, useCallback, useMemo, useEffect, type PropsWithChildren} from 'react';
import type {User} from '@supabase/supabase-js';

// === TYPES ===

interface AuthContextValue {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

// === CONTEXT ===

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

// === PROVIDER ===

export const AuthProvider: React.FC<PropsWithChildren> = ({children}) => {
  // === STATE ===
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // === EFFECTS ===

  useEffect(() => {
    // TODO: Check for existing session on mount
    // TODO: Listen for auth state changes
    setLoading(false);
  }, []);

  // === EVENT HANDLERS ===

  const signIn = useCallback(async (email: string, password: string) => {
    // TODO: Implement sign in with authService
    throw new Error('Not implemented');
  }, []);

  const signUp = useCallback(async (email: string, password: string) => {
    // TODO: Implement sign up with authService
    throw new Error('Not implemented');
  }, []);

  const signOut = useCallback(async () => {
    // TODO: Implement sign out with authService
    setUser(null);
  }, []);

  // === MEMOIZED VALUE ===
  // Prevents unnecessary re-renders of consumers
  const value = useMemo(
    () => ({
      user,
      loading,
      signIn,
      signUp,
      signOut,
    }),
    [user, loading, signIn, signUp, signOut]
  );

  // === RENDER ===
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// === CUSTOM HOOK ===
// This is what components import and use
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
