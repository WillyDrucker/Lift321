// ==========================================================================
// PLAN PROGRESS BAR COMPONENT
//
// Displays current training plan name and completion progress.
// Shows horizontal progress bar with percentage fill.
//
// Dependencies: theme tokens
// Used by: HomePage
// ==========================================================================

import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {theme} from '@/theme';

// === TYPES ===

export type PlanProgressBarProps = {
  planName: string;
  completedWorkouts: number;
  totalWorkouts: number;
};

// === COMPONENT ===

export const PlanProgressBar: React.FC<PlanProgressBarProps> = React.memo(
  ({planName, completedWorkouts, totalWorkouts}) => {
    const progressPercentage = (completedWorkouts / totalWorkouts) * 100;

    return (
      <View style={styles.container}>
        <Text style={styles.planName}>
          <Text style={styles.planNameItalic}>LIFT</Text> 3-2-1
        </Text>
        <View style={styles.progressBarContainer}>
          <View style={styles.progressBarBackground}>
            <View
              style={[
                styles.progressBarFill,
                {width: `${progressPercentage}%`},
              ]}
            />
          </View>
        </View>
      </View>
    );
  },
);

PlanProgressBar.displayName = 'PlanProgressBar';

// === STYLES ===
// StyleSheet definitions using global theme tokens

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: theme.layout.planProgress.topPosition,
    left: 0,
    right: 0,
    height: theme.layout.planProgress.height,
    backgroundColor: theme.colors.backgroundPrimary,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.m,
    gap: theme.spacing.s,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.navActive,
  },

  planName: {
    fontSize: theme.typography.fontSize.m,
    fontFamily: theme.typography.fontFamily.primary,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.navActive,
    textTransform: 'uppercase', // All caps text
  },

  planNameItalic: {
    fontStyle: 'italic', // Italic for LIFT only
  },

  progressBarContainer: {
    flex: 1,
    justifyContent: 'center',
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
});
