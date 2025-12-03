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
    overflow: 'hidden',
  },

  headerArea: {
    height: 44, // 8dp top + ~28dp visible text + 8dp bottom to strip
    paddingLeft: 8,
    paddingTop: 7,
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
    transform: [{scaleX: 1.2}],
    transformOrigin: 'left center',
    textShadowColor: theme.colors.shadowBlack,
    textShadowOffset: {width: 0, height: 2},
    textShadowRadius: 4,
  },

  imageArea: {
    flex: 1,
    width: '100%',
    overflow: 'hidden', // Prevent scaled images from clipping into header
  },

  workoutImage: {
    width: '100%',
    height: '100%',
  },

  // Top-aligned image - shows top of image, crops bottom
  topAlignedImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '160%',
  },

  suggesterPill: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.6)', // Semi-transparent black background
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },

  suggesterText: {
    fontSize: 24,
    lineHeight: 24,
    fontFamily: theme.typography.fontFamily.primary,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.actionSuccess,
    textTransform: 'uppercase',
    includeFontPadding: false,
    textShadowColor: theme.colors.shadowBlack,
    textShadowOffset: {width: 0, height: 2},
    textShadowRadius: 3,
  },

  // Image overlay bar - semi-transparent strip at top of image
  imageOverlayBar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingTop: 3,
    paddingBottom: 3,
    paddingLeft: 8,
  },

  imageOverlayText: {
    fontSize: 11,
    lineHeight: 11,
    fontFamily: theme.typography.fontFamily.primary,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    includeFontPadding: false,
  },
});
