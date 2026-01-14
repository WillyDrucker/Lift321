// ==========================================================================
// PLAN PROGRESS BAR COMPONENT
//
// Displays current training plan name and completion progress.
// Shows horizontal progress bar with percentage fill.
// Uses global plan context for selected plan name.
//
// Dependencies: theme tokens, PlanContext
// Used by: HomePage, PlansPage
// ==========================================================================

import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {theme} from '@/theme';
import {usePlan} from '@/features/plans/context/PlanContext';

// === TYPES ===

export type PlanProgressBarProps = {
  completedWorkouts: number;
  totalWorkouts: number;
};

// === COMPONENT ===

export const PlanProgressBar: React.FC<PlanProgressBarProps> = React.memo(
  ({completedWorkouts, totalWorkouts}) => {
    const insets = useSafeAreaInsets();
    const {selectedPlan} = usePlan();
    const progressPercentage = (completedWorkouts / totalWorkouts) * 100;

    // Position: insets.top + nav height + calendar height - overlap adjustment
    const topPosition = insets.top + theme.layout.topNav.height + theme.layout.weekCalendar.height - 4;

    return (
      <View style={[styles.container, {top: topPosition}]}>
        <Text style={styles.planName}>
          {selectedPlan.displayPrefix ? (
            <>
              <Text style={styles.planNameItalic}>{selectedPlan.displayPrefix}</Text>
              {' '}{selectedPlan.displaySuffix}
            </>
          ) : (
            selectedPlan.displaySuffix
          )}
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
    // top is set dynamically via insets + nav + calendar heights
    left: 0,
    right: 0,
    height: theme.layout.planProgress.height,
    backgroundColor: theme.colors.pureBlack, // Pure black background (global standard)
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
    flexShrink: 0, // Prevent text from shrinking - auto-expands based on content
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
