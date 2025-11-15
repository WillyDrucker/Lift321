// ==========================================================================
// NAVIGATION BARREL EXPORT
//
// Central export point for all navigation utilities and types.
//
// Dependencies: Navigation modules
// Used by: All files requiring navigation functionality
// ==========================================================================

// === TYPES ===
export type {
  RootStackParamList,
  AuthStackParamList,
  MainStackParamList,
  RootStackScreenProps,
  AuthStackScreenProps,
  MainStackScreenProps,
} from './types';

export type {
  TypedNavigation,
  TypedRoute,
} from './hooks';

// === HOOKS ===
export {
  useTypedNavigation,
  useTypedRoute,
  useNavigationAndRoute,
  useSafeNavigate,
  useNavigationActions,
} from './hooks';

// === NAVIGATION SERVICE ===
export {
  navigationRef,
  navigationService,
} from './navigationService';

// === GUARDS ===
export {
  useAuthGuard,
  useGuestGuard,
  withAuthGuard,
  requireAuth,
} from './guards';

// === TRANSITIONS ===
export {
  defaultTransition,
  modalTransition,
  fadeTransition,
  fadeFromBottomTransition,
  noTransition,
  iosModalTransition,
  simplePushTransition,
  noGestureOptions,
  fullScreenModalOptions,
  transparentModalOptions,
  createCustomTransition,
  mergeTransitions,
} from './transitions';

// === NAVIGATORS ===
export {AuthNavigator} from './AuthNavigator';
export {MainNavigator} from './MainNavigator';
