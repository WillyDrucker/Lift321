// ==========================================================================
// MAIN NAVIGATOR
//
// Main application stack navigator with tab navigation.
// Contains all authenticated user screens.
//
// Dependencies: React Navigation, main screens
// Used by: App.tsx root navigator
// ==========================================================================

import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {HomePage} from '@/features/main/screens/HomePage';
import {SettingsScreen} from '@/features/main/screens/SettingsScreen';
import type {MainStackParamList} from './types';
import {defaultTransition, quickFadeTransition} from './transitions';

// === TYPES ===

type MainNavigatorProps = Record<string, never>;

// === STACK ===

const Stack = createNativeStackNavigator<MainStackParamList>();

// === COMPONENT ===

/**
 * Main application stack navigator
 * Handles authenticated user screens
 *
 * Note: Tab navigator will be added here once more main screens are created.
 * For now, this is a simple stack with HomePage.
 */
export const MainNavigator: React.FC<MainNavigatorProps> = () => {
  return (
    <Stack.Navigator
      initialRouteName="HomePage"
      screenOptions={{
        headerShown: false,
        ...defaultTransition,
      }}
    >
      <Stack.Screen name="HomePage" component={HomePage} />
      <Stack.Screen
        name="SettingsScreen"
        component={SettingsScreen}
        options={quickFadeTransition}
      />

      {/* Placeholder screens - to be implemented */}
      {/* <Stack.Screen name="WorkoutList" component={WorkoutListScreen} /> */}
      {/* <Stack.Screen name="WorkoutSession" component={WorkoutSessionScreen} /> */}
      {/* <Stack.Screen name="PlanList" component={PlanListScreen} /> */}
      {/* <Stack.Screen name="PlanDetail" component={PlanDetailScreen} /> */}
      {/* <Stack.Screen name="History" component={HistoryScreen} /> */}
      {/* <Stack.Screen name="HistoryDetail" component={HistoryDetailScreen} /> */}
    </Stack.Navigator>
  );
};
