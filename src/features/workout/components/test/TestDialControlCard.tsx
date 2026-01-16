// ==========================================================================
// TEST DIAL CONTROL CARD COMPONENT
//
// Modified dial control for testing layout changes.
// Changes: adjusted spacing between buttons and dial (8dp instead of 16dp).
//
// NOTE: This is a TEST file - will be deleted after testing.
// ==========================================================================

import React, {useMemo, memo, useCallback, useEffect} from 'react';
import {View, Text, Pressable, FlatList} from 'react-native';
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
import {testDialStyles, DIAL_DIMENSIONS, GAUGE_HEIGHT} from './TestDialControlCard.styles';
import type {DialConfig} from '../DialControlCard.types';

// ============================================================================
// CONSTANTS
// ============================================================================

const ERROR_FLASH_DURATION = 200;

// ============================================================================
// TYPES
// ============================================================================

type TestDialControlCardProps = {
  value: number;
  onChange: (value: number) => void;
  onDisplayValueChange?: (value: number) => void;
  config: DialConfig;
  topElement?: React.ReactNode;
  formatValue?: (value: number) => string;
  getValueColor?: (value: number) => string;
  hideButtons?: boolean;
  compact?: boolean;
  hasError?: boolean;
  onErrorAnimationComplete?: () => void;
};

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
  const labelLeftOffset = (tickSpacing / 2) - 15;

  return (
    <View style={[testDialStyles.tickContainer, { width: tickSpacing }]}>
      <View
        style={[
          testDialStyles.tick,
          isMajor ? testDialStyles.majorTick : isMedium ? testDialStyles.mediumTick : testDialStyles.minorTick,
        ]}
      />
      {(isMajor || isMedium) && (
        <Text style={[testDialStyles.tickLabel, { left: labelLeftOffset }]}>{tickValue}</Text>
      )}
    </View>
  );
});

TickItem.displayName = 'TickItem';

// ============================================================================
// COMPONENT
// ============================================================================

const TestDialControlCardComponent: React.FC<TestDialControlCardProps> = ({
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
  // === ERROR ANIMATION ===
  const errorFlash = useSharedValue(0);

  useEffect(() => {
    if (hasError && onErrorAnimationComplete) {
      errorFlash.value = withSequence(
        withTiming(1, {duration: 0}),
        withTiming(0, {duration: ERROR_FLASH_DURATION}),
        withTiming(1, {duration: ERROR_FLASH_DURATION}),
        withTiming(0, {duration: ERROR_FLASH_DURATION}),
        withTiming(1, {duration: ERROR_FLASH_DURATION}),
        withTiming(0, {duration: ERROR_FLASH_DURATION}, () => {
          runOnJS(onErrorAnimationComplete)();
        }),
      );
    }
  }, [hasError, onErrorAnimationComplete]);

  const errorOverlayStyle = useAnimatedStyle(() => ({
    opacity: errorFlash.value * 0.6,
  }));

  // === HOOKS ===
  const {
    displayValue,
    scrollViewRef,
    handleScrollBeginDrag,
    handleScrollEndDrag,
    handleMomentumScrollEnd,
    handleScroll,
    handleIncrement,
    handleDecrement,
    handleGaugeLayout,
    gaugeWidth,
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

  const buttonIncrements = config.buttonIncrements || [config.buttonIncrement];

  // === RENDER ===
  return (
    <View style={[testDialStyles.container, compact && {flex: 1, marginBottom: 0}]}>
      {/* Optional Top Element with 8dp gap to dial */}
      {topElement && (
        <View style={testDialStyles.topElementWrapper}>
          {topElement}
        </View>
      )}

      {/* Controls with integrated gauge */}
      <View style={testDialStyles.controlsContainer}>
        {/* Decrement Buttons */}
        {!hideButtons && (
          <View style={testDialStyles.buttonGroup}>
            {buttonIncrements.slice().reverse().map((increment) => (
              <Pressable
                key={`dec-${increment}`}
                style={testDialStyles.adjustButton}
                onPressIn={createDecrementHandler(increment)}
                onPressOut={clearAllTimers}
              >
                <Text style={testDialStyles.adjustButtonText}>-{increment}</Text>
              </Pressable>
            ))}
          </View>
        )}

        {/* Gauge Display */}
        <View
          style={[testDialStyles.gaugeContainer, hideButtons && {marginHorizontal: 0}]}
          onLayout={handleGaugeLayout}
        >
          {/* Error Flash Overlay */}
          <ReAnimated.View
            style={[testDialStyles.errorOverlay, errorOverlayStyle]}
            pointerEvents="none"
          />

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
            onScrollBeginDrag={handleScrollBeginDrag}
            onScrollEndDrag={handleScrollEndDrag}
            onMomentumScrollEnd={handleMomentumScrollEnd}
            onScroll={handleScroll}
            scrollEventThrottle={16}
            decelerationRate="fast"
            snapToInterval={config.tickSpacing}
          />

          {/* Center Indicator */}
          <View style={testDialStyles.centerIndicator} pointerEvents="none" />

          {/* Value Overlay */}
          <View style={testDialStyles.valueOverlay} pointerEvents="none">
            <View style={testDialStyles.numberBackgroundWrapper}>
              <View style={testDialStyles.numberBackground} />
            </View>
            <Text style={[testDialStyles.valueDisplay, {color: valueColor}]}>
              {displayText}
            </Text>
          </View>
        </View>

        {/* Increment Buttons */}
        {!hideButtons && (
          <View style={testDialStyles.buttonGroup}>
            {buttonIncrements.map((increment) => (
              <Pressable
                key={`inc-${increment}`}
                style={testDialStyles.adjustButton}
                onPressIn={createIncrementHandler(increment)}
                onPressOut={clearAllTimers}
              >
                <Text style={testDialStyles.adjustButtonText}>+{increment}</Text>
              </Pressable>
            ))}
          </View>
        )}
      </View>
    </View>
  );
};

export const TestDialControlCard = memo(TestDialControlCardComponent);
TestDialControlCard.displayName = 'TestDialControlCard';
