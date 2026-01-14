// ==========================================================================
// DIAL CONTROL CARD STYLES
//
// Shared styles for the generic dial control component.
// Provides consistent gauge appearance across reps and weight controls.
//
// Dependencies: theme tokens
// Used by: DialControlCard
// ==========================================================================

import {StyleSheet} from 'react-native';
import {theme} from '@/theme';

// ============================================================================
// CONSTANTS
// ============================================================================

export const GAUGE_HEIGHT = 48;

export const DIAL_DIMENSIONS = {
  tickSpacing: 10,
  tickWidth: 2,
  minorTickHeight: 10,
  mediumTickHeight: 20,
  majorTickHeight: 32,
  indicatorWidth: 3,
  indicatorHeight: GAUGE_HEIGHT - 8,
} as const;

// ============================================================================
// STYLES
// ============================================================================

export const dialStyles = StyleSheet.create({
  // === CONTAINER ===
  container: {
    backgroundColor: theme.colors.backgroundPrimary,
    borderRadius: theme.spacing.s,
    paddingTop: 12,
    paddingHorizontal: theme.spacing.s,
    paddingBottom: theme.spacing.s,
    marginBottom: theme.spacing.s,
  },

  // === CONTROLS ===
  controlsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  buttonGroup: {
    flexDirection: 'row',
    gap: 4,
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

  // === GAUGE ===
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
  errorOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: theme.colors.actionDanger,
    borderRadius: 8,
    zIndex: 10,
  },
  dialTrack: {
    flexDirection: 'row',
    alignItems: 'center',
    height: GAUGE_HEIGHT,
  },

  // === TICKS ===
  tickContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: DIAL_DIMENSIONS.tickSpacing,
    height: GAUGE_HEIGHT,
  },
  tick: {
    width: DIAL_DIMENSIONS.tickWidth,
  },
  minorTick: {
    height: DIAL_DIMENSIONS.minorTickHeight,
    backgroundColor: theme.colors.textSecondary,
    opacity: 0.4,
  },
  mediumTick: {
    height: DIAL_DIMENSIONS.mediumTickHeight,
    backgroundColor: theme.colors.textSecondary,
    opacity: 0.6,
  },
  majorTick: {
    height: DIAL_DIMENSIONS.majorTickHeight - 4,
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

  // === CENTER INDICATOR ===
  centerIndicator: {
    position: 'absolute',
    top: 4,
    bottom: 4,
    left: '50%',
    marginLeft: -DIAL_DIMENSIONS.indicatorWidth / 2,
    width: DIAL_DIMENSIONS.indicatorWidth,
    backgroundColor: theme.colors.customWorkoutBlue,
    borderRadius: 1,
  },

  // === VALUE OVERLAY ===
  valueOverlay: {
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
    width: 40,
    height: 8,
    marginBottom: 2,
    backgroundColor: theme.colors.pureBlack,
  },
  valueDisplay: {
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
