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

import React, {useMemo} from 'react';
import {View, Text, Pressable, ScrollView, Animated} from 'react-native';
import {theme} from '@/theme';
import {useDialControl} from '@/hooks/useDialControl';
import {useAutoRepeat} from '@/hooks/useAutoRepeat';
import {dialStyles, DIAL_DIMENSIONS, GAUGE_HEIGHT} from './DialControlCard.styles';
import type {DialControlCardProps} from './DialControlCard.types';

// ============================================================================
// COMPONENT
// ============================================================================

export const DialControlCard: React.FC<DialControlCardProps> = ({
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

  // === RENDER TICKS ===
  const ticks = useMemo(() => {
    const tickElements: JSX.Element[] = [];
    const maxTicks = config.maxValue / config.valuePerTick;

    for (let tickIndex = 0; tickIndex <= maxTicks; tickIndex++) {
      const tickValue = tickIndex * config.valuePerTick;
      const isMajor = tickValue % 10 === 0;
      const isMedium = tickValue % 5 === 0 && !isMajor;

      tickElements.push(
        <View
          key={tickIndex}
          style={dialStyles.tickContainer}
          renderToHardwareTextureAndroid={true}
        >
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
    }
    return tickElements;
  }, [config.maxValue, config.valuePerTick]);

  // === BUTTON HANDLERS ===
  const handleDecrementPress = () => {
    startAutoRepeat(
      () => handleDecrement(config.buttonIncrement, true),
      () => handleDecrement(config.buttonIncrement, false)
    );
  };

  const handleIncrementPress = () => {
    startAutoRepeat(
      () => handleIncrement(config.buttonIncrement, true),
      () => handleIncrement(config.buttonIncrement, false)
    );
  };

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
        {/* Decrement Button - hidden if hideButtons */}
        {!hideButtons && (
          <Pressable
            style={dialStyles.adjustButton}
            onPressIn={handleDecrementPress}
            onPressOut={clearAllTimers}
          >
            <Text style={dialStyles.adjustButtonText}>{decrementLabel}</Text>
          </Pressable>
        )}

        {/* Gauge Display */}
        <View style={[dialStyles.gaugeContainer, hideButtons && {marginHorizontal: 0}]}>
          {/* Scrollable Tick Track */}
          <ScrollView
            ref={scrollViewRef}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={[
              dialStyles.dialTrack,
              {paddingHorizontal: gaugeWidth / 2 - DIAL_DIMENSIONS.tickSpacing / 2},
            ]}
            snapToInterval={config.tickSpacing}
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
            contentOffset={{x: initialScrollOffset, y: 0}}
          >
            {ticks}
          </ScrollView>

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

        {/* Increment Button - hidden if hideButtons */}
        {!hideButtons && (
          <Pressable
            style={dialStyles.adjustButton}
            onPressIn={handleIncrementPress}
            onPressOut={clearAllTimers}
          >
            <Text style={dialStyles.adjustButtonText}>{incrementLabel}</Text>
          </Pressable>
        )}
      </View>
    </View>
  );
};

// ============================================================================
// EXPORTS
// ============================================================================

export type {DialControlCardProps, DialConfig} from './DialControlCard.types';
