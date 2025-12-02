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
    padding: theme.spacing.s,
    paddingBottom: 100,
  },
  todaysWorkoutCard: {
    backgroundColor: theme.colors.backgroundPrimary,
    borderRadius: theme.spacing.s,
    paddingHorizontal: theme.spacing.s,
    paddingBottom: theme.spacing.s,
    marginTop: theme.spacing.s,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  cardEditing: {
    borderColor: theme.colors.actionWarning,
  },
  editButton: {
    position: 'absolute',
    right: 0,
  },
  todaysWorkoutHeader: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 13,
    marginBottom: 13,
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
  },
  titleConnector: {
    position: 'absolute',
    left: 0,
    top: 12,
    width: 50,
    height: 1,
    backgroundColor: theme.colors.pureWhite,
  },
  exerciseTreeContainer: {
    position: 'relative',
  },
  verticalLine: {
    position: 'absolute',
    left: 0,
    top: -25,
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
    marginTop: theme.spacing.xl,
    marginBottom: theme.spacing.xl,
  },
  finishButtonText: {
    fontWeight: 'bold',
  },
});
