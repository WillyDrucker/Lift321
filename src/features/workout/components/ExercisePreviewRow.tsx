// ==========================================================================
// EXERCISE PREVIEW ROW COMPONENT
//
// Individual exercise set preview row with image, name, set info, and reps.
// Used in workout overview to display planned exercises.
//
// Dependencies: theme tokens
// Used by: ExerciseTreeCard, WorkoutOverviewScreen
// ==========================================================================

import React from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet, type ImageSourcePropType} from 'react-native';
import {theme} from '@/theme';

// ============================================================================
// TYPES
// ============================================================================

export type SessionType = 'standard' | 'express' | 'maintenance';

type ExercisePreviewRowProps = {
  exerciseName: string;
  setNumber: number;
  totalSets: number;
  reps: number;
  sessionType: SessionType;
  imageSource: ImageSourcePropType;
  onPress?: () => void;
};

// ============================================================================
// COMPONENT
// ============================================================================

export const ExercisePreviewRow: React.FC<ExercisePreviewRowProps> = ({
  exerciseName,
  setNumber,
  totalSets,
  reps,
  sessionType,
  imageSource,
  onPress,
}) => {
  // Get session-specific color
  const sessionColor = {
    standard: theme.colors.sessionStandard,
    express: theme.colors.sessionExpress,
    maintenance: theme.colors.sessionMaintenance,
  }[sessionType];

  return (
    <View style={styles.container}>
      <View style={styles.horizontalConnector} />
      <TouchableOpacity
        style={styles.row}
        onPress={onPress}
        activeOpacity={1}
      >
        <Image
          source={imageSource}
          style={styles.image}
          resizeMode="cover"
        />
        <View style={styles.info}>
          <Text style={styles.name}>{exerciseName.toUpperCase()}</Text>
          <Text style={styles.setCount}>
            <Text style={styles.label}>SET: </Text>
            <Text style={[styles.number, {color: sessionColor}]}>
              {setNumber}{' '}
            </Text>
            <Text style={styles.label}>OF </Text>
            <Text style={[styles.number, {color: sessionColor}]}>
              {totalSets}
            </Text>
          </Text>
        </View>
        <Text style={styles.reps}>
          <Text style={styles.repsLabel}>REPS: </Text>
          <Text style={styles.repsNumber}>{reps}</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
};

// ============================================================================
// STYLES
// ============================================================================

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  horizontalConnector: {
    width: 20,
    height: 2,
    backgroundColor: theme.colors.actionSuccess,
    marginRight: 8,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.backgroundSecondary,
    borderRadius: 8,
    padding: 8,
    height: 50,
  },
  image: {
    width: 34,
    height: 34,
    borderRadius: 4,
    marginRight: 8,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 12,
    fontWeight: 'bold',
    color: theme.colors.textPrimary,
    fontFamily: theme.typography.fontFamily.primary,
  },
  setCount: {
    fontSize: 10,
    color: theme.colors.textSecondary,
    fontFamily: theme.typography.fontFamily.primary,
  },
  label: {
    color: theme.colors.textSecondary,
  },
  number: {
    fontWeight: 'bold',
  },
  reps: {
    fontSize: 10,
    fontFamily: theme.typography.fontFamily.primary,
  },
  repsLabel: {
    color: theme.colors.textSecondary,
  },
  repsNumber: {
    color: theme.colors.actionSuccess,
    fontWeight: 'bold',
  },
});
