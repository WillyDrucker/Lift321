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
  flingSnapIncrement?: number;  // No longer used - native snapping handles this
  flingVelocityThreshold?: number;  // No longer used - native snapping handles this
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

  // Layout handlers
  handleGaugeLayout: (event: any) => void;

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
    return Math.round(cardWidth - 16);
  } else if (hideButtons) {
    // Full width card with no buttons
    // Screen padding: 16dp, Card padding: 16dp
    return Math.round(SCREEN_WIDTH - 16 - 16);
  } else {
    // Layout with buttons (1 on each side)
    // Container padding (8dp each side = 16) - left button (48) - right button (48) - gauge margins (8dp each side = 16)
    return Math.round(SCREEN_WIDTH - 16 - 48 - 48 - 16);
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
  const [actualGaugeWidth, setActualGaugeWidth] = useState(gaugeWidth);
  const currentValueRef = useRef(initialValue);
  const scrollViewRef = useRef<any>(null);  // Works with both ScrollView and FlatList
  const isUserDragging = useRef(false);
  const isButtonUpdate = useRef(false);
  const lastScrollValue = useRef(initialValue);
  const buttonTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // === SYNC WITH EXTERNAL VALUE CHANGES ===
  useEffect(() => {
    if (!isButtonUpdate.current && !isUserDragging.current) {
      currentValueRef.current = initialValue;
      setDisplayValue(initialValue);
      if (initialValue !== lastScrollValue.current) {
        const scrollPosition = initialValue * tickSpacing;
        // Use instant scroll (animated: false) for external value changes
        // This prevents lag when switching modes or sets
        scrollViewRef.current?.scrollToOffset({offset: scrollPosition, animated: false});
        lastScrollValue.current = initialValue;
      }
    }
  }, [initialValue, tickSpacing]);

  // === CLEANUP ===
  useEffect(() => {
    return () => {
      if (buttonTimeoutRef.current) {
        clearTimeout(buttonTimeoutRef.current);
      }
    };
  }, []);

  // === SCROLL HANDLERS ===
  const handleScrollBeginDrag = useCallback(() => {
    isUserDragging.current = true;
    isButtonUpdate.current = false;

    Animated.timing(dragOpacity, {
      toValue: 0,
      duration: 150,
      useNativeDriver: true,
    }).start();
  }, [dragOpacity]);

  const handleScrollEndDrag = useCallback((event: NativeSyntheticEvent<NativeScrollEvent>) => {
    // Don't handle here - let momentum scroll handle it naturally
    // This allows native snapping to work properly
  }, []);

  const handleMomentumScrollEnd = useCallback((event: NativeSyntheticEvent<NativeScrollEvent>) => {
    isUserDragging.current = false;

    // Skip handling if this is from a button press
    if (isButtonUpdate.current) {
      return;
    }

    const scrollX = event.nativeEvent.contentOffset.x;
    const newValue = Math.round(scrollX / tickSpacing);
    const clampedValue = Math.max(minValue, Math.min(maxValue, newValue));

    // Ensure perfect alignment
    const targetScrollPosition = clampedValue * tickSpacing;
    const currentScrollPosition = scrollX;
    const diff = Math.abs(targetScrollPosition - currentScrollPosition);

    // If misaligned by more than 0.5px, snap to correct position
    if (diff > 0.5) {
      scrollViewRef.current?.scrollToOffset({
        offset: targetScrollPosition,
        animated: false,
      });
    }

    currentValueRef.current = clampedValue;
    setDisplayValue(clampedValue);
    lastScrollValue.current = clampedValue;
    onChange(clampedValue);

    Animated.timing(dragOpacity, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [dragOpacity, tickSpacing, minValue, maxValue, onChange]);

  const handleScroll = useCallback((event: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (!isUserDragging.current) return;
    const scrollX = event.nativeEvent.contentOffset.x;
    const currentValue = Math.round(scrollX / tickSpacing);
    const clampedValue = Math.max(minValue, Math.min(maxValue, currentValue));
    setDisplayValue(clampedValue);
  }, [tickSpacing, minValue, maxValue]);

  // === LAYOUT HANDLER ===
  const handleGaugeLayout = useCallback((event: any) => {
    const { width } = event.nativeEvent.layout;
    setActualGaugeWidth(Math.round(width));
  }, []);

  // === BUTTON HANDLERS ===
  const handleIncrement = useCallback((amount: number, useAnimation: boolean = true) => {
    // Clear any existing timeout
    if (buttonTimeoutRef.current) {
      clearTimeout(buttonTimeoutRef.current);
    }

    const current = currentValueRef.current;
    const newValue = Math.min(current + amount, maxValue);
    currentValueRef.current = newValue;
    setDisplayValue(newValue);
    isButtonUpdate.current = true;
    lastScrollValue.current = newValue;
    const scrollPosition = Math.round(newValue * tickSpacing);
    scrollViewRef.current?.scrollToOffset({offset: scrollPosition, animated: useAnimation});
    onChange(newValue);

    // Reset button update flag after animation completes
    buttonTimeoutRef.current = setTimeout(() => {
      isButtonUpdate.current = false;
      buttonTimeoutRef.current = null;
    }, 350);
  }, [maxValue, tickSpacing, onChange]);

  const handleDecrement = useCallback((amount: number, useAnimation: boolean = true) => {
    // Clear any existing timeout
    if (buttonTimeoutRef.current) {
      clearTimeout(buttonTimeoutRef.current);
    }

    const current = currentValueRef.current;
    const newValue = Math.max(current - amount, minValue);
    currentValueRef.current = newValue;
    setDisplayValue(newValue);
    isButtonUpdate.current = true;
    lastScrollValue.current = newValue;
    const scrollPosition = Math.round(newValue * tickSpacing);
    scrollViewRef.current?.scrollToOffset({offset: scrollPosition, animated: useAnimation});
    onChange(newValue);

    // Reset button update flag after animation completes
    buttonTimeoutRef.current = setTimeout(() => {
      isButtonUpdate.current = false;
      buttonTimeoutRef.current = null;
    }, 350);
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
    handleGaugeLayout,
    gaugeWidth: actualGaugeWidth,
    initialScrollOffset: Math.round(initialValue * tickSpacing),
  };
};
