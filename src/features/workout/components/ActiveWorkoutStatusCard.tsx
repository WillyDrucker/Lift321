// ==========================================================================
// ACTIVE WORKOUT STATUS CARD
//
// Displays workout progress status (sets remaining, time remaining) at the
// top of the ActiveWorkout screen. Shows SETS left-aligned and MINS right-aligned.
//
// Dependencies: theme tokens
// Used by: ActiveWorkoutScreen
// ==========================================================================

import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {theme} from '@/theme';

// ============================================================================
// TYPES
// ============================================================================

type ActiveWorkoutStatusCardProps = {
  remainingSets: number;
  remainingMinutes: number;
};

// ============================================================================
// COMPONENT
// ============================================================================

export const ActiveWorkoutStatusCard: React.FC<ActiveWorkoutStatusCardProps> = ({
  remainingSets,
  remainingMinutes,
}) => {
  return (
    <View style={styles.container}>
      {/* Left: SETS */}
      <View style={styles.statGroup}>
        <Text style={styles.label}>SETS</Text>
        <Text style={styles.value}>{remainingSets}</Text>
      </View>

      {/* Right: MINS */}
      <View style={styles.statGroup}>
        <Text style={styles.label}>MINS</Text>
        <Text style={styles.value}>{remainingMinutes}</Text>
      </View>
    </View>
  );
};

// ============================================================================
// STYLES
// ============================================================================

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.backgroundPrimary,
    borderRadius: theme.spacing.s,
    paddingHorizontal: theme.spacing.m,
    paddingTop: 5, // Fine-tuned for 8dp from card top to label text
    paddingBottom: 1, // Fine-tuned for 8dp from value bottom to card edge
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.s, // 8dp gap to next card
  },
  statGroup: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: theme.spacing.xs,
  },
  label: {
    fontSize: theme.typography.fontSize.m,
    fontFamily: theme.typography.fontFamily.primary,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.backgroundTertiary, // Match CURRENT SET text color
    includeFontPadding: false,
  },
  value: {
    fontSize: 32,
    fontFamily: theme.typography.fontFamily.primary,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.actionSuccess,
    includeFontPadding: false,
  },
});
