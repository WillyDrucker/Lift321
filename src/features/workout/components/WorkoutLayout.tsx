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

import React, {type ReactNode, useState, useCallback} from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import type {CompositeNavigationProp} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import type {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {theme} from '@/theme';
import {TopNavBar, Sidebar, BottomTabBar, WorkoutHeader} from '@/components';
import type {WorkoutType} from '@/components/WorkoutCard';
import type {MainStackParamList, TabParamList} from '@/navigation/types';
import {calculateWorkoutDuration} from '@/utils/durationCalculator';

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
  onLetsGoPress?: () => void; // Callback for LET'S GO button (WorkoutOverview only)
  currentSetIndex?: number;
  totalSets?: number;
  restMinutesPerSet?: number; // Dynamic rest time based on plan focus
  sidebarVisible: boolean;
  onSidebarClose: () => void;
  onSidebarSelect: (option: 'profile' | 'settings' | 'help' | 'logout') => void;
  onBackPress?: () => void;
  onMenuPress: () => void;
  navigation: WorkoutLayoutNavigation;
  navBarCenterContent?: ReactNode; // Optional center content for TopNavBar
  navBarLeftContent?: ReactNode; // Optional custom left content for TopNavBar
  hideNavGear?: boolean; // Hide the gear icon in the navigation bar
  titleBarExtraHeight?: number; // Extra height to add to title bar
  showTopGreenLine?: boolean; // Show green line at top of title bar
  titleMaxWidth?: number; // Max width for title text (allows wrapping)
  dynamicTitleHeight?: boolean; // Enable dynamic title bar height based on text wrapping
  onTitleBarHeightChange?: (height: number) => void; // Callback when title bar height changes
  wrappedTitle?: boolean; // Add extra height (32dp) when title wraps to second line
  titleAnchorTop?: boolean; // Anchor title to top (for medium-length titles when MINS is pushed down)
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
  onLetsGoPress,
  currentSetIndex = 0,
  totalSets = 0,
  restMinutesPerSet = 5,
  sidebarVisible,
  onSidebarClose,
  onSidebarSelect,
  onBackPress,
  onMenuPress,
  navigation,
  navBarCenterContent,
  navBarLeftContent,
  hideNavGear = false,
  titleBarExtraHeight = 0,
  showTopGreenLine = false,
  titleMaxWidth,
  dynamicTitleHeight = false,
  onTitleBarHeightChange,
  wrappedTitle = false,
  titleAnchorTop = false,
}) => {
  // Get safe area insets for dynamic positioning
  const insets = useSafeAreaInsets();

  // Track title bar height dynamically (reported by WorkoutHeader)
  const [measuredTitleHeight, setMeasuredTitleHeight] = useState(44);
  const [measuredMinsWidth, setMeasuredMinsWidth] = useState(86);
  const [measuredMinsHeight, setMeasuredMinsHeight] = useState(32);
  const [measuredLetsGoWidth, setMeasuredLetsGoWidth] = useState(90);

  // Handle title height change from WorkoutHeader
  const handleTitleHeightChange = useCallback((height: number) => {
    if (height !== measuredTitleHeight) {
      setMeasuredTitleHeight(height);
      onTitleBarHeightChange?.(height);
    }
  }, [measuredTitleHeight, onTitleBarHeightChange]);

  // Measure MINS display dimensions dynamically
  const handleMinsLayout = useCallback((event: { nativeEvent: { layout: { width: number; height: number } } }) => {
    const {width, height} = event.nativeEvent.layout;
    if (width !== measuredMinsWidth) {
      setMeasuredMinsWidth(width);
    }
    if (height !== measuredMinsHeight) {
      setMeasuredMinsHeight(height);
    }
  }, [measuredMinsWidth, measuredMinsHeight]);

  // Measure LET'S GO button width dynamically
  const handleLetsGoLayout = useCallback((event: { nativeEvent: { layout: { width: number } } }) => {
    const {width} = event.nativeEvent.layout;
    if (width !== measuredLetsGoWidth) {
      setMeasuredLetsGoWidth(width);
    }
  }, [measuredLetsGoWidth]);

  // Show workout-specific UI elements when in active workout
  const showWorkoutStatus = totalSets > 0;

  // Determine right element width for title wrap calculation
  // Priority: LET'S GO button (WorkoutOverview) > MINS (ActiveWorkout) > none
  const rightElementWidth = onLetsGoPress
    ? measuredLetsGoWidth
    : showWorkoutStatus
      ? measuredMinsWidth
      : 0;

  // Calculate remaining minutes for status display
  const remainingSets = totalSets - currentSetIndex;
  const remainingMinutes = remainingSets > 0
    ? calculateWorkoutDuration({totalSets: remainingSets, restMinutesPerSet}).totalMinutes
    : 0;
  return (
    <>
      <StatusBar
        barStyle="light-content"
        backgroundColor={theme.colors.pureBlack}
        translucent={false}
      />
      <SafeAreaView style={styles.container}>
        {/* Global Workout Header (includes TopNavBar, title bar, plan image) */}
        <WorkoutHeader
          title={workoutType}
          rightElementWidth={rightElementWidth}
          onTitleHeightChange={handleTitleHeightChange}
          showTopGreenLine={showTopGreenLine}
          topNavBar={
            <TopNavBar
              onMenuPress={onMenuPress}
              onBackPress={onBackPress}
              onGearPress={showWorkoutStatus && !hideNavGear ? () => {} : undefined}
              centerContent={navBarCenterContent}
              leftContent={navBarLeftContent}
            />
          }
        />

        {/* MINS Display - Independent floating element, locked to title bottom border */}
        {showWorkoutStatus && (
          <View
            style={[
              styles.minsContainer,
              {
                top: insets.top + 44 + measuredTitleHeight - measuredMinsHeight // Always bottom-aligned with title bar
              }
            ]}
            onLayout={handleMinsLayout}
          >
            <Text style={styles.minsLabel}>MINS</Text>
            <Text style={styles.minsValue}>{remainingMinutes}</Text>
          </View>
        )}

        {/* LET'S GO Button - Independent floating element, shown on WorkoutOverview only */}
        {onLetsGoPress && (
          <TouchableOpacity
            style={[
              styles.letsGoButton,
              {
                top: insets.top + 44 + measuredTitleHeight - 32, // Bottom of button 4dp above title bar border (28 height + 4 gap)
              }
            ]}
            onPress={onLetsGoPress}
            onLayout={handleLetsGoLayout}
            activeOpacity={0.7}
          >
            <Text style={styles.letsGoButtonText}>LET'S GO!</Text>
          </TouchableOpacity>
        )}

        {/* Dynamic Content Area - this is where transitions happen */}
        <View style={[
          styles.contentArea,
          {paddingTop: insets.top + 44 + measuredTitleHeight + 1}, // insets + title bar paddingTop offset (44) + title text height + green line(1)
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

  // === MINS DISPLAY ===
  minsContainer: {
    position: 'absolute',
    right: theme.layout.topNav.paddingHorizontal, // 16dp from right edge
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    zIndex: 15, // Same as plan image
  },
  minsLabel: {
    fontSize: theme.typography.fontSize.m,
    fontFamily: theme.typography.fontFamily.primary,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.backgroundTertiary,
    includeFontPadding: false,
  },
  minsValue: {
    fontSize: 32,
    lineHeight: 30,
    fontFamily: theme.typography.fontFamily.primary,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.actionSuccess,
    includeFontPadding: false,
  },

  // === LET'S GO BUTTON ===
  letsGoButton: {
    position: 'absolute',
    right: 16, // 16dp from right edge
    height: 28,
    paddingHorizontal: 6,
    backgroundColor: theme.colors.actionSuccess,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 15,
  },
  letsGoButtonText: {
    fontSize: theme.typography.fontSize.l,
    fontFamily: theme.typography.fontFamily.primary,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.pureBlack,
  },

  // === CONTENT AREA ===
  contentArea: {
    flex: 1,
    // paddingTop is set dynamically via insets
    paddingBottom: theme.layout.bottomNav.height, // Clear bottom tab bar (accounts for safe area in BottomTabBar component)
    zIndex: 1, // Below navigationArea (10) and BottomTabBar (20)
  },
});
