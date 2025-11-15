// ==========================================================================
// APP - Main Entry Point
//
// Root component for the Lift 3-2-1 React Native application.
// Sets up navigation container with separate auth and main stacks.
//
// Dependencies: React Navigation, SafeAreaProvider, navigators
// Used by: index.js
// ==========================================================================

import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {ActivityIndicator, View, StyleSheet} from 'react-native';
import {navigationRef} from '@/navigation/navigationService';
import {AuthNavigator} from '@/navigation/AuthNavigator';
import {MainNavigator} from '@/navigation/MainNavigator';
import {isAuthenticated} from '@/services';
import {theme} from '@/theme';

// === TYPES ===

type AppProps = Record<string, never>;

// === COMPONENT ===

const App: React.FC<AppProps> = () => {
  // === STATE ===

  const [isAuth, setIsAuth] = useState<boolean | null>(null);

  // === EFFECTS ===

  // Check auth status on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const authenticated = await isAuthenticated();
        setIsAuth(authenticated);
      } catch (error) {
        console.error('Auth check failed:', error);
        setIsAuth(false);
      }
    };

    checkAuth();
  }, []);

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
    <SafeAreaProvider>
      <NavigationContainer ref={navigationRef}>
        {isAuth ? <MainNavigator /> : <AuthNavigator />}
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

// === STYLES ===

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.backgroundPrimary,
  },
});

export default App;
