// ==========================================================================
// WORKOUT OVERVIEW SCREEN - STYLES
//
// StyleSheet definitions for WorkoutOverviewScreen.
// Extracted for maintainability and file size management.
//
// Dependencies: theme tokens
// Used by: WorkoutOverviewScreen.tsx
// ==========================================================================

import {StyleSheet} from 'react-native';
import {theme} from '@/theme';

// Selector text sizing for compact multi-option displays
export const SELECTOR_TEXT_SIZE = 12;

export const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },

  scrollContent: {
    flexGrow: 1,
    paddingTop: 8, // 8dp from top green line
    paddingLeft: theme.spacing.s,
    paddingRight: theme.spacing.s,
  },

  // === WORKOUT PLAN CARD ===
  workoutPlanCard: {
    backgroundColor: theme.colors.backgroundPrimary,
    borderRadius: theme.spacing.s,
    paddingLeft: theme.spacing.s,
    paddingRight: theme.spacing.s,
    paddingBottom: theme.spacing.s,
    marginBottom: theme.spacing.s,
  },

  workoutPlanCurrentText: {
    fontSize: theme.typography.fontSize.xl,
    lineHeight: theme.typography.fontSize.xl,
    fontFamily: theme.typography.fontFamily.primary,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.backgroundTertiary,
    textTransform: 'uppercase',
    textAlign: 'center',
    includeFontPadding: false,
    marginTop: 13,
    marginBottom: 13,
  },

  workoutPlanNameSelector: {
    height: 50,
    backgroundColor: theme.colors.pureBlack,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: theme.spacing.s,
    borderWidth: theme.layout.border.thin,
    borderColor: 'transparent', // Removed green border - can restore with theme.colors.actionSuccess
  },

  workoutPlanNameText: {
    fontSize: theme.typography.fontSize.xl,
    fontFamily: theme.typography.fontFamily.primary,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.textPrimary,
    textTransform: 'uppercase',
  },

  workoutPlanNameItalic: {
    fontStyle: 'italic',
    fontWeight: theme.typography.fontWeight.bold,
  },

  progressBarWrapper: {
    marginTop: theme.spacing.s,
    marginBottom: theme.spacing.s,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },

  progressBarWeekText: {
    fontSize: 12,
    fontFamily: theme.typography.fontFamily.primary,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.navInactive,
    textTransform: 'uppercase',
  },

  progressBarWeekGreen: {
    color: theme.colors.actionSuccess,
  },

  progressBarContainer: {
    flex: 1,
  },

  progressBarBackground: {
    height: theme.layout.progressBar.height,
    backgroundColor: theme.colors.navInactive,
    borderRadius: theme.layout.progressBar.borderRadius,
    overflow: 'hidden',
  },

  progressBarFill: {
    height: theme.layout.progressBar.height,
    backgroundColor: theme.colors.navActive,
    borderRadius: theme.layout.progressBar.borderRadius,
  },

  workoutPlanFocusContainer: {
    flexDirection: 'row',
    gap: 1,
  },

  workoutPlanFocusSelector: {
    flex: 1,
    height: 50,
    backgroundColor: theme.colors.backgroundTertiary,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: theme.spacing.s,
    borderWidth: theme.layout.border.thin,
    borderColor: 'transparent',
  },

  workoutPlanFocusSelected: {
    borderColor: theme.colors.actionSuccess,
  },

  workoutPlanFocusText: {
    fontSize: SELECTOR_TEXT_SIZE,
    fontFamily: theme.typography.fontFamily.primary,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.textSecondary,
    textTransform: 'uppercase',
    textAlign: 'center',
  },

  // === WORKOUT SESSION CARD ===
  workoutSessionCard: {
    backgroundColor: theme.colors.backgroundPrimary,
    borderRadius: theme.spacing.s,
    paddingLeft: theme.spacing.s,
    paddingRight: theme.spacing.s,
    paddingBottom: theme.spacing.s,
    marginBottom: theme.spacing.s,
  },

  workoutSessionCurrentText: {
    fontSize: theme.typography.fontSize.xl,
    lineHeight: theme.typography.fontSize.xl,
    fontFamily: theme.typography.fontFamily.primary,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.backgroundTertiary,
    textTransform: 'uppercase',
    textAlign: 'center',
    includeFontPadding: false,
    marginTop: 13,
    marginBottom: 13,
  },

  workoutSessionDurationSelector: {
    height: 50,
    backgroundColor: theme.colors.pureBlack,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: theme.spacing.s,
    marginBottom: theme.spacing.s,
  },

  workoutSessionDurationLabel: {
    fontSize: theme.typography.fontSize.m,
    fontFamily: theme.typography.fontFamily.primary,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.textPrimary,
    textTransform: 'uppercase',
  },

  workoutSessionDurationValue: {
    fontSize: theme.typography.fontSize.xl,
    lineHeight: theme.typography.fontSize.xl,
    fontFamily: theme.typography.fontFamily.primary,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.textPrimary,
    textTransform: 'uppercase',
  },

  workoutSessionTypesContainer: {
    flexDirection: 'row',
    gap: 1,
  },

  workoutSessionTypeSelector: {
    flex: 1,
    height: 50,
    backgroundColor: theme.colors.backgroundTertiary,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: theme.spacing.s,
    borderWidth: theme.layout.border.thin,
    borderColor: 'transparent',
  },

  workoutSessionTypeSelected: {
    borderColor: theme.colors.actionSuccess,
  },

  workoutSessionTypeText: {
    fontSize: SELECTOR_TEXT_SIZE,
    fontFamily: theme.typography.fontFamily.primary,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.textSecondary,
    textTransform: 'uppercase',
    textAlign: 'center',
  },

  // === WORKOUT EQUIPMENT CARD ===
  workoutEquipmentCard: {
    backgroundColor: theme.colors.backgroundPrimary,
    borderRadius: theme.spacing.s,
    paddingLeft: theme.spacing.s,
    paddingRight: theme.spacing.s,
    paddingBottom: theme.spacing.s,
  },

  workoutEquipmentCurrentText: {
    fontSize: theme.typography.fontSize.xl,
    lineHeight: theme.typography.fontSize.xl,
    fontFamily: theme.typography.fontFamily.primary,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.backgroundTertiary,
    textTransform: 'uppercase',
    textAlign: 'center',
    includeFontPadding: false,
    marginTop: 13,
    marginBottom: 13,
  },

  workoutEquipmentTypesContainer: {
    gap: 1,
  },

  workoutEquipmentTypeRow: {
    flexDirection: 'row',
    gap: 1,
  },

  workoutEquipmentTypeSelector: {
    flex: 1,
    height: 50,
    backgroundColor: theme.colors.backgroundTertiary,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: theme.spacing.s,
    borderWidth: theme.layout.border.thin,
    borderColor: 'transparent',
  },

  workoutEquipmentTypeSelected: {
    borderColor: theme.colors.actionSuccess,
  },

  workoutEquipmentTypeText: {
    fontSize: SELECTOR_TEXT_SIZE,
    fontFamily: theme.typography.fontFamily.primary,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.textSecondary,
    textTransform: 'uppercase',
    textAlign: 'center',
  },

  // === TODAY'S WORKOUT CARD ===
  todaysWorkoutCard: {
    backgroundColor: theme.colors.backgroundPrimary,
    borderRadius: theme.spacing.s,
    paddingLeft: theme.spacing.s,
    paddingRight: theme.spacing.s,
    paddingBottom: theme.spacing.s,
    marginTop: theme.spacing.s,
  },

  todaysWorkoutHeader: {
    position: 'relative',
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

  // === EXERCISE TREE STRUCTURE ===
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

  exerciseSetRow: {
    position: 'relative',
    marginBottom: 5,
    marginLeft: 16,
  },

  horizontalConnector: {
    position: 'absolute',
    left: -16,
    top: 25,
    width: 16,
    height: 1,
    backgroundColor: theme.colors.pureWhite,
  },

  exerciseGroupSpacer: {
    height: 32,
  },

  exerciseList: {
    gap: theme.spacing.s,
  },

  exerciseRow: {
    height: 50,
    backgroundColor: theme.colors.pureBlack,
    borderRadius: theme.spacing.s,
    flexDirection: 'row',
    position: 'relative',
  },

  exerciseImage: {
    width: 46,
    height: 46,
    borderRadius: 6,
    position: 'absolute',
    top: 2,
    left: 2,
  },

  exerciseInfo: {
    position: 'absolute',
    left: 56,
    top: 0,
    bottom: 0,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },

  exerciseName: {
    fontSize: theme.typography.fontSize.m,
    fontFamily: theme.typography.fontFamily.primary,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.actionSuccess,
    textTransform: 'uppercase',
    includeFontPadding: false,
    lineHeight: 16,
    marginTop: 6,
  },

  exerciseSetCount: {
    fontSize: theme.typography.fontSize.m,
    fontFamily: theme.typography.fontFamily.primary,
    fontWeight: theme.typography.fontWeight.bold,
    textTransform: 'uppercase',
    includeFontPadding: false,
    lineHeight: 16,
    marginBottom: 6,
  },

  exerciseSetLabel: {
    color: theme.colors.textSecondary,
  },

  exerciseSetNumber: {
    // Color set dynamically based on session type
  },

  exerciseReps: {
    fontSize: theme.typography.fontSize.m,
    fontFamily: theme.typography.fontFamily.primary,
    fontWeight: theme.typography.fontWeight.bold,
    textTransform: 'uppercase',
    position: 'absolute',
    right: 8,
    bottom: 6,
    textAlign: 'right',
    includeFontPadding: false,
    lineHeight: 16,
  },

  exerciseRepsLabel: {
    color: theme.colors.textSecondary,
  },

  exerciseRepsNumber: {
    color: theme.colors.actionSuccess,
  },

  exerciseDetails: {
    fontSize: theme.typography.fontSize.s,
    fontFamily: theme.typography.fontFamily.primary,
    fontWeight: theme.typography.fontWeight.medium,
    color: theme.colors.textSecondary,
    textTransform: 'uppercase',
  },
});
