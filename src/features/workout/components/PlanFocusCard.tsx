// ==========================================================================
// PLAN FOCUS CARD COMPONENT
//
// Card for selecting workout plan focus (strength, balanced, growth).
// Displays current plan name and week progress.
//
// Dependencies: theme tokens
// Used by: WorkoutOverviewScreen
// ==========================================================================

import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {theme} from '@/theme';

// ============================================================================
// TYPES
// ============================================================================

export type PlanFocus = 'strength' | 'balanced' | 'growth';

type PlanFocusCardProps = {
  selectedFocus: PlanFocus;
  onFocusChange: (focus: PlanFocus) => void;
  weekProgress?: {current: number; total: number};
};

// ============================================================================
// COMPONENT
// ============================================================================

export const PlanFocusCard: React.FC<PlanFocusCardProps> = ({
  selectedFocus,
  onFocusChange,
  weekProgress = {current: 2, total: 15},
}) => {
  const progressPercentage = (weekProgress.current / weekProgress.total) * 100;

  return (
    <View style={styles.card}>
      <Text style={styles.label}>CURRENT PLAN</Text>

      {/* Plan Name Selector */}
      <TouchableOpacity
        style={styles.nameSelector}
        onPress={() => console.log('Plan selector pressed')}
        activeOpacity={1}
      >
        <Text style={styles.nameText}>
          <Text style={styles.nameItalic}>LIFT</Text> 3-2-1
        </Text>
      </TouchableOpacity>

      {/* Progress Bar */}
      <View style={styles.progressWrapper}>
        <Text style={styles.progressText}>
          WEEK <Text style={styles.progressGreen}>{weekProgress.current} </Text>
          OF<Text style={styles.progressGreen}> {weekProgress.total}</Text>
        </Text>
        <View style={styles.progressContainer}>
          <View style={styles.progressBackground}>
            <View style={[styles.progressFill, {width: `${progressPercentage}%`}]} />
          </View>
        </View>
      </View>

      {/* Focus Selectors */}
      <View style={styles.focusContainer}>
        <TouchableOpacity
          style={[styles.focusButton, selectedFocus === 'strength' && styles.focusSelected]}
          onPress={() => onFocusChange('strength')}
          activeOpacity={1}
        >
          <Text style={styles.focusText}>STRENGTH</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.focusButton, selectedFocus === 'balanced' && styles.focusSelected]}
          onPress={() => onFocusChange('balanced')}
          activeOpacity={1}
        >
          <Text style={styles.focusText}>BALANCED</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.focusButton, selectedFocus === 'growth' && styles.focusSelected]}
          onPress={() => onFocusChange('growth')}
          activeOpacity={1}
        >
          <Text style={styles.focusText}>GROWTH</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// ============================================================================
// STYLES
// ============================================================================

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.backgroundPrimary,
    borderRadius: theme.spacing.s,
    padding: theme.spacing.m,
    marginBottom: theme.spacing.s,
  },
  label: {
    fontSize: 12,
    fontWeight: 'bold',
    color: theme.colors.textSecondary,
    fontFamily: theme.typography.fontFamily.primary,
    textAlign: 'center',
    marginBottom: theme.spacing.xs,
  },
  nameSelector: {
    alignItems: 'center',
    marginBottom: theme.spacing.s,
  },
  nameText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.textPrimary,
    fontFamily: theme.typography.fontFamily.primary,
  },
  nameItalic: {
    fontStyle: 'italic',
    color: theme.colors.actionSuccess,
  },
  progressWrapper: {
    marginBottom: theme.spacing.s,
  },
  progressText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: theme.colors.textSecondary,
    fontFamily: theme.typography.fontFamily.primary,
    textAlign: 'center',
    marginBottom: 4,
  },
  progressGreen: {
    color: theme.colors.actionSuccess,
  },
  progressContainer: {
    paddingHorizontal: theme.spacing.m,
  },
  progressBackground: {
    height: 4,
    backgroundColor: theme.colors.backgroundSecondary,
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: theme.colors.actionSuccess,
    borderRadius: 2,
  },
  focusContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  focusButton: {
    flex: 1,
    paddingVertical: theme.spacing.xs,
    paddingHorizontal: theme.spacing.s,
    backgroundColor: theme.colors.backgroundSecondary,
    borderRadius: 4,
    marginHorizontal: 2,
    alignItems: 'center',
  },
  focusSelected: {
    backgroundColor: theme.colors.actionSuccess,
  },
  focusText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: theme.colors.textPrimary,
    fontFamily: theme.typography.fontFamily.primary,
  },
});
