// ==========================================================================
// SERVICES BARREL EXPORT
//
// Central export point for all services and service utilities.
//
// Dependencies: Service modules
// Used by: Components, screens, hooks requiring backend operations
// ==========================================================================

// === SUPABASE CLIENT ===
export {
  supabase,
  getCurrentUser,
  getCurrentSession,
  signOut,
  isAuthenticated,
  enableGuestMode,
  disableGuestMode,
  isGuestMode,
  AUTH_CHANGE_EVENT,
} from './supabaseClient';

// === API UTILITIES ===
export {
  createSuccessResponse,
  createErrorResponse,
  handleSupabaseError,
  getErrorMessage,
  isErrorCode,
  handleAsync,
  handleSupabaseQuery,
  retry,
  validateRequiredFields,
} from './apiUtils';

// === BASE SERVICE ===
export {BaseService} from './BaseService';
export type {QueryOptions, FilterOptions} from './BaseService';

// === AUTH SERVICE ===
export {authService} from './authService';
export type {
  SignUpCredentials,
  SignInCredentials,
  AuthResponse,
  PasswordResetRequest,
  PasswordUpdateRequest,
} from './authService';
