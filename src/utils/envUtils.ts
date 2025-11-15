// ==========================================================================
// ENVIRONMENT UTILITIES
//
// Environment variable validation and access utilities.
// Ensures required env vars are set before app starts.
//
// Dependencies: react-native-config
// Used by: App initialization, services
// ==========================================================================

import Config from 'react-native-config';

// === TYPES ===

type EnvVar = {
  key: string;
  required: boolean;
  defaultValue?: string;
};

type EnvValidationResult = {
  isValid: boolean;
  missing: string[];
  warnings: string[];
};

// === ENVIRONMENT VARIABLES ===

/**
 * Required environment variables
 * App will not start if these are missing
 */
const REQUIRED_ENV_VARS: EnvVar[] = [
  {key: 'SUPABASE_URL', required: true},
  {key: 'SUPABASE_ANON_KEY', required: true},
];

/**
 * Optional environment variables
 * App will work without these but may log warnings
 */
const OPTIONAL_ENV_VARS: EnvVar[] = [
  {key: 'API_TIMEOUT', required: false, defaultValue: '30000'},
  {key: 'ENABLE_LOGGING', required: false, defaultValue: 'true'},
];

// === VALIDATION ===

/**
 * Validates all environment variables
 * Returns validation result with missing vars
 *
 * @example
 * const result = validateEnv();
 * if (!result.isValid) {
 *   console.error('Missing env vars:', result.missing);
 * }
 */
export const validateEnv = (): EnvValidationResult => {
  const missing: string[] = [];
  const warnings: string[] = [];

  // Check required variables
  REQUIRED_ENV_VARS.forEach(({key, required}) => {
    const value = Config[key];
    if (required && (!value || value.trim() === '')) {
      missing.push(key);
    }
  });

  // Check optional variables
  OPTIONAL_ENV_VARS.forEach(({key, defaultValue}) => {
    const value = Config[key];
    if (!value || value.trim() === '') {
      warnings.push(`${key} not set, using default: ${defaultValue}`);
    }
  });

  return {
    isValid: missing.length === 0,
    missing,
    warnings,
  };
};

/**
 * Gets environment variable with optional default
 *
 * @param key - Environment variable key
 * @param defaultValue - Default value if not set
 * @example
 * const timeout = getEnv('API_TIMEOUT', '30000');
 */
export const getEnv = (key: string, defaultValue?: string): string => {
  return Config[key] || defaultValue || '';
};

/**
 * Gets environment variable as number
 *
 * @param key - Environment variable key
 * @param defaultValue - Default value if not set
 * @example
 * const timeout = getEnvAsNumber('API_TIMEOUT', 30000);
 */
export const getEnvAsNumber = (key: string, defaultValue: number): number => {
  const value = Config[key];
  if (!value) return defaultValue;
  const parsed = parseInt(value, 10);
  return isNaN(parsed) ? defaultValue : parsed;
};

/**
 * Gets environment variable as boolean
 *
 * @param key - Environment variable key
 * @param defaultValue - Default value if not set
 * @example
 * const loggingEnabled = getEnvAsBoolean('ENABLE_LOGGING', true);
 */
export const getEnvAsBoolean = (key: string, defaultValue: boolean): boolean => {
  const value = Config[key];
  if (!value) return defaultValue;
  return value.toLowerCase() === 'true';
};

/**
 * Checks if app is in development mode
 */
export const isDevelopment = (): boolean => {
  return __DEV__;
};

/**
 * Checks if app is in production mode
 */
export const isProduction = (): boolean => {
  return !__DEV__;
};

/**
 * Logs environment validation warnings
 * Only logs in development mode
 */
export const logEnvWarnings = (result: EnvValidationResult): void => {
  if (!isDevelopment()) return;

  if (result.warnings.length > 0) {
    console.warn('Environment variable warnings:');
    result.warnings.forEach(warning => console.warn(`  - ${warning}`));
  }
};

/**
 * Throws error if required env vars are missing
 * Logs warnings for optional vars
 *
 * @example
 * // In App.tsx
 * requireEnv();
 */
export const requireEnv = (): void => {
  const result = validateEnv();

  if (!result.isValid) {
    const missingVars = result.missing.join(', ');
    throw new Error(
      `Missing required environment variables: ${missingVars}\n\n` +
        'Please create a .env file in the project root with:\n' +
        result.missing.map(key => `${key}=your_value_here`).join('\n'),
    );
  }

  logEnvWarnings(result);
};
