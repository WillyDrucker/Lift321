// ==========================================================================
// DIAL CONTROL CARD COMPONENT
//
// Generic dial control for adjusting numeric values.
// Features scrollable dial gauge with tick marks, +/- buttons with
// auto-repeat, and animated header transitions.
//
// Dependencies: theme tokens, useDialControl, useAutoRepeat
// Used by: RepsControlCard, WeightControlCard
// ==========================================================================

import React, {useMemo, memo, useCallback} from 'react';
import {View, Text, Pressable, FlatList, Animated} from 'react-native';
import {theme} from '@/theme';
import {useDialControl} from '@/hooks/useDialControl';
import {useAutoRepeat} from '@/hooks/useAutoRepeat';
import {dialStyles, DIAL_DIMENSIONS, GAUGE_HEIGHT} from './DialControlCard.styles';
import type {DialControlCardProps} from './DialControlCard.types';

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

  return (
    <View style={[dialStyles.tickContainer, { width: tickSpacing }]}>
      <View
        style={[
          dialStyles.tick,
          isMajor ? dialStyles.majorTick : isMedium ? dialStyles.mediumTick : dialStyles.minorTick,
        ]}
      />
      {isMajor && (
        <Text style={dialStyles.tickLabel}>{tickValue}</Text>
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
  config,
  headerLabel,
  headerSuffix,
  formatValue,
  getValueColor,
  decrementLabel,
  incrementLabel,
  hideButtons = false,
  compact = false,
}) => {
  // === HOOKS ===
  const {
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
      {/* Header with label/value swap animation */}
      <View style={dialStyles.header}>
        <View style={dialStyles.headerRow}>
          <View style={dialStyles.headerSwapContainer}>
            <Animated.Text style={[dialStyles.title, {opacity: headerLabelOpacity}]}>
              {headerLabel}
            </Animated.Text>
            <Animated.Text
              style={[
                dialStyles.headerValue,
                {color: valueColor, opacity: headerValueOpacity},
              ]}
            >
              {displayText}
            </Animated.Text>
          </View>
          {headerSuffix}
        </View>
      </View>

      {/* Controls with integrated gauge */}
      <View style={dialStyles.controlsContainer}>
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
      </View>
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
