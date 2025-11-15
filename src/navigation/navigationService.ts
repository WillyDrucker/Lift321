// ==========================================================================
// NAVIGATION SERVICE
//
// Imperative navigation service for navigating outside React components.
// Allows navigation from services, utilities, and middleware.
//
// Dependencies: React Navigation, navigation types
// Used by: Services, utilities, error handlers
// ==========================================================================

import {createNavigationContainerRef} from '@react-navigation/native';
import type {RootStackParamList} from './types';

// === NAVIGATION REF ===

/**
 * Navigation container ref for imperative navigation
 * Attach this to NavigationContainer in App.tsx
 */
export const navigationRef =
  createNavigationContainerRef<RootStackParamList>();

// === NAVIGATION SERVICE ===

/**
 * Navigate to a screen from anywhere in the app
 *
 * @example
 * navigationService.navigate('HomePage');
 * navigationService.navigate('WorkoutSession', { workoutId: '123' });
 */
const navigate = <T extends keyof RootStackParamList>(
  screen: T,
  params?: RootStackParamList[T],
) => {
  if (navigationRef.isReady()) {
    if (params) {
      navigationRef.navigate(screen, params);
    } else {
      navigationRef.navigate(screen as any);
    }
  } else {
    console.warn('Navigation attempted before navigator was ready');
  }
};

/**
 * Go back to previous screen
 *
 * @example
 * navigationService.goBack();
 */
const goBack = () => {
  if (navigationRef.isReady() && navigationRef.canGoBack()) {
    navigationRef.goBack();
  }
};

/**
 * Reset navigation stack to a specific screen
 * Clears all navigation history
 *
 * @example
 * navigationService.reset('LoginScreen');
 */
const reset = (screen: keyof RootStackParamList) => {
  if (navigationRef.isReady()) {
    navigationRef.reset({
      index: 0,
      routes: [{name: screen}],
    });
  }
};

/**
 * Replace current screen with another
 * Prevents going back to replaced screen
 *
 * @example
 * navigationService.replace('HomePage');
 */
const replace = <T extends keyof RootStackParamList>(
  screen: T,
  params?: RootStackParamList[T],
) => {
  if (navigationRef.isReady()) {
    if (params) {
      navigationRef.navigate(screen, params);
    } else {
      navigationRef.navigate(screen as any);
    }
  }
};

/**
 * Get current route name
 *
 * @example
 * const currentRoute = navigationService.getCurrentRoute();
 * if (currentRoute === 'HomePage') { ... }
 */
const getCurrentRoute = (): keyof RootStackParamList | undefined => {
  if (navigationRef.isReady()) {
    return navigationRef.getCurrentRoute()?.name as
      | keyof RootStackParamList
      | undefined;
  }
  return undefined;
};

/**
 * Check if navigator is ready
 *
 * @example
 * if (navigationService.isReady()) { ... }
 */
const isReady = (): boolean => {
  return navigationRef.isReady();
};

/**
 * Check if can navigate back
 *
 * @example
 * if (navigationService.canGoBack()) { ... }
 */
const canGoBack = (): boolean => {
  return navigationRef.isReady() && navigationRef.canGoBack();
};

// === EXPORT ===

export const navigationService = {
  navigate,
  goBack,
  reset,
  replace,
  getCurrentRoute,
  isReady,
  canGoBack,
};
