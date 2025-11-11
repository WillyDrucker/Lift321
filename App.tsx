// ==========================================================================
// APP - Main Entry Point
//
// Root component for the Lift 3-2-1 React Native application.
// Sets up navigation container and auth stack.
//
// Dependencies: React Navigation, SafeAreaProvider, LoginScreen
// Used by: index.js
// ==========================================================================

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {LoginScreen} from '@/features/auth/screens/LoginScreen';
import {LoginFormScreen} from '@/features/auth/screens/LoginFormScreen';
import {SignUpScreen} from '@/features/auth/screens/SignUpScreen';
import {MainActivity} from '@/features/main/screens/MainActivity';
import type {RootStackParamList} from '@/navigation/types';

// === TYPES ===

type AppProps = Record<string, never>;

// === NAVIGATION STACK ===
// Stack navigator configuration

const Stack = createNativeStackNavigator<RootStackParamList>();

// === COMPONENT ===

const App: React.FC<AppProps> = () => {
  // === RENDER ===
  // Main app navigation container
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="LoginScreen"
          screenOptions={{
            headerShown: false,
            animation: 'slide_from_right',
          }}
        >
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="LoginFormScreen" component={LoginFormScreen} />
          <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
          <Stack.Screen name="MainActivity" component={MainActivity} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;
