// ==========================================================================
// ACTIVE WORKOUT SCREEN
//
// Screen displayed when user starts an active workout session.
// Shows workout name header and exercise list for the active workout.
//
// Dependencies: theme tokens, navigation types, workout data
// Used by: Navigation stack (from WorkoutOverview LET'S GO button)
// ==========================================================================

import React, {useState, useMemo} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import {theme} from '@/theme';
import type {RootStackScreenProps} from '@/navigation/types';
import {getExercisesForWorkout, type SessionType} from '@/services/exerciseService';
import {WorkoutLayout} from '@/features/workout/components/WorkoutLayout';

// ============================================================================
// TYPES
// ============================================================================

type ActiveWorkoutProps = RootStackScreenProps<'ActiveWorkout'>;

// ============================================================================
// COMPONENT
// ============================================================================

export const ActiveWorkoutScreen: React.FC<ActiveWorkoutProps> = ({
  route,
  navigation,
}) => {
  // ==========================================================================
  // STATE
  // ==========================================================================

  const {
    workoutType,
    sessionType: initialSessionType,
    planFocus: initialPlanFocus,
    selectedEquipment: initialEquipment,
    weekProgress,
  } = route.params;

  const [sidebarVisible, setSidebarVisible] = useState<boolean>(false);

  // Active workout configuration state (editable during workout)
  const [selectedSession, setSelectedSession] = useState<'standard' | 'express' | 'maintenance'>(
    initialSessionType.toLowerCase() as 'standard' | 'express' | 'maintenance'
  );
  const [selectedPlanFocus, setSelectedPlanFocus] = useState<'strength' | 'balanced' | 'growth'>(
    initialPlanFocus
  );
  const [selectedEquipment, setSelectedEquipment] = useState<Set<string>>(
    initialEquipment
  );

  // ==========================================================================
  // COMPUTED VALUES
  // ==========================================================================

  /**
   * Session type conversion for exerciseService compatibility
   * exerciseService expects PascalCase 'Standard' | 'Express' | 'Maintenance'
   */
  const sessionType: SessionType = useMemo(() => {
    return selectedSession.charAt(0).toUpperCase() + selectedSession.slice(1) as SessionType;
  }, [selectedSession]);

  /**
   * Exercise data dynamically updates based on selected session type
   * Recalculates when user changes session during active workout
   */
  const workoutData = useMemo(() => {
    return getExercisesForWorkout(workoutType, sessionType);
  }, [workoutType, sessionType]);

  /**
   * Vertical line height adapts to total exercise count and set distribution
   * Ensures tree connector extends to last exercise set with proper visual balance
   */
  const verticalLineHeight = useMemo(() => {
    const START_OFFSET = 25; // Connector alignment with title element
    const SET_HEIGHT = 50; // Standard touchable row height
    const SET_MARGIN = 5; // Visual separation between individual sets
    const GROUP_SPACER = 32; // Breathing room between exercise groups

    let totalHeight = START_OFFSET;
    let exerciseCount = 0;

    workoutData.exercises.forEach((exercise) => {
      if (exercise.adjustedSets === 0) return;

      if (exerciseCount > 0) {
        totalHeight += GROUP_SPACER;
      }

      totalHeight += exercise.adjustedSets * (SET_HEIGHT + SET_MARGIN);

      exerciseCount++;
    });

    totalHeight -= SET_MARGIN;
    totalHeight -= (SET_HEIGHT / 2);
    totalHeight += (SET_MARGIN / 2);

    return totalHeight;
  }, [workoutData.exercises]);


  // ==========================================================================
  // HELPER FUNCTIONS
  // ==========================================================================

  /**
   * Maps exercise names to image assets using kebab-case naming convention
   * Provides fallback to bench-press image for unmapped exercises
   */
  const getExerciseImage = (exerciseName: string) => {
    const imageName = exerciseName.toLowerCase().replace(/\s+/g, '-');

    const imageMap: Record<string, any> = {
      'bench-press': require('@/assets/images/exercises/bench-press.png'),
      'incline-bench-press': require('@/assets/images/exercises/incline-bench-press.png'),
      'chest-flyes': require('@/assets/images/exercises/chest-flyes.png'),
      'chest-press': require('@/assets/images/exercises/bench-press.png'),
    };

    return imageMap[imageName] || imageMap['bench-press'];
  };

  /**
   * Generates exercise set rows with tree connectors and session-specific color coding
   * Each set includes exercise image, name, set counter, and rep target
   */
  const renderExerciseSets = (
    exerciseName: string,
    totalSets: number,
    currentReps: number,
  ) => {
    const sets: JSX.Element[] = [];

    for (let setNumber = 1; setNumber <= totalSets; setNumber++) {
      sets.push(
        <View key={`${exerciseName}-set-${setNumber}`} style={styles.exerciseSetRow}>
          <View style={styles.horizontalConnector} />
          <TouchableOpacity
            style={styles.exerciseRow}
            onPress={() => console.log(`${exerciseName} Set ${setNumber} selected`)}
            activeOpacity={1}>
            <Image
              source={getExerciseImage(exerciseName)}
              style={styles.exerciseImage}
              resizeMode="cover"
            />
            <View style={styles.exerciseInfo}>
              <Text style={styles.exerciseName}>{exerciseName.toUpperCase()}</Text>
              <Text style={styles.exerciseSetCount}>
                <Text style={styles.exerciseSetLabel}>SET: </Text>
                <Text style={[
                  styles.exerciseSetNumber,
                  selectedSession === 'standard' && {color: theme.colors.sessionStandard},
                  selectedSession === 'express' && {color: theme.colors.sessionExpress},
                  selectedSession === 'maintenance' && {color: theme.colors.sessionMaintenance},
                ]}>
                  {setNumber}{' '}
                </Text>
                <Text style={styles.exerciseSetLabel}>OF </Text>
                <Text style={[
                  styles.exerciseSetNumber,
                  selectedSession === 'standard' && {color: theme.colors.sessionStandard},
                  selectedSession === 'express' && {color: theme.colors.sessionExpress},
                  selectedSession === 'maintenance' && {color: theme.colors.sessionMaintenance},
                ]}>
                  {totalSets}
                </Text>
              </Text>
            </View>
            <Text style={styles.exerciseReps}>
              <Text style={styles.exerciseRepsLabel}>REPS: </Text>
              <Text style={styles.exerciseRepsNumber}>{currentReps}</Text>
            </Text>
          </TouchableOpacity>
        </View>
      );
    }

    return sets;
  };

  /**
   * Constructs complete exercise tree with vertical connectors and group spacing
   * Filters out exercises with zero sets and maintains visual hierarchy
   */
  const renderExercises = () => {
    const exerciseGroups: JSX.Element[] = [];

    workoutData.exercises.forEach((exercise, index) => {
      if (exercise.adjustedSets === 0) {
        return;
      }

      if (index > 0) {
        exerciseGroups.push(
          <View key={`spacer-${index}`} style={styles.exerciseGroupSpacer} />
        );
      }

      exerciseGroups.push(
        <View key={`group-${exercise.exercise_name}`} style={styles.exerciseGroup}>
          {renderExerciseSets(exercise.exercise_name, exercise.adjustedSets, 10)}
        </View>
      );
    });

    return exerciseGroups;
  };

  // ==========================================================================
  // EVENT HANDLERS
  // ==========================================================================

  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleMenuPress = () => {
    setSidebarVisible(true);
  };

  const handleGuidePress = () => {
    navigation.navigate('HelpScreen');
  };

  const handleSidebarSelect = async (
    option: 'profile' | 'settings' | 'help' | 'logout',
  ) => {
    console.log('Sidebar option selected:', option);

    switch (option) {
      case 'settings':
        navigation.navigate('SettingsScreen');
        break;
      case 'logout':
        console.log('Logout requested');
        break;
      default:
        console.log('Option not implemented:', option);
    }
  };

  // ==========================================================================
  // RENDER
  // ==========================================================================

  return (
    <WorkoutLayout
      workoutType={workoutType}
      showLetsGoButton={false}
      sidebarVisible={sidebarVisible}
      onSidebarClose={() => setSidebarVisible(false)}
      onSidebarSelect={handleSidebarSelect}
      onBackPress={handleBackPress}
      onMenuPress={handleMenuPress}
      onGuidePress={handleGuidePress}>
      {/* Scrollable Content Area */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[
          styles.scrollContent,
          {paddingBottom: 250}
        ]}
        showsVerticalScrollIndicator={false}>

          {/* Workout Name Card */}
          <View style={styles.workoutNameCard}>
            <Text style={styles.workoutNameText}>{workoutType}</Text>
          </View>

          {/* Today's Workout Card */}
          <View style={styles.todaysWorkoutCard}>
            {/* Today's Workout Text with Connector */}
            <View style={styles.todaysWorkoutHeader}>
              <Text style={styles.todaysWorkoutText}>TODAY'S WORKOUT</Text>
              <View style={styles.titleConnector} />
            </View>

            {/* Exercise Tree Structure */}
            <View style={styles.exerciseTreeContainer}>
              <View style={[styles.verticalLine, {height: verticalLineHeight}]} />
              {renderExercises()}
            </View>
          </View>
        </ScrollView>
    </WorkoutLayout>
  );
};

// ============================================================================
// STYLES
// ============================================================================

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },

  scrollContent: {
    flexGrow: 1,
    paddingLeft: theme.spacing.s,
    paddingRight: theme.spacing.s,
  },

  // === WORKOUT NAME CARD ===
  workoutNameCard: {
    backgroundColor: theme.colors.backgroundPrimary,
    borderRadius: theme.spacing.s,
    paddingLeft: theme.spacing.s,
    paddingRight: theme.spacing.s,
    paddingTop: theme.spacing.m,
    paddingBottom: theme.spacing.m,
    marginBottom: theme.spacing.s,
    justifyContent: 'center',
    alignItems: 'center',
  },

  workoutNameText: {
    fontSize: theme.typography.fontSize.xl,
    fontFamily: theme.typography.fontFamily.primary,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.actionSuccess,
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
    marginTop: 13, // Compensates for font metrics to achieve visual 16dp spacing
    marginBottom: 13, // Compensates for font metrics to achieve visual 16dp spacing
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
    left: 0, // Aligns with card content (card padding creates 8dp from edge)
    top: 12, // Vertically centers with 24dp text (fontSize.xl / 2)
    width: 50, // Extends to connect with "T" in "TODAY'S WORKOUT"
    height: 1, // Thin connector line
    backgroundColor: theme.colors.pureWhite,
  },

  // === EXERCISE TREE STRUCTURE ===
  exerciseTreeContainer: {
    position: 'relative',
  },

  verticalLine: {
    position: 'absolute',
    left: 0, // Aligns with titleConnector left edge
    top: -13 - 12, // Extends upward to connect with titleConnector (-13 marginBottom, -12 text center offset)
    width: 1, // Thin vertical line
    backgroundColor: theme.colors.pureWhite,
  },

  exerciseGroup: {
    marginBottom: 0, // Spacing controlled by exerciseGroupSpacer between groups
  },

  exerciseSetRow: {
    position: 'relative',
    marginBottom: 5, // Separation between individual exercise sets
    marginLeft: 16, // Space for horizontal connector from vertical line
  },

  horizontalConnector: {
    position: 'absolute',
    left: -16, // Connects from marginLeft back to vertical line
    top: 25, // Centers vertically with 50dp exercise row (height / 2)
    width: 16, // Branch length from vertical line to exercise card
    height: 1, // Thin horizontal connector
    backgroundColor: theme.colors.pureWhite,
  },

  exerciseGroupSpacer: {
    height: 32, // Visual breathing room between different exercise groups
  },

  exerciseRow: {
    height: 50, // Standard touchable row height for comfortable interaction
    backgroundColor: theme.colors.pureBlack,
    borderRadius: theme.spacing.s,
    flexDirection: 'row',
    position: 'relative',
  },

  exerciseImage: {
    width: 46, // Image fits within 50dp row with 2dp margins
    height: 46,
    borderRadius: 6, // Rounded corners for visual polish
    position: 'absolute',
    top: 2, // 2dp margin from row top
    left: 2, // 2dp margin from row left
  },

  exerciseInfo: {
    position: 'absolute',
    left: 56, // Positioned after image (2 + 46 + 8 spacing)
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
    lineHeight: 16, // Matches fontSize for precise vertical control
    marginTop: 6, // Achieves visual 8dp spacing (compensates for inherent text metrics)
  },

  exerciseSetCount: {
    fontSize: theme.typography.fontSize.m,
    fontFamily: theme.typography.fontFamily.primary,
    fontWeight: theme.typography.fontWeight.bold,
    textTransform: 'uppercase',
    includeFontPadding: false,
    lineHeight: 16, // Matches fontSize for precise vertical control
    marginBottom: 6, // Achieves visual 8dp spacing (compensates for inherent text metrics)
  },

  exerciseSetLabel: {
    color: theme.colors.textSecondary,
  },

  exerciseSetNumber: {
    // Color set dynamically based on session type via theme.colors.session{Standard|Express|Maintenance}
  },

  exerciseReps: {
    fontSize: theme.typography.fontSize.m,
    fontFamily: theme.typography.fontFamily.primary,
    fontWeight: theme.typography.fontWeight.bold,
    textTransform: 'uppercase',
    position: 'absolute',
    right: 8, // 8dp margin from right edge
    bottom: 6, // Achieves visual 8dp spacing (compensates for inherent text metrics)
    textAlign: 'right',
    includeFontPadding: false,
    lineHeight: 16, // Matches fontSize for precise vertical control
  },

  exerciseRepsLabel: {
    color: theme.colors.textSecondary,
  },

  exerciseRepsNumber: {
    color: theme.colors.actionSuccess,
  },
});
