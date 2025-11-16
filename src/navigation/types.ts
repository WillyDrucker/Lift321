// ==========================================================================
// NAVIGATION TYPES
//
// Type definitions for React Navigation routes and parameters.
// Enables type-safe navigation with autocomplete throughout the app.
//
// Dependencies: React Navigation
// Used by: All screens and navigation components
// ==========================================================================

import type {NativeStackScreenProps} from '@react-navigation/native-stack';

// === AUTH STACK PARAM LIST ===
// Authentication flow screens
export type AuthStackParamList = {
  LoginScreen: undefined;
  LoginFormScreen: undefined;
  SignUpScreen: undefined;
  SignUpStep2Screen: undefined;
  WelcomeScreen: undefined;
};

// === MAIN STACK PARAM LIST ===
// Main application screens (authenticated users only)
export type MainStackParamList = {
  HomePage: undefined;
  SettingsScreen: undefined;
  WorkoutList: undefined;
  WorkoutSession: {workoutId: string};
  PlanList: undefined;
  PlanDetail: {planId: string};
  History: undefined;
  HistoryDetail: {sessionId: string};
};

// === ROOT STACK PARAM LIST ===
// Combined type for all routes (maintains backward compatibility)
export type RootStackParamList = AuthStackParamList & MainStackParamList;

// === GLOBAL NAVIGATION TYPE ===
// Auto-imported by React Navigation for global type safety
declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

// === SCREEN PROPS HELPERS ===

/**
 * Type helper for auth screen components
 * @example
 * const LoginScreen: React.FC<AuthStackScreenProps<'LoginScreen'>> = ({ navigation }) => { ... }
 */
export type AuthStackScreenProps<T extends keyof AuthStackParamList> =
  NativeStackScreenProps<AuthStackParamList, T>;

/**
 * Type helper for main screen components
 * @example
 * const HomePage: React.FC<MainStackScreenProps<'HomePage'>> = ({ navigation }) => { ... }
 */
export type MainStackScreenProps<T extends keyof MainStackParamList> =
  NativeStackScreenProps<MainStackParamList, T>;

/**
 * Type helper for screen components (backward compatibility)
 * @example
 * const AnyScreen: React.FC<RootStackScreenProps<'HomePage'>> = ({ navigation }) => { ... }
 */
export type RootStackScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;
