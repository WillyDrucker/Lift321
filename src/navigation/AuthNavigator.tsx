// ==========================================================================
// AUTH NAVIGATOR
//
// Authentication flow stack navigator.
// Contains all auth-related screens (login, signup, welcome).
//
// Dependencies: React Navigation, auth screens
// Used by: App.tsx root navigator
// ==========================================================================

import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {LoginScreen} from '@/features/auth/screens/LoginScreen';
import {LoginFormScreen} from '@/features/auth/screens/LoginFormScreen';
import {SignUpScreen} from '@/features/auth/screens/SignUpScreen';
import {SignUpStep2Screen} from '@/features/auth/screens/SignUpStep2Screen';
import {CreateAccountScreen} from '@/features/auth/screens/CreateAccountScreen';
import {WelcomeScreen} from '@/features/auth/screens/WelcomeScreen';
import type {AuthStackParamList} from './types';
import {defaultTransition, noGestureOptions} from './transitions';

// === TYPES ===

type AuthNavigatorProps = Record<string, never>;

// === STACK ===

const Stack = createNativeStackNavigator<AuthStackParamList>();

// === COMPONENT ===

/**
 * Authentication stack navigator
 * Handles login and signup flow
 */
export const AuthNavigator: React.FC<AuthNavigatorProps> = () => {
  return (
    <Stack.Navigator
      initialRouteName="LoginScreen"
      screenOptions={{
        headerShown: false,
        ...defaultTransition,
      }}
    >
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={noGestureOptions}
      />
      <Stack.Screen name="LoginFormScreen" component={LoginFormScreen} />
      <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
      <Stack.Screen name="SignUpStep2Screen" component={SignUpStep2Screen} />
      <Stack.Screen name="CreateAccountScreen" component={CreateAccountScreen} />
      <Stack.Screen
        name="WelcomeScreen"
        component={WelcomeScreen}
        options={noGestureOptions}
      />
    </Stack.Navigator>
  );
};
