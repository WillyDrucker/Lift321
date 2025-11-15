// ==========================================================================
// NAVIGATION HOOKS
//
// Type-safe navigation hooks for React Navigation.
// Provides autocomplete and type checking for all navigation operations.
//
// Dependencies: React Navigation, navigation types
// Used by: All screens requiring navigation
// ==========================================================================

import {useNavigation, useRoute} from '@react-navigation/native';
import type {NavigationProp, RouteProp} from '@react-navigation/native';
import type {RootStackParamList} from './types';

// === TYPES ===

export type TypedNavigation = NavigationProp<RootStackParamList>;
export type TypedRoute<T extends keyof RootStackParamList> = RouteProp<
  RootStackParamList,
  T
>;

// === HOOKS ===

/**
 * Type-safe navigation hook
 * Provides fully typed navigation object with autocomplete
 *
 * @example
 * const navigation = useTypedNavigation();
 * navigation.navigate('HomePage');
 * navigation.navigate('WorkoutSession', { workoutId: '123' });
 */
export const useTypedNavigation = () => {
  return useNavigation<TypedNavigation>();
};

/**
 * Type-safe route hook with generic parameter
 * Provides typed route params with autocomplete
 *
 * @example
 * const route = useTypedRoute<'WorkoutSession'>();
 * const { workoutId } = route.params;
 */
export const useTypedRoute = <T extends keyof RootStackParamList>() => {
  return useRoute<TypedRoute<T>>();
};

/**
 * Hook that provides both navigation and route in one call
 * Useful when you need both in a screen
 *
 * @example
 * const { navigation, route } = useNavigationAndRoute<'WorkoutSession'>();
 * const { workoutId } = route.params;
 * navigation.goBack();
 */
export const useNavigationAndRoute = <T extends keyof RootStackParamList>() => {
  const navigation = useTypedNavigation();
  const route = useTypedRoute<T>();

  return {navigation, route};
};

/**
 * Hook for safe navigation with param validation
 * Returns navigate function that checks if params are required
 *
 * @example
 * const navigate = useSafeNavigate();
 * navigate('HomePage'); // OK
 * navigate('WorkoutSession', { workoutId: '123' }); // OK
 * navigate('WorkoutSession'); // TypeScript error - params required
 */
export const useSafeNavigate = () => {
  const navigation = useTypedNavigation();

  return <T extends keyof RootStackParamList>(
    screen: T,
    ...params: RootStackParamList[T] extends undefined
      ? []
      : [RootStackParamList[T]]
  ) => {
    if (params.length > 0) {
      navigation.navigate(screen, params[0]);
    } else {
      navigation.navigate(screen as any);
    }
  };
};

/**
 * Hook that provides common navigation actions
 * Useful shortcuts for frequent operations
 *
 * @example
 * const { goBack, goToHome, reset } = useNavigationActions();
 * goBack();
 * goToHome();
 * reset('LoginScreen');
 */
export const useNavigationActions = () => {
  const navigation = useTypedNavigation();

  return {
    /**
     * Navigate back to previous screen
     */
    goBack: () => {
      if (navigation.canGoBack()) {
        navigation.goBack();
      }
    },

    /**
     * Navigate to HomePage
     */
    goToHome: () => {
      navigation.navigate('HomePage');
    },

    /**
     * Navigate to LoginScreen
     */
    goToLogin: () => {
      navigation.navigate('LoginScreen');
    },

    /**
     * Reset navigation stack to a specific screen
     * Clears all navigation history
     */
    reset: (screen: keyof RootStackParamList) => {
      navigation.reset({
        index: 0,
        routes: [{name: screen}],
      });
    },

    /**
     * Check if can navigate back
     */
    canGoBack: () => {
      return navigation.canGoBack();
    },

    /**
     * Replace current screen with another
     * Prevents going back to replaced screen
     */
    replace: <T extends keyof RootStackParamList>(
      screen: T,
      params?: RootStackParamList[T],
    ) => {
      if (params) {
        navigation.replace(screen, params);
      } else {
        navigation.replace(screen as any);
      }
    },
  };
};
