// ==========================================================================
// APP - Main Entry Point
//
// Root component for the Lift 3-2-1 React Native application.
// Provides SafeAreaProvider context and renders initial screen.
//
// Dependencies: SafeAreaProvider, LoginScreen
// Used by: index.js
// ==========================================================================

import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {LoginScreen} from '@/features/auth/screens/LoginScreen';

// === TYPES ===

type AppProps = Record<string, never>;

// === COMPONENT ===

const App: React.FC<AppProps> = () => {
  return (
    <SafeAreaProvider>
      <LoginScreen />
    </SafeAreaProvider>
  );
};

export default App;
