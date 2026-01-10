// ==========================================================================
// SESSION TYPE CARD COMPONENT
//
// Card for selecting workout session type (standard, express, maintenance).
// Displays dynamic duration based on selected session.
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

export type SessionTypeOption = 'standard' | 'express' | 'maintenance';

type SessionTypeCardProps = {
  selectedSession: SessionTypeOption;
  onSessionChange: (session: SessionTypeOption) => void;
  duration: number;
};

// ============================================================================
// COMPONENT
// ============================================================================

export const SessionTypeCard: React.FC<SessionTypeCardProps> = ({
  selectedSession,
  onSessionChange,
  duration,
}) => {
  // Get session-specific color
  const sessionColor = {
    standard: theme.colors.sessionStandard,
    express: theme.colors.sessionExpress,
    maintenance: theme.colors.sessionMaintenance,
  }[selectedSession];

  return (
    <View style={styles.card}>
      <Text style={styles.label}>CURRENT SESSION</Text>

      {/* Duration Display */}
      <View style={styles.durationContainer}>
        <Text style={styles.durationLabel}>
          DURATION: <Text style={[styles.durationValue, {color: sessionColor}]}>
            {duration} MINUTES
          </Text>
        </Text>
      </View>

      {/* Session Type Selectors */}
      <View style={styles.typesContainer}>
        <TouchableOpacity
          style={[styles.typeButton, selectedSession === 'standard' && styles.typeSelected]}
          onPress={() => onSessionChange('standard')}
          activeOpacity={1}
        >
          <Text style={styles.typeText}>STANDARD</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.typeButton, selectedSession === 'express' && styles.typeSelected]}
          onPress={() => onSessionChange('express')}
          activeOpacity={1}
        >
          <Text style={styles.typeText}>EXPRESS</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.typeButton, selectedSession === 'maintenance' && styles.typeSelected]}
          onPress={() => onSessionChange('maintenance')}
          activeOpacity={1}
        >
          <Text style={styles.typeText}>MAINTENANCE</Text>
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
  durationContainer: {
    alignItems: 'center',
    marginBottom: theme.spacing.s,
  },
  durationLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: theme.colors.textSecondary,
    fontFamily: theme.typography.fontFamily.primary,
  },
  durationValue: {
    fontWeight: 'bold',
  },
  typesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  typeButton: {
    flex: 1,
    paddingVertical: theme.spacing.xs,
    paddingHorizontal: theme.spacing.s,
    backgroundColor: theme.colors.backgroundSecondary,
    borderRadius: 4,
    marginHorizontal: 2,
    alignItems: 'center',
  },
  typeSelected: {
    backgroundColor: theme.colors.actionSuccess,
  },
  typeText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: theme.colors.textPrimary,
    fontFamily: theme.typography.fontFamily.primary,
  },
});
