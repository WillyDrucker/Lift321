// ==========================================================================
// NAVIGATION GUARDS
//
// Navigation guards for protecting routes and handling auth state.
// Redirects users based on authentication status.
//
// Dependencies: Auth service, navigation service
// Used by: Navigation setup, protected screens
// ==========================================================================

import {useEffect, useState} from 'react';
import {isAuthenticated} from '@/services';
import {navigationService} from './navigationService';

// === TYPES ===

type GuardResult = {
  isAllowed: boolean;
  isLoading: boolean;
};

// === AUTH GUARD HOOK ===

/**
 * Hook that checks if user is authenticated
 * Redirects to LoginScreen if not authenticated
 *
 * @example
 * const HomePage = () => {
 *   const { isAllowed, isLoading } = useAuthGuard();
 *
 *   if (isLoading) return <LoadingScreen />;
 *   if (!isAllowed) return null; // Will redirect
 *
 *   return <View>...</View>;
 * };
 */
export const useAuthGuard = (): GuardResult => {
  const [isAllowed, setIsAllowed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const authenticated = await isAuthenticated();

        if (!authenticated) {
          // Not authenticated - redirect to login
          navigationService.reset('LoginScreen');
          setIsAllowed(false);
        } else {
          // Authenticated - allow access
          setIsAllowed(true);
        }
      } catch (error) {
        console.error('Auth guard error:', error);
        // On error, redirect to login for safety
        navigationService.reset('LoginScreen');
        setIsAllowed(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  return {isAllowed, isLoading};
};

/**
 * Hook that ensures user is NOT authenticated
 * Redirects to HomePage if already authenticated
 * Useful for login/signup screens
 *
 * @example
 * const LoginScreen = () => {
 *   const { isAllowed, isLoading } = useGuestGuard();
 *
 *   if (isLoading) return <LoadingScreen />;
 *   if (!isAllowed) return null; // Will redirect
 *
 *   return <View>...</View>;
 * };
 */
export const useGuestGuard = (): GuardResult => {
  const [isAllowed, setIsAllowed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const authenticated = await isAuthenticated();

        if (authenticated) {
          // Already authenticated - redirect to home
          navigationService.reset('HomePage');
          setIsAllowed(false);
        } else {
          // Not authenticated - allow access to auth screens
          setIsAllowed(true);
        }
      } catch (error) {
        console.error('Guest guard error:', error);
        // On error, allow access (fail open for login screens)
        setIsAllowed(true);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  return {isAllowed, isLoading};
};

/**
 * Higher-order function that wraps a function with auth check
 * Useful for protecting navigation actions
 *
 * @example
 * const handleProtectedAction = withAuthGuard(() => {
 *   // This only runs if user is authenticated
 *   navigation.navigate('ProtectedScreen');
 * });
 */
export const withAuthGuard = <T extends (...args: any[]) => any>(
  fn: T,
): ((...args: Parameters<T>) => Promise<ReturnType<T> | void>) => {
  return async (...args: Parameters<T>) => {
    try {
      const authenticated = await isAuthenticated();

      if (!authenticated) {
        navigationService.reset('LoginScreen');
        return;
      }

      return fn(...args);
    } catch (error) {
      console.error('Auth guard error:', error);
      navigationService.reset('LoginScreen');
    }
  };
};

/**
 * Standalone function to check auth and redirect if needed
 * Useful for imperative auth checks in services
 *
 * @example
 * await requireAuth(); // Throws or redirects if not authenticated
 */
export const requireAuth = async (): Promise<boolean> => {
  try {
    const authenticated = await isAuthenticated();

    if (!authenticated) {
      navigationService.reset('LoginScreen');
      return false;
    }

    return true;
  } catch (error) {
    console.error('Auth check error:', error);
    navigationService.reset('LoginScreen');
    return false;
  }
};
