// ==========================================================================
// API TYPES
//
// Generic types for API requests, responses, and error handling.
// Used throughout the service layer for consistent typing.
//
// Dependencies: None (pure types)
// Used by: Services, API client, components making API calls
// ==========================================================================

// === API RESPONSE TYPES ===

/**
 * Generic successful API response
 */
export type ApiResponse<T = any> = {
  data: T;
  error: null;
  status: 'success';
};

/**
 * Generic failed API response
 */
export type ApiError = {
  data: null;
  error: {
    message: string;
    code?: string;
    details?: any;
  };
  status: 'error';
};

/**
 * Combined API response (success or error)
 */
export type ApiResult<T = any> = ApiResponse<T> | ApiError;

// === PAGINATION TYPES ===

export type PaginationParams = {
  page?: number;
  limit?: number;
  offset?: number;
};

export type PaginatedResponse<T> = {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    hasMore: boolean;
  };
};

// === QUERY TYPES ===

export type SortOrder = 'asc' | 'desc';

export type QueryParams = {
  sort?: string;
  order?: SortOrder;
  filter?: Record<string, any>;
} & PaginationParams;

// === ERROR CODES ===

export enum ApiErrorCode {
  // Authentication errors
  UNAUTHORIZED = 'UNAUTHORIZED',
  FORBIDDEN = 'FORBIDDEN',
  INVALID_CREDENTIALS = 'INVALID_CREDENTIALS',
  TOKEN_EXPIRED = 'TOKEN_EXPIRED',

  // Validation errors
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  INVALID_INPUT = 'INVALID_INPUT',
  MISSING_REQUIRED_FIELD = 'MISSING_REQUIRED_FIELD',

  // Resource errors
  NOT_FOUND = 'NOT_FOUND',
  ALREADY_EXISTS = 'ALREADY_EXISTS',
  CONFLICT = 'CONFLICT',

  // Server errors
  INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR',
  SERVICE_UNAVAILABLE = 'SERVICE_UNAVAILABLE',
  TIMEOUT = 'TIMEOUT',

  // Network errors
  NETWORK_ERROR = 'NETWORK_ERROR',
  NO_CONNECTION = 'NO_CONNECTION',

  // Generic
  UNKNOWN_ERROR = 'UNKNOWN_ERROR',
}

// === REQUEST TYPES ===

export type RequestConfig = {
  headers?: Record<string, string>;
  timeout?: number;
  retry?: {
    attempts: number;
    delay: number;
  };
};

// === TYPE GUARDS ===

/**
 * Type guard to check if response is successful
 */
export const isApiSuccess = <T>(
  result: ApiResult<T>,
): result is ApiResponse<T> => {
  return result.status === 'success' && result.error === null;
};

/**
 * Type guard to check if response is an error
 */
export const isApiError = (result: ApiResult): result is ApiError => {
  return result.status === 'error' && result.data === null;
};
