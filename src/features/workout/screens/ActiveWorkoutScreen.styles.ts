// ==========================================================================
// ACTIVE WORKOUT SCREEN - STYLES
//
// StyleSheet definitions for ActiveWorkoutScreen.
// Extracted for maintainability and file size management.
//
// Dependencies: theme tokens
// Used by: ActiveWorkoutScreen.tsx
// ==========================================================================

import {StyleSheet} from 'react-native';
import {theme} from '@/theme';

export const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: theme.spacing.s,
    paddingTop: 8, // 8dp from top green line
    paddingBottom: 8, // 8dp from bottom of end workout button
  },
  controlCardsRow: {
    flexDirection: 'row',
    gap: theme.spacing.s,
    marginBottom: theme.spacing.s,
  },
  dialControlsRow: {
    flexDirection: 'row',
    gap: theme.spacing.s, // 8dp gap between cards
    marginBottom: theme.spacing.s, // 8dp below the row
  },
  todaysWorkoutCard: {
    position: 'relative',
    backgroundColor: theme.colors.backgroundPrimary,
    borderRadius: theme.spacing.s,
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  viewModeToggle: {
    position: 'absolute',
    top: 8,
    left: 8,
    width: 32,
    height: 32,
    zIndex: 1,
  },
  todaysWorkoutHeader: {
    position: 'relative',
  },
  todaysWorkoutText: {
    fontSize: theme.typography.fontSize.xl,
    lineHeight: theme.typography.fontSize.xl,
    fontFamily: theme.typography.fontFamily.primary,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.backgroundTertiary,
    textTransform: 'uppercase',
    textAlign: 'center',
    includeFontPadding: false,
    marginTop: 38, // 0dp below SETS value bottom
    marginBottom: 8, // 8dp above first exercise entry
  },
  setsDisplay: {
    position: 'absolute',
    top: 8, // 8dp from card top
    right: -8, // 8dp from right edge of card (offset into 16dp padding)
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: theme.spacing.xs,
  },
  setsLabel: {
    fontSize: theme.typography.fontSize.m,
    fontFamily: theme.typography.fontFamily.primary,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.backgroundTertiary,
    includeFontPadding: false,
  },
  setsValue: {
    fontSize: 32,
    lineHeight: 30,
    fontFamily: theme.typography.fontFamily.primary,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.actionSuccess,
    includeFontPadding: false,
    minWidth: 38, // Reserve space for 2 digits
    textAlign: 'left',
  },
  exerciseTreeContainer: {
    position: 'relative',
  },
  verticalLine: {
    position: 'absolute',
    left: -8, // 8dp from left edge of card (16dp padding - 8dp = 8dp from card edge)
    top: 24, // Start at center of first exercise row (48dp / 2)
    width: 1,
    backgroundColor: theme.colors.pureWhite,
  },
  exerciseGroup: {
    marginBottom: 0,
  },
  exerciseGroupSpacer: {
    height: 32,
  },
  setWrapper: {
    position: 'relative',
  },
  activeSetWrapper: {
    // Could add visual emphasis here if needed
  },
  finishButtonContainer: {
    marginTop: theme.spacing.s, // 8dp from above card
    marginBottom: 0,
  },
  finishButtonText: {
    fontWeight: 'bold',
  },
});
