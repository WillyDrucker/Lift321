// ==========================================================================
// STANDALONE BOTTOM TAB BAR COMPONENT
//
// Bottom navigation bar for use in stack screens (outside TabNavigator).
// Provides same UI as BottomTabBar but navigates via stack navigation.
//
// Dependencies: theme tokens, navigation icons, React Navigation
// Used by: BodyPartSelectorScreen and other stack screens needing tab bar
// ==========================================================================

import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {theme} from '@/theme';
import {HomeIcon, PlansIcon, StatsIcon, ProfileIcon} from '@/components/icons';
import type {MainStackParamList} from '@/navigation/types';

// === TYPES ===

type TabItem = 'home' | 'plans' | 'performance' | 'social';

type TabConfig = {
  id: TabItem;
  screen: keyof MainStackParamList | null;
  tabScreen?: string; // Screen name within Tabs navigator
  label: string;
  icon: typeof HomeIcon;
};

type StandaloneBottomTabBarProps = {
  activeTab?: TabItem;
};

// === CONFIGURATION ===

const TAB_CONFIG: TabConfig[] = [
  {id: 'home', screen: 'Tabs', tabScreen: 'HomePage', label: 'Home', icon: HomeIcon},
  {id: 'plans', screen: 'Tabs', tabScreen: 'PlansPage', label: 'Plans', icon: PlansIcon},
  {id: 'performance', screen: null, label: 'Performance', icon: StatsIcon},
  {id: 'social', screen: 'Tabs', tabScreen: 'SocialScreen', label: 'Social', icon: ProfileIcon},
];

// === COMPONENT ===

export const StandaloneBottomTabBar: React.FC<StandaloneBottomTabBarProps> = React.memo(
  ({activeTab = 'home'}) => {
    const insets = useSafeAreaInsets();
    const navigation = useNavigation<NativeStackNavigationProp<MainStackParamList>>();

    // Calculate dynamic height based on bottom inset
    const dynamicHeight = insets.bottom > theme.layout.bottomNav.gestureNavThreshold
      ? theme.layout.bottomNav.height + theme.layout.bottomNav.buttonNavExtraHeight
      : theme.layout.bottomNav.height;

    const handleTabPress = (tab: TabConfig) => {
      if (tab.screen === 'Tabs' && tab.tabScreen) {
        // Navigate to Tabs with specific screen
        navigation.navigate('Tabs', {screen: tab.tabScreen} as any);
      } else if (tab.screen) {
        navigation.navigate(tab.screen as any);
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

StandaloneBottomTabBar.displayName = 'StandaloneBottomTabBar';

// === STYLES ===

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    backgroundColor: theme.colors.pureBlack,
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
