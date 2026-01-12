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
  Image,
} from 'react-native';
import type {CompositeNavigationProp} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import type {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {theme} from '@/theme';
import {TopNavBar, Sidebar, BottomTabBar} from '@/components';
import {GearIcon} from '@/components/icons';
import type {WorkoutType} from '@/components/WorkoutCard';
import type {MainStackParamList, TabParamList} from '@/navigation/types';
import {getWorkoutDuration} from '@/utils/durationCalculator';

// Plan image
const planImage = require('@/assets/images/plans/lift-3-2-1-plan.png');

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
  currentSetIndex?: number;
  totalSets?: number;
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
  currentSetIndex = 0,
  totalSets = 0,
  sidebarVisible,
  onSidebarClose,
  onSidebarSelect,
  onBackPress,
  onMenuPress,
  onGuidePress,
  navigation,
}) => {
  // Calculate workout status for settings bar
  const currentSetDisplay = currentSetIndex + 1;
  const remainingSets = totalSets - currentSetIndex;
  const remainingMinutes = remainingSets > 0 ? getWorkoutDuration(remainingSets) : 0;
  const showWorkoutStatus = totalSets > 0;
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

          {/* Workout Title Bar (body part name) */}
          <View style={[
            styles.workoutTitleBar,
            !showWorkoutStatus && styles.workoutTitleBarWithGreenBorder,
          ]}>
            <Text style={styles.workoutTitleText}>{workoutType}</Text>

            {/* Plan Image - shown during active workout */}
            {showWorkoutStatus && (
              <Image source={planImage} style={styles.planImage} resizeMode="contain" />
            )}

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

          {/* Workout Settings Bar - only shown during active workout */}
          {showWorkoutStatus && (
            <View style={styles.workoutSettingsBar}>
              {/* Gear Icon - Left aligned with hamburger menu */}
              <View style={styles.gearIconContainer}>
                <GearIcon width={24} height={24} color={theme.colors.textSecondary} />
              </View>

              {/* Centered SETS display */}
              <View style={styles.statsGroupCentered}>
                <Text style={styles.statusLabel}>SETS </Text>
                <Text style={styles.statusValueLarge}>{remainingSets}</Text>
              </View>

              {/* Right-aligned MINS */}
              <View style={styles.statsGroupRight}>
                <Text style={styles.statusLabel}>MINS </Text>
                <Text style={styles.statusValueLarge}>{remainingMinutes}</Text>
              </View>
            </View>
          )}
        </View>

        {/* Dynamic Content Area - this is where transitions happen */}
        <View style={[
          styles.contentArea,
          showWorkoutStatus && styles.contentAreaWithSettingsBar,
        ]}>
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
    height: 48, // 48dp container (8dp + 32dp button + 8dp)
    backgroundColor: theme.colors.pureBlack,
    borderBottomWidth: theme.layout.border.thin,
    borderBottomColor: theme.colors.pureWhite, // White line when settings bar is shown
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: theme.layout.topNav.paddingHorizontal, // Align with TopNavBar (16dp)
    zIndex: 1,
  },
  workoutTitleBarWithGreenBorder: {
    borderBottomColor: theme.colors.actionSuccess, // Green line when no settings bar
  },

  // === WORKOUT SETTINGS BAR ===
  workoutSettingsBar: {
    height: theme.layout.workoutSettingsBar.height,
    backgroundColor: theme.colors.pureBlack,
    borderBottomWidth: theme.layout.border.thin,
    borderBottomColor: theme.colors.actionSuccess, // Green scroll bar
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: theme.layout.topNav.paddingHorizontal, // Align with TopNavBar (16dp)
  },
  statusLabel: {
    fontSize: theme.layout.exerciseCard.setInfoFontSize,
    fontFamily: theme.typography.fontFamily.primary,
    fontWeight: 'bold',
    color: theme.colors.backgroundTertiary,
    includeFontPadding: false,
  },
  statusValue: {
    fontSize: theme.layout.exerciseCard.setInfoFontSize,
    fontFamily: theme.typography.fontFamily.primary,
    fontWeight: 'bold',
    color: theme.colors.actionSuccess,
    includeFontPadding: false,
  },
  statusValueLarge: {
    fontSize: 32,
    fontFamily: theme.typography.fontFamily.primary,
    fontWeight: 'bold',
    color: theme.colors.actionSuccess,
    includeFontPadding: false,
    transform: [{translateY: -2.5}], // Center vertically (move up to compensate for font metrics)
  },
  statsGroupCentered: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  statsGroupRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  gearIconContainer: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing.s, // Space before TO GO label
  },

  workoutTitleText: {
    fontSize: 36, // Large workout title
    fontFamily: theme.typography.fontFamily.workoutCard,
    color: theme.colors.actionSuccess,
    textTransform: 'uppercase',
    includeFontPadding: false,
    transform: [{translateY: 2}], // Compensate for font metrics to visually center
    textShadowColor: theme.colors.shadowBlack,
    textShadowOffset: {width: 0, height: 2}, // Drop shadow
    textShadowRadius: 4, // Shadow blur
  },
  planImage: {
    height: 32,
    width: 96, // 3:1 aspect ratio (32 * 3 = 96)
  },

  // === LET'S GO BUTTON ===
  letsGoButtonContainer: {
    width: 100,
    height: 32,
  },

  letsGoButtonShadow: {
    position: 'absolute',
    width: 100,
    height: 32,
    backgroundColor: theme.colors.shadowBlack,
    borderRadius: 8,
  },

  letsGoButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 100,
    height: 32,
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
    paddingTop: theme.layout.topNav.topSpacing + theme.layout.topNav.height + 48, // Clear navigation area (TopNav + Title Bar)
    paddingBottom: theme.layout.bottomNav.height, // Clear bottom tab bar (accounts for safe area in BottomTabBar component)
  },
  contentAreaWithSettingsBar: {
    paddingTop: theme.layout.activeWorkoutHeader.totalHeight, // Total header height during active workout
  },
});
