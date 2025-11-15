// ==========================================================================
// NAVIGATION TRANSITIONS
//
// Custom screen transition configurations for React Navigation.
// Provides reusable transition presets for consistent UX.
//
// Dependencies: React Navigation
// Used by: Navigator configurations
// ==========================================================================

import type {NativeStackNavigationOptions} from '@react-navigation/native-stack';

// === TRANSITION PRESETS ===

/**
 * Default transition - slide from right
 * Standard navigation push animation
 */
export const defaultTransition: NativeStackNavigationOptions = {
  animation: 'slide_from_right',
  gestureEnabled: true,
  gestureDirection: 'horizontal',
};

/**
 * Slide from bottom transition
 * Used for modals and secondary flows
 */
export const modalTransition: NativeStackNavigationOptions = {
  animation: 'slide_from_bottom',
  gestureEnabled: true,
  gestureDirection: 'vertical',
  presentation: 'modal',
};

/**
 * Fade transition
 * Subtle transition for quick navigation
 */
export const fadeTransition: NativeStackNavigationOptions = {
  animation: 'fade',
  gestureEnabled: false,
};

/**
 * Fade from bottom transition
 * Combination of fade and slide for emphasis
 */
export const fadeFromBottomTransition: NativeStackNavigationOptions = {
  animation: 'fade_from_bottom',
  gestureEnabled: true,
  gestureDirection: 'vertical',
};

/**
 * No animation transition
 * Instant navigation without animation
 */
export const noTransition: NativeStackNavigationOptions = {
  animation: 'none',
  gestureEnabled: false,
};

/**
 * iOS-style modal presentation
 * Full screen modal with card-style dismiss
 */
export const iosModalTransition: NativeStackNavigationOptions = {
  animation: 'slide_from_bottom',
  presentation: 'card',
  gestureEnabled: true,
  gestureDirection: 'vertical',
};

/**
 * Simple push transition
 * Basic slide animation
 */
export const simplePushTransition: NativeStackNavigationOptions = {
  animation: 'simple_push',
  gestureEnabled: true,
  gestureDirection: 'horizontal',
};

// === TRANSITION CONFIGS ===

/**
 * Screen options for screens that can't be swiped back
 * Used for login, welcome, and other terminal screens
 */
export const noGestureOptions: NativeStackNavigationOptions = {
  gestureEnabled: false,
};

/**
 * Screen options for full screen modals
 * Blocks gestures and uses full screen presentation
 */
export const fullScreenModalOptions: NativeStackNavigationOptions = {
  ...modalTransition,
  presentation: 'fullScreenModal',
  gestureEnabled: false,
};

/**
 * Screen options for transparent overlays
 * Renders over previous screen with transparency
 */
export const transparentModalOptions: NativeStackNavigationOptions = {
  presentation: 'transparentModal',
  animation: 'fade',
  gestureEnabled: true,
  gestureDirection: 'vertical',
};

// === HELPER FUNCTIONS ===

/**
 * Creates custom transition with duration
 *
 * @param type - Transition type
 * @param duration - Animation duration in ms
 * @example
 * const customFade = createCustomTransition('fade', 500);
 */
export const createCustomTransition = (
  type: NativeStackNavigationOptions['animation'],
  duration?: number,
): NativeStackNavigationOptions => {
  return {
    animation: type,
    animationDuration: duration,
    gestureEnabled: true,
  };
};

/**
 * Merges multiple transition configs
 *
 * @param configs - Transition configs to merge
 * @example
 * const combined = mergeTransitions(fadeTransition, noGestureOptions);
 */
export const mergeTransitions = (
  ...configs: NativeStackNavigationOptions[]
): NativeStackNavigationOptions => {
  return Object.assign({}, ...configs);
};
