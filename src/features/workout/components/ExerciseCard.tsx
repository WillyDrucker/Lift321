// ==========================================================================
// EXERCISE CARD COMPONENT
//
// Collapsible card displaying exercise info and tutorial video.
// Allows selecting alternate exercises via bottom sheet.
// Uses react-native-youtube-iframe for YouTube video playback.
//
// Dependencies: theme tokens, react-native-youtube-iframe, BottomSheet
// Used by: ActiveWorkoutScreen
// ==========================================================================

import React, {useState, useRef, useCallback, useMemo} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Animated} from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';
import {theme} from '@/theme';
import {RightChevron} from '@/components/icons';
import {BottomSheet} from '@/components';
import exercisesData from '@/data/exercises.json';

// ============================================================================
// CONSTANTS
// ============================================================================

// Color code mapping for program_color_code
const COLOR_CODE_MAP: Record<string, string> = {
  cc1: theme.colors.actionSuccess, // Green
  cc2: theme.colors.sessionExpress, // Olive green
  cc3: theme.colors.sessionMaintenance, // Yellow
  cc4: theme.colors.actionWarning, // Orange
  red: theme.colors.actionDanger, // Red - note/non-selectable items
};

// Exercise type from JSON
type Exercise = {
  day: string;
  body_part: string;
  push_pull: string;
  muscle_group: string;
  sets: string;
  exercise_name: string;
  position: string;
  equipment_use: string;
  equipment_setup: string;
  equipment_weight: string;
  program_order: string;
  program_color_code: string;
  program1_order: string;
  program1_color_code: string;
};

// ============================================================================
// TYPES
// ============================================================================

type ExerciseCardProps = {
  exerciseName?: string;
  currentSet?: number;
  totalSets?: number;
  videoId?: string;
  bodyPart?: string;
  muscleGroup?: string;
};

// ============================================================================
// COMPONENT
// ============================================================================

export const ExerciseCard: React.FC<ExerciseCardProps> = ({
  exerciseName = 'EXERCISE',
  currentSet = 1,
  totalSets = 1,
  videoId = 'qASbflixYF4',
  bodyPart = 'Chest',
  muscleGroup = 'Major1',
}) => {
  const [expanded, setExpanded] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [exerciseSelectorVisible, setExerciseSelectorVisible] = useState(false);
  const [selectedExercise, setSelectedExercise] = useState(exerciseName);
  const [selectedColorCode, setSelectedColorCode] = useState<string>('cc1'); // Default green
  const animatedValue = useRef(new Animated.Value(0)).current;

  // Filter and sort exercises for the current body part and muscle group
  const alternateExercises = useMemo(() => {
    const filtered = (exercisesData as Exercise[]).filter(
      (ex) => ex.body_part === bodyPart && ex.muscle_group === muscleGroup
    );

    // Sort by program_order (order1, order2, etc.)
    const sorted = filtered.sort((a, b) => {
      const orderA = parseInt(a.program_order.replace('order', ''), 10);
      const orderB = parseInt(b.program_order.replace('order', ''), 10);
      return orderA - orderB;
    });

    // Create unique entries with display info
    // Each entry shows exercise name + position/equipment_use + equipment_setup
    return sorted.map((ex, index) => ({
      id: `${ex.exercise_name}-${ex.equipment_setup}-${index}`,
      name: ex.exercise_name,
      position: ex.position,
      equipmentUse: ex.equipment_use,
      equipmentSetup: ex.equipment_setup,
      colorCode: ex.program_color_code,
      order: ex.program_order,
      isCurrentExercise: ex.exercise_name.toLowerCase() === selectedExercise.toLowerCase(),
    }));
  }, [bodyPart, muscleGroup, selectedExercise]);

  // === ANIMATION INTERPOLATIONS ===
  const chevronRotation = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['-90deg', '90deg'],
  });

  const contentHeight = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, theme.layout.videoPlayer.height + theme.layout.videoPlayer.bottomPadding],
  });

  const contentOpacity = animatedValue.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, 0, 1],
  });

  const toggleExpand = useCallback(() => {
    const toValue = expanded ? 0 : 1;
    setExpanded(!expanded);

    // Pause video when collapsing
    if (expanded) {
      setPlaying(false);
    }

    Animated.timing(animatedValue, {
      toValue,
      duration: theme.layout.animation.duration,
      useNativeDriver: false,
    }).start();
  }, [expanded, animatedValue]);

  const onStateChange = useCallback((state: string) => {
    if (state === 'ended') {
      setPlaying(false);
    }
  }, []);

  const handleExerciseNamePress = useCallback(() => {
    setExerciseSelectorVisible(true);
  }, []);

  const handleExerciseSelectorClose = useCallback(() => {
    setExerciseSelectorVisible(false);
  }, []);

  const handleExerciseSelect = useCallback((exercise: {
    id: string;
    name: string;
    equipment: string;
    colorCode: string;
    order: string;
    isCurrentExercise: boolean;
  }) => {
    setSelectedExercise(exercise.name);
    setSelectedColorCode(exercise.colorCode);
    setExerciseSelectorVisible(false);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View style={styles.exerciseNameContainer}>
            <TouchableOpacity
              onPress={handleExerciseNamePress}
              activeOpacity={0.7}
            >
              <Text style={[styles.exerciseName, {color: COLOR_CODE_MAP[selectedColorCode] || theme.colors.actionSuccess}]}>
                {selectedExercise.toUpperCase()}
              </Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.setInfo}>
            <Text style={styles.setInfoLabel}>SET </Text>
            {currentSet}
            <Text style={styles.setInfoLabel}> OF </Text>
            {totalSets}
          </Text>
        </View>
        <TouchableOpacity
          style={styles.chevronTouchArea}
          onPress={toggleExpand}
          activeOpacity={0.7}
          hitSlop={{top: theme.spacing.s, bottom: theme.spacing.s, left: theme.spacing.s, right: theme.spacing.s}}
        >
          <Animated.View style={[styles.chevronContainer, {transform: [{rotate: chevronRotation}]}]}>
            <RightChevron size={theme.layout.exerciseCard.chevronSize} color={theme.colors.textSecondary} />
          </Animated.View>
        </TouchableOpacity>
      </View>

      <Animated.View style={[styles.videoWrapper, {height: contentHeight, opacity: contentOpacity}]}>
        <View style={styles.videoRow}>
          {/* Left side - card space for future text content */}
          <View style={styles.leftContent} />

          {/* Right side - YouTube Shorts player */}
          <View style={styles.videoContainer}>
            <View style={styles.videoContent}>
              <YoutubePlayer
                height={theme.layout.videoPlayer.height}
                width={theme.layout.videoPlayer.fullWidth}
                play={playing}
                videoId={videoId}
                onChangeState={onStateChange}
                webViewStyle={{opacity: 0.99}}
              />
            </View>
          </View>
        </View>
      </Animated.View>

      {/* Exercise Selector Bottom Sheet */}
      <BottomSheet
        visible={exerciseSelectorVisible}
        onClose={handleExerciseSelectorClose}
        topOffset={theme.layout.topNav.topSpacing + theme.layout.topNav.height + theme.layout.workoutTitleBar.height}
      >
        {/* All exercises for this muscle group, ordered by program_order */}
        {alternateExercises.map((exercise, index) => {
          const isRedNote = exercise.colorCode === 'red';
          const textColor = COLOR_CODE_MAP[exercise.colorCode] || theme.colors.textPrimary;

          // Red items are non-selectable notes - only show exercise name
          if (isRedNote) {
            return (
              <View
                key={exercise.id}
                style={[
                  styles.exerciseRow,
                  styles.exerciseRowNote,
                  index > 0 && styles.exerciseRowNotFirst,
                  index === alternateExercises.length - 1 && styles.exerciseRowLast,
                ]}
              >
                <Text style={[styles.exerciseRowText, {color: textColor}]}>
                  {exercise.name.toUpperCase()}
                </Text>
              </View>
            );
          }

          // Normal selectable exercise
          return (
            <TouchableOpacity
              key={exercise.id}
              style={[
                styles.exerciseRow,
                index > 0 && styles.exerciseRowNotFirst,
                index === alternateExercises.length - 1 && styles.exerciseRowLast,
              ]}
              onPress={() => handleExerciseSelect(exercise)}
              activeOpacity={0.7}
            >
              <Text style={[styles.exerciseRowText, {color: textColor}]}>
                {exercise.name.toUpperCase()}
              </Text>
              <Text style={[styles.exerciseRowPosition, {color: textColor}]}>
                {exercise.position.toUpperCase()} - {exercise.equipmentUse.toUpperCase()}
              </Text>
              <Text style={[styles.exerciseRowEquipment, {color: textColor}]}>
                {exercise.equipmentSetup.toUpperCase()}
              </Text>
            </TouchableOpacity>
          );
        })}
      </BottomSheet>
    </View>
  );
};


// ============================================================================
// STYLES
// ============================================================================

const styles = StyleSheet.create({
  container: {
    marginBottom: theme.spacing.s,
    backgroundColor: theme.colors.backgroundPrimary,
    borderRadius: theme.spacing.s,
    borderWidth: 0,
    padding: 0,
  },
  header: {
    height: theme.layout.controlCard.height,
    position: 'relative',
    paddingTop: theme.layout.exerciseCard.headerPaddingTop,
    paddingHorizontal: theme.spacing.s,
  },
  headerContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  exerciseNameContainer: {
    paddingHorizontal: theme.layout.exerciseCard.exerciseNamePaddingHorizontal,
    marginBottom: theme.layout.exerciseCard.exerciseNameMarginBottom,
  },
  exerciseName: {
    fontSize: theme.layout.exerciseCard.exerciseNameFontSize,
    lineHeight: theme.layout.exerciseCard.exerciseNameLineHeight,
    includeFontPadding: false,
    color: theme.colors.actionSuccess,
    fontFamily: theme.typography.fontFamily.primary,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  setInfo: {
    fontSize: theme.layout.exerciseCard.setInfoFontSize,
    lineHeight: theme.layout.exerciseCard.setInfoFontSize,
    includeFontPadding: false,
    color: theme.colors.actionSuccess,
    fontFamily: theme.typography.fontFamily.primary,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  setInfoLabel: {
    color: theme.colors.backgroundTertiary,
  },
  chevronTouchArea: {
    position: 'absolute',
    top: theme.layout.exerciseCard.chevronTop,
    right: theme.layout.exerciseCard.chevronRight,
  },
  chevronContainer: {
    // Container for animated rotation
  },
  videoWrapper: {
    overflow: 'hidden',
  },
  videoRow: {
    flexDirection: 'row',
    flex: 1,
    paddingRight: theme.spacing.s,
    paddingBottom: theme.layout.videoPlayer.bottomPadding,
  },
  leftContent: {
    flex: 1,
  },
  videoContainer: {
    width: theme.layout.videoPlayer.width,
    height: theme.layout.videoPlayer.height,
    overflow: 'hidden',
    borderRadius: theme.layout.videoPlayer.borderRadius,
    backgroundColor: theme.colors.pureBlack,
  },
  videoContent: {
    width: theme.layout.videoPlayer.fullWidth,
    marginLeft: theme.layout.videoPlayer.cropOffset,
  },
  // === EXERCISE SELECTOR STYLES ===
  currentSelectionHeader: {
    paddingVertical: theme.spacing.m,
    alignItems: 'center',
  },
  currentSelectionLabel: {
    fontSize: theme.typography.fontSize.s,
    fontFamily: theme.typography.fontFamily.primary,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.xs,
  },
  currentSelectionName: {
    fontSize: theme.typography.fontSize.xl,
    fontFamily: theme.typography.fontFamily.primary,
    fontWeight: 'bold',
    color: theme.colors.actionSuccess,
  },
  selectorDivider: {
    height: theme.layout.border.thin,
    backgroundColor: theme.colors.borderDefault,
    marginVertical: theme.spacing.s,
  },
  alternatesLabel: {
    fontSize: theme.typography.fontSize.s,
    fontFamily: theme.typography.fontFamily.primary,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.s,
  },
  exerciseRow: {
    alignItems: 'center',
    borderBottomWidth: theme.layout.border.thin,
    borderBottomColor: theme.colors.borderDefault,
    marginTop: 0,
  },
  exerciseRowNotFirst: {
    marginTop: theme.layout.exerciseSelector.rowSpacing,
  },
  exerciseRowLast: {
    borderBottomWidth: 0,
  },
  exerciseRowNote: {
    // Non-selectable informational items (red color code)
    paddingBottom: theme.layout.exerciseSelector.rowBottomPadding,
  },
  exerciseRowText: {
    fontSize: theme.layout.exerciseSelector.exerciseNameFontSize,
    lineHeight: theme.layout.exerciseSelector.exerciseNameLineHeight,
    fontFamily: theme.typography.fontFamily.primary,
    fontWeight: 'bold',
    color: theme.colors.textPrimary,
    textAlign: 'center',
    includeFontPadding: false,
    marginBottom: theme.layout.exerciseSelector.detailMarginBottom,
  },
  exerciseRowPosition: {
    fontSize: theme.layout.exerciseSelector.detailFontSize,
    lineHeight: theme.layout.exerciseSelector.detailLineHeight,
    fontFamily: theme.typography.fontFamily.primary,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    includeFontPadding: false,
    marginBottom: theme.layout.exerciseSelector.detailMarginBottom,
  },
  exerciseRowEquipment: {
    fontSize: theme.layout.exerciseSelector.detailFontSize,
    lineHeight: theme.layout.exerciseSelector.detailLineHeight,
    fontFamily: theme.typography.fontFamily.primary,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    includeFontPadding: false,
    marginBottom: theme.layout.exerciseSelector.rowBottomPadding,
  },
  currentIndicator: {
    fontSize: theme.typography.fontSize.xs,
    fontFamily: theme.typography.fontFamily.primary,
    fontWeight: 'bold',
    color: theme.colors.actionSuccess,
    marginLeft: theme.spacing.s,
  },
});
