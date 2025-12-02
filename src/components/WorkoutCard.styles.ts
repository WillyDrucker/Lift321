// ==========================================================================
// WORKOUT CARD - STYLES
//
// StyleSheet definitions for WorkoutCard component.
// Extracted for maintainability and file size management.
//
// Dependencies: theme tokens
// Used by: WorkoutCard.tsx
// ==========================================================================

import {StyleSheet} from 'react-native';
import {theme} from '@/theme';

export const styles = StyleSheet.create({
  workoutCard: {
    height: theme.layout.recommendedWorkout.height,
    backgroundColor: theme.colors.backgroundPrimary,
    borderRadius: theme.layout.recommendedWorkout.borderRadius,
    marginRight: 8,
    overflow: 'hidden',
  },

  headerArea: {
    height: 48,
    paddingLeft: theme.layout.recommendedWorkout.paddingLeft,
    paddingTop: 0,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },

  workoutTitle: {
    fontSize: theme.typography.fontSize.m,
    fontFamily: theme.typography.fontFamily.primary,
    color: theme.colors.pureWhite,
  },

  bodyPartTitle: {
    fontSize: 36,
    fontFamily: theme.typography.fontFamily.workoutCard,
    color: theme.colors.actionSuccess,
    textTransform: 'uppercase',
    includeFontPadding: false,
    transform: [{scaleX: 1.2}, {translateY: 2}],
    marginLeft: 11,
    textShadowColor: theme.colors.shadowBlack,
    textShadowOffset: {width: 0, height: 2},
    textShadowRadius: 4,
  },

  customWorkoutTitle: {
    fontSize: 36,
    fontFamily: theme.typography.fontFamily.workoutCard,
    textTransform: 'uppercase',
    includeFontPadding: false,
    transform: [{scaleX: 1.2}, {translateY: 2}],
    marginLeft: 22,
    textShadowColor: theme.colors.shadowBlack,
    textShadowOffset: {width: 0, height: 2},
    textShadowRadius: 4,
  },

  imageArea: {
    flex: 1,
    width: '100%',
  },

  workoutImage: {
    width: '100%',
    height: '100%',
  },

  beginButtonContainer: {
    position: 'absolute',
    bottom: theme.layout.recommendedWorkout.cardSpacing,
    right: theme.layout.recommendedWorkout.cardSpacing,
    width: 100,
    height: 32,
  },

  beginButtonShadow: {
    position: 'absolute',
    width: 100,
    height: 32,
    backgroundColor: theme.colors.shadowBlack,
    borderRadius: 8,
  },

  shadowLayer3: {
    top: 6,
    right: 0,
    opacity: 0.15,
  },

  shadowLayer2: {
    top: 4,
    right: 0,
    opacity: 0.25,
  },

  shadowLayer1: {
    top: 2,
    right: 0,
    opacity: 0.4,
  },

  beginButton: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 100,
    height: 32,
    backgroundColor: theme.colors.actionSuccess,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },

  beginButtonText: {
    fontSize: theme.typography.fontSize.l,
    fontFamily: theme.typography.fontFamily.primary,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.pureBlack,
    textTransform: 'uppercase',
  },
});
