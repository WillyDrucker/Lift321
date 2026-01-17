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
  Image,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import type {CompositeNavigationProp} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import type {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {theme} from '@/theme';
import {TopNavBar, Sidebar, BottomTabBar} from '@/components';
import type {WorkoutType} from '@/components/WorkoutCard';
import type {MainStackParamList, TabParamList} from '@/navigation/types';
import {usePlan} from '@/features/plans/context/PlanContext';
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
  const {width: screenWidth} = useWindowDimensions();

  // Get selected plan from context
  const {selectedPlan} = usePlan();

  // Track title bar height dynamically
  const [measuredTitleHeight, setMeasuredTitleHeight] = useState(44); // Initial estimate
  const [titleIsWrapped, setTitleIsWrapped] = useState(false); // Track if title spans multiple lines
  const [measuredMinsWidth, setMeasuredMinsWidth] = useState(86); // Dynamic MINS display width
  const [measuredMinsHeight, setMeasuredMinsHeight] = useState(32); // Dynamic MINS display height

  // Measure title text container height (determines title bar height)
  const handleTitleTextContainerLayout = useCallback((event: { nativeEvent: { layout: { height: number } } }) => {
    const height = event.nativeEvent.layout.height;
    if (height !== measuredTitleHeight) {
      setMeasuredTitleHeight(height);
      onTitleBarHeightChange?.(height);
    }
  }, [measuredTitleHeight, onTitleBarHeightChange]);

  // Detect if title text wraps to multiple lines
  // Once wrapped, stays wrapped (sticky) to prevent oscillation when width changes
  const handleTitleTextLayout = useCallback((event: { nativeEvent: { lines: Array<unknown> } }) => {
    const lineCount = event.nativeEvent.lines.length;
    if (lineCount > 1 && !titleIsWrapped) {
      setTitleIsWrapped(true);
    }
  }, [titleIsWrapped]);

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

  // Show workout-specific UI elements when in active workout
  const showWorkoutStatus = totalSets > 0;

  // Calculate max width for title text
  // Always leave room for MINS + 8dp gap (MINS may be top-right or bottom-right)
  const horizontalPadding = theme.layout.topNav.paddingHorizontal * 2;
  const gapFromMins = 8; // 8dp gap from MINS

  // Title width leaves room for dynamically measured MINS width
  const calculatedTitleMaxWidth = showWorkoutStatus
    ? screenWidth - horizontalPadding - measuredMinsWidth - gapFromMins
    : screenWidth - horizontalPadding;

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
        {/* Fixed Navigation Area */}
        <View style={[styles.navigationArea, wrappedTitle && {overflow: 'visible'}]}>
          <TopNavBar
            onMenuPress={onMenuPress}
            onBackPress={onBackPress}
            onGearPress={showWorkoutStatus && !hideNavGear ? () => {} : undefined}
            centerContent={navBarCenterContent}
            leftContent={navBarLeftContent}
          />

          {/* Workout Title Bar (body part name) - Height based on title text container */}
          <View
            style={[
              styles.workoutTitleBar,
              {
                marginTop: insets.top + theme.layout.topNav.height,
                paddingTop: 44 - theme.layout.topNav.height, // Align with bottom of plan image
              }
            ]}
          >
            {/* Green line at top of title bar (optional) */}
            {showTopGreenLine && <View style={[styles.greenAccentLine, {position: 'absolute', top: 0, left: 0, right: 0}]} />}

            {/* Title Text Container - determines title bar height */}
            <View
              style={{maxWidth: calculatedTitleMaxWidth, paddingVertical: 2}}
              onLayout={handleTitleTextContainerLayout}
            >
              <Text
                style={[styles.workoutTitleText, {lineHeight: 30}]}
                numberOfLines={2}
                ellipsizeMode="tail"
                onTextLayout={handleTitleTextLayout}
              >
{workoutType.toUpperCase()}
              </Text>
            </View>

          </View>

          {/* Green accent line */}
          <View style={styles.greenAccentLine} />
        </View>

        {/* Plan Image - Independent floating element, centered on screen (future: link to plans overview) */}
        <View
          style={[styles.planImageContainer, {top: insets.top + 4}]}
          pointerEvents="box-none"
        >
          <Image
            source={selectedPlan.image}
            style={styles.planImage}
            resizeMode="contain"
          />
        </View>

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
    // marginTop, paddingTop, paddingBottom set dynamically
    backgroundColor: theme.colors.pureBlack,
    flexDirection: 'row',
    alignItems: 'flex-start', // Top-align content
    justifyContent: 'space-between',
    paddingHorizontal: theme.layout.topNav.paddingHorizontal, // Align with TopNavBar (16dp)
    zIndex: 1,
  },
  greenAccentLine: {
    height: 1, // 1dp green line
    backgroundColor: theme.colors.actionSuccess,
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
  planImageContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 15, // Above navigation area (10) but below children overlays
  },
  planImage: {
    height: 40, // Full height of title bar
    width: 120, // 3:1 aspect ratio (40 * 3 = 120)
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
