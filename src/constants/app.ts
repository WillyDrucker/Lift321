// ==========================================================================
// APP CONSTANTS
//
// Application-wide constants and configuration values.
// Single source of truth for app metadata and settings.
//
// Dependencies: None
// Used by: Throughout the app
// ==========================================================================

// === APP METADATA ===

export const APP_NAME = 'Lift 3-2-1';
export const APP_VERSION = '1.0.0';
export const APP_BUILD = '1';

// === API CONFIGURATION ===

export const API_TIMEOUT = 30000; // 30 seconds
export const API_RETRY_ATTEMPTS = 3;
export const API_RETRY_DELAY = 1000; // 1 second

// === PAGINATION ===

export const DEFAULT_PAGE_SIZE = 20;
export const MAX_PAGE_SIZE = 100;

// === VALIDATION ===

export const MIN_PASSWORD_LENGTH = 8;
export const MAX_PASSWORD_LENGTH = 128;
export const MIN_NAME_LENGTH = 2;
export const MAX_NAME_LENGTH = 50;

// === UI CONFIGURATION ===

export const ANIMATION_DURATION = {
  fast: 150,
  normal: 300,
  slow: 500,
} as const;

export const DEBOUNCE_DELAY = {
  search: 300,
  input: 500,
  scroll: 100,
} as const;

// === STORAGE KEYS ===

export const STORAGE_KEYS = {
  USER_TOKEN: '@lift321:userToken',
  USER_DATA: '@lift321:userData',
  SETTINGS: '@lift321:settings',
  ONBOARDING_COMPLETE: '@lift321:onboardingComplete',
} as const;

// === ERROR MESSAGES ===

export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Unable to connect. Please check your internet connection.',
  TIMEOUT_ERROR: 'Request timed out. Please try again.',
  UNKNOWN_ERROR: 'An unexpected error occurred. Please try again.',
  UNAUTHORIZED: 'Your session has expired. Please log in again.',
  VALIDATION_ERROR: 'Please check your input and try again.',
} as const;

// === REGEX PATTERNS ===

export const REGEX = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE: /^\+?[\d\s()-]{10,}$/,
  URL: /^https?:\/\/.+/,
} as const;
