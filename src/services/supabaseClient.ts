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
import AsyncStorage from '@react-native-async-storage/async-storage';
import {DeviceEventEmitter} from 'react-native';

// === CONFIGURATION ===

const SUPABASE_URL = Config.SUPABASE_URL || '';
const SUPABASE_ANON_KEY = Config.SUPABASE_ANON_KEY || '';

// Guest mode storage key
const GUEST_MODE_KEY = '@lift321:guest_mode';

// Auth change event name
export const AUTH_CHANGE_EVENT = 'AUTH_STATE_CHANGED';

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
