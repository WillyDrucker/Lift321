// ==========================================================================
// WEIGHT CONTROL CARD COMPONENT
//
// Control card for adjusting global/current exercise weight.
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

type WeightControlCardProps = {
  initialWeight?: number;
  onWeightChange: (weight: number) => void;
};

// ============================================================================
// DIAL CONFIGURATION
// ============================================================================

const SCREEN_WIDTH = Dimensions.get('window').width;
const GAUGE_HEIGHT = 48; // Height of the gauge window (standard touch target)

const DIAL_CONFIG = {
  tickSpacing: 10,              // Pixels between ticks
  weightPerTick: 1,             // Each tick represents 1 lb

  // Tick dimensions - balanced to center in gauge
  minorTickHeight: 10,          // Every 1 lb - smallest
  mediumTickHeight: 20,         // Every 5 lbs - medium
  majorTickHeight: 32,          // Every 10 lbs - tallest
  tickWidth: 2,

  // Center indicator
  indicatorWidth: 3,
  indicatorHeight: GAUGE_HEIGHT - 8, // Slightly shorter than full height

  // Weight bounds
  minWeight: 0,
  maxWeight: 1000,
} as const;

// ============================================================================
// COMPONENT
// ============================================================================

export const WeightControlCard: React.FC<WeightControlCardProps> = ({
  initialWeight = 135,
  onWeightChange,
}) => {
  // === STATE ===
  const dragOpacity = useRef(new Animated.Value(1)).current; // 1 = show number, 0 = show dial
  const [displayWeight, setDisplayWeight] = useState(initialWeight); // Real-time weight during scroll
  const weight = initialWeight.toString();
  const currentWeightRef = useRef(initialWeight);
  const scrollViewRef = useRef<ScrollView>(null);
  const isUserDragging = useRef(false);
  const isButtonUpdate = useRef(false);
  const lastScrollWeight = useRef(initialWeight);

  // Inverse opacity for header swap (WEIGHT fades out, number fades in)
  const headerLabelOpacity = dragOpacity;
  const headerWeightOpacity = dragOpacity.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0],
  });

  // Keep ref and displayWeight in sync with prop
  useEffect(() => {
    currentWeightRef.current = initialWeight;
    if (!isUserDragging.current) {
      setDisplayWeight(initialWeight);
    }
  }, [initialWeight]);

  // === SYNC SCROLLVIEW WITH EXTERNAL WEIGHT CHANGES ===
  useEffect(() => {
    if (isUserDragging.current) return;
    if (isButtonUpdate.current) return;
    if (initialWeight !== lastScrollWeight.current) {
      const scrollPosition = initialWeight * DIAL_CONFIG.tickSpacing;
      scrollViewRef.current?.scrollTo({x: scrollPosition, animated: true});
      lastScrollWeight.current = initialWeight;
    }
  }, [initialWeight]);

  // === FLING DETECTION CONFIG ===
  const FLING_VELOCITY_THRESHOLD = 0.5;
  const FLING_SNAP_INCREMENT = 10;
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
      const currentWeight = scrollX / DIAL_CONFIG.tickSpacing;
      const velocityX = event.nativeEvent.velocity?.x || 0;
      const projectedWeight = currentWeight - (velocityX * 15);
      const snappedWeight = Math.round(projectedWeight / FLING_SNAP_INCREMENT) * FLING_SNAP_INCREMENT;
      const clampedWeight = Math.max(DIAL_CONFIG.minWeight, Math.min(DIAL_CONFIG.maxWeight, snappedWeight));

      const scrollPosition = clampedWeight * DIAL_CONFIG.tickSpacing;
      scrollViewRef.current?.scrollTo({x: scrollPosition, animated: true});
      lastScrollWeight.current = clampedWeight;
      onWeightChange(clampedWeight);
    } else {
      const newWeight = Math.round(scrollX / DIAL_CONFIG.tickSpacing);
      const clampedWeight = Math.max(DIAL_CONFIG.minWeight, Math.min(DIAL_CONFIG.maxWeight, newWeight));
      lastScrollWeight.current = clampedWeight;
      onWeightChange(clampedWeight);
    }
  }, [onWeightChange]);

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
    const newWeight = Math.round(scrollX / DIAL_CONFIG.tickSpacing);
    const clampedWeight = Math.max(DIAL_CONFIG.minWeight, Math.min(DIAL_CONFIG.maxWeight, newWeight));
    lastScrollWeight.current = clampedWeight;
    onWeightChange(clampedWeight);
  }, [onWeightChange, dragOpacity]);

  // Real-time scroll handler to update header weight display
  const handleScroll = useCallback((event: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (!isUserDragging.current) return;
    const scrollX = event.nativeEvent.contentOffset.x;
    const currentWeight = Math.round(scrollX / DIAL_CONFIG.tickSpacing);
    const clampedWeight = Math.max(DIAL_CONFIG.minWeight, Math.min(DIAL_CONFIG.maxWeight, currentWeight));
    setDisplayWeight(clampedWeight);
  }, []);

  // === RENDER TICKS ===
  const ticks = useMemo(() => {
    const tickElements: JSX.Element[] = [];
    const maxTicks = DIAL_CONFIG.maxWeight / DIAL_CONFIG.weightPerTick;

    for (let tickIndex = 0; tickIndex <= maxTicks; tickIndex++) {
      const tickWeight = tickIndex * DIAL_CONFIG.weightPerTick;
      const isMajor = tickWeight % 10 === 0;
      const isMedium = tickWeight % 5 === 0 && !isMajor;

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
            <Text style={styles.tickLabel}>{tickWeight}</Text>
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
    const current = currentWeightRef.current;
    const newWeight = Math.min(current + amount, DIAL_CONFIG.maxWeight);
    isButtonUpdate.current = true;
    lastScrollWeight.current = newWeight;
    const scrollPosition = newWeight * DIAL_CONFIG.tickSpacing;
    scrollViewRef.current?.scrollTo({x: scrollPosition, animated: useAnimation});
    onWeightChange(newWeight);
  }, [onWeightChange]);

  const handleDecrement = useCallback((amount: number, useAnimation: boolean = true) => {
    const current = currentWeightRef.current;
    const newWeight = Math.max(current - amount, DIAL_CONFIG.minWeight);
    isButtonUpdate.current = true;
    lastScrollWeight.current = newWeight;
    const scrollPosition = newWeight * DIAL_CONFIG.tickSpacing;
    scrollViewRef.current?.scrollTo({x: scrollPosition, animated: useAnimation});
    onWeightChange(newWeight);
  }, [onWeightChange]);

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
      {/* Header - "WEIGHT" swaps with number, "(LBS)" stays static */}
      <View style={styles.header}>
        <View style={styles.headerRow}>
          <View style={styles.headerSwapContainer}>
            <Animated.Text style={[styles.title, {opacity: headerLabelOpacity}]}>
              WEIGHT
            </Animated.Text>
            <Animated.Text style={[styles.headerWeight, {opacity: headerWeightOpacity}]}>
              {displayWeight}
            </Animated.Text>
          </View>
          <Text style={styles.headerStatic}> (LBS)</Text>
        </View>
      </View>

      {/* Button Controls with Integrated Gauge */}
      <View style={styles.controlsContainer}>
        {/* Decrement Button */}
        <Pressable
          style={styles.adjustButton}
          onPressIn={() => startAutoRepeat(
            () => handleDecrement(5, true),
            () => handleDecrement(5, true)
          )}
          onPressOut={clearAllTimers}>
          <Text style={styles.adjustButtonText}>-5</Text>
        </Pressable>

        {/* Gauge Display - Contains dial and weight overlay */}
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
            contentOffset={{x: initialWeight * DIAL_CONFIG.tickSpacing, y: 0}}
          >
            {ticks}
          </ScrollView>

          {/* Label background - covers tick labels only near major ticks */}
          {[0, 1, 9].includes(initialWeight % 10) && (
            <Animated.View
              style={[styles.numberBackgroundWrapper, {opacity: dragOpacity}]}
              pointerEvents="none"
            >
              <View style={styles.numberBackground} />
            </Animated.View>
          )}

          {/* Center Indicator Line */}
          <View style={styles.centerIndicator} pointerEvents="none" />

          {/* Weight Number - on top of everything */}
          <Animated.View
            style={[styles.weightOverlay, {opacity: dragOpacity}]}
            pointerEvents="none"
          >
            <Text style={styles.weightDisplay}>{weight}</Text>
          </Animated.View>
        </View>

        {/* Increment Button */}
        <Pressable
          style={styles.adjustButton}
          onPressIn={() => startAutoRepeat(
            () => handleIncrement(5, true),
            () => handleIncrement(5, true)
          )}
          onPressOut={clearAllTimers}>
          <Text style={styles.adjustButtonText}>+5</Text>
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
  headerWeight: {
    fontSize: 32,
    lineHeight: 32,
    color: theme.colors.pureWhite,
    fontFamily: theme.typography.fontFamily.primary,
    fontWeight: 'bold',
    includeFontPadding: false,
    position: 'absolute',
    // Match main weight display shadow
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
    height: DIAL_CONFIG.majorTickHeight - 4, // Shrink top to align with green indicator
    backgroundColor: theme.colors.pureWhite,
    opacity: 0.8,
    transform: [{translateY: -4}], // Align top with green line (4dp from top)
  },
  tickLabel: {
    position: 'absolute',
    bottom: 2,
    width: 30,
    left: -10, // Center the 30dp width on the tick
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
  weightOverlay: {
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
  weightDisplay: {
    fontSize: 32,
    color: theme.colors.pureWhite,
    fontFamily: theme.typography.fontFamily.primary,
    fontWeight: 'bold',
    textAlign: 'center',
    includeFontPadding: false,
    // Text shadow for readability over dial
    textShadowColor: theme.colors.pureBlack,
    textShadowOffset: {width: 0, height: 0},
    textShadowRadius: 8,
  },
});
