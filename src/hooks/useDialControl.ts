// ==========================================================================
// USE DIAL CONTROL HOOK
//
// Encapsulates all dial gauge state management including scroll sync,
// fling detection, value clamping, and animated opacity transitions.
//
// Dependencies: React, React Native Animated, ScrollView
// Used by: DialControlCard
// ==========================================================================

import {useState, useRef, useCallback, useEffect} from 'react';
import {
  Animated,
  Dimensions,
  type ScrollView,
  type NativeScrollEvent,
  type NativeSyntheticEvent,
} from 'react-native';

// ============================================================================
// TYPES
// ============================================================================

export type UseDialControlConfig = {
  initialValue: number;
  minValue: number;
  maxValue: number;
  tickSpacing: number;
  valuePerTick: number;
  flingSnapIncrement: number;
  flingVelocityThreshold: number;
  onChange: (value: number) => void;
  hideButtons?: boolean;
  compact?: boolean;
};

export type UseDialControlReturn = {
  // State
  displayValue: number;
  scrollViewRef: React.RefObject<ScrollView>;

  // Animation values
  dragOpacity: Animated.Value;
  headerLabelOpacity: Animated.Value;
  headerValueOpacity: Animated.AnimatedInterpolation<number>;

  // Scroll handlers
  handleScrollBeginDrag: () => void;
  handleScrollEndDrag: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
  handleMomentumScrollEnd: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
  handleScroll: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;

  // Button handlers
  handleIncrement: (amount: number, useAnimation?: boolean) => void;
  handleDecrement: (amount: number, useAnimation?: boolean) => void;

  // Layout
  gaugeWidth: number;
  initialScrollOffset: number;
};

// ============================================================================
// CONSTANTS
// ============================================================================

const SCREEN_WIDTH = Dimensions.get('window').width;

// Calculate gauge width based on layout mode
const calculateGaugeWidth = (hideButtons: boolean, compact: boolean): number => {
  if (compact && hideButtons) {
    // Compact mode: 50% width cards with no buttons
    // Screen padding: 8dp each side = 16dp
    // Gap between cards: 8dp
    // Each card: (SCREEN_WIDTH - 24) / 2
    // Card padding: 8dp each side = 16dp
    // Gauge takes full width of card content area
    const cardWidth = (SCREEN_WIDTH - 24) / 2;
    return cardWidth - 16;
  } else if (hideButtons) {
    // Full width card with no buttons
    // Screen padding: 16dp, Card padding: 16dp
    return SCREEN_WIDTH - 16 - 16;
  } else {
    // Original layout with buttons
    // Container padding (16) - left button (48) - right button (48) - margins (32)
    return SCREEN_WIDTH - 16 - 48 - 48 - 16 - 16;
  }
};

// ============================================================================
// HOOK
// ============================================================================

export const useDialControl = (config: UseDialControlConfig): UseDialControlReturn => {
  const {
    initialValue,
    minValue,
    maxValue,
    tickSpacing,
    flingSnapIncrement,
    flingVelocityThreshold,
    onChange,
    hideButtons = false,
    compact = false,
  } = config;

  // Calculate gauge width based on layout mode
  const gaugeWidth = calculateGaugeWidth(hideButtons, compact);

  // === ANIMATION VALUES ===
  const dragOpacity = useRef(new Animated.Value(1)).current;
  const headerLabelOpacity = dragOpacity;
  const headerValueOpacity = dragOpacity.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0],
  });

  // === STATE ===
  const [displayValue, setDisplayValue] = useState(initialValue);
  const currentValueRef = useRef(initialValue);
  const scrollViewRef = useRef<ScrollView>(null);
  const isUserDragging = useRef(false);
  const isButtonUpdate = useRef(false);
  const lastScrollValue = useRef(initialValue);
  const wasFling = useRef(false);

  // === SYNC WITH EXTERNAL VALUE CHANGES ===
  useEffect(() => {
    if (!isButtonUpdate.current && !isUserDragging.current) {
      currentValueRef.current = initialValue;
      setDisplayValue(initialValue);
      if (initialValue !== lastScrollValue.current) {
        const scrollPosition = initialValue * tickSpacing;
        scrollViewRef.current?.scrollTo({x: scrollPosition, animated: true});
        lastScrollValue.current = initialValue;
      }
    }
  }, [initialValue, tickSpacing]);

  // === SCROLL HANDLERS ===
  const handleScrollBeginDrag = useCallback(() => {
    isUserDragging.current = true;
    isButtonUpdate.current = false;
    wasFling.current = false;

    Animated.timing(dragOpacity, {
      toValue: 0,
      duration: 150,
      useNativeDriver: true,
    }).start();
  }, [dragOpacity]);

  const handleScrollEndDrag = useCallback((event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const scrollX = event.nativeEvent.contentOffset.x;
    const velocity = Math.abs(event.nativeEvent.velocity?.x || 0);

    if (velocity > flingVelocityThreshold) {
      wasFling.current = true;
      const currentValue = scrollX / tickSpacing;
      const velocityX = event.nativeEvent.velocity?.x || 0;
      const projectedValue = currentValue - (velocityX * 15);
      const snappedValue = Math.round(projectedValue / flingSnapIncrement) * flingSnapIncrement;
      const clampedValue = Math.max(minValue, Math.min(maxValue, snappedValue));

      const scrollPosition = clampedValue * tickSpacing;
      scrollViewRef.current?.scrollTo({x: scrollPosition, animated: true});
      currentValueRef.current = clampedValue;
      setDisplayValue(clampedValue);
      lastScrollValue.current = clampedValue;
      onChange(clampedValue);
    } else {
      const newValue = Math.round(scrollX / tickSpacing);
      const clampedValue = Math.max(minValue, Math.min(maxValue, newValue));
      currentValueRef.current = clampedValue;
      setDisplayValue(clampedValue);
      lastScrollValue.current = clampedValue;
      onChange(clampedValue);
    }
  }, [flingVelocityThreshold, flingSnapIncrement, tickSpacing, minValue, maxValue, onChange]);

  const handleMomentumScrollEnd = useCallback((event: NativeSyntheticEvent<NativeScrollEvent>) => {
    isUserDragging.current = false;

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
    const newValue = Math.round(scrollX / tickSpacing);
    const clampedValue = Math.max(minValue, Math.min(maxValue, newValue));
    currentValueRef.current = clampedValue;
    setDisplayValue(clampedValue);
    lastScrollValue.current = clampedValue;
    onChange(clampedValue);
  }, [dragOpacity, tickSpacing, minValue, maxValue, onChange]);

  const handleScroll = useCallback((event: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (!isUserDragging.current) return;
    const scrollX = event.nativeEvent.contentOffset.x;
    const currentValue = Math.round(scrollX / tickSpacing);
    const clampedValue = Math.max(minValue, Math.min(maxValue, currentValue));
    setDisplayValue(clampedValue);
  }, [tickSpacing, minValue, maxValue]);

  // === BUTTON HANDLERS ===
  const handleIncrement = useCallback((amount: number, useAnimation: boolean = true) => {
    const current = currentValueRef.current;
    const newValue = Math.min(current + amount, maxValue);
    currentValueRef.current = newValue;
    setDisplayValue(newValue);
    isButtonUpdate.current = true;
    lastScrollValue.current = newValue;
    const scrollPosition = newValue * tickSpacing;
    scrollViewRef.current?.scrollTo({x: scrollPosition, animated: useAnimation});
    onChange(newValue);
  }, [maxValue, tickSpacing, onChange]);

  const handleDecrement = useCallback((amount: number, useAnimation: boolean = true) => {
    const current = currentValueRef.current;
    const newValue = Math.max(current - amount, minValue);
    currentValueRef.current = newValue;
    setDisplayValue(newValue);
    isButtonUpdate.current = true;
    lastScrollValue.current = newValue;
    const scrollPosition = newValue * tickSpacing;
    scrollViewRef.current?.scrollTo({x: scrollPosition, animated: useAnimation});
    onChange(newValue);
  }, [minValue, tickSpacing, onChange]);

  return {
    displayValue,
    scrollViewRef,
    dragOpacity,
    headerLabelOpacity,
    headerValueOpacity,
    handleScrollBeginDrag,
    handleScrollEndDrag,
    handleMomentumScrollEnd,
    handleScroll,
    handleIncrement,
    handleDecrement,
    gaugeWidth,
    initialScrollOffset: initialValue * tickSpacing,
  };
};
