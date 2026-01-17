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
    backgroundColor: theme.colors.backgroundPrimary,
    borderRadius: theme.spacing.s,
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  todaysWorkoutHeader: {
    position: 'relative',
    marginTop: 16,
    marginBottom: 16,
  },
  todaysWorkoutText: {
    fontSize: theme.typography.fontSize.xl,
    lineHeight: theme.typography.fontSize.xl,
    fontFamily: theme.typography.fontFamily.primary,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.backgroundTertiary,
    textTransform: 'uppercase',
    includeFontPadding: false,
  },
  setsDisplay: {
    position: 'absolute',
    top: -8, // 8dp from card top (16dp header margin - 8dp = 8dp from card top)
    right: 0,
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
    left: 0,
    top: 25, // Start at center of first exercise row
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
  activeIndicator: {
    position: 'absolute',
    left: -8,
    top: 10,
    bottom: 10,
    width: 4,
    backgroundColor: theme.colors.actionSuccess,
    borderRadius: 2,
    zIndex: 10,
  },
  finishButtonContainer: {
    marginTop: theme.spacing.s, // 8dp from above card
    marginBottom: 0,
  },
  finishButtonText: {
    fontWeight: 'bold',
  },
});
