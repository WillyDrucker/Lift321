// ==========================================================================
// REPS CONTROL CARD COMPONENT
//
// Control card for adjusting current exercise reps.
// Features +/- buttons and an integrated dial gauge in the display.
// The dial is visible through a "lens" when dragging - retro gauge style.
//
// Dependencies: theme tokens, ScrollView, Animated
// Used by: ActiveWorkoutScreen
// ==========================================================================

import React, {useState, useEffect, useMemo, useCallback, useRef} from 'react';
import {View, StyleSheet, Text, Pressable, Dimensions, ScrollView, NativeScrollEvent, NativeSyntheticEvent, Animated} from 'react-native';
import {theme} from '@/theme';

// ============================================================================
// TYPES
// ============================================================================

type RepsControlCardProps = {
  initialReps?: number;
  targetReps?: number;
  onRepsChange: (reps: number) => void;
};

// ============================================================================
// DIAL CONFIGURATION
// ============================================================================

const SCREEN_WIDTH = Dimensions.get('window').width;
const GAUGE_HEIGHT = 48; // Height of the gauge window (standard touch target)

const DIAL_CONFIG = {
  tickSpacing: 10,              // Pixels between ticks
  repsPerTick: 1,               // Each tick represents 1 rep

  // Tick dimensions - balanced to center in gauge
  minorTickHeight: 10,          // Every 1 rep - smallest
  mediumTickHeight: 20,         // Every 5 reps - medium
  majorTickHeight: 32,          // Every 10 reps - tallest
  tickWidth: 2,

  // Center indicator
  indicatorWidth: 3,
  indicatorHeight: GAUGE_HEIGHT - 8, // Slightly shorter than full height

  // Reps bounds
  minReps: 0,
  maxReps: 100,
} as const;

// ============================================================================
// COMPONENT
// ============================================================================

export const RepsControlCard: React.FC<RepsControlCardProps> = ({
  initialReps = 10,
  targetReps = 10,
  onRepsChange,
}) => {
  // === STATE ===
  const dragOpacity = useRef(new Animated.Value(1)).current; // 1 = show number, 0 = show dial
  const [displayReps, setDisplayReps] = useState(initialReps);
  const currentRepsRef = useRef(initialReps);

  // Inverse opacity for header swap (REPS fades out, number fades in)
  const headerLabelOpacity = dragOpacity;
  const headerRepsOpacity = dragOpacity.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0],
  });

  // Color based on distance from target
  const getRepsColor = useCallback((reps: number) => {
    const diff = Math.abs(reps - targetReps);
    if (diff <= 2) return theme.colors.actionSuccess;       // Green - off by 0-2
    if (diff <= 4) return theme.colors.sessionExpress;      // Olive - off by 3-4
    if (diff <= 6) return theme.colors.sessionMaintenance;  // Yellow - off by 5-6
    if (diff <= 10) return theme.colors.actionWarning;      // Orange - off by 7-10
    return theme.colors.pureWhite;                           // White - off by 11+
  }, [targetReps]);
  const scrollViewRef = useRef<ScrollView>(null);
  const isUserDragging = useRef(false);
  const isButtonUpdate = useRef(false);
  const lastScrollReps = useRef(initialReps);

  // Sync display and ref from prop (only when not actively updating)
  useEffect(() => {
    if (!isButtonUpdate.current && !isUserDragging.current) {
      currentRepsRef.current = initialReps;
      setDisplayReps(initialReps);
      if (initialReps !== lastScrollReps.current) {
        const scrollPosition = initialReps * DIAL_CONFIG.tickSpacing;
        scrollViewRef.current?.scrollTo({x: scrollPosition, animated: true});
        lastScrollReps.current = initialReps;
      }
    }
  }, [initialReps]);

  // === FLING DETECTION CONFIG ===
  const FLING_VELOCITY_THRESHOLD = 0.5;
  const FLING_SNAP_INCREMENT = 5; // Snap to 5s on fling
  const wasFling = useRef(false);

  // === DRAG HANDLERS WITH OPACITY ANIMATION ===
  const handleScrollBeginDrag = useCallback(() => {
    isUserDragging.current = true;
    isButtonUpdate.current = false;
    wasFling.current = false;

    // Fade out the number to reveal the dial
    Animated.timing(dragOpacity, {
      toValue: 0,
      duration: 150,
      useNativeDriver: true,
    }).start();
  }, [dragOpacity]);

  const handleScrollEndDrag = useCallback((event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const scrollX = event.nativeEvent.contentOffset.x;
    const velocity = Math.abs(event.nativeEvent.velocity?.x || 0);

    if (velocity > FLING_VELOCITY_THRESHOLD) {
      wasFling.current = true;
      const currentReps = scrollX / DIAL_CONFIG.tickSpacing;
      const velocityX = event.nativeEvent.velocity?.x || 0;
      const projectedReps = currentReps - (velocityX * 15);
      const snappedReps = Math.round(projectedReps / FLING_SNAP_INCREMENT) * FLING_SNAP_INCREMENT;
      const clampedReps = Math.max(DIAL_CONFIG.minReps, Math.min(DIAL_CONFIG.maxReps, snappedReps));

      const scrollPosition = clampedReps * DIAL_CONFIG.tickSpacing;
      scrollViewRef.current?.scrollTo({x: scrollPosition, animated: true});
      currentRepsRef.current = clampedReps;
      setDisplayReps(clampedReps);
      lastScrollReps.current = clampedReps;
      onRepsChange(clampedReps);
    } else {
      const newReps = Math.round(scrollX / DIAL_CONFIG.tickSpacing);
      const clampedReps = Math.max(DIAL_CONFIG.minReps, Math.min(DIAL_CONFIG.maxReps, newReps));
      currentRepsRef.current = clampedReps;
      setDisplayReps(clampedReps);
      lastScrollReps.current = clampedReps;
      onRepsChange(clampedReps);
    }
  }, [onRepsChange]);

  const handleMomentumScrollEnd = useCallback((event: NativeSyntheticEvent<NativeScrollEvent>) => {
    isUserDragging.current = false;

    // Fade the number back in
    Animated.timing(dragOpacity, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();

    if (wasFling.current) {
      wasFling.current = false;
      return;
    }

    if (isButtonUpdate.current) return;

    const scrollX = event.nativeEvent.contentOffset.x;
    const newReps = Math.round(scrollX / DIAL_CONFIG.tickSpacing);
    const clampedReps = Math.max(DIAL_CONFIG.minReps, Math.min(DIAL_CONFIG.maxReps, newReps));
    currentRepsRef.current = clampedReps;
    setDisplayReps(clampedReps);
    lastScrollReps.current = clampedReps;
    onRepsChange(clampedReps);
  }, [onRepsChange, dragOpacity]);

  // Real-time scroll handler to update header reps display
  const handleScroll = useCallback((event: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (!isUserDragging.current) return;
    const scrollX = event.nativeEvent.contentOffset.x;
    const currentReps = Math.round(scrollX / DIAL_CONFIG.tickSpacing);
    const clampedReps = Math.max(DIAL_CONFIG.minReps, Math.min(DIAL_CONFIG.maxReps, currentReps));
    setDisplayReps(clampedReps);
  }, []);

  // === RENDER TICKS ===
  const ticks = useMemo(() => {
    const tickElements: JSX.Element[] = [];
    const maxTicks = DIAL_CONFIG.maxReps / DIAL_CONFIG.repsPerTick;

    for (let tickIndex = 0; tickIndex <= maxTicks; tickIndex++) {
      const tickReps = tickIndex * DIAL_CONFIG.repsPerTick;
      const isMajor = tickReps % 10 === 0;
      const isMedium = tickReps % 5 === 0 && !isMajor;

      tickElements.push(
        <View
          key={tickIndex}
          style={styles.tickContainer}
          renderToHardwareTextureAndroid={true}
        >
          <View
            style={[
              styles.tick,
              isMajor ? styles.majorTick : isMedium ? styles.mediumTick : styles.minorTick,
            ]}
          />
          {isMajor && (
            <Text style={styles.tickLabel}>{tickReps}</Text>
          )}
        </View>
      );
    }
    return tickElements;
  }, []);

  // === BUTTON AUTO-REPEAT ===
  const repeatTimer = useRef<NodeJS.Timeout | null>(null);
  const accelerateTimer = useRef<NodeJS.Timeout | null>(null);
  const isAccelerated = useRef(false);

  const handleIncrement = useCallback((amount: number, useAnimation: boolean = true) => {
    const current = currentRepsRef.current;
    const newReps = Math.min(current + amount, DIAL_CONFIG.maxReps);
    currentRepsRef.current = newReps;
    setDisplayReps(newReps);
    isButtonUpdate.current = true;
    lastScrollReps.current = newReps;
    const scrollPosition = newReps * DIAL_CONFIG.tickSpacing;
    scrollViewRef.current?.scrollTo({x: scrollPosition, animated: useAnimation});
    onRepsChange(newReps);
  }, [onRepsChange]);

  const handleDecrement = useCallback((amount: number, useAnimation: boolean = true) => {
    const current = currentRepsRef.current;
    const newReps = Math.max(current - amount, DIAL_CONFIG.minReps);
    currentRepsRef.current = newReps;
    setDisplayReps(newReps);
    isButtonUpdate.current = true;
    lastScrollReps.current = newReps;
    const scrollPosition = newReps * DIAL_CONFIG.tickSpacing;
    scrollViewRef.current?.scrollTo({x: scrollPosition, animated: useAnimation});
    onRepsChange(newReps);
  }, [onRepsChange]);

  const clearAllTimers = useCallback(() => {
    if (repeatTimer.current) {
      clearInterval(repeatTimer.current);
      repeatTimer.current = null;
    }
    if (accelerateTimer.current) {
      clearTimeout(accelerateTimer.current);
      accelerateTimer.current = null;
    }
    isAccelerated.current = false;
    isButtonUpdate.current = false;
  }, []);

  const startAutoRepeat = useCallback((
    initialAction: () => void,
    repeatAction: () => void
  ) => {
    // Clear any existing timers first to prevent stacking
    if (repeatTimer.current) {
      clearInterval(repeatTimer.current);
      repeatTimer.current = null;
    }
    if (accelerateTimer.current) {
      clearTimeout(accelerateTimer.current);
      accelerateTimer.current = null;
    }

    initialAction();
    accelerateTimer.current = setTimeout(() => {
      isAccelerated.current = true;
      repeatTimer.current = setInterval(() => {
        repeatAction();
      }, 100);
    }, 200);
  }, []);

  useEffect(() => {
    return () => clearAllTimers();
  }, [clearAllTimers]);

  // === GAUGE CONTAINER WIDTH (for dial centering) ===
  // Container padding (16) - left button (48) - right button (48) - left margin (16) - right margin (16)
  const gaugeWidth = SCREEN_WIDTH - 16 - 48 - 48 - 16 - 16;

  // === RENDER ===
  return (
    <View style={styles.container}>
      {/* Header - "REPS" swaps with number, "(TARGET: X)" stays static */}
      <View style={styles.header}>
        <View style={styles.headerRow}>
          <View style={styles.headerSwapContainer}>
            <Animated.Text style={[styles.title, {opacity: headerLabelOpacity}]}>
              REPS
            </Animated.Text>
            <Animated.Text style={[styles.headerReps, {color: getRepsColor(displayReps), opacity: headerRepsOpacity}]}>
              {displayReps}
            </Animated.Text>
          </View>
          <Text style={styles.headerStatic}> (TARGET: <Text style={styles.targetValue}>{targetReps}</Text>)</Text>
        </View>
      </View>

      {/* Button Controls with Integrated Gauge */}
      <View style={styles.controlsContainer}>
        {/* Decrement Button */}
        <Pressable
          style={styles.adjustButton}
          onPressIn={() => startAutoRepeat(
            () => handleDecrement(1, true),
            () => handleDecrement(1, false)
          )}
          onPressOut={clearAllTimers}>
          <Text style={styles.adjustButtonText}>-1</Text>
        </Pressable>

        {/* Gauge Display - Contains dial and reps overlay */}
        <View style={styles.gaugeContainer}>
          {/* Scrollable Tick Track - Base layer */}
          <ScrollView
            ref={scrollViewRef}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={[
              styles.dialTrack,
              {paddingHorizontal: gaugeWidth / 2 - DIAL_CONFIG.tickSpacing / 2}
            ]}
            snapToInterval={DIAL_CONFIG.tickSpacing}
            snapToAlignment="start"
            decelerationRate={0.992}
            disableIntervalMomentum={true}
            nestedScrollEnabled={true}
            directionalLockEnabled={true}
            removeClippedSubviews={true}
            onScroll={handleScroll}
            scrollEventThrottle={16}
            onScrollBeginDrag={handleScrollBeginDrag}
            onScrollEndDrag={handleScrollEndDrag}
            onMomentumScrollEnd={handleMomentumScrollEnd}
            contentOffset={{x: initialReps * DIAL_CONFIG.tickSpacing, y: 0}}
          >
            {ticks}
          </ScrollView>

          {/* Label background - covers tick labels only near major ticks */}
          {[0, 1, 9].includes(displayReps % 10) && (
            <Animated.View
              style={[styles.numberBackgroundWrapper, {opacity: dragOpacity}]}
              pointerEvents="none"
            >
              <View style={styles.numberBackground} />
            </Animated.View>
          )}

          {/* Center Indicator Line */}
          <View style={styles.centerIndicator} pointerEvents="none" />

          {/* Reps Number - on top of everything */}
          <Animated.View
            style={[styles.repsOverlay, {opacity: dragOpacity}]}
            pointerEvents="none"
          >
            <Text style={[styles.repsDisplay, {color: getRepsColor(displayReps)}]}>{displayReps}</Text>
          </Animated.View>
        </View>

        {/* Increment Button */}
        <Pressable
          style={styles.adjustButton}
          onPressIn={() => startAutoRepeat(
            () => handleIncrement(1, true),
            () => handleIncrement(1, false)
          )}
          onPressOut={clearAllTimers}>
          <Text style={styles.adjustButtonText}>+1</Text>
        </Pressable>
      </View>
    </View>
  );
};

// ============================================================================
// STYLES
// ============================================================================

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.backgroundPrimary,
    borderRadius: theme.spacing.s,
    paddingTop: 13, // Adjusted: 16dp visual from card top to header text
    paddingHorizontal: theme.spacing.s,
    paddingBottom: theme.spacing.s,
    marginBottom: theme.spacing.s,
  },
  header: {
    marginBottom: 12, // Adjusted: 16dp visual from header to dial
    alignItems: 'center',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerSwapContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    color: theme.colors.backgroundTertiary,
    fontFamily: theme.typography.fontFamily.primary,
    fontWeight: 'bold',
    includeFontPadding: false,
  },
  headerReps: {
    fontSize: 32,
    lineHeight: 32,
    color: theme.colors.pureWhite,
    fontFamily: theme.typography.fontFamily.primary,
    fontWeight: 'bold',
    includeFontPadding: false,
    position: 'absolute',
    // Match main reps display shadow
    textShadowColor: theme.colors.pureBlack,
    textShadowOffset: {width: 0, height: 0},
    textShadowRadius: 8,
  },
  headerStatic: {
    fontSize: 16,
    color: theme.colors.backgroundTertiary,
    fontFamily: theme.typography.fontFamily.primary,
    fontWeight: 'bold',
    includeFontPadding: false,
  },
  targetValue: {
    color: theme.colors.actionSuccess,
  },
  controlsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  adjustButton: {
    width: 48,
    height: 48,
    backgroundColor: theme.colors.backgroundSecondary,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.colors.borderDefault,
  },
  adjustButtonText: {
    color: theme.colors.textSecondary,
    fontSize: 16,
    fontWeight: 'bold',
  },

  // === GAUGE STYLES ===
  gaugeContainer: {
    flex: 1,
    height: GAUGE_HEIGHT,
    backgroundColor: theme.colors.pureBlack,
    borderRadius: 8,
    marginHorizontal: theme.spacing.s,
    overflow: 'hidden',
    position: 'relative',
    justifyContent: 'center',
  },
  dialTrack: {
    flexDirection: 'row',
    alignItems: 'center',
    height: GAUGE_HEIGHT,
  },
  tickContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: DIAL_CONFIG.tickSpacing,
    height: GAUGE_HEIGHT,
  },
  tick: {
    width: DIAL_CONFIG.tickWidth,
  },
  minorTick: {
    height: DIAL_CONFIG.minorTickHeight,
    backgroundColor: theme.colors.textSecondary,
    opacity: 0.4,
  },
  mediumTick: {
    height: DIAL_CONFIG.mediumTickHeight,
    backgroundColor: theme.colors.textSecondary,
    opacity: 0.6,
  },
  majorTick: {
    height: DIAL_CONFIG.majorTickHeight - 4,
    backgroundColor: theme.colors.pureWhite,
    opacity: 0.8,
    transform: [{translateY: -4}],
  },
  tickLabel: {
    position: 'absolute',
    bottom: 2,
    width: 30,
    left: -10,
    fontSize: 8,
    color: theme.colors.textSecondary,
    fontFamily: theme.typography.fontFamily.primary,
    fontWeight: 'bold',
    textAlign: 'center',
    opacity: 0.8,
  },
  centerIndicator: {
    position: 'absolute',
    top: 4,
    bottom: 4,
    left: '50%',
    marginLeft: -DIAL_CONFIG.indicatorWidth / 2,
    width: DIAL_CONFIG.indicatorWidth,
    backgroundColor: theme.colors.customWorkoutBlue,
    borderRadius: 1,
  },
  repsOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  numberBackgroundWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  numberBackground: {
    width: 40,  // Wide enough to cover label when directly on major tick
    height: 8,  // Just covers label text, not tick lines
    marginBottom: 2,
    backgroundColor: theme.colors.pureBlack,
  },
  repsDisplay: {
    fontSize: 32,
    color: theme.colors.pureWhite,
    fontFamily: theme.typography.fontFamily.primary,
    fontWeight: 'bold',
    textAlign: 'center',
    includeFontPadding: false,
    textShadowColor: theme.colors.pureBlack,
    textShadowOffset: {width: 0, height: 0},
    textShadowRadius: 8,
  },
});
