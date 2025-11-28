// ==========================================================================
// WORKOUT LAYOUT
//
// Shared layout wrapper for workout screens providing static navigation chrome
// with dynamic content area. Enables partial screen transitions where only
// the middle content area animates while top/bottom navigation remains fixed.
//
// Dependencies: theme tokens, navigation components
// Used by: WorkoutOverviewScreen, ActiveWorkoutScreen
// ==========================================================================

import React, {type ReactNode} from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import type {CompositeNavigationProp} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import type {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {theme} from '@/theme';
import {TopNavBar, Sidebar, BottomTabBar} from '@/components';
import type {WorkoutType} from '@/components/WorkoutCard';
import type {MainStackParamList, TabParamList} from '@/navigation/types';

// ============================================================================
// TYPES
// ============================================================================

type WorkoutLayoutNavigation = CompositeNavigationProp<
  NativeStackNavigationProp<MainStackParamList>,
  BottomTabNavigationProp<TabParamList>
>;

type WorkoutLayoutProps = {
  workoutType: WorkoutType;
  children: ReactNode;
  showLetsGoButton?: boolean;
  onLetsGoPress?: () => void;
  sidebarVisible: boolean;
  onSidebarClose: () => void;
  onSidebarSelect: (option: 'profile' | 'settings' | 'help' | 'logout') => void;
  onBackPress: () => void;
  onMenuPress: () => void;
  onGuidePress: () => void;
  navigation: WorkoutLayoutNavigation;
};

// ============================================================================
// COMPONENT
// ============================================================================

/**
 * Shared layout wrapper for workout screens
 * Provides static navigation chrome (TopNavBar, title bar, BottomTabBar)
 * while allowing content area to transition independently
 */
export const WorkoutLayout: React.FC<WorkoutLayoutProps> = ({
  workoutType,
  children,
  showLetsGoButton = false,
  onLetsGoPress,
  sidebarVisible,
  onSidebarClose,
  onSidebarSelect,
  onBackPress,
  onMenuPress,
  onGuidePress,
  navigation,
}) => {
  return (
    <>
      <StatusBar
        barStyle="light-content"
        backgroundColor={theme.colors.pureBlack}
        translucent={false}
      />
      <SafeAreaView style={styles.container}>
        {/* Fixed Navigation Area */}
        <View style={styles.navigationArea}>
          <TopNavBar
            onGuidePress={onGuidePress}
            onMenuPress={onMenuPress}
            onBackPress={onBackPress}
          />

          {/* Workout Title Bar with green border */}
          <View style={styles.workoutTitleBar}>
            <Text style={styles.workoutTitleText}>{workoutType}</Text>

            {/* Conditional Let's Go Button */}
            {showLetsGoButton && onLetsGoPress && (
              <View style={styles.letsGoButtonContainer}>
                {/* Shadow Layer 3 - Darkest, furthest */}
                <View style={[styles.letsGoButtonShadow, styles.shadowLayer3]} />
                {/* Shadow Layer 2 - Medium darkness */}
                <View style={[styles.letsGoButtonShadow, styles.shadowLayer2]} />
                {/* Shadow Layer 1 - Lightest, closest */}
                <View style={[styles.letsGoButtonShadow, styles.shadowLayer1]} />
                {/* Actual Button */}
                <TouchableOpacity
                  style={styles.letsGoButton}
                  onPress={onLetsGoPress}
                  activeOpacity={0.7}>
                  <Text style={styles.letsGoButtonText}>LET'S GO!</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>

        {/* Dynamic Content Area - this is where transitions happen */}
        <View style={styles.contentArea}>
          {children}
        </View>

        {/* Bottom Tab Bar - persists across all workout screens */}
        <BottomTabBar
          state={{
            routes: [
              {key: 'home', name: 'HomePage', params: undefined},
              {key: 'plans', name: 'PlansPage', params: undefined},
              {key: 'social', name: 'SocialScreen', params: undefined},
            ],
            index: 0, // Default to home tab (workout screens are part of home flow)
            type: 'tab' as const,
            key: 'tab',
            routeNames: ['HomePage', 'PlansPage', 'SocialScreen'],
            stale: false,
            history: [],
          }}
          navigation={{
            ...navigation,
            navigate: (name: string, params?: any) => {
              // Navigate to Tabs screen with specific tab as nested screen
              navigation.navigate('Tabs' as any, {screen: name, params});
            },
          } as any}
        />
      </SafeAreaView>

      {/* Sidebar Menu */}
      <Sidebar
        visible={sidebarVisible}
        onClose={onSidebarClose}
        onSelect={onSidebarSelect}
      />
    </>
  );
};

// ============================================================================
// STYLES
// ============================================================================

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.pureBlack,
  },

  navigationArea: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    backgroundColor: theme.colors.pureBlack,
  },

  // === WORKOUT TITLE BAR ===
  workoutTitleBar: {
    marginTop: theme.layout.topNav.topSpacing + theme.layout.topNav.height,
    height: 66, // 66dp container (8dp + 50dp button + 8dp)
    backgroundColor: theme.colors.pureBlack,
    borderBottomWidth: theme.layout.border.thin,
    borderBottomColor: theme.colors.actionSuccess, // GREEN BORDER #1
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: theme.spacing.s,
    paddingRight: theme.spacing.s,
    zIndex: 1,
  },

  workoutTitleText: {
    fontSize: 36, // Large workout title
    fontFamily: theme.typography.fontFamily.workoutCard,
    color: theme.colors.actionSuccess,
    textTransform: 'uppercase',
    includeFontPadding: false,
    transform: [{scaleX: 1.2}, {translateY: 2}], // Horizontal stretch with vertical adjustment
    marginLeft: 11, // Left offset for visual alignment
    textShadowColor: theme.colors.shadowBlack,
    textShadowOffset: {width: 0, height: 2}, // Drop shadow
    textShadowRadius: 4, // Shadow blur
  },

  // === LET'S GO BUTTON ===
  letsGoButtonContainer: {
    width: 100,
    height: 50,
  },

  letsGoButtonShadow: {
    position: 'absolute',
    width: 100,
    height: 50,
    backgroundColor: theme.colors.shadowBlack,
    borderRadius: 8,
  },

  letsGoButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 100,
    height: 50,
    backgroundColor: theme.colors.actionSuccess,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },

  letsGoButtonText: {
    fontSize: theme.typography.fontSize.l,
    fontFamily: theme.typography.fontFamily.primary,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.pureBlack,
    textTransform: 'uppercase',
  },

  // Shadow layers for drop shadow effect
  shadowLayer3: {
    bottom: -6, // Furthest shadow layer
    right: 0,
    opacity: 0.15,
  },

  shadowLayer2: {
    bottom: -4, // Middle shadow layer
    right: 0,
    opacity: 0.25,
  },

  shadowLayer1: {
    bottom: -2, // Closest shadow layer
    right: 0,
    opacity: 0.4,
  },

  // === CONTENT AREA ===
  contentArea: {
    flex: 1,
    paddingTop: theme.layout.topNav.topSpacing + theme.layout.topNav.height + 66 + theme.spacing.s, // Clear navigation area (138dp)
    paddingBottom: theme.layout.bottomNav.height, // Clear bottom tab bar (accounts for safe area in BottomTabBar component)
  },
});
