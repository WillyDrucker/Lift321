// ==========================================================================
// DIAL CONTROL CARD COMPONENT
//
// Generic dial control for adjusting numeric values.
// Features scrollable dial gauge with tick marks and +/- buttons with
// auto-repeat. Supports optional topElement for custom headers.
//
// Dependencies: theme tokens, useDialControl, useAutoRepeat
// Used by: ToggleableDialControlCard
// ==========================================================================

import React, {useMemo, memo, useCallback, useEffect} from 'react';
import {View, Text, Pressable, FlatList, Animated} from 'react-native';
import ReAnimated, {
  useSharedValue,
  useAnimatedStyle,
  withSequence,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';
import {theme} from '@/theme';
import {useDialControl} from '@/hooks/useDialControl';
import {useAutoRepeat} from '@/hooks/useAutoRepeat';
import {dialStyles, DIAL_DIMENSIONS, GAUGE_HEIGHT} from './DialControlCard.styles';
import type {DialControlCardProps} from './DialControlCard.types';

// ============================================================================
// CONSTANTS
// ============================================================================

const ERROR_FLASH_DURATION = 200; // 200ms per flash transition

// ============================================================================
// TICK ITEM COMPONENT
// ============================================================================

type TickItemProps = {
  index: number;
  tickSpacing: number;
  valuePerTick: number;
};

const TickItem = memo<TickItemProps>(({ index, tickSpacing, valuePerTick }) => {
  const tickValue = index * valuePerTick;
  const isMajor = tickValue % 10 === 0;
  const isMedium = tickValue % 5 === 0 && !isMajor;

  // Calculate label offset to center it on the tick mark
  // Label width is 30px, so we need to shift left by (tickSpacing/2 - 15)
  const labelLeftOffset = (tickSpacing / 2) - 15;

  return (
    <View style={[dialStyles.tickContainer, { width: tickSpacing }]}>
      <View
        style={[
          dialStyles.tick,
          isMajor ? dialStyles.majorTick : isMedium ? dialStyles.mediumTick : dialStyles.minorTick,
        ]}
      />
      {(isMajor || isMedium) && (
        <Text style={[dialStyles.tickLabel, { left: labelLeftOffset }]}>{tickValue}</Text>
      )}
    </View>
  );
});

TickItem.displayName = 'TickItem';

// ============================================================================
// COMPONENT
// ============================================================================

const DialControlCardComponent: React.FC<DialControlCardProps> = ({
  value,
  onChange,
  onDisplayValueChange,
  config,
  topElement,
  formatValue,
  getValueColor,
  hideButtons = false,
  compact = false,
  hasError = false,
  onErrorAnimationComplete,
}) => {
  // === ERROR ANIMATION (SHAKE) ===
  const shakeOffset = useSharedValue(0);

  useEffect(() => {
    if (hasError && onErrorAnimationComplete) {
      // Quick shake: left-right-left-right-center
      shakeOffset.value = withSequence(
        withTiming(-8, {duration: 50}),
        withTiming(8, {duration: 50}),
        withTiming(-6, {duration: 50}),
        withTiming(6, {duration: 50}),
        withTiming(0, {duration: 50}, () => {
          runOnJS(onErrorAnimationComplete)();
        }),
      );
    }
  }, [hasError, onErrorAnimationComplete]);

  const shakeAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{translateX: shakeOffset.value}],
  }));

  // === HOOKS ===
  const {
    displayValue,
    scrollViewRef,
    dragOpacity,
    handleScrollBeginDrag,
    handleScrollEndDrag,
    handleMomentumScrollEnd,
    handleScroll,
    handleIncrement,
    handleDecrement,
    handleGaugeLayout,
    gaugeWidth,
    initialScrollOffset,
  } = useDialControl({
    initialValue: value,
    minValue: config.minValue,
    maxValue: config.maxValue,
    tickSpacing: config.tickSpacing,
    valuePerTick: config.valuePerTick,
    flingSnapIncrement: config.flingSnapIncrement,
    flingVelocityThreshold: config.flingVelocityThreshold,
    onChange,
    hideButtons,
    compact,
  });

  const {startAutoRepeat, clearAllTimers} = useAutoRepeat();

  // === REAL-TIME VALUE CALLBACK ===
  useEffect(() => {
    if (onDisplayValueChange) {
      onDisplayValueChange(displayValue);
    }
  }, [displayValue, onDisplayValueChange]);

  // === COMPUTED VALUES ===
  const displayText = formatValue ? formatValue(displayValue) : displayValue.toString();
  const valueColor = getValueColor ? getValueColor(displayValue) : theme.colors.pureWhite;

  // === TICK DATA ===
  const tickData = useMemo(() => {
    const maxTicks = config.maxValue / config.valuePerTick;
    return Array.from({ length: maxTicks + 1 }, (_, i) => i);
  }, [config.maxValue, config.valuePerTick]);

  // === FLATLIST CALLBACKS ===
  const renderTick = useCallback(
    ({ item: index }: { item: number }) => (
      <TickItem
        index={index}
        tickSpacing={config.tickSpacing}
        valuePerTick={config.valuePerTick}
      />
    ),
    [config.tickSpacing, config.valuePerTick]
  );

  const keyExtractor = useCallback((item: number) => `tick-${item}`, []);

  const getItemLayout = useCallback(
    (_: any, index: number) => ({
      length: config.tickSpacing,
      offset: config.tickSpacing * index,
      index,
    }),
    [config.tickSpacing]
  );

  // === BUTTON HANDLERS ===
  const createDecrementHandler = useCallback((amount: number) => () => {
    startAutoRepeat(
      () => handleDecrement(amount, true),
      () => handleDecrement(amount, false)
    );
  }, [startAutoRepeat, handleDecrement]);

  const createIncrementHandler = useCallback((amount: number) => () => {
    startAutoRepeat(
      () => handleIncrement(amount, true),
      () => handleIncrement(amount, false)
    );
  }, [startAutoRepeat, handleIncrement]);

  // Determine button increments to display
  const buttonIncrements = config.buttonIncrements || [config.buttonIncrement];

  // === RENDER ===
  return (
    <View style={[dialStyles.container, compact && {flex: 1, marginBottom: 0}]}>
      {/* Optional Top Element (e.g., SegmentedControl) */}
      {topElement && (
        <View style={{marginTop: -4, marginBottom: 16}}>
          {topElement}
        </View>
      )}

      {/* Controls with integrated gauge - wrapped for shake animation */}
      <ReAnimated.View style={[dialStyles.controlsContainer, shakeAnimatedStyle]}>
        {/* Decrement Buttons - hidden if hideButtons */}
        {!hideButtons && (
          <View style={dialStyles.buttonGroup}>
            {buttonIncrements.slice().reverse().map((increment) => (
              <Pressable
                key={`dec-${increment}`}
                style={dialStyles.adjustButton}
                onPressIn={createDecrementHandler(increment)}
                onPressOut={clearAllTimers}
              >
                <Text style={dialStyles.adjustButtonText}>-{increment}</Text>
              </Pressable>
            ))}
          </View>
        )}

        {/* Gauge Display */}
        <View
          style={[dialStyles.gaugeContainer, hideButtons && {marginHorizontal: 0}]}
          onLayout={handleGaugeLayout}
        >
          {/* Scrollable Tick Track */}
          <FlatList
            ref={scrollViewRef as any}
            horizontal
            data={tickData}
            renderItem={renderTick}
            keyExtractor={keyExtractor}
            getItemLayout={getItemLayout}
            initialNumToRender={20}
            maxToRenderPerBatch={10}
            windowSize={5}
            removeClippedSubviews={true}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              paddingHorizontal: Math.round((gaugeWidth / 2) - (config.tickSpacing / 2)),
            }}
            snapToInterval={config.tickSpacing}
            snapToAlignment="start"
            decelerationRate={0.99}
            disableIntervalMomentum={false}
            directionalLockEnabled={true}
            onScroll={handleScroll}
            scrollEventThrottle={16}
            onScrollBeginDrag={handleScrollBeginDrag}
            onScrollEndDrag={handleScrollEndDrag}
            onMomentumScrollEnd={handleMomentumScrollEnd}
            contentOffset={{x: initialScrollOffset, y: 0}}
          />

          {/* Label background near major ticks */}
          {[0, 1, 9].includes(displayValue % 10) && (
            <Animated.View
              style={[dialStyles.numberBackgroundWrapper, {opacity: dragOpacity}]}
              pointerEvents="none"
            >
              <View style={dialStyles.numberBackground} />
            </Animated.View>
          )}

          {/* Center Indicator */}
          <View style={dialStyles.centerIndicator} pointerEvents="none" />

          {/* Value Overlay */}
          <Animated.View
            style={[dialStyles.valueOverlay, {opacity: dragOpacity}]}
            pointerEvents="none"
          >
            <Text style={[dialStyles.valueDisplay, {color: valueColor}]}>
              {displayText}
            </Text>
          </Animated.View>
        </View>

        {/* Increment Buttons - hidden if hideButtons */}
        {!hideButtons && (
          <View style={dialStyles.buttonGroup}>
            {buttonIncrements.map((increment) => (
              <Pressable
                key={`inc-${increment}`}
                style={dialStyles.adjustButton}
                onPressIn={createIncrementHandler(increment)}
                onPressOut={clearAllTimers}
              >
                <Text style={dialStyles.adjustButtonText}>+{increment}</Text>
              </Pressable>
            ))}
          </View>
        )}
      </ReAnimated.View>
    </View>
  );
};

// Memoize to prevent re-renders when props haven't changed
// This is critical for performance since the component renders 100+ tick marks
export const DialControlCard = memo(DialControlCardComponent);

// ============================================================================
// EXPORTS
// ============================================================================

export type {DialControlCardProps, DialConfig} from './DialControlCard.types';
