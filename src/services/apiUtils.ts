// ==========================================================================
// API UTILITIES
//
// Helper functions for API calls, error handling, and response formatting.
// Provides consistent patterns for service layer operations.
//
// Dependencies: api.types
// Used by: All services
// ==========================================================================

import type {
  ApiResponse,
  ApiError,
  ApiResult,
  ApiErrorCode,
} from '@/types/api.types';
import type {PostgrestError} from '@supabase/supabase-js';

// === RESPONSE FORMATTERS ===

/**
 * Creates a successful API response
 */
export const createSuccessResponse = <T>(data: T): ApiResponse<T> => {
  return {
    data,
    error: null,
    status: 'success',
  };
};

/**
 * Creates an error API response
 */
export const createErrorResponse = (
  message: string,
  code?: ApiErrorCode | string,
  details?: any,
): ApiError => {
  return {
    data: null,
    error: {
      message,
      code,
      details,
    },
    status: 'error',
  };
};

// === ERROR HANDLING ===

/**
 * Maps Supabase/Postgrest errors to ApiError format
 */
export const handleSupabaseError = (error: PostgrestError | Error): ApiError => {
  // Postgrest error (database)
  if ('code' in error && 'message' in error) {
    const pgError = error as PostgrestError;
    return createErrorResponse(
      pgError.message || 'Database error occurred',
      pgError.code,
      pgError.details,
    );
  }

  // Generic JavaScript error
  return createErrorResponse(
    error.message || 'An unexpected error occurred',
    'UNKNOWN_ERROR',
  );
};

/**
 * Extracts user-friendly error message from ApiError
 */
export const getErrorMessage = (error: ApiError): string => {
  return error.error.message || 'An unexpected error occurred';
};

/**
 * Checks if error is a specific error code
 */
export const isErrorCode = (
  error: ApiError,
  code: ApiErrorCode | string,
): boolean => {
  return error.error.code === code;
};

// === ASYNC WRAPPER ===

/**
 * Wraps async operations in try/catch and returns ApiResult
 * Usage: const result = await handleAsync(() => supabase.from('table').select())
 */
export const handleAsync = async <T>(
  asyncFn: () => Promise<T>,
): Promise<ApiResult<T>> => {
  try {
    const data = await asyncFn();
    return createSuccessResponse(data);
  } catch (error) {
    if (error instanceof Error) {
      return handleSupabaseError(error);
    }
    return createErrorResponse('An unexpected error occurred');
  }
};

/**
 * Wraps Supabase query in error handling
 * Automatically handles PostgrestResponse format
 */
export const handleSupabaseQuery = async <T>(
  queryFn: () => Promise<{data: T | null; error: PostgrestError | null}>,
): Promise<ApiResult<T>> => {
  try {
    const {data, error} = await queryFn();

    if (error) {
      return handleSupabaseError(error);
    }

    if (data === null) {
      return createErrorResponse('No data returned', 'NOT_FOUND');
    }

    return createSuccessResponse(data);
  } catch (error) {
    if (error instanceof Error) {
      return handleSupabaseError(error);
    }
    return createErrorResponse('An unexpected error occurred');
  }
};

// === RETRY LOGIC ===

/**
 * Retries an async operation with exponential backoff
 */
export const retry = async <T>(
  fn: () => Promise<T>,
  options: {
    maxAttempts?: number;
    delay?: number;
    backoff?: number;
  } = {},
): Promise<T> => {
  const {maxAttempts = 3, delay = 1000, backoff = 2} = options;

  let lastError: Error | unknown;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;

      if (attempt < maxAttempts) {
        // Wait with exponential backoff
        const waitTime = delay * Math.pow(backoff, attempt - 1);
        await new Promise(resolve => setTimeout(resolve, waitTime));
      }
    }
  }

  throw lastError;
};

// === VALIDATION ===

/**
 * Validates required fields exist in an object
 */
export const validateRequiredFields = <T extends Record<string, any>>(
  data: T,
  requiredFields: (keyof T)[],
): ApiError | null => {
  const missingFields: string[] = [];

  for (const field of requiredFields) {
    if (data[field] === undefined || data[field] === null || data[field] === '') {
      missingFields.push(String(field));
    }
  }

  if (missingFields.length > 0) {
    return createErrorResponse(
      `Missing required fields: ${missingFields.join(', ')}`,
      'MISSING_REQUIRED_FIELD',
      {missingFields},
    );
  }

  return null;
};
