// ==========================================================================
// MAIN NAVIGATOR
//
// Main application stack navigator with nested tab navigation.
// Tab screens (Home, Plans, Social) are nested in TabNavigator for instant switching.
// Other screens (Settings, Help, Workout) are in the main stack.
//
// Dependencies: React Navigation, TabNavigator, main screens
// Used by: App.tsx root navigator
// ==========================================================================

import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {TabNavigator} from './TabNavigator';
import {ProfileScreen} from '@/features/main/screens/ProfileScreen';
import {SettingsScreen} from '@/features/main/screens/SettingsScreen';
import {HelpScreen} from '@/features/main/screens/HelpScreen';
import {DevToolsScreen} from '@/features/main/screens/DevToolsScreen';
import {BodyPartSelectorScreen} from '@/features/workout/screens/BodyPartSelectorScreen';
import {WorkoutOverviewScreen} from '@/features/workout/screens/WorkoutOverviewScreen';
import {ActiveWorkoutScreen} from '@/features/workout/screens/ActiveWorkoutScreen';
import {ActiveWorkoutProvider} from '@/features/workout/context/ActiveWorkoutContext';
import type {MainStackParamList} from './types';

// === TYPES ===

type MainNavigatorProps = Record<string, never>;

// === STACK ===

const Stack = createNativeStackNavigator<MainStackParamList>();

// === COMPONENT ===

/**
 * Main application stack navigator
 * Handles authenticated user screens with nested tab navigation
 *
 * Architecture:
 * - Tabs (TabNavigator): Home, Plans, Social - kept mounted for instant switching
 * - Stack screens: Settings, Help, Workout flows - pushed on top of tabs
 */
export const MainNavigator: React.FC<MainNavigatorProps> = () => {
  return (
    <ActiveWorkoutProvider>
      <Stack.Navigator
        initialRouteName="Tabs"
        screenOptions={{
          headerShown: false,
          animation: 'none', // Disable all default animations
        }}
      >
        {/* Tab Navigator - Home, Plans, Social screens */}
        <Stack.Screen name="Tabs" component={TabNavigator} />

        {/* Modal/Overlay screens - pushed on top of tabs */}
        <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
        <Stack.Screen name="SettingsScreen" component={SettingsScreen} />
        <Stack.Screen name="HelpScreen" component={HelpScreen} />
        <Stack.Screen name="DevToolsScreen" component={DevToolsScreen} />
        <Stack.Screen name="BodyPartSelector" component={BodyPartSelectorScreen} />
        <Stack.Screen name="WorkoutOverview" component={WorkoutOverviewScreen} />
        <Stack.Screen name="ActiveWorkout" component={ActiveWorkoutScreen} />
      </Stack.Navigator>
    </ActiveWorkoutProvider>
  );
};
