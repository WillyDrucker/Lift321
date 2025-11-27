// ==========================================================================
// BOTTOM TAB BAR COMPONENT
//
// Bottom navigation bar with Home, Plans, Performance, and Social tabs.
// Integrates with React Navigation's Bottom Tab Navigator for instant switching.
//
// Dependencies: theme tokens, navigation icons, React Navigation
// Used by: TabNavigator
// ==========================================================================

import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import type {BottomTabBarProps as NavigatorTabBarProps} from '@react-navigation/bottom-tabs';
import {theme} from '@/theme';
import {HomeIcon, PlansIcon, StatsIcon, ProfileIcon} from '@/components/icons';

// === TYPES ===

export type TabItem = 'home' | 'plans' | 'performance' | 'social';

type TabConfig = {
  id: TabItem;
  routeName: string | null; // null for tabs without screens (like Performance)
  label: string;
  icon: typeof HomeIcon;
};

// === CONFIGURATION ===

const TAB_CONFIG: TabConfig[] = [
  {id: 'home', routeName: 'HomePage', label: 'Home', icon: HomeIcon},
  {id: 'plans', routeName: 'PlansPage', label: 'Plans', icon: PlansIcon},
  {id: 'performance', routeName: null, label: 'Performance', icon: StatsIcon},
  {id: 'social', routeName: 'SocialScreen', label: 'Social', icon: ProfileIcon},
];

// Map route names to tab IDs for determining active state
const ROUTE_TO_TAB: Record<string, TabItem> = {
  HomePage: 'home',
  PlansPage: 'plans',
  SocialScreen: 'social',
};

// === COMPONENT ===

export const BottomTabBar: React.FC<NavigatorTabBarProps> = React.memo(
  ({state, navigation}) => {
    const insets = useSafeAreaInsets();

    // Get current route name from navigator state
    const currentRouteName = state.routes[state.index].name;
    const activeTab = ROUTE_TO_TAB[currentRouteName] || 'home';

    // Calculate dynamic height based on bottom inset
    // Gesture nav: small inset (~20-30px), Button nav: larger inset (~48px)
    const dynamicHeight = insets.bottom > theme.layout.bottomNav.gestureNavThreshold
      ? theme.layout.bottomNav.height + theme.layout.bottomNav.buttonNavExtraHeight
      : theme.layout.bottomNav.height;

    const handleTabPress = (tab: TabConfig) => {
      if (tab.routeName) {
        // Navigate to the tab's route
        navigation.navigate(tab.routeName);
      } else {
        // Performance tab - not implemented yet
        console.log('Performance screen not yet implemented');
      }
    };

    return (
      <View style={[styles.container, {height: dynamicHeight}]}>
        {TAB_CONFIG.map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <Pressable
              key={tab.id}
              style={styles.tabButton}
              onPress={() => handleTabPress(tab)}>
              <Icon
                size={theme.layout.bottomNav.iconSize}
                color={
                  isActive ? theme.colors.navActive : theme.colors.navInactive
                }
              />
              <Text
                style={[styles.tabLabel, isActive && styles.tabLabelActive]}>
                {tab.label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    );
  },
);

BottomTabBar.displayName = 'BottomTabBar';

// === STYLES ===
// StyleSheet definitions using global theme tokens

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    // Height is dynamic - set via inline style based on safe area insets
    backgroundColor: theme.colors.pureBlack, // Pure black background (global standard)
    paddingHorizontal: theme.layout.bottomNav.paddingHorizontal,
    justifyContent: 'space-around',
    alignItems: 'flex-start',
    paddingTop: theme.layout.bottomNav.iconTopSpacing,
    paddingBottom: theme.layout.bottomNav.paddingBottom,
    borderTopWidth: theme.layout.border.thin,
    borderTopColor: theme.colors.navActive,
  },

  tabButton: {
    flex: 1,
    alignItems: 'center',
  },

  tabLabel: {
    fontSize: theme.typography.fontSize.xs,
    fontFamily: theme.typography.fontFamily.primary,
    color: theme.colors.navInactive,
    marginTop: theme.spacing.xs,
  },

  tabLabelActive: {
    color: theme.colors.navActive,
    fontWeight: theme.typography.fontWeight.bold,
  },
});
