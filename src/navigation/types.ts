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

// === ROOT STACK PARAM LIST ===
// Define all routes and their parameters here
export type RootStackParamList = {
  // Auth Stack
  LoginScreen: undefined;
  LoginFormScreen: undefined;
  SignUpScreen: undefined;

  // Main Stack
  MainActivity: undefined;
  Home: undefined;
  WorkoutList: undefined;
  WorkoutSession: {workoutId: string};
  PlanList: undefined;
  PlanDetail: {planId: string};
  History: undefined;
  HistoryDetail: {sessionId: string};
};

// === GLOBAL NAVIGATION TYPE ===
// Auto-imported by React Navigation for global type safety
declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

// === SCREEN PROPS HELPER ===
// Type helper for screen components
export type RootStackScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;
