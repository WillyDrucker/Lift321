// ==========================================================================
// TAB NAVIGATOR
//
// Bottom tab navigator for main app screens (Home, Plans, Social).
// Keeps all tab screens mounted in memory for instant tab switching.
//
// Dependencies: React Navigation Bottom Tabs, custom BottomTabBar
// Used by: MainNavigator
// ==========================================================================

import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {HomePage} from '@/features/main/screens/HomePage';
import {PlansPage} from '@/features/main/screens/PlansPage';
import {SocialScreen} from '@/features/main/screens/SocialScreen';
import {BottomTabBar} from '@/components';
import type {TabParamList} from './types';

// === TAB NAVIGATOR ===

const Tab = createBottomTabNavigator<TabParamList>();

// === COMPONENT ===

export const TabNavigator: React.FC = () => (
  <Tab.Navigator
    tabBar={props => <BottomTabBar {...props} />}
    screenOptions={{
      headerShown: false,
      lazy: false, // Keep all screens mounted for instant tab switches
    }}
  >
    <Tab.Screen name="HomePage" component={HomePage} />
    <Tab.Screen name="PlansPage" component={PlansPage} />
    <Tab.Screen name="SocialScreen" component={SocialScreen} />
  </Tab.Navigator>
);
