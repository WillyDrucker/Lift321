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
import type {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import type {CompositeScreenProps, NavigatorScreenParams} from '@react-navigation/native';
import type {WorkoutType, WorkoutSuggester} from '@/components/WorkoutCard';
import type {SessionType} from '@/services/exerciseService';

// === AUTH STACK PARAM LIST ===
// Authentication flow screens
export type AuthStackParamList = {
  LoginScreen: undefined;
  LoginFormScreen: undefined;
  SignUpScreen: undefined;
  SignUpStep2Screen: undefined;
  CreateAccountScreen: undefined;
  WelcomeScreen: undefined;
};

// === TAB PARAM LIST ===
// Bottom tab navigator screens (kept mounted for instant switching)
export type TabParamList = {
  HomePage: undefined;
  PlansPage: undefined;
  SocialScreen: undefined;
};

// === MAIN STACK PARAM LIST ===
// Main application screens (authenticated users only)
export type MainStackParamList = {
  Tabs: NavigatorScreenParams<TabParamList>;
  ProfileScreen: undefined;
  SettingsScreen: undefined;
  HelpScreen: undefined;
  DevToolsScreen: undefined;
  WorkoutOverview: {
    workoutType: WorkoutType;
    suggester?: WorkoutSuggester;
  };
  ActiveWorkout: {
    workoutType: WorkoutType;
    sessionType: SessionType;
    planFocus: 'strength' | 'balanced' | 'growth';
    selectedEquipment: Set<string>;
    weekProgress: {
      current: number;
      total: number;
    };
  };
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
 * Type helper for main stack screen components
 * @example
 * const SettingsScreen: React.FC<MainStackScreenProps<'SettingsScreen'>> = ({ navigation }) => { ... }
 */
export type MainStackScreenProps<T extends keyof MainStackParamList> =
  NativeStackScreenProps<MainStackParamList, T>;

/**
 * Type helper for tab screen components
 * Provides access to both tab navigation and parent stack navigation
 * @example
 * const HomePage: React.FC<TabScreenProps<'HomePage'>> = ({ navigation }) => { ... }
 */
export type TabScreenProps<T extends keyof TabParamList> = CompositeScreenProps<
  BottomTabScreenProps<TabParamList, T>,
  NativeStackScreenProps<MainStackParamList>
>;

/**
 * Type helper for screen components (backward compatibility)
 * @example
 * const AnyScreen: React.FC<RootStackScreenProps<'HomePage'>> = ({ navigation }) => { ... }
 */
export type RootStackScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;
