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
import {PlansPage} from '@/features/main/screens/PlansPage';
import {SocialScreen} from '@/features/main/screens/SocialScreen';
import {ProfileScreen} from '@/features/main/screens/ProfileScreen';
import {SettingsScreen} from '@/features/main/screens/SettingsScreen';
import {HelpScreen} from '@/features/main/screens/HelpScreen';
import {DevToolsScreen} from '@/features/main/screens/DevToolsScreen';
import {WorkoutOverviewScreen} from '@/features/workout/screens/WorkoutOverviewScreen';
import {ActiveWorkoutScreen} from '@/features/workout/screens/ActiveWorkoutScreen';
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
        animation: 'none', // Disable all default animations
      }}
    >
      <Stack.Screen name="HomePage" component={HomePage} />
      <Stack.Screen name="PlansPage" component={PlansPage} />
      <Stack.Screen name="SocialScreen" component={SocialScreen} />
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
      <Stack.Screen name="SettingsScreen" component={SettingsScreen} />
      <Stack.Screen name="HelpScreen" component={HelpScreen} />
      <Stack.Screen name="DevToolsScreen" component={DevToolsScreen} />
      <Stack.Screen name="WorkoutOverview" component={WorkoutOverviewScreen} />
      <Stack.Screen name="ActiveWorkout" component={ActiveWorkoutScreen} />

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
