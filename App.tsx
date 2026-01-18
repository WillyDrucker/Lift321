// ==========================================================================
// APP - Main Entry Point
//
// Root component for the Lift 3-2-1 React Native application.
// Sets up navigation container with separate auth and main stacks.
//
// Dependencies: React Navigation, SafeAreaProvider, navigators
// Used by: index.js
// ==========================================================================

import React, {useEffect, useState, useCallback} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {
  ActivityIndicator,
  View,
  StyleSheet,
  AppState,
  DeviceEventEmitter,
} from 'react-native';
import type {AppStateStatus} from 'react-native';
import {navigationRef} from '@/navigation/navigationService';
import {AuthNavigator} from '@/navigation/AuthNavigator';
import {MainNavigator} from '@/navigation/MainNavigator';
import {isAuthenticated, AUTH_CHANGE_EVENT, initializeOverride} from '@/services';
import {theme} from '@/theme';
import {BottomSheetProvider} from '@/contexts';

// === TYPES ===

type AppProps = Record<string, never>;

// === COMPONENT ===

const App: React.FC<AppProps> = () => {
  // === STATE ===

  const [isAuth, setIsAuth] = useState<boolean | null>(null);

  // === CALLBACKS ===

  // Memoized auth check function
  const checkAuth = useCallback(async () => {
    try {
      const authenticated = await isAuthenticated();
      setIsAuth(authenticated);
    } catch (error) {
      console.error('Auth check failed:', error);
      setIsAuth(false);
    }
  }, []);

  // === EFFECTS ===

  // Check auth status and initialize dev tools on mount
  useEffect(() => {
    checkAuth();
    // Initialize day override system (loads any persisted override)
    initializeOverride();
  }, [checkAuth]);

  // Re-check auth when app comes to foreground
  // This allows guest login to work by detecting the AsyncStorage change
  useEffect(() => {
    const subscription = AppState.addEventListener(
      'change',
      (nextAppState: AppStateStatus) => {
        if (nextAppState === 'active') {
          checkAuth();
        }
      },
    );

    return () => {
      subscription.remove();
    };
  }, [checkAuth]);

  // Listen for auth state changes (e.g., guest login)
  useEffect(() => {
    const listener = DeviceEventEmitter.addListener(AUTH_CHANGE_EVENT, () => {
      console.log('Auth state changed, re-checking authentication...');
      checkAuth();
    });

    return () => {
      listener.remove();
    };
  }, [checkAuth]);

  // === RENDER ===

  // Loading state while checking authentication
  if (isAuth === null) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={theme.colors.actionSuccess} />
      </View>
    );
  }

  // Main app with auth-based navigator switching
  return (
    <GestureHandlerRootView style={styles.flex}>
      <SafeAreaProvider>
        <BottomSheetProvider>
          <NavigationContainer ref={navigationRef}>
            {isAuth ? <MainNavigator /> : <AuthNavigator />}
          </NavigationContainer>
        </BottomSheetProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};

// === STYLES ===

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },

  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.backgroundPrimary,
  },
});

export default App;
