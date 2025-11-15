// ==========================================================================
// SUPABASE CLIENT
//
// Supabase client initialization and configuration.
// Single source of truth for Supabase instance.
//
// Dependencies: @supabase/supabase-js, environment variables
// Used by: All services requiring database/auth operations
// ==========================================================================

import {createClient} from '@supabase/supabase-js';
import Config from 'react-native-config';

// === CONFIGURATION ===

const SUPABASE_URL = Config.SUPABASE_URL || '';
const SUPABASE_ANON_KEY = Config.SUPABASE_ANON_KEY || '';

// Validate required environment variables
if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.warn(
    'Missing Supabase configuration. Please set SUPABASE_URL and SUPABASE_ANON_KEY in .env',
  );
}

// === CLIENT INITIALIZATION ===

/**
 * Supabase client instance
 * Configured with auth persistence and automatic token refresh
 */
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    // Auto refresh token when it expires
    autoRefreshToken: true,
    // Persist auth session in async storage
    persistSession: true,
    // Detect session from URL (for OAuth flows)
    detectSessionInUrl: false,
  },
});

// === HELPER FUNCTIONS ===

/**
 * Gets current authenticated user
 */
export const getCurrentUser = async () => {
  const {
    data: {user},
    error,
  } = await supabase.auth.getUser();
  return {user, error};
};

/**
 * Gets current session
 */
export const getCurrentSession = async () => {
  const {
    data: {session},
    error,
  } = await supabase.auth.getSession();
  return {session, error};
};

/**
 * Signs out current user
 */
export const signOut = async () => {
  const {error} = await supabase.auth.signOut();
  return {error};
};

/**
 * Checks if user is authenticated
 */
export const isAuthenticated = async (): Promise<boolean> => {
  const {session} = await getCurrentSession();
  return session !== null;
};
