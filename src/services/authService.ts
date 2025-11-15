// ==========================================================================
// AUTH SERVICE
//
// Authentication service handling sign up, sign in, and user management.
// Example service showing how to use Supabase auth with API utilities.
//
// Dependencies: Supabase client, API utilities, validation utilities
// Used by: Auth screens, protected routes, user context
// ==========================================================================

import {supabase} from './supabaseClient';
import {
  createSuccessResponse,
  createErrorResponse,
  handleSupabaseError,
  validateRequiredFields,
} from './apiUtils';
import type {ApiResult} from '@/types/api.types';
import type {User, Session} from '@supabase/supabase-js';

// === TYPES ===

export type SignUpCredentials = {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
};

export type SignInCredentials = {
  email: string;
  password: string;
};

export type AuthResponse = {
  user: User;
  session: Session;
};

export type PasswordResetRequest = {
  email: string;
};

export type PasswordUpdateRequest = {
  newPassword: string;
};

// === AUTH SERVICE ===

class AuthService {
  // === SIGN UP ===

  /**
   * Sign up a new user with email and password
   */
  async signUp(credentials: SignUpCredentials): Promise<ApiResult<AuthResponse>> {
    try {
      // Validate required fields
      const validationError = validateRequiredFields(credentials, [
        'email',
        'password',
      ]);
      if (validationError) {
        return validationError;
      }

      const {email, password, firstName, lastName} = credentials;

      // Call Supabase auth signup
      const {data, error} = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            first_name: firstName,
            last_name: lastName,
          },
        },
      });

      if (error) {
        return handleSupabaseError(error);
      }

      if (!data.user || !data.session) {
        return createErrorResponse(
          'Sign up succeeded but user or session is missing',
          'UNKNOWN_ERROR',
        );
      }

      return createSuccessResponse({
        user: data.user,
        session: data.session,
      });
    } catch (error) {
      if (error instanceof Error) {
        return handleSupabaseError(error);
      }
      return createErrorResponse('An unexpected error occurred during sign up');
    }
  }

  // === SIGN IN ===

  /**
   * Sign in existing user with email and password
   */
  async signIn(credentials: SignInCredentials): Promise<ApiResult<AuthResponse>> {
    try {
      // Validate required fields
      const validationError = validateRequiredFields(credentials, [
        'email',
        'password',
      ]);
      if (validationError) {
        return validationError;
      }

      const {email, password} = credentials;

      // Call Supabase auth signin
      const {data, error} = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        return handleSupabaseError(error);
      }

      if (!data.user || !data.session) {
        return createErrorResponse(
          'Sign in succeeded but user or session is missing',
          'UNKNOWN_ERROR',
        );
      }

      return createSuccessResponse({
        user: data.user,
        session: data.session,
      });
    } catch (error) {
      if (error instanceof Error) {
        return handleSupabaseError(error);
      }
      return createErrorResponse('An unexpected error occurred during sign in');
    }
  }

  // === SIGN OUT ===

  /**
   * Sign out current user
   */
  async signOut(): Promise<ApiResult<void>> {
    try {
      const {error} = await supabase.auth.signOut();

      if (error) {
        return handleSupabaseError(error);
      }

      return createSuccessResponse(undefined as void);
    } catch (error) {
      if (error instanceof Error) {
        return handleSupabaseError(error);
      }
      return createErrorResponse('An unexpected error occurred during sign out');
    }
  }

  // === PASSWORD RESET ===

  /**
   * Request password reset email
   */
  async requestPasswordReset(
    request: PasswordResetRequest,
  ): Promise<ApiResult<void>> {
    try {
      const validationError = validateRequiredFields(request, ['email']);
      if (validationError) {
        return validationError;
      }

      const {error} = await supabase.auth.resetPasswordForEmail(request.email);

      if (error) {
        return handleSupabaseError(error);
      }

      return createSuccessResponse(undefined as void);
    } catch (error) {
      if (error instanceof Error) {
        return handleSupabaseError(error);
      }
      return createErrorResponse(
        'An unexpected error occurred during password reset request',
      );
    }
  }

  /**
   * Update password (requires user to be authenticated)
   */
  async updatePassword(
    request: PasswordUpdateRequest,
  ): Promise<ApiResult<User>> {
    try {
      const validationError = validateRequiredFields(request, ['newPassword']);
      if (validationError) {
        return validationError;
      }

      const {data, error} = await supabase.auth.updateUser({
        password: request.newPassword,
      });

      if (error) {
        return handleSupabaseError(error);
      }

      if (!data.user) {
        return createErrorResponse(
          'Password update succeeded but user data is missing',
          'UNKNOWN_ERROR',
        );
      }

      return createSuccessResponse(data.user);
    } catch (error) {
      if (error instanceof Error) {
        return handleSupabaseError(error);
      }
      return createErrorResponse(
        'An unexpected error occurred during password update',
      );
    }
  }

  // === USER DATA ===

  /**
   * Get current authenticated user
   */
  async getCurrentUser(): Promise<ApiResult<User>> {
    try {
      const {data, error} = await supabase.auth.getUser();

      if (error) {
        return handleSupabaseError(error);
      }

      if (!data.user) {
        return createErrorResponse('No authenticated user', 'UNAUTHORIZED');
      }

      return createSuccessResponse(data.user);
    } catch (error) {
      if (error instanceof Error) {
        return handleSupabaseError(error);
      }
      return createErrorResponse(
        'An unexpected error occurred while fetching user',
      );
    }
  }

  /**
   * Get current session
   */
  async getCurrentSession(): Promise<ApiResult<Session>> {
    try {
      const {data, error} = await supabase.auth.getSession();

      if (error) {
        return handleSupabaseError(error);
      }

      if (!data.session) {
        return createErrorResponse('No active session', 'UNAUTHORIZED');
      }

      return createSuccessResponse(data.session);
    } catch (error) {
      if (error instanceof Error) {
        return handleSupabaseError(error);
      }
      return createErrorResponse(
        'An unexpected error occurred while fetching session',
      );
    }
  }

  /**
   * Check if user is authenticated
   */
  async isAuthenticated(): Promise<boolean> {
    const sessionResult = await this.getCurrentSession();
    return sessionResult.status === 'success';
  }
}

// Export singleton instance
export const authService = new AuthService();
