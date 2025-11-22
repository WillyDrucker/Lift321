// ==========================================================================
// BOTTOM TAB BAR COMPONENT
//
// Bottom navigation bar with Home, Plans, Performance, and Profile tabs.
// Highlights active tab and handles tab switching.
//
// Dependencies: theme tokens, navigation icons
// Used by: HomePage (will be used across app when navigation is implemented)
// ==========================================================================

import React, {useState, useEffect} from 'react';
import {Pressable, StyleSheet, Text, View, Dimensions} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {theme} from '@/theme';
import {HomeIcon, PlansIcon, StatsIcon, ProfileIcon} from '@/components/icons';

// === TYPES ===

export type TabItem = 'home' | 'plans' | 'performance' | 'profile';

export type BottomTabBarProps = {
  activeTab: TabItem;
  onTabPress: (tab: TabItem) => void;
};

type TabConfig = {
  id: TabItem;
  label: string;
  icon: typeof HomeIcon;
};

// === CONFIGURATION ===

const TAB_CONFIG: TabConfig[] = [
  {id: 'home', label: 'Home', icon: HomeIcon},
  {id: 'plans', label: 'Plans', icon: PlansIcon},
  {id: 'performance', label: 'Performance', icon: StatsIcon},
  {id: 'profile', label: 'Profile', icon: ProfileIcon},
];

// === COMPONENT ===

export const BottomTabBar: React.FC<BottomTabBarProps> = React.memo(
  ({activeTab, onTabPress}) => {
    const insets = useSafeAreaInsets();

    // Calculate dynamic height based on bottom inset
    // Gesture nav: small inset (~20-30px), Button nav: larger inset (~48px)
    const dynamicHeight = insets.bottom > theme.layout.bottomNav.gestureNavThreshold
      ? theme.layout.bottomNav.height + theme.layout.bottomNav.buttonNavExtraHeight
      : theme.layout.bottomNav.height;

    return (
      <View style={[styles.container, {height: dynamicHeight}]}>
        {TAB_CONFIG.map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <Pressable
              key={tab.id}
              style={styles.tabButton}
              onPress={() => onTabPress(tab.id)}>
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
