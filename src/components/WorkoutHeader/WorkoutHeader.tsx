// ==========================================================================
// WORKOUT HEADER COMPONENT
//
// Global header component for workout screens with dynamic title wrapping,
// centered plan image, and green accent line. Designed to work with
// screen-specific right-side elements (MINS, LET'S GO button).
//
// Dependencies: theme tokens, PlanContext
// Used by: WorkoutLayout, potentially other workout-related screens
// ==========================================================================

import React, {useState, useCallback} from 'react';
import {StyleSheet, Text, View, Image, useWindowDimensions} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {theme} from '@/theme';
import {usePlan} from '@/features/plans/context/PlanContext';

// ============================================================================
// TYPES
// ============================================================================

type WorkoutHeaderProps = {
  title: string;
  rightElementWidth?: number; // Width of right-side element for title wrap calculation
  onTitleHeightChange?: (height: number) => void; // Callback when title height changes
  showTopGreenLine?: boolean; // Show green line at top of title bar
  topNavBar?: React.ReactNode; // TopNavBar component to render inside header
};

// ============================================================================
// COMPONENT
// ============================================================================

export const WorkoutHeader: React.FC<WorkoutHeaderProps> = ({
  title,
  rightElementWidth = 0,
  onTitleHeightChange,
  showTopGreenLine = false,
  topNavBar,
}) => {
  const insets = useSafeAreaInsets();
  const {width: screenWidth} = useWindowDimensions();
  const {selectedPlan} = usePlan();

  // Track title bar height dynamically
  const [measuredTitleHeight, setMeasuredTitleHeight] = useState(44);
  const [titleIsWrapped, setTitleIsWrapped] = useState(false);

  // Measure title text container height (determines title bar height)
  const handleTitleTextContainerLayout = useCallback((event: { nativeEvent: { layout: { height: number } } }) => {
    const height = event.nativeEvent.layout.height;
    if (height !== measuredTitleHeight) {
      setMeasuredTitleHeight(height);
      onTitleHeightChange?.(height);
    }
  }, [measuredTitleHeight, onTitleHeightChange]);

  // Detect if title text wraps to multiple lines
  // Once wrapped, stays wrapped (sticky) to prevent oscillation when width changes
  const handleTitleTextLayout = useCallback((event: { nativeEvent: { lines: Array<unknown> } }) => {
    const lineCount = event.nativeEvent.lines.length;
    if (lineCount > 1 && !titleIsWrapped) {
      setTitleIsWrapped(true);
    }
  }, [titleIsWrapped]);

  // Calculate max width for title text
  // Leave room for right-side element + 8dp gap
  const horizontalPadding = theme.layout.topNav.paddingHorizontal * 2;
  const gapFromRightElement = 8;
  const calculatedTitleMaxWidth = rightElementWidth > 0
    ? screenWidth - horizontalPadding - rightElementWidth - gapFromRightElement
    : screenWidth - horizontalPadding;

  return (
    <>
      {/* Fixed Navigation Area Container */}
      <View style={[styles.navigationArea, titleIsWrapped && {overflow: 'visible'}]}>
        {/* Top Navigation Bar (passed from parent) */}
        {topNavBar}

        {/* Workout Title Bar - Height based on title text container */}
        <View
          style={[
            styles.workoutTitleBar,
            {
              marginTop: insets.top + theme.layout.topNav.height,
              paddingTop: 44 - theme.layout.topNav.height,
            }
          ]}
        >
          {/* Green line at top of title bar (optional) */}
          {showTopGreenLine && (
            <View style={[styles.greenAccentLine, {position: 'absolute', top: 0, left: 0, right: 0}]} />
          )}

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
              {title.toUpperCase()}
            </Text>
          </View>
        </View>

        {/* Green accent line */}
        <View style={styles.greenAccentLine} />
      </View>

      {/* Plan Image - Independent floating element, centered on screen */}
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
    </>
  );
};

// ============================================================================
// STYLES
// ============================================================================

const styles = StyleSheet.create({
  navigationArea: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    backgroundColor: theme.colors.pureBlack,
  },

  workoutTitleBar: {
    backgroundColor: theme.colors.pureBlack,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingHorizontal: theme.layout.topNav.paddingHorizontal,
    zIndex: 1,
  },

  greenAccentLine: {
    height: 1,
    backgroundColor: theme.colors.actionSuccess,
  },

  workoutTitleText: {
    fontSize: 36,
    fontFamily: theme.typography.fontFamily.workoutCard,
    color: theme.colors.actionSuccess,
    textTransform: 'uppercase',
    includeFontPadding: false,
    transform: [{translateY: 2}],
    textShadowColor: theme.colors.shadowBlack,
    textShadowOffset: {width: 0, height: 2},
    textShadowRadius: 4,
  },

  planImageContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 15,
  },

  planImage: {
    height: 40,
    width: 120,
  },
});
