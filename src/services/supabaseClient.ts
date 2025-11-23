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
import {SUPABASE_URL, SUPABASE_ANON_KEY} from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {DeviceEventEmitter} from 'react-native';

// === CONFIGURATION ===

const supabaseUrl = SUPABASE_URL || '';
const supabaseAnonKey = SUPABASE_ANON_KEY || '';

// Guest mode storage key
const GUEST_MODE_KEY = '@lift321:guest_mode';

// Auth change event name
export const AUTH_CHANGE_EVENT = 'AUTH_STATE_CHANGED';

// === CLIENT INITIALIZATION ===

/**
 * Check if Supabase credentials are configured
 * Allows development without credentials using mock client
 */
const hasValidCredentials = () => {
  return (
    supabaseUrl &&
    supabaseAnonKey &&
    supabaseUrl !== 'your-project-url-here' &&
    supabaseAnonKey !== 'your-anon-key-here' &&
    supabaseUrl.startsWith('http')
  );
};

/**
 * Supabase client instance
 * - Uses real client if credentials are configured
 * - Uses mock client for development without credentials
 */
export const supabase = hasValidCredentials()
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        // Auto refresh token when it expires
        autoRefreshToken: true,
        // Persist auth session in async storage
        persistSession: true,
        // Detect session from URL (for OAuth flows)
        detectSessionInUrl: false,
      },
    })
  : // Mock client for development without Supabase credentials
    ({
      auth: {
        signUp: async () => ({
          data: {user: null, session: null},
          error: {
            message: 'Supabase credentials not configured - signUp is disabled',
            status: 500,
          },
        }),
        signInWithPassword: async () => ({
          data: {user: null, session: null},
          error: {
            message: 'Supabase credentials not configured - sign in is disabled',
            status: 500,
          },
        }),
        signOut: async () => ({error: null}),
        getUser: async () => ({data: {user: null}, error: null}),
        getSession: async () => ({data: {session: null}, error: null}),
        resetPasswordForEmail: async () => ({
          data: null,
          error: {
            message: 'Supabase credentials not configured - password reset is disabled',
            status: 500,
          },
        }),
        updateUser: async () => ({
          data: {user: null},
          error: {
            message: 'Supabase credentials not configured - update user is disabled',
            status: 500,
          },
        }),
        onAuthStateChange: () => ({
          data: {subscription: {unsubscribe: () => {}}},
        }),
      },
    } as any);

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
 * Checks if user is authenticated (either via Supabase or guest mode)
 */
export const isAuthenticated = async (): Promise<boolean> => {
  // Check for guest mode first
  const isGuest = await isGuestMode();
  if (isGuest) {
    return true;
  }

  // Check for Supabase session
  const {session} = await getCurrentSession();
  return session !== null;
};

/**
 * Enables guest mode (bypasses authentication)
 */
export const enableGuestMode = async (): Promise<void> => {
  await AsyncStorage.setItem(GUEST_MODE_KEY, 'true');
  // Emit auth change event so App.tsx can re-check auth state
  DeviceEventEmitter.emit(AUTH_CHANGE_EVENT);
};

/**
 * Disables guest mode
 */
export const disableGuestMode = async (): Promise<void> => {
  await AsyncStorage.removeItem(GUEST_MODE_KEY);
  // Emit auth change event so App.tsx can re-check auth state
  DeviceEventEmitter.emit(AUTH_CHANGE_EVENT);
};

/**
 * Checks if app is in guest mode
 */
export const isGuestMode = async (): Promise<boolean> => {
  const guestMode = await AsyncStorage.getItem(GUEST_MODE_KEY);
  return guestMode === 'true';
};
